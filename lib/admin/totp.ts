import crypto from 'crypto';

/**
 * RFC 4648 Base32 alphabet (no padding required for TOTP secrets)
 */
const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

/**
 * Encodes a buffer to a standard RFC 4648 Base32 string.
 */
export function base32Encode(buffer: Buffer): string {
  let bits = 0;
  let value = 0;
  let output = '';

  for (let i = 0; i < buffer.length; i++) {
    value = (value << 8) | buffer[i];
    bits += 8;

    while (bits >= 5) {
      output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  }

  return output;
}

/**
 * Decodes an RFC 4648 Base32 string to a Buffer.
 * Ignores spaces and hyphens. Case-insensitive.
 */
export function base32Decode(input: string): Buffer {
  const cleanInput = input.toUpperCase().replace(/[\s-]/g, '');
  let bits = 0;
  let value = 0;
  const bytes: number[] = [];

  for (let i = 0; i < cleanInput.length; i++) {
    const char = cleanInput[i];
    const index = BASE32_ALPHABET.indexOf(char);
    if (index === -1) {
      throw new Error(`Invalid Base32 character: ${char}`);
    }

    value = (value << 5) | index;
    bits += 5;

    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }

  return Buffer.from(bytes);
}

/**
 * Derives a consistent AES-256 key for encrypting TOTP secrets at rest.
 */
function getEncryptionKey(): Buffer {
  const masterKey = process.env.ADMIN_TOTP_ENCRYPTION_KEY || process.env.JWT_SECRET || 'ajpr-admin-fallback-totp-key-32ch';
  return crypto.scryptSync(masterKey, 'ajpr-admin-totp-kdf-salt-v1', 32);
}

/**
 * Encrypts a TOTP secret using AES-256-GCM before writing to the database.
 * Returns formatted string: "ivHex:tagHex:cipherHex"
 */
export function encryptTotpSecret(secret: string): string {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  let encrypted = cipher.update(secret, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag().toString('hex');

  return `${iv.toString('hex')}:${tag}:${encrypted}`;
}

/**
 * Decrypts a TOTP secret retrieved from the database.
 */
export function decryptTotpSecret(encryptedString: string): string {
  const parts = encryptedString.split(':');
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted TOTP secret format');
  }

  const [ivHex, tagHex, cipherHex] = parts;
  const key = getEncryptionKey();
  const iv = Buffer.from(ivHex, 'hex');
  const tag = Buffer.from(tagHex, 'hex');

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);

  let decrypted = decipher.update(cipherHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

/**
 * Generates a new cryptographically random 20-byte (160-bit) Base32 secret for TOTP enrollment.
 */
export function generateTotpSecret(): string {
  const randomBytes = crypto.randomBytes(20);
  return base32Encode(randomBytes);
}

/**
 * Generates an RFC 6238 TOTP token for a given timestamp.
 * Standard parameters: 30-second time step, 6 digits, HMAC-SHA1.
 */
export function generateTotpToken(
  secret: string,
  timestampMs: number = Date.now(),
  stepSeconds: number = 30,
  digits: number = 6
): string {
  const secretBuffer = base32Decode(secret);
  const counter = Math.floor(timestampMs / 1000 / stepSeconds);

  // 8-byte big-endian counter buffer
  const counterBuffer = Buffer.alloc(8);
  counterBuffer.writeBigUInt64BE(BigInt(counter), 0);

  // HMAC-SHA1 computation
  const hmac = crypto.createHmac('sha1', secretBuffer);
  hmac.update(counterBuffer);
  const digest = hmac.digest();

  // Dynamic truncation (RFC 4226 section 5.4)
  const offset = digest[digest.length - 1] & 0x0f;
  const binaryCode =
    ((digest[offset] & 0x7f) << 24) |
    ((digest[offset + 1] & 0xff) << 16) |
    ((digest[offset + 2] & 0xff) << 8) |
    (digest[offset + 3] & 0xff);

  const otp = binaryCode % Math.pow(10, digits);
  return otp.toString().padStart(digits, '0');
}

/**
 * Verifies a submitted TOTP token against a secret with a configurable drift window.
 * Default window = 1 allows tokens from [t-30s, t, t+30s] to account for clock skew.
 * Verification is timing-safe.
 */
export function verifyTotpToken(
  token: string,
  secret: string,
  window: number = 1,
  currentTimestampMs: number = Date.now(),
  stepSeconds: number = 30
): boolean {
  if (!token || typeof token !== 'string') return false;
  const sanitizedToken = token.trim();
  if (!/^\d{6}$/.test(sanitizedToken)) return false;

  const currentCounter = Math.floor(currentTimestampMs / 1000 / stepSeconds);

  for (let offset = -window; offset <= window; offset++) {
    const testTime = (currentCounter + offset) * stepSeconds * 1000;
    try {
      const expectedToken = generateTotpToken(secret, testTime, stepSeconds, 6);
      const tokenBuf = Buffer.from(sanitizedToken, 'utf8');
      const expectedBuf = Buffer.from(expectedToken, 'utf8');

      if (tokenBuf.length === expectedBuf.length && crypto.timingSafeEqual(tokenBuf, expectedBuf)) {
        return true;
      }
    } catch {
      continue;
    }
  }

  return false;
}

/**
 * Generates an otpauth:// URI for QR code configuration.
 */
export function getTotpUri(email: string, secret: string, issuer: string = 'AJPR World'): string {
  const cleanEmail = email.trim().toLowerCase();
  const encodedIssuer = encodeURIComponent(issuer);
  const encodedLabel = `${encodedIssuer}:${encodeURIComponent(cleanEmail)}`;

  return `otpauth://totp/${encodedLabel}?secret=${secret}&issuer=${encodedIssuer}&algorithm=SHA1&digits=6&period=30`;
}

/**
 * Hashes a backup recovery code using HMAC-SHA256 with key derivation.
 */
export function hashBackupCode(code: string): string {
  const cleanCode = code.toUpperCase().replace(/[\s-]/g, '');
  const key = getEncryptionKey();
  return crypto.createHmac('sha256', key).update(cleanCode).digest('hex');
}

/**
 * Generates 8 single-use recovery codes in XXXX-XXXX format.
 * Returns plaintext codes for display to the user and hashed versions for storage.
 */
export function generateBackupCodes(count: number = 8): { plaintext: string[]; hashed: string[] } {
  const plaintext: string[] = [];
  const hashed: string[] = [];

  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // Unambiguous characters (no 0, 1, I, O)

  for (let i = 0; i < count; i++) {
    let part1 = '';
    let part2 = '';
    const bytes = crypto.randomBytes(8);

    for (let b = 0; b < 4; b++) {
      part1 += chars[bytes[b] % chars.length];
      part2 += chars[bytes[b + 4] % chars.length];
    }

    const code = `${part1}-${part2}`;
    plaintext.push(code);
    hashed.push(hashBackupCode(code));
  }

  return { plaintext, hashed };
}

/**
 * Verifies a submitted backup code against the list of stored hashes.
 * If valid, returns { valid: true, remainingHashes } with the consumed code removed.
 */
export function verifyAndConsumeBackupCode(
  inputCode: string,
  storedHashes: string[]
): { valid: boolean; remainingHashes: string[] } {
  if (!inputCode || !storedHashes || storedHashes.length === 0) {
    return { valid: false, remainingHashes: storedHashes || [] };
  }

  const inputHash = hashBackupCode(inputCode);
  const inputHashBuf = Buffer.from(inputHash, 'utf8');

  let matchIndex = -1;

  for (let i = 0; i < storedHashes.length; i++) {
    const storedBuf = Buffer.from(storedHashes[i], 'utf8');
    if (storedBuf.length === inputHashBuf.length && crypto.timingSafeEqual(storedBuf, inputHashBuf)) {
      matchIndex = i;
      break;
    }
  }

  if (matchIndex === -1) {
    return { valid: false, remainingHashes: storedHashes };
  }

  const remainingHashes = storedHashes.filter((_, idx) => idx !== matchIndex);
  return { valid: true, remainingHashes };
}


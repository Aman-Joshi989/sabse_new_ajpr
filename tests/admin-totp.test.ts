import test from 'node:test';
import assert from 'node:assert/strict';
import {
  base32Encode,
  base32Decode,
  encryptTotpSecret,
  decryptTotpSecret,
  generateTotpSecret,
  generateTotpToken,
  verifyTotpToken,
  getTotpUri,
  generateBackupCodes,
  verifyAndConsumeBackupCode,
} from '../lib/admin/totp';

test('Base32 encoding and decoding handles arbitrary buffers and text', () => {
  const original = Buffer.from('Hello, Antigravity 2FA!');
  const encoded = base32Encode(original);
  const decoded = base32Decode(encoded);
  assert.equal(decoded.toString('utf8'), original.toString('utf8'));

  // Test case-insensitivity and whitespace tolerance
  const withDashes = encoded.match(/.{1,4}/g)?.join('-') || encoded;
  const decodedDashes = base32Decode(withDashes.toLowerCase());
  assert.equal(decodedDashes.toString('utf8'), original.toString('utf8'));
});

test('AES-256-GCM TOTP secret encryption and decryption', () => {
  const secret = generateTotpSecret();
  const encrypted = encryptTotpSecret(secret);

  assert.notEqual(encrypted, secret);
  assert.equal(encrypted.split(':').length, 3); // iv:tag:ciphertext

  const decrypted = decryptTotpSecret(encrypted);
  assert.equal(decrypted, secret);
});

test('RFC 6238 Appendix B exact test vectors verification', () => {
  // RFC 6238 Appendix B test seed: ASCII "12345678901234567890" -> Base32 "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ"
  const rfcSecret = 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ';

  // 1. Time = 59s -> 287082
  assert.equal(generateTotpToken(rfcSecret, 59 * 1000), '287082');

  // 2. Time = 1111111109s -> 081804
  assert.equal(generateTotpToken(rfcSecret, 1111111109 * 1000), '081804');

  // 3. Time = 1111111111s -> 050471
  assert.equal(generateTotpToken(rfcSecret, 1111111111 * 1000), '050471');

  // 4. Time = 1234567890s -> 005924
  assert.equal(generateTotpToken(rfcSecret, 1234567890 * 1000), '005924');

  // 5. Time = 2000000000s -> 279037
  assert.equal(generateTotpToken(rfcSecret, 2000000000 * 1000), '279037');
});

test('verifyTotpToken validates correct code and tolerates clock skew within window', () => {
  const secret = generateTotpSecret();
  const now = Date.now();

  const currentToken = generateTotpToken(secret, now);
  assert.equal(verifyTotpToken(currentToken, secret, 1, now), true);

  // Previous time step (t - 30s) should pass with window=1
  const prevToken = generateTotpToken(secret, now - 30 * 1000);
  assert.equal(verifyTotpToken(prevToken, secret, 1, now), true);

  // Next time step (t + 30s) should pass with window=1
  const nextToken = generateTotpToken(secret, now + 30 * 1000);
  assert.equal(verifyTotpToken(nextToken, secret, 1, now), true);

  // Two time steps away (t + 60s) should fail with window=1
  const distantToken = generateTotpToken(secret, now + 65 * 1000);
  assert.equal(verifyTotpToken(distantToken, secret, 1, now), false);

  // Invalid or malformed tokens must fail safely
  assert.equal(verifyTotpToken('abc', secret), false);
  assert.equal(verifyTotpToken('12345', secret), false);
  assert.equal(verifyTotpToken('999999', secret, 1, now), false);
});

test('Backup recovery codes generation and single-use consumption', () => {
  const { plaintext, hashed } = generateBackupCodes(8);

  assert.equal(plaintext.length, 8);
  assert.equal(hashed.length, 8);

  // Codes are in XXXX-XXXX format
  for (const code of plaintext) {
    assert.match(code, /^[2-9A-Z]{4}-[2-9A-Z]{4}$/);
  }

  // Verification consumes code
  const codeToUse = plaintext[0];
  const consume1 = verifyAndConsumeBackupCode(codeToUse, hashed);
  assert.equal(consume1.valid, true);
  assert.equal(consume1.remainingHashes.length, 7);

  // Attempting to reuse the consumed code fails
  const consume2 = verifyAndConsumeBackupCode(codeToUse, consume1.remainingHashes);
  assert.equal(consume2.valid, false);
  assert.equal(consume2.remainingHashes.length, 7);

  // Testing invalid code
  const invalidResult = verifyAndConsumeBackupCode('ZZZZ-ZZZZ', consume1.remainingHashes);
  assert.equal(invalidResult.valid, false);
});

test('getTotpUri generates standard otpauth URI', () => {
  const uri = getTotpUri('admin@ajprworld.com', 'JBSWY3DPEHPK3PXP');
  assert.match(uri, /^otpauth:\/\/totp\/AJPR%20World:admin%40ajprworld\.com\?/);
  assert.match(uri, /secret=JBSWY3DPEHPK3PXP/);
  assert.match(uri, /issuer=AJPR%20World/);
  assert.match(uri, /algorithm=SHA1/);
  assert.match(uri, /digits=6/);
  assert.match(uri, /period=30/);
});

import crypto from 'crypto';

export function getResumeSecret(): string {
  return (
    process.env.BLOB_READ_WRITE_TOKEN ||
    process.env.ADMIN_JWT_SECRET ||
    'ajpr-secure-resume-token-2026'
  );
}

export function generateResumeViewToken(target: string): string {
  const secret = getResumeSecret();
  return crypto.createHmac('sha256', secret).update(target).digest('hex').slice(0, 32);
}

export function verifyResumeViewToken(target: string, token: string): boolean {
  if (!target || !token) return false;
  try {
    const expected = generateResumeViewToken(target);
    const tokenBuf = Buffer.from(token, 'utf-8');
    const expectedBuf = Buffer.from(expected, 'utf-8');
    if (tokenBuf.length !== expectedBuf.length) return false;
    return crypto.timingSafeEqual(tokenBuf, expectedBuf);
  } catch {
    return false;
  }
}

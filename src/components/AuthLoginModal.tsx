import React, { useState } from 'react';
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
import { UserAccount, initialUserAccounts } from '../data/defaultAccounts';
import { AgencyAccount } from '../types';

interface AuthLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onLogin: (user: UserAccount) => void;
  onLogout: () => void;
  requiredReason?: 'admin_required' | 'agency_required' | 'advibe_required' | 'general';
  agencies: AgencyAccount[];
}

export const AuthLoginModal: React.FC<AuthLoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  requiredReason = 'general'
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [accounts] = useState<UserAccount[]>(() => {
    try {
      const stored = localStorage.getItem('ri8click_user_accounts');
      return stored ? JSON.parse(stored) : initialUserAccounts;
    } catch {
      return initialUserAccounts;
    }
  });

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanId || !cleanPass) {
      setErrorMessage('Please enter both your Username/Email and Password.');
      return;
    }

    const matched = accounts.find(
      acc =>
        (acc.username.toLowerCase() === cleanId || acc.email.toLowerCase() === cleanId) &&
        acc.password === cleanPass
    );

    if (matched) {
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
      }, 600);
    } else {
      setErrorMessage(
        'Invalid username or password. Please verify your credentials or contact the system administrator.'
      );
    }
  };

  const getReasonBanner = () => {
    if (requiredReason === 'admin_required') {
      return (
        <div className="bg-rose-950/80 border border-rose-500/40 rounded-xl p-3.5 text-rose-200 text-xs flex items-start gap-2.5">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-white">Restricted Access: Administrative Console Locked</div>
            <div className="text-[11px] text-rose-300 mt-0.5">
              Direct access to the system admin panel is strictly protected. Please authenticate with your Super Admin credentials.
            </div>
          </div>
        </div>
      );
    }
    if (requiredReason === 'agency_required') {
      return (
        <div className="bg-amber-950/80 border border-amber-500/40 rounded-xl p-3.5 text-amber-200 text-xs flex items-start gap-2.5">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-white">Certified Agency Login Required</div>
            <div className="text-[11px] text-amber-300 mt-0.5">
              Property submission and ad management are restricted to certified real estate brokerages and platform administrators.
            </div>
          </div>
        </div>
      );
    }
    if (requiredReason === 'advibe_required') {
      return (
        <div className="bg-blue-950/80 border border-blue-500/40 rounded-xl p-3.5 text-blue-200 text-xs flex items-start gap-2.5">
          <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-white">AdVibe Studio Authorization Required</div>
            <div className="text-[11px] text-blue-300 mt-0.5">
              Creating and editing AdVibe megaprojects requires authorized agency or super administrator credentials.
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div
        className="relative w-full max-w-md bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Ri8click Security Portal</span>
                <span className="bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                  RBAC Secure
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Encrypted Real Estate User Authentication
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body — All public password hints & quick-login bypasses removed */}
        <div className="p-6 overflow-y-auto space-y-5">
          {getReasonBanner()}

          {currentUser && (
            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-11 h-11 rounded-xl object-cover border-2 border-blue-500 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white truncate">{currentUser.name}</span>
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
                  <div className="text-[11px] text-slate-400 truncate">
                    {currentUser.companyName || currentUser.email}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onLogout();
                  setSuccessMessage('Logged out successfully.');
                }}
                className="px-3 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 border border-rose-500/30 text-rose-300 hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Username or Official Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Enter your username or email"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-hidden focus:border-blue-500 transition-colors"
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Password</label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your secret password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-hidden focus:border-blue-500 transition-colors"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Sign In & Verify Access</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthLoginModal;

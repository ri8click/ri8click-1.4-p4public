import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Key, 
  Eye, 
  EyeOff, 
  Building2, 
  User, 
  Check, 
  Sparkles, 
  LogOut, 
  AlertCircle,
  HelpCircle
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
  requiredReason = 'general',
  agencies
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Accounts state from localStorage (or defaults)
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

    const matched = accounts.find(acc => 
      (acc.username.toLowerCase() === cleanId || acc.email.toLowerCase() === cleanId) &&
      acc.password === cleanPass
    );

    if (matched) {
      onLogin(matched);
      setSuccessMessage(`Welcome back, ${matched.name}! Authenticated as ${matched.role === 'admin' ? 'Super Admin' : matched.companyName || matched.role}.`);
      setTimeout(() => {
        onClose();
        setSuccessMessage('');
        setPassword('');
        setIdentifier('');
      }, 600);
    } else {
      setErrorMessage('Invalid username or password. Please verify your credentials or contact system administrator.');
    }
  };

  const getReasonBanner = () => {
    if (requiredReason === 'admin_required') {
      return (
        <div className="bg-rose-950/80 border border-rose-500/40 rounded-xl p-3.5 text-rose-200 text-xs flex items-start gap-2.5">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-white">🔒 Restricted Access: Administrative Console Locked</div>
            <div className="text-[11px] text-rose-300 mt-0.5">
              Direct access to the system admin panel is strictly protected. Please authenticate with your <strong>Super Admin</strong> credentials to continue.
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
            <div className="font-bold text-white">🔒 Certified Agency Login Required</div>
            <div className="text-[11px] text-amber-300 mt-0.5">
              Property submission, ad management, and watermark-verified publishing are restricted to certified real estate brokerages and platform administrators.
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
            <div className="font-bold text-white">🔒 AdVibe Studio Authorization Required</div>
            <div className="text-[11px] text-blue-300 mt-0.5">
              Creating and editing AdVibe scrollytelling megaprojects requires authorized agency or super administrator credentials.
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const isSuperAdminLoggedIn = currentUser?.role === 'admin';

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
                <span>ri8click Security Portal</span>
                <span className="bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">RBAC Secure</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Protected administrative and agency credentials
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">

          {/* Trigger Banner (if access was blocked) */}
          {getReasonBanner()}

          {/* Currently Logged In Banner */}
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
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                      currentUser.role === 'admin' 
                        ? 'bg-amber-400 text-slate-950' 
                        : currentUser.role === 'agency' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-emerald-600 text-white'
                    }`}>
                      {currentUser.role === 'admin' ? 'Super Admin' : 'Certified Agency'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {currentUser.companyName || currentUser.email}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                    <Check className="w-3 h-3" />
                    <span>Session Active</span>
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

          {/* Error / Success Notices */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Standard Private Login Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Username or Official Email</span>
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
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Password</span>
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your account password"
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

          {/* Certified Agent Credentials & Default Passwords Section */}
          <div className="bg-slate-800/90 border border-blue-500/30 rounded-2xl p-4 space-y-3 shadow-inner">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-700/80 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Key className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Certified Agent Default Passwords
                </h4>
              </div>
              <span className="text-[10px] text-blue-300 font-semibold bg-blue-900/40 px-2 py-0.5 rounded-full border border-blue-500/20 self-start sm:self-auto">
                Post Ads & View Listings
              </span>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed">
              Certified agents can log in with their respective username and default password to access their dedicated panel to <strong>post property ads</strong> and <strong>view/manage listings</strong>.
            </p>

            <div className="space-y-2 pt-1">
              {accounts.filter(a => a.role === 'agency').map((agent) => (
                <div 
                  key={agent.id}
                  className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-700/60 hover:border-blue-400/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-white text-xs">{agent.name}</span>
                      <span className="text-[10px] text-slate-400">({agent.companyName})</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[11px]">
                      <span className="text-slate-400">User: <strong className="text-slate-200 font-mono">{agent.username}</strong></span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400">Default Password: <code className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono font-bold">{agent.password}</code></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => {
                        setIdentifier(agent.username);
                        setPassword(agent.password);
                        setErrorMessage('');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10.5px] font-semibold border border-slate-700 transition-colors"
                      title="Fill in username and password"
                    >
                      Use
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onLogin(agent);
                        setSuccessMessage(`Welcome back, ${agent.name}! Logged into Certified Agent Panel.`);
                        setTimeout(() => {
                          onClose();
                          setSuccessMessage('');
                        }, 500);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[10.5px] font-bold shadow-xs transition-colors flex items-center gap-1"
                      title="Instant Login as this agent"
                    >
                      <span>Login</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Admin Console Credentials Info */}
            <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
              <div>
                <span>Super Admin (Website Modules): User: <strong className="text-slate-200 font-mono">admin</strong> • Default Pass: <code className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono font-bold">admin123</code></span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIdentifier('admin');
                  setPassword('admin123');
                  setErrorMessage('');
                }}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10.5px] font-semibold transition-colors"
              >
                Use Admin
              </button>
            </div>
          </div>

          {/* Privacy Protection Notice */}
          <div className="text-[11px] text-slate-400 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <span>After initial login with the default password, certified agencies and administrators can change their password anytime inside their authenticated profile interface.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthLoginModal; 

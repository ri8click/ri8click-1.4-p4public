import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  MapPin, 
  ShieldCheck, 
  Key, 
  Lock, 
  Camera, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Award, 
  Bell, 
  BadgeCheck,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { UserAccount } from '../data/defaultAccounts';

interface AdminUserProfileManagerProps {
  currentUser: UserAccount;
  onUpdateCurrentUser: (updatedUser: UserAccount) => void;
  allUsers?: UserAccount[];
  onUpdateAllUsers?: (users: UserAccount[]) => void;
}

export const AdminUserProfileManager: React.FC<AdminUserProfileManagerProps> = ({
  currentUser,
  onUpdateCurrentUser,
  allUsers = [],
  onUpdateAllUsers
}) => {
  // Tab within profile
  const [profileTab, setProfileTab] = useState<'personal' | 'account' | 'security' | 'notifications'>('personal');

  // Personal Info Form State
  const [name, setName] = useState(currentUser.name || '');
  const [designation, setDesignation] = useState(currentUser.designation || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [whatsapp, setWhatsapp] = useState(currentUser.whatsapp || '');
  const [address, setAddress] = useState(currentUser.address || '');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [avatar, setAvatar] = useState(currentUser.avatar || '');

  // Account Info Form State
  const [email, setEmail] = useState(currentUser.email || '');
  const [username, setUsername] = useState(currentUser.username || '');
  const [companyName, setCompanyName] = useState(currentUser.companyName || '');
  const [licenseNumber, setLicenseNumber] = useState(currentUser.licenseNumber || '');

  // Security / Password Reset State
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  // Notification Preferences State
  const [notifications, setNotifications] = useState({
    email: currentUser.notificationPreferences?.email ?? true,
    whatsapp: currentUser.notificationPreferences?.whatsapp ?? true,
    leads: currentUser.notificationPreferences?.leads ?? true,
    tourAlerts: currentUser.notificationPreferences?.tourAlerts ?? true,
  });

  // Success Feedback
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  const triggerFeedback = (msg: string) => {
    setSaveFeedback(msg);
    setTimeout(() => setSaveFeedback(null), 3500);
  };

  // Preset Avatars for quick selection
  const presetAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'
  ];

  // Save Profile Changes
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserAccount = {
      ...currentUser,
      name,
      designation,
      phone,
      whatsapp,
      address,
      bio,
      avatar,
      email,
      username,
      companyName,
      licenseNumber,
      notificationPreferences: notifications
    };

    onUpdateCurrentUser(updated);

    // Also sync in allUsers array and localStorage
    if (onUpdateAllUsers && allUsers.length > 0) {
      const updatedList = allUsers.map(u => u.id === currentUser.id ? updated : u);
      onUpdateAllUsers(updatedList);
      try {
        localStorage.setItem('ri8click_user_accounts', JSON.stringify(updatedList));
      } catch (err) {
        console.error('Failed to sync accounts', err);
      }
    }

    try {
      localStorage.setItem('ri8click_current_user', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to sync current user', err);
    }

    triggerFeedback('Profile details successfully updated and saved!');
  };

  // Handle Password Reset
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    // Validate current password
    if (currentUser.password && currentPasswordInput !== currentUser.password) {
      setPasswordError('Current password does not match.');
      return;
    }

    if (!newPasswordInput || newPasswordInput.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    const updated: UserAccount = {
      ...currentUser,
      password: newPasswordInput
    };

    onUpdateCurrentUser(updated);

    if (onUpdateAllUsers && allUsers.length > 0) {
      const updatedList = allUsers.map(u => u.id === currentUser.id ? updated : u);
      onUpdateAllUsers(updatedList);
      try {
        localStorage.setItem('ri8click_user_accounts', JSON.stringify(updatedList));
      } catch (err) {
        console.error('Failed to sync password to storage', err);
      }
    }

    try {
      localStorage.setItem('ri8click_current_user', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to sync current user', err);
    }

    setCurrentPasswordInput('');
    setNewPasswordInput('');
    setConfirmPasswordInput('');
    setPasswordSuccess('Password successfully updated and secured!');
  };

  const isSuperAdmin = currentUser.role === 'admin';
  const isCertified = currentUser.isCertifiedAgent || isSuperAdmin;

  return (
    <div className="space-y-6">
      {/* Top Banner & Profile Header */}
      <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-6 border border-slate-700 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Avatar with Badge */}
          <div className="relative group">
            <img
              src={avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={currentUser.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-amber-400/80 shadow-xl"
            />
            {isCertified && (
              <div 
                className="absolute -bottom-2 -right-2 bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 p-1.5 rounded-xl shadow-lg border-2 border-slate-900"
                title="Certified Authority / Verified Agent"
              >
                <BadgeCheck className="w-5 h-5 fill-current" />
              </div>
            )}
          </div>

          {/* User Meta */}
          <div className="flex-1 text-center sm:text-left space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {name || currentUser.name}
              </h2>
              {isSuperAdmin ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  Super Admin
                </span>
              ) : currentUser.isCertifiedAgent ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  <span>Certified Agent</span>
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Agency Partner
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {designation || (isSuperAdmin ? 'Chief System Administrator & Consortium Controller' : 'Senior Property Consultant')}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{email || currentUser.email}</span>
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{phone || currentUser.phone || 'No phone set'}</span>
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>License: {licenseNumber || currentUser.licenseNumber || 'RDA-CONSORTIUM-ADM-001'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Feedback Alert */}
        {saveFeedback && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{saveFeedback}</span>
          </div>
        )}
      </div>

      {/* Tabs Selector */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-2 text-xs font-bold">
        {[
          { key: 'personal', label: 'Personal Information', icon: User },
          { key: 'account', label: 'Account & Professional Info', icon: Building2 },
          { key: 'security', label: 'Security & Password Reset', icon: Lock },
          { key: 'notifications', label: 'Notification Preferences', icon: Bell },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = profileTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setProfileTab(tab.key as any)}
              className={`px-4 py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PERSONAL INFORMATION */}
      {profileTab === 'personal' && (
        <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Personal Details & Public Representation</h3>
            <p className="text-xs text-slate-500">Update your public profile displayed on property listings and AdVibe contact cards.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Professional Designation</label>
              <input
                type="text"
                value={designation}
                onChange={e => setDesignation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:border-blue-500"
                placeholder="e.g. Principal Broker, Luxury Real Estate Consultant"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Direct Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:border-blue-500"
                placeholder="+92 336 5666727"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">WhatsApp Hotline</label>
              <input
                type="text"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:border-blue-500"
                placeholder="+92 336 5666727"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-bold mb-1">Office / Physical Address</label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:border-blue-500"
                placeholder="Office suite, building, sector..."
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-bold mb-1">Professional Bio / Executive Statement</label>
              <textarea
                rows={3}
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:border-blue-500"
                placeholder="Brief summary of your market experience, sectors covered, and verified track record..."
              />
            </div>

            {/* Avatar URL & Preset Selector */}
            <div className="sm:col-span-2 space-y-2">
              <label className="block text-slate-700 font-bold">Profile Avatar Image URL</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={avatar}
                  onChange={e => setAvatar(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 text-xs font-mono"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              {/* Quick Pick Avatars */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] text-slate-500">Quick Avatars:</span>
                {presetAvatars.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatar(url)}
                    className={`w-7 h-7 rounded-lg overflow-hidden border-2 transition-all ${
                      avatar === url ? 'border-blue-600 scale-110 shadow-xs' : 'border-slate-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt="Preset" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Personal Information</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: ACCOUNT & PROFESSIONAL INFO */}
      {profileTab === 'account' && (
        <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Account Credentials & Professional Accreditation</h3>
            <p className="text-xs text-slate-500">Manage your system login username, corporate agency link, and regulatory license registration.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">System Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Registered Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Company / Brokerage Firm Name</label>
              <input
                type="text"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900"
                placeholder="e.g. ri8click Corporate Consortium / ZEM Builders"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Official Regulatory License / Registration No.</label>
              <input
                type="text"
                value={licenseNumber}
                onChange={e => setLicenseNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 font-mono"
                placeholder="e.g. RDA-RE-2024-889"
              />
            </div>

            <div className="sm:col-span-2 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">Current Role Privilege Level:</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-600 text-white">
                    {currentUser.role.toUpperCase()}
                  </span>
                  {isCertified && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white flex items-center gap-1">
                      <BadgeCheck className="w-3.5 h-3.5" />
                      <span>Certified Agent Verified</span>
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Role permissions determine access to properties, AdVibe megaprojects, and site layout customization.
                </p>
              </div>

              <span className="text-xs text-slate-400 font-mono">
                Member Since: {currentUser.memberSince || '2024'}
              </span>
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Update Account Details</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: SECURITY & PASSWORD RESET */}
      {profileTab === 'security' && (
        <form onSubmit={handleResetPassword} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>Password Security & Credential Reset</span>
            </h3>
            <p className="text-xs text-slate-500">
              Update your account password to protect access to your real estate portfolio, leads, and admin console.
            </p>
          </div>

          {passwordError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{passwordError}</span>
            </div>
          )}

          {passwordSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{passwordSuccess}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Current Password</label>
              <input
                type="password"
                value={currentPasswordInput}
                onChange={e => setCurrentPasswordInput(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">New Password</label>
              <input
                type="password"
                value={newPasswordInput}
                onChange={e => setNewPasswordInput(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:border-blue-500"
                placeholder="Min 6 characters"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmPasswordInput}
                onChange={e => setConfirmPasswordInput(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:border-blue-500"
                placeholder="Re-type new password"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-[11px] space-y-1">
            <p className="font-bold text-slate-800">Password Requirements:</p>
            <ul className="list-disc list-inside space-y-0.5 text-slate-500">
              <li>Minimum 6 characters in length</li>
              <li>Include a combination of letters and numbers for higher protection</li>
              <li>Default demo credential for admin is <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">admin123</code></li>
            </ul>
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <Key className="w-4 h-4" />
              <span>Reset & Update Password</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 4: NOTIFICATIONS */}
      {profileTab === 'notifications' && (
        <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-600" />
              <span>Notification Channels & Lead Inbound Alerts</span>
            </h3>
            <p className="text-xs text-slate-500">
              Select which instant alerts you receive when clients book site visits, request 3D tours, or submit inquiries.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                key: 'email' as const,
                title: 'Instant Email Notifications',
                desc: 'Receive direct email notices when customer inquiries or property booking offers are filed.',
                icon: Mail
              },
              {
                key: 'whatsapp' as const,
                title: 'Direct WhatsApp Push Routing',
                desc: 'Send high-intent buyer inquiries directly to your registered WhatsApp number.',
                icon: MessageSquare
              },
              {
                key: 'leads' as const,
                title: 'AdVibe Lead Dispatch Alerts',
                desc: 'Get notified immediately whenever a client registers for master plan allocations.',
                icon: Building2
              },
              {
                key: 'tourAlerts' as const,
                title: '3D Virtual Tour Engagement Alerts',
                desc: 'Alerts when visitors spend extended engagement time inside your 3D digital twins.',
                icon: Sparkles
              }
            ].map(item => {
              const Icon = item.icon;
              const isChecked = notifications[item.key];
              return (
                <div
                  key={item.key}
                  onClick={() => setNotifications({ ...notifications, [item.key]: !isChecked })}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 pointer-events-none"
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Notification Preferences</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminUserProfileManager;

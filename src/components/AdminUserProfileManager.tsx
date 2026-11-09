import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Mail,
  Phone,
  MessageSquare,
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
  Sparkles,
  Upload
} from 'lucide-react';
import {
  UserAccount,
  PAKISTAN_AGENT_AVATARS
} from '../data/defaultAccounts';

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
  const [profileTab, setProfileTab] = useState<
    'personal' | 'account' | 'security' | 'notifications'
  >('personal');

  // Allow Super Admin to select which user profile to inspect/edit directly
  const [selectedUserId, setSelectedUserId] = useState<string>(currentUser.id);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const targetUser =
    allUsers.find(u => u.id === selectedUserId) || currentUser;

  const [name, setName] = useState(targetUser.name || '');
  const [designation, setDesignation] = useState(targetUser.designation || '');
  const [phone, setPhone] = useState(targetUser.phone || '');
  const [whatsapp, setWhatsapp] = useState(targetUser.whatsapp || '');
  const [address, setAddress] = useState(targetUser.address || '');
  const [bio, setBio] = useState(targetUser.bio || '');
  const [avatar, setAvatar] = useState(targetUser.avatar || '');

  const [email, setEmail] = useState(targetUser.email || '');
  const [username, setUsername] = useState(targetUser.username || '');
  const [companyName, setCompanyName] = useState(targetUser.companyName || '');
  const [licenseNumber, setLicenseNumber] = useState(
    targetUser.licenseNumber || ''
  );
  const [role, setRole] = useState<'admin' | 'agency' | 'customer'>(
    targetUser.role
  );
  const [isCertifiedAgent, setIsCertifiedAgent] = useState<boolean>(
    Boolean(targetUser.isCertifiedAgent || targetUser.role === 'admin')
  );

  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  const [notifications, setNotifications] = useState({
    email: targetUser.notificationPreferences?.email ?? true,
    whatsapp: targetUser.notificationPreferences?.whatsapp ?? true,
    leads: targetUser.notificationPreferences?.leads ?? true,
    tourAlerts: targetUser.notificationPreferences?.tourAlerts ?? true
  });

  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  useEffect(() => {
    setName(targetUser.name || '');
    setDesignation(targetUser.designation || '');
    setPhone(targetUser.phone || '');
    setWhatsapp(targetUser.whatsapp || '');
    setAddress(targetUser.address || '');
    setBio(targetUser.bio || '');
    setAvatar(targetUser.avatar || '');
    setEmail(targetUser.email || '');
    setUsername(targetUser.username || '');
    setCompanyName(targetUser.companyName || '');
    setLicenseNumber(targetUser.licenseNumber || '');
    setRole(targetUser.role);
    setIsCertifiedAgent(
      Boolean(targetUser.isCertifiedAgent || targetUser.role === 'admin')
    );
    setNotifications({
      email: targetUser.notificationPreferences?.email ?? true,
      whatsapp: targetUser.notificationPreferences?.whatsapp ?? true,
      leads: targetUser.notificationPreferences?.leads ?? true,
      tourAlerts: targetUser.notificationPreferences?.tourAlerts ?? true
    });
  }, [targetUser.id]);

  const triggerFeedback = (msg: string) => {
    setSaveFeedback(msg);
    setTimeout(() => setSaveFeedback(null), 3500);
  };

  // Verified Pakistan Regional Agent & Executive Portraits
  const presetAvatars = [
    PAKISTAN_AGENT_AVATARS.adminPrincipal,
    PAKISTAN_AGENT_AVATARS.malikZeeshan,
    PAKISTAN_AGENT_AVATARS.chaudhryBilal,
    PAKISTAN_AGENT_AVATARS.engrHarisFarooq,
    PAKISTAN_AGENT_AVATARS.hajiAslamKhan,
    PAKISTAN_AGENT_AVATARS.mianAhmed,
    PAKISTAN_AGENT_AVATARS.tariqMehmood
  ];

  const handleLocalAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 500;
        let w = img.width;
        let h = img.height;
        if (w > h && w > MAX_DIM) {
          h = Math.round((h * MAX_DIM) / w);
          w = MAX_DIM;
        } else if (h > MAX_DIM) {
          w = Math.round((w * MAX_DIM) / h);
          h = MAX_DIM;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, w, h);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.86);
        setAvatar(compressedDataUrl);
        triggerFeedback(
          'Photo uploaded! Click Save below to publish across the entire portal.'
        );
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserAccount = {
      ...targetUser,
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
      role: currentUser.role === 'admin' ? role : targetUser.role,
      isCertifiedAgent:
        currentUser.role === 'admin'
          ? isCertifiedAgent
          : targetUser.isCertifiedAgent,
      notificationPreferences: notifications
    };

    if (updated.id === currentUser.id) {
      onUpdateCurrentUser(updated);
    }

    if (onUpdateAllUsers && allUsers.length > 0) {
      const updatedList = allUsers.map(u =>
        u.id === updated.id ? updated : u
      );
      onUpdateAllUsers(updatedList);
    }

    triggerFeedback(
      `Profile & photo for "${updated.name}" updated and synchronized globally!`
    );
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (
      currentUser.role !== 'admin' &&
      targetUser.password &&
      currentPasswordInput !== targetUser.password
    ) {
      setPasswordError('Current password does not match.');
      return;
    }

    if (!newPasswordInput || newPasswordInput.length < 4) {
      setPasswordError('New password must be at least 4 characters long.');
      return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    const updated: UserAccount = {
      ...targetUser,
      password: newPasswordInput.trim()
    };

    if (updated.id === currentUser.id) {
      onUpdateCurrentUser(updated);
    }

    if (onUpdateAllUsers && allUsers.length > 0) {
      const updatedList = allUsers.map(u =>
        u.id === updated.id ? updated : u
      );
      onUpdateAllUsers(updatedList);
    }

    setCurrentPasswordInput('');
    setNewPasswordInput('');
    setConfirmPasswordInput('');
    setPasswordSuccess(
      `Password for "${updated.name}" updated and synchronized globally!`
    );
  };

  const isViewerSuperAdmin = currentUser.role === 'admin';
  const isTargetSuperAdmin = role === 'admin';
  const isTargetCertified = isCertifiedAgent || isTargetSuperAdmin;

  return (
    <div className="space-y-6">
      {/* Super Admin Quick User Profile Selector */}
      {isViewerSuperAdmin && allUsers.length > 1 && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Super Admin Profile Selector — Edit Any User Profile &amp; Photo</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Select Super Admin, any Certified Agency Specialist, or Visitor account to edit their profile, photo, role, or credentials.
            </p>
          </div>
          <select
            value={selectedUserId}
            onChange={e => setSelectedUserId(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900"
          >
            {allUsers.map(u => (
              <option key={u.id} value={u.id}>
                {u.name} (@{u.username}) —{' '}
                {u.role === 'admin'
                  ? 'Super Admin'
                  : u.role === 'agency'
                    ? 'Agency User'
                    : 'Visitor / Customer'}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Top Banner & Profile Header */}
      <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-6 border border-slate-700 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Avatar with Local Upload Button */}
          <div className="relative group shrink-0">
            <img
              src={avatar || PAKISTAN_AGENT_AVATARS.adminPrincipal}
              alt={name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover object-top border-2 border-amber-400/80 shadow-xl"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLocalAvatarUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-2 -left-2 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl shadow-lg border-2 border-slate-900 cursor-pointer transition-transform hover:scale-105"
              title="Upload Profile Photo from Device"
            >
              <Camera className="w-4 h-4" />
            </button>
            {isTargetCertified && (
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
                {name || targetUser.name}
              </h2>
              {isTargetSuperAdmin ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  Super Admin
                </span>
              ) : role === 'agency' ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  <span>Certified Agency User</span>
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Visitor / Customer
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {designation ||
                (isTargetSuperAdmin
                  ? 'Chief System Administrator & Consortium Controller'
                  : role === 'agency'
                    ? 'Senior Certified Property Consultant'
                    : 'Registered Portal Visitor & Investor')}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{email || targetUser.email}</span>
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{phone || targetUser.phone || 'No phone set'}</span>
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  License:{' '}
                  {licenseNumber ||
                    targetUser.licenseNumber ||
                    'RDA-CONSORTIUM-ADM-001'}
                </span>
              </span>
            </div>
          </div>
        </div>

        {saveFeedback && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{saveFeedback}</span>
          </div>
        )}
      </div>

      {/* Tabs Selector */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-2 text-xs font-bold">
        {[
          { key: 'personal', label: 'Personal Info & Photo', icon: User },
          {
            key: 'account',
            label: 'Role Authority & Company Info',
            icon: Building2
          },
          { key: 'security', label: 'Password & Security', icon: Lock },
          {
            key: 'notifications',
            label: 'Notification Preferences',
            icon: Bell
          }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = profileTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setProfileTab(tab.key as any)}
              className={`px-4 py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
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

      {/* TAB 1: PERSONAL INFORMATION & PHOTO */}
      {profileTab === 'personal' && (
        <form
          onSubmit={handleSaveProfile}
          className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5"
        >
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">
              Personal Details, Profile Photo &amp; Public Representation
            </h3>
            <p className="text-xs text-slate-500">
              Update public profile details and photo displayed on property listings, agency cards, and AdVibe contact cards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Professional Designation
              </label>
              <input
                type="text"
                value={designation}
                onChange={e => setDesignation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:border-blue-500"
                placeholder="e.g. Principal Broker, Luxury Real Estate Consultant"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Direct Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:border-blue-500"
                placeholder="+92 336 5666727"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                WhatsApp Hotline
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:border-blue-500"
                placeholder="+92 336 5666727"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-bold mb-1">
                Office / Physical Address
              </label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:border-blue-500"
                placeholder="Office suite, building, sector..."
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-bold mb-1">
                Professional Bio / Executive Statement
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:border-blue-500"
                placeholder="Brief summary of your market experience, sectors covered, and verified track record..."
              />
            </div>

            {/* Avatar Upload, URL & Regional Presets */}
            <div className="sm:col-span-2 space-y-2.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="block text-slate-800 font-bold">
                Profile Photo (Upload from Device or Paste Image URL)
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-xs"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Local Photo</span>
                </button>
                <input
                  type="text"
                  value={avatar}
                  onChange={e => setAvatar(e.target.value)}
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 text-xs font-mono"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-semibold text-slate-600">
                  Pakistan Regional Portraits:
                </span>
                {presetAvatars.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatar(url)}
                    className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      avatar === url
                        ? 'border-blue-600 scale-110 shadow-sm'
                        : 'border-slate-300 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={url}
                      alt={`Regional Portrait ${idx + 1}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Personal Information &amp; Photo</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: ACCOUNT, ROLE AUTHORITY & PROFESSIONAL INFO */}
      {profileTab === 'account' && (
        <form
          onSubmit={handleSaveProfile}
          className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5"
        >
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">
              Account Credentials, Role Authority &amp; Professional Accreditation
            </h3>
            <p className="text-xs text-slate-500">
              Manage login username, corporate brokerage affiliation, regulatory license, and user role level.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                System Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Registered Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Company / Brokerage Firm Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900"
                placeholder="e.g. ri8click Corporate Consortium / Al-Mairaj Builders"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Official Regulatory License / Registration No.
              </label>
              <input
                type="text"
                value={licenseNumber}
                onChange={e => setLicenseNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 font-mono"
                placeholder="e.g. RDA-RE-2024-889"
              />
            </div>

            {isViewerSuperAdmin && (
              <>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Assigned User Authority Role
                  </label>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 font-bold"
                  >
                    <option value="admin">
                      Super Admin (Full Global Console Authority)
                    </option>
                    <option value="agency">
                      Agency User (Certified Brokerage &amp; Listing Authority)
                    </option>
                    <option value="customer">
                      Visitor / Customer (Portfolio Browsing &amp; Tour Booking)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Certified Agent Verification Status
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCertifiedAgent(prev => !prev)}
                    className={`w-full py-2 px-3.5 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                      isCertifiedAgent
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : 'bg-slate-50 text-slate-600 border-slate-300'
                    }`}
                  >
                    <BadgeCheck className="w-4 h-4 text-emerald-600" />
                    <span>
                      {isCertifiedAgent
                        ? 'Certified Agent Badge Enabled'
                        : 'Standard Unverified User'}
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Update Account &amp; Role Authority</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: SECURITY & PASSWORD RESET */}
      {profileTab === 'security' && (
        <form
          onSubmit={handleResetPassword}
          className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5"
        >
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>Password Security &amp; Credential Reset</span>
            </h3>
            <p className="text-xs text-slate-500">
              Update account password to protect access to real estate portfolios, leads, and admin controls.
            </p>
          </div>

          {passwordError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{passwordError}</span>
            </div>
          )}

          {passwordSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{passwordSuccess}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {!isViewerSuperAdmin && (
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPasswordInput}
                  onChange={e => setCurrentPasswordInput(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900"
                  placeholder="••••••••"
                />
              </div>
            )}

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPasswordInput}
                onChange={e => setNewPasswordInput(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900"
                placeholder="Min 4 characters"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPasswordInput}
                onChange={e => setConfirmPasswordInput(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900"
                placeholder="Re-type new password"
              />
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Key className="w-4 h-4" />
              <span>Reset &amp; Update Password</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 4: NOTIFICATIONS */}
      {profileTab === 'notifications' && (
        <form
          onSubmit={handleSaveProfile}
          className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5"
        >
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-600" />
              <span>Notification Channels &amp; Lead Inbound Alerts</span>
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
                  onClick={() =>
                    setNotifications({
                      ...notifications,
                      [item.key]: !isChecked
                    })
                  }
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {item.title}
                      </h4>
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
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
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

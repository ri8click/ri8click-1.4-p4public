import React, { useState, useRef } from 'react';
import {
  ShieldCheck,
  UserPlus,
  BadgeCheck,
  Check,
  X,
  Edit3,
  Trash2,
  Key,
  Search,
  Building2,
  CheckCircle2,
  Upload,
  Camera,
  User
} from 'lucide-react';
import {
  UserAccount,
  PAKISTAN_AGENT_AVATARS
} from '../data/defaultAccounts';

interface AdminRolesManagerProps {
  currentUser: UserAccount;
  allUsers: UserAccount[];
  onUpdateAllUsers: (users: UserAccount[]) => void;
  onUpdateCurrentUser?: (user: UserAccount) => void;
}

export const AdminRolesManager: React.FC<AdminRolesManagerProps> = ({
  currentUser,
  allUsers,
  onUpdateAllUsers,
  onUpdateCurrentUser
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [editingUser, setEditingUser] = useState<UserAccount | null>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const editAvatarFileInputRef = useRef<HTMLInputElement | null>(null);
  const newAvatarFileInputRef = useRef<HTMLInputElement | null>(null);

  const [newUserName, setNewUserName] = useState('');
  const [newUserUsername, setNewUserUsername] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('agent123');
  const [newUserRole, setNewUserRole] = useState<
    'admin' | 'agency' | 'customer'
  >('agency');
  const [newUserIsCertified, setNewUserIsCertified] = useState(true);
  const [newUserLicense, setNewUserLicense] = useState('RDA-CERT-2026-');
  const [newUserAgency, setNewUserAgency] = useState(
    'Al-Mairaj Real Estate & Builders'
  );
  const [newUserPhone, setNewUserPhone] = useState('+92 336 5666727');
  const [newUserAvatar, setNewUserAvatar] = useState(
    PAKISTAN_AGENT_AVATARS.malikZeeshan
  );

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  const presetAvatars = [
    PAKISTAN_AGENT_AVATARS.adminPrincipal,
    PAKISTAN_AGENT_AVATARS.malikZeeshan,
    PAKISTAN_AGENT_AVATARS.chaudhryBilal,
    PAKISTAN_AGENT_AVATARS.engrHarisFarooq,
    PAKISTAN_AGENT_AVATARS.hajiAslamKhan,
    PAKISTAN_AGENT_AVATARS.mianAhmed,
    PAKISTAN_AGENT_AVATARS.tariqMehmood
  ];

  const systemCapabilities = [
    {
      id: 'manage_all_posts',
      label: 'Manage All Agency Posts & Listings',
      desc: 'Can edit, approve, or delete listings created by ANY agent.'
    },
    {
      id: 'create_listings',
      label: 'Create & Manage Own Agency Listings',
      desc: 'Can post and manage properties under their own agency account.'
    },
    {
      id: 'manage_advibe',
      label: 'Manage AdVibe Mega-Projects & 3D Tours',
      desc: 'Access to 3D virtual tour configuration and campaign settings.'
    },
    {
      id: 'manage_banners',
      label: 'Manage Hero Section & Portfolio Deck',
      desc: 'Create, reorder, and update Hero Banner & Portfolio Deck slides.'
    },
    {
      id: 'manage_portions',
      label: 'Manage Dynamic Homepage Components',
      desc: 'Add, update, reorder, and enable/disable website layout sections.'
    },
    {
      id: 'manage_blogs',
      label: 'Publish Real Estate News & Insights',
      desc: 'Create and update market insight articles and blog posts.'
    },
    {
      id: 'manage_locations',
      label: 'Manage City & Society Database',
      desc: 'Add new cities, master-planned housing schemes, and sectors.'
    },
    {
      id: 'system_settings',
      label: 'Full System & Security Privileges',
      desc: 'Unrestricted control over system configuration, roles, and passwords.'
    }
  ];

  const compressImageFile = (
    file: File,
    onDone: (dataUrl: string) => void
  ) => {
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
        onDone(canvas.toDataURL('image/jpeg', 0.86));
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const filteredUsers = allUsers.filter(u => {
    if (roleFilter === 'admin' && u.role !== 'admin') return false;
    if (roleFilter === 'agency' && u.role !== 'agency') return false;
    if (roleFilter === 'customer' && u.role !== 'customer') return false;
    if (roleFilter === 'certified' && !u.isCertifiedAgent) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        (u.companyName && u.companyName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleToggleCertification = (userId: string) => {
    const updated = allUsers.map(u => {
      if (u.id === userId) {
        const isNowCertified = !u.isCertifiedAgent;
        return {
          ...u,
          isCertifiedAgent: isNowCertified,
          licenseNumber:
            isNowCertified && !u.licenseNumber
              ? `RDA-CERT-${Date.now().toString().slice(-4)}`
              : u.licenseNumber
        };
      }
      return u;
    });

    onUpdateAllUsers(updated);
    showFeedback('User certification status updated and synced globally.');
  };

  const handleTogglePermission = (permissionId: string) => {
    if (!editingUser) return;
    const currentPerms = editingUser.permissions || [];
    const exists = currentPerms.includes(permissionId);
    const updatedPerms = exists
      ? currentPerms.filter(p => p !== permissionId)
      : [...currentPerms, permissionId];

    setEditingUser({
      ...editingUser,
      permissions: updatedPerms
    });
  };

  const handleSaveEditedUser = () => {
    if (!editingUser) return;
    const updated = allUsers.map(u =>
      u.id === editingUser.id ? editingUser : u
    );
    onUpdateAllUsers(updated);

    if (currentUser.id === editingUser.id && onUpdateCurrentUser) {
      onUpdateCurrentUser(editingUser);
    }

    setEditingUser(null);
    showFeedback(
      `Saved profile, photo, role & permissions for "${editingUser.name}".`
    );
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserUsername || !newUserName || !newUserEmail) return;

    const newUser: UserAccount = {
      id: `user-${Date.now()}`,
      name: newUserName,
      username: newUserUsername.toLowerCase().trim(),
      email: newUserEmail.toLowerCase().trim(),
      password: newUserPassword || 'agent123',
      role: newUserRole,
      isCertifiedAgent: newUserRole === 'customer' ? false : newUserIsCertified,
      licenseNumber:
        newUserLicense || `RDA-CERT-${Date.now().toString().slice(-4)}`,
      companyName:
        newUserRole === 'customer' ? 'Portal Visitor / Investor' : newUserAgency,
      avatar: newUserAvatar || PAKISTAN_AGENT_AVATARS.malikZeeshan,
      phone: newUserPhone || '+92 336 5666727',
      whatsapp: newUserPhone || '+92 336 5666727',
      memberSince: 'November 2026',
      permissions:
        newUserRole === 'admin'
          ? [
              'all',
              'manage_all_posts',
              'manage_agencies',
              'manage_advibe',
              'manage_banners',
              'manage_portions',
              'system_settings'
            ]
          : newUserRole === 'agency'
            ? ['create_listings', 'manage_advibe']
            : ['view_listings', 'save_listings', 'schedule_tours']
    };

    const updated = [...allUsers, newUser];
    onUpdateAllUsers(updated);

    setIsAddingUser(false);
    setNewUserName('');
    setNewUserUsername('');
    setNewUserEmail('');
    showFeedback(
      `New ${newUserRole.toUpperCase()} account "${newUser.name}" created and synced globally.`
    );
  };

  const handleDeleteUser = (userId: string) => {
    if (userId === currentUser.id) {
      alert('You cannot delete your own active administrator account.');
      return;
    }

    if (
      window.confirm('Are you sure you want to revoke and delete this account?')
    ) {
      const updated = allUsers.filter(u => u.id !== userId);
      onUpdateAllUsers(updated);
      showFeedback('User account removed.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Role Architecture Cards: Super Admin, Agency User, Visitor */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-slate-900 to-purple-950 text-white p-4 rounded-2xl border border-purple-500/30 shadow-md space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-400 text-slate-950">
              Tier 1 Authority
            </span>
            <ShieldCheck className="w-5 h-5 text-amber-400" />
          </div>
          <h4 className="text-sm font-black">Super Admin</h4>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Unrestricted global control over Hero Portfolio Deck, all agency posts, user roles, passwords, cities/societies, and website sections.
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-4 rounded-2xl border border-blue-500/30 shadow-md space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-400 text-slate-950">
              Tier 2 Authority
            </span>
            <Building2 className="w-5 h-5 text-emerald-400" />
          </div>
          <h4 className="text-sm font-black">Certified Agency User</h4>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Verified regional brokerage authority. Can post properties with photos/videos, manage agency listings, and customize agency profile &amp; avatar.
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-4 rounded-2xl border border-slate-700 shadow-md space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-sky-400 text-slate-950">
              Tier 3 Authority
            </span>
            <User className="w-5 h-5 text-sky-400" />
          </div>
          <h4 className="text-sm font-black">Visitor / Customer</h4>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Public &amp; registered buyer role. Can explore 360° tours, save favorite properties, book site tours, and contact agents via WhatsApp.
          </p>
        </div>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: `All Accounts (${allUsers.length})` },
            {
              id: 'admin',
              label: `Super Admins (${allUsers.filter(u => u.role === 'admin').length})`
            },
            {
              id: 'agency',
              label: `Agency Users (${allUsers.filter(u => u.role === 'agency').length})`
            },
            {
              id: 'customer',
              label: `Visitors / Customers (${allUsers.filter(u => u.role === 'customer').length})`
            }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setRoleFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                roleFilter === tab.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search user, role, agency..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
            />
          </div>
          <button
            type="button"
            onClick={() => setIsAddingUser(true)}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3.5">User Profile &amp; Photo</th>
                <th className="px-4 py-3.5">Role Authority</th>
                <th className="px-4 py-3.5">Certification</th>
                <th className="px-4 py-3.5">Company &amp; Contact</th>
                <th className="px-4 py-3.5">Login Password</th>
                <th className="px-4 py-3.5 text-right">Edit Profile &amp; Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map(user => {
                const isAdmin = user.role === 'admin';
                const isAgency = user.role === 'agency';
                const isCert = user.isCertifiedAgent;

                return (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            user.avatar ||
                            PAKISTAN_AGENT_AVATARS.adminPrincipal
                          }
                          alt={user.name}
                          className="w-10 h-10 rounded-xl object-cover object-top border border-slate-200 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{user.name}</span>
                            {isCert && (
                              <BadgeCheck className="w-3.5 h-3.5 text-amber-500 fill-amber-100" />
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            @{user.username} • {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      {isAdmin ? (
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-black bg-purple-100 text-purple-700 border border-purple-200">
                          SUPER ADMIN
                        </span>
                      ) : isAgency ? (
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-100 text-blue-700 border border-blue-200">
                          AGENCY USER
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          VISITOR / CUSTOMER
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3.5">
                      <button
                        type="button"
                        onClick={() => handleToggleCertification(user.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          isCert
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        <BadgeCheck
                          className={`w-3.5 h-3.5 ${
                            isCert ? 'text-emerald-600' : 'text-slate-400'
                          }`}
                        />
                        <span>{isCert ? 'Certified' : 'Standard'}</span>
                      </button>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-slate-800">
                        {user.companyName || 'Independent'}
                      </div>
                      <div className="text-[10.5px] text-slate-500">
                        {user.phone || '+92 336 5666727'} •{' '}
                        {user.licenseNumber || 'No License'}
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Key className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <code className="font-mono font-bold text-xs bg-amber-50 text-amber-900 border border-amber-200/80 px-2 py-0.5 rounded">
                          {user.password || 'admin123'}
                        </code>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingUser({ ...user })}
                          className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                          title="Edit User Profile, Photo, Role & Permissions"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Profile &amp; Role</span>
                        </button>

                        {user.id !== currentUser.id && (
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                            title="Delete User"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: FULL EDIT USER PROFILE, PHOTO, ROLE & PERMISSIONS */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={
                    editingUser.avatar || PAKISTAN_AGENT_AVATARS.adminPrincipal
                  }
                  alt={editingUser.name}
                  className="w-10 h-10 rounded-xl object-cover border border-amber-400"
                />
                <div>
                  <h4 className="font-bold text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    <span>
                      Edit User Profile, Photo &amp; Authority: {editingUser.name}
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    @{editingUser.username} • {editingUser.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              {/* Photo Upload Section */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <label className="block text-slate-800 font-bold">
                  Profile Photo (Upload Local Photo or Select Regional Portrait)
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <input
                    ref={editAvatarFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        compressImageFile(file, dataUrl => {
                          setEditingUser(prev =>
                            prev ? { ...prev, avatar: dataUrl } : null
                          );
                        });
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => editAvatarFileInputRef.current?.click()}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Upload Photo</span>
                  </button>
                  <input
                    type="text"
                    value={editingUser.avatar || ''}
                    onChange={e =>
                      setEditingUser({ ...editingUser, avatar: e.target.value })
                    }
                    placeholder="Or paste image URL..."
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-mono"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10.5px] text-slate-500 font-semibold">
                    Quick Regional Presets:
                  </span>
                  {presetAvatars.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setEditingUser({ ...editingUser, avatar: url })
                      }
                      className={`w-8 h-8 rounded-lg overflow-hidden border-2 cursor-pointer ${
                        editingUser.avatar === url
                          ? 'border-blue-600 scale-110'
                          : 'border-slate-300 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={url}
                        alt="Preset"
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal & Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={e =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={editingUser.username}
                    onChange={e =>
                      setEditingUser({
                        ...editingUser,
                        username: e.target.value
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={e =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Login Password
                  </label>
                  <input
                    type="text"
                    value={editingUser.password}
                    onChange={e =>
                      setEditingUser({
                        ...editingUser,
                        password: e.target.value
                      })
                    }
                    className="w-full bg-amber-50 border border-amber-300 rounded-xl px-3 py-2 text-slate-900 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Company / Agency Name
                  </label>
                  <input
                    type="text"
                    value={editingUser.companyName || ''}
                    onChange={e =>
                      setEditingUser({
                        ...editingUser,
                        companyName: e.target.value
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Designation / Title
                  </label>
                  <input
                    type="text"
                    value={editingUser.designation || ''}
                    onChange={e =>
                      setEditingUser({
                        ...editingUser,
                        designation: e.target.value
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={editingUser.phone || ''}
                    onChange={e =>
                      setEditingUser({ ...editingUser, phone: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={editingUser.whatsapp || ''}
                    onChange={e =>
                      setEditingUser({
                        ...editingUser,
                        whatsapp: e.target.value
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              {/* Role & Certification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Account Role Authority
                  </label>
                  <select
                    value={editingUser.role}
                    onChange={e =>
                      setEditingUser({
                        ...editingUser,
                        role: e.target.value as any
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-bold"
                  >
                    <option value="admin">
                      Super Administrator (Full Master Privileges)
                    </option>
                    <option value="agency">
                      Agency User / Certified Agent
                    </option>
                    <option value="customer">
                      Visitor / Customer / Buyer
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Certification Status
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingUser({
                        ...editingUser,
                        isCertifiedAgent: !editingUser.isCertifiedAgent
                      })
                    }
                    className={`w-full py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                      editingUser.isCertifiedAgent
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : 'bg-slate-50 text-slate-600 border-slate-300'
                    }`}
                  >
                    <BadgeCheck className="w-4 h-4 text-emerald-600" />
                    <span>
                      {editingUser.isCertifiedAgent
                        ? 'Certified Agent Verified'
                        : 'Standard Unverified'}
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Regulatory License / Accreditation No.
                </label>
                <input
                  type="text"
                  value={editingUser.licenseNumber || ''}
                  onChange={e =>
                    setEditingUser({
                      ...editingUser,
                      licenseNumber: e.target.value
                    })
                  }
                  placeholder="RDA-CONSORTIUM-ADM-001"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono text-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-2">
                  Granular Role Capabilities
                </label>
                <div className="space-y-2">
                  {systemCapabilities.map(cap => {
                    const isGranted =
                      (editingUser.permissions || []).includes(cap.id) ||
                      editingUser.role === 'admin';

                    return (
                      <div
                        key={cap.id}
                        onClick={() => {
                          if (editingUser.role !== 'admin') {
                            handleTogglePermission(cap.id);
                          }
                        }}
                        className={`p-3 rounded-xl border flex items-start justify-between gap-3 cursor-pointer transition-all ${
                          isGranted
                            ? 'bg-blue-50/60 border-blue-200'
                            : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-slate-900">
                            {cap.label}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {cap.desc}
                          </div>
                        </div>

                        <input
                          type="checkbox"
                          checked={isGranted}
                          disabled={editingUser.role === 'admin'}
                          onChange={() => {}}
                          className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 pointer-events-none mt-0.5"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 rounded-xl text-slate-700 hover:bg-slate-200 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEditedUser}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Save User Profile, Photo &amp; Permissions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD NEW USER ACCOUNT */}
      {isAddingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
              <h4 className="font-bold text-sm flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-blue-400" />
                <span>Provision New User Account (Admin / Agency / Visitor)</span>
              </h4>
              <button
                onClick={() => setIsAddingUser(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleCreateUser}
              className="p-5 space-y-4 text-xs max-h-[75vh] overflow-y-auto"
            >
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={e => setNewUserName(e.target.value)}
                  placeholder="e.g. Tariq Mehmood"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={newUserUsername}
                    onChange={e => setNewUserUsername(e.target.value)}
                    placeholder="tariq"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={newUserEmail}
                    onChange={e => setNewUserEmail(e.target.value)}
                    placeholder="tariq@ri8click.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Role Authority
                  </label>
                  <select
                    value={newUserRole}
                    onChange={e => setNewUserRole(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-bold"
                  >
                    <option value="agency">Agency / Certified Agent</option>
                    <option value="admin">Super Administrator</option>
                    <option value="customer">Visitor / Customer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Default Password
                  </label>
                  <input
                    type="text"
                    required
                    value={newUserPassword}
                    onChange={e => setNewUserPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Brokerage Agency Affiliation
                  </label>
                  <input
                    type="text"
                    value={newUserAgency}
                    onChange={e => setNewUserAgency(e.target.value)}
                    placeholder="Al-Mairaj Builders"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={newUserPhone}
                    onChange={e => setNewUserPhone(e.target.value)}
                    placeholder="+92 336 5666727"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <label className="block text-slate-700 font-bold">
                  Profile Photo
                </label>
                <div className="flex items-center gap-2">
                  <input
                    ref={newAvatarFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        compressImageFile(file, dataUrl =>
                          setNewUserAvatar(dataUrl)
                        );
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => newAvatarFileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Photo</span>
                  </button>
                  <div className="flex items-center gap-1.5 overflow-x-auto">
                    {presetAvatars.map((url, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setNewUserAvatar(url)}
                        className={`w-7 h-7 rounded-lg overflow-hidden border-2 shrink-0 cursor-pointer ${
                          newUserAvatar === url
                            ? 'border-blue-600 scale-110'
                            : 'border-slate-300 opacity-75'
                        }`}
                      >
                        <img
                          src={url}
                          alt="Preset"
                          className="w-full h-full object-cover object-top"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <input
                  type="checkbox"
                  id="certCheck"
                  checked={newUserIsCertified}
                  onChange={e => setNewUserIsCertified(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="certCheck"
                  className="text-slate-800 font-bold cursor-pointer"
                >
                  Assign &quot;Certified Agent&quot; Status &amp; Verified License Badge
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddingUser(false)}
                  className="px-4 py-2 rounded-xl text-slate-700 hover:bg-slate-200 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  Provision Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRolesManager;

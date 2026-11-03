import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  ShieldAlert, 
  UserPlus, 
  BadgeCheck, 
  Award, 
  Check, 
  X, 
  Edit3, 
  Trash2, 
  Key, 
  Search, 
  Filter, 
  Lock, 
  Building2, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { UserAccount } from '../data/defaultAccounts';

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

  // New User Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserUsername, setNewUserUsername] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('agent123');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'agency' | 'customer'>('agency');
  const [newUserIsCertified, setNewUserIsCertified] = useState(true);
  const [newUserLicense, setNewUserLicense] = useState('RDA-CERT-2026-');
  const [newUserAgency, setNewUserAgency] = useState('ZEM Builders');

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  const isSuperAdmin = currentUser.role === 'admin';

  // Available Capabilities in system
  const systemCapabilities = [
    { id: 'manage_all_posts', label: 'Manage All Agency Posts & Listings', desc: 'Can edit, approve, or delete listings created by ANY agent.' },
    { id: 'manage_own_posts', label: 'Manage Own Agency Listings', desc: 'Can create and manage listings under their own agency account.' },
    { id: 'manage_advibe', label: 'Manage AdVibe Mega-Projects & 3D Tours', desc: 'Access to 3D virtual tour configuration and campaign settings.' },
    { id: 'manage_portions', label: 'Manage Dynamic Homepage Components', desc: 'Add, update, reorder, and enable/disable website layout sections.' },
    { id: 'manage_banners', label: 'Manage Hero Banners & Slider Media', desc: 'Create and update architectural background banners.' },
    { id: 'manage_blogs', label: 'Publish Real Estate News & Insights', desc: 'Create and update market insight articles and blog posts.' },
    { id: 'manage_locations', label: 'Manage City & Society Database', desc: 'Add new cities, master-planned housing schemes, and sectors.' },
    { id: 'system_settings', label: 'Full System & Security Privileges', desc: 'Unrestricted control over system configuration, roles, and passwords.' }
  ];

  // Filtered Users
  const filteredUsers = allUsers.filter(u => {
    if (roleFilter === 'admin' && u.role !== 'admin') return false;
    if (roleFilter === 'certified' && !u.isCertifiedAgent) return false;
    if (roleFilter === 'agency' && u.role !== 'agency') return false;

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

  // Toggle Certification status for a user
  const handleToggleCertification = (userId: string) => {
    const updated = allUsers.map(u => {
      if (u.id === userId) {
        const isNowCertified = !u.isCertifiedAgent;
        return {
          ...u,
          isCertifiedAgent: isNowCertified,
          licenseNumber: isNowCertified && !u.licenseNumber ? `RDA-CERT-${Date.now().toString().slice(-4)}` : u.licenseNumber
        };
      }
      return u;
    });

    onUpdateAllUsers(updated);
    try {
      localStorage.setItem('ri8click_user_accounts', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    showFeedback('Agent certification status updated successfully.');
  };

  // Toggle specific permission
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

  // Save edited user
  const handleSaveEditedUser = () => {
    if (!editingUser) return;
    const updated = allUsers.map(u => u.id === editingUser.id ? editingUser : u);
    onUpdateAllUsers(updated);

    if (currentUser.id === editingUser.id && onUpdateCurrentUser) {
      onUpdateCurrentUser(editingUser);
    }

    try {
      localStorage.setItem('ri8click_user_accounts', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setEditingUser(null);
    showFeedback(`Saved user permissions for "${editingUser.name}".`);
  };

  // Handle Add New User
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
      isCertifiedAgent: newUserIsCertified,
      licenseNumber: newUserLicense || `RDA-CERT-${Date.now().toString().slice(-4)}`,
      companyName: newUserAgency,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
      phone: '+92 336 5666727',
      whatsapp: '+92 336 5666727',
      memberSince: 'September 2026',
      permissions: newUserRole === 'admin' 
        ? ['all', 'manage_all_posts', 'manage_agencies', 'manage_advibe', 'manage_portions', 'system_settings']
        : newUserIsCertified 
          ? ['manage_own_posts', 'manage_advibe', 'certified_badge']
          : ['manage_own_posts']
    };

    const updated = [...allUsers, newUser];
    onUpdateAllUsers(updated);
    try {
      localStorage.setItem('ri8click_user_accounts', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setIsAddingUser(false);
    setNewUserName('');
    setNewUserUsername('');
    setNewUserEmail('');
    showFeedback(`New user account "${newUser.name}" created with default credentials.`);
  };

  // Delete User
  const handleDeleteUser = (userId: string) => {
    if (userId === currentUser.id) {
      alert('You cannot delete your own active administrator account.');
      return;
    }

    if (confirm('Are you sure you want to revoke and delete this account?')) {
      const updated = allUsers.filter(u => u.id !== userId);
      onUpdateAllUsers(updated);
      try {
        localStorage.setItem('ri8click_user_accounts', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      showFeedback('User account removed.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-5 sm:p-6 rounded-2xl border border-slate-700 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-amber-400 text-slate-950">
              Role & Privilege Engine
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Flex-Home Inspired RBAC
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <span>Super Admin & Certified Agent Governance</span>
          </h3>
          <p className="text-xs text-slate-300 max-w-xl mt-1">
            Enforce granular access levels. <strong>Super Admins</strong> control all agency posts, system parameters, and dynamic sections. <strong>Certified Agents</strong> have verified license badges and manage their dedicated portfolios.
          </p>
        </div>

        {isSuperAdmin && (
          <button
            onClick={() => setIsAddingUser(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0 self-start sm:self-center"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Agent / Admin</span>
          </button>
        )}
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Certified Agent Access & Default Passwords Overview Card */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Certified Agent Portal Access & Default Passwords
              </h4>
              <p className="text-xs text-slate-600">
                Certified agents use their respective login credentials below to access their dedicated panel to post property ads and view listings.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-amber-900 bg-amber-200/70 px-2.5 py-1 rounded-full border border-amber-300 self-start sm:self-auto">
            Active Verified Credentials
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {allUsers.filter(u => u.isCertifiedAgent || u.role === 'agency').map(agent => (
            <div key={agent.id} className="bg-white rounded-xl p-3 border border-amber-200/60 shadow-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs truncate">{agent.name}</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 font-bold px-1.5 py-0.5 rounded">Verified</span>
              </div>
              <div className="text-[11px] text-slate-500 truncate">{agent.companyName}</div>
              <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">User: <strong className="text-slate-800 font-mono">{agent.username}</strong></span>
                <span className="text-slate-500">Pass: <code className="bg-amber-100 text-amber-900 font-mono font-bold px-1.5 py-0.5 rounded text-xs">{agent.password}</code></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search agents by name, email, company..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {[
            { key: 'all', label: `All Users (${allUsers.length})` },
            { key: 'admin', label: `Super Admins (${allUsers.filter(u => u.role === 'admin').length})` },
            { key: 'certified', label: `Certified Agents (${allUsers.filter(u => u.isCertifiedAgent).length})` },
            { key: 'agency', label: 'All Agencies' }
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setRoleFilter(f.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                roleFilter === f.key
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* User Accounts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3.5">User / Agent</th>
                <th className="px-4 py-3.5">System Role</th>
                <th className="px-4 py-3.5">Certification Status</th>
                <th className="px-4 py-3.5">Listing Permissions</th>
                <th className="px-4 py-3.5">Brokerage Affiliation</th>
                <th className="px-4 py-3.5">Default Password</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map(user => {
                const isAdmin = user.role === 'admin';
                const isCert = user.isCertifiedAgent;
                const canManageAll = isAdmin || (user.permissions && user.permissions.includes('manage_all_posts'));

                return (
                  <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                          alt={user.name}
                          className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{user.name}</span>
                            {isCert && (
                              <BadgeCheck className="w-3.5 h-3.5 text-amber-500 fill-amber-100" />
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
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
                      ) : (
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-100 text-blue-700 border border-blue-200">
                          {user.role.toUpperCase()}
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3.5">
                      <button
                        type="button"
                        onClick={() => handleToggleCertification(user.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                          isCert
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Click to toggle Certified Agent badge"
                      >
                        <BadgeCheck className={`w-3.5 h-3.5 ${isCert ? 'text-emerald-600' : 'text-slate-400'}`} />
                        <span>{isCert ? 'Certified Agent' : 'Standard Agent'}</span>
                      </button>
                    </td>

                    <td className="px-4 py-3.5">
                      {canManageAll ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>All Other Posts & Listings</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          <span>Own Listings Only</span>
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="font-medium text-slate-800">
                        {user.companyName || 'Independent'}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {user.licenseNumber || 'License Pending'}
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Key className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <code className="font-mono font-bold text-xs bg-amber-50 text-amber-900 border border-amber-200/80 px-2 py-0.5 rounded">
                          {user.password || 'agent123'}
                        </code>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {user.role === 'admin' ? 'Super Admin Console' : isCert ? 'Agent Panel Access' : 'Portal Access'}
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingUser(user)}
                          className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                          title="Edit Permissions & Privileges"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        {user.id !== currentUser.id && (
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
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

      {/* MODAL: EDIT USER PERMISSIONS */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden">
            <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>Configure Role Privileges: {editingUser.name}</span>
                </h4>
                <p className="text-[11px] text-slate-400">@{editingUser.username} • {editingUser.email}</p>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Account Role</label>
                  <select
                    value={editingUser.role}
                    onChange={e => setEditingUser({ ...editingUser, role: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                  >
                    <option value="admin">Super Administrator (Full Master Privileges)</option>
                    <option value="agency">Agency / Certified Agent</option>
                    <option value="customer">Customer / Buyer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Certification Status</label>
                  <button
                    type="button"
                    onClick={() => setEditingUser({ ...editingUser, isCertifiedAgent: !editingUser.isCertifiedAgent })}
                    className={`w-full py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all ${
                      editingUser.isCertifiedAgent
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : 'bg-slate-50 text-slate-600 border-slate-300'
                    }`}
                  >
                    <BadgeCheck className="w-4 h-4 text-emerald-600" />
                    <span>{editingUser.isCertifiedAgent ? 'Certified Agent' : 'Standard Unverified'}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Regulatory License / Accreditation No.</label>
                <input
                  type="text"
                  value={editingUser.licenseNumber || ''}
                  onChange={e => setEditingUser({ ...editingUser, licenseNumber: e.target.value })}
                  placeholder="RDA-CONSORTIUM-ADM-001"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono text-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-2">Granular Role Capabilities</label>
                <div className="space-y-2">
                  {systemCapabilities.map(cap => {
                    const isGranted = (editingUser.permissions || []).includes(cap.id) || editingUser.role === 'admin';

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
                          <div className="font-bold text-slate-900">{cap.label}</div>
                          <div className="text-[11px] text-slate-500">{cap.desc}</div>
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
                className="px-4 py-2 rounded-xl text-slate-700 hover:bg-slate-200 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEditedUser}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md"
              >
                Save User Permissions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD NEW AGENT / ADMIN */}
      {isAddingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
              <h4 className="font-bold text-sm flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-blue-400" />
                <span>Provision New Agent / Admin Account</span>
              </h4>
              <button
                onClick={() => setIsAddingUser(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Full Name</label>
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
                  <label className="block text-slate-700 font-bold mb-1">Username</label>
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
                  <label className="block text-slate-700 font-bold mb-1">Email</label>
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
                  <label className="block text-slate-700 font-bold mb-1">Role</label>
                  <select
                    value={newUserRole}
                    onChange={e => setNewUserRole(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                  >
                    <option value="agency">Agency / Certified Agent</option>
                    <option value="admin">Super Administrator</option>
                    <option value="customer">Buyer / Customer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Default Password</label>
                  <input
                    type="text"
                    required
                    value={newUserPassword}
                    onChange={e => setNewUserPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Brokerage Agency Affiliation</label>
                <input
                  type="text"
                  value={newUserAgency}
                  onChange={e => setNewUserAgency(e.target.value)}
                  placeholder="ZEM Builders / Multi Group"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <input
                  type="checkbox"
                  id="certCheck"
                  checked={newUserIsCertified}
                  onChange={e => setNewUserIsCertified(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <label htmlFor="certCheck" className="text-slate-800 font-bold cursor-pointer">
                  Assign "Certified Agent" Status & Verified License Badge
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddingUser(false)}
                  className="px-4 py-2 rounded-xl text-slate-700 hover:bg-slate-200 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md"
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

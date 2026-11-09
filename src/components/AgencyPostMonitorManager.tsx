import React, { useState, useRef } from 'react';
import {
  Building2,
  ShieldCheck,
  Plus,
  Search,
  Edit3,
  Save,
  X,
  Phone,
  UserCheck,
  Camera
} from 'lucide-react';
import { AgencyAccount, Property } from '../types';
import { PAKISTAN_AGENT_AVATARS } from '../data/defaultAccounts';
import { resolvePakistanAgentAvatar } from './AgenciesSection';

interface AgencyPostMonitorManagerProps {
  agencies: AgencyAccount[];
  properties: Property[];
  onUpdateAgencyLimit: (agencyId: string, newLimit: number) => void;
  onAddNewAgency?: (agency: AgencyAccount) => void;
  onUpdateAgencies?: (agencies: AgencyAccount[]) => void;
}

export const AgencyPostMonitorManager: React.FC<
  AgencyPostMonitorManagerProps
> = ({
  agencies,
  properties,
  onUpdateAgencyLimit,
  onAddNewAgency,
  onUpdateAgencies
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAgency, setEditingAgency] = useState<AgencyAccount | null>(
    null
  );
  const [isAddingAgency, setIsAddingAgency] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [newAgencyForm, setNewAgencyForm] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '+92 336 5666727',
    whatsapp: '923365666727',
    city: 'Taxila',
    primarySociety: 'Faisal Hills',
    postLimit: 25,
    avatar: PAKISTAN_AGENT_AVATARS.malikZeeshan,
    role: 'agency' as const
  });

  const filteredAgencies = agencies.filter(
    a =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.primarySociety || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePhotoUpload = (
    file: File | undefined,
    onDone: (dataUrl: string) => void
  ) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 500;
        let w = img.width;
        let h = img.height;
        if (w > h && w > MAX_SIZE) {
          h = Math.round((h * MAX_SIZE) / w);
          w = MAX_SIZE;
        } else if (h > MAX_SIZE) {
          w = Math.round((w * MAX_SIZE) / h);
          h = MAX_SIZE;
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

  const handleSaveEditedAgency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAgency) return;

    if (onUpdateAgencies) {
      const updated = agencies.map(a =>
        a.id === editingAgency.id
          ? {
              ...editingAgency,
              logo: editingAgency.avatar || editingAgency.logo
            }
          : a
      );
      onUpdateAgencies(updated);
    } else {
      onUpdateAgencyLimit(editingAgency.id, editingAgency.postLimit);
    }
    setEditingAgency(null);
  };

  const handleCreateAgency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgencyForm.name || !newAgencyForm.companyName) return;

    const newAgency: AgencyAccount = {
      id: `agency-${Date.now()}`,
      name: newAgencyForm.name,
      companyName: newAgencyForm.companyName,
      role: 'agency',
      email:
        newAgencyForm.email ||
        `${newAgencyForm.name.toLowerCase().replace(/\s+/g, '')}@ri8click.pk`,
      phone: newAgencyForm.phone,
      whatsapp: newAgencyForm.whatsapp.replace(/[^0-9]/g, ''),
      avatar: newAgencyForm.avatar || PAKISTAN_AGENT_AVATARS.malikZeeshan,
      logo: newAgencyForm.avatar || PAKISTAN_AGENT_AVATARS.malikZeeshan,
      verified: true,
      rating: 4.9,
      totalPosts: 0,
      postLimit: newAgencyForm.postLimit || 25,
      activeListings: 0,
      city: newAgencyForm.city,
      primarySociety: newAgencyForm.primarySociety,
      memberSince: new Date().toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      }),
      status: 'active'
    };

    if (onAddNewAgency) {
      onAddNewAgency(newAgency);
    }

    setIsAddingAgency(false);
    setNewAgencyForm({
      name: '',
      companyName: '',
      email: '',
      phone: '+92 336 5666727',
      whatsapp: '923365666727',
      city: 'Taxila',
      primarySociety: 'Faisal Hills',
      postLimit: 25,
      avatar: PAKISTAN_AGENT_AVATARS.malikZeeshan,
      role: 'agency'
    });
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span>Certified Agencies, Quotas &amp; Specialist Profiles</span>
          </h3>
          <p className="text-xs text-slate-500">
            Edit agency details, upload regional specialist portraits, adjust ad limits, and onboard verified Pakistani brokerages.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Filter agencies..."
              className="pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-900 w-44 sm:w-56"
            />
          </div>

          <button
            onClick={() => setIsAddingAgency(true)}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Brokerage</span>
          </button>
        </div>
      </div>

      {/* Add New Agency Card */}
      {isAddingAgency && (
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span>Register New Certified Brokerage</span>
            </h4>
            <button
              onClick={() => setIsAddingAgency(false)}
              className="text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form
            onSubmit={handleCreateAgency}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
          >
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Agent / Principal Name
              </label>
              <input
                type="text"
                required
                value={newAgencyForm.name}
                onChange={e =>
                  setNewAgencyForm({ ...newAgencyForm, name: e.target.value })
                }
                placeholder="e.g. Malik Arshad"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Company / Agency Name
              </label>
              <input
                type="text"
                required
                value={newAgencyForm.companyName}
                onChange={e =>
                  setNewAgencyForm({
                    ...newAgencyForm,
                    companyName: e.target.value
                  })
                }
                placeholder="e.g. Margalla Premier Real Estate"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                City Hub
              </label>
              <input
                type="text"
                value={newAgencyForm.city}
                onChange={e =>
                  setNewAgencyForm({ ...newAgencyForm, city: e.target.value })
                }
                placeholder="Taxila"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Primary Society
              </label>
              <input
                type="text"
                value={newAgencyForm.primarySociety}
                onChange={e =>
                  setNewAgencyForm({
                    ...newAgencyForm,
                    primarySociety: e.target.value
                  })
                }
                placeholder="Faisal Hills"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Phone / WhatsApp
              </label>
              <input
                type="text"
                value={newAgencyForm.phone}
                onChange={e =>
                  setNewAgencyForm({
                    ...newAgencyForm,
                    phone: e.target.value,
                    whatsapp: e.target.value.replace(/[^0-9]/g, '')
                  })
                }
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Initial Post Quota Limit
              </label>
              <input
                type="number"
                min="1"
                max="500"
                value={newAgencyForm.postLimit}
                onChange={e =>
                  setNewAgencyForm({
                    ...newAgencyForm,
                    postLimit: parseInt(e.target.value) || 25
                  })
                }
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white font-bold"
              />
            </div>

            <div className="sm:col-span-2 md:col-span-3 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingAgency(false)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-white border border-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs cursor-pointer"
              >
                Save &amp; Authorize Agency
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Agencies Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10.5px]">
                <th className="py-3 px-4">Agency / Brokerage</th>
                <th className="py-3 px-3">Location Hub</th>
                <th className="py-3 px-3">Contact</th>
                <th className="py-3 px-3 text-center">Active Ads</th>
                <th className="py-3 px-4 text-center">Quota Limit</th>
                <th className="py-3 px-4">Usage Bar</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAgencies.map((agency, idx) => {
                const agencyPropertiesCount = properties.filter(
                  p => p.agencyId === agency.id
                ).length;
                const percentage = Math.min(
                  Math.round((agencyPropertiesCount / agency.postLimit) * 100),
                  100
                );
                const isNearLimit = percentage >= 85;
                const resolvedAvatar = resolvePakistanAgentAvatar(
                  agency.avatar || agency.logo,
                  `${agency.id} ${agency.name} ${agency.companyName}`,
                  idx
                );

                return (
                  <tr
                    key={agency.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={resolvedAvatar}
                          alt={agency.name}
                          className="w-10 h-10 rounded-xl object-cover object-top border border-slate-200"
                        />
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{agency.companyName}</span>
                            {agency.verified && (
                              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {agency.name}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-800">
                        {agency.city}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {agency.primarySociety}
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="text-slate-700 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{agency.phone}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-center font-bold text-slate-900">
                      {agencyPropertiesCount}
                    </td>

                    <td className="py-3 px-4 text-center font-bold text-blue-600">
                      {agency.postLimit}
                    </td>

                    <td className="py-3 px-4">
                      <div className="space-y-1 min-w-[110px]">
                        <div className="flex justify-between text-[10px] font-semibold">
                          <span>
                            {agencyPropertiesCount}/{agency.postLimit}
                          </span>
                          <span
                            className={
                              isNearLimit ? 'text-amber-600' : 'text-slate-500'
                            }
                          >
                            {percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              percentage >= 100
                                ? 'bg-rose-500'
                                : percentage >= 85
                                  ? 'bg-amber-500'
                                  : 'bg-blue-600'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setEditingAgency({ ...agency })}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Agency &amp; Photo</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Agency Profile & Photo Modal */}
      {editingAgency && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
              <h4 className="font-bold text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>Edit Agency Profile, Photo &amp; Quota</span>
              </h4>
              <button
                onClick={() => setEditingAgency(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleSaveEditedAgency}
              className="p-5 space-y-4 text-xs"
            >
              <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <img
                  src={editingAgency.avatar || editingAgency.logo}
                  alt={editingAgency.name}
                  className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-blue-500"
                />
                <div className="flex-1 space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e =>
                      handlePhotoUpload(e.target.files?.[0], dataUrl =>
                        setEditingAgency(prev =>
                          prev
                            ? { ...prev, avatar: dataUrl, logo: dataUrl }
                            : null
                        )
                      )
                    }
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Upload Specialist Photo</span>
                  </button>
                  <input
                    type="text"
                    value={editingAgency.avatar || ''}
                    onChange={e =>
                      setEditingAgency({
                        ...editingAgency,
                        avatar: e.target.value,
                        logo: e.target.value
                      })
                    }
                    placeholder="Or paste photo URL..."
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Specialist / Agent Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingAgency.name}
                    onChange={e =>
                      setEditingAgency({
                        ...editingAgency,
                        name: e.target.value
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingAgency.companyName}
                    onChange={e =>
                      setEditingAgency({
                        ...editingAgency,
                        companyName: e.target.value
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={editingAgency.city}
                    onChange={e =>
                      setEditingAgency({
                        ...editingAgency,
                        city: e.target.value
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Primary Society
                  </label>
                  <input
                    type="text"
                    value={editingAgency.primarySociety}
                    onChange={e =>
                      setEditingAgency({
                        ...editingAgency,
                        primarySociety: e.target.value
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={editingAgency.phone}
                    onChange={e =>
                      setEditingAgency({
                        ...editingAgency,
                        phone: e.target.value,
                        whatsapp: e.target.value.replace(/[^0-9]/g, '')
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Max Ad Quota Limit
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={editingAgency.postLimit}
                    onChange={e =>
                      setEditingAgency({
                        ...editingAgency,
                        postLimit: parseInt(e.target.value) || 25
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingAgency(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Agency Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyPostMonitorManager;

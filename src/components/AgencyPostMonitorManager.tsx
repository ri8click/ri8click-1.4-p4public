import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Plus, 
  Search, 
  Edit3, 
  Save, 
  X, 
  AlertCircle,
  Phone,
  MessageSquare,
  CheckCircle2,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { AgencyAccount, Property } from '../types';

interface AgencyPostMonitorManagerProps {
  agencies: AgencyAccount[];
  properties: Property[];
  onUpdateAgencyLimit: (agencyId: string, newLimit: number) => void;
  onAddNewAgency?: (agency: AgencyAccount) => void;
}

export const AgencyPostMonitorManager: React.FC<AgencyPostMonitorManagerProps> = ({
  agencies,
  properties,
  onUpdateAgencyLimit,
  onAddNewAgency
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAgencyId, setEditingAgencyId] = useState<string | null>(null);
  const [tempLimit, setTempLimit] = useState<number>(10);
  const [isAddingAgency, setIsAddingAgency] = useState(false);

  // New Agency Form State
  const [newAgencyForm, setNewAgencyForm] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '+92 336 5666727',
    whatsapp: '923365666727',
    city: 'Taxila',
    primarySociety: 'Faisal Hills',
    postLimit: 25,
    role: 'agency' as const,
  });

  const filteredAgencies = agencies.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.primarySociety.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartEdit = (agency: AgencyAccount) => {
    setEditingAgencyId(agency.id);
    setTempLimit(agency.postLimit);
  };

  const handleSaveLimit = (agencyId: string) => {
    if (tempLimit >= 1) {
      onUpdateAgencyLimit(agencyId, tempLimit);
    }
    setEditingAgencyId(null);
  };

  const handleCreateAgency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgencyForm.name || !newAgencyForm.companyName) return;

    const newAgency: AgencyAccount = {
      id: `agency-${Date.now()}`,
      name: newAgencyForm.name,
      companyName: newAgencyForm.companyName,
      role: 'agency',
      email: newAgencyForm.email || `${newAgencyForm.name.toLowerCase().replace(/\s+/g, '')}@ri8click.pk`,
      phone: newAgencyForm.phone,
      whatsapp: newAgencyForm.whatsapp,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      verified: true,
      rating: 4.9,
      totalPosts: 0,
      postLimit: newAgencyForm.postLimit || 25,
      activeListings: 0,
      city: newAgencyForm.city,
      primarySociety: newAgencyForm.primarySociety,
      memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
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
      role: 'agency',
    });
  };

  return (
    <div className="p-5 sm:p-6 space-y-6 overflow-y-auto max-h-[calc(96vh-120px)]">
      {/* Header with Search and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span>Multi-Agent Quotas & Post Monitor</span>
          </h3>
          <p className="text-xs text-slate-500">
            Control maximum allowed advertisements, monitor real-time utilization, and onboard verified brokerages.
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
              className="pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-900 focus:outline-hidden focus:border-blue-600 w-44 sm:w-56"
            />
          </div>

          <button
            onClick={() => setIsAddingAgency(true)}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Brokerage</span>
          </button>
        </div>
      </div>

      {/* Modal / Card for Adding New Agency */}
      {isAddingAgency && (
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span>Register New Certified Brokerage</span>
            </h4>
            <button
              onClick={() => setIsAddingAgency(false)}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleCreateAgency} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Agent / Principal Name</label>
              <input
                type="text"
                required
                value={newAgencyForm.name}
                onChange={e => setNewAgencyForm({ ...newAgencyForm, name: e.target.value })}
                placeholder="e.g. Malik Arshad"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Company / Agency Name</label>
              <input
                type="text"
                required
                value={newAgencyForm.companyName}
                onChange={e => setNewAgencyForm({ ...newAgencyForm, companyName: e.target.value })}
                placeholder="e.g. Margalla Premier Real Estate"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">City Hub</label>
              <input
                type="text"
                value={newAgencyForm.city}
                onChange={e => setNewAgencyForm({ ...newAgencyForm, city: e.target.value })}
                placeholder="Taxila"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Primary Society</label>
              <input
                type="text"
                value={newAgencyForm.primarySociety}
                onChange={e => setNewAgencyForm({ ...newAgencyForm, primarySociety: e.target.value })}
                placeholder="Faisal Hills"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Phone / WhatsApp</label>
              <input
                type="text"
                value={newAgencyForm.phone}
                onChange={e => setNewAgencyForm({ ...newAgencyForm, phone: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Initial Post Quota Limit</label>
              <input
                type="number"
                min="1"
                max="500"
                value={newAgencyForm.postLimit}
                onChange={e => setNewAgencyForm({ ...newAgencyForm, postLimit: parseInt(e.target.value) || 20 })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white font-bold"
              />
            </div>

            <div className="sm:col-span-2 md:col-span-3 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingAgency(false)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-white border border-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs"
              >
                Save & Authorize Agency
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
              {filteredAgencies.map((agency) => {
                const agencyPropertiesCount = properties.filter(p => p.agencyId === agency.id).length;
                const percentage = Math.min(Math.round((agencyPropertiesCount / agency.postLimit) * 100), 100);
                const isNearLimit = percentage >= 85;
                const isEditing = editingAgencyId === agency.id;

                return (
                  <tr key={agency.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={agency.avatar}
                          alt={agency.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{agency.companyName}</span>
                            {agency.verified && (
                              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500">{agency.name}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-800">{agency.city}</div>
                      <div className="text-[11px] text-slate-500">{agency.primarySociety}</div>
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

                    <td className="py-3 px-4 text-center">
                      {isEditing ? (
                        <div className="inline-flex items-center gap-1.5">
                          <input
                            type="number"
                            min="1"
                            max="500"
                            value={tempLimit}
                            onChange={e => setTempLimit(parseInt(e.target.value) || 1)}
                            className="w-16 px-2 py-1 rounded border border-blue-500 text-xs font-bold text-center bg-white"
                          />
                          <button
                            onClick={() => handleSaveLimit(agency.id)}
                            className="p-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                            title="Save"
                          >
                            <Save className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className="font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                          {agency.postLimit} max
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 w-40">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-semibold text-slate-600">
                          <span>{agencyPropertiesCount}/{agency.postLimit}</span>
                          <span className={isNearLimit ? 'text-amber-600' : 'text-slate-500'}>{percentage}%</span>
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
                      {!isEditing ? (
                        <button
                          onClick={() => handleStartEdit(agency)}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Set Limit</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditingAgencyId(null)}
                          className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgencyPostMonitorManager;

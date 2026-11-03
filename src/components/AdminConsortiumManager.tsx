import React, { useState } from 'react';
import { 
  ConsortiumDivision 
} from '../types';
import { 
  Building2, 
  HardHat, 
  Maximize, 
  Cpu, 
  Layers, 
  Image as ImageIcon, 
  Edit3, 
  CheckCircle2, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Save, 
  X, 
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';
import { initialConsortiumDivisions } from '../data/mockData';

interface AdminConsortiumManagerProps {
  divisions: ConsortiumDivision[];
  onUpdateDivisions: (divisions: ConsortiumDivision[]) => void;
  isSuperAdmin?: boolean;
}

const PRESET_CONSTRUCTION_IMAGES = [
  {
    label: 'Modern Commercial Construction Site (Active Engineers & Cranes)',
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'High-Rise RCC Structure & Engineering Team',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Turnkey Luxury Villa Concrete & Grey Structure Construction',
    url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Architectural Blueprint & Civil Engineering Oversight',
    url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80'
  }
];

const PRESET_UPVC_IMAGES = [
  {
    label: 'Precision Multi-Chamber UPVC Windows & Profiles',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Thermal Insulated Double-Glazed French Windows',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  }
];

export const AdminConsortiumManager: React.FC<AdminConsortiumManagerProps> = ({
  divisions,
  onUpdateDivisions,
  isSuperAdmin = true
}) => {
  const [editingDivision, setEditingDivision] = useState<ConsortiumDivision | null>(null);
  const [newCapabilityText, setNewCapabilityText] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  const showNotification = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(''), 4000);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDivision) return;

    const updated = divisions.map(d => d.id === editingDivision.id ? editingDivision : d);
    onUpdateDivisions(updated);
    setEditingDivision(null);
    showNotification(`Consortium division "${editingDivision.title}" updated successfully! Changes reflected across the website.`);
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset all consortium divisions back to official default settings?')) {
      onUpdateDivisions(initialConsortiumDivisions);
      showNotification('Consortium & UPVC divisions restored to default configuration.');
    }
  };

  const handleAddCapability = () => {
    if (!editingDivision || !newCapabilityText.trim()) return;
    setEditingDivision({
      ...editingDivision,
      capabilities: [...editingDivision.capabilities, newCapabilityText.trim()]
    });
    setNewCapabilityText('');
  };

  const handleRemoveCapability = (index: number) => {
    if (!editingDivision) return;
    setEditingDivision({
      ...editingDivision,
      capabilities: editingDivision.capabilities.filter((_, i) => i !== index)
    });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HardHat':
      case 'Hammer':
        return <HardHat className="w-5 h-5 text-amber-500" />;
      case 'Maximize':
        return <Maximize className="w-5 h-5 text-blue-500" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-purple-500" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-emerald-500" />;
      default:
        return <Building2 className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 p-5 sm:p-6 rounded-2xl border border-slate-700 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500 text-white">
              Website Module
            </span>
            <span className="text-xs text-blue-300 font-mono">
              Consortium & UPVC Governance
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Consortium & UPVC Divisions Content Manager</span>
          </h3>
          <p className="text-xs text-slate-300 max-w-xl mt-1 leading-relaxed">
            Manage imagery, capabilities, specifications, and WhatsApp contacts for <strong>Turnkey Construction</strong>, <strong>UPVC Architectural Profiles</strong>, Real Estate, PropTech AI, and Space Capsule Prefab homes.
          </p>
        </div>

        {isSuperAdmin && (
          <button
            onClick={handleResetToDefaults}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-600 transition-colors flex items-center gap-2 shrink-0 self-start sm:self-center"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        )}
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Consortium Divisions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {divisions.map((div) => {
          const isConstruction = div.id === 'div-construction';
          const isUpvc = div.id === 'div-upvc';

          return (
            <div 
              key={div.id}
              className={`bg-white rounded-2xl border ${
                isConstruction ? 'border-amber-300 shadow-md ring-1 ring-amber-200' : 'border-slate-200 shadow-xs'
              } overflow-hidden flex flex-col`}
            >
              {/* Image with overlay badge */}
              <div className="relative h-48 sm:h-52 w-full bg-slate-900 group">
                <img 
                  src={div.image} 
                  alt={div.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white shadow-md">
                    {div.badge}
                  </span>
                  {isConstruction && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 shadow-md">
                      Featured Turnkey Division
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setEditingDivision(div)}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-600 text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                  title="Edit image and specifications"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Block</span>
                </button>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1 rounded bg-white/20 backdrop-blur-xs">
                      {getIcon(div.iconName)}
                    </div>
                    <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
                      {div.shortName}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white leading-snug drop-shadow-xs">
                    {div.title}
                  </h4>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {div.description}
                  </p>

                  <div>
                    <h5 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                      <span>Key Capabilities ({div.capabilities.length}):</span>
                    </h5>
                    <ul className="space-y-1">
                      {div.capabilities.map((cap, i) => (
                        <li key={i} className="text-xs text-slate-700 flex items-start gap-2 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    WhatsApp: <strong className="text-slate-800 font-mono">+{div.contactWhatsApp}</strong>
                  </span>
                  <button
                    onClick={() => setEditingDivision(div)}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Change Image & Details</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Division Modal */}
      {editingDivision && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div 
            className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Edit Consortium Module: {editingDivision.shortName}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Update suitable image URL, description, and turnkey capabilities
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingDivision(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSaveEdit} className="p-6 overflow-y-auto space-y-4">
              {/* Image URL & Quick Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                    <span>Cover Image URL</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">Direct image link (Unsplash, CDN, etc.)</span>
                </label>
                <input
                  type="url"
                  value={editingDivision.image}
                  onChange={e => setEditingDivision({ ...editingDivision, image: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-blue-500"
                  required
                />

                {/* Current Image Preview */}
                <div className="relative h-36 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img
                    src={editingDivision.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    Live Preview
                  </div>
                </div>

                {/* Quick Presets for Construction or UPVC */}
                {editingDivision.id === 'div-construction' && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                      <HardHat className="w-3 h-3 text-amber-600" />
                      <span>Suggested High-Resolution Construction & Civil Works Images:</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {PRESET_CONSTRUCTION_IMAGES.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setEditingDivision({ ...editingDivision, image: preset.url })}
                          className={`p-2 rounded-lg text-left text-[11px] border transition-all ${
                            editingDivision.image === preset.url 
                              ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold' 
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {editingDivision.id === 'div-upvc' && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-blue-900 flex items-center gap-1">
                      <Maximize className="w-3 h-3 text-blue-600" />
                      <span>Suggested UPVC Windows & Profiles Images:</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {PRESET_UPVC_IMAGES.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setEditingDivision({ ...editingDivision, image: preset.url })}
                          className={`p-2 rounded-lg text-left text-[11px] border transition-all ${
                            editingDivision.image === preset.url 
                              ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold' 
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Short Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">Title</label>
                  <input
                    type="text"
                    value={editingDivision.title}
                    onChange={e => setEditingDivision({ ...editingDivision, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-blue-500"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">Short Name</label>
                  <input
                    type="text"
                    value={editingDivision.shortName}
                    onChange={e => setEditingDivision({ ...editingDivision, shortName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Tagline & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">Tagline</label>
                  <input
                    type="text"
                    value={editingDivision.tagline}
                    onChange={e => setEditingDivision({ ...editingDivision, tagline: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-blue-500"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">Badge Label</label>
                  <input
                    type="text"
                    value={editingDivision.badge}
                    onChange={e => setEditingDivision({ ...editingDivision, badge: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">Comprehensive Description</label>
                <textarea
                  rows={3}
                  value={editingDivision.description}
                  onChange={e => setEditingDivision({ ...editingDivision, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-blue-500"
                  required
                />
              </div>

              {/* Capabilities List Management */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>Key Engineering Capabilities</span>
                  <span className="text-[11px] text-slate-400 font-normal">Add or remove capability bullet points</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newCapabilityText}
                    onChange={e => setNewCapabilityText(e.target.value)}
                    placeholder="e.g. Turnkey RCC Construction with Quality Inspection"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddCapability}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="space-y-1.5 max-h-40 overflow-y-auto pt-1">
                  {editingDivision.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                      <span className="text-slate-800">{cap}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCapability(i)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Remove capability"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp Contact */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">WhatsApp Inquiry Number</label>
                <input
                  type="text"
                  value={editingDivision.contactWhatsApp}
                  onChange={e => setEditingDivision({ ...editingDivision, contactWhatsApp: e.target.value })}
                  placeholder="923365666727"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-blue-500"
                  required
                />
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingDivision(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Layers, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  Edit3, 
  Check, 
  X, 
  SlidersHorizontal, 
  Sparkles, 
  Save, 
  RotateCcw, 
  Layout, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Grid,
  FileText,
  Building,
  Image,
  MessageSquare
} from 'lucide-react';
import { SiteSectionPortion } from '../types';

interface AdminPortionsManagerProps {
  portions: SiteSectionPortion[];
  onUpdatePortions: (portions: SiteSectionPortion[]) => void;
  onResetToDefault?: () => void;
}

export const AdminPortionsManager: React.FC<AdminPortionsManagerProps> = ({
  portions,
  onUpdatePortions,
  onResetToDefault,
}) => {
  const [editingPortion, setEditingPortion] = useState<SiteSectionPortion | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // New Component Form State
  const [newKey, setNewKey] = useState<string>('custom_showcase');
  const [newName, setNewName] = useState<string>('Custom Dynamic Showcase');
  const [newTitle, setNewTitle] = useState<string>('Featured Developments');
  const [newSubtitle, setNewSubtitle] = useState<string>('Handpicked curated premium properties');
  const [newBadge, setNewBadge] = useState<string>('Exclusive Spotlight');
  const [newDesc, setNewDesc] = useState<string>('Dynamic architectural section featuring curated listings.');
  const [newEnabled, setNewEnabled] = useState<boolean>(true);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  // 1. ENABLE / DISABLE TOGGLE
  const handleToggle = (id: string) => {
    const updated = portions.map(p => {
      if (p.id === id) {
        const nextState = !p.isEnabled;
        showFeedback(`Component "${p.name}" has been ${nextState ? 'ENABLED' : 'DISABLED'}.`);
        return { ...p, isEnabled: nextState };
      }
      return p;
    });
    onUpdatePortions(updated);
    try {
      localStorage.setItem('ri8click_site_portions', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  // 2. REORDER UP / DOWN
  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= portions.length) return;

    const list = [...portions];
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;

    const renumbered = list.map((item, idx) => ({ ...item, order: idx + 1 }));
    onUpdatePortions(renumbered);
    try {
      localStorage.setItem('ri8click_site_portions', JSON.stringify(renumbered));
    } catch (err) {
      console.error(err);
    }
  };

  // 3. DELETE COMPONENT
  const handleDeletePortion = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the "${name}" component from the page layout?`)) {
      const updated = portions.filter(p => p.id !== id).map((item, idx) => ({ ...item, order: idx + 1 }));
      onUpdatePortions(updated);
      try {
        localStorage.setItem('ri8click_site_portions', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      showFeedback(`Component "${name}" has been removed.`);
    }
  };

  // 4. ADD NEW COMPONENT
  const handleCreatePortion = (e: React.FormEvent) => {
    e.preventDefault();
    const newPortion: SiteSectionPortion = {
      id: `portion-${Date.now()}`,
      key: newKey as any,
      name: newName || 'Custom Dynamic Component',
      title: newTitle,
      subtitle: newSubtitle,
      badge: newBadge,
      description: newDesc,
      isEnabled: newEnabled,
      order: portions.length + 1
    };

    const updated = [...portions, newPortion];
    onUpdatePortions(updated);
    try {
      localStorage.setItem('ri8click_site_portions', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setIsAddingNew(false);
    showFeedback(`Dynamic component "${newPortion.name}" added successfully.`);
  };

  // 5. UPDATE COMPONENT
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPortion) return;

    const updated = portions.map(p => p.id === editingPortion.id ? editingPortion : p);
    onUpdatePortions(updated);
    try {
      localStorage.setItem('ri8click_site_portions', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setEditingPortion(null);
    showFeedback(`Component "${editingPortion.name}" updated successfully.`);
  };

  // Preset Component Templates
  const componentTemplates = [
    { key: 'properties_grid', name: 'Properties Grid & Search', desc: 'Main residential and commercial listings browser' },
    { key: 'commercial_showcase', name: 'Commercial Showcase', desc: 'High-rise malls, corporate towers & plazas' },
    { key: 'modular_showcase', name: 'Modular UPVC & Prefab Homes', desc: 'Modern rapid construction & UPVC profile display' },
    { key: 'agencies_network', name: 'Certified Brokerage Agencies Network', desc: 'Directory of approved consortium partners' },
    { key: 'consortium_showcase', name: 'Consortium Mega-Projects', desc: 'Master developer portfolios & joint ventures' },
    { key: 'news_blogs_section', name: 'Market Intelligence & Blogs', desc: 'Real estate investment analyses & news' },
    { key: 'cta_banner', name: 'Call to Action & Advisory Banner', desc: 'Direct WhatsApp and lead capture strip' },
    { key: 'hero_slider', name: 'Hero Architectural Banner Slider', desc: 'High-contrast cinematic landing slider' },
    { key: 'top_announcement_bar', name: 'Top Ticker Announcement Bar', desc: 'Emergency notices, hot deals, and live alerts' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-blue-100 text-blue-800">
              Dynamic Component Engine
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Full CRUD Operations
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layout className="w-4 h-4 text-blue-600" />
            <span>Website Layout & Dynamic Component Management</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Add, update, delete, reorder, and toggle visibility of homepage modules directly from this administrative panel without editing code.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setIsAddingNew(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Component</span>
          </button>

          {onResetToDefault && (
            <button
              onClick={() => {
                if (confirm('Reset all page portions back to standard system defaults?')) {
                  onResetToDefault();
                  showFeedback('Page portions reset to factory defaults.');
                }
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
              title="Reset to default portions"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          )}
        </div>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Portions Sequence List */}
      <div className="space-y-3">
        {portions.map((portion, index) => {
          return (
            <div
              key={portion.id}
              className={`bg-white rounded-2xl border transition-all p-4.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                portion.isEnabled
                  ? 'border-slate-200 shadow-2xs hover:border-blue-300'
                  : 'border-slate-200 bg-slate-50/70 opacity-60'
              }`}
            >
              {/* Left Info */}
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <div className="flex flex-col items-center justify-center shrink-0 w-8 h-8 rounded-xl bg-slate-100 text-slate-700 font-mono text-xs font-bold border border-slate-200">
                  {portion.order || index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {portion.name}
                    </h4>

                    {portion.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                        {portion.badge}
                      </span>
                    )}

                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      #{portion.key}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 mt-1">
                    <span className="font-semibold text-slate-900">{portion.title}</span>
                    {portion.subtitle && (
                      <span className="text-slate-500"> — {portion.subtitle}</span>
                    )}
                  </div>

                  {portion.description && (
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {portion.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Action Controls: Enable/Disable, Edit, Delete, Move Up/Down */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                {/* 1. ENABLE / DISABLE BUTTON */}
                <button
                  onClick={() => handleToggle(portion.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    portion.isEnabled
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-200 text-slate-600 border border-slate-300 hover:bg-slate-300'
                  }`}
                  title={portion.isEnabled ? 'Disable Component' : 'Enable Component'}
                >
                  {portion.isEnabled ? (
                    <>
                      <Eye className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                      <span>Disabled</span>
                    </>
                  )}
                </button>

                {/* 2. UPDATE / EDIT BUTTON */}
                <button
                  onClick={() => setEditingPortion(portion)}
                  className="p-2 rounded-xl text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                  title="Edit Component Details"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                {/* 3. DELETE BUTTON */}
                <button
                  onClick={() => handleDeletePortion(portion.id, portion.name)}
                  className="p-2 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                  title="Delete Component"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* 4. REORDER CONTROLS */}
                <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
                  <button
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30"
                    title="Move Component Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === portions.length - 1}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30"
                    title="Move Component Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: ADD DYNAMIC COMPONENT */}
      {isAddingNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden">
            <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
              <h4 className="font-bold text-sm flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-400" />
                <span>Add New Dynamic Page Component</span>
              </h4>
              <button
                onClick={() => setIsAddingNew(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePortion} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Component Module Key / Type</label>
                <select
                  value={newKey}
                  onChange={e => {
                    setNewKey(e.target.value);
                    const tmpl = componentTemplates.find(t => t.key === e.target.value);
                    if (tmpl) {
                      setNewName(tmpl.name);
                      setNewDesc(tmpl.desc);
                    }
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                >
                  <option value="properties_grid">Properties Grid & Filtering</option>
                  <option value="commercial_showcase">Commercial Showcase</option>
                  <option value="modular_showcase">Modular Homes & Prefab</option>
                  <option value="agencies_network">Agencies Network</option>
                  <option value="consortium_showcase">Consortium Mega-Projects</option>
                  <option value="news_blogs_section">News & Insight Articles</option>
                  <option value="cta_banner">Call to Action Advisory Banner</option>
                  <option value="hero_slider">Hero Banner Slider</option>
                  <option value="top_announcement_bar">Top Announcement Bar</option>
                  <option value="custom_showcase">Custom Dynamic Showcase Block</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Component Display Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                  placeholder="e.g. Featured Commercial Arcades"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Heading Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                    placeholder="e.g. Prime Commercial Spaces"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Subtitle / Tagline</label>
                  <input
                    type="text"
                    value={newSubtitle}
                    onChange={e => setNewSubtitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                    placeholder="e.g. High ROI rental yields"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Badge Text</label>
                  <input
                    type="text"
                    value={newBadge}
                    onChange={e => setNewBadge(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                    placeholder="e.g. Verified RDA Approved"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="newEnabledCheck"
                    checked={newEnabled}
                    onChange={e => setNewEnabled(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <label htmlFor="newEnabledCheck" className="text-slate-800 font-bold cursor-pointer">
                    Enable Component Immediately
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Internal Description</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                  placeholder="Administrative notes for this component..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 rounded-xl text-slate-700 hover:bg-slate-200 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md"
                >
                  Add Component to Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT DYNAMIC COMPONENT */}
      {editingPortion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden">
            <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
              <h4 className="font-bold text-sm flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-400" />
                <span>Update Component: {editingPortion.name}</span>
              </h4>
              <button
                onClick={() => setEditingPortion(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Component Name</label>
                <input
                  type="text"
                  required
                  value={editingPortion.name}
                  onChange={e => setEditingPortion({ ...editingPortion, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Section Heading Title</label>
                  <input
                    type="text"
                    required
                    value={editingPortion.title}
                    onChange={e => setEditingPortion({ ...editingPortion, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Subtitle / Tagline</label>
                  <input
                    type="text"
                    value={editingPortion.subtitle}
                    onChange={e => setEditingPortion({ ...editingPortion, subtitle: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Badge Text</label>
                  <input
                    type="text"
                    value={editingPortion.badge || ''}
                    onChange={e => setEditingPortion({ ...editingPortion, badge: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                    placeholder="e.g. Featured Collection"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="editEnabledCheck"
                    checked={editingPortion.isEnabled}
                    onChange={e => setEditingPortion({ ...editingPortion, isEnabled: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <label htmlFor="editEnabledCheck" className="text-slate-800 font-bold cursor-pointer">
                    Enable / Show Component
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Description / Notes</label>
                <textarea
                  rows={2}
                  value={editingPortion.description || ''}
                  onChange={e => setEditingPortion({ ...editingPortion, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                  placeholder="Component notes..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingPortion(null)}
                  className="px-4 py-2 rounded-xl text-slate-700 hover:bg-slate-200 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortionsManager;

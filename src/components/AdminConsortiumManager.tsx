import React, { useState, useRef } from 'react';
import { ConsortiumDivision } from '../types';
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
  Trash2,
  Save,
  X,
  ShieldCheck,
  Check,
  Upload,
  Link2,
  ExternalLink
} from 'lucide-react';
import { CONSORTIUM_DIVISIONS } from '../data/mockData';

interface AdminConsortiumManagerProps {
  divisions: ConsortiumDivision[];
  onUpdateDivisions: (divisions: ConsortiumDivision[]) => void;
  isSuperAdmin?: boolean;
}

const QUICK_INTERNAL_TARGETS = [
  { label: 'Properties Grid Section (#properties-grid-section)', value: '#properties-grid-section' },
  { label: 'Commercial Plazas Section (#commercial-section)', value: '#commercial-section' },
  { label: 'Capsule & Modular Homes (#modular-section)', value: '#modular-section' },
  { label: 'AdVibe Megaprojects Showcase (tab:advibe)', value: 'tab:advibe' },
  { label: 'Certified Agencies Section (#agents-section)', value: '#agents-section' },
  { label: 'News & Blogs Section (#news-blogs-section)', value: '#news-blogs-section' }
];

export const AdminConsortiumManager: React.FC<AdminConsortiumManagerProps> = ({
  divisions,
  onUpdateDivisions,
  isSuperAdmin = true
}) => {
  const [editingDivision, setEditingDivision] = useState<ConsortiumDivision | null>(null);
  const [newCapabilityText, setNewCapabilityText] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showNotification = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(''), 3500);
  };

  const handleUploadDivisionImage = (file?: File) => {
    if (!file || !editingDivision) return;
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_W = 1400;
        let w = img.width;
        let h = img.height;
        if (w > MAX_W) {
          h = Math.round((h * MAX_W) / w);
          w = MAX_W;
        }
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d')?.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setEditingDivision({ ...editingDivision, image: dataUrl });
        showNotification('Uploaded local image for Consortium Division!');
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDivision) return;
    const updated = divisions.map(d =>
      d.id === editingDivision.id ? editingDivision : d
    );
    onUpdateDivisions(updated);
    setEditingDivision(null);
    showNotification(
      `Consortium division "${editingDivision.title}" and image redirect link updated globally!`
    );
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HardHat':
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
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800">
              Consortium Structure &amp; Image Link CMS
            </span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span>ri8click Consortium Divisions, Images &amp; Redirect Links Manager</span>
          </h3>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Update division images (via local PC upload or URL), set clickable image redirect links to specific website portions/features or external URLs, and manage division capabilities.
          </p>
        </div>

        {isSuperAdmin && (
          <button
            onClick={() => {
              if (window.confirm('Restore default Consortium Divisions?')) {
                onUpdateDivisions(CONSORTIUM_DIVISIONS);
                showNotification('Restored default Consortium structure.');
              }
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer self-start sm:self-center"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        )}
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {divisions.map(div => (
          <div
            key={div.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col"
          >
            <div className="relative h-48 w-full bg-slate-900">
              <img
                src={div.image}
                alt={div.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase bg-blue-600 text-white">
                {div.badge}
              </span>
              <button
                onClick={() => setEditingDivision({ ...div })}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                <span>Edit Image &amp; Link</span>
              </button>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <div className="flex items-center gap-2">
                  {getIcon(div.iconName)}
                  <span className="text-xs font-bold text-amber-300 uppercase">
                    {div.shortName}
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-white mt-0.5">
                  {div.title}
                </h4>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                {/* Active Image Redirect Link Badge */}
                <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-200 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 min-w-0 text-blue-900">
                    <Link2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="font-bold shrink-0">Image Redirect Link:</span>
                    <code className="font-mono text-[11px] text-blue-700 truncate">
                      {div.linkUrl || 'Not configured (click Edit to set)'}
                    </code>
                  </div>
                  {div.linkUrl && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white text-blue-700 border border-blue-200 shrink-0">
                      {div.linkTarget === '_blank' ? 'New Tab' : 'Same Tab'}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {div.description}
                </p>
                <ul className="space-y-1">
                  {div.capabilities.map((cap, i) => (
                    <li
                      key={i}
                      className="text-xs text-slate-700 flex items-center gap-2 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100"
                    >
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Contact: <strong className="text-slate-800">{div.contactPerson}</strong>
                </span>
                <button
                  onClick={() => setEditingDivision({ ...div })}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold cursor-pointer flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Set Image Link / Details</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingDivision && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div
            className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-sm font-bold">
                Edit Consortium Block &amp; Image Link: {editingDivision.title}
              </h3>
              <button
                onClick={() => setEditingDivision(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 overflow-y-auto space-y-4 text-xs">
              {/* Division Cover Image */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-blue-600" />
                    <span>Division Cover Image</span>
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => handleUploadDivisionImage(e.target.files?.[0])}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload from Computer</span>
                  </button>
                </div>

                <input
                  type="text"
                  value={editingDivision.image}
                  onChange={e =>
                    setEditingDivision({ ...editingDivision, image: e.target.value })
                  }
                  placeholder="Paste image URL or upload from computer..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                />

                <div className="h-40 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={editingDivision.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Image Click Redirect Link Configuration */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-extrabold text-blue-950 flex items-center gap-1.5">
                    <Link2 className="w-4 h-4 text-blue-600" />
                    <span>Image Click Redirect Link (Website Portion / Feature or External URL)</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Target URL or Website Section Anchor
                    </label>
                    <input
                      type="text"
                      value={editingDivision.linkUrl || ''}
                      onChange={e =>
                        setEditingDivision({
                          ...editingDivision,
                          linkUrl: e.target.value
                        })
                      }
                      placeholder="e.g. #modular-section, tab:advibe, or https://..."
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Open Behavior
                    </label>
                    <select
                      value={editingDivision.linkTarget || '_self'}
                      onChange={e =>
                        setEditingDivision({
                          ...editingDivision,
                          linkTarget: e.target.value as '_self' | '_blank'
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold"
                    >
                      <option value="_self">Same Window / Scroll</option>
                      <option value="_blank">Open in New Tab</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Or Quick-Select Website Portion / Feature:
                  </label>
                  <select
                    value={
                      QUICK_INTERNAL_TARGETS.some(t => t.value === editingDivision.linkUrl)
                        ? editingDivision.linkUrl
                        : ''
                    }
                    onChange={e => {
                      if (e.target.value) {
                        setEditingDivision({
                          ...editingDivision,
                          linkUrl: e.target.value,
                          linkTarget: '_self'
                        });
                      }
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                  >
                    <option value="">-- Choose a Website Section / Feature --</option>
                    {QUICK_INTERNAL_TARGETS.map(t => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={editingDivision.title}
                    onChange={e =>
                      setEditingDivision({ ...editingDivision, title: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Short Name</label>
                  <input
                    type="text"
                    value={editingDivision.shortName}
                    onChange={e =>
                      setEditingDivision({
                        ...editingDivision,
                        shortName: e.target.value
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingDivision.description}
                  onChange={e =>
                    setEditingDivision({
                      ...editingDivision,
                      description: e.target.value
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-slate-700">Capabilities</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCapabilityText}
                    onChange={e => setNewCapabilityText(e.target.value)}
                    placeholder="Add capability..."
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newCapabilityText.trim()) return;
                      setEditingDivision({
                        ...editingDivision,
                        capabilities: [
                          ...editingDivision.capabilities,
                          newCapabilityText.trim()
                        ]
                      });
                      setNewCapabilityText('');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 text-white font-bold cursor-pointer"
                  >
                    + Add
                  </button>
                </div>
                <div className="space-y-1">
                  {editingDivision.capabilities.map((cap, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200"
                    >
                      <span>{cap}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingDivision({
                            ...editingDivision,
                            capabilities: editingDivision.capabilities.filter(
                              (_, i) => i !== idx
                            )
                          })
                        }
                        className="text-rose-600 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingDivision(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold flex items-center gap-1.5 cursor-pointer"
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

export default AdminConsortiumManager;

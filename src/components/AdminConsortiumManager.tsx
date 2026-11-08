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
  Plus,
  Trash2,
  Save,
  X,
  ShieldCheck,
  Check,
  Upload
} from 'lucide-react';
import { CONSORTIUM_DIVISIONS } from '../data/mockData';

interface AdminConsortiumManagerProps {
  divisions: ConsortiumDivision[];
  onUpdateDivisions: (divisions: ConsortiumDivision[]) => void;
  isSuperAdmin?: boolean;
}

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
      `Consortium division "${editingDivision.title}" updated and synced globally!`
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
              Consortium Structure CMS
            </span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span>ri8click Consortium Divisions &amp; Block Images Manager</span>
          </h3>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Update images (via local computer upload or URL), titles, descriptions, and capabilities for all Consortium divisions.
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
                <span>Edit Image &amp; Text</span>
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
                  className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold cursor-pointer"
                >
                  Change Image / Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingDivision && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div
            className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-sm font-bold">
                Edit Consortium Block: {editingDivision.title}
              </h3>
              <button
                onClick={() => setEditingDivision(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 overflow-y-auto space-y-4 text-xs">
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
                    className="px-3.5 py-2 rounded-xl bg-blue-600 text-white font-bold"
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
                        className="text-rose-600"
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
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold flex items-center gap-1.5"
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

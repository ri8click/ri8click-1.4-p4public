import React, { useState } from 'react';
import {
  Menu,
  ArrowUp,
  ArrowDown,
  Edit3,
  Eye,
  EyeOff,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  Save,
  X,
  Home,
  Sparkles,
  Building2,
  Layers,
  ShieldCheck,
  Compass,
  Newspaper,
  MapPin,
  Globe,
  Star,
  Phone,
  ArrowRightToLine
} from 'lucide-react';
import { TopNavigationItem } from '../types';
import { INITIAL_TOP_MENU_ITEMS } from '../data/mockData';

interface AdminTopMenuManagerProps {
  menuItems: TopNavigationItem[];
  onUpdateMenuItems: (items: TopNavigationItem[]) => void;
  onResetMenuItems?: () => void;
}

const AVAILABLE_ICONS = [
  { name: 'Home', component: Home },
  { name: 'Sparkles', component: Sparkles },
  { name: 'Building2', component: Building2 },
  { name: 'Layers', component: Layers },
  { name: 'Compass', component: Compass },
  { name: 'Newspaper', component: Newspaper },
  { name: 'ShieldCheck', component: ShieldCheck },
  { name: 'MapPin', component: MapPin },
  { name: 'Globe', component: Globe },
  { name: 'Star', component: Star },
  { name: 'Phone', component: Phone }
];

export const AdminTopMenuManager: React.FC<AdminTopMenuManagerProps> = ({
  menuItems,
  onUpdateMenuItems,
  onResetMenuItems
}) => {
  const [editingItem, setEditingItem] = useState<TopNavigationItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [newLabel, setNewLabel] = useState('');
  const [newId, setNewId] = useState('');
  const [newIconName, setNewIconName] = useState('Star');
  const [newTargetSectionId, setNewTargetSectionId] = useState('properties-grid-section');
  const [newCustomUrl, setNewCustomUrl] = useState('');

  const sortedItems = [...(menuItems || INITIAL_TOP_MENU_ITEMS)].sort(
    (a, b) => (a.order ?? 99) - (b.order ?? 99)
  );

  const showNotice = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= sortedItems.length) return;

    const list = [...sortedItems];
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;

    const renumbered = list.map((item, idx) => ({ ...item, order: idx + 1 }));
    onUpdateMenuItems(renumbered);
    showNotice(`Moved "${temp.label}" ${direction === 'up' ? 'up' : 'down'} in Top Menu sequence.`);
  };

  const handleMoveToEnd = (index: number) => {
    if (index === sortedItems.length - 1) return;
    const list = [...sortedItems];
    const [moved] = list.splice(index, 1);
    list.push(moved);
    const renumbered = list.map((item, idx) => ({ ...item, order: idx + 1 }));
    onUpdateMenuItems(renumbered);
    showNotice(`Moved "${moved.label}" to the end of the Top Menu bar.`);
  };

  const handleToggleVisibility = (id: string) => {
    const updated = sortedItems.map(item => {
      if (item.id === id) {
        const nextVis = !item.isVisible;
        showNotice(`Menu item "${item.label}" is now ${nextVis ? 'VISIBLE' : 'HIDDEN'}.`);
        return { ...item, isVisible: nextVis };
      }
      return item;
    });
    onUpdateMenuItems(updated);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.label.trim()) return;

    const updated = sortedItems.map(item =>
      item.id === editingItem.id
        ? { ...editingItem, label: editingItem.label.trim() }
        : item
    );
    onUpdateMenuItems(updated);
    setEditingItem(null);
    showNotice(`Updated menu item "${editingItem.label}" globally!`);
  };

  const handleAddMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;

    const cleanId =
      newId.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_') ||
      `menu_${Date.now().toString().slice(-4)}`;

    const newItem: TopNavigationItem = {
      id: cleanId,
      label: newLabel.trim(),
      iconName: newIconName,
      order: sortedItems.length + 1,
      isVisible: true,
      targetSectionId: newTargetSectionId || undefined,
      customUrl: newCustomUrl.trim() || undefined
    };

    const updated = [...sortedItems, newItem];
    onUpdateMenuItems(updated);
    setIsAddingNew(false);
    setNewLabel('');
    setNewId('');
    setNewCustomUrl('');
    showNotice(`Added "${newItem.label}" to the Top Menu bar!`);
  };

  const handleDeleteItem = (item: TopNavigationItem) => {
    const coreIds = ['properties', 'advibe', 'commercial', 'modular', 'consortium', 'news_blogs', 'agents'];
    if (coreIds.includes(item.id)) {
      if (
        !window.confirm(
          `"${item.label}" is a core navigation link. Do you want to hide/remove it from the Top Menu?`
        )
      ) {
        return;
      }
    }
    const updated = sortedItems
      .filter(i => i.id !== item.id)
      .map((i, idx) => ({ ...i, order: idx + 1 }));
    onUpdateMenuItems(updated);
    showNotice(`Removed "${item.label}" from the Top Menu.`);
  };

  const getIconComponent = (iconName: string) => {
    const found = AVAILABLE_ICONS.find(i => i.name === iconName);
    const Icon = found ? found.component : Home;
    return <Icon className="w-4 h-4 text-blue-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800">
              Top Navbar CMS
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Live Sequence &amp; Text Control
            </span>
          </div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Menu className="w-4 h-4 text-blue-600" />
            <span>Top Menu Management — Rename &amp; Reorder Navigation Links</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Rename menu labels, change their sequence in the top navigation bar, toggle visibility, or relocate items such as &quot;Certified Agents&quot; to the end.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsAddingNew(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Menu Link</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset Top Menu items and sequence to default (with Certified Agents at the end)?')) {
                if (onResetMenuItems) {
                  onResetMenuItems();
                } else {
                  onUpdateMenuItems(INITIAL_TOP_MENU_ITEMS);
                }
                showNotice('Top Menu restored to default sequence!');
              }
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default Menu</span>
          </button>
        </div>
      </div>

      {/* Live Preview Strip */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-2.5">
        <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
          Live Top Menu Bar Preview (Desktop Order)
        </div>
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {sortedItems
            .filter(i => i.isVisible !== false)
            .map((item, idx) => (
              <div
                key={item.id}
                className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap"
              >
                <span className="text-[10px] font-mono text-amber-400">{idx + 1}.</span>
                {getIconComponent(item.iconName)}
                <span>{item.label}</span>
              </div>
            ))}
        </div>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Menu Items List */}
      <div className="space-y-2.5">
        {sortedItems.map((item, idx) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
              item.isVisible !== false
                ? 'border-slate-200 shadow-2xs hover:border-blue-300'
                : 'border-slate-200 bg-slate-50 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-extrabold flex items-center justify-center shrink-0">
                {idx + 1}
              </div>

              <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 shrink-0">
                {getIconComponent(item.iconName)}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    value={item.label}
                    onChange={e => {
                      const nextLabel = e.target.value;
                      const updated = sortedItems.map(m =>
                        m.id === item.id ? { ...m, label: nextLabel } : m
                      );
                      onUpdateMenuItems(updated);
                    }}
                    className="text-sm font-extrabold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:bg-slate-50 px-1 py-0.5 rounded focus:outline-none"
                    title="Click to rename menu text directly"
                  />
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    id: {item.id}
                  </span>
                  {idx === sortedItems.length - 1 && (
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                      End Position
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {item.customUrl
                    ? `Custom Redirect: ${item.customUrl}`
                    : item.targetSectionId
                      ? `Scrolls to section: #${item.targetSectionId}`
                      : `Opens portal tab: ${item.id}`}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => handleToggleVisibility(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer border ${
                  item.isVisible !== false
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-slate-200 text-slate-600 border-slate-300'
                }`}
              >
                {item.isVisible !== false ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Visible</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hidden</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setEditingItem({ ...item })}
                className="px-2.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                title="Rename or Edit Menu Item"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Rename / Edit</span>
              </button>

              {idx < sortedItems.length - 1 && (
                <button
                  type="button"
                  onClick={() => handleMoveToEnd(idx)}
                  className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 cursor-pointer"
                  title="Move to End of Top Menu"
                >
                  <ArrowRightToLine className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                type="button"
                onClick={() => handleMove(idx, 'up')}
                disabled={idx === 0}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 cursor-pointer"
                title="Move Up"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => handleMove(idx, 'down')}
                disabled={idx === sortedItems.length - 1}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 cursor-pointer"
                title="Move Down"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => handleDeleteItem(item)}
                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                title="Remove Menu Item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
              <h4 className="text-sm font-bold flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-400" />
                <span>Edit Top Menu Item</span>
              </h4>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Menu Display Text *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.label}
                  onChange={e =>
                    setEditingItem({ ...editingItem, label: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Icon
                </label>
                <select
                  value={editingItem.iconName}
                  onChange={e =>
                    setEditingItem({ ...editingItem, iconName: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                >
                  {AVAILABLE_ICONS.map(ic => (
                    <option key={ic.name} value={ic.name}>
                      {ic.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Target Section ID (Optional)
                </label>
                <select
                  value={editingItem.targetSectionId || ''}
                  onChange={e =>
                    setEditingItem({
                      ...editingItem,
                      targetSectionId: e.target.value || undefined
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                >
                  <option value="">None (Use Tab ID: {editingItem.id})</option>
                  <option value="properties-grid-section">
                    #properties-grid-section (Properties Grid)
                  </option>
                  <option value="commercial-section">
                    #commercial-section (Commercial Plazas)
                  </option>
                  <option value="modular-section">
                    #modular-section (Capsule &amp; Modular Homes)
                  </option>
                  <option value="consortium-section">
                    #consortium-section (Consortium &amp; UPVC)
                  </option>
                  <option value="news-blogs-section">
                    #news-blogs-section (News &amp; Blogs)
                  </option>
                  <option value="agents-section">
                    #agents-section (Certified Agents)
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Custom Redirect URL (Optional)
                </label>
                <input
                  type="text"
                  value={editingItem.customUrl || ''}
                  onChange={e =>
                    setEditingItem({
                      ...editingItem,
                      customUrl: e.target.value || undefined
                    })
                  }
                  placeholder="https://... or #section-id"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Menu Item</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddingNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
              <h4 className="text-sm font-bold flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-400" />
                <span>Add New Top Menu Link</span>
              </h4>
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddMenuItem} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Menu Display Text *
                </label>
                <input
                  type="text"
                  required
                  value={newLabel}
                  onChange={e => setNewLabel(e.target.value)}
                  placeholder="e.g. Overseas Desk"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Menu Key / ID
                  </label>
                  <input
                    type="text"
                    value={newId}
                    onChange={e => setNewId(e.target.value)}
                    placeholder="overseas_desk"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Icon
                  </label>
                  <select
                    value={newIconName}
                    onChange={e => setNewIconName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  >
                    {AVAILABLE_ICONS.map(ic => (
                      <option key={ic.name} value={ic.name}>
                        {ic.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Target Homepage Section
                </label>
                <select
                  value={newTargetSectionId}
                  onChange={e => setNewTargetSectionId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                >
                  <option value="properties-grid-section">Properties Section</option>
                  <option value="commercial-section">Commercial Plazas Section</option>
                  <option value="modular-section">Capsule Houses Section</option>
                  <option value="consortium-section">Consortium Section</option>
                  <option value="news-blogs-section">News &amp; Blogs Section</option>
                  <option value="agents-section">Certified Agents Section</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Or External / Custom URL
                </label>
                <input
                  type="text"
                  value={newCustomUrl}
                  onChange={e => setNewCustomUrl(e.target.value)}
                  placeholder="https://... (optional)"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold cursor-pointer"
                >
                  Add to Top Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTopMenuManager;

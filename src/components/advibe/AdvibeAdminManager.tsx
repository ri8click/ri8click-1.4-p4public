import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Edit3, 
  Trash2, 
  Copy, 
  Eye, 
  Check, 
  X, 
  ArrowUp, 
  ArrowDown, 
  Search, 
  Sparkles, 
  Sliders, 
  MapPin, 
  FileText, 
  Users, 
  Shield, 
  Layers, 
  Compass, 
  DollarSign, 
  Phone, 
  MessageSquare,
  Download,
  CheckCircle2,
  ExternalLink,
  RotateCw,
  Sun,
  Moon,
  Play,
  Pause
} from 'lucide-react';
import Advibe3DVirtualTour from './Advibe3DVirtualTour';
import { 
  AdVibeProject, 
  AdVibeLead, 
  AdVibeSection, 
  AdVibeSectionType, 
  Property, 
  AgencyAccount 
} from '../../types';

interface AdvibeAdminManagerProps {
  projects: AdVibeProject[];
  leads: AdVibeLead[];
  agencies: AgencyAccount[];
  properties: Property[];
  onSaveProject: (project: AdVibeProject) => void;
  onDeleteProject: (projectId: string) => void;
  onDuplicateProject: (projectId: string) => void;
  onUpdateLeadStatus: (leadId: string, status: AdVibeLead['status']) => void;
  onToggleAgencyAdvibePermission: (agencyId: string, permitted: boolean) => void;
  onPreviewProject: (slug: string) => void;
  currentRole?: 'admin' | 'agency' | 'customer';
  currentAgencyId?: string;
}

export const AdvibeAdminManager: React.FC<AdvibeAdminManagerProps> = ({
  projects,
  leads,
  agencies,
  properties,
  onSaveProject,
  onDeleteProject,
  onDuplicateProject,
  onUpdateLeadStatus,
  onToggleAgencyAdvibePermission,
  onPreviewProject,
  currentRole = 'admin',
  currentAgencyId
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'leads' | 'permissions'>('projects');
  const [editingProject, setEditingProject] = useState<AdVibeProject | null>(null);
  const [editorSubTab, setEditorSubTab] = useState<'basics' | 'sections' | 'tour3d' | 'theme' | 'hotspots' | 'units' | 'pricing'>('basics');
  const [searchQuery, setSearchQuery] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');

  // Filter projects by permission: admins see all, agency sees theirs or all if permitted
  const visibleProjects = projects.filter(p => {
    if (currentRole === 'admin') return true;
    if (p.dealerId === currentAgencyId) return true;
    return false;
  });

  const handleCreateNewProject = () => {
    const newProj: AdVibeProject = {
      id: `advibe-proj-${Date.now()}`,
      title: 'New Luxury Development',
      slug: `new-luxury-development-${Date.now().toString().slice(-4)}`,
      type: 'Housing Society',
      logo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80',
      tagline: 'A premier architectural masterpiece in Taxila / Islamabad corridor.',
      description: 'Exclusive master-planned society featuring residential enclaves, commercial high streets, and smart utilities.',
      city: 'Taxila',
      area: 'Faisal Hills Margalla Zone',
      address: 'Main Boulevard, Taxila, Punjab',
      coordinates: {
        lat: 33.7312,
        lng: 72.8340,
        zoom: 15
      },
      starting_price: 3500000,
      starting_price_formatted: 'PKR 35 Lakhs',
      status: 'Booking Open',
      featured: false,
      published: true,
      schedule: {
        startDate: '2025-01-01',
        launchDate: '2025-06-01',
        completionDate: '2028-12-31'
      },
      theme: {
        primaryColor: '#2563eb',
        accentColor: '#f59e0b',
        bgStyle: 'midnight',
        fontHeading: 'Playfair Display',
        fontBody: 'Plus Jakarta Sans',
        buttonStyle: 'rounded-xl',
        overlayOpacity: 0.65,
        animationIntensity: 'dynamic'
      },
      seo: {
        metaTitle: 'New Luxury Development | AdVibe Showcase',
        metaDescription: 'Explore modern living and investment opportunities.',
        ogImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        keywords: ['Real Estate', 'AdVibe', 'Taxila']
      },
      developer: {
        name: 'Premier Builders & Developers',
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80',
        description: 'Pioneering infrastructure and high-rise developments with proven delivery records.',
        completedProjects: 12,
        rating: 4.8
      },
      highlights: [
        {
          id: 'hl-1',
          title: 'Prime Arterial Access',
          value: 'Signal-Free Corridor',
          description: 'Direct access to Grand Trunk (GT) Road and Motorway network.',
          iconName: 'Compass'
        }
      ],
      amenities: [
        {
          id: 'am-1',
          name: 'Executive Residents Clubhouse',
          category: 'Wellness & Sports',
          description: 'Fully equipped gymnasium, swimming pool, and community event hall.',
          iconName: 'Waves'
        }
      ],
      locationPoints: [
        {
          id: 'loc-1',
          name: 'Grand Trunk Road Junction',
          category: 'Highway & Access',
          distance: '1.2 km',
          driveTime: '3 mins'
        }
      ],
      masterPlan: {
        imageUrl: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1200&q=80',
        legend: [
          { category: 'Residential Enclave', color: '#3b82f6' },
          { category: 'Commercial Broadway', color: '#f59e0b' }
        ],
        hotspots: [
          {
            id: 'hp-1',
            x: 50,
            y: 50,
            title: 'Block A Executive Villas',
            category: 'Residential Block',
            description: '10 Marla and 1 Kanal prime residential plots.',
            status: 'Available'
          }
        ]
      },
      gallery: [
        {
          id: 'gal-1',
          url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
          type: 'image',
          category: 'Exterior',
          caption: 'Main entrance gate and boulevard.'
        }
      ],
      videos: [],
      virtualTour: {
        provider: 'custom360',
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
        title: 'Virtual 360 Walkthrough'
      },
      linkedPropertyIds: properties.slice(0, 3).map(p => p.id),
      pricingTiers: [
        {
          id: 'pt-1',
          unitType: '5 Marla Residential Plot',
          size: '125 Sq Yds',
          totalPrice: 'PKR 35,00,000',
          downPayment: 'PKR 7,00,000 (20%)',
          monthlyInstallment: 'PKR 65,000 x 36 Months',
          possession: 'PKR 7,00,000 on Ballot',
          features: ['100% NOC Clearance', 'Immediate Allocation']
        }
      ],
      sections: [
        { id: 'sec-hero', type: 'hero', title: 'New Luxury Development', subtitle: 'Where Elegance Meets Nature', isEnabled: true, order: 1 },
        { id: 'sec-intro', type: 'intro', title: 'Project Overview', subtitle: 'A Vision for Modern Living', isEnabled: true, order: 2 },
        { id: 'sec-highlights', type: 'highlights', title: 'Key Highlights', subtitle: 'Core Advantages', isEnabled: true, order: 3 },
        { id: 'sec-master-plan', type: 'master_plan', title: 'Interactive Master Plan', subtitle: 'Explore Sectors & Blocks', isEnabled: true, order: 4 },
        { id: 'sec-location', type: 'location', title: 'Location & Distances', subtitle: 'Proximity Radar', isEnabled: true, order: 5 },
        { id: 'sec-amenities', type: 'amenities', title: 'World-Class Amenities', subtitle: 'Lifestyle Facilities', isEnabled: true, order: 6 },
        { id: 'sec-gallery', type: 'gallery', title: 'Project Gallery', subtitle: 'Visual Showcase', isEnabled: true, order: 7 },
        { id: 'sec-units', type: 'units', title: 'Available Units', subtitle: 'Live Inventory', isEnabled: true, order: 8 },
        { id: 'sec-pricing', type: 'pricing', title: 'Payment Plans', subtitle: 'Flexible Schedules', isEnabled: true, order: 9 },
        { id: 'sec-developer', type: 'developer', title: 'About Developer', subtitle: 'Master Builders', isEnabled: true, order: 10 },
        { id: 'sec-enquiry', type: 'enquiry', title: 'Book Site Visit', subtitle: 'Reserve Your Slot', isEnabled: true, order: 11 }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setEditingProject(newProj);
    setEditorSubTab('basics');
  };

  // Move section Up or Down
  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    if (!editingProject) return;
    const newSections = [...editingProject.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    // Swap order
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    // Re-index orders
    newSections.forEach((s, idx) => {
      s.order = idx + 1;
    });

    setEditingProject({
      ...editingProject,
      sections: newSections
    });
  };

  const handleToggleSectionEnabled = (secId: string) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      sections: editingProject.sections.map(s => s.id === secId ? { ...s, isEnabled: !s.isEnabled } : s)
    });
  };

  const handleSaveCurrentProject = () => {
    if (!editingProject) return;
    onSaveProject(editingProject);
    setEditingProject(null);
  };

  const exportLeadsToCSV = () => {
    const headers = ['ID', 'Project', 'Name', 'Phone', 'Email', 'Preferred Unit', 'Status', 'Date'];
    const rows = leads.map(l => [
      l.id,
      `"${l.projectTitle}"`,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.preferredUnit}"`,
      l.status,
      l.createdAt
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `advibe_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-6 text-slate-100">
      
      {/* Top Tabs Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setActiveTab('projects'); setEditingProject(null); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'projects' && !editingProject
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Showcase Projects ({visibleProjects.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('leads'); setEditingProject(null); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'leads'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>AdVibe Leads ({leads.length})</span>
          </button>

          {currentRole === 'admin' && (
            <button
              onClick={() => { setActiveTab('permissions'); setEditingProject(null); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'permissions'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Broker Permissions</span>
            </button>
          )}
        </div>

        {activeTab === 'projects' && !editingProject && (
          <button
            onClick={handleCreateNewProject}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create New AdVibe Project</span>
          </button>
        )}
      </div>

      {/* ======================================================== */}
      {/* 1. PROJECTS LIST TAB                                     */}
      {/* ======================================================== */}
      {activeTab === 'projects' && !editingProject && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Project</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">City / Area</th>
                  <th className="py-3.5 px-4">Starting Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Views</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {visibleProjects
                  .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((project) => (
                    <tr key={project.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={project.logo}
                            alt={project.title}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-white flex items-center gap-2">
                              <span>{project.title}</span>
                              {project.featured && (
                                <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold">
                                  Featured
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              Slug: /{project.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-300">{project.type}</span>
                      </td>

                      <td className="py-3 px-4">
                        <span>{project.city}</span>
                        <div className="text-[10px] text-slate-400">{project.area}</div>
                      </td>

                      <td className="py-3 px-4 font-mono font-bold text-amber-400">
                        {project.starting_price_formatted}
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {project.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-400">
                        {project.viewsCount || 0}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onPreviewProject(project.slug)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
                            title="Live 100vh Preview"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              setEditingProject({ ...project });
                              setEditorSubTab('basics');
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-600 text-slate-300 hover:text-white transition-colors"
                            title="Edit Project & Sections"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => onDuplicateProject(project.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-colors"
                            title="Duplicate Project"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${project.title}?`)) {
                                onDeleteProject(project.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. PROJECT EDITOR (Sections, Hotspots, Theme, Units)     */}
      {/* ======================================================== */}
      {editingProject && (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xl space-y-6 animate-in fade-in">
          
          {/* Editor Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  AdVibe Visual Scrollytelling Builder
                </span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                  ID: {editingProject.id}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                Editing: {editingProject.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onPreviewProject(editingProject.slug)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Test Live</span>
              </button>

              <button
                onClick={() => setEditingProject(null)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveCurrentProject}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold transition-all shadow-md flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Publish / Save Changes</span>
              </button>
            </div>
          </div>

          {/* Sub-Tabs Selector */}
          <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-800 pb-3 text-xs font-bold">
            {[
              { key: 'basics', label: '1. Basic Info & SEO', icon: FileText },
              { key: 'sections', label: `2. Scrolly Sections (${editingProject.sections.length})`, icon: Layers },
              { key: 'tour3d', label: '3. 3D Virtual Tour (Auto-Run)', icon: RotateCw },
              { key: 'theme', label: '4. Theme & Aesthetics', icon: Sliders },
              { key: 'hotspots', label: `5. Master Plan Hotspots (${editingProject.masterPlan.hotspots.length})`, icon: Compass },
              { key: 'units', label: `6. Linked Units (${editingProject.linkedPropertyIds.length})`, icon: Building2 },
              { key: 'pricing', label: `7. Pricing Tiers (${editingProject.pricingTiers.length})`, icon: DollarSign }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = editorSubTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setEditorSubTab(tab.key as any)}
                  className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* SUB-TAB 1: BASICS */}
          {editorSubTab === 'basics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Project Title</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">URL Slug</label>
                <input
                  type="text"
                  value={editingProject.slug}
                  onChange={e => setEditingProject({ ...editingProject, slug: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Project Type</label>
                <select
                  value={editingProject.type}
                  onChange={e => setEditingProject({ ...editingProject, type: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Mixed-Use Megaproject">Mixed-Use Megaproject</option>
                  <option value="Commercial Development">Commercial Development</option>
                  <option value="Housing Society">Housing Society</option>
                  <option value="High-Rise Tower">High-Rise Tower</option>
                  <option value="Luxury Apartments">Luxury Apartments</option>
                  <option value="Smart Villa Community">Smart Villa Community</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Status</label>
                <select
                  value={editingProject.status}
                  onChange={e => setEditingProject({ ...editingProject, status: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Booking Open">Booking Open</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Sold Out">Sold Out</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-300 font-bold mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingProject.tagline}
                  onChange={e => setEditingProject({ ...editingProject, tagline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-300 font-bold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProject.description}
                  onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">City / Region</label>
                <input
                  type="text"
                  value={editingProject.city}
                  onChange={e => setEditingProject({ ...editingProject, city: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Starting Price (Formatted)</label>
                <input
                  type="text"
                  value={editingProject.starting_price_formatted}
                  onChange={e => setEditingProject({ ...editingProject, starting_price_formatted: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.featured}
                    onChange={e => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span className="font-bold text-white">Mark as Featured</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.published}
                    onChange={e => setEditingProject({ ...editingProject, published: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span className="font-bold text-white">Published / Publicly Accessible</span>
                </label>
              </div>
            </div>
          )}

          {/* SUB-TAB 2: DYNAMIC SECTIONS BUILDER */}
          {editorSubTab === 'sections' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Drag or use Up/Down arrows to reorder. Toggle checkbox to enable/disable sections.</span>
                <span>{editingProject.sections.length} Active Modules</span>
              </div>

              <div className="space-y-2.5">
                {editingProject.sections.map((sec, idx) => (
                  <div
                    key={sec.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      sec.isEnabled
                        ? 'bg-slate-950/80 border-slate-700 text-white'
                        : 'bg-slate-950/30 border-slate-800 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-mono text-xs font-bold text-slate-400 shrink-0">
                        {idx + 1}
                      </span>

                      <input
                        type="checkbox"
                        checked={sec.isEnabled}
                        onChange={() => handleToggleSectionEnabled(sec.id)}
                        className="rounded text-blue-600 shrink-0"
                      />

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">
                            {sec.type}
                          </span>
                          <span className="font-bold text-xs truncate text-white">{sec.title}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">{sec.subtitle}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleMoveSection(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
                        title="Move Section Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleMoveSection(idx, 'down')}
                        disabled={idx === editingProject.sections.length - 1}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
                        title="Move Section Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 3: 3D VIRTUAL TOUR (AUTO-RUN BY DEFAULT) */}
          {editorSubTab === 'tour3d' && (
            <div className="space-y-6 text-xs">
              {/* Tour Header & Auto-Run Controls */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <RotateCw className="w-4 h-4 text-amber-400" />
                      <span>3D Virtual Tour & Auto-Run Architecture</span>
                    </h4>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Configure 360° interactive tours with default auto-rotation, day/night lighting, and architectural hotspots.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-300">Auto-Run by Default:</span>
                    <button
                      type="button"
                      onClick={() => {
                        const currentTour = editingProject.virtualTour || {
                          provider: 'custom360',
                          url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2600&q=85',
                          title: 'Virtual 360 Walkthrough',
                          autoRun: true,
                          rotationSpeed: 1.0,
                          dayNightMode: true
                        };
                        setEditingProject({
                          ...editingProject,
                          virtualTour: {
                            ...currentTour,
                            autoRun: currentTour.autoRun !== false ? false : true
                          }
                        });
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                        (editingProject.virtualTour?.autoRun ?? true)
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <RotateCw className={`w-3.5 h-3.5 ${(editingProject.virtualTour?.autoRun ?? true) ? 'animate-spin' : ''}`} />
                      <span>{(editingProject.virtualTour?.autoRun ?? true) ? 'Auto-Run: ENABLED' : 'Auto-Run: DISABLED'}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Tour Title</label>
                    <input
                      type="text"
                      value={editingProject.virtualTour?.title || 'Interactive 3D Virtual Tour'}
                      onChange={e => setEditingProject({
                        ...editingProject,
                        virtualTour: {
                          ...(editingProject.virtualTour || { provider: 'custom360', url: '' }),
                          title: e.target.value
                        }
                      })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                      placeholder="e.g. Grand Margalla 360 Walkthrough"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Auto-Rotation Speed</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { label: '0.5x', value: 0.5 },
                        { label: '1.0x', value: 1.0 },
                        { label: '1.5x', value: 1.5 },
                        { label: '2.0x', value: 2.0 }
                      ].map(spd => {
                        const isSelected = (editingProject.virtualTour?.rotationSpeed ?? 1.0) === spd.value;
                        return (
                          <button
                            key={spd.label}
                            type="button"
                            onClick={() => setEditingProject({
                              ...editingProject,
                              virtualTour: {
                                ...(editingProject.virtualTour || { provider: 'custom360', url: '' }),
                                rotationSpeed: spd.value
                              }
                            })}
                            className={`py-2 rounded-lg font-mono font-bold text-center transition-all ${
                              isSelected
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {spd.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Lighting Support</label>
                    <button
                      type="button"
                      onClick={() => {
                        const current = editingProject.virtualTour?.dayNightMode ?? true;
                        setEditingProject({
                          ...editingProject,
                          virtualTour: {
                            ...(editingProject.virtualTour || { provider: 'custom360', url: '' }),
                            dayNightMode: !current
                          }
                        });
                      }}
                      className={`w-full py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all ${
                        (editingProject.virtualTour?.dayNightMode ?? true)
                          ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span>Day / Twilight Mode: {(editingProject.virtualTour?.dayNightMode ?? true) ? 'Enabled' : 'Disabled'}</span>
                      <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Visitor Guidance / Instructions</label>
                  <input
                    type="text"
                    value={editingProject.virtualTour?.instructions || 'Auto-running 360° tour. Drag to explore anytime or click hotspots.'}
                    onChange={e => setEditingProject({
                      ...editingProject,
                      virtualTour: {
                        ...(editingProject.virtualTour || { provider: 'custom360', url: '' }),
                        instructions: e.target.value
                      }
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              {/* Scenes Manager */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      3D Scenes & Panoramic Viewpoints ({editingProject.virtualTour?.scenes?.length || 0})
                    </h4>
                    <p className="text-slate-400 text-[11px]">
                      Add 360° panoramas for exterior podiums, model suites, lobby atriums, and master bedrooms.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const scenes = editingProject.virtualTour?.scenes || [];
                      const newScene = {
                        id: `scene-${Date.now()}`,
                        name: `Scene ${scenes.length + 1} - Show Area`,
                        category: 'Interior',
                        imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2600&q=85',
                        nightImageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2600&q=85',
                        description: 'Ultra-luxury high-ceiling panoramic architectural finishing.',
                        hotspots: [
                          {
                            id: `spot-${Date.now()}`,
                            x: 45,
                            y: 50,
                            title: 'UPVC Triple Glazed Window',
                            description: 'Acoustic thermal insulating glazing.'
                          }
                        ]
                      };
                      setEditingProject({
                        ...editingProject,
                        virtualTour: {
                          ...(editingProject.virtualTour || { provider: 'custom360', url: newScene.imageUrl }),
                          scenes: [...scenes, newScene]
                        }
                      });
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add 3D Scene</span>
                  </button>
                </div>

                {/* Scenes List */}
                <div className="space-y-4">
                  {(editingProject.virtualTour?.scenes || []).map((scene, sIdx) => (
                    <div key={scene.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
                            {sIdx + 1}
                          </span>
                          <span className="font-bold text-white text-sm">{scene.name}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold">
                            {scene.category}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const updatedScenes = (editingProject.virtualTour?.scenes || []).filter(s => s.id !== scene.id);
                            setEditingProject({
                              ...editingProject,
                              virtualTour: {
                                ...editingProject.virtualTour!,
                                scenes: updatedScenes
                              }
                            });
                          }}
                          className="p-1.5 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                          title="Delete Scene"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-slate-300 font-bold mb-1">Scene Name</label>
                          <input
                            type="text"
                            value={scene.name}
                            onChange={e => {
                              const updatedScenes = [...(editingProject.virtualTour?.scenes || [])];
                              updatedScenes[sIdx] = { ...scene, name: e.target.value };
                              setEditingProject({
                                ...editingProject,
                                virtualTour: { ...editingProject.virtualTour!, scenes: updatedScenes }
                              });
                            }}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-300 font-bold mb-1">Category</label>
                          <select
                            value={scene.category}
                            onChange={e => {
                              const updatedScenes = [...(editingProject.virtualTour?.scenes || [])];
                              updatedScenes[sIdx] = { ...scene, category: e.target.value };
                              setEditingProject({
                                ...editingProject,
                                virtualTour: { ...editingProject.virtualTour!, scenes: updatedScenes }
                              });
                            }}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
                          >
                            <option value="Exterior">Exterior & Facade</option>
                            <option value="Interior">Interior Living Suite</option>
                            <option value="Bedroom">Master Bedroom Suite</option>
                            <option value="Amenities">Rooftop & Amenities</option>
                            <option value="View">Margalla Scenic Viewpoint</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-slate-300 font-bold mb-1">Description</label>
                          <input
                            type="text"
                            value={scene.description || ''}
                            onChange={e => {
                              const updatedScenes = [...(editingProject.virtualTour?.scenes || [])];
                              updatedScenes[sIdx] = { ...scene, description: e.target.value };
                              setEditingProject({
                                ...editingProject,
                                virtualTour: { ...editingProject.virtualTour!, scenes: updatedScenes }
                              });
                            }}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
                            placeholder="Brief architectural notes..."
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-300 font-bold mb-1 flex items-center justify-between">
                            <span>Daytime 360 Panorama URL</span>
                            <span className="text-[10px] text-amber-400 font-mono">360 Equirectangular</span>
                          </label>
                          <input
                            type="text"
                            value={scene.imageUrl}
                            onChange={e => {
                              const updatedScenes = [...(editingProject.virtualTour?.scenes || [])];
                              updatedScenes[sIdx] = { ...scene, imageUrl: e.target.value };
                              setEditingProject({
                                ...editingProject,
                                virtualTour: { ...editingProject.virtualTour!, scenes: updatedScenes }
                              });
                            }}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-mono text-[11px]"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-300 font-bold mb-1 flex items-center justify-between">
                            <span>Twilight / Night 360 Panorama URL</span>
                            <span className="text-[10px] text-indigo-400 font-mono">Night Lighting</span>
                          </label>
                          <input
                            type="text"
                            value={scene.nightImageUrl || ''}
                            onChange={e => {
                              const updatedScenes = [...(editingProject.virtualTour?.scenes || [])];
                              updatedScenes[sIdx] = { ...scene, nightImageUrl: e.target.value };
                              setEditingProject({
                                ...editingProject,
                                virtualTour: { ...editingProject.virtualTour!, scenes: updatedScenes }
                              });
                            }}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-mono text-[11px]"
                            placeholder="https://..."
                          />
                        </div>
                      </div>

                      {/* Scene Hotspots */}
                      <div className="pt-2 border-t border-slate-800/80">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold text-slate-300">
                            Interactive Hotspot Beacons ({scene.hotspots?.length || 0})
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const currentHotspots = scene.hotspots || [];
                              const newSpot = {
                                id: `spot-${Date.now()}`,
                                x: 50,
                                y: 50,
                                title: 'Architectural Spec Point',
                                description: 'Double glazed thermal acoustic finish.'
                              };
                              const updatedScenes = [...(editingProject.virtualTour?.scenes || [])];
                              updatedScenes[sIdx] = {
                                ...scene,
                                hotspots: [...currentHotspots, newSpot]
                              };
                              setEditingProject({
                                ...editingProject,
                                virtualTour: { ...editingProject.virtualTour!, scenes: updatedScenes }
                              });
                            }}
                            className="text-[10px] text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Beacon</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {(scene.hotspots || []).map((spot, spotIdx) => (
                            <div key={spot.id} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                              <div className="space-y-1 flex-1">
                                <input
                                  type="text"
                                  value={spot.title}
                                  onChange={e => {
                                    const updatedHotspots = [...(scene.hotspots || [])];
                                    updatedHotspots[spotIdx] = { ...spot, title: e.target.value };
                                    const updatedScenes = [...(editingProject.virtualTour?.scenes || [])];
                                    updatedScenes[sIdx] = { ...scene, hotspots: updatedHotspots };
                                    setEditingProject({
                                      ...editingProject,
                                      virtualTour: { ...editingProject.virtualTour!, scenes: updatedScenes }
                                    });
                                  }}
                                  className="w-full bg-transparent border-0 text-white font-bold text-xs p-0 focus:ring-0"
                                  placeholder="Beacon Title"
                                />
                                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                  <span>X: {spot.x}%</span>
                                  <span>•</span>
                                  <span>Y: {spot.y}%</span>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  const updatedHotspots = (scene.hotspots || []).filter(h => h.id !== spot.id);
                                  const updatedScenes = [...(editingProject.virtualTour?.scenes || [])];
                                  updatedScenes[sIdx] = { ...scene, hotspots: updatedHotspots };
                                  setEditingProject({
                                    ...editingProject,
                                    virtualTour: { ...editingProject.virtualTour!, scenes: updatedScenes }
                                  });
                                }}
                                className="p-1 text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LIVE 3D TOUR TEST PREVIEW */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Live 3D Virtual Tour Preview (Auto-Run Verified)</span>
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    Interact directly to test default auto-run rotation, speeds, and lighting.
                  </span>
                </div>

                <div className="w-full h-[400px] rounded-xl overflow-hidden border border-slate-800">
                  <Advibe3DVirtualTour
                    project={editingProject}
                    embedded={true}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 4: THEME */}
          {editorSubTab === 'theme' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Primary Brand Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={editingProject.theme.primaryColor}
                    onChange={e => setEditingProject({
                      ...editingProject,
                      theme: { ...editingProject.theme, primaryColor: e.target.value }
                    })}
                    className="w-12 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={editingProject.theme.primaryColor}
                    onChange={e => setEditingProject({
                      ...editingProject,
                      theme: { ...editingProject.theme, primaryColor: e.target.value }
                    })}
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Accent Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={editingProject.theme.accentColor}
                    onChange={e => setEditingProject({
                      ...editingProject,
                      theme: { ...editingProject.theme, accentColor: e.target.value }
                    })}
                    className="w-12 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={editingProject.theme.accentColor}
                    onChange={e => setEditingProject({
                      ...editingProject,
                      theme: { ...editingProject.theme, accentColor: e.target.value }
                    })}
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Background Atmosphere</label>
                <select
                  value={editingProject.theme.bgStyle}
                  onChange={e => setEditingProject({
                    ...editingProject,
                    theme: { ...editingProject.theme, bgStyle: e.target.value as any }
                  })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  <option value="midnight">Midnight Atmospheric Deep Blue (#0b0f19)</option>
                  <option value="luxury_black">Obsidian Luxury Jet Black (#000000)</option>
                  <option value="slate">Industrial Slate (#0f172a)</option>
                  <option value="light">Refined Modern Light</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Heading Typography</label>
                <select
                  value={editingProject.theme.fontHeading}
                  onChange={e => setEditingProject({
                    ...editingProject,
                    theme: { ...editingProject.theme, fontHeading: e.target.value as any }
                  })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Playfair Display">Playfair Display (Editorial Luxury)</option>
                  <option value="Plus Jakarta Sans">Plus Jakarta Sans (Sleek Tech)</option>
                  <option value="Cormorant Garamond">Cormorant Garamond (High Elegance)</option>
                  <option value="Outfit">Outfit (Clean Modern)</option>
                </select>
              </div>
            </div>
          )}

          {/* SUB-TAB 4: HOTSPOTS */}
          {editorSubTab === 'hotspots' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">
                  Configure interactive pins on master plan.
                </span>
                <button
                  onClick={() => {
                    const newHp = {
                      id: `hp-${Date.now()}`,
                      x: 50,
                      y: 50,
                      title: 'New Sector Hotspot',
                      category: 'Residential Block' as const,
                      description: 'Sector details and available units.',
                      status: 'Available' as const,
                      totalPlots: 50,
                      availablePlots: 12
                    };
                    setEditingProject({
                      ...editingProject,
                      masterPlan: {
                        ...editingProject.masterPlan,
                        hotspots: [...editingProject.masterPlan.hotspots, newHp]
                      }
                    });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  + Add Hotspot Beacon
                </button>
              </div>

              <div className="space-y-3">
                {editingProject.masterPlan.hotspots.map((hp, hIdx) => (
                  <div key={hp.id} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Hotspot #{hIdx + 1}: {hp.title}</span>
                      <button
                        onClick={() => {
                          setEditingProject({
                            ...editingProject,
                            masterPlan: {
                              ...editingProject.masterPlan,
                              hotspots: editingProject.masterPlan.hotspots.filter(h => h.id !== hp.id)
                            }
                          });
                        }}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-slate-400 text-[10px] mb-1">Title</label>
                        <input
                          type="text"
                          value={hp.title}
                          onChange={e => {
                            const updated = [...editingProject.masterPlan.hotspots];
                            updated[hIdx].title = e.target.value;
                            setEditingProject({ ...editingProject, masterPlan: { ...editingProject.masterPlan, hotspots: updated } });
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 text-[10px] mb-1">Coordinates (X%, Y%)</label>
                        <div className="flex gap-1.5">
                          <input
                            type="number"
                            value={hp.x}
                            onChange={e => {
                              const updated = [...editingProject.masterPlan.hotspots];
                              updated[hIdx].x = Number(e.target.value);
                              setEditingProject({ ...editingProject, masterPlan: { ...editingProject.masterPlan, hotspots: updated } });
                            }}
                            className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white font-mono"
                            title="X percentage"
                          />
                          <input
                            type="number"
                            value={hp.y}
                            onChange={e => {
                              const updated = [...editingProject.masterPlan.hotspots];
                              updated[hIdx].y = Number(e.target.value);
                              setEditingProject({ ...editingProject, masterPlan: { ...editingProject.masterPlan, hotspots: updated } });
                            }}
                            className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white font-mono"
                            title="Y percentage"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-400 text-[10px] mb-1">Status</label>
                        <select
                          value={hp.status}
                          onChange={e => {
                            const updated = [...editingProject.masterPlan.hotspots];
                            updated[hIdx].status = e.target.value as any;
                            setEditingProject({ ...editingProject, masterPlan: { ...editingProject.masterPlan, hotspots: updated } });
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white"
                        >
                          <option value="Available">Available</option>
                          <option value="Booking Fast">Booking Fast</option>
                          <option value="Sold Out">Sold Out</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-400 text-[10px] mb-1">Linked Property Record</label>
                        <select
                          value={hp.linkedPropertyId || ''}
                          onChange={e => {
                            const updated = [...editingProject.masterPlan.hotspots];
                            updated[hIdx].linkedPropertyId = e.target.value || undefined;
                            setEditingProject({ ...editingProject, masterPlan: { ...editingProject.masterPlan, hotspots: updated } });
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white"
                        >
                          <option value="">None (Generic Hotspot)</option>
                          {properties.map(p => (
                            <option key={p.id} value={p.id}>
                              {p.title} ({p.priceFormatted})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 5: LINKED UNITS */}
          {editorSubTab === 'units' && (
            <div className="space-y-4 text-xs">
              <div className="text-slate-400">
                Select from existing properties database to display inside the project's live inventory section without duplicating data.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                {properties.map(prop => {
                  const isLinked = editingProject.linkedPropertyIds.includes(prop.id);
                  return (
                    <div
                      key={prop.id}
                      onClick={() => {
                        const newLinked = isLinked
                          ? editingProject.linkedPropertyIds.filter(id => id !== prop.id)
                          : [...editingProject.linkedPropertyIds, prop.id];
                        setEditingProject({ ...editingProject, linkedPropertyIds: newLinked });
                      }}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isLinked
                          ? 'bg-blue-600/20 border-blue-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={prop.images[0]}
                          alt={prop.title}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-700"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-white truncate">{prop.title}</div>
                          <div className="text-[10px] text-blue-400 font-mono">{prop.priceFormatted}</div>
                        </div>
                      </div>

                      <div className={`w-6 h-6 rounded-md flex items-center justify-center font-bold ${
                        isLinked ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-600'
                      }`}>
                        {isLinked ? '✓' : '+'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SUB-TAB 6: PRICING */}
          {editorSubTab === 'pricing' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Configure transparent payment schedules and tiers.</span>
                <button
                  onClick={() => {
                    const newTier = {
                      id: `tier-${Date.now()}`,
                      unitType: '10 Marla Signature Plot',
                      size: '250 Sq Yds',
                      totalPrice: 'PKR 75,00,000',
                      downPayment: 'PKR 15,00,000 (20%)',
                      monthlyInstallment: 'PKR 1,20,000 x 36 Months',
                      possession: 'PKR 15,00,000 on Ballot',
                      features: ['100% NOC Clearance', 'Immediate Allocation']
                    };
                    setEditingProject({
                      ...editingProject,
                      pricingTiers: [...editingProject.pricingTiers, newTier]
                    });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  + Add Pricing Tier
                </button>
              </div>

              <div className="space-y-3">
                {editingProject.pricingTiers.map((tier, tIdx) => (
                  <div key={tier.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Tier #{tIdx + 1}: {tier.unitType}</span>
                      <button
                        onClick={() => {
                          setEditingProject({
                            ...editingProject,
                            pricingTiers: editingProject.pricingTiers.filter(t => t.id !== tier.id)
                          });
                        }}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-slate-400 text-[10px] mb-1">Unit Type</label>
                        <input
                          type="text"
                          value={tier.unitType}
                          onChange={e => {
                            const updated = [...editingProject.pricingTiers];
                            updated[tIdx].unitType = e.target.value;
                            setEditingProject({ ...editingProject, pricingTiers: updated });
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 text-[10px] mb-1">Total Package Price</label>
                        <input
                          type="text"
                          value={tier.totalPrice}
                          onChange={e => {
                            const updated = [...editingProject.pricingTiers];
                            updated[tIdx].totalPrice = e.target.value;
                            setEditingProject({ ...editingProject, pricingTiers: updated });
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 text-[10px] mb-1">Monthly Installment</label>
                        <input
                          type="text"
                          value={tier.monthlyInstallment}
                          onChange={e => {
                            const updated = [...editingProject.pricingTiers];
                            updated[tIdx].monthlyInstallment = e.target.value;
                            setEditingProject({ ...editingProject, pricingTiers: updated });
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ======================================================== */}
      {/* 3. LEADS MANAGEMENT TAB                                  */}
      {/* ======================================================== */}
      {activeTab === 'leads' && (
        <div className="space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-300">Filter Status:</span>
              {['all', 'new', 'contacted', 'site_visit_booked', 'closed'].map(st => (
                <button
                  key={st}
                  onClick={() => setLeadStatusFilter(st)}
                  className={`px-3 py-1 rounded-xl font-bold uppercase text-[10px] tracking-wider transition-all ${
                    leadStatusFilter === st
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {st.replace(/_/g, ' ')}
                </button>
              ))}
            </div>

            <button
              onClick={exportLeadsToCSV}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-2 transition-colors border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Inquirer</th>
                  <th className="py-3.5 px-4">Project</th>
                  <th className="py-3.5 px-4">Preferred Unit</th>
                  <th className="py-3.5 px-4">Message</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Direct Outreach</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {leads
                  .filter(l => leadStatusFilter === 'all' || l.status === leadStatusFilter)
                  .map(lead => (
                    <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-white">{lead.name}</div>
                        <div className="text-[10px] text-slate-400">{lead.phone}</div>
                        {lead.email && <div className="text-[10px] text-blue-400">{lead.email}</div>}
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-200">{lead.projectTitle}</span>
                        <div className="text-[10px] text-slate-500">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-slate-300 font-medium">
                        {lead.preferredUnit}
                      </td>

                      <td className="py-3 px-4 max-w-xs">
                        <p className="line-clamp-2 text-slate-400 text-[11px]">{lead.message}</p>
                      </td>

                      <td className="py-3 px-4">
                        <select
                          value={lead.status}
                          onChange={e => onUpdateLeadStatus(lead.id, e.target.value as any)}
                          className="bg-slate-950 border border-slate-700 text-[11px] font-bold rounded-lg px-2.5 py-1 text-white focus:outline-hidden"
                        >
                          <option value="new">New Lead</option>
                          <option value="contacted">Contacted</option>
                          <option value="site_visit_booked">Site Visit Booked</option>
                          <option value="closed">Closed / Won</option>
                        </select>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Salam ${lead.name}! Following up regarding your inquiry for ${lead.projectTitle}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href={`tel:${lead.phone}`}
                            className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                            title="Call Phone"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. BROKER PERMISSIONS TAB                                */}
      {/* ======================================================== */}
      {activeTab === 'permissions' && currentRole === 'admin' && (
        <div className="space-y-4 text-xs">
          <div className="bg-blue-950/20 border border-blue-500/30 p-4 rounded-2xl text-slate-300 leading-relaxed">
            <span className="font-bold text-white block mb-1">AdVibe Certified Broker Permissions</span>
            By default, Super Admins have complete authoring and publishing permissions. Toggle below to grant verified agencies permission to publish and manage their own mega-developments.
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Agency / Brokerage</th>
                  <th className="py-3.5 px-4">City</th>
                  <th className="py-3.5 px-4">Active Listings</th>
                  <th className="py-3.5 px-4">AdVibe Authoring Permission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {agencies.map(agency => (
                  <tr key={agency.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={agency.avatar}
                          alt={agency.name}
                          className="w-9 h-9 rounded-xl object-cover border border-slate-700 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-white">{agency.companyName || agency.name}</div>
                          <div className="text-[10px] text-slate-400">{agency.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">{agency.city}</td>
                    <td className="py-3 px-4 font-mono">{agency.activeListings}</td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => onToggleAgencyAdvibePermission(agency.id, !agency.canManageAdvibe)}
                        className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                          agency.canManageAdvibe
                            ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
                        }`}
                      >
                        <Shield className="w-3.5 h-3.5" />
                        <span>{agency.canManageAdvibe ? 'Permission Granted' : 'Revoked / Disabled'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdvibeAdminManager;

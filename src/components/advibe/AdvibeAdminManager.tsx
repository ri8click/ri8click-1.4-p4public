// FILE: src/components/advibe/AdvibeAdminManager.tsx
import React, { useState, useRef } from 'react';
import {
  Building2,
  Plus,
  Edit3,
  Trash2,
  Copy,
  Eye,
  Check,
  ArrowUp,
  ArrowDown,
  Search,
  MapPin,
  FileText,
  Users,
  Shield,
  Layers,
  Compass,
  DollarSign,
  Upload,
  Image as ImageIcon,
  Video,
  Film,
  Star,
  X
} from 'lucide-react';
import Advibe3DVirtualTour from './Advibe3DVirtualTour';
import {
  AdVibeProject,
  AdVibeLead,
  Property,
  AgencyAccount,
  ProvinceCityData
} from '../../types';
import { INITIAL_PROVINCE_CITIES } from '../../data/mockData';

interface AdvibeAdminManagerProps {
  projects: AdVibeProject[];
  leads: AdVibeLead[];
  agencies: AgencyAccount[];
  properties: Property[];
  provinceCityData?: ProvinceCityData[];
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
  provinceCityData = INITIAL_PROVINCE_CITIES,
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
  const [editorSubTab, setEditorSubTab] = useState<
    'basics' | 'media' | 'sections' | 'tour3d' | 'hotspots' | 'units' | 'pricing'
  >('basics');
  const [searchQuery, setSearchQuery] = useState('');
  const [newFeatureText, setNewFeatureText] = useState('');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [uploadStatusMsg, setUploadStatusMsg] = useState<string | null>(null);

  const mainImageFileRef = useRef<HTMLInputElement>(null);
  const bannerImageFileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);
  const videoFileRef = useRef<HTMLInputElement>(null);

  const visibleProjects = projects.filter(p => {
    if (currentRole === 'admin') return true;
    if (p.dealerId === currentAgencyId) return true;
    return true;
  });

  const compressImageFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_W = 1600;
          const MAX_H = 1100;
          let w = img.width;
          let h = img.height;
          if (w > h && w > MAX_W) {
            h = Math.round((h * MAX_W) / w);
            w = MAX_W;
          } else if (h > MAX_H) {
            w = Math.round((w * MAX_H) / h);
            h = MAX_H;
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const notifyStatus = (msg: string) => {
    setUploadStatusMsg(msg);
    setTimeout(() => setUploadStatusMsg(null), 3500);
  };

  const handleCreateNewProject = () => {
    const defaultImg =
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=85';
    const newProj: AdVibeProject = {
      id: `advibe-proj-${Date.now()}`,
      title: 'New Executive Development',
      slug: `new-development-${Date.now().toString().slice(-4)}`,
      type: 'Housing Society',
      purpose: 'for_sale',
      propertyCategory: 'projects',
      mainImage: defaultImg,
      bannerImage: defaultImg,
      heroVideoUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      heroVideoTitle: 'Official Project Walkthrough',
      province: 'Punjab',
      city: 'Taxila',
      society: 'Faisal Hills',
      area: 'Faisal Hills Margalla Zone',
      address: 'Main Boulevard, Faisal Hills, Taxila',
      areaSize: '1',
      areaUnit: 'Kanal',
      bedrooms: 5,
      bathrooms: 6,
      floors: 2,
      features: [
        '100% RDA / TMA Approved NOC',
        'German UPVC Soundproof Glazing',
        'Underground Electrification & Gas',
        '24/7 Gated Security & CCTV'
      ],
      logo: defaultImg,
      tagline: 'A premier architectural landmark in the Taxila & Islamabad corridor.',
      description:
        'Master-planned development featuring residential villas, commercial broadways, and modern underground infrastructure.',
      coordinates: { lat: 33.7312, lng: 72.834, zoom: 15 },
      starting_price: 3500000,
      starting_price_formatted: 'PKR 35 Lakh',
      status: 'Booking Open',
      featured: true,
      published: true,
      schedule: {
        startDate: '2025-01-01',
        launchDate: '2025-06-01',
        completionDate: '2028-12-31'
      },
      theme: {
        primaryColor: '#2563eb',
        accentColor: '#f59e0b',
        bgStyle: 'light',
        fontHeading: 'Plus Jakarta Sans',
        fontBody: 'Plus Jakarta Sans'
      },
      seo: {
        metaTitle: 'New Executive Development | AdVibe Showcase',
        metaDescription: 'Explore modern living and investment opportunities.',
        ogImage: defaultImg,
        keywords: ['Real Estate', 'AdVibe', 'Taxila', 'Faisal Hills']
      },
      developer: {
        name: 'Ri8click Consortium & Partners',
        logo: defaultImg,
        description: 'Pioneering infrastructure and high-rise developments across Pakistan.',
        completedProjects: 15,
        rating: 4.9
      },
      highlights: [
        {
          id: 'hl-1',
          title: 'Prime GT Road & Motorway Access',
          value: 'Signal-Free Corridor',
          description: 'Direct access to N-5 GT Road and M-1 Motorway interchange.',
          iconName: 'Compass'
        }
      ],
      amenities: [
        {
          id: 'am-1',
          name: 'Executive Residents Clubhouse',
          category: 'Wellness & Sports',
          description: 'Equipped gymnasium, swimming pool, and community hall.',
          iconName: 'Waves'
        }
      ],
      locationPoints: [
        {
          id: 'loc-1',
          name: 'Main GT Road N-5 Taxila',
          category: 'Highway & Access',
          distance: '1.2 km',
          driveTime: '3 mins'
        }
      ],
      masterPlan: {
        imageUrl:
          'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1200&q=80',
        legend: [
          { category: 'Residential Enclave', color: '#3b82f6' },
          { category: 'Commercial Broadway', color: '#f59e0b' }
        ],
        hotspots: [
          {
            id: 'hp-1',
            x: 50,
            y: 50,
            title: 'Executive Block Villas',
            category: 'Residential Block',
            description: '5 Marla, 10 Marla, and 1 Kanal prime plots.',
            status: 'Available'
          }
        ]
      },
      gallery: [
        {
          id: 'gal-1',
          url: defaultImg,
          type: 'image',
          category: 'Exterior',
          caption: 'Main entrance gate and boulevard.'
        }
      ],
      videos: [
        {
          id: 'vid-1',
          title: 'Official Project Walkthrough',
          category: 'Project Tour',
          type: 'hosted',
          url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          thumbnail: defaultImg,
          duration: '01:15'
        }
      ],
      virtualTour: {
        provider: 'custom360',
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
        title: 'Virtual 360° Walkthrough',
        autoRun: true,
        rotationSpeed: 1.0,
        dayNightMode: true
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
          possession: 'Immediate Allocation',
          features: ['100% NOC Clearance', 'Level Solid Land']
        }
      ],
      sections: [
        { id: 'sec-hero', type: 'hero', title: 'New Executive Development', subtitle: 'Where Elegance Meets Nature', isEnabled: true, order: 1 },
        { id: 'sec-intro', type: 'intro', title: 'Project Overview', subtitle: 'A Vision for Modern Living', isEnabled: true, order: 2 },
        { id: 'sec-highlights', type: 'highlights', title: 'Key Highlights', subtitle: 'Core Advantages', isEnabled: true, order: 3 },
        { id: 'sec-master-plan', type: 'master_plan', title: 'Interactive Master Plan', subtitle: 'Explore Sectors & Blocks', isEnabled: true, order: 4 },
        { id: 'sec-location', type: 'location', title: 'Location & Distances', subtitle: 'Strategic Connectivity', isEnabled: true, order: 5 },
        { id: 'sec-amenities', type: 'amenities', title: 'World-Class Amenities', subtitle: 'Lifestyle Facilities', isEnabled: true, order: 6 },
        { id: 'sec-gallery', type: 'gallery', title: 'Project Gallery', subtitle: 'Visual Showcase', isEnabled: true, order: 7 },
        { id: 'sec-videos', type: 'videos', title: 'Project Videos', subtitle: 'Walkthrough Clips', isEnabled: true, order: 8 },
        { id: 'sec-virtual-tour', type: 'virtual_tour', title: '360° Virtual Tour', subtitle: 'Panoramic View', isEnabled: true, order: 9 },
        { id: 'sec-units', type: 'units', title: 'Available Units', subtitle: 'Live Inventory', isEnabled: true, order: 10 },
        { id: 'sec-pricing', type: 'pricing', title: 'Payment Plans', subtitle: 'Flexible Schedules', isEnabled: true, order: 11 },
        { id: 'sec-developer', type: 'developer', title: 'About Developer', subtitle: 'Master Builders', isEnabled: true, order: 12 },
        { id: 'sec-enquiry', type: 'enquiry', title: 'Book Site Visit', subtitle: 'Reserve Your Slot', isEnabled: true, order: 13 }
      ],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setEditingProject(newProj);
    setEditorSubTab('basics');
  };

  const handleUploadMainOrBanner = async (
    target: 'mainImage' | 'bannerImage',
    file?: File
  ) => {
    if (!file || !editingProject) return;
    try {
      const dataUrl = await compressImageFile(file);
      const updatedGallery = [...(editingProject.gallery || [])];
      if (!updatedGallery.some(g => g.url === dataUrl)) {
        updatedGallery.unshift({
          id: `gal-${Date.now()}`,
          url: dataUrl,
          type: 'image',
          category: 'Exterior',
          caption: target === 'mainImage' ? 'Main Listing Cover' : 'Main Hero Banner'
        });
      }
      setEditingProject({
        ...editingProject,
        [target]: dataUrl,
        seo:
          target === 'mainImage'
            ? { ...editingProject.seo, ogImage: dataUrl }
            : editingProject.seo,
        gallery: updatedGallery
      });
      notifyStatus(
        target === 'mainImage'
          ? 'Main Listing Image uploaded from computer!'
          : 'Main AdVibe Banner Image uploaded from computer!'
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleUploadGalleryFiles = async (files: FileList | null) => {
    if (!files || files.length === 0 || !editingProject) return;
    const valid = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (valid.length === 0) return;

    const encoded = await Promise.all(valid.map(compressImageFile));
    const newItems = encoded.map((url, idx) => ({
      id: `gal-${Date.now()}-${idx}`,
      url,
      type: 'image' as const,
      category: 'Exterior',
      caption: `${editingProject.title} — Photo ${editingProject.gallery.length + idx + 1}`
    }));

    const nextGallery = [...(editingProject.gallery || []), ...newItems];
    setEditingProject({
      ...editingProject,
      mainImage: editingProject.mainImage || nextGallery[0]?.url,
      bannerImage: editingProject.bannerImage || nextGallery[0]?.url,
      gallery: nextGallery
    });
    notifyStatus(`Uploaded ${newItems.length} photo(s) from your computer!`);
  };

  const handleUploadLocalVideo = (file?: File) => {
    if (!file || !editingProject) return;
    if (!file.type.startsWith('video/')) {
      notifyStatus('Please select a valid video file (MP4, WebM, MOV).');
      return;
    }
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > 45) {
      notifyStatus('Video file is over 45MB. Please use a shorter clip or paste a URL.');
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      const videoDataUrl = e.target?.result as string;
      const vidTitle =
        newVideoTitle.trim() || file.name.replace(/\.[^/.]+$/, '') || 'Project Walkthrough';
      const newVidItem = {
        id: `vid-${Date.now()}`,
        title: vidTitle,
        category: 'Project Tour',
        type: 'hosted' as const,
        url: videoDataUrl,
        thumbnail:
          editingProject.mainImage ||
          editingProject.seo?.ogImage ||
          editingProject.logo,
        duration: 'Walkthrough'
      };
      setEditingProject({
        ...editingProject,
        heroVideoUrl: videoDataUrl,
        heroVideoTitle: vidTitle,
        videos: [newVidItem, ...(editingProject.videos || [])]
      });
      setNewVideoTitle('');
      notifyStatus('Local video clip uploaded & set as AdVibe walkthrough!');
    };
    reader.readAsDataURL(file);
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    if (!editingProject) return;
    const newSections = [...editingProject.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;
    newSections.forEach((s, idx) => {
      s.order = idx + 1;
    });
    setEditingProject({ ...editingProject, sections: newSections });
  };

  const handleSaveCurrentProject = () => {
    if (!editingProject) return;
    const primaryCover =
      editingProject.mainImage ||
      editingProject.seo?.ogImage ||
      editingProject.gallery?.[0]?.url ||
      editingProject.logo;
    const primaryBanner =
      editingProject.bannerImage || primaryCover;

    const updatedProj: AdVibeProject = {
      ...editingProject,
      mainImage: primaryCover,
      bannerImage: primaryBanner,
      seo: {
        ...editingProject.seo,
        ogImage: primaryCover
      },
      updatedAt: new Date().toISOString().split('T')[0]
    };

    onSaveProject(updatedProj);
    setEditingProject(null);
    notifyStatus(`Saved "${updatedProj.title}" and synced across the portal!`);
  };

  const selectedProvinceObj = provinceCityData.find(
    p => p.province === (editingProject?.province || 'Punjab')
  );
  const selectedCityObj = selectedProvinceObj?.cities.find(
    c => c.name === (editingProject?.city || 'Taxila')
  );

  return (
    <div className="w-full space-y-6 text-slate-900">
      {/* Top Tabs Ribbon — Clean Light UI */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab('projects');
              setEditingProject(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'projects' && !editingProject
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>AdVibe Projects ({visibleProjects.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('leads');
              setEditingProject(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'leads'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Inquiries &amp; Leads ({leads.length})</span>
          </button>

          {currentRole === 'admin' && (
            <button
              type="button"
              onClick={() => {
                setActiveTab('permissions');
                setEditingProject(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'permissions'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Agency Permissions</span>
            </button>
          )}
        </div>

        {activeTab === 'projects' && !editingProject && (
          <button
            type="button"
            onClick={handleCreateNewProject}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create New AdVibe Project</span>
          </button>
        )}
      </div>

      {uploadStatusMsg && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{uploadStatusMsg}</span>
        </div>
      )}

      {/* 1. PROJECTS LIST TAB */}
      {activeTab === 'projects' && !editingProject && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search AdVibe projects..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Main Image &amp; Project</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">City / Society</th>
                  <th className="py-3.5 px-4">Starting Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visibleProjects
                  .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(project => {
                    const cover =
                      project.mainImage ||
                      project.seo?.ogImage ||
                      project.gallery?.[0]?.url ||
                      project.logo;
                    return (
                      <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={cover}
                              alt={project.title}
                              className="w-14 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                            />
                            <div>
                              <div className="font-extrabold text-slate-900 flex items-center gap-2">
                                <span>{project.title}</span>
                                {project.featured && (
                                  <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">
                                    Featured Banner
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-400 mt-0.5">
                                /{project.slug}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4 font-semibold text-slate-700">
                          {project.type}
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-bold text-slate-800">{project.city}</span>
                          <div className="text-[10px] text-slate-500">{project.area}</div>
                        </td>

                        <td className="py-3 px-4 font-extrabold text-blue-600">
                          {project.starting_price_formatted}
                        </td>

                        <td className="py-3 px-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {project.status}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => onPreviewProject(project.slug)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white transition-colors cursor-pointer"
                              title="Preview Showcase"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setEditingProject({ ...project });
                                setEditorSubTab('basics');
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit / Media</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => onDuplicateProject(project.id)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-600 text-slate-700 hover:text-white transition-colors cursor-pointer"
                              title="Duplicate"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                if (
                                  window.confirm(`Delete AdVibe project "${project.title}"?`)
                                ) {
                                  onDeleteProject(project.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white transition-colors cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. LIGHT USER-FRIENDLY PROJECT EDITOR */}
      {editingProject && (
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-md space-y-6">
          {/* Editor Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
                AdVibe Studio — Light &amp; User-Friendly Manager
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                Editing: {editingProject.title}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onPreviewProject(editingProject.slug)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>

              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveCurrentProject}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save &amp; Publish Changes</span>
              </button>
            </div>
          </div>

          {/* Sub-Tabs Selector */}
          <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-3 text-xs font-bold no-scrollbar">
            {[
              { key: 'basics', label: '1. Property & Location Details', icon: FileText },
              { key: 'media', label: '2. Main Banner, Photos & Video Upload', icon: ImageIcon },
              { key: 'sections', label: `3. Page Sections (${editingProject.sections.length})`, icon: Layers },
              { key: 'tour3d', label: '4. 360° Virtual Tour', icon: Compass },
              { key: 'hotspots', label: `5. Master Plan (${editingProject.masterPlan.hotspots.length})`, icon: MapPin },
              { key: 'units', label: `6. Linked Units (${editingProject.linkedPropertyIds.length})`, icon: Building2 },
              { key: 'pricing', label: `7. Payment Plans (${editingProject.pricingTiers.length})`, icon: DollarSign }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = editorSubTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setEditorSubTab(tab.key as any)}
                  className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* SUB-TAB 1: BASICS & POST-PROPERTY PARITY FIELDS */}
          {editorSubTab === 'basics' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="md:col-span-2">
                <label className="block text-slate-700 font-bold mb-1">Project / Property Title *</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">URL Slug</label>
                <input
                  type="text"
                  value={editingProject.slug}
                  onChange={e => setEditingProject({ ...editingProject, slug: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Project Type</label>
                <select
                  value={editingProject.type}
                  onChange={e => setEditingProject({ ...editingProject, type: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                >
                  <option value="Housing Society">Housing Society</option>
                  <option value="Commercial Mall & Tower">Commercial Mall &amp; Tower</option>
                  <option value="High-Rise Tower">High-Rise Tower</option>
                  <option value="Mixed-Use Megaproject">Mixed-Use Megaproject</option>
                  <option value="Luxury Villa Enclave">Luxury Villa Enclave</option>
                  <option value="Modular Smart Community">Modular Smart Community</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Purpose</label>
                <select
                  value={editingProject.purpose || 'for_sale'}
                  onChange={e => setEditingProject({ ...editingProject, purpose: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                >
                  <option value="for_sale">For Sale / Booking</option>
                  <option value="for_rent">For Rent / Corporate Lease</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Status</label>
                <select
                  value={editingProject.status}
                  onChange={e => setEditingProject({ ...editingProject, status: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                >
                  <option value="Booking Open">Booking Open</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="Ready for Possession">Ready for Possession</option>
                  <option value="Pre-Launch">Pre-Launch</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Province / City / Society Selectors */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">Province</label>
                <select
                  value={editingProject.province || 'Punjab'}
                  onChange={e => {
                    const prov = e.target.value;
                    const pObj = provinceCityData.find(p => p.province === prov);
                    const firstCity = pObj?.cities[0]?.name || editingProject.city;
                    const firstSoc = pObj?.cities[0]?.societies[0] || editingProject.area;
                    setEditingProject({
                      ...editingProject,
                      province: prov,
                      city: firstCity,
                      society: firstSoc,
                      area: firstSoc
                    });
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                >
                  {provinceCityData.map(p => (
                    <option key={p.province} value={p.province}>
                      {p.province}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">City</label>
                <select
                  value={editingProject.city}
                  onChange={e => {
                    const cName = e.target.value;
                    const cObj = selectedProvinceObj?.cities.find(c => c.name === cName);
                    const firstSoc = cObj?.societies[0] || editingProject.area;
                    setEditingProject({
                      ...editingProject,
                      city: cName,
                      society: firstSoc,
                      area: firstSoc
                    });
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                >
                  {(selectedProvinceObj?.cities || []).map(c => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Society / Area</label>
                <input
                  type="text"
                  list="advibe-society-list"
                  value={editingProject.area}
                  onChange={e =>
                    setEditingProject({
                      ...editingProject,
                      area: e.target.value,
                      society: e.target.value
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                />
                <datalist id="advibe-society-list">
                  {(selectedCityObj?.societies || []).map(s => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Starting Price (Numeric PKR)</label>
                <input
                  type="number"
                  value={editingProject.starting_price}
                  onChange={e =>
                    setEditingProject({
                      ...editingProject,
                      starting_price: Number(e.target.value)
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Formatted Starting Price</label>
                <input
                  type="text"
                  value={editingProject.starting_price_formatted}
                  onChange={e =>
                    setEditingProject({
                      ...editingProject,
                      starting_price_formatted: e.target.value
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Plot/Unit Size</label>
                  <input
                    type="text"
                    value={editingProject.areaSize || '5'}
                    onChange={e =>
                      setEditingProject({ ...editingProject, areaSize: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Unit</label>
                  <select
                    value={editingProject.areaUnit || 'Marla'}
                    onChange={e =>
                      setEditingProject({ ...editingProject, areaUnit: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  >
                    <option value="Marla">Marla</option>
                    <option value="Kanal">Kanal</option>
                    <option value="Sq Ft">Sq Ft</option>
                    <option value="Sq Yd">Sq Yd</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-3">
                <label className="block text-slate-700 font-bold mb-1">Full Address</label>
                <input
                  type="text"
                  value={editingProject.address}
                  onChange={e =>
                    setEditingProject({ ...editingProject, address: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-slate-700 font-bold mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingProject.tagline}
                  onChange={e =>
                    setEditingProject({ ...editingProject, tagline: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-slate-700 font-bold mb-1">Comprehensive Description</label>
                <textarea
                  rows={3}
                  value={editingProject.description}
                  onChange={e =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              {/* Feature Tags Manager */}
              <div className="md:col-span-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
                <label className="block text-slate-800 font-bold">
                  Key Project Features &amp; NOC Highlights
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add feature (e.g. RDA Approved, Underground Electricity, 1% Monthly Plan)"
                    value={newFeatureText}
                    onChange={e => setNewFeatureText(e.target.value)}
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newFeatureText.trim()) return;
                      setEditingProject({
                        ...editingProject,
                        features: [
                          ...(editingProject.features || []),
                          newFeatureText.trim()
                        ]
                      });
                      setNewFeatureText('');
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold cursor-pointer"
                  >
                    + Add Feature
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(editingProject.features || []).map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 font-semibold"
                    >
                      <span>{feat}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingProject({
                            ...editingProject,
                            features: (editingProject.features || []).filter(
                              (_, i) => i !== idx
                            )
                          })
                        }
                        className="text-slate-400 hover:text-rose-600 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-3 flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.featured}
                    onChange={e =>
                      setEditingProject({ ...editingProject, featured: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <span className="font-bold text-slate-800">
                    Set as Featured AdVibe Banner Project
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.published}
                    onChange={e =>
                      setEditingProject({ ...editingProject, published: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <span className="font-bold text-slate-800">
                    Published (Visible to All Visitors)
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* SUB-TAB 2: MAIN IMAGE, BANNER IMAGE, LOCAL GALLERY & VIDEO UPLOADER */}
          {editorSubTab === 'media' && (
            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 1. Main Listing Card Image */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">
                        Main Listing Card Image
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Displayed on the AdVibe project card in the directory listing.
                      </p>
                    </div>
                    <input
                      ref={mainImageFileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e =>
                        handleUploadMainOrBanner('mainImage', e.target.files?.[0])
                      }
                    />
                    <button
                      type="button"
                      onClick={() => mainImageFileRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload from PC</span>
                    </button>
                  </div>

                  <input
                    type="text"
                    value={editingProject.mainImage || ''}
                    onChange={e =>
                      setEditingProject({
                        ...editingProject,
                        mainImage: e.target.value,
                        seo: { ...editingProject.seo, ogImage: e.target.value }
                      })
                    }
                    placeholder="Or paste Main Listing Image URL..."
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />

                  <div className="h-44 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 relative">
                    <img
                      src={
                        editingProject.mainImage ||
                        editingProject.seo?.ogImage ||
                        editingProject.gallery?.[0]?.url ||
                        editingProject.logo
                      }
                      alt="Main Listing Preview"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold">
                      MAIN LISTING IMAGE
                    </span>
                  </div>
                </div>

                {/* 2. Main AdVibe Hero Banner Image */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">
                        Main AdVibe Hero Banner Image
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Displayed on the top AdVibe showcase banner and project hero stage.
                      </p>
                    </div>
                    <input
                      ref={bannerImageFileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e =>
                        handleUploadMainOrBanner('bannerImage', e.target.files?.[0])
                      }
                    />
                    <button
                      type="button"
                      onClick={() => bannerImageFileRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Banner</span>
                    </button>
                  </div>

                  <input
                    type="text"
                    value={editingProject.bannerImage || ''}
                    onChange={e =>
                      setEditingProject({
                        ...editingProject,
                        bannerImage: e.target.value
                      })
                    }
                    placeholder="Or paste Hero Banner Image URL..."
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />

                  <div className="h-44 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 relative">
                    <img
                      src={
                        editingProject.bannerImage ||
                        editingProject.mainImage ||
                        editingProject.seo?.ogImage ||
                        editingProject.gallery?.[0]?.url ||
                        editingProject.logo
                      }
                      alt="Main Banner Preview"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-indigo-600 text-white text-[10px] font-bold">
                      HERO BANNER IMAGE
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Multi-Photo Gallery Uploader */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      Project Photo Gallery ({editingProject.gallery?.length || 0} Photos)
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Upload multiple photos from your computer or add by URL. Click any photo to set it as Main Image or Banner.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      ref={galleryFileRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={e => handleUploadGalleryFiles(e.target.files)}
                    />
                    <button
                      type="button"
                      onClick={() => galleryFileRef.current?.click()}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Multiple Photos from PC</span>
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newGalleryUrl}
                    onChange={e => setNewGalleryUrl(e.target.value)}
                    placeholder="Paste image URL to add to gallery..."
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newGalleryUrl.trim()) return;
                      const item = {
                        id: `gal-${Date.now()}`,
                        url: newGalleryUrl.trim(),
                        type: 'image' as const,
                        category: 'Exterior',
                        caption: editingProject.title
                      };
                      setEditingProject({
                        ...editingProject,
                        gallery: [...(editingProject.gallery || []), item]
                      });
                      setNewGalleryUrl('');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
                  >
                    + Add Image URL
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {(editingProject.gallery || []).map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="rounded-xl overflow-hidden bg-white border border-slate-200 shadow-2xs flex flex-col justify-between"
                    >
                      <div className="relative h-28 bg-slate-100">
                        <img
                          src={item.url}
                          alt={item.caption}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setEditingProject({
                              ...editingProject,
                              gallery: editingProject.gallery.filter((_, i) => i !== idx)
                            })
                          }
                          className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-rose-600 text-white hover:bg-rose-700 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="p-2 flex items-center justify-between gap-1 bg-slate-50 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProject({
                              ...editingProject,
                              mainImage: item.url,
                              seo: { ...editingProject.seo, ogImage: item.url }
                            });
                            notifyStatus('Set as Main Listing Card Image!');
                          }}
                          className="px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[10px] cursor-pointer flex items-center gap-1"
                        >
                          <Star className="w-2.5 h-2.5" />
                          <span>Set Main</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setEditingProject({
                              ...editingProject,
                              bannerImage: item.url
                            });
                            notifyStatus('Set as Main Hero Banner Image!');
                          }}
                          className="px-2 py-1 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[10px] cursor-pointer"
                        >
                          Set Banner
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Walkthrough Video Uploader (Local MP4/WebM or URL) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-blue-600" />
                      <span>Walkthrough Video &amp; Banner Video Upload</span>
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Upload a local MP4/WebM video clip from your computer or paste a direct video URL.
                    </p>
                  </div>

                  <input
                    ref={videoFileRef}
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime"
                    className="hidden"
                    onChange={e => handleUploadLocalVideo(e.target.files?.[0])}
                  />
                  <button
                    type="button"
                    onClick={() => videoFileRef.current?.click()}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>Upload Video Clip from PC</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Video Title (e.g. Drone Site Tour)"
                    value={newVideoTitle}
                    onChange={e => setNewVideoTitle(e.target.value)}
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                  <input
                    type="text"
                    placeholder="Paste MP4 or YouTube URL..."
                    value={newVideoUrl}
                    onChange={e => setNewVideoUrl(e.target.value)}
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newVideoUrl.trim()) return;
                      const vTitle = newVideoTitle.trim() || 'Project Walkthrough';
                      const vItem = {
                        id: `vid-${Date.now()}`,
                        title: vTitle,
                        category: 'Project Tour',
                        type: (newVideoUrl.includes('youtube') || newVideoUrl.includes('youtu.be')
                          ? 'youtube'
                          : 'hosted') as 'youtube' | 'hosted',
                        url: newVideoUrl.trim(),
                        thumbnail:
                          editingProject.mainImage ||
                          editingProject.seo?.ogImage ||
                          editingProject.logo,
                        duration: '02:00'
                      };
                      setEditingProject({
                        ...editingProject,
                        heroVideoUrl: newVideoUrl.trim(),
                        heroVideoTitle: vTitle,
                        videos: [vItem, ...(editingProject.videos || [])]
                      });
                      setNewVideoUrl('');
                      setNewVideoTitle('');
                      notifyStatus('Added video & set as Hero Walkthrough!');
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold cursor-pointer"
                  >
                    + Add &amp; Set Hero Video
                  </button>
                </div>

                {(editingProject.videos || []).length > 0 && (
                  <div className="space-y-2">
                    {editingProject.videos.map((v, vIdx) => (
                      <div
                        key={v.id || vIdx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Film className="w-4 h-4 text-blue-600 shrink-0" />
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 truncate">{v.title}</div>
                            <div className="text-[10px] text-slate-400 truncate">
                              {v.url.startsWith('data:') ? 'Local Uploaded Video File' : v.url}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProject({
                                ...editingProject,
                                heroVideoUrl: v.url,
                                heroVideoTitle: v.title
                              });
                              notifyStatus(`Set "${v.title}" as Hero Banner Video!`);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold text-[10px] cursor-pointer"
                          >
                            {editingProject.heroVideoUrl === v.url ? 'Active Hero Video' : 'Set as Hero'}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setEditingProject({
                                ...editingProject,
                                videos: editingProject.videos.filter((_, i) => i !== vIdx)
                              })
                            }
                            className="p-1 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SUB-TAB 3: SECTIONS MANAGER */}
          {editorSubTab === 'sections' && (
            <div className="space-y-3 text-xs">
              {editingProject.sections.map((sec, idx) => (
                <div
                  key={sec.id}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                      <input
                        type="text"
                        value={sec.title}
                        onChange={e => {
                          const updated = [...editingProject.sections];
                          updated[idx] = { ...sec, title: e.target.value };
                          setEditingProject({ ...editingProject, sections: updated });
                        }}
                        className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-slate-900"
                      />
                      <input
                        type="text"
                        value={sec.subtitle}
                        onChange={e => {
                          const updated = [...editingProject.sections];
                          updated[idx] = { ...sec, subtitle: e.target.value };
                          setEditingProject({ ...editingProject, sections: updated });
                        }}
                        className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-600"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleMoveSection(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 disabled:opacity-40 cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveSection(idx, 'down')}
                      disabled={idx === editingProject.sections.length - 1}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 disabled:opacity-40 cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...editingProject.sections];
                        updated[idx] = { ...sec, isEnabled: !sec.isEnabled };
                        setEditingProject({ ...editingProject, sections: updated });
                      }}
                      className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer ${
                        sec.isEnabled
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {sec.isEnabled ? 'Visible' : 'Hidden'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SUB-TAB 4: 360° VIRTUAL TOUR */}
          {editorSubTab === 'tour3d' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    360° Panorama Image URL
                  </label>
                  <input
                    type="text"
                    value={editingProject.virtualTour?.url || ''}
                    onChange={e =>
                      setEditingProject({
                        ...editingProject,
                        virtualTour: {
                          ...editingProject.virtualTour,
                          provider: 'custom360',
                          url: e.target.value
                        }
                      })
                    }
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Tour Title
                  </label>
                  <input
                    type="text"
                    value={editingProject.virtualTour?.title || '360° Walkthrough'}
                    onChange={e =>
                      setEditingProject({
                        ...editingProject,
                        virtualTour: {
                          ...editingProject.virtualTour,
                          title: e.target.value
                        }
                      })
                    }
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
              </div>

              <Advibe3DVirtualTour
                project={editingProject}
                embedded={true}
                className="w-full h-[380px] rounded-2xl border border-slate-200"
              />
            </div>
          )}

          {/* SUB-TAB 5: MASTER PLAN HOTSPOTS */}
          {editorSubTab === 'hotspots' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Master Plan Map Image URL
                </label>
                <input
                  type="text"
                  value={editingProject.masterPlan.imageUrl}
                  onChange={e =>
                    setEditingProject({
                      ...editingProject,
                      masterPlan: {
                        ...editingProject.masterPlan,
                        imageUrl: e.target.value
                      }
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">
                  Interactive Sector Pins ({editingProject.masterPlan.hotspots.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const newPin = {
                      id: `hp-${Date.now()}`,
                      x: 50,
                      y: 50,
                      title: 'New Block / Sector',
                      category: 'Residential Block',
                      description: 'Prime plots and villas available.',
                      status: 'Available'
                    };
                    setEditingProject({
                      ...editingProject,
                      masterPlan: {
                        ...editingProject.masterPlan,
                        hotspots: [...editingProject.masterPlan.hotspots, newPin]
                      }
                    });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold cursor-pointer"
                >
                  + Add Sector Pin
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {editingProject.masterPlan.hotspots.map((hp, hIdx) => (
                  <div
                    key={hp.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={hp.title}
                        onChange={e => {
                          const updated = [...editingProject.masterPlan.hotspots];
                          updated[hIdx] = { ...hp, title: e.target.value };
                          setEditingProject({
                            ...editingProject,
                            masterPlan: { ...editingProject.masterPlan, hotspots: updated }
                          });
                        }}
                        className="flex-1 bg-white border border-slate-300 rounded-lg px-2.5 py-1 font-bold text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingProject.masterPlan.hotspots.filter(
                            (_, i) => i !== hIdx
                          );
                          setEditingProject({
                            ...editingProject,
                            masterPlan: { ...editingProject.masterPlan, hotspots: updated }
                          });
                        }}
                        className="text-rose-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 6: LINKED UNITS */}
          {editorSubTab === 'units' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-1 text-xs">
              {properties.map(prop => {
                const isLinked = editingProject.linkedPropertyIds.includes(prop.id);
                return (
                  <div
                    key={prop.id}
                    onClick={() => {
                      const nextIds = isLinked
                        ? editingProject.linkedPropertyIds.filter(id => id !== prop.id)
                        : [...editingProject.linkedPropertyIds, prop.id];
                      setEditingProject({
                        ...editingProject,
                        linkedPropertyIds: nextIds
                      });
                    }}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 ${
                      isLinked
                        ? 'bg-blue-50 border-blue-500'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-900 truncate">{prop.title}</div>
                      <div className="text-[11px] text-blue-600 font-bold">
                        {prop.priceFormatted}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* SUB-TAB 7: PRICING PLANS */}
          {editorSubTab === 'pricing' && (
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700">
                  Payment Plans ({editingProject.pricingTiers.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const newTier = {
                      id: `pt-${Date.now()}`,
                      unitType: '10 Marla Residential Plot',
                      size: '250 Sq Yds',
                      totalPrice: 'PKR 65,00,000',
                      downPayment: '20% Down Payment',
                      monthlyInstallment: '36 Monthly Installments',
                      possession: 'Possession in 18 Months',
                      features: ['RDA Approved', 'Corner Options Available']
                    };
                    setEditingProject({
                      ...editingProject,
                      pricingTiers: [...editingProject.pricingTiers, newTier]
                    });
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold cursor-pointer"
                >
                  + Add Payment Plan Tier
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {editingProject.pricingTiers.map((tier, tIdx) => (
                  <div
                    key={tier.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={tier.unitType}
                        onChange={e => {
                          const updated = [...editingProject.pricingTiers];
                          updated[tIdx] = { ...tier, unitType: e.target.value };
                          setEditingProject({ ...editingProject, pricingTiers: updated });
                        }}
                        className="flex-1 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingProject.pricingTiers.filter(
                            (_, i) => i !== tIdx
                          );
                          setEditingProject({ ...editingProject, pricingTiers: updated });
                        }}
                        className="text-rose-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={tier.totalPrice}
                        onChange={e => {
                          const updated = [...editingProject.pricingTiers];
                          updated[tIdx] = { ...tier, totalPrice: e.target.value };
                          setEditingProject({ ...editingProject, pricingTiers: updated });
                        }}
                        placeholder="Total Price"
                        className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900"
                      />
                      <input
                        type="text"
                        value={tier.monthlyInstallment}
                        onChange={e => {
                          const updated = [...editingProject.pricingTiers];
                          updated[tIdx] = { ...tier, monthlyInstallment: e.target.value };
                          setEditingProject({ ...editingProject, pricingTiers: updated });
                        }}
                        placeholder="Installment Plan"
                        className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. LEADS & INQUIRIES TAB */}
      {activeTab === 'leads' && (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Client</th>
                <th className="py-3.5 px-4">Project</th>
                <th className="py-3.5 px-4">Unit / Message</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map(lead => (
                <tr key={lead.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{lead.name}</div>
                    <div className="text-[11px] text-blue-600">{lead.phone}</div>
                  </td>
                  <td className="py-3 px-4 font-semibold">{lead.projectTitle}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold">{lead.preferredUnit}</div>
                    <div className="text-slate-500">{lead.message}</div>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={lead.status}
                      onChange={e =>
                        onUpdateLeadStatus(lead.id, e.target.value as AdVibeLead['status'])
                      }
                      className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold"
                    >
                      <option value="new">New Inquiry</option>
                      <option value="contacted">Contacted</option>
                      <option value="site_visit_booked">Site Visit Booked</option>
                      <option value="closed">Closed / Booked</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. AGENCY PERMISSIONS TAB */}
      {activeTab === 'permissions' && currentRole === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agencies.map(agency => {
            const hasPerm = Boolean(agency.canManageAdvibe || agency.canPublishAdvibe);
            return (
              <div
                key={agency.id}
                className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-4 shadow-2xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={agency.avatar || agency.logo}
                    alt={agency.name}
                    className="w-11 h-11 rounded-xl object-cover border border-slate-200"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {agency.companyName || agency.name}
                    </div>
                    <div className="text-[11px] text-slate-500">{agency.city}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleAgencyAdvibePermission(agency.id, !hasPerm)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                    hasPerm
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {hasPerm ? 'Authorized' : 'Grant Access'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdvibeAdminManager;

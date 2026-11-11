import React, { useState, useRef } from 'react';
import {
  Building2,
  Plus,
  Edit3,
  Trash2,
  Copy,
  Eye,
  EyeOff,
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
  X,
  Save,
  Sparkles
} from 'lucide-react';
import Advibe3DVirtualTour from './Advibe3DVirtualTour';
import {
  AdVibeProject,
  AdVibeLead,
  AdVibeSection,
  AdVibeSectionType,
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

const SECTION_TYPE_OPTIONS: { type: AdVibeSectionType; label: string }[] = [
  { type: 'hero', label: 'Hero Banner & Walkthrough Stage' },
  { type: 'intro', label: 'Executive Overview & Manifesto' },
  { type: 'highlights', label: 'Key Project Highlights' },
  { type: 'stats', label: 'Statistical Velocity & Numbers' },
  { type: 'salient', label: 'Salient Engineering Features' },
  { type: 'virtual_tour', label: '360° Interactive Virtual Tour' },
  { type: 'master_plan', label: 'Interactive Master Plan & GIS Map' },
  { type: 'location', label: 'Location & Proximity Radar' },
  { type: 'amenities', label: 'World-Class Amenities' },
  { type: 'gallery', label: 'Visual Photo Gallery' },
  { type: 'videos', label: '4K Walkthrough Videos' },
  { type: 'units', label: 'Available Linked Units Inventory' },
  { type: 'pricing', label: 'Payment Plans & Investment Tiers' },
  { type: 'developer', label: 'Master Developer Profile' },
  { type: 'cta', label: 'Call to Action Banner' },
  { type: 'enquiry', label: 'VIP Inquiry & Site Visit Form' }
];

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
  const [newGalleryCaption, setNewGalleryCaption] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [uploadStatusMsg, setUploadStatusMsg] = useState<string | null>(null);

  // Page Sections CRUD state
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [newSectionType, setNewSectionType] = useState<AdVibeSectionType>('highlights');
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionSubtitle, setNewSectionSubtitle] = useState('');
  const [newSectionBadge, setNewSectionBadge] = useState('');

  // 360 Virtual Tour Scene CRUD state
  const [newSceneName, setNewSceneName] = useState('');
  const [newSceneCategory, setNewSceneCategory] = useState('Exterior & Boulevard');
  const [newSceneImageUrl, setNewSceneImageUrl] = useState('');
  const [newSceneNightUrl, setNewSceneNightUrl] = useState('');
  const [newSceneDesc, setNewSceneDesc] = useState('');
  const [editingSceneId, setEditingSceneId] = useState<string | null>(null);

  // Master Plan Hotspot CRUD state
  const [newHotspotTitle, setNewHotspotTitle] = useState('');
  const [newHotspotCategory, setNewHotspotCategory] = useState('Residential Block');
  const [newHotspotStatus, setNewHotspotStatus] = useState('Available');
  const [newHotspotX, setNewHotspotX] = useState(50);
  const [newHotspotY, setNewHotspotY] = useState(50);
  const [newHotspotDesc, setNewHotspotDesc] = useState('');
  const [newHotspotLinkedProp, setNewHotspotLinkedProp] = useState('');

  // Linked Units search state
  const [unitSearchQuery, setUnitSearchQuery] = useState('');

  // File Input Refs
  const mainImageFileRef = useRef<HTMLInputElement>(null);
  const bannerImageFileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);
  const videoFileRef = useRef<HTMLInputElement>(null);
  const sceneDayFileRef = useRef<HTMLInputElement>(null);
  const sceneNightFileRef = useRef<HTMLInputElement>(null);
  const masterPlanFileRef = useRef<HTMLInputElement>(null);
  const satelliteMapFileRef = useRef<HTMLInputElement>(null);

  const visibleProjects = projects.filter(p => {
    if (currentRole === 'admin') return true;
    if (p.dealerId === currentAgencyId) return true;
    return true;
  });

  const compressImageFile = (file: File, maxWidth = 1800): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_H = 1200;
          let w = img.width;
          let h = img.height;
          if (w > h && w > maxWidth) {
            h = Math.round((h * maxWidth) / w);
            w = maxWidth;
          } else if (h > MAX_H) {
            w = Math.round((w * MAX_H) / h);
            h = MAX_H;
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', 0.86));
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
    setTimeout(() => setUploadStatusMsg(null), 4000);
  };

  const ensureDefaultScenesOnEdit = (proj: AdVibeProject): AdVibeProject => {
    const existingScenes = proj.virtualTour?.scenes;
    if (Array.isArray(existingScenes) && existingScenes.length > 0) {
      return proj;
    }
    const primaryUrl =
      proj.virtualTour?.url && proj.virtualTour.provider !== 'video'
        ? proj.virtualTour.url
        : proj.bannerImage ||
          proj.mainImage ||
          proj.gallery?.[0]?.url ||
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85';

    return {
      ...proj,
      virtualTour: {
        ...proj.virtualTour,
        provider: 'custom360',
        url: primaryUrl,
        title: proj.virtualTour?.title || `${proj.title} — 360° Virtual Tour`,
        autoRun: proj.virtualTour?.autoRun ?? true,
        rotationSpeed: proj.virtualTour?.rotationSpeed || 1.0,
        dayNightMode: true,
        scenes: [
          {
            id: `scene-${Date.now()}-1`,
            name: `${proj.title} — Main Boulevard & Exterior 360°`,
            category: 'Exterior & Lobby',
            imageUrl: primaryUrl,
            nightImageUrl:
              proj.gallery?.[1]?.url ||
              'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=85',
            description: proj.tagline,
            hotspots: [
              {
                id: 'spot-1',
                x: 35,
                y: 48,
                title: 'Main Entrance & Boulevard',
                description: 'Signal-free express access and landscaped podium.'
              }
            ]
          },
          {
            id: `scene-${Date.now()}-2`,
            name: 'Model Residence / Executive Suite Interior',
            category: 'Interior Suite',
            imageUrl:
              'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85',
            nightImageUrl:
              'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2400&q=85',
            description: 'Double-glazed German UPVC windows and smart home automation.',
            hotspots: []
          }
        ]
      }
    };
  };

  const handleOpenEditProject = (proj: AdVibeProject) => {
    setEditingProject(ensureDefaultScenesOnEdit({ ...proj }));
    setEditorSubTab('basics');
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
          iconName: 'Compass',
          image: defaultImg
        }
      ],
      amenities: [
        {
          id: 'am-1',
          name: 'Executive Residents Clubhouse',
          category: 'Wellness & Sports',
          description: 'Equipped gymnasium, swimming pool, and community hall.',
          iconName: 'Waves',
          image: defaultImg
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
        dayNightMode: true,
        scenes: [
          {
            id: 'scene-new-1',
            name: 'Main Boulevard & Podium 360°',
            category: 'Exterior',
            imageUrl:
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
            nightImageUrl:
              'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=85',
            description: '360° panoramic view of main entrance and boulevard.',
            hotspots: []
          }
        ]
      },
      linkedPropertyIds: properties.slice(0, 4).map(p => p.id),
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
        { id: 'sec-virtual-tour', type: 'virtual_tour', title: '360° Virtual Tour', subtitle: 'Interactive Panoramic View', isEnabled: true, order: 4 },
        { id: 'sec-master-plan', type: 'master_plan', title: 'Interactive Master Plan', subtitle: 'Explore Sectors & Blocks', isEnabled: true, order: 5 },
        { id: 'sec-location', type: 'location', title: 'Location & Distances', subtitle: 'Strategic Connectivity', isEnabled: true, order: 6 },
        { id: 'sec-amenities', type: 'amenities', title: 'World-Class Amenities', subtitle: 'Lifestyle Facilities', isEnabled: true, order: 7 },
        { id: 'sec-gallery', type: 'gallery', title: 'Project Gallery', subtitle: 'Visual Showcase', isEnabled: true, order: 8 },
        { id: 'sec-videos', type: 'videos', title: 'Project Videos', subtitle: 'Walkthrough Clips', isEnabled: true, order: 9 },
        { id: 'sec-units', type: 'units', title: 'Available Linked Units', subtitle: 'Live Inventory', isEnabled: true, order: 10 },
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
          caption:
            target === 'mainImage'
              ? `${editingProject.title} — Main Listing Cover`
              : `${editingProject.title} — Main Showcase Hero Banner`
        });
      }

      // Sync hero section bgImageUrl so Open Full Project Showcase reflects it immediately
      const syncedSections = (editingProject.sections || []).map(sec =>
        sec.type === 'hero' && target === 'bannerImage'
          ? {
              ...sec,
              customSettings: {
                ...sec.customSettings,
                bgImageUrl: dataUrl
              }
            }
          : sec
      );

      setEditingProject({
        ...editingProject,
        [target]: dataUrl,
        ...(target === 'bannerImage' && !editingProject.mainImage
          ? { mainImage: dataUrl }
          : {}),
        ...(target === 'mainImage' && !editingProject.bannerImage
          ? { bannerImage: dataUrl }
          : {}),
        seo:
          target === 'mainImage'
            ? { ...editingProject.seo, ogImage: dataUrl }
            : editingProject.seo,
        gallery: updatedGallery,
        sections: syncedSections
      });
      notifyStatus(
        target === 'mainImage'
          ? 'Main Listing Image uploaded! Click "Save & Publish Changes" to apply globally.'
          : 'Main Showcase Hero Banner uploaded! Click "Save & Publish Changes" to apply globally.'
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleUploadGalleryFiles = async (files: FileList | null) => {
    if (!files || files.length === 0 || !editingProject) return;
    const valid = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (valid.length === 0) return;

    const encoded = await Promise.all(valid.map(f => compressImageFile(f)));
    const newItems = encoded.map((url, idx) => ({
      id: `gal-${Date.now()}-${idx}`,
      url,
      type: 'image' as const,
      category: 'Exterior',
      caption:
        newGalleryCaption.trim() ||
        `${editingProject.title} — Photo ${editingProject.gallery.length + idx + 1}`
    }));

    const nextGallery = [...newItems, ...(editingProject.gallery || [])];
    setEditingProject({
      ...editingProject,
      mainImage: editingProject.mainImage || nextGallery[0]?.url,
      bannerImage: editingProject.bannerImage || nextGallery[0]?.url,
      gallery: nextGallery
    });
    setNewGalleryCaption('');
    notifyStatus(`Uploaded ${newItems.length} photo(s) from your computer!`);
  };

  const handleUploadLocalVideo = (file?: File) => {
    if (!file || !editingProject) return;
    if (!file.type.startsWith('video/')) {
      notifyStatus('Please select a valid video file (MP4, WebM, MOV).');
      return;
    }
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > 60) {
      notifyStatus('Video file is over 60MB. Please use a shorter clip or paste a URL.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async e => {
      const videoDataUrl = e.target?.result as string;
      let finalVideoUrl = videoDataUrl;

      // Offload video to server /api/media/upload for instant streaming
      try {
        const res = await fetch('/api/media/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dataUrl: videoDataUrl,
            fileName: file.name
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.url) finalVideoUrl = data.url;
        }
      } catch {
        // Fallback to DataURI
      }

      const vidTitle =
        newVideoTitle.trim() ||
        file.name.replace(/\.[^/.]+$/, '') ||
        'Project Walkthrough';
      const newVidItem = {
        id: `vid-${Date.now()}`,
        title: vidTitle,
        category: 'Project Tour',
        type: 'hosted' as const,
        url: finalVideoUrl,
        thumbnail:
          editingProject.bannerImage ||
          editingProject.mainImage ||
          editingProject.seo?.ogImage ||
          editingProject.logo,
        duration: 'Walkthrough'
      };
      setEditingProject({
        ...editingProject,
        heroVideoUrl: finalVideoUrl,
        heroVideoTitle: vidTitle,
        videos: [newVidItem, ...(editingProject.videos || [])]
      });
      setNewVideoTitle('');
      notifyStatus('Video uploaded & set as Main Banner Walkthrough Video!');
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

  const handleAddSection = () => {
    if (!editingProject) return;
    const typeMeta = SECTION_TYPE_OPTIONS.find(t => t.type === newSectionType);
    const created: AdVibeSection = {
      id: `sec-${newSectionType}-${Date.now()}`,
      type: newSectionType,
      title:
        newSectionTitle.trim() ||
        typeMeta?.label ||
        `${editingProject.title} Section`,
      subtitle:
        newSectionSubtitle.trim() ||
        `Explore ${editingProject.title} details and specifications.`,
      badge: newSectionBadge.trim() || newSectionType.toUpperCase(),
      isEnabled: true,
      order: editingProject.sections.length + 1,
      content:
        newSectionType === 'stats'
          ? [
              { label: 'Total Area', value: '500+ Kanal', sub: 'Master Planned' },
              { label: 'Approval Status', value: '100% NOC', sub: 'Verified Legal Title' },
              { label: 'Expected ROI', value: '25% Annual', sub: 'High Capital Growth' }
            ]
          : newSectionType === 'salient'
            ? [
                { title: 'Underground Electrification', desc: 'Modern grid with zero overhead wires.' },
                { title: '24/7 Gated Security', desc: 'Biometric entry and CCTV surveillance.' },
                { title: 'German UPVC Glazing', desc: 'Soundproof and thermal insulated profiles.' }
              ]
            : undefined
    };

    setEditingProject({
      ...editingProject,
      sections: [...editingProject.sections, created]
    });
    setNewSectionTitle('');
    setNewSectionSubtitle('');
    setNewSectionBadge('');
    notifyStatus(`Added "${created.title}" section to project showcase!`);
  };

  const handleDeleteSection = (secId: string) => {
    if (!editingProject) return;
    const filtered = editingProject.sections
      .filter(s => s.id !== secId)
      .map((s, idx) => ({ ...s, order: idx + 1 }));
    setEditingProject({ ...editingProject, sections: filtered });
    if (editingSectionId === secId) setEditingSectionId(null);
    notifyStatus('Removed section from project showcase.');
  };

  const handleSaveCurrentProject = () => {
    if (!editingProject) return;
    const primaryCover =
      editingProject.mainImage ||
      editingProject.bannerImage ||
      editingProject.seo?.ogImage ||
      editingProject.gallery?.[0]?.url ||
      editingProject.logo;
    const primaryBanner = editingProject.bannerImage || primaryCover;

    // Ensure hero section title, subtitle, and bgImageUrl match the edited project banner & title
    const syncedSections = (editingProject.sections || []).map(sec => {
      if (sec.type === 'hero') {
        return {
          ...sec,
          title: editingProject.title,
          subtitle: editingProject.tagline,
          customSettings: {
            ...sec.customSettings,
            bgImageUrl: primaryBanner
          }
        };
      }
      return sec;
    });

    const scenesList = editingProject.virtualTour?.scenes || [];
    const primary360Url =
      scenesList[0]?.imageUrl ||
      editingProject.virtualTour?.url ||
      primaryBanner;

    const updatedProj: AdVibeProject = {
      ...editingProject,
      mainImage: primaryCover,
      bannerImage: primaryBanner,
      heroVideoUrl:
        editingProject.heroVideoUrl ||
        editingProject.videos?.[0]?.url ||
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      seo: {
        ...editingProject.seo,
        ogImage: primaryCover
      },
      virtualTour: {
        ...editingProject.virtualTour,
        url: primary360Url,
        scenes: scenesList
      },
      sections: syncedSections,
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
      {/* Top Tabs Ribbon */}
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
            <span>+ Create New Society / Highrise AdVibe</span>
          </button>
        )}
      </div>

      {uploadStatusMsg && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
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
                placeholder="Search AdVibe societies or highrises..."
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
                  <th className="py-3.5 px-4">360° &amp; Media</th>
                  <th className="py-3.5 px-4 text-right">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visibleProjects
                  .filter(p =>
                    p.title.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map(project => {
                    const cover =
                      project.mainImage ||
                      project.bannerImage ||
                      project.seo?.ogImage ||
                      project.gallery?.[0]?.url ||
                      project.logo;
                    return (
                      <tr
                        key={project.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
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
                          <span className="font-bold text-slate-800">
                            {project.city}
                          </span>
                          <div className="text-[10px] text-slate-500">
                            {project.area}
                          </div>
                        </td>

                        <td className="py-3 px-4 font-extrabold text-blue-600">
                          {project.starting_price_formatted}
                        </td>

                        <td className="py-3 px-4">
                          <div className="text-[11px] font-semibold text-slate-700">
                            {project.gallery?.length || 1} Photos •{' '}
                            {project.videos?.length || 1} Videos
                          </div>
                          <div className="text-[10px] text-emerald-600 font-bold">
                            {project.virtualTour?.scenes?.length || 2} 360° Scenes
                          </div>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => onPreviewProject(project.slug)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white transition-colors cursor-pointer"
                              title="Open Full Project Showcase"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleOpenEditProject(project)}
                              className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Design / Edit</span>
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
                                  window.confirm(
                                    `Delete AdVibe project "${project.title}"?`
                                  )
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

      {/* 2. PROFESSIONAL ADVIBE DESIGNER & SHOWCASE EDITOR */}
      {editingProject && (
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-md space-y-6">
          {/* Editor Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AdVibe Professional Campaign Designer &amp; Showcase CMS</span>
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                Designing: {editingProject.title}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  handleSaveCurrentProject();
                  onPreviewProject(editingProject.slug);
                }}
                className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Save &amp; Open Full Showcase</span>
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
              { key: 'basics', label: '1. Project & Developer Details', icon: FileText },
              { key: 'media', label: '2. Main Banner, Photos & Video Upload', icon: ImageIcon },
              {
                key: 'sections',
                label: `3. Page Sections CRUD (${editingProject.sections.length})`,
                icon: Layers
              },
              {
                key: 'tour3d',
                label: `4. 360° Virtual Tour CRUD (${editingProject.virtualTour?.scenes?.length || 0})`,
                icon: Compass
              },
              {
                key: 'hotspots',
                label: `5. Master Plan Map & Pins (${editingProject.masterPlan.hotspots.length})`,
                icon: MapPin
              },
              {
                key: 'units',
                label: `6. Linked Units (${editingProject.linkedPropertyIds.length})`,
                icon: Building2
              },
              {
                key: 'pricing',
                label: `7. Payment Plans (${editingProject.pricingTiers.length})`,
                icon: DollarSign
              }
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

          {/* SUB-TAB 1: BASICS, DEVELOPER & HIGHLIGHTS */}
          {editorSubTab === 'basics' && (
            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-slate-700 font-bold mb-1">
                    Society / Highrise Project Title *
                  </label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={e =>
                      setEditingProject({ ...editingProject, title: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={editingProject.slug}
                    onChange={e =>
                      setEditingProject({ ...editingProject, slug: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Project Category
                  </label>
                  <select
                    value={editingProject.type}
                    onChange={e =>
                      setEditingProject({ ...editingProject, type: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  >
                    <option value="Housing Society">Housing Society</option>
                    <option value="Commercial Mall & Tower">
                      Commercial Mall &amp; Tower
                    </option>
                    <option value="High-Rise Tower">High-Rise Tower</option>
                    <option value="Mixed-Use Megaproject">
                      Mixed-Use Megaproject
                    </option>
                    <option value="Luxury Villa Enclave">
                      Luxury Villa Enclave
                    </option>
                    <option value="Modular Smart Community">
                      Modular Smart Community
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Status
                  </label>
                  <select
                    value={editingProject.status}
                    onChange={e =>
                      setEditingProject({ ...editingProject, status: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  >
                    <option value="Booking Open">Booking Open</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="Ready for Possession">
                      Ready for Possession
                    </option>
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Pre-Launch">Pre-Launch</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Formatted Starting Price
                  </label>
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

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Province
                  </label>
                  <select
                    value={editingProject.province || 'Punjab'}
                    onChange={e => {
                      const prov = e.target.value;
                      const pObj = provinceCityData.find(
                        p => p.province === prov
                      );
                      const firstCity =
                        pObj?.cities[0]?.name || editingProject.city;
                      const firstSoc =
                        pObj?.cities[0]?.societies[0] || editingProject.area;
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
                  <label className="block text-slate-700 font-bold mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={editingProject.city}
                    onChange={e =>
                      setEditingProject({ ...editingProject, city: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Society / Zone / Area
                  </label>
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

                <div className="md:col-span-3">
                  <label className="block text-slate-700 font-bold mb-1">
                    Full Address
                  </label>
                  <input
                    type="text"
                    value={editingProject.address}
                    onChange={e =>
                      setEditingProject({
                        ...editingProject,
                        address: e.target.value
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-slate-700 font-bold mb-1">
                    Main Banner Headline / Tagline
                  </label>
                  <input
                    type="text"
                    value={editingProject.tagline}
                    onChange={e =>
                      setEditingProject({
                        ...editingProject,
                        tagline: e.target.value
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-slate-700 font-bold mb-1">
                    Comprehensive Showcase Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingProject.description}
                    onChange={e =>
                      setEditingProject({
                        ...editingProject,
                        description: e.target.value
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>

                {/* Developer Details */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Developer Name
                  </label>
                  <input
                    type="text"
                    value={editingProject.developer?.name || ''}
                    onChange={e =>
                      setEditingProject({
                        ...editingProject,
                        developer: {
                          ...editingProject.developer,
                          name: e.target.value
                        }
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Direct Sales Phone
                  </label>
                  <input
                    type="text"
                    value={editingProject.dealerPhone || '+92 336-5666727'}
                    onChange={e =>
                      setEditingProject({
                        ...editingProject,
                        dealerPhone: e.target.value
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    WhatsApp Hotline
                  </label>
                  <input
                    type="text"
                    value={editingProject.dealerWhatsApp || '923365666727'}
                    onChange={e =>
                      setEditingProject({
                        ...editingProject,
                        dealerWhatsApp: e.target.value.replace(/[^0-9]/g, '')
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
              </div>

              {/* Feature Tags Manager */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
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

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.featured}
                    onChange={e =>
                      setEditingProject({
                        ...editingProject,
                        featured: e.target.checked
                      })
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
                      setEditingProject({
                        ...editingProject,
                        published: e.target.checked
                      })
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

          {/* SUB-TAB 2: MAIN IMAGE, BANNER IMAGE, GALLERY & VIDEO UPLOADER */}
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
                      className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload from PC</span>
                    </button>
                  </div>

                  <input
                    type="text"
                    value={
                      editingProject.mainImage ||
                      editingProject.seo?.ogImage ||
                      ''
                    }
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

                  <div className="h-44 rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                    <img
                      src={
                        editingProject.mainImage ||
                        editingProject.seo?.ogImage ||
                        editingProject.gallery?.[0]?.url
                      }
                      alt="Main Listing Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* 2. Main Showcase Hero Banner Image */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">
                        Main Showcase Hero Banner Image
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Displayed on the top AdVibe banner and &quot;Open Full Project Showcase&quot; hero.
                      </p>
                    </div>
                    <input
                      ref={bannerImageFileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e =>
                        handleUploadMainOrBanner(
                          'bannerImage',
                          e.target.files?.[0]
                        )
                      }
                    />
                    <button
                      type="button"
                      onClick={() => bannerImageFileRef.current?.click()}
                      className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Banner from PC</span>
                    </button>
                  </div>

                  <input
                    type="text"
                    value={
                      editingProject.bannerImage ||
                      editingProject.mainImage ||
                      ''
                    }
                    onChange={e => {
                      const val = e.target.value;
                      const syncedSecs = (editingProject.sections || []).map(s =>
                        s.type === 'hero'
                          ? {
                              ...s,
                              customSettings: {
                                ...s.customSettings,
                                bgImageUrl: val
                              }
                            }
                          : s
                      );
                      setEditingProject({
                        ...editingProject,
                        bannerImage: val,
                        sections: syncedSecs
                      });
                    }}
                    placeholder="Or paste Hero Banner Image URL..."
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />

                  <div className="h-44 rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                    <img
                      src={
                        editingProject.bannerImage ||
                        editingProject.mainImage ||
                        editingProject.seo?.ogImage ||
                        editingProject.gallery?.[0]?.url
                      }
                      alt="Hero Banner Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Gallery Photos Upload & Manager */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      Project Photo Gallery ({editingProject.gallery.length} Photos)
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Upload multiple photos from your computer or add via URL. Click &quot;Set as Banner&quot; on any photo to make it the main showcase banner.
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
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload Photos from PC</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={newGalleryUrl}
                    onChange={e => setNewGalleryUrl(e.target.value)}
                    placeholder="Or paste image URL..."
                    className="sm:col-span-2 bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newGalleryCaption}
                      onChange={e => setNewGalleryCaption(e.target.value)}
                      placeholder="Caption..."
                      className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newGalleryUrl.trim()) return;
                        const newItem = {
                          id: `gal-${Date.now()}`,
                          url: newGalleryUrl.trim(),
                          type: 'image' as const,
                          category: 'Exterior',
                          caption:
                            newGalleryCaption.trim() ||
                            `${editingProject.title} Photo`
                        };
                        setEditingProject({
                          ...editingProject,
                          gallery: [newItem, ...editingProject.gallery]
                        });
                        setNewGalleryUrl('');
                        setNewGalleryCaption('');
                        notifyStatus('Added photo to project gallery!');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold shrink-0 cursor-pointer"
                    >
                      + Add URL
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {editingProject.gallery.map(item => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-2xs"
                    >
                      <div className="relative h-28 bg-slate-900">
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
                              gallery: editingProject.gallery.filter(
                                g => g.id !== item.id
                              )
                            })
                          }
                          className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-rose-600 text-white cursor-pointer"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="p-2 space-y-1.5">
                        <input
                          type="text"
                          value={item.caption}
                          onChange={e =>
                            setEditingProject({
                              ...editingProject,
                              gallery: editingProject.gallery.map(g =>
                                g.id === item.id
                                  ? { ...g, caption: e.target.value }
                                  : g
                              )
                            })
                          }
                          className="w-full text-[11px] bg-slate-50 border border-slate-200 rounded px-1.5 py-1"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const syncedSecs = (
                              editingProject.sections || []
                            ).map(s =>
                              s.type === 'hero'
                                ? {
                                    ...s,
                                    customSettings: {
                                      ...s.customSettings,
                                      bgImageUrl: item.url
                                    }
                                  }
                                : s
                            );
                            setEditingProject({
                              ...editingProject,
                              mainImage: item.url,
                              bannerImage: item.url,
                              sections: syncedSecs
                            });
                            notifyStatus(
                              'Set photo as Main Listing & Hero Showcase Banner!'
                            );
                          }}
                          className="w-full py-1 rounded bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-[10px] font-bold transition-colors cursor-pointer"
                        >
                          Set as Main Banner
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Walkthrough & Banner Video Uploader */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <Video className="w-4 h-4 text-blue-600" />
                      <span>
                        Main Banner Video &amp; Walkthrough Clips ({editingProject.videos.length})
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Upload an MP4/WebM video from your computer or paste a YouTube / MP4 URL. This powers &quot;Watch Banner Video&quot; and &quot;Play Walkthrough Video&quot;.
                    </p>
                  </div>

                  <div>
                    <input
                      ref={videoFileRef}
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={e => handleUploadLocalVideo(e.target.files?.[0])}
                    />
                    <button
                      type="button"
                      onClick={() => videoFileRef.current?.click()}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Film className="w-4 h-4" />
                      <span>Upload Video from PC</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Primary Banner Video URL (MP4 or YouTube)
                    </label>
                    <input
                      type="text"
                      value={
                        editingProject.heroVideoUrl ||
                        editingProject.videos?.[0]?.url ||
                        ''
                      }
                      onChange={e =>
                        setEditingProject({
                          ...editingProject,
                          heroVideoUrl: e.target.value
                        })
                      }
                      placeholder="https://...mp4 or https://youtube.com/watch?v=..."
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Add Additional Video Clip to Showcase
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newVideoTitle}
                        onChange={e => setNewVideoTitle(e.target.value)}
                        placeholder="Video title..."
                        className="w-1/3 bg-white border border-slate-300 rounded-xl px-2.5 py-2"
                      />
                      <input
                        type="text"
                        value={newVideoUrl}
                        onChange={e => setNewVideoUrl(e.target.value)}
                        placeholder="MP4 or YouTube URL..."
                        className="flex-1 bg-white border border-slate-300 rounded-xl px-2.5 py-2"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!newVideoUrl.trim()) return;
                          const isYt =
                            newVideoUrl.includes('youtube.com') ||
                            newVideoUrl.includes('youtu.be');
                          const vItem = {
                            id: `vid-${Date.now()}`,
                            title:
                              newVideoTitle.trim() ||
                              `${editingProject.title} Video Tour`,
                            category: 'Project Tour',
                            type: (isYt ? 'youtube' : 'hosted') as
                              | 'youtube'
                              | 'hosted',
                            url: newVideoUrl.trim(),
                            thumbnail:
                              editingProject.bannerImage ||
                              editingProject.mainImage ||
                              editingProject.logo,
                            duration: '02:00'
                          };
                          setEditingProject({
                            ...editingProject,
                            heroVideoUrl: vItem.url,
                            videos: [vItem, ...(editingProject.videos || [])]
                          });
                          setNewVideoUrl('');
                          setNewVideoTitle('');
                          notifyStatus(
                            'Added video and set as Main Banner Video!'
                          );
                        }}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold shrink-0 cursor-pointer"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>

                {editingProject.videos.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {editingProject.videos.map(v => (
                      <div
                        key={v.id}
                        className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 truncate">
                            {v.title}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate font-mono">
                            {v.url}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProject({
                                ...editingProject,
                                heroVideoUrl: v.url,
                                heroVideoTitle: v.title
                              });
                              notifyStatus(
                                `"${v.title}" set as Primary Banner Video!`
                              );
                            }}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                              editingProject.heroVideoUrl === v.url
                                ? 'bg-emerald-600 text-white'
                                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                            }`}
                          >
                            {editingProject.heroVideoUrl === v.url
                              ? 'Active Banner Video'
                              : 'Use on Banner'}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setEditingProject({
                                ...editingProject,
                                videos: editingProject.videos.filter(
                                  item => item.id !== v.id
                                )
                              })
                            }
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 cursor-pointer"
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

          {/* SUB-TAB 3: PAGE SECTIONS FULL CRUD */}
          {editorSubTab === 'sections' && (
            <div className="space-y-5 text-xs">
              {/* Add New Section Bar */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                <h4 className="font-extrabold text-blue-950 text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4 text-blue-600" />
                  <span>Add New Section to Project Showcase (Full CRUD)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                  <select
                    value={newSectionType}
                    onChange={e =>
                      setNewSectionType(e.target.value as AdVibeSectionType)
                    }
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900"
                  >
                    {SECTION_TYPE_OPTIONS.map(opt => (
                      <option key={opt.type} value={opt.type}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={newSectionTitle}
                    onChange={e => setNewSectionTitle(e.target.value)}
                    placeholder="Section Heading Title..."
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <input
                    type="text"
                    value={newSectionSubtitle}
                    onChange={e => setNewSectionSubtitle(e.target.value)}
                    placeholder="Subtitle / Description..."
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={handleAddSection}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
                  >
                    + Add Section
                  </button>
                </div>
              </div>

              {/* Sections List */}
              <div className="space-y-2.5">
                {editingProject.sections.map((sec, idx) => {
                  const isEditingThis = editingSectionId === sec.id;
                  return (
                    <div
                      key={sec.id}
                      className={`rounded-2xl border p-4 transition-all ${
                        sec.isEnabled
                          ? 'bg-white border-slate-200 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 opacity-60'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-mono font-bold text-slate-700 shrink-0">
                            {idx + 1}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-slate-900 text-sm truncate">
                                {sec.title}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-mono uppercase">
                                {sec.type}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 truncate">
                              {sec.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() =>
                              setEditingProject({
                                ...editingProject,
                                sections: editingProject.sections.map(s =>
                                  s.id === sec.id
                                    ? { ...s, isEnabled: !s.isEnabled }
                                    : s
                                )
                              })
                            }
                            className={`px-2.5 py-1.5 rounded-xl font-bold flex items-center gap-1 cursor-pointer border ${
                              sec.isEnabled
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-slate-200 text-slate-600 border-slate-300'
                            }`}
                          >
                            {sec.isEnabled ? (
                              <>
                                <Eye className="w-3.5 h-3.5" />
                                <span>Enabled</span>
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
                            onClick={() =>
                              setEditingSectionId(
                                isEditingThis ? null : sec.id
                              )
                            }
                            className="px-2.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>{isEditingThis ? 'Done' : 'Edit'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleMoveSection(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveSection(idx, 'down')}
                            disabled={idx === editingProject.sections.length - 1}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteSection(sec.id)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                            title="Delete Section"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {isEditingThis && (
                        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl">
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">
                              Section Title
                            </label>
                            <input
                              type="text"
                              value={sec.title}
                              onChange={e =>
                                setEditingProject({
                                  ...editingProject,
                                  sections: editingProject.sections.map(s =>
                                    s.id === sec.id
                                      ? { ...s, title: e.target.value }
                                      : s
                                  )
                                })
                              }
                              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">
                              Subtitle
                            </label>
                            <input
                              type="text"
                              value={sec.subtitle}
                              onChange={e =>
                                setEditingProject({
                                  ...editingProject,
                                  sections: editingProject.sections.map(s =>
                                    s.id === sec.id
                                      ? { ...s, subtitle: e.target.value }
                                      : s
                                  )
                                })
                              }
                              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">
                              Badge Text
                            </label>
                            <input
                              type="text"
                              value={sec.badge || ''}
                              onChange={e =>
                                setEditingProject({
                                  ...editingProject,
                                  sections: editingProject.sections.map(s =>
                                    s.id === sec.id
                                      ? { ...s, badge: e.target.value }
                                      : s
                                  )
                                })
                              }
                              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SUB-TAB 4: 360° VIRTUAL TOUR SCENES FULL CRUD */}
          {editorSubTab === 'tour3d' && (
            <div className="space-y-6 text-xs">
              {/* Add / Edit 360° Scene Form */}
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-extrabold text-blue-950 text-sm flex items-center gap-2">
                      <Compass className="w-4 h-4 text-blue-600" />
                      <span>
                        360° Virtual Tour Scenes Manager (Full CRUD — Upload from PC or URL)
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-600">
                      Add, edit, or delete 360° panoramic scenes. These scenes are visible on both the main AdVibe page and &quot;Open Full Project Showcase&quot;.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Scene Title / Room Name *
                    </label>
                    <input
                      type="text"
                      value={newSceneName}
                      onChange={e => setNewSceneName(e.target.value)}
                      placeholder="e.g. Main Boulevard 225ft / Executive Penthouse Lounge"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Scene Category
                    </label>
                    <input
                      type="text"
                      value={newSceneCategory}
                      onChange={e => setNewSceneCategory(e.target.value)}
                      placeholder="Exterior / Interior / Aerial 360°"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                    />
                  </div>

                  {/* Day 360 Image Upload or URL */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-slate-700">
                        Daytime 360° Panorama Image *
                      </label>
                      <input
                        ref={sceneDayFileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async e => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const dataUrl = await compressImageFile(file, 2200);
                          setNewSceneImageUrl(dataUrl);
                          notifyStatus('Uploaded Daytime 360° image from PC!');
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => sceneDayFileRef.current?.click()}
                        className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload from PC</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={newSceneImageUrl}
                      onChange={e => setNewSceneImageUrl(e.target.value)}
                      placeholder="Paste 360° image URL or upload from PC..."
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                    />
                  </div>

                  {/* Night 360 Image Upload or URL */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-slate-700">
                        Evening / Night 360° Image (Optional)
                      </label>
                      <input
                        ref={sceneNightFileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async e => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const dataUrl = await compressImageFile(file, 2200);
                          setNewSceneNightUrl(dataUrl);
                          notifyStatus('Uploaded Night 360° image from PC!');
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => sceneNightFileRef.current?.click()}
                        className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload Night PC</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={newSceneNightUrl}
                      onChange={e => setNewSceneNightUrl(e.target.value)}
                      placeholder="Paste evening 360° URL or leave blank..."
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                    />
                  </div>

                  <div className="sm:col-span-2 flex gap-2">
                    <input
                      type="text"
                      value={newSceneDesc}
                      onChange={e => setNewSceneDesc(e.target.value)}
                      placeholder="Scene architectural description..."
                      className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newSceneImageUrl.trim()) {
                          notifyStatus(
                            'Please upload or paste a 360° image URL first.'
                          );
                          return;
                        }
                        const currentScenes =
                          editingProject.virtualTour?.scenes || [];
                        const newSceneObj = {
                          id: `scene-${Date.now()}`,
                          name:
                            newSceneName.trim() ||
                            `360° View ${currentScenes.length + 1}`,
                          category: newSceneCategory || '360° View',
                          imageUrl: newSceneImageUrl.trim(),
                          nightImageUrl:
                            newSceneNightUrl.trim() || newSceneImageUrl.trim(),
                          description: newSceneDesc.trim(),
                          hotspots: []
                        };
                        const updatedScenes = [...currentScenes, newSceneObj];
                        setEditingProject({
                          ...editingProject,
                          virtualTour: {
                            ...editingProject.virtualTour,
                            provider: 'custom360',
                            url: updatedScenes[0].imageUrl,
                            scenes: updatedScenes
                          }
                        });
                        setNewSceneName('');
                        setNewSceneImageUrl('');
                        setNewSceneNightUrl('');
                        setNewSceneDesc('');
                        notifyStatus(
                          `Added "${newSceneObj.name}" to 360° Virtual Tour!`
                        );
                      }}
                      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shrink-0 cursor-pointer"
                    >
                      + Add 360° Scene
                    </button>
                  </div>
                </div>
              </div>

              {/* Existing 360° Scenes CRUD Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(editingProject.virtualTour?.scenes || []).map((sc, sIdx) => (
                  <div
                    key={sc.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between"
                  >
                    <div className="relative h-40 bg-slate-900">
                      <img
                        src={sc.imageUrl}
                        alt={sc.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-slate-950/80 text-white text-[10px] font-bold">
                        Scene {sIdx + 1}: {sc.category || '360° Panorama'}
                      </span>
                      <div className="absolute top-2.5 right-2.5 flex gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            setEditingSceneId(
                              editingSceneId === sc.id ? null : sc.id
                            )
                          }
                          className="px-2.5 py-1 rounded-lg bg-white text-slate-900 font-bold text-[11px] shadow-sm cursor-pointer"
                        >
                          {editingSceneId === sc.id ? 'Done' : 'Edit Scene'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const nextScenes = (
                              editingProject.virtualTour?.scenes || []
                            ).filter(item => item.id !== sc.id);
                            setEditingProject({
                              ...editingProject,
                              virtualTour: {
                                ...editingProject.virtualTour,
                                url:
                                  nextScenes[0]?.imageUrl ||
                                  editingProject.virtualTour.url,
                                scenes: nextScenes
                              }
                            });
                            notifyStatus(`Deleted 360° scene "${sc.name}".`);
                          }}
                          className="p-1.5 rounded-lg bg-rose-600 text-white shadow-sm cursor-pointer"
                          title="Delete 360° Scene"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 space-y-2.5">
                      <div className="font-extrabold text-slate-900 text-sm">
                        {sc.name}
                      </div>
                      {sc.description && (
                        <p className="text-[11px] text-slate-500">
                          {sc.description}
                        </p>
                      )}

                      {editingSceneId === sc.id && (
                        <div className="pt-2 border-t border-slate-100 space-y-2">
                          <input
                            type="text"
                            value={sc.name}
                            onChange={e => {
                              const next = (
                                editingProject.virtualTour?.scenes || []
                              ).map(item =>
                                item.id === sc.id
                                  ? { ...item, name: e.target.value }
                                  : item
                              );
                              setEditingProject({
                                ...editingProject,
                                virtualTour: {
                                  ...editingProject.virtualTour,
                                  scenes: next
                                }
                              });
                            }}
                            placeholder="Scene Name"
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5"
                          />
                          <input
                            type="text"
                            value={sc.imageUrl}
                            onChange={e => {
                              const next = (
                                editingProject.virtualTour?.scenes || []
                              ).map(item =>
                                item.id === sc.id
                                  ? { ...item, imageUrl: e.target.value }
                                  : item
                              );
                              setEditingProject({
                                ...editingProject,
                                virtualTour: {
                                  ...editingProject.virtualTour,
                                  url: next[0]?.imageUrl || e.target.value,
                                  scenes: next
                                }
                              });
                            }}
                            placeholder="Daytime 360 Image URL"
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-mono"
                          />
                          <input
                            type="text"
                            value={sc.nightImageUrl || ''}
                            onChange={e => {
                              const next = (
                                editingProject.virtualTour?.scenes || []
                              ).map(item =>
                                item.id === sc.id
                                  ? { ...item, nightImageUrl: e.target.value }
                                  : item
                              );
                              setEditingProject({
                                ...editingProject,
                                virtualTour: {
                                  ...editingProject.virtualTour,
                                  scenes: next
                                }
                              });
                            }}
                            placeholder="Nighttime 360 Image URL"
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-mono"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Live 360° Preview */}
              <div className="pt-2">
                <h5 className="font-extrabold text-slate-800 mb-2">
                  Live 360° Virtual Tour Preview
                </h5>
                <Advibe3DVirtualTour
                  project={editingProject}
                  embedded={true}
                  className="w-full h-[380px] rounded-2xl border border-slate-200"
                />
              </div>
            </div>
          )}

          {/* SUB-TAB 5: MASTER PLAN IMAGE UPLOAD (PC OR URL) & SECTOR PINS CRUD */}
          {editorSubTab === 'hotspots' && (
            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Master Plan Layout Image Upload / URL */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">
                        Master Plan Layout Map Image
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Upload Master Plan map from your local PC or paste an online URL.
                      </p>
                    </div>
                    <input
                      ref={masterPlanFileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async e => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const dataUrl = await compressImageFile(file, 2200);
                        setEditingProject({
                          ...editingProject,
                          masterPlan: {
                            ...editingProject.masterPlan,
                            imageUrl: dataUrl
                          }
                        });
                        notifyStatus('Uploaded Master Plan image from local PC!');
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => masterPlanFileRef.current?.click()}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Map from PC</span>
                    </button>
                  </div>

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
                    placeholder="Or paste Master Plan online URL..."
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />

                  <div className="h-48 rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                    <img
                      src={editingProject.masterPlan.imageUrl}
                      alt="Master Plan Preview"
                      className="w-full h-full object-contain bg-slate-900"
                    />
                  </div>
                </div>

                {/* Satellite Map Image Upload / URL */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">
                        Satellite / Drone Overlay Map (Optional)
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Upload a satellite or drone map from local PC or paste an online URL.
                      </p>
                    </div>
                    <input
                      ref={satelliteMapFileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async e => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const dataUrl = await compressImageFile(file, 2200);
                        setEditingProject({
                          ...editingProject,
                          masterPlan: {
                            ...editingProject.masterPlan,
                            satelliteImageUrl: dataUrl
                          }
                        });
                        notifyStatus('Uploaded Satellite Map from local PC!');
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => satelliteMapFileRef.current?.click()}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Satellite PC</span>
                    </button>
                  </div>

                  <input
                    type="text"
                    value={editingProject.masterPlan.satelliteImageUrl || ''}
                    onChange={e =>
                      setEditingProject({
                        ...editingProject,
                        masterPlan: {
                          ...editingProject.masterPlan,
                          satelliteImageUrl: e.target.value
                        }
                      })
                    }
                    placeholder="Or paste Satellite Map online URL..."
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />

                  <div className="h-48 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 flex items-center justify-center">
                    {editingProject.masterPlan.satelliteImageUrl ? (
                      <img
                        src={editingProject.masterPlan.satelliteImageUrl}
                        alt="Satellite Map Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-slate-400">
                        No satellite overlay set
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Add Master Plan Sector Hotspot Pin */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                <h4 className="font-extrabold text-blue-950 text-sm">
                  Add Interactive Sector / Block Hotspot Pin on Master Plan
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                  <input
                    type="text"
                    value={newHotspotTitle}
                    onChange={e => setNewHotspotTitle(e.target.value)}
                    placeholder="Sector / Block Title (e.g. Executive Block)"
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <select
                    value={newHotspotCategory}
                    onChange={e => setNewHotspotCategory(e.target.value)}
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  >
                    <option value="Residential Block">Residential Block</option>
                    <option value="Commercial Broadway">
                      Commercial Broadway
                    </option>
                    <option value="Civic Center">Civic Center</option>
                    <option value="Park / Green Spine">Park / Green Spine</option>
                  </select>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      min={5}
                      max={95}
                      value={newHotspotX}
                      onChange={e => setNewHotspotX(Number(e.target.value))}
                      placeholder="X %"
                      className="bg-white border border-slate-300 rounded-xl px-2.5 py-2"
                      title="Horizontal Position %"
                    />
                    <input
                      type="number"
                      min={5}
                      max={95}
                      value={newHotspotY}
                      onChange={e => setNewHotspotY(Number(e.target.value))}
                      placeholder="Y %"
                      className="bg-white border border-slate-300 rounded-xl px-2.5 py-2"
                      title="Vertical Position %"
                    />
                  </div>
                  <select
                    value={newHotspotLinkedProp}
                    onChange={e => setNewHotspotLinkedProp(e.target.value)}
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  >
                    <option value="">-- Link Property (Optional) --</option>
                    {properties.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.title.slice(0, 35)} ({p.priceFormatted})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newHotspotDesc}
                    onChange={e => setNewHotspotDesc(e.target.value)}
                    placeholder="Sector description (plot sizes, possession status)..."
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newHotspotTitle.trim()) return;
                      const pin = {
                        id: `hp-${Date.now()}`,
                        x: newHotspotX,
                        y: newHotspotY,
                        title: newHotspotTitle.trim(),
                        category: newHotspotCategory,
                        status: newHotspotStatus,
                        description:
                          newHotspotDesc.trim() ||
                          'Verified plots and units available.',
                        linkedPropertyId: newHotspotLinkedProp || undefined
                      };
                      setEditingProject({
                        ...editingProject,
                        masterPlan: {
                          ...editingProject.masterPlan,
                          hotspots: [
                            ...editingProject.masterPlan.hotspots,
                            pin
                          ]
                        }
                      });
                      setNewHotspotTitle('');
                      setNewHotspotDesc('');
                      notifyStatus(`Added "${pin.title}" pin to Master Plan!`);
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold cursor-pointer"
                  >
                    + Add Sector Pin
                  </button>
                </div>
              </div>

              {/* Existing Hotspots List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {editingProject.masterPlan.hotspots.map(hp => (
                  <div
                    key={hp.id}
                    className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="font-bold text-slate-900">
                        {hp.title}{' '}
                        <span className="text-[10px] font-mono text-blue-600">
                          (X: {hp.x}%, Y: {hp.y}%)
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {hp.category} • {hp.description}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingProject({
                          ...editingProject,
                          masterPlan: {
                            ...editingProject.masterPlan,
                            hotspots: editingProject.masterPlan.hotspots.filter(
                              item => item.id !== hp.id
                            )
                          }
                        })
                      }
                      className="p-1.5 rounded-lg bg-rose-50 text-rose-600 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 6: LINKED UNITS MANAGER */}
          {editorSubTab === 'units' && (
            <div className="space-y-4 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Linked Property Units ({editingProject.linkedPropertyIds.length} Selected)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Select properties to showcase inside this AdVibe project&apos;s Linked Units inventory section.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={unitSearchQuery}
                    onChange={e => setUnitSearchQuery(e.target.value)}
                    placeholder="Filter properties..."
                    className="bg-white border border-slate-300 rounded-xl px-3 py-1.5"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setEditingProject({
                        ...editingProject,
                        linkedPropertyIds: properties.map(p => p.id)
                      })
                    }
                    className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold cursor-pointer"
                  >
                    Select All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {properties
                  .filter(
                    p =>
                      !unitSearchQuery.trim() ||
                      p.title
                        .toLowerCase()
                        .includes(unitSearchQuery.toLowerCase()) ||
                      p.location.society
                        .toLowerCase()
                        .includes(unitSearchQuery.toLowerCase())
                  )
                  .map(prop => {
                    const isLinked = editingProject.linkedPropertyIds.includes(
                      prop.id
                    );
                    return (
                      <div
                        key={prop.id}
                        onClick={() => {
                          const nextIds = isLinked
                            ? editingProject.linkedPropertyIds.filter(
                                id => id !== prop.id
                              )
                            : [...editingProject.linkedPropertyIds, prop.id];
                          setEditingProject({
                            ...editingProject,
                            linkedPropertyIds: nextIds
                          });
                        }}
                        className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                          isLinked
                            ? 'bg-blue-50/80 border-blue-500 shadow-xs'
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <img
                          src={prop.images[0]}
                          alt={prop.title}
                          className="w-14 h-12 rounded-xl object-cover shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-slate-900 truncate">
                            {prop.title}
                          </div>
                          <div className="text-[11px] text-blue-600 font-bold">
                            {prop.priceFormatted} • {prop.area} {prop.areaUnit}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">
                            {prop.location.society}, {prop.location.city}
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={isLinked}
                          onChange={() => {}}
                          className="w-4 h-4 text-blue-600 rounded pointer-events-none"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* SUB-TAB 7: PAYMENT PLANS CRUD */}
          {editorSubTab === 'pricing' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-slate-900 text-sm">
                  Payment Plans &amp; Investment Tiers ({editingProject.pricingTiers.length})
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const newTier = {
                      id: `tier-${Date.now()}`,
                      unitType: '10 Marla Executive Plot / Unit',
                      size: '250 Sq Yds',
                      totalPrice: 'PKR 75,00,000',
                      downPayment: 'PKR 15,00,000 (20%)',
                      monthlyInstallment: 'PKR 1,25,000 x 36 Months',
                      possession: 'On Ballot / Allocation',
                      features: ['100% NOC Verified', 'Direct Boulevard Access']
                    };
                    setEditingProject({
                      ...editingProject,
                      pricingTiers: [...editingProject.pricingTiers, newTier]
                    });
                  }}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 text-white font-bold cursor-pointer"
                >
                  + Add Payment Tier
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {editingProject.pricingTiers.map(tier => (
                  <div
                    key={tier.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={tier.unitType}
                        onChange={e =>
                          setEditingProject({
                            ...editingProject,
                            pricingTiers: editingProject.pricingTiers.map(t =>
                              t.id === tier.id
                                ? { ...t, unitType: e.target.value }
                                : t
                            )
                          })
                        }
                        className="flex-1 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setEditingProject({
                            ...editingProject,
                            pricingTiers: editingProject.pricingTiers.filter(
                              t => t.id !== tier.id
                            )
                          })
                        }
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={tier.size}
                        onChange={e =>
                          setEditingProject({
                            ...editingProject,
                            pricingTiers: editingProject.pricingTiers.map(t =>
                              t.id === tier.id
                                ? { ...t, size: e.target.value }
                                : t
                            )
                          })
                        }
                        placeholder="Size"
                        className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5"
                      />
                      <input
                        type="text"
                        value={tier.totalPrice}
                        onChange={e =>
                          setEditingProject({
                            ...editingProject,
                            pricingTiers: editingProject.pricingTiers.map(t =>
                              t.id === tier.id
                                ? { ...t, totalPrice: e.target.value }
                                : t
                            )
                          })
                        }
                        placeholder="Total Price"
                        className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-blue-700"
                      />
                      <input
                        type="text"
                        value={tier.downPayment}
                        onChange={e =>
                          setEditingProject({
                            ...editingProject,
                            pricingTiers: editingProject.pricingTiers.map(t =>
                              t.id === tier.id
                                ? { ...t, downPayment: e.target.value }
                                : t
                            )
                          })
                        }
                        placeholder="Down Payment"
                        className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5"
                      />
                      <input
                        type="text"
                        value={tier.monthlyInstallment}
                        onChange={e =>
                          setEditingProject({
                            ...editingProject,
                            pricingTiers: editingProject.pricingTiers.map(t =>
                              t.id === tier.id
                                ? { ...t, monthlyInstallment: e.target.value }
                                : t
                            )
                          })
                        }
                        placeholder="Monthly Installment"
                        className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. INQUIRIES & LEADS CRM TAB */}
      {activeTab === 'leads' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Preferred Unit</th>
                  <th className="py-3 px-4">Message</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{lead.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {lead.phone} • {lead.email}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      {lead.projectTitle}
                    </td>
                    <td className="py-3 px-4 text-blue-600 font-bold">
                      {lead.preferredUnit}
                    </td>
                    <td className="py-3 px-4 max-w-xs truncate">
                      {lead.message}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={lead.status}
                        onChange={e =>
                          onUpdateLeadStatus(lead.id, e.target.value as any)
                        }
                        className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="site_visit_booked">
                          Site Visit Booked
                        </option>
                        <option value="closed">Closed / Won</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. AGENCY PERMISSIONS TAB */}
      {activeTab === 'permissions' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <h4 className="text-sm font-extrabold text-slate-900">
            Certified Agency AdVibe Publishing Permissions
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {agencies.map(ag => (
              <div
                key={ag.id}
                className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={ag.avatar || ag.logo}
                    alt={ag.name}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <div className="font-bold text-slate-900">
                      {ag.companyName}
                    </div>
                    <div className="text-[11px] text-slate-500">{ag.name}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onToggleAgencyAdvibePermission(ag.id, !ag.canManageAdvibe)
                  }
                  className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer ${
                    ag.canManageAdvibe
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {ag.canManageAdvibe ? 'Authorized' : 'Restricted'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvibeAdminManager;

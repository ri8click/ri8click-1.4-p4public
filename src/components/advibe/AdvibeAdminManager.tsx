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
  Sparkles,
  Award
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
  { type: 'enquiry', label: 'VIP Inquiry & Site Visit Form' },
  { type: 'disclaimer', label: 'Legal Disclaimers & NOC Notes' }
];

async function uploadMediaDataUrlToServer(
  dataUrl: string,
  fileName: string
): Promise<string> {
  try {
    const res = await fetch('/api/media/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataUrl, fileName })
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.url) return data.url;
    }
  } catch (err) {
    console.error('Upload fallback to inline DataURL:', err);
  }
  return dataUrl;
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
    | 'basics'
    | 'media'
    | 'sections'
    | 'highlights_amenities'
    | 'tour3d'
    | 'hotspots'
    | 'units'
    | 'pricing'
  >('basics');
  const [searchQuery, setSearchQuery] = useState('');
  const [newFeatureText, setNewFeatureText] = useState('');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryCaption, setNewGalleryCaption] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState('Exterior');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoCategory, setNewVideoCategory] = useState('Project Tour');
  const [uploadStatusMsg, setUploadStatusMsg] = useState<string | null>(null);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  // Page Sections CRUD state
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [newSectionType, setNewSectionType] = useState<AdVibeSectionType>('highlights');
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionSubtitle, setNewSectionSubtitle] = useState('');
  const [newSectionBadge, setNewSectionBadge] = useState('');

  // Highlights, Amenities & Location Points CRUD state
  const [newHlTitle, setNewHlTitle] = useState('');
  const [newHlValue, setNewHlValue] = useState('');
  const [newHlDesc, setNewHlDesc] = useState('');
  const [newAmName, setNewAmName] = useState('');
  const [newAmCat, setNewAmCat] = useState('Wellness & Sports');
  const [newAmDesc, setNewAmDesc] = useState('');
  const [newLocName, setNewLocName] = useState('');
  const [newLocDist, setNewLocDist] = useState('2.5 km');
  const [newLocTime, setNewLocTime] = useState('4 mins');

  // 360 Virtual Tour Scene CRUD state
  const [newSceneName, setNewSceneName] = useState('');
  const [newSceneCategory, setNewSceneCategory] = useState('Exterior & Boulevard');
  const [newSceneImageUrl, setNewSceneImageUrl] = useState('');
  const [newSceneNightUrl, setNewSceneNightUrl] = useState('');
  const [newSceneDesc, setNewSceneDesc] = useState('');

  // Master Plan Hotspot CRUD state
  const [newHotspotTitle, setNewHotspotTitle] = useState('');
  const [newHotspotCategory, setNewHotspotCategory] = useState('Residential Block');
  const [newHotspotStatus, setNewHotspotStatus] = useState('Available');
  const [newHotspotX, setNewHotspotX] = useState(50);
  const [newHotspotY, setNewHotspotY] = useState(50);
  const [newHotspotDesc, setNewHotspotDesc] = useState('');
  const [newHotspotLinkedProp, setNewHotspotLinkedProp] = useState('');

  // Pricing Plan CRUD state
  const [newTierUnit, setNewTierUnit] = useState('');
  const [newTierSize, setNewTierSize] = useState('');
  const [newTierTotal, setNewTierTotal] = useState('');
  const [newTierDown, setNewTierDown] = useState('');
  const [newTierMonthly, setNewTierMonthly] = useState('');
  const [newTierPossession, setNewTierPossession] = useState('Immediate Allocation');

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
    setTimeout(() => setUploadStatusMsg(null), 4500);
  };

  const ensureDefaultScenesOnEdit = (proj: AdVibeProject): AdVibeProject => {
    const existingScenes = proj.virtualTour?.scenes;
    const hasVirtualTourSec = (proj.sections || []).some(
      s => s.type === 'virtual_tour'
    );
    const updatedSections = hasVirtualTourSec
      ? proj.sections
      : [
          ...(proj.sections || []),
          {
            id: `sec-virtual-tour-${Date.now()}`,
            type: 'virtual_tour' as const,
            title: `${proj.title} — 360° Virtual Tour`,
            subtitle: 'Interactive Panoramic Digital Twin',
            badge: '360° VIRTUAL TOUR',
            isEnabled: true,
            order: Math.min((proj.sections?.length || 3) + 1, 5)
          }
        ];

    if (Array.isArray(existingScenes) && existingScenes.length > 0) {
      return { ...proj, sections: updatedSections };
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
      sections: updatedSections,
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
    setIsUploadingMedia(true);
    try {
      const compressed = await compressImageFile(file);
      const permanentUrl = await uploadMediaDataUrlToServer(compressed, file.name);

      const updatedGallery = [...(editingProject.gallery || [])];
      if (!updatedGallery.some(g => g.url === permanentUrl)) {
        updatedGallery.unshift({
          id: `gal-${Date.now()}`,
          url: permanentUrl,
          type: 'image',
          category: 'Exterior',
          caption:
            target === 'mainImage'
              ? `${editingProject.title} — Main Listing Cover`
              : `${editingProject.title} — Main Showcase Hero Banner`
        });
      }

      const syncedSections = (editingProject.sections || []).map(sec =>
        sec.type === 'hero'
          ? {
              ...sec,
              customSettings: {
                ...sec.customSettings,
                bgImageUrl:
                  target === 'bannerImage'
                    ? permanentUrl
                    : editingProject.bannerImage || permanentUrl
              }
            }
          : sec
      );

      setEditingProject({
        ...editingProject,
        [target]: permanentUrl,
        ...(target === 'bannerImage' && !editingProject.mainImage
          ? { mainImage: permanentUrl }
          : {}),
        ...(target === 'mainImage' && !editingProject.bannerImage
          ? { bannerImage: permanentUrl }
          : {}),
        seo: { ...editingProject.seo, ogImage: permanentUrl },
        gallery: updatedGallery,
        sections: syncedSections
      });

      notifyStatus(
        target === 'mainImage'
          ? 'Main Listing Image uploaded to server! Click "Save & Publish Changes" to apply globally.'
          : 'Main Showcase Hero Banner uploaded to server! Click "Save & Publish Changes" to apply globally.'
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const handleUploadGalleryFiles = async (files: FileList | null) => {
    if (!files || files.length === 0 || !editingProject) return;
    const valid = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (valid.length === 0) return;

    setIsUploadingMedia(true);
    try {
      const uploadedItems = [];
      for (let i = 0; i < valid.length; i++) {
        const file = valid[i];
        const compressed = await compressImageFile(file);
        const permanentUrl = await uploadMediaDataUrlToServer(
          compressed,
          file.name
        );
        uploadedItems.push({
          id: `gal-${Date.now()}-${i}`,
          url: permanentUrl,
          type: 'image' as const,
          category: newGalleryCategory || 'Exterior',
          caption:
            newGalleryCaption.trim() ||
            `${editingProject.title} — Photo ${(editingProject.gallery?.length || 0) + i + 1}`
        });
      }

      const nextGallery = [...uploadedItems, ...(editingProject.gallery || [])];
      setEditingProject({
        ...editingProject,
        mainImage: editingProject.mainImage || nextGallery[0]?.url,
        bannerImage: editingProject.bannerImage || nextGallery[0]?.url,
        gallery: nextGallery
      });
      setNewGalleryCaption('');
      notifyStatus(
        `Uploaded ${uploadedItems.length} photo(s) to permanent server storage!`
      );
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const handleUploadLocalVideo = (file?: File) => {
    if (!file || !editingProject) return;
    if (!file.type.startsWith('video/')) {
      notifyStatus('Please select a valid video file (MP4, WebM, MOV).');
      return;
    }
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > 80) {
      notifyStatus(
        'Video file is over 80MB. Please use a shorter clip or paste a URL.'
      );
      return;
    }

    setIsUploadingMedia(true);
    const reader = new FileReader();
    reader.onload = async e => {
      try {
        const videoDataUrl = e.target?.result as string;
        const finalVideoUrl = await uploadMediaDataUrlToServer(
          videoDataUrl,
          file.name
        );

        const vidTitle =
          newVideoTitle.trim() ||
          file.name.replace(/\.[^/.]+$/, '') ||
          'Project Walkthrough';
        const newVidItem = {
          id: `vid-${Date.now()}`,
          title: vidTitle,
          category: newVideoCategory || 'Project Tour',
          type: 'hosted' as const,
          url: finalVideoUrl,
          thumbnail:
            editingProject.bannerImage ||
            editingProject.mainImage ||
            editingProject.seo?.ogImage ||
            editingProject.logo,
          duration: 'Walkthrough'
        };

        const syncedSections = (editingProject.sections || []).map(sec =>
          sec.type === 'hero'
            ? {
                ...sec,
                customSettings: {
                  ...sec.customSettings,
                  bgVideoUrl: finalVideoUrl
                }
              }
            : sec
        );

        setEditingProject({
          ...editingProject,
          heroVideoUrl: finalVideoUrl,
          heroVideoTitle: vidTitle,
          videos: [newVidItem, ...(editingProject.videos || [])],
          sections: syncedSections
        });
        setNewVideoTitle('');
        notifyStatus(
          'Walkthrough video uploaded & set as Main Banner Video!'
        );
      } finally {
        setIsUploadingMedia(false);
      }
    };
    reader.onerror = () => setIsUploadingMedia(false);
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
            : newSectionType === 'intro'
              ? {
                  quote: editingProject.tagline,
                  paragraphs: [editingProject.description]
                }
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

  const handleSaveCurrentProject = (): AdVibeProject | null => {
    if (!editingProject) return null;
    const primaryCover =
      editingProject.mainImage ||
      editingProject.bannerImage ||
      editingProject.seo?.ogImage ||
      editingProject.gallery?.[0]?.url ||
      editingProject.logo;
    const primaryBanner = editingProject.bannerImage || primaryCover;
    const primaryVideo =
      editingProject.heroVideoUrl ||
      editingProject.videos?.[0]?.url ||
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

    const syncedSections = (editingProject.sections || []).map(sec => {
      if (sec.type === 'hero') {
        return {
          ...sec,
          title: sec.title || editingProject.title,
          subtitle: sec.subtitle || editingProject.tagline,
          customSettings: {
            ...sec.customSettings,
            bgImageUrl: primaryBanner,
            bgVideoUrl: primaryVideo
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
      heroVideoUrl: primaryVideo,
      seo: {
        ...editingProject.seo,
        ogImage: primaryCover
      },
      virtualTour: {
        ...editingProject.virtualTour,
        provider: 'custom360',
        url: primary360Url,
        scenes: scenesList
      },
      sections: syncedSections,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    onSaveProject(updatedProj);
    setEditingProject(null);
    notifyStatus(`Saved "${updatedProj.title}" and synced across the portal!`);
    return updatedProj;
  };

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
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
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
                  const saved = handleSaveCurrentProject();
                  if (saved) onPreviewProject(saved.slug);
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
                key: 'highlights_amenities',
                label: '4. Highlights, Amenities & Radar',
                icon: Award
              },
              {
                key: 'tour3d',
                label: `5. 360° Virtual Tour CRUD (${editingProject.virtualTour?.scenes?.length || 0})`,
                icon: Compass
              },
              {
                key: 'hotspots',
                label: `6. Master Plan Map & Pins (${editingProject.masterPlan?.hotspots?.length || 0})`,
                icon: MapPin
              },
              {
                key: 'units',
                label: `7. Linked Units (${editingProject.linkedPropertyIds?.length || 0})`,
                icon: Building2
              },
              {
                key: 'pricing',
                label: `8. Payment Plans (${editingProject.pricingTiers?.length || 0})`,
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

          {/* SUB-TAB 1: BASICS & DEVELOPER */}
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
                    <option value="Commercial Mall & Tower">Commercial Mall &amp; Tower</option>
                    <option value="High-Rise Tower">High-Rise Tower</option>
                    <option value="Mixed-Use Megaproject">Mixed-Use Megaproject</option>
                    <option value="Luxury Villa Enclave">Luxury Villa Enclave</option>
                    <option value="Modular Smart Community">Modular Smart Community</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Status Badge
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
                    <option value="Ready for Possession">Ready for Possession</option>
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Pre-Launch">Pre-Launch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Starting Price (Formatted)
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
                    placeholder="e.g. PKR 38 Lakhs"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold"
                  />
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
                    Sector / Area Label
                  </label>
                  <input
                    type="text"
                    value={editingProject.area}
                    onChange={e =>
                      setEditingProject({ ...editingProject, area: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Full Street Address
                  </label>
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
                  <label className="block text-slate-700 font-bold mb-1">
                    Executive Tagline / Hero Subtitle
                  </label>
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
                  <label className="block text-slate-700 font-bold mb-1">
                    Comprehensive Project Description
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
              </div>

              {/* Developer Details */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-extrabold text-slate-900">
                  Master Developer &amp; Advisor Hotline
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Sales Hotline Phone
                    </label>
                    <input
                      type="text"
                      value={editingProject.dealerPhone || ''}
                      onChange={e =>
                        setEditingProject({
                          ...editingProject,
                          dealerPhone: e.target.value
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={editingProject.dealerWhatsApp || ''}
                      onChange={e =>
                        setEditingProject({
                          ...editingProject,
                          dealerWhatsApp: e.target.value
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                    />
                  </div>
                </div>
              </div>

              {/* Bullet Features */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block font-extrabold text-slate-900">
                  Hero Banner Key Bullet Features
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeatureText}
                    onChange={e => setNewFeatureText(e.target.value)}
                    placeholder="e.g. 100% RDA Approved NOC & Immediate Possession"
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2"
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
                <div className="flex flex-wrap gap-2">
                  {(editingProject.features || []).map((feat, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold"
                    >
                      <span>{feat}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingProject({
                            ...editingProject,
                            features: (editingProject.features || []).filter(
                              (_, idx) => idx !== i
                            )
                          })
                        }
                        className="text-rose-600 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 2: MAIN BANNER, PHOTOS & VIDEO UPLOAD */}
          {editorSubTab === 'media' && (
            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Main Listing Card Image */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-extrabold text-slate-900">
                      1. Main Card Cover Image
                    </label>
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
                      disabled={isUploadingMedia}
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
                        mainImage: e.target.value
                      })
                    }
                    placeholder="Paste Main Image URL or upload from PC..."
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <div className="h-44 rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                    <img
                      src={
                        editingProject.mainImage ||
                        editingProject.bannerImage ||
                        editingProject.seo?.ogImage
                      }
                      alt="Main Cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Main Showcase Hero Banner Image */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-extrabold text-slate-900">
                      2. Full Project Showcase Main Hero Banner
                    </label>
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
                      disabled={isUploadingMedia}
                      onClick={() => bannerImageFileRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Banner from PC</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={editingProject.bannerImage || ''}
                    onChange={e => {
                      const val = e.target.value;
                      setEditingProject({
                        ...editingProject,
                        bannerImage: val,
                        sections: (editingProject.sections || []).map(s =>
                          s.type === 'hero'
                            ? {
                                ...s,
                                customSettings: {
                                  ...s.customSettings,
                                  bgImageUrl: val
                                }
                              }
                            : s
                        )
                      });
                    }}
                    placeholder="Paste Showcase Hero Banner URL or upload..."
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <div className="h-44 rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                    <img
                      src={
                        editingProject.bannerImage ||
                        editingProject.mainImage ||
                        editingProject.seo?.ogImage
                      }
                      alt="Showcase Hero Banner"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Main Banner Walkthrough Video & Videos Manager */}
              <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="font-extrabold text-indigo-950 flex items-center gap-2 text-sm">
                      <Video className="w-4 h-4 text-indigo-600" />
                      <span>
                        3. &quot;Watch Banner Video&quot; &amp; &quot;Play Walkthrough Video&quot; Manager
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-600">
                      Upload an MP4/WebM walkthrough video from your computer or paste a direct video/YouTube URL.
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
                    disabled={isUploadingMedia}
                    onClick={() => videoFileRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Film className="w-4 h-4" />
                    <span>
                      {isUploadingMedia
                        ? 'Uploading Video...'
                        : 'Upload Walkthrough Video (MP4/WebM)'}
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Primary Banner / Walkthrough Video URL
                    </label>
                    <input
                      type="text"
                      value={editingProject.heroVideoUrl || ''}
                      onChange={e =>
                        setEditingProject({
                          ...editingProject,
                          heroVideoUrl: e.target.value
                        })
                      }
                      placeholder="https://...mp4, /uploads/...mp4, or YouTube URL"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Primary Video Title
                    </label>
                    <input
                      type="text"
                      value={editingProject.heroVideoTitle || ''}
                      onChange={e =>
                        setEditingProject({
                          ...editingProject,
                          heroVideoTitle: e.target.value
                        })
                      }
                      placeholder="Official 4K Project Walkthrough"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                    />
                  </div>
                </div>

                {/* Add Extra Video to Project Video Gallery */}
                <div className="pt-3 border-t border-indigo-200/80 grid grid-cols-1 md:grid-cols-4 gap-2">
                  <input
                    type="text"
                    value={newVideoTitle}
                    onChange={e => setNewVideoTitle(e.target.value)}
                    placeholder="Video Title (e.g. Drone Site Progress)"
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <select
                    value={newVideoCategory}
                    onChange={e => setNewVideoCategory(e.target.value)}
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  >
                    <option value="Project Tour">Project Tour</option>
                    <option value="Construction">Construction Progress</option>
                    <option value="Apartment Tour">Model Villa / Suite Tour</option>
                    <option value="Developer Message">Developer Message</option>
                  </select>
                  <input
                    type="text"
                    value={newVideoUrl}
                    onChange={e => setNewVideoUrl(e.target.value)}
                    placeholder="Paste MP4 or YouTube URL..."
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newVideoUrl.trim()) return;
                      const url = newVideoUrl.trim();
                      const isYt =
                        url.includes('youtube.com') || url.includes('youtu.be');
                      const added = {
                        id: `vid-${Date.now()}`,
                        title: newVideoTitle.trim() || `${editingProject.title} Video`,
                        category: newVideoCategory,
                        type: (isYt ? 'youtube' : 'hosted') as 'youtube' | 'hosted',
                        url,
                        thumbnail:
                          editingProject.bannerImage ||
                          editingProject.mainImage ||
                          editingProject.logo,
                        duration: '02:00'
                      };
                      setEditingProject({
                        ...editingProject,
                        heroVideoUrl: editingProject.heroVideoUrl || url,
                        videos: [added, ...(editingProject.videos || [])]
                      });
                      setNewVideoUrl('');
                      setNewVideoTitle('');
                      notifyStatus('Added video to project showcase!');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer"
                  >
                    + Add Video URL
                  </button>
                </div>

                {editingProject.videos && editingProject.videos.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                    {editingProject.videos.map(v => (
                      <div
                        key={v.id}
                        className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 truncate">
                            {v.title}
                          </div>
                          <div className="text-[10px] text-indigo-600 font-semibold">
                            {v.category} • {v.type}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProject({
                                ...editingProject,
                                heroVideoUrl: v.url,
                                heroVideoTitle: v.title
                              });
                              notifyStatus(`Set "${v.title}" as Main Banner Video!`);
                            }}
                            className="px-2 py-1 rounded bg-indigo-50 text-indigo-700 font-bold text-[10px] cursor-pointer"
                          >
                            Set Main
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
                            className="p-1 text-rose-600 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Photo Gallery Manager */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      4. Project Showcase Photo Gallery ({editingProject.gallery?.length || 0} Photos)
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Upload multiple high-resolution photos or add image URLs.
                    </p>
                  </div>
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
                    disabled={isUploadingMedia}
                    onClick={() => galleryFileRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Multiple Photos from PC</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  <input
                    type="text"
                    value={newGalleryCaption}
                    onChange={e => setNewGalleryCaption(e.target.value)}
                    placeholder="Photo Caption"
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <select
                    value={newGalleryCategory}
                    onChange={e => setNewGalleryCategory(e.target.value)}
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  >
                    <option value="Exterior">Exterior</option>
                    <option value="Interior">Interior</option>
                    <option value="Aerial Drone">Aerial Drone</option>
                    <option value="Construction Update">Construction Update</option>
                    <option value="Amenities">Amenities</option>
                  </select>
                  <input
                    type="text"
                    value={newGalleryUrl}
                    onChange={e => setNewGalleryUrl(e.target.value)}
                    placeholder="Paste Image URL..."
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newGalleryUrl.trim()) return;
                      const item = {
                        id: `gal-${Date.now()}`,
                        url: newGalleryUrl.trim(),
                        type: 'image' as const,
                        category: newGalleryCategory,
                        caption:
                          newGalleryCaption.trim() ||
                          `${editingProject.title} Gallery Photo`
                      };
                      setEditingProject({
                        ...editingProject,
                        gallery: [item, ...(editingProject.gallery || [])]
                      });
                      setNewGalleryUrl('');
                      setNewGalleryCaption('');
                      notifyStatus('Added photo to gallery!');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
                  >
                    + Add Photo URL
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                  {(editingProject.gallery || []).map(g => (
                    <div
                      key={g.id}
                      className="rounded-xl overflow-hidden bg-white border border-slate-200 flex flex-col justify-between"
                    >
                      <div className="relative h-28 bg-slate-900">
                        <img
                          src={g.url}
                          alt={g.caption}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setEditingProject({
                              ...editingProject,
                              gallery: editingProject.gallery.filter(
                                item => item.id !== g.id
                              )
                            })
                          }
                          className="absolute top-1.5 right-1.5 p-1 rounded bg-rose-600 text-white cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="p-2 space-y-1">
                        <div className="text-[10px] font-bold text-slate-800 truncate">
                          {g.caption}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProject({
                              ...editingProject,
                              mainImage: g.url,
                              bannerImage: g.url
                            });
                            notifyStatus('Set photo as Main Banner & Cover!');
                          }}
                          className="w-full py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[10px] cursor-pointer"
                        >
                          Set as Main Banner
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 3: PAGE SECTIONS CRUD */}
          {editorSubTab === 'sections' && (
            <div className="space-y-5 text-xs">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                <h4 className="font-extrabold text-blue-950 text-sm">
                  Create &amp; Add New Page Section to Project Showcase
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Section Type
                    </label>
                    <select
                      value={newSectionType}
                      onChange={e =>
                        setNewSectionType(e.target.value as AdVibeSectionType)
                      }
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-bold"
                    >
                      {SECTION_TYPE_OPTIONS.map(opt => (
                        <option key={opt.type} value={opt.type}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Section Heading Title
                    </label>
                    <input
                      type="text"
                      value={newSectionTitle}
                      onChange={e => setNewSectionTitle(e.target.value)}
                      placeholder="e.g. Executive Highlights"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={newSectionSubtitle}
                      onChange={e => setNewSectionSubtitle(e.target.value)}
                      placeholder="e.g. Engineered for modern living"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                    />
                  </div>

                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="block font-bold text-slate-700 mb-1">
                        Badge Label
                      </label>
                      <input
                        type="text"
                        value={newSectionBadge}
                        onChange={e => setNewSectionBadge(e.target.value)}
                        placeholder="HIGHLIGHTS"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddSection}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer shrink-0"
                    >
                      + Add Section
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                {editingProject.sections.map((sec, idx) => {
                  const isEditingThis = editingSectionId === sec.id;
                  return (
                    <div
                      key={sec.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        sec.isEnabled
                          ? 'bg-white border-slate-200'
                          : 'bg-slate-100 border-slate-200 opacity-65'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-black flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-slate-900 text-sm">
                                {sec.title}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold uppercase">
                                {sec.type}
                              </span>
                              {sec.badge && (
                                <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-bold">
                                  {sec.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500">
                              {sec.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveSection(idx, 'up')}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === editingProject.sections.length - 1}
                            onClick={() => handleMoveSection(idx, 'down')}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setEditingSectionId(isEditingThis ? null : sec.id)
                            }
                            className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold cursor-pointer flex items-center gap-1"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>{isEditingThis ? 'Done' : 'Edit Section'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const next = editingProject.sections.map(s =>
                                s.id === sec.id
                                  ? { ...s, isEnabled: !s.isEnabled }
                                  : s
                              );
                              setEditingProject({
                                ...editingProject,
                                sections: next
                              });
                            }}
                            className={`px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 cursor-pointer ${
                              sec.isEnabled
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {sec.isEnabled ? (
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
                            onClick={() => handleDeleteSection(sec.id)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white cursor-pointer"
                            title="Delete Section"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {isEditingThis && (
                        <div className="mt-4 pt-4 border-t border-slate-200 space-y-3 bg-slate-50 p-3.5 rounded-xl">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">
                                Section Title
                              </label>
                              <input
                                type="text"
                                value={sec.title}
                                onChange={e => {
                                  const val = e.target.value;
                                  setEditingProject({
                                    ...editingProject,
                                    sections: editingProject.sections.map(s =>
                                      s.id === sec.id ? { ...s, title: val } : s
                                    )
                                  });
                                }}
                                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">
                                Section Subtitle
                              </label>
                              <input
                                type="text"
                                value={sec.subtitle}
                                onChange={e => {
                                  const val = e.target.value;
                                  setEditingProject({
                                    ...editingProject,
                                    sections: editingProject.sections.map(s =>
                                      s.id === sec.id ? { ...s, subtitle: val } : s
                                    )
                                  });
                                }}
                                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">
                                Section Badge
                              </label>
                              <input
                                type="text"
                                value={sec.badge || ''}
                                onChange={e => {
                                  const val = e.target.value;
                                  setEditingProject({
                                    ...editingProject,
                                    sections: editingProject.sections.map(s =>
                                      s.id === sec.id ? { ...s, badge: val } : s
                                    )
                                  });
                                }}
                                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                              />
                            </div>
                          </div>

                          {(sec.type === 'intro' || sec.type === 'story') && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block font-bold text-slate-700 mb-1">
                                  Manifesto Quote
                                </label>
                                <input
                                  type="text"
                                  value={sec.content?.quote || ''}
                                  onChange={e => {
                                    const val = e.target.value;
                                    setEditingProject({
                                      ...editingProject,
                                      sections: editingProject.sections.map(s =>
                                        s.id === sec.id
                                          ? {
                                              ...s,
                                              content: {
                                                ...s.content,
                                                quote: val
                                              }
                                            }
                                          : s
                                      )
                                    });
                                  }}
                                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                                />
                              </div>
                              <div>
                                <label className="block font-bold text-slate-700 mb-1">
                                  Overview Paragraphs (One per line)
                                </label>
                                <textarea
                                  rows={3}
                                  value={(sec.content?.paragraphs || []).join('\n')}
                                  onChange={e => {
                                    const lines = e.target.value
                                      .split('\n')
                                      .filter(Boolean);
                                    setEditingProject({
                                      ...editingProject,
                                      sections: editingProject.sections.map(s =>
                                        s.id === sec.id
                                          ? {
                                              ...s,
                                              content: {
                                                ...s.content,
                                                paragraphs: lines
                                              }
                                            }
                                          : s
                                      )
                                    });
                                  }}
                                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SUB-TAB 4: HIGHLIGHTS, AMENITIES & LOCATION RADAR CRUD */}
          {editorSubTab === 'highlights_amenities' && (
            <div className="space-y-6 text-xs">
              {/* Highlights CRUD */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-extrabold text-slate-900 text-sm">
                  Project Highlights ({editingProject.highlights?.length || 0})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  <input
                    type="text"
                    value={newHlTitle}
                    onChange={e => setNewHlTitle(e.target.value)}
                    placeholder="Highlight Title (e.g. 225ft Boulevard)"
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <input
                    type="text"
                    value={newHlValue}
                    onChange={e => setNewHlValue(e.target.value)}
                    placeholder="Badge Value (e.g. Direct Access)"
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <input
                    type="text"
                    value={newHlDesc}
                    onChange={e => setNewHlDesc(e.target.value)}
                    placeholder="Short Description..."
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newHlTitle.trim()) return;
                      const item = {
                        id: `hl-${Date.now()}`,
                        title: newHlTitle.trim(),
                        value: newHlValue.trim() || 'Key Highlight',
                        description: newHlDesc.trim(),
                        iconName: 'Compass',
                        image: editingProject.mainImage
                      };
                      setEditingProject({
                        ...editingProject,
                        highlights: [...(editingProject.highlights || []), item]
                      });
                      setNewHlTitle('');
                      setNewHlValue('');
                      setNewHlDesc('');
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold cursor-pointer"
                  >
                    + Add Highlight
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(editingProject.highlights || []).map(hl => (
                    <div
                      key={hl.id}
                      className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-2"
                    >
                      <div>
                        <div className="font-bold text-slate-900">
                          {hl.title} ({hl.value})
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {hl.description}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingProject({
                            ...editingProject,
                            highlights: editingProject.highlights.filter(
                              i => i.id !== hl.id
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

              {/* Amenities CRUD */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-extrabold text-slate-900 text-sm">
                  World-Class Amenities ({editingProject.amenities?.length || 0})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  <input
                    type="text"
                    value={newAmName}
                    onChange={e => setNewAmName(e.target.value)}
                    placeholder="Amenity Name"
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <select
                    value={newAmCat}
                    onChange={e => setNewAmCat(e.target.value)}
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  >
                    <option value="Wellness & Sports">Wellness &amp; Sports</option>
                    <option value="Security & Infrastructure">Security &amp; Infrastructure</option>
                    <option value="Lifestyle & Leisure">Lifestyle &amp; Leisure</option>
                    <option value="Smart Technology">Smart Technology</option>
                  </select>
                  <input
                    type="text"
                    value={newAmDesc}
                    onChange={e => setNewAmDesc(e.target.value)}
                    placeholder="Amenity Description"
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newAmName.trim()) return;
                      const item = {
                        id: `am-${Date.now()}`,
                        name: newAmName.trim(),
                        category: newAmCat,
                        description: newAmDesc.trim(),
                        iconName: 'Waves',
                        image: editingProject.mainImage
                      };
                      setEditingProject({
                        ...editingProject,
                        amenities: [...(editingProject.amenities || []), item]
                      });
                      setNewAmName('');
                      setNewAmDesc('');
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold cursor-pointer"
                  >
                    + Add Amenity
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(editingProject.amenities || []).map(am => (
                    <div
                      key={am.id}
                      className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-2"
                    >
                      <div>
                        <div className="font-bold text-slate-900">
                          {am.name} ({am.category})
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {am.description}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingProject({
                            ...editingProject,
                            amenities: editingProject.amenities.filter(
                              i => i.id !== am.id
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

              {/* Location Radar CRUD */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-extrabold text-slate-900 text-sm">
                  Location &amp; Proximity Landmarks ({editingProject.locationPoints?.length || 0})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  <input
                    type="text"
                    value={newLocName}
                    onChange={e => setNewLocName(e.target.value)}
                    placeholder="Landmark Name (e.g. M-1 Motorway)"
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <input
                    type="text"
                    value={newLocDist}
                    onChange={e => setNewLocDist(e.target.value)}
                    placeholder="Distance (e.g. 2.5 km)"
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <input
                    type="text"
                    value={newLocTime}
                    onChange={e => setNewLocTime(e.target.value)}
                    placeholder="Drive Time (e.g. 4 mins)"
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newLocName.trim()) return;
                      const pt = {
                        id: `loc-${Date.now()}`,
                        name: newLocName.trim(),
                        category: 'Highway & Access',
                        distance: newLocDist.trim() || '2 km',
                        driveTime: newLocTime.trim() || '3 mins'
                      };
                      setEditingProject({
                        ...editingProject,
                        locationPoints: [
                          ...(editingProject.locationPoints || []),
                          pt
                        ]
                      });
                      setNewLocName('');
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold cursor-pointer"
                  >
                    + Add Landmark
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(editingProject.locationPoints || []).map(lp => (
                    <div
                      key={lp.id}
                      className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between"
                    >
                      <span className="font-bold text-slate-900">
                        {lp.name} — {lp.distance} ({lp.driveTime})
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingProject({
                            ...editingProject,
                            locationPoints: editingProject.locationPoints.filter(
                              i => i.id !== lp.id
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
            </div>
          )}

          {/* SUB-TAB 5: 360 VIRTUAL TOUR CRUD */}
          {editorSubTab === 'tour3d' && (
            <div className="space-y-6 text-xs">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                <h4 className="font-extrabold text-amber-950 text-sm">
                  Add New 360° Panoramic Scene (Visible in &quot;Open Full Project Showcase&quot;)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Scene Name *
                    </label>
                    <input
                      type="text"
                      value={newSceneName}
                      onChange={e => setNewSceneName(e.target.value)}
                      placeholder="e.g. Main Boulevard & Entrance 360°"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={newSceneCategory}
                      onChange={e => setNewSceneCategory(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={newSceneDesc}
                      onChange={e => setNewSceneDesc(e.target.value)}
                      placeholder="Panoramic view details..."
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSceneImageUrl}
                      onChange={e => setNewSceneImageUrl(e.target.value)}
                      placeholder="Day 360° Panorama Image URL..."
                      className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2"
                    />
                    <input
                      ref={sceneDayFileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async e => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const comp = await compressImageFile(file);
                        const url = await uploadMediaDataUrlToServer(comp, file.name);
                        setNewSceneImageUrl(url);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => sceneDayFileRef.current?.click()}
                      className="px-3 py-2 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
                    >
                      Upload Day
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSceneNightUrl}
                      onChange={e => setNewSceneNightUrl(e.target.value)}
                      placeholder="Evening/Night 360° Image URL (Optional)..."
                      className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2"
                    />
                    <input
                      ref={sceneNightFileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async e => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const comp = await compressImageFile(file);
                        const url = await uploadMediaDataUrlToServer(comp, file.name);
                        setNewSceneNightUrl(url);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => sceneNightFileRef.current?.click()}
                      className="px-3 py-2 rounded-xl bg-slate-700 text-white font-bold cursor-pointer"
                    >
                      Upload Night
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!newSceneName.trim() || !newSceneImageUrl.trim()) return;
                    const newScene = {
                      id: `scene-${Date.now()}`,
                      name: newSceneName.trim(),
                      category: newSceneCategory,
                      imageUrl: newSceneImageUrl.trim(),
                      nightImageUrl: newSceneNightUrl.trim() || newSceneImageUrl.trim(),
                      description: newSceneDesc.trim() || editingProject.tagline,
                      hotspots: []
                    };
                    const currentScenes = editingProject.virtualTour?.scenes || [];
                    setEditingProject({
                      ...editingProject,
                      virtualTour: {
                        ...editingProject.virtualTour,
                        provider: 'custom360',
                        url: newScene.imageUrl,
                        scenes: [...currentScenes, newScene]
                      }
                    });
                    setNewSceneName('');
                    setNewSceneImageUrl('');
                    setNewSceneNightUrl('');
                    setNewSceneDesc('');
                    notifyStatus('Added 360° Virtual Tour Scene!');
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold cursor-pointer"
                >
                  + Add 360° Scene
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {(editingProject.virtualTour?.scenes || []).map(sc => (
                  <div
                    key={sc.id}
                    className="rounded-xl overflow-hidden bg-white border border-slate-200 flex flex-col justify-between"
                  >
                    <img
                      src={sc.imageUrl}
                      alt={sc.name}
                      className="h-32 w-full object-cover"
                    />
                    <div className="p-3 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate">
                          {sc.name}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {sc.category}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingProject({
                            ...editingProject,
                            virtualTour: {
                              ...editingProject.virtualTour,
                              scenes: (
                                editingProject.virtualTour?.scenes || []
                              ).filter(s => s.id !== sc.id)
                            }
                          })
                        }
                        className="p-1.5 text-rose-600 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <h5 className="font-extrabold text-slate-900 mb-2">
                  Live 360° Virtual Tour Preview
                </h5>
                <Advibe3DVirtualTour
                  project={editingProject}
                  embedded={true}
                  className="h-[400px]"
                />
              </div>
            </div>
          )}

          {/* SUB-TAB 6: MASTER PLAN & HOTSPOTS CRUD */}
          {editorSubTab === 'hotspots' && (
            <div className="space-y-5 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-extrabold text-slate-900">
                    Master Plan Layout Map Image
                  </label>
                  <input
                    ref={masterPlanFileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async e => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const comp = await compressImageFile(file);
                      const url = await uploadMediaDataUrlToServer(comp, file.name);
                      setEditingProject({
                        ...editingProject,
                        masterPlan: {
                          ...editingProject.masterPlan,
                          imageUrl: url
                        }
                      });
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => masterPlanFileRef.current?.click()}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold cursor-pointer"
                  >
                    Upload Master Plan Image
                  </button>
                </div>
                <input
                  type="text"
                  value={editingProject.masterPlan?.imageUrl || ''}
                  onChange={e =>
                    setEditingProject({
                      ...editingProject,
                      masterPlan: {
                        ...editingProject.masterPlan,
                        imageUrl: e.target.value
                      }
                    })
                  }
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
                />
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
                <h4 className="font-extrabold text-slate-900">
                  Add Sector / Block Pin to Master Plan
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                  <input
                    type="text"
                    value={newHotspotTitle}
                    onChange={e => setNewHotspotTitle(e.target.value)}
                    placeholder="Pin Title (e.g. Executive Block)"
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <input
                    type="number"
                    min={5}
                    max={95}
                    value={newHotspotX}
                    onChange={e => setNewHotspotX(Number(e.target.value))}
                    placeholder="X % (0-100)"
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <input
                    type="number"
                    min={5}
                    max={95}
                    value={newHotspotY}
                    onChange={e => setNewHotspotY(Number(e.target.value))}
                    placeholder="Y % (0-100)"
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <input
                    type="text"
                    value={newHotspotDesc}
                    onChange={e => setNewHotspotDesc(e.target.value)}
                    placeholder="Sector Description..."
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
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
                        description: newHotspotDesc.trim(),
                        linkedPropertyId: newHotspotLinkedProp || undefined
                      };
                      setEditingProject({
                        ...editingProject,
                        masterPlan: {
                          ...editingProject.masterPlan,
                          hotspots: [
                            ...(editingProject.masterPlan?.hotspots || []),
                            pin
                          ]
                        }
                      });
                      setNewHotspotTitle('');
                      setNewHotspotDesc('');
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold cursor-pointer"
                  >
                    + Add Pin
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(editingProject.masterPlan?.hotspots || []).map(hp => (
                  <div
                    key={hp.id}
                    className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-slate-900">
                        {hp.title} ({hp.x}%, {hp.y}%)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {hp.description}
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
                              i => i.id !== hp.id
                            )
                          }
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
          )}

          {/* SUB-TAB 7: LINKED UNITS */}
          {editorSubTab === 'units' && (
            <div className="space-y-4 text-xs">
              <input
                type="text"
                value={unitSearchQuery}
                onChange={e => setUnitSearchQuery(e.target.value)}
                placeholder="Filter properties to link with this AdVibe project..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-1">
                {properties
                  .filter(p =>
                    p.title.toLowerCase().includes(unitSearchQuery.toLowerCase())
                  )
                  .map(prop => {
                    const isLinked = (
                      editingProject.linkedPropertyIds || []
                    ).includes(prop.id);
                    return (
                      <div
                        key={prop.id}
                        onClick={() => {
                          const current = editingProject.linkedPropertyIds || [];
                          const next = isLinked
                            ? current.filter(id => id !== prop.id)
                            : [...current, prop.id];
                          setEditingProject({
                            ...editingProject,
                            linkedPropertyIds: next
                          });
                        }}
                        className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer ${
                          isLinked
                            ? 'bg-blue-50 border-blue-500'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <img
                          src={prop.images[0]}
                          alt={prop.title}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-slate-900 truncate">
                            {prop.title}
                          </div>
                          <div className="text-blue-600 font-extrabold">
                            {prop.priceFormatted}
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={isLinked}
                          onChange={() => {}}
                          className="w-4 h-4 pointer-events-none"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* SUB-TAB 8: PRICING & PAYMENT PLANS CRUD */}
          {editorSubTab === 'pricing' && (
            <div className="space-y-5 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-extrabold text-slate-900">
                  Add Payment Plan / Unit Investment Tier
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <input
                    type="text"
                    value={newTierUnit}
                    onChange={e => setNewTierUnit(e.target.value)}
                    placeholder="Unit Type (e.g. 5 Marla Residential Plot)"
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <input
                    type="text"
                    value={newTierSize}
                    onChange={e => setNewTierSize(e.target.value)}
                    placeholder="Size (e.g. 125 Sq Yds)"
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <input
                    type="text"
                    value={newTierTotal}
                    onChange={e => setNewTierTotal(e.target.value)}
                    placeholder="Total Price (e.g. PKR 38,00,000)"
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <input
                    type="text"
                    value={newTierDown}
                    onChange={e => setNewTierDown(e.target.value)}
                    placeholder="Down Payment (e.g. PKR 7,50,000)"
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <input
                    type="text"
                    value={newTierMonthly}
                    onChange={e => setNewTierMonthly(e.target.value)}
                    placeholder="Monthly Installment (e.g. PKR 65,000 x 36)"
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTierPossession}
                      onChange={e => setNewTierPossession(e.target.value)}
                      placeholder="Possession Terms"
                      className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newTierUnit.trim() || !newTierTotal.trim()) return;
                        const tier = {
                          id: `tier-${Date.now()}`,
                          unitType: newTierUnit.trim(),
                          size: newTierSize.trim() || 'Standard',
                          totalPrice: newTierTotal.trim(),
                          downPayment: newTierDown.trim() || '20% Booking',
                          monthlyInstallment:
                            newTierMonthly.trim() || '36 Monthly Installments',
                          possession:
                            newTierPossession.trim() || 'Immediate Allocation',
                          features: [
                            '100% Verified Legal Title',
                            'Direct Developer Allocation'
                          ]
                        };
                        setEditingProject({
                          ...editingProject,
                          pricingTiers: [
                            ...(editingProject.pricingTiers || []),
                            tier
                          ]
                        });
                        setNewTierUnit('');
                        setNewTierSize('');
                        setNewTierTotal('');
                        setNewTierDown('');
                        setNewTierMonthly('');
                      }}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold cursor-pointer shrink-0"
                    >
                      + Add Tier
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(editingProject.pricingTiers || []).map(t => (
                  <div
                    key={t.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-extrabold text-slate-900">
                        {t.unitType} ({t.size})
                      </div>
                      <div className="text-blue-600 font-black">
                        {t.totalPrice} • Down: {t.downPayment}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {t.monthlyInstallment}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingProject({
                          ...editingProject,
                          pricingTiers: editingProject.pricingTiers.filter(
                            i => i.id !== t.id
                          )
                        })
                      }
                      className="text-rose-600 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. INQUIRIES & LEADS TAB */}
      {activeTab === 'leads' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Project &amp; Unit</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map(lead => (
                <tr key={lead.id}>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {lead.name}
                    <div className="text-[10px] text-slate-400">
                      {lead.createdAt}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-blue-600">
                      {lead.projectTitle}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {lead.preferredUnit}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>{lead.phone}</div>
                    <div className="text-[10px] text-slate-400">{lead.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={lead.status}
                      onChange={e =>
                        onUpdateLeadStatus(lead.id, e.target.value as any)
                      }
                      className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 font-bold"
                    >
                      <option value="new">New Inquiry</option>
                      <option value="contacted">Contacted</option>
                      <option value="site_visit_booked">Site Visit Booked</option>
                      <option value="closed">Closed / Converted</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. AGENCY PERMISSIONS TAB */}
      {activeTab === 'permissions' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          {agencies.map(ag => (
            <div
              key={ag.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
            >
              <div>
                <div className="font-bold text-slate-900">
                  {ag.companyName || ag.name}
                </div>
                <div className="text-[11px] text-slate-500">
                  {ag.name} • {ag.city}
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  onToggleAgencyAdvibePermission(ag.id, !ag.canManageAdvibe)
                }
                className={`px-3.5 py-1.5 rounded-xl font-bold cursor-pointer ${
                  ag.canManageAdvibe
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {ag.canManageAdvibe ? 'AdVibe Authorized' : 'Grant Access'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvibeAdminManager;

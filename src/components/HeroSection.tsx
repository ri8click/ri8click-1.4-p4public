import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import {
  Building2,
  Sparkles,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Compass,
  ShieldCheck,
  Layers,
  MapPin,
  Box,
  CheckCircle2,
  EyeOff,
  Camera,
  Video,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  SlidersHorizontal,
  Home,
  Wrench,
  FileText,
  ExternalLink,
  RefreshCw,
  GripHorizontal,
  Move,
  RotateCcw
} from 'lucide-react';
import { PropertyCategory, HeroSlide, Property } from '../types';
import { INITIAL_HERO_SLIDES } from '../data/mockData';

interface HeroSectionProps {
  onSelectCategoryFilter: (cat: PropertyCategory) => void;
  onExploreClick: () => void;
  onContactAgentClick: () => void;
  onOpen3DTour: (sampleProperty?: any) => void;
  slides?: HeroSlide[];
  properties?: Property[];
}

type TourDeckCategory =
  | 'all_showroom'
  | 'capsule_containers'
  | 'highrise_projects'
  | 'properties_plots_villas'
  | 'upvc_construction';

interface BrokenImageRecord {
  id: string;
  waypointLabel: string;
  brokenUrl: string;
  replacedWithUrl: string;
  timestamp: string;
}

interface CameraWaypoint {
  id: string;
  code: string;
  label: string;
  subLabel: string;
  tourCategory: Exclude<TourDeckCategory, 'all_showroom'>;
  propertyCategory: PropertyCategory;
  divisionTag: string;
  headline: string;
  description: string;
  valuation: string;
  locationBadge: string;
  focalLength: string;
  elevation: string;
  fov: string;
  imageUrl: string;
  secondaryImageUrl: string;
  fallbackUrl: string;
  galleryImages?: string[];
  videoUrl: string;
  motionOrigin: string;
  panX: [string, string];
  panY: [string, string];
  scaleRange: [number, number];
  order: number;
  specs: {
    id: string;
    title: string;
    spec: string;
  }[];
}

const MODULAR_CAPSULE_GALLERY = {
  fallbackCapsule1: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=85',
  fallbackCapsule2: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85'
};

const ISLAMABAD_HIGHRISE_PROJECTS_GALLERY = {
  centaurusTower: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
  gigaMallTower: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1600&q=85',
  ufoneJinnahAvenue: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=85',
  skyparkOneGulberg: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
  stateLifeTower: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1600&q=85',
  fallbackHighrise1: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
  fallbackHighrise2: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85'
};

const CONSTRUCTED_HOUSES_GALLERY = {
  house1_modernFaisalHillsVilla: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
  house2_contemporaryKanalEstate: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
  house3_stoneGlassMansion: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85'
};

const UPVC_AND_INTERIOR_GALLERY = {
  upvc1_slidingPatioDoors: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
  upvc2_casementTiltTurnWindows: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85'
};

const SHOWROOM_VIDEOS = {
  architecturalFlyover: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  capsuleInteriorWalk: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  villaDroneOrbit: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
};

const INITIAL_REPLACED_BROKEN_LINKS: BrokenImageRecord[] = [
  {
    id: 'rep-1',
    waypointLabel: 'The Centaurus & Citadel 7 Highrise',
    brokenUrl: 'legacy-highrise-asset-1',
    replacedWithUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.centaurusTower,
    timestamp: 'Verified High-Resolution Media'
  },
  {
    id: 'rep-2',
    waypointLabel: 'Giga Mall & Goldcrest Highlife',
    brokenUrl: 'legacy-highrise-asset-2',
    replacedWithUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.gigaMallTower,
    timestamp: 'Verified High-Resolution Media'
  },
  {
    id: 'rep-3',
    waypointLabel: 'Ufone, ISE & Saudi Pak Towers',
    brokenUrl: 'legacy-highrise-asset-3',
    replacedWithUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.ufoneJinnahAvenue,
    timestamp: 'Verified High-Resolution Media'
  },
  {
    id: 'rep-4',
    waypointLabel: 'One Constitution Ave & Skypark One',
    brokenUrl: 'legacy-highrise-asset-4',
    replacedWithUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.skyparkOneGulberg,
    timestamp: 'Verified High-Resolution Media'
  },
  {
    id: 'rep-5',
    waypointLabel: 'State Life & Green Trust Towers',
    brokenUrl: 'legacy-highrise-asset-5',
    replacedWithUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.stateLifeTower,
    timestamp: 'Verified High-Resolution Media'
  }
];

type AtmosphereGrade = 'crystal_daylight' | 'solar_vivid' | 'showroom_hdr';
const WAYPOINT_DURATION_MS = 6500;

/**
 * Helper to determine which Portfolio Deck category a HeroSlide belongs to
 */
function resolveSlideTourCategory(slide: HeroSlide): {
  tourCategory: Exclude<TourDeckCategory, 'all_showroom'>;
  propertyCategory: PropertyCategory;
  divisionTag: string;
  codePrefix: string;
  fallbackImg: string;
  videoUrl: string;
} {
  const sampleCat = slide.samplePropertyData?.category;
  const tagText = `${slide.categoryTag || ''} ${slide.title || ''} ${slide.subtitle || ''}`.toLowerCase();

  if (
    sampleCat === 'modular' ||
    tagText.includes('capsule') ||
    tagText.includes('modular') ||
    tagText.includes('container') ||
    tagText.includes('pod')
  ) {
    return {
      tourCategory: 'capsule_containers',
      propertyCategory: 'modular',
      divisionTag: 'RI8CLICK CONSORTIUM // CONTAINER & SPACE CAPSULE SMART HOUSES',
      codePrefix: 'CAPSULE',
      fallbackImg: MODULAR_CAPSULE_GALLERY.fallbackCapsule1,
      videoUrl: SHOWROOM_VIDEOS.capsuleInteriorWalk
    };
  }

  if (
    tagText.includes('upvc') ||
    tagText.includes('window') ||
    tagText.includes('partition') ||
    tagText.includes('bi-fold') ||
    sampleCat === 'projects'
  ) {
    return {
      tourCategory: 'upvc_construction',
      propertyCategory: 'projects',
      divisionTag: 'RI8CLICK CONSORTIUM // GERMAN UPVC & TURNKEY ENGINEERING',
      codePrefix: 'UPVC',
      fallbackImg: UPVC_AND_INTERIOR_GALLERY.upvc1_slidingPatioDoors,
      videoUrl: SHOWROOM_VIDEOS.villaDroneOrbit
    };
  }

  if (
    sampleCat === 'commercial' ||
    tagText.includes('highrise') ||
    tagText.includes('tower') ||
    tagText.includes('centaurus') ||
    tagText.includes('giga mall') ||
    tagText.includes('plaza') ||
    tagText.includes('commercial')
  ) {
    return {
      tourCategory: 'highrise_projects',
      propertyCategory: 'commercial',
      divisionTag: 'RI8CLICK CONSORTIUM // ISLAMABAD HIGHRISE PROJECTS',
      codePrefix: 'ISB',
      fallbackImg: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.fallbackHighrise1,
      videoUrl: SHOWROOM_VIDEOS.architecturalFlyover
    };
  }

  return {
    tourCategory: 'properties_plots_villas',
    propertyCategory: 'residential',
    divisionTag: 'RI8CLICK CONSORTIUM // VERIFIED PLOTS & LUXURY VILLAS',
    codePrefix: 'PROP',
    fallbackImg: CONSTRUCTED_HOUSES_GALLERY.house1_modernFaisalHillsVilla,
    videoUrl: SHOWROOM_VIDEOS.villaDroneOrbit
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectCategoryFilter,
  onExploreClick,
  onContactAgentClick,
  onOpen3DTour,
  slides = [],
  properties = []
}) => {
  const [tourCategory, setTourCategory] = useState<TourDeckCategory>('all_showroom');
  const [waypointIdx, setWaypointIdx] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isVideoTourActive, setIsVideoTourActive] = useState<boolean>(false);
  const [isCinemaTheaterMode, setIsCinemaTheaterMode] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [atmosphere, setAtmosphere] = useState<AtmosphereGrade>('crystal_daylight');

  const [showLeftDescription, setShowLeftDescription] = useState<boolean>(false);
  const [showDirectorDeck, setShowDirectorDeck] = useState<boolean>(true);
  const [showSpecCards, setShowSpecCards] = useState<boolean>(true);
  const [showConsortiumRibbon, setShowConsortiumRibbon] = useState<boolean>(false);
  const [showCategoryBar, setShowCategoryBar] = useState<boolean>(true);
  const [showShowroomTourBar, setShowShowroomTourBar] = useState<boolean>(true);
  const [isHudMenuOpen, setIsHudMenuOpen] = useState<boolean>(false);
  const [showBrokenLinkModal, setShowBrokenLinkModal] = useState<boolean>(false);

  const [brokenLinksLog, setBrokenLinksLog] = useState<BrokenImageRecord[]>(
    INITIAL_REPLACED_BROKEN_LINKS
  );

  const [isDeckFloating, setIsDeckFloating] = useState<boolean>(true);
  const [isDeckMinimized, setIsDeckMinimized] = useState<boolean>(false);
  const [deckResetKey, setDeckResetKey] = useState<number>(0);
  const portfolioDeckDragControls = useDragControls();
  const heroStageRef = useRef<HTMLElement | null>(null);

  const [videoFailed, setVideoFailed] = useState<boolean>(false);
  const [failedUrls, setFailedUrls] = useState<Record<string, boolean>>({});
  const [customActiveImageOverride, setCustomActiveImageOverride] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const sanitizeConsortiumText = (text: string) =>
    (text || '')
      .replace(/Commercial Plazas/gi, 'Highrise Projects')
      .replace(
        /Ri8Click Real Estate Consortium Group|Ri8Click Consortium Group|Ri8Click Consortium/gi,
        'Ri8click Consortium'
      );

  /**
   * 100% ADMIN-DRIVEN PORTFOLIO DECK WAYPOINTS:
   * Built directly from active `slides` sorted by `slide.order`.
   * When an admin deletes "Model Q3 Forest Cabin Pod", hides a slide, or changes
   * slide sequence in AdminBannerManager, the Portfolio Deck reflects it immediately.
   */
  const allCombinedWaypoints = useMemo<CameraWaypoint[]>(() => {
    const sourceSlides = Array.isArray(slides) && slides.length > 0 ? slides : INITIAL_HERO_SLIDES;
    const activeSlides = [...sourceSlides]
      .filter(s => s && s.isActive !== false)
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

    const slideWaypoints: CameraWaypoint[] = activeSlides.map((slide, idx) => {
      const meta = resolveSlideTourCategory(slide);
      const slideGallery =
        Array.isArray(slide.galleryImages) && slide.galleryImages.length > 0
          ? slide.galleryImages.filter(Boolean)
          : [slide.imageUrl].filter(Boolean);

      const primaryImg = slideGallery[0] || slide.imageUrl || meta.fallbackImg;
      const secondaryImg = slideGallery[1] || primaryImg;
      const cleanTitle = sanitizeConsortiumText(slide.title);
      const shortLabel = cleanTitle.includes('—')
        ? cleanTitle.split('—')[0].trim().slice(0, 32)
        : cleanTitle.slice(0, 32);

      const panPresets: [string, string][] = [
        ['0%', '-1.2%'],
        ['-1.0%', '0.8%'],
        ['0.8%', '-0.8%'],
        ['-0.6%', '0.6%']
      ];
      const panPair = panPresets[idx % panPresets.length];

      const featuresList =
        Array.isArray(slide.features) && slide.features.length > 0
          ? slide.features
          : [
              '100% Verified Ri8click Consortium Inventory',
              'German UPVC Thermal & Acoustic Glazing',
              'Direct Transfer & Turnkey Delivery'
            ];

      return {
        id: slide.id,
        code: `${meta.codePrefix} ${String(idx + 1).padStart(2, '0')} //`,
        label: shortLabel,
        subLabel: sanitizeConsortiumText(slide.subtitle || slide.society || 'Ri8click Verified Showcase'),
        tourCategory: meta.tourCategory,
        propertyCategory: meta.propertyCategory,
        divisionTag: meta.divisionTag,
        headline: cleanTitle,
        description: sanitizeConsortiumText(slide.description || ''),
        valuation: slide.price || 'PKR 85 Lakh',
        locationBadge: `${slide.society || 'Faisal Hills'} • ${slide.location || 'Taxila & Islamabad'}`,
        focalLength: '24MM ARCHITECTURAL',
        elevation: `${slide.tourRoomsCount || 4} ROOMS / ANGLES`,
        fov: '88° WIDE',
        imageUrl: primaryImg,
        secondaryImageUrl: secondaryImg,
        fallbackUrl: meta.fallbackImg,
        galleryImages: slideGallery.length > 0 ? slideGallery : [primaryImg],
        videoUrl: meta.videoUrl,
        motionOrigin: 'center center',
        panX: panPair,
        panY: ['0%', '-0.8%'],
        scaleRange: [1.01, 1.05],
        order: slide.order ?? idx + 1,
        specs: featuresList.slice(0, 4).map((feat, fIdx) => ({
          id: `${slide.id}-spec-${fIdx}`,
          title: fIdx === 0 ? 'Key Highlight' : fIdx === 1 ? 'Engineering' : fIdx === 2 ? 'Advantage' : 'Verification',
          spec: sanitizeConsortiumText(feat)
        }))
      };
    });

    // Also include newly posted active modular/capsule properties from Admin/Agents if not already in slides
    const existingTitles = new Set(slideWaypoints.map(w => w.headline.toLowerCase()));
    const customModularProps = (properties || []).filter(
      p =>
        p &&
        p.status !== 'pending' &&
        (p.category === 'modular' || (p.type && p.type.toLowerCase().includes('capsule'))) &&
        p.images &&
        p.images.length > 0 &&
        !existingTitles.has(p.title.toLowerCase()) &&
        !['prop-mod-1', 'prop-mod-2', 'prop-mod-3'].includes(p.id)
    );

    const propertyWaypoints: CameraWaypoint[] = customModularProps.map((prop, pIdx) => {
      const primaryImg = prop.images[0] || MODULAR_CAPSULE_GALLERY.fallbackCapsule1;
      const secondaryImg = prop.images[1] || primaryImg;
      return {
        id: `prop-wp-${prop.id}`,
        code: `NEW POST ${pIdx + 1} //`,
        label: prop.title.slice(0, 28),
        subLabel: prop.tagline || `${prop.location.society}, ${prop.location.city}`,
        tourCategory: 'capsule_containers',
        propertyCategory: 'modular',
        divisionTag: 'RI8CLICK CONSORTIUM // LIVE POSTED CAPSULE & MODULAR',
        headline: prop.title,
        description: prop.description,
        valuation: prop.priceFormatted,
        locationBadge: `${prop.location.society}, ${prop.location.city}`,
        focalLength: '24MM PRIME',
        elevation: `${prop.area} ${prop.areaUnit}`,
        fov: '86° WIDE',
        imageUrl: primaryImg,
        secondaryImageUrl: secondaryImg,
        fallbackUrl: MODULAR_CAPSULE_GALLERY.fallbackCapsule1,
        galleryImages: prop.images,
        videoUrl: prop.virtualTourVideoUrl || SHOWROOM_VIDEOS.capsuleInteriorWalk,
        motionOrigin: 'center center',
        panX: ['0%', '-1.0%'],
        panY: ['0%', '-0.8%'],
        scaleRange: [1.01, 1.05],
        order: 1000 + pIdx,
        specs: (prop.features || []).slice(0, 4).map((f, fIdx) => ({
          id: `${prop.id}-sp-${fIdx}`,
          title: `Feature ${fIdx + 1}`,
          spec: f
        }))
      };
    });

    const combined = [...slideWaypoints, ...propertyWaypoints];
    if (combined.length > 0) {
      return combined;
    }

    return [
      {
        id: 'fallback-wp-1',
        code: 'SHOWROOM 01 //',
        label: 'Faisal Hills Designer Villa',
        subLabel: '1-Kanal Luxury Residence • Taxila & Islamabad',
        tourCategory: 'properties_plots_villas',
        propertyCategory: 'residential',
        divisionTag: 'RI8CLICK CONSORTIUM // VERIFIED PROPERTIES',
        headline: 'Modern 1-Kanal Designer Villa in Faisal Hills',
        description: 'Verified luxury residential and commercial inventory across Taxila, Faisal Hills, and Islamabad.',
        valuation: 'PKR 6.85 Crore',
        locationBadge: 'Faisal Hills, Taxila / Islamabad',
        focalLength: '24MM PRIME',
        elevation: '1 KANAL',
        fov: '88° WIDE',
        imageUrl: CONSTRUCTED_HOUSES_GALLERY.house1_modernFaisalHillsVilla,
        secondaryImageUrl: CONSTRUCTED_HOUSES_GALLERY.house2_contemporaryKanalEstate,
        fallbackUrl: CONSTRUCTED_HOUSES_GALLERY.house3_stoneGlassMansion,
        galleryImages: [CONSTRUCTED_HOUSES_GALLERY.house1_modernFaisalHillsVilla],
        videoUrl: SHOWROOM_VIDEOS.villaDroneOrbit,
        motionOrigin: 'center center',
        panX: ['0%', '-1%'],
        panY: ['0%', '-0.8%'],
        scaleRange: [1.01, 1.05],
        order: 1,
        specs: [
          { id: 'fb-1', title: 'Highlight', spec: '100% Verified Ri8click Listing' }
        ]
      }
    ];
  }, [slides, properties]);

  const cameraWaypoints = useMemo<CameraWaypoint[]>(() => {
    if (tourCategory === 'all_showroom') {
      return allCombinedWaypoints;
    }
    const filtered = allCombinedWaypoints.filter(w => w.tourCategory === tourCategory);
    return filtered.length > 0 ? filtered : allCombinedWaypoints;
  }, [allCombinedWaypoints, tourCategory]);

  const safeIdx = waypointIdx < cameraWaypoints.length ? waypointIdx : 0;
  const activeWaypoint = cameraWaypoints[safeIdx] || allCombinedWaypoints[0];

  const resolveImageWithFallback = (wp: CameraWaypoint): string => {
    if (customActiveImageOverride && !failedUrls[customActiveImageOverride]) {
      return customActiveImageOverride;
    }
    if (!failedUrls[wp.imageUrl]) return wp.imageUrl;
    if (!failedUrls[wp.secondaryImageUrl]) return wp.secondaryImageUrl;
    if (!failedUrls[wp.fallbackUrl]) return wp.fallbackUrl;
    return ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.fallbackHighrise1;
  };

  const resolvedImageUrl = resolveImageWithFallback(activeWaypoint);

  const handleImageError = (brokenUrl: string, wpLabel: string) => {
    setFailedUrls(prev => {
      if (prev[brokenUrl]) return prev;
      return { ...prev, [brokenUrl]: true };
    });

    setBrokenLinksLog(prev => {
      if (prev.some(item => item.brokenUrl === brokenUrl)) return prev;
      const replacement =
        brokenUrl === activeWaypoint.imageUrl
          ? activeWaypoint.secondaryImageUrl
          : activeWaypoint.fallbackUrl;
      return [
        {
          id: `auto-rep-${Date.now()}`,
          waypointLabel: wpLabel,
          brokenUrl,
          replacedWithUrl: replacement,
          timestamp: 'Auto-Replaced Live'
        },
        ...prev
      ];
    });
  };

  useEffect(() => {
    setCustomActiveImageOverride(null);
    setVideoFailed(false);
  }, [safeIdx, tourCategory]);

  useEffect(() => {
    if (cameraWaypoints.length <= 1) return;
    const next1 = cameraWaypoints[(safeIdx + 1) % cameraWaypoints.length];
    const next2 = cameraWaypoints[(safeIdx + 2) % cameraWaypoints.length];
    [next1, next2].forEach(wp => {
      if (wp?.imageUrl) {
        const img = new Image();
        img.src = wp.imageUrl;
      }
    });
  }, [safeIdx, cameraWaypoints]);

  useEffect(() => {
    setWaypointIdx(0);
  }, [tourCategory]);

  useEffect(() => {
    if (isPaused || isVideoTourActive || cameraWaypoints.length <= 1) return;
    const timer = setInterval(() => {
      setWaypointIdx(prev => (prev + 1) % cameraWaypoints.length);
    }, WAYPOINT_DURATION_MS);
    return () => clearInterval(timer);
  }, [isPaused, isVideoTourActive, cameraWaypoints.length]);

  useEffect(() => {
    if (isVideoTourActive && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        setVideoFailed(true);
      });
    }
  }, [isVideoTourActive, activeWaypoint.videoUrl]);

  const handlePrev = () => {
    setIsVideoTourActive(false);
    setWaypointIdx(prev => (prev - 1 + cameraWaypoints.length) % cameraWaypoints.length);
  };

  const handleNext = () => {
    setIsVideoTourActive(false);
    setWaypointIdx(prev => (prev + 1) % cameraWaypoints.length);
  };

  const handleResetDeckPosition = () => {
    setIsDeckFloating(true);
    setIsDeckMinimized(false);
    setDeckResetKey(prev => prev + 1);
  };

  const tourCategories: {
    id: TourDeckCategory;
    label: string;
    shortLabel: string;
    filterCategory: PropertyCategory;
    icon: React.ReactNode;
    count: number;
  }[] = [
    {
      id: 'all_showroom',
      label: 'Ri8click Consortium Portfolio',
      shortLabel: 'All Portfolio',
      filterCategory: 'all',
      icon: <Compass className="w-3.5 h-3.5" />,
      count: allCombinedWaypoints.length
    },
    {
      id: 'capsule_containers',
      label: 'Container & Capsule Houses',
      shortLabel: 'Capsule Pods',
      filterCategory: 'modular',
      icon: <Box className="w-3.5 h-3.5" />,
      count: allCombinedWaypoints.filter(w => w.tourCategory === 'capsule_containers').length
    },
    {
      id: 'highrise_projects',
      label: 'Highrise Projects (Islamabad)',
      shortLabel: 'Highrise Projects',
      filterCategory: 'commercial',
      icon: <Building2 className="w-3.5 h-3.5" />,
      count: allCombinedWaypoints.filter(w => w.tourCategory === 'highrise_projects').length
    },
    {
      id: 'properties_plots_villas',
      label: 'Properties (Plots & Houses)',
      shortLabel: 'Plots & Villas',
      filterCategory: 'residential',
      icon: <Home className="w-3.5 h-3.5" />,
      count: allCombinedWaypoints.filter(w => w.tourCategory === 'properties_plots_villas').length
    },
    {
      id: 'upvc_construction',
      label: 'Ri8click Consortium & UPVC',
      shortLabel: 'UPVC & Doors',
      filterCategory: 'projects',
      icon: <Wrench className="w-3.5 h-3.5" />,
      count: allCombinedWaypoints.filter(w => w.tourCategory === 'upvc_construction').length
    }
  ];

  const consortiumPillars = [
    {
      id: 'capsule_containers' as TourDeckCategory,
      category: 'modular' as PropertyCategory,
      title: 'Container & Space Capsule Houses',
      detail: 'Q3 Cabin • L-Loft • V2124 Duplex • Hex Pod',
      icon: <Box className="w-4 h-4 text-amber-300" />
    },
    {
      id: 'highrise_projects' as TourDeckCategory,
      category: 'commercial' as PropertyCategory,
      title: 'Islamabad Highrise Projects',
      detail: 'Centaurus • Giga Mall • Citadel 7 • Ufone • ISE',
      icon: <Building2 className="w-4 h-4 text-sky-300" />
    },
    {
      id: 'properties_plots_villas' as TourDeckCategory,
      category: 'residential' as PropertyCategory,
      title: 'Properties: Plots & Constructed Villas',
      detail: '5M, 10M, 1–2 Kanal Plots & Luxury Houses',
      icon: <Home className="w-4 h-4 text-emerald-300" />
    },
    {
      id: 'upvc_construction' as TourDeckCategory,
      category: 'projects' as PropertyCategory,
      title: 'German UPVC Doors, Windows & Interior',
      detail: 'Sliding Patio, Tilt-Turn & Acoustic Partitions',
      icon: <Layers className="w-4 h-4 text-purple-300" />
    }
  ];

  const atmosphereStyle = useMemo<React.CSSProperties>(() => {
    switch (atmosphere) {
      case 'solar_vivid':
        return { filter: 'brightness(1.06) contrast(1.08) saturate(1.18)' };
      case 'showroom_hdr':
        return { filter: 'brightness(1.03) contrast(1.14) saturate(1.10)' };
      case 'crystal_daylight':
      default:
        return { filter: 'brightness(1.04) contrast(1.06) saturate(1.06)' };
    }
  }, [atmosphere]);

  const ToggleSwitch = ({
    label,
    description,
    checked,
    onChange
  }: {
    label: string;
    description?: string;
    checked: boolean;
    onChange: () => void;
  }) => (
    <button
      type="button"
      onClick={onChange}
      className="w-full flex items-center justify-between gap-3 py-2 px-2.5 rounded-lg hover:bg-white/10 transition-colors text-left cursor-pointer"
    >
      <div>
        <div className="text-xs font-semibold text-white">{label}</div>
        {description && <div className="text-[10px] text-slate-300">{description}</div>}
      </div>
      <div
        className={`w-9 h-5 rounded-full transition-colors p-0.5 flex items-center shrink-0 ${
          checked ? 'bg-amber-400 justify-end' : 'bg-slate-700 justify-start'
        }`}
      >
        <div className="w-4 h-4 rounded-full bg-slate-950 shadow-xs" />
      </div>
    </button>
  );

  return (
    <section
      ref={heroStageRef}
      className="relative min-h-[680px] lg:min-h-[790px] flex flex-col justify-between overflow-hidden bg-slate-900 text-white select-none"
    >
      {/* 1. FULL-BLEED BACKGROUND STAGE */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
        <AnimatePresence mode="sync">
          {isVideoTourActive && !videoFailed ? (
            <motion.div
              key={`video-stream-${activeWaypoint.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full"
            >
              <video
                ref={videoRef}
                src={activeWaypoint.videoUrl}
                poster={resolvedImageUrl}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                onError={() => setVideoFailed(true)}
                style={atmosphereStyle}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          ) : (
            <motion.div
              key={`${activeWaypoint.id}-${resolvedImageUrl}`}
              initial={{
                opacity: 0,
                scale: activeWaypoint.scaleRange[0],
                x: activeWaypoint.panX[0],
                y: activeWaypoint.panY[0]
              }}
              animate={{
                opacity: 1,
                scale: isPaused ? activeWaypoint.scaleRange[0] : activeWaypoint.scaleRange[1],
                x: isPaused ? '0%' : activeWaypoint.panX[1],
                y: isPaused ? '0%' : activeWaypoint.panY[1]
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.65, ease: 'easeOut' },
                scale: { duration: WAYPOINT_DURATION_MS / 1000 + 1.0, ease: 'linear' },
                x: { duration: WAYPOINT_DURATION_MS / 1000 + 1.0, ease: 'linear' },
                y: { duration: WAYPOINT_DURATION_MS / 1000 + 1.0, ease: 'linear' }
              }}
              style={{ transformOrigin: activeWaypoint.motionOrigin }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={resolvedImageUrl}
                alt={`${activeWaypoint.headline} - ${activeWaypoint.label}`}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                onError={() => handleImageError(resolvedImageUrl, activeWaypoint.label)}
                style={{
                  ...atmosphereStyle,
                  imageRendering: 'high-quality' as any
                }}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle Scrim */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isCinemaTheaterMode || !showLeftDescription
              ? 'bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20'
              : 'bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20" />
      </div>

      {/* 2. OPTIONAL CATEGORY BAR */}
      <AnimatePresence>
        {showCategoryBar && !isCinemaTheaterMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative z-30 border-b border-white/15 bg-slate-950/70 backdrop-blur-md"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5">
                {tourCategories.map(cat => {
                  const isSelected = tourCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setTourCategory(cat.id);
                        onSelectCategoryFilter(cat.filterCategory);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer border ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                          : 'bg-white/5 text-white border-white/15 hover:bg-white/15'
                      }`}
                    >
                      {cat.icon}
                      <span className="hidden xl:inline">{cat.label}</span>
                      <span className="xl:hidden">{cat.shortLabel}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                          isSelected ? 'bg-slate-950 text-amber-300' : 'bg-white/15 text-white'
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setShowCategoryBar(false)}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-semibold text-slate-200 flex items-center gap-1 shrink-0 cursor-pointer"
                title="Hide Category Bar"
              >
                <span>Hide Bar</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. OPTIONAL CAMERA WAYPOINTS BAR */}
      <AnimatePresence>
        {showShowroomTourBar && !isCinemaTheaterMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative z-20 border-b border-white/15 bg-slate-900/70 backdrop-blur-md"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 px-2 py-0.5 rounded bg-amber-500/15 border border-amber-400/30 flex items-center gap-1 shrink-0">
                  <Camera className="w-3 h-3" />
                  <span>Camera Angles ({cameraWaypoints.length})</span>
                </span>
                {cameraWaypoints.map((wp, idx) => {
                  const isSelected = safeIdx === idx;
                  return (
                    <button
                      key={wp.id}
                      type="button"
                      onClick={() => {
                        setIsVideoTourActive(false);
                        setWaypointIdx(idx);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer border ${
                        isSelected
                          ? 'bg-white text-slate-950 border-white shadow-xs'
                          : 'bg-white/5 text-slate-200 border-white/10 hover:bg-white/15 hover:text-white'
                      }`}
                    >
                      {idx + 1}. {wp.label}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setShowShowroomTourBar(false)}
                className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-semibold text-slate-200 flex items-center gap-1 shrink-0 cursor-pointer"
                title="Hide Camera Waypoints Bar"
              >
                <span>Hide</span>
                <ChevronUp className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. MAIN FOREGROUND STAGE & MOVEABLE CRYSTAL PORTFOLIO DECK */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6 min-h-[540px] lg:min-h-[610px] flex flex-col justify-between w-full">
        {/* Top Utility Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/60 backdrop-blur-xl border border-white/20">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">
                Ri8click Consortium — Contemporary Capsule Homes, Highrises &amp; German UPVC
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowBrokenLinkModal(prev => !prev)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 hover:bg-emerald-900/80 backdrop-blur-xl border border-emerald-400/40 text-emerald-200 text-[10.5px] font-bold transition-colors cursor-pointer"
              title="View Verified Media Log"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Media Verified ({brokenLinksLog.length})</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={() => {
                setShowLeftDescription(prev => !prev);
                if (!showDirectorDeck) setShowDirectorDeck(true);
              }}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 border transition-all cursor-pointer backdrop-blur-xl ${
                !showLeftDescription
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                  : 'bg-white/10 text-white border-white/25 hover:bg-white/20'
              }`}
            >
              {showLeftDescription ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Hide Text</span>
                </>
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5" />
                  <span>Show Full Text</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsVideoTourActive(prev => !prev)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 border transition-all cursor-pointer backdrop-blur-xl ${
                isVideoTourActive
                  ? 'bg-amber-400 text-slate-950 border-amber-300'
                  : 'bg-white/10 text-slate-100 border-white/20 hover:bg-white/20'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>{isVideoTourActive ? 'Video: ON' : 'Video Walkthrough'}</span>
            </button>

            {isVideoTourActive && (
              <button
                type="button"
                onClick={() => setIsMuted(prev => !prev)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white transition-colors cursor-pointer"
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                )}
              </button>
            )}

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsHudMenuOpen(prev => !prev)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-xl ${
                  isHudMenuOpen
                    ? 'bg-amber-400 text-slate-950 border-amber-300'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">View Controls</span>
              </button>

              <AnimatePresence>
                {isHudMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-white/20 shadow-2xl p-3.5 z-50 space-y-2"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-white/15">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                        Banner &amp; Deck Settings
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsHudMenuOpen(false)}
                        className="text-[10px] text-slate-300 hover:text-white cursor-pointer"
                      >
                        Done
                      </button>
                    </div>

                    <div className="py-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Daylight Grade
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(
                          [
                            { id: 'crystal_daylight', label: 'Natural' },
                            { id: 'solar_vivid', label: 'Vivid' },
                            { id: 'showroom_hdr', label: 'Crisp HDR' }
                          ] as { id: AtmosphereGrade; label: string }[]
                        ).map(grade => (
                          <button
                            key={grade.id}
                            type="button"
                            onClick={() => setAtmosphere(grade.id)}
                            className={`px-2 py-1.5 rounded-lg text-[10px] font-bold text-center border transition-all cursor-pointer ${
                              atmosphere === grade.id
                                ? 'bg-amber-400 text-slate-950 border-amber-300 font-black'
                                : 'bg-white/10 text-slate-200 border-white/15 hover:bg-white/20'
                            }`}
                          >
                            {grade.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/15 pt-1.5 space-y-1">
                      <ToggleSwitch
                        label="Full Left-Side Narrative"
                        description="Switch between full narrative and minimal banner heading"
                        checked={showLeftDescription}
                        onChange={() => setShowLeftDescription(prev => !prev)}
                      />
                      <ToggleSwitch
                        label="Portfolio Deck Window"
                        description="Show right-hand interactive camera deck"
                        checked={showDirectorDeck}
                        onChange={() => setShowDirectorDeck(prev => !prev)}
                      />
                      <ToggleSwitch
                        label="Spec Cards"
                        description="Show 4 architectural specification badges"
                        checked={showSpecCards}
                        onChange={() => setShowSpecCards(prev => !prev)}
                      />
                      <ToggleSwitch
                        label="Consortium Pillars Ribbon"
                        description="Show 4-division quick selector ribbon"
                        checked={showConsortiumRibbon}
                        onChange={() => setShowConsortiumRibbon(prev => !prev)}
                      />
                      <ToggleSwitch
                        label="Top Category Bar"
                        description="Show top portfolio category bar"
                        checked={showCategoryBar}
                        onChange={() => setShowCategoryBar(prev => !prev)}
                      />
                      <ToggleSwitch
                        label="Camera Waypoints Bar"
                        description="Show numbered camera angle strip"
                        checked={showShowroomTourBar}
                        onChange={() => setShowShowroomTourBar(prev => !prev)}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => setIsCinemaTheaterMode(prev => !prev)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-xl ${
                isCinemaTheaterMode
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }`}
            >
              {isCinemaTheaterMode ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Standard View</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Clean View</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* BROKEN IMAGE LINK REPLACEMENT INSPECTOR MODAL */}
        <AnimatePresence>
          {showBrokenLinkModal && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-3 rounded-2xl bg-slate-950/90 backdrop-blur-2xl border border-emerald-400/30 p-3.5 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/15">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-white">
                    Media Auto-Healer &amp; Active Verification Log
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBrokenLinkModal(false)}
                  className="text-xs text-slate-300 hover:text-white px-2 py-0.5 rounded bg-white/10 cursor-pointer"
                >
                  Close
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1">
                {brokenLinksLog.map(item => (
                  <div
                    key={item.id}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-[11px] flex items-start justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <div className="font-bold text-emerald-300 truncate">{item.waypointLabel}</div>
                      <div className="text-[10px] text-slate-400 truncate line-through">
                        {item.brokenUrl}
                      </div>
                      <div className="text-[10px] text-slate-200 truncate">
                        Active: {item.replacedWithUrl}
                      </div>
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold shrink-0">
                      LIVE
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* OPTIONAL RI8CLICK CONSORTIUM PILLARS RIBBON */}
        <AnimatePresence>
          {showConsortiumRibbon && !isCinemaTheaterMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mb-3"
            >
              <div className="rounded-2xl bg-slate-950/65 backdrop-blur-xl border border-white/20 p-2.5">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 px-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                    Ri8click Consortium — Integrated Real Estate, Capsule Smart Homes, Islamabad Highrises &amp; German UPVC
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowConsortiumRibbon(false)}
                    className="text-[10px] text-slate-300 hover:text-white cursor-pointer"
                  >
                    Hide Pillars
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {consortiumPillars.map(pillar => {
                    const isActivePillar = tourCategory === pillar.id;
                    return (
                      <button
                        key={pillar.id}
                        type="button"
                        onClick={() => {
                          setTourCategory(pillar.id);
                          onSelectCategoryFilter(pillar.category);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2.5 cursor-pointer ${
                          isActivePillar
                            ? 'bg-amber-400/20 border-amber-300 text-white'
                            : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/15'
                        }`}
                      >
                        <div className="p-2 rounded-lg bg-slate-900/80 border border-white/10 shrink-0">
                          {pillar.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-extrabold text-white truncate">
                            {pillar.title}
                          </div>
                          <div className="text-[10px] text-slate-300 truncate">{pillar.detail}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CENTER MAIN CONTENT & MOVABLE CRYSTAL TRANSPARENT PORTFOLIO DECK */}
        <AnimatePresence mode="wait">
          {!isCinemaTheaterMode ? (
            <motion.div
              key="foreground-content"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end my-auto py-2"
            >
              {showLeftDescription ? (
                <div className={showDirectorDeck ? 'lg:col-span-7' : 'lg:col-span-11'}>
                  <motion.div
                    key={activeWaypoint.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35 }}
                    className="p-5 sm:p-6 rounded-3xl bg-slate-950/55 backdrop-blur-md border border-white/20 shadow-2xl space-y-4"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-extrabold uppercase tracking-wider shadow-xs">
                        <Sparkles className="w-3 h-3" />
                        <span>{activeWaypoint.divisionTag}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-white/20 text-white text-xs font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{activeWaypoint.locationBadge}</span>
                      </span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-black tracking-tight leading-[1.12] text-white font-serif drop-shadow-sm">
                      {activeWaypoint.headline}
                    </h1>

                    <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
                      {activeWaypoint.description}
                    </p>

                    {showSpecCards && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {activeWaypoint.specs.map(item => (
                          <div
                            key={item.id}
                            className="p-2.5 rounded-xl bg-slate-900/65 border border-white/15 flex items-start gap-2.5"
                          >
                            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <div>
                              <div className="text-xs font-bold text-white">{item.title}</div>
                              <div className="text-[11px] text-slate-200 leading-snug">
                                {item.spec}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-400/40">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                          Valuation:
                        </span>
                        <span className="text-xs sm:text-sm font-black text-white">
                          {activeWaypoint.valuation}
                        </span>
                      </div>

                      {activeWaypoint.galleryImages && activeWaypoint.galleryImages.length > 1 && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 mr-1">
                            Angles:
                          </span>
                          {activeWaypoint.galleryImages.map((imgUrl, gIdx) => {
                            const isImgFailed = failedUrls[imgUrl];
                            if (isImgFailed) return null;
                            const isCurrentAngle = resolvedImageUrl === imgUrl;
                            return (
                              <button
                                key={gIdx}
                                type="button"
                                onClick={() => {
                                  setIsVideoTourActive(false);
                                  setCustomActiveImageOverride(imgUrl);
                                }}
                                className={`w-10 h-7 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                                  isCurrentAngle
                                    ? 'border-amber-400 scale-105 shadow-md'
                                    : 'border-white/25 opacity-75 hover:opacity-100'
                                }`}
                                title={`Switch to Angle ${gIdx + 1}`}
                              >
                                <img
                                  src={imgUrl}
                                  alt={`Angle ${gIdx + 1}`}
                                  onError={() => handleImageError(imgUrl, activeWaypoint.label)}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 pt-1">
                      <button
                        type="button"
                        onClick={() =>
                          onOpen3DTour({
                            id: activeWaypoint.id,
                            title: activeWaypoint.headline,
                            category: activeWaypoint.propertyCategory,
                            priceFormatted: activeWaypoint.valuation,
                            location: {
                              city: 'Islamabad / Taxila',
                              society: activeWaypoint.locationBadge,
                              province: 'Islamabad Capital Territory'
                            },
                            images: activeWaypoint.galleryImages || [resolvedImageUrl],
                            virtualTourVideoUrl: activeWaypoint.videoUrl,
                            virtualTourVideoTitle: `${activeWaypoint.headline} - Ri8click Consortium Walkthrough`
                          })
                        }
                        className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                      >
                        <Compass className="w-4 h-4" />
                        <span>Launch 360° Virtual Walkthrough</span>
                      </button>

                      <button
                        type="button"
                        onClick={onExploreClick}
                        className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/25 transition-all cursor-pointer"
                      >
                        Explore Portfolio &amp; Listings
                      </button>

                      <button
                        type="button"
                        onClick={onContactAgentClick}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm border border-emerald-400/40 transition-all cursor-pointer"
                      >
                        Ri8click Consortium Inquiry
                      </button>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className={showDirectorDeck ? 'lg:col-span-7' : 'lg:col-span-12'}>
                  <motion.div
                    key={`compact-${activeWaypoint.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex flex-col gap-2 p-3.5 sm:p-4 rounded-2xl bg-slate-950/45 backdrop-blur-md border border-white/20 shadow-xl max-w-xl"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[9.5px] font-black uppercase tracking-wider">
                        <Camera className="w-3 h-3" />
                        <span>{activeWaypoint.code}</span>
                      </span>
                      <span className="text-[10.5px] font-extrabold text-emerald-300 bg-slate-950/60 border border-emerald-400/30 px-2 py-0.5 rounded">
                        {activeWaypoint.valuation}
                      </span>
                    </div>

                    <h1 className="text-base sm:text-xl font-black text-white leading-tight font-serif drop-shadow-xs">
                      {activeWaypoint.headline}
                    </h1>

                    <p className="text-[11px] text-slate-200 truncate">
                      {activeWaypoint.subLabel}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/15 text-[10.5px] text-slate-200">
                      <span className="inline-flex items-center gap-1 truncate max-w-[220px] sm:max-w-[260px]">
                        <MapPin className="w-3 h-3 text-amber-300 shrink-0" />
                        <span className="truncate">{activeWaypoint.locationBadge}</span>
                      </span>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => setShowLeftDescription(true)}
                          className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white font-bold text-[10px] border border-white/20 cursor-pointer transition-colors"
                        >
                          Show Text
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onOpen3DTour({
                              id: activeWaypoint.id,
                              title: activeWaypoint.headline,
                              category: activeWaypoint.propertyCategory,
                              priceFormatted: activeWaypoint.valuation,
                              location: {
                                city: 'Islamabad / Taxila',
                                society: activeWaypoint.locationBadge,
                                province: 'Islamabad Capital Territory'
                              },
                              images: activeWaypoint.galleryImages || [resolvedImageUrl],
                              virtualTourVideoUrl: activeWaypoint.videoUrl,
                              virtualTourVideoTitle: `${activeWaypoint.headline} - Ri8click Consortium Walkthrough`
                            })
                          }
                          className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[10px] cursor-pointer transition-colors"
                        >
                          360° Tour
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* BLOCK 3: CRYSTAL TRANSPARENT PORTFOLIO DECK */}
              {showDirectorDeck && (
                <div className={showLeftDescription ? 'lg:col-span-5' : 'lg:col-span-5 ml-auto'}>
                  <motion.div
                    key={`portfolio-deck-${deckResetKey}`}
                    drag={isDeckFloating}
                    dragControls={portfolioDeckDragControls}
                    dragListener={false}
                    dragMomentum={false}
                    dragElastic={0.08}
                    dragConstraints={heroStageRef}
                    whileDrag={{
                      scale: 1.02,
                      boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.75)'
                    }}
                    className="rounded-3xl bg-white/[0.12] backdrop-blur-xl border border-white/30 p-3.5 sm:p-4 shadow-[0_16px_48px_rgba(0,0,0,0.45)] space-y-3"
                  >
                    <div
                      onPointerDown={e => {
                        if (isDeckFloating) {
                          portfolioDeckDragControls.start(e);
                        }
                      }}
                      className={`flex items-center justify-between gap-2 pb-2.5 border-b border-white/20 ${
                        isDeckFloating ? 'cursor-grab active:cursor-grabbing' : ''
                      }`}
                      title="Drag this header bar to move the Portfolio Deck anywhere in the window"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="p-1.5 rounded-lg bg-white/15 border border-white/25 text-amber-300 shrink-0">
                          <GripHorizontal className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-extrabold uppercase tracking-wider text-white flex items-center gap-1.5">
                            <span className="truncate">Portfolio Deck</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 font-mono">
                              {isDeckFloating ? 'Drag Anywhere' : 'Docked'}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-200 truncate">
                            {cameraWaypoints.length} Active Slides • Admin Controlled Sequence
                          </div>
                        </div>
                      </div>

                      <div
                        className="flex items-center gap-1 shrink-0"
                        onPointerDown={e => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={handleResetDeckPosition}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/25 text-slate-200 hover:text-white border border-white/15 transition-all cursor-pointer"
                          title="Reset Window Position"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setShowLeftDescription(prev => !prev)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                            !showLeftDescription
                              ? 'bg-amber-400 text-slate-950 border-amber-300'
                              : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                          }`}
                        >
                          {showLeftDescription ? 'Hide Text' : 'Show Text'}
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsVideoTourActive(prev => !prev)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                            isVideoTourActive
                              ? 'bg-amber-400 text-slate-950 border-amber-300'
                              : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                          }`}
                        >
                          {isVideoTourActive ? 'Photos' : 'Video'}
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsDeckMinimized(prev => !prev)}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/25 text-slate-200 hover:text-white border border-white/15 transition-all cursor-pointer"
                          title={isDeckMinimized ? 'Expand Deck' : 'Minimize Deck'}
                        >
                          {isDeckMinimized ? (
                            <ChevronDown className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronUp className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => setShowDirectorDeck(false)}
                          className="px-2 py-1 rounded-lg bg-white/10 hover:bg-rose-500/30 text-slate-200 hover:text-white border border-white/15 text-[10px] font-semibold cursor-pointer"
                          title="Hide Portfolio Deck"
                        >
                          Hide
                        </button>
                      </div>
                    </div>

                    {!isDeckMinimized && (
                      <>
                        <div className="grid grid-cols-5 gap-1 p-1 rounded-xl bg-slate-950/50 border border-white/20">
                          {(
                            [
                              { id: 'all_showroom', label: 'All' },
                              { id: 'capsule_containers', label: 'Capsules' },
                              { id: 'highrise_projects', label: 'Highrise' },
                              { id: 'properties_plots_villas', label: 'Plots/Villas' },
                              { id: 'upvc_construction', label: 'UPVC' }
                            ] as { id: TourDeckCategory; label: string }[]
                          ).map(tab => {
                            const active = tourCategory === tab.id;
                            return (
                              <button
                                key={tab.id}
                                type="button"
                                onClick={() => setTourCategory(tab.id)}
                                className={`py-1.5 px-1 rounded-lg text-[10px] font-extrabold text-center transition-all truncate cursor-pointer ${
                                  active
                                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                                    : 'text-slate-100 hover:text-white hover:bg-white/15'
                                }`}
                              >
                                {tab.label}
                              </button>
                            );
                          })}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[250px] overflow-y-auto pr-1">
                          {cameraWaypoints.map((wp, idx) => {
                            const isSelected = safeIdx === idx;
                            const thumbUrl = resolveImageWithFallback(wp);
                            return (
                              <button
                                key={wp.id}
                                type="button"
                                onClick={() => {
                                  setIsVideoTourActive(false);
                                  setWaypointIdx(idx);
                                }}
                                className={`group relative rounded-xl overflow-hidden border text-left transition-all cursor-pointer h-20 ${
                                  isSelected
                                    ? 'border-amber-300 ring-2 ring-amber-400/50 scale-[1.01]'
                                    : 'border-white/25 opacity-90 hover:opacity-100 hover:border-white/50'
                                }`}
                              >
                                <img
                                  src={thumbUrl}
                                  alt={wp.label}
                                  loading="lazy"
                                  onError={() => handleImageError(thumbUrl, wp.label)}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                                <div className="absolute top-1.5 left-1.5 right-1.5 flex items-center justify-between">
                                  <span
                                    className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${
                                      isSelected
                                        ? 'bg-amber-400 text-slate-950'
                                        : 'bg-slate-950/75 text-slate-100'
                                    }`}
                                  >
                                    #{idx + 1}
                                  </span>
                                  {isSelected && (
                                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                                  )}
                                </div>
                                <div className="absolute bottom-1.5 left-1.5 right-1.5">
                                  <div className="text-[10.5px] font-bold text-white truncate drop-shadow-xs">
                                    {wp.label}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        <div className="pt-2 border-t border-white/20 flex items-center justify-between gap-2 text-[11px]">
                          <div className="flex items-center gap-1.5 text-slate-100 truncate">
                            <Move className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                            <span className="truncate font-medium">
                              Capsule Pods, Highrises &amp; UPVC
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setTourCategory('capsule_containers');
                                onSelectCategoryFilter('modular');
                              }}
                              className="px-2 py-1 rounded-lg bg-amber-400/25 hover:bg-amber-400/35 text-amber-200 border border-amber-300/40 font-bold text-[10px] transition-colors cursor-pointer"
                            >
                              Capsules
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setTourCategory('upvc_construction');
                                onSelectCategoryFilter('projects');
                              }}
                              className="px-2 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white border border-white/25 font-bold text-[10px] transition-colors cursor-pointer"
                            >
                              UPVC
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="clean-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="mt-auto pt-48 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4"
            >
              <div className="p-4 rounded-2xl bg-slate-950/60 backdrop-blur-xl border border-white/20 max-w-xl">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 mb-1">
                  {activeWaypoint.code} — {activeWaypoint.divisionTag}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white font-serif">
                  {activeWaypoint.headline}
                </h2>
                <p className="text-xs text-slate-200 mt-1">{activeWaypoint.subLabel}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. BOTTOM TIMELINE & PLAYBACK CONTROLS */}
        <div className="pt-3 mt-2 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-auto flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {cameraWaypoints.map((wp, idx) => {
              const isCurrent = safeIdx === idx;
              return (
                <button
                  key={wp.id}
                  type="button"
                  onClick={() => {
                    setIsVideoTourActive(false);
                    setWaypointIdx(idx);
                  }}
                  className="group flex-1 min-w-[42px] max-w-[110px] text-left focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                    <span
                      className={`truncate ${
                        isCurrent ? 'text-amber-300' : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {idx + 1}. {wp.label}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                    {isCurrent ? (
                      <motion.div
                        key={`progress-${wp.id}-${isPaused}`}
                        initial={{ width: '0%' }}
                        animate={{ width: isPaused ? '45%' : '100%' }}
                        transition={{
                          duration: isPaused ? 0.2 : WAYPOINT_DURATION_MS / 1000,
                          ease: 'linear'
                        }}
                        className="h-full bg-amber-400 rounded-full"
                      />
                    ) : (
                      <div
                        className={`h-full rounded-full ${
                          idx < safeIdx ? 'w-full bg-white/50' : 'w-0'
                        }`}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {!showLeftDescription && (
              <button
                type="button"
                onClick={() => setShowLeftDescription(true)}
                className="px-2.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-[11px] font-bold text-white cursor-pointer"
              >
                Show Text
              </button>
            )}
            {!showDirectorDeck && (
              <button
                type="button"
                onClick={() => setShowDirectorDeck(true)}
                className="px-2.5 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-[11px] font-bold text-amber-200 cursor-pointer"
              >
                Show Portfolio Deck
              </button>
            )}
            <button
              type="button"
              onClick={handlePrev}
              className="p-2 rounded-xl bg-slate-950/60 hover:bg-white/20 border border-white/20 text-white transition-colors cursor-pointer"
              title="Previous Angle"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsPaused(prev => !prev)}
              className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-2 rounded-xl bg-slate-950/60 hover:bg-white/20 border border-white/20 text-white transition-colors cursor-pointer"
              title="Next Angle"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

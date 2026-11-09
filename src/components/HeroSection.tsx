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
  RefreshCw,
  GripHorizontal,
  Move,
  RotateCcw,
  Settings
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
  canManageDeck?: boolean;
  onOpenBannerAdmin?: () => void;
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
  videoTitle?: string;
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
  fallbackCapsule1:
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=85',
  fallbackCapsule2:
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85'
};

const ISLAMABAD_HIGHRISE_PROJECTS_GALLERY = {
  centaurusTower:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
  gigaMallTower:
    'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1600&q=85',
  ufoneJinnahAvenue:
    'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=85',
  skyparkOneGulberg:
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
  stateLifeTower:
    'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1600&q=85',
  fallbackHighrise1:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
  fallbackHighrise2:
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85'
};

const CONSTRUCTED_HOUSES_GALLERY = {
  house1_modernFaisalHillsVilla:
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
  house2_contemporaryKanalEstate:
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
  house3_stoneGlassMansion:
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85'
};

const UPVC_AND_INTERIOR_GALLERY = {
  upvc1_slidingPatioDoors:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
  upvc2_casementTiltTurnWindows:
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85'
};

const SHOWROOM_VIDEOS = {
  architecturalFlyover:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  capsuleInteriorWalk:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  villaDroneOrbit:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
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
  }
];

type AtmosphereGrade = 'crystal_daylight' | 'solar_vivid' | 'showroom_hdr';
const WAYPOINT_DURATION_MS = 6500;

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
      divisionTag:
        'RI8CLICK CONSORTIUM // CONTAINER & SPACE CAPSULE SMART HOUSES',
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
  properties = [],
  canManageDeck = false,
  onOpenBannerAdmin
}) => {
  const [tourCategory, setTourCategory] =
    useState<TourDeckCategory>('all_showroom');
  const [waypointIdx, setWaypointIdx] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isVideoTourActive, setIsVideoTourActive] = useState<boolean>(false);
  const [isCinemaTheaterMode, setIsCinemaTheaterMode] =
    useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [atmosphere, setAtmosphere] =
    useState<AtmosphereGrade>('solar_vivid');

  const [showLeftDescription, setShowLeftDescription] =
    useState<boolean>(false);
  const [showDirectorDeck, setShowDirectorDeck] = useState<boolean>(true);
  const [showSpecCards, setShowSpecCards] = useState<boolean>(true);
  const [showConsortiumRibbon, setShowConsortiumRibbon] =
    useState<boolean>(false);
  const [showCategoryBar, setShowCategoryBar] = useState<boolean>(true);
  const [showShowroomTourBar, setShowShowroomTourBar] =
    useState<boolean>(true);
  const [isHudMenuOpen, setIsHudMenuOpen] = useState<boolean>(false);
  const [showBrokenLinkModal, setShowBrokenLinkModal] =
    useState<boolean>(false);

  const [brokenLinksLog, setBrokenLinksLog] = useState<BrokenImageRecord[]>(
    INITIAL_REPLACED_BROKEN_LINKS
  );

  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );
  const [isDeckFloating, setIsDeckFloating] = useState<boolean>(true);
  const [isDeckMinimized, setIsDeckMinimized] = useState<boolean>(false);
  const [deckResetKey, setDeckResetKey] = useState<number>(0);
  const portfolioDeckDragControls = useDragControls();
  const heroStageRef = useRef<HTMLElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const [videoFailed, setVideoFailed] = useState<boolean>(false);
  const [failedUrls, setFailedUrls] = useState<Record<string, boolean>>({});
  const [customActiveImageOverride, setCustomActiveImageOverride] = useState<
    string | null
  >(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobileViewport(mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sanitizeConsortiumText = (text: string) =>
    (text || '')
      .replace(/Commercial Plazas/gi, 'Highrise Projects')
      .replace(
        /Ri8Click Real Estate Consortium Group|Ri8Click Consortium Group|Ri8Click Consortium/gi,
        'Ri8click Consortium'
      );

  const allCombinedWaypoints = useMemo<CameraWaypoint[]>(() => {
    const sourceSlides =
      Array.isArray(slides) && slides.length > 0 ? slides : INITIAL_HERO_SLIDES;
    const activeSlides = [...sourceSlides]
      .filter(s => s && s.isActive !== false)
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

    const slideWaypoints: CameraWaypoint[] = activeSlides.map((slide, idx) => {
      const meta = resolveSlideTourCategory(slide);
      const slideGallery =
        Array.isArray(slide.galleryImages) && slide.galleryImages.length > 0
          ? slide.galleryImages.filter(Boolean)
          : [slide.imageUrl].filter(Boolean);

      const primaryImg =
        slideGallery[0] || slide.imageUrl || meta.fallbackImg;
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

      const resolvedSlideVideo =
        slide.videoUrl ||
        slide.samplePropertyData?.virtualTourVideoUrl ||
        meta.videoUrl;
      const resolvedSlideVideoTitle =
        slide.videoTitle ||
        slide.samplePropertyData?.virtualTourVideoTitle ||
        `${cleanTitle} — 360° Virtual Tour`;

      return {
        id: slide.id,
        code: `${meta.codePrefix} ${String(idx + 1).padStart(2, '0')} //`,
        label: shortLabel,
        subLabel: sanitizeConsortiumText(
          slide.subtitle || slide.society || 'Ri8click Verified Showcase'
        ),
        tourCategory: meta.tourCategory,
        propertyCategory: meta.propertyCategory,
        divisionTag: meta.divisionTag,
        headline: cleanTitle,
        description: sanitizeConsortiumText(slide.description || ''),
        valuation: slide.price || 'PKR 85 Lakh',
        locationBadge: `${slide.society || 'Faisal Hills'} • ${slide.location || 'Taxila & Islamabad'}`,
        focalLength: '24MM ARCHITECTURAL',
        elevation: `${slide.tourRoomsCount || Math.max(slideGallery.length, 4)} ROOMS / ANGLES`,
        fov: '88° WIDE',
        imageUrl: primaryImg,
        secondaryImageUrl: secondaryImg,
        fallbackUrl: meta.fallbackImg,
        galleryImages: slideGallery.length > 0 ? slideGallery : [primaryImg],
        videoUrl: resolvedSlideVideo,
        videoTitle: resolvedSlideVideoTitle,
        motionOrigin: 'center center',
        panX: panPair,
        panY: ['0%', '-0.8%'],
        scaleRange: [1.01, 1.05],
        order: slide.order ?? idx + 1,
        specs: featuresList.slice(0, 4).map((feat, fIdx) => ({
          id: `${slide.id}-spec-${fIdx}`,
          title:
            fIdx === 0
              ? 'Key Highlight'
              : fIdx === 1
                ? 'Engineering'
                : fIdx === 2
                  ? 'Advantage'
                  : 'Verification',
          spec: sanitizeConsortiumText(feat)
        }))
      };
    });

    if (slideWaypoints.length > 0) {
      return slideWaypoints;
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
        description:
          'Verified luxury residential and commercial inventory across Taxila, Faisal Hills, and Islamabad.',
        valuation: 'PKR 6.85 Crore',
        locationBadge: 'Faisal Hills, Taxila / Islamabad',
        focalLength: '24MM PRIME',
        elevation: '1 KANAL',
        fov: '88° WIDE',
        imageUrl: CONSTRUCTED_HOUSES_GALLERY.house1_modernFaisalHillsVilla,
        secondaryImageUrl:
          CONSTRUCTED_HOUSES_GALLERY.house2_contemporaryKanalEstate,
        fallbackUrl: CONSTRUCTED_HOUSES_GALLERY.house3_stoneGlassMansion,
        galleryImages: [
          CONSTRUCTED_HOUSES_GALLERY.house1_modernFaisalHillsVilla
        ],
        videoUrl: SHOWROOM_VIDEOS.villaDroneOrbit,
        videoTitle: 'Faisal Hills Designer Villa 360° Tour',
        motionOrigin: 'center center',
        panX: ['0%', '-1%'],
        panY: ['0%', '-0.8%'],
        scaleRange: [1.01, 1.05],
        order: 1,
        specs: [
          {
            id: 'fb-1',
            title: 'Highlight',
            spec: '100% Verified Ri8click Listing'
          }
        ]
      }
    ];
  }, [slides, properties]);

  const cameraWaypoints = useMemo<CameraWaypoint[]>(() => {
    if (tourCategory === 'all_showroom') {
      return allCombinedWaypoints;
    }
    const filtered = allCombinedWaypoints.filter(
      w => w.tourCategory === tourCategory
    );
    return filtered.length > 0 ? filtered : allCombinedWaypoints;
  }, [allCombinedWaypoints, tourCategory]);

  const safeIdx =
    waypointIdx < cameraWaypoints.length ? waypointIdx : 0;
  const activeWaypoint =
    cameraWaypoints[safeIdx] || allCombinedWaypoints[0];

  const resolveImageWithFallback = (wp: CameraWaypoint): string => {
    if (
      customActiveImageOverride &&
      !failedUrls[customActiveImageOverride]
    ) {
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
    setWaypointIdx(
      prev => (prev - 1 + cameraWaypoints.length) % cameraWaypoints.length
    );
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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const deltaX = endX - touchStartXRef.current;
    if (Math.abs(deltaX) > 65) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
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
      count: allCombinedWaypoints.filter(
        w => w.tourCategory === 'capsule_containers'
      ).length
    },
    {
      id: 'highrise_projects',
      label: 'Highrise Projects (Islamabad)',
      shortLabel: 'Highrise Projects',
      filterCategory: 'commercial',
      icon: <Building2 className="w-3.5 h-3.5" />,
      count: allCombinedWaypoints.filter(
        w => w.tourCategory === 'highrise_projects'
      ).length
    },
    {
      id: 'properties_plots_villas',
      label: 'Properties (Plots & Houses)',
      shortLabel: 'Plots & Villas',
      filterCategory: 'residential',
      icon: <Home className="w-3.5 h-3.5" />,
      count: allCombinedWaypoints.filter(
        w => w.tourCategory === 'properties_plots_villas'
      ).length
    },
    {
      id: 'upvc_construction',
      label: 'Ri8click Consortium & UPVC',
      shortLabel: 'UPVC & Doors',
      filterCategory: 'projects',
      icon: <Wrench className="w-3.5 h-3.5" />,
      count: allCombinedWaypoints.filter(
        w => w.tourCategory === 'upvc_construction'
      ).length
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
        {description && (
          <div className="text-[10px] text-slate-300">{description}</div>
        )}
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

  const canDragDeck = isDeckFloating && !isMobileViewport;

  return (
    <section
      ref={heroStageRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[620px] sm:min-h-[680px] lg:min-h-[790px] flex flex-col justify-between overflow-hidden bg-slate-900 text-white select-none"
    >
      {/* 1. FULL-BLEED BACKGROUND STAGE */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
        <AnimatePresence mode="sync">
          {isVideoTourActive && !videoFailed ? (
            <motion.div
              key={`video-stream-${activeWaypoint.id}-${activeWaypoint.videoUrl}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full"
            >
              {activeWaypoint.videoUrl.includes('youtube.com') ||
              activeWaypoint.videoUrl.includes('youtu.be') ? (
                <iframe
                  src={
                    activeWaypoint.videoUrl.includes('watch?v=')
                      ? activeWaypoint.videoUrl.replace('watch?v=', 'embed/')
                      : activeWaypoint.videoUrl.includes('youtu.be/')
                      ? `https://www.youtube.com/embed/${
                          activeWaypoint.videoUrl
                            .split('youtu.be/')[1]
                            ?.split('?')[0]
                        }?autoplay=1&mute=1`
                      : activeWaypoint.videoUrl
                  }
                  title={activeWaypoint.videoTitle || activeWaypoint.headline}
                  className="w-full h-full object-cover"
                  allow="autoplay; fullscreen"
                />
              ) : (
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
              )}
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
                scale: isPaused
                  ? activeWaypoint.scaleRange[0]
                  : activeWaypoint.scaleRange[1],
                x: isPaused ? '0%' : activeWaypoint.panX[1],
                y: isPaused ? '0%' : activeWaypoint.panY[1]
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.65, ease: 'easeOut' },
                scale: {
                  duration: WAYPOINT_DURATION_MS / 1000 + 1.0,
                  ease: 'linear'
                },
                x: {
                  duration: WAYPOINT_DURATION_MS / 1000 + 1.0,
                  ease: 'linear'
                },
                y: {
                  duration: WAYPOINT_DURATION_MS / 1000 + 1.0,
                  ease: 'linear'
                }
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
                onError={() =>
                  handleImageError(resolvedImageUrl, activeWaypoint.label)
                }
                style={{
                  ...atmosphereStyle,
                  imageRendering: 'high-quality' as any
                }}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle High-Clarity Scrim */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isCinemaTheaterMode || !showLeftDescription
              ? 'bg-gradient-to-t from-slate-950/65 via-transparent to-slate-950/25'
              : 'bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20" />
      </div>

      {/* 2. TOP CATEGORY BAR */}
      <AnimatePresence>
        {showCategoryBar && !isCinemaTheaterMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative z-30 border-b border-white/15 bg-slate-950/75 backdrop-blur-md"
          >
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
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
                      className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer border ${
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
                          isSelected
                            ? 'bg-slate-950 text-amber-300'
                            : 'bg-white/15 text-white'
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
                <span className="hidden sm:inline">Hide Bar</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. CAMERA WAYPOINTS BAR */}
      <AnimatePresence>
        {showShowroomTourBar && !isCinemaTheaterMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative z-20 border-b border-white/15 bg-slate-900/70 backdrop-blur-md"
          >
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 px-2 py-0.5 rounded bg-amber-500/15 border border-amber-400/30 flex items-center gap-1 shrink-0">
                  <Camera className="w-3 h-3" />
                  <span>Angles ({cameraWaypoints.length})</span>
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
                <span className="hidden sm:inline">Hide</span>
                <ChevronUp className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. MAIN FOREGROUND STAGE & VIVID CRYSTAL TRANSPARENT PORTFOLIO DECK */}
      <div className="relative z-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-5 sm:pb-6 min-h-[500px] lg:min-h-[610px] flex flex-col justify-between w-full">
        {/* Top Utility Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-slate-950/65 backdrop-blur-xl border border-white/25">
              <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-white truncate max-w-[210px] sm:max-w-none">
                Ri8click Consortium — Capsule Homes, Highrises &amp; UPVC
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowBrokenLinkModal(prev => !prev)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/75 hover:bg-emerald-900/85 backdrop-blur-xl border border-emerald-400/45 text-emerald-200 text-[10px] font-bold transition-colors cursor-pointer"
              title="View Verified Media Log"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Synced ({cameraWaypoints.length})</span>
            </button>

            {canManageDeck && onOpenBannerAdmin && (
              <button
                type="button"
                onClick={onOpenBannerAdmin}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600/90 hover:bg-blue-500 backdrop-blur-xl border border-blue-300/40 text-white text-[10px] font-extrabold transition-colors cursor-pointer shadow-sm"
                title="Synchronize & Edit Hero Slides in Admin Hub"
              >
                <Settings className="w-3 h-3 text-amber-300" />
                <span>Manage Deck in Admin Hub</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 ml-auto">
            <button
              type="button"
              onClick={() => {
                setShowLeftDescription(prev => !prev);
                if (!showDirectorDeck) setShowDirectorDeck(true);
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 border transition-all cursor-pointer backdrop-blur-xl ${
                !showLeftDescription
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                  : 'bg-slate-950/60 text-white border-white/25 hover:bg-slate-900/80'
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
                  <span>Full Text</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsVideoTourActive(prev => !prev)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 border transition-all cursor-pointer backdrop-blur-xl ${
                isVideoTourActive
                  ? 'bg-amber-400 text-slate-950 border-amber-300'
                  : 'bg-slate-950/60 text-white border-white/25 hover:bg-slate-900/80'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>{isVideoTourActive ? '360° Video: ON' : '360° Video Tour'}</span>
            </button>

            {isVideoTourActive && (
              <button
                type="button"
                onClick={() => setIsMuted(prev => !prev)}
                className="p-1.5 rounded-xl bg-slate-950/60 hover:bg-slate-900/80 backdrop-blur-xl border border-white/25 text-white transition-colors cursor-pointer"
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                )}
              </button>
            )}

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsHudMenuOpen(prev => !prev)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 border transition-all cursor-pointer backdrop-blur-xl ${
                  isHudMenuOpen
                    ? 'bg-amber-400 text-slate-950 border-amber-300'
                    : 'bg-slate-950/60 text-white border-white/25 hover:bg-slate-900/80'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">View Controls</span>
              </button>

              <AnimatePresence>
                {isHudMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-950/90 backdrop-blur-2xl border border-white/25 p-3.5 shadow-2xl z-50 space-y-2"
                  >
                    <div className="flex items-center justify-between border-b border-white/15 pb-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                        Showroom Display Controls
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsHudMenuOpen(false)}
                        className="text-xs text-slate-300 hover:text-white cursor-pointer"
                      >
                        Close
                      </button>
                    </div>

                    <div className="space-y-1">
                      <ToggleSwitch
                        label="Left Description Panel"
                        description="Show full headline & specs on left"
                        checked={showLeftDescription}
                        onChange={() => setShowLeftDescription(prev => !prev)}
                      />
                      <ToggleSwitch
                        label="Crystal Portfolio Deck"
                        description="Show interactive slide deck on right"
                        checked={showDirectorDeck}
                        onChange={() => setShowDirectorDeck(prev => !prev)}
                      />
                      <ToggleSwitch
                        label="Feature Spec Badges"
                        description="Show engineering highlight badges"
                        checked={showSpecCards}
                        onChange={() => setShowSpecCards(prev => !prev)}
                      />
                      <ToggleSwitch
                        label="Top Category Bar"
                        description="Show division filter bar at top"
                        checked={showCategoryBar}
                        onChange={() => setShowCategoryBar(prev => !prev)}
                      />
                      <ToggleSwitch
                        label="Camera Waypoints Bar"
                        description="Show quick angle selector bar"
                        checked={showShowroomTourBar}
                        onChange={() => setShowShowroomTourBar(prev => !prev)}
                      />
                      <ToggleSwitch
                        label="Consortium 4-Pillar Ribbon"
                        description="Show bottom division summary cards"
                        checked={showConsortiumRibbon}
                        onChange={() => setShowConsortiumRibbon(prev => !prev)}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => setIsCinemaTheaterMode(prev => !prev)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 border transition-all cursor-pointer backdrop-blur-xl ${
                isCinemaTheaterMode
                  ? 'bg-amber-400 text-slate-950 border-amber-300'
                  : 'bg-slate-950/60 text-white border-white/25 hover:bg-slate-900/80'
              }`}
              title="Toggle Pure Fullscreen Image View"
            >
              {isCinemaTheaterMode ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Exit Pure View</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Pure View</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Verified Media Log Modal */}
        <AnimatePresence>
          {showBrokenLinkModal && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-4 rounded-2xl bg-slate-950/90 backdrop-blur-2xl border border-emerald-400/45 p-4 text-xs shadow-2xl space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-extrabold text-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>
                    Global Hero Banner &amp; 360° Media Sync Status (
                    {cameraWaypoints.length} Active Slides)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBrokenLinkModal(false)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                {brokenLinksLog.map(item => (
                  <div
                    key={item.id}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-2"
                  >
                    <div className="truncate">
                      <div className="font-bold text-white truncate">
                        {item.waypointLabel}
                      </div>
                      <div className="text-[10px] text-emerald-300">
                        {item.timestamp}
                      </div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Center / Main Stage Content */}
        {!isCinemaTheaterMode && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end my-auto py-2">
            {/* Left Full Description Panel (Optional Toggle) */}
            <div className="lg:col-span-7 space-y-4">
              <AnimatePresence mode="wait">
                {showLeftDescription ? (
                  <motion.div
                    key={`desc-full-${activeWaypoint.id}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="p-5 sm:p-6 rounded-3xl bg-slate-950/60 backdrop-blur-xl border border-white/25 shadow-2xl space-y-4"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                        {activeWaypoint.code} {activeWaypoint.label}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-amber-200 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{activeWaypoint.locationBadge}</span>
                      </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                      {activeWaypoint.headline}
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {activeWaypoint.description}
                    </p>

                    {showSpecCards && activeWaypoint.specs.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {activeWaypoint.specs.map(sp => (
                          <div
                            key={sp.id}
                            className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <div className="min-w-0">
                              <div className="text-[10px] uppercase font-bold text-amber-300">
                                {sp.title}
                              </div>
                              <div className="text-xs font-bold text-white truncate">
                                {sp.spec}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <div className="px-4 py-2 rounded-2xl bg-emerald-950/80 border border-emerald-400/50">
                        <span className="text-[10px] font-bold uppercase text-emerald-300 block">
                          Direct Valuation
                        </span>
                        <span className="text-base sm:text-lg font-black text-white">
                          {activeWaypoint.valuation}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={onExploreClick}
                        className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
                      >
                        Explore Inventory
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onOpen3DTour({
                            id: activeWaypoint.id,
                            title: activeWaypoint.headline,
                            tagline: activeWaypoint.subLabel,
                            description: activeWaypoint.description,
                            priceFormatted: activeWaypoint.valuation,
                            category: activeWaypoint.propertyCategory,
                            images:
                              activeWaypoint.galleryImages &&
                              activeWaypoint.galleryImages.length > 0
                                ? activeWaypoint.galleryImages
                                : [
                                    activeWaypoint.imageUrl,
                                    activeWaypoint.secondaryImageUrl
                                  ],
                            virtualTourVideoUrl: activeWaypoint.videoUrl,
                            virtualTourVideoTitle:
                              activeWaypoint.videoTitle ||
                              `${activeWaypoint.headline} — 360° Virtual Tour`,
                            hasVirtualTour: Boolean(activeWaypoint.videoUrl),
                            location: {
                              city: 'Taxila & Islamabad',
                              society: activeWaypoint.locationBadge,
                              province: 'Punjab'
                            }
                          })
                        }
                        className="px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <Compass className="w-4 h-4 text-amber-300" />
                        <span>Launch 360° Tour</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`desc-compact-${activeWaypoint.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="inline-flex flex-col gap-2 p-3.5 sm:p-4 rounded-2xl bg-slate-950/55 backdrop-blur-xl border border-white/25 max-w-xl"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                        {activeWaypoint.code}
                      </span>
                      <span className="text-xs font-extrabold text-amber-300">
                        {activeWaypoint.locationBadge}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/25 border border-emerald-400/50 text-emerald-200 text-xs font-black">
                        {activeWaypoint.valuation}
                      </span>
                    </div>
                    <h2 className="text-base sm:text-xl font-black text-white leading-snug">
                      {activeWaypoint.headline}
                    </h2>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Vivid Crystal Transparent Portfolio Deck */}
            {showDirectorDeck && (
              <div className="lg:col-span-5 flex justify-end w-full">
                <motion.div
                  key={`crystal-deck-${deckResetKey}`}
                  drag={canDragDeck}
                  dragControls={portfolioDeckDragControls}
                  dragListener={false}
                  dragMomentum={false}
                  className="w-full max-w-md rounded-3xl bg-white/[0.10] backdrop-blur-xl border border-white/35 shadow-[0_20px_60px_rgba(0,0,0,0.55)] overflow-hidden text-white"
                >
                  {/* Crystal Deck Header */}
                  <div
                    onPointerDown={e => {
                      if (canDragDeck) {
                        portfolioDeckDragControls.start(e);
                      }
                    }}
                    className={`px-4 py-2.5 bg-slate-950/45 border-b border-white/20 flex items-center justify-between gap-2 ${
                      canDragDeck ? 'cursor-grab active:cursor-grabbing' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <GripHorizontal className="w-4 h-4 text-amber-300 shrink-0" />
                      <span className="text-[11px] font-black uppercase tracking-wider text-white truncate">
                        Portfolio Deck ({safeIdx + 1}/{cameraWaypoints.length})
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
                        {activeWaypoint.valuation}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {!isMobileViewport && (
                        <button
                          type="button"
                          onClick={handleResetDeckPosition}
                          className="p-1 rounded-lg bg-white/10 hover:bg-white/25 text-white cursor-pointer"
                          title="Reset Deck Position"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setIsDeckMinimized(prev => !prev)}
                        className="p-1 rounded-lg bg-white/10 hover:bg-white/25 text-white cursor-pointer"
                        title={
                          isDeckMinimized ? 'Expand Deck' : 'Minimize Deck'
                        }
                      >
                        {isDeckMinimized ? (
                          <ChevronDown className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronUp className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {!isDeckMinimized && (
                    <div className="p-4 space-y-3.5">
                      {/* Active Slide Summary inside Deck */}
                      <div className="space-y-1">
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                          {activeWaypoint.subLabel}
                        </div>
                        <h3 className="text-sm sm:text-base font-black text-white leading-snug line-clamp-2">
                          {activeWaypoint.headline}
                        </h3>
                      </div>

                      {/* Multi-Angle Thumbnails inside Crystal Deck */}
                      {activeWaypoint.galleryImages &&
                        activeWaypoint.galleryImages.length > 1 && (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-bold text-slate-200">
                              <span>
                                Slide Angles (
                                {activeWaypoint.galleryImages.length} Photos)
                              </span>
                              <span>Click to Switch Angle</span>
                            </div>
                            <div className="grid grid-cols-4 gap-1.5">
                              {activeWaypoint.galleryImages
                                .slice(0, 4)
                                .map((gImg, gIdx) => {
                                  const isCurrentAngle =
                                    resolvedImageUrl === gImg;
                                  return (
                                    <button
                                      key={`${gImg}-${gIdx}`}
                                      type="button"
                                      onClick={() => {
                                        setIsVideoTourActive(false);
                                        setCustomActiveImageOverride(gImg);
                                      }}
                                      className={`relative h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                                        isCurrentAngle
                                          ? 'border-amber-400 scale-[1.03]'
                                          : 'border-white/25 opacity-80 hover:opacity-100'
                                      }`}
                                    >
                                      <img
                                        src={gImg}
                                        alt={`Angle ${gIdx + 1}`}
                                        className="w-full h-full object-cover"
                                      />
                                      <span className="absolute bottom-0.5 right-1 text-[9px] font-black px-1 rounded bg-slate-950/80 text-white">
                                        #{gIdx + 1}
                                      </span>
                                    </button>
                                  );
                                })}
                            </div>
                          </div>
                        )}

                      {/* Quick Waypoint Grid Selector */}
                      <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-0.5">
                        {cameraWaypoints.map((wp, idx) => {
                          const active = idx === safeIdx;
                          return (
                            <button
                              key={wp.id}
                              type="button"
                              onClick={() => {
                                setIsVideoTourActive(false);
                                setWaypointIdx(idx);
                              }}
                              className={`p-1.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                                active
                                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-sm'
                                  : 'bg-slate-950/45 text-white border-white/20 hover:bg-slate-950/70'
                              }`}
                            >
                              <img
                                src={wp.imageUrl}
                                alt={wp.label}
                                onError={e => {
                                  (e.target as HTMLImageElement).src =
                                    wp.fallbackUrl;
                                }}
                                className="w-9 h-9 rounded-lg object-cover shrink-0 border border-white/20"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="text-[10.5px] font-extrabold truncate">
                                  {idx + 1}. {wp.label}
                                </div>
                                <div
                                  className={`text-[9.5px] font-bold truncate ${
                                    active
                                      ? 'text-slate-900'
                                      : 'text-amber-300'
                                  }`}
                                >
                                  {wp.valuation}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Playback & 360 Tour Controls */}
                      <div className="pt-2 border-t border-white/20 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={handlePrev}
                            className="p-2 rounded-xl bg-slate-950/60 hover:bg-amber-400 text-white hover:text-slate-950 border border-white/25 transition-colors cursor-pointer"
                            title="Previous Slide"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsPaused(prev => !prev)}
                            className="px-3 py-2 rounded-xl bg-slate-950/60 hover:bg-white/20 text-white border border-white/25 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                          >
                            {isPaused ? (
                              <>
                                <Play className="w-3.5 h-3.5 text-amber-400" />
                                <span>Play</span>
                              </>
                            ) : (
                              <>
                                <Pause className="w-3.5 h-3.5 text-amber-400" />
                                <span>Pause</span>
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={handleNext}
                            className="p-2 rounded-xl bg-slate-950/60 hover:bg-amber-400 text-white hover:text-slate-950 border border-white/25 transition-colors cursor-pointer"
                            title="Next Slide"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            onOpen3DTour({
                              id: activeWaypoint.id,
                              title: activeWaypoint.headline,
                              tagline: activeWaypoint.subLabel,
                              description: activeWaypoint.description,
                              priceFormatted: activeWaypoint.valuation,
                              category: activeWaypoint.propertyCategory,
                              images:
                                activeWaypoint.galleryImages &&
                                activeWaypoint.galleryImages.length > 0
                                  ? activeWaypoint.galleryImages
                                  : [
                                      activeWaypoint.imageUrl,
                                      activeWaypoint.secondaryImageUrl
                                    ],
                              virtualTourVideoUrl: activeWaypoint.videoUrl,
                              virtualTourVideoTitle:
                                activeWaypoint.videoTitle ||
                                `${activeWaypoint.headline} — 360° Virtual Tour`,
                              hasVirtualTour: Boolean(activeWaypoint.videoUrl),
                              location: {
                                city: 'Taxila & Islamabad',
                                society: activeWaypoint.locationBadge,
                                province: 'Punjab'
                              }
                            })
                          }
                          className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer"
                        >
                          <Compass className="w-3.5 h-3.5" />
                          <span>Launch 360° Tour</span>
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            )}
          </div>
        )}

        {/* Bottom Consortium 4-Pillar Ribbon (Optional) */}
        <AnimatePresence>
          {showConsortiumRibbon && !isCinemaTheaterMode && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-3"
            >
              {consortiumPillars.map(pillar => (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => {
                    setTourCategory(pillar.id);
                    onSelectCategoryFilter(pillar.category);
                  }}
                  className="p-3 rounded-2xl bg-slate-950/65 hover:bg-slate-900/85 backdrop-blur-xl border border-white/20 text-left flex items-start gap-3 transition-all cursor-pointer"
                >
                  <div className="p-2 rounded-xl bg-white/10 border border-white/15 shrink-0">
                    {pillar.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-extrabold text-white truncate">
                      {pillar.title}
                    </div>
                    <div className="text-[10.5px] text-slate-300 truncate mt-0.5">
                      {pillar.detail}
                    </div>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection;

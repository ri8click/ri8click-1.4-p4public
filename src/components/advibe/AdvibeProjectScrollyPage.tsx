import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import {
  Building2,
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
  GripHorizontal,
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
  order: number;
  specs: {
    id: string;
    title: string;
    spec: string;
  }[];
}

const MODULAR_CAPSULE_GALLERY = {
  fallbackCapsule1:
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
  fallbackCapsule2:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
};

const ISLAMABAD_HIGHRISE_PROJECTS_GALLERY = {
  fallbackHighrise1:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
  fallbackHighrise2:
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85'
};

const CONSTRUCTED_HOUSES_GALLERY = {
  house1_modernFaisalHillsVilla:
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
  house2_contemporaryKanalEstate:
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85'
};

const UPVC_AND_INTERIOR_GALLERY = {
  upvc1_slidingPatioDoors:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
};

const SHOWROOM_VIDEOS = {
  architecturalFlyover:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  capsuleInteriorWalk:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  villaDroneOrbit:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
};

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
      divisionTag: 'RI8CLICK CONSORTIUM // CONTAINER & SPACE CAPSULE SMART HOUSES',
      codePrefix: 'CAPSULE',
      fallbackImg: MODULAR_CAPSULE_GALLERY.fallbackCapsule1,
      videoUrl: slide.videoUrl || SHOWROOM_VIDEOS.capsuleInteriorWalk
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
      videoUrl: slide.videoUrl || SHOWROOM_VIDEOS.villaDroneOrbit
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
      divisionTag: 'RI8CLICK CONSORTIUM // ISLAMABAD & LAHORE HIGHRISE PROJECTS',
      codePrefix: 'HIGHRISE',
      fallbackImg: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.fallbackHighrise1,
      videoUrl: slide.videoUrl || SHOWROOM_VIDEOS.architecturalFlyover
    };
  }

  return {
    tourCategory: 'properties_plots_villas',
    propertyCategory: 'residential',
    divisionTag: 'RI8CLICK CONSORTIUM // VERIFIED PLOTS & LUXURY VILLAS',
    codePrefix: 'PROP',
    fallbackImg: CONSTRUCTED_HOUSES_GALLERY.house1_modernFaisalHillsVilla,
    videoUrl: slide.videoUrl || SHOWROOM_VIDEOS.villaDroneOrbit
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
  const [showCategoryBar, setShowCategoryBar] = useState<boolean>(true);
  const [showShowroomTourBar, setShowShowroomTourBar] = useState<boolean>(true);
  const [isHudMenuOpen, setIsHudMenuOpen] = useState<boolean>(false);

  const [isDeckFloating, setIsDeckFloating] = useState<boolean>(true);
  const [isDeckMinimized, setIsDeckMinimized] = useState<boolean>(false);
  const [deckResetKey, setDeckResetKey] = useState<number>(0);
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);

  const portfolioDeckDragControls = useDragControls();
  const heroStageRef = useRef<HTMLElement | null>(null);

  const [videoFailed, setVideoFailed] = useState<boolean>(false);
  const [failedUrls, setFailedUrls] = useState<Record<string, boolean>>({});
  const [customActiveImageOverride, setCustomActiveImageOverride] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const checkViewport = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileScreen(mobile);
      if (mobile) {
        setIsDeckFloating(false);
      }
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
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

      const primaryImg = slideGallery[0] || slide.imageUrl || meta.fallbackImg;
      const secondaryImg = slideGallery[1] || primaryImg;
      const cleanTitle = sanitizeConsortiumText(slide.title);
      const shortLabel = cleanTitle.includes('—')
        ? cleanTitle.split('—')[0].trim().slice(0, 32)
        : cleanTitle.slice(0, 32);

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
        subLabel: sanitizeConsortiumText(
          slide.subtitle || slide.society || 'Ri8click Verified Showcase'
        ),
        tourCategory: meta.tourCategory,
        propertyCategory: meta.propertyCategory,
        divisionTag: meta.divisionTag,
        headline: cleanTitle,
        description: sanitizeConsortiumText(slide.description || ''),
        valuation: slide.price || 'PKR 85 Lakh',
        locationBadge: `${slide.society || 'Faisal Hills'} • ${
          slide.location || 'Taxila & Islamabad'
        }`,
        focalLength: '24MM ARCHITECTURAL',
        elevation: `${slide.tourRoomsCount || 4} ANGLES`,
        fov: '88° WIDE',
        imageUrl: primaryImg,
        secondaryImageUrl: secondaryImg,
        fallbackUrl: meta.fallbackImg,
        galleryImages: slideGallery.length > 0 ? slideGallery : [primaryImg],
        videoUrl: meta.videoUrl,
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

    const existingTitles = new Set(slideWaypoints.map(w => w.headline.toLowerCase()));
    const customModularProps = (properties || []).filter(
      p =>
        p &&
        p.status !== 'pending' &&
        (p.category === 'modular' ||
          (p.type && p.type.toLowerCase().includes('capsule'))) &&
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
        order: 1000 + pIdx,
        specs: (prop.features || []).slice(0, 4).map((f, fIdx) => ({
          id: `${prop.id}-sp-${fIdx}`,
          title: `Feature ${fIdx + 1}`,
          spec: f
        }))
      };
    });

    const combined = [...slideWaypoints, ...propertyWaypoints];
    return combined.length > 0
      ? combined
      : [
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
            secondaryImageUrl: CONSTRUCTED_HOUSES_GALLERY.house2_contemporaryKanalEstate,
            fallbackUrl: CONSTRUCTED_HOUSES_GALLERY.house1_modernFaisalHillsVilla,
            galleryImages: [CONSTRUCTED_HOUSES_GALLERY.house1_modernFaisalHillsVilla],
            videoUrl: SHOWROOM_VIDEOS.villaDroneOrbit,
            order: 1,
            specs: [{ id: 'fb-1', title: 'Highlight', spec: '100% Verified Ri8click Listing' }]
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

  const handleImageError = (brokenUrl: string) => {
    setFailedUrls(prev => (prev[brokenUrl] ? prev : { ...prev, [brokenUrl]: true }));
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
    setWaypointIdx(prev => (prev - 1 + cameraWaypoints.length) % cameraWaypoints.length);
  };

  const handleNext = () => {
    setIsVideoTourActive(false);
    setWaypointIdx(prev => (prev + 1) % cameraWaypoints.length);
  };

  const handleResetDeckPosition = () => {
    setIsDeckFloating(!isMobileScreen);
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
      label: 'Highrise Projects',
      shortLabel: 'Highrises',
      filterCategory: 'commercial',
      icon: <Building2 className="w-3.5 h-3.5" />,
      count: allCombinedWaypoints.filter(w => w.tourCategory === 'highrise_projects').length
    },
    {
      id: 'properties_plots_villas',
      label: 'Plots & Villas',
      shortLabel: 'Plots & Villas',
      filterCategory: 'residential',
      icon: <Home className="w-3.5 h-3.5" />,
      count: allCombinedWaypoints.filter(w => w.tourCategory === 'properties_plots_villas')
        .length
    },
    {
      id: 'upvc_construction',
      label: 'Consortium & UPVC',
      shortLabel: 'UPVC & Doors',
      filterCategory: 'projects',
      icon: <Wrench className="w-3.5 h-3.5" />,
      count: allCombinedWaypoints.filter(w => w.tourCategory === 'upvc_construction').length
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

  return (
    <section
      ref={heroStageRef}
      className="relative min-h-[600px] sm:min-h-[680px] lg:min-h-[760px] flex flex-col justify-between overflow-hidden bg-slate-900 text-white select-none"
    >
      {/* 1. FULL-BLEED BACKGROUND STAGE (Clean, Professional Transition without Glowing Circles) */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
        <AnimatePresence mode="sync">
          {isVideoTourActive && !videoFailed ? (
            <motion.div
              key={`video-stream-${activeWaypoint.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
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
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: isPaused ? 1.01 : 1.04 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.6, ease: 'easeOut' },
                scale: { duration: WAYPOINT_DURATION_MS / 1000 + 1.0, ease: 'linear' }
              }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={resolvedImageUrl}
                alt={`${activeWaypoint.headline} - ${activeWaypoint.label}`}
                loading="eager"
                decoding="async"
                onError={() => handleImageError(resolvedImageUrl)}
                style={atmosphereStyle}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isCinemaTheaterMode || !showLeftDescription
              ? 'bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-slate-950/30'
              : 'bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent'
          }`}
        />
      </div>

      {/* 2. CATEGORY BAR (Touch Scrollable on Mobile) */}
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
                      className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer border ${
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
                className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-semibold text-slate-200 flex items-center gap-1 shrink-0 cursor-pointer"
                title="Hide Category Bar"
              >
                <span className="hidden sm:inline">Hide</span>
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
            className="relative z-20 border-b border-white/15 bg-slate-900/75 backdrop-blur-md"
          >
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 px-2 py-0.5 rounded bg-amber-500/15 border border-amber-400/30 flex items-center gap-1 shrink-0">
                  <Camera className="w-3 h-3" />
                  <span>Slides ({cameraWaypoints.length})</span>
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
              >
                <ChevronUp className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. MAIN FOREGROUND STAGE & MOBILE-RESPONSIVE PORTFOLIO DECK */}
      <div className="relative z-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 pb-5 flex-1 flex flex-col justify-between w-full">
        {/* Top Utility Controls Row — Fully Mobile Responsive */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-xl border border-white/20 max-w-full">
            <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-white truncate">
              Ri8click Consortium — Capsule Homes, Highrises &amp; German UPVC
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 ml-auto">
            {(!showCategoryBar || !showShowroomTourBar) && (
              <button
                type="button"
                onClick={() => {
                  setShowCategoryBar(true);
                  setShowShowroomTourBar(true);
                }}
                className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-xl cursor-pointer flex items-center gap-1"
              >
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Show Bars</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowLeftDescription(prev => !prev)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 border transition-all cursor-pointer backdrop-blur-xl ${
                showLeftDescription
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                  : 'bg-slate-950/70 text-white border-white/25 hover:bg-slate-900'
              }`}
            >
              {showLeftDescription ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Hide Details</span>
                </>
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5" />
                  <span>Slide Details</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsVideoTourActive(prev => !prev)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 border transition-all cursor-pointer backdrop-blur-xl ${
                isVideoTourActive
                  ? 'bg-amber-400 text-slate-950 border-amber-300'
                  : 'bg-slate-950/70 text-slate-100 border-white/20 hover:bg-slate-900'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>{isVideoTourActive ? 'Video: ON' : 'Video Tour'}</span>
            </button>

            {isVideoTourActive && (
              <button
                type="button"
                onClick={() => setIsMuted(prev => !prev)}
                className="p-1.5 rounded-xl bg-slate-950/70 hover:bg-slate-900 backdrop-blur-xl border border-white/20 text-white transition-colors cursor-pointer"
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                )}
              </button>
            )}

            {/* Minimize / Expand Portfolio Deck Quick Button (Always visible on mobile & desktop) */}
            <button
              type="button"
              onClick={() => {
                setShowDirectorDeck(true);
                setIsDeckMinimized(prev => !prev);
              }}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] font-bold bg-blue-600/90 hover:bg-blue-500 text-white border border-blue-400/40 flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              {isDeckMinimized ? (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Expand Deck</span>
                </>
              ) : (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Minimize Deck</span>
                </>
              )}
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsHudMenuOpen(prev => !prev)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-xl ${
                  isHudMenuOpen
                    ? 'bg-amber-400 text-slate-950 border-amber-300'
                    : 'bg-slate-950/70 border-white/20 text-white hover:bg-slate-900'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Controls</span>
              </button>

              <AnimatePresence>
                {isHudMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-white/20 shadow-2xl p-3.5 z-50 space-y-2.5"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-white/15">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                        Stage &amp; Deck Options
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsHudMenuOpen(false)}
                        className="text-[10px] text-slate-300 hover:text-white cursor-pointer"
                      >
                        Done
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-1">
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
                          className={`px-2 py-1.5 rounded-lg text-[10px] font-bold border cursor-pointer ${
                            atmosphere === grade.id
                              ? 'bg-amber-400 text-slate-950 border-amber-300'
                              : 'bg-white/5 text-slate-300 border-white/10'
                          }`}
                        >
                          {grade.label}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowDirectorDeck(prev => !prev)}
                      className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white flex items-center justify-between cursor-pointer"
                    >
                      <span>Show Portfolio Deck</span>
                      <span>{showDirectorDeck ? 'ON' : 'OFF'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowSpecCards(prev => !prev)}
                      className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white flex items-center justify-between cursor-pointer"
                    >
                      <span>Bottom Feature Strip</span>
                      <span>{showSpecCards ? 'ON' : 'OFF'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsCinemaTheaterMode(prev => !prev)}
                      className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white flex items-center justify-between cursor-pointer"
                    >
                      <span>Clean Theater View</span>
                      <span>{isCinemaTheaterMode ? 'ON' : 'OFF'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResetDeckPosition}
                      className="w-full py-2 px-3 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Deck Position</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Center / Bottom Content Area: Left Description + Right/Bottom Responsive Portfolio Deck */}
        <div className="my-auto py-2 grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
          {/* Left Slide Description Panel */}
          <div className="lg:col-span-7 space-y-3">
            {showLeftDescription && !isCinemaTheaterMode && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="p-4 sm:p-6 rounded-3xl bg-slate-950/75 backdrop-blur-xl border border-white/20 space-y-3 max-w-2xl shadow-2xl"
              >
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                  <span>{activeWaypoint.code}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-emerald-300">
                    <MapPin className="w-3.5 h-3.5" />
                    {activeWaypoint.locationBadge}
                  </span>
                </div>

                <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                  {activeWaypoint.headline}
                </h1>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed line-clamp-3">
                  {activeWaypoint.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="px-3.5 py-2 rounded-xl bg-white/10 border border-white/15">
                    <span className="text-[10px] uppercase text-slate-300 block font-bold">
                      Valuation / Price
                    </span>
                    <span className="text-sm sm:text-base font-black text-amber-400">
                      {activeWaypoint.valuation}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={onExploreClick}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold cursor-pointer shadow-lg"
                  >
                    Explore Inventory
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpen3DTour()}
                    className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/20 cursor-pointer"
                  >
                    Launch 3D Tour
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* PORTFOLIO DECK — Mobile Responsive & Dockable/Draggable */}
          {showDirectorDeck && !isCinemaTheaterMode && (
            <motion.div
              key={`portfolio-deck-${deckResetKey}`}
              drag={!isMobileScreen && isDeckFloating}
              dragControls={portfolioDeckDragControls}
              dragListener={false}
              dragMomentum={false}
              className="lg:col-span-5 w-full max-w-full sm:max-w-md ml-auto z-30"
            >
              <div className="rounded-2xl sm:rounded-3xl bg-slate-950/80 backdrop-blur-2xl border border-white/25 shadow-2xl overflow-hidden text-white">
                {/* Deck Header Bar with Always-Visible Minimize/Expand & Slide Controls */}
                <div
                  onPointerDown={e => {
                    if (!isMobileScreen && isDeckFloating) {
                      portfolioDeckDragControls.start(e);
                    }
                  }}
                  className="px-3.5 py-2.5 bg-slate-900/90 border-b border-white/15 flex items-center justify-between gap-2 cursor-grab active:cursor-grabbing"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <GripHorizontal className="w-4 h-4 text-amber-400 shrink-0 hidden sm:block" />
                    <div className="min-w-0">
                      <div className="text-[10px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                        <span>Portfolio Deck</span>
                        <span className="px-1.5 py-0.2 rounded bg-white/15 text-white">
                          {safeIdx + 1}/{cameraWaypoints.length}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white truncate">
                        {activeWaypoint.label}
                      </div>
                    </div>
                  </div>

                  {/* Quick Prev / Play / Next / Minimize Buttons (Visible on Mobile & Desktop) */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                      title="Previous Slide"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsPaused(prev => !prev)}
                      className="p-1.5 rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300 cursor-pointer"
                      title={isPaused ? 'Resume Autoplay' : 'Pause Autoplay'}
                    >
                      {isPaused ? (
                        <Play className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                      title="Next Slide"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsDeckMinimized(prev => !prev)}
                      className="p-1.5 rounded-lg bg-blue-600/80 hover:bg-blue-500 text-white cursor-pointer ml-1"
                      title={isDeckMinimized ? 'Expand Portfolio Deck' : 'Minimize Portfolio Deck'}
                    >
                      {isDeckMinimized ? (
                        <Maximize2 className="w-3.5 h-3.5" />
                      ) : (
                        <Minimize2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Deck Body */}
                {!isDeckMinimized && (
                  <div className="p-3.5 sm:p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-xs sm:text-sm font-extrabold text-white line-clamp-1">
                          {activeWaypoint.headline}
                        </h3>
                        <p className="text-[11px] text-slate-300 truncate">
                          {activeWaypoint.locationBadge}
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-black text-xs shrink-0">
                        {activeWaypoint.valuation}
                      </span>
                    </div>

                    {/* Multi-Angle Gallery Thumbnails */}
                    {activeWaypoint.galleryImages &&
                      activeWaypoint.galleryImages.length > 1 && (
                        <div className="grid grid-cols-4 gap-1.5">
                          {activeWaypoint.galleryImages.slice(0, 4).map((gUrl, gIdx) => {
                            const isCurrentAngle = resolvedImageUrl === gUrl;
                            return (
                              <button
                                key={gIdx}
                                type="button"
                                onClick={() => {
                                  setIsVideoTourActive(false);
                                  setCustomActiveImageOverride(gUrl);
                                }}
                                className={`relative h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                                  isCurrentAngle
                                    ? 'border-amber-400 scale-[1.02]'
                                    : 'border-white/15 opacity-75 hover:opacity-100'
                                }`}
                              >
                                <img
                                  src={gUrl}
                                  alt={`Angle ${gIdx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            );
                          })}
                        </div>
                      )}

                    {/* Action Buttons Row */}
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={onExploreClick}
                        className="py-2 px-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold text-center cursor-pointer"
                      >
                        Browse Ads
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpen3DTour()}
                        className="py-2 px-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold text-center border border-white/15 cursor-pointer"
                      >
                        3D View
                      </button>
                      <button
                        type="button"
                        onClick={onContactAgentClick}
                        className="py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold text-center cursor-pointer"
                      >
                        Specialists
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom Feature Spec Strip */}
        {showSpecCards && !isCinemaTheaterMode && (
          <div className="pt-3 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {activeWaypoint.specs.slice(0, 4).map(spec => (
              <div
                key={spec.id}
                className="px-3 py-2 rounded-xl bg-slate-950/65 backdrop-blur-md border border-white/15 flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[9.5px] uppercase font-bold text-slate-400">
                    {spec.title}
                  </div>
                  <div className="text-[11px] font-bold text-white truncate">{spec.spec}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  ArrowLeft,
  Share2,
  Phone,
  MessageSquare,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Calendar,
  Award,
  Copy,
  Video,
  Image as ImageIcon,
  Compass,
  Edit3,
  Layers,
  Building2,
  Sparkles,
  FileText
} from 'lucide-react';
import { AdVibeProject, AdVibeSection, Property } from '../../types';
import AdvibeInteractiveMasterPlan from './AdvibeInteractiveMasterPlan';
import AdvibeLocationRadar from './AdvibeLocationRadar';
import AdvibeGalleryLightbox from './AdvibeGalleryLightbox';
import AdvibeVideoPlayerModal from './AdvibeVideoPlayerModal';
import AdvibeLinkedUnits from './AdvibeLinkedUnits';
import AdvibeEnquirySection from './AdvibeEnquirySection';
import Advibe3DVirtualTour from './Advibe3DVirtualTour';

interface AdvibeProjectScrollyPageProps {
  project: AdVibeProject;
  properties?: Property[];
  onBackToListing: () => void;
  onSelectProperty?: (property: Property) => void;
  canEditProject?: boolean;
  onEditProjectInAdmin?: (project: AdVibeProject) => void;
}

const DEFAULT_FALLBACK_VIDEO =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

function resolveVideoStream(url: string): {
  kind: 'youtube' | 'vimeo' | 'native';
  src: string;
} {
  const trimmed = (url || '').trim() || DEFAULT_FALLBACK_VIDEO;
  const ytMatch = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    return {
      kind: 'youtube',
      src: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`
    };
  }
  const vimeoMatch = trimmed.match(
    /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/
  );
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      kind: 'vimeo',
      src: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`
    };
  }
  return { kind: 'native', src: trimmed };
}

export const AdvibeProjectScrollyPage: React.FC<AdvibeProjectScrollyPageProps> = ({
  project,
  properties = [],
  onBackToListing,
  onSelectProperty,
  canEditProject = false,
  onEditProjectInAdmin
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showShareNotification, setShowShareNotification] = useState<boolean>(false);
  const [playHeroVideo, setPlayHeroVideo] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);

  // Build effective sections list and guarantee that 360° Virtual Tour, Master Plan,
  // Gallery, Videos, and Linked Units are visible when visiting "Open Full Project Showcase"
  const activeSections = useMemo<AdVibeSection[]>(() => {
    const rawSections = Array.isArray(project.sections) ? [...project.sections] : [];
    const enabled = rawSections
      .filter(sec => sec.isEnabled !== false)
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

    const hasSectionType = (types: string[]) =>
      rawSections.some(s => types.includes(s.type));

    const result: AdVibeSection[] = [...enabled];

    // Ensure 360 Virtual Tour is ALWAYS visible on Full Project Showcase unless explicitly disabled by admin
    if (!hasSectionType(['virtual_tour'])) {
      const insertIdx = Math.min(3, result.length);
      result.splice(insertIdx, 0, {
        id: 'sec-auto-virtual-tour',
        type: 'virtual_tour',
        title: project.virtualTour?.title || `360° Interactive Virtual Tour — ${project.title}`,
        subtitle:
          project.virtualTour?.instructions ||
          'Drag with your mouse or touch screen to explore our panoramic 360° architectural scenes in day and night modes.',
        badge: 'IMMERSIVE 360° DIGITAL TWIN',
        isEnabled: true,
        order: insertIdx + 1
      });
    }

    // Ensure Master Plan is visible if project has masterPlan imageUrl
    if (project.masterPlan?.imageUrl && !hasSectionType(['master_plan', 'masterplan'])) {
      result.push({
        id: 'sec-auto-master-plan',
        type: 'master_plan',
        title: `Interactive Master Plan — ${project.title}`,
        subtitle: 'Explore sector blocks, commercial broadways, and available plot/unit hotspots.',
        badge: 'MASTER PLAN & GIS LAYOUT',
        isEnabled: true,
        order: result.length + 1
      });
    }

    // Ensure Gallery is visible if project has gallery photos
    if (project.gallery?.length > 0 && !hasSectionType(['gallery'])) {
      result.push({
        id: 'sec-auto-gallery',
        type: 'gallery',
        title: 'Project Visual Gallery & Renders',
        subtitle: 'High-resolution exterior, interior, and site development photography.',
        badge: 'VISUAL PORTFOLIO',
        isEnabled: true,
        order: result.length + 1
      });
    }

    // Ensure Videos section is visible if project has videos
    if (project.videos?.length > 0 && !hasSectionType(['videos'])) {
      result.push({
        id: 'sec-auto-videos',
        type: 'videos',
        title: 'Official Walkthrough Videos & Drone Updates',
        subtitle: 'Watch full-screen walkthroughs and on-ground construction progress.',
        badge: 'VIDEO SHOWCASE',
        isEnabled: true,
        order: result.length + 1
      });
    }

    // Ensure Linked Units is visible
    if (!hasSectionType(['units'])) {
      result.push({
        id: 'sec-auto-units',
        type: 'units',
        title: 'Available Inventory & Linked Property Units',
        subtitle: 'Verified residential, commercial, and modular units available in this development.',
        badge: 'LIVE LINKED INVENTORY',
        isEnabled: true,
        order: result.length + 1
      });
    }

    return result;
  }, [project]);

  useEffect(() => {
    setPlayHeroVideo(false);
    setVideoError(false);
  }, [project.id, project.bannerImage, project.mainImage, project.heroVideoUrl]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(Math.max(currentProgress, 0), 100));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const jumpToSection = (index: number) => {
    const targetSection = activeSections[index];
    if (!targetSection) return;
    setActiveSectionIndex(index);
    const el = document.getElementById(`advibe-sec-${targetSection.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: project.title,
          text: project.tagline,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareNotification(true);
      setTimeout(() => setShowShareNotification(false), 3000);
    }
  };

  // Strictly prioritize project.bannerImage and project.mainImage so Admin Hub uploads reflect immediately
  const heroBannerUrl =
    project.bannerImage ||
    project.mainImage ||
    project.seo?.ogImage ||
    project.gallery?.[0]?.url ||
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=85';

  const rawHeroVideoUrl =
    project.heroVideoUrl ||
    project.videos?.[0]?.url ||
    (project.virtualTour?.provider === 'video' ? project.virtualTour?.url : '') ||
    DEFAULT_FALLBACK_VIDEO;

  const resolvedHeroVideo = resolveVideoStream(
    videoError ? DEFAULT_FALLBACK_VIDEO : rawHeroVideoUrl
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-x-hidden bg-slate-50 text-slate-900"
    >
      {/* Top Light Floating Header + Quick Section Jump Bar */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onBackToListing}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors border border-slate-200 cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to AdVibe</span>
            </button>

            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={project.logo || heroBannerUrl}
                alt={project.title}
                className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <div className="text-xs font-extrabold text-slate-900 truncate">
                  {project.title}
                </div>
                <div className="text-[10px] text-blue-600 font-bold truncate">
                  {project.type} • {project.city}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {canEditProject && onEditProjectInAdmin && (
              <button
                type="button"
                onClick={() => onEditProjectInAdmin(project)}
                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-xs cursor-pointer"
                title="Edit this Showcase Banner, Sections, 360° Tour & Media in Admin Hub"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Edit Showcase in Admin Hub</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
              title="Share Project"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/${(
                project.dealerWhatsApp || '923365666727'
              ).replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                `Assalam-o-Alaikum! I am viewing ${project.title} on AdVibe.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-xs transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp Desk</span>
            </a>
          </div>
        </div>

        {/* Section Navigation Pills */}
        <div className="border-t border-slate-100 bg-slate-50/80 px-4 sm:px-8 py-1.5 overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5">
            {activeSections.map((sec, idx) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => jumpToSection(idx)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  activeSectionIndex === idx
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {sec.type === 'virtual_tour'
                  ? '360° Virtual Tour'
                  : sec.type === 'master_plan' || sec.type === 'masterplan'
                    ? 'Master Plan'
                    : sec.type === 'units'
                      ? 'Linked Units'
                      : sec.title.split(':')[0].slice(0, 24)}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[3px] bg-slate-100">
          <div
            className="h-full bg-blue-600 transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Floating Bottom Quick CTA Bar */}
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-40 flex items-center justify-between sm:justify-start gap-2 bg-white/95 backdrop-blur-md p-2 rounded-2xl border border-slate-200 shadow-xl">
        <a
          href={`tel:${project.dealerPhone || '+923365666727'}`}
          className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
          title="Call Direct Desk"
        >
          <Phone className="w-4 h-4" />
        </a>

        <button
          type="button"
          onClick={() => {
            const enqSec = activeSections.findIndex(
              s => s.type === 'enquiry' || s.type === 'lead_form'
            );
            if (enqSec >= 0) {
              jumpToSection(enqSec);
            } else {
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
          }}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Site Visit</span>
        </button>

        <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
          <button
            type="button"
            onClick={() => jumpToSection(Math.max(activeSectionIndex - 1, 0))}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
            title="Previous Section"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() =>
              jumpToSection(
                Math.min(activeSectionIndex + 1, activeSections.length - 1)
              )
            }
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
            title="Next Section"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {showShareNotification && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2">
          <Copy className="w-4 h-4" />
          <span>Project link copied to clipboard!</span>
        </div>
      )}

      {/* MAIN SECTIONS */}
      <main className="w-full space-y-12 pb-20">
        {activeSections.map((section, idx) => (
          <section
            key={section.id}
            id={`advibe-sec-${section.id}`}
            className="relative w-full py-10 px-4 sm:px-8 border-b border-slate-200/80"
          >
            {renderSectionContent(section, idx)}
          </section>
        ))}
      </main>
    </div>
  );

  function renderSectionContent(section: AdVibeSection, _index: number) {
    switch (section.type) {
      case 'hero': {
        const effectiveHeroImage =
          project.bannerImage ||
          project.mainImage ||
          section.customSettings?.bgImageUrl ||
          heroBannerUrl;

        return (
          <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-lg">
            {/* Banner Image or Video Stage — Always Reflects Admin Hub Uploads */}
            <div className="relative h-[380px] sm:h-[500px] w-full bg-slate-950 overflow-hidden flex items-center justify-center">
              {playHeroVideo ? (
                resolvedHeroVideo.kind === 'youtube' ||
                resolvedHeroVideo.kind === 'vimeo' ? (
                  <iframe
                    key={resolvedHeroVideo.src}
                    src={resolvedHeroVideo.src}
                    title={project.heroVideoTitle || project.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    key={resolvedHeroVideo.src}
                    src={resolvedHeroVideo.src}
                    poster={effectiveHeroImage}
                    controls
                    autoPlay
                    playsInline
                    onError={() => setVideoError(true)}
                    className="w-full h-full object-contain bg-black"
                  />
                )
              ) : (
                <img
                  key={effectiveHeroImage}
                  src={effectiveHeroImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}

              {!playHeroVideo && (
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />
              )}

              <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-10">
                <span className="px-3 py-1 rounded-full bg-white/95 text-slate-900 text-xs font-extrabold uppercase tracking-wider shadow-xs">
                  {section.badge || project.type}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setVideoError(false);
                      setPlayHeroVideo(prev => !prev);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md cursor-pointer transition-all ${
                      playHeroVideo
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-blue-600 hover:bg-blue-500 text-white'
                    }`}
                  >
                    {playHeroVideo ? (
                      <>
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Show Banner Image</span>
                      </>
                    ) : (
                      <>
                        <Video className="w-3.5 h-3.5" />
                        <span>Play Walkthrough Video</span>
                      </>
                    )}
                  </button>
                  <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-xs">
                    {project.status}
                  </span>
                </div>
              </div>

              {!playHeroVideo && (
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 z-10">
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    {project.developer?.name} • {project.address}
                  </div>
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight">
                    {project.title || section.title}
                  </h1>
                  <p className="text-xs sm:text-base text-slate-200 max-w-3xl">
                    {project.tagline || section.subtitle}
                  </p>
                </div>
              )}
            </div>

            {/* Key Project Specs Bar */}
            <div className="p-5 sm:p-6 bg-white flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Starting Price
                  </span>
                  <span className="text-lg sm:text-xl font-black text-blue-600">
                    {project.starting_price_formatted}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Location
                  </span>
                  <span className="text-sm font-bold text-slate-900 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    {project.area}, {project.city}
                  </span>
                </div>
                {project.areaSize && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Standard Size
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {project.areaSize} {project.areaUnit || 'Marla'}
                    </span>
                  </div>
                )}
              </div>

              {project.features && project.features.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.features.map((feat, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'intro':
      case 'story':
        return (
          <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                {section.badge || 'Executive Overview'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{section.subtitle}</p>
            </div>

            {section.content?.quote && (
              <blockquote className="p-5 rounded-2xl bg-blue-50/70 border-l-4 border-blue-600 text-slate-800 text-sm sm:text-base italic leading-relaxed">
                &ldquo;{section.content.quote}&rdquo;
              </blockquote>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p className="md:col-span-2 text-slate-800 font-medium">
                {project.description}
              </p>
              {Array.isArray(section.content?.paragraphs) &&
                section.content.paragraphs.map((para: string, pIdx: number) => (
                  <p key={pIdx}>{para}</p>
                ))}
            </div>
          </div>
        );

      case 'highlights':
        return (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                {section.badge || 'Key Highlights'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{section.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {(project.highlights || []).map(hl => (
                <div
                  key={hl.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between"
                >
                  <div>
                    {hl.image && (
                      <div className="h-32 w-full rounded-xl overflow-hidden mb-4 bg-slate-100">
                        <img
                          src={hl.image}
                          alt={hl.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="text-xs font-extrabold text-blue-600 mb-1">
                      {hl.value}
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1.5">
                      {hl.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {hl.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{section.subtitle}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {(Array.isArray(section.content) ? section.content : []).map(
                (st: any, sIdx: number) => (
                  <div
                    key={sIdx}
                    className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-xs"
                  >
                    <div className="text-2xl sm:text-4xl font-black text-blue-600 mb-1">
                      {st.value}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900">
                      {st.label}
                    </div>
                    {st.sub && (
                      <div className="text-[11px] text-slate-500 mt-1">{st.sub}</div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        );

      case 'salient':
        return (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{section.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {(Array.isArray(section.content) ? section.content : []).map(
                (sf: any, sfIdx: number) => (
                  <div
                    key={sfIdx}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 mb-1">
                        {sf.title}
                      </h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {sf.desc}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        );

      case 'master_plan':
      case 'masterplan':
        return (
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                {section.badge || 'Interactive Master Plan'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{section.subtitle}</p>
            </div>

            <AdvibeInteractiveMasterPlan
              masterPlan={project.masterPlan}
              projectTitle={project.title}
              themePrimaryColor={project.theme?.primaryColor}
              properties={properties}
              onSelectProperty={onSelectProperty}
            />
          </div>
        );

      case 'location':
        return (
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                {section.badge || 'Location & Landmarks'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{section.subtitle}</p>
            </div>

            <AdvibeLocationRadar
              locationPoints={project.locationPoints}
              coordinates={project.coordinates}
              city={project.city}
              area={project.area}
              address={project.address}
              projectTitle={project.title}
            />
          </div>
        );

      case 'amenities':
        return (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{section.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(project.amenities || []).map(am => (
                <div
                  key={am.id}
                  className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs"
                >
                  {am.image && (
                    <div className="h-44 w-full overflow-hidden bg-slate-100">
                      <img
                        src={am.image}
                        alt={am.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-1">
                      {am.category}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mb-1.5">
                      {am.name}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {am.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{section.subtitle}</p>
            </div>

            <AdvibeGalleryLightbox
              items={project.gallery}
              projectTitle={project.title}
            />
          </div>
        );

      case 'videos':
        return (
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{section.subtitle}</p>
            </div>

            <AdvibeVideoPlayerModal
              videos={project.videos}
              projectTitle={project.title}
            />
          </div>
        );

      case 'virtual_tour':
        return (
          <div className="max-w-6xl mx-auto space-y-6 text-center">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                <Compass className="w-3.5 h-3.5" />
                <span>{section.badge || '360° Interactive Digital Twin'}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title || '360° Panoramic Walkthrough'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
                {section.subtitle ||
                  'Drag to explore the architectural spaces in 360 degrees or switch scenes below.'}
              </p>
            </div>

            <div className="w-full">
              <Advibe3DVirtualTour
                project={project}
                embedded={true}
                className="w-full h-[460px] sm:h-[560px] shadow-md border-slate-200"
              />
            </div>
          </div>
        );

      case 'units':
        return (
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                {section.badge || 'Live Verified Inventory'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{section.subtitle}</p>
            </div>

            <AdvibeLinkedUnits
              linkedPropertyIds={project.linkedPropertyIds}
              properties={properties}
              onSelectProperty={onSelectProperty || (() => {})}
              projectTitle={project.title}
              projectCity={project.city}
              projectSociety={project.society || project.area}
            />
          </div>
        );

      case 'pricing':
      case 'payment_plan':
        return (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{section.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {(project.pricingTiers || []).map(tier => (
                <div
                  key={tier.id}
                  className="rounded-2xl p-5 bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {tier.size}
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900 mt-1 mb-3">
                      {tier.unitType}
                    </h4>

                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 mb-4">
                      <span className="text-[10px] text-slate-500 block">
                        Total Price:
                      </span>
                      <span className="text-lg font-black text-blue-700">
                        {tier.totalPrice}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-slate-600 mb-4">
                      <div className="flex justify-between">
                        <span>Down Payment:</span>
                        <span className="font-bold text-slate-900">
                          {tier.downPayment}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Installment:</span>
                        <span className="font-bold text-slate-900">
                          {tier.monthlyInstallment}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Possession:</span>
                        <span className="font-bold text-emerald-700">
                          {tier.possession}
                        </span>
                      </div>
                    </div>

                    {tier.features && (
                      <ul className="space-y-1.5 text-[11px] text-slate-600 border-t border-slate-100 pt-3">
                        {tier.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const enqSec = activeSections.findIndex(
                        s => s.type === 'enquiry' || s.type === 'lead_form'
                      );
                      if (enqSec >= 0) jumpToSection(enqSec);
                    }}
                    className="mt-5 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Inquire This Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'developer':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
              <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-slate-100 pb-6">
                <img
                  src={project.developer.logo || heroBannerUrl}
                  alt={project.developer.name}
                  className="w-20 h-20 rounded-2xl object-cover border border-slate-200"
                />
                <div className="text-center sm:text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Master Developer &amp; Consortium Partner
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                    {project.developer.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {project.developer.completedProjects || 25}+ Projects Delivered
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 mt-5 leading-relaxed">
                {project.developer.description}
              </p>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-xl">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
              {section.badge || 'Priority Allocation'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">{section.title}</h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mx-auto">
              {section.subtitle}
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a
                href={`https://wa.me/${(
                  project.dealerWhatsApp || '923365666727'
                ).replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Assalam-o-Alaikum! I want to book a unit in ${project.title}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Booking Desk</span>
              </a>
            </div>
          </div>
        );

      case 'disclaimer':
        return (
          <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 text-xs text-slate-500 space-y-2">
            <h4 className="font-bold text-slate-800">{section.title}</h4>
            {(section.content?.legalNotes || [section.subtitle]).map(
              (note: string, nIdx: number) => (
                <p key={nIdx}>{note}</p>
              )
            )}
          </div>
        );

      case 'enquiry':
      case 'lead_form':
        return (
          <div className="max-w-6xl mx-auto">
            <AdvibeEnquirySection project={project} />
          </div>
        );

      default:
        return null;
    }
  }
};

export default AdvibeProjectScrollyPage;

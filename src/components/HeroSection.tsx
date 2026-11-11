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
  Layers,
  MapPin,
  Box,
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
  RotateCcw,
  Settings,
  CheckCircle2,
  ExternalLink
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

function parseVideoEmbedInfo(url: string, isMuted: boolean): {
  type: 'youtube' | 'vimeo' | 'native';
  src: string;
} {
  const trimmed = (url || '').trim() || SHOWROOM_VIDEOS.architecturalFlyover;
  const ytMatch = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    return {
      type: 'youtube',
      src: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=${
        isMuted ? 1 : 0
      }&loop=1&playlist=${ytMatch[1]}&rel=0`
    };
  }
  const vimeoMatch = trimmed.match(
    /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/
  );
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: 'vimeo',
      src: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=${
        isMuted ? 1 : 0
      }&loop=1`
    };
  }
  return { type: 'native', src: trimmed };
}

function resolveSlideTourCategory(slide: HeroSlide): {
  tourCategory: Exclude<TourDeckCategory, 'all_showroom'>;
  propertyCategory: PropertyCategory;
  divisionTag: string;
  codePrefix: string;
  fallbackImg: string;
  videoUrl: string;
  videoTitle: string;
} {
  const sampleCat = slide.samplePropertyData?.category;
  const tagText = `${slide.categoryTag || ''} ${slide.title || ''} ${slide.subtitle || ''}`.toLowerCase();
  const explicitVideo = (
    slide.videoUrl ||
    slide.samplePropertyData?.virtualTourVideoUrl ||
    ''
  ).trim();
  const explicitVideoTitle =
    (
      slide.videoTitle ||
      slide.samplePropertyData?.virtualTourVideoTitle ||
      ''
    ).trim() || `${slide.title} — 360° Video Tour`;

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
      videoUrl: explicitVideo || SHOWROOM_VIDEOS.capsuleInteriorWalk,
      videoTitle: explicitVideoTitle
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
      videoUrl: explicitVideo || SHOWROOM_VIDEOS.villaDroneOrbit,
      videoTitle: explicitVideoTitle
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
      videoUrl: explicitVideo || SHOWROOM_VIDEOS.architecturalFlyover,
      videoTitle: explicitVideoTitle
    };
  }

  return {
    tourCategory: 'properties_plots_villas',
    propertyCategory: 'residential',
    divisionTag: 'RI8CLICK CONSORTIUM // VERIFIED PLOTS & LUXURY VILLAS',
    codePrefix: 'PROP',
    fallbackImg: CONSTRUCTED_HOUSES_GALLERY.house1_modernFaisalHillsVilla,
    videoUrl: explicitVideo || SHOWROOM_VIDEOS.villaDroneOrbit,
    videoTitle: explicitVideoTitle
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectCategoryFilter,
  onExploreClick,
  onOpen3DTour,
  slides = [],
  properties = [],
  canManageDeck = false,
  onOpenBannerAdmin
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
        elevation: `${slide.tourRoomsCount || Math.max(slideGallery.length, 4)} ANGLES`,
        fov: '88° WIDE',
        imageUrl: primaryImg,
        secondaryImageUrl: secondaryImg,
        fallbackUrl: meta.fallbackImg,
        galleryImages: slideGallery.length > 0 ? slideGallery : [primaryImg],
        videoUrl: meta.videoUrl,
        videoTitle: meta.videoTitle,
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
        videoTitle: prop.virtualTourVideoTitle || `${prop.title} — 360° Video Tour`,
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
            videoTitle: 'Faisal Hills 360° Video Tour',
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

  const activeVideoEmbed = useMemo(
    () =>
      parseVideoEmbedInfo(
        videoFailed ? SHOWROOM_VIDEOS.architecturalFlyover : activeWaypoint.videoUrl,
        isMuted
      ),
    [activeWaypoint.videoUrl, isMuted, videoFailed]
  );

  useEffect(() => {
    if (isVideoTourActive && activeVideoEmbed.type === 'native' && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        setVideoFailed(true);
      });
    }
  }, [isVideoTourActive, activeVideoEmbed.src, activeVideoEmbed.type]);

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

  // Build a complete Property object for VirtualTour3DModal when opening 360° Tour from Hero Banner
  const handleLaunchFull360Modal = (wp: CameraWaypoint) => {
    const gallery =
      wp.galleryImages && wp.galleryImages.length > 0
        ? wp.galleryImages
        : [wp.imageUrl, wp.secondaryImageUrl].filter(Boolean);
    const tourPayload: Property = {
      id: `hero-tour-${wp.id}`,
      title: wp.headline,
      tagline: wp.subLabel,
      description: wp.description,
      category:
        wp.propertyCategory === 'all' ? 'modular' : wp.propertyCategory,
      type: 'Capsule Smart House',
      purpose: 'for_sale',
      price: 8500000,
      priceFormatted: wp.valuation,
      currency: 'PKR',
      location: {
        province: 'Punjab',
        city: wp.locationBadge.split('•')[1]?.trim() || 'Taxila / Islamabad',
        society: wp.locationBadge.split('•')[0]?.trim() || 'Faisal Hills',
        address: wp.locationBadge
      },
      area: wp.elevation,
      areaUnit: 'Sq Ft',
      features: wp.specs.map(s => s.spec),
      images: gallery,
      watermark: true,
      agencyId: 'agency-1',
      agentName: 'Malik Zeeshan Adil',
      agentPhone: '+92 336-5666727',
      agentWhatsApp: '923365666727',
      agentAvatar: '',
      agentCompany: 'Ri8click Consortium',
      agentRating: 4.95,
      createdAt: new Date().toISOString().split('T')[0],
      virtualTourVideoUrl: wp.videoUrl,
      virtualTourVideoTitle: wp.videoTitle || `${wp.headline} — 360° Video Tour`,
      hasVirtualTour: true
    };
    onOpen3DTour(tourPayload);
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

  const activeSlideGallery =
    activeWaypoint.galleryImages && activeWaypoint.galleryImages.length > 0
      ? activeWaypoint.galleryImages
      : [activeWaypoint.imageUrl];

  return (
    <section
      ref={heroStageRef}
      className="relative min-h-[600px] sm:min-h-[680px] lg:min-h-[760px] flex flex-col justify-between overflow-hidden bg-slate-900 text-white select-none"
    >
      {/* 1. FULL-BLEED BACKGROUND STAGE */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
        <AnimatePresence mode="sync">
          {isVideoTourActive ? (
            <motion.div
              key={`video-stream-${activeWaypoint.id}-${activeVideoEmbed.src}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0 w-full h-full bg-black"
            >
              {activeVideoEmbed.type === 'youtube' ||
              activeVideoEmbed.type === 'vimeo' ? (
                <iframe
                  src={activeVideoEmbed.src}
                  title={activeWaypoint.videoTitle || activeWaypoint.headline}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  ref={videoRef}
                  key={activeVideoEmbed.src}
                  src={activeVideoEmbed.src}
                  poster={resolvedImageUrl}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  controls={false}
                  onError={() => setVideoFailed(true)}
                  style={atmosphereStyle}
                  className="w-full h-full object-cover object-center"
                />
              )}
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
          className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
            isCinemaTheaterMode || !showLeftDescription
              ? 'bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-slate-950/30'
              : 'bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent'
          }`}
        />
      </div>

      {/* 2. CATEGORY BAR */}
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

      {/* 4. MAIN FOREGROUND STAGE & PORTFOLIO DECK */}
      <div className="relative z-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 pb-5 flex-1 flex flex-col justify-between w-full">
        {/* Top Utility Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-xl border border-white/20 max-w-full">
              <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-white truncate">
                Ri8click Consortium — Capsule Homes, Highrises &amp; German UPVC
              </span>
            </div>

            {canManageDeck && onOpenBannerAdmin && (
              <button
                type="button"
                onClick={onOpenBannerAdmin}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-extrabold border border-blue-400/40 cursor-pointer shadow-sm"
              >
                <Settings className="w-3 h-3 text-amber-300" />
                <span>Manage Deck &amp; 360° Video</span>
              </button>
            )}
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

            {/* FUNCTIONAL 360° VIDEO TOUR BUTTON */}
            <button
              type="button"
              onClick={() => {
                setVideoFailed(false);
                setIsVideoTourActive(prev => !prev);
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] font-extrabold flex items-center gap-1.5 border transition-all cursor-pointer backdrop-blur-xl ${
                isVideoTourActive
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md'
                  : 'bg-indigo-600/90 hover:bg-indigo-500 text-white border-indigo-400/50 shadow-sm'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>
                {isVideoTourActive ? '360° Video Tour: ON' : '360° Video Tour'}
              </span>
            </button>

            {isVideoTourActive && (
              <>
                <button
                  type="button"
                  onClick={() => setIsMuted(prev => !prev)}
                  className="p-1.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 backdrop-blur-xl border border-white/25 text-white transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute Video Audio' : 'Mute Video Audio'}
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleLaunchFull360Modal(activeWaypoint)}
                  className="px-2.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-extrabold flex items-center gap-1 cursor-pointer shadow-sm"
                  title="Open Fullscreen 360° Video & Room Studio"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="hidden sm:inline">Fullscreen Studio</span>
                </button>
              </>
            )}

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

        {/* Center / Bottom Content Area */}
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
                    onClick={() => handleLaunchFull360Modal(activeWaypoint)}
                    className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold cursor-pointer flex items-center gap-1.5 shadow-lg"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Launch 360° &amp; Video Studio</span>
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
                {/* Deck Header Bar */}
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
                      title={
                        isDeckMinimized
                          ? 'Expand Portfolio Deck'
                          : 'Minimize Portfolio Deck'
                      }
                    >
                      {isDeckMinimized ? (
                        <Maximize2 className="w-3.5 h-3.5" />
                      ) : (
                        <Minimize2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expandable Deck Body */}
                {!isDeckMinimized && (
                  <div className="p-3.5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase text-amber-300 block truncate">
                          {activeWaypoint.subLabel}
                        </span>
                        <h3 className="text-sm font-extrabold text-white line-clamp-1">
                          {activeWaypoint.headline}
                        </h3>
                      </div>
                      <span className="px-2.5 py-1 rounded-xl bg-amber-400 text-slate-950 text-xs font-black shrink-0">
                        {activeWaypoint.valuation}
                      </span>
                    </div>

                    {/* Room / Angle Thumbnails Strip */}
                    {activeSlideGallery.length > 1 && (
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold text-slate-300 flex items-center justify-between">
                          <span>Room Angles ({activeSlideGallery.length})</span>
                          <span>Click to switch view</span>
                        </div>
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                          {activeSlideGallery.map((imgUrl, gIdx) => {
                            const isCurrentAngle =
                              resolvedImageUrl === imgUrl && !isVideoTourActive;
                            return (
                              <button
                                key={`${imgUrl}-${gIdx}`}
                                type="button"
                                onClick={() => {
                                  setIsVideoTourActive(false);
                                  setCustomActiveImageOverride(imgUrl);
                                }}
                                className={`relative w-14 h-10 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                                  isCurrentAngle
                                    ? 'border-amber-400 scale-105'
                                    : 'border-white/15 opacity-75 hover:opacity-100'
                                }`}
                              >
                                <img
                                  src={imgUrl}
                                  alt={`Angle ${gIdx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons inside Deck */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setVideoFailed(false);
                          setIsVideoTourActive(prev => !prev);
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                          isVideoTourActive
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        }`}
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>
                          {isVideoTourActive ? 'Stop Video' : '360° Video Tour'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLaunchFull360Modal(activeWaypoint)}
                        className="py-2 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-white/20 cursor-pointer"
                      >
                        <Compass className="w-3.5 h-3.5 text-amber-300" />
                        <span>360° Studio</span>
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
          <div className="pt-3 grid grid-cols-2 lg:grid-cols-4 gap-2">
            {activeWaypoint.specs.map(item => (
              <div
                key={item.id}
                className="px-3 py-2 rounded-xl bg-slate-950/70 backdrop-blur-xl border border-white/15 flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[9px] font-bold uppercase text-amber-300/90">
                    {item.title}
                  </div>
                  <div className="text-[11px] font-bold text-white truncate">
                    {item.spec}
                  </div>
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

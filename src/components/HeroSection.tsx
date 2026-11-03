import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  PhoneCall,
  Sparkles,
  MapPin,
  ArrowRight,
  Play,
  Pause,
  Video,
  Camera,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  SlidersHorizontal,
  Box,
  Home,
  Building2,
  Layers,
  HardHat,
  CheckCircle2,
  ChevronUp,
  ChevronDown,
  Info,
  FileText,
  GripHorizontal,
  RotateCcw,
  ImageOff,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { HeroSlide, PropertyCategory } from '../types';

interface HeroSectionProps {
  slides: HeroSlide[];
  onExploreClick: () => void;
  onContactAgentClick: () => void;
  onSelectCategoryFilter: (category: PropertyCategory) => void;
  onOpen3DTour: (sample: any) => void;
}

export type TourDeckCategory =
  | 'all_showroom'
  | 'properties_plots_villas'
  | 'highrise_projects'
  | 'capsule_containers'
  | 'upvc_construction';

interface ArchitecturalSpec {
  id: string;
  title: string;
  spec: string;
}

interface BrokenImageRecord {
  brokenUrl: string;
  replacedWithUrl: string;
  waypointLabel: string;
  timestamp: string;
}

interface CameraWaypoint {
  id: string;
  tourCategory: TourDeckCategory;
  propertyCategory: PropertyCategory;
  divisionTag: string;
  code: string;
  label: string;
  subLabel: string;
  headline: string;
  description: string;
  valuation: string;
  locationBadge: string;
  focalLength: string;
  altitude: string;
  fov: string;
  imageUrl: string;
  secondaryImageUrl?: string;
  fallbackUrl: string;
  legacyBrokenUrl?: string;
  galleryImages?: string[];
  videoUrl: string;
  motionOrigin: string;
  panX: [string, string];
  panY: [string, string];
  scaleRange: [number, number];
  specs: ArchitecturalSpec[];
}

// ============================================================================
// 1. VERIFIED ACTIVE HIGHRISE PROJECT IMAGES FROM TOWERS.PK/ISLAMABAD
// ============================================================================

export const ISLAMABAD_HIGHRISE_PROJECTS_GALLERY = {
  centaurusTower: 'https://towers.pk/wp-content/uploads/2023/11/Centaurus_Mall-1.webp',
  stateLifeTower: 'https://towers.pk/wp-content/uploads/2023/12/STATE-LIFE-TOWER-min.jpg',
  ufoneJinnahAvenue: 'https://towers.pk/wp-content/uploads/2023/06/Jinnah-Avenue-Islamabad.jpg',
  iseTowerBlueArea: 'https://towers.pk/wp-content/uploads/2023/08/ise-tower-islamabad.jpg',
  gigaMallTower: 'https://towers.pk/wp-content/uploads/2024/01/image-4-34-1024x640-1-e1704435577931.jpg',
  skyparkOneGulberg: 'https://towers.pk/wp-content/uploads/2024/06/Skypark-One.jpg',
  oneConstitutionAve: 'https://towers.pk/wp-content/uploads/2023/11/6ByJSAN.jpg',
  grandOrchardDha: 'https://towers.pk/wp-content/uploads/2023/08/1664948637921-transformed.png',
  greenTrustTower:
    'https://towers.pk/wp-content/uploads/2023/08/stock-photo-a-beautiful-view-of-capital-city-islamabad-hi-rise-buildings-islamabad-pakistan-march-2135740301-transformed-1-e1691756641256.jpeg',
  saudiPakTower: 'https://towers.pk/wp-content/uploads/2024/01/saudi-pak-tower-building-e1706706739861.jpg',
  ogdclTower: 'https://towers.pk/wp-content/uploads/2024/04/Ogdclofficeislamabad.jpg',
  lignumTower: 'https://towers.pk/wp-content/uploads/2023/08/44649726-800x600-transformed-e1691749295923.jpeg',

  fallbackHighrise1:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=95',
  fallbackHighrise2:
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=95',
  fallbackHighrise3:
    'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=2400&q=95',
  fallbackHighrise4:
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2400&q=95'
};

// ============================================================================
// 2. CONTEMPORARY CAPSULE & CONTAINER SMART HOUSES (REFERENCE VISUALS + HD FALLBACKS)
// ============================================================================

export const MODULAR_CAPSULE_GALLERY = {
  cap8_q3ForestCabinPod: 'https://www.genspark.ai/api/files/s/pSySUzgg',
  cap9_k5WaterfrontPod: 'https://www.genspark.ai/api/files/s/OypEiCb2',
  cap10_rooftopDeckContainerVilla: 'https://www.genspark.ai/api/files/s/3jIuxLrV',
  cap11_hexLitBlackContainerPod: 'https://www.genspark.ai/api/files/s/K4lfut6W',
  cap12_curvedCornerGlassContainer: 'https://www.genspark.ai/api/files/s/bl8vngPB',
  cap13_v2124DoubleDeckerCapsule: 'https://www.genspark.ai/api/files/s/u84KzdvI',
  cap14_lakesideCurvedGlassCapsule: 'https://www.genspark.ai/api/files/s/I6HwjuLB',

  fallbackCapsule1:
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=2400&q=95',
  fallbackCapsule2:
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=95',
  fallbackCapsule3:
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2400&q=95',
  fallbackCapsule4:
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=95'
};

export const MODULAR_CAPSULE_SEQUENCE_LIST = [
  MODULAR_CAPSULE_GALLERY.cap8_q3ForestCabinPod,
  MODULAR_CAPSULE_GALLERY.cap9_k5WaterfrontPod,
  MODULAR_CAPSULE_GALLERY.cap10_rooftopDeckContainerVilla,
  MODULAR_CAPSULE_GALLERY.cap11_hexLitBlackContainerPod,
  MODULAR_CAPSULE_GALLERY.cap12_curvedCornerGlassContainer,
  MODULAR_CAPSULE_GALLERY.cap13_v2124DoubleDeckerCapsule,
  MODULAR_CAPSULE_GALLERY.cap14_lakesideCurvedGlassCapsule
];

export const CONSTRUCTED_HOUSES_GALLERY = {
  house1_whiteVilla:
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=95',
  house2_modernEstate:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=95',
  house3_stoneGlassMansion:
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=95'
};

export const UPVC_AND_INTERIOR_GALLERY = {
  upvc1_slidingPatioDoors:
    'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=2400&q=95',
  upvc2_casementTiltTurnWindows:
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2400&q=95',
  upvc3_acousticGlassPartitions:
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=95',
  upvc4_conservatorySkylights:
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2400&q=95'
};

const SHOWROOM_VIDEOS = {
  architecturalFlyover:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  luxuryInteriorWalk:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
  villaDroneOrbit:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
};

const INITIAL_REPLACED_BROKEN_LINKS: BrokenImageRecord[] = [
  {
    brokenUrl: 'https://www.genspark.ai/api/files/s/qpljElLm',
    replacedWithUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.centaurusTower,
    waypointLabel: 'The Centaurus & Citadel 7 Highrise',
    timestamp: 'Replaced with Active Towers.pk Media'
  },
  {
    brokenUrl: 'https://www.genspark.ai/api/files/s/JBLytyZd',
    replacedWithUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.gigaMallTower,
    waypointLabel: 'Giga Mall & WTC Highrise Project',
    timestamp: 'Replaced with Active Towers.pk Media'
  },
  {
    brokenUrl: 'https://www.genspark.ai/api/files/s/6C54AO5M',
    replacedWithUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.ufoneJinnahAvenue,
    waypointLabel: 'Ufone & ISE Tower II Blue Area',
    timestamp: 'Replaced with Active Towers.pk Media'
  },
  {
    brokenUrl: 'https://www.genspark.ai/api/files/s/NC4klaYu',
    replacedWithUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.skyparkOneGulberg,
    waypointLabel: 'One Constitution Ave & Skypark One',
    timestamp: 'Replaced with Active Towers.pk Media'
  },
  {
    brokenUrl: 'https://www.genspark.ai/api/files/s/l7r4er7D',
    replacedWithUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.stateLifeTower,
    waypointLabel: 'State Life, Green Trust & Grand Orchard',
    timestamp: 'Replaced with Active Towers.pk Media'
  }
];

// ============================================================================
// 3. MASTER WAYPOINTS (CAPSULES + HIGHRISES + VILLAS + UPVC MODELS)
// ============================================================================

const MASTER_VIRTUAL_TOUR_WAYPOINTS: CameraWaypoint[] = [
  // ---------------- PILLAR 1: CONTAINER & CAPSULE SMART HOUSES (01 TO 07) ----------------
  {
    id: 'capsule-seq-8-q3',
    tourCategory: 'capsule_containers',
    propertyCategory: 'modular',
    divisionTag: 'RI8CLICK CONSORTIUM // CAPSULE & CONTAINER SMART HOUSES (01 / 07)',
    code: 'CAPSULE 01 // MODEL Q3 PITCHED-ROOF CABIN POD',
    label: 'Q3 Modular Cabin Pod',
    subLabel: 'Aerodynamic Pitched-Roof Smart Cabin with UPVC French Doors & Panoramic Window',
    headline: 'Model Q3 Pitched-Roof Modular Smart Cabin House',
    description:
      'The Q3 prefabricated modular cabin pod combines a pitched alpine roof profile with curved aviation-grade aluminum panels, matte-black UPVC double-glazed French entry doors, and floor-to-ceiling forest-view glazing.',
    valuation: 'PKR 48 Lakh – 68 Lakh',
    locationBadge: 'Turnkey Delivery: Murree, Nathia Gali, Taxila & Islamabad Farms',
    focalLength: '24MM PRIME',
    altitude: 'FOREST DECK',
    fov: '86° WIDE',
    imageUrl: MODULAR_CAPSULE_GALLERY.cap8_q3ForestCabinPod,
    secondaryImageUrl: MODULAR_CAPSULE_GALLERY.cap14_lakesideCurvedGlassCapsule,
    fallbackUrl: MODULAR_CAPSULE_GALLERY.fallbackCapsule1,
    galleryImages: MODULAR_CAPSULE_SEQUENCE_LIST,
    videoUrl: SHOWROOM_VIDEOS.architecturalFlyover,
    motionOrigin: 'center center',
    panX: ['-0.6%', '0.6%'],
    panY: ['0%', '-0.5%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'cap8-1',
        title: 'Q3 Pitched-Roof All-Weather Shell',
        spec: 'Engineered for snowfall and mountain rain with polyurethane thermal insulation.'
      },
      {
        id: 'cap8-2',
        title: 'Ri8click UPVC Double-Glazed Framing',
        spec: 'Acoustic Low-E tempered glass windows and integrated composite entrance porch.'
      }
    ]
  },
  {
    id: 'capsule-seq-9-k5',
    tourCategory: 'capsule_containers',
    propertyCategory: 'modular',
    divisionTag: 'RI8CLICK CONSORTIUM // CAPSULE & CONTAINER SMART HOUSES (02 / 07)',
    code: 'CAPSULE 02 // L-SHAPED LOFT CONTAINER INTERIOR',
    label: 'L-Shaped Loft Container Layout',
    subLabel: 'Dual-Module Cutaway Container Home with Elevated Timber Bedroom Loft & Full Kitchen',
    headline: 'L-Shaped Dual-Container Smart Villa Interior & Mezzanine Loft',
    description:
      'Architectural cutaway showcase of our dual-unit L-shaped container residence featuring an elevated wooden mezzanine master bedroom with study desk underneath, full gourmet kitchen, dining zone, luxury glass-partitioned bathroom, and panoramic lounge.',
    valuation: 'PKR 62 Lakh – 88 Lakh',
    locationBadge: 'Custom Turnkey Layout • Farmhouses, Resorts & Urban Plots',
    focalLength: '20MM WIDE',
    altitude: 'ISOMETRIC CUTAWAY',
    fov: '92° EXPANSIVE',
    imageUrl: MODULAR_CAPSULE_GALLERY.cap9_k5WaterfrontPod,
    secondaryImageUrl: MODULAR_CAPSULE_GALLERY.cap10_rooftopDeckContainerVilla,
    fallbackUrl: MODULAR_CAPSULE_GALLERY.fallbackCapsule2,
    galleryImages: MODULAR_CAPSULE_SEQUENCE_LIST,
    videoUrl: SHOWROOM_VIDEOS.architecturalFlyover,
    motionOrigin: 'center center',
    panX: ['0.6%', '-0.6%'],
    panY: ['0%', '-0.4%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'cap9-1',
        title: 'Mezzanine Bedroom Loft & Study Nook',
        spec: 'Space-optimized timber loft bed with integrated home office and warm recessed LED lighting.'
      },
      {
        id: 'cap9-2',
        title: 'Complete Kitchen, Lounge & Wet/Dry Bath',
        spec: 'Includes full cabinetry, 4-seat dining table, sofa lounge, and UPVC glass shower enclosure.'
      }
    ]
  },
  {
    id: 'capsule-seq-10-container-deck',
    tourCategory: 'capsule_containers',
    propertyCategory: 'modular',
    divisionTag: 'RI8CLICK CONSORTIUM // CAPSULE & CONTAINER SMART HOUSES (03 / 07)',
    code: 'CAPSULE 03 // ROOFTOP DECK CONTAINER VILLA',
    label: 'Rooftop Deck Container Villa',
    subLabel: 'Luxury White Container Home with Wraparound Timber Patio & Upper Sky Lounge',
    headline: 'Luxury Container Villa with Rooftop Terrace & Timber Deck',
    description:
      'Architectural shipping-container residence finished in crisp white thermal coating, featuring full-span sliding UPVC glass walls, a gourmet kitchen island, wraparound hardwood deck, and an upper-level railed rooftop lounge.',
    valuation: 'PKR 52 Lakh – 78 Lakh',
    locationBadge: 'Faisal Hills, Chak Shahzad & B-17 Farm Estates',
    focalLength: '24MM ARCHITECTURAL',
    altitude: '2-LEVEL DECK',
    fov: '86° WIDE',
    imageUrl: MODULAR_CAPSULE_GALLERY.cap10_rooftopDeckContainerVilla,
    secondaryImageUrl: MODULAR_CAPSULE_GALLERY.cap11_hexLitBlackContainerPod,
    fallbackUrl: MODULAR_CAPSULE_GALLERY.fallbackCapsule2,
    galleryImages: MODULAR_CAPSULE_SEQUENCE_LIST,
    videoUrl: SHOWROOM_VIDEOS.architecturalFlyover,
    motionOrigin: 'center center',
    panX: ['-0.6%', '0.6%'],
    panY: ['0%', '-0.5%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'cap10-1',
        title: 'Upper Rooftop Dining & Sky Terrace',
        spec: 'Reinforced structural roof deck with steel cable railings and outdoor seating.'
      },
      {
        id: 'cap10-2',
        title: 'Full-Width Sliding UPVC Glass Wall',
        spec: 'Seamlessly merges the indoor kitchen and lounge with the outdoor timber patio.'
      }
    ]
  },
  {
    id: 'capsule-seq-11-hex-black',
    tourCategory: 'capsule_containers',
    propertyCategory: 'modular',
    divisionTag: 'RI8CLICK CONSORTIUM // CAPSULE & CONTAINER SMART HOUSES (04 / 07)',
    code: 'CAPSULE 04 // HEX-LIT DESIGNER CONTAINER POD',
    label: 'Hex-Lit Designer Container Pod',
    subLabel: 'Matte Charcoal Chamfered Container Studio with Warm Architectural Perimeter Lighting',
    headline: 'Chamfered Matte-Black Designer Container Smart Pod',
    description:
      'Ultra-modern chamfered-frame container villa with recessed warm amber perimeter LED lighting, geometric laser-cut backlit feature walls, and frameless panoramic sliding glass.',
    valuation: 'PKR 64 Lakh – 88 Lakh',
    locationBadge: 'Executive Farmhouses, Glamping Resorts & Rooftops',
    focalLength: '22MM WIDE',
    altitude: 'GARDEN PAVILION',
    fov: '88° WIDE',
    imageUrl: MODULAR_CAPSULE_GALLERY.cap11_hexLitBlackContainerPod,
    secondaryImageUrl: MODULAR_CAPSULE_GALLERY.cap12_curvedCornerGlassContainer,
    fallbackUrl: MODULAR_CAPSULE_GALLERY.fallbackCapsule3,
    galleryImages: MODULAR_CAPSULE_SEQUENCE_LIST,
    videoUrl: SHOWROOM_VIDEOS.architecturalFlyover,
    motionOrigin: 'center center',
    panX: ['0.5%', '-0.5%'],
    panY: ['0%', '-0.4%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'cap11-1',
        title: 'Chamfered Portal Frame & Warm LED Halo',
        spec: 'Architectural bevelled steel portal with weatherproof outdoor ambiance lighting.'
      },
      {
        id: 'cap11-2',
        title: 'Bespoke Hexagonal Backlit Interior',
        spec: 'Turnkey designer lounge, acoustic ceiling slats, and smart climate automation.'
      }
    ]
  },
  {
    id: 'capsule-seq-12-executive-studio',
    tourCategory: 'capsule_containers',
    propertyCategory: 'modular',
    divisionTag: 'RI8CLICK CONSORTIUM // CAPSULE & CONTAINER SMART HOUSES (05 / 07)',
    code: 'CAPSULE 05 // CURVED-CORNER EXECUTIVE STUDIO POD',
    label: 'Curved-Corner Studio Container',
    subLabel: 'Minimalist White Container Villa & Executive Office with Rounded UPVC Frames',
    headline: 'Curved-Corner Glass Container Villa & Executive Studio',
    description:
      'Precision-crafted white corrugated container module featuring signature rounded-corner black aluminum/UPVC window frames, linear recessed ceiling lights, and a private executive workspace and lounge.',
    valuation: 'PKR 46 Lakh – 65 Lakh',
    locationBadge: 'Islamabad, Rawalpindi, Taxila & Lahore Delivery',
    focalLength: '24MM PRIME',
    altitude: 'PATIO LEVEL',
    fov: '85° WIDE',
    imageUrl: MODULAR_CAPSULE_GALLERY.cap12_curvedCornerGlassContainer,
    secondaryImageUrl: MODULAR_CAPSULE_GALLERY.cap13_v2124DoubleDeckerCapsule,
    fallbackUrl: MODULAR_CAPSULE_GALLERY.fallbackCapsule4,
    galleryImages: MODULAR_CAPSULE_SEQUENCE_LIST,
    videoUrl: SHOWROOM_VIDEOS.architecturalFlyover,
    motionOrigin: 'center center',
    panX: ['-0.5%', '0.5%'],
    panY: ['0%', '-0.4%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'cap12-1',
        title: 'Rounded-Corner Structural UPVC Glazing',
        spec: 'Dual-aspect floor-to-ceiling glass walls with thermal-break aluminum profiles.'
      },
      {
        id: 'cap12-2',
        title: 'Dual-Use Residence or Corporate Pod',
        spec: 'Ideal as a luxury guest suite, private garden office, or site sales gallery.'
      }
    ]
  },
  {
    id: 'capsule-seq-13-v2124-duplex',
    tourCategory: 'capsule_containers',
    propertyCategory: 'modular',
    divisionTag: 'RI8CLICK CONSORTIUM // CAPSULE & CONTAINER SMART HOUSES (06 / 07)',
    code: 'CAPSULE 06 // V2124 DOUBLE-DECKER CAPSULE VILLA',
    label: 'V2124 Double-Decker Villa',
    subLabel: 'Two-Story Stacked Curved-Glass Capsule Villa with Upper Master Sky Suite',
    headline: 'Model V2124 Double-Decker Stacked Capsule Villa',
    description:
      'Two-story stacked modular capsule villa offering an expansive ground-floor living and dining pavilion with sliding glass walls and an upper-deck V2124 panoramic master bedroom suite.',
    valuation: 'PKR 1.35 Crore – 1.85 Crore',
    locationBadge: 'Luxury Farmhouses, Hill Resorts & Urban Penthouses',
    focalLength: '20MM ARCHITECTURAL',
    altitude: '2-STORY DUPLEX',
    fov: '90° WIDE',
    imageUrl: MODULAR_CAPSULE_GALLERY.cap13_v2124DoubleDeckerCapsule,
    secondaryImageUrl: MODULAR_CAPSULE_GALLERY.cap14_lakesideCurvedGlassCapsule,
    fallbackUrl: MODULAR_CAPSULE_GALLERY.fallbackCapsule3,
    galleryImages: MODULAR_CAPSULE_SEQUENCE_LIST,
    videoUrl: SHOWROOM_VIDEOS.architecturalFlyover,
    motionOrigin: 'center center',
    panX: ['0.6%', '-0.6%'],
    panY: ['0.3%', '-0.3%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'cap13-1',
        title: 'Upper-Deck V2124 Panoramic Master Suite',
        spec: 'Second-story curved observation glass suite with warm architectural cove lighting.'
      },
      {
        id: 'cap13-2',
        title: 'Open-Plan Ground Lounge & Kitchen',
        spec: 'Full-span sliding UPVC glass doors opening onto a raised composite timber deck.'
      }
    ]
  },
  {
    id: 'capsule-seq-14-lakeside-pod',
    tourCategory: 'capsule_containers',
    propertyCategory: 'modular',
    divisionTag: 'RI8CLICK CONSORTIUM // CAPSULE & CONTAINER SMART HOUSES (07 / 07)',
    code: 'CAPSULE 07 // LAKESIDE CURVED-GLASS CAPSULE POD',
    label: 'Lakeside Panorama Capsule',
    subLabel: 'Curved-Glass Waterfront Capsule Home with Stepping-Stone Path & Patio Deck',
    headline: 'Lakeside Curved-Glass Observation Capsule House',
    description:
      'Waterfront aerodynamic capsule residence featuring wrap-around curved observation glass, operable casement ventilation windows, fluorocarbon aluminum cladding, and a serene lakeside timber deck.',
    valuation: 'PKR 68 Lakh – 96 Lakh',
    locationBadge: 'Lakeside Estates, Resorts & Private Farmhouses',
    focalLength: '18MM ULTRA-WIDE',
    altitude: 'LAKESIDE DECK',
    fov: '94° EXPANSIVE',
    imageUrl: MODULAR_CAPSULE_GALLERY.cap14_lakesideCurvedGlassCapsule,
    secondaryImageUrl: MODULAR_CAPSULE_GALLERY.cap8_q3ForestCabinPod,
    fallbackUrl: MODULAR_CAPSULE_GALLERY.fallbackCapsule1,
    galleryImages: MODULAR_CAPSULE_SEQUENCE_LIST,
    videoUrl: SHOWROOM_VIDEOS.architecturalFlyover,
    motionOrigin: 'center center',
    panX: ['-0.6%', '0.6%'],
    panY: ['0%', '-0.4%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'cap14-1',
        title: 'Seamless Curved Low-E Observation Glass',
        spec: 'Double-glazed thermal and acoustic curved glass with zero condensation.'
      },
      {
        id: 'cap14-2',
        title: 'Turnkey Waterfront & Resort Setup',
        spec: 'Includes smart climate control, luxury bathroom, and prefabricated patio decking.'
      }
    ]
  },

  // ---------------- PILLAR 2: HIGHRISE PROJECTS (TOWERS.PK/ISLAMABAD VERIFIED DATA) ----------------
  {
    id: 'highrise-centaurus-citadel-isb',
    tourCategory: 'highrise_projects',
    propertyCategory: 'commercial',
    divisionTag: 'RI8CLICK CONSORTIUM // TOWERS.PK ISLAMABAD HIGHRISE PROJECTS',
    code: 'ISB 01 // THE CENTAURUS & CITADEL 7 HIGHRISE — BLUE AREA',
    label: 'The Centaurus & Citadel 7',
    subLabel: '42-Storey (656 Ft) Iconic Mixed-Use Skyscraper & 20-Storey Corporate Highrise on Jinnah Avenue',
    headline: 'The Centaurus & Citadel 7 Highrise Projects — Blue Area, Islamabad',
    description:
      'Verified on Towers.pk/Islamabad: Flagship Blue Area highrise projects anchored by The Centaurus (42 floors, 656 ft height by Pak Gulf Construction / Odeion Developers) and Citadel 7 (20 floors, 272 ft). Features 5-storey luxury retail malls, Grade-A corporate offices, rooftop gardens, 24/7 concierge security, and panoramic Margalla Hills views.',
    valuation: 'Shops PKR 1.5–3.0 Cr • Offices 2.0–3.5 Cr • Suites 3.0–6.0 Cr',
    locationBadge: 'Main Jinnah Avenue, F-8 / Blue Area, Islamabad',
    focalLength: '24MM ARCHITECTURAL',
    altitude: '656 FT / 42 FLOORS',
    fov: '85° WIDE',
    imageUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.centaurusTower,
    secondaryImageUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.ufoneJinnahAvenue,
    fallbackUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.fallbackHighrise1,
    legacyBrokenUrl: 'https://www.genspark.ai/api/files/s/qpljElLm',
    galleryImages: [
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.centaurusTower,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.ufoneJinnahAvenue,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.stateLifeTower,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.iseTowerBlueArea
    ],
    videoUrl: SHOWROOM_VIDEOS.architecturalFlyover,
    motionOrigin: 'center center',
    panX: ['-0.6%', '0.6%'],
    panY: ['0%', '-0.6%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'hr1-spec-1',
        title: '42 Floors / 656 Feet Mixed-Use Landmark',
        spec: 'Towers.pk Islamabad verified skyscraper with high-speed elevators, underground parking & central HVAC.'
      },
      {
        id: 'hr1-spec-2',
        title: 'High-Yield Corporate & Retail Podium',
        spec: 'Surrounded by Pak Tower, Sapphire Tower, Ufone Tower, and ISE Towers in Islamabad CBD.'
      }
    ]
  },
  {
    id: 'highrise-giga-mall-wtc-isb',
    tourCategory: 'highrise_projects',
    propertyCategory: 'commercial',
    divisionTag: 'RI8CLICK CONSORTIUM // TOWERS.PK ISLAMABAD HIGHRISE PROJECTS',
    code: 'ISB 02 // GIGA MALL & DEFENCE EXECUTIVE HIGHRISE — DHA',
    label: 'Giga Mall & WTC Highrise',
    subLabel: 'Ranked #13 Tallest in Islamabad — Multi-Storey Retail Megamall, Corporate Offices & Luxury Suites',
    headline: 'Giga Mall & World Trade Center Highrise Project — DHA Islamabad',
    description:
      'Listed on Towers.pk/Islamabad (#19 Tallest in Pakistan, #13 in Islamabad): Developed by the Giga Group in DHA Phase 2 along Main GT Road. Integrates international retail brands, food courts, modern corporate office floors, and luxury residential highrise towers with full power backup and spacious multi-level parking.',
    valuation: 'Offices PKR 2.0–15.0 Crore • Luxury Suites 2.5–10.0 Crore',
    locationBadge: 'Main GT Road, DHA Phase 2, Islamabad',
    focalLength: '28MM DRONE',
    altitude: 'RANKED #13 IN ISB',
    fov: '82° STANDARD',
    imageUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.gigaMallTower,
    secondaryImageUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.grandOrchardDha,
    fallbackUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.fallbackHighrise2,
    legacyBrokenUrl: 'https://www.genspark.ai/api/files/s/JBLytyZd',
    galleryImages: [
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.gigaMallTower,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.grandOrchardDha,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.skyparkOneGulberg
    ],
    videoUrl: SHOWROOM_VIDEOS.architecturalFlyover,
    motionOrigin: 'center center',
    panX: ['0.6%', '-0.6%'],
    panY: ['-0.4%', '0.4%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'hr2-spec-1',
        title: 'Giga Group Integrated Mixed-Use Megaproject',
        spec: 'Combines 2-Kanal flagship retail floors, corporate suites, gym & recreational sky decks.'
      },
      {
        id: 'hr2-spec-2',
        title: 'DHA Corridor High-Footfall Hub',
        spec: '0.3 km from World Trade Center Islamabad and 0.5 km from Grand Orchard DHA Phase 1.'
      }
    ]
  },
  {
    id: 'highrise-ufone-ise-towers-isb',
    tourCategory: 'highrise_projects',
    propertyCategory: 'commercial',
    divisionTag: 'RI8CLICK CONSORTIUM // TOWERS.PK CORPORATE HIGHRISE PROJECTS',
    code: 'ISB 03 // UFONE TOWER & ISE TOWER II — JINNAH AVENUE',
    label: 'Ufone & ISE Corporate Towers',
    subLabel: 'Ranked #10 & #12 Tallest in Islamabad — Grade-A Telecom, Stock Exchange & Multinational Highrises',
    headline: 'Ufone Tower & ISE Tower II Corporate Highrise Projects — Blue Area',
    description:
      'Verified on Towers.pk/Islamabad: Ufone Tower (#12 in Islamabad) and ISE Tower II (#10 in Islamabad, designed by NESPAK and constructed by Habib Rafiq Pvt. Ltd.) represent the capital’s premier corporate skyscrapers. Offering 6,500 to 9,100 sq. ft. floor plates, smart conference halls, fiber-optic connectivity, and high rental yields.',
    valuation: 'Offices PKR 50L – 1.40 Cr • Floor Rent PKR 15.4L – 16.2L/Mo',
    locationBadge: 'Jinnah Avenue, Blue Area Financial District, Islamabad',
    focalLength: '22MM WIDE',
    altitude: '361 FT / 25 FLOORS',
    fov: '88° ARCHITECTURAL',
    imageUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.ufoneJinnahAvenue,
    secondaryImageUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.iseTowerBlueArea,
    fallbackUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.fallbackHighrise3,
    legacyBrokenUrl: 'https://www.genspark.ai/api/files/s/6C54AO5M',
    galleryImages: [
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.ufoneJinnahAvenue,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.iseTowerBlueArea,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.saudiPakTower,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.ogdclTower
    ],
    videoUrl: SHOWROOM_VIDEOS.architecturalFlyover,
    motionOrigin: 'center center',
    panX: ['-0.6%', '0.6%'],
    panY: ['0%', '-0.4%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'hr3-spec-1',
        title: 'NESPAK & Habib Rafiq Grade-A Engineering',
        spec: 'Dedicated corporate floors (PKR 350–700/sq.ft. monthly rental yield) with 24/7 CCTV & backup power.'
      },
      {
        id: 'hr3-spec-2',
        title: 'Blue Area Financial & Telecom Cluster',
        spec: 'Adjacent to Saudi Pak Tower (20 floors, 234 ft), OGDCL Tower, and Habib Bank Tower.'
      }
    ]
  },
  {
    id: 'highrise-constitution-skypark-isb',
    tourCategory: 'highrise_projects',
    propertyCategory: 'commercial',
    divisionTag: 'RI8CLICK CONSORTIUM // TOWERS.PK LUXURY HIGHRISE PROJECTS',
    code: 'ISB 04 // ONE CONSTITUTION AVE & SKYPARK ONE HIGHRISE',
    label: 'One Constitution & Skypark One',
    subLabel: '26-Storey (346 Ft) Diplomatic Corridor Tower & Gulberg Greens Completed Highrise Mall',
    headline: 'One Constitution Avenue & Skypark One Highrise Projects — Islamabad',
    description:
      'Featured on Towers.pk/Islamabad: One Constitution Avenue Tower I soars 26 floors (346 ft, 588,060 sq. ft. covered area, 83/100 Location Rating) overlooking Margalla Hills and Rawal Lake, paired with Skypark One (completed 2024 in Gulberg Greens, Ranked #18 in Islamabad) combining luxury apartments with a modern shopping mall.',
    valuation: 'Commercial & Luxury Highrise Units from PKR 1.45 Crore+',
    locationBadge: 'Constitution Avenue & Gulberg Greens, Islamabad',
    focalLength: '24MM PRIME',
    altitude: '346 FT / 26 FLOORS',
    fov: '84° WIDE',
    imageUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.skyparkOneGulberg,
    secondaryImageUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.oneConstitutionAve,
    fallbackUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.fallbackHighrise4,
    legacyBrokenUrl: 'https://www.genspark.ai/api/files/s/NC4klaYu',
    galleryImages: [
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.skyparkOneGulberg,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.oneConstitutionAve,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.lignumTower
    ],
    videoUrl: SHOWROOM_VIDEOS.architecturalFlyover,
    motionOrigin: 'center center',
    panX: ['0.5%', '-0.5%'],
    panY: ['0%', '-0.4%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'hr4-spec-1',
        title: '588,060 Sq. Ft. Diplomatic & Gulberg Landmarks',
        spec: 'Ranked #10 and #18 tallest in Islamabad on Towers.pk with smart access & double-glazed UPVC windows.'
      },
      {
        id: 'hr4-spec-2',
        title: 'Eco-Smart Highrise Architecture',
        spec: 'Central HVAC, service elevators, waste management, and panoramic Margalla views.'
      }
    ]
  },
  {
    id: 'highrise-statelife-greentrust-orchard-isb',
    tourCategory: 'highrise_projects',
    propertyCategory: 'commercial',
    divisionTag: 'RI8CLICK CONSORTIUM // TOWERS.PK VERIFIED HIGHRISE PROJECTS',
    code: 'ISB 05 // STATE LIFE, GREEN TRUST & GRAND ORCHARD TOWERS',
    label: 'State Life & Grand Orchard',
    subLabel: '19-Storey State Life Blue Area Tower, 16-Storey Green Trust F-6/1 & Grand Orchard DHA Phase 1',
    headline: 'State Life Tower, Green Trust & Grand Orchard Highrise Projects',
    description:
      'Sourced from Towers.pk/Islamabad: State Life Tower (19 floors, Ranked #18 in Islamabad, Blue Area) and Green Trust Tower (16 floors, eco-friendly design in F-6/1) deliver 6–9% annual rental yields, alongside Grand Orchard (DHA Phase 1 by Premier Choice International, Ranked #12 in Islamabad) offering 2–2.5 year installment plans.',
    valuation: 'Shops PKR 45L – 3.5 Cr • Offices PKR 80L – 3.5 Cr',
    locationBadge: 'Blue Area, Sector F-6/1 & DHA Phase 1, Islamabad',
    focalLength: '20MM ARCHITECTURAL',
    altitude: '19 FLOORS / 259 FT',
    fov: '90° WIDE',
    imageUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.stateLifeTower,
    secondaryImageUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.greenTrustTower,
    fallbackUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.grandOrchardDha,
    legacyBrokenUrl: 'https://www.genspark.ai/api/files/s/l7r4er7D',
    galleryImages: [
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.stateLifeTower,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.greenTrustTower,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.grandOrchardDha,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.saudiPakTower
    ],
    videoUrl: SHOWROOM_VIDEOS.architecturalFlyover,
    motionOrigin: 'center center',
    panX: ['-0.5%', '0.5%'],
    panY: ['0%', '-0.5%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'hr5-spec-1',
        title: '6%–9% Annual Commercial Rental Yield',
        spec: 'Verified operational and under-development highrise projects with flexible 25%–30% down payment plans.'
      },
      {
        id: 'hr5-spec-2',
        title: 'Ri8click Turnkey UPVC & Acoustic Glazing',
        spec: 'Solar-reflective structural glass facades, rooftop sitting gardens, and smart biometric security.'
      }
    ]
  },

  // ---------------- PILLAR 3: PROPERTIES (PLOTS & CONSTRUCTED HOUSES) ----------------
  {
    id: 'prop-wp-1',
    tourCategory: 'properties_plots_villas',
    propertyCategory: 'residential',
    divisionTag: 'RI8CLICK CONSORTIUM // PLOTS & CONSTRUCTED HOUSES',
    code: 'PROP 01 // CONSTRUCTED VILLA & POSSESSION PLOTS',
    label: 'Cantilevered Designer Villa',
    subLabel: '1-Kanal Constructed House & Possession Plots in Faisal Hills & Islamabad',
    headline: 'Constructed Signature Villas & Prime Residential Plots',
    description:
      'Ri8click Consortium offers verified Residential & Commercial Plots (5 Marla, 10 Marla, 1 & 2 Kanal) alongside architect-constructed luxury houses in Faisal Hills, Kohistan Enclave, Multi Gardens B-17, and DHA Islamabad.',
    valuation: 'Plots from PKR 45L • Villas 6.85 Cr+',
    locationBadge: 'Faisal Hills Executive, Taxila & Islamabad',
    focalLength: '24MM PRIME',
    altitude: 'ELEVATION +4.2M',
    fov: '84° WIDE',
    imageUrl: CONSTRUCTED_HOUSES_GALLERY.house1_whiteVilla,
    secondaryImageUrl: CONSTRUCTED_HOUSES_GALLERY.house2_modernEstate,
    fallbackUrl: CONSTRUCTED_HOUSES_GALLERY.house3_stoneGlassMansion,
    videoUrl: SHOWROOM_VIDEOS.villaDroneOrbit,
    motionOrigin: 'center center',
    panX: ['0%', '-0.8%'],
    panY: ['0%', '-0.5%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'p1-1',
        title: 'Turnkey Constructed Residence',
        spec: 'A+ grade seismic RCC structure with cantilevered sky terraces.'
      },
      {
        id: 'p1-2',
        title: 'Ri8click Consortium UPVC Glazing',
        spec: 'Double-glazed German profile UPVC windows and sliding patio doors.'
      }
    ]
  },
  {
    id: 'prop-wp-2',
    tourCategory: 'properties_plots_villas',
    propertyCategory: 'residential',
    divisionTag: 'RI8CLICK CONSORTIUM // PLOTS & CONSTRUCTED HOUSES',
    code: 'PROP 02 // MARGALLA RIDGE ESTATE',
    label: 'Hillside Stone & Glass Manor',
    subLabel: 'Constructed Luxury House & Developed Ridge Plots',
    headline: 'Margalla View Constructed Houses & Estate Plots',
    description:
      'Commanding panoramic Margalla foothill views, our constructed residences and developed plots combine natural stacked-stone facades, warm timber soffits, floating staircases, and full underground utilities.',
    valuation: 'PKR 5.90 Crore – 7.40 Crore',
    locationBadge: 'Kohistan Enclave, B-17 & Faisal Hills',
    focalLength: '20MM WIDE',
    altitude: 'TERRACE +6.0M',
    fov: '90° WIDE',
    imageUrl: CONSTRUCTED_HOUSES_GALLERY.house3_stoneGlassMansion,
    secondaryImageUrl: CONSTRUCTED_HOUSES_GALLERY.house1_whiteVilla,
    fallbackUrl: CONSTRUCTED_HOUSES_GALLERY.house2_modernEstate,
    videoUrl: SHOWROOM_VIDEOS.villaDroneOrbit,
    motionOrigin: 'left center',
    panX: ['-0.6%', '0.6%'],
    panY: ['0.3%', '-0.3%'],
    scaleRange: [1.04, 1.01],
    specs: [
      {
        id: 'p2-1',
        title: '24-Foot Corner Glass Atrium',
        spec: 'Seamless structural UPVC and silicone glazing overlooking Margalla Hills.'
      },
      {
        id: 'p2-2',
        title: 'Subterranean 3-Car Parking',
        spec: 'Climate-controlled lower-ground parking and servant quarters.'
      }
    ]
  },

  // ---------------- PILLAR 4: UPVC DOORS, WINDOWS, PARTITIONS & CONSTRUCTION ----------------
  {
    id: 'upvc-wp-1',
    tourCategory: 'upvc_construction',
    propertyCategory: 'projects',
    divisionTag: 'RI8CLICK CONSORTIUM // UPVC DOORS, WINDOWS & PARTITIONS',
    code: 'UPVC 01 // SLIDING PATIO, BI-FOLD & FRENCH DOOR SYSTEMS',
    label: 'UPVC Sliding & Bi-Fold Doors',
    subLabel: 'Heavy-Duty Lift-and-Slide Patio Doors, Bi-Fold Terrace Walls & Multi-Point French Doors',
    headline: 'Ri8click UPVC Sliding Patio, Bi-Fold & French Door Models',
    description:
      'Precision-engineered German-profile UPVC door systems including panoramic Lift-and-Slide patio doors, 6-panel concertina Bi-Fold garden doors, and double-sash French entry doors with 5-point anti-burglary locking and galvanized steel reinforcement.',
    valuation: 'PKR 1,850 – 3,400 / Sq. Ft. • 10-Year Warranty',
    locationBadge: 'Ri8click UPVC Factory • Taxila, Islamabad & Rawalpindi',
    focalLength: '18MM ULTRA-WIDE',
    altitude: 'DOOR SYSTEMS',
    fov: '96° EXPANSIVE',
    imageUrl: UPVC_AND_INTERIOR_GALLERY.upvc1_slidingPatioDoors,
    secondaryImageUrl: UPVC_AND_INTERIOR_GALLERY.upvc2_casementTiltTurnWindows,
    fallbackUrl: CONSTRUCTED_HOUSES_GALLERY.house2_modernEstate,
    galleryImages: [
      UPVC_AND_INTERIOR_GALLERY.upvc1_slidingPatioDoors,
      UPVC_AND_INTERIOR_GALLERY.upvc2_casementTiltTurnWindows,
      UPVC_AND_INTERIOR_GALLERY.upvc3_acousticGlassPartitions,
      UPVC_AND_INTERIOR_GALLERY.upvc4_conservatorySkylights
    ],
    videoUrl: SHOWROOM_VIDEOS.luxuryInteriorWalk,
    motionOrigin: 'center center',
    panX: ['0%', '-0.8%'],
    panY: ['-0.4%', '0.4%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'u1-1',
        title: 'Lift & Slide + Bi-Fold Panoramic Doors',
        spec: 'Silent stainless-steel roller tracks supporting up to 300kg insulated double/triple glass sashes.'
      },
      {
        id: 'u1-2',
        title: 'Multi-Point Security & EPDM Weather Seals',
        spec: '100% dustproof, monsoon waterproof, and UV-stabilized white, anthracite grey, and golden oak finishes.'
      }
    ]
  },
  {
    id: 'upvc-wp-2',
    tourCategory: 'upvc_construction',
    propertyCategory: 'projects',
    divisionTag: 'RI8CLICK CONSORTIUM // UPVC WINDOWS & ACOUSTIC PARTITIONS',
    code: 'UPVC 02 // CASEMENT, TILT-TURN WINDOWS & GLASS PARTITIONS',
    label: 'UPVC Windows & Partitions',
    subLabel: 'Double/Triple-Glazed Casement, Tilt & Turn Windows, Bay Windows & Office Acoustic Partitions',
    headline: 'German-Standard UPVC Window Models & Acoustic Glass Partitions',
    description:
      'Complete range of multi-chamber UPVC Tilt-and-Turn windows, casement windows, arched bay windows, and frameless/framed acoustic office and living room glass partitions providing up to 42dB sound insulation and 40% HVAC energy savings.',
    valuation: 'PKR 1,450 – 2,950 / Sq. Ft. • Custom Fabrication',
    locationBadge: 'Ri8click UPVC Manufacturing Plant & Turnkey Division',
    focalLength: '22MM ARCHITECTURAL',
    altitude: 'WINDOW & PARTITION LAB',
    fov: '90° WIDE',
    imageUrl: UPVC_AND_INTERIOR_GALLERY.upvc3_acousticGlassPartitions,
    secondaryImageUrl: UPVC_AND_INTERIOR_GALLERY.upvc2_casementTiltTurnWindows,
    fallbackUrl: UPVC_AND_INTERIOR_GALLERY.upvc1_slidingPatioDoors,
    galleryImages: [
      UPVC_AND_INTERIOR_GALLERY.upvc3_acousticGlassPartitions,
      UPVC_AND_INTERIOR_GALLERY.upvc2_casementTiltTurnWindows,
      UPVC_AND_INTERIOR_GALLERY.upvc1_slidingPatioDoors,
      UPVC_AND_INTERIOR_GALLERY.upvc4_conservatorySkylights
    ],
    videoUrl: SHOWROOM_VIDEOS.luxuryInteriorWalk,
    motionOrigin: 'center center',
    panX: ['-0.5%', '0.5%'],
    panY: ['0%', '-0.4%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'u2-1',
        title: '42dB Acoustic & Argon Low-E Double Glazing',
        spec: 'Eliminates highway and urban noise while blocking 96% UV rays in extreme summer heat.'
      },
      {
        id: 'u2-2',
        title: 'Corporate & Residential Glass Partitions',
        spec: 'Frameless tempered glass, wood-slat acoustic dividers, and sliding conference room partitions.'
      }
    ]
  }
];

type AtmosphereGrade = 'crystal_daylight' | 'solar_vivid' | 'showroom_hdr';

const WAYPOINT_DURATION_MS = 6500;

export const HeroSection: React.FC<HeroSectionProps> = ({
  slides,
  onExploreClick,
  onContactAgentClick,
  onSelectCategoryFilter,
  onOpen3DTour
}) => {
  const activeSlides = useMemo(
    () => slides.filter(s => s.isActive).sort((a, b) => a.order - b.order),
    [slides]
  );

  // Main category filter aligned with Navbar & Ri8click Consortium divisions
  const [tourCategory, setTourCategory] = useState<TourDeckCategory>('all_showroom');
  const [waypointIdx, setWaypointIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoTourActive, setIsVideoTourActive] = useState(false);
  const [isCinemaTheaterMode, setIsCinemaTheaterMode] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Optical clarity grade
  const [atmosphere, setAtmosphere] = useState<AtmosphereGrade>('crystal_daylight');

  // === BLOCK 1: UI Visibility States ===
  // Default page load state is set to "Hide Text" (showLeftDescription = false)
  // so banner images are maximally visible with only minimal heading & image info.
  const [showLeftDescription, setShowLeftDescription] = useState(false);
  const [showDirectorDeck, setShowDirectorDeck] = useState(true);
  const [showSpecCards, setShowSpecCards] = useState(true);
  const [showConsortiumRibbon, setShowConsortiumRibbon] = useState(false);
  const [showCategoryBar, setShowCategoryBar] = useState(true);
  const [showShowroomTourBar, setShowShowroomTourBar] = useState(false);
  const [isHudMenuOpen, setIsHudMenuOpen] = useState(false);

  // Broken Link Inspector & Active Replacement Monitor
  const [showBrokenLinkModal, setShowBrokenLinkModal] = useState(false);
  const [brokenLinksLog, setBrokenLinksLog] = useState<BrokenImageRecord[]>(
    INITIAL_REPLACED_BROKEN_LINKS
  );

  // Moveable "Portfolio Deck" Window States
  const heroStageRef = useRef<HTMLElement | null>(null);
  const portfolioDeckDragControls = useDragControls();
  const [isDeckFloating, setIsDeckFloating] = useState(true);
  const [isDeckMinimized, setIsDeckMinimized] = useState(false);
  const [deckResetKey, setDeckResetKey] = useState(0);

  const [videoFailed, setVideoFailed] = useState(false);
  const [failedUrls, setFailedUrls] = useState<Record<string, boolean>>({});
  const [customActiveImageOverride, setCustomActiveImageOverride] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Sanitize legacy text & convert any "Commercial Plazas" / "Plaza" to "Highrise Projects"
  const sanitizeConsortiumText = (text?: string) => {
    if (!text) return '';
    return text
      .replace(/ri8click\s+Group\s+of\s+Companies\s+Consortium/gi, 'Ri8click Consortium')
      .replace(/ri8click\s+Real\s+Estate\s+Consortium\s+Group/gi, 'Ri8click Consortium')
      .replace(/ri8click\s+Group\s+of\s+Companies/gi, 'Ri8click Consortium')
      .replace(/Group\s+of\s+Companies/gi, 'Ri8click Consortium')
      .replace(/Consortium\s+Group/gi, 'Ri8click Consortium')
      .replace(/Commercial\s+Plazas/gi, 'Highrise Projects')
      .replace(/Commercial\s+Plaza/gi, 'Highrise Project')
      .replace(/\bPlazas\b/gi, 'Highrise Projects')
      .replace(/\bPlaza\b/gi, 'Highrise Project');
  };

  // Convert CMS slides (including custom galleryImages sequences managed in AdminBannerManager)
  const cmsHighriseWaypoints: CameraWaypoint[] = useMemo(() => {
    const activeTowersPkImages = [
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.centaurusTower,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.gigaMallTower,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.ufoneJinnahAvenue,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.stateLifeTower,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.iseTowerBlueArea,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.skyparkOneGulberg,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.oneConstitutionAve,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.grandOrchardDha,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.greenTrustTower,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.saudiPakTower
    ];

    return activeSlides
      .filter(s => s.samplePropertyData?.category === 'commercial')
      .map((s, idx) => {
        const primaryImg =
          s.imageUrl && !s.imageUrl.includes('genspark.ai/api/files/s/qpljElLm')
            ? s.imageUrl
            : activeTowersPkImages[idx % activeTowersPkImages.length];
        const secondaryImg =
          s.galleryImages && s.galleryImages.length > 1
            ? s.galleryImages[1]
            : activeTowersPkImages[(idx + 1) % activeTowersPkImages.length];

        return {
          id: `cms-wp-${s.id}`,
          tourCategory: 'highrise_projects' as TourDeckCategory,
          propertyCategory: 'commercial' as PropertyCategory,
          divisionTag: 'RI8CLICK CONSORTIUM // ISLAMABAD HIGHRISE PROJECTS',
          code: `ISB 0${idx + 6} // ${sanitizeConsortiumText(s.categoryTag || 'HIGHRISE PROJECT').toUpperCase()}`,
          label: sanitizeConsortiumText(s.title).split(' ').slice(0, 3).join(' '),
          subLabel: sanitizeConsortiumText(
            s.subtitle || 'Highrise Project, Corporate Offices, Retail Mall & Luxury Suites'
          ),
          headline: sanitizeConsortiumText(s.title),
          description: sanitizeConsortiumText(s.description || s.subtitle),
          valuation: s.price || 'PKR 2.5 Crore+',
          locationBadge: s.society || s.location || 'Blue Area & DHA, Islamabad',
          focalLength: '24MM ARCHITECTURAL',
          altitude: 'SKYLINE +26 FL',
          fov: '86° WIDE',
          imageUrl: primaryImg,
          secondaryImageUrl: secondaryImg,
          fallbackUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.fallbackHighrise1,
          galleryImages:
            s.galleryImages && s.galleryImages.length > 0
              ? s.galleryImages
              : activeTowersPkImages.slice(0, 5),
          videoUrl: SHOWROOM_VIDEOS.architecturalFlyover,
          motionOrigin: 'center center',
          panX: ['-0.6%', '0.6%'] as [string, string],
          panY: ['0%', '-0.5%'] as [string, string],
          scaleRange: [1.01, 1.05] as [number, number],
          specs: [
            {
              id: `cms-spec-${idx}-1`,
              title: sanitizeConsortiumText(s.features?.[0] || 'Double-Glazed UPVC Curtain Wall'),
              spec: 'Verified Towers.pk Islamabad highrise project with high-speed elevators and multi-level basement parking.'
            },
            {
              id: `cms-spec-${idx}-2`,
              title: sanitizeConsortiumText(
                s.features?.[1] || 'High-Yield Corporate Offices & Retail Suites'
              ),
              spec: `Located in ${s.society || 'Islamabad prime highrise corridor'} with verified NOC & Ri8click Consortium management.`
            }
          ]
        };
      });
  }, [activeSlides]);

  // Filter waypoints based on selected category
  const cameraWaypoints: CameraWaypoint[] = useMemo(() => {
    const combined = [...MASTER_VIRTUAL_TOUR_WAYPOINTS, ...cmsHighriseWaypoints];
    if (tourCategory === 'all_showroom') {
      const capList = combined.filter(w => w.tourCategory === 'capsule_containers');
      const highriseList = combined.filter(w => w.tourCategory === 'highrise_projects');
      const propsList = combined.filter(w => w.tourCategory === 'properties_plots_villas');
      const upvcList = combined.filter(w => w.tourCategory === 'upvc_construction');

      const interleaved: CameraWaypoint[] = [];
      const maxLen = Math.max(
        capList.length,
        highriseList.length,
        propsList.length,
        upvcList.length
      );
      for (let i = 0; i < maxLen; i++) {
        if (capList[i]) interleaved.push(capList[i]);
        if (highriseList[i]) interleaved.push(highriseList[i]);
        if (propsList[i]) interleaved.push(propsList[i]);
        if (upvcList[i]) interleaved.push(upvcList[i]);
      }
      return interleaved;
    }
    const filtered = combined.filter(wp => wp.tourCategory === tourCategory);
    return filtered.length > 0 ? filtered : MASTER_VIRTUAL_TOUR_WAYPOINTS;
  }, [tourCategory, cmsHighriseWaypoints]);

  const activeWaypoint = cameraWaypoints[waypointIdx] || cameraWaypoints[0];

  // Resolve broken or missing image links automatically through 4 active tiers
  const resolveImageWithFallback = (wp: CameraWaypoint): string => {
    if (wp.imageUrl && !failedUrls[wp.imageUrl]) return wp.imageUrl;
    if (wp.secondaryImageUrl && !failedUrls[wp.secondaryImageUrl]) return wp.secondaryImageUrl;
    if (wp.fallbackUrl && !failedUrls[wp.fallbackUrl]) return wp.fallbackUrl;
    return ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.fallbackHighrise1;
  };

  const resolvedImageUrl =
    customActiveImageOverride && !failedUrls[customActiveImageOverride]
      ? customActiveImageOverride
      : resolveImageWithFallback(activeWaypoint);

  const handleImageError = (urlThatFailed: string, wpLabel?: string) => {
    setFailedUrls(prev => {
      if (prev[urlThatFailed]) return prev;
      return { ...prev, [urlThatFailed]: true };
    });

    const fallbackReplacement =
      activeWaypoint.secondaryImageUrl && activeWaypoint.secondaryImageUrl !== urlThatFailed
        ? activeWaypoint.secondaryImageUrl
        : activeWaypoint.fallbackUrl || ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.fallbackHighrise1;

    setBrokenLinksLog(prev => {
      if (prev.some(item => item.brokenUrl === urlThatFailed)) return prev;
      return [
        {
          brokenUrl: urlThatFailed,
          replacedWithUrl: fallbackReplacement,
          waypointLabel: wpLabel || activeWaypoint.label,
          timestamp: 'Auto-Replaced at Runtime'
        },
        ...prev
      ];
    });
  };

  // Preload current and upcoming waypoint images for zero-flicker transitions
  useEffect(() => {
    if (cameraWaypoints.length === 0) return;
    const indicesToPreload = [
      waypointIdx,
      (waypointIdx + 1) % cameraWaypoints.length,
      (waypointIdx + 2) % cameraWaypoints.length
    ];
    indicesToPreload.forEach(i => {
      const wp = cameraWaypoints[i];
      if (!wp) return;
      const img = new Image();
      img.src = resolveImageWithFallback(wp);
    });
  }, [waypointIdx, cameraWaypoints, failedUrls]);

  useEffect(() => {
    setWaypointIdx(0);
    setVideoFailed(false);
    setCustomActiveImageOverride(null);
  }, [tourCategory]);

  useEffect(() => {
    setCustomActiveImageOverride(null);
  }, [waypointIdx]);

  // Auto-cycle camera waypoints
  useEffect(() => {
    if (isPaused || isVideoTourActive) return;
    const wpTimer = setInterval(() => {
      setWaypointIdx(prev => (prev + 1) % cameraWaypoints.length);
    }, WAYPOINT_DURATION_MS);
    return () => clearInterval(wpTimer);
  }, [isPaused, isVideoTourActive, cameraWaypoints.length]);

  const handlePrev = () => {
    setWaypointIdx(prev => (prev - 1 + cameraWaypoints.length) % cameraWaypoints.length);
  };

  const handleNext = () => {
    setWaypointIdx(prev => (prev + 1) % cameraWaypoints.length);
  };

  const handleResetDeckPosition = () => {
    setDeckResetKey(prev => prev + 1);
  };

  // Ri8click Consortium Categories
  const tourCategories: {
    id: TourDeckCategory;
    label: string;
    shortLabel: string;
    count: number;
    filterCategory: PropertyCategory;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'all_showroom',
      label: 'Ri8click Consortium Portfolio',
      shortLabel: 'Consortium Portfolio',
      count: MASTER_VIRTUAL_TOUR_WAYPOINTS.length + cmsHighriseWaypoints.length,
      filterCategory: 'all',
      icon: <Compass className="w-3.5 h-3.5" />
    },
    {
      id: 'capsule_containers',
      label: 'Container & Capsule Houses',
      shortLabel: 'Capsule Houses',
      count: MASTER_VIRTUAL_TOUR_WAYPOINTS.filter(w => w.tourCategory === 'capsule_containers')
        .length,
      filterCategory: 'modular',
      icon: <Box className="w-3.5 h-3.5" />
    },
    {
      id: 'highrise_projects',
      label: 'Highrise Projects (Islamabad)',
      shortLabel: 'Highrise Projects',
      count:
        MASTER_VIRTUAL_TOUR_WAYPOINTS.filter(w => w.tourCategory === 'highrise_projects').length +
        cmsHighriseWaypoints.length,
      filterCategory: 'commercial',
      icon: <Building2 className="w-3.5 h-3.5" />
    },
    {
      id: 'properties_plots_villas',
      label: 'Properties (Plots & Houses)',
      shortLabel: 'Plots & Houses',
      count: MASTER_VIRTUAL_TOUR_WAYPOINTS.filter(w => w.tourCategory === 'properties_plots_villas')
        .length,
      filterCategory: 'residential',
      icon: <Home className="w-3.5 h-3.5" />
    },
    {
      id: 'upvc_construction',
      label: 'Ri8click Consortium & UPVC',
      shortLabel: 'UPVC & Construction',
      count: MASTER_VIRTUAL_TOUR_WAYPOINTS.filter(w => w.tourCategory === 'upvc_construction')
        .length,
      filterCategory: 'projects',
      icon: <Layers className="w-3.5 h-3.5" />
    }
  ];

  const consortiumPillars = [
    {
      id: 'capsule_containers' as TourDeckCategory,
      category: 'modular' as PropertyCategory,
      title: 'Container Capsule Houses',
      detail: 'Q3, L-Loft, V2124 Duplex & Curved Glass Container Pods',
      icon: Box,
      accent: 'text-amber-300 border-amber-400/30 bg-amber-500/10'
    },
    {
      id: 'highrise_projects' as TourDeckCategory,
      category: 'commercial' as PropertyCategory,
      title: 'Islamabad Highrise Projects',
      detail: 'The Centaurus, Giga Mall, Ufone Tower, ISE Tower II & State Life',
      icon: Building2,
      accent: 'text-emerald-300 border-emerald-400/30 bg-emerald-500/10'
    },
    {
      id: 'properties_plots_villas' as TourDeckCategory,
      category: 'residential' as PropertyCategory,
      title: 'Properties: Plots & Houses',
      detail: '5M, 10M, 1-2 Kanal Plots & Constructed Villas',
      icon: Home,
      accent: 'text-sky-300 border-sky-400/30 bg-sky-500/10'
    },
    {
      id: 'upvc_construction' as TourDeckCategory,
      category: 'projects' as PropertyCategory,
      title: 'Construction & UPVC Systems',
      detail: 'UPVC Doors, Windows, Partitions, Panels & Civil Works',
      icon: HardHat,
      accent: 'text-purple-300 border-purple-400/30 bg-purple-500/10'
    }
  ];

  const atmosphereStyle: React.CSSProperties = useMemo(() => {
    const baseFilter =
      atmosphere === 'crystal_daylight'
        ? 'brightness(1.04) contrast(1.06) saturate(1.06)'
        : atmosphere === 'solar_vivid'
        ? 'brightness(1.08) contrast(1.08) saturate(1.12)'
        : 'brightness(1.03) contrast(1.10) saturate(1.08)';

    return {
      filter: baseFilter
    };
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
      className="w-full flex items-center justify-between gap-3 py-2 px-2.5 rounded-xl hover:bg-white/10 transition-colors text-left cursor-pointer"
    >
      <div>
        <div className="text-xs font-bold text-white leading-tight">{label}</div>
        {description && <div className="text-[10px] text-slate-300">{description}</div>}
      </div>
      <div
        className={`relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0 ${
          checked ? 'bg-amber-400' : 'bg-white/20'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-slate-950 shadow-md transform transition-transform duration-200 ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
    </button>
  );

  return (
    <section
      ref={heroStageRef}
      className="relative w-full overflow-hidden bg-slate-950 text-white select-none border-b border-slate-800"
    >
      {/* =====================================================================
          1. PROFESSIONAL ARCHITECTURAL STAGE & IMAGE / VIDEO CANVAS
         ===================================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm scale-105 transition-all duration-700"
          style={{ backgroundImage: `url(${resolvedImageUrl})` }}
        />

        <AnimatePresence initial={false} mode="sync">
          {isVideoTourActive && !videoFailed ? (
            <motion.div
              key={`video-reel-${activeWaypoint.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
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
                scale: activeWaypoint.scaleRange[0]
              }}
              animate={{
                opacity: 1,
                scale: activeWaypoint.scaleRange[1],
                x: activeWaypoint.panX,
                y: activeWaypoint.panY
              }}
              exit={{
                opacity: 0
              }}
              transition={{
                opacity: { duration: 0.65, ease: 'easeOut' },
                scale: { duration: WAYPOINT_DURATION_MS / 1000 + 1.0, ease: 'linear' },
                x: { duration: WAYPOINT_DURATION_MS / 1000 + 1.0, ease: 'linear' },
                y: { duration: WAYPOINT_DURATION_MS / 1000 + 1.0, ease: 'linear' }
              }}
              style={{
                transformOrigin: activeWaypoint.motionOrigin
              }}
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

        {/* Subtle Scrim — Lighter when "Hide Text" is active so images shine */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
            isCinemaTheaterMode || !showLeftDescription
              ? 'bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20'
              : 'bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20 pointer-events-none" />
      </div>

      {/* =====================================================================
          2. OPTIONAL CATEGORY BAR
         ===================================================================== */}
      <AnimatePresence>
        {showCategoryBar && !isCinemaTheaterMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative z-30 border-b border-white/15 bg-slate-950/70 backdrop-blur-md"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
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
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shrink-0 cursor-pointer border ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 border-amber-300'
                          : 'bg-white/5 text-white border-white/15 hover:bg-white/15'
                      }`}
                    >
                      {cat.icon}
                      <span className="hidden xl:inline">{cat.label}</span>
                      <span className="xl:hidden">{cat.shortLabel}</span>
                      <span
                        className={`ml-0.5 px-1.5 py-0.2 rounded text-[9px] font-black ${
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
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-bold text-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <span>Hide Bar</span>
                <ChevronUp className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          3. OPTIONAL CAMERA WAYPOINTS BAR
         ===================================================================== */}
      <AnimatePresence>
        {showShowroomTourBar && !isCinemaTheaterMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="relative z-20 border-b border-white/15 bg-slate-900/70 backdrop-blur-md"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
                {cameraWaypoints.map((wp, idx) => {
                  const isSelected = waypointIdx === idx;
                  return (
                    <button
                      key={wp.id}
                      type="button"
                      onClick={() => {
                        setIsVideoTourActive(false);
                        setWaypointIdx(idx);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-left transition-all cursor-pointer shrink-0 flex items-center gap-1.5 border ${
                        isSelected
                          ? 'bg-white text-slate-950 border-white font-bold'
                          : 'bg-white/5 text-white/90 border-white/15 hover:bg-white/15'
                      }`}
                    >
                      <Camera
                        className={`w-3 h-3 ${isSelected ? 'text-amber-600' : 'text-amber-300'}`}
                      />
                      <span className="text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}. {wp.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setShowShowroomTourBar(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white transition-all cursor-pointer shrink-0"
                title="Hide Tour Bar"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          4. MAIN FOREGROUND STAGE & MOVEABLE CRYSTAL PORTFOLIO DECK
         ===================================================================== */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12 min-h-[560px] sm:min-h-[630px] flex flex-col justify-between">
        {/* Top Executive Header Utility Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-xs font-semibold text-slate-100 shadow-sm">
            <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Ri8click Consortium • Contemporary Capsule Homes, Highrises &amp; German UPVC</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 ml-auto">
            {/* Broken Link Replacement Status Button */}
            <button
              type="button"
              onClick={() => setShowBrokenLinkModal(prev => !prev)}
              className="px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 border border-emerald-400/40 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-200 transition-all cursor-pointer backdrop-blur-xl"
              title="View Broken Image Link Replacements & Active Media Status"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-300" />
              <span className="hidden sm:inline">Active Images</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-400/20 text-emerald-200 text-[9px] font-black">
                {brokenLinksLog.length} Verified
              </span>
            </button>

            {/* Toggle Left-Side Text Description while keeping minimal info & Portfolio Deck visible */}
            <button
              type="button"
              onClick={() => {
                setShowLeftDescription(prev => !prev);
                if (!showDirectorDeck) setShowDirectorDeck(true);
              }}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 border transition-all cursor-pointer backdrop-blur-xl ${
                !showLeftDescription
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
              title="Toggle Full Description vs Minimal Banner Info"
            >
              {showLeftDescription ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-amber-300" />
                  <span>Hide Text</span>
                </>
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5" />
                  <span>Show Text</span>
                </>
              )}
            </button>

            {/* Video Tour Toggle */}
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

            {/* View Controls Popover */}
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
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
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
                        label="Portfolio Deck (Moveable Window)"
                        description="Show/hide draggable project navigator window"
                        checked={showDirectorDeck}
                        onChange={() => setShowDirectorDeck(prev => !prev)}
                      />
                      <ToggleSwitch
                        label="Free-Drag Portfolio Window"
                        description="Allow dragging Portfolio Deck anywhere in window"
                        checked={isDeckFloating}
                        onChange={() => setIsDeckFloating(prev => !prev)}
                      />
                      <ToggleSwitch
                        label="Architectural Spec Badges"
                        description="Key engineering & project highlights"
                        checked={showSpecCards}
                        onChange={() => setShowSpecCards(prev => !prev)}
                      />
                      <ToggleSwitch
                        label="Ri8click Consortium Pillars Bar"
                        description="Show 4 business pillars ribbon"
                        checked={showConsortiumRibbon}
                        onChange={() => setShowConsortiumRibbon(prev => !prev)}
                      />
                      <ToggleSwitch
                        label="Category Filter Bar"
                        description="Show top category filter buttons"
                        checked={showCategoryBar}
                        onChange={() => setShowCategoryBar(prev => !prev)}
                      />
                      <ToggleSwitch
                        label="Camera Waypoints Bar"
                        description="Show top camera waypoint switcher"
                        checked={showShowroomTourBar}
                        onChange={() => setShowShowroomTourBar(prev => !prev)}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Clean View Toggle */}
            <button
              type="button"
              onClick={() => setIsCinemaTheaterMode(prev => !prev)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-xl ${
                isCinemaTheaterMode
                  ? 'bg-white text-slate-950 border-white'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }`}
              title="Toggle Clean Architectural View"
            >
              {isCinemaTheaterMode ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
              <span className="hidden md:inline">
                {isCinemaTheaterMode ? 'Standard View' : 'Clean View'}
              </span>
            </button>
          </div>
        </div>

        {/* BROKEN IMAGE LINK REPLACEMENT INSPECTOR MODAL */}
        <AnimatePresence>
          {showBrokenLinkModal && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-emerald-400/40 shadow-2xl space-y-3 z-50"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                    Active Media Monitor
                  </span>
                  <span className="text-xs font-bold text-white">
                    Verified Capsule &amp; Highrise Assets ({brokenLinksLog.length} Legacy Links Upgraded)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBrokenLinkModal(false)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold text-slate-200 cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto pr-1">
                {brokenLinksLog.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/15 flex items-center gap-2.5"
                  >
                    <div className="w-14 h-12 rounded-lg overflow-hidden shrink-0 border border-emerald-400/40 bg-slate-950 relative">
                      <img
                        src={item.replacedWithUrl}
                        alt={item.waypointLabel}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0.5 right-0.5 px-1 rounded bg-emerald-500 text-slate-950 text-[8px] font-black">
                        LIVE
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-bold text-white truncate">
                        {item.waypointLabel}
                      </div>
                      <div className="flex items-center gap-1 text-[9.5px] text-rose-300 line-through truncate">
                        <ImageOff className="w-3 h-3 shrink-0" />
                        <span className="truncate">{item.brokenUrl}</span>
                      </div>
                      <div className="text-[9.5px] text-emerald-300 font-semibold truncate">
                        Replaced: {item.replacedWithUrl}
                      </div>
                    </div>
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
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-4"
            >
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/25 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-white/15">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                      Ri8click Consortium
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold text-white/95">
                      Integrated Real Estate, Capsule Smart Homes, Islamabad Highrises &amp; German UPVC
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConsortiumRibbon(false)}
                    className="text-[10px] font-bold text-slate-200 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <span>Hide Pillars</span>
                    <ChevronUp className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {consortiumPillars.map(pillar => {
                    const Icon = pillar.icon;
                    const isActivePillar = tourCategory === pillar.id;
                    return (
                      <button
                        key={pillar.id}
                        type="button"
                        onClick={() => {
                          setTourCategory(pillar.id);
                          onSelectCategoryFilter(pillar.category);
                        }}
                        className={`group p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                          isActivePillar
                            ? 'bg-white/20 border-amber-300'
                            : 'bg-white/5 border-white/15 hover:bg-white/15'
                        }`}
                      >
                        <div className={`p-2 rounded-lg border shrink-0 ${pillar.accent}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-extrabold text-white group-hover:text-amber-300 transition-colors truncate">
                            {pillar.title}
                          </div>
                          <div className="text-[10.5px] text-slate-200/90 leading-snug line-clamp-1 mt-0.5">
                            {pillar.detail}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Center Main Content & Moveable Crystal Transparent Portfolio Deck */}
        <AnimatePresence mode="wait">
          {!isCinemaTheaterMode ? (
            <motion.div
              key="foreground-content"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto py-3 relative"
            >
              {/* === BLOCK 2: Left Column (Full Narrative vs Default Minimal Banner Info when "Hide Text" is active) === */}
              {showLeftDescription ? (
                <div className={showDirectorDeck ? 'lg:col-span-7' : 'lg:col-span-11'}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeWaypoint.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-3.5"
                    >
                      {/* Division & Location Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-black tracking-wider uppercase bg-amber-400 text-slate-950 shadow-sm">
                          <Sparkles className="w-3.5 h-3.5 fill-current" />
                          <span>{activeWaypoint.divisionTag}</span>
                        </span>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-white/10 backdrop-blur-xl text-white border border-white/25">
                          <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                          <span>{activeWaypoint.locationBadge}</span>
                        </div>

                        {activeWaypoint.tourCategory === 'highrise_projects' && (
                          <a
                            href="https://towers.pk/islamabad/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-400/40 hover:bg-emerald-500/30 transition-colors"
                          >
                            <span>Towers.pk Verified</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      {/* Headline */}
                      <h1 className="text-3xl sm:text-5xl lg:text-[44px] font-black tracking-tight text-white leading-[1.1] font-serif drop-shadow-sm">
                        {activeWaypoint.headline}
                      </h1>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-slate-100 max-w-2xl leading-relaxed font-medium drop-shadow-xs">
                        {activeWaypoint.description}
                      </p>

                      {/* Clean Architectural Specification Cards */}
                      {showSpecCards && activeWaypoint.specs.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 max-w-2xl">
                          {activeWaypoint.specs.map(item => (
                            <div
                              key={item.id}
                              className="p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-start gap-2.5"
                            >
                              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                              <div>
                                <div className="text-xs font-bold text-white">{item.title}</div>
                                <div className="text-[11px] text-slate-200 leading-snug mt-0.5">
                                  {item.spec}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Valuation Pill & Multi-Angle Sub-Gallery */}
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xl border border-amber-400/50">
                          <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold">
                            Valuation / Price
                          </span>
                          <span className="text-base sm:text-lg font-black text-white">
                            {activeWaypoint.valuation}
                          </span>
                        </div>

                        {activeWaypoint.galleryImages && activeWaypoint.galleryImages.length > 1 && (
                          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xl p-1.5 rounded-xl border border-white/20">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-200 px-1.5">
                              Views:
                            </span>
                            {activeWaypoint.galleryImages.map((imgUrl, gIdx) => {
                              if (failedUrls[imgUrl]) return null;
                              const isCurrentView = resolvedImageUrl === imgUrl;
                              return (
                                <button
                                  key={gIdx}
                                  type="button"
                                  onClick={() => setCustomActiveImageOverride(imgUrl)}
                                  className={`w-9 h-7 rounded-md overflow-hidden border transition-all cursor-pointer shrink-0 ${
                                    isCurrentView
                                      ? 'border-amber-400 ring-2 ring-amber-400/60'
                                      : 'border-white/30 hover:border-amber-400'
                                  }`}
                                  title={`Switch to View ${gIdx + 1}`}
                                >
                                  <img
                                    src={imgUrl}
                                    alt={`View ${gIdx + 1}`}
                                    onError={() => handleImageError(imgUrl, activeWaypoint.label)}
                                    className="w-full h-full object-cover"
                                  />
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Primary Call-To-Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
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
                          className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                        >
                          <Compass className="w-4 h-4" />
                          <span>Launch 360° Virtual Walkthrough</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={onExploreClick}
                          className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white hover:text-slate-950 text-white border border-white/30 font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 backdrop-blur-xl transition-all cursor-pointer"
                        >
                          <Eye className="w-4 h-4 text-amber-300" />
                          <span>Explore Portfolio &amp; Listings</span>
                        </button>

                        <button
                          type="button"
                          onClick={onContactAgentClick}
                          className="px-4 py-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white border border-emerald-400/50 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
                        >
                          <PhoneCall className="w-4 h-4" />
                          <span>Ri8click Consortium Inquiry</span>
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : (
                /* Default Page Load State ("Hide Text" active): Compact Minimal Heading & Image Info Badge */
                <div className={showDirectorDeck ? 'lg:col-span-7 self-end' : 'lg:col-span-9 self-end'}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`minimal-banner-info-${activeWaypoint.id}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.22 }}
                      className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/45 backdrop-blur-md border border-white/20 shadow-xl max-w-lg space-y-1.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
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
                            className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[10px] uppercase tracking-wider cursor-pointer transition-colors"
                          >
                            360° Tour
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              {/* Right Column / Moveable Floating Window: CRYSTAL TRANSPARENT PORTFOLIO DECK */}
              {showDirectorDeck && (
                <motion.div
                  key={`portfolio-deck-window-${deckResetKey}`}
                  drag={isDeckFloating}
                  dragControls={portfolioDeckDragControls}
                  dragListener={false}
                  dragMomentum={false}
                  dragElastic={0.08}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  style={{ touchAction: 'none' }}
                  className="lg:col-span-5 z-40 bg-slate-950/50 backdrop-blur-2xl rounded-3xl border border-white/30 p-4 sm:p-5 shadow-[0_12px_42px_rgba(0,0,0,0.55)] ring-1 ring-white/20 space-y-3.5"
                >
                  {/* Moveable Window Drag Handle Bar */}
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
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-amber-400/20 border border-amber-400/40 text-amber-300">
                        <GripHorizontal className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                          <span>Portfolio Deck</span>
                          <span className="px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-[9px] text-amber-300 font-bold">
                            {isDeckFloating ? 'Drag Anywhere' : 'Docked'}
                          </span>
                        </div>
                        <div className="text-[10px] text-amber-200 font-semibold mt-0.5">
                          Capsule Pods • Highrise Projects • UPVC • Villas
                        </div>
                      </div>
                    </div>

                    <div
                      className="flex items-center gap-1"
                      onPointerDown={e => e.stopPropagation()}
                    >
                      {isDeckFloating && (
                        <button
                          type="button"
                          onClick={handleResetDeckPosition}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 hover:text-amber-300 cursor-pointer transition-colors"
                          title="Reset Portfolio Deck Position"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setShowLeftDescription(prev => !prev)}
                        className={`px-2 py-1 rounded-lg border text-[10px] font-bold cursor-pointer transition-colors ${
                          !showLeftDescription
                            ? 'bg-amber-400 text-slate-950 border-amber-300'
                            : 'bg-white/15 hover:bg-white/25 border-white/20 text-white'
                        }`}
                        title={
                          showLeftDescription
                            ? 'Hide Full Text & Keep Minimal Banner Info'
                            : 'Show Full Text Description'
                        }
                      >
                        {showLeftDescription ? 'Hide Text' : 'Show Text'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsVideoTourActive(prev => !prev)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer transition-all border ${
                          isVideoTourActive
                            ? 'bg-amber-400 text-slate-950 border-amber-300'
                            : 'bg-white/15 text-white border-white/20 hover:bg-white/25'
                        }`}
                      >
                        {isVideoTourActive ? 'Photos' : 'Video'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsDeckMinimized(prev => !prev)}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white cursor-pointer"
                        title={isDeckMinimized ? 'Expand Portfolio Deck' : 'Collapse Portfolio Deck'}
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
                        className="px-2 py-1 rounded-lg bg-white/10 hover:bg-rose-500/30 border border-white/15 text-[10px] font-bold text-slate-200 hover:text-white cursor-pointer"
                        title="Hide Portfolio Deck"
                      >
                        Hide
                      </button>
                    </div>
                  </div>

                  {!isDeckMinimized && (
                    <>
                      {/* Crystal Category Tabs */}
                      <div className="grid grid-cols-5 gap-1 bg-slate-950/45 backdrop-blur-md p-1 rounded-xl border border-white/20">
                        {(
                          [
                            { id: 'all_showroom', label: 'All' },
                            { id: 'capsule_containers', label: 'Capsules' },
                            { id: 'highrise_projects', label: 'Highrise' },
                            { id: 'properties_plots_villas', label: 'Plots/Villas' },
                            { id: 'upvc_construction', label: 'UPVC' }
                          ] as { id: TourDeckCategory; label: string }[]
                        ).map(tab => (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => setTourCategory(tab.id)}
                            className={`py-1.5 px-1.5 rounded-lg text-[9.5px] font-extrabold uppercase tracking-wider transition-all cursor-pointer truncate ${
                              tourCategory === tab.id
                                ? 'bg-amber-400 text-slate-950 shadow-sm'
                                : 'text-white/90 hover:text-white hover:bg-white/15'
                            }`}
                            title={tab.label}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      {/* Interactive Thumbnail Matrix */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[240px] overflow-y-auto pr-1 scrollbar-thin">
                        {cameraWaypoints.map((wp, idx) => {
                          const active = waypointIdx === idx;
                          const thumbSrc = resolveImageWithFallback(wp);
                          return (
                            <button
                              key={wp.id}
                              type="button"
                              onClick={() => {
                                setIsVideoTourActive(false);
                                setWaypointIdx(idx);
                              }}
                              className={`group relative rounded-xl overflow-hidden border text-left transition-all cursor-pointer h-20 ${
                                active
                                  ? 'border-amber-400 ring-2 ring-amber-400/60 shadow-md'
                                  : 'border-white/25 opacity-90 hover:opacity-100 hover:border-white/60'
                              }`}
                            >
                              <img
                                src={thumbSrc}
                                alt={wp.label}
                                loading="lazy"
                                onError={() => handleImageError(thumbSrc, wp.label)}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent" />
                              <div className="absolute top-1 left-1.5 px-1.5 py-0.2 rounded bg-slate-950/70 backdrop-blur-xs text-[8px] font-mono font-bold text-amber-300 border border-white/20">
                                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                              </div>
                              <div className="absolute bottom-1 left-1.5 right-1.5">
                                <div className="text-[10px] font-extrabold text-white truncate leading-tight drop-shadow-xs">
                                  {wp.label}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Panel Footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/20 text-[11px]">
                        <div className="flex items-center gap-1.5 text-white/90">
                          <Info className="w-3.5 h-3.5 text-amber-300" />
                          <span>Capsule Pods, Highrises &amp; UPVC</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setTourCategory('capsule_containers');
                              onSelectCategoryFilter('modular');
                            }}
                            className="text-amber-300 hover:text-amber-200 font-bold underline cursor-pointer"
                          >
                            Capsules
                          </button>
                          <span className="text-white/40">•</span>
                          <button
                            type="button"
                            onClick={() => {
                              setTourCategory('upvc_construction');
                              onSelectCategoryFilter('projects');
                            }}
                            className="text-amber-300 hover:text-amber-200 font-bold underline cursor-pointer"
                          >
                            UPVC Models
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* Clean View Minimal Card */
            <motion.div
              key="clean-view-hud"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="my-auto flex items-end justify-between"
            >
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/25 max-w-md shadow-2xl">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 block">
                  {activeWaypoint.code}
                </span>
                <h2 className="text-xl font-black text-white mt-0.5">
                  {activeWaypoint.headline}
                </h2>
                <p className="text-xs text-slate-100 mt-1">{activeWaypoint.subLabel}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =====================================================================
            5. BOTTOM TIMELINE & SLIDE NAVIGATION CONTROLS
           ===================================================================== */}
        <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Waypoint Progress Scrubber */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar py-1">
            {cameraWaypoints.map((wp, idx) => {
              const isCurrent = waypointIdx === idx;
              return (
                <button
                  key={wp.id}
                  type="button"
                  onClick={() => {
                    setIsVideoTourActive(false);
                    setWaypointIdx(idx);
                  }}
                  className="group flex flex-col gap-1 text-left cursor-pointer shrink-0"
                  title={`${wp.label} — ${wp.subLabel}`}
                >
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-[9px] font-mono font-bold transition-colors ${
                        isCurrent
                          ? 'text-amber-300'
                          : 'text-white/60 group-hover:text-white/90'
                      }`}
                    >
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <span
                      className={`text-[10px] font-bold truncate max-w-[105px] transition-colors ${
                        isCurrent ? 'text-white' : 'text-white/60 group-hover:text-white/90'
                      }`}
                    >
                      {wp.label}
                    </span>
                  </div>
                  <div className="w-16 sm:w-20 h-1 rounded-full bg-white/20 overflow-hidden">
                    {isCurrent ? (
                      <motion.div
                        key={`progress-${wp.id}-${isPaused}`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{
                          duration: isPaused ? 0.2 : WAYPOINT_DURATION_MS / 1000,
                          ease: 'linear'
                        }}
                        className="h-full bg-amber-400"
                      />
                    ) : (
                      <div className="h-full w-0 group-hover:w-full bg-white/60 transition-all duration-300" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Previous / Pause / Next Controls */}
          <div className="flex items-center gap-2 shrink-0 ml-auto">
            {!showLeftDescription && (
              <button
                type="button"
                onClick={() => setShowLeftDescription(true)}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white border border-white/25 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-amber-300" />
                <span>Show Text</span>
              </button>
            )}

            {!showDirectorDeck && (
              <button
                type="button"
                onClick={() => setShowDirectorDeck(true)}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-xl text-amber-300 border border-white/25 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Show Portfolio Deck</span>
              </button>
            )}

            <button
              type="button"
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-slate-950 backdrop-blur-xl text-white border border-white/25 transition-all cursor-pointer"
              title="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsPaused(prev => !prev)}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white border border-white/25 text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-amber-300" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-300" />
                  <span>Pause</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-slate-950 backdrop-blur-xl text-white border border-white/25 transition-all cursor-pointer"
              title="Next Slide"
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

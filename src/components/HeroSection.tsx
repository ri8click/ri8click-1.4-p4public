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
  CheckCircle2,
  ExternalLink,
  Info,
  HardHat,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  GripHorizontal,
  ShieldCheck,
  ImageOff,
  FileText
} from 'lucide-react';
import { HeroSlide, Property, PropertyCategory } from '../types';

interface HeroSectionProps {
  slides: HeroSlide[];
  properties?: Property[];
  onExploreClick: () => void;
  onContactAgentClick: () => void;
  onSelectCategoryFilter: (category: PropertyCategory) => void;
  onOpen3DTour: (propertyData: Partial<Property>) => void;
}

type TourDeckCategory =
  | 'all_showroom'
  | 'capsule_containers'
  | 'highrise_projects'
  | 'properties_plots_villas'
  | 'upvc_construction';

interface BrokenImageRecord {
  id: string;
  brokenUrl: string;
  replacedWithUrl: string;
  waypointLabel: string;
  timestamp: string;
}

interface CameraWaypoint {
  id: string;
  tourCategory: Exclude<TourDeckCategory, 'all_showroom'>;
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
  secondaryImageUrl: string;
  fallbackUrl: string;
  legacyBrokenUrl?: string;
  galleryImages?: string[];
  videoUrl: string;
  motionOrigin: string;
  panX: [string, string];
  panY: [string, string];
  scaleRange: [number, number];
  specs: {
    id: string;
    title: string;
    spec: string;
  }[];
}

// ============================================================================
// 1. VERIFIED ISLAMABAD HIGHRISE PROJECTS GALLERY (Towers.pk Verified Assets)
// ============================================================================
const ISLAMABAD_HIGHRISE_PROJECTS_GALLERY = {
  centaurusTower: 'https://towers.pk/wp-content/uploads/sites/2/2021/10/centaurus.jpg',
  stateLifeTower: 'https://towers.pk/wp-content/uploads/sites/2/2022/10/state-life-tower-islamabad.jpg',
  ufoneJinnahAvenue: 'https://towers.pk/wp-content/uploads/sites/2/2021/11/jinnah-avenue-2000-496x341.jpg',
  iseTowerBlueArea: 'https://towers.pk/wp-content/uploads/sites/2/2022/10/ise-tower-islamabad.jpg',
  gigaMallTower: 'https://towers.pk/wp-content/uploads/sites/2/2021/11/giga-mall-islamabad.jpg',
  skyparkOneGulberg: 'https://towers.pk/wp-content/uploads/sites/2/2022/10/skypark-one-gulberg-greens-islamabad-596x341.png',
  oneConstitutionAve: 'https://towers.pk/wp-content/uploads/sites/2/2021/11/one-constitution-avenue-islamabad.jpg',
  lignumTower: 'https://towers.pk/wp-content/uploads/sites/2/2022/10/lignum-tower-islamabad.jpg',
  grandOrchardDha: 'https://towers.pk/wp-content/uploads/sites/2/2022/10/grand-orchard-islamabad.jpg',
  greenTrustTower: 'https://towers.pk/wp-content/uploads/sites/2/2022/10/green-trust-tower-islamabad.jpg',
  saudiPakTower: 'https://towers.pk/wp-content/uploads/sites/2/2021/11/saudi-pak-tower-islamabad.jpg',
  fallbackHighrise1: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=95',
  fallbackHighrise2: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=2400&q=95',
  fallbackHighrise3: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=95'
};

// ============================================================================
// 2. VERIFIED MODULAR & SPACE CAPSULE SMART HOUSES GALLERY (7-Image Sequence)
// ============================================================================
const MODULAR_CAPSULE_GALLERY = {
  cap8_q3ForestCabinPod: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=2400&q=95',
  cap9_k5WaterfrontPod: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=2400&q=95',
  cap10_rooftopDeckContainerVilla: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=95',
  cap11_hexLitBlackContainerPod: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2400&q=95',
  cap12_curvedCornerGlassContainer: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=95',
  cap13_v2124DoubleDeckerCapsule: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=95',
  cap14_lakesideCurvedGlassCapsule: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=95',
  fallbackCapsule1: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=2400&q=95',
  fallbackCapsule2: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=95',
  fallbackCapsule3: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2400&q=95',
  fallbackCapsule4: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=95'
};

const MODULAR_CAPSULE_SEQUENCE_LIST = [
  MODULAR_CAPSULE_GALLERY.cap8_q3ForestCabinPod,
  MODULAR_CAPSULE_GALLERY.cap9_k5WaterfrontPod,
  MODULAR_CAPSULE_GALLERY.cap10_rooftopDeckContainerVilla,
  MODULAR_CAPSULE_GALLERY.cap11_hexLitBlackContainerPod,
  MODULAR_CAPSULE_GALLERY.cap12_curvedCornerGlassContainer,
  MODULAR_CAPSULE_GALLERY.cap13_v2124DoubleDeckerCapsule,
  MODULAR_CAPSULE_GALLERY.cap14_lakesideCurvedGlassCapsule
];

const CONSTRUCTED_HOUSES_GALLERY = {
  house1_whiteVilla: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=95',
  house2_modernEstate: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=95',
  house3_stoneGlassMansion: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=95'
};

const UPVC_AND_INTERIOR_GALLERY = {
  upvc1_slidingPatioDoors: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2400&q=95',
  upvc2_casementTiltTurnWindows: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=95',
  upvc3_acousticGlassPartitions: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2400&q=95'
};

const SHOWROOM_VIDEOS = {
  architecturalFlyover: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  capsuleDroneReveal: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  villaDroneOrbit: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
};

const INITIAL_REPLACED_BROKEN_LINKS: BrokenImageRecord[] = [
  {
    id: 'rep-1',
    brokenUrl: 'legacy-highrise-asset-1',
    replacedWithUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.centaurusTower,
    waypointLabel: 'The Centaurus & Citadel 7 Highrise',
    timestamp: 'Replaced with Active Towers.pk Media'
  },
  {
    id: 'rep-2',
    brokenUrl: 'legacy-highrise-asset-2',
    replacedWithUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.gigaMallTower,
    waypointLabel: 'Giga Mall & WTC Highrise Project',
    timestamp: 'Replaced with Active Towers.pk Media'
  },
  {
    id: 'rep-3',
    brokenUrl: 'legacy-highrise-asset-3',
    replacedWithUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.ufoneJinnahAvenue,
    waypointLabel: 'Ufone & ISE Corporate Towers',
    timestamp: 'Replaced with Active Towers.pk Media'
  },
  {
    id: 'rep-4',
    brokenUrl: 'legacy-highrise-asset-4',
    replacedWithUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.skyparkOneGulberg,
    waypointLabel: 'Skypark One & One Constitution Ave',
    timestamp: 'Replaced with Active Towers.pk Media'
  },
  {
    id: 'rep-5',
    brokenUrl: 'legacy-highrise-asset-5',
    replacedWithUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.stateLifeTower,
    waypointLabel: 'State Life & Green Trust Towers',
    timestamp: 'Replaced with Active Towers.pk Media'
  }
];

const MASTER_VIRTUAL_TOUR_WAYPOINTS: CameraWaypoint[] = [
  // ==========================================================================
  // PILLAR 1: CONTAINER & SPACE CAPSULE SMART HOUSES (7-Image Sequence)
  // ==========================================================================
  {
    id: 'capsule-seq-8-q3',
    tourCategory: 'capsule_containers',
    propertyCategory: 'modular',
    divisionTag: 'RI8CLICK CONSORTIUM // CAPSULE & CONTAINER SMART HOUSES (01 / 07)',
    code: 'CAPSULE 01 // MODEL Q3 PITCHED-ROOF CABIN POD',
    label: 'Model Q3 Forest Cabin Pod',
    subLabel: 'Pitched-Roof Panoramic Glass Capsule House with Warm LED Deck',
    headline: 'Ri8click Model Q3 Pitched-Roof Smart Capsule Cabin',
    description:
      'Engineered with an insulated pitched roof, warm cedar-tone interior ceiling, floor-to-ceiling thermal UPVC glazing, and an illuminated composite patio deck. Crane-delivered ready to live in 7 to 21 days.',
    valuation: 'PKR 48 Lakh – 68 Lakh',
    locationBadge: 'Turnkey Delivery: Murree, Nathia Gali, Taxila & Islamabad Farms',
    focalLength: '24MM PRIME',
    altitude: 'EYE-LEVEL DECK',
    fov: '86° WIDE',
    imageUrl: MODULAR_CAPSULE_GALLERY.cap8_q3ForestCabinPod,
    secondaryImageUrl: MODULAR_CAPSULE_GALLERY.cap9_k5WaterfrontPod,
    fallbackUrl: MODULAR_CAPSULE_GALLERY.fallbackCapsule1,
    galleryImages: MODULAR_CAPSULE_SEQUENCE_LIST,
    videoUrl: SHOWROOM_VIDEOS.architecturalFlyover,
    motionOrigin: 'center center',
    panX: ['-0.6%', '0.6%'],
    panY: ['0%', '-0.4%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'cap8-1',
        title: 'Pitched Thermal Roof & Double-Glazed UPVC',
        spec: 'All-weather mountain & resort roof profile with full-height acoustic glass.'
      },
      {
        id: 'cap8-2',
        title: 'Illuminated Outdoor Patio Deck Included',
        spec: 'Factory-wired warm perimeter LED lighting and weatherproof outdoor steps.'
      }
    ]
  },
  {
    id: 'capsule-seq-9-k5',
    tourCategory: 'capsule_containers',
    propertyCategory: 'modular',
    divisionTag: 'RI8CLICK CONSORTIUM // CAPSULE & CONTAINER SMART HOUSES (02 / 07)',
    code: 'CAPSULE 02 // L-SHAPED LOFT CONTAINER VILLA',
    label: 'L-Shaped Loft Container Villa',
    subLabel: 'Multi-Module Cantilevered Container Home with Upper Glass Balcony',
    headline: 'Ri8click L-Shaped Two-Level Container Villa',
    description:
      'Architectural multi-container configuration featuring a ground-level L-shaped family wing, a cantilevered upper-floor glass lounge, and an expansive open-air rooftop terrace.',
    valuation: 'PKR 82 Lakh – 1.25 Crore',
    locationBadge: 'Custom Turnkey Layout • Faisal Hills, Chak Shahzad & B-17 Farm Estates',
    focalLength: '20MM WIDE',
    altitude: 'GARDEN ELEVATION',
    fov: '92° EXPANSIVE',
    imageUrl: MODULAR_CAPSULE_GALLERY.cap9_k5WaterfrontPod,
    secondaryImageUrl: MODULAR_CAPSULE_GALLERY.cap10_rooftopDeckContainerVilla,
    fallbackUrl: MODULAR_CAPSULE_GALLERY.fallbackCapsule2,
    galleryImages: MODULAR_CAPSULE_SEQUENCE_LIST,
    videoUrl: SHOWROOM_VIDEOS.architecturalFlyover,
    motionOrigin: 'center center',
    panX: ['0.6%', '-0.6%'],
    panY: ['-0.3%', '0.3%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'cap9-1',
        title: 'Dual-Level Modular Steel Architecture',
        spec: 'Seismic Grade-9 galvanized steel frame with dark architectural cladding.'
      },
      {
        id: 'cap9-2',
        title: 'Upper Observation Lounge & Terrace',
        spec: 'Panoramic glass walls with glass-railing upper deck and recessed lighting.'
      }
    ]
  },
  {
    id: 'capsule-seq-10-rooftop',
    tourCategory: 'capsule_containers',
    propertyCategory: 'modular',
    divisionTag: 'RI8CLICK CONSORTIUM // CAPSULE & CONTAINER SMART HOUSES (03 / 07)',
    code: 'CAPSULE 03 // SKY-DECK CONTAINER PAVILION',
    label: 'Sky-Deck Container Villa',
    subLabel: 'Single-Story Luxury Container Home with Full-Span Rooftop Lounge',
    headline: 'Modular Container Villa with Spiral Stair & Sky-Deck',
    description:
      'Contemporary charcoal-grey modular container residence featuring three panoramic glass bays, warm wood-slat soffits, an external spiral staircase, and a full-length glass-balustrade rooftop lounge.',
    valuation: 'PKR 55 Lakh – 78 Lakh',
    locationBadge: 'Faisal Hills, Taxila, Khanpur Dam & Hill Resorts',
    focalLength: '24MM ARCHITECTURAL',
    altitude: 'FRONT COURTYARD',
    fov: '86° WIDE',
    imageUrl: MODULAR_CAPSULE_GALLERY.cap10_rooftopDeckContainerVilla,
    secondaryImageUrl: MODULAR_CAPSULE_GALLERY.cap11_hexLitBlackContainerPod,
    fallbackUrl: MODULAR_CAPSULE_GALLERY.fallbackCapsule3,
    galleryImages: MODULAR_CAPSULE_SEQUENCE_LIST,
    videoUrl: SHOWROOM_VIDEOS.architecturalFlyover,
    motionOrigin: 'center center',
    panX: ['-0.5%', '0.5%'],
    panY: ['0%', '-0.5%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'cap10-1',
        title: 'Full-Length Rooftop Sky-Deck & Spiral Stair',
        spec: 'Tempered glass rooftop railing with outdoor pergola frame and lounge space.'
      },
      {
        id: 'cap10-2',
        title: 'Triple-Bay Panoramic UPVC Glazing',
        spec: 'Acoustic and thermal double-glazed windows manufactured by Ri8click UPVC.'
      }
    ]
  },
  {
    id: 'capsule-seq-11-hex-black',
    tourCategory: 'capsule_containers',
    propertyCategory: 'modular',
    divisionTag: 'RI8CLICK CONSORTIUM // CAPSULE & CONTAINER SMART HOUSES (04 / 07)',
    code: 'CAPSULE 04 // HEX-LIT DESIGNER CONTAINER POD',
    label: 'Hex-Lit Matte-Black Pod',
    subLabel: 'Ultra-Modern Matte-Black Container Suite with Geometric Ceiling Lights',
    headline: 'Matte-Black Executive Container Pod with Geometric LED Ceiling',
    description:
      'Striking matte-black architectural container suite featuring hexagonal LED ceiling illumination, custom wooden privacy louvers, and frameless corner glass opening onto a landscaped stone patio.',
    valuation: 'PKR 64 Lakh – 88 Lakh',
    locationBadge: 'Executive Farmhouses, Glamping Resorts & Rooftops',
    focalLength: '22MM WIDE',
    altitude: 'GARDEN PAVILION',
    fov: '88° WIDE',
    imageUrl: MODULAR_CAPSULE_GALLERY.cap11_hexLitBlackContainerPod,
    secondaryImageUrl: MODULAR_CAPSULE_GALLERY.cap12_curvedCornerGlassContainer,
    fallbackUrl: MODULAR_CAPSULE_GALLERY.fallbackCapsule4,
    galleryImages: MODULAR_CAPSULE_SEQUENCE_LIST,
    videoUrl: SHOWROOM_VIDEOS.architecturalFlyover,
    motionOrigin: 'center center',
    panX: ['0.5%', '-0.5%'],
    panY: ['0.3%', '-0.3%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'cap11-1',
        title: 'Hexagonal Smart LED Architectural Ceiling',
        spec: 'App-controlled dimmable geometric lighting with integrated climate diffusers.'
      },
      {
        id: 'cap11-2',
        title: 'Architectural Timber Louvers & Corner Glass',
        spec: 'Combines open panoramic garden views with slatted wood sun-shading.'
      }
    ]
  },
  {
    id: 'capsule-seq-12-curved-corner',
    tourCategory: 'capsule_containers',
    propertyCategory: 'modular',
    divisionTag: 'RI8CLICK CONSORTIUM // CAPSULE & CONTAINER SMART HOUSES (05 / 07)',
    code: 'CAPSULE 05 // CURVED-CORNER GLASS STUDIO POD',
    label: 'Curved-Corner Studio Pod',
    subLabel: 'Rounded-Edge Panoramic Glass Container Studio with Timber Deck',
    headline: 'Curved-Corner Architectural Container Studio & Executive Suite',
    description:
      'Sleek rounded-corner steel and glass modular pod combining industrial precision with warm residential comfort. Includes an integrated wooden veranda, recessed soffit spots, and full smart-home controls.',
    valuation: 'PKR 46 Lakh – 65 Lakh',
    locationBadge: 'Turnkey Placement Across Pakistan in 10 Days',
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
        title: '270° Curved Tempered Observation Glass',
        spec: 'Unobstructed panoramic water and mountain views with operable side vents.'
      },
      {
        id: 'cap14-2',
        title: 'Turnkey Waterfront & Resort Setup',
        spec: 'Includes composite deck platform, smart climate control, and luxury bath suite.'
      }
    ]
  },

  // ==========================================================================
  // PILLAR 2: HIGHRISE PROJECTS (Verified Towers.pk Islamabad Data)
  // ==========================================================================
  {
    id: 'highrise-centaurus-citadel-isb',
    tourCategory: 'highrise_projects',
    propertyCategory: 'commercial',
    divisionTag: 'RI8CLICK CONSORTIUM // ISLAMABAD HIGHRISE PROJECTS (TOWERS.PK VERIFIED)',
    code: 'ISB 01 // THE CENTAURUS & CITADEL 7 BLUE AREA',
    label: 'The Centaurus & Citadel 7',
    subLabel: '42-Storey (656 Ft) Iconic Mixed-Use Skyscraper & 20-Storey Corporate Tower',
    headline: 'The Centaurus & Citadel 7 Highrise Projects — Jinnah Avenue, Blue Area',
    description:
      'Islamabad’s #1 tallest iconic 42-storey (656 ft) mixed-use highrise complex alongside the 20-storey (272 ft) Citadel 7 corporate & retail tower on Main Jinnah Avenue, Sector F-8 / Blue Area.',
    valuation: 'Shops PKR 1.5–3.0 Cr • Offices 2.0–3.5 Cr • Suites 3.0–6.0 Cr',
    locationBadge: 'Main Jinnah Avenue, Sector F-8 / Blue Area, Islamabad',
    focalLength: '24MM ARCHITECTURAL',
    altitude: '656 FT / 42 FLOORS',
    fov: '85° WIDE',
    imageUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.centaurusTower,
    secondaryImageUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.ufoneJinnahAvenue,
    fallbackUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.fallbackHighrise1,
    galleryImages: [
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.centaurusTower,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.ufoneJinnahAvenue,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.oneConstitutionAve
    ],
    videoUrl: SHOWROOM_VIDEOS.architecturalFlyover,
    motionOrigin: 'center center',
    panX: ['-0.6%', '0.6%'],
    panY: ['0%', '-0.5%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'hr1-spec-1',
        title: 'Towers.pk #1 Ranked Islamabad Skyscraper',
        spec: '42 floors / 656 feet mixed-use landmark with 5-star hotel, mall, and residential towers.'
      },
      {
        id: 'hr1-spec-2',
        title: 'Citadel 7 Corporate Suites & Retail Podium',
        spec: '20-storey CDA-approved glass tower with 4-floor shopping mall and corporate offices.'
      }
    ]
  },
  {
    id: 'highrise-giga-mall-wtc-isb',
    tourCategory: 'highrise_projects',
    propertyCategory: 'commercial',
    divisionTag: 'RI8CLICK CONSORTIUM // ISLAMABAD HIGHRISE PROJECTS (TOWERS.PK VERIFIED)',
    code: 'ISB 02 // GIGA MALL & WORLD TRADE CENTER DHA-2',
    label: 'Giga Mall & WTC Highrise',
    subLabel: '14-Storey (279 Ft) World Trade Center Retail & Corporate Highrise Complex',
    headline: 'Giga Mall & WTC Highrise Project — DHA Phase 2, GT Road Islamabad',
    description:
      'Ranked #13 tallest in Islamabad on Towers.pk, Giga Mall (World Trade Center) in DHA Phase 2 on Main GT Road spans 14 stories (279 ft) of international brand outlets, corporate offices, and hotel suites.',
    valuation: 'Offices PKR 2.0–15.0 Crore • Luxury Suites 2.1–10.0 Crore',
    locationBadge: 'Main GT Road, Sector A, DHA Phase 2, Islamabad',
    focalLength: '28MM DRONE',
    altitude: '279 FT / RANKED #13 ISB',
    fov: '82° STANDARD',
    imageUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.gigaMallTower,
    secondaryImageUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.grandOrchardDha,
    fallbackUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.fallbackHighrise2,
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
        title: 'World Trade Center (WTC) Islamabad Hub',
        spec: 'Over 200+ multinational retail brands, hypermarket, cineplex, and corporate floors.'
      },
      {
        id: 'hr2-spec-2',
        title: 'Giga Mall Extension & Goldcrest Views',
        spec: 'Connected to 40-storey Goldcrest highrise apartments with 2-year installment options.'
      }
    ]
  },
  {
    id: 'highrise-ufone-ise-towers-isb',
    tourCategory: 'highrise_projects',
    propertyCategory: 'commercial',
    divisionTag: 'RI8CLICK CONSORTIUM // ISLAMABAD HIGHRISE PROJECTS (TOWERS.PK VERIFIED)',
    code: 'ISB 03 // UFONE TOWER (423 FT) & ISE TOWERS BLUE AREA',
    label: 'Ufone & ISE Corporate Towers',
    subLabel: '28-Storey Telecom HQ (423 Ft) & 22-Storey Stock Exchange Financial Highrise',
    headline: 'Jinnah Avenue Corporate Skyline — Ufone Tower & ISE Towers Blue Area',
    description:
      'Anchored by the 28-storey (423 ft) Ufone Tower and 22-storey (305 ft) Islamabad Stock Exchange (ISE) Towers on Jinnah Avenue, Sector F-7/G-7 Blue Area—Pakistan’s premier Grade-A financial corridor.',
    valuation: 'Offices PKR 50L–1.40 Cr • Floor Rent PKR 15.4L–16.2L / Mo',
    locationBadge: 'Jinnah Avenue, Sector F-7 / G-7 Blue Area, Islamabad',
    focalLength: '22MM WIDE',
    altitude: '423 FT / 28 FLOORS',
    fov: '88° ARCHITECTURAL',
    imageUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.ufoneJinnahAvenue,
    secondaryImageUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.iseTowerBlueArea,
    fallbackUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.fallbackHighrise1,
    galleryImages: [
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.ufoneJinnahAvenue,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.iseTowerBlueArea,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.saudiPakTower
    ],
    videoUrl: SHOWROOM_VIDEOS.architecturalFlyover,
    motionOrigin: 'center center',
    panX: ['-0.5%', '0.5%'],
    panY: ['0%', '-0.4%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'hr3-spec-1',
        title: 'Ranked #10 & #12 Tallest in Islamabad',
        spec: 'Grade-A corporate floors (PKR 350–700/sq.ft. rent) with 3-basement parking and helipad.'
      },
      {
        id: 'hr3-spec-2',
        title: 'Adjacent Saudi Pak Tower (20 Floors / 261 Ft)',
        spec: 'Iconic Postmodern heritage highrise housing multinational embassies and UN offices.'
      }
    ]
  },
  {
    id: 'highrise-skypark-constitution-isb',
    tourCategory: 'highrise_projects',
    propertyCategory: 'commercial',
    divisionTag: 'RI8CLICK CONSORTIUM // ISLAMABAD HIGHRISE PROJECTS (TOWERS.PK VERIFIED)',
    code: 'ISB 04 // SKYPARK ONE, ONE CONSTITUTION AVE & LIGNUM TOWER',
    label: 'Skypark One & Constitution Ave',
    subLabel: '26-Storey One Constitution Ave (346 Ft), Lignum Tower DHA-2 & Skypark One',
    headline: 'One Constitution Avenue, Skypark One Gulberg & Lignum Tower Highrises',
    description:
      'Featuring the twin 26-storey (346 ft) One Constitution Avenue towers overlooking Rawal Lake, the 20-storey (279 ft) Lignum Tower in DHA Phase 2, and Skypark One in Gulberg Greens (#18 ranked in Islamabad).',
    valuation: 'Commercial & Luxury Highrise Units from PKR 1.45 Crore+',
    locationBadge: 'Constitution Avenue, Gulberg Greens & DHA Phase 2, Islamabad',
    focalLength: '24MM PRIME',
    altitude: '346 FT / 26 FLOORS',
    fov: '84° WIDE',
    imageUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.skyparkOneGulberg,
    secondaryImageUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.oneConstitutionAve,
    fallbackUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.fallbackHighrise3,
    galleryImages: [
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.skyparkOneGulberg,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.oneConstitutionAve,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.lignumTower
    ],
    videoUrl: SHOWROOM_VIDEOS.architecturalFlyover,
    motionOrigin: 'center center',
    panX: ['0.5%', '-0.5%'],
    panY: ['0.3%', '-0.3%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'hr4-spec-1',
        title: 'One Constitution Ave (Ranked #11 in Islamabad)',
        spec: '26-storey luxury serviced apartments and corporate suites overlooking Margalla & Rawal Lake.'
      },
      {
        id: 'hr4-spec-2',
        title: 'Lignum Tower (279 Ft) & Skypark One (233 Ft)',
        spec: 'Eco-smart highrise architecture with central HVAC, high-speed lifts, and panoramic terraces.'
      }
    ]
  },
  {
    id: 'highrise-statelife-greentrust-orchard-isb',
    tourCategory: 'highrise_projects',
    propertyCategory: 'commercial',
    divisionTag: 'RI8CLICK CONSORTIUM // ISLAMABAD HIGHRISE PROJECTS (TOWERS.PK VERIFIED)',
    code: 'ISB 05 // STATE LIFE, GREEN TRUST & GRAND ORCHARD TOWERS',
    label: 'State Life & Grand Orchard',
    subLabel: '19-Storey State Life Tower (262 Ft), Green Trust Tower & Grand Orchard DHA',
    headline: 'State Life Tower Blue Area, Green Trust Tower & Grand Orchard DHA-1',
    description:
      'Showcasing the 19-storey (262 ft) State Life Tower on Jinnah Avenue (ranked #18), the 16-storey Green Trust eco-commercial tower in F-6/1 Blue Area, and the 15-storey Grand Orchard project in DHA Phase 1.',
    valuation: 'Shops PKR 45L–3.5 Cr • Offices PKR 80L–3.5 Cr • 8–9% Yield',
    locationBadge: 'Jinnah Avenue Blue Area & DHA Phase 1, Islamabad',
    focalLength: '26MM ARCHITECTURAL',
    altitude: '262 FT / 19 FLOORS',
    fov: '84° WIDE',
    imageUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.stateLifeTower,
    secondaryImageUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.grandOrchardDha,
    fallbackUrl: ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.fallbackHighrise2,
    galleryImages: [
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.stateLifeTower,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.greenTrustTower,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.grandOrchardDha,
      ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.saudiPakTower
    ],
    videoUrl: SHOWROOM_VIDEOS.architecturalFlyover,
    motionOrigin: 'center center',
    panX: ['-0.5%', '0.5%'],
    panY: ['0%', '-0.4%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'hr5-spec-1',
        title: '8–9% Annual Commercial Rental Yield',
        spec: 'High-demand corporate offices and retail podiums with 25–30% down payment plans.'
      },
      {
        id: 'hr5-spec-2',
        title: 'Ri8click Turnkey UPVC & Acoustic Glazing',
        spec: 'Engineered with double-glazed curtain walls for 40% thermal and highway noise reduction.'
      }
    ]
  },

  // ==========================================================================
  // PILLAR 3: PROPERTIES — RESIDENTIAL & COMMERCIAL PLOTS + CONSTRUCTED HOUSES
  // ==========================================================================
  {
    id: 'prop-wp-1',
    tourCategory: 'properties_plots_villas',
    propertyCategory: 'residential',
    divisionTag: 'RI8CLICK CONSORTIUM // PROPERTIES: PLOTS & CONSTRUCTED HOUSES',
    code: 'PROP 01 // CONSTRUCTED VILLA & POSSESSION PLOTS',
    label: '1-Kanal Designer Villa & Plots',
    subLabel: 'Constructed Luxury Houses & 5M, 10M, 1-Kanal Possession Plots',
    headline: 'Constructed 1-Kanal Modern Villa & Prime Possession Plots',
    description:
      'Turnkey constructed designer villas alongside verified 5-Marla, 10-Marla, and 1-to-2 Kanal residential & commercial plots in Faisal Hills, Kohistan Enclave, Multi Gardens B-17, and DHA Islamabad.',
    valuation: 'Plots from PKR 45 Lakh • Constructed Villas PKR 6.85 Cr+',
    locationBadge: 'Faisal Hills Executive Block, Taxila & Islamabad Sectors',
    focalLength: '24MM ARCHITECTURAL',
    altitude: 'COURTYARD LEVEL',
    fov: '84° NATURAL',
    imageUrl: CONSTRUCTED_HOUSES_GALLERY.house1_whiteVilla,
    secondaryImageUrl: CONSTRUCTED_HOUSES_GALLERY.house2_modernEstate,
    fallbackUrl: CONSTRUCTED_HOUSES_GALLERY.house3_stoneGlassMansion,
    galleryImages: [
      CONSTRUCTED_HOUSES_GALLERY.house1_whiteVilla,
      CONSTRUCTED_HOUSES_GALLERY.house2_modernEstate,
      CONSTRUCTED_HOUSES_GALLERY.house3_stoneGlassMansion
    ],
    videoUrl: SHOWROOM_VIDEOS.villaDroneOrbit,
    motionOrigin: 'center center',
    panX: ['-0.6%', '0.6%'],
    panY: ['0%', '-0.4%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'p1-1',
        title: 'Residential & Commercial Possession Plots',
        spec: '100% NOC-verified plots with direct transfer in Faisal Hills, B-17 & DHA.'
      },
      {
        id: 'p1-2',
        title: 'A+ Turnkey Constructed Designer Houses',
        spec: '5 en-suite bedrooms, Ri8click UPVC double glazing, Spanish tiles & 10kW solar.'
      }
    ]
  },
  {
    id: 'prop-wp-2',
    tourCategory: 'properties_plots_villas',
    propertyCategory: 'residential',
    divisionTag: 'RI8CLICK CONSORTIUM // PROPERTIES: PLOTS & CONSTRUCTED HOUSES',
    code: 'PROP 02 // MARGALLA RIDGE ESTATE & B-17 PLOTS',
    label: 'Margalla View Constructed Estate',
    subLabel: 'Double-Height Glass Residence & High-Appreciation Plot Inventory',
    headline: 'Margalla Foothills Constructed Villa & Investment Plots',
    description:
      'Constructed contemporary estate featuring double-height UPVC thermal windows, private lawn, and smart security, paired with high-yield plot files and on-ground plots across Rawalpindi, Taxila, and Islamabad.',
    valuation: 'Constructed Estates PKR 5.90 Cr – 7.40 Cr',
    locationBadge: 'Multi Gardens B-17, Kohistan Enclave & DHA Islamabad',
    focalLength: '20MM WIDE',
    altitude: 'GARDEN LEVEL',
    fov: '90° EXPANSIVE',
    imageUrl: CONSTRUCTED_HOUSES_GALLERY.house2_modernEstate,
    secondaryImageUrl: CONSTRUCTED_HOUSES_GALLERY.house3_stoneGlassMansion,
    fallbackUrl: CONSTRUCTED_HOUSES_GALLERY.house1_whiteVilla,
    galleryImages: [
      CONSTRUCTED_HOUSES_GALLERY.house2_modernEstate,
      CONSTRUCTED_HOUSES_GALLERY.house3_stoneGlassMansion,
      CONSTRUCTED_HOUSES_GALLERY.house1_whiteVilla
    ],
    videoUrl: SHOWROOM_VIDEOS.villaDroneOrbit,
    motionOrigin: 'center center',
    panX: ['0.6%', '-0.6%'],
    panY: ['-0.3%', '0.3%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'p2-1',
        title: 'On-Ground Residential & Broadway Plots',
        spec: 'Level solid land ready for immediate construction or high-ROI resale.'
      },
      {
        id: 'p2-2',
        title: 'Ri8click Turnkey Construction Available',
        spec: 'Fixed-price grey structure and luxury finishing with 10-year structural warranty.'
      }
    ]
  },

  // ==========================================================================
  // PILLAR 4: RI8CLICK CONSORTIUM — UPVC DOORS, WINDOWS, PARTITIONS & CONSTRUCTION
  // ==========================================================================
  {
    id: 'upvc-wp-1',
    tourCategory: 'upvc_construction',
    propertyCategory: 'projects',
    divisionTag: 'RI8CLICK CONSORTIUM // UPVC DOORS, WINDOWS, PARTITIONS & CONSTRUCTION',
    code: 'UPVC 01 // SLIDING PATIO, BI-FOLD & FRENCH DOOR SYSTEMS',
    label: 'UPVC Sliding & Bi-Fold Doors',
    subLabel: 'Heavy-Duty Lift-and-Slide Patio Doors, Bi-Fold Terrace Walls & Multi-Point French Doors',
    headline: 'Ri8click UPVC Sliding Patio, Bi-Fold & French Door Models',
    description:
      'Factory-manufactured German-profile UPVC door systems including heavy-duty lift-and-slide panoramic patio doors, 6-panel concertina bi-fold garden doors, and double-sash French doors with 5-point anti-burglary locking and galvanized steel reinforcement.',
    valuation: 'PKR 1,850 – 3,400 / Sq. Ft. • 10-Year Warranty',
    locationBadge: 'Ri8click UPVC Factory • Taxila, Islamabad & Rawalpindi',
    focalLength: '18MM ULTRA-WIDE',
    altitude: 'DOOR SYSTEMS',
    fov: '96° INTERIOR',
    imageUrl: UPVC_AND_INTERIOR_GALLERY.upvc1_slidingPatioDoors,
    secondaryImageUrl: UPVC_AND_INTERIOR_GALLERY.upvc2_casementTiltTurnWindows,
    fallbackUrl: CONSTRUCTED_HOUSES_GALLERY.house3_stoneGlassMansion,
    galleryImages: [
      UPVC_AND_INTERIOR_GALLERY.upvc1_slidingPatioDoors,
      UPVC_AND_INTERIOR_GALLERY.upvc2_casementTiltTurnWindows,
      UPVC_AND_INTERIOR_GALLERY.upvc3_acousticGlassPartitions
    ],
    videoUrl: SHOWROOM_VIDEOS.villaDroneOrbit,
    motionOrigin: 'center center',
    panX: ['-0.5%', '0.5%'],
    panY: ['0%', '-0.4%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'u1-1',
        title: 'Lift-&-Slide, Bi-Fold & Casement Door Models',
        spec: 'Smooth 300kg roller tracks, weather-sealed EPDM gaskets, and multi-point security locks.'
      },
      {
        id: 'u1-2',
        title: 'Double & Triple Tempered Low-E Glazing',
        spec: 'Blocks 42dB of highway noise and reduces summer AC electricity bills by up to 40%.'
      }
    ]
  },
  {
    id: 'upvc-wp-2',
    tourCategory: 'upvc_construction',
    propertyCategory: 'projects',
    divisionTag: 'RI8CLICK CONSORTIUM // UPVC WINDOWS, PARTITIONS, WALL PANELS & CIVIL WORKS',
    code: 'UPVC 02 // CASEMENT, TILT-&-TURN WINDOWS, PARTITIONS & PANELS',
    label: 'UPVC Windows, Partitions & Panels',
    subLabel: 'Tilt-&-Turn Windows, Acoustic Office Glass Partitions, WPC Wall Panels & Turnkey Civil Works',
    headline: 'UPVC Windows, Acoustic Partitions, Wall Panels & Turnkey Construction',
    description:
      'Complete architectural envelope and interior solutions by Ri8click Consortium: dual-action tilt-and-turn UPVC windows, arched & bay windows, frameless acoustic office glass partitions, fluted WPC/UPVC interior wall panels, and A-grade turnkey civil construction.',
    valuation: 'Windows & Partitions PKR 1,450 – 2,950 / Sq. Ft.',
    locationBadge: 'Custom Fabrication & Turnkey Contracting Across Pakistan',
    focalLength: '22MM ARCHITECTURAL',
    altitude: 'INTERIOR & ENVELOPE',
    fov: '90° WIDE',
    imageUrl: UPVC_AND_INTERIOR_GALLERY.upvc2_casementTiltTurnWindows,
    secondaryImageUrl: UPVC_AND_INTERIOR_GALLERY.upvc3_acousticGlassPartitions,
    fallbackUrl: UPVC_AND_INTERIOR_GALLERY.upvc1_slidingPatioDoors,
    galleryImages: [
      UPVC_AND_INTERIOR_GALLERY.upvc2_casementTiltTurnWindows,
      UPVC_AND_INTERIOR_GALLERY.upvc3_acousticGlassPartitions,
      UPVC_AND_INTERIOR_GALLERY.upvc1_slidingPatioDoors
    ],
    videoUrl: SHOWROOM_VIDEOS.villaDroneOrbit,
    motionOrigin: 'center center',
    panX: ['0.5%', '-0.5%'],
    panY: ['0.3%', '-0.3%'],
    scaleRange: [1.01, 1.05],
    specs: [
      {
        id: 'u2-1',
        title: 'Tilt-&-Turn, Bay, Awning & Sliding Windows',
        spec: 'UV-stabilized German UPVC profiles in White, Anthracite Grey, Golden Oak & Walnut.'
      },
      {
        id: 'u2-2',
        title: 'Acoustic Partitions, Wall Panels & Civil Works',
        spec: 'Soundproof office glass partitions, moisture-proof wall cladding, and turnkey building.'
      }
    ]
  }
];

type AtmosphereGrade = 'crystal_daylight' | 'solar_vivid' | 'showroom_hdr';

const WAYPOINT_DURATION_MS = 6500;

export const HeroSection: React.FC<HeroSectionProps> = ({
  slides,
  properties = [],
  onExploreClick,
  onContactAgentClick,
  onSelectCategoryFilter,
  onOpen3DTour
}) => {
  const activeSlides = useMemo(() => {
    const filtered = slides.filter(s => s.isActive).sort((a, b) => a.order - b.order);
    return filtered.length > 0 ? filtered : slides;
  }, [slides]);

  // Navigation & Tour State
  const [tourCategory, setTourCategory] = useState<TourDeckCategory>('all_showroom');
  const [waypointIdx, setWaypointIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoTourActive, setIsVideoTourActive] = useState(false);
  const [isCinemaTheaterMode, setIsCinemaTheaterMode] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [atmosphere, setAtmosphere] = useState<AtmosphereGrade>('crystal_daylight');

  // Default Page Load State: "Hide Text" is active by default so background images stay unobstructed
  const [showLeftDescription, setShowLeftDescription] = useState(false);
  const [showDirectorDeck, setShowDirectorDeck] = useState(true);
  const [showSpecCards, setShowSpecCards] = useState(true);
  const [showConsortiumRibbon, setShowConsortiumRibbon] = useState(false);
  const [showCategoryBar, setShowCategoryBar] = useState(true);
  const [showShowroomTourBar, setShowShowroomTourBar] = useState(true);
  const [isHudMenuOpen, setIsHudMenuOpen] = useState(false);
  const [showBrokenLinkModal, setShowBrokenLinkModal] = useState(false);
  const [brokenLinksLog, setBrokenLinksLog] = useState<BrokenImageRecord[]>(
    INITIAL_REPLACED_BROKEN_LINKS
  );

  // Moveable / Draggable Portfolio Deck State
  const [isDeckFloating, setIsDeckFloating] = useState(true);
  const [isDeckMinimized, setIsDeckMinimized] = useState(false);
  const [deckResetKey, setDeckResetKey] = useState(0);
  const portfolioDeckDragControls = useDragControls();
  const heroStageRef = useRef<HTMLElement>(null);

  // Media Resilience & Multi-Angle Gallery Override
  const [videoFailed, setVideoFailed] = useState(false);
  const [failedUrls, setFailedUrls] = useState<Record<string, boolean>>({});
  const [customActiveImageOverride, setCustomActiveImageOverride] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const sanitizeConsortiumText = (raw: string) =>
    raw
      .replace(/\bCommercial Plazas\b/gi, 'Highrise Projects')
      .replace(/\bCommercial Plaza\b/gi, 'Highrise Project')
      .replace(/\bRi8Click Real Estate Consortium Group\b/gi, 'Ri8click Consortium')
      .replace(/\bRi8Click Consortium Group\b/gi, 'Ri8click Consortium')
      .replace(/\bRi8Click Group\b/gi, 'Ri8click Consortium');

  // Dynamically map all active Admin Hero Slides AND Admin-added Modular/Capsule properties into Hero Waypoints
  const dynamicAdminWaypoints: CameraWaypoint[] = useMemo(() => {
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

    const defaultSlideIds = new Set(['slide-1', 'slide-2', 'slide-3', 'slide-4', 'slide-5']);

    // 1. Map active Hero Slides (including Modular/Capsule, Commercial, Residential, Projects, or any custom Admin slide)
    const slideWaypoints: CameraWaypoint[] = activeSlides
      .filter(s => {
        if (!defaultSlideIds.has(s.id)) return true;
        return (
          s.samplePropertyData?.category === 'commercial' ||
          s.samplePropertyData?.category === 'modular'
        );
      })
      .map((s, idx) => {
        const cat = s.samplePropertyData?.category || 'commercial';
        const isModular =
          cat === 'modular' ||
          s.title.toLowerCase().includes('capsule') ||
          s.title.toLowerCase().includes('modular') ||
          s.categoryTag.toLowerCase().includes('modular');
        const isResidential = cat === 'residential';
        const isProjects = cat === 'projects';

        const tourCat: Exclude<TourDeckCategory, 'all_showroom'> = isModular
          ? 'capsule_containers'
          : isResidential
          ? 'properties_plots_villas'
          : isProjects
          ? 'upvc_construction'
          : 'highrise_projects';

        const propCat: PropertyCategory = isModular
          ? 'modular'
          : isResidential
          ? 'residential'
          : isProjects
          ? 'projects'
          : 'commercial';

        const primaryImg =
          s.imageUrl && s.imageUrl.trim().length > 0
            ? s.imageUrl
            : isModular
            ? MODULAR_CAPSULE_GALLERY.cap14_lakesideCurvedGlassCapsule
            : activeTowersPkImages[idx % activeTowersPkImages.length];

        const secondaryImg = isModular
          ? MODULAR_CAPSULE_GALLERY.cap8_q3ForestCabinPod
          : activeTowersPkImages[(idx + 1) % activeTowersPkImages.length];

        return {
          id: `cms-wp-${s.id}`,
          tourCategory: tourCat,
          propertyCategory: propCat,
          divisionTag: isModular
            ? 'RI8CLICK CONSORTIUM // CAPSULE & CONTAINER SMART HOUSES'
            : isResidential
            ? 'RI8CLICK CONSORTIUM // PROPERTIES: PLOTS & CONSTRUCTED HOUSES'
            : 'RI8CLICK CONSORTIUM // ISLAMABAD HIGHRISE PROJECTS',
          code: isModular
            ? `CAPSULE CMS // ${s.categoryTag.toUpperCase().slice(0, 24)}`
            : `ISB 0${idx + 6} // ${s.categoryTag.toUpperCase()}`,
          label: sanitizeConsortiumText(s.title).split(' ').slice(0, 3).join(' '),
          subLabel: sanitizeConsortiumText(
            s.subtitle || 'Verified Ri8click Consortium Showcase'
          ),
          headline: sanitizeConsortiumText(s.title),
          description: sanitizeConsortiumText(s.description),
          valuation: s.price || 'PKR 85 Lakh',
          locationBadge: s.society || s.location || 'Taxila & Islamabad',
          focalLength: '24MM ARCHITECTURAL',
          altitude: isModular ? 'MODULAR DECK' : 'SKYLINE +26 FL',
          fov: '86° WIDE',
          imageUrl: primaryImg,
          secondaryImageUrl: secondaryImg,
          fallbackUrl: isModular
            ? MODULAR_CAPSULE_GALLERY.fallbackCapsule1
            : ISLAMABAD_HIGHRISE_PROJECTS_GALLERY.fallbackHighrise1,
          galleryImages: isModular
            ? [primaryImg, ...MODULAR_CAPSULE_SEQUENCE_LIST.slice(0, 4)]
            : [
                primaryImg,
                secondaryImg,
                activeTowersPkImages[(idx + 2) % activeTowersPkImages.length]
              ],
          videoUrl: SHOWROOM_VIDEOS.architecturalFlyover,
          motionOrigin: 'center center',
          panX: ['-0.6%', '0.6%'],
          panY: ['0%', '-0.5%'],
          scaleRange: [1.01, 1.05],
          specs: [
            {
              id: `cms-spec-${idx}-1`,
              title: s.features?.[0] || 'Double-Glazed UPVC Curtain Wall',
              spec: 'Engineered with Ri8click thermal and acoustic insulation.'
            },
            {
              id: `cms-spec-${idx}-2`,
              title: s.features?.[1] || 'Turnkey Ri8click Consortium Delivery',
              spec: '100% verified listing synchronized across all user sessions.'
            }
          ]
        };
      });

    // 2. Map active Modular / Space Capsule Smart Houses added or updated by Admin in Properties Manager
    const activeModularProperties = (properties || []).filter(
      p =>
        p.status !== 'pending' &&
        (p.category === 'modular' || p.type.toLowerCase().includes('capsule'))
    );

    const modularPropWaypoints: CameraWaypoint[] = activeModularProperties.map((p, idx) => {
      const primaryImg =
        p.images && p.images.length > 0 && p.images[0]
          ? p.images[0]
          : MODULAR_CAPSULE_GALLERY.cap14_lakesideCurvedGlassCapsule;
      const secondaryImg =
        p.images && p.images.length > 1 && p.images[1]
          ? p.images[1]
          : MODULAR_CAPSULE_GALLERY.cap8_q3ForestCabinPod;

      return {
        id: `mod-prop-wp-${p.id}`,
        tourCategory: 'capsule_containers',
        propertyCategory: 'modular',
        divisionTag: `RI8CLICK CONSORTIUM // READYMADE CAPSULE & MODULAR SMART HOUSE`,
        code: `CAPSULE LIVE 0${idx + 1} // ${p.type.toUpperCase()}`,
        label: p.title.split(' ').slice(0, 4).join(' '),
        subLabel: p.tagline || `${p.area} ${p.areaUnit} Turnkey Modular Smart Home`,
        headline: p.title,
        description: p.description,
        valuation: p.priceFormatted || `PKR ${p.price.toLocaleString()}`,
        locationBadge: `${p.location.society}, ${p.location.city}`,
        focalLength: '20MM WIDE',
        altitude: 'TURNKEY POD',
        fov: '90° EXPANSIVE',
        imageUrl: primaryImg,
        secondaryImageUrl: secondaryImg,
        fallbackUrl: MODULAR_CAPSULE_GALLERY.fallbackCapsule1,
        galleryImages:
          p.images && p.images.length > 0 ? p.images : MODULAR_CAPSULE_SEQUENCE_LIST,
        videoUrl: p.virtualTourVideoUrl || SHOWROOM_VIDEOS.architecturalFlyover,
        motionOrigin: 'center center',
        panX: ['-0.5%', '0.5%'],
        panY: ['0%', '-0.4%'],
        scaleRange: [1.01, 1.05],
        specs: [
          {
            id: `mod-prop-spec-${p.id}-1`,
            title: p.features?.[0] || 'Aerospace Aluminum & Panoramic Glass',
            spec: p.features?.[1] || 'Turnkey factory-built smart capsule ready for rapid setup.'
          },
          {
            id: `mod-prop-spec-${p.id}-2`,
            title: p.features?.[2] || 'Ri8Click Thermal & Acoustic UPVC',
            spec: `Verified by ${p.agentCompany || 'Ri8Click Modular Consortium'}.`
          }
        ]
      };
    });

    return [...modularPropWaypoints, ...slideWaypoints];
  }, [activeSlides, properties]);

  const cameraWaypoints: CameraWaypoint[] = useMemo(() => {
    const combined = [...MASTER_VIRTUAL_TOUR_WAYPOINTS, ...dynamicAdminWaypoints];
    if (tourCategory === 'all_showroom') {
      const capsules = combined.filter(w => w.tourCategory === 'capsule_containers');
      const highrises = combined.filter(w => w.tourCategory === 'highrise_projects');
      const props = combined.filter(w => w.tourCategory === 'properties_plots_villas');
      const upvc = combined.filter(w => w.tourCategory === 'upvc_construction');

      const interleaved: CameraWaypoint[] = [];
      const maxLen = Math.max(capsules.length, highrises.length, props.length, upvc.length);
      for (let i = 0; i < maxLen; i++) {
        if (capsules[i]) interleaved.push(capsules[i]);
        if (highrises[i]) interleaved.push(highrises[i]);
        if (props[i]) interleaved.push(props[i]);
        if (upvc[i]) interleaved.push(upvc[i]);
      }
      return interleaved;
    }
    const filtered = combined.filter(w => w.tourCategory === tourCategory);
    return filtered.length > 0 ? filtered : MASTER_VIRTUAL_TOUR_WAYPOINTS;
  }, [tourCategory, dynamicAdminWaypoints]);

  const activeWaypoint =
    cameraWaypoints[waypointIdx % cameraWaypoints.length] || cameraWaypoints[0];

  // Resolve active image with automatic fallback if primary fails
  const resolveImageWithFallback = (wp: CameraWaypoint) => {
    if (!failedUrls[wp.imageUrl]) return wp.imageUrl;
    if (!failedUrls[wp.secondaryImageUrl]) return wp.secondaryImageUrl;
    if (!failedUrls[wp.fallbackUrl]) return wp.fallbackUrl;
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
      activeWaypoint.secondaryImageUrl !== urlThatFailed
        ? activeWaypoint.secondaryImageUrl
        : activeWaypoint.fallbackUrl;

    setBrokenLinksLog(prev => {
      if (prev.some(item => item.brokenUrl === urlThatFailed)) return prev;
      return [
        {
          id: `auto-rep-${Date.now()}`,
          brokenUrl: urlThatFailed,
          replacedWithUrl: fallbackReplacement,
          waypointLabel: wpLabel || activeWaypoint.label,
          timestamp: 'Auto-Replaced at Runtime'
        },
        ...prev
      ];
    });
  };

  // Preload current + next 2 waypoint images for instant transitions
  useEffect(() => {
    const preloadIndices = [
      waypointIdx % cameraWaypoints.length,
      (waypointIdx + 1) % cameraWaypoints.length,
      (waypointIdx + 2) % cameraWaypoints.length
    ];
    preloadIndices.forEach(i => {
      const wp = cameraWaypoints[i];
      if (!wp) return;
      const img = new Image();
      img.src = resolveImageWithFallback(wp);
    });
  }, [waypointIdx, cameraWaypoints, failedUrls]);

  // Reset index when category changes
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
  const allCombinedWaypoints = useMemo(
    () => [...MASTER_VIRTUAL_TOUR_WAYPOINTS, ...dynamicAdminWaypoints],
    [dynamicAdminWaypoints]
  );

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
      count: allCombinedWaypoints.length,
      filterCategory: 'all',
      icon: <Compass className="w-3.5 h-3.5" />
    },
    {
      id: 'capsule_containers',
      label: 'Container & Capsule Houses',
      shortLabel: 'Capsule Houses',
      count: allCombinedWaypoints.filter(w => w.tourCategory === 'capsule_containers').length,
      filterCategory: 'modular',
      icon: <Box className="w-3.5 h-3.5" />
    },
    {
      id: 'highrise_projects',
      label: 'Highrise Projects (Islamabad)',
      shortLabel: 'Highrise Projects',
      count: allCombinedWaypoints.filter(w => w.tourCategory === 'highrise_projects').length,
      filterCategory: 'commercial',
      icon: <Building2 className="w-3.5 h-3.5" />
    },
    {
      id: 'properties_plots_villas',
      label: 'Properties (Plots & Houses)',
      shortLabel: 'Plots & Houses',
      count: allCombinedWaypoints.filter(w => w.tourCategory === 'properties_plots_villas').length,
      filterCategory: 'residential',
      icon: <Home className="w-3.5 h-3.5" />
    },
    {
      id: 'upvc_construction',
      label: 'Ri8click Consortium & UPVC',
      shortLabel: 'UPVC & Construction',
      count: allCombinedWaypoints.filter(w => w.tourCategory === 'upvc_construction').length,
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

        {/* Subtle Scrim — Lighter when "Hide Text" is active so background images shine */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isCinemaTheaterMode || !showLeftDescription
              ? 'bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20'
              : 'bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20" />
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

      {/* =====================================================================
          3. OPTIONAL CAMERA WAYPOINTS BAR
         ===================================================================== */}
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
                  const isSelected = waypointIdx === idx;
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

      {/* =====================================================================
          4. MAIN FOREGROUND STAGE & MOVEABLE CRYSTAL PORTFOLIO DECK
         ===================================================================== */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6 min-h-[540px] lg:min-h-[610px] flex flex-col justify-between">
        {/* Top Utility Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/60 backdrop-blur-xl border border-white/20">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">
                Ri8click Consortium — Contemporary Capsule Homes, Highrises &amp; German UPVC
              </span>
            </div>

            {/* Broken Link Replacement Status Pill */}
            <button
              type="button"
              onClick={() => setShowBrokenLinkModal(prev => !prev)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 hover:bg-emerald-900/80 backdrop-blur-xl border border-emerald-400/40 text-emerald-200 text-[10.5px] font-bold transition-colors cursor-pointer"
              title="View Replaced Broken Image Links & Active Towers.pk Media Log"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Media Verified ({brokenLinksLog.length})</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 ml-auto">
            {/* Primary Hide / Show Text Button */}
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
              title="Toggle Full Description vs Minimal Banner Info"
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
                        label="Portfolio Deck Window"
                        description="Show right-hand interactive camera deck"
                        checked={showDirectorDeck}
                        onChange={() => setShowDirectorDeck(prev => !prev)}
                      />
                      <ToggleSwitch
                        label="Draggable Floating Deck"
                        description="Allow dragging the Portfolio Deck anywhere"
                        checked={isDeckFloating}
                        onChange={() => setIsDeckFloating(prev => !prev)}
                      />
                      <ToggleSwitch
                        label="Specification Cards"
                        description="Show architectural spec highlights"
                        checked={showSpecCards}
                        onChange={() => setShowSpecCards(prev => !prev)}
                      />
                      <ToggleSwitch
                        label="Consortium Pillars Ribbon"
                        description="Show 4-pillar summary bar"
                        checked={showConsortiumRibbon}
                        onChange={() => setShowConsortiumRibbon(prev => !prev)}
                      />
                      <ToggleSwitch
                        label="Top Category Bar"
                        description="Show top category filter bar"
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
              className="mb-3 p-4 rounded-2xl bg-slate-950/90 backdrop-blur-2xl border border-emerald-400/40 shadow-2xl space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                    Active Media Monitor
                  </span>
                  <span className="text-xs font-bold text-white">
                    Verified Capsule &amp; Highrise Assets ({brokenLinksLog.length} Legacy Links Upgraded)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBrokenLinkModal(false)}
                  className="text-xs text-slate-300 hover:text-white font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                {brokenLinksLog.map(item => (
                  <div
                    key={item.id}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-[11px]"
                  >
                    <img
                      src={item.replacedWithUrl}
                      alt={item.waypointLabel}
                      className="w-12 h-10 rounded-lg object-cover shrink-0 border border-emerald-400/40"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-white truncate flex items-center gap-1">
                        <span>{item.waypointLabel}</span>
                        <span className="text-[9px] text-emerald-300 bg-emerald-500/20 px-1.5 py-0.2 rounded">
                          LIVE
                        </span>
                      </div>
                      <div className="text-[10px] text-rose-300/80 truncate flex items-center gap-1">
                        <ImageOff className="w-3 h-3 shrink-0" />
                        <span className="line-through truncate">{item.brokenUrl}</span>
                      </div>
                      <div className="text-[10px] text-emerald-300 truncate">
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
              transition={{ duration: 0.2 }}
              className="mb-3 p-3 rounded-2xl bg-slate-950/65 backdrop-blur-xl border border-white/20"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                      Ri8click Consortium
                    </span>
                    <span className="text-xs font-bold text-white">
                      Integrated Real Estate, Capsule Smart Homes, Islamabad Highrises &amp; German UPVC
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConsortiumRibbon(false)}
                    className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <span>Hide Pillars</span>
                    <ChevronUp className="w-3.5 h-3.5" />
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
                        className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2.5 cursor-pointer ${
                          isActivePillar
                            ? 'bg-white/20 border-amber-400 shadow-sm'
                            : 'bg-white/5 border-white/15 hover:bg-white/15'
                        }`}
                      >
                        <div className={`p-2 rounded-lg border shrink-0 ${pillar.accent}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-extrabold text-white truncate">
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
                          <div className="flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-xl px-2.5 py-1.5 rounded-xl border border-white/20">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 mr-1">
                              Angles:
                            </span>
                            {activeWaypoint.galleryImages.map((imgUrl, gIdx) => {
                              if (failedUrls[imgUrl]) return null;
                              const isCurrentAngle = resolvedImageUrl === imgUrl;
                              return (
                                <button
                                  key={gIdx}
                                  type="button"
                                  onClick={() => {
                                    setIsVideoTourActive(false);
                                    setCustomActiveImageOverride(imgUrl);
                                  }}
                                  className={`w-9 h-7 rounded-md overflow-hidden border transition-all cursor-pointer ${
                                    isCurrentAngle
                                      ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105'
                                      : 'border-white/25 opacity-75 hover:opacity-100'
                                  }`}
                                  title={`Switch to View ${gIdx + 1}`}
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

                      {/* Primary Call-to-Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-1">
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
                          className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all cursor-pointer"
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
                          Capsule Pods • Highrise Projects • UPVC • Villas
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
                        title="Show or Hide Left Narrative Text"
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
                      {/* Crystal Category Tabs */}
                      <div className="grid grid-cols-5 gap-1 p-1 rounded-xl bg-slate-950/50 border border-white/20">
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

        {/* ===================================================================
            5. BOTTOM TIMELINE & SLIDE NAVIGATION CONTROLS
           =================================================================== */}
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

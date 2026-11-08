import {
  Property,
  ProvinceCityData,
  AgencyAccount,
  ConsortiumDivision,
  HeroSlide,
  BlogPost,
  SiteSectionPortion
} from '../types';
import { PAKISTAN_AGENT_AVATARS } from './defaultAccounts';

export const PAKISTAN_REGIONAL_AGENT_AVATARS = {
  malikZeeshan_Taxila: PAKISTAN_AGENT_AVATARS.malikZeeshan,
  chaudhryBilal_FaisalHills: PAKISTAN_AGENT_AVATARS.chaudhryBilal,
  engrHarisFarooq_Islamabad: PAKISTAN_AGENT_AVATARS.engrHarisFarooq,
  hajiAslamKhan_Kohistan: PAKISTAN_AGENT_AVATARS.hajiAslamKhan,
  mianAhmed_Lahore: PAKISTAN_AGENT_AVATARS.mianAhmed,
  tariqMehmood_Rawalpindi: PAKISTAN_AGENT_AVATARS.tariqMehmood
};

export const INITIAL_PROVINCE_CITIES: ProvinceCityData[] = [
  {
    province: 'Punjab',
    cities: [
      {
        name: 'Taxila',
        isFeatured: true,
        societies: [
          'Faisal Hills',
          'Faisal Hills Executive Block',
          'Faisal Hills Block A',
          'Faisal Hills Block B',
          'Faisal Hills Block C',
          'Faisal Hills Commercial Broadway',
          'Kohistan Enclave',
          'Margalla View Society',
          'Museum Road Estates',
          'HMC Area',
          'New City Phase 1 & 2',
          'Taxila Cantt',
          'Wah Cantt Officers Colony',
          'GT Road Commercial Belt'
        ]
      },
      {
        name: 'Rawalpindi',
        isFeatured: true,
        societies: [
          'Bahria Town Phase 1-8',
          'DHA Phase 1-4',
          'Top City-1',
          'Mumtaz City',
          'Faisal Town (F-18)',
          'Chaklala Scheme 3',
          'Satellite Town'
        ]
      },
      {
        name: 'Lahore',
        isFeatured: true,
        societies: [
          'Bahria Town Lahore',
          'DHA Phase 1-9 & Prism 9',
          'Gulberg 2 & 3',
          'Model Town',
          'Lake City',
          'Johar Town'
        ]
      }
    ]
  },
  {
    province: 'Islamabad Capital Territory',
    cities: [
      {
        name: 'Islamabad',
        isFeatured: true,
        societies: [
          'Faisal Hills (Margalla Connector)',
          'Multi Gardens (B-17)',
          'DHA Islamabad Phase 1-5',
          'Bahria Enclave',
          'Park View City',
          'F-6 / F-7 / F-8',
          'E-7 / E-11',
          'G-11 / G-13 / G-15',
          'D-12 Margalla Foothills',
          'Blue Area Corporate Zone',
          'Gulberg Greens & Residencia',
          'Eighteen Islamabad',
          'Capital Smart City'
        ]
      }
    ]
  },
  {
    province: 'Khyber Pakhtunkhwa (KPK)',
    cities: [
      {
        name: 'Peshawar',
        isFeatured: true,
        societies: ['DHA Peshawar', 'Hayatabad Phase 1-7', 'Regi Model Town']
      },
      {
        name: 'Abbottabad',
        societies: ['PMA Kakul Road', 'Jinnahabad', 'Nathia Gali Hill Resorts']
      },
      {
        name: 'Swat',
        societies: ['Mingora Commercial Hub', 'Kalam Tourist Pods Zone']
      }
    ]
  },
  {
    province: 'Sindh',
    cities: [
      {
        name: 'Karachi',
        isFeatured: true,
        societies: [
          'DHA Karachi Phase 1-8',
          'Bahria Town Karachi',
          'Clifton Block 1-9',
          'PECHS',
          'Emaar Crescent Bay'
        ]
      }
    ]
  },
  {
    province: 'Balochistan & Gilgit-Baltistan',
    cities: [
      {
        name: 'Gwadar',
        isFeatured: true,
        societies: ['Sanghar Housing Scheme', 'New Town Phase 1-4', 'Marine Drive Front']
      },
      {
        name: 'Skardu & Hunza',
        societies: [
          'Shangrila Resort Belt',
          'Karimabad Tourist Zone',
          'Attabad Lake Glamping Pods'
        ]
      }
    ]
  }
];

export const INITIAL_AGENCIES: AgencyAccount[] = [
  {
    id: 'agency-1',
    name: 'Malik Zeeshan Adil',
    companyName: 'Al-Mairaj Real Estate & Builders',
    logo: PAKISTAN_REGIONAL_AGENT_AVATARS.malikZeeshan_Taxila,
    avatar: PAKISTAN_REGIONAL_AGENT_AVATARS.malikZeeshan_Taxila,
    phone: '+92 336-5666727',
    whatsapp: '923365666727',
    email: 'zeeshan@almairajestates.pk',
    city: 'Taxila',
    primarySociety: 'Faisal Hills',
    verified: true,
    postLimit: 25,
    totalPosts: 6,
    activeListings: 6,
    rating: 4.95,
    joinedDate: 'Jan 2024',
    canManageAdvibe: true,
    canPublishAdvibe: true
  },
  {
    id: 'agency-2',
    name: 'Chaudhry Bilal Sadat',
    companyName: 'Faisal Hills Property Advisors',
    logo: PAKISTAN_REGIONAL_AGENT_AVATARS.chaudhryBilal_FaisalHills,
    avatar: PAKISTAN_REGIONAL_AGENT_AVATARS.chaudhryBilal_FaisalHills,
    phone: '+92 336-5666727',
    whatsapp: '923365666727',
    email: 'bilal@faisalhillsadvisors.pk',
    city: 'Taxila',
    primarySociety: 'Faisal Hills Executive Block',
    verified: true,
    postLimit: 20,
    totalPosts: 4,
    activeListings: 4,
    rating: 4.9,
    joinedDate: 'Mar 2024',
    canManageAdvibe: true,
    canPublishAdvibe: true
  },
  {
    id: 'agency-3',
    name: 'Engr. Haris Farooq',
    companyName: 'Beacon Prime Commercial Estates',
    logo: PAKISTAN_REGIONAL_AGENT_AVATARS.engrHarisFarooq_Islamabad,
    avatar: PAKISTAN_REGIONAL_AGENT_AVATARS.engrHarisFarooq_Islamabad,
    phone: '+92 336-5666727',
    whatsapp: '923365666727',
    email: 'haris@beaconcommercial.pk',
    city: 'Islamabad',
    primarySociety: 'Blue Area & Multi Gardens B-17',
    verified: true,
    postLimit: 30,
    totalPosts: 4,
    activeListings: 4,
    rating: 4.95,
    joinedDate: 'Nov 2023',
    canManageAdvibe: true,
    canPublishAdvibe: true
  },
  {
    id: 'agency-4',
    name: 'Haji Aslam Jahangir Khan',
    companyName: 'Kohistan & Margalla Realtors',
    logo: PAKISTAN_REGIONAL_AGENT_AVATARS.hajiAslamKhan_Kohistan,
    avatar: PAKISTAN_REGIONAL_AGENT_AVATARS.hajiAslamKhan_Kohistan,
    phone: '+92 336-5666727',
    whatsapp: '923365666727',
    email: 'aslam@margallarealtors.pk',
    city: 'Taxila',
    primarySociety: 'Kohistan Enclave',
    verified: true,
    postLimit: 15,
    totalPosts: 2,
    activeListings: 2,
    rating: 4.85,
    joinedDate: 'Jun 2024',
    canManageAdvibe: false
  },
  {
    id: 'agency-sapphire',
    name: 'Mian Ahmed (Sapphire Properties)',
    companyName: 'Sapphire Properties & Athar Associates',
    logo: PAKISTAN_REGIONAL_AGENT_AVATARS.mianAhmed_Lahore,
    avatar: PAKISTAN_REGIONAL_AGENT_AVATARS.mianAhmed_Lahore,
    phone: '+92 336-5666727',
    whatsapp: '923365666727',
    email: 'info@sapphireproperties.com.pk',
    city: 'Lahore',
    primarySociety: 'Bahria Town Lahore (Ring Road SL3)',
    verified: true,
    postLimit: 30,
    totalPosts: 2,
    activeListings: 2,
    rating: 4.98,
    joinedDate: 'Jan 2024',
    canManageAdvibe: true,
    canPublishAdvibe: true
  }
];

export const INITIAL_PROPERTIES: Property[] = [
  // 1. COMMERCIAL PROPERTIES
  {
    id: 'prop-icon-mall-comm-lahore',
    title: 'Icon Mall & Towers - Prime Commercial Shops & Food Court Outlets',
    tagline: 'Bahria Town Ring Road SL3 Interchange • 17-Storey Twin Tower Megaproject',
    description:
      'Invest in Lahore’s premier mixed-use commercial landmark by Athar Associates & Sapphire Properties. Situated directly at Bahria Town Lahore near the Ring Road SL3 Interchange on a 3-side corner plot with a 12.5-Kanal central courtyard.',
    category: 'commercial',
    type: 'Retail Shop',
    purpose: 'for_sale',
    price: 3500000,
    priceFormatted: 'PKR 35 Lakh (1% Monthly Plan)',
    currency: 'PKR',
    location: {
      province: 'Punjab',
      city: 'Lahore',
      society: 'Bahria Town Lahore',
      block: 'Ring Road SL3 Interchange',
      address: 'Main Boulevard, Bahria Town Ring Road SL3 Interchange, Lahore',
      latitude: 31.365,
      longitude: 74.185,
      mapZoom: 16
    },
    area: 220,
    areaUnit: 'Sq Ft',
    floors: 17,
    parking: 200,
    features: [
      'Royal Swiss 5-Star Hotel Tower Integration',
      '12.5-Kanal Open Central Courtyard & Atrium',
      'Flexible 5-Year Payment Plan (1% Monthly)',
      '16 High-Speed Capsule Elevators & Escalators'
    ],
    images: [
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85'
    ],
    watermark: true,
    agencyId: 'agency-sapphire',
    agentName: 'Mian Ahmed (Sapphire Properties)',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.mianAhmed_Lahore,
    agentCompany: 'Sapphire Properties & Athar Associates',
    agentRating: 4.98,
    isFeatured: true,
    isHotCommercial: true,
    viewsCount: 2340,
    savesCount: 156,
    createdAt: '2026-09-01',
    status: 'active',
    virtualTourVideoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    virtualTourVideoTitle: 'Icon Mall & Towers Bahria Town Lahore 3D Walkthrough',
    hasVirtualTour: true
  },
  {
    id: 'prop-comm-1',
    title: 'Ri8Click Executive Commercial Plaza',
    tagline: 'Prime 5-Storey Commercial Landmark on Main Boulevard',
    description:
      'High-yield commercial plaza located in the heart of Faisal Hills Commercial Broadway, Taxila. Features double-height ground floor retail showrooms, underground parking, and Ri8Click German UPVC soundproof glazing.',
    category: 'commercial',
    type: 'Commercial Plaza',
    purpose: 'for_sale',
    price: 95000000,
    priceFormatted: 'PKR 9.5 Crore',
    currency: 'PKR',
    location: {
      province: 'Punjab',
      city: 'Taxila',
      society: 'Faisal Hills',
      block: 'Faisal Hills Commercial Broadway',
      address: 'Plot #42-C, Main Commercial Broadway, Faisal Hills, Taxila',
      latitude: 33.7297,
      longitude: 72.8258,
      mapZoom: 15
    },
    area: 8,
    areaUnit: 'Marla',
    floors: 5,
    parking: 12,
    features: [
      'Corner Commercial Plot (3-Side Open)',
      'Ri8Click Soundproof UPVC Facade',
      'Expected Rental Yield: 9.5% Annually',
      'RDA / TMA Approved Building Plan'
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1000&q=85'
    ],
    watermark: true,
    agencyId: 'agency-1',
    agentName: 'Malik Zeeshan Adil',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.malikZeeshan_Taxila,
    agentCompany: 'Al-Mairaj Real Estate & Builders',
    agentRating: 4.95,
    isFeatured: true,
    isHotCommercial: true,
    viewsCount: 1420,
    savesCount: 89,
    createdAt: '2026-08-20',
    status: 'active',
    virtualTourVideoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    virtualTourVideoTitle: 'Ri8Click Executive Commercial Plaza Walkthrough',
    hasVirtualTour: true
  },

  // 2. RESIDENTIAL PROPERTIES
  {
    id: 'prop-res-1',
    title: 'Modern Architectural 1-Kanal Villa in Faisal Hills',
    tagline: 'Designer 5-Bedroom Luxury Villa with Margalla View',
    description:
      'Breathtaking 1-Kanal modern contemporary villa in Faisal Hills Block B, Taxila. Crafted with imported Spanish tiles, solid ash wood doors, and premium Ri8Click German UPVC double-glazed windows.',
    category: 'residential',
    type: 'Villa',
    purpose: 'for_sale',
    price: 68500000,
    priceFormatted: 'PKR 6.85 Crore',
    currency: 'PKR',
    location: {
      province: 'Punjab',
      city: 'Taxila',
      society: 'Faisal Hills',
      block: 'Faisal Hills Block B',
      address: 'Street 18, Block B, Faisal Hills, Taxila / Rawalpindi'
    },
    area: 1,
    areaUnit: 'Kanal',
    bedrooms: 5,
    bathrooms: 6,
    parking: 3,
    features: [
      '5 Master Bedrooms with Attached Baths',
      'Ri8Click Double Glazed UPVC Windows',
      'Smart Home Automation (Lights, AC, Security)',
      '10kW Hybrid On-Grid Solar System'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85'
    ],
    watermark: true,
    agencyId: 'agency-1',
    agentName: 'Malik Zeeshan Adil',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.malikZeeshan_Taxila,
    agentCompany: 'Al-Mairaj Real Estate & Builders',
    agentRating: 4.95,
    isFeatured: true,
    viewsCount: 2150,
    savesCount: 145,
    createdAt: '2026-08-24',
    status: 'active',
    virtualTourVideoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    virtualTourVideoTitle: '1-Kanal Designer Villa Faisal Hills 360° Tour',
    hasVirtualTour: true
  },
  {
    id: 'prop-res-2',
    title: '10-Marla Contemporary House in B-17 Multi Gardens',
    tagline: 'Brand New Double Storey House Near MPCHS Markaz',
    description:
      'Elegantly designed 10-Marla double-storey house in Multi Gardens B-17 Block C, Islamabad. Direct access to GT Road and Peshawar-Islamabad Motorway M-1.',
    category: 'residential',
    type: 'Villa',
    purpose: 'for_sale',
    price: 42500000,
    priceFormatted: 'PKR 4.25 Crore',
    currency: 'PKR',
    location: {
      province: 'Islamabad Capital Territory',
      city: 'Islamabad',
      society: 'Multi Gardens (B-17)',
      block: 'Block C',
      address: 'Street 44, Block C, Multi Gardens B-17, Islamabad'
    },
    area: 10,
    areaUnit: 'Marla',
    bedrooms: 4,
    bathrooms: 5,
    parking: 2,
    features: [
      'CDA / MPCHS Transfer Ready',
      'Double Unit Layout (Ideal for 2 Families)',
      'Sui Gas & Underground Electricity Installed'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=85'
    ],
    watermark: true,
    agencyId: 'agency-2',
    agentName: 'Chaudhry Bilal Sadat',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.chaudhryBilal_FaisalHills,
    agentCompany: 'Faisal Hills Property Advisors',
    agentRating: 4.9,
    isFeatured: true,
    viewsCount: 1640,
    savesCount: 92,
    createdAt: '2026-08-19',
    status: 'active'
  },

  // 3. CAPSULE / CONTAINER READYMADE MODULAR SMART HOUSES (Updated Professional Architectural Imagery)
  {
    id: 'prop-mod-1',
    title: 'AeroPod E7 — Luxury Panoramic Space Capsule Smart House',
    tagline: 'Aerospace Aluminum Shell • Floor-to-Ceiling Tempered Glass • Turnkey IoT Suite',
    description:
      'Factory-engineered readymade luxury Space Capsule Smart House by Ri8click Modular Division. Built with seismic-grade galvanized steel chassis, aviation-grade fluorocarbon aluminum panels, triple-glazed Ri8click German UPVC panoramic skylights, voice-controlled smart curtains/AC, and hotel-grade bathroom & kitchenette. Delivered and crane-installed in 24 hours across Margalla Hills, Faisal Hills, Murree, Nathia Gali, and Swat.',
    category: 'modular',
    type: 'Capsule Smart House',
    purpose: 'for_sale',
    price: 8500000,
    priceFormatted: 'PKR 85 Lakh (Turnkey Installed)',
    currency: 'PKR',
    location: {
      province: 'Punjab',
      city: 'Taxila',
      society: 'Faisal Hills',
      block: 'Margalla Foothills Showroom',
      address: 'Ri8click Prefab & Modular Display Center, Main GT Road, Taxila / Islamabad'
    },
    area: 410,
    areaUnit: 'Sq Ft',
    bedrooms: 1,
    bathrooms: 1,
    floors: 1,
    features: [
      'Aerospace Fluorocarbon Aluminum Exterior Shell',
      '270° Panoramic Low-E Double Glazed Tempered Glass',
      'Full Voice & App Smart Home Automation',
      'Polyurethane Thermal & Acoustic Insulation (-20°C to +50°C)',
      'Zero Site Mess — Crane Installed in 24 Hours'
    ],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85'
    ],
    watermark: true,
    agencyId: 'agency-1',
    agentName: 'Malik Zeeshan Adil',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.malikZeeshan_Taxila,
    agentCompany: 'Al-Mairaj Real Estate & Builders',
    agentRating: 4.95,
    isFeatured: true,
    viewsCount: 3420,
    savesCount: 280,
    createdAt: '2026-09-02',
    status: 'active',
    virtualTourVideoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    virtualTourVideoTitle: 'AeroPod E7 Space Capsule Walkthrough',
    hasVirtualTour: true
  },
  {
    id: 'prop-mod-2',
    title: 'ModuLoft K5 — L-Shaped Double Container Luxury Modular Villa',
    tagline: '2-Bedroom Prefab Container Residence • Wood-Composite Deck & Cantilever Lounge',
    description:
      'Architectural 2-bedroom L-shaped modular container villa designed for farmhouses, hill resorts, and rooftop penthouses. Features Cor-Ten structural steel framing, German UPVC sliding glass walls, composite WPC timber cladding, and complete solar hybrid readiness.',
    category: 'modular',
    type: 'Capsule Smart House',
    purpose: 'for_sale',
    price: 11500000,
    priceFormatted: 'PKR 1.15 Crore',
    currency: 'PKR',
    location: {
      province: 'Islamabad Capital Territory',
      city: 'Islamabad',
      society: 'D-12 Margalla Foothills',
      address: 'Margalla Ridge Modular Enclave, Islamabad'
    },
    area: 680,
    areaUnit: 'Sq Ft',
    bedrooms: 2,
    bathrooms: 2,
    floors: 1,
    features: [
      'Heavy-Duty Cor-Ten Steel Modular Container Frame',
      'Ri8click German UPVC Floor-to-Ceiling Sliding Doors',
      'Complete Designer Kitchen & 2 En-Suite Bathrooms',
      'Relocatable & Expandable Modular Architecture'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85'
    ],
    watermark: true,
    agencyId: 'agency-2',
    agentName: 'Chaudhry Bilal Sadat',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.chaudhryBilal_FaisalHills,
    agentCompany: 'Faisal Hills Property Advisors',
    agentRating: 4.9,
    isFeatured: true,
    viewsCount: 2490,
    savesCount: 190,
    createdAt: '2026-09-01',
    status: 'active'
  },
  {
    id: 'prop-mod-3',
    title: 'SkyDeck V2124 — Two-Storey Duplex Container Smart Home',
    tagline: 'Stacked Cantilever Modular Home with Upper Sky Terrace & Glass Balustrades',
    description:
      'Executive 2-storey prefabricated modular container residence featuring an upper sky-deck terrace, external spiral staircase, acoustic German UPVC glazing, and 3 bedrooms.',
    category: 'modular',
    type: 'Capsule Smart House',
    purpose: 'for_sale',
    price: 14800000,
    priceFormatted: 'PKR 1.48 Crore',
    currency: 'PKR',
    location: {
      province: 'Punjab',
      city: 'Taxila',
      society: 'Faisal Hills',
      address: 'Faisal Hills Executive Modular Showcase, Taxila'
    },
    area: 960,
    areaUnit: 'Sq Ft',
    bedrooms: 3,
    bathrooms: 3,
    floors: 2,
    features: [
      'Double-Storey Stacked Cantilever Container Design',
      'Upper Panoramic Sky-Deck with Tempered Glass Railing',
      '8kW Hybrid Solar Roof Integration Included',
      '30-Day Factory Production & Turnkey Handover'
    ],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85'
    ],
    watermark: true,
    agencyId: 'agency-1',
    agentName: 'Malik Zeeshan Adil',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.malikZeeshan_Taxila,
    agentCompany: 'Al-Mairaj Real Estate & Builders',
    agentRating: 4.95,
    isFeatured: true,
    viewsCount: 1980,
    savesCount: 142,
    createdAt: '2026-08-29',
    status: 'active'
  },
  {
    id: 'prop-mod-4',
    title: 'AlpinePod Q3 — Glamping & Eco-Resort Modular Cabin Suite',
    tagline: 'All-Weather Insulated Resort Pod for Murree, Nathia Gali, Swat & Skardu',
    description:
      'Purpose-built commercial hospitality pod for tourism resorts and farmhouses. Engineered with high-density thermal insulation, floor heating, and panoramic mountain-view glazing.',
    category: 'modular',
    type: 'Capsule Smart House',
    purpose: 'for_sale',
    price: 6800000,
    priceFormatted: 'PKR 68 Lakh',
    currency: 'PKR',
    location: {
      province: 'Khyber Pakhtunkhwa (KPK)',
      city: 'Abbottabad',
      society: 'Nathia Gali Hill Resorts',
      address: 'Main Kalam & Nathia Gali Resort Belt'
    },
    area: 340,
    areaUnit: 'Sq Ft',
    bedrooms: 1,
    bathrooms: 1,
    floors: 1,
    features: [
      'Extreme Sub-Zero Thermal Insulation Package',
      'Underfloor Electric Heating & Inverter Climate Control',
      'High-ROI Resort Rental Asset (Payback in 2.5 Years)'
    ],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=85'
    ],
    watermark: true,
    agencyId: 'agency-3',
    agentName: 'Engr. Haris Farooq',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.engrHarisFarooq_Islamabad,
    agentCompany: 'Beacon Prime Commercial Estates',
    agentRating: 4.95,
    isFeatured: true,
    viewsCount: 1760,
    savesCount: 118,
    createdAt: '2026-08-28',
    status: 'active'
  }
];

export const CONSORTIUM_DIVISIONS: ConsortiumDivision[] = [
  {
    id: 'div-realestate',
    title: 'ri8click Real Estate & Megaproject Advisory',
    shortName: 'Real Estate Advisory',
    tagline: '100% Watermark-Verified Residential, Commercial & Highrise Portfolios',
    description:
      'Authorized marketing and investment advisory across Faisal Hills, Taxila, Multi Gardens B-17, Islamabad Blue Area, and Bahria Town Lahore.',
    badge: 'Flagship Division',
    iconName: 'Building2',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85',
    capabilities: [
      'Verified Direct-Owner & Developer Allocations',
      'High-Yield Commercial Plazas & Retail Showrooms',
      'Complete NOC & Title Due Diligence'
    ],
    stats: [
      { label: 'Verified Assets', value: 'PKR 25B+' },
      { label: 'Partner Agencies', value: '45+' }
    ],
    contactPerson: 'Malik Zeeshan Adil',
    contactPhone: '+92 336-5666727',
    contactWhatsApp: '923365666727'
  },
  {
    id: 'div-construction',
    title: 'ri8click Turnkey Civil Engineering & Construction',
    shortName: 'Turnkey Construction',
    tagline: 'A+ Grey Structure & Designer Finishing with Structural Warranty',
    description:
      'End-to-end architectural design, soil testing, RCC grey structure construction, and luxury interior turnkey execution in Faisal Hills, Taxila, and Islamabad.',
    badge: 'PEC / RDA Compliant',
    iconName: 'HardHat',
    image:
      'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=1400&q=85',
    capabilities: [
      'A+ Grade Seismic-Resistant RCC Grey Structure',
      '3D Architectural, Structural & MEP Blueprints',
      'Stage-Wise Digital Progress Reporting for Overseas Clients'
    ],
    stats: [
      { label: 'Delivered Villas', value: '120+' },
      { label: 'Warranty', value: '15 Years' }
    ],
    contactPerson: 'Engr. Haris Farooq',
    contactPhone: '+92 336-5666727',
    contactWhatsApp: '923365666727'
  },
  {
    id: 'div-upvc',
    title: 'ri8click German UPVC Windows, Doors & Facades',
    shortName: 'German UPVC Systems',
    tagline: 'Multi-Chamber Acoustic & Thermal Insulated Glazing Profiles',
    description:
      'Precision-fabricated German-standard UPVC and thermal-break aluminum windows, sliding patio doors, and soundproof commercial glass facades.',
    badge: 'Acoustic & Thermal',
    iconName: 'Maximize',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    capabilities: [
      'Double & Triple Tempered Argon-Filled Glazing',
      '42dB Urban Noise Reduction & Dust Sealing',
      'Custom Arch, Sliding, Casement & Bi-Fold Profiles'
    ],
    stats: [
      { label: 'Energy Saving', value: 'Up to 40%' },
      { label: 'Profile Warranty', value: '20 Years' }
    ],
    contactPerson: 'Chaudhry Bilal Sadat',
    contactPhone: '+92 336-5666727',
    contactWhatsApp: '923365666727'
  },
  {
    id: 'div-modular',
    title: 'ri8click Space Capsule & Container Modular Homes',
    shortName: 'Modular & Capsule Pods',
    tagline: 'Aerospace Aluminum Smart Pods & Prefabricated Luxury Container Villas',
    description:
      'Factory-built space capsule houses and modular container villas with full IoT automation, panoramic Low-E glass, and 24-hour crane installation.',
    badge: 'Prefab Innovation',
    iconName: 'Layers',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85',
    capabilities: [
      'AeroPod Space Capsules & L-Shaped Container Villas',
      '24-Hour Rapid On-Site Crane Placement',
      'Ideal for Hill Resorts, Rooftops & Farmhouses'
    ],
    stats: [
      { label: 'Setup Time', value: '24 Hours' },
      { label: 'Design Lifespan', value: '50+ Years' }
    ],
    contactPerson: 'Malik Zeeshan Adil',
    contactPhone: '+92 336-5666727',
    contactWhatsApp: '923365666727'
  },
  {
    id: 'div-proptech',
    title: 'ri8click PropTech AI, 360° Digital Twins & AdVibe Studio',
    shortName: 'PropTech & AI Studio',
    tagline: 'Interactive Master Plans, 360° Virtual Tours & Real-Time Inventory Sync',
    description:
      'Next-generation real estate marketing engine powering interactive GIS master plans, 360° virtual walkthroughs, and AI property advisory.',
    badge: 'PropTech Engine',
    iconName: 'Cpu',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85',
    capabilities: [
      'Interactive 360° Panoramic Digital Twins',
      'AdVibe Megaproject Showcase & Lead CRM',
      'AI-Powered Valuation & Portfolio Matching'
    ],
    stats: [
      { label: 'Uptime', value: '99.9%' },
      { label: 'Sync Latency', value: '< 100ms' }
    ],
    contactPerson: 'Super Administrator',
    contactPhone: '+92 336-5666727',
    contactWhatsApp: '923365666727'
  }
];

export const initialConsortiumDivisions = CONSORTIUM_DIVISIONS;

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-capsule-aeropod',
    categoryTag: 'Space Capsule Smart House',
    badgeColor: 'amber',
    title: 'AeroPod E7 — Panoramic Space Capsule Smart House',
    subtitle: 'Aerospace Aluminum Shell • 24-Hour Crane Setup Across Pakistan',
    description:
      'Turnkey factory-built luxury Space Capsule Pod with 270° panoramic tempered glass, voice IoT automation, and German UPVC thermal insulation.',
    price: 'PKR 85 Lakh',
    location: 'Taxila / Islamabad / Murree',
    society: 'Faisal Hills & Northern Resorts',
    imageUrl:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
    ],
    tourRoomsCount: 4,
    isActive: true,
    order: 1,
    features: [
      'Aerospace Fluorocarbon Aluminum Shell',
      '270° Panoramic Tempered Low-E Glazing',
      'Smart Voice & App Climate/Lighting Control',
      'Installed Anywhere in 24 Hours'
    ],
    samplePropertyData: {
      title: 'AeroPod E7 Space Capsule',
      category: 'modular',
      location: { city: 'Taxila', society: 'Faisal Hills', province: 'Punjab' }
    }
  },
  {
    id: 'slide-capsule-moduloft',
    categoryTag: 'Modular Container Villa',
    badgeColor: 'emerald',
    title: 'ModuLoft K5 — L-Shaped Double Container Villa',
    subtitle: '2-Bed Turnkey Prefab Residence • Composite Deck & UPVC Glazing',
    description:
      'Engineered Cor-Ten steel modular container residence with floor-to-ceiling German UPVC sliding glass doors and luxury interior finishing.',
    price: 'PKR 1.15 Crore',
    location: 'Islamabad & Faisal Hills',
    society: 'Margalla Foothills',
    imageUrl:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85'
    ],
    tourRoomsCount: 5,
    isActive: true,
    order: 2,
    features: [
      'Cor-Ten Structural Steel Container Frame',
      'Ri8click German UPVC Sliding Glass Walls',
      '2 En-Suite Bedrooms + Designer Kitchen',
      'Solar Hybrid Ready'
    ],
    samplePropertyData: {
      title: 'ModuLoft K5 Container Villa',
      category: 'modular',
      location: {
        city: 'Islamabad',
        society: 'D-12 Margalla Foothills',
        province: 'Islamabad Capital Territory'
      }
    }
  },
  {
    id: 'slide-highrise-icon',
    categoryTag: 'Highrise Megaproject',
    badgeColor: 'blue',
    title: 'Icon Mall & Towers — 17-Storey Twin Towers',
    subtitle: 'Bahria Town Ring Road SL3 Lahore • Royal Swiss 5-Star Suites',
    description:
      '12.5-Kanal central courtyard commercial mall and 5-star hotel suites with a flexible 5-year (1% monthly) installment plan.',
    price: 'PKR 35 Lakh (1% Monthly)',
    location: 'Lahore',
    society: 'Bahria Town Lahore',
    imageUrl:
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85'
    ],
    tourRoomsCount: 8,
    isActive: true,
    order: 3,
    features: [
      'Royal Swiss 5-Star Hotel Tower Integration',
      '12.5-Kanal Central Courtyard',
      '1% Monthly Installment Plan',
      'LDA & Bahria Town Approved'
    ],
    samplePropertyData: {
      title: 'Icon Mall & Towers',
      category: 'commercial',
      location: { city: 'Lahore', society: 'Bahria Town Lahore', province: 'Punjab' }
    }
  },
  {
    id: 'slide-villa-faisalhills',
    categoryTag: 'Luxury 1-Kanal Villa',
    badgeColor: 'purple',
    title: 'Designer 1-Kanal Smart Villa — Faisal Hills',
    subtitle: '5 Master Suites • German UPVC Glazing • Margalla Ridge Views',
    description:
      'Architect-designed 1-Kanal luxury residence in Faisal Hills Block B featuring Spanish porcelain, smart automation, and 10kW hybrid solar.',
    price: 'PKR 6.85 Crore',
    location: 'Taxila / Islamabad',
    society: 'Faisal Hills Executive & Block B',
    imageUrl:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85'
    ],
    tourRoomsCount: 6,
    isActive: true,
    order: 4,
    features: [
      '5 Master Bedrooms with Imported Fittings',
      'Ri8click German UPVC Acoustic Windows',
      '10kW Hybrid Net-Metering Solar System',
      'Solid Level Plot — Immediate Transfer'
    ],
    samplePropertyData: {
      title: 'Modern 1-Kanal Villa Faisal Hills',
      category: 'residential',
      location: { city: 'Taxila', society: 'Faisal Hills', province: 'Punjab' }
    }
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Faisal Hills Taxila 2026 Market Report: Executive Block & GT Road ROI',
    slug: 'faisal-hills-taxila-2026-market-report',
    category: 'Faisal Hills Updates',
    excerpt:
      'An in-depth analysis of commercial and residential capital appreciation in Faisal Hills Executive Block, Block A, B, C, and Commercial Broadway.',
    content:
      'Faisal Hills continues to lead the Rawalpindi-Islamabad-Taxila corridor with direct N-5 GT Road frontage and Margalla Hills connectivity. Commercial Broadway plazas and 1-Kanal designer villas have recorded strong rental yields.',
    coverImage:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    authorName: 'Malik Zeeshan Adil',
    authorRole: 'Chief Executive, Al-Mairaj Estates',
    authorAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.malikZeeshan_Taxila,
    publishedAt: '2026-09-10',
    readingTime: '5 min read',
    tags: ['Faisal Hills', 'Taxila', 'Investment'],
    viewsCount: 1840,
    isFeatured: true,
    status: 'published'
  },
  {
    id: 'blog-2',
    title: 'Why Space Capsule & Modular Container Homes Are Transforming Pakistan Resorts',
    slug: 'space-capsule-modular-homes-pakistan-resorts',
    category: 'Modular & Prefab Tech',
    excerpt:
      'How factory-finished aerospace aluminum capsule homes and Cor-Ten steel container villas cut construction time from 18 months to 24 hours.',
    content:
      'Hospitality investors in Murree, Nathia Gali, Swat, Skardu, and Margalla foothills are rapidly adopting Ri8click AeroPod space capsules and ModuLoft container villas for immediate rental cashflow.',
    coverImage:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
    authorName: 'Engr. Haris Farooq',
    authorRole: 'Principal Engineer, Ri8click Modular',
    authorAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.engrHarisFarooq_Islamabad,
    publishedAt: '2026-09-05',
    readingTime: '4 min read',
    tags: ['Capsule Homes', 'Modular', 'Tourism'],
    viewsCount: 1520,
    isFeatured: true,
    status: 'published'
  }
];

export const INITIAL_SITE_PORTIONS: SiteSectionPortion[] = [
  {
    id: 'hero_slider',
    key: 'hero_slider',
    name: 'Hero Portfolio Deck & Showroom Stage',
    title: 'Ri8click Consortium Portfolio Deck',
    subtitle: 'Interactive Capsule Homes, Highrises & Verified Villas',
    isVisible: true,
    isEnabled: true,
    order: 1
  },
  {
    id: 'search_bar',
    key: 'search_bar',
    name: 'Smart Property Filter & Search Bar',
    title: 'Search Verified Pakistan Inventory',
    subtitle: 'Filter by Province, City, Society, Category & Budget',
    isVisible: true,
    isEnabled: true,
    order: 2
  },
  {
    id: 'properties_grid',
    key: 'properties_grid',
    name: 'Featured Watermarked Properties Grid',
    title: 'Featured Watermarked Properties',
    subtitle: '100% Verified Residential, Commercial & Plot Listings',
    isVisible: true,
    isEnabled: true,
    order: 3
  },
  {
    id: 'commercial_showcase',
    key: 'commercial_showcase',
    name: 'Commercial Plazas & High-Rise Towers',
    title: 'High-Yield Commercial Plazas & Retail Outlets',
    subtitle: 'Verified Commercial Inventory in Faisal Hills, Islamabad & Lahore',
    isVisible: true,
    isEnabled: true,
    order: 4
  },
  {
    id: 'modular_showcase',
    key: 'modular_showcase',
    name: 'Readymade Space Capsule & Container Modular Homes',
    title: 'Readymade Space Capsule & Modular Smart Houses',
    subtitle: 'Aerospace Aluminum Pods & Container Villas Installed in 24 Hours',
    isVisible: true,
    isEnabled: true,
    order: 5
  },
  {
    id: 'agencies_network',
    key: 'agencies_network',
    name: 'Top Certified Agencies & Real Estate Specialists',
    title: 'Top Certified Agencies & Real Estate Specialists',
    subtitle: 'Verified Regional Brokers Across Taxila, Faisal Hills, Islamabad & Lahore',
    isVisible: true,
    isEnabled: true,
    order: 6
  },
  {
    id: 'consortium_showcase',
    key: 'consortium_showcase',
    name: 'ri8click Corporate Consortium Structure',
    title: 'ri8click Group of Companies',
    subtitle: 'Real Estate, Turnkey Construction, German UPVC, Modular Pods & PropTech AI',
    isVisible: true,
    isEnabled: true,
    order: 7
  },
  {
    id: 'news_blogs_section',
    key: 'news_blogs_section',
    name: 'Market Intelligence, News & Blogs',
    title: 'Real Estate Market Intelligence & Construction Guides',
    subtitle: 'Latest Updates on Faisal Hills, Modular Pods & Tax/NOC Regulations',
    isVisible: true,
    isEnabled: true,
    order: 8
  }
];

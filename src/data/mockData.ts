import { 
  Property, 
  ProvinceCityData, 
  AgencyAccount, 
  ConsortiumDivision,
  HeroSlide,
  BlogPost,
  SiteSectionPortion
} from '../types';

export const PAKISTAN_REGIONAL_AGENT_AVATARS = {
  malikZeeshan_Taxila:
    'https://images.unsplash.com/photo-1615813967515-e1838c1c5116?auto=format&fit=crop&w=400&q=80',
  chaudhryBilal_FaisalHills:
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=400&q=80',
  engrHarisFarooq_Islamabad:
    'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
  hajiAslamKhan_Kohistan:
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
  mianAhmed_Lahore:
    'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80',
  tariqMehmood_Rawalpindi:
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
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
          'University Road Enclave',
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
          'Askari 14 & 15',
          'Satellite Town',
          'Westridge'
        ]
      },
      {
        name: 'Lahore',
        isFeatured: true,
        societies: [
          'DHA Phase 1-9 & Prism 9',
          'Bahria Town Lahore',
          'Gulberg 2 & 3',
          'Model Town',
          'Lake City',
          'Johar Town',
          'Wapda Town',
          'Askari 10 & 11'
        ]
      },
      {
        name: 'Faisalabad',
        societies: [
          'FDA City',
          'Canal Road Estates',
          'Madina Town',
          'Eden Gardens',
          'Susan Road Commercial'
        ]
      },
      {
        name: 'Multan',
        societies: [
          'DHA Multan',
          'Royal Orchard',
          'Wapda Town Multan',
          'Cantt Area'
        ]
      },
      {
        name: 'Gujranwala',
        societies: [
          'DC Colony',
          'Master City',
          'Citi Housing',
          'Rahwali Cantt'
        ]
      },
      {
        name: 'Sialkot',
        societies: [
          'Citi Housing Sialkot',
          'Cantt Enclave',
          'Paris Road Commercial'
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
        societies: [
          'DHA Peshawar',
          'Hayatabad Phase 1-7',
          'Regi Model Town',
          'University Town',
          'Warsak Road Enclave'
        ]
      },
      {
        name: 'Abbottabad',
        societies: [
          'PMA Kakul Road',
          'Jinnahabad',
          'Habibullah Colony',
          'Mirpur Enclave',
          'Nathia Gali Hill Resorts'
        ]
      },
      {
        name: 'Mardan',
        societies: [
          'Sheikh Maltoon Town',
          'Green Acres',
          'Cantt Commercial'
        ]
      },
      {
        name: 'Swat',
        societies: [
          'Mingora Commercial Hub',
          'Fizagat Resort Enclave',
          'Kalam Tourist Pods Zone'
        ]
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
          'Gulshan-e-Iqbal',
          'North Nazimabad',
          'Emaar Crescent Bay'
        ]
      },
      {
        name: 'Hyderabad',
        societies: [
          'Qasimabad',
          'Latifabad',
          'Abdullah Garden',
          'Auto Bahn Road Commercial'
        ]
      },
      {
        name: 'Sukkur',
        societies: [
          'Rohri Bypass Enclave',
          'Sukkur Township',
          'Military Road'
        ]
      }
    ]
  },
  {
    province: 'Balochistan & Gilgit-Baltistan',
    cities: [
      {
        name: 'Quetta',
        societies: [
          'DHA Quetta',
          'Jinnah Town',
          'Samungli Road',
          'Quetta Cantt'
        ]
      },
      {
        name: 'Gwadar',
        isFeatured: true,
        societies: [
          'Sanghar Housing Scheme',
          'New Town Phase 1-4',
          'GDA Commercial Zone',
          'Marine Drive Front'
        ]
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
    name: 'Malik Zeeshan',
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
    rating: 4.9,
    joinedDate: 'Jan 2024',
    canManageAdvibe: true
  },
  {
    id: 'agency-2',
    name: 'Chaudhry Bilal',
    companyName: 'Faisal Hills Property Advisors',
    logo: PAKISTAN_REGIONAL_AGENT_AVATARS.chaudhryBilal_FaisalHills,
    avatar: PAKISTAN_REGIONAL_AGENT_AVATARS.chaudhryBilal_FaisalHills,
    phone: '+92 336-5666727',
    whatsapp: '923365666727',
    email: 'bilal@faisalhillsadvisors.pk',
    city: 'Taxila',
    primarySociety: 'Faisal Hills Executive Block',
    verified: true,
    postLimit: 15,
    totalPosts: 4,
    activeListings: 4,
    rating: 4.85,
    joinedDate: 'Mar 2024',
    canManageAdvibe: true
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
    canManageAdvibe: false
  },
  {
    id: 'agency-4',
    name: 'Haji Aslam Khan',
    companyName: 'Kohistan & Margalla Realtors',
    logo: PAKISTAN_REGIONAL_AGENT_AVATARS.hajiAslamKhan_Kohistan,
    avatar: PAKISTAN_REGIONAL_AGENT_AVATARS.hajiAslamKhan_Kohistan,
    phone: '+92 336-5666727',
    whatsapp: '923365666727',
    email: 'aslam@margallarealtors.pk',
    city: 'Taxila',
    primarySociety: 'Kohistan Enclave',
    verified: true,
    postLimit: 10,
    totalPosts: 2,
    activeListings: 2,
    rating: 4.75,
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
    canManageAdvibe: true
  }
];

export const INITIAL_PROPERTIES: Property[] = [
  // ===================== 1. COMMERCIAL PROPERTIES =====================
  {
    id: 'prop-icon-mall-comm-lahore',
    title: 'Icon Mall & Towers - Prime Commercial Shops & Food Court Outlets',
    tagline: 'Bahria Town Ring Road SL3 Interchange • 17-Storey Twin Tower Megaproject',
    description: 'Invest in Lahore’s premier mixed-use commercial landmark by Athar Associates & Sapphire Properties. Situated directly at Bahria Town Lahore near the Ring Road SL3 Interchange on a prime 3-side corner plot with a 12.5-Kanal central courtyard. Offering high-footfall Ground to 4th Floor retail outlets, double-height international brand showrooms, and a dedicated mega food court & entertainment zone. Backed by Royal Swiss 5-Star Hotel hospitality in Tower 2, 2 basement parking levels, 16 high-speed elevators & escalators, and flexible 5-year installment plans starting from just 1% monthly.',
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
      block: 'Ring Road SL3 Interchange / Sector C',
      address: 'Main Boulevard, Bahria Town Ring Road SL3 Interchange, Lahore, Punjab, Pakistan',
      latitude: 31.3650,
      longitude: 74.1850,
      mapZoom: 16,
      nearbyLandmarks: [
        'Bahria Town Ring Road SL3 Interchange',
        'Grand Jamia Mosque Bahria Town',
        'Eiffel Tower Bahria Town Lahore',
        'Lake City & Adda Plot Interchange',
        'Canal Bank Road Lahore'
      ]
    },
    area: 220,
    areaUnit: 'Sq Ft',
    floors: 17,
    parking: 200,
    features: [
      'Royal Swiss 5-Star Hotel Tower Integration',
      '12.5-Kanal Open Central Courtyard & Atrium',
      '3-Side Corner Plot on Ring Road SL3 Interchange',
      'Flexible 5-Year Payment Plan (1% Monthly)',
      '16 High-Speed Capsule Elevators & Escalators',
      '2 Dedicated Underground Basement Parking Levels',
      'Dedicated Mega Food Court, Play Area & Brand Outlets',
      '100% LDA / Bahria Town NOC Approved Commercial',
      '24/7 Tier-3 Backup Power Generators & HVAC',
      'Guaranteed High Rental Yield & Capital Appreciation'
    ],
    images: [
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    watermark: true,
    agencyId: 'agency-sapphire',
    agentName: 'Sapphire Properties Advisory',
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
    virtualTourVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    virtualTourVideoTitle: 'Icon Mall & Towers Bahria Town Lahore 3D Walkthrough',
    hasVirtualTour: true
  },
  {
    id: 'prop-comm-1',
    title: 'Ri8Click Executive Commercial Plaza',
    tagline: 'Prime 5-Storey Commercial Landmark on Main Boulevard',
    description: 'High-yield commercial plaza located in the heart of Faisal Hills Commercial Broadway, Taxila. Features double-height ground floor retail showrooms, dedicated underground parking, high-speed capsule elevator, and 4 floors of corporate office suites with panoramic Margalla Hills views. Constructed with Ri8Click German UPVC soundproof glazing.',
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
      mapZoom: 15,
      nearbyLandmarks: [
        'Faisal Hills Main Gate (GT Road N-5)',
        'Taxila Museum Historical Site',
        'HITEC University Taxila',
        'Margalla Hills North Ridge',
        'MPCHS Multi Gardens B-17 Interchange'
      ]
    },
    area: 8,
    areaUnit: 'Marla',
    floors: 5,
    parking: 12,
    features: [
      'Corner Commercial Plot (3-Side Open)',
      'Capsule Passenger Elevator Installed',
      'Ri8Click Soundproof UPVC Facade',
      'Expected Rental Yield: 9.5% Annually',
      'Dedicated Transformer & Backup Generator',
      'RDA / TMA Approved Building Plan'
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80'
    ],
    watermark: true,
    agencyId: 'agency-1',
    agentName: 'Malik Zeeshan',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.malikZeeshan_Taxila,
    agentCompany: 'Al-Mairaj Real Estate & Builders',
    agentRating: 4.9,
    isFeatured: true,
    isHotCommercial: true,
    viewsCount: 1420,
    savesCount: 89,
    createdAt: '2026-08-20',
    status: 'active',
    virtualTourVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    virtualTourVideoTitle: 'Ri8Click Executive Commercial Plaza Walkthrough',
    hasVirtualTour: true
  },
  {
    id: 'prop-comm-2',
    title: 'Multi-Storey Corporate Tower on GT Road',
    tagline: 'Main N-5 Highway Frontage Commercial Building',
    description: 'Flagship commercial investment opportunity directly on Main GT Road Taxila near Faisal Hills main gate. Ideal for multinational banks, software houses, medical diagnostic centers, and retail chains. 100% leased ground floor with immediate rental income.',
    category: 'commercial',
    type: 'Commercial Plaza',
    purpose: 'for_sale',
    price: 185000000,
    priceFormatted: 'PKR 18.5 Crore',
    currency: 'PKR',
    location: {
      province: 'Punjab',
      city: 'Taxila',
      society: 'GT Road Commercial Belt',
      block: 'Main N-5 Corridor',
      address: 'Adjacent Faisal Hills Main Gate, Main GT Road, Taxila',
      latitude: 33.7458,
      longitude: 72.7875,
      mapZoom: 15,
      nearbyLandmarks: [
        'Main GT Road (N-5) Frontage',
        'Heavy Mechanical Complex (HMC)',
        'Taxila Cantt Checkpost',
        'Wah Medical College'
      ]
    },
    area: 1.5,
    areaUnit: 'Kanal',
    floors: 7,
    parking: 35,
    features: [
      '120-Ft Frontage on Main GT Road',
      'Dual High-Speed Elevators',
      'Central HVAC & Fire Safety System',
      'Ground Floor Leased to National Bank',
      'Underground Basement Parking',
      'Solar Net-Metering (50kW Installed)'
    ],
    images: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1000&q=80'
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
    isHotCommercial: true,
    viewsCount: 980,
    savesCount: 64,
    createdAt: '2026-08-18',
    status: 'active'
  },
  {
    id: 'prop-comm-3',
    title: 'Brand New Corporate Office Suite - Blue Area',
    tagline: 'Ready-to-Move Furnished IT & Corporate Floor',
    description: 'A-grade corporate office floor in New Blue Area, Islamabad. Designed with glass partitions, executive boardrooms, server room, fiber-optic connectivity, and dedicated parking slots.',
    category: 'commercial',
    type: 'Corporate Office',
    purpose: 'for_rent',
    price: 650000,
    priceFormatted: 'PKR 6.5 Lakh / mo',
    currency: 'PKR',
    location: {
      province: 'Islamabad Capital Territory',
      city: 'Islamabad',
      society: 'Blue Area Corporate Zone',
      address: '7th Floor, Horizon Corporate Tower, Jinnah Avenue, Blue Area'
    },
    area: 3800,
    areaUnit: 'Sq Ft',
    features: [
      'Fully Furnished Executive Interior',
      'High Speed Fiber Internet Infrastructure',
      'Biometric Access & Smart Keyless Entry',
      '12 Reserved Parking Slots',
      'Executive Dining & Pantry',
      '24/7 Power Backup (Tier-3)'
    ],
    images: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80'
    ],
    watermark: true,
    agencyId: 'agency-3',
    agentName: 'Engr. Haris Farooq',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.engrHarisFarooq_Islamabad,
    agentCompany: 'Beacon Prime Commercial Estates',
    agentRating: 4.95,
    isFeatured: false,
    isHotCommercial: true,
    viewsCount: 750,
    savesCount: 42,
    createdAt: '2026-08-25',
    status: 'active'
  },
  {
    id: 'prop-comm-4',
    title: 'Corner Commercial Retail Shop in Faisal Hills',
    tagline: 'Double-Height Ground Floor Commercial Unit',
    description: 'High-footfall ground floor corner shop on Faisal Hills Commercial Broadway. Ideal for top pharmacy chains, gourmet cafes, supermarkets, or fashion boutiques. Immediate possession available.',
    category: 'commercial',
    type: 'Retail Shop',
    purpose: 'for_sale',
    price: 32000000,
    priceFormatted: 'PKR 3.2 Crore',
    currency: 'PKR',
    location: {
      province: 'Punjab',
      city: 'Taxila',
      society: 'Faisal Hills',
      block: 'Faisal Hills Commercial Broadway',
      address: 'Shop #G-02, Broadway Square, Faisal Hills, Taxila'
    },
    area: 4,
    areaUnit: 'Marla',
    features: [
      'Double Height Ceiling (18 ft)',
      'Direct Frontage on 150ft Boulevard',
      'High Pedestrian & Vehicle Traffic',
      'Dedicated Customer Parking Front',
      'Water, Gas & 3-Phase Meter Installed',
      'Rental Value: PKR 1.8 Lakh/month'
    ],
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80'
    ],
    watermark: true,
    agencyId: 'agency-2',
    agentName: 'Chaudhry Bilal',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.chaudhryBilal_FaisalHills,
    agentCompany: 'Faisal Hills Property Advisors',
    agentRating: 4.85,
    isFeatured: true,
    isHotCommercial: true,
    viewsCount: 1120,
    savesCount: 54,
    createdAt: '2026-08-22',
    status: 'active'
  },

  // ===================== 2. RESIDENTIAL PROPERTIES =====================
  {
    id: 'prop-icon-mall-res-lahore',
    title: 'Icon Mall & Towers - Luxury Furnished Apartments & Royal Swiss Suites',
    tagline: '10 Residential Floors of Ultra-Luxury Living with Royal Swiss 5-Star Hotel Amenities',
    description: 'Discover 5-star luxury living at Icon Mall & Towers, situated in Bahria Town Lahore at the SL3 Ring Road Interchange. Spanning from the 5th to the 17th floors of the iconic twin towers, these fully furnished luxury designer apartments and hotel-serviced executive suites offer breathtaking skyline and 12.5-Kanal courtyard views. Backed by Royal Swiss International 5-Star Hotel hospitality in Tower 2, residents enjoy exclusive access to rooftop infinity swimming pools, executive fitness club, luxury spa, rooftop BBQ social deck, 24/7 concierge and room service, smart biometric access, and 100% uninterrupted power backup with flexible 5-year installment plans starting at just 1% monthly.',
    category: 'residential',
    type: 'Luxury Apartment',
    purpose: 'for_sale',
    price: 8480000,
    priceFormatted: 'PKR 84.8 Lakh (Booking from 5 Lakh)',
    currency: 'PKR',
    location: {
      province: 'Punjab',
      city: 'Lahore',
      society: 'Bahria Town Lahore',
      block: 'Ring Road SL3 Interchange / Sector C',
      address: 'Towers 1 & 2, Bahria Town Ring Road SL3 Interchange, Lahore, Punjab, Pakistan',
      latitude: 31.3650,
      longitude: 74.1850,
      mapZoom: 16,
      nearbyLandmarks: [
        'Bahria Town Ring Road SL3 Interchange',
        'Grand Jamia Mosque Bahria Town',
        'Eiffel Tower Bahria Town Lahore',
        'Beaconhouse National University (BNU)',
        'Safari Zoo Lahore',
        'Lake City Interchange'
      ]
    },
    area: 550,
    areaUnit: 'Sq Ft',
    bedrooms: 1,
    bathrooms: 1,
    floors: 17,
    parking: 1,
    features: [
      'Fully Furnished Designer Interior by Royal Swiss Standards',
      'Rooftop Infinity Swimming Pool with Skyline Views',
      'Exclusive Resident Health Club, Gym & Luxury Spa',
      'Private High-Speed Residential Elevators & Access Cards',
      '12.5-Kanal Central Courtyard Views & Balconies',
      'Rooftop Open-Air BBQ & Social Lounge',
      '24/7 Concierge, Valet & Room Service by Royal Swiss Hotel',
      'Underground Reserved Residential Parking',
      '24/7 Smart Biometric Security & Continuous Power Backup',
      'Flexible 5-Year Installment Plan with 1% Monthly Installment'
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    watermark: true,
    agencyId: 'agency-sapphire',
    agentName: 'Sapphire Properties Advisory',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.mianAhmed_Lahore,
    agentCompany: 'Sapphire Properties & Athar Associates',
    agentRating: 4.98,
    isFeatured: true,
    isHotCommercial: false,
    viewsCount: 2890,
    savesCount: 182,
    createdAt: '2026-09-01',
    status: 'active',
    virtualTourVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    virtualTourVideoTitle: 'Icon Mall & Towers Luxury Apartment & Penthouse 3D Tour',
    hasVirtualTour: true
  },
  {
    id: 'prop-res-1',
    title: 'Modern Architectural Villa in Faisal Hills',
    tagline: 'Designer 5-Bedroom Luxury Villa with Margalla View',
    description: 'Breathtaking 1-Kanal modern contemporary villa in Faisal Hills Block B, Taxila. Crafted with imported Spanish tiles, solid ash wood doors, premium Ri8Click German UPVC double glazed windows for optimal thermal insulation, imported Italian kitchen fittings, lush landscaped lawn, and rooftop stargazing patio.',
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
      'Imported Italian Dirty & Show Kitchens',
      'Smart Home Automation (Lights, AC, Security)',
      '10kW Hybrid On-Grid Solar System',
      'Servant Quarters with Separate Entry',
      'Rooftop BBQ & Margalla View Terrace',
      'Approved Solid Grey Structure Certificate'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80'
    ],
    watermark: true,
    agencyId: 'agency-1',
    agentName: 'Malik Zeeshan',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.malikZeeshan_Taxila,
    agentCompany: 'Al-Mairaj Real Estate & Builders',
    agentRating: 4.9,
    isFeatured: true,
    viewsCount: 2150,
    savesCount: 145,
    createdAt: '2026-08-24',
    status: 'active',
    virtualTourVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    virtualTourVideoTitle: '1-Kanal Designer Villa Faisal Hills 360° Tour',
    hasVirtualTour: true
  },
  {
    id: 'prop-res-2',
    title: '10-Marla Contemporary House in B-17 Multi Gardens',
    tagline: 'Brand New Double Storey House Near MPCHS Markaz',
    description: 'Elegantly designed 10-Marla double-storey house in Multi Gardens B-17 Block C, Islamabad. Walking distance to central park, Jamia Masjid, and commercial markaz. Direct access to GT Road and Peshawar-Islamabad Motorway M-1.',
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
      'Sui Gas & Underground Electricity Installed',
      'Grohe Sanitary Fittings & Spanish Porcelain',
      'CCTV Surveillance System Included',
      '2 Mins from M-1 Motorway Interchange'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80'
    ],
    watermark: true,
    agencyId: 'agency-2',
    agentName: 'Chaudhry Bilal',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.chaudhryBilal_FaisalHills,
    agentCompany: 'Faisal Hills Property Advisors',
    agentRating: 4.85,
    isFeatured: true,
    viewsCount: 1640,
    savesCount: 92,
    createdAt: '2026-08-19',
    status: 'active'
  },
  {
    id: 'prop-res-3',
    title: 'Margalla Hillside Executive Villa - Kohistan Enclave',
    tagline: 'Ultra-Modern 1-Kanal Smart Residence on GT Road Taxila',
    description: 'Situated in the lush green surroundings of Kohistan Enclave, Wah/Taxila. This 1-Kanal designer house features floor-to-ceiling thermal windows, private courtyard, home theater lounge, and top-tier security in a gated community.',
    category: 'residential',
    type: 'Villa',
    purpose: 'for_sale',
    price: 59000000,
    priceFormatted: 'PKR 5.9 Crore',
    currency: 'PKR',
    location: {
      province: 'Punjab',
      city: 'Taxila',
      society: 'Kohistan Enclave',
      block: 'Executive Overseas Block',
      address: 'Main Boulevard, Kohistan Enclave, GT Road Wah/Taxila'
    },
    area: 1,
    areaUnit: 'Kanal',
    bedrooms: 5,
    bathrooms: 6,
    parking: 3,
    features: [
      'Gated Community with 24/7 Armed Security',
      'Dedicated Basement Home Theater Lounge',
      'Ri8Click Acoustic UPVC Windows & Sliding Doors',
      'Lush Green Front & Rear Courtyard',
      'Imported Kitchen Appliances Installed',
      'Near Wah Cantt & Taxila Museum'
    ],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    watermark: true,
    agencyId: 'agency-4',
    agentName: 'Haji Aslam Khan',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.hajiAslamKhan_Kohistan,
    agentCompany: 'Kohistan & Margalla Realtors',
    agentRating: 4.75,
    isFeatured: true,
    viewsCount: 1890,
    savesCount: 97,
    createdAt: '2026-08-21',
    status: 'active'
  },
  {
    id: 'prop-res-4',
    title: 'Penthouse Apartment in Eighteen Islamabad',
    tagline: 'Golf Course Facing 4-Bed Sky Villa Penthouse',
    description: 'Experience resort-style luxury in Eighteen Islamabad. Overlooking the 18-hole championship golf course, this sky penthouse offers private elevator access, wrap-around terrace, infinity plunge pool, and concierge services.',
    category: 'residential',
    type: 'Penthouse',
    purpose: 'for_sale',
    price: 145000000,
    priceFormatted: 'PKR 14.5 Crore',
    currency: 'PKR',
    location: {
      province: 'Islamabad Capital Territory',
      city: 'Islamabad',
      society: 'Eighteen Islamabad',
      address: 'The Heights Golf View, Eighteen, Srinagar Highway, Islamabad'
    },
    area: 4500,
    areaUnit: 'Sq Ft',
    bedrooms: 4,
    bathrooms: 5,
    parking: 3,
    features: [
      'Panoramic 18-Hole Golf Course Views',
      'Private Terrace Plunge Pool',
      'VRV Central Air Conditioning',
      '5-Star Concierge & Club Membership',
      '10 Mins from New Islamabad International Airport'
    ],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80'
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
    viewsCount: 3100,
    savesCount: 240,
    createdAt: '2026-08-15',
    status: 'active'
  },
  {
    id: 'prop-res-5',
    title: 'Furnished Executive 3-Bed Villa in Faisal Hills',
    tagline: 'Ready for Immediate Family Move-In',
    description: 'Fully furnished 7-Marla designer house available for rent in Faisal Hills Block A, Taxila. Perfect for expatriates, university faculty, and corporate executives working in Taxila, Wah Cantt, or Islamabad.',
    category: 'residential',
    type: 'Villa',
    purpose: 'for_rent',
    price: 185000,
    priceFormatted: 'PKR 1.85 Lakh / mo',
    currency: 'PKR',
    location: {
      province: 'Punjab',
      city: 'Taxila',
      society: 'Faisal Hills',
      block: 'Faisal Hills Block A',
      address: 'Street 9, Block A, Near Civic Center, Faisal Hills, Taxila'
    },
    area: 7,
    areaUnit: 'Marla',
    bedrooms: 3,
    bathrooms: 4,
    parking: 2,
    features: [
      'Fully Furnished with Luxury Furniture',
      'Inverter ACs & Solar Backup Installed',
      'High-Speed Fiber Internet Ready',
      'Walking Distance to Park & Mosque'
    ],
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'
    ],
    watermark: true,
    agencyId: 'agency-1',
    agentName: 'Malik Zeeshan',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.malikZeeshan_Taxila,
    agentCompany: 'Al-Mairaj Real Estate & Builders',
    agentRating: 4.9,
    isFeatured: false,
    viewsCount: 840,
    savesCount: 38,
    createdAt: '2026-08-26',
    status: 'active'
  },

  // ===================== 3. PLOTS (RESIDENTIAL & COMMERCIAL) =====================
  {
    id: 'prop-plot-1',
    title: '5-Marla Possession Ready Plot - Faisal Hills Block C',
    tagline: 'Level & Solid Land Facing Margalla Hills & Park',
    description: 'Prime 5-Marla residential plot with immediate possession in Faisal Hills Block C, Taxila. Solid level land requiring zero filling, situated on a 40-ft wide carpeted street facing the lush green park and Margalla Hills view.',
    category: 'residential',
    type: 'Residential Plot',
    purpose: 'for_sale',
    price: 4800000,
    priceFormatted: 'PKR 48 Lakh',
    currency: 'PKR',
    location: {
      province: 'Punjab',
      city: 'Taxila',
      society: 'Faisal Hills',
      block: 'Faisal Hills Block C',
      address: 'Plot #342, Street 14, Block C, Faisal Hills, Taxila'
    },
    area: 5,
    areaUnit: 'Marla',
    features: [
      'Immediate Construction Possession Available',
      '100% Solid Level Land (No Filling Required)',
      '40-Ft Wide Carpeted Street',
      'Park Facing & Margalla View',
      'All Dues Cleared - Direct Transfer'
    ],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ],
    watermark: true,
    agencyId: 'agency-1',
    agentName: 'Malik Zeeshan',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.malikZeeshan_Taxila,
    agentCompany: 'Al-Mairaj Real Estate & Builders',
    agentRating: 4.9,
    isFeatured: false,
    viewsCount: 1120,
    savesCount: 67,
    createdAt: '2026-08-23',
    status: 'active'
  },
  {
    id: 'prop-plot-2',
    title: '10-Marla Corner Residential Plot - Executive Block',
    tagline: 'Walking Distance to Main GT Road & Markaz',
    description: 'Prime 10-Marla corner plot in Faisal Hills Executive Block, Taxila. Fully developed sector with hundreds of families already living. Ideal for building your dream villa with Ri8Click Turnkey Construction.',
    category: 'residential',
    type: 'Residential Plot',
    purpose: 'for_sale',
    price: 9200000,
    priceFormatted: 'PKR 92 Lakh',
    currency: 'PKR',
    location: {
      province: 'Punjab',
      city: 'Taxila',
      society: 'Faisal Hills Executive Block',
      block: 'Executive Block',
      address: 'Plot #88-Corner, Street 6, Executive Block, Faisal Hills, Taxila'
    },
    area: 10,
    areaUnit: 'Marla',
    features: [
      'Prime Corner Category Plot',
      'Underground Electricity & Gas Available',
      'Near Executive Block Grand Mosque',
      '2 Mins Drive from Main GT Road N-5'
    ],
    images: [
      'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&w=1200&q=80'
    ],
    watermark: true,
    agencyId: 'agency-1',
    agentName: 'Malik Zeeshan',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.malikZeeshan_Taxila,
    agentCompany: 'Al-Mairaj Real Estate & Builders',
    agentRating: 4.9,
    isFeatured: true,
    viewsCount: 1340,
    savesCount: 81,
    createdAt: '2026-08-22',
    status: 'active'
  },
  {
    id: 'prop-plot-3',
    title: '8-Marla Commercial Plot on 225-Ft Main Boulevard',
    tagline: 'High-Rise Approved Commercial Plot in Faisal Hills',
    description: 'Golden investment opportunity on the 225-ft wide Commercial Broadway in Faisal Hills, Taxila. Approved for Ground + 6 floors commercial plaza construction.',
    category: 'commercial',
    type: 'Commercial Plot',
    purpose: 'for_sale',
    price: 45000000,
    priceFormatted: 'PKR 4.5 Crore',
    currency: 'PKR',
    location: {
      province: 'Punjab',
      city: 'Taxila',
      society: 'Faisal Hills',
      block: 'Faisal Hills Commercial Broadway',
      address: 'Main 225-Ft Boulevard, Commercial Broadway, Faisal Hills, Taxila'
    },
    area: 8,
    areaUnit: 'Marla',
    features: [
      'Direct Frontage on 225-Ft Main Boulevard',
      'Approved for Ground + 6 Floors',
      'Ample Front Parking Belt',
      'Highest Capital Appreciation Zone in Taxila'
    ],
    images: [
      'https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=1200&q=80'
    ],
    watermark: true,
    agencyId: 'agency-3',
    agentName: 'Engr. Haris Farooq',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.engrHarisFarooq_Islamabad,
    agentCompany: 'Beacon Prime Commercial Estates',
    agentRating: 4.95,
    isFeatured: false,
    isHotCommercial: true,
    viewsCount: 920,
    savesCount: 53,
    createdAt: '2026-08-17',
    status: 'active'
  },

  // ===================== 4. MODULAR & SPACE CAPSULE SMART HOUSES =====================
  {
    id: 'prop-mod-1',
    title: 'Ri8Click Space Capsule Smart Pod (Model X-100)',
    tagline: 'Aerospace Aluminum Shell • 270° Panoramic Glass • Deployed in 7 Days',
    description: 'Revolutionary Readymade Space Capsule Smart House by Ri8Click Modular Consortium. Engineered with a galvanized steel structural frame, aviation-grade fluorocarbon aluminum shell, and 270-degree double-glazed Low-E panoramic glass with stargazing skylight. Fully equipped with smart voice/app automation, motorized curtains, central climate control, luxury bathroom, and ambient LED lighting. Crane-installed anywhere in Pakistan within 24 hours.',
    category: 'modular',
    type: 'Capsule Smart House',
    purpose: 'for_sale',
    price: 8500000,
    priceFormatted: 'PKR 85 Lakh',
    currency: 'PKR',
    location: {
      province: 'Punjab',
      city: 'Taxila',
      society: 'Faisal Hills',
      block: 'Ri8Click Modular Display Center',
      address: 'Ri8Click Prefab Showcase Hub, Taxila Bypass / Nationwide Delivery'
    },
    area: 420,
    areaUnit: 'Sq Ft',
    bedrooms: 1,
    bathrooms: 1,
    features: [
      'Aerospace Aluminum Alloy Shell (50-Year Lifespan)',
      '270° Curved Double-Glazed Low-E Panoramic Window',
      'Smart Voice & Mobile App Home Automation',
      'Electric Floor Heating & Inverter Climate Control',
      'Five-Star Hotel Grade Smart Wet/Dry Bathroom',
      'Zero On-Site Construction Mess - Crane Installed in 4 Hours',
      'Ri8Click Thermal Insulation (-20°C to +55°C)',
      '100% Relocatable & Transportable Asset'
    ],
    images: [
      'https://www.genspark.ai/api/files/s/I6HwjuLB',
      'https://www.genspark.ai/api/files/s/u84KzdvI',
      'https://www.genspark.ai/api/files/s/pSySUzgg',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80'
    ],
    watermark: true,
    agencyId: 'agency-1',
    agentName: 'Malik Zeeshan (Modular Specialist)',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.malikZeeshan_Taxila,
    agentCompany: 'Ri8Click Prefab & Modular Consortium',
    agentRating: 5.0,
    isFeatured: true,
    viewsCount: 4200,
    savesCount: 380,
    createdAt: '2026-08-28',
    status: 'active'
  },
  {
    id: 'prop-mod-3',
    title: 'Ri8Click Curved Panoramic Capsule Cabin (Model E-70)',
    tagline: 'Curved Container Architecture • Open Deck Balcony • Resort & Farmhouse Ready',
    description: 'Bespoke curved-edge container and space capsule hybrid smart home. Features an open-air composite timber balcony deck, wraparound curved glass observation lounge, integrated smart kitchen bar, and acoustic UPVC sliding doors. Ideal for Murree, Nathia Gali, Swat, Hunza resorts, or Faisal Hills & Islamabad farmhouses.',
    category: 'modular',
    type: 'Capsule Smart House',
    purpose: 'for_sale',
    price: 9800000,
    priceFormatted: 'PKR 98 Lakh',
    currency: 'PKR',
    location: {
      province: 'Islamabad Capital Territory',
      city: 'Islamabad',
      society: 'Faisal Hills (Margalla Connector)',
      block: 'Margalla Ridge Resort Hub',
      address: 'Margalla Foothills Display / Nationwide Turnkey Delivery'
    },
    area: 550,
    areaUnit: 'Sq Ft',
    bedrooms: 2,
    bathrooms: 1,
    features: [
      'Curved-Corner Structural UPVC & Tempered Glass',
      'Integrated Outdoor Viewing Deck & Ambient Strips',
      'Off-Grid 8kW Solar + Lithium Battery Option',
      '2 Bedrooms + Panoramic Lounge + Kitchenette',
      'Seismic Grade-9 & Typhoon Wind Resistant',
      'Turnkey Factory Built - Delivered Ready to Plug & Play'
    ],
    images: [
      'https://www.genspark.ai/api/files/s/OypEiCb2',
      'https://www.genspark.ai/api/files/s/bl8vngPB',
      'https://www.genspark.ai/api/files/s/3jIuxLrV',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    watermark: true,
    agencyId: 'agency-1',
    agentName: 'Malik Zeeshan (Modular Specialist)',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.malikZeeshan_Taxila,
    agentCompany: 'Ri8Click Prefab & Modular Consortium',
    agentRating: 5.0,
    isFeatured: true,
    viewsCount: 3950,
    savesCount: 310,
    createdAt: '2026-08-27',
    status: 'active'
  },
  {
    id: 'prop-mod-2',
    title: 'Ri8Click 2-Bed Modular Luxury Prefab Villa',
    tagline: 'Expandable Double-Story Modular Smart Home with Rooftop Deck',
    description: 'A complete 2-bedroom luxury modular smart home engineered for plots, farmhouses, hills, and rooftops. Built with high-density polyurethane thermal panels and Ri8Click UPVC double-glazed windows. Assembled on-site in under 15 days.',
    category: 'modular',
    type: 'Capsule Smart House',
    purpose: 'for_sale',
    price: 14800000,
    priceFormatted: 'PKR 1.48 Crore',
    currency: 'PKR',
    location: {
      province: 'Punjab',
      city: 'Taxila',
      society: 'Margalla View Society',
      address: 'Margalla View Enclave, Taxila / Islamabad'
    },
    area: 950,
    areaUnit: 'Sq Ft',
    bedrooms: 2,
    bathrooms: 2,
    features: [
      '2 Full Bedrooms + Living Lounge + Designer Kitchen',
      '40% More Energy Efficient than Brick & Mortar',
      'Earthquake Resistant Steel Modular Chassis',
      'Complete Smart Lighting & Security Package',
      'Custom Exterior Cladding Options Available'
    ],
    images: [
      'https://www.genspark.ai/api/files/s/K4lfut6W',
      'https://www.genspark.ai/api/files/s/3jIuxLrV',
      'https://www.genspark.ai/api/files/s/pSySUzgg',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    watermark: true,
    agencyId: 'agency-1',
    agentName: 'Malik Zeeshan (Modular Specialist)',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.malikZeeshan_Taxila,
    agentCompany: 'Ri8Click Prefab & Modular Consortium',
    agentRating: 5.0,
    isFeatured: true,
    viewsCount: 2790,
    savesCount: 215,
    createdAt: '2026-08-25',
    status: 'active'
  },

  // ===================== 5. NEW SOCIETY PROJECTS =====================
  {
    id: 'prop-proj-1',
    title: 'Faisal Hills Commercial Broadway Heights',
    tagline: 'Book Shops & Luxury Apartments on 3-Year Easy Installments',
    description: 'Pre-launch booking open in Faisal Hills Commercial Broadway Heights, Taxila. Offering ground floor brand shops, corporate offices, and 1 & 2-bed luxury serviced apartments with 25% down payment.',
    category: 'projects',
    type: 'Commercial Plaza',
    purpose: 'for_sale',
    price: 4500000,
    priceFormatted: 'From PKR 45 Lakh',
    currency: 'PKR',
    location: {
      province: 'Punjab',
      city: 'Taxila',
      society: 'Faisal Hills',
      block: 'Commercial Broadway',
      address: 'Plot #105, Main Broadway, Faisal Hills, Taxila'
    },
    area: 350,
    areaUnit: 'Sq Ft',
    floors: 8,
    features: [
      '25% Down Payment - 36 Monthly Installments',
      'Guaranteed Rental Pool Management',
      'Rooftop Restaurant & Infinity View Deck',
      'Constructed by Ri8Click Consortium Group'
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
    ],
    watermark: true,
    agencyId: 'agency-2',
    agentName: 'Chaudhry Bilal',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.chaudhryBilal_FaisalHills,
    agentCompany: 'Faisal Hills Property Advisors',
    agentRating: 4.85,
    isFeatured: true,
    viewsCount: 1580,
    savesCount: 112,
    createdAt: '2026-08-27',
    status: 'active'
  }
];

export const CONSORTIUM_DIVISIONS: ConsortiumDivision[] = [
  {
    id: 'div-realestate',
    title: 'Ri8Click Real Estate & Multi-Agent Network',
    shortName: 'Real Estate Portal',
    tagline: 'Pakistan’s verified property marketplace & investment advisory.',
    description: 'Connecting buyers, overseas investors, and verified real estate agencies across Taxila, Faisal Hills, Islamabad, Rawalpindi, and Lahore with 100% watermarked authentic property listings.',
    badge: 'Core Platform (95% Focus)',
    iconName: 'Building2',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    capabilities: [
      'Verified Commercial & Residential Listings',
      'Faisal Hills & Taxila Specialist Advisory',
      'Multi-Agent Brokerage Portal & Quota Management',
      'Interactive 3D Virtual Tours & NOC Verification'
    ],
    stats: [
      { label: 'Verified Listings', value: '4,500+' },
      { label: 'Partner Agencies', value: '120+' },
      { label: 'Transaction Volume', value: 'PKR 15B+' }
    ],
    contactPerson: 'Malik Zeeshan',
    contactPhone: '+92 336-5666727',
    contactWhatsApp: '923365666727'
  },
  {
    id: 'div-modular',
    title: 'Ri8Click Readymade Capsule & Modular Smart Homes',
    shortName: 'Capsule & Modular Homes',
    tagline: 'Aerospace-grade space capsule pods & curved container smart villas.',
    description: 'Pioneering prefabricated luxury living in Pakistan. Our readymade space capsule houses and curved panoramic container homes are factory-built with full IoT automation and deployed on your land within 7 to 30 days.',
    badge: 'Flagship Innovation',
    iconName: 'Box',
    image: 'https://www.genspark.ai/api/files/s/I6HwjuLB',
    capabilities: [
      'Space Capsule Smart Pods (270° Panoramic Glass)',
      'Curved-Corner Container Villas & Farmhouses',
      'Rooftop Executive Pods & Hill Resort Cabins',
      '100% Relocatable with Solar Off-Grid Options'
    ],
    stats: [
      { label: 'Deployment Time', value: '7-30 Days' },
      { label: 'Lifespan', value: '50+ Years' },
      { label: 'Seismic Rating', value: 'Grade 9' }
    ],
    contactPerson: 'Modular Division Lead',
    contactPhone: '+92 336-5666727',
    contactWhatsApp: '923365666727'
  },
  {
    id: 'div-construction',
    title: 'Ri8Click Turnkey Construction & Civil Works',
    shortName: 'Turnkey Construction',
    tagline: 'A-Grade commercial plazas, luxury residences, and infrastructure.',
    description: 'Delivering end-to-end grey structure and turnkey luxury finishing for commercial complexes, corporate towers, and residential villas in Taxila, Faisal Hills, and Islamabad with strict international structural codes.',
    badge: 'Consortium Company',
    iconName: 'HardHat',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    capabilities: [
      'Turnkey Commercial & Residential Contracting',
      'Grey Structure & Structural RCC Engineering',
      'Architectural 3D CAD & BIM Modeling',
      'Soil Testing & Earthquake Resistant Design',
      'Fixed Price & Milestone-Based Delivery'
    ],
    stats: [
      { label: 'Projects Completed', value: '85+' },
      { label: 'Sq Ft Constructed', value: '1.2M+' },
      { label: 'On-Time Delivery', value: '98.8%' }
    ],
    contactPerson: 'Chief Engineer Construction',
    contactPhone: '+92 336-5666727',
    contactWhatsApp: '923365666727'
  },
  {
    id: 'div-upvc',
    title: 'Ri8Click UPVC & Architectural Products',
    shortName: 'UPVC Windows & Structural Systems',
    tagline: 'High-performance thermal double-glazed UPVC window & door engineering.',
    description: 'Manufacturing German-standard UPVC window profiles, acoustic double/triple glazed glass, sliding patio doors, and energy-efficient building envelope systems designed for severe weather durability.',
    badge: 'Manufacturing Unit',
    iconName: 'Layers',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    capabilities: [
      'Acoustic & Thermal Double Glazed UPVC',
      'Multi-Point Locking Security Hardware',
      'UV-Resistant High Impact Profiles',
      'Custom Sliding, Casement & Tilt-Turn Windows',
      '10-Year Factory Color & Seal Warranty'
    ],
    stats: [
      { label: 'Units Manufactured', value: '50,000+' },
      { label: 'Energy Savings', value: 'Up to 40%' },
      { label: 'Warranty Years', value: '10 Years' }
    ],
    contactPerson: 'Head of UPVC Manufacturing',
    contactPhone: '+92 336-5666727',
    contactWhatsApp: '923365666727'
  },
  {
    id: 'div-tech',
    title: 'Ri8Click Technology Services & AI Solutions',
    shortName: 'PropTech & AI Solutions',
    tagline: 'Next-generation PropTech ERP, multi-agent management, and AI matching.',
    description: 'Pioneering intelligent software systems for modern real estate brokerages, including real-time listing feeds, multi-agent quota controls, digital lead routing, 3D digital twins, and conversational AI chatbots.',
    badge: 'Technology Branch',
    iconName: 'Cpu',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    capabilities: [
      'Multi-Agent Quota & Limits Engine',
      'Gemini-Powered Property Matching AI',
      'Automated Watermark Stamping Pipeline',
      'Real Estate Brokerage Cloud ERP',
      'WhatsApp Multi-Agent Lead Router'
    ],
    stats: [
      { label: 'Platform Uptime', value: '99.98%' },
      { label: 'AI Queries Handled', value: '250K+' },
      { label: 'Agency Integrations', value: '100+' }
    ],
    contactPerson: 'Chief Technology Officer',
    contactPhone: '+92 336-5666727',
    contactWhatsApp: '923365666727'
  }
];

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    categoryTag: 'Faisal Hills Executive Luxury',
    badgeColor: 'bg-blue-600 text-white',
    title: 'Modern 1-Kanal Designer Villa in Faisal Hills',
    subtitle: 'Executive Margalla View Living with Ri8Click UPVC & Smart Automation',
    description: 'Experience bespoke luxury in Faisal Hills Executive Block (Taxila / Margalla Ridge). Features 5 master bedrooms, German UPVC acoustic double-glazing by Ri8Click, Italian show kitchen, 10kW solar system, and rooftop Margalla view terrace.',
    price: 'PKR 6.85 Crore',
    location: 'Taxila / Rawalpindi',
    society: 'Faisal Hills (Executive Block)',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
    tourRoomsCount: 4,
    isActive: true,
    order: 1,
    features: ['5 En-suite Bedrooms', 'Ri8Click UPVC Windows', '10kW Solar Backup', 'Margalla View Terrace'],
    samplePropertyData: {
      title: 'Modern Architectural Villa in Faisal Hills',
      category: 'residential',
      location: { city: 'Taxila', society: 'Faisal Hills', province: 'Punjab' }
    }
  },
  {
    id: 'slide-2',
    categoryTag: 'Islamabad Prime Commercial',
    badgeColor: 'bg-emerald-600 text-white',
    title: 'Blue Area Corporate Financial Tower - Islamabad',
    subtitle: 'High-Visibility Glass Facade Tower on Jinnah Avenue Skyline',
    description: 'Premier institutional commercial property in Islamabad Blue Area near Centaurus. 8 floors of open-plan corporate suites, high-speed capsule elevators, 3-level basement parking, and double-glazed acoustic UPVC facade.',
    price: 'PKR 24.5 Crore',
    location: 'Islamabad',
    society: 'Blue Area Corporate Zone',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85',
    tourRoomsCount: 4,
    isActive: true,
    order: 2,
    features: ['8 Floor Approved Tower', 'High Speed Lifts', 'Centaurus Skyline View', '10.5% Annual ROI'],
    samplePropertyData: {
      title: 'Blue Area Corporate Financial Tower',
      category: 'commercial',
      location: { city: 'Islamabad', society: 'Blue Area Corporate Zone', province: 'Islamabad Capital Territory' }
    }
  },
  {
    id: 'slide-3',
    categoryTag: 'Turnkey Modular Innovation',
    badgeColor: 'bg-indigo-600 text-white',
    title: 'Ri8Click Curved Space Capsule & Container Home',
    subtitle: 'Curved Panoramic Glass Capsule Living Deployed in 7 Days',
    description: 'Factory-engineered with aerodynamic curved aluminum alloy shell, 270° panoramic curved stargazing skylight, IoT voice automation, and military-grade thermal insulation. 100% turnkey relocatable for farmhouses, plots, and tourist resorts.',
    price: 'PKR 85 Lakh',
    location: 'Taxila & Nationwide Deployment',
    society: 'Ri8Click Modular Experience Yard',
    imageUrl: 'https://www.genspark.ai/api/files/s/I6HwjuLB',
    tourRoomsCount: 3,
    isActive: true,
    order: 3,
    features: ['Aerospace Curved Shell', '270° Curved Glass Balcony', 'IoT Voice Controls', 'Deployed in 7 Days'],
    samplePropertyData: {
      title: 'Ri8Click Space Capsule Smart Pod (Model X-100)',
      category: 'modular',
      location: { city: 'Taxila', society: 'Faisal Hills', province: 'Punjab' }
    }
  },
  {
    id: 'slide-4',
    categoryTag: 'Lahore DHA Phase 6 Landmark',
    badgeColor: 'bg-purple-600 text-white',
    title: 'DHA Phase 6 Main Boulevard Commercial Plaza',
    subtitle: 'High Footfall Retail & Corporate Plaza in Lahore',
    description: 'Prestigious commercial plaza directly on DHA Lahore Phase 6 Main Boulevard. 4 commercial floors, basement parking, modern glass & aluminum elevation, leased to multinational brands.',
    price: 'PKR 18.0 Crore',
    location: 'Lahore',
    society: 'DHA Phase 6 Lahore',
    imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=2000&q=85',
    tourRoomsCount: 4,
    isActive: true,
    order: 4,
    features: ['Main Boulevard Front', 'Multinational Tenants', 'Capsule Elevator', 'LDA / DHA Approved'],
    samplePropertyData: {
      title: 'DHA Phase 6 Main Boulevard Commercial Plaza',
      category: 'commercial',
      location: { city: 'Lahore', society: 'DHA Phase 1-9 & Prism 9', province: 'Punjab' }
    }
  },
  {
    id: 'slide-5',
    categoryTag: 'Islamabad B-17 Multi Gardens',
    badgeColor: 'bg-amber-600 text-white',
    title: 'Margalla View Luxury Residence in Multi Gardens B-17',
    subtitle: 'Direct M-1 Motorway & GT Road Access with CDANOC',
    description: 'Contemporary 1-Kanal smart residence in MPCHS Multi Gardens B-17 Islamabad. Surrounded by scenic Margalla foothills, dedicated botanical gardens, underground utilities, and Ri8Click smart home security.',
    price: 'PKR 5.25 Crore',
    location: 'Islamabad',
    society: 'Multi Gardens (B-17)',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    tourRoomsCount: 4,
    isActive: true,
    order: 5,
    features: ['MPCHS Approved Sector', 'Smart Biometric Lock', 'Italian Designer Kitchen', 'Dedicated M-1 Interchange'],
    samplePropertyData: {
      title: 'Margalla View Luxury Residence in B-17',
      category: 'residential',
      location: { city: 'Islamabad', society: 'Multi Gardens (B-17)', province: 'Islamabad Capital Territory' }
    }
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Faisal Hills Taxila 2026 Price Trends & Executive Block Development Update',
    slug: 'faisal-hills-taxila-2026-price-trends-executive-block-development',
    category: 'Market Trends',
    excerpt: 'Complete analysis of residential and commercial plot appreciation in Faisal Hills Executive Block, Block A, B, C, and Commercial Broadway along GT Road N-5.',
    content: `### Why Faisal Hills Taxila Leads Rawalpindi-Islamabad Corridor Growth

Faisal Hills has transformed the Taxila and GT Road real estate landscape, offering CDA-standard infrastructure at highly competitive valuations. Backed by Zedem International, the society enjoys direct access from Main GT Road (N-5) and seamless connectivity to Islamabad Sector B-17 and the M-1 Motorway.

#### Key Investment Highlights for 2026:
1. **Executive Block Rapid Possession**: Over 650+ luxury villas are either completed or under active construction, driving strong end-user demand.
2. **Commercial Broadway Boom**: High-rise commercial plots on the 225-ft wide boulevard have recorded 28% capital appreciation over the past 14 months.
3. **Margalla Highway Connectivity**: The upcoming connector link to Margalla Avenue reduces travel time to Islamabad F-10/F-11 to under 18 minutes.

#### Current Market Price Brackets:
- **5 Marla Residential**: PKR 42 Lakh – PKR 68 Lakh (Block C to Executive Block)
- **10 Marla Residential**: PKR 78 Lakh – PKR 1.25 Crore
- **1 Kanal Residential**: PKR 1.45 Crore – PKR 2.35 Crore`,
    coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85',
    authorName: 'Malik Zeeshan',
    authorAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.malikZeeshan_Taxila,
    authorRole: 'Senior Faisal Hills Investment Advisor',
    publishedAt: '2026-08-28',
    readingTime: '5 min read',
    tags: ['Faisal Hills', 'Taxila Real Estate', 'Executive Block', 'Property Rates 2026', 'GT Road'],
    viewsCount: 3420,
    isFeatured: true,
    status: 'published'
  },
  {
    id: 'blog-2',
    title: 'DHA Lahore vs. DHA Islamabad: Where Should Overseas Pakistanis Invest?',
    slug: 'dha-lahore-vs-dha-islamabad-overseas-investment-comparison',
    category: 'Investment Guides',
    excerpt: 'Comparing rental yields, commercial plaza ROI, and 3-to-5 year capital appreciation between DHA Lahore Phase 6/Prism 9 and DHA Islamabad Phase 2 & 5.',
    content: `### Strategic Portfolio Allocation for Overseas Investors

Overseas Pakistanis remain the backbone of high-value real estate transactions in Pakistan. Choosing between **DHA Lahore** and **DHA Islamabad-Rawalpindi** depends on whether your primary goal is immediate rental cashflow or medium-term land appreciation.

#### 1. Commercial Plazas & Rental Yield
- **DHA Lahore Phase 6 & 8**: Offers mature commercial boulevards with multinational retail tenants generating **7.5% to 9.2% annual rental yield** plus annual 10% rent escalation.
- **DHA Islamabad Phase 2 (Main GT Road)**: Situated between Giga Mall and Rawalpindi/Islamabad arteries, commercial offices and luxury serviced apartments command exceptional occupancy.

#### 2. Residential Plot Growth
- **DHA Phase 9 Prism (Lahore)** and **DHA Phase 5 (Islamabad)** provide the strongest 3-year capital gain potential as possession opens across new sectors.`,
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    authorName: 'Engr. Haris Farooq',
    authorAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.engrHarisFarooq_Islamabad,
    authorRole: 'Commercial Portfolio Director',
    publishedAt: '2026-08-24',
    readingTime: '6 min read',
    tags: ['DHA Lahore', 'DHA Islamabad', 'Overseas Pakistanis', 'Rental Yield', 'Commercial Plazas'],
    viewsCount: 2890,
    isFeatured: true,
    status: 'published'
  },
  {
    id: 'blog-3',
    title: 'Multi Gardens B-17 (MPCHS) Sector G & C-18 Interchange Connectivity',
    slug: 'multi-gardens-b17-mpchs-motorway-interchange-update',
    category: 'Project Updates',
    excerpt: 'How the dedicated M-1 Motorway interchange and Margalla Avenue extension are reshaping property values in MPCHS Multi Gardens B-17 Islamabad.',
    content: `### Multi Gardens B-17: The Gateway to Islamabad

Managed by MPCHS, Multi Gardens B-17 bridges Taxila GT Road with the M-1 Motorway, offering scenic views of the Margalla Hills and peaceful family living in Islamabad.

#### Sector G Highlights
- Located directly at the entrance from the Motorway connector.
- Modern sewerage, wide 80ft to 120ft boulevards, and dedicated commercial centers.
- Fast construction of schools, hospitals, and hypermarkets.

#### Construction Quality Standards
Modern home builders in B-17 are increasingly adopting soundproof acoustic UPVC double glazing to eliminate highway noise while providing thermal efficiency during Islamabad’s extreme summer heat.`,
    coverImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85',
    authorName: 'Chaudhry Bilal',
    authorAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.chaudhryBilal_FaisalHills,
    authorRole: 'Regional Property Specialist',
    publishedAt: '2026-08-20',
    readingTime: '4 min read',
    tags: ['Multi Gardens B-17', 'MPCHS', 'Islamabad Real Estate', 'Sector G', 'Margalla Avenue'],
    viewsCount: 2150,
    isFeatured: false,
    status: 'published'
  },
  {
    id: 'blog-4',
    title: 'The Rise of Curved Container Capsule Smart Houses in Pakistan: Costs, Approvals & Turnkey Setup',
    slug: 'curved-container-capsule-smart-houses-pakistan-costs-setup',
    category: 'Modular Housing',
    excerpt: 'Everything you need to know about purchasing and deploying aerospace-grade curved glass capsule pods and modular container villas in Pakistan.',
    content: `### Revolutionizing Residential & Glamping Architecture

Prefabricated modular living has arrived in Pakistan. Pioneered by Ri8Click Modular Housing, space capsule homes and curved container pods offer a high-tech alternative to traditional 12-month brick-and-mortar construction.

#### Key Advantages of Ri8Click Smart Capsules:
1. **7-Day Deployment**: Ready-to-live units built in factory conditions and crane-mounted on your plot or farmhouse.
2. **Aerospace Curved Alloy Body**: 270-degree wraparound curved panoramic glass, stargazing skylight, and thermal insulation from -20°C to +55°C.
3. **Turnkey Luxury**: Equipped with complete IoT voice automation, designer wet/dry bathroom, climate control, and king-size bedroom suite.

#### Best Use Cases:
- Private farmhouses in Chak Shahzad, Taxila, and Bedian Road Lahore.
- Tourism & glamping resorts in Murree, Hunza, Skardu, and Khanpur Dam.
- Rooftop penthouse suites and guest annexes.`,
    coverImage: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85',
    authorName: 'Engr. Haris Farooq',
    authorAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.engrHarisFarooq_Islamabad,
    authorRole: 'Prefab & Modular Systems Lead',
    publishedAt: '2026-08-15',
    readingTime: '5 min read',
    tags: ['Modular Houses', 'Space Capsule', 'Curved Containers', 'Glamping Pods', 'Taxila'],
    viewsCount: 4120,
    isFeatured: true,
    status: 'published'
  },
  {
    id: 'blog-5',
    title: 'Faisal Town Phase 2 vs. Faisal Town (F-18): Long-Term Capital Appreciation Guide',
    slug: 'faisal-town-phase-2-vs-faisal-town-f18-investment-guide',
    category: 'Investment Guides',
    excerpt: 'Detailed comparison of Zedem International projects: Faisal Town F-18 on G.T. Road versus the upcoming mega development of Faisal Town Phase 2 near Thalian Interchange.',
    content: `### Evaluating Zedem International’s Flagship Projects

Chaudhry Abdul Majeed and Zedem International have maintained an exceptional reputation for timely delivery and high investor returns. Let's compare Faisal Town F-18 and Faisal Town Phase 2.

#### Faisal Town F-18: Fully Developed & Inhabited
- **Current Status**: 100% developed with thousands of families residing.
- **Commercial Hotspots**: High rental returns on plaza offices and shopping outlets.
- **Ideal For**: Immediate house construction and steady rental income.

#### Faisal Town Phase 2: High Growth Frontier
- **Location**: Adjacent to M-2 Motorway near Thalian Interchange and Chakri Road connector.
- **Scale**: Massive master project spanning tens of thousands of Kanals.
- **Ideal For**: Long-term capital multiplication over 3 to 7 years with affordable installment structures.`,
    coverImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85',
    authorName: 'Malik Zeeshan',
    authorAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.malikZeeshan_Taxila,
    authorRole: 'Senior Property Analyst',
    publishedAt: '2026-08-10',
    readingTime: '4 min read',
    tags: ['Faisal Town', 'F-18', 'Faisal Town Phase 2', 'Zedem International', 'Islamabad'],
    viewsCount: 1980,
    isFeatured: false,
    status: 'published'
  }
];

export const INITIAL_SITE_PORTIONS: SiteSectionPortion[] = [
  {
    id: 'portion-top-bar',
    key: 'top_announcement_bar',
    name: 'Top Verification & Announcement Bar',
    title: 'Official ri8click Portal Notice',
    subtitle: 'Verified Brokerage • Official Consortium Network',
    isEnabled: true,
    order: 1,
    description: 'Header notification bar with live phone, WhatsApp, and watermark status.'
  },
  {
    id: 'portion-hero-slider',
    key: 'hero_slider',
    name: 'Top "Scrollytelling" Full-Screen Banner',
    title: 'Immersive Scrollytelling Property Showcase',
    subtitle: 'High-Impact Verified Hero Slider with 3D Walkthrough Integrations',
    isEnabled: true,
    order: 2,
    badge: 'Core Feature',
    description: 'Full-screen cinematic slides highlighting top commercial, villa, and capsule homes.'
  },
  {
    id: 'portion-search-bar',
    key: 'search_bar',
    name: 'Multi-Filter Search Bar',
    title: 'Precision Property Search Engine',
    subtitle: 'Filter by Province, City (Taxila, Islamabad, Lahore), Society, Type, Price, Beds',
    isEnabled: true,
    order: 3,
    description: 'Elevated multi-parameter search console with real-time result counting.'
  },
  {
    id: 'portion-properties-grid',
    key: 'properties_grid',
    name: 'Main Verified Properties Grid',
    title: 'Featured Verified Portfolios (95% Core Focus)',
    subtitle: '100% Watermarked listings with agent direct WhatsApp and live view counters.',
    isEnabled: true,
    order: 4,
    badge: '95% Primary Space',
    description: 'Primary residential and commercial listings catalog.'
  },
  {
    id: 'portion-commercial-showcase',
    key: 'commercial_showcase',
    name: 'Commercial Plazas & Corporate Hub',
    title: 'Commercial Plazas, High-Rise Towers & Retail Shops',
    subtitle: 'Institutional investment opportunities in Taxila, Faisal Hills, and Islamabad.',
    isEnabled: true,
    order: 5,
    description: 'Dedicated commercial portfolio section with ROI yields.'
  },
  {
    id: 'portion-modular-showcase',
    key: 'modular_showcase',
    name: 'Readymade Capsule & Modular Smart Houses',
    title: 'Curved Container Pods & Aerospace Space Capsules',
    subtitle: 'Turnkey prefab smart homes deployed in 7 to 30 days across Pakistan.',
    isEnabled: true,
    order: 6,
    badge: 'PropTech Innovation',
    description: 'Dedicated prefab capsule smart homes showcase.'
  },
  {
    id: 'portion-news-blogs',
    key: 'news_blogs_section',
    name: 'Real Estate News, Market Trends & Blogs',
    title: 'Latest Real Estate Insights & Project News',
    subtitle: 'Faisal Hills, DHA, Multi Gardens B-17, and Pakistan property analysis.',
    isEnabled: true,
    order: 7,
    description: 'Editorial insights, NOC updates, and investment advisory articles.'
  },
  {
    id: 'portion-agencies-network',
    key: 'agencies_network',
    name: 'Multi-Agent & Certified Brokerage Network',
    title: 'Certified Real Estate Agencies & Partners',
    subtitle: 'Browse listings by certified brokerages with quota tracking.',
    isEnabled: true,
    order: 8,
    description: 'Directory of registered brokerages and realtors.'
  },
  {
    id: 'portion-consortium-showcase',
    key: 'consortium_showcase',
    name: 'Consortium Corporate Group Showcase',
    title: 'Ri8Click Real Estate Consortium Group',
    subtitle: 'Turnkey Construction, UPVC Manufacturing, Modular Living & PropTech.',
    isEnabled: true,
    order: 9,
    description: 'Professional group divisions backing all developments.'
  },
  {
    id: 'portion-cta-banner',
    key: 'cta_banner',
    name: 'Custom Order & Direct WhatsApp CTA',
    title: 'Have Land in Taxila, Islamabad, or Lahore?',
    subtitle: 'Connect directly with our senior property advisors on WhatsApp.',
    isEnabled: true,
    order: 10,
    description: 'High-converting call to action block.'
  }
];

export const initialProperties = INITIAL_PROPERTIES;
export const initialAgencies = INITIAL_AGENCIES;
export const initialProvinceCityData = INITIAL_PROVINCE_CITIES;
export const initialConsortiumDivisions = CONSORTIUM_DIVISIONS;
export const initialHeroSlides = INITIAL_HERO_SLIDES;
export const initialBlogPosts = INITIAL_BLOGS;
export const initialSitePortions = INITIAL_SITE_PORTIONS;

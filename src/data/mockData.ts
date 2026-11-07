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
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85'
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
    status: 'active',
    virtualTourVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    virtualTourVideoTitle: 'Space Capsule Smart Pod (Model X-100) Walkthrough'
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
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85'
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
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=85'
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
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=85',
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
    description: 'Powering digital transformation in real estate with automated property watermarking, 360° virtual tour rendering, CRM lead routing, and AI-driven property valuation across Pakistan.',
    badge: 'Digital & AI Wing',
    iconName: 'Cpu',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    capabilities: [
      'AI Property Valuation & Investment Analytics',
      '3D Virtual Walkthrough & Drone Mapping',
      'Agency Quota & Lead Automation CRM',
      'Custom Real Estate Web & Mobile Platforms'
    ],
    stats: [
      { label: 'Platform Uptime', value: '99.98%' },
      { label: 'AI Queries Handled', value: '250K+' },
      { label: 'Digital Tours', value: '1,800+' }
    ],
    contactPerson: 'CTO Digital Wing',
    contactPhone: '+92 336-5666727',
    contactWhatsApp: '923365666727'
  }
];

/**
 * UNIFIED HERO BANNER & CRYSTAL PORTFOLIO DECK SLIDES
 * Every slide in the Portfolio Deck is now stored here so Super Admin can
 * delete, hide, edit, or reorder ANY item (including "Model Q3 Forest Cabin Pod").
 */
export const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'capsule-seq-8-q3',
    categoryTag: 'Contemporary Modular Capsule',
    badgeColor: 'bg-indigo-600 text-white',
    title: 'Model Q3 Forest Cabin Pod — Panoramic Glass & Warm Timber Cladding',
    subtitle: 'Compact Luxury Capsule Pod • 28–38 Sq.M • Curved Corner Glazing',
    description: 'Contemporary curved-edge container cabin with floor-to-ceiling insulated UPVC glass, warm timber soffits, and ambient exterior LED perimeter lighting. Ready for hill resorts, farmhouses, and rooftop suites.',
    price: 'PKR 48 Lakh – 68 Lakh',
    location: 'Taxila / Murree / Nathia Gali / Islamabad',
    society: 'Faisal Hills & Resort Estates',
    imageUrl: 'https://www.genspark.ai/api/files/s/pSySUzgg',
    galleryImages: [
      'https://www.genspark.ai/api/files/s/pSySUzgg',
      'https://www.genspark.ai/api/files/s/OypEiCb2',
      'https://www.genspark.ai/api/files/s/I6HwjuLB'
    ],
    tourRoomsCount: 4,
    isActive: true,
    order: 1,
    features: [
      'Curved-Corner Low-E Tempered Glass',
      'Ri8click UPVC Thermal Seal (-20°C to +55°C)',
      'Crane-Installed in 4 Hours',
      'Smart Voice & App Climate Control'
    ],
    samplePropertyData: {
      title: 'Model Q3 Forest Cabin Pod',
      category: 'modular',
      location: {
        city: 'Taxila',
        society: 'Faisal Hills & Resort Estates',
        province: 'Punjab'
      }
    }
  },
  {
    id: 'capsule-seq-9-k5',
    categoryTag: 'Contemporary Modular Capsule',
    badgeColor: 'bg-indigo-600 text-white',
    title: 'Model K5 L-Shaped Loft Container Villa & Open Viewing Deck',
    subtitle: 'Multi-Module Architectural Container Villa • 56–75 Sq.M',
    description: 'Architectural L-shaped modular container villa featuring a cantilevered upper studio, open-air composite timber terrace, and full-height Ri8click UPVC sliding glass walls.',
    price: 'PKR 82 Lakh – 1.25 Crore',
    location: 'Faisal Hills / B-17 / Gulberg Greens',
    society: 'Faisal Hills Executive Block',
    imageUrl: 'https://www.genspark.ai/api/files/s/OypEiCb2',
    galleryImages: [
      'https://www.genspark.ai/api/files/s/OypEiCb2',
      'https://www.genspark.ai/api/files/s/pSySUzgg',
      'https://www.genspark.ai/api/files/s/gbfFKIcB'
    ],
    tourRoomsCount: 5,
    isActive: true,
    order: 2,
    features: [
      '2 En-Suite Bedrooms + Double Lounge',
      'Integrated Rooftop & Ground Composite Deck',
      'Seismic Grade-9 Galvanized Steel Chassis',
      'Ri8click Acoustic UPVC Sliding Glass Walls'
    ],
    samplePropertyData: {
      title: 'Model K5 L-Shaped Loft Container Villa',
      category: 'modular',
      location: {
        city: 'Taxila',
        society: 'Faisal Hills Executive Block',
        province: 'Punjab'
      }
    }
  },
  {
    id: 'capsule-seq-10-rooftop',
    categoryTag: 'Contemporary Modular Capsule',
    badgeColor: 'bg-indigo-600 text-white',
    title: 'Sky-Deck Container Villa with Glass-Railed Rooftop Lounge',
    subtitle: 'Single-Module Container Home + Full Rooftop Observation Terrace',
    description: 'Engineered with an external spiral staircase leading to a tempered-glass rooftop observation deck, warm wood-slat facade, and panoramic UPVC sliding doors.',
    price: 'PKR 55 Lakh – 78 Lakh',
    location: 'Islamabad / Khanpur Dam / Swat / Hunza',
    society: 'Margalla Foothills & Resort Enclaves',
    imageUrl: 'https://www.genspark.ai/api/files/s/I6HwjuLB',
    galleryImages: [
      'https://www.genspark.ai/api/files/s/I6HwjuLB',
      'https://www.genspark.ai/api/files/s/gbfFKIcB',
      'https://www.genspark.ai/api/files/s/pSySUzgg'
    ],
    tourRoomsCount: 4,
    isActive: true,
    order: 3,
    features: [
      'Full-Length Rooftop Stargazing & BBQ Deck',
      'German UPVC Multi-Point Locking Patio Doors',
      '10kW Hybrid Solar Ready Roof Mounts',
      'Turnkey Factory Finished Bathroom & Kitchen'
    ],
    samplePropertyData: {
      title: 'Sky-Deck Container Villa with Glass-Railed Rooftop Lounge',
      category: 'modular',
      location: {
        city: 'Islamabad',
        society: 'Margalla Foothills & Resort Enclaves',
        province: 'Islamabad Capital Territory'
      }
    }
  },
  {
    id: 'capsule-seq-11-hex-black',
    categoryTag: 'Contemporary Modular Capsule',
    badgeColor: 'bg-indigo-600 text-white',
    title: 'Hex-Lit Matte-Black Executive Container Pod & Timber Pergola',
    subtitle: 'Cyber-Modern Architectural Studio • Geometric Hex Ceiling Lighting',
    description: 'Matte-charcoal architectural container pod featuring hexagonal ceiling light matrices, slatted cedar sun-pergola, and wrap-around frameless glass corners for executive offices or luxury guest suites.',
    price: 'PKR 64 Lakh – 88 Lakh',
    location: 'Islamabad / DHA / Bahria Town',
    society: 'Executive Farmhouse & Commercial Hub',
    imageUrl: 'https://www.genspark.ai/api/files/s/gbfFKIcB',
    galleryImages: [
      'https://www.genspark.ai/api/files/s/gbfFKIcB',
      'https://www.genspark.ai/api/files/s/W2Z5zFao',
      'https://www.genspark.ai/api/files/s/OypEiCb2'
    ],
    tourRoomsCount: 4,
    isActive: true,
    order: 4,
    features: [
      'Hexagonal Matrix Smart Dimmable LED Ceiling',
      'Slatted Cedar Pergola & Composite Patio',
      'Acoustic 42dB Noise-Reduction UPVC Glazing',
      'Plug-and-Play Corporate Office or Resort Suite'
    ],
    samplePropertyData: {
      title: 'Hex-Lit Matte-Black Executive Container Pod',
      category: 'modular',
      location: {
        city: 'Islamabad',
        society: 'Executive Farmhouse & Commercial Hub',
        province: 'Islamabad Capital Territory'
      }
    }
  },
  {
    id: 'capsule-seq-12-curved-studio',
    categoryTag: 'Contemporary Modular Capsule',
    badgeColor: 'bg-indigo-600 text-white',
    title: 'Curved-Corner Glass Studio Pod — Minimalist White & Wood Edition',
    subtitle: '270° Rounded Glass Facade • Integrated Recessed Deck',
    description: 'Sleek white fluorocarbon aluminum shell paired with warm walnut cladding and 270-degree curved tempered glass, creating an effortless indoor-outdoor resort sanctuary.',
    price: 'PKR 46 Lakh – 65 Lakh',
    location: 'Taxila / Faisal Hills / Abbottabad',
    society: 'Faisal Hills & Hill Station Enclaves',
    imageUrl: 'https://www.genspark.ai/api/files/s/W2Z5zFao',
    galleryImages: [
      'https://www.genspark.ai/api/files/s/W2Z5zFao',
      'https://www.genspark.ai/api/files/s/pSySUzgg',
      'https://www.genspark.ai/api/files/s/bf0ebbb238de4f18ac5521303f36222c'
    ],
    tourRoomsCount: 3,
    isActive: true,
    order: 5,
    features: [
      '270° Curved Tempered Panoramic Glazing',
      'Zero On-Site Masonry — Delivered Complete',
      'Smart Keyless Biometric Entry & Motorized Blinds',
      'High-Density Polyurethane Thermal Core'
    ],
    samplePropertyData: {
      title: 'Curved-Corner Glass Studio Pod',
      category: 'modular',
      location: {
        city: 'Taxila',
        society: 'Faisal Hills & Hill Station Enclaves',
        province: 'Punjab'
      }
    }
  },
  {
    id: 'capsule-seq-13-v2124-duplex',
    categoryTag: 'Contemporary Modular Capsule',
    badgeColor: 'bg-indigo-600 text-white',
    title: 'Model V2124 Double-Decker Stacked Space Capsule Villa',
    subtitle: 'Two-Story Futuristic Capsule Residence • Upper Cantilevered Pod',
    description: 'Flagship double-decker stacked space capsule villa combining two aerodynamic aerospace aluminum pods with an upper-level sky balcony, curved panoramic observation lounges, and smart home automation.',
    price: 'PKR 1.35 Crore – 1.85 Crore',
    location: 'Islamabad / Lahore / Karachi / Bhurban',
    society: 'Premier Farmhouse & Resort Estates',
    imageUrl: 'https://www.genspark.ai/api/files/s/bf0ebbb238de4f18ac5521303f36222c',
    galleryImages: [
      'https://www.genspark.ai/api/files/s/bf0ebbb238de4f18ac5521303f36222c',
      'https://www.genspark.ai/api/files/s/7bb35bc10e1549908eb921611bd92685',
      'https://www.genspark.ai/api/files/s/OypEiCb2'
    ],
    tourRoomsCount: 6,
    isActive: true,
    order: 6,
    features: [
      'Double-Story Stacked Aerospace Capsule Architecture',
      '3 Bedrooms + Dual Panoramic Observation Lounges',
      'Central Smart Touch-Panel & Voice Automation',
      '50-Year Fluorocarbon Anti-Corrosion Shell'
    ],
    samplePropertyData: {
      title: 'Model V2124 Double-Decker Stacked Space Capsule Villa',
      category: 'modular',
      location: {
        city: 'Islamabad',
        society: 'Premier Farmhouse & Resort Estates',
        province: 'Islamabad Capital Territory'
      }
    }
  },
  {
    id: 'capsule-seq-14-lakeside',
    categoryTag: 'Contemporary Modular Capsule',
    badgeColor: 'bg-indigo-600 text-white',
    title: 'Lakeside Panorama Capsule — Waterfront & Hillside Edition',
    subtitle: '38 Sq.M Aerodynamic Pod • Stargazing Skylight & Floating Deck',
    description: 'Designed for waterfronts, dams, and scenic ridges across Pakistan. Features an aerodynamic curved shell, stargazing roof skylight, electric floor heating, and 4-hour crane installation.',
    price: 'PKR 68 Lakh – 96 Lakh',
    location: 'Khanpur Dam / Rawal Lake / Attabad Lake',
    society: 'Waterfront & Eco-Resort Zone',
    imageUrl: 'https://www.genspark.ai/api/files/s/7bb35bc10e1549908eb921611bd92685',
    galleryImages: [
      'https://www.genspark.ai/api/files/s/7bb35bc10e1549908eb921611bd92685',
      'https://www.genspark.ai/api/files/s/bf0ebbb238de4f18ac5521303f36222c',
      'https://www.genspark.ai/api/files/s/pSySUzgg'
    ],
    tourRoomsCount: 4,
    isActive: true,
    order: 7,
    features: [
      'Panoramic Stargazing Roof Skylight',
      'Off-Grid Solar & Water Filtration Ready',
      'Five-Star Hotel Grade Smart Wet/Dry Bath',
      '100% Relocatable High-ROI Airbnb Asset'
    ],
    samplePropertyData: {
      title: 'Lakeside Panorama Capsule — Waterfront Edition',
      category: 'modular',
      location: {
        city: 'Islamabad',
        society: 'Waterfront & Eco-Resort Zone',
        province: 'Islamabad Capital Territory'
      }
    }
  },
  {
    id: 'highrise-centaurus-citadel-isb',
    categoryTag: 'Islamabad Highrise Projects',
    badgeColor: 'bg-emerald-600 text-white',
    title: 'The Centaurus & Citadel 7 Corporate Towers — Jinnah Avenue Blue Area',
    subtitle: '656 FT / 42 Floors (#1 Ranked) & 272 FT / 20-Storey Corporate Landmark',
    description: 'Verified Islamabad highrise inventory on Main Jinnah Avenue, Sector F-8 / Blue Area. Offering luxury sky penthouses, corporate office floors, and high-footfall retail showrooms with 9.5%+ annual rental yield.',
    price: 'Shops PKR 1.1–3.0 Cr • Offices 2.0–3.5 Cr • Suites 3.0–6.0 Cr',
    location: 'Main Jinnah Avenue, Sector F-8 / Blue Area, Islamabad',
    society: 'Blue Area Corporate Zone',
    imageUrl: 'https://towers.pk/wp-content/uploads/sites/2/2023/08/the-centaurus-islamabad-380x250.jpg',
    galleryImages: [
      'https://towers.pk/wp-content/uploads/sites/2/2023/08/the-centaurus-islamabad-380x250.jpg',
      'https://towers.pk/wp-content/uploads/sites/2/2023/09/Citadel-7-by-Chakor-Ventures-in-Blue-Area-Islamabad-1-380x250.jpg',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85'
    ],
    tourRoomsCount: 6,
    isActive: true,
    order: 8,
    features: [
      'Towers.pk #1 Ranked Islamabad Skyscraper (656 ft / 42 Floors)',
      'Citadel 7: 272 ft / 20-Storey Corporate & Retail Complex',
      'CDA Approved Freehold Commercial & Luxury Suites',
      'Guaranteed Multinational Tenant Demand & High ROI'
    ],
    samplePropertyData: {
      title: 'The Centaurus & Citadel 7 Corporate Towers',
      category: 'commercial',
      location: {
        city: 'Islamabad',
        society: 'Blue Area Corporate Zone',
        province: 'Islamabad Capital Territory'
      }
    }
  },
  {
    id: 'highrise-gigamall-wtc-isb',
    categoryTag: 'Islamabad Highrise Projects',
    badgeColor: 'bg-emerald-600 text-white',
    title: 'Giga Mall (World Trade Center) & Goldcrest Highlife — DHA Phase 2',
    subtitle: '279 FT / 14-Storey WTC Mall & 26-Storey Goldcrest Residential Towers',
    description: 'Premier highrise commercial and luxury apartment complex on Main GT Road, DHA Phase 2 Islamabad. Home to international retail brands, WTCA-affiliated corporate floors, and serviced sky apartments.',
    price: 'Offices PKR 2.0–15.0 Cr • Luxury Suites PKR 2.1–10.0 Cr',
    location: 'DHA Phase 2, Main GT Road, Islamabad',
    society: 'DHA Islamabad Phase 1-5',
    imageUrl: 'https://towers.pk/wp-content/uploads/sites/2/2024/02/Giga-Mall-Islamabad-380x250.jpg',
    galleryImages: [
      'https://towers.pk/wp-content/uploads/sites/2/2024/02/Giga-Mall-Islamabad-380x250.jpg',
      'https://towers.pk/wp-content/uploads/sites/2/2023/09/Goldcrest-Views-Islamabad-380x250.jpg',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1600&q=85'
    ],
    tourRoomsCount: 5,
    isActive: true,
    order: 9,
    features: [
      '279 ft / 14-Storey World Trade Center Mall & Corporate Hub',
      'Adjacent Goldcrest Highlife 26-Storey Residential Towers',
      'Direct Main GT Road N-5 & Islamabad Expressway Access',
      'High-Yield Serviced Apartments & Retail Showrooms'
    ],
    samplePropertyData: {
      title: 'Giga Mall (World Trade Center) & Goldcrest Highlife',
      category: 'commercial',
      location: {
        city: 'Islamabad',
        society: 'DHA Islamabad Phase 1-5',
        province: 'Islamabad Capital Territory'
      }
    }
  },
  {
    id: 'highrise-ufone-ise-bluearea',
    categoryTag: 'Islamabad Highrise Projects',
    badgeColor: 'bg-emerald-600 text-white',
    title: 'Telecom (Ufone) Tower, ISE Towers & Saudi Pak Tower — Blue Area',
    subtitle: '423 FT / 28 Floors (#2 Ranked) & 305 FT / 22-Storey Financial Hub',
    description: 'Grade-A corporate office floors and financial headquarters along Jinnah Avenue F-7/G-7 Blue Area, Islamabad. Equipped with Tier-3 power backup, fiber-optic redundancy, and high-speed elevator banks.',
    price: 'Offices PKR 50M–1.40 Cr • Floor Rent PKR 15.4L–16.2L/Mo',
    location: 'Jinnah Avenue F-7 / G-7 Blue Area, Islamabad',
    society: 'Blue Area Corporate Zone',
    imageUrl: 'https://towers.pk/wp-content/uploads/sites/2/2023/08/Telecom-Tower-Islamabad-1-380x250.jpg',
    galleryImages: [
      'https://towers.pk/wp-content/uploads/sites/2/2023/08/Telecom-Tower-Islamabad-1-380x250.jpg',
      'https://towers.pk/wp-content/uploads/sites/2/2023/08/ISE-Towers-Islamabad-380x250.jpg',
      'https://towers.pk/wp-content/uploads/sites/2/2023/08/Saudi-Pak-Tower-Islamabad-1-380x250.jpg'
    ],
    tourRoomsCount: 5,
    isActive: true,
    order: 10,
    features: [
      'Telecom Tower: 423 ft / 28 Floors (#2 Tallest in Islamabad)',
      'ISE Towers: 305 ft / 22-Storey Stock Exchange Financial Complex',
      'Saudi Pak Tower: 263 ft / 20-Storey Iconic Corporate Landmark',
      'Blue-Chip Multinational & Diplomatic Corporate Leases'
    ],
    samplePropertyData: {
      title: 'Telecom Tower, ISE Towers & Saudi Pak Tower',
      category: 'commercial',
      location: {
        city: 'Islamabad',
        society: 'Blue Area Corporate Zone',
        province: 'Islamabad Capital Territory'
      }
    }
  },
  {
    id: 'highrise-skypark-constitution-isb',
    categoryTag: 'Islamabad Highrise Projects',
    badgeColor: 'bg-emerald-600 text-white',
    title: 'One Constitution Avenue, Skypark One & Lignum Tower — Islamabad',
    subtitle: '346 FT / 26-Storey Diplomatic Enclave & Gulberg Greens Skyscrapers',
    description: 'Ultra-luxury lake-view residences at One Constitution Avenue alongside Skypark One in Gulberg Greens and Lignum Tower in DHA Phase 2. Engineered with Ri8click acoustic UPVC curtain walls.',
    price: 'Luxury Units & Penthouses from PKR 1.45 Crore',
    location: 'Constitution Ave / Gulberg Greens / DHA-2, Islamabad',
    society: 'Gulberg Greens & Residencia',
    imageUrl: 'https://towers.pk/wp-content/uploads/sites/2/2023/09/Skypark-One-Gulberg-Islamabad-380x250.jpg',
    galleryImages: [
      'https://towers.pk/wp-content/uploads/sites/2/2023/09/Skypark-One-Gulberg-Islamabad-380x250.jpg',
      'https://towers.pk/wp-content/uploads/sites/2/2023/08/One-Constitution-Avenue-Islamabad-380x250.jpg',
      'https://towers.pk/wp-content/uploads/sites/2/2023/09/Lignum-Tower-Islamabad-380x250.jpg'
    ],
    tourRoomsCount: 5,
    isActive: true,
    order: 11,
    features: [
      'One Constitution Ave: 346 ft / 26-Storey Twin Towers (#4 Ranked)',
      'Skypark One Gulberg: 279 ft / 21-Storey Mixed-Use Landmark',
      'Lignum Tower DHA-2: 279 ft / 20-Storey Luxury Residences',
      'Panoramic Rawal Lake & Margalla Hills Views'
    ],
    samplePropertyData: {
      title: 'One Constitution Avenue & Skypark One Islamabad',
      category: 'commercial',
      location: {
        city: 'Islamabad',
        society: 'Gulberg Greens & Residencia',
        province: 'Islamabad Capital Territory'
      }
    }
  },
  {
    id: 'highrise-statelife-greentrust-orchard-isb',
    categoryTag: 'Islamabad Highrise Projects',
    badgeColor: 'bg-emerald-600 text-white',
    title: 'State Life Tower, Green Trust & Defence Executive Towers — Islamabad',
    subtitle: '262 FT / 19-Storey Blue Area Corporate & DHA Executive Highrises',
    description: 'Prime commercial shops, corporate offices, and executive apartments across State Life Tower, Green Trust Tower on Jinnah Avenue, and Defence Executive / Orchard Towers in DHA Islamabad.',
    price: 'Shops PKR 4.5M–3.5 Cr • Offices PKR 80M–3.5 Cr • 8–9% Yield',
    location: 'Jinnah Avenue Blue Area & DHA Phase 1, Islamabad',
    society: 'Blue Area Corporate Zone',
    imageUrl: 'https://towers.pk/wp-content/uploads/sites/2/2023/08/State-Life-Tower-Islamabad-380x250.jpg',
    galleryImages: [
      'https://towers.pk/wp-content/uploads/sites/2/2023/08/State-Life-Tower-Islamabad-380x250.jpg',
      'https://towers.pk/wp-content/uploads/sites/2/2023/08/Green-Trust-Tower-Islamabad-380x250.jpg',
      'https://towers.pk/wp-content/uploads/sites/2/2023/09/Defence-Executive-Apartments-Islamabad-380x250.jpg'
    ],
    tourRoomsCount: 5,
    isActive: true,
    order: 12,
    features: [
      'State Life Tower: 262 ft / 19 Floors (#17 Ranked in Islamabad)',
      'Green Trust Tower: 229 ft / 18-Storey Corporate Building',
      'Defence Executive & Orchard Towers: 18-Storey DHA Residences',
      'Immediate Possession & Verified Rental Income'
    ],
    samplePropertyData: {
      title: 'State Life Tower & Green Trust Tower Islamabad',
      category: 'commercial',
      location: {
        city: 'Islamabad',
        society: 'Blue Area Corporate Zone',
        province: 'Islamabad Capital Territory'
      }
    }
  },
  {
    id: 'prop-wp-1',
    categoryTag: 'Properties (Plots & Houses)',
    badgeColor: 'bg-blue-600 text-white',
    title: 'Modern 1-Kanal Designer Villa & Possession Plots in Faisal Hills',
    subtitle: '5 Master Suites • Spanish Porcelain • Ri8click German UPVC Glazing',
    description: 'Architect-designed 1-Kanal contemporary villas and NOC-verified residential/commercial plots across Faisal Hills, Kohistan Enclave, Multi Gardens B-17, and DHA Islamabad.',
    price: 'Plots from PKR 45 Lakh • Villas PKR 6.85 Crore+',
    location: 'Taxila / Islamabad',
    society: 'Faisal Hills Executive Block',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    tourRoomsCount: 6,
    isActive: true,
    order: 13,
    features: [
      '100% NOC-Verified Plots (5M, 10M, 1 & 2 Kanal)',
      '5 En-Suite Bedrooms + Imported Italian Kitchens',
      'Ri8click UPVC Double Glazing & 10kW Hybrid Solar',
      '2 Mins from Main GT Road N-5 & Margalla Highway'
    ],
    samplePropertyData: {
      title: 'Modern 1-Kanal Designer Villa in Faisal Hills',
      category: 'residential',
      location: {
        city: 'Taxila',
        society: 'Faisal Hills Executive Block',
        province: 'Punjab'
      }
    }
  },
  {
    id: 'prop-wp-2',
    categoryTag: 'Properties (Plots & Houses)',
    badgeColor: 'bg-blue-600 text-white',
    title: 'Margalla View Constructed Estate & Multi Gardens B-17 Residences',
    subtitle: 'Turnkey Grey Structure & Luxury Finishing • 10-Year Structural Warranty',
    description: 'Brand-new double-storey luxury houses and corner plots facing the Margalla Hills in Multi Gardens B-17 and Kohistan Enclave, built with seismic RCC engineering.',
    price: 'PKR 4.25 Crore – 7.40 Crore',
    location: 'Islamabad / Taxila / Rawalpindi',
    society: 'Multi Gardens B-17 & Kohistan Enclave',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    tourRoomsCount: 5,
    isActive: true,
    order: 14,
    features: [
      'CDA / MPCHS Direct Transfer Ready',
      'Fixed-Price Grey Structure & Turnkey Finishing',
      '10-Year Structural & Waterproofing Warranty',
      'Direct M-1 Motorway & GT Road Connectivity'
    ],
    samplePropertyData: {
      title: 'Margalla View Constructed Estate & B-17 Residences',
      category: 'residential',
      location: {
        city: 'Islamabad',
        society: 'Multi Gardens (B-17)',
        province: 'Islamabad Capital Territory'
      }
    }
  },
  {
    id: 'upvc-wp-1',
    categoryTag: 'German UPVC & Turnkey Engineering',
    badgeColor: 'bg-amber-600 text-white',
    title: 'Ri8click German UPVC Sliding Patio, Bi-Fold & French Door Systems',
    subtitle: 'Acoustic 42dB Double/Triple Glazing • Cuts AC Energy Bills by 40%',
    description: 'Factory-engineered German UPVC sliding patio doors, bi-fold panoramic walls, and French doors with heavy-duty 300kg roller tracks, EPDM weather seals, and multi-point security locks.',
    price: 'PKR 1,850 – 3,400 / Sq. Ft. (Custom Factory Direct)',
    location: 'Taxila / Islamabad / Nationwide Installation',
    society: 'Ri8click UPVC Manufacturing Division',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85'
    ],
    tourRoomsCount: 4,
    isActive: true,
    order: 15,
    features: [
      'Heavy-Duty 300kg Roller Tracks & EPDM Weather Gaskets',
      'Blocks 42dB Highway Noise & Cuts AC Bills Up to 40%',
      'Multi-Point German Security Locking Hardware',
      '10-Year Factory Profile & Seal Warranty'
    ],
    samplePropertyData: {
      title: 'Ri8click German UPVC Sliding Patio & Bi-Fold Doors',
      category: 'projects',
      location: {
        city: 'Taxila',
        society: 'Ri8click UPVC Manufacturing Division',
        province: 'Punjab'
      }
    }
  },
  {
    id: 'upvc-wp-2',
    categoryTag: 'German UPVC & Turnkey Engineering',
    badgeColor: 'bg-amber-600 text-white',
    title: 'Tilt-&-Turn UPVC Windows, Acoustic Office Partitions & Wall Panels',
    subtitle: 'UV-Stabilized German Profiles • Dustproof & Monsoon-Sealed',
    description: 'Precision-welded casement and tilt-and-turn UPVC windows alongside acoustic glass office partitions and luxury interior wall panels for villas, plazas, and corporate towers.',
    price: 'PKR 1,450 – 2,950 / Sq. Ft. (Installed with Warranty)',
    location: 'Islamabad / Rawalpindi / Lahore',
    society: 'Ri8click Architectural Products',
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
    ],
    tourRoomsCount: 4,
    isActive: true,
    order: 16,
    features: [
      'UV-Stabilized German UPVC Profiles (Non-Yellowing)',
      '100% Monsoon Rain, Dust & Thermal Seal',
      'Frameless Acoustic Corporate Office Glass Partitions',
      'Free Site Measurement & 3D Quotation Across Pakistan'
    ],
    samplePropertyData: {
      title: 'Tilt-&-Turn UPVC Windows & Acoustic Glass Partitions',
      category: 'projects',
      location: {
        city: 'Islamabad',
        society: 'Ri8click Architectural Products',
        province: 'Islamabad Capital Territory'
      }
    }
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Faisal Hills Taxila 2026 Price Trends & Executive Block Development Update',
    slug: 'faisal-hills-taxila-2026-price-trends-executive-block-development',
    category: 'Faisal Hills Updates',
    excerpt: 'An in-depth analysis of plot and villa appreciation across Faisal Hills Executive Block, Block A, B, C, and Commercial Broadway in 2026.',
    content: `Faisal Hills Taxila, backed by Zedem International, has cemented its position as the fastest-growing RDA-approved housing society along Main GT Road N-5 and the Margalla Hills corridor.\n\n### Key Development Highlights in 2026:\n1. **Executive Block & Block A Maturity:** Over 650+ luxury villas are now completed or under active construction, with full underground electricity, Sui Gas availability, operational schools, parks, and grand mosques.\n2. **Commercial Broadway Boom:** 4-Marla and 8-Marla commercial plots on the 225-ft Main Boulevard have recorded a 28% capital appreciation over the past 12 months due to new multi-storey corporate plazas and brand outlets.\n3. **Margalla Highway Connectivity:** Direct signal-free connectivity toward Islamabad Sector D-12 and E-11 has reduced commute times to Blue Area Islamabad to under 20 minutes.\n\n### Current Market Valuation Guide:\n- **5-Marla Residential Plot:** PKR 42 Lakh – PKR 65 Lakh (depending on block & location)\n- **10-Marla Residential Plot:** PKR 78 Lakh – PKR 1.15 Crore\n- **1-Kanal Residential Plot:** PKR 1.35 Crore – PKR 2.10 Crore\n- **1-Kanal Designer Constructed Villa:** PKR 6.20 Crore – PKR 7.50 Crore\n\nContact **ri8click Certified Advisors** at +92 336-5666727 for verified corner plots, possession-ready land, or turnkey construction quotes.`,
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    authorName: 'Malik Zeeshan',
    authorRole: 'Senior Property Analyst - Taxila & Islamabad',
    authorAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.malikZeeshan_Taxila,
    publishedAt: '2026-08-28',
    readingTime: '5 min read',
    tags: ['Faisal Hills', 'Taxila Real Estate', 'Executive Block', 'Investment 2026'],
    viewsCount: 3420,
    isFeatured: true,
    status: 'published'
  },
  {
    id: 'blog-2',
    title: 'DHA Lahore vs. DHA Islamabad: Where Should Overseas Pakistanis Invest?',
    slug: 'dha-lahore-vs-dha-islamabad-overseas-investment-comparison',
    category: 'Investment Guides',
    excerpt: 'Comparing rental yields, capital appreciation, infrastructure maturity, and commercial high-rise ROI between DHA Lahore and DHA Islamabad.',
    content: `For Overseas Pakistanis seeking secure, dollar-hedged real estate assets in Pakistan, **DHA Lahore (Phases 6, 7, 8 & Prism 9)** and **DHA Islamabad (Phases 2, 3 & 5)** remain the gold standard.\n\n### 1. Capital Appreciation Potential\n- **DHA Lahore Prism 9 & Phase 7:** Offers massive horizontal expansion and direct Ring Road connectivity, making 10-Marla and 1-Kanal plots ideal for 2-to-4 year medium-term capital gains.\n- **DHA Islamabad Phase 2 (Main GT Road):** Dominated by high-rise commercial towers, World Trade Center (Giga Mall), and luxury serviced apartments with strong demand from diplomatic and corporate tenants.\n\n### 2. Rental Yield Comparison\n- Constructed luxury villas in DHA give an average **4.5% to 5.5%** annual rental yield.\n- Commercial retail shops and furnished corporate apartments in approved high-rises deliver **8.5% to 11%** annual rental returns plus steady capital growth.\n\nSpeak with our certified brokerage network on **ri8click.com** for 100% NOC-verified files and direct transfer plots.`,
    coverImage: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80',
    authorName: 'Engr. Haris Farooq',
    authorRole: 'Head of Commercial & Overseas Advisory',
    authorAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.engrHarisFarooq_Islamabad,
    publishedAt: '2026-08-24',
    readingTime: '6 min read',
    tags: ['DHA Islamabad', 'DHA Lahore', 'Overseas Investors', 'Commercial ROI'],
    viewsCount: 2890,
    isFeatured: true,
    status: 'published'
  },
  {
    id: 'blog-3',
    title: 'Multi Gardens B-17 (MPCHS) Sector G & C-18 Interchange Connectivity',
    slug: 'multi-gardens-b17-mpchs-sector-g-interchange-update',
    category: 'Market Trends',
    excerpt: 'How the dedicated M-1 Motorway interchange and Margalla Avenue extension are transforming Multi Gardens B-17 property values.',
    content: `MPCHS Multi Gardens B-17 has evolved into one of Islamabad's most livable and liquid real estate markets. Situated at the foot of the Margalla Hills with direct access to both Main GT Road N-5 and the Peshawar-Islamabad M-1 Motorway, B-17 attracts both end-users and institutional builders.\n\n### Why B-17 Continues to Outperform:\n- **CDA & MPCHS Reliability:** Clean land titles and fast transfer procedures.\n- **Turnkey House Demand:** 7-Marla, 10-Marla, and 1-Kanal constructed houses in Blocks B, C, E, and F enjoy immediate buyer and tenant occupancy.\n- **Commercial Markaz Growth:** High-rise commercial plots in B-17 are attracting hospitals, educational campuses, and national retail brands.`,
    coverImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    authorName: 'Chaudhry Bilal',
    authorRole: 'Director Sales - B-17 & Taxila Corridor',
    authorAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.chaudhryBilal_FaisalHills,
    publishedAt: '2026-08-20',
    readingTime: '4 min read',
    tags: ['Multi Gardens B-17', 'MPCHS', 'Islamabad Plots', 'M-1 Motorway'],
    viewsCount: 2150,
    isFeatured: false,
    status: 'published'
  },
  {
    id: 'blog-4',
    title: 'The Rise of Curved Container & Space Capsule Smart Houses in Pakistan',
    slug: 'rise-of-curved-container-space-capsule-smart-houses-pakistan',
    category: 'Modular & Prefab Tech',
    excerpt: 'Why resort owners, farmhouse investors, and modern families are switching to factory-built Space Capsule Pods with 7-day installation.',
    content: `Traditional brick-and-mortar construction in hilly or remote tourist regions like Murree, Nathia Gali, Swat, Hunza, and Khanpur Dam often takes 18 to 24 months and suffers from severe cost overruns.\n\n### Enter Ri8Click Readymade Space Capsule & Modular Smart Homes:\n1. **Rapid 7-to-30 Day Turnkey Deployment:** Built in a precision factory environment with galvanized steel frames and aviation-grade aluminum shells, then crane-installed on your site in hours.\n2. **270° Panoramic Low-E Double Glazing:** Engineered with **Ri8Click German UPVC** thermal windows that withstand -20°C snow to +55°C summer heat while cutting air-conditioning bills by 40%.\n3. **100% Relocatable Asset:** Unlike conventional concrete structures, a Space Capsule Pod can be unbolted and transported to a new plot whenever you wish.\n4. **High Airbnb & Resort ROI:** Tourist glamping pods and farmhouse suites generate PKR 25,000 to PKR 45,000 per night in northern resorts, recovering their entire capital cost within 18 to 24 months.`,
    coverImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=85',
    authorName: 'Engr. Haris Farooq',
    authorRole: 'Lead Modular & Prefab Architect',
    authorAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.engrHarisFarooq_Islamabad,
    publishedAt: '2026-08-15',
    readingTime: '5 min read',
    tags: ['Space Capsule House', 'Modular Homes Pakistan', 'Glamping Pods', 'UPVC Windows'],
    viewsCount: 4120,
    isFeatured: true,
    status: 'published'
  },
  {
    id: 'blog-5',
    title: 'How German Double-Glazed UPVC Windows Cut Pakistani Summer AC Bills by 40%',
    slug: 'german-double-glazed-upvc-windows-cut-ac-bills-pakistan',
    category: 'Construction & UPVC',
    excerpt: 'A technical breakdown of single-pane aluminum vs. Ri8Click multi-chamber UPVC thermal and acoustic glazing for villas and plazas.',
    content: `With rising electricity tariffs across Pakistan, up to **45% of a home's cooling energy** is lost through poorly sealed single-pane aluminum windows.\n\n### Why Builders & Homeowners Are Upgrading to Ri8Click UPVC:\n- **Multi-Chamber Thermal Insulation:** Non-conductive UPVC profiles paired with argon-filled double-glazed Low-E glass keep indoor temperatures up to 8°C cooler in peak June/July heat.\n- **42dB Acoustic Soundproofing:** Essential for commercial plazas on Main GT Road N-5 and villas near busy boulevards.\n- **Monsoon & Dust Sealing:** EPDM double weather gaskets completely block dust storms and monsoon water seepage.\n- **10-Year UV Warranty:** Specifically formulated with titanium dioxide to prevent yellowing or warping under intense Pakistani sunlight.`,
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    authorName: 'Malik Zeeshan',
    authorRole: 'Senior Property & Construction Advisor',
    authorAvatar: PAKISTAN_REGIONAL_AGENT_AVATARS.malikZeeshan_Taxila,
    publishedAt: '2026-08-10',
    readingTime: '4 min read',
    tags: ['UPVC Windows', 'Energy Efficiency', 'Turnkey Construction', 'Taxila'],
    viewsCount: 1980,
    isFeatured: false,
    status: 'published'
  }
];

export const INITIAL_SITE_PORTIONS: SiteSectionPortion[] = [
  {
    id: 'top_announcement_bar',
    name: 'Top Announcement & Contact Ribbon',
    title: 'Pakistan’s #1 Verified Real Estate & Modular Smart Home Consortium',
    subtitle: 'Faisal Hills • Taxila • Islamabad • Lahore — Direct Verified Listings',
    isVisible: true,
    order: 1,
    badgeText: 'LIVE PORTAL',
    themeStyle: 'dark'
  },
  {
    id: 'hero_slider',
    name: '360° Hero Showroom & Crystal Portfolio Deck',
    title: 'Ri8click Consortium — Capsule Smart Homes, Highrises & Verified Properties',
    subtitle: 'Interactive architectural camera deck & virtual walkthroughs',
    isVisible: true,
    order: 2,
    badgeText: '360° SHOWROOM',
    themeStyle: 'dark'
  },
  {
    id: 'search_bar',
    name: 'Smart Location & Category Filter Bar',
    title: 'Search Verified Properties Across Pakistan',
    subtitle: 'Filter by Province, City, Housing Society, Category & Budget',
    isVisible: true,
    order: 3,
    themeStyle: 'light'
  },
  {
    id: 'properties_grid',
    name: 'Featured Watermarked Property Listings Grid',
    title: 'Verified Properties & Investment Opportunities',
    subtitle: '100% Physically Vetted & Ri8click Watermark Protected Listings',
    isVisible: true,
    order: 4,
    badgeText: 'VERIFIED INVENTORY',
    themeStyle: 'light'
  },
  {
    id: 'commercial_showcase',
    name: 'High-ROI Commercial Plazas & Highrises Showcase',
    title: 'Prime Commercial Plazas, Corporate Towers & Retail Shops',
    subtitle: 'High-footfall commercial investments in Faisal Hills, Blue Area & Lahore',
    isVisible: true,
    order: 5,
    badgeText: 'HIGH ROI COMMERCIAL',
    themeStyle: 'dark'
  },
  {
    id: 'modular_showcase',
    name: 'Readymade Space Capsule & Modular Smart Homes Showcase',
    title: 'Readymade Space Capsule & Curved Container Smart Houses',
    subtitle: 'Factory-engineered aerospace aluminum & UPVC smart homes deployed in 7–30 days',
    isVisible: true,
    order: 6,
    badgeText: 'MODULAR INNOVATION',
    themeStyle: 'gradient'
  },
  {
    id: 'news_blogs_section',
    name: 'Real Estate Market Insights & Construction Blog',
    title: 'Market Intelligence, Society Updates & Construction Guides',
    subtitle: 'Latest price trends across Faisal Hills, DHA, Multi Gardens B-17 & Modular Tech',
    isVisible: true,
    order: 7,
    badgeText: 'MARKET INSIGHTS',
    themeStyle: 'light'
  },
  {
    id: 'agencies_network',
    name: 'Certified Agencies & Regional Real Estate Advisors',
    title: 'Certified Agencies & Verified Regional Property Advisors',
    subtitle: 'Authorized brokerage partners across Taxila, Islamabad, Rawalpindi & Lahore',
    isVisible: true,
    order: 8,
    badgeText: 'CERTIFIED NETWORK',
    themeStyle: 'light'
  },
  {
    id: 'consortium_showcase',
    name: 'Ri8click 5-Pillar Consortium Divisions',
    title: 'The Ri8click Consortium — End-to-End Real Estate & Engineering Ecosystem',
    subtitle: 'Real Estate Brokerage • Modular Capsule Homes • Turnkey Construction • German UPVC • PropTech AI',
    isVisible: true,
    order: 9,
    badgeText: 'CONSORTIUM GROUP',
    themeStyle: 'dark'
  },
  {
    id: 'cta_banner',
    name: 'Bottom Executive Consultation & WhatsApp CTA Banner',
    title: 'Ready to Buy, Sell, or Deploy a Space Capsule Smart Home?',
    subtitle: 'Connect directly with our executive advisory desk or post your property with instant watermark protection.',
    isVisible: true,
    order: 10,
    badgeText: '24/7 ADVISORY',
    themeStyle: 'accent'
  }
];

export const initialProperties = INITIAL_PROPERTIES;
export const initialAgencies = INITIAL_AGENCIES;
export const initialProvinceCityData = INITIAL_PROVINCE_CITIES;
export const initialConsortiumDivisions = CONSORTIUM_DIVISIONS;
export const initialHeroSlides = INITIAL_HERO_SLIDES;
export const initialBlogPosts = INITIAL_BLOGS;
export const initialSitePortions = INITIAL_SITE_PORTIONS;

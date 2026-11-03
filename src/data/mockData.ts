import { 
  Property, 
  ProvinceCityData, 
  AgencyAccount, 
  ConsortiumDivision,
  HeroSlide,
  BlogPost,
  SiteSectionPortion
} from '../types';

export const INITIAL_PROVINCE_CITIES: ProvinceCityData[] = [
  {
    province: 'Punjab',
    cities: [
      {
        name: 'Taxila',
        societies: [
          'Faisal Hills',
          'Faisal Hills Block A',
          'Faisal Hills Block B',
          'Faisal Hills Block C',
          'Faisal Hills Executive Block',
          'Faisal Hills Commercial Broadway',
          'Kohistan Enclave',
          'Margalla View Society',
          'Museum Road Estates',
          'Heavy Mechanical Complex (HMC) Area',
          'New City Phase 1 & 2',
          'University Road Enclave',
          'Taxila Cantt',
          'Wah Cantonment Officers Colony',
          'GT Road Commercial Belt'
        ]
      },
      {
        name: 'Rawalpindi',
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
        societies: [
          'Faisal Hills (Connecting Zone)',
          'Multi Gardens (B-17)',
          'Eighteen Islamabad',
          'Gulberg Greens & Residencia',
          'Blue Area Corporate Zone',
          'Sector F-6 & F-7',
          'Sector F-8 & F-10',
          'Sector E-7 & E-11',
          'Sector D-12',
          'Park View City',
          'Capital Smart City'
        ]
      }
    ]
  },
  {
    province: 'Sindh',
    cities: [
      {
        name: 'Karachi',
        societies: [
          'DHA Karachi (Phase 1-8)',
          'Clifton Block 1-9',
          'Bahria Town Karachi',
          'PECHS',
          'Gulshan-e-Iqbal',
          'KDA Scheme 1'
        ]
      }
    ]
  },
  {
    province: 'Khyber Pakhtunkhwa',
    cities: [
      {
        name: 'Peshawar',
        societies: [
          'Hayatabad Phases 1-7',
          'DHA Peshawar',
          'Regi Model Town',
          'University Town'
        ]
      },
      {
        name: 'Abbottabad',
        societies: [
          'Kakool Road Enclave',
          'Supply Area',
          'Mandian Commercial'
        ]
      }
    ]
  }
];

export const INITIAL_AGENCIES: AgencyAccount[] = [
  {
    id: 'agency-1',
    name: 'Al-Mairaj Real Estate & Builders',
    companyName: 'Al-Mairaj Real Estate Group',
    role: 'agency',
    email: 'info@almairaj-realty.pk',
    phone: '+92 336-5666727',
    whatsapp: '923365666727',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    verified: true,
    rating: 4.9,
    totalPosts: 14,
    postLimit: 50,
    activeListings: 14,
    city: 'Taxila',
    primarySociety: 'Faisal Hills',
    memberSince: 'Jan 2023',
    status: 'active'
  },
  {
    id: 'agency-2',
    name: 'Faisal Hills Property Advisors',
    companyName: 'Faisal Hills Premier Realty',
    role: 'agency',
    email: 'contact@faisalhillsproperties.com',
    phone: '+92 336-5666727',
    whatsapp: '923365666727',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    verified: true,
    rating: 4.85,
    totalPosts: 9,
    postLimit: 40,
    activeListings: 9,
    city: 'Taxila',
    primarySociety: 'Faisal Hills',
    memberSince: 'Mar 2023',
    status: 'active'
  },
  {
    id: 'agency-3',
    name: 'Beacon Prime Commercial Estates',
    companyName: 'Beacon Commercial Group',
    role: 'agency',
    email: 'corporate@beaconprime.com',
    phone: '+92 336-5666727',
    whatsapp: '923365666727',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    verified: true,
    rating: 4.95,
    totalPosts: 19,
    postLimit: 60,
    activeListings: 19,
    city: 'Islamabad',
    primarySociety: 'Blue Area Corporate Zone',
    memberSince: 'Nov 2022',
    status: 'active'
  },
  {
    id: 'agency-4',
    name: 'Taxila City Realtors & Consultants',
    companyName: 'Taxila Realtors Consortium',
    role: 'agency',
    email: 'desk@taxilarealtors.pk',
    phone: '+92 336-5666727',
    whatsapp: '923365666727',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    verified: true,
    rating: 4.75,
    totalPosts: 6,
    postLimit: 30,
    activeListings: 6,
    city: 'Taxila',
    primarySociety: 'Kohistan Enclave',
    memberSince: 'May 2023',
    status: 'active'
  },
  {
    id: 'user-1',
    name: 'Tariq Mehmood (Direct Owner)',
    companyName: 'Private Investor',
    role: 'customer',
    email: 'tariq.mehmood@gmail.com',
    phone: '+92 336-5666727',
    whatsapp: '923365666727',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    verified: true,
    rating: 5.0,
    totalPosts: 2,
    postLimit: 5,
    activeListings: 2,
    city: 'Taxila',
    primarySociety: 'Faisal Hills Block B',
    memberSince: 'Feb 2024',
    status: 'active'
  },
  {
    id: 'agency-sapphire',
    name: 'Sapphire Properties Advisory',
    companyName: 'Sapphire Properties & Athar Associates',
    role: 'agency',
    email: 'info@sapphireproperties.com.pk',
    phone: '+92 336-5666727',
    whatsapp: '923365666727',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    verified: true,
    rating: 4.98,
    totalPosts: 12,
    postLimit: 60,
    activeListings: 12,
    city: 'Lahore',
    primarySociety: 'Bahria Town Lahore',
    memberSince: 'Jan 2022',
    status: 'active',
    address: 'Main Boulevard, Bahria Town Ring Road SL3 Interchange, Lahore, Punjab',
    bio: 'Authorized sales and marketing partner for Icon Mall & Towers Lahore and premier landmark mixed-use towers.'
  }
];

export const INITIAL_PROPERTIES: Property[] = [
  // ===================== 1. COMMERCIAL PROPERTIES =====================
  {
    id: 'prop-icon-mall-comm-lahore',
    title: 'Icon Mall & Towers - Prime Commercial Retail Shops & Food Court',
    tagline: '22-Kanal Dubai-Inspired Twin Tower Mega Shopping Mall in Bahria Town Lahore',
    description: 'Icon Mall & Towers is a prestigious 22-Kanal Dubai-inspired mixed-use development by Athar Associates and marketed by Sapphire Properties, strategically situated at the Bahria Town Interchange on Lahore Ring Road (SL3). This 17-storey twin-tower landmark features Lahore’s 4th largest shopping mall spanning 4 expansive commercial floors with 150+ international and national retail brands, anchor supermarkets, pharmacy, beauty salons, and an expansive modern food court. The complex showcases Pakistan’s largest open-to-sky central courtyard spanning 12.5 Kanals, 12 high-speed passenger & cargo elevators, 10 escalators, and 450+ basement car parking spaces, offering tremendous footfall and high rental yield.',
    category: 'commercial',
    type: 'Retail Shop',
    purpose: 'for_sale',
    price: 3500000,
    priceFormatted: 'PKR 35 Lakh (Booking from 5 Lakh)',
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
        'Beaconhouse National University (BNU)',
        'Safari Zoo Lahore',
        'Lake City Interchange'
      ]
    },
    area: 220,
    areaUnit: 'Sq Ft',
    floors: 17,
    features: [
      '22-Kanal Dubai-Inspired 17-Storey Twin Tower Landmark',
      'Pakistan Largest 12.5-Kanal Central Open Courtyard',
      '4 Floors Dedicated to Mega Shopping Mall (150+ Outlets)',
      '12 High-Speed Elevators & 10 Escalators',
      '450+ Secure Underground Basement Car Parking',
      'Direct Access to Lahore Ring Road SL3 Interchange',
      'Royal Swiss International 5-Star Hotel in Tower 2',
      '24/7 Smart Biometric Security & CCTV Surveillance',
      'Continuous 100% Power Backup with Standby Generators',
      'Central HVAC Air Conditioning & Modern Food Court',
      'Pre-Launch Rates with Easy 5-Year Installments (1% Monthly)'
    ],
    images: [
      'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
    ],
    watermark: true,
    agencyId: 'agency-sapphire',
    agentName: 'Sapphire Properties Advisory',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    agentCompany: 'Sapphire Properties & Athar Associates',
    agentRating: 4.98,
    isFeatured: true,
    isHotCommercial: true,
    viewsCount: 2340,
    savesCount: 156,
    createdAt: '2026-09-01',
    status: 'active',
    virtualTourVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    virtualTourVideoTitle: 'Icon Mall & Towers Commercial Atrium & Courtyard 3D Tour',
    hasVirtualTour: true
  },
  {
    id: 'prop-comm-1',
    title: 'Ri8Click Executive Commercial Plaza',
    tagline: 'Prime 5-Story Commercial Plaza on Main Boulevard',
    description: 'Ultra-modern corporate commercial plaza located on the prestigious Main Commercial Boulevard of Faisal Hills Taxila. Features high-visibility frontage, basement parking, high-speed capsule elevators, double-glazed UPVC thermal glass facade by Ri8Click UPVC, backup solar generators, and guaranteed high rental ROI of 9.2% annually.',
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
      address: 'Plot #14-15, Main Commercial Boulevard, Faisal Hills, Taxila / Rawalpindi'
    },
    area: 8,
    areaUnit: 'Marla',
    floors: 5,
    features: [
      'Double Glazed UPVC Facade',
      'Dual Capsule Elevators',
      'Underground Dedicated Parking',
      'CCTV 24/7 Security Command',
      'Fire Fighting System Installed',
      'High Rental Yield (9.2%+)',
      'Solar Backup 50kVA',
      'Approved RDA/TMA NOC'
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80'
    ],
    watermark: true,
    agencyId: 'agency-1',
    agentName: 'Malik Zeeshan',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    agentCompany: 'Al-Mairaj Real Estate & Builders',
    agentRating: 4.9,
    isFeatured: true,
    isHotCommercial: true,
    viewsCount: 1420,
    savesCount: 89,
    createdAt: '2026-08-20',
    status: 'active',
    virtualTourVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    virtualTourVideoTitle: 'Executive Commercial Plaza 3D Tour & Facade Walkthrough (15s)',
    hasVirtualTour: true
  },
  {
    id: 'prop-comm-2',
    title: 'Multi-Story Corporate Tower on GT Road',
    tagline: 'State-of-the-Art Commercial Business Centre',
    description: 'Signature commercial tower on Main Grand Trunk (GT) Road Taxila near Margalla Hills junction. Ideal for multinational regional offices, banks, corporate franchises, or healthcare centers. Built with Ri8Click turnkey civil engineering standards.',
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
      address: 'Main GT Road Junction, Taxila Gateway, Punjab'
    },
    area: 1.5,
    areaUnit: 'Kanal',
    floors: 7,
    features: [
      '7 Story Approved Commercial Tower',
      'Dedicated Basement for 40+ Cars',
      'Reinforced Earthquake Resistant Structure',
      'Central VRF Climate Control',
      'Panoramic Margalla Mountain Views',
      '3 Phase Industrial Electric Connection',
      'UPVC Architectural Double Glaze'
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80'
    ],
    watermark: true,
    agencyId: 'agency-3',
    agentName: 'Engr. Haris Farooq',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    agentCompany: 'Beacon Prime Commercial Estates',
    agentRating: 4.95,
    isFeatured: true,
    isHotCommercial: true,
    viewsCount: 980,
    savesCount: 65,
    createdAt: '2026-08-18',
    status: 'active'
  },
  {
    id: 'prop-comm-3',
    title: 'Brand New Corporate Office Suite - Blue Area',
    tagline: 'Furnished Executive Office Floor with Skyline View',
    description: 'Fully furnished 3,800 Sq Ft corporate office space in Islamabad Blue Area business hub. Includes executive boardrooms, open workstation halls, soundproof phone booths, server room, and executive kitchenette.',
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
    agentAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
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
    agentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
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
    agentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    agentCompany: 'Sapphire Properties & Athar Associates',
    agentRating: 4.98,
    isFeatured: true,
    isHotCommercial: false,
    viewsCount: 2890,
    savesCount: 182,
    createdAt: '2026-09-01',
    status: 'active',
    virtualTourVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
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
      'Approved Completion Certificate'
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
    agentAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    agentCompany: 'Al-Mairaj Real Estate & Builders',
    agentRating: 4.9,
    isFeatured: true,
    viewsCount: 2890,
    savesCount: 198,
    createdAt: '2026-08-27',
    status: 'active',
    virtualTourVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    virtualTourVideoTitle: 'Faisal Hills Luxury Villa Walkthrough & Rooftop Margalla View (15s)',
    hasVirtualTour: true
  },
  {
    id: 'prop-res-2',
    title: 'Luxury Family Residence in Multi Gardens B-17',
    tagline: 'Brand New 10-Marla Modern House',
    description: 'Exquisitely designed 10-Marla corner house in Multi Gardens B-17 Islamabad, offering seamless connectivity to Islamabad Motorway M-1 and Taxila GT Road. Features 4 master bedrooms, double height lobby, solar backup, and imported fittings.',
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
      address: 'Main Boulevard, Block C, B-17 Multi Gardens, Islamabad'
    },
    area: 10,
    areaUnit: 'Marla',
    bedrooms: 4,
    bathrooms: 5,
    parking: 2,
    features: [
      '4 Luxury En-suite Bedrooms',
      'Double Height Ceiling Drawing Room',
      'Ri8Click Thermal Insulated Glass',
      'Solid Teak & Ash Woodwork',
      'Landscaped Green Lawn',
      'Gated Community with 24/7 Security'
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
    agentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    agentCompany: 'Faisal Hills Property Advisors',
    agentRating: 4.85,
    isFeatured: true,
    viewsCount: 1640,
    savesCount: 112,
    createdAt: '2026-08-24',
    status: 'active'
  },
  {
    id: 'prop-res-3',
    title: 'Margalla Hillside Executive Villa - Kohistan Enclave',
    tagline: 'Custom Built 1-Kanal Luxury Estate in Taxila',
    description: 'Palatial 1-Kanal residence in Kohistan Enclave Taxila, surrounded by green Margalla foothills. Designed with high ceilings, private mini cinema, basement recreational zone, imported UPVC soundproof framing, and double garage.',
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
      address: 'Lane 4, Hillview Sector, Kohistan Enclave, Taxila, Punjab'
    },
    area: 1,
    areaUnit: 'Kanal',
    bedrooms: 5,
    bathrooms: 6,
    parking: 3,
    features: [
      '5 En-suite Bedrooms + Powder Room',
      'Basement Home Theater / Gym Room',
      'Lush Hilltop Scenic Views',
      'Ri8Click Acoustic UPVC Windows',
      'Commercial Grade Solar Inverter System',
      'Water Filtration & Underground Tank'
    ],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80'
    ],
    watermark: true,
    agencyId: 'agency-4',
    agentName: 'Haji Aslam Khan',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    agentCompany: 'Taxila City Realtors & Consultants',
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
    tagline: 'Panoramic Golf Course Luxury Living',
    description: 'Ultra-luxurious 4-Bedroom duplex penthouse with sweeping views of the Championship Golf Course at Eighteen Islamabad. Features private infinity pool, dedicated high-speed elevator, and concierge service.',
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
      address: 'The Heights, Tower B, Eighteen, Kashmir Highway'
    },
    area: 4500,
    areaUnit: 'Sq Ft',
    bedrooms: 4,
    bathrooms: 5,
    parking: 3,
    features: [
      'Private Terrace Infinity Plunge Pool',
      '18-Hole Championship Golf Course View',
      'Floor to Ceiling Soundproof UPVC Glass',
      'Smart Climate & Lighting Control',
      'Private Lift Access & 24/7 Butler Service'
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
    agentAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
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
    tagline: 'Modern Designer House Available For Monthly Rent',
    description: 'Fully furnished 7-Marla luxury villa in Faisal Hills Block A, ideal for expatriates, multinational executives, and corporate consultants. Includes imported furniture, inverter air conditioning in all rooms, and equipped kitchen.',
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
      address: 'Street 9, Block A, Faisal Hills, Taxila'
    },
    area: 7,
    areaUnit: 'Marla',
    bedrooms: 3,
    bathrooms: 4,
    parking: 2,
    features: [
      'Fully Furnished Interior',
      'Inverter ACs in All Rooms',
      'Solar Backup System',
      'Gated Community 24/7 Security',
      'High Speed Fiber WiFi',
      'Maintenance Support Included'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80'
    ],
    watermark: true,
    agencyId: 'agency-1',
    agentName: 'Malik Zeeshan',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    agentCompany: 'Al-Mairaj Real Estate & Builders',
    agentRating: 4.9,
    isFeatured: false,
    viewsCount: 940,
    savesCount: 52,
    createdAt: '2026-08-26',
    status: 'active'
  },

  // ===================== 3. PLOTS & LAND PROPERTIES =====================
  {
    id: 'prop-plot-1',
    title: '5-Marla Possession Ready Plot - Faisal Hills Block C',
    tagline: 'Ideal Residential Plot with Immediate Construction Rights',
    description: 'Prime 5-Marla residential plot in Faisal Hills Block C Taxila. Situated on a 40-ft wide road with all underground utilities installed (Electricity, Sui Gas, Water, Sewerage). Approved NOC and instant registry/intiqal available.',
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
      'Immediate Possession & Construction Rights',
      '40-Feet Wide Carpeted Street',
      'Underground Utilities Connected',
      'Near Commercial Market & Grand Mosque',
      '100% Clear Title & Verified File'
    ],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1000&q=80'
    ],
    watermark: true,
    agencyId: 'agency-2',
    agentName: 'Chaudhry Bilal',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    agentCompany: 'Faisal Hills Property Advisors',
    agentRating: 4.85,
    isFeatured: true,
    viewsCount: 1720,
    savesCount: 145,
    createdAt: '2026-08-25',
    status: 'active'
  },
  {
    id: 'prop-plot-2',
    title: '10-Marla Hill-Facing Plot - Faisal Hills Executive Block',
    tagline: 'Scenic Elevated Location in Executive Zone',
    description: 'Exceptional 10-Marla plot with panoramic Margalla mountain backdrop in Faisal Hills Executive Block. Adjacent to central park, executive club, and international school.',
    category: 'residential',
    type: 'Residential Plot',
    purpose: 'for_sale',
    price: 9200000,
    priceFormatted: 'PKR 92 Lakh',
    currency: 'PKR',
    location: {
      province: 'Punjab',
      city: 'Taxila',
      society: 'Faisal Hills',
      block: 'Faisal Hills Executive Block',
      address: 'Plot #89, Executive Avenue, Faisal Hills, Taxila'
    },
    area: 10,
    areaUnit: 'Marla',
    features: [
      'Margalla Hills Direct View',
      'Park-Facing Elevation',
      'Executive Sector Security Checkpost',
      'High Appreciation Investment Potential',
      'Verified RDA Approved Society'
    ],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ],
    watermark: true,
    agencyId: 'agency-1',
    agentName: 'Malik Zeeshan',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    agentCompany: 'Al-Mairaj Real Estate & Builders',
    agentRating: 4.9,
    isFeatured: true,
    viewsCount: 2150,
    savesCount: 180,
    createdAt: '2026-08-23',
    status: 'active'
  },
  {
    id: 'prop-plot-3',
    title: '8-Marla Commercial Broadway Plot - Faisal Hills',
    tagline: 'High-Yield Commercial Land for Plaza Construction',
    description: 'Direct main boulevard commercial plot on 150-ft Faisal Hills Commercial Broadway. Permitted for Ground + 5 Story commercial plaza construction. Top tier ROI opportunity.',
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
      address: 'Commercial Plot #21, Main Broadway, Faisal Hills, Taxila'
    },
    area: 8,
    areaUnit: 'Marla',
    features: [
      'G+5 Story Commercial Building Permission',
      'Frontage on 150-Feet Main Boulevard',
      'Surrounded by Active Commercial Plazas',
      'Bank & Corporate Office Hub',
      'NOC & Demarcation Cleared'
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'
    ],
    watermark: true,
    agencyId: 'agency-3',
    agentName: 'Engr. Haris Farooq',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    agentCompany: 'Beacon Prime Commercial Estates',
    agentRating: 4.95,
    isFeatured: true,
    isHotCommercial: true,
    viewsCount: 1980,
    savesCount: 135,
    createdAt: '2026-08-20',
    status: 'active'
  },

  // ===================== 4. MODULAR & CAPSULE SMART HOUSES =====================
  {
    id: 'prop-mod-1',
    title: 'Ri8Click Space Capsule Smart Pod (Model X-100)',
    tagline: 'Futuristic Prefabricated Luxury Living Capsule with Curved Glass',
    description: 'Engineered by the Ri8Click Modular Housing division. A high-tech aerospace grade aluminum & galvanized steel space capsule home with distinct curved container architecture. Comes 100% turnkey ready with integrated smart home IoT, curved 270° panoramic glass balcony, intelligent climate control, luxury bathroom with dry/wet separation, and quick 7-day on-site deployment anywhere in Pakistan (Taxila, Murree, Islamabad, Farmhouses).',
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
      address: 'Ri8Click Prefab Showcase Hub, Taxila Bypass, Punjab'
    },
    area: 420,
    areaUnit: 'Sq Ft',
    bedrooms: 1,
    bathrooms: 1,
    features: [
      'Aerodynamic Curved Aluminum Container Outer Shell',
      'Curved 270-Degree Panoramic Tempered Glass Balcony',
      'Complete Smart Voice & App Home Automation',
      'Plug & Play Water, Electricity & Sewage Setup',
      'Ri8Click Thermal Insulation (-20°C to +55°C)',
      '100% Transportable & Relocatable',
      'Delivered Fully Furnished with King Bed & AC'
    ],
    images: [
  'https://www.genspark.ai/api/files/s/IEOFqhM7', // Lakeside Curved Glass Capsule Pod
  'https://www.genspark.ai/api/files/s/W2Z5zFao', // V2124 Double-Decker Capsule Villa
  'https://www.genspark.ai/api/files/s/JycQaAWz'  // Q3 Pitched-Roof Modular Capsule
    ],

// Updated Modular & Capsule Smart Houses images in src/data/mockData.ts on 23-10-26:
// prop-mod-1 (Ri8Click Space Capsule Smart Pod - Model X-100):
images: [
  'https://www.genspark.ai/api/files/s/I6HwjuLB', // Lakeside Curved-Glass Capsule Pod
  'https://www.genspark.ai/api/files/s/u84KzdvI', // V2124 Double-Decker Capsule Villa
  'https://www.genspark.ai/api/files/s/pSySUzgg'  // Q3 Pitched-Roof Modular Capsule
],

// prop-mod-3 (Ri8Click Curved Panoramic Capsule Cabin - Model E-70):
images: [
  'https://www.genspark.ai/api/files/s/3jIuxLrV', // Rooftop Deck Shipping Container Villa
  'https://www.genspark.ai/api/files/s/pSySUzgg', // Q3 Alpine Capsule House
  'https://www.genspark.ai/api/files/s/bl8vngPB'  // Curved-Corner Glass Studio Container
],

// prop-mod-2 (Ri8Click 2-Bed Modular Luxury Prefab Villa):
images: [
  'https://www.genspark.ai/api/files/s/u84KzdvI', // V2124 Double-Decker Stacked Capsule
  'https://www.genspark.ai/api/files/s/OypEiCb2', // L-Shaped Loft Cutaway Interior
  'https://www.genspark.ai/api/files/s/K4lfut6W'  // Hex-LED Smart Container House
],



    
//    images: [
 //     'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1200&q=85',
 //     'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85',
 //     'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=85'
 //   ],
    watermark: true,
    agencyId: 'agency-1',
    agentName: 'Ri8Click Modular Specialist',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
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
    tagline: 'Streamlined Cylindrical Curved Glass Container Living',
    description: 'Sleek curved aerodynamic container pod engineered with aviation aluminum, seamless wraparound curved panoramic glass facade, intelligent IoT ambient lighting, luxury skylight master suite, and custom front timber viewing deck. Ideal for scenic spots, glamping resorts, and private farmhouses.',
    category: 'modular',
    type: 'Capsule Smart House',
    purpose: 'for_sale',
    price: 9800000,
    priceFormatted: 'PKR 98 Lakh',
    currency: 'PKR',
    location: {
      province: 'Punjab',
      city: 'Taxila',
      society: 'Margalla Ridge Resort Hub',
      address: 'Ri8Click Modular Experience Yard, Taxila / Khanpur Road'
    },
    area: 550,
    areaUnit: 'Sq Ft',
    bedrooms: 1,
    bathrooms: 1,
    features: [
      'Seamless Wraparound Curved Container Glass Frontage',
      'Aviation Grade Curved Alloy Body with Fluorocarbon Finish',
      'Smart Voice Control Curtains, HVAC & Audio System',
      'Panoramic Curved Stargazing Skylight Roof',
      'Ready-to-Use Designer Wet/Dry Luxury Restroom',
      '15-Day Delivery & Rapid Crane Mount Deployment'
    ],
    /*images: [
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85'
    ],*/
    images: [
  'https://www.genspark.ai/api/files/s/xBNmbfCQ', // Hex-LED Smart Container Studio
  'https://www.genspark.ai/api/files/s/IEOFqhM7', // Lakeside Curved Glass Capsule
  'https://www.genspark.ai/api/files/s/JycQaAWz'  // Q3 Forest Capsule Pod
    ],

    watermark: true,
    agencyId: 'agency-1',
    agentName: 'Ri8Click Modular Specialist',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    agentCompany: 'Ri8Click Prefab & Modular Consortium',
    agentRating: 5.0,
    isFeatured: true,
    viewsCount: 3950,
    savesCount: 345,
    createdAt: '2026-08-29',
    status: 'active'
  },
  {
    id: 'prop-mod-4',
    title: 'Ri8Click Curved Container Space Box (Model C-40)',
    tagline: 'Rounded-Corner Marine-Grade Prefab Container Pod',
    description: 'Modern curved-edge container architectural pod featuring rounded corner radius, floor-to-ceiling thermally isolated curved glass frontage, integrated smart bathroom with dry-wet separation, concealed induction kitchenette, and rapid 5-day installation.',
    category: 'modular',
    type: 'Capsule Smart House',
    purpose: 'for_sale',
    price: 7200000,
    priceFormatted: 'PKR 72 Lakh',
    currency: 'PKR',
    location: {
      province: 'Islamabad Capital Territory',
      city: 'Islamabad',
      society: 'Chak Shahzad Farmhouses',
      address: 'Ri8Click Demonstration Unit, Park Road, Islamabad'
    },
    area: 380,
    areaUnit: 'Sq Ft',
    bedrooms: 1,
    bathrooms: 1,
    features: [
      'Rounded Corner Marine-Grade Steel & Alloy Construction',
      'Floor-to-Ceiling Curved Double-Glazed Thermal Glass',
      'Concealed Induction Kitchenette & Mini Bar',
      'Smart Keyless Touchpad & Mobile App Entry',
      'Solar Panel Hookup & Smart Energy Storage Ready'
    ],
    /*images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85'
    ],*/
    images: [
  'https://www.genspark.ai/api/files/s/Iswmh2Gk', // Rooftop Deck Shipping Container Villa
  'https://www.genspark.ai/api/files/s/JycQaAWz', // Q3 Alpine Capsule House
  'https://www.genspark.ai/api/files/s/W2Z5zFao'  // V2124 Double-Decker Capsule
    ],
    watermark: true,
    agencyId: 'agency-1',
    agentName: 'Ri8Click Modular Specialist',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    agentCompany: 'Ri8Click Prefab & Modular Consortium',
    agentRating: 4.9,
    isFeatured: false,
    viewsCount: 2800,
    savesCount: 230,
    createdAt: '2026-08-27',
    status: 'active'
  },
  {
    id: 'prop-mod-2',
    title: 'Ri8Click 2-Bed Modular Luxury Prefab Villa',
    tagline: 'Modern 2-Bedroom Eco Smart House (Installed in 30 Days)',
    description: 'Double-unit luxury modular residence manufactured in precision factory setting and assembled on your plot in 30 days. Includes 2 spacious bedrooms, designer lounge, American kitchen with breakfast counter, front wooden deck, and UPVC double glazed facade.',
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
      address: 'Ri8Click Eco-Living Demonstration Yard, Margalla View, Taxila'
    },
    area: 950,
    areaUnit: 'Sq Ft',
    bedrooms: 2,
    bathrooms: 2,
    features: [
      'Factory Built in 3 Weeks / Assembled in 7 Days',
      'Zero Construction Waste & Eco-Friendly',
      'Integrated Solar Roof System Ready',
      'German UPVC Soundproof Windows',
      'Fire-Proof & Earthquake Resistant Grade 9',
      '50+ Year Structural Durability Guarantee'
    ],
    /*images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],*/
    images: [
  'https://www.genspark.ai/api/files/s/W2Z5zFao', // V2124 Double-Decker Stacked Capsule
  'https://www.genspark.ai/api/files/s/Iswmh2Gk', // 2-Story Rooftop Deck Container Villa
  'https://www.genspark.ai/api/files/s/xBNmbfCQ'  // Hex-LED Smart Container House
    ],
    watermark: true,
    agencyId: 'agency-1',
    agentName: 'Ri8Click Modular Specialist',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    agentCompany: 'Ri8Click Prefab & Modular Consortium',
    agentRating: 5.0,
    isFeatured: true,
    viewsCount: 3600,
    savesCount: 310,
    createdAt: '2026-08-26',
    status: 'active'
  },

  // ===================== 5. NEW SOCIETY PROJECTS =====================
  {
    id: 'prop-proj-1',
    title: 'Faisal Hills Commercial Broadway Heights',
    tagline: 'Iconic Mega Shopping & Luxury Apartment Complex',
    description: 'Premier off-plan master development on Faisal Hills Commercial Broadway. Offering commercial shops, food court units, corporate offices, and 1-2 bedroom luxury apartments on a flexible 3-year installment plan.',
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
      block: 'Faisal Hills Commercial Broadway',
      address: 'Main Broadway Plaza Site, Faisal Hills, Taxila'
    },
    area: 350,
    areaUnit: 'Sq Ft',
    features: [
      '3-Year Easy Installment Plan',
      'Guaranteed Rental Returns on Possession',
      'Central Air Conditioning & Atrium',
      'High Speed Lifts & Backup Power',
      'Underground 3-Level Dedicated Parking'
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80'
    ],
    watermark: true,
    agencyId: 'agency-2',
    agentName: 'Chaudhry Bilal',
    agentPhone: '+92 336-5666727',
    agentWhatsApp: '923365666727',
    agentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    agentCompany: 'Faisal Hills Property Advisors',
    agentRating: 4.85,
    isFeatured: true,
    viewsCount: 2980,
    savesCount: 215,
    createdAt: '2026-08-27',
    status: 'active'
  }
];

export const CONSORTIUM_DIVISIONS: ConsortiumDivision[] = [
  {
    id: 'div-realty',
    title: 'Ri8Click Real Estate & Multi-Agent Network',
    shortName: 'Real Estate & Properties',
    tagline: 'Pakistan’s verified property network connecting elite agencies, buyers, and investors.',
    description: 'Empowering multi-agent collaboration with transparent property verification, watermark authentication, digital escrow coordination, and verified listings across Punjab (Taxila, Rawalpindi, Lahore) and Islamabad Capital Territory.',
    badge: 'Core Division (95% Focus)',
    iconName: 'Building2',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    capabilities: [
      'Multi-Agent Verified MLS Listings',
      'Commercial & Corporate Plaza Advisory',
      'Faisal Hills & Taxila Land Acquisition',
      'Property Valuation & ROI Analytics',
      'Watermark Verification System'
    ],
    stats: [
      { label: 'Active Listings', value: '4,500+' },
      { label: 'Verified Agencies', value: '120+' },
      { label: 'Transaction Volume', value: 'PKR 15B+' }
    ],
    contactPerson: 'Director Real Estate Operations',
    contactPhone: '+92 336-5666727',
    contactWhatsApp: '923365666727'
  },
  {
    id: 'div-modular',
    title: 'Ri8Click Readymade Capsule & Modular Prefab Smart Houses',
    shortName: 'Modular Capsule Smart Houses',
    tagline: 'Futuristic luxury living capsules and prefabricated homes deployed in days.',
    description: 'Transforming housing with factory-engineered smart space capsules and modular prefab homes. Aerospace-grade durability, complete IoT smart controls, and turnkey installation on plots, farmhouses, and tourist resorts.',
    badge: 'Innovation Showcase',
    iconName: 'Home',
    image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80',
    capabilities: [
      'Space Capsule Smart Pods (Model X & Z Series)',
      'Prefab Luxury 2 & 3 Bedroom Modular Villas',
      'Eco-Glamping Pods for Tourism & Resorts',
      'Rapid 7 to 30 Day Complete On-Site Deployment',
      '100% Relocatable & Transportable Housing'
    ],
    stats: [
      { label: 'Deploy Time', value: '7-30 Days' },
      { label: 'Earthquake Grade', value: 'Grade 9' },
      { label: 'Smart IoT', value: '100% Integrated' }
    ],
    contactPerson: 'Director Modular Living',
    contactPhone: '+92 336-5666727',
    contactWhatsApp: '923365666727'
  },
  {
    id: 'div-construction',
    title: 'Ri8Click Turnkey Construction & Civil Works',
    shortName: 'Construction & Civil Engineering',
    tagline: 'Engineering excellence for commercial plazas, luxury residences, and infrastructure.',
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
    imageUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=2000&q=85',
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
    description: 'Prestigious commercial plaza directly on DHA Lahore Phase 6 Main Boulevard. 4 commercial retail floors with double basement parking, marble and granite foyer, and high rental demand from banking institutions.',
    price: 'PKR 18.0 Crore',
    location: 'Lahore',
    society: 'DHA Phase 6 Main Boulevard',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85',
    tourRoomsCount: 3,
    isActive: true,
    order: 4,
    features: ['Main Boulevard Frontage', 'Double Basement Parking', 'High Footfall Hub', 'Ready Tenancy'],
    samplePropertyData: {
      title: 'DHA Phase 6 Commercial Plaza',
      category: 'commercial',
      location: { city: 'Lahore', society: 'DHA Phase 1-9 & Prism 9', province: 'Punjab' }
    }
  },
  {
    id: 'slide-5',
    categoryTag: 'Multi Gardens B-17 & Faisal Town',
    badgeColor: 'bg-teal-600 text-white',
    title: 'Multi Gardens B-17 Margalla View Luxury Residence',
    subtitle: 'Sector G Architect-Designed Villa Near C-18 Interchange',
    description: 'Spectacular 1-Kanal modern villa in Multi Gardens B-17 Sector G Islamabad. Featuring direct Margalla views, double-height lobby, landscaped lawn, imported Spanish tiles, and soundproof UPVC fixtures.',
    price: 'PKR 5.25 Crore',
    location: 'Islamabad',
    society: 'Multi Gardens (B-17)',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=85',
    tourRoomsCount: 4,
    isActive: true,
    order: 5,
    features: ['Direct Margalla Hills View', 'C-18 Interchange Access', 'Imported Spanish Tiles', '3D Walkthrough'],
    samplePropertyData: {
      title: 'Modern Villa in Multi Gardens B-17',
      category: 'residential',
      location: { city: 'Islamabad', society: 'Multi Gardens (B-17)', province: 'Islamabad Capital Territory' }
    }
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Faisal Hills Taxila 2026 Price Trends & Development Update: Executive Block & Broadway Breakdown',
    slug: 'faisal-hills-taxila-2026-price-trends-executive-block-development',
    category: 'Market Trends',
    excerpt: 'Comprehensive real estate breakdown of Faisal Hills Taxila across Executive Block, Block A, B, C, and Commercial Broadway with current market rates and future ROI outlook.',
    content: `### Executive Overview: Why Faisal Hills Taxila is Leading North Punjab Real Estate

Faisal Hills Taxila has emerged as one of the most resilient and rapid-growth master-planned communities in the twin cities (Islamabad-Rawalpindi) and Taxila corridor. With direct access from the N-5 Grand Trunk (GT) Road and dedicated connections towards the Margalla Avenue extension, the society provides seamless access to central Islamabad in under 20 minutes.

#### 1. Executive Block: The Premium Residence Zone
- **Price Performance**: 1-Kanal residential plots in Executive Block have appreciated by **18.4%** over the past 12 months, driven by possession handovers and construction boom.
- **Top Amenities**: Underground electrification, landscaped civic parks, sports complex, and unobstructed views of the Margalla Hills.
- **Construction Trends**: Over 450+ designer villas are currently under construction, with high demand for German UPVC double-glazed thermal windows to minimize energy costs.

#### 2. Commercial Broadway: High Rental Yield Opportunities
The Commercial Broadway in Faisal Hills is envisioned as the commercial spine of the region:
- **Plot Dimensions**: 4 Marla, 5.5 Marla, and 8 Marla commercial plots.
- **Rental Projections**: Ground floor retail spaces are yielding between **8.5% to 9.8% annual ROI**, heavily sought after by national retail brands and banking chains.

#### 3. Investment Verdict for Overseas Pakistanis
If you are planning long-term capital gain (2 to 5 years), Faisal Hills Executive Block and Main Boulevard commercial plazas offer unmatched stability with complete RDA approvals.`,
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    authorName: 'Malik Zeeshan',
    authorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    authorRole: 'Senior Property Analyst & Broker',
    publishedAt: '2026-08-28',
    readingTime: '5 min read',
    tags: ['Faisal Hills', 'Taxila', 'Executive Block', 'Property Rates', 'Real Estate Investment'],
    viewsCount: 3420,
    isFeatured: true,
    status: 'published'
  },
  {
    id: 'blog-2',
    title: 'DHA Lahore vs. DHA Islamabad: Where Should Overseas Pakistanis Invest for Maximum Rental Yield?',
    slug: 'dha-lahore-vs-dha-islamabad-overseas-pakistanis-rental-yield',
    category: 'Investment Guides',
    excerpt: 'Detailed comparison between DHA Lahore (Phase 5, 6, 9 Prism) and DHA Islamabad (Phase 2, 4, 5) analyzing capital growth, tenancy demand, and commercial yields.',
    content: `### Comparing Pakistan’s Top Defence Housing Authorities

Both DHA Lahore and DHA Islamabad represent the gold standard of institutional trust, security, and civic infrastructure in Pakistan. However, their investment profiles differ significantly based on your target: capital appreciation or steady rental cash flow.

#### DHA Lahore Key Strengths:
1. **Phase 6 & 8 Commercial Footfall**: Home to Raya Fairways, international dining chains, and premium corporate offices.
2. **High Tenancy Demand**: Rental vacancy in DHA Phase 5 and 6 is under 3%, ensuring swift tenant placement.
3. **Phase 9 Prism Growth**: Ideal for 3-5 year holding with strong infrastructure completion milestones.

#### DHA Islamabad Key Strengths:
1. **Phase 2 Prime Connectivity**: Direct access to Islamabad Expressway and G.T. Road, commanding top rental rates for furnished corporate housing.
2. **Phase 4 & 5 Scenic Topography**: Riverbed and hillside vistas providing luxury residential estates.

#### Comparative Summary Table
| Metric | DHA Lahore (Phase 6) | DHA Islamabad (Phase 2) |
|---|---|---|
| Average 1-Kanal Villa Rate | PKR 7.5 - 11.5 Cr | PKR 6.8 - 10.5 Cr |
| Commercial Rental Yield | 7.8% - 9.2% | 8.0% - 9.5% |
| Infrastructure Quality | Grade A+ | Grade A+ |`,
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    authorName: 'Engr. Haris Farooq',
    authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    authorRole: 'Commercial Portfolio Manager',
    publishedAt: '2026-08-25',
    readingTime: '6 min read',
    tags: ['DHA Lahore', 'DHA Islamabad', 'Overseas Pakistanis', 'Rental Yield', 'Commercial Plazas'],
    viewsCount: 2890,
    isFeatured: true,
    status: 'published'
  },
  {
    id: 'blog-3',
    title: 'Multi Gardens B-17 (MPCHS) Sector G & C-18 Interchange Connectivity: Complete Real Estate Review',
    slug: 'multi-gardens-b17-mpchs-sector-g-c18-interchange-connectivity',
    category: 'Project Updates',
    excerpt: 'How the direct M-1 Motorway C-18 Interchange and Margalla Avenue connectivity have transformed Multi Gardens B-17 into a prime residential haven.',
    content: `### Multi Gardens B-17: The Crown Jewel of MPCHS

Multi Gardens Sector B-17 in Islamabad has witnessed unprecedented residential habitation over the past two years. With the operational C-18 Motorway Interchange and rapid work on the Margalla Avenue link, B-17 has become one of the most accessible sectors in Islamabad.

#### Sector G Highlights
- Located directly at the entrance from the Motorway connector.
- Modern sewerage, wide 80ft to 120ft boulevards, and dedicated commercial centers.
- Fast construction of schools, hospitals, and hypermarkets.

#### Construction Quality Standards
Modern home builders in B-17 are increasingly adopting soundproof acoustic UPVC double glazing to eliminate highway noise while providing thermal efficiency during Islamabad’s extreme summer heat.`,
    coverImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85',
    authorName: 'Chaudhry Bilal',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
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
    authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
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
    authorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
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

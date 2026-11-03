import { AdVibeProject } from '../types';

export const highRiseTowersProjects: AdVibeProject[] = [
  {
    id: 'advibe-citadel7',
    title: 'Citadel7',
    slug: 'citadel7',
    type: 'High-Rise Tower',
    logo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80',
    tagline: 'Islamabad’s Most Prestigious Corporate & Luxury Retail Skyscraper in Blue Area',
    description: 'Citadel 7 is an ultra-modern 20-storey commercial skyscraper developed by Chakor Ventures on Jinnah Avenue in the vibrant heart of Blue Area, Islamabad. Comprising 4 dedicated basement parking levels, 5 storeys of luxury retail atrium showcasing top national and global brands, and 14 floors of corporate office suites with uninterrupted vistas of the Margalla Hills and the federal capital.',
    city: 'Islamabad',
    area: 'Blue Area, Jinnah Avenue',
    address: 'Plot 7, Main Jinnah Avenue, Sector G-7/F-7, Blue Area, Islamabad',
    coordinates: {
      lat: 33.7088,
      lng: 73.0566,
      zoom: 16
    },
    starting_price: 18500000,
    starting_price_formatted: 'PKR 1.85 Crore',
    price_range: 'PKR 1.85 Crore – 14.5 Crore',
    status: 'Under Construction',
    featured: true,
    published: true,
    schedule: {
      startDate: '2021-06-01',
      launchDate: '2021-11-01',
      completionDate: '2026-12-31'
    },
    theme: {
      primaryColor: '#2563eb',
      accentColor: '#f59e0b',
      bgStyle: 'midnight',
      fontHeading: 'Playfair Display',
      fontBody: 'Plus Jakarta Sans',
      buttonStyle: 'rounded-xl',
      overlayOpacity: 0.65,
      animationIntensity: 'dynamic'
    },
    seo: {
      metaTitle: 'Citadel 7 Blue Area Islamabad | Official Chakor Ventures Showcase',
      metaDescription: 'Discover Citadel 7 in Blue Area Islamabad by Chakor Ventures: 20-storey luxury retail and corporate skyscraper on Jinnah Avenue.',
      ogImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      canonicalUrl: 'https://ri8click.com/advibe/citadel7',
      keywords: ['Citadel7', 'Chakor Ventures', 'Blue Area Islamabad', 'Jinnah Avenue', 'Commercial Tower Islamabad', 'Luxury Offices']
    },
    developer: {
      name: 'Chakor Ventures',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80',
      description: 'Chakor Ventures is a pioneering commercial development firm specializing in architectural marvels, smart high-rises, and sustainable retail malls in Pakistan’s major metropolitan commercial districts.',
      foundedYear: 2018,
      completedProjects: 4,
      ongoingProjects: 2,
      rating: 4.93,
      website: 'https://citadel-7.com/',
      phone: '+92 51 111-242-567',
      email: 'sales@citadel-7.com'
    },
    highlights: [
      {
        id: 'c7-hl-1',
        title: 'Prime Blue Area Jinnah Avenue Frontage',
        value: 'Heart of Federal Capital',
        description: 'Positioned on the most coveted commercial boulevard of Pakistan, facing Centaurus and the Margalla Hills.',
        iconName: 'Compass',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'c7-hl-2',
        title: '20 Storeys + 4 Dedicated Basements',
        value: 'Ample Valet Parking',
        description: 'Four full basements dedicated to smart parking accommodating over 600 vehicles with electric charging stations.',
        iconName: 'Car',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'c7-hl-3',
        title: 'High-Speed Capsule & Cargo Elevators',
        value: 'Smart Schindler Lifts',
        description: 'Destination-controlled high-speed elevators ensuring zero wait times for executives and mall shoppers.',
        iconName: 'Cpu',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'c7-hl-4',
        title: 'CDA Approved Commercial Landmark',
        value: '100% Legal Title',
        description: 'Fully authorized by Capital Development Authority with transparent floor-wise registry and sub-leases.',
        iconName: 'ShieldCheck',
        image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80'
      }
    ],
    amenities: [
      {
        id: 'c7-am-1',
        name: 'Grand 5-Storey Retail Atrium',
        category: 'Lifestyle & Leisure',
        description: 'Ultra-luxury air-conditioned shopping atrium hosting premier fashion houses, electronics, and jewelry boutiques.',
        iconName: 'Building2',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'c7-am-2',
        name: 'Executive Business Lounge & Conference Suites',
        category: 'Smart Technology',
        description: 'Fully equipped video-conferencing boardrooms, concierge desk, and high-speed enterprise WiFi connectivity.',
        iconName: 'Cpu',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'c7-am-3',
        name: 'Fine Dining Terraces & Food Court',
        category: 'Lifestyle & Leisure',
        description: 'Panoramic open-air dining decks overlooking the Margalla ridgeline and Faisal Mosque skyline.',
        iconName: 'Coffee',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
      }
    ],
    locationPoints: [
      {
        id: 'c7-loc-1',
        name: 'Metro Bus Station (Ibn-e-Sina / Stock Exchange)',
        category: 'Highway & Access',
        distance: '0.2 km',
        driveTime: '1 min',
        iconName: 'Route'
      },
      {
        id: 'c7-loc-2',
        name: 'The Centaurus Mall & Metro Station',
        category: 'Commercial & Retail',
        distance: '1.2 km',
        driveTime: '3 mins',
        iconName: 'Compass'
      },
      {
        id: 'c7-loc-3',
        name: 'Pakistan Institute of Medical Sciences (PIMS)',
        category: 'Healthcare',
        distance: '1.0 km',
        driveTime: '2 mins',
        iconName: 'Landmark'
      },
      {
        id: 'c7-loc-4',
        name: 'Islamabad Marriott & Diplomatic Enclave',
        category: 'Highway & Access',
        distance: '5.5 km',
        driveTime: '8 mins',
        iconName: 'Route'
      }
    ],
    masterPlan: {
      imageUrl: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1600&q=80',
      legend: [
        { category: 'Retail Podium (Floors 1-5)', color: '#2563eb' },
        { category: 'Corporate Offices (Floors 6-20)', color: '#f59e0b' }
      ],
      hotspots: [
        {
          id: 'c7-hp-1',
          x: 50,
          y: 40,
          title: 'Citadel 7 Blue Area',
          category: 'Commercial Broadway',
          description: '20-storey tower on Jinnah Avenue.',
          status: 'Available'
        }
      ]
    },
    gallery: [
      {
        id: 'c7-med-1',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Exterior',
        caption: 'Architectural render of Citadel 7 glass facade rising on Jinnah Avenue Blue Area.',
        tags: ['Skyscraper', 'Blue Area', 'Facade']
      }
    ],
    videos: [
      {
        id: 'c7-vid-1',
        title: 'Citadel 7 Official Architectural 3D Walkthrough & Project Animation',
        category: 'Project Tour',
        type: 'hosted',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        duration: '2:30',
        description: 'Experience Citadel 7 Blue Area Islamabad: luxury atrium, corporate offices, and Margalla views.'
      }
    ],
    virtualTour: {
      provider: 'custom360',
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
      title: '360° View of Citadel 7 Blue Area Jinnah Avenue Frontage'
    },
    linkedPropertyIds: [],
    pricingTiers: [
      {
        id: 'c7-tier-1',
        unitType: 'Corporate Office Suite (8th Floor)',
        size: '650 Sq Ft',
        totalPrice: 'PKR 2,45,00,000',
        downPayment: 'PKR 49,00,000 (20%)',
        monthlyInstallment: 'PKR 4,10,000 x 36 Months',
        possession: 'Possession on Project Handover',
        features: [
          'Direct Margalla Facing Windows',
          'High Ceiling Glass Curtain Wall',
          'Access to Executive Business Center',
          'High Rental Yield Projection'
        ]
      },
      {
        id: 'c7-tier-2',
        unitType: 'Retail Brand Shop (1st Floor Atrium)',
        size: '420 Sq Ft',
        totalPrice: 'PKR 3,15,00,000',
        downPayment: 'PKR 63,00,000 (20%)',
        monthlyInstallment: 'PKR 5,25,000 x 36 Months',
        possession: 'Ready for Brand Fit-Out',
        features: [
          'Prominent Escalator Frontage',
          'High Daily Footfall Corridor',
          'Central HVAC Integration',
          'Guaranteed Capital Appreciation'
        ]
      }
    ],
    dealerId: 'admin',
    dealerName: 'Chakor Ventures Authorized Corporate Sales',
    dealerPhone: '+92 336-5666727',
    dealerWhatsApp: '923365666727',
    createdAt: '2026-08-10T10:00:00Z',
    updatedAt: '2026-09-02T10:00:00Z',
    viewsCount: 5200,
    sections: [
      {
        id: 'sec-hero',
        type: 'hero',
        title: 'Citadel7 Blue Area Islamabad',
        subtitle: 'The Apex of Corporate Power & Luxury Retail on Jinnah Avenue by Chakor Ventures',
        tagline: '20 Storeys • 4 Basements • CDA Approved Skyscraper',
        badge: 'HIGH-RISE TOWER SHOWCASE',
        isEnabled: true,
        order: 1,
        customSettings: {
          layout: 'fullscreen',
          bgImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
          pinnedScroll: true
        }
      },
      {
        id: 'sec-intro',
        type: 'intro',
        title: 'A New Architectural Benchmark for Islamabad',
        subtitle: 'Engineered for multinationals, luxury retail brands, and visionaries',
        badge: 'CHAKOR VENTURES STATEMENT',
        isEnabled: true,
        order: 2,
        content: {
          quote: 'Citadel 7 embodies the dynamic evolution of Pakistan’s capital: sleek, transparent, technologically supreme, and commercially peerless.',
          paragraphs: [
            'Occupying Plot 7 in Blue Area with dual-access road connectivity, Citadel 7 delivers the most technologically advanced commercial workspace in Islamabad.',
            'Featuring double-glazed thermal acoustic glass, smart elevator zoning, 4-tier basement parking, and premier dining terraces, it establishes a new gold standard.'
          ]
        }
      },
      {
        id: 'sec-highlights',
        type: 'highlights',
        title: 'Engineered for Performance',
        subtitle: 'Key architectural and investment highlights of Citadel 7',
        badge: 'TOWER HIGHLIGHTS',
        isEnabled: true,
        order: 3
      },
      {
        id: 'sec-location',
        type: 'location',
        title: 'Heart of the Capital: Blue Area',
        subtitle: 'Unmatched proximity to government ministries, Centaurus, and transit',
        badge: 'JINNAH AVENUE LOCATION',
        isEnabled: true,
        order: 4
      },
      {
        id: 'sec-pricing',
        type: 'pricing',
        title: 'Office & Retail Investment Plans',
        subtitle: 'Installment structures tailored for corporate buyers and overseas investors',
        badge: 'INVESTMENT TIERS',
        isEnabled: true,
        order: 5
      },
      {
        id: 'sec-enquiry',
        type: 'enquiry',
        title: 'Book a Private Consultation at Citadel7',
        subtitle: 'Inquire regarding floor plans, remaining office units, and payment schedules',
        badge: 'EXCLUSIVE RESERVATION',
        isEnabled: true,
        order: 6
      }
    ]
  },
  {
    id: 'advibe-giga-mall',
    title: 'Giga Mall',
    slug: 'giga-mall',
    type: 'High-Rise Tower',
    logo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80',
    tagline: 'The World Trade Center Islamabad & Pakistan’s Premier Megamall & Skyscraper',
    description: 'Giga Mall and the World Trade Center (WTC) Islamabad is an iconic architectural megastructure developed by the Al Ghurair Giga Group on Main GT Road in DHA Phase 2, Rawat/Islamabad. Spanning over 200 international retail brands, Carrefour hypermarket, Cinepax multiplex, a magnificent food court, the 14-storey WTC Tower, and the soaring 30-storey Giga Mall Extension Tower, it stands as the ultimate shopping and commercial destination.',
    city: 'Rawat / Islamabad',
    area: 'GT Road, DHA Phase II Rawat',
    address: 'Main Grand Trunk (GT) Road, DHA Phase 2, Rawat / Islamabad',
    coordinates: {
      lat: 33.5285,
      lng: 73.1594,
      zoom: 16
    },
    starting_price: 22000000,
    starting_price_formatted: 'PKR 2.2 Crore',
    price_range: 'PKR 2.2 Crore – 25 Crore',
    status: 'Ready to Move',
    featured: true,
    published: true,
    schedule: {
      startDate: '2012-01-10',
      launchDate: '2016-03-23',
      completionDate: '2027-12-31'
    },
    theme: {
      primaryColor: '#c026d3',
      accentColor: '#f59e0b',
      bgStyle: 'luxury_black',
      fontHeading: 'Playfair Display',
      fontBody: 'Plus Jakarta Sans',
      buttonStyle: 'rounded-xl',
      overlayOpacity: 0.65,
      animationIntensity: 'dynamic'
    },
    seo: {
      metaTitle: 'Giga Mall & WTC Islamabad | Official Al Ghurair Giga Showcase',
      metaDescription: 'Experience Giga Mall on GT Road Rawat / Islamabad: World Trade Center, 200+ global brands, Cinepax, and 30-storey Giga Mall Extension Tower.',
      ogImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      canonicalUrl: 'https://ri8click.com/advibe/giga-mall',
      keywords: ['Giga Mall', 'World Trade Center Islamabad', 'Al Ghurair Giga', 'GT Road Rawat', 'DHA Phase 2 Islamabad', 'Giga Mall Extension']
    },
    developer: {
      name: 'Al Ghurair Giga Group',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80',
      description: 'The Al Ghurair Giga Group is an international multi-billion dollar conglomerate with landmark real estate, gold refining, and trade developments across the United Arab Emirates and Pakistan.',
      foundedYear: 1956,
      completedProjects: 22,
      ongoingProjects: 4,
      rating: 4.96,
      website: 'https://thegigamall.com/',
      phone: '+92 51 111-444-222',
      email: 'info@thegigamall.com'
    },
    highlights: [
      {
        id: 'gm-hl-1',
        title: 'World Trade Center (WTC) Islamabad License',
        value: 'Global Prestige',
        description: 'Official member of the World Trade Centers Association (WTCA) New York, connecting Pakistan to 330 WTCs globally.',
        iconName: 'Landmark',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'gm-hl-2',
        title: '200+ Global Brands & Carrefour Hypermarket',
        value: '100,000+ Daily Footfall',
        description: 'Anchored by international retail flagships, Cinepax 3D cinema, Fun City, and a 50+ outlet international food court.',
        iconName: 'Building2',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'gm-hl-3',
        title: 'Soaring 30-Storey Giga Mall Extension',
        value: 'Under Active Construction',
        description: 'Expanding into luxury hotel suites, corporate headquarters, and high-end residential penthouses.',
        iconName: 'Building2',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'gm-hl-4',
        title: 'Main GT Road DHA Phase 2 Ingress',
        value: 'Dual Signal-Free Flyovers',
        description: 'Direct dedicated flyover ramps from N-5 GT Road, Islamabad Expressway, and Rawalpindi Ring Road.',
        iconName: 'Route',
        image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80'
      }
    ],
    amenities: [
      {
        id: 'gm-am-1',
        name: 'Cinepax 3D Multiplex & Entertainment City',
        category: 'Lifestyle & Leisure',
        description: 'Pakistan’s leading cinema destination with laser projection, reclining VIP lounges, and gaming arenas.',
        iconName: 'Tv',
        image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'gm-am-2',
        name: 'Multi-Level Covered Parking for 3,000+ Cars',
        category: 'Security & Infrastructure',
        description: 'Multi-storey intelligent parking management system with automated guidance displays and round-the-clock security.',
        iconName: 'Car',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
      }
    ],
    locationPoints: [
      {
        id: 'gm-loc-1',
        name: 'Grand Trunk (GT) Road Frontage',
        category: 'Highway & Access',
        distance: '0 km',
        driveTime: '0 mins',
        iconName: 'Route'
      },
      {
        id: 'gm-loc-2',
        name: 'Islamabad Expressway (T-Chowk Rawat)',
        category: 'Highway & Access',
        distance: '1.5 km',
        driveTime: '2 mins',
        iconName: 'Route'
      },
      {
        id: 'gm-loc-3',
        name: 'DHA Phase 2 & Bahria Town Phase 7',
        category: 'Commercial & Retail',
        distance: '0.8 km',
        driveTime: '1 min',
        iconName: 'Compass'
      }
    ],
    masterPlan: {
      imageUrl: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1600&q=80',
      legend: [
        { category: 'Giga Mall Mega Atrium', color: '#c026d3' },
        { category: 'World Trade Center Tower', color: '#0284c7' },
        { category: '30-Storey Extension Tower', color: '#f59e0b' }
      ],
      hotspots: [
        {
          id: 'gm-hp-1',
          x: 45,
          y: 40,
          title: 'Giga Mall & WTC',
          category: 'Commercial Broadway',
          description: 'Premier shopping mall and business center on GT Road.',
          status: 'Available'
        }
      ]
    },
    gallery: [
      {
        id: 'gm-med-1',
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Exterior',
        caption: 'Giga Mall and World Trade Center Tower illuminated at night on GT Road Rawat.',
        tags: ['Giga Mall', 'WTC', 'Exterior']
      }
    ],
    videos: [
      {
        id: 'gm-vid-1',
        title: 'Giga Mall & WTC Extension Grand Cinematic Video',
        category: 'Project Tour',
        type: 'hosted',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        duration: '2:40',
        description: 'Visual showcase of Giga Mall retail floors, Carrefour, food street, and the 30-storey Extension tower.'
      }
    ],
    virtualTour: {
      provider: 'custom360',
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
      title: '360° View of Giga Mall Main Entrance and Grand Atrium'
    },
    linkedPropertyIds: [],
    pricingTiers: [
      {
        id: 'gm-tier-1',
        unitType: 'Giga Mall Extension Luxury Hotel Suite',
        size: '520 Sq Ft',
        totalPrice: 'PKR 2,20,00,000',
        downPayment: 'PKR 44,00,000 (20%)',
        monthlyInstallment: 'PKR 3,65,00,000 x 36 Months',
        possession: 'Turnkey Furnished on Delivery',
        features: [
          'Managed by International Hotel Chain',
          'Guaranteed Quarterly Rental Yield',
          'Free Annual Stay Nights for Owners',
          'High ROI Twin City Investment'
        ]
      }
    ],
    dealerId: 'admin',
    dealerName: 'Al Ghurair Giga Official Booking Office',
    dealerPhone: '+92 336-5666727',
    dealerWhatsApp: '923365666727',
    createdAt: '2026-08-12T10:00:00Z',
    updatedAt: '2026-09-02T10:00:00Z',
    viewsCount: 7800,
    sections: [
      {
        id: 'sec-hero',
        type: 'hero',
        title: 'Giga Mall & WTC Islamabad',
        subtitle: 'The Epicenter of Retail, Hospitality & High-Rise Living on GT Road Rawat by Al Ghurair Giga',
        tagline: 'World Trade Center • 200+ Brands • 30-Storey Tower Extension',
        badge: 'ICONIC HIGH-RISE & MEGAMALL',
        isEnabled: true,
        order: 1,
        customSettings: {
          layout: 'fullscreen',
          bgImageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80',
          pinnedScroll: true
        }
      },
      {
        id: 'sec-intro',
        type: 'intro',
        title: 'Pakistan’s Most Iconic Commercial Destination',
        subtitle: 'Where world-class shopping meets international trade',
        badge: 'THE GIGA LEGACY',
        isEnabled: true,
        order: 2,
        content: {
          quote: 'Giga Mall revolutionized retail and commercial living in Pakistan by merging world trade infrastructure with luxury shopping and entertainment.',
          paragraphs: [
            'Ideally located on Main GT Road near DHA Phase 2 Rawat, Giga Mall hosts over 200 global brand outlets, Carrefour, Dine-in food pavilions, and state-of-the-art Cinepax halls.',
            'With the development of the 30-storey Giga Mall Extension Tower, the complex now offers luxury serviced suites and corporate headquarters.'
          ]
        }
      },
      {
        id: 'sec-highlights',
        type: 'highlights',
        title: 'Landmark Features of Giga Mall',
        subtitle: 'Unrivaled footfall, security, and international hospitality standards',
        badge: 'CORE HIGHLIGHTS',
        isEnabled: true,
        order: 3
      },
      {
        id: 'sec-location',
        type: 'location',
        title: 'GT Road & Expressway Gateway',
        subtitle: 'Direct ingress connecting Islamabad, Rawalpindi, and the Grand Trunk corridor',
        badge: 'LOCATION',
        isEnabled: true,
        order: 4
      },
      {
        id: 'sec-pricing',
        type: 'pricing',
        title: 'Extension Tower Investment Opportunities',
        subtitle: 'Hotel suites, corporate floors, and luxury commercial units with proven returns',
        badge: 'INVESTMENT PLANS',
        isEnabled: true,
        order: 5
      },
      {
        id: 'sec-enquiry',
        type: 'enquiry',
        title: 'Book a Unit at Giga Mall Extension',
        subtitle: 'Contact the corporate sales desk for payment schedules and site visits',
        badge: 'DIRECT CONTACT',
        isEnabled: true,
        order: 6
      }
    ]
  },
  {
    id: 'advibe-faisal-jewel',
    title: 'Faisal Jewel',
    slug: 'faisal-jewel',
    type: 'High-Rise Tower',
    logo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80',
    tagline: '27-Storey Architectural Masterpiece with 5-Star Hotel & Luxury Penthouses in Faisal Hills',
    description: 'Faisal Jewel is a signature 27-storey high-rise skyscraper standing proudly at the center of the Executive Block in Faisal Hills, Taxila / Islamabad. Developed by Faisal Town Group and Zedem International (Chaudhry Abdul Majeed), Faisal Jewel combines a 300-bed international 4/5-star hotel, 5 levels of luxury shopping mall, premium corporate offices, and ultra-luxurious residential penthouses overlooking the Margalla Hills.',
    city: 'Taxila / Islamabad Zone',
    area: 'Executive Block, Faisal Hills',
    address: 'Main Boulevard, Executive Block, Faisal Hills, N-5 GT Road, Taxila / Islamabad Border',
    coordinates: {
      lat: 33.7298,
      lng: 72.8291,
      zoom: 16
    },
    starting_price: 16500000,
    starting_price_formatted: 'PKR 1.65 Crore',
    price_range: 'PKR 1.65 Crore – 18 Crore',
    status: 'Under Construction',
    featured: true,
    published: true,
    schedule: {
      startDate: '2022-03-01',
      launchDate: '2022-09-15',
      completionDate: '2027-06-30'
    },
    theme: {
      primaryColor: '#b45309',
      accentColor: '#10b981',
      bgStyle: 'luxury_black',
      fontHeading: 'Playfair Display',
      fontBody: 'Plus Jakarta Sans',
      buttonStyle: 'rounded-xl',
      overlayOpacity: 0.65,
      animationIntensity: 'dynamic'
    },
    seo: {
      metaTitle: 'Faisal Jewel at Faisal Hills | Official Zedem International Showcase',
      metaDescription: 'Discover Faisal Jewel in Faisal Hills Taxila: 27-storey luxury skyscraper, 5-star hotel, shopping mall, and penthouses by Zedem International.',
      ogImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      canonicalUrl: 'https://ri8click.com/advibe/faisal-jewel',
      keywords: ['Faisal Jewel', 'Faisal Hills', 'Zedem International', 'Faisal Town Group', 'Taxila Skyscraper', 'Luxury Hotel Faisal Hills']
    },
    developer: {
      name: 'Zedem International & Faisal Town Group',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80',
      description: 'Headed by Chaudhry Abdul Majeed, Zedem International is the master developer behind Faisal Hills, Faisal Town, and Faisal Jewel, recognized for engineering excellence and timely delivery.',
      foundedYear: 2004,
      completedProjects: 14,
      ongoingProjects: 5,
      rating: 4.94,
      website: 'https://faisaljewel.com.pk/',
      phone: '+92 51 111-555-554',
      email: 'info@faisaljewel.com.pk'
    },
    highlights: [
      {
        id: 'fj-hl-1',
        title: '27-Storey Twin Tower Marvel',
        value: 'Tallest Tower in Taxila Region',
        description: 'Towering 27 floors over Faisal Hills Executive Block with uninterrupted 360-degree Margalla views.',
        iconName: 'Building2',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'fj-hl-2',
        title: 'International 4/5-Star Hotel',
        value: '300 Luxury Rooms & Suites',
        description: 'Featuring world-class banquet halls, executive suites, conference facilities, and international dining.',
        iconName: 'Landmark',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'fj-hl-3',
        title: '5 Floors of Branded Luxury Retail Mall',
        value: 'Flagship Brands & Atrium',
        description: 'High-end retail podium with high-speed glass lifts, central atrium, and open-air rooftop cafes.',
        iconName: 'Compass',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'fj-hl-4',
        title: 'RDA Approved & Fast-Track Construction',
        value: 'Foundations & Structure Poured',
        description: 'Backed by Zedem International’s reputation for swift, uninterrupted structural completion.',
        iconName: 'ShieldCheck',
        image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80'
      }
    ],
    amenities: [
      {
        id: 'fj-am-1',
        name: 'Rooftop Infinity Swimming Pool & Sky Spa',
        category: 'Wellness & Sports',
        description: 'Rooftop temperature-controlled infinity pool offering panoramic sunset views across the Margalla mountain pass.',
        iconName: 'Waves',
        image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'fj-am-2',
        name: '4 Basements of Dedicated Covered Parking',
        category: 'Security & Infrastructure',
        description: 'Multi-level basement garage providing designated parking for hotel guests, shoppers, and penthouse residents.',
        iconName: 'Car',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
      }
    ],
    locationPoints: [
      {
        id: 'fj-loc-1',
        name: 'Faisal Hills 225ft Main Boulevard',
        category: 'Highway & Access',
        distance: '0 km',
        driveTime: '0 mins',
        iconName: 'Route'
      },
      {
        id: 'fj-loc-2',
        name: 'N-5 Grand Trunk Road Entrance',
        category: 'Highway & Access',
        distance: '1.0 km',
        driveTime: '2 mins',
        iconName: 'Route'
      },
      {
        id: 'fj-loc-3',
        name: 'Margalla Avenue Highway to Islamabad',
        category: 'Highway & Access',
        distance: '3.5 km',
        driveTime: '5 mins',
        iconName: 'Compass'
      }
    ],
    masterPlan: {
      imageUrl: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1600&q=80',
      legend: [
        { category: 'Faisal Jewel Hotel & Residences', color: '#b45309' },
        { category: 'Retail Podium', color: '#10b981' }
      ],
      hotspots: [
        {
          id: 'fj-hp-1',
          x: 48,
          y: 42,
          title: 'Faisal Jewel Skyscraper',
          category: 'Commercial Broadway',
          description: '27-storey mixed development in Faisal Hills.',
          status: 'Available'
        }
      ]
    },
    gallery: [
      {
        id: 'fj-med-1',
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Exterior',
        caption: 'Architectural rendering of Faisal Jewel rising 27 storeys in Faisal Hills Executive Block.',
        tags: ['Faisal Jewel', 'Tower', 'Executive Block']
      }
    ],
    videos: [
      {
        id: 'fj-vid-1',
        title: 'Faisal Jewel Official Launch & Architectural Animation',
        category: 'Project Tour',
        type: 'hosted',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        duration: '2:55',
        description: 'Explore Faisal Jewel: 27 floors, international hotel, retail podium, and luxury penthouses.'
      }
    ],
    virtualTour: {
      provider: 'custom360',
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
      title: '360° View of Faisal Jewel 27-Storey Structure & Margalla Pass'
    },
    linkedPropertyIds: [],
    pricingTiers: [
      {
        id: 'fj-tier-1',
        unitType: '1-Bedroom Luxury Serviced Apartment',
        size: '580 Sq Ft',
        totalPrice: 'PKR 1,65,00,000',
        downPayment: 'PKR 33,00,000 (20%)',
        monthlyInstallment: 'PKR 2,75,000 x 36 Months',
        possession: 'Possession on Structural Completion',
        features: [
          'Direct Margalla Foothill Vistas',
          'Hotel Management & Housekeeping Access',
          'Imported Fixtures & Marble Finishes',
          'High Rental Yield Guarantee'
        ]
      },
      {
        id: 'fj-tier-2',
        unitType: 'Retail Mall Shop (Ground Floor Podium)',
        size: '350 Sq Ft',
        totalPrice: 'PKR 2,80,00,000',
        downPayment: 'PKR 56,00,000 (20%)',
        monthlyInstallment: 'PKR 4,65,000 x 36 Months',
        possession: 'Handover for Commercial Fitout',
        features: [
          'High Visibility Main Atrium Frontage',
          'Central Air Conditioning & Escalator Access',
          'Direct Boulevard Entrance',
          'Prime Capital Growth Opportunity'
        ]
      }
    ],
    dealerId: 'admin',
    dealerName: 'Zedem Corporate Head Office',
    dealerPhone: '+92 336-5666727',
    dealerWhatsApp: '923365666727',
    createdAt: '2026-08-14T10:00:00Z',
    updatedAt: '2026-09-02T10:00:00Z',
    viewsCount: 6890,
    sections: [
      {
        id: 'sec-hero',
        type: 'hero',
        title: 'Faisal Jewel at Faisal Hills',
        subtitle: 'The 27-Storey Architectural Masterpiece in the Executive Block by Zedem International',
        tagline: '5-Star Hotel • Luxury Mall • Margalla Panoramas',
        badge: 'ICONIC TOWER SHOWCASE',
        isEnabled: true,
        order: 1,
        customSettings: {
          layout: 'fullscreen',
          bgImageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80',
          pinnedScroll: true
        }
      },
      {
        id: 'sec-intro',
        type: 'intro',
        title: 'A New Height of Elegance in Taxila',
        subtitle: 'The grand crown jewel of Faisal Hills Executive Block',
        badge: 'ZEDEM ARCHITECTURAL MARVEL',
        isEnabled: true,
        order: 2,
        content: {
          quote: 'Faisal Jewel was created to bring international 5-star hotel luxury and world-class retail right to the doorstep of Faisal Hills residents.',
          paragraphs: [
            'Rising 27 storeys above the 225ft boulevard of Faisal Hills, Faisal Jewel redefines the skyline of the entire Taxila-Islamabad region.',
            'Featuring luxury branded suites, executive offices, an opulent 5-level retail mall, and an infinity rooftop pool overlooking the Margalla pass, it is an investment of generational value.'
          ]
        }
      },
      {
        id: 'sec-highlights',
        type: 'highlights',
        title: 'Highlights of Faisal Jewel',
        subtitle: 'Unrivaled height, five-star hospitality, and luxury retail',
        badge: 'TOWER HIGHLIGHTS',
        isEnabled: true,
        order: 3
      },
      {
        id: 'sec-location',
        type: 'location',
        title: 'Heart of Faisal Hills Executive Block',
        subtitle: 'Positioned on the 225-foot boulevard with fast links to GT Road and Margalla Avenue',
        badge: 'LOCATION',
        isEnabled: true,
        order: 4
      },
      {
        id: 'sec-pricing',
        type: 'pricing',
        title: 'Apartments & Commercial Investment Plans',
        subtitle: 'Easy installment tiers with guaranteed value appreciation',
        badge: 'PAYMENT PLANS',
        isEnabled: true,
        order: 5
      },
      {
        id: 'sec-enquiry',
        type: 'enquiry',
        title: 'Book a Unit at Faisal Jewel',
        subtitle: 'Consult directly with Zedem International authorized representatives',
        badge: 'PRIORITY RESERVATIONS',
        isEnabled: true,
        order: 6
      }
    ]
  },
  {
    id: 'advibe-j7-emporium',
    title: 'J7 Emporium',
    slug: 'j7-emporium',
    type: 'High-Rise Tower',
    logo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80',
    tagline: 'Magnificent 30-Storey Mega High-Rise with Pakistan’s First Skywalk in B-17 Islamabad',
    description: 'J7 Emporium is a monumental 30-storey mixed-use mega high-rise development spread over 46 Kanals in Block C, Multi Gardens Sector B-17, Islamabad. Developed by J7 Group, J7 Emporium integrates a world-class shopping mall, Radisson Blu serviced hotel suites, tech corporate offices, a rooftop revolving restaurant, and Pakistan’s first transparent glass Skywalk offering spectacular panoramic views of the Margalla Hills.',
    city: 'Islamabad Zone II',
    area: 'Block C, Sector B-17 Multi Gardens',
    address: 'Main Boulevard, Block C, Multi Gardens Sector B-17, Islamabad',
    coordinates: {
      lat: 33.6848,
      lng: 72.8428,
      zoom: 16
    },
    starting_price: 19500000,
    starting_price_formatted: 'PKR 1.95 Crore',
    price_range: 'PKR 1.95 Crore – 22 Crore',
    status: 'Under Construction',
    featured: true,
    published: true,
    schedule: {
      startDate: '2021-01-15',
      launchDate: '2021-08-01',
      completionDate: '2027-12-31'
    },
    theme: {
      primaryColor: '#7c3aed',
      accentColor: '#f59e0b',
      bgStyle: 'midnight',
      fontHeading: 'Playfair Display',
      fontBody: 'Plus Jakarta Sans',
      buttonStyle: 'rounded-xl',
      overlayOpacity: 0.65,
      animationIntensity: 'dynamic'
    },
    seo: {
      metaTitle: 'J7 Emporium B-17 Islamabad | Official J7 Group Showcase',
      metaDescription: 'Discover J7 Emporium in Multi Gardens B-17 Islamabad: 30 storeys, 46 Kanals, Pakistan’s first Skywalk, Radisson Blu hotel suites, and mega shopping mall.',
      ogImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      canonicalUrl: 'https://ri8click.com/advibe/j7-emporium',
      keywords: ['J7 Emporium', 'B-17 Islamabad', 'Multi Gardens', 'J7 Group', 'Skywalk Pakistan', 'Radisson Blu Islamabad', 'High-Rise Tower']
    },
    developer: {
      name: 'J7 Group of Companies',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80',
      description: 'J7 Group is a premier real estate development enterprise celebrated for iconic megastructures including J7 Emporium, J7 One Mall, J7 Global, and Signature Hotels in Pakistan.',
      foundedYear: 2017,
      completedProjects: 6,
      ongoingProjects: 4,
      rating: 4.91,
      website: 'https://j7emporium.com/',
      phone: '+92 51 111-574-768',
      email: 'info@j7emporium.com'
    },
    highlights: [
      {
        id: 'j7-hl-1',
        title: 'Spread Over 46 Kanals of Land',
        value: 'Monumental Footprint',
        description: 'One of the largest land parcels ever dedicated to a private high-rise tower in Islamabad.',
        iconName: 'Building2',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'j7-hl-2',
        title: 'Pakistan’s First Transparent Glass Skywalk',
        value: 'Awe-Inspiring Wonder',
        description: 'Cantilevered glass skywalk extending hundreds of feet in the air overlooking the Margalla Hills and M-1 Motorway.',
        iconName: 'Compass',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'j7-hl-3',
        title: 'Radisson Blu Serviced Hotel Suites',
        value: 'Global Hospitality Brand',
        description: 'International 5-star standard serviced hotel suites managed by a globally acclaimed hotel franchise.',
        iconName: 'Landmark',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'j7-hl-4',
        title: 'Direct Access via M-1 Interchange & GT Road',
        value: 'Prime Block C B-17',
        description: 'Positioned at the main commercial nerve of Sector B-17 with seamless transit to Islamabad Airport and Zero Point.',
        iconName: 'Route',
        image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80'
      }
    ],
    amenities: [
      {
        id: 'j7-am-1',
        name: 'Rooftop Revolving Fine Dining Restaurant',
        category: 'Lifestyle & Leisure',
        description: '360-degree revolving rooftop restaurant offering international cuisine and panoramic night views of the capital.',
        iconName: 'Coffee',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'j7-am-2',
        name: 'Multi-Storey Mega Shopping Mall & Atrium',
        category: 'Lifestyle & Leisure',
        description: 'Expansive retail mall hosting international fashion brands, jewelry streets, food courts, and entertainment zones.',
        iconName: 'Building2',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
      }
    ],
    locationPoints: [
      {
        id: 'j7-loc-1',
        name: 'Multi Gardens B-17 Block C Main Boulevard',
        category: 'Highway & Access',
        distance: '0 km',
        driveTime: '0 mins',
        iconName: 'Route'
      },
      {
        id: 'j7-loc-2',
        name: 'Dedicated M-1 Motorway Interchange',
        category: 'Highway & Access',
        distance: '1.5 km',
        driveTime: '2 mins',
        iconName: 'Route'
      },
      {
        id: 'j7-loc-3',
        name: 'Margalla Avenue Link to Downtown Islamabad',
        category: 'Highway & Access',
        distance: '2.5 km',
        driveTime: '4 mins',
        iconName: 'Compass'
      }
    ],
    masterPlan: {
      imageUrl: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1600&q=80',
      legend: [
        { category: 'Mega Mall Podium', color: '#7c3aed' },
        { category: 'Radisson Blu Suites & Skywalk', color: '#f59e0b' }
      ],
      hotspots: [
        {
          id: 'j7-hp-1',
          x: 52,
          y: 38,
          title: 'J7 Emporium Tower',
          category: 'Commercial Broadway',
          description: '30-storey mega tower with glass skywalk in B-17.',
          status: 'Available'
        }
      ]
    },
    gallery: [
      {
        id: 'j7-med-1',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Exterior',
        caption: 'Architectural rendering of J7 Emporium rising 30 storeys over Multi Gardens B-17.',
        tags: ['J7 Emporium', 'B-17', 'Skywalk']
      }
    ],
    videos: [
      {
        id: 'j7-vid-1',
        title: 'J7 Emporium Official 3D Walkthrough & Skywalk Animation',
        category: 'Project Tour',
        type: 'hosted',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        duration: '3:20',
        description: 'Experience J7 Emporium: 46 Kanals footprint, 30 storeys, Radisson Blu suites, and the glass Skywalk.'
      }
    ],
    virtualTour: {
      provider: 'custom360',
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
      title: '360° View of J7 Emporium Skywalk and Margalla Hills'
    },
    linkedPropertyIds: [],
    pricingTiers: [
      {
        id: 'j7-tier-1',
        unitType: 'Radisson Blu Serviced Hotel Suite (14th Floor)',
        size: '510 Sq Ft',
        totalPrice: 'PKR 1,95,00,000',
        downPayment: 'PKR 39,00,000 (20%)',
        monthlyInstallment: 'PKR 3,25,000 x 36 Months',
        possession: 'Turnkey Fitted Handover',
        features: [
          'Managed under Radisson Blu Standards',
          'Guaranteed Rental Income Contract',
          'Access to Rooftop Revolving Restaurant',
          'Prime Capital Growth Asset'
        ]
      },
      {
        id: 'j7-tier-2',
        unitType: 'Mega Mall Retail Shop (Ground Floor)',
        size: '380 Sq Ft',
        totalPrice: 'PKR 2,90,00,000',
        downPayment: 'PKR 58,00,000 (20%)',
        monthlyInstallment: 'PKR 4,80,000 x 36 Months',
        possession: 'Ready for Brand Interior Fit-out',
        features: [
          'High Footfall Boulevard Facing',
          'Central HVAC & Double Escalator Ingress',
          'Dedicated Customer Parking Bays',
          'Direct Access to Mall Atrium'
        ]
      }
    ],
    dealerId: 'admin',
    dealerName: 'J7 Group Official Corporate Sales Lounge',
    dealerPhone: '+92 336-5666727',
    dealerWhatsApp: '923365666727',
    createdAt: '2026-08-16T10:00:00Z',
    updatedAt: '2026-09-02T10:00:00Z',
    viewsCount: 7150,
    sections: [
      {
        id: 'sec-hero',
        type: 'hero',
        title: 'J7 Emporium at B-17 Islamabad',
        subtitle: 'The 30-Storey Wonder Featuring Pakistan’s First Skywalk by J7 Group',
        tagline: '46 Kanals • 30 Storeys • Radisson Blu Suites • Skywalk',
        badge: 'ICONIC MEGA HIGH-RISE',
        isEnabled: true,
        order: 1,
        customSettings: {
          layout: 'fullscreen',
          bgImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
          pinnedScroll: true
        }
      },
      {
        id: 'sec-intro',
        type: 'intro',
        title: 'A New Dimension of Sky-High Prestige',
        subtitle: 'Spread across 46 Kanals in Multi Gardens Sector B-17',
        badge: 'J7 GROUP ENGINEERING EXCELLENCE',
        isEnabled: true,
        order: 2,
        content: {
          quote: 'J7 Emporium was designed to bring the world’s most audacious architectural elements—including our glass Skywalk and international 5-star suites—to Islamabad Zone II.',
          paragraphs: [
            'Rising 30 storeys above Block C in Multi Gardens Sector B-17, J7 Emporium combines ultra-luxury retail shopping, corporate technology suites, and Radisson Blu serviced hotel suites.',
            'With panoramic Margalla mountain views, a rooftop revolving restaurant, and rapid transit via the M-1 Motorway interchange, it is a landmark high-rise development.'
          ]
        }
      },
      {
        id: 'sec-highlights',
        type: 'highlights',
        title: 'Architectural Highlights of J7 Emporium',
        subtitle: 'The wonders that set this 30-storey megastructure apart',
        badge: 'KEY HIGHLIGHTS',
        isEnabled: true,
        order: 3
      },
      {
        id: 'sec-location',
        type: 'location',
        title: 'Strategic Positioning in Sector B-17',
        subtitle: 'Direct M-1 Motorway and Margalla Avenue connectivity',
        badge: 'LOCATION & ACCESSIBILITY',
        isEnabled: true,
        order: 4
      },
      {
        id: 'sec-pricing',
        type: 'pricing',
        title: 'Hotel Suites & Commercial Shop Plans',
        subtitle: 'Flexible installment plans with lucrative guaranteed rental returns',
        badge: 'INVESTMENT SCHEDULE',
        isEnabled: true,
        order: 5
      },
      {
        id: 'sec-enquiry',
        type: 'enquiry',
        title: 'Reserve a Unit at J7 Emporium',
        subtitle: 'Speak with our certified corporate consultants for personalized inventory guidance',
        badge: 'DIRECT INQUIRY',
        isEnabled: true,
        order: 6
      }
    ]
  },
  {
    id: 'advibe-icon-mall-towers',
    title: 'Icon Mall & Towers',
    slug: 'icon-mall-towers-lahore',
    type: 'High-Rise Tower',
    logo: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=200&q=80',
    tagline: 'Dubai-Inspired 17-Storey Twin Tower Mega Landmark in Bahria Town Lahore',
    description: 'Icon Mall & Towers is a magnificent 22-Kanal mixed-use development by Athar Associates, marketed by Sapphire Properties. Positioned strategically at the SL3 Ring Road Interchange in Bahria Town Lahore, this architectural landmark features a 4-storey commercial mega shopping mall, Pakistan’s largest 12.5-Kanal open-to-sky central courtyard, Royal Swiss International 5-Star Hotel in Tower 2, and 10 storeys of luxury furnished residential apartments.',
    city: 'Lahore',
    area: 'Bahria Town Lahore (SL3 Ring Road Interchange)',
    address: 'Main Boulevard, Ring Road SL3 Interchange, Bahria Town, Lahore, Punjab',
    coordinates: {
      lat: 31.3650,
      lng: 74.1850,
      zoom: 16
    },
    starting_price: 3500000,
    starting_price_formatted: 'PKR 35 Lakh',
    price_range: 'PKR 35 Lakh – 2.85 Crore',
    status: 'Booking Open',
    featured: true,
    published: true,
    schedule: {
      startDate: '2023-01-15',
      launchDate: '2023-08-01',
      completionDate: '2027-12-31'
    },
    theme: {
      primaryColor: '#0284c7',
      accentColor: '#f59e0b',
      bgStyle: 'midnight',
      fontHeading: 'Playfair Display',
      fontBody: 'Plus Jakarta Sans',
      buttonStyle: 'rounded-xl',
      overlayOpacity: 0.65,
      animationIntensity: 'dynamic'
    },
    seo: {
      metaTitle: 'Icon Mall & Towers Bahria Town Lahore | Sapphire Properties Showcase',
      metaDescription: 'Discover Icon Mall & Towers in Bahria Town Lahore: 17-storey twin-tower development featuring mega mall, 12.5-kanal courtyard, and Royal Swiss hotel apartments.',
      ogImage: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1400&q=80',
      canonicalUrl: 'https://ri8click.com/advibe/icon-mall-towers-lahore',
      keywords: ['Icon Mall & Towers', 'Bahria Town Lahore', 'Sapphire Properties', 'Athar Associates', 'Lahore Commercial Shops', 'Royal Swiss Hotel Lahore']
    },
    developer: {
      name: 'Athar Associates & Sapphire Properties',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80',
      description: 'Pioneers in high-rise mixed-use luxury construction, Athar Associates and Sapphire Properties bring Dubai-inspired urban master developments, high-end retail, and 5-star international hospitality to Pakistan.',
      foundedYear: 2015,
      completedProjects: 8,
      ongoingProjects: 3,
      rating: 4.98,
      website: 'https://sapphireproperties.com.pk/icon-mall-towers/',
      phone: '+92 336-5666727',
      email: 'info@sapphireproperties.com.pk'
    },
    highlights: [
      {
        id: 'hl-icon-1',
        title: 'Pakistan’s Largest Open Courtyard',
        value: '12.5 Kanals Open-Air Space',
        description: 'Spectacular lifestyle courtyard offering alfresco dining, musical water fountains, and outdoor retail promenades.',
        iconName: 'Building2',
        image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hl-icon-2',
        title: 'Lahore’s 4th Largest Mega Mall',
        value: '4 Dedicated Retail Floors',
        description: 'Over 150 domestic and international brands, anchor grocery supermarkets, food court, and designer retail outlets.',
        iconName: 'ShoppingBag',
        image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hl-icon-3',
        title: 'Direct Ring Road SL3 Connectivity',
        value: 'Prime Interchange Location',
        description: 'Direct entry via Bahria Town Interchange, connecting to Allama Iqbal International Airport in 20 minutes.',
        iconName: 'Compass',
        image: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hl-icon-4',
        title: 'Royal Swiss 5-Star Hotel in Tower 2',
        value: 'International Swiss Hospitality',
        description: 'Luxury hotel-serviced apartments with 24/7 room service, valet parking, and executive boardroom access.',
        iconName: 'Sparkles',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      }
    ],
    amenities: [
      {
        id: 'am-icon-1',
        name: 'Rooftop Infinity Pool & Sky Club',
        category: 'Lifestyle & Leisure',
        description: 'Temperature-controlled rooftop swimming pool overlooking Bahria Town skyline.',
        iconName: 'Waves'
      },
      {
        id: 'am-icon-2',
        name: '450+ Underground Basement Parking',
        category: 'Security & Infrastructure',
        description: 'Two dedicated basement levels with intelligent valet and automated parking guidance.',
        iconName: 'Car'
      },
      {
        id: 'am-icon-3',
        name: '12 High-Speed Elevators & 10 Escalators',
        category: 'Smart Technology',
        description: 'Imported panoramic glass elevators and cargo lifts ensuring zero waiting times.',
        iconName: 'ArrowUpCircle'
      },
      {
        id: 'am-icon-4',
        name: '100% Uninterrupted Power Backup',
        category: 'Security & Infrastructure',
        description: 'Heavy-duty industrial Caterpillar standby generators with automatic transfer switches.',
        iconName: 'Zap'
      },
      {
        id: 'am-icon-5',
        name: '24/7 Smart Security & Biometric Access',
        category: 'Security & Infrastructure',
        description: 'Comprehensive CCTV surveillance, smart access cards, and dedicated security guards.',
        iconName: 'ShieldCheck'
      },
      {
        id: 'am-icon-6',
        name: 'Designer Health Club, Gym & Spa',
        category: 'Wellness & Sports',
        description: 'State-of-the-art TechnoGym equipment, sauna, steam rooms, and personal fitness trainers.',
        iconName: 'Activity'
      }
    ],
    locationPoints: [
      {
        id: 'lp-icon-1',
        name: 'Lahore Ring Road SL3 Interchange',
        category: 'Highway & Access',
        distance: 'Directly Adjacent (0 km)',
        driveTime: '1 Min',
        iconName: 'Compass'
      },
      {
        id: 'lp-icon-2',
        name: 'Bahria Grand Jamia Mosque',
        category: 'Natural Landmark',
        distance: '2.5 km',
        driveTime: '4 Mins',
        iconName: 'Landmark'
      },
      {
        id: 'lp-icon-3',
        name: 'Allama Iqbal International Airport',
        category: 'Airport',
        distance: '28 km via Ring Road',
        driveTime: '22 Mins',
        iconName: 'Plane'
      },
      {
        id: 'lp-icon-4',
        name: 'Bahria International Hospital',
        category: 'Healthcare',
        distance: '3 km',
        driveTime: '5 Mins',
        iconName: 'HeartPulse'
      }
    ],
    masterPlan: {
      imageUrl: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1400&q=80',
      legend: [
        { category: 'Commercial Mega Mall (Basement - 3rd Floor)', color: '#0284c7' },
        { category: 'Royal Swiss 5-Star Hotel (Tower 2)', color: '#f59e0b' },
        { category: 'Luxury Furnished Apartments (Tower 1)', color: '#10b981' },
        { category: '12.5-Kanal Open Courtyard Promenade', color: '#8b5cf6' }
      ],
      hotspots: [
        {
          id: 'hs-icon-1',
          x: 48,
          y: 52,
          title: '12.5-Kanal Central Courtyard',
          category: 'Civic Center',
          description: 'Open-air lifestyle courtyard with musical water fountain and outdoor cafes.',
          status: 'Available'
        },
        {
          id: 'hs-icon-2',
          x: 35,
          y: 38,
          title: 'Mega Shopping Mall (150+ Brands)',
          category: 'Commercial Broadway',
          description: 'Four storeys of anchor retail, international food court, and branded boutiques.',
          status: 'Booking Fast'
        },
        {
          id: 'hs-icon-3',
          x: 65,
          y: 32,
          title: 'Royal Swiss 5-Star Hotel Suites',
          category: 'Residential Block',
          description: 'International hotel suites with managed guaranteed rental yield.',
          status: 'Available'
        }
      ]
    },
    gallery: [
      {
        id: 'gal-icon-1',
        url: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Exterior',
        caption: 'Architectural twin-tower elevation of Icon Mall & Towers at Bahria Town Ring Road SL3.',
        tags: ['Icon Mall', 'Exterior', 'Twin Towers']
      },
      {
        id: 'gal-icon-2',
        url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Amenities',
        caption: 'Pakistan’s largest 12.5-Kanal open courtyard lifestyle promenade.',
        tags: ['Courtyard', 'Promenade', 'Dining']
      },
      {
        id: 'gal-icon-3',
        url: 'https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Interior',
        caption: 'Mega shopping mall multi-level atrium with high-speed glass elevators.',
        tags: ['Mall', 'Retail', 'Atrium']
      }
    ],
    videos: [
      {
        id: 'vid-icon-1',
        title: 'Icon Mall & Towers 3D Walkthrough & Project Animation',
        category: 'Project Tour',
        type: 'hosted',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=800&q=80',
        duration: '2:45',
        description: 'Explore Icon Mall & Towers: 22 Kanals footprint, 17 storeys, Royal Swiss Hotel, and the 12.5-Kanal central courtyard.'
      }
    ],
    virtualTour: {
      provider: 'custom360',
      url: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=2000&q=80',
      title: 'Icon Mall & Towers 3D Twin-Tower & Courtyard Walkthrough',
      autoRun: true,
      rotationSpeed: 1.2,
      dayNightMode: true,
      instructions: 'Drag to look around in 360°. Use day/night toggle and hotspot markers to explore the courtyard and towers.',
      scenes: [
        {
          id: 'sc-icon-1',
          name: '12.5-Kanal Central Courtyard',
          imageUrl: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1600&q=80',
          nightImageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80',
          category: 'Courtyard',
          description: 'Pakistan’s largest open courtyard with dancing fountains and outdoor promenades.'
        },
        {
          id: 'sc-icon-2',
          name: 'Mega Mall Grand Atrium',
          imageUrl: 'https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=1600&q=80',
          nightImageUrl: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1600&q=80',
          category: 'Retail Mall',
          description: 'Four storeys of world-class shopping with 150+ international and local brand outlets.'
        },
        {
          id: 'sc-icon-3',
          name: 'Royal Swiss 5-Star Hotel Lobby',
          imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
          nightImageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80',
          category: 'Hospitality',
          description: 'Luxury hotel reception and serviced executive suites in Tower 2.'
        }
      ]
    },
    linkedPropertyIds: ['prop-icon-mall-comm-lahore', 'prop-icon-mall-res-lahore'],
    pricingTiers: [
      {
        id: 'tier-icon-1',
        unitType: 'Ground Floor Commercial Retail Shop',
        size: '220 Sq Ft',
        totalPrice: 'PKR 88,00,000',
        downPayment: 'PKR 17,60,000 (20%)',
        monthlyInstallment: 'PKR 1,17,333 x 60 Months',
        possession: 'Ready for Fit-out (2027)',
        features: [
          'High Footfall Boulevard Facing',
          'Immediate Proximity to Atrium Escalators',
          'Dedicated Basement Parking Allowance',
          '5-Year Easy Installment Schedule'
        ]
      },
      {
        id: 'tier-icon-2',
        unitType: '1-Bedroom Luxury Furnished Apartment',
        size: '550 Sq Ft',
        totalPrice: 'PKR 75,00,000',
        downPayment: 'PKR 15,00,000 (20%)',
        monthlyInstallment: 'PKR 1,00,000 x 60 Months',
        possession: 'Turnkey Fitted Handover',
        features: [
          'Panoramic Courtyard & Skyline Views',
          'Access to Rooftop Infinity Pool & Sky Lounge',
          '100% Standby Power & 24/7 Security',
          'High Capital Appreciation & Rental Yield'
        ]
      }
    ],
    dealerId: 'user-agency-sapphire',
    dealerName: 'Sapphire Properties Advisory',
    dealerPhone: '+92 336-5666727',
    dealerWhatsApp: '923365666727',
    createdAt: '2026-08-20T10:00:00Z',
    updatedAt: '2026-09-04T10:00:00Z',
    viewsCount: 8420,
    sections: [
      {
        id: 'sec-hero',
        type: 'hero',
        title: 'Icon Mall & Towers',
        subtitle: '22-Kanal Dubai-Inspired Twin-Tower Landmark in Bahria Town Lahore',
        badge: 'ATHAR ASSOCIATES & SAPPHIRE PROPERTIES',
        isEnabled: true,
        order: 1,
        customSettings: {
          layout: 'fullscreen',
          bgImageUrl: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1920&q=80',
          pinnedScroll: true
        }
      },
      {
        id: 'sec-intro',
        type: 'intro',
        title: 'The Apex of Retail & Hospitality in Lahore',
        subtitle: 'Strategically anchored at the Bahria Town Ring Road SL3 Interchange',
        badge: 'FLAGSHIP MEGAPROJECT',
        isEnabled: true,
        order: 2,
        content: {
          quote: 'Icon Mall & Towers reimagines urban mixed-use living with Pakistan’s largest 12.5-Kanal open-air lifestyle courtyard and Swiss 5-star hotel hospitality.',
          paragraphs: [
            'Spanning over 22 Kanals of land with a 17-storey twin-tower elevation, Icon Mall & Towers is a transformative development in Lahore. The first four floors house Lahore’s 4th largest mega shopping mall with 150+ international and national brand outlets.',
            'The upper 10 storeys host luxury furnished residential apartments and Royal Swiss Hotel suites with panoramic views of Bahria Town, rooftop infinity pools, and 5-year installment plans starting at just 1% monthly.'
          ]
        }
      },
      {
        id: 'sec-highlights',
        type: 'highlights',
        title: 'Iconic Features of the Twin Towers',
        subtitle: 'World-class amenities crafted for discerning investors and residents',
        badge: 'KEY HIGHLIGHTS',
        isEnabled: true,
        order: 3
      },
      {
        id: 'sec-location',
        type: 'location',
        title: 'Prime Bahria Town Lahore Location',
        subtitle: 'Direct connectivity to Lahore Ring Road SL3 Interchange, Grand Jamia Mosque, and Safari Park',
        badge: 'STRATEGIC LOCATION',
        isEnabled: true,
        order: 4
      },
      {
        id: 'sec-pricing',
        type: 'pricing',
        title: 'Commercial Shops & Luxury Apartment Plans',
        subtitle: 'Pre-launch booking starting from PKR 5 Lakh with easy 5-year installment schedules',
        badge: 'INVESTMENT SCHEDULE',
        isEnabled: true,
        order: 5
      },
      {
        id: 'sec-enquiry',
        type: 'enquiry',
        title: 'Reserve a Unit at Icon Mall & Towers',
        subtitle: 'Connect with Sapphire Properties authorized advisors for inventory and floor plans',
        badge: 'DIRECT INQUIRY',
        isEnabled: true,
        order: 6
      }
    ]
  }
];

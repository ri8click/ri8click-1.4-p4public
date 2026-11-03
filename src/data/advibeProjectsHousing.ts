import { AdVibeProject } from '../types';

export const housingSocietiesProjects: AdVibeProject[] = [
  {
    id: 'advibe-faisal-hills',
    title: 'Faisal Hills',
    slug: 'faisal-hills',
    type: 'Housing Society',
    logo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80',
    tagline: 'A Prestigious Living Destination by Zedem International on GT Road Taxila',
    description: 'Faisal Hills is a premier master-planned housing society developed by Zedem International (Chaudhry Abdul Majeed) on the main N-5 GT Road, nestled in the scenic foothills of the Margalla Hills. Boasting a grand 225-foot wide Main Boulevard, RDA approval, direct connectivity to Margalla Avenue, and world-class educational and healthcare facilities, Faisal Hills offers blocks A, B, C, D, and the prestigious Executive Block.',
    city: 'Taxila / Islamabad Zone',
    area: 'N-5 GT Road, Margalla Foothills',
    address: 'Main Grand Trunk (GT) Road, Near MPCHS B-17, Taxila / Islamabad Border',
    coordinates: {
      lat: 33.7295,
      lng: 72.8286,
      zoom: 15
    },
    starting_price: 3800000,
    starting_price_formatted: 'PKR 38 Lakhs',
    price_range: 'PKR 38 Lakhs – 3.8 Crore',
    status: 'Booking Open',
    featured: true,
    published: true,
    schedule: {
      startDate: '2016-04-10',
      launchDate: '2016-07-01',
      completionDate: '2027-12-31'
    },
    theme: {
      primaryColor: '#059669',
      accentColor: '#d97706',
      bgStyle: 'midnight',
      fontHeading: 'Playfair Display',
      fontBody: 'Plus Jakarta Sans',
      buttonStyle: 'rounded-xl',
      overlayOpacity: 0.6,
      animationIntensity: 'dynamic'
    },
    seo: {
      metaTitle: 'Faisal Hills Taxila | Official Zedem International Showcase',
      metaDescription: 'Explore Faisal Hills on GT Road Taxila by Zedem International: 225ft Boulevard, Executive Block, Margalla vistas, RDA approved housing society.',
      ogImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      canonicalUrl: 'https://ri8click.com/advibe/faisal-hills',
      keywords: ['Faisal Hills', 'Zedem International', 'Faisal Town Group', 'Taxila GT Road', 'Margalla Avenue', 'Executive Block']
    },
    developer: {
      name: 'Zedem International (Faisal Town Group)',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80',
      description: 'Headed by Chaudhry Abdul Majeed, Zedem International is one of Pakistan’s most reputable and rapid-delivery real estate conglomerates, renowned for Faisal Town, Faisal Hills, Faisal Residencia, and Faisal Jewel.',
      foundedYear: 2004,
      completedProjects: 14,
      ongoingProjects: 5,
      rating: 4.9,
      website: 'https://faisaltowngroup.com/',
      phone: '+92 51 111-555-554',
      email: 'info@faisaltowngroup.com'
    },
    highlights: [
      {
        id: 'fh-hl-1',
        title: '225-Foot Main Boulevard',
        value: 'Grand Entry Access',
        description: 'Spectacular 225ft wide dual-carriageway direct from main N-5 GT Road with landscaped green belts and LED lighting.',
        iconName: 'Compass',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'fh-hl-2',
        title: 'Margalla Panoramic Views',
        value: 'Natural Scenic Foothills',
        description: 'Breathtaking 360-degree mountain backdrops providing a serene, pollution-free living environment.',
        iconName: 'Mountain',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'fh-hl-3',
        title: 'RDA Approved & Clear NOC',
        value: '100% Legal Title',
        description: 'Approved master plan with rapid balloting, immediate on-ground possessions, and active house construction.',
        iconName: 'ShieldCheck',
        image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'fh-hl-4',
        title: 'Home to Faisal Jewel Tower',
        value: '27-Storey Iconic Landmark',
        description: 'Executive Block houses the 27-storey Faisal Jewel luxury hotel and retail skyscraper.',
        iconName: 'Building2',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
      }
    ],
    amenities: [
      {
        id: 'fh-am-1',
        name: 'Grand Jamia Mosque',
        category: 'Lifestyle & Leisure',
        description: 'Exquisite central mosque modeled after Turkish architecture with prayer halls accommodating over 4,000 worshippers.',
        iconName: 'Landmark',
        image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'fh-am-2',
        name: 'Underground Electrification & Utilities',
        category: 'Security & Infrastructure',
        description: 'Unobstructed modern skyline with underground power cabling, Sui gas pipelines, and continuous water filtration plants.',
        iconName: 'Cpu',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'fh-am-3',
        name: 'Faisal Hills Sports Complex & Cricket Ground',
        category: 'Wellness & Sports',
        description: 'Full-size cricket arena, football pitch, tennis courts, and fitness gymnasium for active families.',
        iconName: 'Waves',
        image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'fh-am-4',
        name: '24/7 Gated Security & Rapid Response Patrols',
        category: 'Security & Infrastructure',
        description: 'RFID automated boom barriers, CCTV surveillance control room, and motorized armed mobile patrols.',
        iconName: 'Shield',
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'fh-am-5',
        name: 'Margalla Botanical Parks & Lakes',
        category: 'Wellness & Sports',
        description: 'Family theme parks with lush jogging tracks, children play arenas, and scenic water fountains.',
        iconName: 'Trees',
        image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'fh-am-6',
        name: 'Roots Millennium & City School Campuses',
        category: 'Lifestyle & Leisure',
        description: 'Reputable international schooling systems established directly within the sector blocks.',
        iconName: 'GraduationCap',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
      }
    ],
    locationPoints: [
      {
        id: 'fh-loc-1',
        name: 'Direct Frontage on N-5 GT Road',
        category: 'Highway & Access',
        distance: '0 km',
        driveTime: '0 mins',
        iconName: 'Route'
      },
      {
        id: 'fh-loc-2',
        name: 'Margalla Avenue Connection to Islamabad',
        category: 'Highway & Access',
        distance: '3.5 km',
        driveTime: '5 mins',
        iconName: 'Route'
      },
      {
        id: 'fh-loc-3',
        name: 'MPCHS Multi Gardens Sector B-17',
        category: 'Highway & Access',
        distance: '2.0 km',
        driveTime: '3 mins',
        iconName: 'Compass'
      },
      {
        id: 'fh-loc-4',
        name: 'Taxila Heavy Mechanical Complex & Cantt',
        category: 'Natural Landmark',
        distance: '4.5 km',
        driveTime: '6 mins',
        iconName: 'Landmark'
      },
      {
        id: 'fh-loc-5',
        name: 'Islamabad International Airport',
        category: 'Airport',
        distance: '18 km',
        driveTime: '20 mins',
        iconName: 'Plane'
      }
    ],
    masterPlan: {
      imageUrl: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1600&q=80',
      legend: [
        { category: 'Executive Block & Faisal Jewel', color: '#059669' },
        { category: 'Block A & Central Jamia Mosque', color: '#0284c7' },
        { category: 'Commercial Broadway', color: '#f59e0b' }
      ],
      hotspots: [
        {
          id: 'fh-hp-1',
          x: 45,
          y: 35,
          title: 'Faisal Jewel 27-Storey Tower',
          category: 'Commercial Broadway',
          description: 'Luxury hotel, shopping mall and penthouses in Executive Block.',
          status: 'Available'
        },
        {
          id: 'fh-hp-2',
          x: 65,
          y: 50,
          title: 'Block A Prime Residential',
          category: 'Residential Block',
          description: '10 Marla and 1 Kanal plots ready for construction.',
          status: 'Booking Fast'
        }
      ]
    },
    gallery: [
      {
        id: 'fh-med-1',
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Exterior',
        caption: 'Panoramic view of Faisal Hills 225ft Boulevard leading towards Margalla Hills.',
        tags: ['Boulevard', 'Entrance', 'GT Road']
      },
      {
        id: 'fh-med-2',
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Aerial Drone',
        caption: 'Aerial drone overview of Block A and Executive Block development.',
        tags: ['Aerial', 'Drone', 'Blocks']
      },
      {
        id: 'fh-med-3',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Interior',
        caption: 'Model Designer Villa constructed in Block A of Faisal Hills.',
        tags: ['Villa', 'Residential', 'Luxury']
      },
      {
        id: 'fh-med-4',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Exterior',
        caption: 'Commercial civic center and retail arcade along the central avenue.',
        tags: ['Commercial', 'Retail', 'Shops']
      }
    ],
    videos: [
      {
        id: 'fh-vid-1',
        title: 'Faisal Hills Official Development Tour & Ground Reality',
        category: 'Project Tour',
        type: 'hosted',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        duration: '3:15',
        description: 'Complete walkthrough of Faisal Hills Taxila showing on-ground possessions, roads, and Executive Block.'
      }
    ],
    virtualTour: {
      provider: 'custom360',
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
      title: '360° View of Faisal Hills 225ft Boulevard & Margalla Panorama'
    },
    linkedPropertyIds: [],
    pricingTiers: [
      {
        id: 'fh-tier-1',
        unitType: '5 Marla Residential Plot (Executive Block)',
        size: '125 Sq Yds (25 x 45)',
        totalPrice: 'PKR 38,00,000',
        downPayment: 'PKR 7,50,000',
        monthlyInstallment: 'PKR 65,000 x 36 Months',
        possession: 'Immediate Possession on Clear Dues',
        features: [
          'Underground Utilities Installed',
          'Near Main Boulevard & Commercial Market',
          'Direct Margalla Mountain Views',
          'RDA Approved Sub-division'
        ]
      },
      {
        id: 'fh-tier-2',
        unitType: '10 Marla Luxury Residential Plot (Block A)',
        size: '250 Sq Yds (35 x 65)',
        totalPrice: 'PKR 72,00,000',
        downPayment: 'PKR 14,00,000',
        monthlyInstallment: 'PKR 1,20,000 x 36 Months',
        possession: 'On-Ground Balloted Plot',
        features: [
          'Walking Distance to Central Park',
          'Wide 50ft Sector Road Access',
          'Ready for Immediate Construction',
          'Water Filtration Plant Connected'
        ]
      },
      {
        id: 'fh-tier-3',
        unitType: '1 Kanal Premium Residential Plot (Executive Block)',
        size: '500 Sq Yds (50 x 90)',
        totalPrice: 'PKR 1,45,00,000',
        downPayment: 'PKR 30,00,000',
        monthlyInstallment: 'PKR 2,40,000 x 36 Months',
        possession: 'Ready for Elite Villa Construction',
        features: [
          'Corner / Boulevard Options Available',
          'Facing Margalla Mountain Range',
          'Adjacent to Faisal Jewel Tower',
          'Guaranteed Capital Appreciation'
        ]
      }
    ],
    dealerId: 'admin',
    dealerName: 'Zedem Certified Authorized Sales Desk',
    dealerPhone: '+92 336-5666727',
    dealerWhatsApp: '923365666727',
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-09-02T10:00:00Z',
    viewsCount: 6120,
    sections: [
      {
        id: 'sec-hero',
        type: 'hero',
        title: 'Faisal Hills Taxila',
        subtitle: 'The Majestic Living Jewel of the Margalla Foothills by Zedem International',
        tagline: '225-Foot Boulevard • RDA Approved • Executive Block',
        badge: 'OFFICIAL HOUSING SOCIETY SHOWCASE',
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
        title: 'An Address of Grandeur & Natural Serenity',
        subtitle: 'Spanning thousands of Kanals with rapid infrastructural delivery',
        badge: 'THE ZEDEM TRADITION',
        isEnabled: true,
        order: 2,
        content: {
          quote: 'Faisal Hills was envisioned to combine pristine natural landscapes with urban engineering excellence, delivering unmatched security and rapid return on investment.',
          paragraphs: [
            'Located conveniently on the historic N-5 GT Road next to MPCHS B-17 and directly linked to Islamabad via Margalla Avenue, Faisal Hills provides an unparalleled suburban sanctuary for discerning families.',
            'With five vibrant sectors (Blocks A, B, C, D, and the Executive Block) and the landmark 27-storey Faisal Jewel rising at its heart, it stands as the pinnacle of modern property development in the Taxila-Islamabad zone.'
          ]
        }
      },
      {
        id: 'sec-highlights',
        type: 'highlights',
        title: 'Key Pillars of Faisal Hills',
        subtitle: 'Why thousands of overseas and local investors choose Zedem International',
        badge: 'PROJECT HIGHLIGHTS',
        isEnabled: true,
        order: 3
      },
      {
        id: 'sec-stats',
        type: 'stats',
        title: 'Faisal Hills at a Glance',
        subtitle: 'Proven milestones in real estate development',
        badge: 'INFRASTRUCTURE DATA',
        isEnabled: true,
        order: 4,
        content: [
          { label: 'Main Boulevard Width', value: '225 Ft', sub: 'Signal-free direct GT Road access' },
          { label: 'Master Plan Approval', value: '100% RDA', sub: 'Fully clear legal credentials' },
          { label: 'Sectors / Blocks', value: '5 Blocks', sub: 'Executive, A, B, C, and D' },
          { label: 'Underground Power Grid', value: 'Complete', sub: 'Modern clean skyline' },
          { label: 'Drive to Islamabad via Margalla Ave', value: '15 Mins', sub: 'Direct expressway corridor' }
        ]
      },
      {
        id: 'sec-location',
        type: 'location',
        title: 'Strategic Geographic Coordinates',
        subtitle: 'Directly linked to GT Road, Margalla Avenue, and Islamabad Zone II',
        badge: 'PRIME CONNECTIVITY',
        isEnabled: true,
        order: 5
      },
      {
        id: 'sec-amenities',
        type: 'amenities',
        title: 'Signature Lifestyle Amenities',
        subtitle: 'World-class community facilities designed for generational living',
        badge: 'AMENITIES',
        isEnabled: true,
        order: 6
      },
      {
        id: 'sec-pricing',
        type: 'pricing',
        title: 'Plot Categories & Investment Tiers',
        subtitle: 'Competitive residential & commercial units with high growth potential',
        badge: 'PAYMENT PLANS',
        isEnabled: true,
        order: 7
      },
      {
        id: 'sec-enquiry',
        type: 'enquiry',
        title: 'Connect with Certified Zedem Consultants',
        subtitle: 'Get certified inventory details and schedule a priority site tour',
        badge: 'DIRECT BOOKING',
        isEnabled: true,
        order: 8
      }
    ]
  },
  {
    id: 'advibe-multigarden-b17',
    title: 'Multigarden B17',
    slug: 'multigarden-b17',
    type: 'Housing Society',
    logo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80',
    tagline: 'Master-Planned Sector Living with Direct Motorway Interchange in Islamabad Zone II',
    description: 'Multi Gardens B-17 is a flagship cooperative housing project developed by the prestigious Multi Professionals Cooperative Housing Society (MPCHS) in Sector B-17, Islamabad Zone II. Spread across Blocks A through G, Multi Gardens features a dedicated direct interchange on the Islamabad-Peshawar Motorway (M-1), direct access to GT Road (N-5), CDA-approved planning, lush central parks, commercial avenues, and the iconic J7 Emporium high-rise tower.',
    city: 'Islamabad Zone II',
    area: 'Sector B-17, Islamabad',
    address: 'Sector B-17 Multi Gardens, Between GT Road (N-5) & M-1 Motorway, Islamabad',
    coordinates: {
      lat: 33.6844,
      lng: 72.8422,
      zoom: 15
    },
    starting_price: 4200000,
    starting_price_formatted: 'PKR 42 Lakhs',
    price_range: 'PKR 42 Lakhs – 4.5 Crore',
    status: 'Ready to Move',
    featured: true,
    published: true,
    schedule: {
      startDate: '2004-05-15',
      launchDate: '2005-01-01',
      completionDate: '2026-12-31'
    },
    theme: {
      primaryColor: '#0284c7',
      accentColor: '#10b981',
      bgStyle: 'slate',
      fontHeading: 'Playfair Display',
      fontBody: 'Plus Jakarta Sans',
      buttonStyle: 'rounded-xl',
      overlayOpacity: 0.65,
      animationIntensity: 'dynamic'
    },
    seo: {
      metaTitle: 'Multi Gardens B-17 Islamabad | Official MPCHS Showcase',
      metaDescription: 'Discover Multi Gardens Sector B-17 Islamabad by MPCHS: Direct M-1 Motorway interchange, Margalla Avenue link, CDA approved housing society.',
      ogImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      canonicalUrl: 'https://ri8click.com/advibe/multigarden-b17',
      keywords: ['Multigarden B17', 'MPCHS Islamabad', 'Sector B-17', 'M-1 Motorway Interchange', 'Margalla Avenue', 'J7 Emporium']
    },
    developer: {
      name: 'MPCHS (Multi Professionals Cooperative Housing Society)',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80',
      description: 'MPCHS is celebrated as one of Pakistan’s most reliable cooperative housing developers, established to deliver high-quality urban residential schemes including Islamabad E-11, F-17 Tele Gardens, and B-17 Multi Gardens.',
      foundedYear: 1988,
      completedProjects: 8,
      ongoingProjects: 3,
      rating: 4.88,
      website: 'https://multigardensb17.com/',
      phone: '+92 51 228-5511',
      email: 'info@multigardensb17.com'
    },
    highlights: [
      {
        id: 'mg-hl-1',
        title: 'Dedicated M-1 Motorway Interchange',
        value: 'Direct Expressway Gate',
        description: 'Multi Gardens boasts its own approved direct flyover interchange on the M-1 Motorway connecting to Islamabad and Peshawar.',
        iconName: 'Route',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'mg-hl-2',
        title: 'CDA Approved Master Plan',
        value: 'Sector B-17 Islamabad',
        description: 'Complete Capital Development Authority NOC approvals across residential and commercial sectors.',
        iconName: 'ShieldCheck',
        image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'mg-hl-3',
        title: 'Margalla Avenue Connectivity',
        value: '15 Mins to Centaurus',
        description: 'Swift direct commute to downtown Islamabad via the newly operational Margalla Avenue expressway.',
        iconName: 'Compass',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'mg-hl-4',
        title: 'Vibrant Established Community',
        value: '15,000+ Families Living',
        description: 'Fully inhabited with operational commercial supermarkets, medical clinics, schools, and banks.',
        iconName: 'Building2',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
      }
    ],
    amenities: [
      {
        id: 'mg-am-1',
        name: 'Central Lake & Amusement Park',
        category: 'Lifestyle & Leisure',
        description: 'Scenic recreational water lake with pedal boating, jogging tracks, and open-air food kiosks.',
        iconName: 'Waves',
        image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'mg-am-2',
        name: 'Sector Commercial Hubs & Bank Avenues',
        category: 'Security & Infrastructure',
        description: 'Multi-storey commercial shopping plazas hosting top fashion brands, banks, and corporate offices.',
        iconName: 'Building2',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'mg-am-3',
        name: '24/7 Security & CCTV Control',
        category: 'Security & Infrastructure',
        description: 'Round-the-clock physical security patrols, barrier gates at all sector entrances, and central surveillance.',
        iconName: 'Shield',
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'mg-am-4',
        name: 'Underground Gas, Power & Clean Water',
        category: 'Security & Infrastructure',
        description: 'Comprehensive utility layout with uninterrupted Sui gas supply, dedicated electric transformers, and water filtration.',
        iconName: 'Cpu',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
      }
    ],
    locationPoints: [
      {
        id: 'mg-loc-1',
        name: 'Direct M-1 Motorway Interchange',
        category: 'Highway & Access',
        distance: '0 km',
        driveTime: '0 mins',
        iconName: 'Route'
      },
      {
        id: 'mg-loc-2',
        name: 'N-5 Grand Trunk Road Gate',
        category: 'Highway & Access',
        distance: '1.2 km',
        driveTime: '2 mins',
        iconName: 'Route'
      },
      {
        id: 'mg-loc-3',
        name: 'Margalla Avenue Highway',
        category: 'Highway & Access',
        distance: '2.5 km',
        driveTime: '4 mins',
        iconName: 'Compass'
      },
      {
        id: 'mg-loc-4',
        name: 'Islamabad International Airport',
        category: 'Airport',
        distance: '16 km',
        driveTime: '18 mins',
        iconName: 'Plane'
      }
    ],
    masterPlan: {
      imageUrl: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1600&q=80',
      legend: [
        { category: 'Blocks A through G', color: '#0284c7' },
        { category: 'Commercial Broadway & J7 Emporium', color: '#7c3aed' },
        { category: 'Central Lake & Green Spine', color: '#10b981' }
      ],
      hotspots: [
        {
          id: 'mg-hp-1',
          x: 50,
          y: 40,
          title: 'J7 Emporium Mega High-Rise',
          category: 'Commercial Broadway',
          description: '30-storey luxury retail and Radisson Blu hotel suites.',
          status: 'Under Development'
        }
      ]
    },
    gallery: [
      {
        id: 'mg-med-1',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Exterior',
        caption: 'Multi Gardens B-17 Main Commercial Boulevard and Sector C.',
        tags: ['Boulevard', 'Sector B-17', 'Commercial']
      },
      {
        id: 'mg-med-2',
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Exterior',
        caption: 'Central roundabout and landscaped greenery in Sector B-17.',
        tags: ['Landscape', 'Park', 'Community']
      }
    ],
    videos: [
      {
        id: 'mg-vid-1',
        title: 'Multi Gardens Sector B-17 Drone Walkthrough & Sector Review',
        category: 'Project Tour',
        type: 'hosted',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        duration: '2:50',
        description: 'Overview of Sector B-17 blocks A, B, C, D, E, F, and G, showing houses, schools, and markets.'
      }
    ],
    virtualTour: {
      provider: 'custom360',
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
      title: '360° View of Multi Gardens Sector B-17 Central Park & Lake'
    },
    linkedPropertyIds: [],
    pricingTiers: [
      {
        id: 'mg-tier-1',
        unitType: '5 Marla Residential Plot (Block F / G)',
        size: '125 Sq Yds (25 x 45)',
        totalPrice: 'PKR 42,00,000',
        downPayment: 'Ready Cash Transfer',
        monthlyInstallment: 'Lump-sum / Resale Transfer',
        possession: 'Immediate Possession Available',
        features: [
          'Immediate Registry & Transfer via MPCHS',
          'Sui Gas & Electric Meters Approved',
          'Close to Sector Commercial Area',
          'CDA Layout Approved'
        ]
      },
      {
        id: 'mg-tier-2',
        unitType: '10 Marla Constructed Double-Storey Villa (Block C)',
        size: '250 Sq Yds',
        totalPrice: 'PKR 2,40,00,000',
        downPayment: 'Ready Possession',
        monthlyInstallment: 'Custom Bank / Owner Terms',
        possession: 'Ready to Move In Today',
        features: [
          '5 Master Bedrooms with Attached Baths',
          'Italian Kitchen & UPVC Double Glazed Windows',
          '2-Car Secure Porch',
          'Walking distance to Central Mosque'
        ]
      }
    ],
    dealerId: 'admin',
    dealerName: 'MPCHS Authorized Registered Agents',
    dealerPhone: '+92 336-5666727',
    dealerWhatsApp: '923365666727',
    createdAt: '2026-08-05T10:00:00Z',
    updatedAt: '2026-09-02T10:00:00Z',
    viewsCount: 5430,
    sections: [
      {
        id: 'sec-hero',
        type: 'hero',
        title: 'Multigarden B17 Islamabad',
        subtitle: 'Capital Living Masterpiece with Direct M-1 Motorway Gateway by MPCHS',
        tagline: 'CDA Approved • Direct Interchange • Prime Sector B-17',
        badge: 'OFFICIAL HOUSING SOCIETY SHOWCASE',
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
        title: 'Urban Elegance Meets Motorway Convenience',
        subtitle: 'The premier cooperative housing society in Islamabad Zone II',
        badge: 'MPCHS EXCELLENCE',
        isEnabled: true,
        order: 2,
        content: {
          quote: 'Multi Gardens B-17 has fulfilled the aspirations of thousands of families who sought peaceful, high-standard community living with instant access to the capital.',
          paragraphs: [
            'Strategically flanked between the ancient Grand Trunk Road and the M-1 Motorway, Sector B-17 Multi Gardens offers the most seamless connectivity in the twin cities.',
            'With fully energized sector blocks, flourishing commercial zones, private schools, and major skyscraper projects like J7 Emporium, Multi Gardens stands as a mature, appreciating asset.'
          ]
        }
      },
      {
        id: 'sec-highlights',
        type: 'highlights',
        title: 'Core Highlights of Multi Gardens',
        subtitle: 'Unrivaled infrastructure and proven delivery record',
        badge: 'WHY B-17 MULTI GARDENS',
        isEnabled: true,
        order: 3
      },
      {
        id: 'sec-location',
        type: 'location',
        title: 'Key Proximity Milestones',
        subtitle: 'Exceptional travel times across the capital territory',
        badge: 'LOCATION',
        isEnabled: true,
        order: 4
      },
      {
        id: 'sec-pricing',
        type: 'pricing',
        title: 'Investment Opportunities',
        subtitle: 'Transparent market rates with clear title transfers',
        badge: 'PRICING',
        isEnabled: true,
        order: 5
      },
      {
        id: 'sec-enquiry',
        type: 'enquiry',
        title: 'Connect with Multi Gardens Specialists',
        subtitle: 'Inquire regarding verified plots, villas, and commercial spaces',
        badge: 'BOOK A CONSULTATION',
        isEnabled: true,
        order: 6
      }
    ]
  },
  {
    id: 'advibe-faisal-town',
    title: 'Faisal Town',
    slug: 'faisal-town',
    type: 'Housing Society',
    logo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80',
    tagline: 'Exquisite Modern Architecture & Gated Security on Fateh Jang Road Islamabad',
    description: 'Faisal Town (Sector F-18 Islamabad) is a flagship masterpiece developed by Zedem International on Main Fateh Jang Road, right beside the M-1 Motorway Toll Plaza and 5 minutes from the New Islamabad International Airport. Featuring Blocks A, B, and C, iconic architecture, Meinhardt-inspired master planning, the acclaimed Glow Park, and rapid possession delivery, Faisal Town is a landmark residential and commercial hub.',
    city: 'Islamabad Zone II',
    area: 'Sector F-18, Fateh Jang Road',
    address: 'Main Fateh Jang Road, Adjacent M-1 Motorway Toll Plaza, Sector F-18, Islamabad',
    coordinates: {
      lat: 33.6215,
      lng: 72.8621,
      zoom: 15
    },
    starting_price: 4800000,
    starting_price_formatted: 'PKR 48 Lakhs',
    price_range: 'PKR 48 Lakhs – 5.2 Crore',
    status: 'Ready to Move',
    featured: true,
    published: true,
    schedule: {
      startDate: '2014-03-01',
      launchDate: '2014-06-01',
      completionDate: '2025-12-31'
    },
    theme: {
      primaryColor: '#0d9488',
      accentColor: '#f59e0b',
      bgStyle: 'midnight',
      fontHeading: 'Playfair Display',
      fontBody: 'Plus Jakarta Sans',
      buttonStyle: 'rounded-xl',
      overlayOpacity: 0.65,
      animationIntensity: 'dynamic'
    },
    seo: {
      metaTitle: 'Faisal Town Islamabad | Official Zedem International Showcase',
      metaDescription: 'Explore Faisal Town Sector F-18 Islamabad by Zedem International: Glow Park, Airport connectivity, RDA approved plots and luxury villas.',
      ogImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      canonicalUrl: 'https://ri8click.com/advibe/faisal-town',
      keywords: ['Faisal Town', 'Zedem International', 'Sector F-18 Islamabad', 'Fateh Jang Road', 'Islamabad Airport', 'Glow Park']
    },
    developer: {
      name: 'Zedem International (Chaudhry Abdul Majeed)',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80',
      description: 'Pioneered by Chaudhry Abdul Majeed, Zedem International has established unmatched credibility for delivering high-spec real estate developments ahead of scheduled deadlines with 100% legal compliance.',
      foundedYear: 2004,
      completedProjects: 14,
      ongoingProjects: 5,
      rating: 4.92,
      website: 'https://faisaltowngroup.com/',
      phone: '+92 51 111-555-554',
      email: 'info@faisaltowngroup.com'
    },
    highlights: [
      {
        id: 'ft-hl-1',
        title: '5 Mins from New Islamabad Airport',
        value: 'Supreme Aviation Hub Access',
        description: 'Direct signal-free connectivity to Islamabad International Airport via dedicated airport link road.',
        iconName: 'Plane',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'ft-hl-2',
        title: 'RDA Approved & Immediate Possession',
        value: 'Ready for Home Construction',
        description: 'Blocks A and B boast hundreds of completed luxury homes with fully populated family communities.',
        iconName: 'ShieldCheck',
        image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'ft-hl-3',
        title: 'Faisal Glow Park & Theme Arenas',
        value: 'Iconic Nighttime Landmark',
        description: 'World-class luminescent theme park, musical fountains, food street, and open-air recreational spaces.',
        iconName: 'Sparkles',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'ft-hl-4',
        title: 'CPEC & Motorway Intersection',
        value: 'M-1 / M-2 Junction',
        description: 'Positioned right beside the Fateh Jang interchange offering instant logistics and twin-city transit.',
        iconName: 'Compass',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
      }
    ],
    amenities: [
      {
        id: 'ft-am-1',
        name: 'Central Jamia Mosque & Islamic Library',
        category: 'Lifestyle & Leisure',
        description: 'Central community mosque with air-conditioned halls and landscaped courtyard gardens.',
        iconName: 'Landmark',
        image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'ft-am-2',
        name: 'Underground Electrification & Fiber Optic Network',
        category: 'Security & Infrastructure',
        description: 'Modern subterranean infrastructure ensuring zero hanging wires and high-speed FTTH internet.',
        iconName: 'Cpu',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'ft-am-3',
        name: 'Commercial Civic Center & Faisal Heights',
        category: 'Lifestyle & Leisure',
        description: 'Commercial plazas featuring banks, pharmacies, supermarkets, and corporate offices.',
        iconName: 'Building2',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
      }
    ],
    locationPoints: [
      {
        id: 'ft-loc-1',
        name: 'Fateh Jang Road & M-1 Motorway Toll Plaza',
        category: 'Highway & Access',
        distance: '0.5 km',
        driveTime: '1 min',
        iconName: 'Route'
      },
      {
        id: 'ft-loc-2',
        name: 'Islamabad International Airport',
        category: 'Airport',
        distance: '6 km',
        driveTime: '6 mins',
        iconName: 'Plane'
      },
      {
        id: 'ft-loc-3',
        name: 'Kashmir Highway / Srinagar Highway',
        category: 'Highway & Access',
        distance: '10 km',
        driveTime: '10 mins',
        iconName: 'Route'
      }
    ],
    masterPlan: {
      imageUrl: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1600&q=80',
      legend: [
        { category: 'Blocks A & B (Completed)', color: '#0d9488' },
        { category: 'Block C & Faisal Glow Park', color: '#f59e0b' }
      ],
      hotspots: [
        {
          id: 'ft-hp-1',
          x: 40,
          y: 45,
          title: 'Faisal Glow Park',
          category: 'Park / Green Spine',
          description: 'Luminescent theme park, dancing fountains, and family leisure arenas.',
          status: 'Available'
        }
      ]
    },
    gallery: [
      {
        id: 'ft-med-1',
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Exterior',
        caption: 'Faisal Town Main Boulevard Gate on Fateh Jang Road.',
        tags: ['Entrance', 'Boulevard', 'Gate']
      }
    ],
    videos: [
      {
        id: 'ft-vid-1',
        title: 'Faisal Town F-18 Islamabad Ground Drone Tour',
        category: 'Project Tour',
        type: 'hosted',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        duration: '3:05',
        description: 'Visual update on Block A, B, and C along with Glow Park and newly completed villas.'
      }
    ],
    virtualTour: {
      provider: 'custom360',
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
      title: '360° View of Faisal Town Entrance Gate and Glow Park'
    },
    linkedPropertyIds: [],
    pricingTiers: [
      {
        id: 'ft-tier-1',
        unitType: '5.5 Marla Residential Plot (Block B)',
        size: '138 Sq Yds (25 x 50)',
        totalPrice: 'PKR 48,00,000',
        downPayment: 'Ready Cash Transfer',
        monthlyInstallment: 'Lump-sum / Resale Transfer',
        possession: 'Immediate Construction Possession',
        features: [
          'Immediate Registry Transfer via Zedem',
          'Sui Gas & Electric Meter Enabled',
          'Near Sector Market & Park',
          'RDA Approved Sub-division'
        ]
      },
      {
        id: 'ft-tier-2',
        unitType: '10 Marla Luxury Villa (Block A)',
        size: '250 Sq Yds',
        totalPrice: 'PKR 2,65,00,000',
        downPayment: 'Ready Possession',
        monthlyInstallment: 'Custom Bank / Owner Terms',
        possession: 'Ready to Move',
        features: [
          '5 Bedrooms with Attached Modern Baths',
          'Imported Porcelain Tiles & Granite Finishes',
          'Servant Quarter with Separate Access',
          'Close to Faisal Glow Park'
        ]
      }
    ],
    dealerId: 'admin',
    dealerName: 'Zedem Corporate Headquarters',
    dealerPhone: '+92 336-5666727',
    dealerWhatsApp: '923365666727',
    createdAt: '2026-08-08T10:00:00Z',
    updatedAt: '2026-09-02T10:00:00Z',
    viewsCount: 4980,
    sections: [
      {
        id: 'sec-hero',
        type: 'hero',
        title: 'Faisal Town Islamabad',
        subtitle: 'The Premier Aviation Corridor Housing Society in Sector F-18 by Zedem International',
        tagline: '5 Mins from Airport • RDA Approved • Faisal Glow Park',
        badge: 'OFFICIAL HOUSING SOCIETY SHOWCASE',
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
        title: 'Airport Proximity Meets Architectural Perfection',
        subtitle: 'One of the twin cities’ most rapidly developed gated communities',
        badge: 'THE FAISAL TOWN SUCCESS STORY',
        isEnabled: true,
        order: 2,
        content: {
          quote: 'Faisal Town stands as testament to Zedem’s promise: delivering world-class living standards on schedule with unmatched property value growth.',
          paragraphs: [
            'Strategically located at the junction of the M-1 Motorway and Fateh Jang Road in Sector F-18 Islamabad, Faisal Town provides unparalleled convenience for airline executives, business entrepreneurs, and overseas Pakistanis.',
            'Featuring iconic parks such as Faisal Glow Park, modern sports arenas, underground civic infrastructure, and high-end commercial plazas, Faisal Town has emerged as a premier residential address.'
          ]
        }
      },
      {
        id: 'sec-highlights',
        type: 'highlights',
        title: 'Pillars of Excellence in Faisal Town',
        subtitle: 'Built for family security, luxury living, and sustained asset appreciation',
        badge: 'KEY HIGHLIGHTS',
        isEnabled: true,
        order: 3
      },
      {
        id: 'sec-location',
        type: 'location',
        title: 'Geographic Superiority & Travel Times',
        subtitle: 'Effortless access to the motorway network and aviation hub',
        badge: 'LOCATION & CONNECTIVITY',
        isEnabled: true,
        order: 4
      },
      {
        id: 'sec-pricing',
        type: 'pricing',
        title: 'Verified Plot & Villa Inventory',
        subtitle: 'Ready possession plots and designer constructed homes',
        badge: 'PRICING & UNITS',
        isEnabled: true,
        order: 5
      },
      {
        id: 'sec-enquiry',
        type: 'enquiry',
        title: 'Consult with Official Faisal Town Representatives',
        subtitle: 'Receive up-to-date ledgers, balloting updates, and arrange visits',
        badge: 'DIRECT INQUIRY',
        isEnabled: true,
        order: 6
      }
    ]
  }
];

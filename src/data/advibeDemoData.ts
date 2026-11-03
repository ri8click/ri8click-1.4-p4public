import { AdVibeProject, AdVibeLead } from '../types';
import { housingSocietiesProjects } from './advibeProjectsHousing';
import { highRiseTowersProjects } from './advibeProjectsHighrise';

const baseDemoProjects: AdVibeProject[] = [
  {
    id: 'advibe-proj-demo-1',
    title: 'Margalla Horizon Heights & Tech Valley',
    slug: 'margalla-horizon-heights',
    type: 'Mixed-Use Megaproject',
    logo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80',
    tagline: 'Futuristic Scrollytelling Living Framed by the Ancient Margalla Hills',
    description: 'An iconic 1,200-acre master-planned smart community in the Margalla foothills near Faisal Hills Taxila. Combining luxury branded residences, commercial financial districts, silicon tech parks, and aeronautical modular capsule retreats with 100% RDA/TMA approval and uninterrupted GT Road connectivity.',
    city: 'Taxila / Islamabad Zone',
    area: 'Faisal Hills Margalla Gateway',
    address: 'Horizon Boulevard, Margalla Pass, GT Road, Taxila / Islamabad Border',
    coordinates: {
      lat: 33.7294,
      lng: 72.8285,
      zoom: 15
    },
    starting_price: 4500000,
    starting_price_formatted: 'PKR 45 Lakhs',
    price_range: 'PKR 45 Lakhs – 18.5 Crore',
    status: 'Booking Open',
    featured: true,
    published: true,
    schedule: {
      startDate: '2024-01-15',
      launchDate: '2024-06-01',
      completionDate: '2028-12-31'
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
      metaTitle: 'Margalla Horizon Heights | AdVibe Premium Showcase',
      metaDescription: 'Discover Margalla Horizon Heights in Faisal Hills Taxila: 100vh interactive master plan, scrollytelling luxury apartments, commercial plazas and modular capsule homes.',
      ogImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80',
      canonicalUrl: 'https://ri8click.com/advibe/margalla-horizon-heights',
      keywords: ['Margalla Horizon Heights', 'Faisal Hills Taxila', 'AdVibe Real Estate', 'Luxury Villas', 'Commercial Plaza GT Road']
    },
    developer: {
      name: 'Horizon Megastructures & Ri8Click Consortium',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80',
      description: 'A coalition of premier civil engineering pioneers and prop-tech architects with over 25 completed flagship developments in Punjab, Islamabad, and international free zones.',
      foundedYear: 2012,
      completedProjects: 28,
      ongoingProjects: 6,
      rating: 4.95,
      website: 'https://ri8click.com',
      phone: '+92 336-5666727',
      email: 'corporate@ri8click.com'
    },
    highlights: [
      {
        id: 'hl-1',
        title: 'Margalla Hillside Panoramas',
        value: '100% Unobstructed Views',
        description: 'Breathtaking 360° vistas of the Margalla National Park mountain ridge and sunset corridors.',
        iconName: 'Mountain',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hl-2',
        title: '300-Foot Main Commercial Boulevard',
        value: 'Direct GT Road Access',
        description: 'Express 4-lane signal-free access connecting Islamabad Motorway M-1 and the Rawalpindi Ring Road.',
        iconName: 'Compass',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hl-3',
        title: 'Turnkey Smart IoT Infrastructure',
        value: 'Fibre Optic & Solar Grid',
        description: 'Underground high-voltage power transmission, 50kVA solar backups, and intelligent rainwater harvesting.',
        iconName: 'Cpu',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hl-4',
        title: 'Government Clearances & NOC',
        value: '100% RDA / TMA Approved',
        description: 'Clear legal title, digitized land records, and instant registry transfer via Ri8Click Watermark system.',
        iconName: 'ShieldCheck',
        image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80'
      }
    ],
    amenities: [
      {
        id: 'am-1',
        name: 'Horizon Infinity Sky Club & Pool',
        category: 'Wellness & Sports',
        description: 'Rooftop Olympic-grade heated infinity pool overlooking the Margalla pass with private cabanas and spa.',
        iconName: 'Waves',
        image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'am-2',
        name: '24/7 AI-Powered Surveillance & Perimeter',
        category: 'Security & Infrastructure',
        description: 'Automated thermal boundary fencing, biometric vehicular gates, and smart patrolling drones.',
        iconName: 'Shield',
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'am-3',
        name: 'Grand Central Mosque & Cultural Center',
        category: 'Lifestyle & Leisure',
        description: 'Architectural jewel designed with traditional Turkish vaulted arches accommodating 5,000 worshippers.',
        iconName: 'Landmark',
        image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'am-4',
        name: 'Executive Helipad & Sky Shuttle',
        category: 'Smart Technology',
        description: 'Dedicated rooftop landing pad on Commercial Tower Alpha for corporate VIPs and emergency evacuation.',
        iconName: 'Navigation',
        image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'am-5',
        name: 'Eco-Pod Forest Walkway & Botanical Trails',
        category: 'Wellness & Sports',
        description: 'Over 15 kilometers of landscaped running tracks, cycling lanes, and indigenous pine canopies.',
        iconName: 'Trees',
        image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'am-6',
        name: 'International School & Healthcare City',
        category: 'Lifestyle & Leisure',
        description: 'Campus partnerships with Cambridge accreditation and 100-bed modern surgical emergency hospital.',
        iconName: 'GraduationCap',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
      }
    ],
    locationPoints: [
      {
        id: 'loc-1',
        name: 'Grand Trunk (GT) Road / Faisal Hills Gateway',
        category: 'Highway & Access',
        distance: '0.8 km',
        driveTime: '2 mins',
        iconName: 'Route'
      },
      {
        id: 'loc-2',
        name: 'Margalla Pass Historic Point',
        category: 'Natural Landmark',
        distance: '2.5 km',
        driveTime: '4 mins',
        iconName: 'Mountain'
      },
      {
        id: 'loc-3',
        name: 'Taxila Museum & Ancient World Heritage Sites',
        category: 'Natural Landmark',
        distance: '4.8 km',
        driveTime: '7 mins',
        iconName: 'Compass'
      },
      {
        id: 'loc-4',
        name: 'Islamabad M-1 Motorway Interchange',
        category: 'Highway & Access',
        distance: '7.2 km',
        driveTime: '10 mins',
        iconName: 'Car'
      },
      {
        id: 'loc-5',
        name: 'Islamabad International Airport (New)',
        category: 'Airport',
        distance: '24 km',
        driveTime: '22 mins',
        iconName: 'Plane'
      },
      {
        id: 'loc-6',
        name: 'Blue Area Corporate Financial Sector, Islamabad',
        category: 'Commercial & Retail',
        distance: '28 km',
        driveTime: '26 mins',
        iconName: 'Building'
      }
    ],
    masterPlan: {
      imageUrl: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1600&q=80',
      satelliteImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
      legend: [
        { category: 'Executive Residential Sector', color: '#3b82f6' },
        { category: 'Commercial Broadway Hub', color: '#f59e0b' },
        { category: 'Silicon Valley Tech Precinct', color: '#10b981' },
        { category: 'Green Spine & Sports Complex', color: '#22c55e' },
        { category: 'Capsule Modular Eco-Residences', color: '#8b5cf6' }
      ],
      hotspots: [
        {
          id: 'hp-1',
          x: 24,
          y: 35,
          title: 'Sector A: Margalla Crest Villas',
          category: 'Residential Block',
          description: 'Custom 1 Kanal and 10 Marla designer residences with smart building automation and cantilevered balconies.',
          status: 'Available',
          totalPlots: 180,
          availablePlots: 34,
          linkedPropertyId: 'prop-res-1'
        },
        {
          id: 'hp-2',
          x: 52,
          y: 42,
          title: 'Commercial Broadway Central Plaza',
          category: 'Commercial Broadway',
          description: 'Flagship 5-story retail atrium and corporate corporate suites with guaranteed 9.2% annual rental return.',
          status: 'Booking Fast',
          totalPlots: 45,
          availablePlots: 8,
          linkedPropertyId: 'prop-comm-1'
        },
        {
          id: 'hp-3',
          x: 78,
          y: 28,
          title: 'Silicon Heights IT & Coworking Tower',
          category: 'Civic Center',
          description: 'Grade-A enterprise office floors with redundant satellite uplinks, conference auditoriums, and high-speed elevators.',
          status: 'Booking Fast',
          totalPlots: 20,
          availablePlots: 5,
          linkedPropertyId: 'prop-comm-2'
        },
        {
          id: 'hp-4',
          x: 35,
          y: 68,
          title: 'Modular Eco-Pod Sanctuary',
          category: 'Residential Block',
          description: 'Turnkey space capsules featuring aerospace aluminum shells and panoramic glass canopies nestled in pine trees.',
          status: 'Available',
          totalPlots: 60,
          availablePlots: 14,
          linkedPropertyId: 'prop-mod-1'
        },
        {
          id: 'hp-5',
          x: 62,
          y: 75,
          title: 'Central Botanical Park & Lake',
          category: 'Park / Green Spine',
          description: '45-acre central community park featuring musical fountains, open-air amphitheater, and boating channel.',
          status: 'Available',
          totalPlots: 1,
          availablePlots: 1
        },
        {
          id: 'hp-6',
          x: 82,
          y: 62,
          title: 'Future Phase: Luxury Sky Suites',
          category: 'Residential Block',
          description: 'Planned 32-story twin towers offering ultra-luxury penthouses with private cantilevered plunge pools.',
          status: 'Under Development',
          totalPlots: 240,
          availablePlots: 120
        }
      ]
    },
    gallery: [
      {
        id: 'gal-1',
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Exterior',
        caption: 'Architectural render of Margalla Horizon Heights main entrance and 300ft boulevard gateway.',
        tags: ['Gate', 'Boulevard', 'Evening']
      },
      {
        id: 'gal-2',
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Exterior',
        caption: 'Executive 1 Kanal Designer Villa on Sector A Margalla Ridge with double glazed UPVC facade.',
        tags: ['Villa', 'Architecture', 'Sunset']
      },
      {
        id: 'gal-3',
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Interior',
        caption: 'Ultra-luxurious double height living lounge with imported Italian porcelain tile and smart IoT lighting.',
        tags: ['Lounge', 'Interior', 'Smart Home']
      },
      {
        id: 'gal-4',
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Aerial Drone',
        caption: 'Panoramic aerial drone footage of the 1,200-acre site nestled directly against the Margalla pass.',
        tags: ['Aerial', 'Drone', 'Landscape']
      },
      {
        id: 'gal-5',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Exterior',
        caption: 'Commercial Broadway Plaza 1 featuring panoramic capsule elevators and glass curtain walls.',
        tags: ['Commercial', 'Plaza', 'Office']
      },
      {
        id: 'gal-6',
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Exterior',
        caption: 'Readymade aeronautical space capsule smart living model on elevated steel pilotis.',
        tags: ['Capsule', 'Prefab', 'Modular']
      },
      {
        id: 'gal-7',
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Construction Update',
        caption: 'Underground utility network, asphalt main boulevard carpeting, and street lighting installation progress.',
        tags: ['Civil Works', 'Infrastructure', 'Roads']
      },
      {
        id: 'gal-8',
        url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Amenities',
        caption: 'Horizon Residents Clubhouse, temperature-controlled Olympic swimming pool, and health club.',
        tags: ['Clubhouse', 'Pool', 'Wellness']
      }
    ],
    videos: [
      {
        id: 'vid-1',
        title: 'Margalla Horizon Cinematic Project Showcase (Official 4K Scrollytelling Film)',
        category: 'Project Tour',
        type: 'hosted',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        duration: '2:45',
        description: 'Comprehensive cinematic tour demonstrating the Margalla Ridge landscape, 300ft boulevard, and master layout.'
      },
      {
        id: 'vid-2',
        title: 'On-Site Construction Progress & Engineering Milestone Review',
        category: 'Construction',
        type: 'hosted',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        duration: '1:50',
        description: 'Ground zero footage highlighting civil engineering foundations, UPVC fabrication, and solar substation.'
      },
      {
        id: 'vid-3',
        title: 'Executive Designer Villa Walkthrough & Smart Automation Demo',
        category: 'Apartment Tour',
        type: 'hosted',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        duration: '3:10',
        description: 'Step inside the fully furnished model villa featuring integrated IoT climate control and Margalla deck.'
      },
      {
        id: 'vid-4',
        title: 'Chairman Address: Vision for Tech Valley & Commercial Broadway ROI',
        category: 'Developer Message',
        type: 'hosted',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=800&q=80',
        duration: '2:15',
        description: 'Consortium management leadership sharing investor safeguards, guaranteed rental yields, and legal titles.'
      }
    ],
    virtualTour: {
      provider: 'custom360',
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
      title: '360° Virtual Tour: Executive Penthouse Living & Margalla Panorama Deck',
      instructions: 'Drag with your mouse or swipe on touch screens to experience full 360-degree spatial freedom.'
    },
    linkedPropertyIds: ['prop-comm-1', 'prop-comm-2', 'prop-res-1', 'prop-res-2', 'prop-mod-1'],
    pricingTiers: [
      {
        id: 'tier-1',
        unitType: '5 Marla Executive Residential Plot',
        size: '125 Sq Yds (25 x 45)',
        totalPrice: 'PKR 45,00,000',
        downPayment: 'PKR 9,00,000 (20%)',
        monthlyInstallment: 'PKR 75,000 x 36 Months',
        quarterlyBalloon: 'PKR 2,25,000 x 4 Semesters',
        possession: 'PKR 9,00,000 on Ballot',
        features: [
          'Immediate Plot Numbering & Ledger',
          'Underground Electricity & Gas Line',
          'Walking distance to Central Park',
          '100% NOC Clearance'
        ]
      },
      {
        id: 'tier-2',
        unitType: '10 Marla Signature Mountain View Plot',
        size: '250 Sq Yds (35 x 65)',
        totalPrice: 'PKR 85,00,000',
        downPayment: 'PKR 17,00,000 (20%)',
        monthlyInstallment: 'PKR 1,40,000 x 36 Months',
        quarterlyBalloon: 'PKR 4,25,000 x 4 Semesters',
        possession: 'PKR 17,00,000 on Ballot',
        features: [
          'Direct Margalla National Park Facing',
          'Wide 50ft Sector Road Access',
          'Corner & Boulevard Options Available',
          'RDA Approved Sub-division'
        ]
      },
      {
        id: 'tier-3',
        unitType: 'Commercial Broadway Prime Shop (Ground Floor)',
        size: '450 Sq Ft (High Footfall)',
        totalPrice: 'PKR 1,85,00,000',
        downPayment: 'PKR 37,00,000 (20%)',
        monthlyInstallment: 'PKR 3,10,000 x 36 Months',
        quarterlyBalloon: 'PKR 9,25,000 x 4 Semesters',
        possession: 'PKR 37,00,000 with Rental Guarantee',
        features: [
          '9.2% Guaranteed Annual Rental Yield',
          'High Ceiling Glass Display Frontage',
          'Dedicated Customer Parking Bay',
          'Ri8Click UPVC Thermal Shield'
        ]
      },
      {
        id: 'tier-4',
        unitType: 'Turnkey Aerospace Space Capsule Smart Home',
        size: '380 Sq Ft Turnkey Prefab',
        totalPrice: 'PKR 88,00,000',
        downPayment: 'PKR 26,40,000 (30%)',
        monthlyInstallment: 'PKR 1,45,000 x 24 Months',
        quarterlyBalloon: 'PKR 4,40,000 x 4 Semesters',
        possession: '30-Day Turnkey Delivery on Plot',
        features: [
          'Fully Furnished with Smart IoT Controls',
          'Integrated Heating & Cooling HVAC',
          'Double Glazed Curved Skylight',
          'Delivered and Installed Ready-to-Live'
        ]
      }
    ],
    downloadableBrochureUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    dealerId: 'admin',
    dealerName: 'Ri8Click Corporate Headquarters',
    dealerPhone: '+92 336-5666727',
    dealerWhatsApp: '923365666727',
    createdAt: '2026-08-15T10:00:00Z',
    updatedAt: '2026-09-02T14:30:00Z',
    viewsCount: 3840,
    sections: [
      {
        id: 'sec-hero',
        type: 'hero',
        title: 'Margalla Horizon Heights & Tech Valley',
        subtitle: 'Where Futuristic PropTech Meets the Majestic Margalla Hills',
        tagline: 'A Landmark Mixed-Use Megaproject by Ri8Click Consortium',
        badge: 'DEMO PROJECT • FULL FEATURE SHOWCASE',
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
        title: 'A Visionary Horizon Born for Tomorrow',
        subtitle: '1,200 Acres of Master-Planned Distinction in Faisal Hills Taxila Corridor',
        badge: 'THE ARCHITECTURAL MANIFESTO',
        isEnabled: true,
        order: 2,
        content: {
          quote: 'We set out to engineer not just another housing scheme, but an ecological sanctuary where global technological infrastructure and majestic natural beauty coexist seamlessly.',
          paragraphs: [
            'Strategically anchored at the historic confluence of Taxila and Islamabad, Margalla Horizon Heights redefines high-end living in Pakistan. Backed by the multi-division strength of Ri8Click Consortium, every square foot is optimized for sustainability, connectivity, and superior investment appreciation.',
            'From the double-glazed soundproof facade systems by Ri8Click UPVC to turnkey off-grid Space Capsules nestled in natural woodlands, this is the future of living, working, and flourishing.'
          ]
        }
      },
      {
        id: 'sec-highlights',
        type: 'highlights',
        title: 'Project Highlights & Core Value Anchors',
        subtitle: 'Uncompromising engineering standards engineered for the modern investor',
        badge: 'KEY VALUE PROPOSITIONS',
        isEnabled: true,
        order: 3
      },
      {
        id: 'sec-stats',
        type: 'stats',
        title: 'By The Numbers: Landmark Scale & Performance',
        subtitle: 'Transforming land into high-growth tangible equity',
        badge: 'STATISTICAL VELOCITY',
        isEnabled: true,
        order: 4,
        content: [
          { label: 'Total Master-Planned Area', value: '1,200+ Acres', sub: 'Spanning foothills & boulevard' },
          { label: 'Main Boulevard Width', value: '300 Ft', sub: 'Signal-free express corridor' },
          { label: 'Underground Utilities', value: '100%', sub: 'Fibre, water, solar smart grid' },
          { label: 'Guaranteed Commercial Yield', value: '9.2% ROI', sub: 'Direct bank escrow guarantee' },
          { label: 'Travel Time to Islamabad Gate', value: '12 Mins', sub: 'Via direct M-1 interchange' },
          { label: 'Green Spine & Reserved Parks', value: '45% Area', sub: 'Protected eco-canopy corridors' }
        ]
      },
      {
        id: 'sec-salient',
        type: 'salient',
        title: 'Salient Architectural & Civic Features',
        subtitle: 'Designed to elevate your quality of life across every dimension',
        badge: 'ENGINEERING DIFFERENTIATORS',
        isEnabled: true,
        order: 5,
        content: [
          { title: 'Earthquake Resistant Structural Code', desc: 'Zone 3 compliant reinforced concrete frames certified by lead structural engineers.' },
          { title: 'Autonomous Water & Filtration Plant', desc: 'Reverse osmosis purification plant providing mineral drinking water to every doorstep.' },
          { title: 'Subterranean 11kV Power Grid', desc: 'Zero overhead wires, maintaining clean open mountain skyviews.' },
          { title: 'Integrated Smart Waste Management', desc: 'Automated pneumatic refuse chutes and neighborhood compost conversion cells.' },
          { title: 'High-Speed Fibre-to-the-Home (FTTH)', desc: 'Gigabit internet ready for remote corporate executives and software engineers.' },
          { title: 'Emergency Rapid Response Dispatch', desc: 'Dedicated 24/7 on-site fire station, paramedic ambulances, and swift medical clinic.' }
        ]
      },
      {
        id: 'sec-master-plan',
        type: 'master_plan',
        title: 'Interactive Master Plan & Sector Hotspots',
        subtitle: 'Explore sectors, commercial broadways, and click hotspots to view real unit availability',
        badge: 'SPATIAL INTELLIGENCE & GIS MAP',
        isEnabled: true,
        order: 6
      },
      {
        id: 'sec-location',
        type: 'location',
        title: 'Prime Location & Proximity Radar',
        subtitle: 'At the nexus of Margalla Pass, GT Road, and the Motorway Network',
        badge: 'LOCATION ADVANTAGE',
        isEnabled: true,
        order: 7
      },
      {
        id: 'sec-amenities',
        type: 'amenities',
        title: 'World-Class Amenities & Luxury Lifestyle',
        subtitle: 'Where every weekend feels like a private 5-star mountain retreat',
        badge: 'RESIDENTS PRIVILEGES',
        isEnabled: true,
        order: 8
      },
      {
        id: 'sec-gallery',
        type: 'gallery',
        title: 'Curated Visual Showcase & Architecture Gallery',
        subtitle: 'Filter by exterior, luxury interior, drone panoramas, and construction milestones',
        badge: 'HIGH-DEFINITION PORTFOLIO',
        isEnabled: true,
        order: 9
      },
      {
        id: 'sec-videos',
        type: 'videos',
        title: 'Cinematic 4K Video Tours & Progress Reports',
        subtitle: 'Experience dynamic drone walkthroughs and real site construction footage',
        badge: 'MOTION EXPERIENCE',
        isEnabled: true,
        order: 10
      },
      {
        id: 'sec-virtual-tour',
        type: 'virtual_tour',
        title: 'Interactive 360° Virtual Tour Experience',
        subtitle: 'Step inside our signature penthouse living room and explore with full spatial freedom',
        badge: 'IMMERSIVE DIGITAL TWIN',
        isEnabled: true,
        order: 11
      },
      {
        id: 'sec-units',
        type: 'units',
        title: 'Available Inventory & Linked Property Units',
        subtitle: 'Real property listings integrated directly from our certified broker network',
        badge: 'LIVE INVENTORY',
        isEnabled: true,
        order: 12
      },
      {
        id: 'sec-pricing',
        type: 'pricing',
        title: 'Flexible Investment Tiers & 3-Year Payment Plans',
        subtitle: 'Transparent quarterly installment schedules designed for domestic & overseas Pakistani investors',
        badge: 'FINANCIAL TRANSPARENCY',
        isEnabled: true,
        order: 13
      },
      {
        id: 'sec-developer',
        type: 'developer',
        title: 'About the Consortium & Master Developers',
        subtitle: 'Engineered by Horizon Megastructures with Ri8Click Turnkey Construction',
        badge: 'MASTER BUILDERS',
        isEnabled: true,
        order: 14
      },
      {
        id: 'sec-enquiry',
        type: 'enquiry',
        title: 'Book a Private Site Visit or Request Investor Pricing',
        subtitle: 'Our senior investment advisors in Taxila & Islamabad are on standby 24/7',
        badge: 'VIP RESERVATION DESK',
        isEnabled: true,
        order: 15
      },
      {
        id: 'sec-cta',
        type: 'cta',
        title: 'Secure Your Heritage at Margalla Horizon Today',
        subtitle: 'Plots and commercial broadway units are booking fast at initial phase rates',
        badge: 'LIMITED BOOKINGS',
        isEnabled: true,
        order: 16
      },
      {
        id: 'sec-disclaimer',
        type: 'disclaimer',
        title: 'Legal Clearances, Disclaimers & Compliance',
        subtitle: 'All land titles, TMA approvals, and environmental filings are on public record',
        badge: 'REGULATORY COMPLIANCE',
        isEnabled: true,
        order: 17,
        content: {
          legalNotes: [
            'All layouts, artist impressions, and architectural renderings are indicative and subject to final regulatory approvals by the Town Municipal Administration (TMA) Taxila and Rawalpindi Development Authority (RDA).',
            'Installment schedules, payment plans, and development timelines are governed by official registration bylaws. Registered buyers will receive watermark-authenticated computerized ownership certificates upon clearing booking payments.',
            'Investment return yields quoted are historical estimates based on commercial market data in Faisal Hills Commercial Broadway.'
          ]
        }
      }
    ]
  },
  {
    id: 'advibe-proj-demo-2',
    title: 'Faisal Hills Commercial Broadway Tower',
    slug: 'faisal-hills-broadway-tower',
    type: 'Commercial Development',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80',
    tagline: 'Signature 6-Story Corporate Center on GT Road Commercial Corridor',
    description: 'An elite commercial plaza and corporate shopping galleria situated directly on the bustling Commercial Broadway of Faisal Hills Taxila. Features double-height anchor retail shops, corporate IT office suites, high-speed panoramic capsule elevators, and 9.5% guaranteed annual rental yields backed by corporate tenants.',
    city: 'Taxila',
    area: 'Faisal Hills Commercial Broadway',
    address: 'Plot 18-20, Main Commercial Boulevard, Faisal Hills, Taxila',
    coordinates: {
      lat: 33.7312,
      lng: 72.8340,
      zoom: 16
    },
    starting_price: 18500000,
    starting_price_formatted: 'PKR 1.85 Crore',
    price_range: 'PKR 1.85 Crore – 18.5 Crore',
    status: 'Under Construction',
    featured: true,
    published: true,
    schedule: {
      startDate: '2023-08-01',
      launchDate: '2024-03-10',
      completionDate: '2026-12-15'
    },
    theme: {
      primaryColor: '#d97706',
      accentColor: '#3b82f6',
      bgStyle: 'luxury_black',
      fontHeading: 'Playfair Display',
      fontBody: 'Plus Jakarta Sans',
      buttonStyle: 'rounded-xl',
      overlayOpacity: 0.7,
      animationIntensity: 'standard'
    },
    seo: {
      metaTitle: 'Faisal Hills Commercial Broadway Tower | AdVibe Showcase',
      metaDescription: 'High ROI commercial shops and corporate offices in Faisal Hills Taxila with guaranteed rental yield.',
      ogImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      keywords: ['Commercial Plaza', 'Faisal Hills Broadway', 'Taxila Investment', 'Corporate Offices']
    },
    developer: {
      name: 'Al-Mairaj Real Estate & Ri8Click Turnkey Construction',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80',
      description: 'Certified builder division with 15+ years experience building corporate plazas across Punjab.',
      foundedYear: 2008,
      completedProjects: 19,
      ongoingProjects: 4,
      rating: 4.9,
      phone: '+92 336-5666727',
      email: 'info@almairaj.com'
    },
    highlights: [
      {
        id: 'h2-1',
        title: 'Guaranteed 9.5% Rental Yield',
        value: 'Bank Escrow Security',
        description: 'Instant corporate lease agreements upon possession with top national retail brands.',
        iconName: 'TrendingUp'
      },
      {
        id: 'h2-2',
        title: 'Double Glazed UPVC Glass Curtain',
        value: 'Sound & Thermal Isolation',
        description: 'Engineered by Ri8Click UPVC with zero dust intrusion and 40% air conditioning savings.',
        iconName: 'Layers'
      }
    ],
    amenities: [
      {
        id: 'a2-1',
        name: 'Dual High-Speed Capsule Elevators',
        category: 'Smart Technology',
        description: 'Panoramic glass elevators with standby auto-rescue emergency power.',
        iconName: 'Cpu'
      },
      {
        id: 'a2-2',
        name: 'Underground Dedicated Valet Parking',
        category: 'Security & Infrastructure',
        description: 'Automated boom barriers and 80+ covered car parking bays.',
        iconName: 'Shield'
      }
    ],
    locationPoints: [
      {
        id: 'lp2-1',
        name: 'Main Commercial Broadway, Faisal Hills',
        category: 'Commercial & Retail',
        distance: '0 km',
        driveTime: '0 mins'
      },
      {
        id: 'lp2-2',
        name: 'Grand Trunk Road Junction',
        category: 'Highway & Access',
        distance: '1.2 km',
        driveTime: '3 mins'
      }
    ],
    masterPlan: {
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      legend: [
        { category: 'Ground Floor Anchor Retail', color: '#f59e0b' },
        { category: 'Corporate Suites Level 1-4', color: '#3b82f6' },
        { category: 'Rooftop Executive Lounge', color: '#10b981' }
      ],
      hotspots: [
        {
          id: 'hp2-1',
          x: 48,
          y: 50,
          title: 'Executive Commercial Plaza Tower',
          category: 'Commercial Broadway',
          description: 'Ready commercial plaza on Main Boulevard plot 14-15.',
          status: 'Available',
          linkedPropertyId: 'prop-comm-1'
        }
      ]
    },
    gallery: [
      {
        id: 'g2-1',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Exterior',
        caption: 'Commercial Broadway Tower modern glass facade render.'
      },
      {
        id: 'g2-2',
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        type: 'image',
        category: 'Interior',
        caption: 'Executive boardroom and shared conference floor.'
      }
    ],
    videos: [
      {
        id: 'v2-1',
        title: 'Commercial Broadway Tower 3D Tour & Facade Walkthrough',
        category: 'Project Tour',
        type: 'hosted',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        duration: '1:45'
      }
    ],
    virtualTour: {
      provider: 'video',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      title: 'Commercial Broadway Walkthrough'
    },
    linkedPropertyIds: ['prop-comm-1', 'prop-comm-2'],
    pricingTiers: [
      {
        id: 'pt2-1',
        unitType: 'Ground Floor Commercial Retail Shop',
        size: '350 Sq Ft',
        totalPrice: 'PKR 1,85,00,000',
        downPayment: 'PKR 37,00,000 (20%)',
        monthlyInstallment: 'PKR 3,25,000 x 30 Months',
        possession: 'Immediate on Handover',
        features: ['Main Boulevard Frontage', '9.5% Rental Yield', 'Double Glazed Glass']
      }
    ],
    downloadableBrochureUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    dealerId: 'agency-1',
    dealerName: 'Al-Mairaj Real Estate & Builders',
    dealerPhone: '+92 336-5666727',
    dealerWhatsApp: '923365666727',
    createdAt: '2026-08-18T12:00:00Z',
    updatedAt: '2026-09-01T10:00:00Z',
    viewsCount: 2150,
    sections: [
      {
        id: 'sec-hero-2',
        type: 'hero',
        title: 'Faisal Hills Commercial Broadway Tower',
        subtitle: 'High ROI Retail and Corporate Headquarters on GT Road',
        tagline: 'Guaranteed 9.5% Rental Yield in Prime Taxila Commercial Belt',
        isEnabled: true,
        order: 1
      },
      {
        id: 'sec-intro-2',
        type: 'intro',
        title: 'The Commercial Nucleus of Faisal Hills',
        subtitle: 'Over 50,000 daily vehicular impressions on the connecting gateway',
        isEnabled: true,
        order: 2
      },
      {
        id: 'sec-highlights-2',
        type: 'highlights',
        title: 'Commercial Advantages',
        subtitle: 'Built for enterprise stability',
        isEnabled: true,
        order: 3
      },
      {
        id: 'sec-units-2',
        type: 'units',
        title: 'Corporate Suites & Retail Units',
        subtitle: 'Select available commercial units',
        isEnabled: true,
        order: 4
      },
      {
        id: 'sec-enquiry-2',
        type: 'enquiry',
        title: 'Reserve Commercial Space',
        subtitle: 'Speak with our corporate lease advisors',
        isEnabled: true,
        order: 5
      }
    ]
  }
];

export const initialAdvibeProjects: AdVibeProject[] = [
  ...housingSocietiesProjects,
  ...highRiseTowersProjects,
  ...baseDemoProjects
];

export const initialAdvibeLeads: AdVibeLead[] = [
  {
    id: 'lead-adv-1',
    projectId: 'advibe-proj-demo-1',
    projectTitle: 'Margalla Horizon Heights & Tech Valley',
    name: 'Chaudhry Kamran',
    phone: '+92 300-5544332',
    email: 'kamran.chaudhry@gmail.com',
    preferredUnit: '10 Marla Signature Mountain View Plot',
    message: 'Interested in booking 2 plots in Sector A Margalla facing. Please share payment schedule and site visit availability this weekend.',
    contactPreference: 'whatsapp',
    source: 'site_visit_request',
    status: 'new',
    createdAt: '2026-09-02T15:20:00Z'
  },
  {
    id: 'lead-adv-2',
    projectId: 'advibe-proj-demo-1',
    projectTitle: 'Margalla Horizon Heights & Tech Valley',
    name: 'Dr. Sarah Naveed',
    phone: '+92 333-8899771',
    email: 'dr.sarah@naveedclinic.pk',
    preferredUnit: 'Commercial Broadway Prime Shop (Ground Floor)',
    message: 'Seeking a pharmacy/clinic commercial unit with high footfall on the main boulevard. Need details on possession date.',
    contactPreference: 'phone',
    source: 'price_sheet',
    status: 'contacted',
    createdAt: '2026-09-01T11:45:00Z'
  },
  {
    id: 'lead-adv-3',
    projectId: 'advibe-proj-demo-2',
    projectTitle: 'Faisal Hills Commercial Broadway Tower',
    name: 'Engr. Bilal Rauf',
    phone: '+92 321-4455667',
    email: 'bilal.rauf@techgroup.pk',
    preferredUnit: 'Ground Floor Commercial Retail Shop',
    message: 'Interested in guaranteed rental yield contracts. Is bank guarantee provided by developer?',
    contactPreference: 'email',
    source: 'website_advibe',
    status: 'site_visit_booked',
    createdAt: '2026-08-30T09:15:00Z'
  }
];

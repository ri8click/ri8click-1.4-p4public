export type PropertyCategory = 'all' | 'residential' | 'commercial' | 'modular' | 'projects';
export type PropertyPurpose = 'for_sale' | 'for_rent';
export type PropertyType = 
  | 'Villa' 
  | 'Luxury Apartment' 
  | 'Commercial Plaza' 
  | 'Corporate Office' 
  | 'Retail Shop' 
  | 'Capsule Smart House' 
  | 'Commercial Plot' 
  | 'Residential Plot'
  | 'Penthouse'
  | 'Warehouse'
  | string;

export interface LocationData {
  province: string;
  city: string;
  society: string;
  block?: string;
  address: string;
  latitude?: number;
  longitude?: number;
  mapZoom?: number;
  nearbyLandmarks?: string[];
}

export interface Property {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  category: 'residential' | 'commercial' | 'modular' | 'projects';
  type: PropertyType;
  purpose: PropertyPurpose;
  price: number;
  priceFormatted: string;
  currency?: 'PKR' | 'USD';
  location: LocationData;
  area: number | string;
  areaUnit: 'Marla' | 'Kanal' | 'Sq Ft' | 'Sq Yd' | string;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  floors?: number;
  features: string[];
  images: string[];
  watermark: boolean;
  agencyId: string;
  agentName: string;
  agentPhone: string;
  agentWhatsApp: string;
  agentAvatar: string;
  agentCompany: string;
  agentRating: number;
  isFeatured?: boolean;
  isHotCommercial?: boolean;
  viewsCount?: number;
  savesCount?: number;
  createdAt: string;
  status?: 'active' | 'pending' | 'sold';
  virtualTourVideoUrl?: string;
  virtualTourVideoTitle?: string;
}

export interface CityInfo {
  name: string;
  societies: string[];
}

export interface ProvinceCityData {
  province: string;
  cities: CityInfo[];
}

export interface AgencyAccount {
  id: string;
  name: string;
  ownerName: string;
  logo: string;
  phone: string;
  whatsapp: string;
  email: string;
  city: string;
  officeAddress: string;
  rating: number;
  totalListings: number;
  verified: boolean;
  specialization: string[];
  description: string;
  canPublishAdvibe?: boolean;
}

export interface ConsortiumDivision {
  id: string;
  title: string;
  shortName: string;
  tagline: string;
  description: string;
  badge: string;
  iconName: string;
  image: string;
  capabilities: string[];
  stats: { label: string; value: string }[];
  contactPerson: string;
  contactPhone: string;
  contactWhatsApp: string;
}

export interface FilterState {
  searchQuery: string;
  province: string;
  city: string;
  society: string;
  category: PropertyCategory;
  purpose: 'all' | PropertyPurpose;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  sortBy: 'featured' | 'newest' | 'price_low' | 'price_high';
}

export interface HeroSlide {
  id: string;
  categoryTag: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  location: string;
  society: string;
  imageUrl: string;
  galleryImages?: string[];
  tourRoomsCount: number;
  isActive: boolean;
  order: number;
  features: string[];
  samplePropertyData?: {
    title: string;
    category: 'residential' | 'commercial' | 'modular' | 'projects';
    location: {
      city: string;
      society: string;
      province: string;
    };
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Market Trends' | 'Faisal Hills Updates' | 'Investment Guides' | 'Modular & Prefab Tech' | 'Construction & UPVC' | 'Legal & Tax';
  excerpt: string;
  content: string;
  coverImage: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  viewsCount: number;
  isFeatured: boolean;
  status: 'published' | 'draft';
}

export interface SiteSectionPortion {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  isVisible: boolean;
  order: number;
  badgeText?: string;
  themeStyle?: 'light' | 'dark' | 'gradient' | 'accent';
}

// ============================================================================
// ADVIBE — CINEMATIC MEGAPROJECT SHOWCASE & REAL ESTATE MARKETING ENGINE
// ============================================================================

export type AdVibeProjectType =
  | 'Housing Society'
  | 'Commercial Mall & Tower'
  | 'Luxury Villa Enclave'
  | 'Waterfront / Eco Resort'
  | 'Mixed-Use Highrise'
  | 'Modular Smart Community';

export type AdVibeProjectStatus =
  | 'Pre-Launch'
  | 'Booking Open'
  | 'Under Construction'
  | 'Ready for Possession'
  | 'Completed';

export type AdVibeSectionType =
  | 'hero'
  | 'story'
  | 'highlights'
  | 'masterplan'
  | 'units'
  | 'amenities'
  | 'gallery'
  | 'videos'
  | 'location'
  | 'virtual_tour'
  | 'payment_plan'
  | 'developer'
  | 'lead_form';

export interface AdVibeTheme {
  primaryColor: string;
  accentColor: string;
  darkBg: string;
  fontHeading: string;
  fontBody: string;
  enableParallax: boolean;
  enableSmoothScroll: boolean;
  ambientAudioUrl?: string;
}

export interface AdVibeSEO {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  keywords: string[];
}

export interface AdVibeDeveloper {
  name: string;
  logo: string;
  establishedYear: number;
  deliveredProjectsCount: number;
  description: string;
  headOffice: string;
  website?: string;
  phone: string;
  whatsapp: string;
  email?: string;
}

export interface AdVibeHighlight {
  id: string;
  title: string;
  value: string;
  description: string;
  iconName: string;
  image?: string;
}

export interface AdVibeAmenity {
  id: string;
  name: string;
  category: 'Wellness & Sports' | 'Security & Infrastructure' | 'Lifestyle & Leisure' | 'Smart Technology';
  description: string;
  iconName: string;
  image?: string;
}

export interface AdVibeLocationPoint {
  id: string;
  name: string;
  category: 'Highway & Access' | 'Education' | 'Healthcare' | 'Commercial & Retail' | 'Airport' | 'Natural Landmark';
  distance: string;
  driveTime: string;
  iconName?: string;
}

export interface AdVibeHotspot {
  id: string;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  title: string;
  category: 'Residential Block' | 'Commercial Broadway' | 'Civic Center' | 'Park / Green Spine' | 'Mosque' | 'Clubhouse' | 'Education City';
  description: string;
  status: 'Available' | 'Booking Fast' | 'Sold Out' | 'Under Development';
  totalPlots?: number;
  availablePlots?: number;
  linkedPropertyId?: string;
}

export interface AdVibeMasterPlan {
  imageUrl: string;
  satelliteImageUrl?: string;
  legend: { category: string; color: string }[];
  hotspots: AdVibeHotspot[];
}

export interface AdVibeMediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  category: 'Exterior' | 'Interior' | 'Aerial Drone' | 'Master Plan' | 'Construction Update' | 'Amenities';
  caption: string;
  tags?: string[];
}

export interface AdVibeVideoItem {
  id: string;
  title: string;
  category: 'Project Tour' | 'Location Tour' | 'Amenities' | 'Construction' | 'Apartment Tour' | 'Developer Message';
  type: 'hosted' | 'youtube' | 'vimeo';
  url: string;
  thumbnail: string;
  duration?: string;
  description?: string;
}

export interface AdVibePricingPlan {
  id: string;
  unitType: string;
  size: string;
  totalPrice: string;
  downPayment: string;
  monthlyInstallment: string;
  quarterlyBalloon?: string;
  possession: string;
  features: string[];
}

export interface AdVibeLead {
  id: string;
  projectId: string;
  projectTitle: string;
  name: string;
  phone: string;
  email: string;
  preferredUnit: string;
  message: string;
  contactPreference: 'whatsapp' | 'phone' | 'email';
  source?: 'website_advibe' | 'site_visit_request' | 'brochure_download' | 'price_sheet';
  status: 'new' | 'contacted' | 'site_visit_booked' | 'closed';
  notes?: string;
  createdAt: string;
}

export interface AdVibeSection {
  id: string;
  type: AdVibeSectionType;
  title: string;
  subtitle: string;
  tagline?: string;
  badge?: string;
  isEnabled: boolean;
  order: number;
  content?: any;
  customSettings?: {
    layout?: 'default' | 'split' | 'grid' | 'cards' | 'fullscreen';
    backgroundOverride?: string;
    pinnedScroll?: boolean;
    bgVideoUrl?: string;
    bgImageUrl?: string;
  };
}

export interface AdVibeProject {
  id: string;
  title: string;
  slug: string;
  type: AdVibeProjectType;
  developer: AdVibeDeveloper;
  logo: string;
  tagline: string;
  description: string;
  city: string;
  area: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
    zoom?: number;
  };
  starting_price: number;
  starting_price_formatted: string;
  price_range?: string;
  status: AdVibeProjectStatus;
  featured: boolean;
  published: boolean;
  archived?: boolean;
  schedule: {
    startDate?: string;
    completionDate?: string;
    launchDate?: string;
  };
  theme: AdVibeTheme;
  seo: AdVibeSEO;
  sections: AdVibeSection[];
  highlights: AdVibeHighlight[];
  amenities: AdVibeAmenity[];
  locationPoints: AdVibeLocationPoint[];
  masterPlan: AdVibeMasterPlan;
  gallery: AdVibeMediaItem[];
  videos: AdVibeVideoItem[];
  virtualTour: {
    provider: 'matterport' | 'kuula' | 'custom360' | 'video';
    url: string;
    title?: string;
    instructions?: string;
    autoRun?: boolean;
    rotationSpeed?: number;
    dayNightMode?: boolean;
    scenes?: {
      id: string;
      name: string;
      imageUrl: string;
      nightImageUrl?: string;
      category?: string;
      description?: string;
      hotspots?: {
        id: string;
        x: number;
        y: number;
        title: string;
        description?: string;
        actionUrl?: string;
      }[];
    }[];
  };
  linkedPropertyIds: string[];
  pricingTiers: AdVibePricingPlan[];
  downloadableBrochureUrl?: string;
  dealerId?: string;
  dealerName?: string;
  dealerPhone?: string;
  dealerWhatsApp?: string;
  createdAt: string;
  updatedAt: string;
  viewsCount?: number;
}

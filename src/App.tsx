import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SearchFilterBar } from './components/SearchFilterBar';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { CommercialShowcase } from './components/CommercialShowcase';
import { ModularHomesShowcase } from './components/ModularHomesShowcase';
import { ConsortiumShowcase } from './components/ConsortiumShowcase';
import { AgenciesSection, resolvePakistanAgentAvatar } from './components/AgenciesSection';
import { NewsBlogsSection } from './components/NewsBlogsSection';
import { BlogDetailModal } from './components/BlogDetailModal';
import { PostPropertyModal } from './components/PostPropertyModal';
import { ScheduleTourModal } from './components/ScheduleTourModal';
import { SavedPropertiesModal } from './components/SavedPropertiesModal';
import { AdminHubModal, AdminTabType } from './components/AdminHubModal';
import { VirtualTour3DModal } from './components/VirtualTour3DModal';
import { AuthRoleModal } from './components/AuthRoleModal';
import { AuthLoginModal } from './components/AuthLoginModal';
import { AiChatbot } from './components/AiChatbot';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ScrollToTop } from './components/ScrollToTop';
import { Footer } from './components/Footer';
import { AdVibeListingPage } from './components/AdVibeListingPage';
import { AdVibeProjectScrollyPage } from './components/AdVibeProjectScrollyPage';

import { 
  initialProperties, 
  initialAgencies, 
  initialProvinceCityData, 
  initialConsortiumDivisions,
  initialHeroSlides,
  initialBlogPosts,
  initialSitePortions
} from './data/mockData';
import { initialAdvibeProjects, initialAdvibeLeads } from './data/advibeMockData';
import { initialUserAccounts, UserAccount } from './data/defaultAccounts';
import { 
  Property, 
  AgencyAccount, 
  ProvinceCityData, 
  SearchFilterState, 
  HeroSlide, 
  BlogPost, 
  SiteSectionPortion,
  AdVibeProject,
  AdVibeLead
} from './types';
import { Building2, Sparkles, SlidersHorizontal, RotateCcw, ArrowRight, MessageSquare, Settings } from 'lucide-react';

function sanitizeAgenciesToPakistanRegion(list: AgencyAccount[]): AgencyAccount[] {
  return list.map((ag, idx) => {
    const cleanAvatar = resolvePakistanAgentAvatar(
      ag.avatar || ag.logo,
      `${ag.id} ${ag.name} ${ag.companyName}`,
      idx
    );
    return {
      ...ag,
      avatar: cleanAvatar,
      logo: cleanAvatar
    };
  });
}

function sanitizePropertiesToPakistanRegion(list: Property[]): Property[] {
  return list.map((prop, idx) => ({
    ...prop,
    agentAvatar: resolvePakistanAgentAvatar(
      prop.agentAvatar,
      `${prop.agencyId} ${prop.agentName} ${prop.agentCompany}`,
      idx
    )
  }));
}

export function App() {
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem('ri8click_properties_data');
      if (saved) {
        const parsed: Property[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map(p => p.id));
        const missingDefaults = initialProperties.filter(p => !existingIds.has(p.id));
        return sanitizePropertiesToPakistanRegion([...parsed, ...missingDefaults]);
      }
      return sanitizePropertiesToPakistanRegion(initialProperties);
    } catch {
      return sanitizePropertiesToPakistanRegion(initialProperties);
    }
  });

  const [agencies, setAgencies] = useState<AgencyAccount[]>(() => {
    try {
      const saved = localStorage.getItem('ri8click_agencies_data');
      if (saved) {
        const parsed: AgencyAccount[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map(a => a.id));
        const missingDefaults = initialAgencies.filter(a => !existingIds.has(a.id));
        return sanitizeAgenciesToPakistanRegion([...parsed, ...missingDefaults]);
      }
      return sanitizeAgenciesToPakistanRegion(initialAgencies);
    } catch {
      return sanitizeAgenciesToPakistanRegion(initialAgencies);
    }
  });

  const [provinceCityData, setProvinceCityData] = useState<ProvinceCityData[]>(() => {
    try {
      const saved = localStorage.getItem('ri8click_locations_data');
      if (saved) {
        const parsed: ProvinceCityData[] = JSON.parse(saved);
        return parsed.length > 0 ? parsed : initialProvinceCityData;
      }
      return initialProvinceCityData;
    } catch {
      return initialProvinceCityData;
    }
  });

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    try {
      const saved = localStorage.getItem('ri8click_hero_slides');
      return saved ? JSON.parse(saved) : initialHeroSlides;
    } catch {
      return initialHeroSlides;
    }
  });

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('ri8click_blogs_data');
      return saved ? JSON.parse(saved) : initialBlogPosts;
    } catch {
      return initialBlogPosts;
    }
  });

  const [sitePortions, setSitePortions] = useState<SiteSectionPortion[]>(() => {
    try {
      const saved = localStorage.getItem('ri8click_site_portions');
      return saved ? JSON.parse(saved) : initialSitePortions;
    } catch {
      return initialSitePortions;
    }
  });

  const [userAccounts, setUserAccounts] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem('ri8click_user_accounts');
      if (saved) {
        const parsed: UserAccount[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map(u => u.id));
        const missingDefaults = initialUserAccounts.filter(u => !existingIds.has(u.id));
        return [...parsed, ...missingDefaults].map((u, idx) => ({
          ...u,
          avatar: resolvePakistanAgentAvatar(u.avatar, `${u.agencyId || ''} ${u.name}`, idx)
        }));
      }
      return initialUserAccounts;
    } catch {
      return initialUserAccounts;
    }
  });

  const [consortiumDivisions] = useState(initialConsortiumDivisions);

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('ri8click_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [advibeProjects, setAdvibeProjects] = useState<AdVibeProject[]>(() => {
    try {
      const saved = localStorage.getItem('ri8click_advibe_projects');
      if (saved) {
        const parsed: AdVibeProject[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map(p => p.id));
        const missingDefaults = initialAdvibeProjects.filter(p => !existingIds.has(p.id));
        return [...parsed, ...missingDefaults];
      }
      return initialAdvibeProjects;
    } catch {
      return initialAdvibeProjects;
    }
  });

  const [advibeLeads, setAdvibeLeads] = useState<AdVibeLead[]>(() => {
    try {
      const saved = localStorage.getItem('ri8click_advibe_leads');
      return saved ? JSON.parse(saved) : initialAdvibeLeads;
    } catch {
      return initialAdvibeLeads;
    }
  });

  // ==========================================================================
  // UNIVERSAL SERVER STATE SYNC & REAL-TIME SSE STREAM
  // ==========================================================================
  const syncUniversalStateToServer = (payload: Record<string, any>) => {
    fetch('/api/state', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(err => console.warn('Universal state sync notice:', err));
  };

  useEffect(() => {
    // 1. Load latest universal state from backend on initial load
    fetch('/api/state')
      .then(res => res.json())
      .then(serverState => {
        if (!serverState) return;
        const seedPayload: Record<string, any> = {};

        if (Array.isArray(serverState.properties) && serverState.properties.length > 0) {
          const cleanProps = sanitizePropertiesToPakistanRegion(serverState.properties);
          setProperties(cleanProps);
          try {
            localStorage.setItem('ri8click_properties_data', JSON.stringify(cleanProps));
          } catch {}
        } else {
          seedPayload.properties = properties;
        }

        if (Array.isArray(serverState.agencies) && serverState.agencies.length > 0) {
          const cleanAgencies = sanitizeAgenciesToPakistanRegion(serverState.agencies);
          setAgencies(cleanAgencies);
          try {
            localStorage.setItem('ri8click_agencies_data', JSON.stringify(cleanAgencies));
          } catch {}
        } else {
          seedPayload.agencies = agencies;
        }

        if (Array.isArray(serverState.provinceCityData) && serverState.provinceCityData.length > 0) {
          setProvinceCityData(serverState.provinceCityData);
          try {
            localStorage.setItem('ri8click_locations_data', JSON.stringify(serverState.provinceCityData));
          } catch {}
        } else {
          seedPayload.provinceCityData = provinceCityData;
        }

        if (Array.isArray(serverState.heroSlides) && serverState.heroSlides.length > 0) {
          setHeroSlides(serverState.heroSlides);
          try {
            localStorage.setItem('ri8click_hero_slides', JSON.stringify(serverState.heroSlides));
          } catch {}
        } else {
          seedPayload.heroSlides = heroSlides;
        }

        if (Array.isArray(serverState.blogs) && serverState.blogs.length > 0) {
          setBlogs(serverState.blogs);
          try {
            localStorage.setItem('ri8click_blogs_data', JSON.stringify(serverState.blogs));
          } catch {}
        } else {
          seedPayload.blogs = blogs;
        }

        if (Array.isArray(serverState.sitePortions) && serverState.sitePortions.length > 0) {
          setSitePortions(serverState.sitePortions);
          try {
            localStorage.setItem('ri8click_site_portions', JSON.stringify(serverState.sitePortions));
          } catch {}
        } else {
          seedPayload.sitePortions = sitePortions;
        }

        if (Array.isArray(serverState.userAccounts) && serverState.userAccounts.length > 0) {
          setUserAccounts(serverState.userAccounts);
          try {
            localStorage.setItem('ri8click_user_accounts', JSON.stringify(serverState.userAccounts));
          } catch {}
        } else {
          seedPayload.userAccounts = userAccounts;
        }

        if (Array.isArray(serverState.advibeProjects) && serverState.advibeProjects.length > 0) {
          setAdvibeProjects(serverState.advibeProjects);
          try {
            localStorage.setItem('ri8click_advibe_projects', JSON.stringify(serverState.advibeProjects));
          } catch {}
        } else {
          seedPayload.advibeProjects = advibeProjects;
        }

        if (Object.keys(seedPayload).length > 0) {
          syncUniversalStateToServer(seedPayload);
        }
      })
      .catch(() => {});

    // 2. Subscribe to real-time SSE stream so updates in any browser tab/session appear immediately
    const evtSource = new EventSource('/api/state/stream');
    evtSource.onmessage = event => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === 'STATE_UPDATED' && msg.state) {
          const st = msg.state;
          if (Array.isArray(st.properties)) {
            const cleanProps = sanitizePropertiesToPakistanRegion(st.properties);
            setProperties(cleanProps);
            try {
              localStorage.setItem('ri8click_properties_data', JSON.stringify(cleanProps));
            } catch {}
          }
          if (Array.isArray(st.agencies)) {
            const cleanAgencies = sanitizeAgenciesToPakistanRegion(st.agencies);
            setAgencies(cleanAgencies);
            try {
              localStorage.setItem('ri8click_agencies_data', JSON.stringify(cleanAgencies));
            } catch {}
          }
          if (Array.isArray(st.provinceCityData)) {
            setProvinceCityData(st.provinceCityData);
            try {
              localStorage.setItem('ri8click_locations_data', JSON.stringify(st.provinceCityData));
            } catch {}
          }
          if (Array.isArray(st.heroSlides)) {
            setHeroSlides(st.heroSlides);
            try {
              localStorage.setItem('ri8click_hero_slides', JSON.stringify(st.heroSlides));
            } catch {}
          }
          if (Array.isArray(st.blogs)) {
            setBlogs(st.blogs);
            try {
              localStorage.setItem('ri8click_blogs_data', JSON.stringify(st.blogs));
            } catch {}
          }
          if (Array.isArray(st.sitePortions)) {
            setSitePortions(st.sitePortions);
            try {
              localStorage.setItem('ri8click_site_portions', JSON.stringify(st.sitePortions));
            } catch {}
          }
          if (Array.isArray(st.userAccounts)) {
            setUserAccounts(st.userAccounts);
            try {
              localStorage.setItem('ri8click_user_accounts', JSON.stringify(st.userAccounts));
            } catch {}
          }
          if (Array.isArray(st.advibeProjects)) {
            setAdvibeProjects(st.advibeProjects);
            try {
              localStorage.setItem('ri8click_advibe_projects', JSON.stringify(st.advibeProjects));
            } catch {}
          }
          if (Array.isArray(st.advibeLeads)) {
            setAdvibeLeads(st.advibeLeads);
            try {
              localStorage.setItem('ri8click_advibe_leads', JSON.stringify(st.advibeLeads));
            } catch {}
          }
        }
      } catch {}
    };

    return () => {
      evtSource.close();
    };
  }, []);

  const handleUserLogin = (user: UserAccount) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    if (user.agencyId) {
      setCurrentAgencyId(user.agencyId);
    }
    try {
      localStorage.setItem('ri8click_current_user', JSON.stringify(user));
    } catch {}
  };

  const handleUserLogout = () => {
    setCurrentUser(null);
    setCurrentRole('customer');
    try {
      localStorage.removeItem('ri8click_current_user');
    } catch {}
  };

  const handleUpdateCurrentUser = (updatedUser: UserAccount) => {
    setCurrentUser(updatedUser);
    try {
      localStorage.setItem('ri8click_current_user', JSON.stringify(updatedUser));
    } catch {}
    const nextUsers = userAccounts.map(u => (u.id === updatedUser.id ? updatedUser : u));
    setUserAccounts(nextUsers);
    try {
      localStorage.setItem('ri8click_user_accounts', JSON.stringify(nextUsers));
    } catch {}
    syncUniversalStateToServer({ userAccounts: nextUsers });
  };

  const handleUpdateUserAccounts = (updatedUsers: UserAccount[]) => {
    setUserAccounts(updatedUsers);
    try {
      localStorage.setItem('ri8click_user_accounts', JSON.stringify(updatedUsers));
    } catch {}
    syncUniversalStateToServer({ userAccounts: updatedUsers });
  };

  const [currentRole, setCurrentRole] = useState<'admin' | 'agency' | 'customer'>(() => {
    return currentUser ? currentUser.role : 'customer';
  });
  const [currentAgencyId, setCurrentAgencyId] = useState<string>(() => {
    return currentUser?.agencyId || 'agency-1';
  });

  // Navigation & Modal States
  const [activeTab, setActiveTab] = useState('properties');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [tourProperty, setTourProperty] = useState<Property | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginModalReason, setLoginModalReason] = useState<'general' | 'admin_required' | 'agency_required' | 'advibe_required'>('general');
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState<AdminTabType>('overview');
  const [isAuthRoleModalOpen, setIsAuthRoleModalOpen] = useState(false);
  const [virtualTourProperty, setVirtualTourProperty] = useState<Partial<Property> | null>(null);

  const [activeAdvibeSlug, setActiveAdvibeSlug] = useState<string | null>(() => {
    const path = window.location.pathname;
    if (path.startsWith('/advibe/')) {
      return path.replace('/advibe/', '').split('/')[0] || null;
    }
    return null;
  });

  useEffect(() => {
    if (window.location.pathname === '/advibe' || window.location.pathname.startsWith('/advibe/')) {
      setActiveTab('advibe');
    }
    const handlePopState = () => {
      const p = window.location.pathname;
      if (p.startsWith('/advibe/')) {
        setActiveAdvibeSlug(p.replace('/advibe/', '').split('/')[0] || null);
        setActiveTab('advibe');
      } else if (p === '/advibe') {
        setActiveAdvibeSlug(null);
        setActiveTab('advibe');
      } else {
        setActiveAdvibeSlug(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToAdvibeListing = () => {
    setActiveTab('advibe');
    setActiveAdvibeSlug(null);
    window.history.pushState({}, '', '/advibe');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAdvibeProject = (slug: string) => {
    setActiveTab('advibe');
    setActiveAdvibeSlug(slug);
    window.history.pushState({}, '', `/advibe/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const nextProjects = advibeProjects.map(p =>
      p.slug === slug ? { ...p, viewsCount: (p.viewsCount || 0) + 1 } : p
    );
    setAdvibeProjects(nextProjects);
    try {
      localStorage.setItem('ri8click_advibe_projects', JSON.stringify(nextProjects));
    } catch {}
    syncUniversalStateToServer({ advibeProjects: nextProjects });
  };

  const handleSaveAdvibeProject = (project: AdVibeProject) => {
    const exists = advibeProjects.some(p => p.id === project.id);
    const updated = exists
      ? advibeProjects.map(p =>
          p.id === project.id
            ? { ...project, updatedAt: new Date().toISOString().split('T')[0] }
            : p
        )
      : [project, ...advibeProjects];
    setAdvibeProjects(updated);
    try {
      localStorage.setItem('ri8click_advibe_projects', JSON.stringify(updated));
    } catch {}
    syncUniversalStateToServer({ advibeProjects: updated });
  };

  const handleDeleteAdvibeProject = (projectId: string) => {
    const updated = advibeProjects.filter(p => p.id !== projectId);
    setAdvibeProjects(updated);
    try {
      localStorage.setItem('ri8click_advibe_projects', JSON.stringify(updated));
    } catch {}
    syncUniversalStateToServer({ advibeProjects: updated });
  };

  const handleDuplicateAdvibeProject = (projectId: string) => {
    const source = advibeProjects.find(p => p.id === projectId);
    if (!source) return;
    const copy: AdVibeProject = {
      ...source,
      id: `advibe-proj-${Date.now()}`,
      title: `${source.title} (Copy)`,
      slug: `${source.slug}-copy-${Date.now().toString().slice(-4)}`,
      status: 'draft',
      viewsCount: 0,
      leadsCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    const updated = [copy, ...advibeProjects];
    setAdvibeProjects(updated);
    try {
      localStorage.setItem('ri8click_advibe_projects', JSON.stringify(updated));
    } catch {}
    syncUniversalStateToServer({ advibeProjects: updated });
  };

  const handleSubmitAdvibeLead = (leadData: Omit<AdVibeLead, 'id' | 'createdAt' | 'status'>) => {
    const newLead: AdVibeLead = {
      ...leadData,
      id: `advibe-lead-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    const updatedLeads = [newLead, ...advibeLeads];
    setAdvibeLeads(updatedLeads);
    try {
      localStorage.setItem('ri8click_advibe_leads', JSON.stringify(updatedLeads));
    } catch {}
    syncUniversalStateToServer({ advibeLeads: updatedLeads });
  };

  const handleUpdateAdvibeLeadStatus = (leadId: string, status: AdVibeLead['status']) => {
    const updated = advibeLeads.map(l => (l.id === leadId ? { ...l, status } : l));
    setAdvibeLeads(updated);
    try {
      localStorage.setItem('ri8click_advibe_leads', JSON.stringify(updated));
    } catch {}
    syncUniversalStateToServer({ advibeLeads: updated });
  };

  const handleToggleAgencyAdvibePermission = (agencyId: string, allowed: boolean) => {
    const updated = agencies.map(a =>
      a.id === agencyId ? { ...a, canManageAdvibe: allowed } : a
    );
    setAgencies(updated);
    try {
      localStorage.setItem('ri8click_agencies_data', JSON.stringify(updated));
    } catch {}
    syncUniversalStateToServer({ agencies: updated });
  };

  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(['prop-comm-1', 'prop-res-1']);

  const currentAgency = useMemo(
    () => agencies.find(a => a.id === currentAgencyId) || agencies[0],
    [agencies, currentAgencyId]
  );

  const handleToggleSave = (propertyId: string) => {
    setSavedPropertyIds(prev =>
      prev.includes(propertyId) ? prev.filter(id => id !== propertyId) : [...prev, propertyId]
    );
  };

  const handleSelectProperty = (property: Property) => {
    const updated = properties.map(p =>
      p.id === property.id ? { ...p, viewsCount: (p.viewsCount || 0) + 1 } : p
    );
    setProperties(updated);
    try {
      localStorage.setItem('ri8click_properties_data', JSON.stringify(updated));
    } catch {}
    syncUniversalStateToServer({ properties: updated });
    setSelectedProperty({ ...property, viewsCount: (property.viewsCount || 0) + 1 });
  };

  const handleSelectBlog = (blog: BlogPost) => {
    const updated = blogs.map(b =>
      b.id === blog.id ? { ...b, viewsCount: b.viewsCount + 1 } : b
    );
    setBlogs(updated);
    try {
      localStorage.setItem('ri8click_blogs_data', JSON.stringify(updated));
    } catch {}
    syncUniversalStateToServer({ blogs: updated });
    setSelectedBlog({ ...blog, viewsCount: blog.viewsCount + 1 });
  };

  const handleUpdateHeroSlides = (updatedSlides: HeroSlide[]) => {
    setHeroSlides(updatedSlides);
    try {
      localStorage.setItem('ri8click_hero_slides', JSON.stringify(updatedSlides));
    } catch {}
    syncUniversalStateToServer({ heroSlides: updatedSlides });
  };

  const handleUpdateBlogs = (updatedBlogs: BlogPost[]) => {
    setBlogs(updatedBlogs);
    try {
      localStorage.setItem('ri8click_blogs_data', JSON.stringify(updatedBlogs));
    } catch {}
    syncUniversalStateToServer({ blogs: updatedBlogs });
  };

  const handleUpdatePortions = (updatedPortions: SiteSectionPortion[]) => {
    setSitePortions(updatedPortions);
    try {
      localStorage.setItem('ri8click_site_portions', JSON.stringify(updatedPortions));
    } catch {}
    syncUniversalStateToServer({ sitePortions: updatedPortions });
  };

  const handleResetPortions = () => {
    setSitePortions(initialSitePortions);
    try {
      localStorage.setItem('ri8click_site_portions', JSON.stringify(initialSitePortions));
    } catch {}
    syncUniversalStateToServer({ sitePortions: initialSitePortions });
  };

  const handleUpdateProvinceCityData = (updatedData: ProvinceCityData[]) => {
    setProvinceCityData(updatedData);
    try {
      localStorage.setItem('ri8click_locations_data', JSON.stringify(updatedData));
    } catch {}
    syncUniversalStateToServer({ provinceCityData: updatedData });
  };

  const handleUpdateProperties = (updatedProperties: Property[]) => {
    const cleanProps = sanitizePropertiesToPakistanRegion(updatedProperties);
    setProperties(cleanProps);
    try {
      localStorage.setItem('ri8click_properties_data', JSON.stringify(cleanProps));
    } catch {}
    syncUniversalStateToServer({ properties: cleanProps });
  };

  const initialFilterState: SearchFilterState = {
    searchQuery: '',
    purpose: 'all',
    category: 'all',
    province: '',
    city: '',
    society: '',
    propertyType: '',
    minPrice: 0,
    maxPrice: 1000000000,
    minBedrooms: null,
    agencyId: ''
  };

  const [filters, setFilters] = useState<SearchFilterState>(initialFilterState);

  const resetFilters = () => {
    setFilters(initialFilterState);
  };

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      if (p.status === 'pending') return false;

      if (filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchSoc = p.location.society.toLowerCase().includes(q);
        const matchCity = p.location.city.toLowerCase().includes(q);
        const matchAgent = p.agentName.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchSoc && !matchCity && !matchAgent) return false;
      }

      if (filters.purpose !== 'all' && p.purpose !== filters.purpose) return false;
      if (filters.category !== 'all' && p.category !== filters.category) return false;
      if (filters.province && p.location.province !== filters.province) return false;
      if (filters.city && p.location.city !== filters.city) return false;
      if (
        filters.society &&
        !p.location.society.toLowerCase().includes(filters.society.toLowerCase())
      )
        return false;
      if (filters.propertyType && p.type !== filters.propertyType) return false;
      if (filters.minBedrooms !== null && (p.bedrooms || 0) < filters.minBedrooms) return false;
      if (filters.agencyId && p.agencyId !== filters.agencyId) return false;

      return true;
    });
  }, [properties, filters]);

  const handleAddProperty = (newProp: Property) => {
    const cleanProp = sanitizePropertiesToPakistanRegion([newProp])[0];
    const updatedProps = [cleanProp, ...properties];
    setProperties(updatedProps);
    try {
      localStorage.setItem('ri8click_properties_data', JSON.stringify(updatedProps));
    } catch {}

    const updatedAgencies = agencies.map(ag =>
      ag.id === newProp.agencyId
        ? { ...ag, totalPosts: ag.totalPosts + 1, activeListings: ag.activeListings + 1 }
        : ag
    );
    setAgencies(updatedAgencies);
    try {
      localStorage.setItem('ri8click_agencies_data', JSON.stringify(updatedAgencies));
    } catch {}

    syncUniversalStateToServer({
      properties: updatedProps,
      agencies: updatedAgencies
    });
  };

  const handleUpdateAgencyLimit = (agencyId: string, newLimit: number) => {
    const updated = agencies.map(ag =>
      ag.id === agencyId ? { ...ag, postLimit: newLimit } : ag
    );
    setAgencies(updated);
    try {
      localStorage.setItem('ri8click_agencies_data', JSON.stringify(updated));
    } catch {}
    syncUniversalStateToServer({ agencies: updated });
  };

  const handleAddNewAgency = (newAgency: AgencyAccount) => {
    const cleanNew = sanitizeAgenciesToPakistanRegion([newAgency])[0];
    const updated = [cleanNew, ...agencies];
    setAgencies(updated);
    try {
      localStorage.setItem('ri8click_agencies_data', JSON.stringify(updated));
    } catch {}
    syncUniversalStateToServer({ agencies: updated });
    setCurrentAgencyId(cleanNew.id);
  };

  const savedPropertiesList = useMemo(
    () => properties.filter(p => savedPropertyIds.includes(p.id) && p.status !== 'pending'),
    [properties, savedPropertyIds]
  );

  const isPortionEnabled = (key: SiteSectionPortion['key']) => {
    const portion = sitePortions.find(p => p.key === key);
    return portion ? portion.isEnabled : true;
  };

  const getPortionTitle = (key: SiteSectionPortion['key'], fallback: string) => {
    const portion = sitePortions.find(p => p.key === key);
    return portion ? portion.title : fallback;
  };

  if (activeAdvibeSlug) {
    const activeProject =
      advibeProjects.find(p => p.slug === activeAdvibeSlug || p.id === activeAdvibeSlug) ||
      advibeProjects[0];

    if (activeProject) {
      return (
        <div className="min-h-screen bg-slate-950 text-white font-sans">
          <AdVibeProjectScrollyPage
            project={activeProject}
            allProperties={properties.filter(p => p.status !== 'pending')}
            onBackToPortal={() => {
              setActiveAdvibeSlug(null);
              setActiveTab('advibe');
              window.history.pushState({}, '', '/advibe');
            }}
            onSelectProperty={prop => setSelectedProperty(prop)}
            onSubmitLead={handleSubmitAdvibeLead}
          />
          <PropertyDetailModal
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
            isSaved={selectedProperty ? savedPropertyIds.includes(selectedProperty.id) : false}
            onToggleSave={handleToggleSave}
            onScheduleTour={prop => setTourProperty(prop)}
          />
          <ScheduleTourModal
            isOpen={Boolean(tourProperty)}
            onClose={() => setTourProperty(null)}
            property={tourProperty}
          />
          <FloatingWhatsApp />
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={tab => {
          if (tab === 'advibe') {
            navigateToAdvibeListing();
          } else {
            setActiveTab(tab);
            setActiveAdvibeSlug(null);
            if (window.location.pathname !== '/') {
              window.history.pushState({}, '', '/');
            }
          }
        }}
        savedPropertiesCount={savedPropertiesList.length}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        onOpenPostModal={() => {
          if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'agency')) {
            setLoginModalReason('agency_required');
            setIsLoginModalOpen(true);
          } else {
            setIsPostModalOpen(true);
          }
        }}
        onOpenScheduleModal={() => setTourProperty(properties[0])}
        onOpenAdmin={() => {
          if (!currentUser || currentUser.role !== 'admin') {
            setLoginModalReason('admin_required');
            setIsLoginModalOpen(true);
          } else {
            setAdminInitialTab('overview');
            setIsAdminModalOpen(true);
          }
        }}
        onOpenAuthRoleModal={() => {
          if (!currentUser) {
            setLoginModalReason('general');
            setIsLoginModalOpen(true);
          } else {
            setIsAuthRoleModalOpen(true);
          }
        }}
        currentRole={currentRole}
        currentAgency={currentAgency}
        currentUser={currentUser}
        onOpenLoginModal={reason => {
          setLoginModalReason(reason || 'general');
          setIsLoginModalOpen(true);
        }}
        onLogout={handleUserLogout}
      />

      {activeTab === 'advibe' ? (
        <AdVibeListingPage
          projects={advibeProjects}
          onOpenProject={slug => navigateToAdvibeProject(slug)}
          onOpenCreateProject={() => {
            if (
              !currentUser ||
              (currentUser.role !== 'admin' && !currentAgency?.canManageAdvibe)
            ) {
              setLoginModalReason('advibe_required');
              setIsLoginModalOpen(true);
            } else {
              setAdminInitialTab('advibe');
              setIsAdminModalOpen(true);
            }
          }}
          canManageAdvibe={
            Boolean(currentUser) &&
            (currentRole === 'admin' || Boolean(currentAgency?.canManageAdvibe))
          }
        />
      ) : (
        <>
          {isPortionEnabled('hero_slider') && (
            <HeroSection
              slides={heroSlides}
              properties={properties}
              onExploreClick={() => {
                document
                  .getElementById('properties-grid-section')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              onContactAgentClick={() => setTourProperty(properties[0])}
              onSelectCategoryFilter={cat => {
                setFilters(prev => ({ ...prev, category: cat }));
                setTimeout(() => {
                  document
                    .getElementById('properties-grid-section')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              onOpen3DTour={propData => setVirtualTourProperty(propData)}
            />
          )}

          {isPortionEnabled('search_bar') && (
            <SearchFilterBar
              filters={filters}
              setFilters={setFilters}
              provinceCityData={provinceCityData}
              totalResultsCount={filteredProperties.length}
              onResetFilters={resetFilters}
            />
          )}

          {isPortionEnabled('properties_grid') && (
            <main
              id="properties-grid-section"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-5">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Verified Multi-Agent Listings</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {filters.city
                      ? `Properties in ${filters.city}${
                          filters.society ? ` • ${filters.society}` : ''
                        }`
                      : getPortionTitle(
                          'properties_grid',
                          'Featured Properties in Taxila, Faisal Hills & Pakistan'
                        )}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: 'all', label: 'All Listings' },
                    { id: 'commercial', label: 'Commercial' },
                    { id: 'residential', label: 'Residential' },
                    { id: 'modular', label: 'Capsule Homes' },
                    { id: 'projects', label: 'New Projects' }
                  ].map(pill => (
                    <button
                      key={pill.id}
                      onClick={() => setFilters(prev => ({ ...prev, category: pill.id as any }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        filters.category === pill.id
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                      }`}
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>
              </div>

              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map(property => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      isSaved={savedPropertyIds.includes(property.id)}
                      onToggleSave={handleToggleSave}
                      onSelectProperty={handleSelectProperty}
                      onScheduleTour={prop => setTourProperty(prop)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto my-6 space-y-4 shadow-2xs">
                  <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center mx-auto">
                    <SlidersHorizontal className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    No Matching Properties Found
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We couldn't find any active listings matching your current filter criteria. Try resetting your filters or selecting another society.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Search Filters</span>
                  </button>
                </div>
              )}
            </main>
          )}

          {isPortionEnabled('commercial_showcase') && (
            <CommercialShowcase
              properties={properties}
              savedPropertyIds={savedPropertyIds}
              onToggleSave={handleToggleSave}
              onSelectProperty={handleSelectProperty}
              onScheduleTour={prop => setTourProperty(prop)}
              onViewAllCommercial={() => {
                setFilters(prev => ({ ...prev, category: 'commercial' }));
                document
                  .getElementById('properties-grid-section')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          )}

          {isPortionEnabled('modular_showcase') && (
            <ModularHomesShowcase
              properties={properties}
              savedPropertyIds={savedPropertyIds}
              onToggleSave={handleToggleSave}
              onSelectProperty={handleSelectProperty}
              onScheduleTour={prop => setTourProperty(prop)}
              onWhatsAppInquiry={subject => {
                window.open(
                  `https://wa.me/923365666727?text=${encodeURIComponent(
                    `Assalam o Alaikum ri8click, I want complete pricing and brochure for: ${subject}`
                  )}`,
                  '_blank'
                );
              }}
            />
          )}

          {isPortionEnabled('news_blogs_section') && (
            <NewsBlogsSection
              blogs={blogs}
              onSelectBlog={handleSelectBlog}
              onOpenAdminBlogManager={() => {
                if (!currentUser || currentUser.role !== 'admin') {
                  setLoginModalReason('admin_required');
                  setIsLoginModalOpen(true);
                } else {
                  setAdminInitialTab('blogs');
                  setIsAdminModalOpen(true);
                }
              }}
            />
          )}

          {isPortionEnabled('agencies_network') && (
            <AgenciesSection
              agencies={agencies}
              properties={properties}
              onOpenRegisterAgency={() => {
                if (!currentUser || currentUser.role !== 'admin') {
                  setLoginModalReason('admin_required');
                  setIsLoginModalOpen(true);
                } else {
                  setAdminInitialTab('agencies');
                  setIsAdminModalOpen(true);
                }
              }}
              onFilterByAgency={agencyId => {
                setFilters(prev => ({ ...prev, agencyId }));
                document
                  .getElementById('properties-grid-section')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          )}

          {isPortionEnabled('consortium_showcase') && (
            <ConsortiumShowcase
              divisions={consortiumDivisions}
              onContactDivision={div => {
                window.open(
                  `https://wa.me/${div.contactWhatsApp}?text=${encodeURIComponent(
                    `Assalam o Alaikum, I am inquiring about ${div.title} on ri8click.`
                  )}`,
                  '_blank'
                );
              }}
            />
          )}
        </>
      )}

      <Footer
        onOpenAdmin={() => {
          if (!currentUser || currentUser.role !== 'admin') {
            setLoginModalReason('admin_required');
            setIsLoginModalOpen(true);
          } else {
            setAdminInitialTab('overview');
            setIsAdminModalOpen(true);
          }
        }}
        onSelectCity={city => {
          setActiveTab('properties');
          setActiveAdvibeSlug(null);
          setFilters(prev => ({ ...prev, city, society: '' }));
          document
            .getElementById('properties-grid-section')
            ?.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectSociety={(city, society) => {
          setActiveTab('properties');
          setActiveAdvibeSlug(null);
          setFilters(prev => ({ ...prev, city, society }));
          document
            .getElementById('properties-grid-section')
            ?.scrollIntoView({ behavior: 'smooth' });
        }}
        onNavigateSection={section => {
          if (section === 'advibe') {
            navigateToAdvibeListing();
            return;
          }
          setActiveTab(section);
          setActiveAdvibeSlug(null);
          const idMap: Record<string, string> = {
            properties: 'properties-grid-section',
            commercial: 'commercial-section',
            modular: 'modular-section',
            consortium: 'consortium-section',
            agents: 'agents-section',
            blogs: 'blogs-section'
          };
          const targetId = idMap[section];
          if (targetId) {
            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />

      <VirtualTour3DModal
        isOpen={Boolean(virtualTourProperty)}
        onClose={() => setVirtualTourProperty(null)}
        property={virtualTourProperty}
        onSchedulePhysicalVisit={() => {
          setVirtualTourProperty(null);
          setTourProperty(properties[0]);
        }}
      />

      <AuthRoleModal
        isOpen={isAuthRoleModalOpen}
        onClose={() => setIsAuthRoleModalOpen(false)}
        currentRole={currentRole}
        onSelectRole={role => setCurrentRole(role)}
        agencies={agencies}
        currentAgencyId={currentAgencyId}
        onSelectAgency={id => setCurrentAgencyId(id)}
        onOpenAdminHub={() => {
          if (!currentUser || currentUser.role !== 'admin') {
            setLoginModalReason('admin_required');
            setIsLoginModalOpen(true);
          } else {
            setAdminInitialTab('overview');
            setIsAdminModalOpen(true);
          }
        }}
        onOpenPostProperty={() => {
          if (
            !currentUser ||
            (currentUser.role !== 'admin' && currentUser.role !== 'agency')
          ) {
            setLoginModalReason('agency_required');
            setIsLoginModalOpen(true);
          } else {
            setIsPostModalOpen(true);
          }
        }}
      />

      <AuthLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        accounts={userAccounts}
        currentUser={currentUser}
        onLoginSuccess={user => {
          handleUserLogin(user);
          if (loginModalReason === 'admin_required' && user.role === 'admin') {
            setAdminInitialTab('overview');
            setIsAdminModalOpen(true);
          } else if (
            loginModalReason === 'agency_required' &&
            (user.role === 'admin' || user.role === 'agency')
          ) {
            setIsPostModalOpen(true);
          } else if (loginModalReason === 'advibe_required') {
            setAdminInitialTab('advibe');
            setIsAdminModalOpen(true);
          }
        }}
        onLogout={handleUserLogout}
        reasonMessage={
          loginModalReason === 'admin_required'
            ? 'Super Admin authentication is required to access the Management Console.'
            : loginModalReason === 'agency_required'
            ? 'Please sign in with a Certified Agency or Super Admin account to publish listings.'
            : loginModalReason === 'advibe_required'
            ? 'Authorized Dealer or Super Admin sign-in is required to manage AdVibe projects.'
            : undefined
        }
      />

      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        isSaved={selectedProperty ? savedPropertyIds.includes(selectedProperty.id) : false}
        onToggleSave={handleToggleSave}
        onScheduleTour={prop => setTourProperty(prop)}
      />

      <BlogDetailModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />

      <ScheduleTourModal
        isOpen={Boolean(tourProperty)}
        onClose={() => setTourProperty(null)}
        property={tourProperty}
      />

      <PostPropertyModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        currentAgency={currentAgency}
        provinceCityData={provinceCityData}
        onUpdateProvinceCityData={handleUpdateProvinceCityData}
        onAddProperty={handleAddProperty}
        onOpenAdmin={() => {
          setAdminInitialTab('agencies');
          setIsAdminModalOpen(true);
        }}
        currentRole={currentRole}
        isSuperAdmin={currentRole === 'admin'}
        onOpenRoleSwitcher={() => setIsAuthRoleModalOpen(true)}
      />

      <SavedPropertiesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedProperties={savedPropertiesList}
        onRemoveSaved={handleToggleSave}
        onSelectProperty={handleSelectProperty}
      />

      <AdminHubModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        initialTab={adminInitialTab}
        properties={properties}
        onUpdateProperties={handleUpdateProperties}
        onViewProperty={prop => {
          setIsAdminModalOpen(false);
          handleSelectProperty(prop);
        }}
        onOpenVirtualTour={prop => {
          setIsAdminModalOpen(false);
          setVirtualTourProperty(prop);
        }}
        agencies={agencies}
        onUpdateAgencyLimit={handleUpdateAgencyLimit}
        onAddNewAgency={handleAddNewAgency}
        provinceCityData={provinceCityData}
        onUpdateProvinceCityData={handleUpdateProvinceCityData}
        heroSlides={heroSlides}
        onUpdateHeroSlides={handleUpdateHeroSlides}
        blogs={blogs}
        onUpdateBlogs={handleUpdateBlogs}
        onViewBlog={blog => {
          setIsAdminModalOpen(false);
          setSelectedBlog(blog);
        }}
        portions={sitePortions}
        onUpdatePortions={handleUpdatePortions}
        onResetPortions={handleResetPortions}
        advibeProjects={advibeProjects}
        advibeLeads={advibeLeads}
        onSaveAdvibeProject={handleSaveAdvibeProject}
        onDeleteAdvibeProject={handleDeleteAdvibeProject}
        onDuplicateAdvibeProject={handleDuplicateAdvibeProject}
        onUpdateAdvibeLeadStatus={handleUpdateAdvibeLeadStatus}
        onToggleAgencyAdvibePermission={handleToggleAgencyAdvibePermission}
        onPreviewAdvibeProject={slug => {
          setIsAdminModalOpen(false);
          navigateToAdvibeProject(slug);
        }}
        currentRole={currentRole}
        isSuperAdmin={currentRole === 'admin'}
        currentUser={currentUser}
        allUsers={userAccounts}
        onUpdateCurrentUser={handleUpdateCurrentUser}
        onUpdateAllUsers={handleUpdateUserAccounts}
        onOpenRoleSwitcher={() => {
          setIsAdminModalOpen(false);
          setIsAuthRoleModalOpen(true);
        }}
      />

      <AiChatbot />
      <FloatingWhatsApp />
      <ScrollToTop />
    </div>
  );
}

export default App;

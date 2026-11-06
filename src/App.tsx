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
import { AdvibeListingPage } from './components/advibe/AdvibeListingPage';
import { AdvibeProjectScrollyPage } from './components/advibe/AdvibeProjectScrollyPage';

import {
  initialProperties,
  initialAgencies,
  initialProvinceCityData,
  initialConsortiumDivisions,
  initialHeroSlides,
  initialBlogPosts,
  initialSitePortions
} from './data/mockData';
import { initialAdvibeProjects, initialAdvibeLeads } from './data/advibeDemoData';
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
import { Sparkles, SlidersHorizontal, RotateCcw } from 'lucide-react';

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
        return [...parsed, ...missingDefaults].map((u, idx) => {
          const defaultAcc = initialUserAccounts.find(d => d.id === u.id || d.username === u.username);
          return {
            ...u,
            password: u.password || defaultAcc?.password || 'admin123',
            avatar: resolvePakistanAgentAvatar(u.avatar, `${u.agencyId || ''} ${u.name}`, idx)
          };
        });
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
      headers: {
        'Content-Type': 'application/json',
        'x-user-role': currentUser?.role || 'customer',
        'x-agency-id': currentUser?.agencyId || ''
      },
      body: JSON.stringify(payload)
    }).catch(err => console.warn('Universal state sync notice:', err));
  };

  useEffect(() => {
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
          const mergedAccounts = serverState.userAccounts.map((u: UserAccount, idx: number) => {
            const localMatch = userAccounts.find(l => l.id === u.id || l.username === u.username);
            const defaultMatch = initialUserAccounts.find(d => d.id === u.id || d.username === u.username);
            return {
              ...u,
              password: u.password || localMatch?.password || defaultMatch?.password || 'admin123',
              avatar: resolvePakistanAgentAvatar(u.avatar, `${u.agencyId || ''} ${u.name}`, idx)
            };
          });
          setUserAccounts(mergedAccounts);
          try {
            localStorage.setItem('ri8click_user_accounts', JSON.stringify(mergedAccounts));
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
            setUserAccounts(prev =>
              st.userAccounts.map((u: UserAccount, idx: number) => {
                const existing = prev.find(p => p.id === u.id || p.username === u.username);
                const def = initialUserAccounts.find(d => d.id === u.id || d.username === u.username);
                return {
                  ...u,
                  password: u.password || existing?.password || def?.password || 'admin123',
                  avatar: resolvePakistanAgentAvatar(u.avatar, `${u.agencyId || ''} ${u.name}`, idx)
                };
              })
            );
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

  const [currentRole, setCurrentRole] = useState<'admin' | 'agency' | 'customer'>(() => {
    return currentUser ? currentUser.role : 'customer';
  });
  const [currentAgencyId, setCurrentAgencyId] = useState<string>(() => {
    return currentUser?.agencyId || 'agency-1';
  });

  const currentAgency = useMemo(() => {
    return agencies.find(a => a.id === currentAgencyId) || agencies[0];
  }, [agencies, currentAgencyId]);

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

  // Navigation & Modal States
  const [activeTab, setActiveTab] = useState('properties');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [tourProperty, setTourProperty] = useState<Property | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginModalReason, setLoginModalReason] = useState<
    'general' | 'admin_required' | 'agency_required' | 'advibe_required'
  >('general');
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState<AdminTabType>('overview');
  const [isAuthRoleModalOpen, setIsAuthRoleModalOpen] = useState(false);
  const [virtualTourProperty, setVirtualTourProperty] = useState<Property | null>(null);

  const [activeAdvibeSlug, setActiveAdvibeSlug] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/advibe/')) {
        return path.replace('/advibe/', '').split('/')[0] || null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
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
    if (typeof window !== 'undefined' && window.history.pushState) {
      window.history.pushState({}, '', '/advibe');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToAdvibeProject = (slug: string) => {
    setActiveTab('advibe');
    setActiveAdvibeSlug(slug);
    if (typeof window !== 'undefined' && window.history.pushState) {
      window.history.pushState({}, '', `/advibe/${slug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
      status: 'Booking Open',
      viewsCount: 0,
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

  const handleToggleSave = (propertyId: string) => {
    setSavedPropertyIds(prev =>
      prev.includes(propertyId) ? prev.filter(id => id !== propertyId) : [...prev, propertyId]
    );
  };

  const clearAllSaved = () => {
    setSavedPropertyIds([]);
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
      b.id === blog.id ? { ...b, viewsCount: (b.viewsCount || 0) + 1 } : b
    );
    setBlogs(updated);
    try {
      localStorage.setItem('ri8click_blogs_data', JSON.stringify(updated));
    } catch {}
    syncUniversalStateToServer({ blogs: updated });
    setSelectedBlog({ ...blog, viewsCount: (blog.viewsCount || 0) + 1 });
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
      if (filters.province && filters.province !== 'All Provinces' && p.location.province !== filters.province) return false;
      if (filters.city && filters.city !== 'All Cities' && p.location.city.toLowerCase() !== filters.city.toLowerCase()) return false;
      if (
        filters.society &&
        filters.society !== 'All Societies' &&
        filters.society !== 'Show All' &&
        filters.society !== 'all' &&
        !p.location.society.toLowerCase().includes(filters.society.toLowerCase())
      ) {
        return false;
      }
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

  const handleOpenVirtualTourFromPartial = (propData: Partial<Property>) => {
    const fullProp: Property = {
      id: propData.id || `tour-${Date.now()}`,
      title: propData.title || 'Ri8Click Showcase Tour',
      description: propData.description || '360° interactive architectural tour.',
      purpose: propData.purpose || 'for_sale',
      category: propData.category || 'commercial',
      type: propData.type || 'Highrise Project',
      price: propData.price || 25000000,
      priceFormatted: propData.priceFormatted || 'PKR 2.5 Crore',
      currency: 'PKR',
      location: propData.location || {
        province: 'Islamabad Capital Territory',
        city: 'Islamabad / Taxila',
        society: 'Faisal Hills & Blue Area',
        address: 'Main Boulevard'
      },
      area: propData.area || '1000',
      areaUnit: propData.areaUnit || 'Sq Ft',
      features: propData.features || ['Ri8Click Thermal UPVC', 'Verified Legal NOC'],
      images:
        propData.images && propData.images.length > 0
          ? propData.images
          : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
      virtualTourVideoUrl: propData.virtualTourVideoUrl,
      virtualTourVideoTitle: propData.virtualTourVideoTitle,
      hasVirtualTour: true,
      watermark: true,
      agencyId: propData.agencyId || 'agency-1',
      agentName: propData.agentName || 'Malik Zeeshan',
      agentCompany: propData.agentCompany || 'Al-Mairaj Real Estate & Builders',
      agentPhone: propData.agentPhone || '+92 336-5666727',
      agentWhatsApp: propData.agentWhatsApp || '923365666727',
      agentAvatar: resolvePakistanAgentAvatar(propData.agentAvatar, 'agency-1'),
      agentVerified: true,
      agentRating: 4.9,
      isFeatured: true,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setVirtualTourProperty(fullProp);
  };

  if (activeAdvibeSlug) {
    const activeProject =
      advibeProjects.find(p => p.slug === activeAdvibeSlug || p.id === activeAdvibeSlug) ||
      advibeProjects[0];

    if (activeProject) {
      return (
        <div className="min-h-screen bg-slate-950 text-white font-sans">
          <AdvibeProjectScrollyPage
            project={activeProject}
            properties={properties.filter(p => p.status !== 'pending')}
            onBackToListing={() => {
              setActiveAdvibeSlug(null);
              setActiveTab('advibe');
              if (typeof window !== 'undefined' && window.history.pushState) {
                window.history.pushState({}, '', '/advibe');
              }
            }}
            onSelectProperty={prop => setSelectedProperty(prop)}
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
            if (typeof window !== 'undefined' && window.location.pathname !== '/') {
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
        onOpenScheduleModal={() => setTourProperty(properties[0] || null)}
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
        <AdvibeListingPage
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
              onContactAgentClick={() => setTourProperty(properties[0] || null)}
              onSelectCategoryFilter={cat => {
                setFilters(prev => ({ ...prev, category: cat }));
                setTimeout(() => {
                  document
                    .getElementById('properties-grid-section')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              onOpen3DTour={propData => handleOpenVirtualTourFromPartial(propData)}
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
                    We couldn&apos;t find any active listings matching your current filter criteria. Try resetting your filters or selecting another society.
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

          {isPortionEnabled('modular_houses') && (
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

          {isPortionEnabled('verified_agencies') && (
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

          {isPortionEnabled('consortium_section') && (
            <ConsortiumShowcase
              divisions={consortiumDivisions}
              onSelectDivisionContact={div => {
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
        divisions={consortiumDivisions}
        currentUser={currentUser}
        onOpenLogin={() => {
          setLoginModalReason('general');
          setIsLoginModalOpen(true);
        }}
        onOpenAdmin={() => {
          if (!currentUser || currentUser.role !== 'admin') {
            setLoginModalReason('admin_required');
            setIsLoginModalOpen(true);
          } else {
            setAdminInitialTab('overview');
            setIsAdminModalOpen(true);
          }
        }}
        onSelectSociety={society => {
          setActiveTab('properties');
          setActiveAdvibeSlug(null);
          setFilters(prev => ({ ...prev, society }));
          document
            .getElementById('properties-grid-section')
            ?.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectNavTab={section => {
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
            news_blogs: 'news-blogs-section'
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
        onScheduleVisit={prop => {
          setVirtualTourProperty(null);
          setTourProperty(prop);
        }}
      />

      <AuthRoleModal
        isOpen={isAuthRoleModalOpen}
        onClose={() => setIsAuthRoleModalOpen(false)}
        currentRole={currentRole}
        currentAgency={currentAgency}
        allAgencies={agencies}
        agencies={agencies}
        onSelectRole={role => setCurrentRole(role)}
        onSelectAgency={id => setCurrentAgencyId(id)}
        onOpenAdminHub={() => {
          setIsAuthRoleModalOpen(false);
          if (!currentUser || currentUser.role !== 'admin') {
            setLoginModalReason('admin_required');
            setIsLoginModalOpen(true);
          } else {
            setAdminInitialTab('overview');
            setIsAdminModalOpen(true);
          }
        }}
        onOpenPostProperty={() => {
          setIsAuthRoleModalOpen(false);
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
        currentUser={currentUser}
        agencies={agencies}
        requiredReason={loginModalReason}
        onLogin={user => {
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
      />

      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        isSaved={selectedProperty ? savedPropertyIds.includes(selectedProperty.id) : false}
        onToggleSave={handleToggleSave}
        onScheduleTour={prop => {
          setSelectedProperty(null);
          setTourProperty(prop);
        }}
      />

      <BlogDetailModal
        blog={selectedBlog}
        onClose={() => setSelectedBlog(null)}
        onOpenPropertySearch={society => {
          setFilters(prev => ({ ...prev, society }));
          setSelectedBlog(null);
          document.getElementById('properties-grid-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

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
        onToggleSave={handleToggleSave}
        onSelectProperty={handleSelectProperty}
        onScheduleTour={prop => setTourProperty(prop)}
        onClearAllSaved={clearAllSaved}
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

      <AiChatbot
        properties={properties.filter(p => p.status !== 'pending')}
        onSelectProperty={handleSelectProperty}
      />
      <FloatingWhatsApp />
      <ScrollToTop />
    </div>
  );
}

export default App;

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SearchFilterBar } from './components/SearchFilterBar';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { CommercialShowcase } from './components/CommercialShowcase';
import { ModularHomesShowcase } from './components/ModularHomesShowcase';
import { AgenciesSection, resolvePakistanAgentAvatar } from './components/AgenciesSection';
import { ConsortiumShowcase } from './components/ConsortiumShowcase';
import { NewsBlogsSection } from './components/NewsBlogsSection';
import { BlogDetailModal } from './components/BlogDetailModal';
import { AdminHubModal } from './components/AdminHubModal';
import { PostPropertyModal } from './components/PostPropertyModal';
import { ScheduleTourModal } from './components/ScheduleTourModal';
import { SavedPropertiesModal } from './components/SavedPropertiesModal';
import { VirtualTour3DModal } from './components/VirtualTour3DModal';
import { AiChatbot } from './components/AiChatbot';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ScrollToTop } from './components/ScrollToTop';
import { Footer } from './components/Footer';
import { AuthLoginModal } from './components/AuthLoginModal';
import { AuthRoleModal } from './components/AuthRoleModal';
import { AdvibeListingPage } from './components/advibe/AdvibeListingPage';
import { AdvibeProjectScrollyPage } from './components/advibe/AdvibeProjectScrollyPage';

import {
  INITIAL_PROPERTIES,
  INITIAL_AGENCIES,
  INITIAL_PROVINCE_CITIES,
  CONSORTIUM_DIVISIONS,
  INITIAL_HERO_SLIDES,
  INITIAL_BLOGS,
  INITIAL_SITE_PORTIONS
} from './data/mockData';
import { DEFAULT_USER_ACCOUNTS, UserAccount } from './data/defaultAccounts';
import { initialAdvibeProjects, initialAdvibeLeads } from './data/advibeDemoData';
import {
  Property,
  AgencyAccount,
  ProvinceCityData,
  HeroSlide,
  BlogPost,
  SiteSectionPortion,
  FilterState,
  PropertyCategory,
  AdVibeProject,
  AdVibeLead
} from './types';
import { SlidersHorizontal, Sparkles, Plus, RefreshCw } from 'lucide-react';

const DECK_SCHEMA_VERSION = 'ri8click_deck_v2_16slides';

function sanitizePropertiesToPakistanAvatars(props: Property[]): Property[] {
  if (!Array.isArray(props)) return INITIAL_PROPERTIES;
  return props.map(p => ({
    ...p,
    agentAvatar: resolvePakistanAgentAvatar(p.agentAvatar, p.agencyId || p.agentName)
  }));
}

function sanitizeAgenciesToPakistanAvatars(agencies: AgencyAccount[]): AgencyAccount[] {
  if (!Array.isArray(agencies)) return INITIAL_AGENCIES;
  return agencies.map(a => {
    const cleanAvatar = resolvePakistanAgentAvatar((a as any).avatar || a.logo, a.id);
    return {
      ...a,
      logo: cleanAvatar,
      avatar: cleanAvatar
    } as AgencyAccount;
  });
}

/**
 * Ensures legacy 5-slide caches are upgraded to the full 16-slide Portfolio Deck
 * on first migration, while respecting any subsequent Admin deletions/reordering.
 */
function loadInitialSlides(): HeroSlide[] {
  try {
    const migratedFlag = localStorage.getItem(DECK_SCHEMA_VERSION);
    const saved = localStorage.getItem('ri8click_hero_slides');
    if (saved && migratedFlag === 'true') {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    localStorage.setItem(DECK_SCHEMA_VERSION, 'true');
    localStorage.setItem('ri8click_hero_slides', JSON.stringify(INITIAL_HERO_SLIDES));
  } catch {}
  return INITIAL_HERO_SLIDES;
}

export function App() {
  // ============================================================================
  // UNIVERSAL PORTAL STATE (REAL-TIME SERVER + CROSS-BROWSER SYNCED)
  // ============================================================================
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem('ri8click_properties_data');
      if (saved) return sanitizePropertiesToPakistanAvatars(JSON.parse(saved));
    } catch {}
    return INITIAL_PROPERTIES;
  });

  const [agencies, setAgencies] = useState<AgencyAccount[]>(() => {
    try {
      const saved = localStorage.getItem('ri8click_agencies_data');
      if (saved) return sanitizeAgenciesToPakistanAvatars(JSON.parse(saved));
    } catch {}
    return INITIAL_AGENCIES;
  });

  const [provinceCityData, setProvinceCityData] = useState<ProvinceCityData[]>(() => {
    try {
      const saved = localStorage.getItem('ri8click_locations_data');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_PROVINCE_CITIES;
  });

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(loadInitialSlides);

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('ri8click_blogs_data');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_BLOGS;
  });

  const [sitePortions, setSitePortions] = useState<SiteSectionPortion[]>(() => {
    try {
      const saved = localStorage.getItem('ri8click_site_portions');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_SITE_PORTIONS;
  });

  const [userAccounts, setUserAccounts] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem('ri8click_user_accounts');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_USER_ACCOUNTS;
  });

  const [advibeProjects, setAdvibeProjects] = useState<AdVibeProject[]>(() => {
    try {
      const saved = localStorage.getItem('ri8click_advibe_projects');
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialAdvibeProjects;
  });

  const [advibeLeads, setAdvibeLeads] = useState<AdVibeLead[]>(() => {
    try {
      const saved = localStorage.getItem('ri8click_advibe_leads');
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialAdvibeLeads;
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('ri8click_current_user');
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  });

  const lastRevisionRef = useRef<number>(0);
  const lastUpdatedAtRef = useRef<string>('');

  const applyIncomingServerState = useCallback((remote: any) => {
    if (!remote || typeof remote !== 'object') return;

    if (typeof remote.revision === 'number') {
      lastRevisionRef.current = remote.revision;
    }
    if (typeof remote.updatedAt === 'string') {
      lastUpdatedAtRef.current = remote.updatedAt;
    }

    if (Array.isArray(remote.properties) && remote.properties.length > 0) {
      const clean = sanitizePropertiesToPakistanAvatars(remote.properties);
      setProperties(clean);
      localStorage.setItem('ri8click_properties_data', JSON.stringify(clean));
    }
    if (Array.isArray(remote.agencies) && remote.agencies.length > 0) {
      const clean = sanitizeAgenciesToPakistanAvatars(remote.agencies);
      setAgencies(clean);
      localStorage.setItem('ri8click_agencies_data', JSON.stringify(clean));
    }
    if (Array.isArray(remote.provinceCityData) && remote.provinceCityData.length > 0) {
      setProvinceCityData(remote.provinceCityData);
      localStorage.setItem('ri8click_locations_data', JSON.stringify(remote.provinceCityData));
    }
    if (Array.isArray(remote.heroSlides) && remote.heroSlides.length > 0) {
      // If server still had old 5-slide seed (`slide-1`..`slide-5`), upgrade it to the 16-slide Portfolio Deck
      const isLegacy5SlideSeed =
        remote.heroSlides.length === 5 &&
        remote.heroSlides.every((s: any) => /^slide-[1-5]$/.test(s.id));

      if (!isLegacy5SlideSeed) {
        setHeroSlides(remote.heroSlides);
        localStorage.setItem('ri8click_hero_slides', JSON.stringify(remote.heroSlides));
        localStorage.setItem(DECK_SCHEMA_VERSION, 'true');
      }
    }
    if (Array.isArray(remote.blogs) && remote.blogs.length > 0) {
      setBlogs(remote.blogs);
      localStorage.setItem('ri8click_blogs_data', JSON.stringify(remote.blogs));
    }
    if (Array.isArray(remote.sitePortions) && remote.sitePortions.length > 0) {
      setSitePortions(remote.sitePortions);
      localStorage.setItem('ri8click_site_portions', JSON.stringify(remote.sitePortions));
    }
    if (Array.isArray(remote.userAccounts) && remote.userAccounts.length > 0) {
      setUserAccounts(remote.userAccounts);
      localStorage.setItem('ri8click_user_accounts', JSON.stringify(remote.userAccounts));
    }
    if (Array.isArray(remote.advibeProjects) && remote.advibeProjects.length > 0) {
      setAdvibeProjects(remote.advibeProjects);
      localStorage.setItem('ri8click_advibe_projects', JSON.stringify(remote.advibeProjects));
    }
    if (Array.isArray(remote.advibeLeads)) {
      setAdvibeLeads(remote.advibeLeads);
      localStorage.setItem('ri8click_advibe_leads', JSON.stringify(remote.advibeLeads));
    }
  }, []);

  const pushStateToServer = useCallback((partialState: Record<string, any>) => {
    // Save immediately to localStorage for instant UI & cross-tab sync
    if (partialState.properties) {
      localStorage.setItem('ri8click_properties_data', JSON.stringify(partialState.properties));
    }
    if (partialState.agencies) {
      localStorage.setItem('ri8click_agencies_data', JSON.stringify(partialState.agencies));
    }
    if (partialState.provinceCityData) {
      localStorage.setItem('ri8click_locations_data', JSON.stringify(partialState.provinceCityData));
    }
    if (partialState.heroSlides) {
      localStorage.setItem('ri8click_hero_slides', JSON.stringify(partialState.heroSlides));
      localStorage.setItem(DECK_SCHEMA_VERSION, 'true');
    }
    if (partialState.blogs) {
      localStorage.setItem('ri8click_blogs_data', JSON.stringify(partialState.blogs));
    }
    if (partialState.sitePortions) {
      localStorage.setItem('ri8click_site_portions', JSON.stringify(partialState.sitePortions));
    }
    if (partialState.userAccounts) {
      localStorage.setItem('ri8click_user_accounts', JSON.stringify(partialState.userAccounts));
    }
    if (partialState.advibeProjects) {
      localStorage.setItem('ri8click_advibe_projects', JSON.stringify(partialState.advibeProjects));
    }
    if (partialState.advibeLeads) {
      localStorage.setItem('ri8click_advibe_leads', JSON.stringify(partialState.advibeLeads));
    }

    fetch('/api/state', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partialState)
    })
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data?.revision) lastRevisionRef.current = data.revision;
        if (data?.updatedAt) lastUpdatedAtRef.current = data.updatedAt;
      })
      .catch(() => {});
  }, []);

  // Multi-Layer Real-Time Sync: Initial Fetch + SSE Stream + 4-Second Polling Fallback + Window Focus + Storage Listener
  useEffect(() => {
    let isMounted = true;

    const fetchLatestFromServer = async (seedIfEmpty = false) => {
      try {
        const res = await fetch(`/api/state?_t=${Date.now()}`, {
          cache: 'no-store'
        });
        if (!res.ok) return;
        const remote = await res.json();
        if (!isMounted) return;

        const hasRemoteData =
          Array.isArray(remote?.properties) && remote.properties.length > 0;
        const hasModernSlides =
          Array.isArray(remote?.heroSlides) &&
          remote.heroSlides.length > 0 &&
          !(
            remote.heroSlides.length === 5 &&
            remote.heroSlides.every((s: any) => /^slide-[1-5]$/.test(s.id))
          );

        if (hasRemoteData) {
          applyIncomingServerState(remote);
          if (!hasModernSlides) {
            pushStateToServer({ heroSlides: INITIAL_HERO_SLIDES });
          }
        } else if (seedIfEmpty) {
          pushStateToServer({
            properties,
            agencies,
            provinceCityData,
            heroSlides,
            blogs,
            sitePortions,
            userAccounts,
            advibeProjects,
            advibeLeads
          });
        }
      } catch {}
    };

    fetchLatestFromServer(true);

    // 1. Server-Sent Events (SSE) for instant push
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/state/stream');
      eventSource.onmessage = event => {
        try {
          const payload = JSON.parse(event.data);
          if (
            (payload?.type === 'STATE_UPDATED' || payload?.type === 'INITIAL_STATE') &&
            payload.state
          ) {
            applyIncomingServerState(payload.state);
          }
        } catch {}
      };
    } catch {}

    // 2. Lightweight 4-second polling fallback (guarantees updates even if proxy blocks SSE)
    const pollInterval = setInterval(async () => {
      try {
        const vRes = await fetch(`/api/state/version?_t=${Date.now()}`, { cache: 'no-store' });
        if (!vRes.ok) return;
        const vData = await vRes.json();
        if (
          (vData.revision && vData.revision > lastRevisionRef.current) ||
          (vData.updatedAt && vData.updatedAt !== lastUpdatedAtRef.current)
        ) {
          fetchLatestFromServer(false);
        }
      } catch {}
    }, 4000);

    // 3. Re-sync whenever user switches back to tab/window
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === 'visible') {
        fetchLatestFromServer(false);
      }
    };
    window.addEventListener('focus', handleVisibilityOrFocus);
    document.addEventListener('visibilitychange', handleVisibilityOrFocus);

    // 4. Cross-tab localStorage listener
    const handleStorageEvent = (e: StorageEvent) => {
      if (!e.newValue) return;
      try {
        if (e.key === 'ri8click_properties_data') {
          setProperties(sanitizePropertiesToPakistanAvatars(JSON.parse(e.newValue)));
        } else if (e.key === 'ri8click_hero_slides') {
          setHeroSlides(JSON.parse(e.newValue));
        } else if (e.key === 'ri8click_locations_data') {
          setProvinceCityData(JSON.parse(e.newValue));
        } else if (e.key === 'ri8click_agencies_data') {
          setAgencies(sanitizeAgenciesToPakistanAvatars(JSON.parse(e.newValue)));
        }
      } catch {}
    };
    window.addEventListener('storage', handleStorageEvent);

    return () => {
      isMounted = false;
      if (eventSource) eventSource.close();
      clearInterval(pollInterval);
      window.removeEventListener('focus', handleVisibilityOrFocus);
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [applyIncomingServerState, pushStateToServer]);

  // Wrap state setters so every change immediately persists to server & broadcasts to all users
  const handleUpdateProperties = useCallback(
    (nextProps: Property[]) => {
      const clean = sanitizePropertiesToPakistanAvatars(nextProps);
      setProperties(clean);
      pushStateToServer({ properties: clean });
    },
    [pushStateToServer]
  );

  const handleUpdateAgencies = useCallback(
    (nextAgencies: AgencyAccount[]) => {
      const clean = sanitizeAgenciesToPakistanAvatars(nextAgencies);
      setAgencies(clean);
      pushStateToServer({ agencies: clean });
    },
    [pushStateToServer]
  );

  const handleUpdateProvinceCityData = useCallback(
    (nextLocations: ProvinceCityData[]) => {
      setProvinceCityData(nextLocations);
      pushStateToServer({ provinceCityData: nextLocations });
    },
    [pushStateToServer]
  );

  const handleUpdateHeroSlides = useCallback(
    (nextSlides: HeroSlide[]) => {
      setHeroSlides(nextSlides);
      pushStateToServer({ heroSlides: nextSlides });
    },
    [pushStateToServer]
  );

  const handleUpdateBlogs = useCallback(
    (nextBlogs: BlogPost[]) => {
      setBlogs(nextBlogs);
      pushStateToServer({ blogs: nextBlogs });
    },
    [pushStateToServer]
  );

  const handleUpdateSitePortions = useCallback(
    (nextPortions: SiteSectionPortion[]) => {
      setSitePortions(nextPortions);
      pushStateToServer({ sitePortions: nextPortions });
    },
    [pushStateToServer]
  );

  const handleUpdateUserAccounts = useCallback(
    (nextAccounts: UserAccount[]) => {
      setUserAccounts(nextAccounts);
      pushStateToServer({ userAccounts: nextAccounts });
    },
    [pushStateToServer]
  );

  const handleUpdateAdvibeProjects = useCallback(
    (nextProjects: AdVibeProject[]) => {
      setAdvibeProjects(nextProjects);
      pushStateToServer({ advibeProjects: nextProjects });
    },
    [pushStateToServer]
  );

  const handleUpdateAdvibeLeads = useCallback(
    (nextLeads: AdVibeLead[]) => {
      setAdvibeLeads(nextLeads);
      pushStateToServer({ advibeLeads: nextLeads });
    },
    [pushStateToServer]
  );

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('ri8click_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('ri8click_current_user');
      }
    } catch {}
  }, [currentUser]);

  // ============================================================================
  // UI & NAVIGATION STATE
  // ============================================================================
  const [activeView, setActiveView] = useState<'portal' | 'advibe_listing' | 'advibe_project'>('portal');
  const [selectedAdvibeProject, setSelectedAdvibeProject] = useState<AdVibeProject | null>(null);

  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [tourProperty, setTourProperty] = useState<Property | null>(null);
  const [virtual3DProperty, setVirtual3DProperty] = useState<Property | null>(null);

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isAdminHubOpen, setIsAdminHubOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState<any>('overview');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginModalReason, setLoginModalReason] = useState<
    'general' | 'admin_required' | 'agency_required'
  >('general');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const [userRole, setUserRole] = useState<'admin' | 'agency' | 'customer'>(() =>
    currentUser ? currentUser.role : 'customer'
  );
  const [selectedAgencyId, setSelectedAgencyId] = useState<string>(() =>
    currentUser?.agencyId ? currentUser.agencyId : 'agency-1'
  );

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    province: 'all',
    city: 'all',
    society: 'all',
    category: 'all',
    purpose: 'all',
    propertyType: 'all',
    minPrice: 0,
    maxPrice: 1000000000,
    bedrooms: 'all',
    sortBy: 'featured'
  });

  const handleUserLogin = (account: UserAccount) => {
    setCurrentUser(account);
    setUserRole(account.role);
    if (account.agencyId) {
      setSelectedAgencyId(account.agencyId);
    }
    if (loginModalReason === 'admin_required' && account.role === 'admin') {
      setIsAdminHubOpen(true);
    } else if (
      loginModalReason === 'agency_required' &&
      (account.role === 'admin' || account.role === 'agency')
    ) {
      setIsPostModalOpen(true);
    }
    setLoginModalReason('general');
  };

  const handleUserLogout = () => {
    setCurrentUser(null);
    setUserRole('customer');
    setIsAdminHubOpen(false);
  };

  const handleToggleSave = (id: string) => {
    setSavedPropertyIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddProperty = (newProp: Property) => {
    const nextProps = [newProp, ...properties];
    const nextAgencies = agencies.map(ag =>
      ag.id === newProp.agencyId
        ? {
            ...ag,
            totalPosts: ((ag as any).totalPosts || 0) + 1,
            activeListings: ((ag as any).activeListings || 0) + 1
          }
        : ag
    );
    setProperties(nextProps);
    setAgencies(nextAgencies);
    pushStateToServer({ properties: nextProps, agencies: nextAgencies });
  };

  const filteredProperties = useMemo(() => {
    return properties
      .filter(p => {
        if (p.status === 'pending') return false;
        if (filters.category !== 'all' && p.category !== filters.category) return false;
        if (filters.purpose !== 'all' && p.purpose !== filters.purpose) return false;
        if (filters.province !== 'all' && p.location.province !== filters.province) return false;
        if (filters.city !== 'all' && p.location.city !== filters.city) return false;
        if (filters.society !== 'all' && p.location.society !== filters.society) return false;
        if (filters.propertyType !== 'all' && p.type !== filters.propertyType) return false;
        if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;

        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchSoc = p.location.society.toLowerCase().includes(q);
          const matchCity = p.location.city.toLowerCase().includes(q);
          const matchAgent = p.agentName.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchSoc && !matchCity && !matchAgent) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price_low') return a.price - b.price;
        if (filters.sortBy === 'price_high') return b.price - a.price;
        if (filters.sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [properties, filters]);

  const isPortionVisible = (portionId: string) => {
    const found = sitePortions.find(p => p.id === portionId);
    return found ? found.isVisible : true;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar
        savedCount={savedPropertyIds.length}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onOpenPostProperty={() => {
          if (userRole === 'admin' || userRole === 'agency') {
            setIsPostModalOpen(true);
          } else {
            setLoginModalReason('agency_required');
            setIsLoginModalOpen(true);
          }
        }}
        onOpenAdmin={tab => {
          if (tab) setAdminInitialTab(tab);
          setIsAdminHubOpen(true);
        }}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        onOpenLoginModal={() => {
          setLoginModalReason('general');
          setIsLoginModalOpen(true);
        }}
        currentUser={currentUser}
        onLogout={handleUserLogout}
        userRole={userRole}
        agencies={agencies}
        selectedAgencyId={selectedAgencyId}
        onSelectCategory={cat => {
          setActiveView('portal');
          setFilters(prev => ({ ...prev, category: cat }));
          setTimeout(() => {
            document.getElementById('listings-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        activeCategory={filters.category}
        activeView={activeView}
        onOpenAdvibe={() => {
          setActiveView('advibe_listing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onBackToPortal={() => {
          setActiveView('portal');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {activeView === 'advibe_listing' ? (
        <AdvibeListingPage
          projects={advibeProjects.filter(p => p.published && !p.archived)}
          onSelectProject={proj => {
            setSelectedAdvibeProject(proj);
            setActiveView('advibe_project');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenAdminAdvibe={() => {
            setAdminInitialTab('advibe');
            setIsAdminHubOpen(true);
          }}
          onBackToPortal={() => setActiveView('portal')}
          canManageAdvibe={
            userRole === 'admin' ||
            (userRole === 'agency' &&
              Boolean(
                agencies.find(a => a.id === selectedAgencyId)?.canPublishAdvibe ||
                  (agencies.find(a => a.id === selectedAgencyId) as any)?.canManageAdvibe
              ))
          }
        />
      ) : activeView === 'advibe_project' && selectedAdvibeProject ? (
        <AdvibeProjectScrollyPage
          project={selectedAdvibeProject}
          properties={properties}
          onBackToListing={() => setActiveView('advibe_listing')}
          onSelectProperty={prop => setSelectedProperty(prop)}
          onSubmitLead={leadData => {
            const newLead: AdVibeLead = {
              ...leadData,
              id: `lead-adv-${Date.now()}`,
              status: 'new',
              createdAt: new Date().toISOString().split('T')[0]
            };
            handleUpdateAdvibeLeads([newLead, ...advibeLeads]);
          }}
        />
      ) : (
        <main className="flex-1">
          {isPortionVisible('hero_slider') && (
            <HeroSection
              slides={heroSlides}
              properties={properties}
              onSelectCategoryFilter={cat => {
                setFilters(prev => ({ ...prev, category: cat }));
              }}
              onExploreClick={() => {
                document.getElementById('listings-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onContactAgentClick={() => {
                document.getElementById('agencies-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpen3DTour={sampleProp => {
                setVirtual3DProperty(sampleProp || properties[0]);
              }}
            />
          )}

          {isPortionVisible('search_bar') && (
            <SearchFilterBar
              filters={filters}
              onChangeFilters={setFilters}
              provinceCityData={provinceCityData}
              totalResults={filteredProperties.length}
              isSuperAdmin={userRole === 'admin'}
              onOpenLocationManager={() => {
                setAdminInitialTab('locations');
                setIsAdminHubOpen(true);
              }}
            />
          )}

          {/* Featured Properties Grid */}
          {isPortionVisible('properties_grid') && (
            <section id="listings-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-extrabold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Verified Inventory ({filteredProperties.length})</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Featured Watermarked Properties
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      if (userRole === 'admin' || userRole === 'agency') {
                        setIsPostModalOpen(true);
                      } else {
                        setLoginModalReason('agency_required');
                        setIsLoginModalOpen(true);
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Post Property Ad</span>
                  </button>
                </div>
              </div>

              {filteredProperties.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
                  <SlidersHorizontal className="w-10 h-10 text-slate-400 mx-auto" />
                  <h3 className="text-lg font-extrabold text-slate-900">
                    No Matching Properties Found
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Try clearing your search filters or switching the selected city/society.
                  </p>
                  <button
                    onClick={() =>
                      setFilters({
                        searchQuery: '',
                        province: 'all',
                        city: 'all',
                        society: 'all',
                        category: 'all',
                        purpose: 'all',
                        propertyType: 'all',
                        minPrice: 0,
                        maxPrice: 1000000000,
                        bedrooms: 'all',
                        sortBy: 'featured'
                      })
                    }
                    className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map(prop => (
                    <PropertyCard
                      key={prop.id}
                      property={prop}
                      isSaved={savedPropertyIds.includes(prop.id)}
                      onToggleSave={handleToggleSave}
                      onSelectProperty={p => setSelectedProperty(p)}
                      onScheduleTour={p => setTourProperty(p)}
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {isPortionVisible('commercial_showcase') && (
            <CommercialShowcase
              properties={properties}
              savedPropertyIds={savedPropertyIds}
              onToggleSave={handleToggleSave}
              onSelectProperty={p => setSelectedProperty(p)}
              onScheduleTour={p => setTourProperty(p)}
              onViewAllCommercial={() => {
                setFilters(prev => ({ ...prev, category: 'commercial' }));
                document.getElementById('listings-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          )}

          {isPortionVisible('modular_showcase') && (
            <ModularHomesShowcase
              properties={properties}
              savedPropertyIds={savedPropertyIds}
              onToggleSave={handleToggleSave}
              onSelectProperty={p => setSelectedProperty(p)}
              onScheduleTour={p => setTourProperty(p)}
              onWhatsAppInquiry={topic => {
                const text = encodeURIComponent(
                  `Assalam-o-Alaikum, I am inquiring about "${topic}" on ri8click.com.`
                );
                window.open(`https://wa.me/923365666727?text=${text}`, '_blank');
              }}
            />
          )}

          {isPortionVisible('agencies_network') && (
            <div id="agencies-section">
              <AgenciesSection
                agencies={agencies}
                properties={properties}
                onSelectAgencyFilter={agencyId => {
                  const ag = agencies.find(a => a.id === agencyId);
                  if (ag) {
                    setFilters(prev => ({ ...prev, searchQuery: ag.name }));
                    document
                      .getElementById('listings-section')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                onOpenAgencyPortal={() => {
                  setIsRoleModalOpen(true);
                }}
              />
            </div>
          )}

          {isPortionVisible('consortium_showcase') && (
            <ConsortiumShowcase divisions={CONSORTIUM_DIVISIONS} />
          )}

          {isPortionVisible('news_blogs_section') && (
            <NewsBlogsSection
              blogs={blogs.filter(b => b.status === 'published')}
              onSelectBlog={b => setSelectedBlog(b)}
              onOpenAdminBlogs={() => {
                setAdminInitialTab('blogs');
                setIsAdminHubOpen(true);
              }}
              isSuperAdmin={userRole === 'admin'}
            />
          )}
        </main>
      )}

      <Footer
        onSelectCity={cityName => {
          setActiveView('portal');
          setFilters(prev => ({ ...prev, province: 'all', city: cityName, society: 'all' }));
          document.getElementById('listings-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectCategory={cat => {
          setActiveView('portal');
          setFilters(prev => ({ ...prev, category: cat }));
          document.getElementById('listings-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAdmin={() => {
          setAdminInitialTab('overview');
          setIsAdminHubOpen(true);
        }}
      />

      {/* Modals */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        isSaved={selectedProperty ? savedPropertyIds.includes(selectedProperty.id) : false}
        onToggleSave={handleToggleSave}
        onScheduleTour={prop => {
          setSelectedProperty(null);
          setTourProperty(prop);
        }}
        onOpen3DTour={prop => {
          setSelectedProperty(null);
          setVirtual3DProperty(prop);
        }}
      />

      <BlogDetailModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />

      <ScheduleTourModal
        property={tourProperty}
        onClose={() => setTourProperty(null)}
      />

      <SavedPropertiesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedProperties={properties.filter(p => savedPropertyIds.includes(p.id))}
        onRemoveSaved={handleToggleSave}
        onSelectProperty={prop => {
          setIsSavedModalOpen(false);
          setSelectedProperty(prop);
        }}
        onScheduleTour={prop => {
          setIsSavedModalOpen(false);
          setTourProperty(prop);
        }}
      />

      <PostPropertyModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        agencies={agencies}
        selectedAgencyId={selectedAgencyId}
        provinceCityData={provinceCityData}
        onAddProperty={handleAddProperty}
        onOpenAdmin={() => {
          setIsPostModalOpen(false);
          setAdminInitialTab('agencies');
          setIsAdminHubOpen(true);
        }}
        isSuperAdmin={userRole === 'admin'}
        onOpenRoleSwitcher={() => {
          setIsPostModalOpen(false);
          setIsRoleModalOpen(true);
        }}
        onUpdateProvinceCityData={handleUpdateProvinceCityData}
      />

      <VirtualTour3DModal
        isOpen={Boolean(virtual3DProperty)}
        onClose={() => setVirtual3DProperty(null)}
        property={virtual3DProperty}
        onScheduleTour={prop => {
          setVirtual3DProperty(null);
          setTourProperty(prop);
        }}
      />

      <AdminHubModal
        isOpen={isAdminHubOpen}
        onClose={() => setIsAdminHubOpen(false)}
        initialTab={adminInitialTab}
        provinceCityData={provinceCityData}
        onUpdateProvinceCityData={handleUpdateProvinceCityData}
        agencies={agencies}
        onUpdateAgencies={handleUpdateAgencies}
        properties={properties}
        onUpdateProperties={handleUpdateProperties}
        heroSlides={heroSlides}
        onUpdateHeroSlides={handleUpdateHeroSlides}
        blogs={blogs}
        onUpdateBlogs={handleUpdateBlogs}
        sitePortions={sitePortions}
        onUpdateSitePortions={handleUpdateSitePortions}
        currentUser={currentUser}
        userAccounts={userAccounts}
        onUpdateUserAccounts={handleUpdateUserAccounts}
        onSwitchActiveUser={handleUserLogin}
        advibeProjects={advibeProjects}
        onUpdateAdvibeProjects={handleUpdateAdvibeProjects}
        advibeLeads={advibeLeads}
        onUpdateAdvibeLeads={handleUpdateAdvibeLeads}
        onPreviewAdvibeProject={proj => {
          setIsAdminHubOpen(false);
          setSelectedAdvibeProject(proj);
          setActiveView('advibe_project');
        }}
      />

      <AuthLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        accounts={userAccounts}
        currentUser={currentUser}
        onLogin={handleUserLogin}
        onLogout={handleUserLogout}
        requiredReason={loginModalReason}
      />

      <AuthRoleModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        currentRole={userRole}
        onSelectRole={role => {
          setUserRole(role);
          if (role === 'admin') {
            const adminAcc = userAccounts.find(a => a.role === 'admin') || DEFAULT_USER_ACCOUNTS[0];
            setCurrentUser(adminAcc);
          }
        }}
        agencies={agencies}
        selectedAgencyId={selectedAgencyId}
        onSelectAgency={id => setSelectedAgencyId(id)}
        onOpenAdmin={() => {
          setIsRoleModalOpen(false);
          setIsAdminHubOpen(true);
        }}
      />

      <AiChatbot properties={properties} agencies={agencies} />
      <FloatingWhatsApp />
      <ScrollToTop />
    </div>
  );
}

export default App;

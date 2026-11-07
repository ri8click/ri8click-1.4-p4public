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
import { AdminHubModal, AdminTabType } from './components/AdminHubModal';
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
import { initialUserAccounts, UserAccount } from './data/defaultAccounts';
import { initialAdvibeProjects, initialAdvibeLeads } from './data/advibeDemoData';
import {
  Property,
  AgencyAccount,
  ProvinceCityData,
  HeroSlide,
  BlogPost,
  SiteSectionPortion,
  AdVibeProject,
  AdVibeLead
} from './types';
import { SlidersHorizontal, Sparkles, Plus, RotateCcw } from 'lucide-react';

const DECK_SCHEMA_VERSION = 'ri8click_deck_v2_16slides';

function sanitizePropertiesToPakistanAvatars(props: Property[]): Property[] {
  if (!Array.isArray(props)) return INITIAL_PROPERTIES;
  return props.map((p, idx) => ({
    ...p,
    agentAvatar: resolvePakistanAgentAvatar(
      p.agentAvatar,
      `${p.agencyId || ''} ${p.agentName || ''} ${p.agentCompany || ''}`,
      idx
    )
  }));
}

function sanitizeAgenciesToPakistanAvatars(agencies: AgencyAccount[]): AgencyAccount[] {
  if (!Array.isArray(agencies)) return INITIAL_AGENCIES;
  return agencies.map((a, idx) => {
    const cleanAvatar = resolvePakistanAgentAvatar(
      (a as any).avatar || a.logo,
      `${a.id} ${a.name} ${(a as any).companyName || ''}`,
      idx
    );
    return {
      ...a,
      logo: cleanAvatar,
      avatar: cleanAvatar
    } as AgencyAccount;
  });
}

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
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem('ri8click_properties_data');
      if (saved) return sanitizePropertiesToPakistanAvatars(JSON.parse(saved));
    } catch {}
    return sanitizePropertiesToPakistanAvatars(INITIAL_PROPERTIES);
  });

  const [agencies, setAgencies] = useState<AgencyAccount[]>(() => {
    try {
      const saved = localStorage.getItem('ri8click_agencies_data');
      if (saved) return sanitizeAgenciesToPakistanAvatars(JSON.parse(saved));
    } catch {}
    return sanitizeAgenciesToPakistanAvatars(INITIAL_AGENCIES);
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
    return initialUserAccounts;
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

    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === 'visible') {
        fetchLatestFromServer(false);
      }
    };
    window.addEventListener('focus', handleVisibilityOrFocus);
    document.addEventListener('visibilitychange', handleVisibilityOrFocus);

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

  const handleResetPortions = useCallback(() => {
    setSitePortions(INITIAL_SITE_PORTIONS);
    pushStateToServer({ sitePortions: INITIAL_SITE_PORTIONS });
  }, [pushStateToServer]);

  const handleUpdateUserAccounts = useCallback(
    (nextAccounts: UserAccount[]) => {
      setUserAccounts(nextAccounts);
      pushStateToServer({ userAccounts: nextAccounts });
    },
    [pushStateToServer]
  );

  const handleUpdateCurrentUser = useCallback(
    (updatedUser: UserAccount) => {
      setCurrentUser(updatedUser);
      const nextAccounts = userAccounts.map(u => (u.id === updatedUser.id ? updatedUser : u));
      setUserAccounts(nextAccounts);
      pushStateToServer({ userAccounts: nextAccounts });
    },
    [userAccounts, pushStateToServer]
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

  const [activeTab, setActiveTab] = useState<string>('properties');
  const [activeAdvibeSlug, setActiveAdvibeSlug] = useState<string | null>(null);

  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(['prop-comm-1', 'prop-res-1']);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [tourProperty, setTourProperty] = useState<Property | null>(null);
  const [virtual3DProperty, setVirtual3DProperty] = useState<Property | null>(null);

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isAdminHubOpen, setIsAdminHubOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState<AdminTabType>('overview');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginModalReason, setLoginModalReason] = useState<
    'general' | 'admin_required' | 'agency_required' | 'advibe_required'
  >('general');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const [userRole, setUserRole] = useState<'admin' | 'agency' | 'customer'>(() =>
    currentUser ? currentUser.role : 'customer'
  );
  const [selectedAgencyId, setSelectedAgencyId] = useState<string>(() =>
    currentUser?.agencyId ? currentUser.agencyId : 'agency-1'
  );

  const currentAgency = useMemo(
    () => agencies.find(a => a.id === selectedAgencyId) || agencies[0],
    [agencies, selectedAgencyId]
  );

  const initialFilterState = {
    searchQuery: '',
    purpose: 'all' as any,
    category: 'all' as any,
    province: '',
    city: '',
    society: '',
    propertyType: '',
    minPrice: 0,
    maxPrice: 1000000000,
    minBedrooms: null as number | null,
    agencyId: ''
  };

  const [filters, setFilters] = useState<any>(initialFilterState);

  const resetFilters = () => setFilters(initialFilterState);

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
    } else if (loginModalReason === 'advibe_required') {
      setAdminInitialTab('advibe');
      setIsAdminHubOpen(true);
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

  const handleUpdateAgencyLimit = (agencyId: string, newLimit: number) => {
    const updated = agencies.map(ag =>
      ag.id === agencyId ? ({ ...ag, postLimit: newLimit } as AgencyAccount) : ag
    );
    handleUpdateAgencies(updated);
  };

  const handleAddNewAgency = (newAgency: AgencyAccount) => {
    handleUpdateAgencies([newAgency, ...agencies]);
    setSelectedAgencyId(newAgency.id);
  };

  const handleSaveAdvibeProject = (project: AdVibeProject) => {
    const exists = advibeProjects.some(p => p.id === project.id);
    const updated = exists
      ? advibeProjects.map(p => (p.id === project.id ? project : p))
      : [project, ...advibeProjects];
    handleUpdateAdvibeProjects(updated);
  };

  const handleDeleteAdvibeProject = (projectId: string) => {
    handleUpdateAdvibeProjects(advibeProjects.filter(p => p.id !== projectId));
  };

  const handleDuplicateAdvibeProject = (projectId: string) => {
    const source = advibeProjects.find(p => p.id === projectId);
    if (!source) return;
    const copy: AdVibeProject = {
      ...source,
      id: `advibe-proj-${Date.now()}`,
      title: `${source.title} (Copy)`,
      slug: `${source.slug}-copy-${Date.now().toString().slice(-4)}`,
      viewsCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    handleUpdateAdvibeProjects([copy, ...advibeProjects]);
  };

  const handleUpdateAdvibeLeadStatus = (leadId: string, status: AdVibeLead['status']) => {
    handleUpdateAdvibeLeads(
      advibeLeads.map(l => (l.id === leadId ? { ...l, status } : l))
    );
  };

  const handleToggleAgencyAdvibePermission = (agencyId: string, allowed: boolean) => {
    const updated = agencies.map(a =>
      a.id === agencyId ? ({ ...a, canManageAdvibe: allowed } as AgencyAccount) : a
    );
    handleUpdateAgencies(updated);
  };

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      if (p.status === 'pending') return false;
      if (filters.category && filters.category !== 'all' && p.category !== filters.category)
        return false;
      if (filters.purpose && filters.purpose !== 'all' && p.purpose !== filters.purpose)
        return false;
      if (
        filters.province &&
        filters.province !== 'all' &&
        filters.province !== 'All Provinces' &&
        p.location.province !== filters.province
      )
        return false;
      if (
        filters.city &&
        filters.city !== 'all' &&
        filters.city !== 'All Cities' &&
        p.location.city.toLowerCase() !== filters.city.toLowerCase()
      )
        return false;
      if (
        filters.society &&
        filters.society !== 'all' &&
        filters.society !== 'All Societies' &&
        filters.society !== 'Show All' &&
        !p.location.society.toLowerCase().includes(filters.society.toLowerCase())
      )
        return false;
      if (
        filters.propertyType &&
        filters.propertyType !== 'all' &&
        p.type.toLowerCase() !== filters.propertyType.toLowerCase()
      )
        return false;
      if (filters.minBedrooms !== null && filters.minBedrooms !== undefined) {
        if ((p.bedrooms || 0) < filters.minBedrooms) return false;
      }
      if (filters.agencyId && p.agencyId !== filters.agencyId) return false;

      if (filters.searchQuery && filters.searchQuery.trim()) {
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
    });
  }, [properties, filters]);

  const isPortionVisible = (keyOrId: string) => {
    const found = sitePortions.find(
      p => p.id === keyOrId || (p as any).key === keyOrId
    );
    if (!found) return true;
    return (found as any).isEnabled !== undefined
      ? (found as any).isEnabled
      : found.isVisible !== false;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar
        activeTab={activeTab}
        setActiveTab={tab => {
          setActiveTab(tab);
          if (tab !== 'advibe') {
            setActiveAdvibeSlug(null);
          }
        }}
        savedPropertiesCount={savedPropertyIds.length}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        onOpenPostModal={() => {
          if (userRole === 'admin' || userRole === 'agency') {
            setIsPostModalOpen(true);
          } else {
            setLoginModalReason('agency_required');
            setIsLoginModalOpen(true);
          }
        }}
        onOpenScheduleModal={() => setTourProperty(properties[0] || null)}
        onOpenAdmin={() => {
          setAdminInitialTab('overview');
          setIsAdminHubOpen(true);
        }}
        onOpenAuthRoleModal={() => setIsRoleModalOpen(true)}
        currentRole={userRole}
        currentAgency={currentAgency}
        currentUser={currentUser}
        onOpenLoginModal={reason => {
          setLoginModalReason(reason || 'general');
          setIsLoginModalOpen(true);
        }}
        onLogout={handleUserLogout}
      />

      {activeTab === 'advibe' && activeAdvibeSlug ? (
        <AdvibeProjectScrollyPage
          project={
            advibeProjects.find(
              p => p.slug === activeAdvibeSlug || p.id === activeAdvibeSlug
            ) || advibeProjects[0]
          }
          properties={properties}
          onBackToListing={() => setActiveAdvibeSlug(null)}
          onSelectProperty={prop => setSelectedProperty(prop)}
        />
      ) : activeTab === 'advibe' ? (
        <AdvibeListingPage
          projects={advibeProjects.filter(p => p.published && !p.archived)}
          onOpenProject={slug => {
            setActiveAdvibeSlug(slug);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenCreateProject={() => {
            setAdminInitialTab('advibe');
            setIsAdminHubOpen(true);
          }}
          canManageAdvibe={
            userRole === 'admin' ||
            (userRole === 'agency' &&
              Boolean(
                agencies.find(a => a.id === selectedAgencyId)?.canPublishAdvibe ||
                  (agencies.find(a => a.id === selectedAgencyId) as any)?.canManageAdvibe
              ))
          }
        />
      ) : (
        <main className="flex-1">
          {isPortionVisible('hero_slider') && (
            <HeroSection
              slides={heroSlides}
              properties={properties}
              onSelectCategoryFilter={cat => {
                setFilters((prev: any) => ({ ...prev, category: cat }));
              }}
              onExploreClick={() => {
                document
                  .getElementById('properties-grid-section')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              onContactAgentClick={() => {
                document
                  .getElementById('agents-section')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpen3DTour={sampleProp => {
                setVirtual3DProperty(sampleProp || properties[0]);
              }}
            />
          )}

          {isPortionVisible('search_bar') && (
            <SearchFilterBar
              filters={filters}
              setFilters={setFilters}
              provinceCityData={provinceCityData}
              totalResultsCount={filteredProperties.length}
              onResetFilters={resetFilters}
            />
          )}

          {isPortionVisible('properties_grid') && (
            <section
              id="properties-grid-section"
              className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
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
                    onClick={resetFilters}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
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
                setFilters((prev: any) => ({ ...prev, category: 'commercial' }));
                document
                  .getElementById('properties-grid-section')
                  ?.scrollIntoView({ behavior: 'smooth' });
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
            <AgenciesSection
              agencies={agencies}
              properties={properties}
              onOpenRegisterAgency={() => {
                setAdminInitialTab('agencies');
                setIsAdminHubOpen(true);
              }}
              onFilterByAgency={agencyId => {
                setFilters((prev: any) => ({ ...prev, agencyId }));
                document
                  .getElementById('properties-grid-section')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          )}

          {isPortionVisible('consortium_showcase') && (
            <ConsortiumShowcase
              divisions={CONSORTIUM_DIVISIONS}
              onSelectDivisionContact={div => {
                const text = encodeURIComponent(
                  `Assalam-o-Alaikum, I am inquiring about ${div.title} on ri8click.com.`
                );
                window.open(`https://wa.me/${div.contactWhatsApp}?text=${text}`, '_blank');
              }}
            />
          )}

          {isPortionVisible('news_blogs_section') && (
            <NewsBlogsSection
              blogs={blogs.filter(b => b.status === 'published')}
              onSelectBlog={b => setSelectedBlog(b)}
              onOpenAdminBlogManager={() => {
                setAdminInitialTab('blogs');
                setIsAdminHubOpen(true);
              }}
            />
          )}
        </main>
      )}

      <Footer
        divisions={CONSORTIUM_DIVISIONS}
        currentUser={currentUser}
        onOpenLogin={() => {
          setLoginModalReason('general');
          setIsLoginModalOpen(true);
        }}
        onOpenAdmin={() => {
          setAdminInitialTab('overview');
          setIsAdminHubOpen(true);
        }}
        onSelectSociety={society => {
          setActiveTab('properties');
          setActiveAdvibeSlug(null);
          setFilters((prev: any) => ({ ...prev, society }));
          document
            .getElementById('properties-grid-section')
            ?.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectNavTab={tab => {
          setActiveTab(tab);
          if (tab !== 'advibe') {
            setActiveAdvibeSlug(null);
          }
        }}
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
        onOpen3DTour={prop => {
          setSelectedProperty(null);
          setVirtual3DProperty(prop);
        }}
      />

      <BlogDetailModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />

      <ScheduleTourModal
        isOpen={Boolean(tourProperty)}
        property={tourProperty}
        onClose={() => setTourProperty(null)}
      />

      <SavedPropertiesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedProperties={properties.filter(p => savedPropertyIds.includes(p.id))}
        onToggleSave={handleToggleSave}
        onClearAllSaved={() => setSavedPropertyIds([])}
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
        onUpdateAgencyLimit={handleUpdateAgencyLimit}
        onAddNewAgency={handleAddNewAgency}
        properties={properties}
        onUpdateProperties={handleUpdateProperties}
        onViewProperty={prop => setSelectedProperty(prop)}
        onOpenVirtualTour={prop => setVirtual3DProperty(prop)}
        heroSlides={heroSlides}
        onUpdateHeroSlides={handleUpdateHeroSlides}
        blogs={blogs}
        onUpdateBlogs={handleUpdateBlogs}
        onViewBlog={b => setSelectedBlog(b)}
        portions={sitePortions}
        onUpdatePortions={handleUpdateSitePortions}
        onResetPortions={handleResetPortions}
        currentRole={userRole}
        isSuperAdmin={userRole === 'admin'}
        currentUser={currentUser}
        allUsers={userAccounts}
        onUpdateCurrentUser={handleUpdateCurrentUser}
        onUpdateAllUsers={handleUpdateUserAccounts}
        onOpenRoleSwitcher={() => setIsRoleModalOpen(true)}
        advibeProjects={advibeProjects}
        advibeLeads={advibeLeads}
        onSaveAdvibeProject={handleSaveAdvibeProject}
        onDeleteAdvibeProject={handleDeleteAdvibeProject}
        onDuplicateAdvibeProject={handleDuplicateAdvibeProject}
        onUpdateAdvibeLeadStatus={handleUpdateAdvibeLeadStatus}
        onToggleAgencyAdvibePermission={handleToggleAgencyAdvibePermission}
        onPreviewAdvibeProject={slug => {
          setIsAdminHubOpen(false);
          setActiveTab('advibe');
          setActiveAdvibeSlug(slug);
        }}
      />

      <AuthLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleUserLogin}
        onLogout={handleUserLogout}
        requiredReason={loginModalReason}
        agencies={agencies}
      />

      <AuthRoleModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        currentRole={userRole}
        currentAgency={currentAgency}
        allAgencies={agencies}
        agencies={agencies}
        onSelectRole={role => {
          setUserRole(role);
          if (role === 'admin') {
            const adminAcc =
              userAccounts.find(a => a.role === 'admin') || initialUserAccounts[0];
            setCurrentUser(adminAcc);
          }
        }}
        onSelectAgency={id => setSelectedAgencyId(id)}
        onOpenAdminHub={() => {
          setIsRoleModalOpen(false);
          setIsAdminHubOpen(true);
        }}
        onOpenPostProperty={() => {
          setIsRoleModalOpen(false);
          setIsPostModalOpen(true);
        }}
      />

      <AiChatbot
        properties={properties}
        onSelectProperty={prop => setSelectedProperty(prop)}
      />
      <FloatingWhatsApp />
      <ScrollToTop />
    </div>
  );
}

export default App;

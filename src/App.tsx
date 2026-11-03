import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SearchFilterBar } from './components/SearchFilterBar';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { CommercialShowcase } from './components/CommercialShowcase';
import { ModularHomesShowcase } from './components/ModularHomesShowcase';
import { ConsortiumShowcase } from './components/ConsortiumShowcase';
import { AgenciesSection } from './components/AgenciesSection';
import { NewsBlogsSection } from './components/NewsBlogsSection';
import { BlogDetailModal } from './components/BlogDetailModal';
import { PostPropertyModal } from './components/PostPropertyModal';
import { ScheduleTourModal } from './components/ScheduleTourModal';
import { SavedPropertiesModal } from './components/SavedPropertiesModal';
import { AdminHubModal, AdminTabType } from './components/AdminHubModal';
import { VirtualTour3DModal } from './components/VirtualTour3DModal';
import { AuthRoleModal } from './components/AuthRoleModal';
import { AuthLoginModal } from './components/AuthLoginModal';
import { UserAccount, initialUserAccounts } from './data/defaultAccounts';
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
import { 
  Property, 
  AgencyAccount, 
  ProvinceCityData, 
  SearchFilterState, 
  ConsortiumDivision,
  HeroSlide,
  BlogPost,
  SiteSectionPortion,
  AdVibeProject,
  AdVibeLead
} from './types';
import { Building2, Sparkles, SlidersHorizontal, MapPin, Compass, ShieldCheck } from 'lucide-react';

export function App() {
  // Main Data States
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const stored = localStorage.getItem('ri8click_properties_data');
      if (stored) {
        const parsed: Property[] = JSON.parse(stored);
        const missing = initialProperties.filter(ip => !parsed.some(p => p.id === ip.id));
        if (missing.length > 0) {
          const merged = [...missing, ...parsed];
          localStorage.setItem('ri8click_properties_data', JSON.stringify(merged));
          return merged;
        }
        return parsed;
      }
      return initialProperties;
    } catch {
      return initialProperties;
    }
  });

  const [agencies, setAgencies] = useState<AgencyAccount[]>(() => {
    try {
      const stored = localStorage.getItem('ri8click_agencies_data');
      if (stored) {
        const parsed: AgencyAccount[] = JSON.parse(stored);
        const missing = initialAgencies.filter(ia => !parsed.some(a => a.id === ia.id));
        if (missing.length > 0) {
          const merged = [...parsed, ...missing];
          localStorage.setItem('ri8click_agencies_data', JSON.stringify(merged));
          return merged;
        }
        return parsed;
      }
      return initialAgencies;
    } catch {
      return initialAgencies;
    }
  });

  const [provinceCityData, setProvinceCityData] = useState<ProvinceCityData[]>(() => {
    try {
      const stored = localStorage.getItem('ri8click_locations_data');
      if (stored) {
        const parsed: ProvinceCityData[] = JSON.parse(stored);
        // Ensure Punjab has all default cities like Lahore
        const punjab = parsed.find(p => p.province === 'Punjab');
        const defaultPunjab = initialProvinceCityData.find(p => p.province === 'Punjab');
        if (punjab && defaultPunjab) {
          let updated = false;
          defaultPunjab.cities.forEach(dc => {
            const existingCity = punjab.cities.find(c => c.name.toLowerCase() === dc.name.toLowerCase());
            if (!existingCity) {
              punjab.cities.push(dc);
              updated = true;
            } else {
              // Ensure any missing default societies are present
              dc.societies.forEach(ds => {
                if (!existingCity.societies.includes(ds)) {
                  existingCity.societies.push(ds);
                  updated = true;
                }
              });
            }
          });
          if (updated) {
            localStorage.setItem('ri8click_locations_data', JSON.stringify(parsed));
          }
        }
        return parsed;
      }
      return initialProvinceCityData;
    } catch {
      return initialProvinceCityData;
    }
  });

  const [consortiumDivisions] = useState<ConsortiumDivision[]>(initialConsortiumDivisions);

  // Appearance & CMS Content States
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    try {
      const stored = localStorage.getItem('ri8click_hero_slides');
      return stored ? JSON.parse(stored) : initialHeroSlides;
    } catch {
      return initialHeroSlides;
    }
  });

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    try {
      const stored = localStorage.getItem('ri8click_blogs_data');
      return stored ? JSON.parse(stored) : initialBlogPosts;
    } catch {
      return initialBlogPosts;
    }
  });

  const [sitePortions, setSitePortions] = useState<SiteSectionPortion[]>(() => {
    try {
      const stored = localStorage.getItem('ri8click_site_portions');
      return stored ? JSON.parse(stored) : initialSitePortions;
    } catch {
      return initialSitePortions;
    }
  });

  // Authentication & Active Role State
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>(() => {
    try {
      const stored = localStorage.getItem('ri8click_user_accounts');
      if (stored) {
        const parsed: UserAccount[] = JSON.parse(stored);
        const missing = initialUserAccounts.filter(iu => !parsed.some(u => u.id === iu.id));
        if (missing.length > 0) {
          const merged = [...parsed, ...missing];
          localStorage.setItem('ri8click_user_accounts', JSON.stringify(merged));
          return merged;
        }
        return parsed;
      }
      return initialUserAccounts;
    } catch {
      return initialUserAccounts;
    }
  });

  // Mandatory check: Default to null (unauthenticated) so no direct admin panel access without login
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const stored = localStorage.getItem('ri8click_current_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const handleUpdateCurrentUser = (updated: UserAccount) => {
    setCurrentUser(updated);
    try {
      localStorage.setItem('ri8click_current_user', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
    setUserAccounts(prev => {
      const next = prev.map(u => u.id === updated.id ? updated : u);
      try {
        localStorage.setItem('ri8click_user_accounts', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleUpdateUserAccounts = (nextUsers: UserAccount[]) => {
    setUserAccounts(nextUsers);
    try {
      localStorage.setItem('ri8click_user_accounts', JSON.stringify(nextUsers));
    } catch (err) {
      console.error(err);
    }
  };

  const [currentRole, setCurrentRole] = useState<'admin' | 'agency' | 'customer'>(() => {
    try {
      const stored = localStorage.getItem('ri8click_current_user');
      if (stored) {
        const u = JSON.parse(stored);
        return u.role || 'customer';
      }
      return 'customer';
    } catch {
      return 'customer';
    }
  });

  const [currentAgencyId, setCurrentAgencyId] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('ri8click_current_user');
      if (stored) {
        const u = JSON.parse(stored);
        if (u.agencyId) return u.agencyId;
      }
      return initialAgencies[0].id;
    } catch {
      return initialAgencies[0].id;
    }
  });

  const currentAgency = agencies.find(a => a.id === currentAgencyId) || agencies[0];

  // Navigation and Modals State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [tourProperty, setTourProperty] = useState<Property | null>(null);
  const [virtualTour3DProperty, setVirtualTour3DProperty] = useState<Property | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isAuthRoleModalOpen, setIsAuthRoleModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [loginModalReason, setLoginModalReason] = useState<'admin_required' | 'agency_required' | 'advibe_required' | 'general'>('general');
  const [adminInitialTab, setAdminInitialTab] = useState<AdminTabType>('overview');

  const handleUserLogin = (user: UserAccount) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    if (user.agencyId) {
      setCurrentAgencyId(user.agencyId);
    }
    localStorage.setItem('ri8click_current_user', JSON.stringify(user));
    setIsLoginModalOpen(false);

    // If logging in fulfilled an admin requirement, open admin console
    if (user.role === 'admin' && loginModalReason === 'admin_required') {
      setIsAdminModalOpen(true);
    } else if ((user.role === 'agency' || user.role === 'admin') && loginModalReason === 'agency_required') {
      setIsPostModalOpen(true);
    }
  };

  const handleUserLogout = () => {
    setCurrentUser(null);
    setCurrentRole('customer');
    localStorage.removeItem('ri8click_current_user');
    setIsAdminModalOpen(false);
    setIsPostModalOpen(false);
  };

  // AdVibe Showcase Projects & Leads State
  const [advibeProjects, setAdvibeProjects] = useState<AdVibeProject[]>(() => {
    try {
      const stored = localStorage.getItem('ri8click_advibe_projects');
      if (stored) {
        const parsed: AdVibeProject[] = JSON.parse(stored);
        const missing = initialAdvibeProjects.filter(ip => !parsed.some(p => p.id === ip.id));
        if (missing.length > 0) {
          const merged = [...parsed, ...missing];
          localStorage.setItem('ri8click_advibe_projects', JSON.stringify(merged));
          return merged;
        }
        return parsed;
      }
      return initialAdvibeProjects;
    } catch {
      return initialAdvibeProjects;
    }
  });

  const [advibeLeads, setAdvibeLeads] = useState<AdVibeLead[]>(() => {
    try {
      const stored = localStorage.getItem('ri8click_advibe_leads');
      return stored ? JSON.parse(stored) : initialAdvibeLeads;
    } catch {
      return initialAdvibeLeads;
    }
  });

  const [activeAdvibeSlug, setActiveAdvibeSlug] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/advibe/')) {
        const slug = path.replace('/advibe/', '').split('/')[0];
        return slug || null;
      }
    }
    return null;
  });

  // Check initial activeTab if on /advibe
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/advibe')) {
        setActiveTab('advibe');
      }
    }
  }, []);

  // Listen to browser popstate (back/forward)
  React.useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/advibe/')) {
        const slug = path.replace('/advibe/', '').split('/')[0];
        setActiveAdvibeSlug(slug);
        setActiveTab('advibe');
      } else if (path === '/advibe') {
        setActiveAdvibeSlug(null);
        setActiveTab('advibe');
      } else {
        setActiveAdvibeSlug(null);
        if (activeTab === 'advibe') {
          setActiveTab('properties');
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeTab]);

  const navigateToAdvibeListing = () => {
    setActiveTab('advibe');
    setActiveAdvibeSlug(null);
    if (typeof window !== 'undefined' && window.history.pushState) {
      window.history.pushState({}, '', '/advibe');
    }
  };

  const navigateToAdvibeProject = (slug: string) => {
    setActiveTab('advibe');
    setActiveAdvibeSlug(slug);
    if (typeof window !== 'undefined' && window.history.pushState) {
      window.history.pushState({}, '', `/advibe/${slug}`);
    }
    // Increment project view count
    setAdvibeProjects(prev => {
      const updated = prev.map(p => p.slug === slug ? { ...p, viewsCount: (p.viewsCount || 0) + 1 } : p);
      try {
        localStorage.setItem('ri8click_advibe_projects', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleSaveAdvibeProject = (project: AdVibeProject) => {
    setAdvibeProjects(prev => {
      const existingIdx = prev.findIndex(p => p.id === project.id);
      let updated: AdVibeProject[];
      if (existingIdx >= 0) {
        updated = [...prev];
        updated[existingIdx] = { ...project, updatedAt: new Date().toISOString() };
      } else {
        updated = [project, ...prev];
      }
      try {
        localStorage.setItem('ri8click_advibe_projects', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    fetch('/api/advibe/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-role': currentRole, 'x-agency-id': currentAgencyId },
      body: JSON.stringify(project)
    }).catch(err => console.warn('Server sync notice:', err));
  };

  const handleDeleteAdvibeProject = (projectId: string) => {
    setAdvibeProjects(prev => {
      const updated = prev.filter(p => p.id !== projectId);
      try {
        localStorage.setItem('ri8click_advibe_projects', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    fetch(`/api/advibe/projects/${projectId}`, {
      method: 'DELETE',
      headers: { 'x-user-role': currentRole, 'x-agency-id': currentAgencyId }
    }).catch(err => console.warn('Server sync notice:', err));
  };

  const handleDuplicateAdvibeProject = (projectId: string) => {
    const orig = advibeProjects.find(p => p.id === projectId);
    if (!orig) return;
    const duplicated: AdVibeProject = {
      ...orig,
      id: `advibe-proj-${Date.now()}`,
      slug: `${orig.slug}-copy-${Date.now().toString().slice(-4)}`,
      title: `${orig.title} (Copy)`,
      viewsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    handleSaveAdvibeProject(duplicated);
  };

  const handleUpdateAdvibeLeadStatus = (leadId: string, status: AdVibeLead['status']) => {
    setAdvibeLeads(prev => {
      const updated = prev.map(l => l.id === leadId ? { ...l, status } : l);
      try {
        localStorage.setItem('ri8click_advibe_leads', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    fetch(`/api/advibe/leads/${leadId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }).catch(err => console.warn('Server sync notice:', err));
  };

  const handleToggleAgencyAdvibePermission = (agencyId: string, permitted: boolean) => {
    setAgencies(prev => {
      const updated = prev.map(a => a.id === agencyId ? { ...a, canManageAdvibe: permitted } : a);
      try {
        localStorage.setItem('ri8click_agencies_data', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Saved / Favorite Properties
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('ri8click_saved_properties');
      return stored ? JSON.parse(stored) : ['prop-res-1', 'prop-comm-1'];
    } catch {
      return ['prop-res-1', 'prop-comm-1'];
    }
  });

  const toggleSaveProperty = (id: string) => {
    setSavedPropertyIds(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('ri8click_saved_properties', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const clearAllSaved = () => {
    setSavedPropertyIds([]);
    try {
      localStorage.removeItem('ri8click_saved_properties');
    } catch (e) {
      console.error(e);
    }
  };

  // Views increment logic for properties
  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    // Increment view count
    setProperties(prev => {
      const updated = prev.map(p => {
        if (p.id === property.id) {
          return { ...p, viewsCount: (p.viewsCount || 0) + 1 };
        }
        return p;
      });
      try {
        localStorage.setItem('ri8click_properties_data', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Views increment logic for blogs
  const handleSelectBlog = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setBlogs(prev => {
      const updated = prev.map(b => {
        if (b.id === blog.id) {
          return { ...b, viewsCount: (b.viewsCount || 0) + 1 };
        }
        return b;
      });
      try {
        localStorage.setItem('ri8click_blogs_data', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Appearance CMS persistence handlers
  const handleUpdateHeroSlides = (slides: HeroSlide[]) => {
    setHeroSlides(slides);
    try {
      localStorage.setItem('ri8click_hero_slides', JSON.stringify(slides));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateBlogs = (newBlogs: BlogPost[]) => {
    setBlogs(newBlogs);
    try {
      localStorage.setItem('ri8click_blogs_data', JSON.stringify(newBlogs));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdatePortions = (newPortions: SiteSectionPortion[]) => {
    setSitePortions(newPortions);
    try {
      localStorage.setItem('ri8click_site_portions', JSON.stringify(newPortions));
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetPortions = () => {
    setSitePortions(initialSitePortions);
    try {
      localStorage.setItem('ri8click_site_portions', JSON.stringify(initialSitePortions));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateProvinceCityData = (newData: ProvinceCityData[]) => {
    setProvinceCityData(newData);
    try {
      localStorage.setItem('ri8click_locations_data', JSON.stringify(newData));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateProperties = (updated: Property[]) => {
    setProperties(updated);
    try {
      localStorage.setItem('ri8click_properties_data', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Search Filter State
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

  // Filtered Properties Computation
  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      // Keyword search
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(query);
        const matchesDesc = prop.description.toLowerCase().includes(query);
        const matchesCity = prop.location.city.toLowerCase().includes(query);
        const matchesSociety = prop.location.society.toLowerCase().includes(query);
        const matchesType = prop.type.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCity && !matchesSociety && !matchesType) {
          return false;
        }
      }

      // Purpose
      if (filters.purpose !== 'all' && prop.purpose !== filters.purpose) {
        return false;
      }

      // Category
      if (filters.category !== 'all' && prop.category !== filters.category) {
        return false;
      }

      // Province
      if (filters.province && filters.province !== 'All Provinces' && prop.location.province !== filters.province) {
        return false;
      }

      // City (e.g. Taxila)
      if (filters.city && filters.city !== 'All Cities' && prop.location.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }

      // Society (e.g. Faisal Hills)
      if (
        filters.society && 
        filters.society !== 'All Societies' && 
        filters.society !== 'Show All' && 
        filters.society !== 'all' && 
        !prop.location.society.toLowerCase().includes(filters.society.toLowerCase())
      ) {
        return false;
      }

      // Property Type
      if (filters.propertyType && prop.type.toLowerCase() !== filters.propertyType.toLowerCase()) {
        return false;
      }

      // Agency filter
      if (filters.agencyId && prop.agencyId !== filters.agencyId) {
        return false;
      }

      return true;
    });
  }, [properties, filters]);

  // Handle adding new property (with watermark and quota update)
  const handleAddProperty = (newProperty: Property) => {
    setProperties(prev => {
      const updated = [newProperty, ...prev];
      try {
        localStorage.setItem('ri8click_properties_data', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    // increment agency post count
    setAgencies(prev => {
      const updated = prev.map(a => {
        if (a.id === newProperty.agencyId) {
          return {
            ...a,
            totalPosts: a.totalPosts + 1,
            activeListings: a.activeListings + 1
          };
        }
        return a;
      });
      try {
        localStorage.setItem('ri8click_agencies_data', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Handle updating agency limit
  const handleUpdateAgencyLimit = (agencyId: string, newLimit: number) => {
    setAgencies(prev => {
      const updated = prev.map(a => {
        if (a.id === agencyId) {
          return { ...a, postLimit: newLimit };
        }
        return a;
      });
      try {
        localStorage.setItem('ri8click_agencies_data', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Handle adding new agency
  const handleAddNewAgency = (newAgency: AgencyAccount) => {
    setAgencies(prev => {
      const updated = [newAgency, ...prev];
      try {
        localStorage.setItem('ri8click_agencies_data', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Saved properties list objects
  const savedPropertiesList = useMemo(() => {
    return properties.filter(p => savedPropertyIds.includes(p.id));
  }, [properties, savedPropertyIds]);

  // Helper to check if a section portion is enabled
  const isPortionEnabled = (key: string) => {
    const p = sitePortions.find(item => item.key === key);
    return p ? p.isEnabled : true;
  };

  // Helper to get custom portion title
  const getPortionTitle = (key: string, defaultTitle: string) => {
    const p = sitePortions.find(item => item.key === key);
    return p && p.title ? p.title : defaultTitle;
  };

  // Full-screen 100vh Scrollytelling Mode when visiting /advibe/{project-slug}
  if (activeAdvibeSlug) {
    const currentAdvibeProject = advibeProjects.find(p => p.slug === activeAdvibeSlug) || advibeProjects[0];
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        <AdvibeProjectScrollyPage
          project={currentAdvibeProject}
          properties={properties}
          onBackToListing={() => {
            navigateToAdvibeListing();
          }}
          onSelectProperty={handleSelectProperty}
        />

        {/* Property Detail Modal for viewing linked inventory units */}
        {selectedProperty && (
          <PropertyDetailModal
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
            isSaved={savedPropertyIds.includes(selectedProperty.id)}
            onToggleSave={toggleSaveProperty}
            onScheduleTour={(p) => setTourProperty(p)}
          />
        )}

        {/* Schedule Site Visit Modal */}
        {tourProperty && (
          <ScheduleTourModal
            isOpen={!!tourProperty}
            onClose={() => setTourProperty(null)}
            property={tourProperty}
          />
        )}

        <FloatingWhatsApp />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-500/20 selection:text-slate-900">
      
      {/* 1. Corporate Navbar with Transparent Vector Logo & Role Portal */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'advibe') {
            navigateToAdvibeListing();
          } else {
            setActiveTab(tab);
            setActiveAdvibeSlug(null);
            if (typeof window !== 'undefined' && window.history.pushState) {
              window.history.pushState({}, '', '/');
            }
          }
        }}
        savedPropertiesCount={savedPropertyIds.length}
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
        currentRole={currentUser ? currentUser.role : 'customer'}
        currentAgency={currentAgency}
        currentUser={currentUser}
        onOpenLoginModal={(reason) => {
          setLoginModalReason(reason || 'general');
          setIsLoginModalOpen(true);
        }}
        onLogout={handleUserLogout}
      />

      {/* Main Body: AdVibe Showcase Page OR Standard Portal Sections */}
      {activeTab === 'advibe' ? (
        <AdvibeListingPage
          projects={advibeProjects}
          onOpenProject={(slug) => navigateToAdvibeProject(slug)}
          onOpenCreateProject={() => {
            if (!currentUser || (currentUser.role !== 'admin' && !currentAgency?.canManageAdvibe)) {
              setLoginModalReason('advibe_required');
              setIsLoginModalOpen(true);
              return;
            }
            setAdminInitialTab('advibe');
            setIsAdminModalOpen(true);
          }}
          canManageAdvibe={currentUser?.role === 'admin' || !!currentAgency?.canManageAdvibe}
        />
      ) : (
        <>
          {/* 2. Top "Scrollytelling" Hero Slider (Manageable via Admin Banner Manager) */}
      {isPortionEnabled('hero_slider') && (
        <HeroSection
          slides={heroSlides}
          onExploreClick={() => {
            const el = document.getElementById('properties-grid-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onContactAgentClick={() => setTourProperty(properties[0])}
          onSelectCategoryFilter={(cat) => {
            setFilters(prev => ({ ...prev, category: cat }));
            const el = document.getElementById('properties-grid-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpen3DTour={(sample) => {
            const matched = properties.find(p => p.title.toLowerCase().includes(sample.title.toLowerCase().substring(0, 10))) || properties[0];
            setVirtualTour3DProperty(matched);
          }}
        />
      )}

      {/* 3. Search & Multi-Filter Bar */}
      {isPortionEnabled('search_filter') && (
        <SearchFilterBar
          filters={filters}
          setFilters={setFilters}
          provinceCityData={provinceCityData}
          totalResultsCount={filteredProperties.length}
          onResetFilters={resetFilters}
        />
      )}

      {/* 4. Main Featured Properties Grid Section */}
      {isPortionEnabled('featured_properties') && (
        <main id="properties-grid-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Portfolios • 100% Watermarked</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {filters.category === 'commercial' 
                  ? 'Commercial Plazas & Corporate Investments' 
                  : filters.category === 'modular' 
                  ? 'Readymade Capsule & Modular Smart Houses'
                  : filters.category === 'projects'
                  ? 'New Master Projects & Commercial Centres'
                  : getPortionTitle('featured_properties', 'Featured Residential & Commercial Properties')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Showing {filteredProperties.length} verified listings in {filters.city || 'Taxila & All Regions'} • {filters.society && filters.society !== 'Show All' ? filters.society : (filters.city ? `All ${filters.city} Societies` : 'All Societies')}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              {filters.agencyId && (
                <button
                  onClick={() => setFilters(prev => ({ ...prev, agencyId: '' }))}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                >
                  Clear Agency Filter ✕
                </button>
              )}

              <button
                onClick={() => {
                  setAdminInitialTab('locations');
                  setIsAdminModalOpen(true);
                }}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition-colors flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Manage Cities/Societies</span>
              </button>
            </div>
          </div>

          {/* Properties Grid */}
          {filteredProperties.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center space-y-3 shadow-sm">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-semibold text-slate-900">No Matching Properties Found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                We couldn't find any listings matching your current filter criteria. Try resetting filters or exploring Taxila / Faisal Hills.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-2xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isSaved={savedPropertyIds.includes(property.id)}
                  onToggleSave={toggleSaveProperty}
                  onSelectProperty={handleSelectProperty}
                  onScheduleTour={(p) => setTourProperty(p)}
                />
              ))}
            </div>
          )}

        </main>
      )}

      {/* 5. Dedicated Commercial Section */}
      {isPortionEnabled('commercial_showcase') && (
        <CommercialShowcase
          properties={properties}
          savedPropertyIds={savedPropertyIds}
          onToggleSave={toggleSaveProperty}
          onSelectProperty={handleSelectProperty}
          onScheduleTour={(p) => setTourProperty(p)}
          onViewAllCommercial={() => {
            setFilters(prev => ({ ...prev, category: 'commercial' }));
            const el = document.getElementById('properties-grid-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* 6. Dedicated Modular Smart Houses Section */}
      {isPortionEnabled('modular_houses') && (
        <ModularHomesShowcase
          properties={properties}
          savedPropertyIds={savedPropertyIds}
          onToggleSave={toggleSaveProperty}
          onSelectProperty={handleSelectProperty}
          onScheduleTour={(p) => setTourProperty(p)}
          onWhatsAppInquiry={(subject) => {
            const text = encodeURIComponent(`Assalam o Alaikum, I am inquiring about ${subject} on ri8click.`);
            window.open(`https://wa.me/923365666727?text=${text}`, '_blank');
          }}
        />
      )}

      {/* 7. Real Estate News & Blogs Section (CRUD manageable in Admin) */}
      {isPortionEnabled('news_blogs_section') && (
        <NewsBlogsSection
          blogs={blogs}
          onSelectBlog={handleSelectBlog}
          onOpenAdminBlogManager={() => {
            setAdminInitialTab('blogs');
            setIsAdminModalOpen(true);
          }}
        />
      )}

      {/* 8. Multi-Agent & Certified Brokerage Network */}
      {isPortionEnabled('verified_agencies') && (
        <AgenciesSection
          agencies={agencies}
          properties={properties}
          onOpenRegisterAgency={() => {
            setAdminInitialTab('agencies');
            setIsAdminModalOpen(true);
          }}
          onFilterByAgency={(agencyId) => {
            setFilters(prev => ({ ...prev, agencyId }));
            const el = document.getElementById('properties-grid-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* 9. Consortium Showcase */}
      {isPortionEnabled('consortium_section') && (
        <ConsortiumShowcase
          divisions={consortiumDivisions}
          onSelectDivisionContact={(div) => {
            const text = encodeURIComponent(`Assalam o Alaikum, I am inquiring about ${div.title} via ri8click website.`);
            window.open(`https://wa.me/${div.contactWhatsApp}?text=${text}`, '_blank');
          }}
        />
      )}
        </>
      )}

      {/* 10. Corporate Footer */}
      <Footer
        divisions={consortiumDivisions}
        onSelectNavTab={(tab: string) => {
          setActiveTab(tab);
          if (tab === 'commercial') {
            document.getElementById('commercial-section')?.scrollIntoView({ behavior: 'smooth' });
          } else if (tab === 'modular') {
            document.getElementById('modular-section')?.scrollIntoView({ behavior: 'smooth' });
          } else if (tab === 'news_blogs') {
            document.getElementById('news-blogs-section')?.scrollIntoView({ behavior: 'smooth' });
          } else if (tab === 'consortium') {
            document.getElementById('consortium-section')?.scrollIntoView({ behavior: 'smooth' });
          } else if (tab === 'agents') {
            document.getElementById('agents-section')?.scrollIntoView({ behavior: 'smooth' });
          } else if (tab === 'properties') {
            document.getElementById('properties-grid-section')?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenAdmin={() => {
          if (!currentUser || currentUser.role !== 'admin') {
            setLoginModalReason('admin_required');
            setIsLoginModalOpen(true);
            return;
          }
          setAdminInitialTab('overview');
          setIsAdminModalOpen(true);
        }}
      />

      {/* Interactive 3D Virtual Tour Modal */}
      <VirtualTour3DModal
        isOpen={!!virtualTour3DProperty}
        onClose={() => setVirtualTour3DProperty(null)}
        property={virtualTour3DProperty}
        onScheduleVisit={(p) => {
          setVirtualTour3DProperty(null);
          setTourProperty(p);
        }}
      />

      {/* Authentication & Role Switcher Modal */}
      <AuthRoleModal
        isOpen={isAuthRoleModalOpen}
        onClose={() => setIsAuthRoleModalOpen(false)}
        currentRole={currentRole}
        currentAgency={currentAgency}
        allAgencies={agencies}
        onSelectAgency={(agencyId: string) => setCurrentAgencyId(agencyId)}
        onSelectRole={(role) => setCurrentRole(role)}
        onOpenAdminHub={() => {
          setIsAuthRoleModalOpen(false);
          if (!currentUser || currentUser.role !== 'admin') {
            setLoginModalReason('admin_required');
            setIsLoginModalOpen(true);
            return;
          }
          setAdminInitialTab('overview');
          setIsAdminModalOpen(true);
        }}
        onOpenPostProperty={() => {
          setIsAuthRoleModalOpen(false);
          if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'agency')) {
            setLoginModalReason('agency_required');
            setIsLoginModalOpen(true);
            return;
          }
          setIsPostModalOpen(true);
        }}
      />

      {/* Mandatory Auth & Role Login Gate Modal */}
      <AuthLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleUserLogin}
        onLogout={handleUserLogout}
        requiredReason={loginModalReason}
        agencies={agencies}
      />

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        isSaved={selectedProperty ? savedPropertyIds.includes(selectedProperty.id) : false}
        onToggleSave={toggleSaveProperty}
        onScheduleTour={(p) => {
          setSelectedProperty(null);
          setTourProperty(p);
        }}
      />

      {/* Blog Detail Reader Modal */}
      <BlogDetailModal
        blog={selectedBlog}
        onClose={() => setSelectedBlog(null)}
        onOpenPropertySearch={(society) => {
          setFilters(prev => ({ ...prev, society }));
          setSelectedBlog(null);
          document.getElementById('properties-grid-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Schedule Site Visit Modal */}
      <ScheduleTourModal
        isOpen={!!tourProperty}
        onClose={() => setTourProperty(null)}
        property={tourProperty}
      />

      {/* Post Property Modal */}
      <PostPropertyModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        currentAgency={currentAgency}
        provinceCityData={provinceCityData}
        onAddProperty={handleAddProperty}
        onOpenAdmin={() => {
          if (!currentUser || currentUser.role !== 'admin') {
            setLoginModalReason('admin_required');
            setIsLoginModalOpen(true);
            return;
          }
          setAdminInitialTab('agencies');
          setIsAdminModalOpen(true);
        }}
        currentRole={currentUser ? currentUser.role : 'customer'}
        isSuperAdmin={currentUser?.role === 'admin'}
        onOpenRoleSwitcher={() => {
          setLoginModalReason('general');
          setIsLoginModalOpen(true);
        }}
      />

      {/* Saved Properties Drawer Modal */}
      <SavedPropertiesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedProperties={savedPropertiesList}
        onToggleSave={toggleSaveProperty}
        onSelectProperty={handleSelectProperty}
        onScheduleTour={(p) => setTourProperty(p)}
        onClearAllSaved={clearAllSaved}
      />

      {/* Super Admin, Appearance & CMS Hub Modal */}
      <AdminHubModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        provinceCityData={provinceCityData}
        onUpdateProvinceCityData={handleUpdateProvinceCityData}
        agencies={agencies}
        properties={properties}
        onUpdateProperties={handleUpdateProperties}
        onUpdateAgencyLimit={handleUpdateAgencyLimit}
        onAddNewAgency={handleAddNewAgency}
        heroSlides={heroSlides}
        onUpdateHeroSlides={handleUpdateHeroSlides}
        blogs={blogs}
        onUpdateBlogs={handleUpdateBlogs}
        portions={sitePortions}
        onUpdatePortions={handleUpdatePortions}
        onResetPortions={handleResetPortions}
        onViewBlog={handleSelectBlog}
        onViewProperty={handleSelectProperty}
        initialTab={adminInitialTab}
        currentRole={currentUser ? currentUser.role : 'customer'}
        isSuperAdmin={currentUser?.role === 'admin'}
        currentUser={currentUser}
        onUpdateCurrentUser={handleUpdateCurrentUser}
        allUsers={userAccounts}
        onUpdateAllUsers={handleUpdateUserAccounts}
        onOpenRoleSwitcher={() => {
          setLoginModalReason('general');
          setIsLoginModalOpen(true);
        }}
        onOpenVirtualTour={(prop) => setVirtualTour3DProperty(prop)}
        advibeProjects={advibeProjects}
        advibeLeads={advibeLeads}
        onSaveAdvibeProject={handleSaveAdvibeProject}
        onDeleteAdvibeProject={handleDeleteAdvibeProject}
        onDuplicateAdvibeProject={handleDuplicateAdvibeProject}
        onUpdateAdvibeLeadStatus={handleUpdateAdvibeLeadStatus}
        onToggleAgencyAdvibePermission={handleToggleAgencyAdvibePermission}
        onPreviewAdvibeProject={(slug) => navigateToAdvibeProject(slug)}
      />

      {/* Floating Utilities */}
      <AiChatbot />
      <FloatingWhatsApp />
      <ScrollToTop />

    </div>
  );
}

export default App;

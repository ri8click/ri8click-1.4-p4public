import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Users, 
  Sparkles, 
  FileText, 
  Layout, 
  BarChart3, 
  Eye, 
  Layers, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Key, 
  AlertCircle, 
  Building2, 
  SlidersHorizontal, 
  ExternalLink, 
  CheckCircle2,
  User,
  BadgeCheck
} from 'lucide-react';
import { 
  ProvinceCityData, 
  AgencyAccount, 
  Property, 
  HeroSlide, 
  BlogPost, 
  SiteSectionPortion, 
  AdVibeProject, 
  AdVibeLead 
} from '../types';
import { UserAccount } from '../data/defaultAccounts';
import { AdvibeAdminManager } from './advibe/AdvibeAdminManager';
import { AdminCitySocietyManager } from './AdminCitySocietyManager';
import { AgencyPostMonitorManager } from './AgencyPostMonitorManager';
import { AdminBannerManager } from './AdminBannerManager';
import { AdminBlogManager } from './AdminBlogManager';
import { AdminPortionsManager } from './AdminPortionsManager';
import { AdminPropertyManager } from './AdminPropertyManager';
import { AdminUserProfileManager } from './AdminUserProfileManager';
import { AdminRolesManager } from './AdminRolesManager';
import { Ri8ClickLogo } from './Ri8ClickLogo';

export type AdminTabType = 'overview' | 'properties' | 'advibe' | 'banners' | 'blogs' | 'portions' | 'locations' | 'agencies' | 'profile' | 'roles';

interface AdminHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  provinceCityData: ProvinceCityData[];
  onUpdateProvinceCityData: (data: ProvinceCityData[]) => void;
  agencies: AgencyAccount[];
  properties: Property[];
  onUpdateProperties: (properties: Property[]) => void;
  onUpdateAgencyLimit: (agencyId: string, newLimit: number) => void;
  onAddNewAgency?: (agency: AgencyAccount) => void;
  heroSlides: HeroSlide[];
  onUpdateHeroSlides: (slides: HeroSlide[]) => void;
  blogs: BlogPost[];
  onUpdateBlogs: (blogs: BlogPost[]) => void;
  portions: SiteSectionPortion[];
  onUpdatePortions: (portions: SiteSectionPortion[]) => void;
  onResetPortions?: () => void;
  onViewBlog?: (blog: BlogPost) => void;
  onViewProperty?: (property: Property) => void;
  initialTab?: AdminTabType;
  currentRole?: 'admin' | 'agency' | 'customer';
  isSuperAdmin?: boolean;
  currentUser?: UserAccount | null;
  onUpdateCurrentUser?: (user: UserAccount) => void;
  allUsers?: UserAccount[];
  onUpdateAllUsers?: (users: UserAccount[]) => void;
  onOpenRoleSwitcher?: () => void;
  onOpenVirtualTour?: (property: Property) => void;
  advibeProjects?: AdVibeProject[];
  advibeLeads?: AdVibeLead[];
  onSaveAdvibeProject?: (project: AdVibeProject) => void;
  onDeleteAdvibeProject?: (projectId: string) => void;
  onDuplicateAdvibeProject?: (projectId: string) => void;
  onUpdateAdvibeLeadStatus?: (leadId: string, status: AdVibeLead['status']) => void;
  onToggleAgencyAdvibePermission?: (agencyId: string, permitted: boolean) => void;
  onPreviewAdvibeProject?: (slug: string) => void;
}

export const AdminHubModal: React.FC<AdminHubModalProps> = ({
  isOpen,
  onClose,
  provinceCityData,
  onUpdateProvinceCityData,
  agencies,
  properties,
  onUpdateProperties,
  onUpdateAgencyLimit,
  onAddNewAgency,
  heroSlides,
  onUpdateHeroSlides,
  blogs,
  onUpdateBlogs,
  portions,
  onUpdatePortions,
  onResetPortions,
  onViewBlog,
  onViewProperty,
  initialTab = 'overview',
  currentRole = 'admin',
  isSuperAdmin,
  currentUser,
  onUpdateCurrentUser,
  allUsers = [],
  onUpdateAllUsers,
  onOpenRoleSwitcher,
  onOpenVirtualTour,
  advibeProjects = [],
  advibeLeads = [],
  onSaveAdvibeProject,
  onDeleteAdvibeProject,
  onDuplicateAdvibeProject,
  onUpdateAdvibeLeadStatus,
  onToggleAgencyAdvibePermission,
  onPreviewAdvibeProject,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<AdminTabType>(initialTab);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(isSuperAdmin || currentRole === 'admin');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  const handleUnlockWithPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    // Retrieve default or customized admin password
    let validPass = 'admin123';
    try {
      const stored = localStorage.getItem('ri8click_user_accounts');
      if (stored) {
        const parsed = JSON.parse(stored);
        const adminAcc = parsed.find((a: any) => a.role === 'admin' || a.username === 'admin');
        if (adminAcc?.password) validPass = adminAcc.password;
      }
    } catch {}

    if (passwordInput.trim() === validPass) {
      setIsAdminUnlocked(true);
      setAuthError('');
    } else {
      setAuthError(`Invalid Super Admin password. Default is "${validPass}".`);
    }
  };

  // Quick Overview Stats
  const totalViews = properties.reduce((acc, p) => acc + (p.viewsCount || 0), 0) + 
                     blogs.reduce((acc, b) => acc + (b.viewsCount || 0), 0);
  const activePropertiesCount = properties.filter(p => p.status === 'active').length;
  const publishedBlogsCount = blogs.filter(b => b.status === 'published').length;
  const activeSlidesCount = heroSlides.filter(s => s.isActive).length;
  const enabledPortionsCount = portions.filter(p => p.isEnabled).length;

  // STRICT ACCESS RESTRICTION: Render Lock Screen if not authenticated
  if (!isAdminUnlocked) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in">
        <div 
          className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 text-slate-100 overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Admin Console Restricted</h3>
                <p className="text-[10px] text-slate-400">Clearance Level: Super Administrator</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-5 space-y-4 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center shadow-inner">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-base font-bold text-white">Protected Management Console</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Direct access to the system admin panel is prohibited without proper role authorization. Enter the Super Admin password to unlock.
              </p>
            </div>

            {authError && (
              <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleUnlockWithPassword} className="space-y-3 pt-1">
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Enter Super Admin password (default: admin123)"
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-hidden focus:border-amber-400"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify Password & Unlock Console</span>
              </button>
            </form>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Default credentials: <strong>admin123</strong></span>
              {onOpenRoleSwitcher && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenRoleSwitcher();
                  }}
                  className="text-blue-400 hover:underline font-semibold"
                >
                  Open Role Switcher
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-7xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[96vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Dark Bar (Admin Header) */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <Ri8ClickLogo size="sm" showSubtitle={false} className="h-7 w-auto" />
            <div className="hidden sm:block border-l border-slate-700 pl-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>ri8click Management Console</span>
                <span className="text-[10px] bg-blue-600/80 px-2 py-0.5 rounded font-mono font-normal">Enterprise Edition</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Property Advertisements CRUD, Location Maps, Appearance, Sliders, Blogs & Portions Control
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu (Horizontal Ribbon) */}
        <div className="bg-slate-800 px-4 py-2 flex items-center gap-1.5 overflow-x-auto border-b border-slate-700 shrink-0">
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('properties')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'properties'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Properties & Map Pins ({properties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('advibe')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'advibe'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AdVibe Megaprojects ({advibeProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('banners')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'banners'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Top "Scrollytelling" Banner ({heroSlides.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'blogs'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>News & Blogs ({blogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('portions')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'portions'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Layout className="w-3.5 h-3.5 text-indigo-400" />
            <span>Site Portions & Layout ({portions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('locations')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'locations'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>Cities & Societies</span>
          </button>

          <button
            onClick={() => setActiveTab('agencies')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'agencies'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Agency Quotas ({agencies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('roles')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'roles'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Roles & Certified Agents ({allUsers.length || 'RBAC'})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <User className="w-3.5 h-3.5 text-amber-400" />
            <span>My Profile & Account</span>
          </button>

        </div>

        {/* Scrollable Main Content Pane */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1 bg-slate-50">
          
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Metric Highlights Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Total Properties
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    {activePropertiesCount}
                  </div>
                  <div className="text-[10.5px] text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>100% Watermarked</span>
                  </div>
                </div>

                <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Total Portal Views
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {totalViews.toLocaleString()}
                  </div>
                  <div className="text-[10.5px] text-slate-400">
                    Properties & Blog Reads
                  </div>
                </div>

                <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Banner Slides
                  </div>
                  <div className="text-2xl font-bold text-amber-600">
                    {activeSlidesCount} / {heroSlides.length}
                  </div>
                  <div className="text-[10.5px] text-slate-400">
                    Scrollytelling Active
                  </div>
                </div>

                <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Published Blogs
                  </div>
                  <div className="text-2xl font-bold text-emerald-600">
                    {publishedBlogsCount}
                  </div>
                  <div className="text-[10.5px] text-slate-400">
                    Insights & NOC Guides
                  </div>
                </div>

                <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Active Agencies
                  </div>
                  <div className="text-2xl font-bold text-indigo-600">
                    {agencies.length}
                  </div>
                  <div className="text-[10.5px] text-slate-400">
                    Multi-Agent Network
                  </div>
                </div>
              </div>

              {/* Quick Actions & Navigation Bento */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Properties & Location Maps Quick Link */}
                <div 
                  onClick={() => setActiveTab('properties')}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-500 transition-all cursor-pointer shadow-2xs space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Properties & Location Maps (CRUD)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Create, update, manage GPS map pins, change prices, toggle status, and delete posted advertisements.
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-1">
                    <span>Manage Posts ({properties.length}) →</span>
                  </div>
                </div>

                {/* Banner Quick Link */}
                <div 
                  onClick={() => setActiveTab('banners')}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-500 transition-all cursor-pointer shadow-2xs space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Top "Scrollytelling" Banner Manager
                    </h4>
                    <p className="text-xs text-slate-500">
                      Add, update or delete slides with real architectural photography from Faisal Hills, Islamabad, and Lahore.
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-1">
                    <span>Manage Slides ({heroSlides.length}) →</span>
                  </div>
                </div>

                {/* News & Blogs Quick Link */}
                <div 
                  onClick={() => setActiveTab('blogs')}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-500 transition-all cursor-pointer shadow-2xs space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Real Estate News & Blogs (CRUD)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Write articles, update view counts, edit publication dates, authors, categories, and markdown content.
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-1">
                    <span>Manage Articles ({blogs.length}) →</span>
                  </div>
                </div>

                {/* Site Portions Quick Link */}
                <div 
                  onClick={() => setActiveTab('portions')}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-500 transition-all cursor-pointer shadow-2xs space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                    <Layout className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Site Appearance & Portions Layout
                    </h4>
                    <p className="text-xs text-slate-500">
                      Toggle homepage sections on/off, reorder blocks, and customize section titles across the portal.
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 pt-1">
                    <span>Manage Portions ({portions.length}) →</span>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB: PROPERTIES & ADVERTISEMENTS CRUD */}
          {activeTab === 'properties' && (
            <AdminPropertyManager
              properties={properties}
              agencies={agencies}
              provinceCityData={provinceCityData}
              onUpdateProperties={onUpdateProperties}
              onViewProperty={onViewProperty}
              currentRole={currentRole}
              isSuperAdmin={isSuperAdmin}
              currentUser={currentUser}
              onOpenRoleSwitcher={onOpenRoleSwitcher}
              onOpenVirtualTour={onOpenVirtualTour}
            />
          )}

          {/* TAB: ADVIBE MEGAPROJECTS & LEADS */}
          {activeTab === 'advibe' && (
            <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800">
              <AdvibeAdminManager
                projects={advibeProjects}
                leads={advibeLeads}
                agencies={agencies}
                properties={properties}
                onSaveProject={onSaveAdvibeProject || (() => {})}
                onDeleteProject={onDeleteAdvibeProject || (() => {})}
                onDuplicateProject={onDuplicateAdvibeProject || (() => {})}
                onUpdateLeadStatus={onUpdateAdvibeLeadStatus || (() => {})}
                onToggleAgencyAdvibePermission={onToggleAgencyAdvibePermission || (() => {})}
                onPreviewProject={(slug) => {
                  onClose();
                  if (onPreviewAdvibeProject) onPreviewAdvibeProject(slug);
                }}
                currentRole={currentRole}
              />
            </div>
          )}

          {/* TAB 2: HERO BANNER MANAGER */}
          {activeTab === 'banners' && (
            <AdminBannerManager
              slides={heroSlides}
              onUpdateSlides={onUpdateHeroSlides}
            />
          )}

          {/* TAB 3: NEWS & BLOGS CRUD */}
          {activeTab === 'blogs' && (
            <AdminBlogManager
              blogs={blogs}
              onUpdateBlogs={onUpdateBlogs}
              onViewBlog={onViewBlog}
            />
          )}

          {/* TAB 4: SITE PORTIONS & LAYOUT (FULL DYNAMIC CRUD) */}
          {activeTab === 'portions' && (
            <AdminPortionsManager
              portions={portions}
              onUpdatePortions={onUpdatePortions}
              onResetToDefault={onResetPortions}
            />
          )}

          {/* TAB 5: CITIES & SOCIETIES */}
          {activeTab === 'locations' && (
            <AdminCitySocietyManager
              provinceCityData={provinceCityData}
              onUpdateProvinceCityData={onUpdateProvinceCityData}
            />
          )}

          {/* TAB 6: AGENCY QUOTAS & POST LIMITS */}
          {activeTab === 'agencies' && (
            <AgencyPostMonitorManager
              agencies={agencies}
              properties={properties}
              onUpdateAgencyLimit={onUpdateAgencyLimit}
              onAddNewAgency={onAddNewAgency}
            />
          )}

          {/* TAB 7: ROLES & PRIVILEGES ENGINE (SUPER ADMIN & CERTIFIED AGENTS) */}
          {activeTab === 'roles' && (
            <AdminRolesManager
              currentUser={currentUser || {
                id: 'admin-fallback',
                name: 'Super Administrator',
                username: 'admin',
                email: 'admin@ri8click.com',
                password: 'admin123',
                role: 'admin',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                permissions: ['all', 'manage_all_posts']
              }}
              allUsers={allUsers}
              onUpdateAllUsers={(users) => {
                if (onUpdateAllUsers) onUpdateAllUsers(users);
              }}
              onUpdateCurrentUser={onUpdateCurrentUser}
            />
          )}

          {/* TAB 8: USER PROFILE & ACCOUNT CONTROL */}
          {activeTab === 'profile' && (
            <AdminUserProfileManager
              currentUser={currentUser || {
                id: 'admin-fallback',
                name: 'Super Administrator',
                username: 'admin',
                email: 'admin@ri8click.com',
                password: 'admin123',
                role: 'admin',
                designation: 'Principal System Administrator & Consortium Controller',
                companyName: 'ri8click Corporate Consortium',
                licenseNumber: 'RDA-CONSORTIUM-ADM-001',
                phone: '+92 336 5666727',
                whatsapp: '+92 336 5666727',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                permissions: ['all']
              }}
              onUpdateCurrentUser={(updated) => {
                if (onUpdateCurrentUser) onUpdateCurrentUser(updated);
              }}
              allUsers={allUsers}
              onUpdateAllUsers={onUpdateAllUsers}
            />
          )}

        </div>

      </div>
    </div>
  );
};

export default AdminHubModal;

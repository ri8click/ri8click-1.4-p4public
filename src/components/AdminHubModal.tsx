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
import { UserAccount, PAKISTAN_AGENT_AVATARS } from '../data/defaultAccounts';
import { AdVibeAdminManager } from './AdVibeAdminManager';
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
  initialTab?: AdminTabType;
  properties: Property[];
  onUpdateProperties: (properties: Property[]) => void;
  onViewProperty?: (property: Property) => void;
  onOpenVirtualTour?: (property: Property) => void;
  agencies: AgencyAccount[];
  onUpdateAgencyLimit: (agencyId: string, newLimit: number) => void;
  onAddNewAgency: (agency: AgencyAccount) => void;
  provinceCityData: ProvinceCityData[];
  onUpdateProvinceCityData: (data: ProvinceCityData[]) => void;
  heroSlides: HeroSlide[];
  onUpdateHeroSlides: (slides: HeroSlide[]) => void;
  blogs: BlogPost[];
  onUpdateBlogs: (blogs: BlogPost[]) => void;
  onViewBlog: (blog: BlogPost) => void;
  portions: SiteSectionPortion[];
  onUpdatePortions: (portions: SiteSectionPortion[]) => void;
  onResetPortions: () => void;
  advibeProjects?: AdVibeProject[];
  advibeLeads?: AdVibeLead[];
  onSaveAdvibeProject?: (project: AdVibeProject) => void;
  onDeleteAdvibeProject?: (projectId: string) => void;
  onDuplicateAdvibeProject?: (projectId: string) => void;
  onUpdateAdvibeLeadStatus?: (leadId: string, status: AdVibeLead['status']) => void;
  onToggleAgencyAdvibePermission?: (agencyId: string, allowed: boolean) => void;
  onPreviewAdvibeProject?: (slug: string) => void;
  currentRole?: 'admin' | 'agency' | 'customer';
  isSuperAdmin?: boolean;
  currentUser?: UserAccount | null;
  allUsers?: UserAccount[];
  onUpdateCurrentUser?: (updatedUser: UserAccount) => void;
  onUpdateAllUsers?: (updatedUsers: UserAccount[]) => void;
  onOpenRoleSwitcher?: () => void;
}

export const AdminHubModal: React.FC<AdminHubModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'overview',
  properties,
  onUpdateProperties,
  onViewProperty,
  onOpenVirtualTour,
  agencies,
  onUpdateAgencyLimit,
  onAddNewAgency,
  provinceCityData,
  onUpdateProvinceCityData,
  heroSlides,
  onUpdateHeroSlides,
  blogs,
  onUpdateBlogs,
  onViewBlog,
  portions,
  onUpdatePortions,
  onResetPortions,
  advibeProjects = [],
  advibeLeads = [],
  onSaveAdvibeProject,
  onDeleteAdvibeProject,
  onDuplicateAdvibeProject,
  onUpdateAdvibeLeadStatus,
  onToggleAgencyAdvibePermission,
  onPreviewAdvibeProject,
  currentRole = 'admin',
  isSuperAdmin = true,
  currentUser,
  allUsers = [],
  onUpdateCurrentUser,
  onUpdateAllUsers,
  onOpenRoleSwitcher,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTabType>(initialTab);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(currentRole === 'admin');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  React.useEffect(() => {
    setIsAdminUnlocked(currentRole === 'admin');
  }, [currentRole, isOpen]);

  if (!isOpen) return null;

  const handleUnlockWithPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const adminAcc = allUsers.find(u => u.role === 'admin');
    const validPass = adminAcc?.password || 'admin123';
    if (passwordInput.trim() === validPass) {
      setIsAdminUnlocked(true);
      setAuthError('');
    } else {
      setAuthError(`Invalid Super Admin password. Default is "${validPass}".`);
    }
  };

  const totalViews =
    properties.reduce((sum, p) => sum + (p.viewsCount || 0), 0) +
    blogs.reduce((sum, b) => sum + (b.viewsCount || 0), 0);
  const activePropertiesCount = properties.filter(p => p.status !== 'pending').length;
  const publishedBlogsCount = blogs.filter(b => b.status === 'published').length;
  const activeSlidesCount = heroSlides.filter(s => s.isActive).length;

  const fallbackAdminUser: UserAccount = {
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
    avatar: PAKISTAN_AGENT_AVATARS.adminPrincipal,
    permissions: ['all', 'manage_all_posts']
  };

  if (!isAdminUnlocked) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Protected Management Console</h3>
          <p className="text-xs text-slate-500">
            Enter Super Admin password (default: <strong>admin123</strong>) to unlock global portal controls.
          </p>
          {authError && (
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {authError}
            </div>
          )}
          <form onSubmit={handleUnlockWithPassword} className="space-y-3">
            <input
              type="password"
              value={passwordInput}
              onChange={e => setPasswordInput(e.target.value)}
              placeholder="Super Admin Password (admin123)"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-center"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                Unlock Console
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 overflow-y-auto bg-slate-950/75 backdrop-blur-xs">
      <div
        className="relative w-full max-w-7xl bg-slate-50 rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Dark Header */}
        <div className="bg-slate-900 text-white px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Ri8ClickLogo size="sm" showSubtitle={false} className="h-8 w-auto" />
            <div className="border-l border-slate-700 pl-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white">
                  ri8click Management Console
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-bold uppercase">
                  Universal Sync Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Property Advertisements CRUD, Cities &amp; Societies, Capsule Smart Homes, Sliders &amp; Portions Control
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
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
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Properties &amp; Capsule Homes ({properties.length})</span>
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
            <span>Cities &amp; Societies</span>
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
            <span>Top Hero Banner ({heroSlides.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('advibe')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'advibe'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>AdVibe Megaprojects ({advibeProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'blogs'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span>News &amp; Blogs ({blogs.length})</span>
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
            <span>Site Portions ({portions.length})</span>
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
            <span>Roles &amp; Certified Agents ({allUsers.length || 'RBAC'})</span>
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
            <span>My Profile</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1 bg-slate-50">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Active Listings</div>
                  <div className="text-2xl font-bold text-slate-900">{activePropertiesCount}</div>
                  <div className="text-[10.5px] text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Synced Globally</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Total Portal Views</div>
                  <div className="text-2xl font-bold text-blue-600">{totalViews.toLocaleString()}</div>
                  <div className="text-[10.5px] text-slate-400">Properties &amp; Blogs</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Banner Slides</div>
                  <div className="text-2xl font-bold text-amber-600">
                    {activeSlidesCount} / {heroSlides.length}
                  </div>
                  <div className="text-[10.5px] text-slate-400">Hero Scrollytelling</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Published Blogs</div>
                  <div className="text-2xl font-bold text-emerald-600">{publishedBlogsCount}</div>
                  <div className="text-[10.5px] text-slate-400">Insights &amp; Guides</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Active Agencies</div>
                  <div className="text-2xl font-bold text-indigo-600">{agencies.length}</div>
                  <div className="text-[10.5px] text-slate-400">Pakistan National Network</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  onClick={() => setActiveTab('properties')}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-500 transition-all cursor-pointer shadow-2xs space-y-2"
                >
                  <Building2 className="w-6 h-6 text-blue-600" />
                  <h4 className="text-sm font-bold text-slate-900">Properties &amp; Capsule Houses</h4>
                  <p className="text-xs text-slate-500">
                    Add, update, hide, or change status of any property or readymade space capsule house.
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('locations')}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-rose-500 transition-all cursor-pointer shadow-2xs space-y-2"
                >
                  <MapPin className="w-6 h-6 text-rose-600" />
                  <h4 className="text-sm font-bold text-slate-900">Add City, Region or Society</h4>
                  <p className="text-xs text-slate-500">
                    Add any missing city or housing society so it is available across all forms and filters.
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('banners')}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-amber-500 transition-all cursor-pointer shadow-2xs space-y-2"
                >
                  <Sparkles className="w-6 h-6 text-amber-500" />
                  <h4 className="text-sm font-bold text-slate-900">Top Hero Banner &amp; Capsules</h4>
                  <p className="text-xs text-slate-500">
                    Upload new Hero slides or capsule house showcase images visible to all users.
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('portions')}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-500 transition-all cursor-pointer shadow-2xs space-y-2"
                >
                  <Layout className="w-6 h-6 text-indigo-600" />
                  <h4 className="text-sm font-bold text-slate-900">Enable / Disable Site Portions</h4>
                  <p className="text-xs text-slate-500">
                    Toggle visibility of site sections globally across the entire portal.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'properties' && (
            <AdminPropertyManager
              properties={properties}
              agencies={agencies}
              provinceCityData={provinceCityData}
              onUpdateProvinceCityData={onUpdateProvinceCityData}
              onUpdateProperties={onUpdateProperties}
              onViewProperty={onViewProperty}
              onOpenVirtualTour={onOpenVirtualTour}
              currentRole={currentRole}
              isSuperAdmin={isSuperAdmin}
              currentUser={currentUser}
              onOpenRoleSwitcher={onOpenRoleSwitcher}
            />
          )}

          {activeTab === 'advibe' && (
            <AdVibeAdminManager
              projects={advibeProjects}
              leads={advibeLeads}
              agencies={agencies}
              properties={properties}
              onSaveProject={onSaveAdvibeProject || (() => {})}
              onDeleteProject={onDeleteAdvibeProject || (() => {})}
              onDuplicateProject={onDuplicateAdvibeProject || (() => {})}
              onUpdateLeadStatus={onUpdateAdvibeLeadStatus || (() => {})}
              onToggleAgencyPermission={onToggleAgencyAdvibePermission || (() => {})}
              onPreviewProject={onPreviewAdvibeProject || (() => {})}
              currentRole={currentRole}
            />
          )}

          {activeTab === 'banners' && (
            <AdminBannerManager slides={heroSlides} onUpdateSlides={onUpdateHeroSlides} />
          )}

          {activeTab === 'blogs' && (
            <AdminBlogManager
              blogs={blogs}
              onUpdateBlogs={onUpdateBlogs}
              onViewBlog={onViewBlog}
            />
          )}

          {activeTab === 'portions' && (
            <AdminPortionsManager
              portions={portions}
              onUpdatePortions={onUpdatePortions}
              onResetToDefault={onResetPortions}
            />
          )}

          {activeTab === 'locations' && (
            <AdminCitySocietyManager
              provinceCityData={provinceCityData}
              onUpdateProvinceCityData={onUpdateProvinceCityData}
            />
          )}

          {activeTab === 'agencies' && (
            <AgencyPostMonitorManager
              agencies={agencies}
              properties={properties}
              onUpdateAgencyLimit={onUpdateAgencyLimit}
              onAddNewAgency={onAddNewAgency}
            />
          )}

          {activeTab === 'roles' && (
            <AdminRolesManager
              currentUser={currentUser || fallbackAdminUser}
              allUsers={allUsers}
              agencies={agencies}
              onUpdateAllUsers={onUpdateAllUsers || (() => {})}
              onUpdateCurrentUser={onUpdateCurrentUser || (() => {})}
            />
          )}

          {activeTab === 'profile' && (
            <AdminUserProfileManager
              currentUser={currentUser || fallbackAdminUser}
              allUsers={allUsers}
              agencies={agencies}
              onUpdateCurrentUser={onUpdateCurrentUser || (() => {})}
              onUpdateAllUsers={onUpdateAllUsers || (() => {})}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHubModal;

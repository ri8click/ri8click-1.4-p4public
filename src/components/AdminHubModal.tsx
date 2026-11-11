import React, { useState } from 'react';
import {
  X,
  MapPin,
  Users,
  Sparkles,
  FileText,
  Layout,
  BarChart3,
  ShieldCheck,
  ShieldAlert,
  Building2,
  CheckCircle2,
  User,
  Compass,
  Award,
  Menu
} from 'lucide-react';
import {
  ProvinceCityData,
  AgencyAccount,
  Property,
  HeroSlide,
  BlogPost,
  SiteSectionPortion,
  AdVibeProject,
  AdVibeLead,
  ConsortiumDivision,
  TopNavigationItem
} from '../types';
import {
  UserAccount,
  PAKISTAN_AGENT_AVATARS,
  mergeUserAccountsWithDefaults
} from '../data/defaultAccounts';
import { CONSORTIUM_DIVISIONS, INITIAL_TOP_MENU_ITEMS } from '../data/mockData';
import { AdvibeAdminManager } from './advibe/AdvibeAdminManager';
import { AdminCitySocietyManager } from './AdminCitySocietyManager';
import { AgencyPostMonitorManager } from './AgencyPostMonitorManager';
import { AdminBannerManager } from './AdminBannerManager';
import { AdminBlogManager } from './AdminBlogManager';
import { AdminPortionsManager } from './AdminPortionsManager';
import { AdminPropertyManager } from './AdminPropertyManager';
import { AdminUserProfileManager } from './AdminUserProfileManager';
import { AdminRolesManager } from './AdminRolesManager';
import { AdminConsortiumManager } from './AdminConsortiumManager';
import { AdminTopMenuManager } from './AdminTopMenuManager';
import { Ri8ClickLogo } from './Ri8ClickLogo';

export type AdminTabType =
  | 'overview'
  | 'top_menu'
  | 'properties'
  | 'advibe'
  | 'banners'
  | 'consortium'
  | 'blogs'
  | 'portions'
  | 'locations'
  | 'agencies'
  | 'profile'
  | 'roles';

interface AdminHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: AdminTabType;
  topMenuItems?: TopNavigationItem[];
  onUpdateTopMenuItems?: (items: TopNavigationItem[]) => void;
  onResetTopMenuItems?: () => void;
  properties: Property[];
  onUpdateProperties: (properties: Property[]) => void;
  onViewProperty?: (property: Property) => void;
  onOpenVirtualTour?: (property: Property) => void;
  agencies: AgencyAccount[];
  onUpdateAgencies?: (agencies: AgencyAccount[]) => void;
  onUpdateAgencyLimit: (agencyId: string, newLimit: number) => void;
  onAddNewAgency: (agency: AgencyAccount) => void;
  provinceCityData: ProvinceCityData[];
  onUpdateProvinceCityData: (data: ProvinceCityData[]) => void;
  heroSlides: HeroSlide[];
  onUpdateHeroSlides: (slides: HeroSlide[]) => void;
  consortiumDivisions?: ConsortiumDivision[];
  onUpdateConsortiumDivisions?: (divisions: ConsortiumDivision[]) => void;
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
  onUpdateAdvibeLeadStatus?: (
    leadId: string,
    status: AdVibeLead['status']
  ) => void;
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
  topMenuItems = INITIAL_TOP_MENU_ITEMS,
  onUpdateTopMenuItems,
  onResetTopMenuItems,
  properties,
  onUpdateProperties,
  onViewProperty,
  onOpenVirtualTour,
  agencies,
  onUpdateAgencies,
  onUpdateAgencyLimit,
  onAddNewAgency,
  provinceCityData,
  onUpdateProvinceCityData,
  heroSlides,
  onUpdateHeroSlides,
  consortiumDivisions = CONSORTIUM_DIVISIONS,
  onUpdateConsortiumDivisions,
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
  onOpenRoleSwitcher
}) => {
  const [activeTab, setActiveTab] = useState<AdminTabType>(initialTab);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(
    currentRole === 'admin' || currentRole === 'agency'
  );
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  React.useEffect(() => {
    setIsAdminUnlocked(currentRole === 'admin' || currentRole === 'agency');
  }, [currentRole, isOpen]);

  if (!isOpen) return null;

  const handleUnlockWithPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = passwordInput.trim();
    const mergedAccounts = mergeUserAccountsWithDefaults(allUsers);
    const matched = mergedAccounts.find(
      u =>
        (u.role === 'admin' || u.role === 'agency') &&
        (u.password === cleanPass ||
          u.password.toLowerCase() === cleanPass.toLowerCase())
    );

    if (matched) {
      if (onUpdateCurrentUser) {
        onUpdateCurrentUser(matched);
      }
      setIsAdminUnlocked(true);
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError(
        'Invalid password. Please enter a valid Super Admin or Certified Agency password.'
      );
    }
  };

  const totalViews =
    properties.reduce((sum, p) => sum + (p.viewsCount || 0), 0) +
    blogs.reduce((sum, b) => sum + (b.viewsCount || 0), 0);
  const activePropertiesCount = properties.filter(
    p => p.status !== 'pending'
  ).length;
  const publishedBlogsCount = blogs.filter(
    b => b.status === 'published'
  ).length;
  const activeSlidesCount = heroSlides.filter(s => s.isActive).length;

  const fallbackAdminUser: UserAccount = {
    id: 'user-admin-1',
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

  const activeUserAccount = currentUser || fallbackAdminUser;

  if (!isAdminUnlocked) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Protected Management Console
          </h3>
          <p className="text-xs text-slate-500">
            Enter your Super Admin or Certified Agency password to unlock portal controls.
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
              placeholder="Enter Password"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-center text-slate-900"
              autoComplete="current-password"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto bg-slate-950/75 backdrop-blur-xs">
      <div
        className="relative w-full max-w-7xl bg-slate-50 rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Console Header */}
        <div className="bg-slate-900 text-white px-4 sm:px-5 py-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Ri8ClickLogo size="sm" showSubtitle={false} className="h-8 w-auto" />
            <div className="border-l border-slate-700 pl-3">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white">
                  ri8click Management &amp; Website CMS Console
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold uppercase">
                  Global Sync Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Manage Top Menu, AdVibe Studio, Hero Portfolio Deck, Properties, Consortium Links, Certified Agencies &amp; User Roles
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Active User & Role Switcher Pill */}
            <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-xl px-2.5 py-1.5">
              <img
                src={activeUserAccount.avatar}
                alt={activeUserAccount.name}
                className="w-7 h-7 rounded-lg object-cover border border-amber-400/60"
              />
              <div className="hidden md:block text-left">
                <div className="text-[11px] font-bold text-white leading-tight">
                  {activeUserAccount.name}
                </div>
                <div className="text-[9.5px] text-amber-300 font-semibold uppercase">
                  {activeUserAccount.role === 'admin'
                    ? 'Super Admin'
                    : activeUserAccount.role === 'agency'
                      ? 'Certified Agency'
                      : 'Visitor / Customer'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className="px-2 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold cursor-pointer"
                title="Edit My Profile & Photo"
              >
                Edit Profile
              </button>
              {onOpenRoleSwitcher && (
                <button
                  type="button"
                  onClick={onOpenRoleSwitcher}
                  className="px-2 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-[10px] font-black cursor-pointer"
                  title="Switch Active Role (Super Admin / Agency / Visitor)"
                >
                  Switch Role
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-800 px-3 sm:px-4 py-2 border-b border-slate-700 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            {
              id: 'top_menu',
              label: `Top Menu (${topMenuItems.length})`,
              icon: Menu
            },
            {
              id: 'advibe',
              label: `AdVibe Studio (${advibeProjects.length})`,
              icon: Sparkles
            },
            {
              id: 'banners',
              label: `Hero Portfolio Deck (${heroSlides.length})`,
              icon: Sparkles
            },
            {
              id: 'properties',
              label: `Properties & Capsules (${properties.length})`,
              icon: Building2
            },
            {
              id: 'consortium',
              label: `Consortium Blocks (${consortiumDivisions.length})`,
              icon: Compass
            },
            {
              id: 'agencies',
              label: `Agencies (${agencies.length})`,
              icon: Users
            },
            {
              id: 'roles',
              label: `Roles & Users (${mergeUserAccountsWithDefaults(allUsers).length})`,
              icon: ShieldCheck
            },
            {
              id: 'profile',
              label: 'My Profile & Photo',
              icon: User
            },
            {
              id: 'portions',
              label: `Website Blocks (${portions.length})`,
              icon: Layout
            },
            {
              id: 'locations',
              label: 'Cities & Societies',
              icon: MapPin
            },
            {
              id: 'blogs',
              label: `News & Blogs (${blogs.length})`,
              icon: FileText
            }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTabType)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="overflow-y-auto p-4 sm:p-6 flex-1 bg-slate-50">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">
                    Active Listings
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    {activePropertiesCount}
                  </div>
                  <div className="text-[10.5px] text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Synced Globally</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">
                    AdVibe Projects
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {advibeProjects.length}
                  </div>
                  <div className="text-[10.5px] text-slate-400">
                    Societies &amp; Highrises
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">
                    Portfolio Deck Slides
                  </div>
                  <div className="text-2xl font-bold text-amber-600">
                    {activeSlidesCount} / {heroSlides.length}
                  </div>
                  <div className="text-[10.5px] text-slate-400">
                    Synced with HeroSection
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">
                    Certified Agencies
                  </div>
                  <div className="text-2xl font-bold text-emerald-600">
                    {agencies.length}
                  </div>
                  <div className="text-[10.5px] text-slate-400">
                    Auto-Synced to All Ads
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">
                    Total Views
                  </div>
                  <div className="text-2xl font-bold text-indigo-600">
                    {totalViews.toLocaleString()}
                  </div>
                  <div className="text-[10.5px] text-slate-400">
                    {publishedBlogsCount} Blogs Published
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  onClick={() => setActiveTab('top_menu')}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-500 transition-all cursor-pointer shadow-2xs space-y-2"
                >
                  <Menu className="w-6 h-6 text-blue-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Top Menu Bar Sequence &amp; Text
                  </h4>
                  <p className="text-xs text-slate-500">
                    Rename top navigation items, reorder menu sequence, or keep Certified Agents at the end of the top menu bar.
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('advibe')}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-amber-500 transition-all cursor-pointer shadow-2xs space-y-2"
                >
                  <Sparkles className="w-6 h-6 text-amber-500" />
                  <h4 className="text-sm font-bold text-slate-900">
                    AdVibe Professional Ad Designer &amp; Showcase
                  </h4>
                  <p className="text-xs text-slate-500">
                    Design housing society &amp; highrise showcases, upload banner images/videos, manage Page Sections CRUD, 360° scenes, Master Plans &amp; Linked Units.
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('consortium')}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-500 transition-all cursor-pointer shadow-2xs space-y-2"
                >
                  <Compass className="w-6 h-6 text-indigo-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Consortium Blocks &amp; Image Redirect Links
                  </h4>
                  <p className="text-xs text-slate-500">
                    Upload division images and attach clickable redirect links to specific website sections or external URLs.
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('agencies')}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-500 transition-all cursor-pointer shadow-2xs space-y-2"
                >
                  <Users className="w-6 h-6 text-emerald-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Certified Agencies &amp; Specialist Photos
                  </h4>
                  <p className="text-xs text-slate-500">
                    Edit agency profiles &amp; specialist photos — changes automatically update all advertisements posted by that agent.
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('properties')}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-500 transition-all cursor-pointer shadow-2xs space-y-2"
                >
                  <Building2 className="w-6 h-6 text-blue-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Properties &amp; Capsule Houses
                  </h4>
                  <p className="text-xs text-slate-500">
                    Add, edit, or upload local images/videos for properties and modular capsule homes.
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('profile')}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-purple-500 transition-all cursor-pointer shadow-2xs space-y-2"
                >
                  <Award className="w-6 h-6 text-purple-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    My Profile, Photo Upload &amp; Credentials
                  </h4>
                  <p className="text-xs text-slate-500">
                    Upload your profile photo from your device, update phone/WhatsApp numbers, company details, and security password.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'top_menu' && (
            <AdminTopMenuManager
              menuItems={topMenuItems}
              onUpdateMenuItems={onUpdateTopMenuItems || (() => {})}
              onResetMenuItems={onResetTopMenuItems}
            />
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
            <AdvibeAdminManager
              projects={advibeProjects}
              leads={advibeLeads}
              agencies={agencies}
              properties={properties}
              provinceCityData={provinceCityData}
              onSaveProject={onSaveAdvibeProject || (() => {})}
              onDeleteProject={onDeleteAdvibeProject || (() => {})}
              onDuplicateProject={onDuplicateAdvibeProject || (() => {})}
              onUpdateLeadStatus={onUpdateAdvibeLeadStatus || (() => {})}
              onToggleAgencyAdvibePermission={
                onToggleAgencyAdvibePermission || (() => {})
              }
              onPreviewProject={onPreviewAdvibeProject || (() => {})}
              currentRole={currentRole}
            />
          )}

          {activeTab === 'banners' && (
            <AdminBannerManager
              slides={heroSlides}
              onUpdateSlides={onUpdateHeroSlides}
            />
          )}

          {activeTab === 'consortium' && (
            <AdminConsortiumManager
              divisions={consortiumDivisions}
              onUpdateDivisions={onUpdateConsortiumDivisions || (() => {})}
              isSuperAdmin={isSuperAdmin}
            />
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
              onUpdateAgencies={onUpdateAgencies}
            />
          )}

          {activeTab === 'roles' && (
            <AdminRolesManager
              currentUser={activeUserAccount}
              allUsers={mergeUserAccountsWithDefaults(allUsers)}
              onUpdateAllUsers={onUpdateAllUsers || (() => {})}
              onUpdateCurrentUser={onUpdateCurrentUser || (() => {})}
            />
          )}

          {activeTab === 'profile' && (
            <AdminUserProfileManager
              currentUser={activeUserAccount}
              allUsers={mergeUserAccountsWithDefaults(allUsers)}
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

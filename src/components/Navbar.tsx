import React, { useState } from 'react';
import { 
  Heart, 
  PlusCircle, 
  Settings, 
  User, 
  Menu, 
  X, 
  Building2, 
  ShieldCheck, 
  ShieldAlert,
  Compass, 
  Home, 
  Layers, 
  Newspaper,
  Calendar,
  Sparkles,
  Lock,
  LogOut
} from 'lucide-react';
import { Ri8ClickLogo } from './Ri8ClickLogo';
import { AgencyAccount } from '../types';
import { UserAccount } from '../data/defaultAccounts';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedPropertiesCount: number;
  onOpenSavedModal: () => void;
  onOpenPostModal: () => void;
  onOpenScheduleModal?: () => void;
  onOpenAdmin: () => void;
  onOpenAuthRoleModal: () => void;
  currentRole: 'admin' | 'agency' | 'customer';
  currentAgency: AgencyAccount;
  currentUser: UserAccount | null;
  onOpenLoginModal: (reason?: 'admin_required' | 'agency_required' | 'advibe_required' | 'general') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedPropertiesCount,
  onOpenSavedModal,
  onOpenPostModal,
  onOpenScheduleModal,
  onOpenAdmin,
  onOpenAuthRoleModal,
  currentRole,
  currentAgency,
  currentUser,
  onOpenLoginModal,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'properties', label: 'Properties', icon: Home },
    { id: 'advibe', label: 'AdVibe', icon: Sparkles },
    { id: 'commercial', label: 'Commercial Plazas', icon: Building2 },
    { id: 'modular', label: 'Capsule Houses', icon: Layers },
    { id: 'agents', label: 'Certified Agents', icon: ShieldCheck },
    { id: 'consortium', label: 'Consortium & UPVC', icon: Compass },
    { id: 'news_blogs', label: 'News & Trends', icon: Newspaper },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    
    // Smooth scroll to corresponding sections if present
    const map: Record<string, string> = {
      properties: 'properties-grid-section',
      commercial: 'commercial-section',
      modular: 'modular-section',
      agents: 'agents-section',
      consortium: 'consortium-section',
      news_blogs: 'news-blogs-section'
    };
    if (map[tabId]) {
      const el = document.getElementById(map[tabId]);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Protected action handlers
  const handleAdminClick = () => {
    if (!currentUser || currentUser.role !== 'admin') {
      onOpenLoginModal('admin_required');
      return;
    }
    onOpenAdmin();
  };

  const handlePostPropertyClick = () => {
    if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'agency')) {
      onOpenLoginModal('agency_required');
      return;
    }
    onOpenPostModal();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-2xs">
      {/* Top micro bar for corporate trust & security status */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1 px-4 hidden sm:flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span>Official Real Estate Portal & Consortium • Taxila, Faisal Hills, Islamabad</span>
          <span className="text-slate-600">|</span>
          <span className="text-amber-400 font-semibold">100% Watermark Verified Portfolios</span>
        </div>
        <div className="flex items-center gap-3">
          {currentUser ? (
            <>
              <button
                onClick={onOpenAuthRoleModal}
                className="hover:text-white transition-colors flex items-center gap-1 font-medium"
              >
                <span>Authenticated:</span>
                <span className="capitalize font-bold text-emerald-400">
                  {currentUser.role === 'admin' ? 'Super Admin' : currentUser.companyName || currentUser.name}
                </span>
              </button>
              <span className="text-slate-600">•</span>
              {currentUser.role === 'admin' ? (
                <button
                  onClick={handleAdminClick}
                  className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-bold"
                >
                  <Settings className="w-3 h-3" />
                  <span>Admin Console</span>
                </button>
              ) : currentUser.role === 'agency' ? (
                <button
                  onClick={onOpenAdmin}
                  className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 font-bold"
                  title="Open Certified Agent Panel"
                >
                  <Building2 className="w-3 h-3" />
                  <span>Agent Panel</span>
                </button>
              ) : null}
              <span className="text-slate-600">•</span>
              <button
                onClick={onLogout}
                className="text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1"
                title="Sign Out"
              >
                <LogOut className="w-3 h-3" />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <>
              <span className="text-slate-400 flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-400" />
                <span>Visitor Mode</span>
              </span>
              <span className="text-slate-600">•</span>
              <button
                onClick={() => onOpenLoginModal('general')}
                className="text-blue-400 hover:text-white font-bold transition-colors flex items-center gap-1"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Sign In / Agent Portal</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand Logo */}
          <div className="cursor-pointer" onClick={() => handleNavClick('properties')}>
            <Ri8ClickLogo size="md" showSubtitle={true} variant="dark" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isActive 
                      ? 'text-blue-700 bg-blue-50/80 shadow-2xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Saved Properties */}
            <button
              onClick={onOpenSavedModal}
              className="relative p-2 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Saved Properties"
            >
              <Heart className="w-5 h-5" />
              {savedPropertiesCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {savedPropertiesCount}
                </span>
              )}
            </button>

            {/* Post Property Button (Protected) */}
            <button
              onClick={handlePostPropertyClick}
              className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 shrink-0"
              title={currentUser ? "Post New Property" : "Agency Login Required to Post Property"}
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Post Property</span>
            </button>

            {/* Role-Based Panel Pill Button: Admin Hub for Admin, Agent Panel for Agency, Hidden for Visitors */}
            {currentUser?.role === 'admin' ? (
              <button
                onClick={handleAdminClick}
                className="p-2 sm:px-3 sm:py-2 rounded-lg border border-amber-400 bg-amber-50 text-amber-900 hover:bg-amber-100 text-xs font-semibold transition-colors flex items-center gap-1.5"
                title="Open Admin Console"
              >
                <Settings className="w-4 h-4 text-amber-600" />
                <span className="hidden xl:inline">Admin Hub</span>
              </button>
            ) : currentUser?.role === 'agency' ? (
              <button
                onClick={onOpenAdmin}
                className="p-2 sm:px-3 sm:py-2 rounded-lg border border-blue-400 bg-blue-50 text-blue-900 hover:bg-blue-100 text-xs font-semibold transition-colors flex items-center gap-1.5"
                title="Open Certified Agent Panel to manage listings and post ads"
              >
                <Building2 className="w-4 h-4 text-blue-600" />
                <span className="hidden xl:inline">Agent Panel</span>
              </button>
            ) : null}

            {/* Authentication / Role Status & Trigger */}
            {currentUser ? (
              <button
                onClick={onOpenAuthRoleModal}
                className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors text-xs"
                title={`Signed in as ${currentUser.name} (${currentUser.role}). Click to switch or manage session.`}
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-full object-cover border border-emerald-500"
                />
                <span className="hidden md:inline font-semibold text-emerald-900 truncate max-w-[100px]">
                  {currentUser.role === 'admin' ? 'Super Admin' : (currentUser.companyName?.split(' ')[0] || currentUser.name.split(' ')[0])}
                </span>
              </button>
            ) : (
              <button
                onClick={() => onOpenLoginModal('general')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
                title="Sign in to access agency and administrative features"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold text-left flex items-center gap-2.5 ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            {currentUser ? (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthRoleModal();
                  }}
                  className="text-xs font-semibold text-emerald-700 py-1 flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{currentUser.role === 'admin' ? 'Super Admin' : currentUser.name}</span>
                </button>
                {currentUser.role === 'admin' ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleAdminClick();
                    }}
                    className="text-xs font-bold text-amber-600 py-1 flex items-center gap-1"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Admin Console</span>
                  </button>
                ) : currentUser.role === 'agency' ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="text-xs font-bold text-blue-600 py-1 flex items-center gap-1"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Agent Panel</span>
                  </button>
                ) : null}
              </>
            ) : (
              <div className="w-full">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLoginModal('general');
                  }}
                  className="w-full text-xs font-bold text-blue-600 py-1 flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Sign In / Agent Portal</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

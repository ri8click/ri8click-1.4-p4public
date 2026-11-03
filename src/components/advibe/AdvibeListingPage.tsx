import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  Compass, 
  CheckCircle2, 
  SlidersHorizontal,
  Flame,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Layers,
  ExternalLink,
  Play,
  RotateCw
} from 'lucide-react';
import { AdVibeProject, AdVibeProjectType } from '../../types';
import Advibe3DVirtualTour from './Advibe3DVirtualTour';
import AdvibeTourModal from './AdvibeTourModal';

interface AdvibeListingPageProps {
  projects: AdVibeProject[];
  onOpenProject: (slug: string) => void;
  onOpenCreateProject?: () => void;
  canManageAdvibe?: boolean;
}

export const AdvibeListingPage: React.FC<AdvibeListingPageProps> = ({
  projects,
  onOpenProject,
  onOpenCreateProject,
  canManageAdvibe = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [tourModalProject, setTourModalProject] = useState<AdVibeProject | null>(null);
  const [featuredTourProjectId, setFeaturedTourProjectId] = useState<string>(projects[0]?.id || '');

  const projectTypes = ['All', 'Housing Society', 'High-Rise Tower', 'Mixed-Use Megaproject', 'Commercial Development', 'Smart Villa Community'];
  const cities = ['All', 'Taxila', 'Islamabad', 'Rawalpindi', 'Lahore', 'Rawat'];

  const filteredProjects = projects.filter(p => {
    if (!p.published) return false;
    if (selectedType !== 'All' && p.type !== selectedType) return false;
    if (selectedCity !== 'All' && !p.city.toLowerCase().includes(selectedCity.toLowerCase())) return false;
    if (selectedStatus !== 'All' && p.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchArea = p.area.toLowerCase().includes(q);
      const matchDev = p.developer.name.toLowerCase().includes(q);
      const matchTag = p.tagline.toLowerCase().includes(q);
      return matchTitle || matchArea || matchDev || matchTag;
    }
    return true;
  });

  const featuredTourProject = projects.find(p => p.id === featuredTourProjectId) || projects[0];

  const featuredProjects = projects.filter(p => p.featured && p.published);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Header & Intro Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/40 p-8 sm:p-12 shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AdVibe Premium PropTech Showcase</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Iconic Master-Planned Societies & High-Rise Developments
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
              Experience Pakistan's most prestigious real estate mega-projects through full-screen 100vh scrollytelling, interactive GIS master plans, and live unit inventories.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>100% Certified Legal Titles</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>RDA / TMA Approved Schematics</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-blue-400 font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>Guaranteed Commercial ROIs</span>
              </div>
            </div>
          </div>

          {/* Abstract Backdrop Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* FEATURED 3D VIRTUAL TOUR SHOWCASE (Auto-Run Enabled By Default) */}
        {featuredTourProject && (
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 sm:p-7 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-current" />
                    <span>Live 3D Virtual Tour</span>
                  </span>
                  <span className="text-[11px] font-bold text-blue-400 flex items-center gap-1 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    <RotateCw className="w-3 h-3 animate-spin" />
                    <span>Auto-Run Active</span>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {featuredTourProject.title}
                </h2>
                <p className="text-xs text-slate-400">
                  Auto-running 360° architectural walkthrough. Drag anytime to explore or select another showcase project below.
                </p>
              </div>

              {/* Project Switcher Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto self-start sm:self-center">
                {projects.slice(0, 3).map(p => (
                  <button
                    key={p.id}
                    onClick={() => setFeaturedTourProjectId(p.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      featuredTourProjectId === p.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {p.title.split(' ')[0]} {p.title.split(' ')[1] || ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Embedded 3D Tour with Auto-Run By Default */}
            <div className="w-full">
              <Advibe3DVirtualTour
                project={featuredTourProject}
                embedded={true}
                className="w-full h-[480px] sm:h-[560px] shadow-2xl rounded-2xl"
              />
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl space-y-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search megaprojects, developers, areas..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            {/* City & Type Dropdowns */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-blue-500"
              >
                {cities.map(c => (
                  <option key={c} value={c}>{c === 'All' ? 'All Cities' : c}</option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value="Booking Open">Booking Open</option>
                <option value="Under Construction">Under Construction</option>
                <option value="Ready to Move">Ready to Move</option>
              </select>

              {canManageAdvibe && onOpenCreateProject && (
                <button
                  onClick={onOpenCreateProject}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors ml-auto shadow-md"
                >
                  + Add Project
                </button>
              )}
            </div>

          </div>

          {/* Type Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1">
            {projectTypes.map(t => {
              const count = t === 'All' 
                ? projects.filter(p => p.published).length 
                : projects.filter(p => p.published && p.type === t).length;
              return (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedType === t
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <span>{t === 'All' ? 'All Categories' : t}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    selectedType === t ? 'bg-blue-800/80 text-blue-100' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing <strong className="text-white">{filteredProjects.length}</strong> premium showcase developments</span>
            <span>Sorted by Featured Priority</span>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center bg-slate-900/40 rounded-3xl border border-slate-800 text-slate-400 text-xs">
              No projects matched your search criteria. Try adjusting your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => onOpenProject(project.slug)}
                  className="group rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
                >
                  {/* Top Cover Media Container */}
                  <div className="relative h-64 w-full overflow-hidden bg-slate-950">
                    <img
                      src={project.seo.ogImage || project.gallery[0]?.url || project.logo}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-900/90 text-white border border-slate-700 backdrop-blur-xs">
                        {project.type}
                      </span>
                      {project.featured && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-amber-500 text-slate-950 font-mono flex items-center gap-1 shadow-md">
                          <Flame className="w-3 h-3 fill-current" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3.5 right-3.5">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 backdrop-blur-xs">
                        {project.status}
                      </span>
                    </div>

                    {/* Bottom Price Floating Bar */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs">
                      <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700">
                        <span className="text-[9.5px] text-slate-400 uppercase block font-bold">Starts From:</span>
                        <span className="text-sm font-black text-amber-400 font-mono">
                          {project.starting_price_formatted}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-300 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-blue-400" />
                        <span>{project.city}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={project.logo}
                          alt={project.title}
                          className="w-6 h-6 rounded-md object-cover border border-slate-700"
                        />
                        <span className="text-xs font-semibold text-slate-400 truncate">
                          {project.developer.name}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                        {project.title}
                      </h3>

                      <p className="text-xs text-slate-300 line-clamp-2 mt-1.5 leading-relaxed font-light">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Quick Specs Snippet */}
                    <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 text-[11px] text-center">
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase font-bold">Units</span>
                        <span className="font-bold text-white">{project.linkedPropertyIds.length || 10}+</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase font-bold">Sections</span>
                        <span className="font-bold text-white">{project.sections.length}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase font-bold">Delivery</span>
                        <span className="font-bold text-emerald-400">2026-28</span>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenProject(project.slug);
                          }}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md"
                        >
                          <span>Launch Scrollytelling</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setTourModalProject(project);
                          }}
                          className="py-2.5 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-bold text-xs border border-amber-400/40 transition-all flex items-center gap-1.5 shadow-md"
                          title="Launch 3D Virtual Tour (Auto-Run)"
                        >
                          <RotateCw className="w-3.5 h-3.5 animate-spin" />
                          <span>3D Tour</span>
                        </button>

                        <a
                          href={`https://wa.me/${project.dealerWhatsApp || '923365666727'}?text=${encodeURIComponent(`Salam! I am inquiring about ${project.title}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="p-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-600/40 transition-colors"
                          title="Chat on WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* 3D Virtual Tour Modal with Auto-Run By Default */}
      {tourModalProject && (
        <AdvibeTourModal
          project={tourModalProject}
          isOpen={!!tourModalProject}
          onClose={() => setTourModalProject(null)}
          onOpenScrollytelling={onOpenProject}
        />
      )}
    </div>
  );
};

export default AdvibeListingPage;

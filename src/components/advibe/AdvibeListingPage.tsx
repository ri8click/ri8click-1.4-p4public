import React, { useState, useEffect } from 'react';
import {
  Building2,
  Search,
  MapPin,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Plus,
  Compass,
  Video,
  Image as ImageIcon,
  Sparkles,
  Layers
} from 'lucide-react';
import { AdVibeProject } from '../../types';
import Advibe3DVirtualTour from './Advibe3DVirtualTour';
import AdvibeTourModal from './AdvibeTourModal';

interface AdvibeListingPageProps {
  projects: AdVibeProject[];
  onOpenProject: (slug: string) => void;
  onOpenCreateProject?: () => void;
  canManageAdvibe?: boolean;
}

const DEFAULT_FALLBACK_VIDEO =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

function getVideoEmbedOrSource(url: string): {
  kind: 'youtube' | 'vimeo' | 'native';
  src: string;
} {
  const trimmed = (url || '').trim() || DEFAULT_FALLBACK_VIDEO;
  const ytMatch = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    return {
      kind: 'youtube',
      src: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`
    };
  }
  const vimeoMatch = trimmed.match(
    /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/
  );
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      kind: 'vimeo',
      src: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`
    };
  }
  return { kind: 'native', src: trimmed };
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
  const [tourModalProject, setTourModalProject] = useState<AdVibeProject | null>(
    null
  );
  const [featuredTourProjectId, setFeaturedTourProjectId] = useState<string>(
    () => {
      const firstFeatured = projects.find(p => p.featured) || projects[0];
      return firstFeatured?.id || '';
    }
  );
  const [showBannerVideo, setShowBannerVideo] = useState<boolean>(false);
  const [videoPlaybackError, setVideoPlaybackError] = useState<boolean>(false);

  // Keep featuredTourProjectId synced when projects are added or updated in Admin Hub
  useEffect(() => {
    if (!projects.some(p => p.id === featuredTourProjectId)) {
      const next = projects.find(p => p.featured) || projects[0];
      if (next) setFeaturedTourProjectId(next.id);
    }
  }, [projects, featuredTourProjectId]);

  const projectTypes = [
    'All',
    'Housing Society',
    'Commercial Mall & Tower',
    'High-Rise Tower',
    'Mixed-Use Megaproject',
    'Modular Smart Community'
  ];
  const cities = ['All', 'Taxila', 'Islamabad', 'Rawalpindi', 'Lahore'];

  const filteredProjects = projects.filter(p => {
    if (!p.published) return false;
    if (selectedType !== 'All' && p.type !== selectedType) return false;
    if (
      selectedCity !== 'All' &&
      !p.city.toLowerCase().includes(selectedCity.toLowerCase())
    )
      return false;
    if (selectedStatus !== 'All' && p.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchArea = (p.area || '').toLowerCase().includes(q);
      const matchDev = (p.developer?.name || '').toLowerCase().includes(q);
      const matchTag = (p.tagline || '').toLowerCase().includes(q);
      return matchTitle || matchArea || matchDev || matchTag;
    }
    return true;
  });

  const featuredTourProject =
    projects.find(p => p.id === featuredTourProjectId) ||
    projects.find(p => p.featured) ||
    projects[0];

  const heroSectionOverride = featuredTourProject?.sections?.find(
    s => s.type === 'hero'
  );

  // Strictly prioritize bannerImage and mainImage uploaded in Admin Hub
  const mainBannerImage =
    featuredTourProject?.bannerImage ||
    featuredTourProject?.mainImage ||
    heroSectionOverride?.customSettings?.bgImageUrl ||
    featuredTourProject?.seo?.ogImage ||
    featuredTourProject?.gallery?.[0]?.url ||
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85';

  const rawBannerVideo =
    featuredTourProject?.heroVideoUrl ||
    featuredTourProject?.videos?.[0]?.url ||
    (featuredTourProject?.virtualTour?.provider === 'video'
      ? featuredTourProject?.virtualTour?.url
      : '') ||
    DEFAULT_FALLBACK_VIDEO;

  const resolvedVideo = getVideoEmbedOrSource(
    videoPlaybackError ? DEFAULT_FALLBACK_VIDEO : rawBannerVideo
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* MAIN ADVIBE HERO BANNER (Professional Advertisement Manager & Designer Stage) */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-lg grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold uppercase tracking-wider border border-blue-200">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>
                    {heroSectionOverride?.badge ||
                      'AdVibe Executive Megaproject Showcase'}
                  </span>
                </div>
                {featuredTourProject?.status && (
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    {featuredTourProject.status}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {featuredTourProject
                  ? featuredTourProject.title
                  : 'Master-Planned Societies & High-Rise Developments'}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                {featuredTourProject?.tagline ||
                  "Explore Pakistan's premier real estate developments with full-screen walkthroughs, master plans, live unit inventory, and verified pricing."}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Verified Legal Titles</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-blue-700 font-bold">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>RDA / CDA / LDA Approved</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-amber-700 font-bold">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                  <span>Flexible Installment Plans</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {featuredTourProject && (
                <button
                  type="button"
                  onClick={() => onOpenProject(featuredTourProject.slug)}
                  className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold flex items-center gap-2 shadow-sm cursor-pointer transition-all"
                >
                  <span>Open Full Project Showcase</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setVideoPlaybackError(false);
                  setShowBannerVideo(prev => !prev);
                }}
                className={`px-4 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 border cursor-pointer transition-all ${
                  showBannerVideo
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                    : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900'
                }`}
              >
                {showBannerVideo ? (
                  <>
                    <ImageIcon className="w-4 h-4" />
                    <span>Show Banner Image</span>
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4 text-amber-400" />
                    <span>Watch Banner Video</span>
                  </>
                )}
              </button>

              {canManageAdvibe && onOpenCreateProject && (
                <button
                  type="button"
                  onClick={onOpenCreateProject}
                  className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>AdVibe Studio &amp; Designer</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Media Column: Displays Main AdVibe Banner Image or Functional Video Player */}
          <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[390px] bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-200 overflow-hidden flex items-center justify-center">
            {showBannerVideo ? (
              resolvedVideo.kind === 'youtube' ||
              resolvedVideo.kind === 'vimeo' ? (
                <iframe
                  key={resolvedVideo.src}
                  src={resolvedVideo.src}
                  title={
                    featuredTourProject?.heroVideoTitle ||
                    featuredTourProject?.title ||
                    'Project Video'
                  }
                  className="w-full h-full min-h-[320px] sm:min-h-[390px] border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  key={resolvedVideo.src}
                  src={resolvedVideo.src}
                  poster={mainBannerImage}
                  controls
                  autoPlay
                  playsInline
                  onError={() => setVideoPlaybackError(true)}
                  className="w-full h-full max-h-[440px] object-contain bg-black"
                />
              )
            ) : (
              <img
                key={mainBannerImage}
                src={mainBannerImage}
                alt={featuredTourProject?.title || 'AdVibe Banner'}
                className="w-full h-full object-cover"
              />
            )}

            {!showBannerVideo && (
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-200 shadow-sm">
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">
                    Featured Campaign • {featuredTourProject?.type}
                  </span>
                  <span className="text-xs font-extrabold text-slate-900 truncate block">
                    {featuredTourProject?.title}
                  </span>
                </div>
                <span className="text-xs font-black text-blue-600 shrink-0">
                  {featuredTourProject?.starting_price_formatted}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Project Switcher & Interactive 360° Walkthrough Section */}
        {featuredTourProject && (
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-bold text-[10px] uppercase tracking-wider">
                    Interactive 360° Digital Walkthrough
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold">
                    ({featuredTourProject.virtualTour?.scenes?.length || 2} Panoramic Scenes)
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {featuredTourProject.title} — 360° Panoramic View
                </h2>
                <p className="text-xs text-slate-500">
                  Drag to look around or select any society/highrise project below to switch the active campaign banner and 360° tour.
                </p>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto self-start sm:self-center pb-1">
                {projects
                  .filter(p => p.published)
                  .map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setFeaturedTourProjectId(p.id);
                        setShowBannerVideo(false);
                        setVideoPlaybackError(false);
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                        featuredTourProject.id === p.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {p.title.split('—')[0].trim()}
                    </button>
                  ))}
              </div>
            </div>

            <div className="w-full">
              <Advibe3DVirtualTour
                project={featuredTourProject}
                embedded={true}
                className="w-full h-[420px] sm:h-[520px] rounded-2xl border border-slate-200"
              />
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search societies, highrises, developers, cities..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs text-slate-800 font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-600"
              >
                {cities.map(c => (
                  <option key={c} value={c}>
                    {c === 'All' ? 'All Cities' : c}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs text-slate-800 font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-600"
              >
                <option value="All">All Statuses</option>
                <option value="Booking Open">Booking Open</option>
                <option value="Under Construction">Under Construction</option>
                <option value="Ready for Possession">Ready for Possession</option>
                <option value="Ready to Move">Ready to Move</option>
              </select>

              {canManageAdvibe && onOpenCreateProject && (
                <button
                  type="button"
                  onClick={onOpenCreateProject}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors ml-auto shadow-xs cursor-pointer"
                >
                  + Manage / Design AdVibe
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 no-scrollbar">
            {projectTypes.map(t => {
              const count =
                t === 'All'
                  ? projects.filter(p => p.published).length
                  : projects.filter(p => p.published && p.type === t).length;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedType(t)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer border ${
                    selectedType === t
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{t === 'All' ? 'All Categories' : t}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedType === t
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing{' '}
              <strong className="text-slate-900">
                {filteredProjects.length}
              </strong>{' '}
              verified showcase developments
            </span>
            <span>Click any card to open full interactive showcase</span>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs">
              No projects matched your search criteria. Try clearing your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => {
                const coverImage =
                  project.mainImage ||
                  project.bannerImage ||
                  project.seo?.ogImage ||
                  project.gallery?.[0]?.url ||
                  project.logo;

                return (
                  <div
                    key={project.id}
                    onClick={() => onOpenProject(project.slug)}
                    className="group rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  >
                    {/* Main Listing Image Container */}
                    <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                      <img
                        src={coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white/95 text-slate-900 shadow-xs"
                        >
                          {project.type}
                        </span>
                        {project.featured && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 shadow-xs">
                            Featured
                          </span>
                        )}
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-emerald-600 text-white shadow-xs">
                          {project.status}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                        <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xs">
                          <span className="text-[9.5px] text-slate-500 uppercase block font-bold">
                            Starts From
                          </span>
                          <span className="text-sm font-black text-blue-700">
                            {project.starting_price_formatted}
                          </span>
                        </div>

                        <div className="text-[11px] font-bold text-slate-800 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl flex items-center gap-1 shadow-xs">
                          <MapPin className="w-3 h-3 text-rose-500" />
                          <span>{project.city}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <img
                            src={project.logo || coverImage}
                            alt={project.title}
                            className="w-6 h-6 rounded-md object-cover border border-slate-200"
                          />
                          <span className="text-xs font-bold text-slate-500 truncate">
                            {project.developer?.name}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {project.title}
                        </h3>

                        <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                          {project.tagline}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-center">
                        <div>
                          <span className="text-[9px] text-slate-400 block uppercase font-bold">
                            Area / Size
                          </span>
                          <span className="font-bold text-slate-800">
                            {project.areaSize
                              ? `${project.areaSize} ${project.areaUnit || ''}`
                              : 'Master Plan'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 block uppercase font-bold">
                            Gallery
                          </span>
                          <span className="font-bold text-slate-800">
                            {project.gallery?.length || 1} Photos
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 block uppercase font-bold">
                            360° / Video
                          </span>
                          <span className="font-bold text-emerald-700">
                            {project.virtualTour?.scenes?.length || 2} Scenes
                          </span>
                        </div>
                      </div>

                      <div className="pt-1 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            onOpenProject(project.slug);
                          }}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Open Full Showcase</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            setTourModalProject(project);
                          }}
                          className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
                          title="Open 360° Tour"
                        >
                          <Compass className="w-3.5 h-3.5 text-blue-600" />
                          <span>360°</span>
                        </button>

                        <a
                          href={`https://wa.me/${(
                            project.dealerWhatsApp || '923365666727'
                          ).replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Assalam-o-Alaikum! I am inquiring about ${project.title} on ri8click.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 transition-colors"
                          title="Chat on WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

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

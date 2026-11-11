import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Play,
  Video,
  Compass,
  Building2,
  Sparkles,
  Phone,
  MessageSquare,
  Download,
  Edit3,
  Layers,
  Image as ImageIcon,
  DollarSign,
  Award,
  Calendar,
  ExternalLink,
  X
} from 'lucide-react';
import { AdVibeProject, Property } from '../../types';
import { Advibe3DVirtualTour } from './Advibe3DVirtualTour';
import { AdvibeInteractiveMasterPlan } from './AdvibeInteractiveMasterPlan';
import { AdvibeLocationRadar } from './AdvibeLocationRadar';
import { AdvibeGalleryLightbox } from './AdvibeGalleryLightbox';
import { AdvibeVideoPlayerModal } from './AdvibeVideoPlayerModal';
import { AdvibeLinkedUnits } from './AdvibeLinkedUnits';
import { AdvibeEnquirySection } from './AdvibeEnquirySection';

interface AdvibeProjectScrollyPageProps {
  project: AdVibeProject;
  properties: Property[];
  onBackToListing: () => void;
  onSelectProperty: (property: Property) => void;
  canEditProject?: boolean;
  onEditProjectInAdmin?: () => void;
}

const DEFAULT_FALLBACK_WALKTHROUGH_VIDEO =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

function resolveEmbedOrNativeVideo(url: string): {
  kind: 'youtube' | 'vimeo' | 'native';
  src: string;
} {
  const trimmed = (url || '').trim() || DEFAULT_FALLBACK_WALKTHROUGH_VIDEO;
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

export const AdvibeProjectScrollyPage: React.FC<
  AdvibeProjectScrollyPageProps
> = ({
  project,
  properties,
  onBackToListing,
  onSelectProperty,
  canEditProject = false,
  onEditProjectInAdmin
}) => {
  const [isPlayingHeroVideo, setIsPlayingHeroVideo] = useState(false);
  const [heroVideoError, setHeroVideoError] = useState(false);
  const [isWalkthroughModalOpen, setIsWalkthroughModalOpen] = useState(false);

  const enabledSections = useMemo(() => {
    const raw = Array.isArray(project.sections) ? project.sections : [];
    return [...raw]
      .filter(s => s && s.isEnabled !== false)
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  }, [project.sections]);

  const heroSec = useMemo(
    () => enabledSections.find(s => s.type === 'hero'),
    [enabledSections]
  );

  // Strictly prioritize bannerImage and mainImage edited in Admin Hub -> AdVibe
  const heroBannerImage =
    project.bannerImage ||
    project.mainImage ||
    heroSec?.customSettings?.bgImageUrl ||
    project.seo?.ogImage ||
    project.gallery?.[0]?.url ||
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=85';

  const heroWalkthroughVideoUrl =
    project.heroVideoUrl ||
    heroSec?.customSettings?.bgVideoUrl ||
    project.videos?.[0]?.url ||
    (project.virtualTour?.provider === 'video' ? project.virtualTour.url : '') ||
    DEFAULT_FALLBACK_WALKTHROUGH_VIDEO;

  const resolvedHeroVideo = resolveEmbedOrNativeVideo(
    heroVideoError ? DEFAULT_FALLBACK_WALKTHROUGH_VIDEO : heroWalkthroughVideoUrl
  );

  const hasVirtualTourSectionEnabled = enabledSections.some(
    s => s.type === 'virtual_tour'
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cleanWhatsApp = (project.dealerWhatsApp || '923365666727').replace(
    /[^0-9]/g,
    ''
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Sticky Top Project Navigation Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onBackToListing}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All AdVibe Projects</span>
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-black text-slate-900 truncate">
                  {project.title}
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
                  {project.type}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 truncate">
                {project.area}, {project.city} • Starts{' '}
                <strong className="text-blue-600">
                  {project.starting_price_formatted}
                </strong>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => scrollToSection('advibe-360-virtual-tour')}
              className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shrink-0 shadow-2xs"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>360° Virtual Tour</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setHeroVideoError(false);
                setIsWalkthroughModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Play Walkthrough Video</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('advibe-enquiry-desk')}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Site Visit</span>
            </button>

            {canEditProject && onEditProjectInAdmin && (
              <button
                type="button"
                onClick={onEditProjectInAdmin}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Edit Showcase in Admin Hub</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MAIN PROJECT SHOWCASE HERO BANNER (Editable from Admin Hub -> AdVibe) */}
      <section className="relative bg-slate-950 text-white overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Campaign Copy */}
          <div className="lg:col-span-6 space-y-5 z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {heroSec?.badge || `${project.type} Official Showcase`}
                </span>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold">
                {project.status}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              {heroSec?.title || project.title}
            </h1>

            <p className="text-sm sm:text-base text-amber-300 font-semibold">
              {heroSec?.subtitle || project.tagline}
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.description}
            </p>

            {project.features && project.features.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {project.features.slice(0, 4).map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-slate-200 bg-white/5 border border-white/10 px-3 py-2 rounded-xl"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/5 border border-white/15">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Starting From
                </span>
                <span className="text-base sm:text-lg font-black text-amber-400">
                  {project.starting_price_formatted}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Location
                </span>
                <span className="text-xs sm:text-sm font-bold text-white truncate block">
                  {project.city}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Developer
                </span>
                <span className="text-xs sm:text-sm font-bold text-emerald-300 truncate block">
                  {project.developer?.name}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  setHeroVideoError(false);
                  setIsPlayingHeroVideo(prev => !prev);
                }}
                className={`px-5 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 cursor-pointer transition-all shadow-lg ${
                  isPlayingHeroVideo
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                {isPlayingHeroVideo ? (
                  <>
                    <ImageIcon className="w-4 h-4" />
                    <span>Show Banner Image</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Play Walkthrough Video</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('advibe-360-virtual-tour')}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-extrabold flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Explore 360° Virtual Tour</span>
              </button>

              <a
                href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
                  `Assalam-o-Alaikum! I am viewing the full showcase of "${project.title}" on ri8click and would like complete booking & payment details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>

          {/* Right Media Stage: Editable Main Banner Image or Inline Walkthrough Video */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border-2 border-white/15 bg-black shadow-2xl min-h-[320px] sm:min-h-[420px] flex items-center justify-center">
            {isPlayingHeroVideo ? (
              resolvedHeroVideo.kind === 'youtube' ||
              resolvedHeroVideo.kind === 'vimeo' ? (
                <iframe
                  key={resolvedHeroVideo.src}
                  src={resolvedHeroVideo.src}
                  title={project.heroVideoTitle || project.title}
                  className="w-full h-[360px] sm:h-[420px] border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  key={resolvedHeroVideo.src}
                  src={resolvedHeroVideo.src}
                  poster={heroBannerImage}
                  controls
                  autoPlay
                  playsInline
                  onError={() => setHeroVideoError(true)}
                  className="w-full h-full max-h-[440px] object-contain bg-black"
                />
              )
            ) : (
              <>
                <img
                  key={heroBannerImage}
                  src={heroBannerImage}
                  alt={project.title}
                  className="w-full h-[360px] sm:h-[440px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <button
                  type="button"
                  onClick={() => {
                    setHeroVideoError(false);
                    setIsPlayingHeroVideo(true);
                  }}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-blue-600/90 hover:bg-blue-500 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer"
                  title="Play Project Walkthrough Video"
                >
                  <Play className="w-7 h-7 fill-white ml-0.5" />
                </button>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 bg-slate-950/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <Video className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-bold text-white truncate">
                      {project.heroVideoTitle ||
                        `${project.title} — Official Walkthrough`}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setHeroVideoError(false);
                      setIsPlayingHeroVideo(true);
                    }}
                    className="text-amber-400 hover:text-amber-300 font-extrabold shrink-0 cursor-pointer"
                  >
                    Watch Now →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* DYNAMICALLY MANAGED PAGE SECTIONS (Editable via Admin Hub -> AdVibe -> Page Sections CRUD) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Always guarantee 360° Virtual Tour is visible when visiting Open Full Project Showcase */}
        {!hasVirtualTourSectionEnabled && (
          <section
            id="advibe-360-virtual-tour"
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-extrabold uppercase tracking-wider mb-2">
                  <Compass className="w-3.5 h-3.5 text-amber-600" />
                  <span>Immersive 360° Digital Twin</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {project.virtualTour?.title ||
                    `${project.title} — Interactive 360° Virtual Tour`}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Drag to explore 360° panoramic angles, toggle Day/Night illumination, or click interactive hotspots.
                </p>
              </div>
            </div>
            <Advibe3DVirtualTour
              project={project}
              embedded={true}
              className="w-full h-[480px] sm:h-[560px]"
            />
          </section>
        )}

        {enabledSections.map(section => {
          if (section.type === 'hero') return null;

          switch (section.type) {
            case 'intro':
            case 'story': {
              const paragraphs: string[] = Array.isArray(
                section.content?.paragraphs
              )
                ? section.content.paragraphs
                : [project.description];
              const quote: string =
                section.content?.quote || project.tagline || '';

              return (
                <section
                  key={section.id}
                  id={`sec-${section.id}`}
                  className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6"
                >
                  <div className="max-w-3xl space-y-2">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-extrabold uppercase tracking-wider">
                      {section.badge || 'EXECUTIVE MANIFESTO'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                      {section.title}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">
                      {section.subtitle}
                    </p>
                  </div>

                  {quote && (
                    <blockquote className="p-5 rounded-2xl bg-slate-900 text-amber-300 font-serif italic text-sm sm:text-base border-l-4 border-amber-400">
                      “{quote}”
                    </blockquote>
                  )}

                  <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </section>
              );
            }

            case 'highlights': {
              return (
                <section
                  key={section.id}
                  id={`sec-${section.id}`}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-extrabold uppercase tracking-wider">
                      {section.badge || 'KEY HIGHLIGHTS'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 pt-1">
                      {section.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {section.subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {(project.highlights || []).map(hl => (
                      <div
                        key={hl.id}
                        className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        {hl.image && (
                          <div className="h-40 w-full bg-slate-900 overflow-hidden">
                            <img
                              src={hl.image}
                              alt={hl.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-5 space-y-2 flex-1">
                          <span className="text-[11px] font-extrabold uppercase text-blue-600 block">
                            {hl.value}
                          </span>
                          <h3 className="text-base font-extrabold text-slate-900">
                            {hl.title}
                          </h3>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {hl.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            case 'stats': {
              const statsItems = Array.isArray(section.content)
                ? section.content
                : [
                    {
                      label: 'Starting Price',
                      value: project.starting_price_formatted,
                      sub: 'Verified Developer Rate'
                    },
                    {
                      label: 'Project Status',
                      value: project.status,
                      sub: '100% NOC Verified'
                    },
                    {
                      label: 'Location Corridor',
                      value: project.city,
                      sub: project.area
                    }
                  ];

              return (
                <section
                  key={section.id}
                  id={`sec-${section.id}`}
                  className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl"
                >
                  <div className="space-y-1">
                    <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-extrabold uppercase tracking-wider">
                      {section.badge || 'BY THE NUMBERS'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black pt-1">
                      {section.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300">
                      {section.subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {statsItems.map((st: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1"
                      >
                        <div className="text-2xl sm:text-3xl font-black text-amber-400">
                          {st.value}
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-white">
                          {st.label}
                        </div>
                        {st.sub && (
                          <div className="text-[11px] text-slate-400">
                            {st.sub}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            case 'salient': {
              const salientItems = Array.isArray(section.content)
                ? section.content
                : (project.features || []).map(f => ({
                    title: f,
                    desc: 'Verified engineering specification and municipal compliance.'
                  }));

              return (
                <section
                  key={section.id}
                  id={`sec-${section.id}`}
                  className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6"
                >
                  <div className="space-y-1">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-extrabold uppercase tracking-wider">
                      {section.badge || 'ENGINEERING FEATURES'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 pt-1">
                      {section.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {section.subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {salientItems.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5"
                      >
                        <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>{item.title}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed pl-6">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            case 'virtual_tour': {
              return (
                <section
                  key={section.id}
                  id="advibe-360-virtual-tour"
                  className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-extrabold uppercase tracking-wider">
                        {section.badge || '360° INTERACTIVE VIRTUAL TOUR'}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 pt-2">
                        {section.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        {section.subtitle}
                      </p>
                    </div>
                  </div>
                  <Advibe3DVirtualTour
                    project={project}
                    embedded={true}
                    className="w-full h-[480px] sm:h-[560px]"
                  />
                </section>
              );
            }

            case 'master_plan':
            case 'masterplan': {
              return (
                <section
                  key={section.id}
                  id={`sec-${section.id}`}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-extrabold uppercase tracking-wider">
                      {section.badge || 'INTERACTIVE MASTER PLAN'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 pt-1">
                      {section.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {section.subtitle}
                    </p>
                  </div>

                  <AdvibeInteractiveMasterPlan
                    masterPlan={project.masterPlan}
                    projectTitle={project.title}
                    properties={properties}
                    onSelectProperty={onSelectProperty}
                  />
                </section>
              );
            }

            case 'location': {
              return (
                <section
                  key={section.id}
                  id={`sec-${section.id}`}
                  className="space-y-5"
                >
                  <AdvibeLocationRadar
                    locationPoints={project.locationPoints || []}
                    coordinates={
                      project.coordinates || { lat: 33.7295, lng: 72.8286 }
                    }
                    city={project.city}
                    area={project.area}
                    address={project.address}
                    projectTitle={project.title}
                  />
                </section>
              );
            }

            case 'amenities': {
              return (
                <section
                  key={section.id}
                  id={`sec-${section.id}`}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-extrabold uppercase tracking-wider">
                      {section.badge || 'LIFESTYLE AMENITIES'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 pt-1">
                      {section.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {section.subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {(project.amenities || []).map(am => (
                      <div
                        key={am.id}
                        className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
                      >
                        {am.image && (
                          <div className="h-44 w-full bg-slate-900 overflow-hidden">
                            <img
                              src={am.image}
                              alt={am.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-5 space-y-2 flex-1">
                          <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 inline-block">
                            {am.category}
                          </span>
                          <h3 className="text-base font-extrabold text-slate-900">
                            {am.name}
                          </h3>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {am.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            case 'gallery': {
              return (
                <section
                  key={section.id}
                  id={`sec-${section.id}`}
                  className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6"
                >
                  <div className="space-y-1">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-extrabold uppercase tracking-wider">
                      {section.badge || 'VISUAL GALLERY'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black pt-1">
                      {section.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300">
                      {section.subtitle}
                    </p>
                  </div>

                  <AdvibeGalleryLightbox
                    items={project.gallery || []}
                    projectTitle={project.title}
                  />
                </section>
              );
            }

            case 'videos': {
              const videoList =
                project.videos && project.videos.length > 0
                  ? project.videos
                  : [
                      {
                        id: 'default-vid-1',
                        title:
                          project.heroVideoTitle ||
                          `${project.title} — Official Walkthrough`,
                        category: 'Project Tour',
                        type: 'hosted' as const,
                        url: heroWalkthroughVideoUrl,
                        thumbnail: heroBannerImage,
                        duration: '02:15'
                      }
                    ];

              return (
                <section
                  key={section.id}
                  id={`sec-${section.id}`}
                  className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6"
                >
                  <div className="space-y-1">
                    <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-extrabold uppercase tracking-wider">
                      {section.badge || 'WALKTHROUGH VIDEOS'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black pt-1">
                      {section.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300">
                      {section.subtitle}
                    </p>
                  </div>

                  <AdvibeVideoPlayerModal
                    videos={videoList}
                    projectTitle={project.title}
                  />
                </section>
              );
            }

            case 'units': {
              return (
                <section
                  key={section.id}
                  id={`sec-${section.id}`}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-extrabold uppercase tracking-wider">
                      {section.badge || 'LIVE LINKED INVENTORY'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 pt-1">
                      {section.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {section.subtitle}
                    </p>
                  </div>

                  <AdvibeLinkedUnits
                    linkedPropertyIds={project.linkedPropertyIds || []}
                    properties={properties}
                    onSelectProperty={onSelectProperty}
                    projectTitle={project.title}
                    projectCity={project.city}
                    projectSociety={project.society || project.title}
                  />
                </section>
              );
            }

            case 'pricing':
            case 'payment_plan': {
              return (
                <section
                  key={section.id}
                  id={`sec-${section.id}`}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-extrabold uppercase tracking-wider">
                      {section.badge || 'PAYMENT PLANS & TIERS'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 pt-1">
                      {section.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {section.subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(project.pricingTiers || []).map(tier => (
                      <div
                        key={tier.id}
                        className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-xl hover:border-blue-400 transition-all flex flex-col justify-between space-y-5"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-extrabold">
                              {tier.size}
                            </span>
                            <span className="text-[11px] font-bold text-emerald-700">
                              {tier.possession}
                            </span>
                          </div>

                          <h3 className="text-lg font-black text-slate-900">
                            {tier.unitType}
                          </h3>

                          <div className="p-3.5 rounded-2xl bg-slate-900 text-white">
                            <span className="text-[10px] uppercase text-slate-400 font-bold block">
                              Total Valuation
                            </span>
                            <span className="text-xl font-black text-amber-400">
                              {tier.totalPrice}
                            </span>
                          </div>

                          <div className="space-y-2 text-xs pt-1">
                            <div className="flex justify-between py-1.5 border-b border-slate-100">
                              <span className="text-slate-500">Down Payment:</span>
                              <span className="font-bold text-slate-900">
                                {tier.downPayment}
                              </span>
                            </div>
                            <div className="flex justify-between py-1.5 border-b border-slate-100">
                              <span className="text-slate-500">Installment Plan:</span>
                              <span className="font-bold text-blue-600">
                                {tier.monthlyInstallment}
                              </span>
                            </div>
                            {tier.quarterlyBalloon && (
                              <div className="flex justify-between py-1.5 border-b border-slate-100">
                                <span className="text-slate-500">Balloon / Semi-Annual:</span>
                                <span className="font-bold text-slate-900">
                                  {tier.quarterlyBalloon}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-1.5 pt-2">
                            {(tier.features || []).map((f, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-xs text-slate-700"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{f}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => scrollToSection('advibe-enquiry-desk')}
                          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold cursor-pointer transition-colors"
                        >
                          Request {tier.unitType} Booking
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            case 'developer': {
              return (
                <section
                  key={section.id}
                  id={`sec-${section.id}`}
                  className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-8 space-y-3">
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-extrabold uppercase tracking-wider">
                        {section.badge || 'MASTER DEVELOPER'}
                      </span>
                      <h2 className="text-2xl font-black text-slate-900">
                        {project.developer?.name || section.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {project.developer?.description || section.subtitle}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-bold text-slate-700">
                        {project.developer?.foundedYear && (
                          <span>Est. {project.developer.foundedYear}</span>
                        )}
                        {project.developer?.completedProjects && (
                          <span>
                            • {project.developer.completedProjects}+ Delivered Projects
                          </span>
                        )}
                        {project.developer?.rating && (
                          <span className="text-amber-600">
                            • ★ {project.developer.rating} / 5.0 Trust Score
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-3">
                      <img
                        src={project.developer?.logo || project.logo || heroBannerImage}
                        alt={project.developer?.name}
                        className="w-24 h-24 rounded-2xl object-cover border border-slate-200 shadow-sm"
                      />
                    </div>
                  </div>
                </section>
              );
            }

            case 'enquiry':
            case 'lead_form': {
              return (
                <section key={section.id} id="advibe-enquiry-desk">
                  <AdvibeEnquirySection project={project} />
                </section>
              );
            }

            case 'cta': {
              return (
                <section
                  key={section.id}
                  id={`sec-${section.id}`}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
                >
                  <div className="space-y-2 max-w-2xl">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                      {section.badge || 'PRIORITY ALLOCATION'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black">
                      {section.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-100">
                      {section.subtitle}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => scrollToSection('advibe-enquiry-desk')}
                      className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black cursor-pointer"
                    >
                      Reserve Priority Unit
                    </button>
                  </div>
                </section>
              );
            }

            case 'disclaimer': {
              const notes: string[] = Array.isArray(section.content?.legalNotes)
                ? section.content.legalNotes
                : [
                    'All architectural renders, prices, and payment schedules are subject to developer confirmation and municipal NOC terms.'
                  ];
              return (
                <section
                  key={section.id}
                  id={`sec-${section.id}`}
                  className="p-6 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-500 space-y-2"
                >
                  <div className="font-bold text-slate-700 uppercase tracking-wider">
                    {section.title}
                  </div>
                  {notes.map((n, i) => (
                    <p key={i}>{n}</p>
                  ))}
                </section>
              );
            }

            default:
              return (
                <section
                  key={section.id}
                  id={`sec-${section.id}`}
                  className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-3"
                >
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-extrabold uppercase">
                    {section.badge || section.type}
                  </span>
                  <h2 className="text-2xl font-black text-slate-900">
                    {section.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {section.subtitle}
                  </p>
                </section>
              );
          }
        })}
      </div>

      {/* Fullscreen Walkthrough Video Modal */}
      {isWalkthroughModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsWalkthroughModalOpen(false)}
        >
          <div
            className="w-full max-w-4xl bg-slate-900 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-5 py-3.5 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold">
                  {project.heroVideoTitle ||
                    `${project.title} — Official Walkthrough Video`}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsWalkthroughModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {resolvedHeroVideo.kind === 'youtube' ||
              resolvedHeroVideo.kind === 'vimeo' ? (
                <iframe
                  src={resolvedHeroVideo.src}
                  title={project.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  key={resolvedHeroVideo.src}
                  src={resolvedHeroVideo.src}
                  poster={heroBannerImage}
                  controls
                  autoPlay
                  playsInline
                  onError={() => setHeroVideoError(true)}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvibeProjectScrollyPage;

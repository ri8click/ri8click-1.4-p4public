import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowLeft, 
  Share2, 
  Phone, 
  MessageSquare, 
  Download, 
  MapPin, 
  CheckCircle2, 
  Compass, 
  Layers, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Volume2,
  VolumeX,
  Eye,
  Calendar,
  Building,
  ShieldCheck,
  Award,
  Clock,
  TrendingUp,
  Copy,
  ExternalLink,
  Play
} from 'lucide-react';
import { AdVibeProject, Property } from '../../types';
import AdvibeInteractiveMasterPlan from './AdvibeInteractiveMasterPlan';
import AdvibeLocationRadar from './AdvibeLocationRadar';
import AdvibeGalleryLightbox from './AdvibeGalleryLightbox';
import AdvibeVideoPlayerModal from './AdvibeVideoPlayerModal';
import AdvibeLinkedUnits from './AdvibeLinkedUnits';
import AdvibeEnquirySection from './AdvibeEnquirySection';
import Advibe3DVirtualTour from './Advibe3DVirtualTour';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AdvibeProjectScrollyPageProps {
  project: AdVibeProject;
  properties?: Property[];
  onBackToListing: () => void;
  onSelectProperty?: (property: Property) => void;
}

export const AdvibeProjectScrollyPage: React.FC<AdvibeProjectScrollyPageProps> = ({
  project,
  properties = [],
  onBackToListing,
  onSelectProperty
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [showShareNotification, setShowShareNotification] = useState<boolean>(false);

  // Filter enabled sections sorted by order
  const activeSections = (project.sections || [])
    .filter(sec => sec.isEnabled)
    .sort((a, b) => a.order - b.order);

  // Check system prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
    }
  }, []);

  // Set up ScrollTrigger animations
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    // Clear previous triggers
    ScrollTrigger.getAll().forEach(t => t.kill());

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(Math.max(currentProgress, 0), 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize triggers for each active section
    activeSections.forEach((section, idx) => {
      const el = document.getElementById(`advibe-sec-${section.id}`);
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveSectionIndex(idx),
        onEnterBack: () => setActiveSectionIndex(idx)
      });

      // Animate contents if not reduced motion
      if (!reducedMotion) {
        const animatedElements = el.querySelectorAll('.advibe-reveal');
        if (animatedElements.length > 0) {
          gsap.fromTo(
            animatedElements,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [activeSections, reducedMotion]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        jumpToSection(Math.min(activeSectionIndex + 1, activeSections.length - 1));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        jumpToSection(Math.max(activeSectionIndex - 1, 0));
      } else if (e.key === 'Home') {
        e.preventDefault();
        jumpToSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        jumpToSection(activeSections.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSectionIndex, activeSections]);

  const jumpToSection = (index: number) => {
    const targetSection = activeSections[index];
    if (!targetSection) return;
    const el = document.getElementById(`advibe-sec-${targetSection.id}`);
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.tagline,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setShowShareNotification(true);
      setTimeout(() => setShowShareNotification(false), 3000);
    }
  };

  // Compute theme background style
  const getThemeBackgroundClass = () => {
    switch (project.theme?.bgStyle) {
      case 'luxury_black': return 'bg-black text-slate-100';
      case 'slate': return 'bg-slate-900 text-slate-100';
      case 'light': return 'bg-slate-50 text-slate-900';
      case 'midnight':
      default:
        return 'bg-[#0b0f19] text-slate-100';
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen relative overflow-x-hidden ${getThemeBackgroundClass()}`}
      style={{
        fontFamily: project.theme?.fontBody || 'Plus Jakarta Sans, sans-serif'
      }}
    >
      {/* Top Floating Glass Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/75 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Back Button & Project Branding */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToListing}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors border border-slate-700 shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AdVibe Directory</span>
            </button>

            <div className="h-5 w-px bg-slate-700 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <img
                src={project.logo}
                alt={project.title}
                className="w-8 h-8 rounded-lg object-cover border border-slate-700 shrink-0"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate max-w-[180px] sm:max-w-xs">
                  {project.title}
                </div>
                <div className="text-[10px] text-amber-400 font-semibold truncate">
                  {project.type} • {project.city}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Actions & Tools */}
          <div className="flex items-center gap-2">
            {/* Reduced Motion Toggle */}
            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`p-2 rounded-xl text-xs font-bold border transition-colors hidden md:flex items-center gap-1.5 ${
                reducedMotion
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
              }`}
              title="Toggle Smooth Motion / Instant Scroll"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{reducedMotion ? 'Reduced Motion: ON' : 'Motion: Dynamic'}</span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors shadow-xs relative"
              title="Share Project"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Direct CTA */}
            <a
              href={`https://wa.me/${project.dealerWhatsApp || '923365666727'}?text=${encodeURIComponent(`Salam! I am viewing ${project.title} on AdVibe.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp Sales</span>
            </a>
          </div>

        </div>

        {/* Global Progress Bar at Header Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-slate-800">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-400 transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Floating Scrollytelling Section Indicator (Right Side Dots) */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-end gap-2.5">
        {activeSections.map((sec, idx) => {
          const isActive = activeSectionIndex === idx;
          return (
            <div 
              key={sec.id}
              onClick={() => jumpToSection(idx)}
              className="group flex items-center gap-2 cursor-pointer select-none"
            >
              {/* Tooltip Label */}
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md opacity-100 translate-x-0'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0'
              }`}>
                {sec.title || sec.type}
              </span>

              {/* Indicator Dot */}
              <span className={`rounded-full transition-all ${
                isActive
                  ? 'w-3.5 h-3.5 bg-blue-500 ring-4 ring-blue-500/30'
                  : 'w-2 h-2 bg-slate-600 group-hover:bg-slate-400 group-hover:scale-125'
              }`} />
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Quick CTAs Ribbon */}
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-40 flex items-center gap-2 bg-slate-950/90 backdrop-blur-md p-2 rounded-2xl border border-slate-700 shadow-2xl">
        <a
          href={`tel:${project.dealerPhone || '+923365666727'}`}
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          title="Call Direct Desk"
        >
          <Phone className="w-4 h-4" />
        </a>

        <button
          onClick={() => {
            const sec = document.getElementById('advibe-sec-sec-enquiry');
            if (sec) sec.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Site Visit</span>
        </button>

        {/* Up / Down Navigation Jumper Buttons */}
        <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
          <button
            onClick={() => jumpToSection(Math.max(activeSectionIndex - 1, 0))}
            disabled={activeSectionIndex === 0}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
            title="Previous Section"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => jumpToSection(Math.min(activeSectionIndex + 1, activeSections.length - 1))}
            disabled={activeSectionIndex === activeSections.length - 1}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
            title="Next Section"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Share Toast Notification */}
      {showShareNotification && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Copy className="w-4 h-4" />
          <span>Project link copied to clipboard!</span>
        </div>
      )}

      {/* MAIN SECTIONS CONTAINER */}
      <main className="w-full">
        {activeSections.map((section, idx) => {
          return (
            <section
              key={section.id}
              id={`advibe-sec-${section.id}`}
              className={`relative w-full min-h-screen flex flex-col justify-center py-20 px-4 sm:px-8 border-b border-slate-800/60 ${
                section.type === 'hero' ? 'min-h-screen h-screen' : ''
              }`}
            >
              {/* Render by Section Type */}
              {renderSectionContent(section, idx)}
            </section>
          );
        })}
      </main>
    </div>
  );

  // Sub-renderer for each section type
  function renderSectionContent(section: any, index: number) {
    switch (section.type) {
      // 1. HERO SECTION (100vh Full Screen Scrollytelling)
      case 'hero':
        return (
          <div className="relative w-full h-full flex flex-col justify-between py-16 px-4 sm:px-12 z-10">
            {/* Background Image / Video Canvas */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={section.customSettings?.bgImageUrl || project.seo.ogImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80'}
                alt={project.title}
                className="w-full h-full object-cover scale-105"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30"
                style={{ opacity: project.theme?.overlayOpacity || 0.65 }}
              />
            </div>

            {/* Top Badge & Status */}
            <div className="relative z-10 pt-12 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/30 border border-blue-400/40 text-blue-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{section.badge || project.type}</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 text-xs font-bold backdrop-blur-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Status: {project.status}</span>
              </div>
            </div>

            {/* Center Scrolly Hero Content */}
            <div className="relative z-10 max-w-4xl my-auto space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={project.logo}
                  alt={project.title}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white/20 shadow-2xl"
                />
                <div>
                  <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-widest">
                    {project.developer.name}
                  </h3>
                  <div className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    <span>{project.address}</span>
                  </div>
                </div>
              </div>

              <h1 
                className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight advibe-reveal"
                style={{ fontFamily: project.theme?.fontHeading || 'Playfair Display, serif' }}
              >
                {section.title || project.title}
              </h1>

              <p className="text-base sm:text-xl text-slate-200 max-w-2xl leading-relaxed advibe-reveal font-light">
                {section.subtitle || project.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4 advibe-reveal">
                <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-700">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Starting From:</span>
                  <span className="text-lg sm:text-xl font-black text-amber-400 font-mono">
                    {project.starting_price_formatted}
                  </span>
                </div>

                <button
                  onClick={() => jumpToSection(1)}
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm transition-all shadow-xl hover:shadow-blue-500/30 flex items-center gap-2"
                >
                  <span>Explore Scrollytelling Story</span>
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </button>
              </div>
            </div>

            {/* Bottom Scroll Prompt */}
            <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 border-t border-white/10 pt-4">
              <span>Scroll down or press [↓] arrow key</span>
              <span>100vh Full-Screen Immersive View</span>
            </div>
          </div>
        );

      // 2. INTRODUCTION SECTION
      case 'intro':
        return (
          <div className="max-w-5xl mx-auto w-full my-auto space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
                {section.badge || 'Executive Briefing'}
              </span>
              <h2 
                className="text-3xl sm:text-4xl font-extrabold text-white"
                style={{ fontFamily: project.theme?.fontHeading || 'Playfair Display, serif' }}
              >
                {section.title}
              </h2>
              <p className="text-sm text-slate-400 font-medium">{section.subtitle}</p>
            </div>

            {/* Manifesto Quote */}
            {section.content?.quote && (
              <blockquote className="p-6 rounded-3xl bg-blue-950/30 border-l-4 border-blue-500 text-slate-200 text-base sm:text-lg italic leading-relaxed">
                "{section.content.quote}"
              </blockquote>
            )}

            {/* Paragraphs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
              {section.content?.paragraphs ? (
                section.content.paragraphs.map((para: string, pIdx: number) => (
                  <p key={pIdx}>{para}</p>
                ))
              ) : (
                <p>{project.description}</p>
              )}
            </div>
          </div>
        );

      // 3. HIGHLIGHTS SECTION
      case 'highlights':
        return (
          <div className="max-w-6xl mx-auto w-full my-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                {section.badge || 'Signature Highlights'}
              </span>
              <h2 
                className="text-3xl sm:text-4xl font-extrabold text-white"
                style={{ fontFamily: project.theme?.fontHeading || 'Playfair Display, serif' }}
              >
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">{section.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {project.highlights.map((hl) => (
                <div
                  key={hl.id}
                  className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl hover:border-blue-500/50 transition-all group flex flex-col justify-between"
                >
                  <div>
                    {hl.image && (
                      <div className="h-32 w-full rounded-xl overflow-hidden mb-4 bg-slate-950">
                        <img
                          src={hl.image}
                          alt={hl.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="text-xs font-bold text-amber-400 font-mono mb-1">
                      {hl.value}
                    </div>
                    <h4 className="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {hl.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {hl.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // 4. STATISTICS SECTION
      case 'stats':
        return (
          <div className="max-w-6xl mx-auto w-full my-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                {section.badge || 'Performance Metrics'}
              </span>
              <h2 
                className="text-3xl sm:text-4xl font-extrabold text-white"
                style={{ fontFamily: project.theme?.fontHeading || 'Playfair Display, serif' }}
              >
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">{section.subtitle}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {(section.content || []).map((st: any, sIdx: number) => (
                <div 
                  key={sIdx}
                  className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 text-center shadow-lg hover:border-slate-700 transition-colors"
                >
                  <div className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 font-mono mb-2">
                    {st.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white">{st.label}</div>
                  {st.sub && <div className="text-[11px] text-slate-400 mt-1">{st.sub}</div>}
                </div>
              ))}
            </div>
          </div>
        );

      // 5. SALIENT FEATURES
      case 'salient':
        return (
          <div className="max-w-6xl mx-auto w-full my-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30">
                {section.badge || 'Structural & Civic Pillars'}
              </span>
              <h2 
                className="text-3xl sm:text-4xl font-extrabold text-white"
                style={{ fontFamily: project.theme?.fontHeading || 'Playfair Display, serif' }}
              >
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">{section.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {(section.content || []).map((sf: any, sfIdx: number) => (
                <div 
                  key={sfIdx}
                  className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md flex items-start gap-3.5 hover:border-indigo-500/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white mb-1">{sf.title}</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">{sf.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // 6. MASTER PLAN & HOTSPOTS
      case 'master_plan':
        return (
          <div className="max-w-7xl mx-auto w-full my-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
                {section.badge || 'Interactive Master Plan'}
              </span>
              <h2 
                className="text-3xl sm:text-4xl font-extrabold text-white"
                style={{ fontFamily: project.theme?.fontHeading || 'Playfair Display, serif' }}
              >
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">{section.subtitle}</p>
            </div>

            <AdvibeInteractiveMasterPlan
              masterPlan={project.masterPlan}
              projectTitle={project.title}
              themePrimaryColor={project.theme?.primaryColor}
              properties={properties}
              onSelectProperty={onSelectProperty}
            />
          </div>
        );

      // 7. LOCATION & PROXIMITY RADAR
      case 'location':
        return (
          <div className="max-w-7xl mx-auto w-full my-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                {section.badge || 'Location Intelligence'}
              </span>
              <h2 
                className="text-3xl sm:text-4xl font-extrabold text-white"
                style={{ fontFamily: project.theme?.fontHeading || 'Playfair Display, serif' }}
              >
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">{section.subtitle}</p>
            </div>

            <AdvibeLocationRadar
              locationPoints={project.locationPoints}
              coordinates={project.coordinates}
              city={project.city}
              area={project.area}
              address={project.address}
              projectTitle={project.title}
            />
          </div>
        );

      // 8. AMENITIES
      case 'amenities':
        return (
          <div className="max-w-6xl mx-auto w-full my-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                {section.badge || 'Resort Amenities'}
              </span>
              <h2 
                className="text-3xl sm:text-4xl font-extrabold text-white"
                style={{ fontFamily: project.theme?.fontHeading || 'Playfair Display, serif' }}
              >
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">{section.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.amenities.map((am) => (
                <div
                  key={am.id}
                  className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl group hover:border-amber-500/40 transition-colors"
                >
                  {am.image && (
                    <div className="h-44 w-full overflow-hidden bg-slate-950">
                      <img
                        src={am.image}
                        alt={am.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                      {am.category}
                    </span>
                    <h4 className="text-base font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {am.name}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {am.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // 9. GALLERY
      case 'gallery':
        return (
          <div className="max-w-7xl mx-auto w-full my-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
                {section.badge || 'Visual Portfolio'}
              </span>
              <h2 
                className="text-3xl sm:text-4xl font-extrabold text-white"
                style={{ fontFamily: project.theme?.fontHeading || 'Playfair Display, serif' }}
              >
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">{section.subtitle}</p>
            </div>

            <AdvibeGalleryLightbox
              items={project.gallery}
              projectTitle={project.title}
            />
          </div>
        );

      // 10. VIDEOS
      case 'videos':
        return (
          <div className="max-w-7xl mx-auto w-full my-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-400 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30">
                {section.badge || 'Cinematic Film'}
              </span>
              <h2 
                className="text-3xl sm:text-4xl font-extrabold text-white"
                style={{ fontFamily: project.theme?.fontHeading || 'Playfair Display, serif' }}
              >
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">{section.subtitle}</p>
            </div>

            <AdvibeVideoPlayerModal
              videos={project.videos}
              projectTitle={project.title}
            />
          </div>
        );

      // 11. VIRTUAL TOUR (3D Interactive Virtual Tour with Auto-Run by Default)
      case 'virtual_tour':
        return (
          <div className="max-w-6xl mx-auto w-full my-auto space-y-6 text-center">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30">
                {section.badge || 'Virtual Digital Twin • Auto-Run 3D'}
              </span>
              <h2 
                className="text-3xl sm:text-4xl font-extrabold text-white"
                style={{ fontFamily: project.theme?.fontHeading || 'Playfair Display, serif' }}
              >
                {section.title || '3D Virtual Tour Walkthrough'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
                {section.subtitle || 'Auto-running panoramic 3D tour. Pan 360 degrees or click hotspots to explore.'}
              </p>
            </div>

            {/* Embedded 3D Virtual Tour with Auto-Run By Default */}
            <div className="w-full">
              <Advibe3DVirtualTour
                project={project}
                embedded={true}
                className="w-full h-[540px] sm:h-[640px] shadow-2xl border-slate-700"
              />
            </div>
          </div>
        );

      // 12. AVAILABLE UNITS (Linked Properties)
      case 'units':
        return (
          <div className="max-w-7xl mx-auto w-full my-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                {section.badge || 'Live Inventory'}
              </span>
              <h2 
                className="text-3xl sm:text-4xl font-extrabold text-white"
                style={{ fontFamily: project.theme?.fontHeading || 'Playfair Display, serif' }}
              >
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">{section.subtitle}</p>
            </div>

            <AdvibeLinkedUnits
              linkedPropertyIds={project.linkedPropertyIds}
              properties={properties}
              onSelectProperty={onSelectProperty || (() => {})}
              projectTitle={project.title}
            />
          </div>
        );

      // 13. PRICING & PAYMENT PLANS
      case 'pricing':
        return (
          <div className="max-w-6xl mx-auto w-full my-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                {section.badge || 'Payment Schedules'}
              </span>
              <h2 
                className="text-3xl sm:text-4xl font-extrabold text-white"
                style={{ fontFamily: project.theme?.fontHeading || 'Playfair Display, serif' }}
              >
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">{section.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {project.pricingTiers.map((tier) => (
                <div
                  key={tier.id}
                  className="rounded-2xl p-5 bg-slate-900 border border-slate-800 shadow-xl hover:border-amber-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {tier.size}
                    </span>
                    <h4 className="text-base font-extrabold text-white mt-1 mb-3">
                      {tier.unitType}
                    </h4>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 mb-4">
                      <span className="text-[10px] text-slate-400 block">Total Package:</span>
                      <span className="text-lg font-black text-amber-400 font-mono">
                        {tier.totalPrice}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-slate-300 mb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Down Payment:</span>
                        <span className="font-semibold text-white">{tier.downPayment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Installment:</span>
                        <span className="font-semibold text-white">{tier.monthlyInstallment}</span>
                      </div>
                      {tier.quarterlyBalloon && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">Balloon:</span>
                          <span className="font-semibold text-white">{tier.quarterlyBalloon}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-400">Possession:</span>
                        <span className="font-semibold text-emerald-400">{tier.possession}</span>
                      </div>
                    </div>

                    {tier.features && (
                      <ul className="space-y-1.5 text-[11px] text-slate-400 border-t border-slate-800 pt-3">
                        {tier.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      const sec = document.getElementById('advibe-sec-sec-enquiry');
                      if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-5 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
                  >
                    Select Unit Tier
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      // 14. DEVELOPER
      case 'developer':
        return (
          <div className="max-w-4xl mx-auto w-full my-auto space-y-6">
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-slate-800 pb-6">
                <img
                  src={project.developer.logo}
                  alt={project.developer.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-700"
                />
                <div className="text-center sm:text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    Master Developers & Engineering Consortium
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    {project.developer.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Founded in {project.developer.foundedYear || 2012} • {project.developer.completedProjects || 25}+ Flagship Projects Delivered
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mt-6 leading-relaxed">
                {project.developer.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <div className="text-lg font-bold text-white font-mono">{project.developer.completedProjects}+</div>
                  <div className="text-[10px] text-slate-400">Projects Delivered</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <div className="text-lg font-bold text-emerald-400 font-mono">100%</div>
                  <div className="text-[10px] text-slate-400">NOC Approved</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <div className="text-lg font-bold text-amber-400 font-mono">{project.developer.rating || 4.9} ★</div>
                  <div className="text-[10px] text-slate-400">Client Rating</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <div className="text-lg font-bold text-blue-400 font-mono">24/7</div>
                  <div className="text-[10px] text-slate-400">Site Escort</div>
                </div>
              </div>
            </div>
          </div>
        );

      // 15. ENQUIRY
      case 'enquiry':
        return (
          <div className="max-w-6xl mx-auto w-full my-auto">
            <AdvibeEnquirySection project={project} />
          </div>
        );

      // 16. CTA SECTION
      case 'cta':
        return (
          <div className="max-w-4xl mx-auto w-full my-auto text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
              {section.badge || 'Limited Opportunity'}
            </span>
            <h2 
              className="text-3xl sm:text-5xl font-black text-white"
              style={{ fontFamily: project.theme?.fontHeading || 'Playfair Display, serif' }}
            >
              {section.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              {section.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href={`https://wa.me/${project.dealerWhatsApp || '923365666727'}?text=${encodeURIComponent(`Salam! I want to book at ${project.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm transition-all shadow-xl hover:shadow-emerald-600/30 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Reservation</span>
              </a>

              <a
                href={`tel:${project.dealerPhone || '+923365666727'}`}
                className="px-8 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all border border-slate-700 shadow-md flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Call Sales Hotline</span>
              </a>
            </div>
          </div>
        );

      // 17. DISCLAIMER
      case 'disclaimer':
        return (
          <div className="max-w-4xl mx-auto w-full my-auto space-y-4 text-slate-400 text-xs leading-relaxed">
            <div className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs border-b border-slate-800 pb-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>{section.title || 'Legal Clearances & Regulatory Disclaimers'}</span>
            </div>
            {section.content?.legalNotes ? (
              section.content.legalNotes.map((note: string, nIdx: number) => (
                <p key={nIdx}>• {note}</p>
              ))
            ) : (
              <p>
                All visual renderings, floorplans, and property descriptions are for marketing purposes. Registered buyers should verify physical site boundary pillars and official TMA Taxila NOC documentation.
              </p>
            )}
            <div className="pt-4 text-slate-500 text-[11px] border-t border-slate-900">
              © {new Date().getFullYear()} {project.title} • Powered by Ri8Click AdVibe PropTech Suite. All Rights Reserved.
            </div>
          </div>
        );

      default:
        return (
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-bold text-white">{section.title}</h3>
            <p className="text-xs text-slate-400 mt-2">{section.subtitle}</p>
          </div>
        );
    }
  }
};

export default AdvibeProjectScrollyPage;

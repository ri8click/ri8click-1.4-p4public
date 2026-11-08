import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Phone,
  MessageSquare,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Calendar,
  Award,
  Copy,
  Video,
  Image as ImageIcon
} from 'lucide-react';
import { AdVibeProject, Property } from '../../types';
import AdvibeInteractiveMasterPlan from './AdvibeInteractiveMasterPlan';
import AdvibeLocationRadar from './AdvibeLocationRadar';
import AdvibeGalleryLightbox from './AdvibeGalleryLightbox';
import AdvibeVideoPlayerModal from './AdvibeVideoPlayerModal';
import AdvibeLinkedUnits from './AdvibeLinkedUnits';
import AdvibeEnquirySection from './AdvibeEnquirySection';
import Advibe3DVirtualTour from './Advibe3DVirtualTour';

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
  const [showShareNotification, setShowShareNotification] = useState<boolean>(false);
  const [playHeroVideo, setPlayHeroVideo] = useState<boolean>(false);

  const activeSections = (project.sections || [])
    .filter(sec => sec.isEnabled)
    .sort((a, b) => a.order - b.order);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(Math.max(currentProgress, 0), 100));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const jumpToSection = (index: number) => {
    const targetSection = activeSections[index];
    if (!targetSection) return;
    setActiveSectionIndex(index);
    const el = document.getElementById(`advibe-sec-${targetSection.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: project.title,
          text: project.tagline,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareNotification(true);
      setTimeout(() => setShowShareNotification(false), 3000);
    }
  };

  const heroBannerUrl =
    project.bannerImage ||
    project.mainImage ||
    project.seo?.ogImage ||
    project.gallery?.[0]?.url ||
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=85';

  const heroVideoUrl = project.heroVideoUrl || project.videos?.[0]?.url || '';

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-x-hidden bg-slate-50 text-slate-900"
    >
      {/* Top Light Floating Header */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBackToListing}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors border border-slate-200 cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to AdVibe</span>
            </button>

            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={project.logo}
                alt={project.title}
                className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <div className="text-xs font-extrabold text-slate-900 truncate">
                  {project.title}
                </div>
                <div className="text-[10px] text-blue-600 font-bold truncate">
                  {project.type} • {project.city}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
              title="Share Project"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/${
                project.dealerWhatsApp || '923365666727'
              }?text=${encodeURIComponent(
                `Assalam-o-Alaikum! I am viewing ${project.title} on AdVibe.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-xs transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp Desk</span>
            </a>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-100">
          <div
            className="h-full bg-blue-600 transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Floating Bottom Quick CTA Bar */}
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-40 flex items-center justify-between sm:justify-start gap-2 bg-white/95 backdrop-blur-md p-2 rounded-2xl border border-slate-200 shadow-xl">
        <a
          href={`tel:${project.dealerPhone || '+923365666727'}`}
          className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
          title="Call Direct Desk"
        >
          <Phone className="w-4 h-4" />
        </a>

        <button
          onClick={() => {
            const sec = document.getElementById('advibe-sec-sec-enquiry');
            if (sec) sec.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Site Visit</span>
        </button>

        <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
          <button
            onClick={() => jumpToSection(Math.max(activeSectionIndex - 1, 0))}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
            title="Previous Section"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() =>
              jumpToSection(
                Math.min(activeSectionIndex + 1, activeSections.length - 1)
              )
            }
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
            title="Next Section"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {showShareNotification && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2">
          <Copy className="w-4 h-4" />
          <span>Project link copied to clipboard!</span>
        </div>
      )}

      {/* MAIN SECTIONS */}
      <main className="w-full space-y-12 pb-20">
        {activeSections.map((section, idx) => (
          <section
            key={section.id}
            id={`advibe-sec-${section.id}`}
            className="relative w-full py-10 px-4 sm:px-8 border-b border-slate-200/80"
          >
            {renderSectionContent(section, idx)}
          </section>
        ))}
      </main>
    </div>
  );

  function renderSectionContent(section: any, _index: number) {
    switch (section.type) {
      case 'hero':
        return (
          <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-lg">
            {/* Banner Image or Video Stage — Clean & Professional */}
            <div className="relative h-[360px] sm:h-[480px] w-full bg-slate-900 overflow-hidden">
              {playHeroVideo && heroVideoUrl ? (
                <video
                  src={heroVideoUrl}
                  poster={heroBannerUrl}
                  controls
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={section.customSettings?.bgImageUrl || heroBannerUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-white/95 text-slate-900 text-xs font-extrabold uppercase tracking-wider shadow-xs">
                  {section.badge || project.type}
                </span>

                <div className="flex items-center gap-2">
                  {heroVideoUrl && (
                    <button
                      type="button"
                      onClick={() => setPlayHeroVideo(prev => !prev)}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      {playHeroVideo ? (
                        <>
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Show Banner Image</span>
                        </>
                      ) : (
                        <>
                          <Video className="w-3.5 h-3.5" />
                          <span>Play Walkthrough Video</span>
                        </>
                      )}
                    </button>
                  )}
                  <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-xs">
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  {project.developer?.name} • {project.address}
                </div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight">
                  {section.title || project.title}
                </h1>
                <p className="text-xs sm:text-base text-slate-200 max-w-3xl">
                  {section.subtitle || project.tagline}
                </p>
              </div>
            </div>

            {/* Key Project Specs Bar */}
            <div className="p-5 sm:p-6 bg-white flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Starting Price
                  </span>
                  <span className="text-lg sm:text-xl font-black text-blue-600">
                    {project.starting_price_formatted}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Location
                  </span>
                  <span className="text-sm font-bold text-slate-900 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    {project.area}, {project.city}
                  </span>
                </div>
                {project.areaSize && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Standard Size
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {project.areaSize} {project.areaUnit || 'Marla'}
                    </span>
                  </div>
                )}
              </div>

              {project.features && project.features.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.features.slice(0, 4).map((feat, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'intro':
      case 'story':
        return (
          <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                {section.badge || 'Executive Overview'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{section.subtitle}</p>
            </div>

            {section.content?.quote && (
              <blockquote className="p-5 rounded-2xl bg-blue-50/70 border-l-4 border-blue-600 text-slate-800 text-sm sm:text-base italic leading-relaxed">
                "{section.content.quote}"
              </blockquote>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {section.content?.paragraphs ? (
                section.content.paragraphs.map((para: string, pIdx: number) => (
                  <p key={pIdx}>{para}</p>
                ))
              ) : (
                <p className="md:col-span-2">{project.description}</p>
              )}
            </div>
          </div>
        );

      case 'highlights':
        return (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                {section.badge || 'Key Highlights'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{section.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {project.highlights.map(hl => (
                <div
                  key={hl.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between"
                >
                  <div>
                    {hl.image && (
                      <div className="h-32 w-full rounded-xl overflow-hidden mb-4 bg-slate-100">
                        <img
                          src={hl.image}
                          alt={hl.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="text-xs font-extrabold text-blue-600 mb-1">
                      {hl.value}
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1.5">
                      {hl.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {hl.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{section.subtitle}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {(section.content || []).map((st: any, sIdx: number) => (
                <div
                  key={sIdx}
                  className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-xs"
                >
                  <div className="text-2xl sm:text-4xl font-black text-blue-600 mb-1">
                    {st.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">
                    {st.label}
                  </div>
                  {st.sub && (
                    <div className="text-[11px] text-slate-500 mt-1">{st.sub}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'salient':
        return (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{section.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {(section.content || []).map((sf: any, sfIdx: number) => (
                <div
                  key={sfIdx}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900 mb-1">{sf.title}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{sf.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'master_plan':
      case 'masterplan':
        return (
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                {section.badge || 'Interactive Master Plan'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{section.subtitle}</p>
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

      case 'location':
        return (
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                {section.badge || 'Location & Landmarks'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{section.subtitle}</p>
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

      case 'amenities':
        return (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{section.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.amenities.map(am => (
                <div
                  key={am.id}
                  className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs"
                >
                  {am.image && (
                    <div className="h-44 w-full overflow-hidden bg-slate-100">
                      <img
                        src={am.image}
                        alt={am.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-1">
                      {am.category}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mb-1.5">
                      {am.name}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {am.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{section.subtitle}</p>
            </div>

            <AdvibeGalleryLightbox items={project.gallery} projectTitle={project.title} />
          </div>
        );

      case 'videos':
        return (
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{section.subtitle}</p>
            </div>

            <AdvibeVideoPlayerModal
              videos={project.videos}
              projectTitle={project.title}
            />
          </div>
        );

      case 'virtual_tour':
        return (
          <div className="max-w-6xl mx-auto space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title || '360° Panoramic Walkthrough'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
                {section.subtitle || 'Drag to explore the architectural spaces in 360 degrees.'}
              </p>
            </div>

            <div className="w-full">
              <Advibe3DVirtualTour
                project={project}
                embedded={true}
                className="w-full h-[460px] sm:h-[560px] shadow-md border-slate-200"
              />
            </div>
          </div>
        );

      case 'units':
        return (
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{section.subtitle}</p>
            </div>

            <AdvibeLinkedUnits
              linkedPropertyIds={project.linkedPropertyIds}
              properties={properties}
              onSelectProperty={onSelectProperty || (() => {})}
              projectTitle={project.title}
            />
          </div>
        );

      case 'pricing':
      case 'payment_plan':
        return (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">{section.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {project.pricingTiers.map(tier => (
                <div
                  key={tier.id}
                  className="rounded-2xl p-5 bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {tier.size}
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900 mt-1 mb-3">
                      {tier.unitType}
                    </h4>

                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 mb-4">
                      <span className="text-[10px] text-slate-500 block">Total Price:</span>
                      <span className="text-lg font-black text-blue-700">
                        {tier.totalPrice}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-slate-600 mb-4">
                      <div className="flex justify-between">
                        <span>Down Payment:</span>
                        <span className="font-bold text-slate-900">{tier.downPayment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Installment:</span>
                        <span className="font-bold text-slate-900">
                          {tier.monthlyInstallment}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Possession:</span>
                        <span className="font-bold text-emerald-700">{tier.possession}</span>
                      </div>
                    </div>

                    {tier.features && (
                      <ul className="space-y-1.5 text-[11px] text-slate-600 border-t border-slate-100 pt-3">
                        {tier.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
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
                    className="mt-5 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Inquire This Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'developer':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
              <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-slate-100 pb-6">
                <img
                  src={project.developer.logo}
                  alt={project.developer.name}
                  className="w-20 h-20 rounded-2xl object-cover border border-slate-200"
                />
                <div className="text-center sm:text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Master Developer &amp; Consortium Partner
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                    {project.developer.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {project.developer.completedProjects || 25}+ Projects Delivered
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 mt-5 leading-relaxed">
                {project.developer.description}
              </p>
            </div>
          </div>
        );

      case 'enquiry':
      case 'lead_form':
        return (
          <div className="max-w-6xl mx-auto">
            <AdvibeEnquirySection project={project} />
          </div>
        );

      default:
        return null;
    }
  }
};

export default AdvibeProjectScrollyPage;

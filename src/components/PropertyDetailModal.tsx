import React, { useState, useEffect } from 'react';
import {
  X,
  Heart,
  MapPin,
  Calendar,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Video,
  Image as ImageIcon,
  Compass,
  Play
} from 'lucide-react';
import { Property } from '../types';
import WatermarkBadge from './WatermarkBadge';
import LocationMapView from './LocationMapView';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (propertyId: string) => void;
  onScheduleTour: (property: Property) => void;
  onOpen3DTour?: (property: Property) => void;
}

function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  if (url.includes('youtube.com/embed/')) return url;
  if (url.includes('youtube.com/watch?v=')) {
    const id = url.split('watch?v=')[1]?.split('&')[0];
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : null;
  }
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]?.split('?')[0];
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : null;
  }
  return null;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  isSaved,
  onToggleSave,
  onScheduleTour,
  onOpen3DTour
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeMediaMode, setActiveMediaMode] = useState<'photos' | 'video'>('photos');
  const [copiedShare, setCopiedShare] = useState(false);

  const hasVideo = Boolean(property?.virtualTourVideoUrl && property.virtualTourVideoUrl.trim());

  useEffect(() => {
    setActiveImageIdx(0);
    // Automatically open in video mode if user clicked a listing with an attached video clip
    if (property?.virtualTourVideoUrl && property.virtualTourVideoUrl.trim()) {
      setActiveMediaMode('video');
    } else {
      setActiveMediaMode('photos');
    }
  }, [property?.id, property?.virtualTourVideoUrl]);

  if (!property) return null;

  const images =
    property.images && property.images.length > 0
      ? property.images
      : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'];

  const handleWhatsApp = () => {
    const cleanPhone = (property.agentWhatsApp || '923365666727').replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Assalam-o-Alaikum ${property.agentName},\nI am interested in "${property.title}" (${property.priceFormatted}) located in ${property.location.society}, ${property.location.city} listed on ri8click.com.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    window.open(`tel:${property.agentPhone}`);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const youtubeEmbed = hasVideo ? getYouTubeEmbedUrl(property.virtualTourVideoUrl!) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Sticky Bar */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="bg-blue-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shrink-0">
              {property.type}
            </span>
            <h2 className="font-bold text-sm sm:text-base truncate">{property.title}</h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {hasVideo && (
              <button
                type="button"
                onClick={() => setActiveMediaMode(prev => (prev === 'video' ? 'photos' : 'video'))}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeMediaMode === 'video'
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>{activeMediaMode === 'video' ? 'Viewing Video' : 'Watch Video Tour'}</span>
              </button>
            )}

            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedShare ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={() => onToggleSave(property.id)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isSaved ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Media Showcase (Photos OR Functional Video Player) */}
          <div className="space-y-3">
            {/* Media Mode Switcher Bar */}
            {hasVideo && (
              <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-100 p-2 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveMediaMode('photos')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeMediaMode === 'photos'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-white'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Photo Gallery ({images.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMediaMode('video')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeMediaMode === 'video'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{property.virtualTourVideoTitle || 'Watch Movie Walkthrough'}</span>
                  </button>
                </div>

                {onOpen3DTour && (
                  <button
                    type="button"
                    onClick={() => onOpen3DTour(property)}
                    className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center gap-1.5 cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Full-Screen 360° &amp; Video Studio</span>
                  </button>
                )}
              </div>
            )}

            <div className="relative h-72 sm:h-[420px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-200">
              {activeMediaMode === 'video' && hasVideo ? (
                youtubeEmbed ? (
                  <iframe
                    src={youtubeEmbed}
                    title={property.virtualTourVideoTitle || property.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    key={property.virtualTourVideoUrl}
                    src={property.virtualTourVideoUrl}
                    poster={images[0]}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain bg-black"
                  />
                )
              ) : (
                <>
                  <img
                    src={images[activeImageIdx] || images[0]}
                    alt={property.title}
                    onError={e => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';
                    }}
                    className="w-full h-full object-cover"
                  />
                  {property.watermark && (
                    <>
                      <WatermarkBadge position="center" size="lg" />
                      <WatermarkBadge position="bottom-right" size="md" showVerifiedText />
                    </>
                  )}
                  <div className="absolute bottom-4 left-4 bg-slate-950/85 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-white/15">
                    <div className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">
                      {property.purpose === 'for_sale' ? 'Asking Valuation' : 'Monthly Rent'}
                    </div>
                    <div className="text-xl sm:text-2xl font-black">{property.priceFormatted}</div>
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
              {hasVideo && (
                <button
                  type="button"
                  onClick={() => setActiveMediaMode('video')}
                  className={`relative h-16 w-28 rounded-xl overflow-hidden border-2 shrink-0 transition-all bg-slate-900 flex items-center justify-center cursor-pointer ${
                    activeMediaMode === 'video'
                      ? 'border-indigo-600 ring-2 ring-indigo-600/30'
                      : 'border-slate-300 opacity-85 hover:opacity-100'
                  }`}
                >
                  <img src={images[0]} alt="Video thumb" className="w-full h-full object-cover opacity-50" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <Play className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="text-[9px] font-extrabold uppercase tracking-wider mt-0.5">
                      Video Tour
                    </span>
                  </div>
                </button>
              )}

              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveMediaMode('photos');
                    setActiveImageIdx(idx);
                  }}
                  className={`relative h-16 w-24 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    activeMediaMode === 'photos' && activeImageIdx === idx
                      ? 'border-blue-600 ring-2 ring-blue-600/30'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout: Left Details, Right Agent Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-blue-600 text-xs font-bold mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {property.location.address} ({property.location.society}, {property.location.city})
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {property.title}
                </h1>
                {property.tagline && (
                  <p className="text-sm text-slate-500 font-medium mt-0.5">{property.tagline}</p>
                )}
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div>
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">Area Size</div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                    {property.area} {property.areaUnit}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">Category</div>
                  <div className="text-sm font-extrabold text-slate-900 capitalize mt-0.5">
                    {property.category}
                  </div>
                </div>
                {property.bedrooms !== undefined && (
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold uppercase">Bedrooms</div>
                    <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                      {property.bedrooms} Beds
                    </div>
                  </div>
                )}
                {property.bathrooms !== undefined && (
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold uppercase">Bathrooms</div>
                    <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                      {property.bathrooms} Baths
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-2">
                  Property Overview &amp; Specifications
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{property.description}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3">
                  Key Features &amp; Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs font-semibold text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <LocationMapView location={property.location} title={property.title} />
            </div>

            {/* Right Column: Agent Card */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4 sticky top-4">
                <div className="flex items-center gap-3.5 pb-4 border-b border-slate-800">
                  <img
                    src={property.agentAvatar}
                    alt={property.agentName}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400"
                  />
                  <div>
                    <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md mb-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>ri8click Verified Advisor</span>
                    </div>
                    <h4 className="font-bold text-base text-white">{property.agentName}</h4>
                    <p className="text-xs text-slate-400">{property.agentCompany}</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={handleWhatsApp}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </button>

                  <button
                    onClick={handleCall}
                    className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call: {property.agentPhone}</span>
                  </button>

                  <button
                    onClick={() => onScheduleTour(property)}
                    className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Free Site Tour</span>
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
                  <strong className="text-slate-200">ri8click Guarantee:</strong> All properties are physically verified and protected by our anti-theft watermark system.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailModal;

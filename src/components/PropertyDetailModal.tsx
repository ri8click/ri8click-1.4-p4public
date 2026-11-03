import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  MapPin, 
  Calendar, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2,
  Share2
} from 'lucide-react';
import { Property } from '../types';
import { WatermarkBadge } from './WatermarkBadge';
import { LocationMapView } from './LocationMapView';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (propertyId: string) => void;
  onScheduleTour: (property: Property) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  isSaved,
  onToggleSave,
  onScheduleTour
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [copiedShare, setCopiedShare] = useState(false);

  if (!property) return null;

  const images = property.images && property.images.length > 0 
    ? property.images 
    : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'];

  const currentImg = images[activeImageIdx] || images[0];

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Assalam-o-Alaikum ${property.agentName}, I am interested in your listing "${property.title}" (${property.priceFormatted}) located at ${property.location.society}, ${property.location.city} on ri8click.com. Please share details.`
    );
    window.open(`https://wa.me/${property.agentWhatsApp}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${property.agentPhone}`, '_self');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
      <div className="relative bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Top Sticky Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-5 py-3.5 bg-white/95 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-600 text-white shrink-0">
              {property.type}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
              {property.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleShare}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedShare ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleSave(property.id)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isSaved 
                  ? 'bg-red-50 border-red-200 text-red-500' 
                  : 'border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              title="Save Property"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="p-5 sm:p-8 space-y-8">
          
          {/* Gallery Viewer with Watermark */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] max-h-[460px] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200">
              <img
                src={currentImg}
                alt={property.title}
                onError={e => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              {property.watermark && (
                <>
                  <WatermarkBadge position="center" size="lg" />
                  <WatermarkBadge position="bottom-right" size="md" />
                </>
              )}

              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                  {property.purpose === 'for_sale' ? 'Asking Valuation' : 'Monthly Rent'}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold">
                  {property.priceFormatted}
                </div>
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIdx === idx ? 'border-blue-600 scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2-Column Details + Agent Contact */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Specs & Description */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location.address} ({property.location.society}, {property.location.city})</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {property.title}
                </h2>
                {property.tagline && (
                  <p className="text-sm font-medium text-slate-500 mt-1">
                    {property.tagline}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div className="space-y-0.5">
                  <span className="text-slate-500 block text-[11px]">Area</span>
                  <span className="font-extrabold text-slate-900 text-sm">{property.area} {property.areaUnit}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-500 block text-[11px]">Category</span>
                  <span className="font-extrabold text-slate-900 capitalize">{property.category}</span>
                </div>
                {property.bedrooms && (
                  <div className="space-y-0.5">
                    <span className="text-slate-500 block text-[11px]">Bedrooms</span>
                    <span className="font-extrabold text-slate-900 text-sm">{property.bedrooms} Beds</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="space-y-0.5">
                    <span className="text-slate-500 block text-[11px]">Bathrooms</span>
                    <span className="font-extrabold text-slate-900 text-sm">{property.bathrooms} Baths</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Property Overview &amp; Features
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {property.features && property.features.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Amenities &amp; Structural Highlights
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {property.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-2 border-t border-slate-200">
                <LocationMapView
                  location={property.location}
                  propertyTitle={property.title}
                  propertyPrice={property.priceFormatted}
                  propertyType={property.type}
                />
              </div>
            </div>

            {/* Right 1 Col: Agent Card & Contact Box */}
            <div className="space-y-5">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Authorized Agent Partner</span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={property.agentAvatar}
                    alt={property.agentName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {property.agentName}
                    </h4>
                    <p className="text-xs text-slate-500">{property.agentCompany}</p>
                    <div className="text-[11px] text-amber-600 font-bold mt-0.5">
                      ★ {property.agentRating} Verified Agent
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCall}
                    className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span>Call: {property.agentPhone}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onScheduleTour(property)}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Free Site Tour</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-500 text-center bg-white p-3 rounded-xl border border-slate-200/60">
                  🛡️ ri8click Guarantee: All properties are physically verified and legally vetted.
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

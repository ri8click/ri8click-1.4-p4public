import React, { useState } from 'react';
import {
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  MessageCircle,
  Star,
  Sparkles,
  Building2,
  Play
} from 'lucide-react';
import { Property } from '../types';
import WatermarkBadge from './WatermarkBadge';
import { resolvePakistanAgentAvatar } from './AgenciesSection';

interface PropertyCardProps {
  property: Property;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onScheduleTour: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isSaved,
  onToggleSave,
  onSelectProperty,
  onScheduleTour
}) => {
  const [imgError, setImgError] = useState(false);

  const fallbackModularImg =
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=85';
  const fallbackGeneralImg =
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';

  const primaryImg = property.images?.[0] || '';
  const displayImg =
    imgError || !primaryImg
      ? property.category === 'modular'
        ? fallbackModularImg
        : fallbackGeneralImg
      : primaryImg;

  const resolvedAgentAvatar = resolvePakistanAgentAvatar(
    property.agentAvatar,
    property.agencyId || property.agentName
  );

  const cleanWhatsApp = (property.agentWhatsApp || '923365666727').replace(/[^0-9]/g, '');
  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum, I am inquiring about "${property.title}" (${property.priceFormatted}) in ${property.location.society}, ${property.location.city} on ri8click.com.`
  );

  const hasVideoTour = Boolean(
    property.virtualTourVideoUrl && property.virtualTourVideoUrl.trim()
  );

  return (
    <div
      onClick={() => onSelectProperty(property)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-500/50 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
    >
      <div className="relative h-56 w-full overflow-hidden bg-slate-900">
        <img
          src={displayImg}
          alt={property.title}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />

        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          <span
            className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider shadow-xs ${
              property.purpose === 'for_rent'
                ? 'bg-purple-600 text-white'
                : 'bg-blue-600 text-white'
            }`}
          >
            {property.purpose === 'for_rent' ? 'For Rent' : 'For Sale'}
          </span>

          {property.status === 'sold' && (
            <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
              SOLD OUT
            </span>
          )}

          {property.isFeatured && (
            <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-xs">
              <Sparkles className="w-3 h-3" />
              <span>Featured</span>
            </span>
          )}

          {hasVideoTour && (
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                onSelectProperty(property);
              }}
              className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md cursor-pointer transition-transform hover:scale-105"
              title="Click to watch property video tour"
            >
              <Play className="w-3 h-3 fill-amber-300 text-amber-300" />
              <span>Watch Video Tour</span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            onToggleSave(property.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            isSaved
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-slate-900/60 text-white hover:bg-rose-500'
          }`}
          title={isSaved ? 'Remove from Saved' : 'Save Property'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {property.watermark !== false && (
          <WatermarkBadge position="bottom-right" size="sm" showVerifiedText />
        )}

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white z-10">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
              {property.currency || 'PKR'} Valuation
            </div>
            <div className="text-lg font-black leading-tight drop-shadow-xs">
              {property.priceFormatted}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center gap-1 text-xs font-bold text-blue-600 mb-1 truncate">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              {property.location.society}, {property.location.city}
            </span>
          </div>

          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base line-clamp-1 group-hover:text-blue-600 transition-colors">
            {property.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {property.description}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-700">
            {property.bedrooms !== undefined ? (
              <span className="flex items-center gap-1">
                <BedDouble className="w-3.5 h-3.5 text-blue-600" />
                {property.bedrooms} Beds
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                {property.type}
              </span>
            )}

            {property.bathrooms !== undefined && (
              <span className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-blue-600" />
                {property.bathrooms} Baths
              </span>
            )}

            <span className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5 text-blue-600" />
              {property.area} {property.areaUnit}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={resolvedAgentAvatar}
                alt={property.agentName}
                className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {property.agentName}
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1 truncate">
                  <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400 shrink-0" />
                  <span className="truncate">{property.agentCompany}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
              <a
                href={`https://wa.me/${cleanWhatsApp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat</span>
              </a>
              <button
                type="button"
                onClick={() => onScheduleTour(property)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

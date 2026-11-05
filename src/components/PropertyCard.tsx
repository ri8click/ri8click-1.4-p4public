import React, { useState } from 'react';
import { 
  Heart, 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize, 
  Compass, 
  Video, 
  Phone, 
  MessageCircle, 
  Star,
  Sparkles,
  Building2,
  Eye
} from 'lucide-react';
import { Property } from '../types';
import { WatermarkBadge } from './WatermarkBadge';
import { resolvePakistanAgentAvatar } from './AgenciesSection';

interface PropertyCardProps {
  property: Property;
  isSaved: boolean;
  onToggleSave: (propertyId: string) => void;
  onSelectProperty: (property: Property) => void;
  onScheduleTour: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isSaved,
  onToggleSave,
  onSelectProperty,
  onScheduleTour,
}) => {
  const [imgError, setImgError] = useState(false);

  const rawPrimaryImg =
    property.images && property.images.length > 0 ? property.images[0] : '';

  const fallbackImg =
    property.category === 'modular'
      ? 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=85'
      : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80';

  const displayImg = !imgError && rawPrimaryImg ? rawPrimaryImg : fallbackImg;

  const resolvedAgentAvatar = resolvePakistanAgentAvatar(
    property.agentAvatar,
    `${property.agencyId} ${property.agentName} ${property.agentCompany}`
  );

  const whatsappMessage = encodeURIComponent(
    `Assalam o Alaikum, I am inquiring about "${property.title}" (${property.priceFormatted}) on ri8click.`
  );
  const cleanWhatsApp = (property.agentWhatsApp || '923365666727').replace(/[^0-9]/g, '');

  return (
    <div 
      onClick={() => onSelectProperty(property)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer text-slate-900"
    >
      <div>
        {/* Image Container with Official Watermark */}
        <div className="relative h-56 w-full overflow-hidden bg-slate-900">
          <img
            src={displayImg}
            alt={property.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />

          {/* Top Left Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-xs ${
              property.purpose === 'for_rent' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-blue-600 text-white'
            }`}>
              {property.purpose === 'for_rent' ? 'For Rent' : 'For Sale'}
            </span>

            {property.status === 'sold' && (
              <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-xs">
                Sold Out
              </span>
            )}

            {property.isFeatured && (
              <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 flex items-center gap-1 shadow-xs">
                <Sparkles className="w-2.5 h-2.5 fill-current" />
                <span>Featured</span>
              </span>
            )}

            {property.virtualTourVideoUrl && (
              <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-purple-600/90 text-white flex items-center gap-1 shadow-xs backdrop-blur-xs">
                <Video className="w-2.5 h-2.5" />
                <span>Movie Tour</span>
              </span>
            )}
          </div>

          {/* Top Right Favorite Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(property.id);
            }}
            className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all ${
              isSaved 
                ? 'bg-red-500 text-white shadow-md' 
                : 'bg-slate-900/50 text-white hover:bg-slate-900/80 border border-white/20'
            }`}
            title={isSaved ? 'Remove from Saved' : 'Save Property'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          {/* Official Ri8Click Watermark Overlay */}
          {property.watermark !== false && (
            <WatermarkBadge position="bottom-right" size="sm" showVerifiedText />
          )}

          {/* Bottom Left Price Overlay */}
          <div className="absolute bottom-3 left-3 z-10">
            <div className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold">
              {property.currency || 'PKR'} Valuation
            </div>
            <div className="text-lg font-extrabold text-white tracking-tight leading-none">
              {property.priceFormatted}
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-2.5">
          {/* Location */}
          <div className="flex items-center gap-1 text-xs font-semibold text-blue-600">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{property.location.society}, {property.location.city}</span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {property.title}
          </h3>

          {/* Description Snippet */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {property.description}
          </p>

          {/* Specs Strip */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
            {property.bedrooms !== undefined ? (
              <div className="flex items-center gap-1">
                <BedDouble className="w-3.5 h-3.5 text-slate-400" />
                <span>{property.bedrooms} Beds</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{property.type}</span>
              </div>
            )}

            {property.bathrooms !== undefined && (
              <div className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-slate-400" />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}

            <div className="flex items-center gap-1 font-semibold text-slate-800">
              <Maximize className="w-3.5 h-3.5 text-blue-500" />
              <span>{property.area} {property.areaUnit}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Agent & Instant Action Footer */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2"
      >
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={resolvedAgentAvatar}
            alt={property.agentName}
            className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
          />
          <div className="min-w-0">
            <div className="text-[11px] font-bold text-slate-800 truncate">{property.agentName}</div>
            <div className="text-[9.5px] text-slate-500 truncate">{property.agentCompany}</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href={`https://wa.me/${cleanWhatsApp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-2xs"
            title="WhatsApp Agent"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={() => onScheduleTour(property)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold transition-colors"
          >
            Visit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

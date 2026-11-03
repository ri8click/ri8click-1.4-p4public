import React from 'react';
import { 
  Heart, 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize, 
  Compass, 
  Video, 
  Phone, 
  MessageSquare,
  ShieldCheck,
  Building2,
  Calendar
} from 'lucide-react';
import { Property } from '../types';
import { WatermarkBadge } from './WatermarkBadge';

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
  onScheduleTour
}) => {
  const primaryImage = property.images && property.images.length > 0 
    ? property.images[0] 
    : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80';

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const phone = property.agentWhatsApp || property.agentPhone || '923365666727';
    const text = encodeURIComponent(`Assalam o Alaikum, I am inquiring about "${property.title}" (PKR ${property.priceFormatted}) on ri8click.`);
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div 
      onClick={() => onSelectProperty(property)}
      className="group bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Top Image Container with Badges */}
      <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
        <img
          src={primaryImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Purpose & Category Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 pointer-events-none">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-white border border-white/10">
            {property.purpose === 'for_rent' ? 'For Rent' : 'For Sale'}
          </span>
          {property.isFeatured && (
            <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 shadow-xs">
              Featured
            </span>
          )}
          {property.virtualTourVideoUrl && (
            <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-purple-600 text-white flex items-center gap-1 shadow-xs">
              <Video className="w-2.5 h-2.5" />
              <span>Movie Tour</span>
            </span>
          )}
        </div>

        {/* Save to Favorites Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(property.id);
          }}
          className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md border transition-all ${
            isSaved 
              ? 'bg-rose-500 border-rose-500 text-white shadow-md' 
              : 'bg-black/40 border-white/20 text-white hover:bg-black/60'
          }`}
          title={isSaved ? "Remove from Saved" : "Save Property"}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Official Ri8Click Watermark Overlay */}
        <WatermarkBadge position="bottom-right" size="sm" showVerifiedText={true} />

        {/* Price Tag Bar */}
        <div className="absolute bottom-3 left-3 z-10 text-white">
          <div className="text-[10px] text-slate-200 uppercase tracking-wider font-semibold">
            {property.currency || 'PKR'}
          </div>
          <div className="text-lg font-black tracking-tight drop-shadow-md">
            {property.priceFormatted}
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Title & Location */}
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 truncate">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{property.location.society}, {property.location.city}</span>
          </div>

          <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {property.title}
          </h3>

          <p className="text-[11.5px] text-slate-500 line-clamp-2 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Specifications Strip (Beds, Baths, Area) */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-600 text-xs font-semibold">
          {property.bedrooms ? (
            <div className="flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.bedrooms} Beds</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <Building2 className="w-3.5 h-3.5" />
              <span>{property.type}</span>
            </div>
          )}

          {property.bathrooms && (
            <div className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.bathrooms} Baths</span>
            </div>
          )}

          <div className="flex items-center gap-1 text-slate-800">
            <Maximize className="w-3.5 h-3.5 text-blue-600" />
            <span>{property.area} {property.areaUnit}</span>
          </div>
        </div>

        {/* Agent attribution & Quick Action Buttons */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={property.agentAvatar}
              alt={property.agentName}
              className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
            />
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-slate-900 truncate">
                {property.agentName}
              </div>
              <div className="text-[9.5px] text-slate-400 truncate">
                {property.agentCompany}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleWhatsApp}
              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onScheduleTour(property);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-[11px] font-bold transition-colors flex items-center gap-1"
              title="Book Site Visit"
            >
              <Calendar className="w-3 h-3" />
              <span>Visit</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PropertyCard;

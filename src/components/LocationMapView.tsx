import React from 'react';
import { MapPin, Navigation, ExternalLink, Compass } from 'lucide-react';
import { LocationData } from '../types';

interface LocationMapViewProps {
  location: LocationData;
  propertyTitle?: string;
  propertyPrice?: string;
  propertyType?: string;
}

export const LocationMapView: React.FC<LocationMapViewProps> = ({
  location,
  propertyTitle,
  propertyPrice,
  propertyType
}) => {
  const lat = location.latitude ?? 33.7297;
  const lng = location.longitude ?? 72.8258;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <div className="space-y-4">
      {/* Map Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            {location.society} • {location.city}
          </h4>
          <p className="text-xs text-slate-500">
            {location.address || 'Faisal Hills, Taxila / Rawalpindi sector'}
          </p>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Open Google Maps</span>
          <ExternalLink className="w-3 h-3 opacity-70" />
        </a>
      </div>

      {/* Visual Simulated Interactive Canvas */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-slate-300 bg-slate-900 shadow-lg flex items-center justify-center">
        {/* Radial Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-40 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-slate-950/80" />

        {/* Decorative Roads & Terrain Vectors */}
        <svg className="absolute inset-0 w-full h-full opacity-40 stroke-blue-400" fill="none">
          <path d="M-50 100 Q 300 250, 700 80 T 1400 180" strokeWidth="4" />
          <path d="M200 -50 Q 400 350, 600 600" strokeWidth="3" stroke="rgba(251, 191, 36, 0.6)" />
          <circle cx="50%" cy="50%" r="80" stroke="rgba(59, 130, 246, 0.3)" strokeDasharray="6 6" />
          <circle cx="50%" cy="50%" r="140" stroke="rgba(59, 130, 246, 0.15)" />
        </svg>

        {/* Map Center Location Marker Card */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-2xl border border-white text-slate-900 text-center space-y-0.5 max-w-xs">
            {propertyType && (
              <span className="inline-block px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[9px] uppercase tracking-wider">
                {propertyType}
              </span>
            )}
            <div className="text-xs font-bold truncate max-w-[200px]">
              {propertyTitle || location.society}
            </div>
            {propertyPrice && (
              <div className="text-xs font-black text-blue-600">
                {propertyPrice}
              </div>
            )}
          </div>
          <div className="w-1 h-4 bg-white shadow-md" />
          <div className="w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white shadow-lg ring-4 ring-blue-500/40 animate-ping" />
        </div>

        {/* Compass Overlay */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs p-2 rounded-xl border border-white/10 text-white flex items-center gap-1.5 text-xs">
          <Compass className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '20s' }} />
          <span className="font-mono text-[10px]">Margalla N-Facing</span>
        </div>

        {/* Coordinates Tag */}
        <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-white/10 text-white font-mono text-[10px]">
          GPS: {lat.toFixed(4)}° N, {lng.toFixed(4)}° E
        </div>
      </div>

      {/* Nearby Landmarks List */}
      {location.nearbyLandmarks && location.nearbyLandmarks.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Nearby Key Landmarks & Transit
          </div>
          <div className="flex flex-wrap gap-2">
            {location.nearbyLandmarks.map((landmark, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-medium text-slate-800"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{landmark}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationMapView;

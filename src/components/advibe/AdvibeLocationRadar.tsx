// FILE: src/components/advibe/AdvibeLocationRadar.tsx
import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Car,
  Clock,
  Compass,
  ExternalLink,
  Mountain,
  Plane,
  Building,
  Route
} from 'lucide-react';
import { AdVibeLocationPoint } from '../../types';

interface AdvibeLocationRadarProps {
  locationPoints: AdVibeLocationPoint[];
  coordinates: {
    lat: number;
    lng: number;
    zoom?: number;
  };
  city: string;
  area: string;
  address: string;
  projectTitle: string;
}

export const AdvibeLocationRadar: React.FC<AdvibeLocationRadarProps> = ({
  locationPoints,
  coordinates,
  city,
  area,
  address,
  projectTitle
}) => {
  const [selectedPoint, setSelectedPoint] = useState<AdVibeLocationPoint | null>(
    locationPoints[0] || null
  );
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank');
  };

  const getPointIcon = (category: string) => {
    if (category.includes('Highway') || category.includes('Access')) return Route;
    if (category.includes('Natural') || category.includes('Mountain')) return Mountain;
    if (category.includes('Airport')) return Plane;
    if (category.includes('Commercial') || category.includes('Retail')) return Building;
    return Compass;
  };

  return (
    <div className="w-full rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xs p-5 sm:p-6 text-slate-900">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Compass className="w-4 h-4" />
            <span>Strategic Connectivity &amp; Access</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            Location &amp; Commute Times • {city}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {address} • Lat: {coordinates.lat.toFixed(4)}, Lng:{' '}
            {coordinates.lng.toFixed(4)}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs">
            <button
              onClick={() => setMapType('roadmap')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                mapType === 'roadmap' ? 'bg-blue-600 text-white' : 'text-slate-600'
              }`}
            >
              Street Map
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                mapType === 'satellite' ? 'bg-blue-600 text-white' : 'text-slate-600'
              }`}
            >
              Satellite
            </button>
          </div>

          <button
            onClick={openGoogleMaps}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Google Maps</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Clean Map View without Glowing Circles */}
        <div className="lg:col-span-7 relative h-[340px] sm:h-[400px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex flex-col justify-between p-4">
          <div className="absolute inset-0 z-0">
            <img
              src={
                mapType === 'satellite'
                  ? 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
                  : 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1200&q=80'
              }
              alt="Map View"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 m-auto flex flex-col items-center text-center">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center text-white mb-2">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-200 shadow-md">
              <div className="text-xs font-extrabold text-slate-900">{projectTitle}</div>
              <div className="text-[10px] text-blue-600 font-bold">
                {area}, {city}
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-700 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200">
            <span className="font-bold">Verified GIS Coordinates</span>
            <span className="font-mono">
              {coordinates.lat.toFixed(5)}°N, {coordinates.lng.toFixed(5)}°E
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Nearby Landmarks ({locationPoints.length})</span>
          </div>

          <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
            {locationPoints.map(point => {
              const Icon = getPointIcon(point.category);
              const isSelected = selectedPoint?.id === point.id;

              return (
                <div
                  key={point.id}
                  onClick={() => setSelectedPoint(point)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-50 border-blue-400'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {point.name}
                      </div>
                      <div className="text-[10.5px] text-slate-500 truncate">
                        {point.category}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-3">
                    <div className="text-xs font-extrabold text-blue-600 flex items-center justify-end gap-1">
                      <Car className="w-3.5 h-3.5" />
                      <span>{point.driveTime}</span>
                    </div>
                    <div className="text-[10px] text-slate-500">{point.distance}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedPoint && (
            <div className="mt-2 bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-[10px] block">Destination:</span>
                <span className="font-bold text-slate-900">{selectedPoint.name}</span>
              </div>
              <button
                onClick={() => {
                  const query = encodeURIComponent(`${selectedPoint.name}, Pakistan`);
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${query}`,
                    '_blank'
                  );
                }}
                className="text-blue-600 hover:text-blue-700 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvibeLocationRadar;

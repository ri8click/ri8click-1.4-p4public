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
  Route, 
  CheckCircle2,
  Layers
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
  const [selectedPoint, setSelectedPoint] = useState<AdVibeLocationPoint | null>(locationPoints[0] || null);
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
    <div className="w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl p-4 sm:p-6 text-white">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
            <Compass className="w-4 h-4" />
            <span>Strategic Connectivity & Distances</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Prime Proximity Radar • {city}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {address} • Lat: {coordinates.lat.toFixed(4)}, Lng: {coordinates.lng.toFixed(4)}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex rounded-lg bg-slate-800 p-1 border border-slate-700 text-xs">
            <button
              onClick={() => setMapType('roadmap')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                mapType === 'roadmap' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Street Map
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                mapType === 'satellite' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Satellite
            </button>
          </div>

          <button
            onClick={openGoogleMaps}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Get Directions</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Radar Map View & List of Key Distances */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Interactive Map Canvas */}
        <div className="lg:col-span-7 relative h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 flex flex-col justify-between p-4 shadow-inner">
          
          {/* Background Map Simulation */}
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
            <img
              src={
                mapType === 'satellite'
                  ? 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
                  : 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1200&q=80'
              }
              alt="Map Background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Radar Waves Animation */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 h-72 rounded-full border border-blue-500/20 animate-ping opacity-30" />
            <div className="w-96 h-96 rounded-full border border-blue-500/15" />
            <div className="w-[500px] h-[500px] rounded-full border border-blue-500/10" />
          </div>

          {/* Center Project Beacon */}
          <div className="relative z-10 m-auto flex flex-col items-center text-center">
            <div className="relative flex items-center justify-center mb-2">
              <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-blue-400 opacity-75" />
              <div className="w-12 h-12 rounded-full bg-blue-600 border-2 border-white shadow-2xl flex items-center justify-center text-white">
                <MapPin className="w-6 h-6" />
              </div>
            </div>
            <div className="bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700 shadow-xl">
              <div className="text-xs font-bold text-white">{projectTitle}</div>
              <div className="text-[10px] text-amber-400 font-semibold">{area}, {city}</div>
            </div>
          </div>

          {/* Floating Live Coordinates & Satellite Badge */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-300 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>GIS Georeferenced Coordinates Active</span>
            </div>
            <span className="font-mono text-slate-400">
              {coordinates.lat.toFixed(5)}°N, {coordinates.lng.toFixed(5)}°E
            </span>
          </div>
        </div>

        {/* Right Landmarks & Commute Times List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>Key Arteries & Commute Landmarks ({locationPoints.length})</span>
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {locationPoints.map((point) => {
              const Icon = getPointIcon(point.category);
              const isSelected = selectedPoint?.id === point.id;

              return (
                <div
                  key={point.id}
                  onClick={() => setSelectedPoint(point)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500 shadow-xs'
                      : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">{point.name}</div>
                      <div className="text-[10.5px] text-slate-400 truncate">{point.category}</div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-3">
                    <div className="text-xs font-extrabold text-blue-400 flex items-center justify-end gap-1">
                      <Car className="w-3.5 h-3.5" />
                      <span>{point.driveTime}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">{point.distance}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Route Summary Card */}
          {selectedPoint && (
            <div className="mt-3 bg-slate-800/40 border border-slate-700/50 p-3 rounded-xl text-xs flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-[10px] block">Selected Destination:</span>
                <span className="font-bold text-white">{selectedPoint.name}</span>
              </div>
              <button
                onClick={() => {
                  const query = encodeURIComponent(`${selectedPoint.name}, Pakistan`);
                  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
                }}
                className="text-blue-400 hover:text-blue-300 text-[11px] font-semibold flex items-center gap-1"
              >
                <span>Inspect in Maps</span>
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

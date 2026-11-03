import React, { useState } from 'react';
import { MapPin, Navigation, Crosshair, Sparkles } from 'lucide-react';
import { LocationData, ProvinceCityData } from '../types';

interface LocationPickerMapProps {
  location: LocationData;
  onChangeLocation: (updated: LocationData) => void;
  provinceCityData: ProvinceCityData[];
}

export const LocationPickerMap: React.FC<LocationPickerMapProps> = ({
  location,
  onChangeLocation,
  provinceCityData
}) => {
  const [activeTab, setActiveTab] = useState<'map' | 'landmarks'>('map');
  const [newLandmark, setNewLandmark] = useState('');

  const lat = location.latitude ?? 33.7297;
  const lng = location.longitude ?? 72.8258;

  // Preset hotspots in Faisal Hills / Taxila / Islamabad / Lahore
  const presets = [
    { name: 'Icon Mall & Towers (Bahria Town Lahore)', lat: 31.3650, lng: 74.1850, city: 'Lahore', society: 'Bahria Town Lahore' },
    { name: 'DHA Phase 6 Raya Fairways (Lahore)', lat: 31.4685, lng: 74.4550, city: 'Lahore', society: 'DHA Phase 1-9 & Prism 9' },
    { name: 'Faisal Hills Main Gate', lat: 33.7297, lng: 72.8258, city: 'Taxila', society: 'Faisal Hills' },
    { name: 'Commercial Broadway', lat: 33.7340, lng: 72.8310, city: 'Taxila', society: 'Faisal Hills Commercial Broadway' },
    { name: 'Executive Block Viewpoint', lat: 33.7265, lng: 72.8205, city: 'Taxila', society: 'Faisal Hills Executive Block' },
    { name: 'Taxila Museum Interchange', lat: 33.7460, lng: 72.8390, city: 'Taxila', society: 'Museum Road Estates' },
    { name: 'B-17 Multi Gardens Gate 1', lat: 33.6820, lng: 72.8450, city: 'Islamabad', society: 'B-17 Multi Gardens' },
  ];

  const handleApplyPreset = (preset: typeof presets[0]) => {
    onChangeLocation({
      ...location,
      latitude: preset.lat,
      longitude: preset.lng,
      city: preset.city,
      society: preset.society,
    });
  };

  const handleAddLandmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLandmark.trim()) return;
    const current = location.nearbyLandmarks || [];
    onChangeLocation({
      ...location,
      nearbyLandmarks: [...current, newLandmark.trim()]
    });
    setNewLandmark('');
  };

  const handleRemoveLandmark = (idx: number) => {
    const current = location.nearbyLandmarks || [];
    onChangeLocation({
      ...location,
      nearbyLandmarks: current.filter((_, i) => i !== idx)
    });
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden space-y-3 p-3 sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-600 text-white">
            <Navigation className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800">
              Interactive GPS & Location Calibration
            </div>
            <div className="text-[10.5px] text-slate-500">
              Taxila & Margalla Foothills Precision Pin
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 text-[11px] font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('map')}
            className={`px-2.5 py-1 rounded-md transition-colors ${activeTab === 'map' ? 'bg-blue-600 text-white font-semibold shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            GPS Coordinates
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('landmarks')}
            className={`px-2.5 py-1 rounded-md transition-colors ${activeTab === 'landmarks' ? 'bg-blue-600 text-white font-semibold shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Landmarks ({location.nearbyLandmarks?.length || 0})
          </button>
        </div>
      </div>

      {activeTab === 'map' ? (
        <div className="space-y-3">
          {/* Quick Hotspot Presets */}
          <div className="space-y-1.5">
            <label className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Quick Hotspots (Faisal Hills & Taxila)</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-[11px] text-slate-700 font-medium transition-colors flex items-center gap-1"
                >
                  <MapPin className="w-2.5 h-2.5 text-blue-600" />
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Map Preview Canvas */}
          <div className="relative aspect-[21/9] sm:aspect-[24/9] rounded-xl overflow-hidden border border-slate-300 bg-slate-900 shadow-inner flex items-center justify-center">
            {/* Simulated Satellite/Terrain Map Grid */}
            <div 
              className="absolute inset-0 opacity-40 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-slate-900/80" />

            {/* Simulated Map Roads & Landscape */}
            <svg className="absolute inset-0 w-full h-full opacity-30 stroke-blue-400/40" fill="none">
              <path d="M-20 40 Q 200 120, 600 20 T 1200 90" strokeWidth="3" />
              <path d="M100 200 Q 400 10, 900 150" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M300 -20 L 450 300" strokeWidth="2" stroke="rgba(251, 191, 36, 0.4)" />
            </svg>

            {/* Center Pin Indicator */}
            <div className="relative z-10 flex flex-col items-center animate-bounce duration-1000">
              <div className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow-lg border border-white/20 whitespace-nowrap flex items-center gap-1">
                <Crosshair className="w-3 h-3 text-amber-300" />
                <span>{location.society || location.city || 'Pin Location'}</span>
              </div>
              <div className="w-0.5 h-3 bg-blue-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400 ring-4 ring-blue-500/30" />
            </div>

            {/* Coordinates Badge */}
            <div className="absolute bottom-2 left-2 z-10 bg-black/70 backdrop-blur-xs px-2 py-1 rounded text-[10px] text-slate-300 font-mono">
              GPS: {lat.toFixed(4)}° N, {lng.toFixed(4)}° E
            </div>
          </div>

          {/* Coordinate Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Latitude (°N)
              </label>
              <input
                type="number"
                step="0.0001"
                value={lat}
                onChange={e => onChangeLocation({ ...location, latitude: parseFloat(e.target.value) || 0 })}
                className="w-full px-2.5 py-1.5 bg-white rounded-lg border border-slate-300 text-xs font-mono text-slate-800 focus:outline-hidden focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Longitude (°E)
              </label>
              <input
                type="number"
                step="0.0001"
                value={lng}
                onChange={e => onChangeLocation({ ...location, longitude: parseFloat(e.target.value) || 0 })}
                className="w-full px-2.5 py-1.5 bg-white rounded-lg border border-slate-300 text-xs font-mono text-slate-800 focus:outline-hidden focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      ) : (
        /* Nearby Landmarks */
        <div className="space-y-3">
          <form onSubmit={handleAddLandmark} className="flex gap-2">
            <input
              type="text"
              value={newLandmark}
              onChange={e => setNewLandmark(e.target.value)}
              placeholder="e.g. Faisal Hills Club, Margalla Road, Taxila Museum..."
              className="flex-1 px-3 py-1.5 bg-white rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shrink-0"
            >
              Add Landmark
            </button>
          </form>

          <div className="flex flex-wrap gap-2">
            {(location.nearbyLandmarks || []).map((landmark, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 shadow-2xs"
              >
                <MapPin className="w-3 h-3 text-blue-500" />
                <span>{landmark}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveLandmark(idx)}
                  className="text-slate-400 hover:text-rose-500 font-bold ml-1"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPickerMap;

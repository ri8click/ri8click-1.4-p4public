// FILE: src/components/advibe/AdvibeInteractiveMasterPlan.tsx
import React, { useState, useRef } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  MapPin,
  ExternalLink,
  Check,
  X
} from 'lucide-react';
import { AdVibeMasterPlan, AdVibeHotspot, Property } from '../../types';

interface AdvibeInteractiveMasterPlanProps {
  masterPlan: AdVibeMasterPlan;
  projectTitle: string;
  themePrimaryColor?: string;
  properties?: Property[];
  onSelectProperty?: (property: Property) => void;
}

export const AdvibeInteractiveMasterPlan: React.FC<AdvibeInteractiveMasterPlanProps> = ({
  masterPlan,
  projectTitle,
  properties = [],
  onSelectProperty
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [selectedHotspot, setSelectedHotspot] = useState<AdVibeHotspot | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'master' | 'satellite'>('master');
  const [showPins, setShowPins] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredHotspots = masterPlan.hotspots.filter(h => {
    if (activeCategory === 'All') return true;
    return h.category.toLowerCase().includes(activeCategory.toLowerCase());
  });

  const findLinkedProperty = (propertyId?: string) => {
    if (!propertyId) return null;
    return properties.find(p => p.id === propertyId);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm h-[540px] md:h-[640px] flex flex-col"
    >
      {/* Top Clean Light Bar */}
      <div className="px-4 py-3 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 z-20">
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', 'Residential', 'Commercial', 'Civic', 'Park'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={() => setShowPins(prev => !prev)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
          >
            {showPins ? 'Hide Sector Pins' : 'Show Sector Pins'}
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          {masterPlan.satelliteImageUrl && (
            <div className="flex rounded-xl bg-slate-100 p-0.5 border border-slate-200 text-xs">
              <button
                onClick={() => setViewMode('master')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                  viewMode === 'master' ? 'bg-blue-600 text-white' : 'text-slate-600'
                }`}
              >
                Layout Plan
              </button>
              <button
                onClick={() => setViewMode('satellite')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                  viewMode === 'satellite' ? 'bg-blue-600 text-white' : 'text-slate-600'
                }`}
              >
                Satellite
              </button>
            </div>
          )}

          <button
            onClick={() => setZoom(prev => Math.min(prev + 0.25, 2.5))}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(prev => Math.max(prev - 0.25, 0.85))}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(1)}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              if (!document.fullscreenElement) {
                containerRef.current?.requestFullscreen().catch(() => {});
              } else {
                document.exitFullscreen().catch(() => {});
              }
            }}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Map Canvas — Clean Static Pins without Glowing/Pulsing Circles */}
      <div className="flex-1 w-full overflow-hidden flex items-center justify-center bg-slate-100 relative">
        <div
          className="relative transition-transform duration-200 ease-out origin-center"
          style={{ transform: `scale(${zoom})` }}
        >
          <img
            src={
              viewMode === 'satellite' && masterPlan.satelliteImageUrl
                ? masterPlan.satelliteImageUrl
                : masterPlan.imageUrl
            }
            alt={`${projectTitle} Master Plan`}
            className="w-full max-w-[1200px] h-auto object-contain rounded-xl pointer-events-none"
          />

          {showPins &&
            filteredHotspots.map(hotspot => (
              <div
                key={hotspot.id}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                onClick={e => {
                  e.stopPropagation();
                  setSelectedHotspot(hotspot);
                }}
              >
                <div className="px-2.5 py-1 rounded-lg bg-white text-slate-900 border border-slate-300 shadow-md text-[11px] font-bold flex items-center gap-1 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors">
                  <MapPin className="w-3 h-3 text-blue-600 group-hover:text-white" />
                  <span>{hotspot.title}</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Selected Sector Drawer */}
      {selectedHotspot && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-96 z-30 bg-white rounded-2xl border border-slate-200 p-4 shadow-xl text-slate-900">
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                {selectedHotspot.category} • {selectedHotspot.status}
              </span>
              <h4 className="text-sm font-extrabold text-slate-900 mt-1">
                {selectedHotspot.title}
              </h4>
            </div>
            <button
              onClick={() => setSelectedHotspot(null)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
            {selectedHotspot.description}
          </p>

          {selectedHotspot.linkedPropertyId &&
            (() => {
              const prop = findLinkedProperty(selectedHotspot.linkedPropertyId);
              if (!prop) return null;
              return (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div
                    onClick={() => onSelectProperty && onSelectProperty(prop)}
                    className="bg-slate-50 hover:bg-blue-50 p-2 rounded-xl border border-slate-200 cursor-pointer flex items-center gap-2.5"
                  >
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1 text-left">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {prop.title}
                      </div>
                      <div className="text-[11px] text-blue-600 font-bold">
                        {prop.priceFormatted}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              );
            })()}
        </div>
      )}
    </div>
  );
};

export default AdvibeInteractiveMasterPlan;

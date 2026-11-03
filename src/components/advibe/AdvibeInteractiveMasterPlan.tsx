import React, { useState, useRef } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw, 
  MapPin, 
  Layers, 
  Compass, 
  ExternalLink, 
  Check, 
  X,
  Building,
  TreePine,
  Briefcase,
  Home
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
  themePrimaryColor = '#2563eb',
  properties = [],
  onSelectProperty
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedHotspot, setSelectedHotspot] = useState<AdVibeHotspot | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'master' | 'satellite'>('master');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.3, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.3, 0.8));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const filteredHotspots = masterPlan.hotspots.filter(h => {
    if (activeCategory === 'All') return true;
    return h.category.toLowerCase().includes(activeCategory.toLowerCase());
  });

  const getHotspotColor = (category: string) => {
    if (category.includes('Residential')) return 'bg-blue-500 ring-blue-300';
    if (category.includes('Commercial')) return 'bg-amber-500 ring-amber-300';
    if (category.includes('Park') || category.includes('Green')) return 'bg-emerald-500 ring-emerald-300';
    if (category.includes('Civic') || category.includes('Mosque')) return 'bg-purple-500 ring-purple-300';
    return 'bg-rose-500 ring-rose-300';
  };

  const findLinkedProperty = (propertyId?: string) => {
    if (!propertyId) return null;
    return properties.find(p => p.id === propertyId);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl transition-all ${
        isFullscreen ? 'h-screen p-4' : 'h-[620px] md:h-[720px]'
      }`}
    >
      {/* Top Controls Ribbon */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 bg-slate-900/85 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-700/60 shadow-lg text-white">
        
        {/* Title & Legend Indicator */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-blue-400">
            <Compass className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="text-xs font-bold tracking-wide uppercase text-slate-300">
              {projectTitle} • Interactive GIS Master Plan
            </div>
            <div className="text-[11px] text-slate-400">
              Click any colored beacon to inspect sector breakdown, plot counts & linked inventory
            </div>
          </div>
        </div>

        {/* View Mode & Filter Toggles */}
        <div className="flex items-center gap-2">
          {masterPlan.satelliteImageUrl && (
            <div className="flex rounded-lg bg-slate-800 p-0.5 border border-slate-700 text-xs">
              <button
                onClick={() => setViewMode('master')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                  viewMode === 'master' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Plan View
              </button>
              <button
                onClick={() => setViewMode('satellite')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                  viewMode === 'satellite' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Satellite
              </button>
            </div>
          )}

          {/* Zoom & Fullscreen Buttons */}
          <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-lg border border-slate-700">
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded-md hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded-md hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-md hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-md hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills Ribbon */}
      <div className="absolute top-20 left-4 z-20 flex flex-wrap items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
        {['All', 'Residential', 'Commercial', 'Civic', 'Park'].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="text-slate-500 text-[10px] pl-1">
          Showing {filteredHotspots.length} hotspots
        </span>
      </div>

      {/* Main Map Canvas / Plan Image */}
      <div className="w-full h-full overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
        <div 
          className="relative transition-transform duration-200 ease-out origin-center"
          style={{
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
          }}
        >
          <img
            src={viewMode === 'satellite' && masterPlan.satelliteImageUrl ? masterPlan.satelliteImageUrl : masterPlan.imageUrl}
            alt="Master Plan Map"
            className="w-full max-w-[1300px] h-auto object-contain rounded-xl shadow-2xl pointer-events-none"
            loading="lazy"
          />

          {/* Interactive Clickable Hotspots */}
          {filteredHotspots.map((hotspot) => {
            const isSelected = selectedHotspot?.id === hotspot.id;
            const beaconColor = getHotspotColor(hotspot.category);

            return (
              <div
                key={hotspot.id}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedHotspot(hotspot);
                }}
              >
                {/* Pulsing Beacon Circle */}
                <div className="relative flex items-center justify-center">
                  <span className={`animate-ping absolute inline-flex h-8 w-8 rounded-full opacity-75 ${beaconColor}`} />
                  <span className={`relative inline-flex rounded-full h-6 w-6 ring-4 ring-white/30 items-center justify-center text-white shadow-xl ${beaconColor}`}>
                    <MapPin className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Floating Tag Label on Hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap z-20">
                  <div className="bg-slate-900/95 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xl border border-slate-700 flex items-center gap-1.5">
                    <span>{hotspot.title}</span>
                    <span className="text-[9px] text-amber-400 font-mono">({hotspot.status})</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Hotspot Detail Card (Bottom Left Drawer) */}
      {selectedHotspot && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-96 z-30 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700 p-4 shadow-2xl text-white animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {selectedHotspot.category}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  selectedHotspot.status === 'Available' ? 'bg-emerald-500/20 text-emerald-400' :
                  selectedHotspot.status === 'Booking Fast' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-rose-500/20 text-rose-400'
                }`}>
                  {selectedHotspot.status}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mt-1">{selectedHotspot.title}</h4>
            </div>

            <button
              onClick={() => setSelectedHotspot(null)}
              className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
            {selectedHotspot.description}
          </p>

          {/* Inventory Stats */}
          {(selectedHotspot.totalPlots || selectedHotspot.availablePlots) && (
            <div className="grid grid-cols-2 gap-2 mt-3 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Total Plots / Units:</span>
                <span className="font-bold text-white">{selectedHotspot.totalPlots || 'N/A'}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Available Now:</span>
                <span className="font-bold text-emerald-400">{selectedHotspot.availablePlots || 'N/A'}</span>
              </div>
            </div>
          )}

          {/* Direct Link to Existing Property Record if configured */}
          {selectedHotspot.linkedPropertyId && (() => {
            const prop = findLinkedProperty(selectedHotspot.linkedPropertyId);
            if (!prop) return null;

            return (
              <div className="mt-3 pt-3 border-t border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1">
                  <span>Linked GIS Property Record</span>
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <div 
                  onClick={() => onSelectProperty && onSelectProperty(prop)}
                  className="bg-slate-800/80 hover:bg-slate-800 p-2 rounded-xl border border-slate-700 cursor-pointer transition-colors flex items-center gap-2.5"
                >
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1 text-left">
                    <div className="text-xs font-bold text-white truncate">{prop.title}</div>
                    <div className="text-[11px] text-blue-400 font-semibold">{prop.priceFormatted}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Legend Footer */}
      {masterPlan.legend && masterPlan.legend.length > 0 && (
        <div className="absolute bottom-4 right-4 z-20 hidden md:flex items-center gap-3 bg-slate-900/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 text-[11px] text-slate-300">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Legend:</span>
          {masterPlan.legend.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span>{item.category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvibeInteractiveMasterPlan;

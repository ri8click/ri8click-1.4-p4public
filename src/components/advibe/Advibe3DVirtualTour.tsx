import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  ZoomIn,
  ZoomOut,
  Layers,
  X,
  MapPin
} from 'lucide-react';
import { AdVibeProject } from '../../types';

interface Advibe3DVirtualTourProps {
  project: AdVibeProject;
  embedded?: boolean;
  onClose?: () => void;
  className?: string;
}

export interface TourScene {
  id: string;
  name: string;
  category?: string;
  imageUrl: string;
  nightImageUrl?: string;
  description?: string;
  hotspots?: {
    id: string;
    x: number;
    y: number;
    title: string;
    description?: string;
    actionUrl?: string;
  }[];
}

const DEFAULT_PROJECT_SCENES: TourScene[] = [
  {
    id: 'scene-1',
    name: 'Main Podium & Architectural Atrium',
    category: 'Exterior & Lobby',
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2600&q=85',
    nightImageUrl:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2600&q=85',
    description:
      'Triple-height reception lobby featuring imported marble, high-speed elevators, and acoustic UPVC double glazing.',
    hotspots: [
      {
        id: 'spot-1',
        x: 28,
        y: 44,
        title: 'Soundproof German UPVC Facade',
        description:
          'Multi-chambered profile with 24mm tempered double glazing by Ri8Click UPVC & Aluminum Windows.'
      },
      {
        id: 'spot-2',
        x: 62,
        y: 52,
        title: 'High-Speed Elevators',
        description:
          'Direct elevator bank accessing luxury residences, executive offices, and basement parking.'
      }
    ]
  },
  {
    id: 'scene-2',
    name: 'Executive Show Suite / Living Lounge',
    category: 'Residence Interior',
    imageUrl:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2600&q=85',
    nightImageUrl:
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2600&q=85',
    description:
      'Designer open-plan living and dining lounge with 11-ft clear ceilings and smart home automation.',
    hotspots: []
  }
];

export const Advibe3DVirtualTour: React.FC<Advibe3DVirtualTourProps> = ({
  project,
  embedded = false,
  onClose,
  className = ''
}) => {
  const scenes = useMemo<TourScene[]>(() => {
    if (
      Array.isArray(project.virtualTour?.scenes) &&
      project.virtualTour.scenes.length > 0
    ) {
      return project.virtualTour.scenes;
    }
    if (project.virtualTour?.url && project.virtualTour.provider !== 'video') {
      return [
        {
          id: 'scene-primary',
          name: project.virtualTour.title || `${project.title} — Main 360° View`,
          category: '360° Panorama',
          imageUrl: project.virtualTour.url,
          nightImageUrl:
            project.gallery?.[1]?.url || DEFAULT_PROJECT_SCENES[0].nightImageUrl,
          description: project.tagline,
          hotspots: DEFAULT_PROJECT_SCENES[0].hotspots
        },
        ...DEFAULT_PROJECT_SCENES
      ];
    }
    return DEFAULT_PROJECT_SCENES;
  }, [project]);

  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const initialAutoRun =
    project.virtualTour?.autoRun !== undefined
      ? project.virtualTour.autoRun
      : true;
  const [isAutoRunning, setIsAutoRunning] = useState<boolean>(initialAutoRun);
  const [rotationSpeed, setRotationSpeed] = useState<number>(
    project.virtualTour?.rotationSpeed || 1.0
  );
  const [isNightMode, setIsNightMode] = useState<boolean>(false);
  const [panOffset, setPanOffset] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showMarkers, setShowMarkers] = useState<boolean>(true);
  const [selectedHotspot, setSelectedHotspot] = useState<any | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const currentOffsetRef = useRef<number>(0);

  useEffect(() => {
    if (activeSceneIdx >= scenes.length) {
      setActiveSceneIdx(0);
    }
  }, [scenes.length, activeSceneIdx]);

  const activeScene = scenes[activeSceneIdx] || scenes[0];

  useEffect(() => {
    if (!isAutoRunning) return;
    let animFrameId: number;
    let lastTimestamp = performance.now();

    const step = (now: number) => {
      const delta = (now - lastTimestamp) / 1000;
      lastTimestamp = now;
      setPanOffset(prev => {
        const next = (prev + delta * 2.2 * rotationSpeed) % 100;
        currentOffsetRef.current = next;
        return next;
      });
      animFrameId = requestAnimationFrame(step);
    };

    animFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrameId);
  }, [isAutoRunning, rotationSpeed]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    currentOffsetRef.current = panOffset;
    if (isAutoRunning) setIsAutoRunning(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    const sensitivity = 0.08 / zoomLevel;
    const nextOffset =
      (currentOffsetRef.current - deltaX * sensitivity + 1000) % 100;
    setPanOffset(nextOffset);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    currentOffsetRef.current = panOffset;
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const activeImageUrl =
    isNightMode && activeScene.nightImageUrl
      ? activeScene.nightImageUrl
      : activeScene.imageUrl;

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 text-white select-none ${
        embedded ? 'h-[460px] md:h-[540px]' : 'h-full min-h-[480px]'
      } ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ cursor: isDraggingRef.current ? 'grabbing' : 'grab' }}
    >
      {/* 360° Panorama Viewport */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden transition-transform duration-200"
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'center center'
        }}
      >
        <div
          className="absolute inset-0 w-[300%] h-full flex"
          style={{
            transform: `translateX(-${panOffset}%)`,
            willChange: 'transform'
          }}
        >
          <img
            src={activeImageUrl}
            alt={activeScene.name}
            className="w-1/3 h-full object-cover object-center pointer-events-none"
            draggable={false}
          />
          <img
            src={activeImageUrl}
            alt={activeScene.name}
            className="w-1/3 h-full object-cover object-center pointer-events-none"
            draggable={false}
          />
          <img
            src={activeImageUrl}
            alt={activeScene.name}
            className="w-1/3 h-full object-cover object-center pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Info Labels */}
        {showMarkers &&
          activeScene.hotspots &&
          activeScene.hotspots.map(spot => {
            const effectiveX = (spot.x - panOffset + 100) % 100;
            return (
              <div
                key={spot.id}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${effectiveX}%`, top: `${spot.y}%` }}
                onClick={e => {
                  e.stopPropagation();
                  setSelectedHotspot(spot);
                }}
              >
                <div className="px-2.5 py-1 rounded-lg bg-white/95 text-slate-900 border border-slate-300 shadow-md text-[11px] font-bold flex items-center gap-1 hover:bg-blue-600 hover:text-white transition-colors">
                  <MapPin className="w-3 h-3 text-blue-600" />
                  <span>{spot.title}</span>
                </div>
              </div>
            );
          })}
      </div>

      {/* Top Header Bar */}
      <div className="absolute top-0 inset-x-0 z-30 p-3 sm:p-4 flex items-center justify-between gap-2 pointer-events-none bg-gradient-to-b from-slate-950/70 to-transparent">
        <div className="bg-white/95 text-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm pointer-events-auto text-left">
          <div className="text-[10px] text-blue-600 uppercase font-extrabold">
            360° Architectural View ({activeSceneIdx + 1} / {scenes.length})
          </div>
          <h3 className="text-xs sm:text-sm font-bold truncate max-w-[200px] sm:max-w-xs">
            {activeScene.name}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          {activeScene.hotspots && activeScene.hotspots.length > 0 && (
            <button
              type="button"
              onClick={() => setShowMarkers(prev => !prev)}
              className="px-2.5 py-1.5 rounded-xl bg-white/95 text-slate-800 hover:bg-white text-[11px] font-bold border border-slate-200 shadow-sm cursor-pointer"
            >
              {showMarkers ? 'Hide Labels' : 'Show Labels'}
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsNightMode(!isNightMode)}
            className="p-2 rounded-xl bg-white/95 text-slate-800 hover:bg-white border border-slate-200 shadow-sm cursor-pointer"
            title="Toggle Day / Evening View"
          >
            {isNightMode ? (
              <Moon className="w-4 h-4 text-indigo-600" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-white/95 text-slate-800 hover:bg-white border border-slate-200 shadow-sm cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-rose-600 text-white hover:bg-rose-700 shadow-sm cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Selected Label Detail Card */}
      {selectedHotspot && (
        <div
          className="absolute inset-x-4 bottom-20 z-40 max-w-md mx-auto bg-white text-slate-900 border border-slate-200 rounded-2xl p-4 shadow-xl pointer-events-auto text-left"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900">
              {selectedHotspot.title}
            </h4>
            <button
              onClick={() => setSelectedHotspot(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            {selectedHotspot.description}
          </p>
          <div className="mt-3 flex justify-end">
            <button
              onClick={() => setSelectedHotspot(null)}
              className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Bottom Control Dock */}
      <div className="absolute bottom-0 inset-x-0 z-30 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none bg-gradient-to-t from-slate-950/80 to-transparent">
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pointer-events-auto bg-white/95 p-1 rounded-xl border border-slate-200 shadow-md">
          {scenes.map((scene, idx) => (
            <button
              key={scene.id}
              type="button"
              onClick={() => {
                setActiveSceneIdx(idx);
                setSelectedHotspot(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSceneIdx === idx
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{scene.name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto bg-white/95 px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-md text-slate-800">
          <button
            type="button"
            onClick={() => setIsAutoRunning(!isAutoRunning)}
            className={`px-3 py-1 rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer ${
              isAutoRunning
                ? 'bg-amber-400 text-slate-950'
                : 'bg-blue-600 text-white'
            }`}
          >
            {isAutoRunning ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>{isAutoRunning ? 'Pause' : 'Auto Pan'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const speeds = [0.5, 1.0, 1.5, 2.0];
              const nextIdx = (speeds.indexOf(rotationSpeed) + 1) % speeds.length;
              setRotationSpeed(speeds[nextIdx]);
            }}
            className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold cursor-pointer"
          >
            {rotationSpeed}x
          </button>

          <button
            type="button"
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.0))}
            disabled={zoomLevel >= 2.0}
            className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 1.0))}
            disabled={zoomLevel <= 1.0}
            className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 cursor-pointer"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Advibe3DVirtualTour;

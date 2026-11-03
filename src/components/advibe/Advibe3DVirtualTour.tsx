import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  RotateCw, 
  Maximize2, 
  Minimize2, 
  Sun, 
  Moon, 
  ZoomIn, 
  ZoomOut, 
  Compass, 
  Info, 
  MapPin, 
  Layers, 
  Sparkles, 
  Check, 
  X, 
  Volume2, 
  VolumeX, 
  Share2, 
  Eye, 
  ArrowRight,
  Sliders
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
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2600&q=85',
    nightImageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2600&q=85',
    description: 'Triple-height reception lobby featuring imported Italian marble, high-speed capsule elevators, and acoustic UPVC double glazing.',
    hotspots: [
      {
        id: 'spot-1',
        x: 28,
        y: 44,
        title: 'Soundproof German UPVC Facade',
        description: 'Multi-chambered profile with 24mm tempered double glazing by Ri8Click UPVC & Aluminum Windows.',
        actionUrl: '#upvc'
      },
      {
        id: 'spot-2',
        x: 62,
        y: 52,
        title: 'High-Speed Capsule Elevators',
        description: 'Direct elevator bank accessing luxury residences, executive offices, and basement concierge valet parking.'
      },
      {
        id: 'spot-3',
        x: 82,
        y: 38,
        title: 'Smart Central HVAC & Air Filtration',
        description: 'Variable Refrigerant Flow (VRF) system ensuring energy-efficient climate control and Margalla fresh air.'
      }
    ]
  },
  {
    id: 'scene-2',
    name: 'Executive Show Suite / Living Lounge',
    category: 'Residence Interior',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2600&q=85',
    nightImageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2600&q=85',
    description: 'Designer open-plan living and dining lounge with 11-ft clear ceilings and integrated smart home automation.',
    hotspots: [
      {
        id: 'spot-4',
        x: 35,
        y: 48,
        title: 'Smart Automation Touch Console',
        description: 'Control automated ambient lighting, climate zones, smart door locks, and motorized solar shades.'
      },
      {
        id: 'spot-5',
        x: 75,
        y: 42,
        title: 'Italian Quartz Chef Kitchen',
        description: 'Fitted with German built-in induction hobs, designer island bar, and hidden pantry storage.'
      }
    ]
  },
  {
    id: 'scene-3',
    name: 'Panoramic Margalla Skyline Balcony',
    category: 'Terrace & View',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2600&q=85',
    nightImageUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=2600&q=85',
    description: 'Unobstructed 180-degree vista overlooking the lush Margalla mountain range and master-planned boulevards.',
    hotspots: [
      {
        id: 'spot-6',
        x: 48,
        y: 36,
        title: 'Margalla Ridge Panoramic Deck',
        description: 'Seamless glass balustrades with weather-resistant composite timber decking and sunrise viewing area.'
      },
      {
        id: 'spot-7',
        x: 72,
        y: 58,
        title: 'Outdoor Teppanyaki Lounge',
        description: 'Equipped with gas provisions and ambient LED footlights for evening entertainment.'
      }
    ]
  }
];

export const Advibe3DVirtualTour: React.FC<Advibe3DVirtualTourProps> = ({
  project,
  embedded = false,
  onClose,
  className = ''
}) => {
  // Configured scenes or default scenes
  const scenes: TourScene[] = project.virtualTour?.scenes && project.virtualTour.scenes.length > 0
    ? project.virtualTour.scenes
    : DEFAULT_PROJECT_SCENES;

  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  
  // Default: Auto Run is enabled by default as requested
  const initialAutoRun = project.virtualTour?.autoRun !== undefined ? project.virtualTour.autoRun : true;
  const [isAutoRunning, setIsAutoRunning] = useState<boolean>(initialAutoRun);
  const [rotationSpeed, setRotationSpeed] = useState<number>(project.virtualTour?.rotationSpeed || 1.0);
  
  // Day / Night Mode
  const [isNightMode, setIsNightMode] = useState<boolean>(false);

  // Pan Offset (0 to 100% of panoramic image)
  const [panOffset, setPanOffset] = useState<number>(0);
  
  // Zoom Level (1.0x to 2.0x)
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);

  // Fullscreen State
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Active Hotspot Popover
  const [selectedHotspot, setSelectedHotspot] = useState<any | null>(null);

  // Sound ambiance state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  // Dragging interaction state
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const currentOffsetRef = useRef<number>(0);
  const userIdleTimerRef = useRef<any>(null);

  const activeScene = scenes[activeSceneIdx] || scenes[0];

  // Continuous Auto-Run Animation Loop
  useEffect(() => {
    if (!isAutoRunning) return;

    let animFrameId: number;
    let lastTimestamp = performance.now();

    const step = (now: number) => {
      const delta = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      // Increment pan position smoothly based on rotation speed
      setPanOffset(prev => {
        const next = (prev + delta * 2.5 * rotationSpeed) % 100;
        currentOffsetRef.current = next;
        return next;
      });

      animFrameId = requestAnimationFrame(step);
    };

    animFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [isAutoRunning, rotationSpeed]);

  // Handle ambient architectural hum audio
  useEffect(() => {
    if (soundEnabled) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx && !audioContextRef.current) {
          const ctx = new AudioCtx();
          audioContextRef.current = ctx;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(130.81, ctx.currentTime); // C3 warm tone
          gain.gain.setValueAtTime(0.015, ctx.currentTime); // very soft
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          oscillatorRef.current = osc;
        }
      } catch (e) {
        console.warn('AudioContext not allowed without gesture', e);
      }
    } else {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        } catch {}
        oscillatorRef.current = null;
      }
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch {}
        audioContextRef.current = null;
      }
    }

    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
        } catch {}
      }
    };
  }, [soundEnabled]);

  // Mouse / Touch Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    currentOffsetRef.current = panOffset;
    
    // Temporarily pause auto-run when user starts dragging
    if (isAutoRunning) {
      setIsAutoRunning(false);
    }
    
    if (userIdleTimerRef.current) {
      clearTimeout(userIdleTimerRef.current);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    
    // 1px delta corresponds to ~0.08% pan shift
    const sensitivity = 0.08 / zoomLevel;
    const nextOffset = (currentOffsetRef.current - deltaX * sensitivity + 1000) % 100;
    setPanOffset(nextOffset);
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    currentOffsetRef.current = panOffset;

    // After 4 seconds of idle, automatically resume auto-run if default was true
    if (initialAutoRun) {
      userIdleTimerRef.current = setTimeout(() => {
        setIsAutoRunning(true);
      }, 4000);
    }
  };

  // Toggle Fullscreen
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

  // Compass degrees calculated from current pan
  const compassDegree = Math.round((panOffset / 100) * 360);
  const getFacingDirection = (deg: number) => {
    if (deg >= 337.5 || deg < 22.5) return 'N (Margalla Facing)';
    if (deg >= 22.5 && deg < 67.5) return 'NE (Executive Ridge)';
    if (deg >= 67.5 && deg < 112.5) return 'E (Sunrise Boulevard)';
    if (deg >= 112.5 && deg < 157.5) return 'SE (Commercial Hub)';
    if (deg >= 157.5 && deg < 202.5) return 'S (Main Entrance Atrium)';
    if (deg >= 202.5 && deg < 247.5) return 'SW (Clubhouse & Park)';
    if (deg >= 247.5 && deg < 292.5) return 'W (Sunset Valley)';
    return 'NW (Hills View)';
  };

  const activeImageUrl = (isNightMode && activeScene.nightImageUrl)
    ? activeScene.nightImageUrl
    : activeScene.imageUrl;

  return (
    <div 
      ref={containerRef}
      id="advibe-3d-tour-container"
      className={`relative w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 text-white select-none shadow-2xl ${
        embedded ? 'h-[620px] md:h-[720px]' : 'h-full min-h-[500px]'
      } ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ cursor: isDraggingRef.current ? 'grabbing' : 'grab' }}
    >
      {/* Dynamic 360 Panorama Viewport */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden transition-transform duration-200"
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'center center'
        }}
      >
        {/* Seamless panoramic background tiling */}
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
            className="w-1/3 h-full object-cover object-center pointer-events-none filter brightness-105 contrast-105"
            draggable={false}
          />
          <img 
            src={activeImageUrl} 
            alt={activeScene.name} 
            className="w-1/3 h-full object-cover object-center pointer-events-none filter brightness-105 contrast-105"
            draggable={false}
          />
          <img 
            src={activeImageUrl} 
            alt={activeScene.name} 
            className="w-1/3 h-full object-cover object-center pointer-events-none filter brightness-105 contrast-105"
            draggable={false}
          />
        </div>

        {/* Ambient lighting lens & vignette */}
        <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-slate-950/15 to-slate-950/70" />

        {/* Interactive Hotspot Beacons */}
        {activeScene.hotspots && activeScene.hotspots.map((spot) => {
          // Adjust hotspot position relative to the repeating panorama pan
          const effectiveX = ((spot.x - panOffset + 100) % 100);
          
          return (
            <div
              key={spot.id}
              className="absolute z-20 group -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110"
              style={{
                left: `${effectiveX}%`,
                top: `${spot.y}%`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedHotspot(spot);
              }}
            >
              {/* Radar Wave Pulse */}
              <span className="absolute -inset-2.5 rounded-full bg-amber-400/40 animate-ping" />
              <span className="absolute -inset-1 rounded-full bg-blue-500/50 animate-pulse" />
              
              {/* Beacon Core Button */}
              <button 
                className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-bold flex items-center justify-center shadow-xl border-2 border-white"
                title={spot.title}
              >
                <Sparkles className="w-4 h-4 fill-current" />
              </button>

              {/* Floating Tooltip Snippet */}
              <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-10 pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-lg border border-amber-400/40 text-[11px] font-bold text-amber-300 shadow-xl">
                {spot.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* TOP OVERLAY HUD: Branding & Status Bar */}
      <div 
        className="absolute top-0 inset-x-0 z-30 p-4 sm:p-5 flex items-center justify-between gap-3 pointer-events-none bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent"
      >
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="bg-slate-900/85 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 shadow-xl flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold flex items-center gap-1">
                <span>AdVibe 3D Virtual Tour</span>
                <span className="bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded text-[9px]">4K 360°</span>
              </div>
              <h3 className="text-xs sm:text-sm font-black text-white truncate max-w-[200px] sm:max-w-xs">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Compass & Facing Indicator */}
          <div className="hidden md:flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/10 text-xs text-slate-300">
            <Compass className="w-4 h-4 text-blue-400 animate-spin-slow" />
            <span className="font-mono font-bold text-amber-300">{compassDegree}°</span>
            <span className="text-[11px] text-slate-400 font-medium">{getFacingDirection(compassDegree)}</span>
          </div>
        </div>

        {/* Top Right Action Tools */}
        <div className="flex items-center gap-2 pointer-events-auto">
          
          {/* Day / Night Lighting Switch */}
          <button
            onClick={() => setIsNightMode(!isNightMode)}
            className={`p-2.5 rounded-xl border transition-all shadow-lg flex items-center gap-1.5 text-xs font-bold ${
              isNightMode 
                ? 'bg-indigo-900/80 border-indigo-400 text-indigo-200' 
                : 'bg-slate-900/80 border-white/20 text-amber-300 hover:bg-slate-800'
            }`}
            title={isNightMode ? 'Switch to Golden Hour / Daylight' : 'Switch to Twilight Night Lighting'}
          >
            {isNightMode ? <Moon className="w-4 h-4 text-indigo-300" /> : <Sun className="w-4 h-4 text-amber-400" />}
            <span className="hidden sm:inline">{isNightMode ? 'Twilight Night' : 'Daylight Golden Hour'}</span>
          </button>

          {/* Audio Ambiance Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2.5 rounded-xl border transition-all shadow-lg ${
              soundEnabled 
                ? 'bg-emerald-900/80 border-emerald-400 text-emerald-200' 
                : 'bg-slate-900/80 border-white/20 text-slate-300 hover:text-white'
            }`}
            title={soundEnabled ? 'Mute Architectural Ambiance' : 'Play Soft Architectural Ambiance'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/20 text-white transition-all shadow-lg"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Walkthrough'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close Modal Button (if provided) */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white transition-all shadow-lg"
              title="Close Tour"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* AUTO-RUN STATUS BADGE (Top Center) */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className={`px-3.5 py-1.5 rounded-full border backdrop-blur-md shadow-2xl flex items-center gap-2 transition-all ${
          isAutoRunning 
            ? 'bg-blue-900/80 border-blue-400/60 text-blue-200' 
            : 'bg-slate-900/70 border-slate-700 text-slate-400'
        }`}>
          {isAutoRunning ? (
            <>
              <RotateCw className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span className="text-[11px] font-bold text-white tracking-wide">
                Auto-Run Tour Active ({rotationSpeed}x)
              </span>
              <span className="text-[9px] text-blue-300">Drag to control</span>
            </>
          ) : (
            <>
              <Pause className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-medium text-slate-300">
                Manual Pan Mode (Click Auto-Run to Resume)
              </span>
            </>
          )}
        </div>
      </div>

      {/* HOTSPOT POPUP MODAL (When beacon is clicked) */}
      {selectedHotspot && (
        <div 
          className="absolute inset-x-4 bottom-28 sm:bottom-24 z-40 max-w-md mx-auto bg-slate-900/95 backdrop-blur-xl border border-amber-400/50 rounded-3xl p-5 shadow-2xl text-white animate-in zoom-in-95 pointer-events-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">3D Hotspot Feature</span>
                <h4 className="text-sm font-bold text-white">{selectedHotspot.title}</h4>
              </div>
            </div>
            <button
              onClick={() => setSelectedHotspot(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 mt-3 leading-relaxed">
            {selectedHotspot.description || 'Engineered with premium materials and verified structural clearance.'}
          </p>

          <div className="mt-4 pt-3 flex items-center justify-between border-t border-slate-800 text-xs">
            <span className="text-[11px] text-emerald-400 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>Certified Architecture</span>
            </span>
            
            <button
              onClick={() => setSelectedHotspot(null)}
              className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors shadow-md"
            >
              Continue Tour
            </button>
          </div>
        </div>
      )}

      {/* BOTTOM FLOATING CONTROL DOCK */}
      <div 
        className="absolute bottom-0 inset-x-0 z-30 p-3 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent"
      >
        {/* Scenes Selector Pill Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pointer-events-auto bg-slate-900/90 backdrop-blur-xl p-1.5 rounded-2xl border border-white/20 shadow-2xl">
          {scenes.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => {
                setActiveSceneIdx(idx);
                setSelectedHotspot(null);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeSceneIdx === idx
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg ring-1 ring-blue-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{scene.name}</span>
            </button>
          ))}
        </div>

        {/* Floating Player & Zoom Control Panel */}
        <div className="flex items-center gap-2 pointer-events-auto bg-slate-900/90 backdrop-blur-xl px-3 py-2 rounded-2xl border border-white/20 shadow-2xl">
          
          {/* Play / Pause Auto-Run */}
          <button
            id="advibe-autorun-toggle-btn"
            onClick={() => setIsAutoRunning(!isAutoRunning)}
            className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 shadow-md ${
              isAutoRunning
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 ring-1 ring-amber-300'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
            title={isAutoRunning ? 'Pause Auto-Rotation' : 'Start Auto-Run Tour'}
          >
            {isAutoRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isAutoRunning ? 'Pause Auto' : 'Auto Run'}</span>
          </button>

          {/* Speed Selector (0.5x, 1x, 2x) */}
          <button
            onClick={() => {
              const speeds = [0.5, 1.0, 1.5, 2.0];
              const nextIdx = (speeds.indexOf(rotationSpeed) + 1) % speeds.length;
              setRotationSpeed(speeds[nextIdx]);
            }}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold border border-slate-700"
            title="Adjust Rotation Speed"
          >
            {rotationSpeed}x
          </button>

          {/* Zoom In & Out */}
          <div className="flex items-center gap-1 border-l border-slate-700 pl-2">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.0))}
              disabled={zoomLevel >= 2.0}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 1.0))}
              disabled={zoomLevel <= 1.0}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Advibe3DVirtualTour;

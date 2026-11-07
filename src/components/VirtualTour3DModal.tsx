import React, { useState, useEffect } from 'react';
import {
  X,
  Compass,
  Maximize2,
  Minimize2,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Layers,
  CheckCircle2,
  MessageSquare,
  Sun,
  Moon,
  Video,
  Camera
} from 'lucide-react';
import { Property } from '../types';
import WatermarkBadge from './WatermarkBadge';

interface VirtualTour3DModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property | null;
  onScheduleTour?: (property: Property) => void;
}

interface TourScene {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  description: string;
  hotspots: {
    id: string;
    x: number;
    y: number;
    label: string;
    detail: string;
    targetSceneIndex?: number;
  }[];
}

const DEFAULT_SCENES: TourScene[] = [
  {
    id: 'scene-exterior',
    name: '1. Grand Exterior Elevation & Lawn',
    subtitle: 'Modern Contemporary Facade • Ri8click German UPVC Glazing',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    description: 'Double-height travertine marble facade with acoustic double-glazed UPVC windows and 3-car porch.',
    hotspots: [
      {
        id: 'hs-1',
        x: 45,
        y: 55,
        label: 'Enter Main Double-Height Lobby',
        detail: 'Solid ash wood pivot entrance door with smart biometric lock.',
        targetSceneIndex: 1
      },
      {
        id: 'hs-2',
        x: 72,
        y: 38,
        label: 'Ri8click UPVC Thermal Windows',
        detail: 'Argon-filled Low-E double glazing reducing indoor heat by 40%.'
      }
    ]
  },
  {
    id: 'scene-living',
    name: '2. Double-Height Main Drawing & Lounge',
    subtitle: 'Spanish Porcelain Flooring • Chandelier Atrium',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    description: 'Expansive formal reception and family lounge overlooking the central courtyard.',
    hotspots: [
      {
        id: 'hs-3',
        x: 62,
        y: 52,
        label: 'Proceed to Italian Show Kitchen',
        detail: 'Open-plan chef kitchen with quartz island and built-in appliances.',
        targetSceneIndex: 2
      }
    ]
  },
  {
    id: 'scene-kitchen',
    name: '3. Imported Italian Show & Dirty Kitchen',
    subtitle: 'Quartz Waterfall Island • Smart Appliances',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
    description: 'Dual kitchen configuration featuring high-gloss UV cabinetry and German hardware.',
    hotspots: [
      {
        id: 'hs-4',
        x: 35,
        y: 48,
        label: 'View Master Bedroom Suite',
        detail: 'First-floor master suite with private Margalla view terrace.',
        targetSceneIndex: 3
      }
    ]
  },
  {
    id: 'scene-master',
    name: '4. Master Designer Bedroom & Terrace',
    subtitle: 'Walk-In Wardrobe • Spa En-Suite Bath',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    description: 'Panoramic windows framing the Margalla Hills, engineered wood flooring, and jacuzzi bath.',
    hotspots: [
      {
        id: 'hs-5',
        x: 50,
        y: 60,
        label: 'Return to Exterior Elevation',
        detail: 'Back to front lawn and main gate.',
        targetSceneIndex: 0
      }
    ]
  }
];

export const VirtualTour3DModal: React.FC<VirtualTour3DModalProps> = ({
  isOpen,
  onClose,
  property
}) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isNightMode, setIsNightMode] = useState(false);
  const [showFloorplan, setShowFloorplan] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'360_scenes' | 'video_walkthrough'>('360_scenes');

  const hasVideo = Boolean(property?.virtualTourVideoUrl && property.virtualTourVideoUrl.trim());

  useEffect(() => {
    setActiveSceneIndex(0);
    setSelectedHotspot(null);
    if (property?.virtualTourVideoUrl && property.virtualTourVideoUrl.trim()) {
      setViewMode('video_walkthrough');
    } else {
      setViewMode('360_scenes');
    }
  }, [property?.id, property?.virtualTourVideoUrl, isOpen]);

  if (!isOpen) return null;

  const customScenes: TourScene[] =
    property?.images && property.images.length > 0
      ? property.images.map((imgUrl, idx) => {
          const fallbackScene = DEFAULT_SCENES[idx % DEFAULT_SCENES.length];
          return {
            id: `prop-scene-${idx}`,
            name:
              idx === 0
                ? '1. Main Exterior & Perspective'
                : idx === 1
                ? '2. Interior Lounge & Architecture'
                : idx === 2
                ? '3. Kitchen & Dining Perspective'
                : `${idx + 1}. Angle View #${idx + 1}`,
            subtitle: property.tagline || `${property.location?.society || 'Faisal Hills'}, ${property.location?.city || 'Taxila'}`,
            image: imgUrl,
            description: property.description || fallbackScene.description,
            hotspots: [
              {
                id: `hs-custom-${idx}`,
                x: 52,
                y: 54,
                label: `Switch to Room Angle #${((idx + 1) % property.images.length) + 1}`,
                detail: property.title,
                targetSceneIndex: (idx + 1) % property.images.length
              }
            ]
          };
        })
      : DEFAULT_SCENES;

  const scenes = customScenes.length > 0 ? customScenes : DEFAULT_SCENES;
  const currentScene = scenes[activeSceneIndex] || scenes[0];

  const handleWhatsApp = () => {
    const cleanPhone = (property?.agentWhatsApp || '923365666727').replace(/[^0-9]/g, '');
    const title = property?.title || 'Ri8click 360° Virtual Tour Property';
    const text = encodeURIComponent(
      `Assalam-o-Alaikum, I just viewed the 360° Virtual Walkthrough for "${title}" on ri8click.com and would like complete details.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-2 sm:p-5">
      <div
        className={`bg-slate-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col transition-all ${
          isFullscreen ? 'w-screen h-screen rounded-none' : 'w-full max-w-6xl h-[88vh]'
        }`}
      >
        <div className="px-4 sm:px-6 py-3.5 bg-slate-950 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0">
              <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                  Ri8click 360° Virtual Tour &amp; Video Studio
                </span>
                {property?.priceFormatted && (
                  <span className="text-xs font-black text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded">
                    {property.priceFormatted}
                  </span>
                )}
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-white truncate">
                {property?.title || 'Ri8click Consortium 360° Interactive Showroom'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasVideo && (
              <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-white/15">
                <button
                  type="button"
                  onClick={() => setViewMode('360_scenes')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer ${
                    viewMode === '360_scenes'
                      ? 'bg-amber-400 text-slate-950'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>360° Rooms</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('video_walkthrough')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer ${
                    viewMode === 'video_walkthrough'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Movie Tour</span>
                </button>
              </div>
            )}

            {viewMode === '360_scenes' && (
              <>
                <button
                  type="button"
                  onClick={() => setAutoRotate(prev => !prev)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border cursor-pointer ${
                    autoRotate
                      ? 'bg-amber-400 text-slate-950 border-amber-300'
                      : 'bg-white/10 text-white border-white/15'
                  }`}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{autoRotate ? '360° Orbit: ON' : 'Orbit Paused'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsNightMode(prev => !prev)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 cursor-pointer"
                >
                  {isNightMode ? <Moon className="w-4 h-4 text-amber-300" /> : <Sun className="w-4 h-4 text-amber-400" />}
                </button>

                <button
                  type="button"
                  onClick={() => setShowFloorplan(prev => !prev)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border cursor-pointer ${
                    showFloorplan
                      ? 'bg-blue-600 text-white border-blue-500'
                      : 'bg-white/10 text-white border-white/15'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Floor Plan</span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setIsFullscreen(prev => !prev)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden bg-black flex items-center justify-center">
          {viewMode === 'video_walkthrough' && hasVideo ? (
            property!.virtualTourVideoUrl!.includes('youtube.com') ||
            property!.virtualTourVideoUrl!.includes('youtu.be') ? (
              <iframe
                src={
                  property!.virtualTourVideoUrl!.includes('watch?v=')
                    ? property!.virtualTourVideoUrl!.replace('watch?v=', 'embed/')
                    : property!.virtualTourVideoUrl!
                }
                title={property?.virtualTourVideoTitle || 'Walkthrough'}
                className="w-full h-full"
                allowFullScreen
              />
            ) : (
              <video
                key={property!.virtualTourVideoUrl}
                src={property!.virtualTourVideoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            )
          ) : (
            <>
              <img
                src={currentScene.image}
                alt={currentScene.name}
                style={{
                  filter: isNightMode
                    ? 'brightness(0.75) contrast(1.15) saturate(1.1)'
                    : 'brightness(1.03) contrast(1.05)'
                }}
                className={`w-full h-full object-cover transition-transform duration-[14000ms] ease-linear ${
                  autoRotate ? 'scale-110 translate-x-2' : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/30 pointer-events-none" />

              {currentScene.hotspots.map(hs => (
                <div
                  key={hs.id}
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (hs.targetSceneIndex !== undefined) {
                        setActiveSceneIndex(hs.targetSceneIndex);
                      } else {
                        setSelectedHotspot(selectedHotspot === hs.id ? null : hs.id);
                      }
                    }}
                    className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/95 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-xl cursor-pointer transition-transform hover:scale-105"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-950 animate-ping" />
                    <span>{hs.label}</span>
                  </button>
                </div>
              ))}
            </>
          )}

          <WatermarkBadge position="bottom-right" size="md" showVerifiedText />

          {viewMode === '360_scenes' && scenes.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  setActiveSceneIndex(prev => (prev - 1 + scenes.length) % scenes.length)
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/75 hover:bg-amber-400 text-white hover:text-slate-950 border border-white/20 transition-all cursor-pointer z-20"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setActiveSceneIndex(prev => (prev + 1) % scenes.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/75 hover:bg-amber-400 text-white hover:text-slate-950 border border-white/20 transition-all cursor-pointer z-20"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {showFloorplan && (
            <div className="absolute top-4 right-4 z-30 w-72 rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-white/20 p-4 text-white shadow-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/15 pb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                  Architectural Room Navigator
                </span>
                <button
                  type="button"
                  onClick={() => setShowFloorplan(false)}
                  className="text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Close
                </button>
              </div>
              <div className="space-y-1.5">
                {scenes.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setViewMode('360_scenes');
                      setActiveSceneIndex(idx);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between cursor-pointer ${
                      activeSceneIndex === idx
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-white/5 text-slate-200 hover:bg-white/15'
                    }`}
                  >
                    <span className="truncate">{s.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-4 sm:px-6 py-3.5 bg-slate-950 border-t border-white/15 flex flex-col lg:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
            {scenes.map((scene, idx) => (
              <button
                key={scene.id}
                type="button"
                onClick={() => {
                  setViewMode('360_scenes');
                  setActiveSceneIndex(idx);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  viewMode === '360_scenes' && activeSceneIndex === idx
                    ? 'bg-amber-400 text-slate-950 border-amber-300'
                    : 'bg-white/5 text-slate-200 border-white/15 hover:bg-white/15'
                }`}
              >
                <img
                  src={scene.image}
                  alt={scene.name}
                  className="w-6 h-6 rounded object-cover"
                />
                <span>{scene.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Advisor</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTour3DModal;

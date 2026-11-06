import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  RotateCw,
  Maximize2,
  Minimize2,
  Compass,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  Film
} from 'lucide-react';
import { Property } from '../types';
import { WatermarkBadge } from './WatermarkBadge';

interface VirtualTour3DModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
  onScheduleVisit?: (property: Property) => void;
}

interface TourScene {
  id: string;
  name: string;
  tag: string;
  image: string;
  nightImage?: string;
  description: string;
  hotspots: {
    id: string;
    x: number;
    y: number;
    title: string;
    details: string;
  }[];
}

export const VirtualTour3DModal: React.FC<VirtualTour3DModalProps> = ({
  isOpen,
  onClose,
  property,
  onScheduleVisit
}) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [panOffset, setPanOffset] = useState<number>(0);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showFloorplan, setShowFloorplan] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'360' | 'movie'>('360');

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startOffsetRef = useRef<number>(0);

  const scenes: TourScene[] = React.useMemo(() => {
    if (!property) return [];

    if (property.category === 'commercial') {
      return [
        {
          id: 'scene-1',
          name: 'Main Atrium & Glass Facade',
          tag: 'Exterior & Reception',
          image:
            property.images?.[0] ||
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85',
          description:
            'High-visibility commercial facade with Ri8Click double-glazed UPVC thermal glass and reception lobby.',
          hotspots: [
            {
              id: 'h-1',
              x: 28,
              y: 45,
              title: 'Thermal UPVC Facade',
              details: 'German standard energy-efficient double glazing by Ri8Click UPVC unit.'
            },
            {
              id: 'h-2',
              x: 72,
              y: 60,
              title: 'High-Speed Capsule Elevators',
              details: 'Dual high-speed passenger elevators serving basement to 5th floor.'
            },
            {
              id: 'h-3',
              x: 50,
              y: 78,
              title: 'Underground Dedicated Parking',
              details: 'Direct basement ramp for 30+ executive cars.'
            }
          ]
        },
        {
          id: 'scene-2',
          name: 'Corporate Executive Suite',
          tag: '3rd Floor Office Space',
          image:
            property.images?.[1] ||
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1920&q=85',
          description:
            'Spacious column-free open floor plan optimized for corporate headquarters or regional bank operations.',
          hotspots: [
            {
              id: 'h-4',
              x: 40,
              y: 50,
              title: 'VRF Central Climate Control',
              details: 'Independent zone air conditioning and air filtration.'
            },
            {
              id: 'h-5',
              x: 80,
              y: 40,
              title: 'Margalla Hill Scenic Outlook',
              details: 'Panoramic north-facing scenic view overlooking Faisal Hills.'
            }
          ]
        },
        {
          id: 'scene-3',
          name: 'Rooftop Solar & Executive Lounge',
          tag: 'Rooftop Deck',
          image:
            property.images?.[2] ||
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=85',
          description:
            'Executive rooftop patio with 50kVA solar generation setup and open-air networking lounge.',
          hotspots: [
            {
              id: 'h-6',
              x: 50,
              y: 45,
              title: '50kVA Hybrid Solar Inverter',
              details: 'Zero downtime continuous green power backup.'
            }
          ]
        }
      ];
    }

    if (property.category === 'modular') {
      return [
        {
          id: 'scene-1',
          name: 'Curved Capsule Pod Exterior & Deck',
          tag: 'Aerospace Curved Shell',
          image:
            property.images?.[0] ||
            'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1920&q=85',
          description:
            'Aviation-grade aluminum alloy outer body with curved 270° panoramic glass and integrated ambient LED strip illumination.',
          hotspots: [
            {
              id: 'h-1',
              x: 35,
              y: 40,
              title: '270° Curved Panoramic Glass',
              details: 'Continuous curved smart electrochromic glass for uninterrupted views.'
            },
            {
              id: 'h-2',
              x: 65,
              y: 65,
              title: 'Weatherproof Composite Deck',
              details: 'Pre-treated anti-termite exterior decking.'
            }
          ]
        },
        {
          id: 'scene-2',
          name: 'Smart Capsule Interior Living',
          tag: 'Turnkey Bedroom & Lounge',
          image:
            property.images?.[1] ||
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=85',
          description:
            'Futuristic interior featuring voice-controlled smart IoT, climate control, and built-in King bed.',
          hotspots: [
            {
              id: 'h-3',
              x: 50,
              y: 55,
              title: 'IoT Voice Automation',
              details: 'Controls lighting, motorized curtains, and temperature seamlessly.'
            },
            {
              id: 'h-4',
              x: 75,
              y: 65,
              title: 'Luxury Wet/Dry Bathroom',
              details: 'Instant hot water heating and smart sensor sanitary fittings.'
            }
          ]
        },
        {
          id: 'scene-3',
          name: 'Curved Container Panoramic Suite',
          tag: 'Glamping Pod Architecture',
          image:
            property.images?.[2] ||
            'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1920&q=85',
          description:
            'Streamlined container architecture with rounded edge corners and thermal insulation.',
          hotspots: [
            {
              id: 'h-5',
              x: 45,
              y: 45,
              title: 'Aerodynamic Curved Corners',
              details: 'Engineered for extreme mountain weather and high-wind durability.'
            }
          ]
        }
      ];
    }

    return [
      {
        id: 'scene-1',
        name: 'Front Architectural Facade & Lawn',
        tag: 'Main Entrance',
        image:
          property.images?.[0] ||
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85',
        description:
          'Contemporary elevation with imported travertine stone cladding, wide porch, and manicured green lawn.',
        hotspots: [
          {
            id: 'h-1',
            x: 45,
            y: 35,
            title: 'Ri8Click UPVC Soundproof Windows',
            details: 'Acoustic thermal insulated double glazing eliminating 95% outside noise.'
          },
          {
            id: 'h-2',
            x: 22,
            y: 68,
            title: '3-Car Covered Porch',
            details: 'Reinforced concrete porch with dedicated EV charging port.'
          },
          {
            id: 'h-3',
            x: 78,
            y: 50,
            title: 'Margalla Hill View Balcony',
            details: 'Direct scenic orientation facing Margalla ridge.'
          }
        ]
      },
      {
        id: 'scene-2',
        name: 'Grand Drawing & Double-Height Lounge',
        tag: 'Living Area',
        image:
          property.images?.[1] ||
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
        description:
          'Voluminous 22-foot high ceiling living hall with custom chandelier and Spanish porcelain flooring.',
        hotspots: [
          {
            id: 'h-4',
            x: 52,
            y: 30,
            title: 'Double Height Ceiling & Chandelier',
            details: 'Architectural recessed warm LED illumination.'
          },
          {
            id: 'h-5',
            x: 30,
            y: 60,
            title: 'Imported Spanish Marble',
            details: 'Non-slip polished 60x120cm seamless marble tile layout.'
          }
        ]
      },
      {
        id: 'scene-3',
        name: 'Master Designer Bedroom Suite',
        tag: 'Private Quarters',
        image:
          property.images?.[2] ||
          'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1920&q=85',
        description:
          'Expansive master bedroom with walk-in wardrobe, hardwood flooring, and floor-to-ceiling glass wall.',
        hotspots: [
          {
            id: 'h-6',
            x: 38,
            y: 50,
            title: 'Walk-In Dressing Wardrobe',
            details: 'Custom built-in closets with integrated lighting.'
          },
          {
            id: 'h-7',
            x: 70,
            y: 45,
            title: 'Jacuzzi Master Bathroom',
            details: 'Rain shower, Grohe fittings, and standalone soaking tub.'
          }
        ]
      },
      {
        id: 'scene-4',
        name: 'Italian Show Kitchen & Breakfast Bar',
        tag: 'Culinary Suite',
        image:
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=85',
        description:
          'Ergonomic chef kitchen equipped with built-in microwave, oven, quartz island, and separate wet kitchen.',
        hotspots: [
          {
            id: 'h-8',
            x: 50,
            y: 55,
            title: 'Quartz Waterfall Island',
            details: 'Stain-resistant heat-proof stone countertop with bar seating.'
          },
          {
            id: 'h-9',
            x: 80,
            y: 40,
            title: 'Built-in European Appliances',
            details: 'High-efficiency induction cooktop and range hood.'
          }
        ]
      }
    ];
  }, [property]);

  const currentScene = scenes[activeSceneIndex] || scenes[0];

  useEffect(() => {
    if (!isOpen || !isAutoRotating) return;
    const interval = setInterval(() => {
      setPanOffset(prev => (prev + 0.15) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, [isOpen, isAutoRotating]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startOffsetRef.current = panOffset;
    setIsAutoRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    const containerWidth = containerRef.current?.clientWidth || 800;
    const offsetChange = (deltaX / containerWidth) * 35;
    let newOffset = (startOffsetRef.current - offsetChange) % 100;
    if (newOffset < 0) newOffset += 100;
    setPanOffset(newOffset);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  if (!isOpen || !property || scenes.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div
        ref={containerRef}
        className="relative w-full max-w-6xl h-[88vh] max-h-[820px] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col select-none"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Top Control Bar */}
        <div className="relative z-30 flex items-center justify-between px-4 py-3 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <Compass
                className="w-3.5 h-3.5 animate-spin"
                style={{ animationDuration: '8s' }}
              />
              <span>3D Virtual Tour &amp; 360° Walkthrough</span>
            </div>
            <div className="hidden sm:block text-xs font-medium text-slate-300 truncate max-w-md">
              {property.title} •{' '}
              <span className="text-slate-400">
                {property.location.city} ({property.location.society})
              </span>
            </div>

            {property.virtualTourVideoUrl && (
              <div className="flex items-center gap-1 bg-slate-800/90 p-0.5 rounded-lg border border-slate-700 ml-2">
                <button
                  type="button"
                  onClick={() => setViewMode('360')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    viewMode === '360'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>360° Interactive</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('movie')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    viewMode === 'movie'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'text-amber-300 hover:text-amber-200'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Movie Clip</span>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {viewMode === '360' && (
              <button
                type="button"
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                title="Toggle Auto-Rotation"
                className={`p-2 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                  isAutoRotating
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <RotateCw
                  className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`}
                  style={{ animationDuration: '6s' }}
                />
                <span className="hidden md:inline">
                  {isAutoRotating ? 'Rotating' : 'Rotate'}
                </span>
              </button>
            )}

            {viewMode === '360' && (
              <button
                type="button"
                onClick={() => setShowFloorplan(!showFloorplan)}
                className={`p-2 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                  showFloorplan
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Floor Plan</span>
              </button>
            )}

            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition-colors"
              title="Exit Tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* VIEW MODE: MOVIE CLIP */}
        {viewMode === 'movie' && property.virtualTourVideoUrl ? (
          <div className="relative flex-1 bg-black overflow-hidden flex flex-col items-center justify-center select-none">
            <video
              src={property.virtualTourVideoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain max-h-[72vh]"
            />

            <div className="absolute bottom-4 right-4 pointer-events-none opacity-90 z-20">
              <WatermarkBadge position="bottom-right" size="md" showVerifiedText={true} />
            </div>

            <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-amber-400/40 text-white flex items-center gap-2 shadow-lg max-w-[90%]">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <div className="text-xs font-bold text-amber-300 shrink-0">
                Super Admin Movie Tour
              </div>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <div className="text-xs text-slate-200 truncate">
                {property.virtualTourVideoTitle ||
                  'Property Cinematic Drone & Walkthrough Clip'}
              </div>
            </div>
          </div>
        ) : (
          /* 360° Interactive Canvas Area */
          <div
            className="relative flex-1 bg-slate-900 overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
          >
            <div
              className="absolute inset-0 w-[140%] h-full -left-[20%] transition-transform duration-75 ease-out scale-105"
              style={{
                backgroundImage: `url(${currentScene.image})`,
                backgroundSize: 'cover',
                backgroundPosition: `${panOffset}% center`
              }}
            />

            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none" />

            <WatermarkBadge position="bottom-right" className="opacity-80" />

            {currentScene.hotspots.map(spot => {
              const isSelected = selectedHotspot === spot.id;
              return (
                <div
                  key={spot.id}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  onClick={e => {
                    e.stopPropagation();
                    setSelectedHotspot(isSelected ? null : spot.id);
                  }}
                >
                  <button
                    type="button"
                    className="relative group flex items-center justify-center"
                    title={spot.title}
                  >
                    <span className="absolute w-8 h-8 rounded-full bg-blue-500/40 animate-ping" />
                    <div className="relative w-6 h-6 rounded-full bg-blue-600 border-2 border-white text-white flex items-center justify-center shadow-lg transform group-hover:scale-125 transition-transform">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                    </div>
                  </button>

                  {isSelected && (
                    <div
                      className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-xl border border-blue-500/50 shadow-2xl z-30"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2 mb-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{spot.title}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedHotspot(null)}
                          className="text-slate-400 hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                        {spot.details}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Floating Current Room Info Badge */}
            <div className="absolute top-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-700/80 shadow-lg text-white max-w-sm">
              <div className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                {currentScene.tag}
              </div>
              <div className="text-sm font-bold text-white mt-0.5">
                {currentScene.name}
              </div>
              <div className="text-xs text-slate-300 mt-1 leading-snug">
                {currentScene.description}
              </div>
            </div>

            {/* Pan Navigation Arrow buttons */}
            <button
              type="button"
              onClick={() =>
                setActiveSceneIndex(prev => (prev > 0 ? prev - 1 : scenes.length - 1))
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 border border-slate-700 text-white transition-all shadow-lg hover:scale-110 z-20"
              title="Previous Room"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveSceneIndex(prev => (prev < scenes.length - 1 ? prev + 1 : 0))
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 border border-slate-700 text-white transition-all shadow-lg hover:scale-110 z-20"
              title="Next Room"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Interactive Floorplan Overlay */}
            {showFloorplan && (
              <div className="absolute top-4 right-4 z-30 w-72 bg-slate-900/95 backdrop-blur-md rounded-xl p-3.5 border border-slate-700 shadow-2xl text-white">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    Architectural Floor Plan
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowFloorplan(false)}
                    className="text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-1.5">
                  {scenes.map((sc, idx) => (
                    <button
                      type="button"
                      key={sc.id}
                      onClick={() => setActiveSceneIndex(idx)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-colors text-left cursor-pointer ${
                        activeSceneIndex === idx
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <span>{sc.name}</span>
                      <span className="text-[10px] opacity-80">{sc.tag}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom Room Selector & Action Strip */}
        <div className="relative z-30 bg-slate-900 px-4 py-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
          {viewMode === 'movie' && property.virtualTourVideoUrl ? (
            <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                <Film className="w-4 h-4 text-amber-400" />
                <span className="font-semibold">Super Admin Exclusive Movie Tour</span>
                <span className="text-slate-400 hidden sm:inline">
                  | High Definition Video Walkthrough
                </span>
              </div>
              <button
                type="button"
                onClick={() => setViewMode('360')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-blue-400" />
                <span>Switch to 360° Tour</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-thin">
              {scenes.map((scene, idx) => {
                const active = activeSceneIndex === idx;
                return (
                  <button
                    type="button"
                    key={scene.id}
                    onClick={() => setActiveSceneIndex(idx)}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all shrink-0 text-left cursor-pointer ${
                      active
                        ? 'bg-blue-600/30 border-blue-500 text-white font-semibold ring-1 ring-blue-500'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    <img
                      src={scene.image}
                      alt={scene.name}
                      className="w-8 h-8 rounded object-cover border border-slate-600"
                    />
                    <div className="text-[11px] leading-tight">
                      <div className="text-white font-medium truncate max-w-[120px]">
                        {scene.name}
                      </div>
                      <div className="text-[9.5px] text-slate-400">{scene.tag}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onScheduleVisit) onScheduleVisit(property);
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-sm active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Book Site Visit</span>
            </button>

            <a
              href={`https://wa.me/923365666727?text=${encodeURIComponent(
                `Assalam o Alaikum, I just took the 3D Virtual Tour for ${property.title} on ri8click and want to discuss purchase details.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Agent</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTour3DModal;

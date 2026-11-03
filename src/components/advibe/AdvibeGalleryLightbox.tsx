import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Sparkles, 
  Download,
  Layers,
  Camera
} from 'lucide-react';
import { AdVibeMediaItem } from '../../types';

interface AdvibeGalleryLightboxProps {
  items: AdVibeMediaItem[];
  projectTitle: string;
}

export const AdvibeGalleryLightbox: React.FC<AdvibeGalleryLightboxProps> = ({
  items,
  projectTitle
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const categories = ['All', ...Array.from(new Set(items.map(i => i.category)))];

  const filteredItems = items.filter(item => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setZoomLevel(1);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
    setZoomLevel(1);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    setZoomLevel(1);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    setZoomLevel(1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <div className="w-full space-y-6">
      
      {/* Category Pills Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Showing {filteredItems.length} curated images
        </div>
      </div>

      {/* Responsive Masonry / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => handleOpenLightbox(idx)}
            className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <img
              src={item.url}
              alt={item.caption}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            {/* Top Badge */}
            <div className="absolute top-3 left-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-white border border-slate-700">
                {item.category}
              </span>
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-3 left-3 right-3 text-left">
              <p className="text-xs font-semibold text-white line-clamp-2 leading-snug">
                {item.caption}
              </p>
              {item.tags && item.tags.length > 0 && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[9.5px] text-blue-300 font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Hover Expand Icon */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
              <Maximize className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={handleCloseLightbox}
        >
          {/* Top Bar */}
          <div 
            className="flex items-center justify-between text-white z-20 pb-3 border-b border-slate-800"
            onClick={e => e.stopPropagation()}
          >
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>{projectTitle} • Photo {lightboxIndex + 1} of {filteredItems.length}</span>
                <span className="text-[10px] bg-blue-600 px-2 py-0.5 rounded-full font-bold">
                  {filteredItems[lightboxIndex].category}
                </span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {filteredItems[lightboxIndex].caption}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.5))}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 1))}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleCloseLightbox}
                className="p-2 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Image with Navigation Arrows */}
          <div 
            className="relative flex-1 flex items-center justify-center overflow-hidden my-2"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white border border-slate-700 transition-all shadow-xl"
              title="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div 
              className="max-h-full max-w-full flex items-center justify-center transition-transform duration-200 ease-out"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <img
                src={filteredItems[lightboxIndex].url}
                alt={filteredItems[lightboxIndex].caption}
                className="max-h-[75vh] max-w-[90vw] object-contain rounded-xl shadow-2xl border border-slate-800 select-none"
              />
            </div>

            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white border border-slate-700 transition-all shadow-xl"
              title="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div 
            className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-20 max-w-full"
            onClick={e => e.stopPropagation()}
          >
            {filteredItems.map((thumb, tIdx) => (
              <img
                key={thumb.id}
                src={thumb.url}
                alt={`Thumb ${tIdx}`}
                onClick={() => {
                  setLightboxIndex(tIdx);
                  setZoomLevel(1);
                }}
                className={`w-14 h-10 object-cover rounded-md cursor-pointer transition-all border-2 ${
                  lightboxIndex === tIdx ? 'border-blue-500 scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              />
            ))}
          </div>

        </div>
      )}

    </div>
  );
};

export default AdvibeGalleryLightbox;

import React from 'react';
import { X, Sparkles, MapPin, Building2, ExternalLink } from 'lucide-react';
import { AdVibeProject } from '../../types';
import { Advibe3DVirtualTour } from './Advibe3DVirtualTour';

interface AdvibeTourModalProps {
  project: AdVibeProject | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenScrollytelling?: (slug: string) => void;
}

export const AdvibeTourModal: React.FC<AdvibeTourModalProps> = ({
  project,
  isOpen,
  onClose,
  onOpenScrollytelling
}) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-6xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-slate-950 px-5 py-3.5 flex items-center justify-between gap-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-bold flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-600/30 text-blue-300 border border-blue-500/30">
                  {project.type}
                </span>
                <span className="text-[10px] text-amber-400 font-mono font-bold bg-amber-400/10 px-2 py-0.5 rounded">
                  Auto-Run Enabled
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-white truncate max-w-sm sm:max-w-md">
                {project.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenScrollytelling && (
              <button
                onClick={() => {
                  onClose();
                  onOpenScrollytelling(project.slug);
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-md"
              >
                <span>Full Scrollytelling</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D Virtual Tour Viewport with Auto-Run */}
        <div className="relative flex-1 min-h-[500px] sm:min-h-[600px] p-2 sm:p-3 bg-slate-950 flex flex-col">
          <Advibe3DVirtualTour 
            project={project} 
            embedded={false} 
            className="flex-1 min-h-[480px] sm:min-h-[580px]"
          />
        </div>

        {/* Bottom Specs Bar */}
        <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>{project.city}</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-amber-400 font-bold font-mono">
              Starts: {project.starting_price_formatted}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400">
              Tip: Drag with mouse to explore 360°, or let it auto-rotate.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvibeTourModal;

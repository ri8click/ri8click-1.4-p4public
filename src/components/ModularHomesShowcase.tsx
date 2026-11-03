import React from 'react';
import { Layers, Sparkles, MessageSquare, ArrowRight, ShieldCheck, Zap, Wifi } from 'lucide-react';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';

interface ModularHomesShowcaseProps {
  properties: Property[];
  savedPropertyIds: string[];
  onToggleSave: (propertyId: string) => void;
  onSelectProperty: (property: Property) => void;
  onScheduleTour: (property: Property) => void;
  onWhatsAppInquiry: (subject: string) => void;
}

export const ModularHomesShowcase: React.FC<ModularHomesShowcaseProps> = ({
  properties,
  savedPropertyIds,
  onToggleSave,
  onSelectProperty,
  onScheduleTour,
  onWhatsAppInquiry
}) => {
  const modularProps = properties.filter(p => p.category === 'modular' || p.type.toLowerCase().includes('capsule')).slice(0, 4);

  return (
    <section id="modular-section" className="py-14 bg-gradient-to-b from-slate-900 to-slate-950 text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-600 text-white">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Futuristic Living • Modular Prefab Innovation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-serif">
              Readymade Space Capsule & Modular Smart Houses
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Engineered aerospace aluminum pods, double-glazed panoramic windows, smart IoT controls, and rapid 24-hour setup anywhere in Pakistan.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onWhatsAppInquiry('Readymade Modular Capsule House Catalog')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire Modular Catalog</span>
            </button>
          </div>
        </div>

        {/* Feature Highlights Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-800/60 backdrop-blur-md p-4 rounded-2xl border border-slate-700/80 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">Turnkey Delivery</div>
              <div className="text-[10.5px] text-slate-400">Ready in 30 days</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
              <Wifi className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">Full IoT Automation</div>
              <div className="text-[10.5px] text-slate-400">Smart lighting & climate</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">Thermal Insulation</div>
              <div className="text-[10.5px] text-slate-400">ri8click UPVC Windows</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">Versatile Placement</div>
              <div className="text-[10.5px] text-slate-400">Rooftops, Farms, Hills</div>
            </div>
          </div>
        </div>

        {/* Modular Properties Grid */}
        {modularProps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {modularProps.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isSaved={savedPropertyIds.includes(property.id)}
                onToggleSave={onToggleSave}
                onSelectProperty={onSelectProperty}
                onScheduleTour={onScheduleTour}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-slate-400 text-xs">
            Modular capsules are currently being cataloged. Connect with ri8click for customized designs.
          </div>
        )}

      </div>
    </section>
  );
};

export default ModularHomesShowcase;

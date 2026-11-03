import React from 'react';
import { Building2, ArrowRight, TrendingUp, ShieldCheck, MapPin } from 'lucide-react';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';

interface CommercialShowcaseProps {
  properties: Property[];
  savedPropertyIds: string[];
  onToggleSave: (propertyId: string) => void;
  onSelectProperty: (property: Property) => void;
  onScheduleTour: (property: Property) => void;
  onViewAllCommercial: () => void;
}

export const CommercialShowcase: React.FC<CommercialShowcaseProps> = ({
  properties,
  savedPropertyIds,
  onToggleSave,
  onSelectProperty,
  onScheduleTour,
  onViewAllCommercial
}) => {
  const commercialProps = properties
    .filter(p => p.category === 'commercial' || p.isHotCommercial)
    .slice(0, 4);

  if (commercialProps.length === 0) return null;

  return (
    <section id="commercial-section" className="py-14 bg-slate-900 text-white w-full border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>High ROI Commercial Hubs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-serif">
              Commercial Plazas & Corporate Centres
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Prime retail outlets, corporate towers, and shopping plazas across Faisal Hills Commercial Broadway, Taxila GT Road, and Islamabad Blue Area.
            </p>
          </div>

          <button
            onClick={onViewAllCommercial}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 self-start md:self-auto"
          >
            <span>Browse All Commercial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Commercial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {commercialProps.map((property) => (
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

      </div>
    </section>
  );
};

export default CommercialShowcase;

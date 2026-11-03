import React, { useState } from 'react';
import { 
  Building2, 
  ExternalLink, 
  Search, 
  Bed, 
  Maximize2, 
  MapPin, 
  CheckCircle2, 
  Layers,
  ArrowUpDown,
  Phone,
  MessageSquare
} from 'lucide-react';
import { Property } from '../../types';

interface AdvibeLinkedUnitsProps {
  linkedPropertyIds: string[];
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  projectTitle: string;
}

export const AdvibeLinkedUnits: React.FC<AdvibeLinkedUnitsProps> = ({
  linkedPropertyIds,
  properties,
  onSelectProperty,
  projectTitle
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Find the actual properties linked to this project
  const linkedProperties = properties.filter(p => linkedPropertyIds.includes(p.id));

  // Filter properties
  const filteredProperties = linkedProperties.filter(prop => {
    if (filterType !== 'all' && prop.category !== filterType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = prop.title.toLowerCase().includes(q);
      const matchLoc = (prop.location.block || prop.location.society || '').toLowerCase().includes(q);
      const matchType = prop.type.toLowerCase().includes(q);
      return matchTitle || matchLoc || matchType;
    }
    return true;
  });

  return (
    <div className="w-full space-y-5">
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['all', 'commercial', 'residential', 'plot'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                filterType === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Units' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by block, unit, size..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-blue-500"
          />
        </div>
      </div>

      {/* Units Table / Grid */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400 text-xs">
          No available units matching your filter criteria.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Unit / Image</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Size / Area</th>
                <th className="py-3 px-4">Floors / Beds</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredProperties.map((prop) => (
                <tr 
                  key={prop.id}
                  className="hover:bg-slate-800/50 transition-colors group cursor-pointer"
                  onClick={() => onSelectProperty(prop)}
                >
                  {/* Unit Image & Title */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prop.images[0]}
                        alt={prop.title}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-white truncate max-w-xs group-hover:text-blue-400 transition-colors">
                          {prop.title}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{prop.location.block || prop.location.society}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-200">
                      {prop.type}
                    </span>
                  </td>

                  {/* Size */}
                  <td className="py-3 px-4">
                    <span className="font-mono text-slate-200">
                      {prop.area} {prop.areaUnit}
                    </span>
                  </td>

                  {/* Floors / Beds */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      {prop.bedrooms ? (
                        <span className="flex items-center gap-1">
                          <Bed className="w-3.5 h-3.5 text-blue-400" />
                          <span>{prop.bedrooms} Bed</span>
                        </span>
                      ) : prop.floors ? (
                        <span className="flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5 text-amber-400" />
                          <span>{prop.floors} Floors</span>
                        </span>
                      ) : (
                        <span>Plot Unit</span>
                      )}
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4">
                    <span className="font-bold text-emerald-400 font-mono text-sm">
                      {prop.priceFormatted}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{prop.status === 'active' ? 'Available' : prop.status}</span>
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProperty(prop);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 ml-auto shadow-xs"
                    >
                      <span>View Details</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdvibeLinkedUnits;

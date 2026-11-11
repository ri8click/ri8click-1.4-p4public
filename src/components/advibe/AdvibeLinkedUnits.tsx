import React, { useState, useMemo } from 'react';
import {
  ExternalLink,
  Search,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  CheckCircle2,
  Layers,
  MessageSquare,
  LayoutGrid,
  List,
  Sparkles
} from 'lucide-react';
import { Property } from '../../types';
import { resolvePakistanAgentAvatar } from '../AgenciesSection';

interface AdvibeLinkedUnitsProps {
  linkedPropertyIds: string[];
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  projectTitle: string;
  projectCity?: string;
  projectSociety?: string;
}

export const AdvibeLinkedUnits: React.FC<AdvibeLinkedUnitsProps> = ({
  linkedPropertyIds,
  properties,
  onSelectProperty,
  projectTitle,
  projectCity = '',
  projectSociety = ''
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Resolve explicitly linked properties, or smartly match properties from the same society/city so inventory is always effective and visible
  const linkedProperties = useMemo(() => {
    const explicit = properties.filter(
      p => p.status !== 'pending' && linkedPropertyIds.includes(p.id)
    );
    if (explicit.length > 0) return explicit;

    const socKey = (projectSociety || projectTitle).toLowerCase();
    const cityKey = projectCity.split('/')[0]?.trim().toLowerCase() || '';

    const smartMatched = properties.filter(p => {
      if (p.status === 'pending') return false;
      const pSoc = p.location.society.toLowerCase();
      const pCity = p.location.city.toLowerCase();
      return (
        (socKey && (pSoc.includes(socKey) || socKey.includes(pSoc))) ||
        (cityKey && pCity.includes(cityKey))
      );
    });

    return smartMatched.length > 0
      ? smartMatched
      : properties.filter(p => p.status !== 'pending').slice(0, 6);
  }, [properties, linkedPropertyIds, projectSociety, projectTitle, projectCity]);

  const filteredProperties = linkedProperties.filter(prop => {
    if (filterType !== 'all' && prop.category !== filterType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = prop.title.toLowerCase().includes(q);
      const matchLoc = (
        prop.location.block ||
        prop.location.society ||
        ''
      )
        .toLowerCase()
        .includes(q);
      const matchType = prop.type.toLowerCase().includes(q);
      return matchTitle || matchLoc || matchType;
    }
    return true;
  });

  return (
    <div className="w-full space-y-6">
      {/* Top Filter & View Switcher Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {[
            { key: 'all', label: `All Units (${linkedProperties.length})` },
            { key: 'residential', label: 'Residential' },
            { key: 'commercial', label: 'Commercial' },
            { key: 'modular', label: 'Capsule & Modular' }
          ].map(cat => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setFilterType(cat.key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                filterType === cat.key
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search unit, block, size..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white text-blue-600 shadow-2xs'
                  : 'text-slate-600'
              }`}
              title="Visual Cards Grid"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cards</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-blue-600 shadow-2xs'
                  : 'text-slate-600'
              }`}
              title="Comparison Table"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
          No available units matching your filter criteria.
        </div>
      ) : viewMode === 'cards' ? (
        /* HIGH-VISIBILITY CARDS GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((prop, idx) => {
            const agentPhoto = resolvePakistanAgentAvatar(
              prop.agentAvatar,
              `${prop.agencyId} ${prop.agentName}`,
              idx
            );
            const cleanWa = (prop.agentWhatsApp || '923365666727').replace(
              /[^0-9]/g,
              ''
            );

            return (
              <div
                key={prop.id}
                onClick={() => onSelectProperty(prop)}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-500 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
              >
                <div className="relative h-52 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={
                      prop.images?.[0] ||
                      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80'
                    }
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[10px] font-extrabold uppercase">
                      {prop.type}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>
                        {prop.status === 'sold' ? 'Sold Out' : 'Available'}
                      </span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-amber-300 block">
                        Verified Unit Price
                      </span>
                      <span className="text-lg font-black">
                        {prop.priceFormatted}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-white/95 text-slate-900 text-xs font-extrabold">
                      {prop.area} {prop.areaUnit}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-xs font-bold text-blue-600 flex items-center gap-1 mb-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">
                        {prop.location.block || prop.location.society},{' '}
                        {prop.location.city}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {prop.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {prop.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-700">
                      {prop.bedrooms !== undefined ? (
                        <span className="flex items-center gap-1">
                          <Bed className="w-3.5 h-3.5 text-blue-600" />
                          <span>{prop.bedrooms} Beds</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                          <span className="capitalize">{prop.category}</span>
                        </span>
                      )}

                      {prop.bathrooms !== undefined && (
                        <span className="flex items-center gap-1">
                          <Bath className="w-3.5 h-3.5 text-blue-600" />
                          <span>{prop.bathrooms} Baths</span>
                        </span>
                      )}

                      <span className="flex items-center gap-1">
                        <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>
                          {prop.area} {prop.areaUnit}
                        </span>
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={agentPhoto}
                          alt={prop.agentName}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 truncate">
                            {prop.agentName}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            {prop.agentCompany}
                          </div>
                        </div>
                      </div>

                      <div
                        className="flex items-center gap-1.5 shrink-0"
                        onClick={e => e.stopPropagation()}
                      >
                        <a
                          href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(
                            `Assalam-o-Alaikum! I am inquiring about "${prop.title}" (${prop.priceFormatted}) linked in ${projectTitle}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => onSelectProperty(prop)}
                          className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <span>Details</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* CLEAN LIGHT COMPARISON TABLE */
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Unit / Image</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Size / Area</th>
                <th className="py-3.5 px-4">Specs</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Advisor</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProperties.map((prop, idx) => {
                const agentPhoto = resolvePakistanAgentAvatar(
                  prop.agentAvatar,
                  `${prop.agencyId} ${prop.agentName}`,
                  idx
                );
                return (
                  <tr
                    key={prop.id}
                    className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                    onClick={() => onSelectProperty(prop)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prop.images[0]}
                          alt={prop.title}
                          className="w-14 h-11 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-extrabold text-slate-900 truncate max-w-xs group-hover:text-blue-600 transition-colors">
                            {prop.title}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-rose-500" />
                            <span>
                              {prop.location.block || prop.location.society}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-bold text-slate-800">
                      {prop.type}
                    </td>

                    <td className="py-3 px-4 font-extrabold text-slate-900">
                      {prop.area} {prop.areaUnit}
                    </td>

                    <td className="py-3 px-4">
                      {prop.bedrooms ? (
                        <span className="flex items-center gap-1 text-slate-700 font-semibold">
                          <Bed className="w-3.5 h-3.5 text-blue-600" />
                          <span>{prop.bedrooms} Beds</span>
                        </span>
                      ) : prop.floors ? (
                        <span className="flex items-center gap-1 text-slate-700 font-semibold">
                          <Layers className="w-3.5 h-3.5 text-amber-600" />
                          <span>{prop.floors} Floors</span>
                        </span>
                      ) : (
                        <span>Ready Unit</span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-black text-blue-600 text-sm">
                        {prop.priceFormatted}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={agentPhoto}
                          alt={prop.agentName}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="font-semibold text-slate-800 truncate max-w-[120px]">
                          {prop.agentName}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          onSelectProperty(prop);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <span>Open Unit</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdvibeLinkedUnits;

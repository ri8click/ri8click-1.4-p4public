import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Home, 
  Building2, 
  SlidersHorizontal, 
  RotateCcw, 
  DollarSign, 
  Layers, 
  BedDouble,
  ChevronDown
} from 'lucide-react';
import { SearchFilterState, ProvinceCityData, PropertyCategory } from '../types';

interface SearchFilterBarProps {
  filters: SearchFilterState;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilterState>>;
  provinceCityData: ProvinceCityData[];
  totalResultsCount: number;
  onResetFilters: () => void;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  filters,
  setFilters,
  provinceCityData,
  totalResultsCount,
  onResetFilters
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // Available cities based on selected province
  const availableCities = React.useMemo(() => {
    if (!filters.province || filters.province === 'All Provinces') {
      // Flatten all cities
      const all: string[] = [];
      provinceCityData.forEach(p => p.cities.forEach(c => all.push(c.name)));
      return Array.from(new Set(all));
    }
    const foundProv = provinceCityData.find(p => p.province === filters.province);
    return foundProv ? foundProv.cities.map(c => c.name) : [];
  }, [provinceCityData, filters.province]);

  // Available societies based on selected city
  const availableSocieties = React.useMemo(() => {
    if (!filters.city || filters.city === 'All Cities') {
      // Return famous societies including Faisal Hills
      return [
        'Faisal Hills',
        'Faisal Hills Block A',
        'Faisal Hills Block B',
        'Faisal Hills Block C',
        'Faisal Hills Executive Block',
        'Faisal Hills Commercial Broadway',
        'Kohistan Enclave',
        'Margalla View Society',
        'B-17 Multi Gardens',
        'DHA Phase 1-4',
        'Bahria Town',
        'Bahria Town Lahore'
      ];
    }
    for (const p of provinceCityData) {
      const c = p.cities.find(city => city.name.toLowerCase() === filters.city.toLowerCase());
      if (c) return c.societies;
    }
    return [];
  }, [provinceCityData, filters.city]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20 w-full">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-4 sm:p-5 space-y-4">
        
        {/* Top Category and Purpose Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          {/* Purpose Switcher (All / Buy / Rent) */}
          <div className="inline-flex bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-700">
            <button
              type="button"
              onClick={() => setFilters(prev => ({ ...prev, purpose: 'all' }))}
              className={`px-3 py-1.5 rounded-lg transition-all ${filters.purpose === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'}`}
            >
              All Types
            </button>
            <button
              type="button"
              onClick={() => setFilters(prev => ({ ...prev, purpose: 'for_sale' }))}
              className={`px-3 py-1.5 rounded-lg transition-all ${filters.purpose === 'for_sale' ? 'bg-blue-600 text-white shadow-2xs' : 'hover:text-slate-900'}`}
            >
              Buy Property
            </button>
            <button
              type="button"
              onClick={() => setFilters(prev => ({ ...prev, purpose: 'for_rent' }))}
              className={`px-3 py-1.5 rounded-lg transition-all ${filters.purpose === 'for_rent' ? 'bg-blue-600 text-white shadow-2xs' : 'hover:text-slate-900'}`}
            >
              Rent
            </button>
          </div>

          {/* Quick Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-medium pb-1 sm:pb-0">
            {(['all', 'residential', 'commercial', 'modular', 'projects'] as PropertyCategory[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilters(prev => ({ ...prev, category: cat }))}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap capitalize transition-all ${
                  filters.category === cat 
                    ? 'bg-slate-900 text-white font-bold' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat === 'all' ? 'All Portfolios' : cat === 'modular' ? 'Capsule Houses' : cat}
              </button>
            ))}
          </div>

          {/* Results Badge */}
          <div className="text-xs text-slate-500 font-medium">
            Found <strong className="text-blue-600 font-bold">{totalResultsCount}</strong> listings
          </div>
        </div>

        {/* Main Search Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Keyword Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={e => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              placeholder="Search keyword, society, villa..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50/70 focus:bg-white focus:outline-hidden focus:border-blue-600 transition-colors"
            />
          </div>

          {/* City Selection (Default Taxila) */}
          <div className="relative">
            <MapPin className="w-4 h-4 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={filters.city}
              onChange={e => setFilters(prev => ({ ...prev, city: e.target.value, society: '' }))}
              className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50/70 focus:bg-white focus:outline-hidden focus:border-blue-600 appearance-none font-semibold transition-colors"
            >
              <option value="">All Cities (Taxila, Isb, Rwp)</option>
              {availableCities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Society Selection */}
          <div className="relative">
            <Home className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={filters.society || ''}
              onChange={e => {
                const val = e.target.value;
                setFilters(prev => ({
                  ...prev,
                  society: (val === 'Show All' || val === 'All Societies') ? '' : val
                }));
              }}
              className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50/70 focus:bg-white focus:outline-hidden focus:border-blue-600 appearance-none font-medium transition-colors"
            >
              <option value="">Show All</option>
              {availableSocieties.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Actions: Advanced Filters toggle & Reset */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                isAdvancedOpen 
                  ? 'bg-blue-50 border-blue-300 text-blue-700' 
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            <button
              type="button"
              onClick={onResetFilters}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Reset All Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Expandable Advanced Options */}
        {isAdvancedOpen && (
          <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in duration-150">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Province</label>
              <select
                value={filters.province}
                onChange={e => setFilters(prev => ({ ...prev, province: e.target.value, city: '', society: '' }))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50"
              >
                <option value="">All Provinces</option>
                {provinceCityData.map(p => (
                  <option key={p.province} value={p.province}>{p.province}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Property Type</label>
              <select
                value={filters.propertyType}
                onChange={e => setFilters(prev => ({ ...prev, propertyType: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-slate-50"
              >
                <option value="">All Property Types</option>
                <option value="Villa">Villa / Luxury House</option>
                <option value="Luxury Apartment">Luxury Apartment</option>
                <option value="Commercial Plaza">Commercial Plaza</option>
                <option value="Corporate Office">Corporate Office</option>
                <option value="Capsule Smart House">Capsule Smart House</option>
                <option value="Commercial Plot">Commercial Plot</option>
                <option value="Residential Plot">Residential Plot</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Bedrooms</label>
              <div className="flex gap-1.5">
                {[null, 1, 2, 3, 4, 5].map((bed) => (
                  <button
                    key={bed === null ? 'any' : bed}
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, minBedrooms: bed }))}
                    className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                      filters.minBedrooms === bed
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50'
                    }`}
                  >
                    {bed === null ? 'Any' : `${bed}+`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchFilterBar;

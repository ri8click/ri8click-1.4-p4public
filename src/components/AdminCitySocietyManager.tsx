import React, { useState } from 'react';
import { 
  MapPin, 
  Building2, 
  Plus, 
  Trash2, 
  Check, 
  Sparkles, 
  X, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { ProvinceCityData } from '../types';

interface AdminCitySocietyManagerProps {
  provinceCityData: ProvinceCityData[];
  onUpdateProvinceCityData: (data: ProvinceCityData[]) => void;
  onClose?: () => void;
}

export const AdminCitySocietyManager: React.FC<AdminCitySocietyManagerProps> = ({
  provinceCityData,
  onUpdateProvinceCityData,
  onClose,
}) => {
  const [selectedProvince, setSelectedProvince] = useState<string>('Punjab');
  const [selectedCity, setSelectedCity] = useState<string>('Taxila');
  
  // New city form
  const [newCityName, setNewCityName] = useState<string>('');
  const [newCityProvince, setNewCityProvince] = useState<string>('Punjab');
  
  // New society form
  const [newSocietyName, setNewSocietyName] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const currentProvince = provinceCityData.find(p => p.province === selectedProvince) || provinceCityData[0];
  const currentCityObj = currentProvince?.cities.find(c => c.name === selectedCity) || currentProvince?.cities[0];

  const triggerSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Add new City
  const handleAddCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityName.trim()) return;

    const trimmed = newCityName.trim();
    const updated = provinceCityData.map(p => {
      if (p.province === newCityProvince) {
        // Check if city already exists
        if (p.cities.some(c => c.name.toLowerCase() === trimmed.toLowerCase())) {
          return p;
        }
        return {
          ...p,
          cities: [
            ...p.cities,
            {
              name: trimmed,
              societies: ['Main Boulevard', 'City Centre', 'Model Town']
            }
          ]
        };
      }
      return p;
    });

    onUpdateProvinceCityData(updated);
    setSelectedProvince(newCityProvince);
    setSelectedCity(trimmed);
    setNewCityName('');
    triggerSuccess(`Added City "${trimmed}" to ${newCityProvince} Province successfully.`);
  };

  // Add new Society to selected city
  const handleAddSociety = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSocietyName.trim() || !selectedCity) return;

    const trimmed = newSocietyName.trim();
    const updated = provinceCityData.map(p => {
      if (p.province === selectedProvince) {
        return {
          ...p,
          cities: p.cities.map(c => {
            if (c.name === selectedCity) {
              if (c.societies.includes(trimmed)) return c;
              return {
                ...c,
                societies: [...c.societies, trimmed]
              };
            }
            return c;
          })
        };
      }
      return p;
    });

    onUpdateProvinceCityData(updated);
    setNewSocietyName('');
    triggerSuccess(`Added Society "${trimmed}" to ${selectedCity} (${selectedProvince}) successfully.`);
  };

  // Remove a society
  const handleRemoveSociety = (societyToRemove: string) => {
    const updated = provinceCityData.map(p => {
      if (p.province === selectedProvince) {
        return {
          ...p,
          cities: p.cities.map(c => {
            if (c.name === selectedCity) {
              return {
                ...c,
                societies: c.societies.filter(s => s !== societyToRemove)
              };
            }
            return c;
          })
        };
      }
      return p;
    });

    onUpdateProvinceCityData(updated);
    triggerSuccess(`Removed Society "${societyToRemove}".`);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              Location & Societies Master Database
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage Punjab province cities (including Taxila) and societies (including Faisal Hills) dynamically.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Success Notification Alert */}
      {successMessage && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Province and City Selection Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
            Select Province
          </label>
          <select
            value={selectedProvince}
            onChange={e => {
              setSelectedProvince(e.target.value);
              const prov = provinceCityData.find(p => p.province === e.target.value);
              if (prov && prov.cities.length > 0) {
                setSelectedCity(prov.cities[0].name);
              }
            }}
            className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
          >
            {provinceCityData.map(p => (
              <option key={p.province} value={p.province}>
                {p.province} ({p.cities.length} Cities)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
            Select City in {selectedProvince}
          </label>
          <select
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
            className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
          >
            {currentProvince?.cities.map(c => (
              <option key={c.name} value={c.name}>
                {c.name} ({c.societies.length} Societies)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Two Column Section: Add New City & Add New Society */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Left: Add New City to Province */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-900" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Add New City to a Province
            </h4>
          </div>

          <form onSubmit={handleAddCity} className="space-y-2.5">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Target Province
              </label>
              <select
                value={newCityProvince}
                onChange={e => setNewCityProvince(e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              >
                {provinceCityData.map(p => (
                  <option key={p.province} value={p.province}>
                    {p.province}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                City Name (e.g. Taxila, Wah Cantt, Hasan Abdal, Chakwal)
              </label>
              <input
                type="text"
                value={newCityName}
                onChange={e => setNewCityName(e.target.value)}
                placeholder="Enter city name..."
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-3.5 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add City to Database</span>
            </button>
          </form>
        </div>

        {/* Right: Add New Society to Selected City */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Add Society to <span className="text-blue-600">{selectedCity}</span>
            </h4>
          </div>

          <form onSubmit={handleAddSociety} className="space-y-2.5">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Society Name (e.g. Faisal Hills Block D, Kohistan Enclave, New City)
              </label>
              <input
                type="text"
                value={newSocietyName}
                onChange={e => setNewSocietyName(e.target.value)}
                placeholder="e.g. Faisal Hills Executive Block..."
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-3.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Society to {selectedCity}</span>
            </button>
          </form>
        </div>

      </div>

      {/* Existing Societies in Selected City */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Active Societies in {selectedCity}, {selectedProvince} ({currentCityObj?.societies.length || 0})
            </h4>
          </div>
          <span className="text-[11px] text-slate-500">Click (×) to delete society</span>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {currentCityObj?.societies.map((soc, idx) => (
            <div
              key={idx}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
                soc.toLowerCase().includes('faisal hills') || soc.toLowerCase().includes('taxila')
                  ? 'bg-blue-50 text-blue-700 border-blue-200 font-semibold'
                  : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              <span>{soc}</span>
              <button
                onClick={() => handleRemoveSociety(soc)}
                className="text-slate-400 hover:text-red-600 transition-colors p-0.5"
                title={`Remove ${soc}`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminCitySocietyManager;

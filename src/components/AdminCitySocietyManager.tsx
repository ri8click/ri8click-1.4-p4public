import React, { useState } from 'react';
import { MapPin, Building2, Plus, Trash2, Check, Sparkles, X, ShieldCheck, AlertCircle, Globe } from 'lucide-react';
import { ProvinceCityData } from '../types';

interface AdminCitySocietyManagerProps {
  provinceCityData: ProvinceCityData[];
  onUpdateProvinceCityData: (updatedData: ProvinceCityData[]) => void;
  onClose?: () => void;
}

export const AdminCitySocietyManager: React.FC<AdminCitySocietyManagerProps> = ({
  provinceCityData,
  onUpdateProvinceCityData,
  onClose
}) => {
  const [selectedProvince, setSelectedProvince] = useState<string>(
    provinceCityData[0]?.province || 'Punjab'
  );
  const [selectedCity, setSelectedCity] = useState<string>(
    provinceCityData[0]?.cities[0]?.name || 'Taxila'
  );

  const [newProvinceName, setNewProvinceName] = useState('');
  const [newProvinceInitialCity, setNewProvinceInitialCity] = useState('');
  const [newCityName, setNewCityName] = useState('');
  const [newCityProvince, setNewCityProvince] = useState(
    provinceCityData[0]?.province || 'Punjab'
  );
  const [newSocietyName, setNewSocietyName] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const currentProvinceObj = provinceCityData.find(p => p.province === selectedProvince);
  const currentCityObj = currentProvinceObj?.cities.find(c => c.name === selectedCity);

  const triggerSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const handleAddProvince = (e: React.FormEvent) => {
    e.preventDefault();
    const provTrimmed = newProvinceName.trim();
    const cityTrimmed = newProvinceInitialCity.trim() || 'Central City';
    if (!provTrimmed) return;

    const exists = provinceCityData.some(
      p => p.province.toLowerCase() === provTrimmed.toLowerCase()
    );
    if (exists) {
      triggerSuccess(`Province "${provTrimmed}" already exists.`);
      return;
    }

    const updated: ProvinceCityData[] = [
      ...provinceCityData,
      {
        province: provTrimmed,
        cities: [
          {
            name: cityTrimmed,
            isFeatured: true,
            societies: ['Main Boulevard', 'City Centre', 'Executive Enclave']
          }
        ]
      }
    ];

    onUpdateProvinceCityData(updated);
    setSelectedProvince(provTrimmed);
    setNewCityProvince(provTrimmed);
    setSelectedCity(cityTrimmed);
    setNewProvinceName('');
    setNewProvinceInitialCity('');
    triggerSuccess(`Added Region "${provTrimmed}" with city "${cityTrimmed}" globally!`);
  };

  const handleAddCity = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedCity = newCityName.trim();
    if (!trimmedCity) return;

    const updated = provinceCityData.map(prov => {
      if (prov.province !== newCityProvince) return prov;
      const exists = prov.cities.some(c => c.name.toLowerCase() === trimmedCity.toLowerCase());
      if (exists) return prov;
      return {
        ...prov,
        cities: [
          ...prov.cities,
          {
            name: trimmedCity,
            isFeatured: true,
            societies: ['Main Boulevard', 'City Centre', 'Model Town']
          }
        ]
      };
    });

    onUpdateProvinceCityData(updated);
    setSelectedProvince(newCityProvince);
    setSelectedCity(trimmedCity);
    setNewCityName('');
    triggerSuccess(`City "${trimmedCity}" added to ${newCityProvince} and synced across the site!`);
  };

  const handleAddSociety = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSociety = newSocietyName.trim();
    if (!trimmedSociety) return;

    const updated = provinceCityData.map(prov => {
      if (prov.province !== selectedProvince) return prov;
      return {
        ...prov,
        cities: prov.cities.map(city => {
          if (city.name !== selectedCity) return city;
          if (city.societies.some(s => s.toLowerCase() === trimmedSociety.toLowerCase())) {
            return city;
          }
          return {
            ...city,
            societies: [trimmedSociety, ...city.societies]
          };
        })
      };
    });

    onUpdateProvinceCityData(updated);
    setNewSocietyName('');
    triggerSuccess(`Society "${trimmedSociety}" added to ${selectedCity} and available in all forms!`);
  };

  const handleRemoveSociety = (societyToRemove: string) => {
    const updated = provinceCityData.map(prov => {
      if (prov.province !== selectedProvince) return prov;
      return {
        ...prov,
        cities: prov.cities.map(city => {
          if (city.name !== selectedCity) return city;
          return {
            ...city,
            societies: city.societies.filter(s => s !== societyToRemove)
          };
        })
      };
    });

    onUpdateProvinceCityData(updated);
    triggerSuccess(`Removed "${societyToRemove}" from ${selectedCity}.`);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider">
            <MapPin className="w-3 h-3" />
            <span>Global Location, City & Society Database</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            Super Admin Locations, Cities & Housing Societies Manager
          </h3>
          <p className="text-xs text-slate-400">
            Add any missing Province/Region, City, or Housing Society/Block. Changes immediately populate Search Filters, Post Property, and Admin Hub for all users.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Close</span>
          </button>
        )}
      </div>

      {successMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* 3-Column Add Forms: Province, City, Society */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 1. Add New Province / Region */}
        <form
          onSubmit={handleAddProvince}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3.5"
        >
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Globe className="w-4 h-4 text-indigo-600" />
            <span>1. Add New Province / Region</span>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Province / Region Name
            </label>
            <input
              type="text"
              value={newProvinceName}
              onChange={e => setNewProvinceName(e.target.value)}
              placeholder="e.g. Azad Kashmir (AJK)"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
              First Major City
            </label>
            <input
              type="text"
              value={newProvinceInitialCity}
              onChange={e => setNewProvinceInitialCity(e.target.value)}
              placeholder="e.g. Muzaffarabad / Mirpur"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Province / Region</span>
          </button>
        </form>

        {/* 2. Add New City to Province */}
        <form
          onSubmit={handleAddCity}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3.5"
        >
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>2. Add New City to Province</span>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Select Province
            </label>
            <select
              value={newCityProvince}
              onChange={e => setNewCityProvince(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
            >
              {provinceCityData.map(p => (
                <option key={p.province} value={p.province}>
                  {p.province}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
              New City Name
            </label>
            <input
              type="text"
              value={newCityName}
              onChange={e => setNewCityName(e.target.value)}
              placeholder="e.g. Wah Cantt, Attock, Murree,chakwal"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add City to Database</span>
          </button>
        </form>

        {/* 3. Add Society to Selected City */}
        <form
          onSubmit={handleAddSociety}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3.5"
        >
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>3. Add Society to {selectedCity}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-semibold uppercase text-slate-500 mb-1">
                Province
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
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
              >
                {provinceCityData.map(p => (
                  <option key={p.province} value={p.province}>
                    {p.province}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase text-slate-500 mb-1">
                City
              </label>
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
              >
                {currentProvinceObj?.cities.map(c => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Society / Sector / Block Name
            </label>
            <input
              type="text"
              value={newSocietyName}
              onChange={e => setNewSocietyName(e.target.value)}
              placeholder="e.g. Faisal Hills Block D, Kohistan Enclave"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Society to {selectedCity}</span>
          </button>
        </form>
      </div>

      {/* Active Societies Browser */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Active Societies in {selectedCity}, {selectedProvince} ({currentCityObj?.societies.length || 0})
            </h4>
            <p className="text-xs text-slate-500">
              Click any city pill below to inspect or manage its registered housing societies.
            </p>
          </div>
        </div>

        {/* City Pills */}
        <div className="flex flex-wrap gap-2">
          {currentProvinceObj?.cities.map(c => (
            <button
              key={c.name}
              type="button"
              onClick={() => setSelectedCity(c.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                selectedCity === c.name
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {c.name} ({c.societies.length})
            </button>
          ))}
        </div>

        {/* Societies Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 pt-2">
          {currentCityObj?.societies.map(soc => (
            <div
              key={soc}
              className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800"
            >
              <span className="truncate">{soc}</span>
              <button
                type="button"
                onClick={() => handleRemoveSociety(soc)}
                className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                title={`Remove ${soc}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCitySocietyManager;

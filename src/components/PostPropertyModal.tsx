// FILE: src/components/PostPropertyModal.tsx
import React, { useState } from 'react';
import {
  X,
  PlusCircle,
  ShieldCheck,
  AlertTriangle,
  MapPin,
  Plus,
  CheckCircle2
} from 'lucide-react';
import {
  Property,
  AgencyAccount,
  ProvinceCityData,
  PropertyCategory,
  PropertyPurpose
} from '../types';
import LocationPickerMap from './LocationPickerMap';
import PropertyMediaUploader from './PropertyMediaUploader';

interface PostPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  agencies: AgencyAccount[];
  selectedAgencyId: string;
  provinceCityData: ProvinceCityData[];
  onAddProperty: (prop: Property) => void;
  onOpenAdmin: () => void;
  isSuperAdmin?: boolean;
  onOpenRoleSwitcher?: () => void;
  onUpdateProvinceCityData?: (data: ProvinceCityData[]) => void;
}

export const PostPropertyModal: React.FC<PostPropertyModalProps> = ({
  isOpen,
  onClose,
  agencies,
  selectedAgencyId,
  provinceCityData,
  onAddProperty,
  onOpenAdmin,
  isSuperAdmin = false,
  onOpenRoleSwitcher,
  onUpdateProvinceCityData
}) => {
  const currentAgency = agencies.find(a => a.id === selectedAgencyId) || agencies[0];
  const userIsSuperAdmin = Boolean(isSuperAdmin);

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<Exclude<PropertyCategory, 'all'>>('residential');
  const [type, setType] = useState('Villa');
  const [purpose, setPurpose] = useState<PropertyPurpose>('for_sale');
  const [price, setPrice] = useState(35000000);
  const [priceFormatted, setPriceFormatted] = useState('PKR 3.50 Crore');
  const [province, setProvince] = useState('Punjab');
  const [city, setCity] = useState('Taxila');
  const [society, setSociety] = useState('Faisal Hills');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState<number>(33.7297);
  const [longitude, setLongitude] = useState<number>(72.8258);
  const [nearbyLandmarksInput, setNearbyLandmarksInput] = useState(
    'Main GT Road (N-5), Faisal Hills Main Gate, Taxila Museum'
  );
  const [area, setArea] = useState('10');
  const [areaUnit, setAreaUnit] = useState<'Marla' | 'Kanal' | 'Sq Ft' | 'Sq Yd'>('Marla');
  const [bedrooms, setBedrooms] = useState(4);
  const [bathrooms, setBathrooms] = useState(5);
  const [floors, setFloors] = useState(2);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
  ]);
  const [virtualTourVideoUrl, setVirtualTourVideoUrl] = useState('');
  const [virtualTourVideoTitle, setVirtualTourVideoTitle] = useState('');

  const [showQuickAddLocation, setShowQuickAddLocation] = useState(false);
  const [quickNewCity, setQuickNewCity] = useState('');
  const [quickNewSociety, setQuickNewSociety] = useState('');
  const [quickAddNotice, setQuickAddNotice] = useState<string | null>(null);

  if (!isOpen || !currentAgency) return null;

  const isQuotaReached =
    !userIsSuperAdmin &&
    ((currentAgency as any).totalPosts || 0) >= ((currentAgency as any).postLimit || 25);

  const selectedProvinceData = provinceCityData.find(p => p.province === province);
  const selectedCityData = selectedProvinceData?.cities.find(c => c.name === city);

  const handleProvinceChange = (prov: string) => {
    setProvince(prov);
    const provObj = provinceCityData.find(p => p.province === prov);
    if (provObj && provObj.cities.length > 0) {
      setCity(provObj.cities[0].name);
      setSociety(provObj.cities[0].societies[0] || '');
    }
  };

  const handleCityChange = (c: string) => {
    setCity(c);
    const cityObj = selectedProvinceData?.cities.find(item => item.name === c);
    if (cityObj && cityObj.societies.length > 0) {
      setSociety(cityObj.societies[0]);
    }
  };

  const handleQuickSaveLocation = () => {
    if (!onUpdateProvinceCityData) return;
    const trimmedCity = quickNewCity.trim();
    const trimmedSociety = quickNewSociety.trim();
    if (!trimmedCity && !trimmedSociety) return;

    const targetCityName = trimmedCity || city;
    const updatedData = provinceCityData.map(provItem => {
      if (provItem.province !== province) return provItem;
      const existingCity = provItem.cities.find(
        c => c.name.toLowerCase() === targetCityName.toLowerCase()
      );
      if (existingCity) {
        const updatedCities = provItem.cities.map(c => {
          if (c.name.toLowerCase() !== targetCityName.toLowerCase()) return c;
          const societyExists = trimmedSociety
            ? c.societies.some(s => s.toLowerCase() === trimmedSociety.toLowerCase())
            : true;
          return {
            ...c,
            societies:
              trimmedSociety && !societyExists
                ? [...c.societies, trimmedSociety]
                : c.societies
          };
        });
        return { ...provItem, cities: updatedCities };
      } else {
        return {
          ...provItem,
          cities: [
            ...provItem.cities,
            {
              name: targetCityName,
              isFeatured: true,
              societies: trimmedSociety ? [trimmedSociety] : ['Main Sector']
            }
          ]
        };
      }
    });

    onUpdateProvinceCityData(updatedData);
    setCity(targetCityName);
    if (trimmedSociety) setSociety(trimmedSociety);
    setQuickNewCity('');
    setQuickNewSociety('');
    setQuickAddNotice(`Added ${trimmedSociety ? `"${trimmedSociety}" in ` : ''}"${targetCityName}"!`);
    setTimeout(() => {
      setQuickAddNotice(null);
      setShowQuickAddLocation(false);
    }, 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isQuotaReached) return;

    const finalImages =
      images.length > 0
        ? images
        : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'];

    const landmarksList = nearbyLandmarksInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const cleanVideoUrl = virtualTourVideoUrl.trim();

    const newProp: Property = {
      id: `prop-${Date.now()}`,
      title: title || `${area} ${areaUnit} ${type} in ${society}`,
      tagline: tagline || `Verified ${type} in ${society}, ${city}`,
      description:
        description ||
        `Prime ${area} ${areaUnit} ${type.toLowerCase()} located in ${society}, ${city}. Physically verified and watermarked by ri8click.com.`,
      category,
      type,
      purpose,
      price: Number(price),
      priceFormatted: priceFormatted || `PKR ${(Number(price) / 10000000).toFixed(2)} Crore`,
      currency: 'PKR',
      location: {
        province,
        city,
        society,
        address: address || `Main Boulevard, ${society}, ${city}`,
        latitude,
        longitude,
        mapZoom: 15,
        nearbyLandmarks: landmarksList.length > 0 ? landmarksList : undefined
      },
      area: Number(area) || area,
      areaUnit,
      bedrooms: category !== 'commercial' ? Number(bedrooms) : undefined,
      bathrooms: category !== 'commercial' ? Number(bathrooms) : undefined,
      floors: Number(floors),
      features: [
        'ri8click Watermark Verified',
        'Turnkey Construction Standard',
        'UPVC Double Glazed Windows',
        '24/7 Security & CCTV',
        'Underground Electricity',
        ...(cleanVideoUrl ? ['3D Movie Tour Available'] : [])
      ],
      images: finalImages,
      watermark: true,
      agencyId: currentAgency.id,
      agentName: userIsSuperAdmin ? 'Ri8Click Executive Desk' : currentAgency.name,
      agentCompany: userIsSuperAdmin ? 'Ri8Click Consortium' : (currentAgency as any).companyName || currentAgency.name,
      agentPhone: currentAgency.phone,
      agentWhatsApp: currentAgency.whatsapp,
      agentAvatar: (currentAgency as any).avatar || currentAgency.logo,
      agentRating: currentAgency.rating,
      isFeatured: true,
      isHotCommercial: category === 'commercial',
      status: 'active',
      viewsCount: 1,
      savesCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      virtualTourVideoUrl: cleanVideoUrl || undefined,
      virtualTourVideoTitle:
        cleanVideoUrl
          ? virtualTourVideoTitle.trim() || `${title || type} - Video Walkthrough`
          : undefined
    };

    onAddProperty(newProp);
    setTitle('');
    setTagline('');
    setDescription('');
    setVirtualTourVideoUrl('');
    setVirtualTourVideoTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Multi-Agent Listing Portal (Auto-Watermarked &amp; Video Ready)</span>
            </div>
            <h3 className="text-base font-extrabold mt-0.5">Post New Property Ad</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={(currentAgency as any).avatar || currentAgency.logo}
                alt={currentAgency.name}
                className="w-11 h-11 rounded-xl object-cover border border-slate-300"
              />
              <div>
                <div className="text-xs font-extrabold text-slate-900">
                  Posting as: {(currentAgency as any).companyName || currentAgency.name}
                </div>
                <div className="text-[11px] text-slate-500">
                  Agent: {currentAgency.name} ({currentAgency.city})
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold uppercase text-slate-400">Post Quota</div>
              <div
                className={`text-sm font-black ${
                  isQuotaReached ? 'text-rose-600' : 'text-emerald-600'
                }`}
              >
                {userIsSuperAdmin
                  ? 'Unlimited (Super Admin)'
                  : `${(currentAgency as any).totalPosts || 0} / ${(currentAgency as any).postLimit || 25} Used`}
              </div>
            </div>
          </div>

          {isQuotaReached ? (
            <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-3">
              <AlertTriangle className="w-10 h-10 text-rose-600 mx-auto" />
              <h4 className="text-base font-extrabold text-rose-950">
                Agency Post Quota Limit Reached
              </h4>
              <p className="text-xs text-rose-700 max-w-md mx-auto">
                Your agency has reached its maximum allowed property posts. Please contact the Super Admin to increase your agency posting limit.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAdmin();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-amber-400 font-bold text-xs cursor-pointer"
                >
                  Open Quota Admin
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Prime 1-Kanal Corner Villa in Faisal Hills Executive Block"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Tagline / Special Highlight
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Margalla View • Double Story • Ri8Click UPVC Glazing"
                    value={tagline}
                    onChange={e => setTagline(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Purpose
                  </label>
                  <select
                    value={purpose}
                    onChange={e => setPurpose(e.target.value as PropertyPurpose)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-600"
                  >
                    <option value="for_sale">For Sale</option>
                    <option value="for_rent">For Rent / Lease</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-600"
                  >
                    <option value="residential">Residential (Villa / Plot / Apt)</option>
                    <option value="commercial">Commercial (Plaza / Shop / Office)</option>
                    <option value="modular">Modular / Space Capsule Smart Home</option>
                    <option value="projects">New Megaprojects &amp; UPVC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Property Type
                  </label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-600"
                  >
                    <option value="Villa">Luxury Villa / House</option>
                    <option value="Commercial Plaza">Commercial Plaza / Building</option>
                    <option value="Corporate Office">Corporate Office Suite</option>
                    <option value="Retail Shop">Commercial Retail Shop</option>
                    <option value="Capsule Smart House">Space Capsule Smart House</option>
                    <option value="Residential Plot">Residential Plot</option>
                    <option value="Commercial Plot">Commercial Plot</option>
                    <option value="Luxury Apartment">Luxury Apartment / Penthouse</option>
                  </select>
                </div>

                <div className="sm:col-span-2 p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span>Location Details &amp; Map Calibration</span>
                    </div>
                    {onUpdateProvinceCityData && (
                      <button
                        type="button"
                        onClick={() => setShowQuickAddLocation(prev => !prev)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10.5px] font-bold transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>{showQuickAddLocation ? 'Cancel' : '+ Add Missing City / Society'}</span>
                      </button>
                    )}
                  </div>

                  {showQuickAddLocation && (
                    <div className="p-3 bg-white rounded-xl border border-blue-200 space-y-2.5 shadow-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={quickNewCity}
                          onChange={e => setQuickNewCity(e.target.value)}
                          placeholder={`New City (or leave blank for ${city})`}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          value={quickNewSociety}
                          onChange={e => setQuickNewSociety(e.target.value)}
                          placeholder="New Society / Sector Name"
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={handleQuickSaveLocation}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                        >
                          Save &amp; Select Location
                        </button>
                      </div>
                    </div>
                  )}

                  {quickAddNotice && (
                    <div className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{quickAddNotice}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                        Province
                      </label>
                      <select
                        value={province}
                        onChange={e => handleProvinceChange(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      >
                        {provinceCityData.map(p => (
                          <option key={p.province} value={p.province}>
                            {p.province}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                        City
                      </label>
                      <select
                        value={city}
                        onChange={e => handleCityChange(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      >
                        {selectedProvinceData?.cities.map(c => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                        Society / Sector
                      </label>
                      <select
                        value={society}
                        onChange={e => setSociety(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      >
                        {selectedCityData?.societies.map(s => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                      Full Street Address
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Plot #14, Street 4, Executive Block, Faisal Hills"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <LocationPickerMap
                    location={{
                      province,
                      city,
                      society,
                      address,
                      latitude,
                      longitude,
                      nearbyLandmarks: nearbyLandmarksInput
                        .split(',')
                        .map(s => s.trim())
                        .filter(Boolean)
                    }}
                    onChangeLocation={updatedLoc => {
                      if (updatedLoc.city) setCity(updatedLoc.city);
                      if (updatedLoc.society) setSociety(updatedLoc.society);
                      if (updatedLoc.address !== undefined) setAddress(updatedLoc.address);
                      if (updatedLoc.latitude !== undefined) setLatitude(updatedLoc.latitude);
                      if (updatedLoc.longitude !== undefined) setLongitude(updatedLoc.longitude);
                      if (updatedLoc.nearbyLandmarks) {
                        setNearbyLandmarksInput(updatedLoc.nearbyLandmarks.join(', '));
                      }
                    }}
                    provinceCityData={provinceCityData}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Price (Numeric PKR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Formatted Price Label *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PKR 3.50 Crore"
                    value={priceFormatted}
                    onChange={e => setPriceFormatted(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Area Size
                    </label>
                    <input
                      type="text"
                      value={area}
                      onChange={e => setArea(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Unit
                    </label>
                    <select
                      value={areaUnit}
                      onChange={e => setAreaUnit(e.target.value as any)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    >
                      <option value="Marla">Marla</option>
                      <option value="Kanal">Kanal</option>
                      <option value="Sq Ft">Sq Ft</option>
                      <option value="Sq Yd">Sq Yd</option>
                    </select>
                  </div>
                </div>

                {category !== 'commercial' && (
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Beds
                      </label>
                      <input
                        type="number"
                        value={bedrooms}
                        onChange={e => setBedrooms(Number(e.target.value))}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Baths
                      </label>
                      <input
                        type="number"
                        value={bathrooms}
                        onChange={e => setBathrooms(Number(e.target.value))}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Floors
                      </label>
                      <input
                        type="number"
                        value={floors}
                        onChange={e => setFloors(Number(e.target.value))}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                  </div>
                )}

                <div className="sm:col-span-2">
                  <PropertyMediaUploader
                    images={images}
                    onChangeImages={setImages}
                    videoUrl={virtualTourVideoUrl}
                    onChangeVideoUrl={setVirtualTourVideoUrl}
                    videoTitle={virtualTourVideoTitle}
                    onChangeVideoTitle={setVirtualTourVideoTitle}
                    isSuperAdmin={userIsSuperAdmin}
                    onOpenRoleSwitcher={onOpenRoleSwitcher}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Property Description &amp; Specifications
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe construction quality, NOC status, nearby landmarks, and investment highlights..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish Listing Globally</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPropertyModal;

import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  Building2, 
  MapPin, 
  DollarSign, 
  Bed, 
  Bath, 
  Maximize2, 
  ShieldCheck, 
  Sparkles,
  AlertCircle,
  Check
} from 'lucide-react';
import { Property, AgencyAccount, ProvinceCityData, PropertyCategory, LocationData } from '../types';
import { WatermarkBadge } from './WatermarkBadge';
import { Ri8ClickLogo } from './Ri8ClickLogo';
import { LocationPickerMap } from './LocationPickerMap';
import { PropertyMediaUploader } from './PropertyMediaUploader';

interface PostPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAgency: AgencyAccount;
  provinceCityData: ProvinceCityData[];
  onAddProperty: (property: Property) => void;
  onOpenAdmin: () => void;
  currentRole?: 'admin' | 'agency' | 'customer';
  isSuperAdmin?: boolean;
  onOpenRoleSwitcher?: () => void;
}

export const PostPropertyModal: React.FC<PostPropertyModalProps> = ({
  isOpen,
  onClose,
  currentAgency,
  provinceCityData,
  onAddProperty,
  onOpenAdmin,
  currentRole = 'agency',
  isSuperAdmin,
  onOpenRoleSwitcher,
}) => {
  if (!isOpen) return null;

  const userIsSuperAdmin = isSuperAdmin ?? (currentRole === 'admin');

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [purpose, setPurpose] = useState<'for_sale' | 'for_rent'>('for_sale');
  const [category, setCategory] = useState<PropertyCategory>('residential');
  const [type, setType] = useState('Luxury Villa');
  const [price, setPrice] = useState<number>(35000000);
  const [priceFormatted, setPriceFormatted] = useState('PKR 3.50 Crore');
  const [area, setArea] = useState('10');
  const [areaUnit, setAreaUnit] = useState('Marla');
  const [bedrooms, setBedrooms] = useState<number>(4);
  const [bathrooms, setBathrooms] = useState<number>(5);
  const [floors, setFloors] = useState<number>(2);
  const [province, setProvince] = useState('Punjab');
  const [city, setCity] = useState('Taxila');
  const [society, setSociety] = useState('Faisal Hills');
  const [address, setAddress] = useState('Executive Block, Faisal Hills, GT Road Taxila');
  const [latitude, setLatitude] = useState<number>(33.7297);
  const [longitude, setLongitude] = useState<number>(72.8258);
  const [nearbyLandmarks, setNearbyLandmarks] = useState<string[]>(['Faisal Hills Main Boulevard', 'Commercial Broadway Gate', 'Margalla View Point']);
  const [description, setDescription] = useState('Newly constructed luxury designer property featuring Ri8Click UPVC thermal insulation windows, premium fittings, high rental potential, and 100% verified legal NOC clearance.');
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
  ]);
  const [virtualTourVideoUrl, setVirtualTourVideoUrl] = useState<string>('');
  const [virtualTourVideoTitle, setVirtualTourVideoTitle] = useState<string>('');

  // Check quota limit
  const isQuotaReached = currentAgency.totalPosts >= currentAgency.postLimit;

  // Available societies for selected city
  const selectedProvinceData = provinceCityData.find(p => p.province === province);
  const selectedCityData = selectedProvinceData?.cities.find(c => c.name === city);
  const availableSocieties = selectedCityData?.societies || ['Faisal Hills', 'Margalla View', 'Cantt'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isQuotaReached) return;

    const newProp: Property = {
      id: `prop-${Date.now()}`,
      title: title.trim(),
      tagline: tagline.trim() || undefined,
      description: description.trim(),
      purpose,
      category: (category === 'all' ? 'residential' : category),
      type,
      price,
      priceFormatted: priceFormatted.trim(),
      location: {
        province,
        city,
        society,
        address,
        latitude,
        longitude,
        nearbyLandmarks
      },
      area: area.trim(),
      areaUnit,
      bedrooms: category === 'commercial' ? undefined : bedrooms,
      bathrooms: category === 'commercial' ? undefined : bathrooms,
      floors,
      images: images.length > 0 ? images : [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
      ],
      virtualTourVideoUrl: userIsSuperAdmin ? (virtualTourVideoUrl.trim() || undefined) : undefined,
      virtualTourVideoTitle: userIsSuperAdmin ? (virtualTourVideoTitle.trim() || undefined) : undefined,
      hasVirtualTour: userIsSuperAdmin ? Boolean(virtualTourVideoUrl.trim()) : false,
      watermark: true,
      isFeatured: true,
      agencyId: currentAgency.id,
      agentName: currentAgency.name,
      agentCompany: currentAgency.companyName,
      agentPhone: currentAgency.phone,
      agentWhatsApp: currentAgency.whatsapp,
      agentAvatar: currentAgency.avatar,
      agentRating: currentAgency.rating,
      features: [
        'ri8click Watermark Verified',
        'Turnkey Construction Standard',
        'UPVC Double Glazed Windows',
        '24/7 Security & CCTV',
        'Underground Electricity',
        'Commercial Broadway Proximity'
      ],
      createdAt: new Date().toISOString()
    };

    onAddProperty(newProp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Ri8ClickLogo size="sm" showSubtitle={false} className="h-7 w-auto" />
            <div className="border-l border-slate-700 pl-3">
              <h3 className="text-sm font-bold text-white">
                Post New Property with Watermark
              </h3>
              <p className="text-[11px] text-slate-400">
                Posting as: <strong className="text-slate-200">{currentAgency.companyName}</strong> (Quota: {currentAgency.totalPosts}/{currentAgency.postLimit} Used)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quota limit warning */}
        {isQuotaReached ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto border border-red-200">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Post Quota Limit Reached</h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Your agency <strong>{currentAgency.companyName}</strong> has reached its maximum limit of {currentAgency.postLimit} posts. 
              Please increase your quota limit in the Admin & Quota Management portal to publish more properties.
            </p>
            <div className="flex justify-center gap-2.5 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenAdmin();
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-2xs"
              >
                Open Quota Admin to Change Limit
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* Main Form */
          <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-4 flex-1 bg-white">
            
            {/* Title & Tagline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Property Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. 10 Marla Brand New Modern Villa"
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Tagline / Special Feature
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={e => setTagline(e.target.value)}
                  placeholder="e.g. Near Margalla Hills View • UPVC Fitted"
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Purpose, Category, Type */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Purpose
                </label>
                <select
                  value={purpose}
                  onChange={e => setPurpose(e.target.value as any)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="for_sale">For Sale</option>
                  <option value="for_rent">For Rent</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial (High ROI)</option>
                  <option value="modular">Capsule & Modular</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Property Type
                </label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="Luxury Villa">Luxury Villa</option>
                  <option value="Commercial Plaza">Commercial Plaza</option>
                  <option value="Corporate Office">Corporate Office</option>
                  <option value="Retail Shop">Retail Shop</option>
                  <option value="Capsule Smart House">Capsule Smart House</option>
                  <option value="Residential Plot">Residential Plot</option>
                  <option value="Apartment">Apartment</option>
                </select>
              </div>
            </div>

            {/* Location (Province, City, Society) & Interactive Map Coordinates */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                Location Details & Map Pin Calibration
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Province</label>
                  <select
                    value={province}
                    onChange={e => {
                      setProvince(e.target.value);
                      const p = provinceCityData.find(pr => pr.province === e.target.value);
                      if (p && p.cities.length > 0) setCity(p.cities[0].name);
                    }}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:border-blue-600"
                  >
                    {provinceCityData.map(p => (
                      <option key={p.province} value={p.province}>{p.province}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">City</label>
                  <select
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-blue-600"
                  >
                    {selectedProvinceData?.cities.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Society</label>
                  <select
                    value={society}
                    onChange={e => setSociety(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-blue-600"
                  >
                    {availableSocieties.map((s, idx) => (
                      <option key={idx} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Full Street Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="e.g. Plot #124, Executive Block, Faisal Hills Taxila"
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              {/* Interactive Location Map Pin & GPS Coordinate Calibrator */}
              <div className="pt-2">
                <LocationPickerMap
                  location={{
                    province,
                    city,
                    society,
                    address,
                    latitude,
                    longitude,
                    nearbyLandmarks
                  }}
                  onChangeLocation={updated => {
                    if (updated.province) setProvince(updated.province);
                    if (updated.city) setCity(updated.city);
                    if (updated.society) setSociety(updated.society);
                    if (updated.address) setAddress(updated.address);
                    if (updated.latitude !== undefined) setLatitude(updated.latitude);
                    if (updated.longitude !== undefined) setLongitude(updated.longitude);
                    if (updated.nearbyLandmarks) setNearbyLandmarks(updated.nearbyLandmarks);
                  }}
                  provinceCityData={provinceCityData}
                />
              </div>
            </div>

            {/* Pricing & Area */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Price (Numeric PKR)
                </label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Display Price
                </label>
                <input
                  type="text"
                  required
                  value={priceFormatted}
                  onChange={e => setPriceFormatted(e.target.value)}
                  placeholder="PKR 3.50 Crore"
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Area Size
                </label>
                <input
                  type="text"
                  required
                  value={area}
                  onChange={e => setArea(e.target.value)}
                  placeholder="10"
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Unit
                </label>
                <select
                  value={areaUnit}
                  onChange={e => setAreaUnit(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="Marla">Marla</option>
                  <option value="Kanal">Kanal</option>
                  <option value="Sq Ft">Sq Ft</option>
                  <option value="Sq Yds">Sq Yds</option>
                </select>
              </div>
            </div>

            {/* Beds, Baths, Floors */}
            {category !== 'commercial' && (
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    value={bedrooms}
                    onChange={e => setBedrooms(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    value={bathrooms}
                    onChange={e => setBathrooms(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Storey / Floors
                  </label>
                  <input
                    type="number"
                    value={floors}
                    onChange={e => setFloors(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            )}

            {/* Property Media Uploader: Multi-file Local / URL + Super Admin Short Movie Clip */}
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

            {/* Description */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Property Description & Features
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-2xs flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5 text-blue-400" />
                <span>Publish Listing</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default PostPropertyModal;

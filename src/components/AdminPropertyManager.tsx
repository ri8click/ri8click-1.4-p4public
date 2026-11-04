import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff,
  MapPin, 
  Sparkles, 
  Check, 
  X, 
  ExternalLink, 
  Navigation,
  ShieldCheck,
  Filter,
  RotateCcw,
  AlertTriangle,
  DollarSign,
  Layers,
  Image as ImageIcon,
  Compass,
  Video,
  Lock,
  Plus
} from 'lucide-react';
import { Property, AgencyAccount, ProvinceCityData, PropertyCategory, LocationData } from '../types';
import { UserAccount, PAKISTAN_AGENT_AVATARS } from '../data/defaultAccounts';
import { LocationPickerMap } from './LocationPickerMap';
import { LocationMapView } from './LocationMapView';
import { WatermarkBadge } from './WatermarkBadge';
import { PropertyMediaUploader } from './PropertyMediaUploader';

interface AdminPropertyManagerProps {
  properties: Property[];
  agencies: AgencyAccount[];
  provinceCityData: ProvinceCityData[];
  onUpdateProvinceCityData?: (updated: ProvinceCityData[]) => void;
  onUpdateProperties: (updatedProperties: Property[]) => void;
  onResetToDefaults?: () => void;
  onViewProperty?: (property: Property) => void;
  onOpenVirtualTour?: (property: Property) => void;
  currentRole?: 'admin' | 'agency' | 'customer';
  isSuperAdmin?: boolean;
  currentUser?: UserAccount | null;
  onOpenRoleSwitcher?: () => void;
}

export const AdminPropertyManager: React.FC<AdminPropertyManagerProps> = ({
  properties,
  agencies,
  provinceCityData,
  onUpdateProvinceCityData,
  onUpdateProperties,
  onResetToDefaults,
  onViewProperty,
  onOpenVirtualTour,
  currentRole = 'admin',
  isSuperAdmin,
  currentUser,
  onOpenRoleSwitcher
}) => {
  const userIsSuperAdmin =
    isSuperAdmin ??
    (currentRole === 'admin' ||
      currentUser?.role === 'admin' ||
      currentUser?.permissions?.includes('all'));

  const canManageThisProperty = (prop: Property): boolean => {
    if (userIsSuperAdmin) return true;
    if (currentUser?.role === 'agency' && currentUser.agencyId) {
      return prop.agencyId === currentUser.agencyId;
    }
    return false;
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'sold'>('all');
  const [agencyFilter, setAgencyFilter] = useState<string>('all');

  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deletingProperty, setDeletingProperty] = useState<Property | null>(null);
  const [mapPreviewProperty, setMapPreviewProperty] = useState<Property | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formCategory, setFormCategory] = useState<PropertyCategory>('residential');
  const [formType, setFormType] = useState('Villa');
  const [formPurpose, setFormPurpose] = useState<'for_sale' | 'for_rent'>('for_sale');
  const [formPrice, setFormPrice] = useState<number>(35000000);
  const [formPriceFormatted, setFormPriceFormatted] = useState('PKR 3.50 Crore');
  const [formArea, setFormArea] = useState<string>('10');
  const [formAreaUnit, setFormAreaUnit] = useState<'Marla' | 'Kanal' | 'Sq Ft' | 'Sq Yds'>('Marla');
  const [formBedrooms, setFormBedrooms] = useState<number>(4);
  const [formBathrooms, setFormBathrooms] = useState<number>(5);
  const [formFloors, setFormFloors] = useState<number>(2);
  const [formParking, setFormParking] = useState<number>(2);
  const [formDescription, setFormDescription] = useState('');
  const [formFeaturesText, setFormFeaturesText] = useState('');
  const [formImages, setFormImages] = useState<string[]>([]);
  const [formVirtualTourVideoUrl, setFormVirtualTourVideoUrl] = useState<string>('');
  const [formVirtualTourVideoTitle, setFormVirtualTourVideoTitle] = useState<string>('');
  const [formAgencyId, setFormAgencyId] = useState<string>(agencies[0]?.id || 'agency-1');
  const [formStatus, setFormStatus] = useState<'active' | 'pending' | 'sold'>('active');
  const [formIsFeatured, setFormIsFeatured] = useState<boolean>(true);
  const [formIsHotCommercial, setFormIsHotCommercial] = useState<boolean>(false);
  const [formLocation, setFormLocation] = useState<LocationData>({
    province: 'Punjab',
    city: 'Taxila',
    society: 'Faisal Hills',
    block: 'Executive Block',
    address: 'Main Boulevard, Faisal Hills, Taxila',
    latitude: 33.7297,
    longitude: 72.8258,
    mapZoom: 15,
    nearbyLandmarks: ['Faisal Hills Main Gate (GT Road N-5)', 'Margalla Hills View Point']
  });

  // Inline Quick-Add Location inside Admin Property Form
  const [showQuickAddLoc, setShowQuickAddLoc] = useState(false);
  const [quickCityInput, setQuickCityInput] = useState('');
  const [quickSocietyInput, setQuickSocietyInput] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleQuickAddLocationInForm = () => {
    const cTrim = quickCityInput.trim();
    const sTrim = quickSocietyInput.trim();
    if (!cTrim && !sTrim) return;

    const targetProv = formLocation.province || 'Punjab';
    const targetCity = cTrim || formLocation.city || 'Taxila';

    const nextData = provinceCityData.map(p => {
      if (p.province !== targetProv) return p;
      const cityExists = p.cities.some(c => c.name.toLowerCase() === targetCity.toLowerCase());
      if (!cityExists) {
        return {
          ...p,
          cities: [
            ...p.cities,
            {
              name: targetCity,
              isFeatured: true,
              societies: sTrim ? [sTrim, 'Main Boulevard'] : ['Main Boulevard']
            }
          ]
        };
      }
      return {
        ...p,
        cities: p.cities.map(c => {
          if (c.name.toLowerCase() !== targetCity.toLowerCase()) return c;
          if (!sTrim) return c;
          const exists = c.societies.some(s => s.toLowerCase() === sTrim.toLowerCase());
          return exists ? c : { ...c, societies: [sTrim, ...c.societies] };
        })
      };
    });

    onUpdateProvinceCityData?.(nextData);
    setFormLocation(prev => ({
      ...prev,
      city: targetCity,
      society: sTrim || prev.society
    }));
    setQuickCityInput('');
    setQuickSocietyInput('');
    setShowQuickAddLoc(false);
    showToast(`Added ${cTrim ? `City "${targetCity}" ` : ''}${sTrim ? `& Society "${sTrim}"` : ''} globally!`);
  };

  const filteredProperties = properties.filter(p => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        p.title.toLowerCase().includes(q) ||
        p.location.society.toLowerCase().includes(q) ||
        p.location.city.toLowerCase().includes(q) ||
        p.agentName.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (statusFilter !== 'all' && (p.status || 'active') !== statusFilter) return false;
    if (agencyFilter !== 'all' && p.agencyId !== agencyFilter) return false;
    return true;
  });

  const handleOpenCreate = () => {
    setEditingProperty(null);
    setFormTitle('');
    setFormTagline('');
    setFormCategory('residential');
    setFormType('Villa');
    setFormPurpose('for_sale');
    setFormPrice(45000000);
    setFormPriceFormatted('PKR 4.50 Crore');
    setFormArea('10');
    setFormAreaUnit('Marla');
    setFormBedrooms(4);
    setFormBathrooms(5);
    setFormFloors(2);
    setFormParking(2);
    setFormDescription(
      'Brand new verified property with Ri8Click German UPVC thermal windows, modern architectural elevation, and direct transfer.'
    );
    setFormFeaturesText(
      'Ri8Click Double Glazed UPVC Windows\n100% NOC Verified & Direct Transfer\nUnderground Electricity & Gas\n24/7 Gated Security & CCTV'
    );
    setFormImages([
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]);
    setFormVirtualTourVideoUrl('');
    setFormVirtualTourVideoTitle('');
    setFormAgencyId(currentUser?.agencyId || agencies[0]?.id || 'agency-1');
    setFormStatus('active');
    setFormIsFeatured(true);
    setFormIsHotCommercial(false);
    setFormLocation({
      province: 'Punjab',
      city: 'Taxila',
      society: 'Faisal Hills',
      block: 'Executive Block',
      address: 'Main Boulevard, Faisal Hills, Taxila',
      latitude: 33.7297,
      longitude: 72.8258,
      mapZoom: 15,
      nearbyLandmarks: ['Faisal Hills Main Gate (GT Road N-5)', 'Margalla Hills View Point']
    });
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (prop: Property) => {
    if (!canManageThisProperty(prop)) {
      showToast('Access Denied: Agencies can only edit their own listings.');
      return;
    }
    setEditingProperty(prop);
    setFormTitle(prop.title);
    setFormTagline(prop.tagline || '');
    setFormCategory(prop.category);
    setFormType(prop.type);
    setFormPurpose(prop.purpose);
    setFormPrice(prop.price);
    setFormPriceFormatted(prop.priceFormatted);
    setFormArea(String(prop.area));
    setFormAreaUnit(prop.areaUnit);
    setFormBedrooms(prop.bedrooms ?? 4);
    setFormBathrooms(prop.bathrooms ?? 4);
    setFormFloors(prop.floors ?? 2);
    setFormParking(prop.parking ?? 2);
    setFormDescription(prop.description);
    setFormFeaturesText((prop.features || []).join('\n'));
    setFormImages(prop.images || []);
    setFormVirtualTourVideoUrl(prop.virtualTourVideoUrl || '');
    setFormVirtualTourVideoTitle(prop.virtualTourVideoTitle || '');
    setFormAgencyId(prop.agencyId);
    setFormStatus(prop.status || 'active');
    setFormIsFeatured(Boolean(prop.isFeatured));
    setFormIsHotCommercial(Boolean(prop.isHotCommercial));
    setFormLocation({
      province: prop.location.province || 'Punjab',
      city: prop.location.city || 'Taxila',
      society: prop.location.society || 'Faisal Hills',
      block: prop.location.block || '',
      address: prop.location.address || '',
      latitude: prop.location.latitude ?? 33.7297,
      longitude: prop.location.longitude ?? 72.8258,
      mapZoom: prop.location.mapZoom ?? 15,
      nearbyLandmarks: prop.location.nearbyLandmarks || []
    });
    setIsCreateModalOpen(true);
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedAgency = agencies.find(a => a.id === formAgencyId) || agencies[0];
    const parsedFeatures = formFeaturesText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const validImages =
      formImages.length > 0
        ? formImages
        : [
            formCategory === 'modular'
              ? 'https://www.genspark.ai/api/files/s/I6HwjuLB'
              : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
          ];

    const propertyPayload: Property = {
      id: editingProperty ? editingProperty.id : `prop-${Date.now()}`,
      title: formTitle.trim(),
      tagline: formTagline.trim() || undefined,
      description: formDescription.trim(),
      category: formCategory,
      type: formType,
      purpose: formPurpose,
      price: Number(formPrice),
      priceFormatted: formPriceFormatted.trim(),
      currency: 'PKR',
      location: formLocation,
      area: formArea.trim(),
      areaUnit: formAreaUnit,
      bedrooms: formCategory === 'commercial' ? undefined : Number(formBedrooms),
      bathrooms: formCategory === 'commercial' ? undefined : Number(formBathrooms),
      floors: Number(formFloors),
      parking: Number(formParking),
      features: parsedFeatures.length > 0 ? parsedFeatures : ['Ri8Click Verified Listing'],
      images: validImages,
      virtualTourVideoUrl: formVirtualTourVideoUrl.trim() || undefined,
      virtualTourVideoTitle: formVirtualTourVideoTitle.trim() || undefined,
      hasVirtualTour: Boolean(formVirtualTourVideoUrl.trim()),
      watermark: true,
      agencyId: selectedAgency?.id || 'agency-1',
      agentName: selectedAgency?.name || 'Malik Zeeshan',
      agentPhone: selectedAgency?.phone || '+92 336-5666727',
      agentWhatsApp: selectedAgency?.whatsapp || '923365666727',
      agentAvatar:
        selectedAgency?.avatar ||
        selectedAgency?.logo ||
        PAKISTAN_AGENT_AVATARS.malikZeeshan,
      agentCompany: selectedAgency?.companyName || 'Al-Mairaj Real Estate & Builders',
      agentRating: selectedAgency?.rating || 4.9,
      isFeatured: formIsFeatured,
      isHotCommercial: formCategory === 'commercial' ? true : formIsHotCommercial,
      viewsCount: editingProperty ? editingProperty.viewsCount : 1,
      savesCount: editingProperty ? editingProperty.savesCount : 0,
      createdAt: editingProperty
        ? editingProperty.createdAt
        : new Date().toISOString().split('T')[0],
      status: formStatus
    };

    if (editingProperty) {
      const updated = properties.map(p => (p.id === editingProperty.id ? propertyPayload : p));
      onUpdateProperties(updated);
      showToast(`Updated "${propertyPayload.title}" and synced across all users!`);
    } else {
      onUpdateProperties([propertyPayload, ...properties]);
      showToast(`Published "${propertyPayload.title}" globally to all users!`);
    }

    setIsCreateModalOpen(false);
    setEditingProperty(null);
  };

  const handleConfirmDelete = () => {
    if (!deletingProperty) return;
    if (!canManageThisProperty(deletingProperty)) {
      showToast('Access Denied: Only listing owner or Super Admin can delete.');
      setDeletingProperty(null);
      return;
    }
    const updated = properties.filter(p => p.id !== deletingProperty.id);
    onUpdateProperties(updated);
    showToast(`Deleted "${deletingProperty.title}" from the entire portal.`);
    setDeletingProperty(null);
  };

  const handleCycleStatus = (prop: Property) => {
    if (!canManageThisProperty(prop)) {
      showToast('Restricted: You can only change status of your own agency listings.');
      return;
    }
    const current = prop.status || 'active';
    const nextStatus: 'active' | 'pending' | 'sold' =
      current === 'active' ? 'sold' : current === 'sold' ? 'pending' : 'active';
    const updated = properties.map(p => (p.id === prop.id ? { ...p, status: nextStatus } : p));
    onUpdateProperties(updated);
    showToast(
      `Status for "${prop.title}" set to ${
        nextStatus === 'pending' ? 'HIDDEN (Disabled)' : nextStatus.toUpperCase()
      } for all users.`
    );
  };

  const handleToggleVisibility = (prop: Property) => {
    if (!canManageThisProperty(prop)) {
      showToast('Restricted: You can only toggle visibility of your own listings.');
      return;
    }
    const isCurrentlyHidden = prop.status === 'pending';
    const nextStatus: 'active' | 'pending' = isCurrentlyHidden ? 'active' : 'pending';
    const updated = properties.map(p => (p.id === prop.id ? { ...p, status: nextStatus } : p));
    onUpdateProperties(updated);
    showToast(
      isCurrentlyHidden
        ? `"${prop.title}" is now VISIBLE to all global users.`
        : `"${prop.title}" is now HIDDEN from public sections across the site.`
    );
  };

  const handleQuickRotatePropertyCover = (prop: Property) => {
    if (!prop.images || prop.images.length <= 1) return;
    const rotated = [...prop.images.slice(1), prop.images[0]];
    const updated = properties.map(p => (p.id === prop.id ? { ...p, images: rotated } : p));
    onUpdateProperties(updated);
    showToast(`Rotated cover photo for "${prop.title}" globally!`);
  };

  const formatAutoPrice = (val: number) => {
    setFormPrice(val);
    if (val >= 10000000) {
      setFormPriceFormatted(`PKR ${(val / 10000000).toFixed(2)} Crore`);
    } else if (val >= 100000) {
      setFormPriceFormatted(`PKR ${(val / 100000).toFixed(2)} Lakh`);
    } else {
      setFormPriceFormatted(`PKR ${val.toLocaleString()}`);
    }
  };

  return (
    <div className="space-y-5">
      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-slate-900 text-white text-xs font-semibold flex items-center justify-between shadow-lg border border-slate-700">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Action Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">
              Property Advertisements &amp; Location Map Manager
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
              {properties.length} Total Posts
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Every property, space capsule image, or status change (Active / Sold / Hidden) is synced universally across all browser sessions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {onResetToDefaults && userIsSuperAdmin && (
            <button
              type="button"
              onClick={onResetToDefaults}
              className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Advertisement</span>
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search title, society, city, ID..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
        >
          <option value="all">All Categories</option>
          <option value="residential">Residential (Villas &amp; Plots)</option>
          <option value="commercial">Commercial (Plazas &amp; Offices)</option>
          <option value="modular">Readymade Capsule &amp; Modular</option>
          <option value="projects">Projects &amp; UPVC</option>
        </select>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as any)}
          className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active (Visible on Site)</option>
          <option value="pending">Hidden / Disabled</option>
          <option value="sold">Sold Out</option>
        </select>

        <select
          value={agencyFilter}
          onChange={e => setAgencyFilter(e.target.value)}
          className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
        >
          <option value="all">All Certified Agencies</option>
          {agencies.map(ag => (
            <option key={ag.id} value={ag.id}>
              {ag.companyName} ({ag.name})
            </option>
          ))}
        </select>
      </div>

      {/* Properties CRUD Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10.5px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Advertisement</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Price &amp; Area</th>
                <th className="py-3 px-3">Location &amp; Pin</th>
                <th className="py-3 px-3">Agency</th>
                <th className="py-3 px-3">Global Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredProperties.map(prop => {
                const isHidden = prop.status === 'pending';
                const isSold = prop.status === 'sold';
                return (
                  <tr
                    key={prop.id}
                    className={`hover:bg-slate-50/90 transition-colors ${
                      isHidden ? 'opacity-60 bg-slate-50/50' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                          <img
                            src={
                              prop.images?.[0] ||
                              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
                            }
                            alt={prop.title}
                            className="w-full h-full object-cover"
                          />
                          {prop.images && prop.images.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleQuickRotatePropertyCover(prop)}
                              className="absolute bottom-0.5 right-0.5 px-1 py-0.2 rounded bg-slate-950/80 text-[8px] font-bold text-amber-300"
                              title="Click to cycle cover photo"
                            >
                              {prop.images.length} pics
                            </button>
                          )}
                        </div>
                        <div className="min-w-0 max-w-xs">
                          <div className="font-bold text-slate-900 truncate">{prop.title}</div>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                            <span>ID: {prop.id}</span>
                            {prop.isFeatured && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-800 capitalize">{prop.category}</div>
                      <div className="text-[10.5px] text-slate-500">{prop.type}</div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{prop.priceFormatted}</div>
                      <div className="text-[10.5px] text-slate-500">
                        {prop.area} {prop.areaUnit}
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-800">{prop.location.society}</div>
                      <div className="text-[10.5px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-blue-500" />
                        <span>{prop.location.city}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-800">{prop.agentName}</div>
                      <div className="text-[10.5px] text-slate-500 truncate max-w-[140px]">
                        {prop.agentCompany}
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <button
                        type="button"
                        onClick={() => handleCycleStatus(prop)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          isHidden
                            ? 'bg-slate-200 text-slate-700 border-slate-300'
                            : isSold
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                        title="Click to cycle status (Active -> Sold -> Hidden)"
                      >
                        {isHidden ? 'HIDDEN' : isSold ? 'SOLD OUT' : 'ACTIVE'}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleToggleVisibility(prop)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isHidden
                              ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                          title={isHidden ? 'Make Visible to All Users' : 'Disable / Hide from Public'}
                        >
                          {isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>

                        {onViewProperty && (
                          <button
                            type="button"
                            onClick={() => onViewProperty(prop)}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 text-blue-600 hover:bg-blue-50"
                            title="Preview Listing"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {canManageThisProperty(prop) ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(prop)}
                              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                              title="Edit Advertisement & Images"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingProperty(prop)}
                              className="p-1.5 rounded-lg bg-white border border-slate-200 text-rose-600 hover:bg-rose-50"
                              title="Delete Advertisement"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        ) : (
                          <span
                            className="p-1.5 rounded-lg bg-slate-100 text-slate-400"
                            title={`Managed by ${prop.agentCompany}`}
                          >
                            <Lock className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden my-auto">
            <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">
                  {editingProperty
                    ? `Edit Advertisement: ${editingProperty.title}`
                    : 'Post New Property / Capsule Smart House Advertisement'}
                </h3>
                <p className="text-[11px] text-slate-400">
                  Changes and uploaded images are saved universally and visible in all browser sessions immediately.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProperty} className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                    Advertisement Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                    Highlight Tagline
                  </label>
                  <input
                    type="text"
                    value={formTagline}
                    onChange={e => setFormTagline(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as PropertyCategory)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="modular">Capsule &amp; Modular</option>
                    <option value="projects">Projects &amp; UPVC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                    Property Type
                  </label>
                  <select
                    value={formType}
                    onChange={e => setFormType(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                  >
                    <option value="Villa">Villa / Designer House</option>
                    <option value="Residential Plot">Residential Plot</option>
                    <option value="Commercial Plaza">Commercial Plaza / Highrise</option>
                    <option value="Commercial Plot">Commercial Plot</option>
                    <option value="Corporate Office">Corporate Office</option>
                    <option value="Retail Shop">Retail Shop / Showroom</option>
                    <option value="Luxury Apartment">Luxury Apartment</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Capsule Smart House">Capsule Smart House</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                    Purpose
                  </label>
                  <select
                    value={formPurpose}
                    onChange={e => setFormPurpose(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                  >
                    <option value="for_sale">For Sale</option>
                    <option value="for_rent">For Rent / Lease</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                    Listing Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={e => setFormStatus(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                  >
                    <option value="active">Active (Visible Globally)</option>
                    <option value="pending">Hidden / Disabled</option>
                    <option value="sold">Sold Out</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                    Numeric Price (PKR)
                  </label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={e => formatAutoPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                    Formatted Price Display
                  </label>
                  <input
                    type="text"
                    value={formPriceFormatted}
                    onChange={e => setFormPriceFormatted(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                    Area Dimension
                  </label>
                  <input
                    type="text"
                    value={formArea}
                    onChange={e => setFormArea(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                    Area Unit
                  </label>
                  <select
                    value={formAreaUnit}
                    onChange={e => setFormAreaUnit(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                  >
                    <option value="Marla">Marla</option>
                    <option value="Kanal">Kanal</option>
                    <option value="Sq Ft">Sq Ft</option>
                    <option value="Sq Yds">Sq Yds</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                    Assigned Certified Agency
                  </label>
                  <select
                    value={formAgencyId}
                    onChange={e => setFormAgencyId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                  >
                    {agencies.map(ag => (
                      <option key={ag.id} value={ag.id}>
                        {ag.companyName} ({ag.name})
                      </option>
                    ))}
                  </select>
                </div>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-800 pt-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsFeatured}
                    onChange={e => setFormIsFeatured(e.target.checked)}
                    className="rounded border-slate-300"
                  />
                  <span>Mark as Featured Listing</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-800 pt-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsHotCommercial}
                    onChange={e => setFormIsHotCommercial(e.target.checked)}
                    className="rounded border-slate-300"
                  />
                  <span>Include in Commercial Spotlight</span>
                </label>
              </div>

              {/* Location & Super Admin Quick-Add City / Society */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-800">
                    Location &amp; Interactive Map Pin Picker
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowQuickAddLoc(prev => !prev)}
                    className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Missing City / Society (Super Admin)</span>
                  </button>
                </div>

                {showQuickAddLoc && (
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={quickCityInput}
                      onChange={e => setQuickCityInput(e.target.value)}
                      placeholder={`New City (or keep ${formLocation.city})`}
                      className="p-2 bg-white border border-blue-200 rounded-lg text-xs font-semibold text-slate-900"
                    />
                    <input
                      type="text"
                      value={quickSocietyInput}
                      onChange={e => setQuickSocietyInput(e.target.value)}
                      placeholder="New Society / Block Name"
                      className="p-2 bg-white border border-blue-200 rounded-lg text-xs font-semibold text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={handleQuickAddLocationInForm}
                      className="py-2 px-3 rounded-lg bg-slate-900 text-white text-xs font-bold"
                    >
                      Save to Global Locations
                    </button>
                  </div>
                )}

                <LocationPickerMap
                  location={formLocation}
                  onChangeLocation={setFormLocation}
                  provinceCityData={provinceCityData}
                />
              </div>

              {/* Media Uploader */}
              <PropertyMediaUploader
                images={formImages}
                onChangeImages={setFormImages}
                videoUrl={formVirtualTourVideoUrl}
                onChangeVideoUrl={setFormVirtualTourVideoUrl}
                videoTitle={formVirtualTourVideoTitle}
                onChangeVideoTitle={setFormVirtualTourVideoTitle}
                isSuperAdmin={userIsSuperAdmin}
                onOpenRoleSwitcher={onOpenRoleSwitcher}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                    Detailed Description
                  </label>
                  <textarea
                    rows={4}
                    value={formDescription}
                    onChange={e => setFormDescription(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                    Key Features (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={formFeaturesText}
                    onChange={e => setFormFeaturesText(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm"
                >
                  {editingProperty ? 'Save Updated Advertisement' : 'Publish Advertisement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MAP PREVIEW MODAL */}
      {mapPreviewProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
              <h4 className="text-sm font-bold">Interactive Map Verification</h4>
              <button onClick={() => setMapPreviewProperty(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <LocationMapView
                location={mapPreviewProperty.location}
                propertyTitle={mapPreviewProperty.title}
                priceFormatted={mapPreviewProperty.priceFormatted}
                propertyType={mapPreviewProperty.type}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    const p = mapPreviewProperty;
                    setMapPreviewProperty(null);
                    handleOpenEdit(p);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
                >
                  Edit Map Coordinates
                </button>
                <button
                  onClick={() => setMapPreviewProperty(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Close Map
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Delete Property Advertisement?</h4>
            <p className="text-xs text-slate-600">
              Are you sure you want to permanently remove <strong>{deletingProperty.title}</strong>? This will immediately remove it for all users.
            </p>
            <div className="flex justify-center gap-2.5 pt-2">
              <button
                onClick={() => setDeletingProperty(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPropertyManager;

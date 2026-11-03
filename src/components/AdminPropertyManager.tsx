import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  MapPin, 
  ExternalLink, 
  Check, 
  X, 
  Sparkles, 
  AlertTriangle, 
  Eye, 
  EyeOff,
  Compass, 
  CheckCircle2, 
  Tag, 
  Layers, 
  Home, 
  RefreshCw,
  Video,
  Lock,
  BadgeCheck
} from 'lucide-react';
import { Property, AgencyAccount, ProvinceCityData, PropertyCategory, LocationData } from '../types';
import { UserAccount } from '../data/defaultAccounts';
import { LocationPickerMap } from './LocationPickerMap';
import { LocationMapView } from './LocationMapView';
import { WatermarkBadge } from './WatermarkBadge';
import { PropertyMediaUploader } from './PropertyMediaUploader';

interface AdminPropertyManagerProps {
  properties: Property[];
  agencies: AgencyAccount[];
  provinceCityData: ProvinceCityData[];
  onUpdateProperties: (properties: Property[]) => void;
  onResetToDefaults?: () => void;
  onViewProperty?: (property: Property) => void;
  onOpenVirtualTour?: (property: Property) => void;
  currentRole?: 'admin' | 'agency' | 'customer';
  currentUser?: UserAccount | null;
  onOpenRoleSwitcher?: () => void;
}

export const AdminPropertyManager: React.FC<AdminPropertyManagerProps> = ({
  properties,
  agencies,
  provinceCityData,
  onUpdateProperties,
  onResetToDefaults,
  onViewProperty,
  onOpenVirtualTour,
  currentRole = 'admin',
  currentUser = null,
  onOpenRoleSwitcher
}) => {
  const isSuperAdmin = currentUser ? currentUser.role === 'admin' : currentRole === 'admin';

  const canManageThisProperty = (prop: Property): boolean => {
    if (isSuperAdmin) return true;
    if (currentUser?.role === 'agency' && currentUser.agencyId) {
      return prop.agencyId === currentUser.agencyId;
    }
    return false;
  };

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | PropertyCategory>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'sold'>('all');
  const [agencyFilter, setAgencyFilter] = useState<string>('all');

  // CRUD Modal States
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deletingProperty, setDeletingProperty] = useState<Property | null>(null);
  const [mapPreviewProperty, setMapPreviewProperty] = useState<Property | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State for Create / Update
  const [formId, setFormId] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formCategory, setFormCategory] = useState<'residential' | 'commercial' | 'modular' | 'projects'>('residential');
  const [formType, setFormType] = useState('Villa');
  const [formPurpose, setFormPurpose] = useState<'for_sale' | 'for_rent'>('for_sale');
  const [formPrice, setFormPrice] = useState<string>('');
  const [formPriceFormatted, setFormPriceFormatted] = useState('');
  const [formArea, setFormArea] = useState<string>('');
  const [formAreaUnit, setFormAreaUnit] = useState('Marla');
  const [formBedrooms, setFormBedrooms] = useState<number | undefined>(4);
  const [formBathrooms, setFormBathrooms] = useState<number | undefined>(5);
  const [formFloors, setFormFloors] = useState<number | undefined>(2);
  const [formDescription, setFormDescription] = useState('');
  const [formFeatures, setFormFeatures] = useState('');
  const [formImages, setFormImages] = useState<string[]>([]);
  const [formVideoUrl, setFormVideoUrl] = useState<string>('');
  const [formVideoTitle, setFormVideoTitle] = useState<string>('');
  const [formAgencyId, setFormAgencyId] = useState(agencies[0]?.id || 'agency-1');
  const [formIsFeatured, setFormIsFeatured] = useState(true);
  const [formIsHotCommercial, setFormIsHotCommercial] = useState(false);
  const [formStatus, setFormStatus] = useState<'active' | 'pending' | 'sold'>('active');

  const [formLocation, setFormLocation] = useState<LocationData>({
    province: 'Punjab',
    city: 'Taxila',
    society: 'Faisal Hills',
    block: 'Faisal Hills Executive Block',
    address: 'Main Boulevard, Executive Block, Faisal Hills, Taxila',
    latitude: 33.7495,
    longitude: 72.7662,
    mapZoom: 15,
    nearbyLandmarks: ['Margalla Hills Foot', 'Main GT Road N-5', 'Taxila Museum']
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered Properties
  const filteredProperties = properties.filter(p => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    const currentStatus = p.status || 'active';
    if (statusFilter !== 'all' && currentStatus !== statusFilter) return false;
    if (agencyFilter !== 'all' && p.agencyId !== agencyFilter) return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchCity = p.location.city.toLowerCase().includes(q);
      const matchSociety = p.location.society.toLowerCase().includes(q);
      const matchAgent = p.agentName.toLowerCase().includes(q);
      const matchId = p.id.toLowerCase().includes(q);
      if (!matchTitle && !matchCity && !matchSociety && !matchAgent && !matchId) return false;
    }

    return true;
  });

  // Open Create Form
  const handleOpenCreate = () => {
    setEditingProperty(null);
    setFormId(`prop-${Date.now()}`);
    setFormTitle('');
    setFormTagline('');
    setFormCategory('residential');
    setFormType('Villa');
    setFormPurpose('for_sale');
    setFormPrice('35000000');
    setFormPriceFormatted('PKR 3.5 Crore');
    setFormArea('10');
    setFormAreaUnit('Marla');
    setFormBedrooms(4);
    setFormBathrooms(5);
    setFormFloors(2);
    setFormDescription('');
    setFormFeatures('German UPVC Windows, Solar System Installed, Margalla Hills View, CDA/RDA Transfer Ready');
    setFormImages([
      'https://www.genspark.ai/api/files/s/pSySUzgg',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]);
    setFormVideoUrl('');
    setFormVideoTitle('');
    setFormAgencyId(
      currentUser?.role === 'agency' && currentUser.agencyId
        ? currentUser.agencyId
        : agencies[0]?.id || 'agency-1'
    );
    setFormIsFeatured(true);
    setFormIsHotCommercial(false);
    setFormStatus('active');
    setFormLocation({
      province: 'Punjab',
      city: 'Taxila',
      society: 'Faisal Hills',
      block: 'Faisal Hills Executive Block',
      address: 'Main Boulevard, Executive Block, Faisal Hills, Taxila',
      latitude: 33.7495,
      longitude: 72.7662,
      mapZoom: 15,
      nearbyLandmarks: ['Margalla Hills Foot', 'GT Road N-5']
    });
    setIsCreateModalOpen(true);
  };

  // Open Edit Form
  const handleOpenEdit = (prop: Property) => {
    if (!canManageThisProperty(prop)) {
      showToast('Access Denied: Agencies can only edit their own posted advertisements.');
      return;
    }
    setEditingProperty(prop);
    setFormId(prop.id);
    setFormTitle(prop.title);
    setFormTagline(prop.tagline || '');
    setFormCategory(prop.category);
    setFormType(prop.type);
    setFormPurpose(prop.purpose);
    setFormPrice(String(prop.price));
    setFormPriceFormatted(prop.priceFormatted);
    setFormArea(String(prop.area));
    setFormAreaUnit(prop.areaUnit);
    setFormBedrooms(prop.bedrooms);
    setFormBathrooms(prop.bathrooms);
    setFormFloors(prop.floors);
    setFormDescription(prop.description);
    setFormFeatures(prop.features.join(', '));
    setFormImages(prop.images && prop.images.length > 0 ? [...prop.images] : []);
    setFormVideoUrl(prop.virtualTourVideoUrl || '');
    setFormVideoTitle(prop.virtualTourVideoTitle || '');
    setFormAgencyId(prop.agencyId);
    setFormIsFeatured(Boolean(prop.isFeatured));
    setFormIsHotCommercial(Boolean(prop.isHotCommercial));
    setFormStatus(prop.status || 'active');
    setFormLocation({
      province: prop.location.province,
      city: prop.location.city,
      society: prop.location.society,
      block: prop.location.block || '',
      address: prop.location.address,
      latitude: prop.location.latitude,
      longitude: prop.location.longitude,
      mapZoom: prop.location.mapZoom || 15,
      nearbyLandmarks: prop.location.nearbyLandmarks || []
    });
    setIsCreateModalOpen(true);
  };

  // Save (Create or Update)
  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const selectedAgency = agencies.find(a => a.id === formAgencyId) || agencies[0];

    const featuresList = formFeatures
      .split(',')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const savedProp: Property = {
      id: formId || `prop-${Date.now()}`,
      title: formTitle.trim(),
      tagline: formTagline.trim() || undefined,
      description: formDescription.trim(),
      category: formCategory,
      type: formType,
      purpose: formPurpose,
      price: Number(formPrice) || 0,
      priceFormatted: formPriceFormatted.trim() || `PKR ${Number(formPrice).toLocaleString()}`,
      currency: 'PKR',
      location: {
        province: formLocation.province,
        city: formLocation.city,
        society: formLocation.society,
        block: formLocation.block,
        address: formLocation.address,
        latitude: formLocation.latitude,
        longitude: formLocation.longitude,
        mapZoom: formLocation.mapZoom,
        nearbyLandmarks: formLocation.nearbyLandmarks
      },
      area: formArea.trim(),
      areaUnit: formAreaUnit,
      bedrooms: formCategory === 'commercial' ? undefined : formBedrooms,
      bathrooms: formCategory === 'commercial' ? undefined : formBathrooms,
      floors: formFloors,
      features: featuresList.length > 0 ? featuresList : ['ri8click Watermark Verified', 'Prime Location', 'Clear Title'],
      images: formImages.length > 0 ? formImages : [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
      ],
      watermark: true,
      agencyId: selectedAgency?.id || 'agency-1',
      agentName: selectedAgency?.ownerName || 'Malik Zeeshan',
      agentPhone: selectedAgency?.phone || '+92 336-5666727',
      agentWhatsApp: selectedAgency?.whatsapp || '923365666727',
      agentAvatar: selectedAgency?.logo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      agentCompany: selectedAgency?.name || 'ri8click Partner Agency',
      agentRating: selectedAgency?.rating || 4.9,
      isFeatured: formIsFeatured,
      isHotCommercial: formIsHotCommercial,
      viewsCount: editingProperty ? editingProperty.viewsCount : 1,
      savesCount: editingProperty ? editingProperty.savesCount : 0,
      createdAt: editingProperty ? editingProperty.createdAt : new Date().toISOString().split('T')[0],
      status: formStatus,
      virtualTourVideoUrl: isSuperAdmin ? (formVideoUrl.trim() || undefined) : editingProperty?.virtualTourVideoUrl,
      virtualTourVideoTitle: isSuperAdmin ? (formVideoTitle.trim() || undefined) : editingProperty?.virtualTourVideoTitle
    };

    if (editingProperty) {
      const updated = properties.map(p => p.id === editingProperty.id ? savedProp : p);
      onUpdateProperties(updated);
      showToast(`Property "${savedProp.title}" updated successfully!`);
    } else {
      onUpdateProperties([savedProp, ...properties]);
      showToast(`New property "${savedProp.title}" published to portal!`);
    }

    setIsCreateModalOpen(false);
    setEditingProperty(null);
  };

  // Delete Property
  const handleConfirmDelete = () => {
    if (!deletingProperty) return;
    if (!canManageThisProperty(deletingProperty)) {
      showToast('Access Denied: Only the listing owner or Super Admin can delete this post.');
      setDeletingProperty(null);
      return;
    }
    const updated = properties.filter(p => p.id !== deletingProperty.id);
    onUpdateProperties(updated);
    showToast(`Property "${deletingProperty.title}" deleted.`);
    setDeletingProperty(null);
  };

  // Quick Status Cycle
  const handleCycleStatus = (prop: Property) => {
    const current = prop.status || 'active';
    const next: 'active' | 'pending' | 'sold' = 
      current === 'active' ? 'sold' : current === 'sold' ? 'pending' : 'active';
    
    const updated = properties.map(p => p.id === prop.id ? { ...p, status: next } : p);
    onUpdateProperties(updated);
    showToast(`Status for "${prop.title}" set to ${next.toUpperCase()}`);
  };

  // View / Hide Toggle (Eye / EyeOff icon in Actions column)
  const handleToggleVisibility = (prop: Property) => {
    const isVisible = !prop.status || prop.status === 'active';
    const nextStatus: 'active' | 'pending' = isVisible ? 'pending' : 'active';
    const updated = properties.map(p => p.id === prop.id ? { ...p, status: nextStatus } : p);
    onUpdateProperties(updated);
    showToast(
      nextStatus === 'active'
        ? `"${prop.title}" is now VISIBLE (Active) on the portal.`
        : `"${prop.title}" is now HIDDEN from public listings.`
    );
  };

  // Quick Rotate Cover Image directly in Table Row
  const handleQuickRotatePropertyCover = (prop: Property) => {
    if (!prop.images || prop.images.length <= 1) return;
    const rotated = [...prop.images.slice(1), prop.images[0]];
    const updated = properties.map(p => p.id === prop.id ? { ...p, images: rotated } : p);
    onUpdateProperties(updated);
    showToast(`Rotated cover photo for "${prop.title}"`);
  };

  const formatAutoPrice = (val: string) => {
    setFormPrice(val);
    const num = Number(val);
    if (!num || isNaN(num)) return;
    if (num >= 10000000) {
      setFormPriceFormatted(`PKR ${(num / 10000000).toFixed(2).replace(/\.00$/, '')} Crore`);
    } else if (num >= 100000) {
      setFormPriceFormatted(`PKR ${(num / 100000).toFixed(2).replace(/\.00$/, '')} Lakh`);
    } else {
      setFormPriceFormatted(`PKR ${num.toLocaleString()}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-2.5 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-emerald-500/40 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Action & Stats Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span>Property Advertisements &amp; Location Map Manager</span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {properties.length} Total Posts
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Manage, publish, toggle visibility (View/Hide), launch 3D/Video tours, reorder photos, and calibrate GPS map pins.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {onResetToDefaults && (
            <button
              type="button"
              onClick={onResetToDefaults}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Restore default sample properties"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Demo Data</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Advertisement</span>
          </button>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-5 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by title, society, city, agent, or ID..."
            className="w-full pl-9 pr-8 py-2 rounded-lg border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="lg:col-span-3">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value as any)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Categories ({properties.length})</option>
            <option value="residential">Residential (Villas / Plots / Apartments)</option>
            <option value="commercial">Commercial (Plazas / Shops / Offices)</option>
            <option value="modular">Modular &amp; Capsule Smart Homes</option>
            <option value="projects">Development Projects &amp; UPVC</option>
          </select>
        </div>

        <div className="lg:col-span-2">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active (Visible)</option>
            <option value="pending">Hidden / Pending</option>
            <option value="sold">Sold Out</option>
          </select>
        </div>

        <div className="lg:col-span-2">
          <select
            value={agencyFilter}
            onChange={e => setAgencyFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Agencies</option>
            {agencies.map(ag => (
              <option key={ag.id} value={ag.id}>{ag.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Properties CRUD Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {filteredProperties.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
            <div className="text-sm font-bold text-slate-800">No Matching Property Advertisements</div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try clearing your search filters or click &ldquo;Post New Advertisement&rdquo; to add a new property.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4">Property Advertisement</th>
                  <th className="py-3.5 px-3">Category &amp; Type</th>
                  <th className="py-3.5 px-3">Price &amp; Area</th>
                  <th className="py-3.5 px-3">Location &amp; Map Pin</th>
                  <th className="py-3.5 px-3">Agency</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions (CRUD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/70 text-xs">
                {filteredProperties.map(prop => {
                  const status = prop.status || 'active';
                  const hasCoords = Boolean(prop.location.latitude && prop.location.longitude);

                  return (
                    <tr
                      key={prop.id}
                      className={`hover:bg-slate-50/90 transition-colors group ${
                        status === 'pending' ? 'opacity-65 bg-slate-50/50' : ''
                      }`}
                    >
                      {/* Thumbnail & Title */}
                      <td className="py-3.5 px-4 max-w-[280px]">
                        <div className="flex items-center gap-3">
                          <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-900 border border-slate-200">
                            <img
                              src={prop.images[0]}
                              alt={prop.title}
                              onError={e => {
                                e.currentTarget.src =
                                  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                              }}
                              className="w-full h-full object-cover"
                            />
                            {prop.images.length > 1 && (
                              <button
                                type="button"
                                onClick={e => {
                                  e.stopPropagation();
                                  handleQuickRotatePropertyCover(prop);
                                }}
                                className="absolute bottom-0.5 right-0.5 bg-blue-600/90 hover:bg-blue-500 text-white text-[8px] px-1 py-0.2 rounded font-bold cursor-pointer"
                                title="Click to cycle next photo as cover"
                              >
                                {prop.images.length} ↻
                              </button>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                              {prop.title}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate">
                              ID: {prop.id}
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                              {prop.isFeatured && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800">
                                  ★ Featured
                                </span>
                              )}
                              {prop.virtualTourVideoUrl && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-purple-100 text-purple-800 flex items-center gap-0.5">
                                  🎬 Movie Tour
                                </span>
                              )}
                              <span className="text-[10px] text-slate-400 font-medium">
                                {prop.images.length} {prop.images.length === 1 ? 'photo' : 'photos'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category & Type */}
                      <td className="py-3.5 px-3">
                        <div className="font-semibold text-slate-800">{prop.type}</div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 capitalize">
                          <span>{prop.category}</span>
                          <span>•</span>
                          <span>{prop.purpose === 'for_sale' ? 'Sale' : 'Rent'}</span>
                        </div>
                      </td>

                      {/* Price & Area */}
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-slate-900">{prop.priceFormatted}</div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          {prop.area} {prop.areaUnit}
                        </div>
                      </td>

                      {/* Location & Map Coordinates */}
                      <td className="py-3.5 px-3 max-w-[200px]">
                        <div className="flex items-start gap-1 text-slate-800 font-medium truncate">
                          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                          <span className="truncate">{prop.location.society}, {prop.location.city}</span>
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => setMapPreviewProperty(prop)}
                          className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-[10.5px] font-mono border border-blue-200 cursor-pointer"
                          title="View Location Map Pin"
                        >
                          <Compass className="w-3 h-3" />
                          {hasCoords ? (
                            <span>{prop.location.latitude?.toFixed(3)}°N, {prop.location.longitude?.toFixed(3)}°E</span>
                          ) : (
                            <span>Set Pin</span>
                          )}
                        </button>
                      </td>

                      {/* Agency */}
                      <td className="py-3.5 px-3">
                        <div className="font-semibold text-slate-800 truncate max-w-[140px]">
                          {prop.agentName}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate max-w-[140px]">
                          {prop.agentCompany}
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-3">
                        <button
                          type="button"
                          onClick={() => handleCycleStatus(prop)}
                          title="Click to cycle status (Active -> Sold -> Hidden)"
                          className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                            status === 'active'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              : status === 'sold'
                              ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                              : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                          }`}
                        >
                          {status === 'pending' ? 'HIDDEN' : status}
                        </button>
                      </td>

                      {/* Action Buttons (CRUD) */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* 1. Preview on Map */}
                          <button
                            type="button"
                            onClick={() => setMapPreviewProperty(prop)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                            title="View Location Map Pin"
                          >
                            <Compass className="w-4 h-4" />
                          </button>

                          {/* 2. Launch 3D & Video Virtual Tour */}
                          <button
                            type="button"
                            onClick={e => {
                              e.stopPropagation();
                              if (onOpenVirtualTour) {
                                onOpenVirtualTour(prop);
                              }
                            }}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer border ${
                              prop.virtualTourVideoUrl
                                ? 'text-purple-600 bg-purple-50 hover:bg-purple-100 border-purple-200'
                                : 'text-slate-500 border-transparent hover:text-purple-600 hover:bg-purple-50 hover:border-purple-200'
                            }`}
                            title={
                              prop.virtualTourVideoUrl
                                ? 'Launch 3D & Video Virtual Tour'
                                : 'Launch 360° Interactive Virtual Tour'
                            }
                          >
                            <Video className="w-4 h-4" />
                          </button>

                          {/* 3. View / Hide Visibility Toggle */}
                          <button
                            type="button"
                            onClick={e => {
                              e.stopPropagation();
                              handleToggleVisibility(prop);
                            }}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer border ${
                              status === 'active'
                                ? 'text-emerald-600 bg-emerald-50/70 border-emerald-200 hover:bg-emerald-100'
                                : 'text-amber-600 bg-amber-50 border-amber-200 hover:bg-amber-100'
                            }`}
                            title={
                              status === 'active'
                                ? 'Listing is Visible — Click to Hide from Portal'
                                : 'Listing is Hidden — Click to Make Visible on Portal'
                            }
                          >
                            {status === 'active' ? (
                              <Eye className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </button>

                          {/* 4. Preview Full Advertisement Modal */}
                          {onViewProperty && (
                            <button
                              type="button"
                              onClick={e => {
                                e.stopPropagation();
                                onViewProperty(prop);
                              }}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                              title="Preview Full Property Advertisement"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          )}

                          {/* 5. Edit Property & Manage Photos */}
                          {canManageThisProperty(prop) ? (
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(prop)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                              title="Edit Advertisement, Photos & Map"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                          ) : (
                            <span
                              className="p-1.5 rounded-lg text-slate-300 cursor-not-allowed"
                              title={`Restricted Access: Managed by ${prop.agentCompany || prop.agentName}.`}
                            >
                              <Lock className="w-4 h-4" />
                            </span>
                          )}

                          {/* 6. Delete Property */}
                          {canManageThisProperty(prop) ? (
                            <button
                              type="button"
                              onClick={() => setDeletingProperty(prop)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              title="Delete Advertisement"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =====================================================================
          CREATE / EDIT PROPERTY & LOCATION MAP MODAL
         ===================================================================== */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-600 text-white">
                  {editingProperty ? <Edit3 className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold">
                    {editingProperty ? `Edit Advertisement: ${editingProperty.title}` : 'Post New Property Advertisement'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Manage title, pricing, specifications, watermarked photo sequence, and GPS location map coordinates.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveProperty} className="overflow-y-auto p-5 sm:p-7 space-y-6 flex-1 bg-slate-50">
              
              {/* Basic Information */}
              <div className="bg-white p-4.5 rounded-xl border border-slate-200 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Home className="w-4 h-4 text-blue-600" />
                  <span>1. Property Details &amp; Pricing</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Advertisement Title *</label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={e => setFormTitle(e.target.value)}
                      placeholder="e.g. Modern 1-Kanal Luxury Villa Facing Margalla Hills in Faisal Hills"
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Highlight Tagline (Optional)</label>
                    <input
                      type="text"
                      value={formTagline}
                      onChange={e => setFormTagline(e.target.value)}
                      placeholder="e.g. Executive Block • CDA/RDA Approved • Basement + Pool"
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
                    <select
                      value={formCategory}
                      onChange={e => setFormCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="modular">Modular / Capsule Smart Homes</option>
                      <option value="projects">Development Projects &amp; UPVC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Property Type *</label>
                    <select
                      value={formType}
                      onChange={e => setFormType(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
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
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Purpose *</label>
                    <select
                      value={formPurpose}
                      onChange={e => setFormPurpose(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="for_sale">For Sale</option>
                      <option value="for_rent">For Rent / Lease</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Listing Status</label>
                    <select
                      value={formStatus}
                      onChange={e => setFormStatus(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="active">Active (Visible on Portal)</option>
                      <option value="pending">Hidden / Pending</option>
                      <option value="sold">Sold Out</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Numeric Price (PKR) *</label>
                    <input
                      type="number"
                      required
                      value={formPrice}
                      onChange={e => formatAutoPrice(e.target.value)}
                      placeholder="e.g. 45000000"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Formatted Price Display</label>
                    <input
                      type="text"
                      required
                      value={formPriceFormatted}
                      onChange={e => setFormPriceFormatted(e.target.value)}
                      placeholder="e.g. PKR 4.50 Crore"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Area Dimension</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formArea}
                        onChange={e => setFormArea(e.target.value)}
                        placeholder="e.g. 10"
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                      />
                      <select
                        value={formAreaUnit}
                        onChange={e => setFormAreaUnit(e.target.value)}
                        className="w-28 px-2 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                      >
                        <option value="Marla">Marla</option>
                        <option value="Kanal">Kanal</option>
                        <option value="Sq Ft">Sq Ft</option>
                        <option value="Sq Yd">Sq Yd</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Partner Agency</label>
                    <select
                      value={formAgencyId}
                      onChange={e => setFormAgencyId(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      {agencies.map(ag => (
                        <option key={ag.id} value={ag.id}>{ag.name} ({ag.ownerName})</option>
                      ))}
                    </select>
                  </div>

                  {formCategory !== 'commercial' && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Bedrooms</label>
                        <input
                          type="number"
                          value={formBedrooms ?? ''}
                          onChange={e => setFormBedrooms(e.target.value ? Number(e.target.value) : undefined)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Bathrooms</label>
                        <input
                          type="number"
                          value={formBathrooms ?? ''}
                          onChange={e => setFormBathrooms(e.target.value ? Number(e.target.value) : undefined)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Promotion Checkboxes */}
                <div className="flex flex-wrap items-center gap-5 pt-2 border-t border-slate-100">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsFeatured}
                      onChange={e => setFormIsFeatured(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>Mark as Featured Listing</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsHotCommercial}
                      onChange={e => setFormIsHotCommercial(e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span>Include in Commercial Spotlight</span>
                  </label>
                </div>
              </div>

              {/* Location & Interactive Map Pin Picker */}
              <div className="bg-white p-4.5 rounded-xl border border-slate-200 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>2. Location Address &amp; Interactive Map Pin Calibration</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Block / Sector / Phase</label>
                    <input
                      type="text"
                      value={formLocation.block || ''}
                      onChange={e => setFormLocation({ ...formLocation, block: e.target.value })}
                      placeholder="e.g. Executive Block or Block B"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Street / Plot Address</label>
                    <input
                      type="text"
                      value={formLocation.address}
                      onChange={e => setFormLocation({ ...formLocation, address: e.target.value })}
                      placeholder="e.g. Street 18, Block B, Faisal Hills, Taxila / Rawalpindi"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>
                </div>

                <LocationPickerMap
                  location={formLocation}
                  onChangeLocation={updatedLoc => setFormLocation(updatedLoc)}
                  provinceCityData={provinceCityData}
                />
              </div>

              {/* Description & Features */}
              <div className="bg-white p-4.5 rounded-xl border border-slate-200 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-blue-600" />
                  <span>3. Description &amp; Amenities</span>
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={4}
                    value={formDescription}
                    onChange={e => setFormDescription(e.target.value)}
                    placeholder="Comprehensive description of architecture, location advantages, and investment return..."
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Key Features (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={formFeatures}
                    onChange={e => setFormFeatures(e.target.value)}
                    placeholder="CDA Approved, Underground Electricity, German UPVC Windows, Corner Plot"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Multi-Photo Uploader, Sequence Reordering & Super Admin Movie Clip */}
              <PropertyMediaUploader
                images={formImages}
                onChangeImages={setFormImages}
                videoUrl={formVideoUrl}
                onChangeVideoUrl={setFormVideoUrl}
                videoTitle={formVideoTitle}
                onChangeVideoTitle={setFormVideoTitle}
                isSuperAdmin={isSuperAdmin}
                onOpenRoleSwitcher={onOpenRoleSwitcher}
              />

              {/* Form Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingProperty ? 'Save Updated Advertisement' : 'Publish Advertisement'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MAP PREVIEW MODAL FOR ANY PROPERTY
         ===================================================================== */}
      {mapPreviewProperty && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  Interactive Map Verification
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  {mapPreviewProperty.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setMapPreviewProperty(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <LocationMapView
              location={mapPreviewProperty.location}
              propertyTitle={mapPreviewProperty.title}
              propertyPrice={mapPreviewProperty.priceFormatted}
              propertyType={mapPreviewProperty.type}
            />

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  const target = mapPreviewProperty;
                  setMapPreviewProperty(null);
                  handleOpenEdit(target);
                }}
                className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Map Coordinates</span>
              </button>

              <button
                type="button"
                onClick={() => setMapPreviewProperty(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
              >
                Close Map
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          DELETE CONFIRMATION MODAL
         ===================================================================== */}
      {deletingProperty && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-center animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900">Delete Property Advertisement?</h4>
              <p className="text-xs text-slate-500">
                Are you sure you want to permanently remove <strong>&ldquo;{deletingProperty.title}&rdquo;</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingProperty(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm cursor-pointer"
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

import React, { useState, useRef } from 'react';
import {
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  X,
  Image as ImageIcon,
  Sparkles,
  MapPin,
  Save,
  RotateCcw,
  Star,
  UploadCloud,
  Check
} from 'lucide-react';
import { HeroSlide } from '../types';

interface AdminBannerManagerProps {
  slides: HeroSlide[];
  onUpdateSlides: (slides: HeroSlide[]) => void;
}

interface PresetImageItem {
  id: string;
  name: string;
  url: string;
  fallbackUrl: string;
  category: string;
}

export const INITIAL_PRESET_IMAGES: PresetImageItem[] = [
  {
    id: 'preset-q3',
    name: 'Q3 Pitched-Roof Modular Forest Cabin Pod',
    url: 'https://www.genspark.ai/api/files/s/pSySUzgg',
    fallbackUrl:
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=2000&q=85',
    category: 'modular'
  },
  {
    id: 'preset-loft',
    name: 'L-Shaped Dual-Container Loft & Interior Cutaway',
    url: 'https://www.genspark.ai/api/files/s/OypEiCb2',
    fallbackUrl:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2000&q=85',
    category: 'modular'
  },
  {
    id: 'preset-rooftop',
    name: 'Rooftop Terrace Container Villa & Timber Deck',
    url: 'https://www.genspark.ai/api/files/s/3jIuxLrV',
    fallbackUrl:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=85',
    category: 'modular'
  },
  {
    id: 'preset-hex',
    name: 'Hex-Lit Matte-Black Designer Container Pod',
    url: 'https://www.genspark.ai/api/files/s/K4lfut6W',
    fallbackUrl:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=85',
    category: 'modular'
  },
  {
    id: 'preset-studio',
    name: 'Curved-Corner Glass Executive Container Studio',
    url: 'https://www.genspark.ai/api/files/s/bl8vngPB',
    fallbackUrl:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=85',
    category: 'modular'
  },
  {
    id: 'preset-v2124',
    name: 'V2124 Double-Decker Stacked Capsule Villa',
    url: 'https://www.genspark.ai/api/files/s/u84KzdvI',
    fallbackUrl:
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2000&q=85',
    category: 'modular'
  },
  {
    id: 'preset-lakeside',
    name: 'Lakeside Curved-Glass Observation Capsule Pod',
    url: 'https://www.genspark.ai/api/files/s/I6HwjuLB',
    fallbackUrl:
      'https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=2000&q=85',
    category: 'modular'
  },
  {
    id: 'preset-faisal-villa',
    name: 'Faisal Hills 1-Kanal Villa (Taxila / Margalla)',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
    fallbackUrl:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
    category: 'residential'
  },
  {
    id: 'preset-centaurus',
    name: 'Islamabad Blue Area Highrise / The Centaurus',
    url: 'https://towers.pk/wp-content/uploads/2023/11/Centaurus_Mall-1.webp',
    fallbackUrl:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85',
    category: 'commercial'
  },
  {
    id: 'preset-upvc',
    name: 'Ri8click UPVC Sliding Patio Doors & Thermal Glazing',
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=2000&q=85',
    fallbackUrl:
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=2000&q=85',
    category: 'projects'
  },
  {
    id: 'preset-b17',
    name: 'Multi Gardens B-17 Sector G Margalla Residence',
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=85',
    fallbackUrl:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=85',
    category: 'residential'
  },
  {
    id: 'preset-dha-lahore',
    name: 'Lahore DHA Phase 6 Commercial Boulevard Highrise',
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85',
    fallbackUrl:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85',
    category: 'commercial'
  }
];

export const AdminBannerManager: React.FC<AdminBannerManagerProps> = ({
  slides,
  onUpdateSlides
}) => {
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [presetImages, setPresetImages] = useState<PresetImageItem[]>(INITIAL_PRESET_IMAGES);
  const [presetClickMode, setPresetClickMode] = useState<'replace_cover' | 'append_gallery'>(
    'append_gallery'
  );
  const [additionalImageUrlInput, setAdditionalImageUrlInput] = useState<string>('');
  const [newPresetNameInput, setNewPresetNameInput] = useState<string>('');
  const localFileInputRef = useRef<HTMLInputElement | null>(null);

  // Form State for create/edit
  const [formData, setFormData] = useState<Partial<HeroSlide>>({
    categoryTag: 'Contemporary Modular Capsule',
    badgeColor: 'bg-indigo-600 text-white',
    title: '',
    subtitle: '',
    description: '',
    price: 'PKR 68 Lakh',
    location: 'Taxila / Islamabad',
    society: 'Faisal Hills & Resort Estates',
    imageUrl: INITIAL_PRESET_IMAGES[0].url,
    galleryImages: [
      INITIAL_PRESET_IMAGES[0].url,
      INITIAL_PRESET_IMAGES[5].url,
      INITIAL_PRESET_IMAGES[6].url
    ],
    tourRoomsCount: 4,
    isActive: true,
    features: [
      'Aerospace Capsule Shell',
      'Ri8Click UPVC Glazing',
      'Smart IoT Controls',
      'Turnkey Delivery'
    ]
  });

  const [featureInput, setFeatureInput] = useState<string>('');

  // Synchronize primary imageUrl and galleryImages list
  const syncSlideGallery = (nextGallery: string[], fallbackPrimary?: string) => {
    const cleanGallery = nextGallery.filter(Boolean);
    const primary = cleanGallery[0] || fallbackPrimary || '';
    setFormData(prev => ({
      ...prev,
      imageUrl: primary,
      galleryImages: cleanGallery
    }));
  };

  const currentSlideGallery: string[] =
    formData.galleryImages && formData.galleryImages.length > 0
      ? formData.galleryImages
      : formData.imageUrl
      ? [formData.imageUrl]
      : [];

  const handleStartCreate = () => {
    setFormData({
      id: `slide-${Date.now()}`,
      categoryTag: 'Contemporary Modular Capsule',
      badgeColor: 'bg-indigo-600 text-white',
      title: '',
      subtitle: '',
      description: '',
      price: 'PKR 68 Lakh',
      location: 'Islamabad / Taxila',
      society: 'Faisal Hills (Executive Block)',
      imageUrl: presetImages[0]?.url || INITIAL_PRESET_IMAGES[0].url,
      galleryImages: [
        presetImages[0]?.url || INITIAL_PRESET_IMAGES[0].url,
        presetImages[5]?.url || INITIAL_PRESET_IMAGES[5].url,
        presetImages[6]?.url || INITIAL_PRESET_IMAGES[6].url
      ],
      tourRoomsCount: 4,
      isActive: true,
      order: slides.length + 1,
      features: [
        'Aerospace Capsule Shell',
        'Ri8Click UPVC Windows',
        'Solar Backup',
        'Margalla View'
      ],
      samplePropertyData: {
        title: 'New Featured Capsule / Property',
        category: 'modular',
        location: { city: 'Taxila', society: 'Faisal Hills', province: 'Punjab' }
      }
    });
    setIsCreatingNew(true);
    setEditingSlide(null);
  };

  const handleStartEdit = (slide: HeroSlide) => {
    const initialGallery =
      slide.galleryImages && slide.galleryImages.length > 0
        ? slide.galleryImages
        : slide.imageUrl
        ? [slide.imageUrl]
        : [];
    setEditingSlide(slide);
    setFormData({
      ...slide,
      imageUrl: initialGallery[0] || slide.imageUrl,
      galleryImages: initialGallery
    });
    setIsCreatingNew(false);
  };

  // Add image to current slide's gallery
  const handleAddImageToSlide = (urlToAdd: string) => {
    const trimmed = urlToAdd.trim();
    if (!trimmed) return;
    if (presetClickMode === 'replace_cover') {
      const rest = currentSlideGallery.slice(1).filter(u => u !== trimmed);
      syncSlideGallery([trimmed, ...rest]);
    } else {
      if (currentSlideGallery.includes(trimmed)) {
        // Move to cover if already present
        const rest = currentSlideGallery.filter(u => u !== trimmed);
        syncSlideGallery([trimmed, ...rest]);
      } else {
        syncSlideGallery([...currentSlideGallery, trimmed]);
      }
    }
  };

  // Upload local image files into slide gallery
  const handleLocalFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const validFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (validFiles.length === 0) return;

    Promise.all(
      validFiles.map(
        file =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve((e.target?.result as string) || '');
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsDataURL(file);
          })
      )
    ).then(dataUrls => {
      const validUrls = dataUrls.filter(Boolean);
      syncSlideGallery([...currentSlideGallery, ...validUrls]);
      if (localFileInputRef.current) localFileInputRef.current.value = '';
    });
  };

  // Remove a single image at index from the current slide
  const handleRemoveSlideImageAt = (idxToRemove: number) => {
    const next = currentSlideGallery.filter((_, i) => i !== idxToRemove);
    syncSlideGallery(next, '');
  };

  // Move an image left or right in the current slide's sequence
  const handleMoveSlideImage = (idx: number, direction: 'left' | 'right') => {
    const targetIdx = direction === 'left' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= currentSlideGallery.length) return;
    const next = [...currentSlideGallery];
    const temp = next[idx];
    next[idx] = next[targetIdx];
    next[targetIdx] = temp;
    syncSlideGallery(next);
  };

  // Set any image in the slide's gallery as the #1 Cover Image
  const handleMakeCoverImage = (idx: number) => {
    if (idx === 0) return;
    const chosen = currentSlideGallery[idx];
    const rest = currentSlideGallery.filter((_, i) => i !== idx);
    syncSlideGallery([chosen, ...rest]);
  };

  // Save custom URL to Quick-Select Presets
  const handleSaveCurrentUrlToPresets = () => {
    const urlToSave = (additionalImageUrlInput || formData.imageUrl || '').trim();
    if (!urlToSave) return;
    const name =
      newPresetNameInput.trim() ||
      formData.title?.trim() ||
      `Custom Preset #${presetImages.length + 1}`;
    const newPreset: PresetImageItem = {
      id: `preset-custom-${Date.now()}`,
      name,
      url: urlToSave,
      fallbackUrl: INITIAL_PRESET_IMAGES[0].fallbackUrl,
      category: 'modular'
    };
    setPresetImages([newPreset, ...presetImages]);
    setNewPresetNameInput('');
  };

  const handleDeletePreset = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPresetImages(prev => prev.filter(p => p.id !== id));
  };

  const handleMovePreset = (idx: number, direction: 'left' | 'right', e: React.MouseEvent) => {
    e.stopPropagation();
    const targetIdx = direction === 'left' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= presetImages.length) return;
    const copy = [...presetImages];
    const temp = copy[idx];
    copy[idx] = copy[targetIdx];
    copy[targetIdx] = temp;
    setPresetImages(copy);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    const finalGallery =
      currentSlideGallery.length > 0
        ? currentSlideGallery
        : formData.imageUrl
        ? [formData.imageUrl]
        : [];
    const primaryImageUrl = finalGallery[0] || formData.imageUrl || '';

    if (!formData.title || !primaryImageUrl) {
      alert('Please provide a Banner Title and at least 1 Image.');
      return;
    }

    if (isCreatingNew) {
      const newSlide: HeroSlide = {
        id: `slide-${Date.now()}`,
        categoryTag: formData.categoryTag || 'Featured Property',
        badgeColor: formData.badgeColor || 'bg-blue-600 text-white',
        title: formData.title || '',
        subtitle: formData.subtitle || '',
        description: formData.description || '',
        price: formData.price || 'PKR 5 Crore',
        location: formData.location || 'Taxila',
        society: formData.society || 'Faisal Hills',
        imageUrl: primaryImageUrl,
        galleryImages: finalGallery,
        tourRoomsCount: finalGallery.length || formData.tourRoomsCount || 3,
        isActive: formData.isActive !== false,
        order: slides.length + 1,
        features:
          formData.features && formData.features.length > 0
            ? formData.features
            : ['Prime Location', 'Ri8Click UPVC Glazing', 'Watermarked Listing'],
        samplePropertyData: formData.samplePropertyData || {
          title: formData.title,
          category: 'modular',
          location: { city: 'Taxila', society: 'Faisal Hills', province: 'Punjab' }
        }
      };
      onUpdateSlides([...slides, newSlide]);
      setIsCreatingNew(false);
    } else if (editingSlide) {
      const updated = slides.map(s => {
        if (s.id === editingSlide.id) {
          return {
            ...s,
            ...formData,
            imageUrl: primaryImageUrl,
            galleryImages: finalGallery,
            tourRoomsCount: finalGallery.length || s.tourRoomsCount,
            features: formData.features || s.features
          } as HeroSlide;
        }
        return s;
      });
      onUpdateSlides(updated);
      setEditingSlide(null);
    }
  };

  // Direct image sequence management on existing slide cards without opening full modal
  const handleQuickRotateSlideCover = (slide: HeroSlide) => {
    const gallery =
      slide.galleryImages && slide.galleryImages.length > 1
        ? slide.galleryImages
        : [slide.imageUrl];
    if (gallery.length <= 1) return;
    const rotated = [...gallery.slice(1), gallery[0]];
    onUpdateSlides(
      slides.map(s =>
        s.id === slide.id ? { ...s, imageUrl: rotated[0], galleryImages: rotated } : s
      )
    );
  };

  const handleDeleteSlide = (id: string) => {
    if (slides.length <= 1) {
      alert('You must have at least 1 hero banner slide.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this banner slide?')) {
      const remaining = slides
        .filter(s => s.id !== id)
        .map((s, idx) => ({ ...s, order: idx + 1 }));
      onUpdateSlides(remaining);
      if (editingSlide?.id === id) setEditingSlide(null);
    }
  };

  const handleToggleActive = (id: string) => {
    onUpdateSlides(slides.map(s => (s.id === id ? { ...s, isActive: !s.isActive } : s)));
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= slides.length) return;

    const newSlides = [...slides];
    const temp = newSlides[index];
    newSlides[index] = newSlides[targetIndex];
    newSlides[targetIndex] = temp;

    const reordered = newSlides.map((s, idx) => ({ ...s, order: idx + 1 }));
    onUpdateSlides(reordered);
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    const current = formData.features || [];
    setFormData({ ...formData, features: [...current, featureInput.trim()] });
    setFeatureInput('');
  };

  const handleRemoveFeature = (idx: number) => {
    const current = formData.features || [];
    setFormData({ ...formData, features: current.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Hero Banner &amp; Capsule Showcase Slide Manager</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Add, update, reorder, and delete full-screen hero slides and easily manage each slide&apos;s multi-image sequence (reorder photos, set cover, or delete images).
          </p>
        </div>

        <button
          type="button"
          onClick={handleStartCreate}
          className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center gap-2 shadow-2xs shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Banner Slide</span>
        </button>
      </div>

      {/* Slide Edit / Create Form Modal Card */}
      {(isCreatingNew || editingSlide) && (
        <div className="bg-white rounded-xl border-2 border-blue-500/40 p-5 sm:p-6 space-y-5 shadow-lg animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <h4 className="text-sm font-bold text-slate-900">
                {isCreatingNew ? 'Create New Banner Slide' : `Edit Slide: ${editingSlide?.title}`}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsCreatingNew(false);
                setEditingSlide(null);
              }}
              className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSaveForm} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-semibold text-slate-700">Banner Main Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Model V2124 Double-Decker Stacked Space Capsule Villa"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Subtitle */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-semibold text-slate-700">Subtitle / Tagline</label>
                <input
                  type="text"
                  value={formData.subtitle || ''}
                  onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Futuristic Two-Story Capsule Home with 270° Curved UPVC Glazing"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category Tag */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Category Tag</label>
                <input
                  type="text"
                  value={formData.categoryTag || ''}
                  onChange={e => setFormData({ ...formData, categoryTag: e.target.value })}
                  placeholder="e.g. Contemporary Modular Capsule"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Badge Color */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Badge Color Style</label>
                <select
                  value={formData.badgeColor || 'bg-blue-600 text-white'}
                  onChange={e => setFormData({ ...formData, badgeColor: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="bg-indigo-600 text-white">Indigo / Purple (Modular / Capsules)</option>
                  <option value="bg-blue-600 text-white">Blue Accent (Residential / Luxury)</option>
                  <option value="bg-emerald-600 text-white">Emerald Green (Highrise / High ROI)</option>
                  <option value="bg-amber-600 text-white">Amber Gold (UPVC / Margalla Hillside)</option>
                  <option value="bg-rose-600 text-white">Rose Red (Exclusive Deal)</option>
                </select>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Formatted Price</label>
                <input
                  type="text"
                  value={formData.price || ''}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                  placeholder="e.g. PKR 68 Lakh or PKR 1.35 Crore"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Location & Society */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Location &amp; Society</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Islamabad / Taxila"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={formData.society || ''}
                    onChange={e => setFormData({ ...formData, society: e.target.value })}
                    placeholder="e.g. Faisal Hills (Executive Block)"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-semibold text-slate-700">
                  Description (1-2 sentences)
                </label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed architectural specifications and highlights..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* ================================================================
                  BANNER PICTURES / MULTI-IMAGE SEQUENCE & GALLERY MANAGER
                 ================================================================ */}
              <div className="md:col-span-2 bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-blue-600" />
                      <span>
                        Slide Pictures &amp; Image Sequence ({currentSlideGallery.length} Attached)
                      </span>
                    </label>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Image #1 is the main banner cover. Use <strong>← / →</strong> to change sequence, <strong>Set Cover</strong> to make primary, or <strong>Delete</strong> to remove any image.
                    </p>
                  </div>

                  {currentSlideGallery.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Clear all images from this banner slide?')) {
                          syncSlideGallery([], '');
                        }
                      }}
                      className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear All Slide Images</span>
                    </button>
                  )}
                </div>

                {/* Active Images Sequence Strip for This Banner Slide */}
                {currentSlideGallery.length === 0 ? (
                  <div className="p-6 rounded-xl border-2 border-dashed border-slate-300 bg-white text-center space-y-1">
                    <ImageIcon className="w-7 h-7 text-slate-400 mx-auto" />
                    <div className="text-xs font-semibold text-slate-700">
                      No Images Attached to This Banner Slide
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Click any Quick-Select preset below, paste an image URL, or upload from your computer.
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {currentSlideGallery.map((imgUrl, idx) => (
                      <div
                        key={`${imgUrl}-${idx}`}
                        className={`group relative rounded-xl overflow-hidden border-2 bg-white shadow-2xs flex flex-col justify-between transition-all ${
                          idx === 0
                            ? 'border-blue-600 ring-2 ring-blue-500/20'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="relative h-24 bg-slate-900 overflow-hidden">
                          <img
                            src={imgUrl}
                            alt={`Slide Photo ${idx + 1}`}
                            onError={e => {
                              e.currentTarget.src = INITIAL_PRESET_IMAGES[0].fallbackUrl;
                            }}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

                          {/* Sequence Number / Cover Badge */}
                          <span
                            className={`absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[9.5px] font-extrabold uppercase tracking-wider ${
                              idx === 0
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'bg-slate-900/80 text-white'
                            }`}
                          >
                            {idx === 0 ? '#1 COVER' : `#${idx + 1}`}
                          </span>

                          {/* Delete Single Image Button */}
                          <button
                            type="button"
                            onClick={() => handleRemoveSlideImageAt(idx)}
                            className="absolute top-1.5 right-1.5 p-1 rounded-md bg-rose-600/90 hover:bg-rose-600 text-white shadow-xs cursor-pointer"
                            title="Remove this image from slide"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Reorder Sequence & Make Cover Bar */}
                        <div className="p-1.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleMoveSlideImage(idx, 'left')}
                              className="p-1 rounded bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                              title="Move image earlier in sequence"
                            >
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === currentSlideGallery.length - 1}
                              onClick={() => handleMoveSlideImage(idx, 'right')}
                              className="p-1 rounded bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                              title="Move image later in sequence"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>

                          {idx !== 0 ? (
                            <button
                              type="button"
                              onClick={() => handleMakeCoverImage(idx)}
                              className="px-2 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-800 text-[9.5px] font-bold flex items-center gap-1 cursor-pointer"
                              title="Set as #1 Main Cover Image"
                            >
                              <Star className="w-2.5 h-2.5 fill-current" />
                              <span>Set Cover</span>
                            </button>
                          ) : (
                            <span className="text-[9.5px] font-bold text-blue-600 px-1.5">
                              Primary Cover
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Primary Cover URL Input + Add URL / Upload Local Image Controls */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 pt-2">
                  <div className="md:col-span-6 space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700">
                      Primary Cover Image URL (#1) *
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="url"
                        value={formData.imageUrl || ''}
                        onChange={e => {
                          const val = e.target.value;
                          if (currentSlideGallery.length <= 1) {
                            syncSlideGallery(val ? [val] : [], val);
                          } else {
                            syncSlideGallery([val, ...currentSlideGallery.slice(1)], val);
                          }
                        }}
                        placeholder="https://..."
                        className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      />
                      {formData.imageUrl && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSlideImageAt(0)}
                          className="px-2.5 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-semibold cursor-pointer"
                          title="Remove current cover image"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-6 space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700">
                      Add Another Image by URL or Local Upload
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="url"
                        value={additionalImageUrlInput}
                        onChange={e => setAdditionalImageUrlInput(e.target.value)}
                        placeholder="Paste image URL to add to sequence..."
                        className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!additionalImageUrlInput.trim()) return;
                          syncSlideGallery([
                            ...currentSlideGallery,
                            additionalImageUrlInput.trim()
                          ]);
                          setAdditionalImageUrlInput('');
                        }}
                        className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shrink-0 cursor-pointer"
                      >
                        + Add URL
                      </button>
                      <input
                        ref={localFileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={e => handleLocalFileUpload(e.target.files)}
                      />
                      <button
                        type="button"
                        onClick={() => localFileInputRef.current?.click()}
                        className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
                        title="Upload photos from your computer"
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>Upload</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Preset Quick Selectors with Sequence & Delete Controls */}
                <div className="space-y-2 pt-3 border-t border-slate-200">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-slate-700">
                      Quick-Select Contemporary Capsule Houses, UPVC &amp; Landmark Photography:
                    </span>

                    <div className="flex items-center gap-2">
                      {/* Click Mode Toggle */}
                      <div className="inline-flex rounded-lg bg-slate-200 p-0.5 text-[10px] font-semibold">
                        <button
                          type="button"
                          onClick={() => setPresetClickMode('append_gallery')}
                          className={`px-2 py-1 rounded-md cursor-pointer transition-all ${
                            presetClickMode === 'append_gallery'
                              ? 'bg-white text-blue-600 shadow-2xs'
                              : 'text-slate-600'
                          }`}
                        >
                          Click = Add to Slide Sequence
                        </button>
                        <button
                          type="button"
                          onClick={() => setPresetClickMode('replace_cover')}
                          className={`px-2 py-1 rounded-md cursor-pointer transition-all ${
                            presetClickMode === 'replace_cover'
                              ? 'bg-white text-blue-600 shadow-2xs'
                              : 'text-slate-600'
                          }`}
                        >
                          Click = Replace Cover
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => setPresetImages(INITIAL_PRESET_IMAGES)}
                        className="px-2 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-semibold flex items-center gap-1 cursor-pointer"
                        title="Reset Preset Library"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset Presets</span>
                      </button>
                    </div>
                  </div>

                  {/* Save custom preset bar */}
                  <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-lg border border-slate-200">
                    <input
                      type="text"
                      value={newPresetNameInput}
                      onChange={e => setNewPresetNameInput(e.target.value)}
                      placeholder="Optional preset label (e.g. Custom Capsule View)..."
                      className="flex-1 min-w-[180px] px-2.5 py-1 text-xs rounded border border-slate-200"
                    />
                    <button
                      type="button"
                      onClick={handleSaveCurrentUrlToPresets}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold cursor-pointer"
                    >
                      + Save Current Cover URL to Presets
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {presetImages.map((preset, idx) => {
                      const isIncluded = currentSlideGallery.includes(preset.url);
                      const isCover = formData.imageUrl === preset.url;
                      return (
                        <div
                          key={preset.id}
                          onClick={() => handleAddImageToSlide(preset.url)}
                          className={`group relative p-2 rounded-lg border text-left transition-all flex flex-col gap-1 cursor-pointer ${
                            isCover
                              ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                              : isIncluded
                              ? 'border-emerald-500 bg-emerald-50/40'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="relative w-full h-14 overflow-hidden rounded bg-slate-900">
                            <img
                              src={preset.url}
                              alt={preset.name}
                              onError={e => {
                                const target = e.currentTarget;
                                if (preset.fallbackUrl && target.src !== preset.fallbackUrl) {
                                  target.src = preset.fallbackUrl;
                                }
                              }}
                              className="w-full h-full object-cover brightness-105 contrast-[1.05]"
                            />
                            {isIncluded && (
                              <span className="absolute top-1 left-1 px-1.5 py-0.2 rounded bg-emerald-600 text-white text-[9px] font-bold flex items-center gap-0.5">
                                <Check className="w-2.5 h-2.5" />
                                {isCover
                                  ? 'Cover'
                                  : `#${currentSlideGallery.indexOf(preset.url) + 1}`}
                              </span>
                            )}

                            {/* Preset Reorder & Delete Overlay Controls */}
                            <div className="absolute top-1 right-1 hidden group-hover:flex items-center gap-0.5 bg-black/75 rounded p-0.5">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={e => handleMovePreset(idx, 'left', e)}
                                className="p-0.5 text-white hover:text-amber-300 disabled:opacity-30"
                                title="Move preset left"
                              >
                                <ArrowLeft className="w-2.5 h-2.5" />
                              </button>
                              <button
                                type="button"
                                disabled={idx === presetImages.length - 1}
                                onClick={e => handleMovePreset(idx, 'right', e)}
                                className="p-0.5 text-white hover:text-amber-300 disabled:opacity-30"
                                title="Move preset right"
                              >
                                <ArrowRight className="w-2.5 h-2.5" />
                              </button>
                              <button
                                type="button"
                                onClick={e => handleDeletePreset(preset.id, e)}
                                className="p-0.5 text-rose-300 hover:text-rose-400"
                                title="Remove from presets"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>
                          <span className="text-[10px] font-medium text-slate-700 truncate">
                            {preset.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bullet Features Manager */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-semibold text-slate-700">Feature Bullet Badges</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={e => setFeatureInput(e.target.value)}
                    placeholder="e.g. 270° Curved UPVC Glass or Turnkey 7-Day Setup"
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-white hover:bg-slate-700 cursor-pointer"
                  >
                    Add Feature
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {formData.features?.map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      <span>{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-slate-400 hover:text-red-500 cursor-pointer"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Action Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setIsCreatingNew(false);
                  setEditingSlide(null);
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center gap-2 shadow-2xs cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isCreatingNew ? 'Save & Publish Slide' : 'Update Slide Changes'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Slide Items List */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Active Slides in Sequence ({slides.length})
        </h4>

        <div className="space-y-3">
          {slides.map((slide, index) => {
            const slideGallery =
              slide.galleryImages && slide.galleryImages.length > 0
                ? slide.galleryImages
                : [slide.imageUrl];
            return (
              <div
                key={slide.id}
                className={`bg-white rounded-xl border transition-all p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  slide.isActive
                    ? 'border-slate-200 shadow-2xs hover:border-slate-300'
                    : 'border-slate-200 bg-slate-50 opacity-60'
                }`}
              >
                {/* Left Thumbnail & Info */}
                <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                  <div className="relative w-24 h-16 sm:w-28 sm:h-20 rounded-lg overflow-hidden shrink-0 border border-slate-200 bg-slate-900 group">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      onError={e => {
                        e.currentTarget.src = INITIAL_PRESET_IMAGES[0].fallbackUrl;
                      }}
                      className="w-full h-full object-cover brightness-105 contrast-[1.04]"
                    />
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/70 text-white">
                      #{index + 1}
                    </div>
                    {slideGallery.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleQuickRotateSlideCover(slide)}
                        className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-blue-600/90 hover:bg-blue-500 text-white text-[9px] font-bold cursor-pointer"
                        title="Click to cycle next photo in this slide's sequence as Cover"
                      >
                        {slideGallery.length} Photos ↻
                      </button>
                    )}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${slide.badgeColor}`}
                      >
                        {slide.categoryTag}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {slide.price}
                      </span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {slide.society}, {slide.location}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 truncate">{slide.title}</h4>

                    <p className="text-xs text-slate-500 line-clamp-1">{slide.description}</p>

                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {slide.features?.slice(0, 3).map((feat, fidx) => (
                        <span
                          key={fidx}
                          className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded"
                        >
                          • {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Operations Controls */}
                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                  {/* Order Controls */}
                  <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 mr-1">
                    <button
                      type="button"
                      onClick={() => handleMoveOrder(index, 'up')}
                      disabled={index === 0}
                      className="p-1 rounded text-slate-500 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                      title="Move slide up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveOrder(index, 'down')}
                      disabled={index === slides.length - 1}
                      className="p-1 rounded text-slate-500 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                      title="Move slide down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Toggle Active */}
                  <button
                    type="button"
                    onClick={() => handleToggleActive(slide.id)}
                    className={`p-2 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1 cursor-pointer ${
                      slide.isActive
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                    title={slide.isActive ? 'Disable slide' : 'Enable slide'}
                  >
                    {slide.isActive ? (
                      <Eye className="w-3.5 h-3.5" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5" />
                    )}
                    <span className="text-[11px]">{slide.isActive ? 'Active' : 'Hidden'}</span>
                  </button>

                  {/* Edit Slide & Manage Pictures */}
                  <button
                    type="button"
                    onClick={() => handleStartEdit(slide)}
                    className="p-2 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 transition-colors cursor-pointer"
                    title="Edit slide & manage image sequence"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => handleDeleteSlide(slide.id)}
                    className="p-2 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600 border border-slate-200 transition-colors cursor-pointer"
                    title="Delete slide"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminBannerManager;

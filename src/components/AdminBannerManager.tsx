import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  Sparkles,
  Save,
  X,
  Layers,
  MapPin,
  Upload,
  Star,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Search
} from 'lucide-react';
import { HeroSlide } from '../types';
import { INITIAL_HERO_SLIDES } from '../data/mockData';

interface AdminBannerManagerProps {
  slides: HeroSlide[];
  onUpdateSlides: (slides: HeroSlide[]) => void;
}

interface PresetImageItem {
  id: string;
  name: string;
  category: string;
  url: string;
  fallbackUrl: string;
}

const INITIAL_PRESET_IMAGES: PresetImageItem[] = [
  {
    id: 'preset-q3',
    name: 'Model Q3 Forest Cabin Pod',
    category: 'Capsule Pod',
    url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=85',
    fallbackUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'preset-loft',
    name: 'Model K5 L-Shaped Loft Container',
    category: 'Container Villa',
    url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85',
    fallbackUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'preset-rooftop',
    name: 'Sky-Deck Rooftop Container Villa',
    category: 'Container Villa',
    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
    fallbackUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'preset-hex',
    name: 'Hex-Lit Matte-Black Executive Pod',
    category: 'Capsule Pod',
    url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
    fallbackUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'preset-studio',
    name: 'Curved-Corner Glass Studio Pod',
    category: 'Capsule Pod',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
    fallbackUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'preset-v2124',
    name: 'Model V2124 Double-Decker Capsule',
    category: 'Duplex Capsule',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    fallbackUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'preset-lakeside',
    name: 'Lakeside Panorama Capsule',
    category: 'Capsule Pod',
    url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=85',
    fallbackUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'preset-faisal-villa',
    name: 'Faisal Hills 1-Kanal Designer Villa',
    category: 'Luxury Villa',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    fallbackUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'preset-centaurus',
    name: 'The Centaurus & Blue Area Highrise',
    category: 'Highrise',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    fallbackUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'preset-upvc',
    name: 'German UPVC Sliding Patio Glass',
    category: 'UPVC & Interior',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    fallbackUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'preset-b17',
    name: 'Multi Gardens B-17 Lake View Villa',
    category: 'Luxury Villa',
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
    fallbackUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'preset-dha-lahore',
    name: 'Corporate Commercial Plaza',
    category: 'Highrise',
    url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1600&q=85',
    fallbackUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
  }
];

export const AdminBannerManager: React.FC<AdminBannerManagerProps> = ({
  slides,
  onUpdateSlides
}) => {
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const [presetImages] = useState<PresetImageItem[]>(INITIAL_PRESET_IMAGES);
  const [presetClickMode, setPresetClickMode] = useState<'replace_cover' | 'append_gallery'>('append_gallery');
  const [additionalImageUrlInput, setAdditionalImageUrlInput] = useState('');

  const [formData, setFormData] = useState<HeroSlide>({
    id: '',
    categoryTag: 'Contemporary Modular Capsule',
    badgeColor: 'bg-indigo-600 text-white',
    title: '',
    subtitle: '',
    description: '',
    price: 'PKR 68 Lakh',
    location: 'Taxila / Islamabad',
    society: 'Faisal Hills & Resort Estates',
    imageUrl: INITIAL_PRESET_IMAGES[0].url,
    galleryImages: [INITIAL_PRESET_IMAGES[0].url],
    tourRoomsCount: 4,
    isActive: true,
    order: slides.length + 1,
    features: ['270° Panoramic Low-E Glass', 'Ri8click UPVC Thermal Glazing', 'Turnkey 7-Day Setup'],
    samplePropertyData: {
      title: '',
      category: 'modular',
      location: {
        city: 'Taxila',
        society: 'Faisal Hills',
        province: 'Punjab'
      }
    }
  });

  const [featureInput, setFeatureInput] = useState('');

  const showToast = (msg: string) => {
    setStatusNotice(msg);
    setTimeout(() => setStatusNotice(null), 4000);
  };

  const sortedSlides = [...slides].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  const filteredSlides = sortedSlides.filter(s => {
    const matchesSearch =
      !searchFilter.trim() ||
      s.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.subtitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.categoryTag.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.society.toLowerCase().includes(searchFilter.toLowerCase());

    if (!matchesSearch) return false;
    if (categoryFilter === 'all') return true;
    const cat = s.samplePropertyData?.category || 'modular';
    return cat === categoryFilter;
  });

  const syncSlideGallery = (gallery: string[], fallbackCover = '') => {
    const cleaned = gallery.map(u => u.trim()).filter(Boolean);
    const primaryCover = cleaned[0] || fallbackCover || '';
    setFormData(prev => ({
      ...prev,
      imageUrl: primaryCover,
      galleryImages: cleaned.length > 0 ? cleaned : primaryCover ? [primaryCover] : []
    }));
  };

  const handleStartCreate = () => {
    setFormData({
      id: `slide-${Date.now()}`,
      categoryTag: 'Contemporary Modular Capsule',
      badgeColor: 'bg-indigo-600 text-white',
      title: '',
      subtitle: '',
      description: '',
      price: 'PKR 68 Lakh',
      location: 'Taxila / Islamabad',
      society: 'Faisal Hills & Resort Estates',
      imageUrl: INITIAL_PRESET_IMAGES[0].url,
      galleryImages: [INITIAL_PRESET_IMAGES[0].url],
      tourRoomsCount: 4,
      isActive: true,
      order: slides.length + 1,
      features: ['270° Curved UPVC Glass', 'Smart Voice Automation', 'Crane Installed'],
      samplePropertyData: {
        title: '',
        category: 'modular',
        location: {
          city: 'Taxila',
          society: 'Faisal Hills',
          province: 'Punjab'
        }
      }
    });
    setIsCreatingNew(true);
    setEditingSlide(null);
  };

  const handleStartEdit = (slide: HeroSlide) => {
    const existingGallery =
      slide.galleryImages && slide.galleryImages.length > 0
        ? slide.galleryImages
        : slide.imageUrl
        ? [slide.imageUrl]
        : [];

    setFormData({
      ...slide,
      galleryImages: existingGallery,
      features: [...(slide.features || [])],
      samplePropertyData: slide.samplePropertyData || {
        title: slide.title,
        category: 'modular',
        location: {
          city: slide.location || 'Taxila',
          society: slide.society || 'Faisal Hills',
          province: 'Punjab'
        }
      }
    });
    setEditingSlide(slide);
    setIsCreatingNew(false);
  };

  const handleAddImageToSlide = (url: string) => {
    const trimmed = url.trim();
    if (!trimmed) return;
    const currentGallery =
      formData.galleryImages && formData.galleryImages.length > 0
        ? [...formData.galleryImages]
        : formData.imageUrl
        ? [formData.imageUrl]
        : [];

    if (presetClickMode === 'replace_cover') {
      if (currentGallery.length === 0) {
        syncSlideGallery([trimmed]);
      } else {
        const rest = currentGallery.slice(1).filter(u => u !== trimmed);
        syncSlideGallery([trimmed, ...rest]);
      }
    } else {
      if (!currentGallery.includes(trimmed)) {
        syncSlideGallery([...currentGallery, trimmed]);
      } else {
        syncSlideGallery(currentGallery);
      }
    }
  };

  const handleLocalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = event => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          setFormData(prev => {
            const existing =
              prev.galleryImages && prev.galleryImages.length > 0
                ? [...prev.galleryImages]
                : prev.imageUrl
                ? [prev.imageUrl]
                : [];
            const updated = [...existing, dataUrl];
            return {
              ...prev,
              imageUrl: updated[0],
              galleryImages: updated
            };
          });
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleRemoveSlideImageAt = (idx: number) => {
    const currentGallery =
      formData.galleryImages && formData.galleryImages.length > 0
        ? [...formData.galleryImages]
        : formData.imageUrl
        ? [formData.imageUrl]
        : [];

    const nextGallery = currentGallery.filter((_, i) => i !== idx);
    syncSlideGallery(nextGallery, '');
  };

  const handleMoveSlideImage = (idx: number, direction: 'left' | 'right') => {
    const currentGallery =
      formData.galleryImages && formData.galleryImages.length > 0
        ? [...formData.galleryImages]
        : formData.imageUrl
        ? [formData.imageUrl]
        : [];

    const targetIdx = direction === 'left' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= currentGallery.length) return;

    const swapped = [...currentGallery];
    const temp = swapped[idx];
    swapped[idx] = swapped[targetIdx];
    swapped[targetIdx] = temp;
    syncSlideGallery(swapped);
  };

  const handleMakeCoverImage = (idx: number) => {
    const currentGallery =
      formData.galleryImages && formData.galleryImages.length > 0
        ? [...formData.galleryImages]
        : formData.imageUrl
        ? [formData.imageUrl]
        : [];

    if (idx <= 0 || idx >= currentGallery.length) return;
    const chosen = currentGallery[idx];
    const remaining = currentGallery.filter((_, i) => i !== idx);
    syncSlideGallery([chosen, ...remaining]);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.imageUrl.trim()) {
      alert('Please provide a Banner Title and at least 1 Image.');
      return;
    }

    const ensuredGallery =
      formData.galleryImages && formData.galleryImages.length > 0
        ? formData.galleryImages
        : [formData.imageUrl];

    const updatedSlide: HeroSlide = {
      ...formData,
      imageUrl: ensuredGallery[0],
      galleryImages: ensuredGallery,
      tourRoomsCount: Math.max(ensuredGallery.length, formData.tourRoomsCount || 3),
      samplePropertyData: {
        title: formData.title,
        category: formData.samplePropertyData?.category || 'modular',
        location: {
          city: formData.location.split('/')[0]?.trim() || 'Taxila',
          society: formData.society || 'Faisal Hills',
          province: 'Punjab'
        }
      }
    };

    if (isCreatingNew) {
      const nextSlides = [...sortedSlides, updatedSlide].map((s, idx) => ({
        ...s,
        order: idx + 1
      }));
      onUpdateSlides(nextSlides);
      showToast(`Added "${updatedSlide.title}" to Portfolio Deck & Hero Banner!`);
    } else if (editingSlide) {
      const nextSlides = sortedSlides.map(s => (s.id === updatedSlide.id ? updatedSlide : s));
      onUpdateSlides(nextSlides);
      showToast(`Updated "${updatedSlide.title}" across all live browsers!`);
    }

    setIsCreatingNew(false);
    setEditingSlide(null);
  };

  const handleQuickRotateSlide = (slide: HeroSlide) => {
    const gallery =
      slide.galleryImages && slide.galleryImages.length > 1
        ? [...slide.galleryImages]
        : [slide.imageUrl];
    if (gallery.length <= 1) return;
    const rotated = [...gallery.slice(1), gallery[0]];
    const updated = sortedSlides.map(s =>
      s.id === slide.id
        ? { ...s, imageUrl: rotated[0], galleryImages: rotated }
        : s
    );
    onUpdateSlides(updated);
    showToast(`Rotated primary cover photo for "${slide.title}".`);
  };

  const handleDeleteSlide = (id: string) => {
    const target = slides.find(s => s.id === id);
    if (slides.length <= 1) {
      alert('At least 1 slide must remain in the Portfolio Deck.');
      return;
    }
    const updated = sortedSlides
      .filter(s => s.id !== id)
      .map((s, idx) => ({ ...s, order: idx + 1 }));
    onUpdateSlides(updated);
    if (editingSlide?.id === id) {
      setEditingSlide(null);
    }
    showToast(`Removed "${target?.title || 'Slide'}" from Portfolio Deck & Hero Banner.`);
  };

  const handleToggleActive = (id: string) => {
    const target = sortedSlides.find(s => s.id === id);
    const activeCount = sortedSlides.filter(s => s.isActive).length;
    if (target?.isActive && activeCount <= 1) {
      alert('At least 1 slide must stay Active in the Portfolio Deck.');
      return;
    }
    const updated = sortedSlides.map(s => (s.id === id ? { ...s, isActive: !s.isActive } : s));
    onUpdateSlides(updated);
    showToast(
      target?.isActive
        ? `Hidden "${target.title}" from live Portfolio Deck.`
        : `Activated "${target?.title}" in live Portfolio Deck.`
    );
  };

  const handleMoveOrder = (slideId: string, direction: 'up' | 'down') => {
    const currentIndex = sortedSlides.findIndex(s => s.id === slideId);
    if (currentIndex === -1) return;
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= sortedSlides.length) return;

    const reordered = [...sortedSlides];
    const temp = reordered[currentIndex];
    reordered[currentIndex] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    const normalized = reordered.map((s, idx) => ({ ...s, order: idx + 1 }));
    onUpdateSlides(normalized);
    showToast(`Moved "${temp.title.slice(0, 32)}..." to Position #${targetIndex + 1} in Portfolio Deck.`);
  };

  const handleMoveToPosition = (slideId: string, newOneBasedPosition: number) => {
    const currentIndex = sortedSlides.findIndex(s => s.id === slideId);
    if (currentIndex === -1) return;
    const clampedIndex = Math.max(0, Math.min(sortedSlides.length - 1, newOneBasedPosition - 1));
    if (currentIndex === clampedIndex) return;

    const reordered = [...sortedSlides];
    const [movedItem] = reordered.splice(currentIndex, 1);
    reordered.splice(clampedIndex, 0, movedItem);

    const normalized = reordered.map((s, idx) => ({ ...s, order: idx + 1 }));
    onUpdateSlides(normalized);
    showToast(`Moved "${movedItem.title.slice(0, 32)}..." to Position #${clampedIndex + 1}.`);
  };

  const handleResetToDefaultDeck = () => {
    if (
      window.confirm(
        'Restore all 16 default Portfolio Deck & Hero Banner slides (Capsules, Highrises, Villas & UPVC)?'
      )
    ) {
      onUpdateSlides(INITIAL_HERO_SLIDES);
      showToast('Restored default 16-slide Portfolio Deck sequence.');
    }
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, featureInput.trim()]
    }));
    setFeatureInput('');
  };

  const handleRemoveFeature = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx)
    }));
  };

  const currentSlideGallery =
    formData.galleryImages && formData.galleryImages.length > 0
      ? formData.galleryImages
      : formData.imageUrl
      ? [formData.imageUrl]
      : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">        <div>
          <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hero Banner &amp; Crystal Portfolio Deck Manager</span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">
            Top Hero Banner &amp; Portfolio Deck Sequence ({slides.filter(s => s.isActive).length} Active / {slides.length} Total)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Every slide below directly controls both the Top Hero Banner and the Crystal Portfolio Deck (including Model Q3 Forest Cabin Pod, Capsules, Highrises, Plots &amp; UPVC).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleResetToDefaultDeck}
            className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
            title="Restore all 16 default Portfolio Deck slides"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Default 16 Slides</span>
          </button>

          <button
            type="button"
            onClick={handleStartCreate}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Banner / Deck Slide</span>
          </button>
        </div>
      </div>

      {statusNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusNotice}</span>
          </div>
          <button onClick={() => setStatusNotice(null)} className="text-emerald-600 hover:text-emerald-900">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Create / Edit Slide Modal Form */}
      {(isCreatingNew || editingSlide) && (
        <form
          onSubmit={handleSaveForm}
          className="bg-white p-6 rounded-2xl border-2 border-blue-500/30 shadow-xl space-y-5"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  {isCreatingNew ? 'Create New Portfolio Deck & Hero Slide' : `Editing Slide: ${editingSlide?.title}`}
                </h4>
                <p className="text-xs text-slate-500">
                  Changes sync immediately to the Hero Banner and Portfolio Deck for all visitors.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsCreatingNew(false);
                setEditingSlide(null);
              }}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Slide Headline / Model Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Model Q3 Forest Cabin Pod — Panoramic Glass"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Portfolio Deck Tab Category
              </label>
              <select
                value={formData.samplePropertyData?.category || 'modular'}
                onChange={e =>
                  setFormData({
                    ...formData,
                    samplePropertyData: {
                      title: formData.title,
                      category: e.target.value as any,
                      location: formData.samplePropertyData?.location || {
                        city: 'Taxila',
                        society: 'Faisal Hills',
                        province: 'Punjab'
                      }
                    }
                  })
                }
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-600 focus:outline-none bg-white font-semibold"
              >
                <option value="modular">Capsules (Container &amp; Capsule Houses)</option>
                <option value="commercial">Highrise (Islamabad Highrise Projects)</option>
                <option value="residential">Plots/Villas (Properties &amp; Houses)</option>
                <option value="projects">UPVC (German UPVC &amp; Engineering)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Subtitle / Technical Specs
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="e.g. Compact Luxury Capsule Pod • 28–38 Sq.M"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Category Badge Text
              </label>
              <input
                type="text"
                value={formData.categoryTag}
                onChange={e => setFormData({ ...formData, categoryTag: e.target.value })}
                placeholder="e.g. Contemporary Modular Capsule"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Formatted Valuation / Price
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g. PKR 48 Lakh – 68 Lakh"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                City / Region
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Taxila / Islamabad"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Society / Sector Badge
              </label>
              <input
                type="text"
                value={formData.society}
                onChange={e => setFormData({ ...formData, society: e.target.value })}
                placeholder="e.g. Faisal Hills Executive Block"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Badge Color Theme
              </label>
              <select
                value={formData.badgeColor}
                onChange={e => setFormData({ ...formData, badgeColor: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-600 focus:outline-none bg-white"
              >
                <option value="bg-indigo-600 text-white">Indigo (Modular / Capsules)</option>
                <option value="bg-emerald-600 text-white">Emerald (Highrise / Commercial)</option>
                <option value="bg-blue-600 text-white">Royal Blue (Residential / Villas)</option>
                <option value="bg-amber-600 text-white">Amber Gold (UPVC / Engineering)</option>
                <option value="bg-rose-600 text-white">Crimson Rose (Hot Deal)</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Description (1–2 Sentences)
              </label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Multi-Image Gallery & Sequence Manager */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <label className="block text-xs font-extrabold text-slate-800">
                  Slide Pictures &amp; Image Sequence ({currentSlideGallery.length} Attached)
                </label>
                <p className="text-[11px] text-slate-500">
                  Image #1 is the Main Cover. Reorder with arrows, set cover, or delete any photo.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer shadow-xs transition-all">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload From Computer</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleLocalFileUpload}
                    className="hidden"
                  />
                </label>
                {currentSlideGallery.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Clear all images from this slide?')) {
                        syncSlideGallery([], '');
                      }
                    }}
                    className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold border border-rose-200 cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {currentSlideGallery.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {currentSlideGallery.map((imgUrl, idx) => (
                  <div
                    key={`${imgUrl}-${idx}`}
                    className={`group relative rounded-xl overflow-hidden border-2 bg-slate-900 transition-all ${
                      idx === 0 ? 'border-amber-500 ring-2 ring-amber-400/30' : 'border-slate-200'
                    }`}
                  >
                    <div className="h-24 w-full relative">
                      <img
                        src={imgUrl}
                        alt={`Slide Angle ${idx + 1}`}
                        onError={e => {
                          (e.target as HTMLImageElement).src = INITIAL_PRESET_IMAGES[0].fallbackUrl;
                        }}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-1.5 left-1.5 flex items-center gap-1">
                        <span
                          className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-xs ${
                            idx === 0 ? 'bg-amber-400 text-slate-950' : 'bg-slate-900/80 text-white'
                          }`}
                        >
                          {idx === 0 ? '#1 COVER' : `#${idx + 1}`}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSlideImageAt(idx)}
                        className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-rose-600/90 hover:bg-rose-600 text-white shadow-xs cursor-pointer"
                        title="Delete this image"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="p-1.5 bg-white flex items-center justify-between gap-1 border-t border-slate-100">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveSlideImage(idx, 'left')}
                          className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 cursor-pointer"
                        >
                          <ArrowLeft className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === currentSlideGallery.length - 1}
                          onClick={() => handleMoveSlideImage(idx, 'right')}
                          className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 cursor-pointer"
                        >
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {idx !== 0 ? (
                        <button
                          type="button"
                          onClick={() => handleMakeCoverImage(idx)}
                          className="px-1.5 py-0.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-bold flex items-center gap-0.5 cursor-pointer"
                        >
                          <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                          <span>Set Cover</span>
                        </button>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-700 px-1">Primary</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Direct URL Input & Add */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Primary Cover Image URL (#1) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.imageUrl}
                  onChange={e => {
                    const val = e.target.value;
                    const rest = currentSlideGallery.slice(1);
                    syncSlideGallery(val ? [val, ...rest] : rest, val);
                  }}
                  placeholder="https://... or data:image/..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Append Extra Gallery Image URL
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={additionalImageUrlInput}
                    onChange={e => setAdditionalImageUrlInput(e.target.value)}
                    placeholder="Paste another image URL..."
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:border-blue-600 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!additionalImageUrlInput.trim()) return;
                      syncSlideGallery([...currentSlideGallery, additionalImageUrlInput.trim()]);
                      setAdditionalImageUrlInput('');
                    }}
                    className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shrink-0 cursor-pointer"
                  >
                    + Add URL
                  </button>
                </div>
              </div>
            </div>

            {/* Quick-Select Presets */}
            <div className="pt-2 border-t border-slate-200/80 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                  Quick-Select Preset Library ({presetImages.length})
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPresetClickMode('append_gallery')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border cursor-pointer ${
                      presetClickMode === 'append_gallery'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    Click = Append to Slide
                  </button>
                  <button
                    type="button"
                    onClick={() => setPresetClickMode('replace_cover')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border cursor-pointer ${
                      presetClickMode === 'replace_cover'
                        ? 'bg-amber-500 text-slate-950 border-amber-500'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    Click = Replace Cover
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-40 overflow-y-auto p-1">
                {presetImages.map(preset => (
                  <div
                    key={preset.id}
                    onClick={() => handleAddImageToSlide(preset.url)}
                    className="group relative rounded-xl overflow-hidden border border-slate-200 hover:border-blue-500 cursor-pointer h-16 bg-slate-900"
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      onError={e => {
                        (e.target as HTMLImageElement).src = preset.fallbackUrl;
                      }}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                    <div className="absolute bottom-1 left-1.5 right-1.5 text-[9.5px] font-bold text-white truncate">
                      {preset.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features Manager */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Feature Bullet Badges
            </label>
            <div className="flex gap-2 mb-2.5">
              <input
                type="text"
                value={featureInput}
                onChange={e => setFeatureInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
                placeholder="e.g. 270° Curved UPVC Glass or Turnkey 7-Day Setup"
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-600 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                + Add Feature
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {formData.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold"
                >
                  <span>{feat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="text-blue-400 hover:text-rose-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setIsCreatingNew(false);
                setEditingSlide(null);
              }}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isCreatingNew ? 'Save & Publish Slide' : 'Update Slide Changes'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Filter & Search Bar for Portfolio Deck Slides */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
            placeholder="Search slides (e.g. Model Q3 Forest Cabin Pod, Centaurus, UPVC)..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: `All (${slides.length})` },
            {
              id: 'modular',
              label: `Capsules (${slides.filter(s => (s.samplePropertyData?.category || 'modular') === 'modular').length})`
            },
            {
              id: 'commercial',
              label: `Highrises (${slides.filter(s => s.samplePropertyData?.category === 'commercial').length})`
            },
            {
              id: 'residential',
              label: `Villas/Plots (${slides.filter(s => s.samplePropertyData?.category === 'residential').length})`
            },
            {
              id: 'projects',
              label: `UPVC (${slides.filter(s => s.samplePropertyData?.category === 'projects').length})`
            }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCategoryFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === tab.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Slides Sequence List */}
      <div className="space-y-3">
        {filteredSlides.map(slide => {
          const globalIdx = sortedSlides.findIndex(s => s.id === slide.id);
          const slideGallery =
            slide.galleryImages && slide.galleryImages.length > 0
              ? slide.galleryImages
              : [slide.imageUrl];

          return (
            <div
              key={slide.id}
              className={`bg-white rounded-2xl border p-4 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 ${
                slide.isActive
                  ? 'border-slate-200/90 shadow-xs'
                  : 'border-slate-200/50 bg-slate-50/60 opacity-65'
              }`}
            >
              <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-slate-200">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    onError={e => {
                      (e.target as HTMLImageElement).src = INITIAL_PRESET_IMAGES[0].fallbackUrl;
                    }}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-slate-900/85 text-amber-300 font-black text-[10px]">
                    #{globalIdx + 1}
                  </span>
                  {slideGallery.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleQuickRotateSlide(slide)}
                      className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-blue-600/90 hover:bg-blue-600 text-white font-bold text-[9px] flex items-center gap-0.5 shadow-xs cursor-pointer"
                      title="Click to cycle next photo as cover"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      <span>{slideGallery.length}</span>
                    </button>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${slide.badgeColor}`}
                    >
                      {slide.categoryTag}
                    </span>
                    <span className="text-xs font-extrabold text-blue-600">{slide.price}</span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {slide.society}, {slide.location}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm truncate">{slide.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{slide.description}</p>
                </div>
              </div>

              {/* Direct Sequence & Action Controls */}
              <div className="flex flex-wrap items-center gap-1.5 self-end lg:self-center shrink-0">
                <div className="flex items-center gap-1 mr-1">
                  <span className="text-[10px] font-bold text-slate-400">Pos:</span>
                  <select
                    value={globalIdx + 1}
                    onChange={e => handleMoveToPosition(slide.id, Number(e.target.value))}
                    className="px-2 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-extrabold text-slate-700 cursor-pointer"
                    title="Jump slide directly to position"
                  >
                    {sortedSlides.map((_, posIdx) => (
                      <option key={posIdx} value={posIdx + 1}>
                        #{posIdx + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => handleMoveOrder(slide.id, 'up')}
                  disabled={globalIdx === 0}
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                  title="Move Up in Portfolio Deck"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveOrder(slide.id, 'down')}
                  disabled={globalIdx === sortedSlides.length - 1}
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                  title="Move Down in Portfolio Deck"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleActive(slide.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border cursor-pointer ${
                    slide.isActive
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {slide.isActive ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hidden</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleStartEdit(slide)}
                  className="px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteSlide(slide.id)}
                  className="px-2.5 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  title="Remove slide from Portfolio Deck"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminBannerManager;

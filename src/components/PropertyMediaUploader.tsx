import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Link as LinkIcon, 
  Film, 
  Trash2, 
  Star, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Play, 
  Sparkles, 
  Plus, 
  ShieldCheck, 
  Video, 
  FileImage,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { WatermarkBadge } from './WatermarkBadge';

interface PropertyMediaUploaderProps {
  images: string[];
  onChangeImages: (images: string[]) => void;
  videoUrl?: string;
  onChangeVideoUrl: (url: string) => void;
  videoTitle?: string;
  onChangeVideoTitle: (title: string) => void;
  isSuperAdmin: boolean;
  onOpenRoleSwitcher?: () => void;
}

const SAMPLE_IMAGES = [
  {
    name: 'Q3 Pitched-Roof Capsule Pod',
    url: 'https://www.genspark.ai/api/files/s/pSySUzgg'
  },
  {
    name: 'L-Shaped Loft Container Interior',
    url: 'https://www.genspark.ai/api/files/s/OypEiCb2'
  },
  {
    name: 'Rooftop Deck Container Villa',
    url: 'https://www.genspark.ai/api/files/s/3jIuxLrV'
  },
  {
    name: 'Hex-Lit Black Container Pod',
    url: 'https://www.genspark.ai/api/files/s/K4lfut6W'
  },
  {
    name: 'Curved-Corner Studio Container',
    url: 'https://www.genspark.ai/api/files/s/bl8vngPB'
  },
  {
    name: 'V2124 Double-Decker Capsule',
    url: 'https://www.genspark.ai/api/files/s/u84KzdvI'
  },
  {
    name: 'Lakeside Observation Capsule',
    url: 'https://www.genspark.ai/api/files/s/I6HwjuLB'
  },
  {
    name: 'Modern Designer Villa Exterior',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'UPVC Sliding Glass Doors & Patio',
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'Corporate Highrise Tower Facade',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85'
  }
];

const SAMPLE_VIDEOS = [
  {
    name: 'Luxury Villa & UPVC Glass Walkthrough (HD)',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-buildings-on-a-sunny-day-41465-large.mp4',
    title: 'Aerial Drone & Exterior Architectural Tour'
  },
  {
    name: 'Modern Interior & Smart Home Tour',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-living-room-in-a-modern-apartment-42646-large.mp4',
    title: 'Executive Lounge & Smart Home Interior Walkthrough'
  },
  {
    name: 'Commercial Broadway & Highrise Flyover',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-modern-office-building-seen-from-below-41614-large.mp4',
    title: 'Commercial Highrise & Boulevard Frontage Clip'
  }
];

export const PropertyMediaUploader: React.FC<PropertyMediaUploaderProps> = ({
  images,
  onChangeImages,
  videoUrl = '',
  onChangeVideoUrl,
  videoTitle = '',
  onChangeVideoTitle,
  isSuperAdmin,
  onOpenRoleSwitcher
}) => {
  const [imageTab, setImageTab] = useState<'local' | 'url'>('local');
  const [urlInput, setUrlInput] = useState('');
  const [isProcessingLocal, setIsProcessingLocal] = useState(false);
  const [imageUploadMessage, setImageUploadMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [videoTab, setVideoTab] = useState<'local' | 'url'>('local');
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [isProcessingVideo, setIsProcessingVideo] = useState(false);
  const [videoFileSizeInfo, setVideoFileSizeInfo] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);

  const showTempImageMsg = (msg: string) => {
    setImageUploadMessage(msg);
    setTimeout(() => setImageUploadMessage(null), 3500);
  };

  // Compress and convert local image files to DataURL
  const processImageFileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1400;
          const MAX_HEIGHT = 1000;
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.84);
            resolve(compressedDataUrl);
          } else {
            resolve(event.target?.result as string);
          }
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = event.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleLocalImageFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setIsProcessingLocal(true);

    try {
      const validFiles = Array.from(fileList).filter(f => f.type.startsWith('image/'));
      if (validFiles.length === 0) {
        setIsProcessingLocal(false);
        return;
      }

      const dataUrls = await Promise.all(validFiles.map(file => processImageFileToDataUrl(file)));
      const updated = [...images, ...dataUrls];
      onChangeImages(updated);
      showTempImageMsg(`Added ${validFiles.length} photo${validFiles.length > 1 ? 's' : ''} from local device!`);
    } catch (err) {
      console.error('Error reading local images:', err);
    } finally {
      setIsProcessingLocal(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleLocalImageFiles(e.dataTransfer.files);
    }
  };

  const handleAddImageUrl = (directUrl?: string) => {
    const target = (directUrl ?? urlInput).trim();
    if (!target) return;

    const newUrls = target
      .split(',')
      .map(u => u.trim())
      .filter(u => u.length > 4);

    if (newUrls.length === 0) return;

    onChangeImages([...images, ...newUrls]);
    if (!directUrl) setUrlInput('');
    showTempImageMsg(`Added ${newUrls.length} image URL${newUrls.length > 1 ? 's' : ''} to gallery!`);
  };

  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_, idx) => idx !== index);
    onChangeImages(updated);
  };

  const handleSetCoverImage = (index: number) => {
    if (index === 0) return;
    const selected = images[index];
    const remaining = images.filter((_, idx) => idx !== index);
    onChangeImages([selected, ...remaining]);
    showTempImageMsg('Updated primary cover image (#1)!');
  };

  const handleMoveImageOrder = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const copy = [...images];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    onChangeImages(copy);
  };

  const handleClearAllImages = () => {
    if (window.confirm('Remove all attached images from this property?')) {
      onChangeImages([]);
    }
  };

  const handleLocalVideoFile = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0 || !isSuperAdmin) return;
    const file = fileList[0];

    if (!file.type.startsWith('video/')) {
      setVideoError('Please upload a valid movie clip file (MP4, WebM, MOV).');
      return;
    }

    const sizeInMB = file.size / (1024 * 1024);
    const sizeText = `${sizeInMB.toFixed(1)} MB`;

    if (sizeInMB > 100) {
      setVideoError(`File size (${sizeText}) is too large. Please select a clip under 50MB.`);
      return;
    }

    setVideoError(null);
    setIsProcessingVideo(true);
    setVideoFileSizeInfo(`${sizeText} • ${file.type || 'video/mp4'}`);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onChangeVideoUrl(e.target.result as string);
        if (!videoTitle) {
          const defaultName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
          onChangeVideoTitle(`Virtual Tour: ${defaultName}`);
        }
      }
      setIsProcessingVideo(false);
    };
    reader.onerror = () => {
      setVideoError('Failed to read video file. Try another clip or link by URL.');
      setIsProcessingVideo(false);
    };
    reader.readAsDataURL(file);
  };

  const handleApplyVideoUrl = (urlToApply?: string, sampleTitle?: string) => {
    const targetUrl = (urlToApply || videoUrlInput).trim();
    if (!targetUrl) return;

    onChangeVideoUrl(targetUrl);
    setVideoFileSizeInfo('Cloud Video Stream');
    setVideoError(null);
    if (sampleTitle) {
      onChangeVideoTitle(sampleTitle);
    } else if (!videoTitle) {
      onChangeVideoTitle('3D Virtual Tour Walkthrough');
    }
    if (!urlToApply) setVideoUrlInput('');
  };

  const handleRemoveVideo = () => {
    onChangeVideoUrl('');
    onChangeVideoTitle('');
    setVideoFileSizeInfo(null);
    setVideoError(null);
    if (videoFileInputRef.current) {
      videoFileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6" id="property-media-uploader">
      
      {/* =====================================================================
          1. MULTIPLE PROPERTY PHOTOS & SEQUENCE MANAGER
         ===================================================================== */}
      <div className="bg-white rounded-xl border border-slate-200 p-4.5 space-y-4 shadow-2xs">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <FileImage className="w-4 h-4 text-blue-600" />
              <span>4. Property Gallery Photos &amp; Sequence Manager</span>
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Upload multiple images, add by URL, reorder photo sequence (<strong>← / →</strong>), set cover, or delete individual images.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>{images.length} {images.length === 1 ? 'Photo' : 'Photos'} Attached</span>
            </span>

            {images.length > 0 && (
              <button
                type="button"
                onClick={handleClearAllImages}
                className="px-2 py-1 text-[11px] font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                title="Remove all photos"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Source Mode Switcher */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setImageTab('local')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border cursor-pointer ${
              imageTab === 'local'
                ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload from Local System</span>
          </button>

          <button
            type="button"
            onClick={() => setImageTab('url')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border cursor-pointer ${
              imageTab === 'url'
                ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Add via Image URL / Presets</span>
          </button>
        </div>

        {/* TAB 1: LOCAL SYSTEM UPLOAD */}
        {imageTab === 'local' && (
          <div className="space-y-3">
            <div
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onDrop={handleImageDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/40 hover:bg-blue-50/70 rounded-xl p-5 text-center cursor-pointer transition-all space-y-2 group"
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleLocalImageFiles(e.target.files)}
              />

              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <UploadCloud className="w-5 h-5" />
              </div>

              <div>
                <div className="text-xs font-bold text-slate-800">
                  {isProcessingLocal ? 'Processing Local Files...' : 'Click to Browse or Drag & Drop Multiple Images'}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Select multiple JPG, PNG, WEBP files from your computer or phone • Auto-watermarked
                </div>
              </div>

              <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-700 bg-blue-100/80 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3 h-3" />
                <span>Instant Multi-Photo Client Encoder</span>
              </div>
            </div>

            {imageUploadMessage && (
              <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{imageUploadMessage}</span>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: URL INPUT & PRESETS */}
        {imageTab === 'url' && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Paste image link: https://... (or comma separated)"
                className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddImageUrl();
                  }
                }}
              />
              <button
                type="button"
                onClick={() => handleAddImageUrl()}
                className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Image</span>
              </button>
            </div>

            {/* Quick Sample Presets */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] font-semibold text-slate-500">
                Quick-Add Contemporary Capsule, UPVC &amp; Property Presets:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_IMAGES.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddImageUrl(sample.url)}
                    className="px-2.5 py-1 rounded-md text-[10.5px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200/80 flex items-center gap-1 cursor-pointer"
                  >
                    <span>+</span>
                    <span>{sample.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {imageUploadMessage && (
              <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{imageUploadMessage}</span>
              </div>
            )}
          </div>
        )}

        {/* ATTACHED IMAGES GALLERY GRID WITH ALWAYS-VISIBLE REORDER & DELETE CONTROLS */}
        {images.length > 0 ? (
          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <div className="text-[11px] font-semibold text-slate-600 flex flex-wrap items-center justify-between gap-2">
              <span>Attached Media Gallery ({images.length}) — Use <strong>← / →</strong> to change sequence or <strong>Set Cover</strong></span>
              <span className="text-slate-400">Photo #1 is the main listing cover</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {images.map((img, idx) => {
                const isCover = idx === 0;
                return (
                  <div
                    key={`${img}-${idx}`}
                    className={`group rounded-xl overflow-hidden border-2 bg-white flex flex-col justify-between transition-all ${
                      isCover ? 'border-blue-600 shadow-md ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                      <img
                        src={img}
                        alt={`Property Photo ${idx + 1}`}
                        onError={e => {
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                        }}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute bottom-1 right-1 pointer-events-none scale-75 origin-bottom-right opacity-90">
                        <WatermarkBadge position="bottom-right" size="sm" showVerifiedText={false} />
                      </div>

                      {isCover ? (
                        <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[9.5px] font-bold uppercase tracking-wider bg-blue-600 text-white shadow-xs flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-white" />
                          <span>#1 Cover</span>
                        </div>
                      ) : (
                        <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/70 text-white backdrop-blur-xs">
                          #{idx + 1}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(idx);
                        }}
                        className="absolute top-1.5 right-1.5 p-1 rounded bg-red-600/90 hover:bg-red-600 text-white transition-colors shadow-xs cursor-pointer"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Always-Visible Sequence & Cover Bar */}
                    <div className="p-1.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveImageOrder(idx, 'left')}
                          className="p-1 rounded bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                          title="Move photo earlier"
                        >
                          <ArrowLeft className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === images.length - 1}
                          onClick={() => handleMoveImageOrder(idx, 'right')}
                          className="p-1 rounded bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                          title="Move photo later"
                        >
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {!isCover ? (
                        <button
                          type="button"
                          onClick={() => handleSetCoverImage(idx)}
                          className="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-[9.5px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Star className="w-2.5 h-2.5" />
                          <span>Set Cover</span>
                        </button>
                      ) : (
                        <span className="text-[9.5px] font-bold text-blue-600 px-1">
                          Main Cover
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
            No property images attached yet. Select local files or enter URLs above to display in the listing.
          </div>
        )}
      </div>

      {/* =====================================================================
          2. VIRTUAL TOUR SHORT MOVIE CLIP (SUPER ADMIN PRIVILEGE)
         ===================================================================== */}
      <div className={`rounded-xl border p-4.5 space-y-4 transition-all ${
        isSuperAdmin 
          ? 'bg-gradient-to-br from-amber-500/5 via-slate-900/[0.02] to-blue-500/5 border-amber-300/80 shadow-2xs' 
          : 'bg-slate-50/80 border-slate-200'
      }`}>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-amber-600" />
                <span>5. Virtual Tour Short Movie Clip</span>
              </h4>

              {isSuperAdmin ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>Super Admin Privilege</span>
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-500" />
                  <span>Super Admin Only</span>
                </span>
              )}
            </div>

            <p className="text-[11px] text-slate-600">
              Attach a short movie clip (drone flyover, video walkthrough, or 3D render) for property virtual tours.
            </p>
          </div>

          {videoUrl && isSuperAdmin && (
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10.5px] font-semibold border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Movie Clip Active</span>
              </span>
              <button
                type="button"
                onClick={handleRemoveVideo}
                className="px-2 py-1 text-[11px] font-medium text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
              >
                Remove Clip
              </button>
            </div>
          )}
        </div>

        {!isSuperAdmin ? (
          <div className="p-5 rounded-xl bg-white border border-slate-200 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Lock className="w-5 h-5 text-slate-600" />
            </div>
            
            <div className="max-w-md mx-auto space-y-1">
              <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Restricted Super Admin Feature
              </h5>
              <p className="text-xs text-slate-500">
                Only the <strong className="text-slate-700">Super Admin / Platform Manager</strong> has privilege to attach short movie clips to property virtual tours.
              </p>
            </div>

            {onOpenRoleSwitcher && (
              <button
                type="button"
                onClick={onOpenRoleSwitcher}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 transition-colors inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Switch to Super Admin Account</span>
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setVideoTab('local')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border cursor-pointer ${
                  videoTab === 'local'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Upload Local Movie Clip</span>
              </button>

              <button
                type="button"
                onClick={() => setVideoTab('url')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border cursor-pointer ${
                  videoTab === 'url'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Video Clip URL</span>
              </button>
            </div>

            {videoTab === 'local' && (
              <div className="space-y-2">
                <div
                  onClick={() => videoFileInputRef.current?.click()}
                  className="border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/30 hover:bg-amber-50/60 rounded-xl p-4 text-center cursor-pointer transition-all space-y-2 group"
                >
                  <input
                    ref={videoFileInputRef}
                    type="file"
                    accept="video/mp4,video/webm,video/ogg,video/quicktime"
                    className="hidden"
                    onChange={(e) => handleLocalVideoFile(e.target.files)}
                  />

                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Film className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="text-xs font-bold text-slate-800">
                      {isProcessingVideo ? 'Loading Short Video Clip...' : 'Click to Browse Short Movie Clip (MP4 / WebM)'}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Recommended: 15–60 sec walkthrough, max 50MB
                    </div>
                  </div>
                </div>
              </div>
            )}

            {videoTab === 'url' && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={videoUrlInput}
                    onChange={(e) => setVideoUrlInput(e.target.value)}
                    placeholder="https://.../walkthrough.mp4 (direct MP4/WebM URL)"
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleApplyVideoUrl();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleApplyVideoUrl()}
                    className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Apply Video</span>
                  </button>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="text-[11px] font-semibold text-slate-500">
                    Quick Sample Walkthrough Clips:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {SAMPLE_VIDEOS.map((sample, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleApplyVideoUrl(sample.url, sample.title)}
                        className="px-2.5 py-1 rounded-md text-[10.5px] font-medium bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-900 transition-colors border border-slate-200 flex items-center gap-1.5 shadow-2xs cursor-pointer"
                      >
                        <Play className="w-2.5 h-2.5 text-amber-600 fill-amber-600" />
                        <span>{sample.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {videoError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{videoError}</span>
              </div>
            )}

            {videoUrl && (
              <div className="space-y-1 pt-2 border-t border-slate-200">
                <label className="block text-xs font-semibold text-slate-700">
                  Virtual Tour Movie Clip Title / Caption
                </label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => onChangeVideoTitle(e.target.value)}
                  placeholder="e.g. 5-Marla Luxury House Walkthrough & Rooftop Margalla View"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>
            )}

            {videoUrl ? (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5 text-amber-600" />
                    <span>Live Movie Clip Preview (Ri8Click Watermarked)</span>
                  </span>
                  {videoFileSizeInfo && (
                    <span className="text-slate-400 font-mono text-[10.5px]">
                      {videoFileSizeInfo}
                    </span>
                  )}
                </div>

                <div className="relative rounded-xl overflow-hidden bg-black border border-slate-800 shadow-md aspect-video max-h-72">
                  <video
                    src={videoUrl}
                    controls
                    playsInline
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2 right-2 pointer-events-none opacity-90">
                    <WatermarkBadge position="bottom-right" size="sm" showVerifiedText={true} />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyMediaUploader;

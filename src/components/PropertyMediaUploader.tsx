import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  X,
  Video,
  CheckCircle2,
  AlertCircle,
  Film,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import WatermarkBadge from './WatermarkBadge';

interface PropertyMediaUploaderProps {
  images: string[];
  onChangeImages: (images: string[]) => void;
  videoUrl: string;
  onChangeVideoUrl: (url: string) => void;
  videoTitle?: string;
  onChangeVideoTitle?: (title: string) => void;
  isSuperAdmin: boolean;
  onOpenRoleSwitcher?: () => void;
}

const SAMPLE_IMAGES = [
  {
    label: 'Capsule Forest Pod Q3',
    url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=85'
  },
  {
    label: 'Capsule L-Loft K5',
    url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85'
  },
  {
    label: 'Faisal Hills Villa',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85'
  },
  {
    label: 'Commercial Broadway Plaza',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85'
  },
  {
    label: 'Designer Interior',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
  }
];

const SAMPLE_VIDEOS = [
  {
    label: 'Luxury Villa Drone Tour',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  },
  {
    label: 'Commercial Highrise Walkthrough',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  {
    label: 'Capsule Smart Pod Interior',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
  }
];

function sanitizeMediaUrl(url: string): string {
  const trimmed = (url || '').trim();
  if (/^(javascript|vbscript|data:text\/html):/i.test(trimmed)) {
    return '';
  }
  return trimmed;
}

export const PropertyMediaUploader: React.FC<PropertyMediaUploaderProps> = ({
  images,
  onChangeImages,
  videoUrl,
  onChangeVideoUrl,
  videoTitle = '',
  onChangeVideoTitle,
  isSuperAdmin
}) => {
  const [imageTab, setImageTab] = useState<'local' | 'url'>('local');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [isProcessingImages, setIsProcessingImages] = useState(false);
  const [imageUploadMessage, setImageUploadMessage] = useState<string | null>(null);

  const [videoTab, setVideoTab] = useState<'local' | 'url'>('url');
  const [videoUrlInput, setVideoUrlInput] = useState(videoUrl || '');
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isProcessingVideo, setIsProcessingVideo] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const compressAndConvertImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1400;
          const MAX_HEIGHT = 1000;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.84);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleImageFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setIsProcessingImages(true);
    setImageUploadMessage(null);

    const validFiles: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file.type.startsWith('image/')) {
        validFiles.push(file);
      }
    }

    if (validFiles.length === 0) {
      setIsProcessingImages(false);
      return;
    }

    try {
      const encodedImages = await Promise.all(validFiles.map(f => compressAndConvertImage(f)));
      const updated = [...images, ...encodedImages];
      onChangeImages(updated);
      setImageUploadMessage(`Added ${encodedImages.length} photo(s) to gallery!`);
      setTimeout(() => setImageUploadMessage(null), 3500);
    } catch (err) {
      console.error('Error encoding images:', err);
    } finally {
      setIsProcessingImages(false);
      if (imageInputRef.current) imageInputRef.current.value = '';
    }
  };

  const handleAddImageUrl = () => {
    const raw = imageUrlInput.trim();
    if (!raw) return;
    const newUrls = raw
      .split(',')
      .map(u => sanitizeMediaUrl(u))
      .filter(u => u.length > 0 && !images.includes(u));

    if (newUrls.length > 0) {
      onChangeImages([...images, ...newUrls]);
      setImageUrlInput('');
      setImageUploadMessage(`Added ${newUrls.length} image URL(s) to gallery!`);
      setTimeout(() => setImageUploadMessage(null), 3500);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    onChangeImages(images.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSetCoverImage = (index: number) => {
    if (index <= 0 || index >= images.length) return;
    const chosen = images[index];
    const rest = images.filter((_, idx) => idx !== index);
    onChangeImages([chosen, ...rest]);
    setImageUploadMessage('Updated primary cover image (#1)!');
    setTimeout(() => setImageUploadMessage(null), 3000);
  };

  const handleMoveImageOrder = (index: number, direction: 'left' | 'right') => {
    const targetIdx = direction === 'left' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= images.length) return;
    const copy = [...images];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    onChangeImages(copy);
  };

  const handleLocalVideoFile = (file: File | undefined) => {
    if (!file) return;
    setVideoError(null);

    if (!file.type.startsWith('video/')) {
      setVideoError('Please upload a valid movie clip file (MP4, WebM, MOV).');
      return;
    }

    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > 45) {
      setVideoError(`File size (${sizeInMB.toFixed(1)} MB) is too large. Please select a clip under 45MB or paste a video URL.`);
      return;
    }

    setIsProcessingVideo(true);
    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result as string;
      onChangeVideoUrl(result);
      setVideoUrlInput(result.startsWith('data:') ? 'Local Uploaded Video Clip' : result);
      if (onChangeVideoTitle && !videoTitle) {
        const defaultName = file.name.replace(/\.[^/.]+$/, '');
        onChangeVideoTitle(`Virtual Tour: ${defaultName}`);
      }
      setIsProcessingVideo(false);
    };
    reader.onerror = () => {
      setVideoError('Failed to read video file. Try another clip or link by URL.');
      setIsProcessingVideo(false);
    };
    reader.readAsDataURL(file);
  };

  const handleApplyVideoUrl = (urlToApply?: string) => {
    setVideoError(null);
    const targetUrl = sanitizeMediaUrl(urlToApply !== undefined ? urlToApply : videoUrlInput);
    if (!targetUrl) return;
    onChangeVideoUrl(targetUrl);
    setVideoUrlInput(targetUrl);
    if (onChangeVideoTitle && !videoTitle) {
      onChangeVideoTitle('3D Virtual Tour Walkthrough');
    }
  };

  const handleRemoveVideo = () => {
    onChangeVideoUrl('');
    setVideoUrlInput('');
    setVideoError(null);
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      {/* 1. PROPERTY IMAGE GALLERY & SEQUENCE UPLOADER */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Property Gallery Photos &amp; Sequence ({images.length})
              </h4>
              <p className="text-[11px] text-slate-500">
                Upload from computer or paste image URLs. Photo #1 is the Main Listing Cover.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setImageTab('local')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                imageTab === 'local' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Upload Local Files
            </button>
            <button
              type="button"
              onClick={() => setImageTab('url')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                imageTab === 'url' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Image URL / Presets
            </button>
          </div>
        </div>

        {imageTab === 'local' ? (
          <div
            onDragOver={e => {
              e.preventDefault();
              setIsDraggingImage(true);
            }}
            onDragLeave={() => setIsDraggingImage(false)}
            onDrop={e => {
              e.preventDefault();
              setIsDraggingImage(false);
              handleImageFiles(e.dataTransfer.files);
            }}
            onClick={() => imageInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
              isDraggingImage
                ? 'border-blue-600 bg-blue-50/70'
                : 'border-slate-300 hover:border-blue-500 bg-white'
            }`}
          >
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={e => handleImageFiles(e.target.files)}
              className="hidden"
            />
            <Upload className="w-6 h-6 text-blue-600 mx-auto mb-1.5" />
            <div className="text-xs font-bold text-slate-800">
              {isProcessingImages
                ? 'Processing & Watermarking Photos...'
                : 'Click to Browse or Drag & Drop Multiple Images'}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Supports JPG, PNG, WebP — Automatically watermarked &amp; synced to all users
            </div>
          </div>
        ) : (
          <div className="space-y-2.5 bg-white p-3 rounded-xl border border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={imageUrlInput}
                onChange={e => setImageUrlInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddImageUrl();
                  }
                }}
                placeholder="https://example.com/photo.jpg (comma-separated for multiple)"
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-600"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shrink-0 cursor-pointer"
              >
                + Add Photo
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">
                Quick Samples:
              </span>
              {SAMPLE_IMAGES.map((sample, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (!images.includes(sample.url)) {
                      onChangeImages([...images, sample.url]);
                    }
                  }}
                  className="text-[10px] font-semibold px-2 py-1 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 transition-colors cursor-pointer"
                >
                  + {sample.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {imageUploadMessage && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{imageUploadMessage}</span>
          </div>
        )}

        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {images.map((imgUrl, idx) => (
              <div
                key={`${imgUrl}-${idx}`}
                className={`relative rounded-xl overflow-hidden border-2 bg-slate-900 ${
                  idx === 0 ? 'border-amber-500' : 'border-slate-200'
                }`}
              >
                <div className="h-20 w-full relative">
                  <img src={imgUrl} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                  <span
                    className={`absolute top-1 left-1 text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                      idx === 0 ? 'bg-amber-400 text-slate-950' : 'bg-slate-900/80 text-white'
                    }`}
                  >
                    {idx === 0 ? '#1 COVER' : `#${idx + 1}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 p-1 rounded bg-rose-600 text-white hover:bg-rose-700 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-1 bg-white flex items-center justify-between border-t border-slate-100">
                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveImageOrder(idx, 'left')}
                      className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === images.length - 1}
                      onClick={() => handleMoveImageOrder(idx, 'right')}
                      className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  {idx !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleSetCoverImage(idx)}
                      className="text-[9.5px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-1.5 py-0.5 rounded cursor-pointer"
                    >
                      Set Cover
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. VIRTUAL TOUR SHORT MOVIE CLIP / VIDEO UPLOADER */}
      <div className="p-4 bg-indigo-950/5 rounded-2xl border border-indigo-200/80 space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  Virtual Tour Movie Clip / Video Walkthrough
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px]">
                  {isSuperAdmin ? 'Super Admin Active' : 'Video Enabled'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Upload an MP4/WebM walkthrough clip or paste a direct video / YouTube URL. Plays directly on the listing card &amp; detail view.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setVideoTab('url')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                videoTab === 'url' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Video URL / Presets
            </button>
            <button
              type="button"
              onClick={() => setVideoTab('local')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                videoTab === 'local' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Upload MP4 File
            </button>
          </div>
        </div>

        {videoTab === 'local' ? (
          <div
            onClick={() => videoInputRef.current?.click()}
            className="border-2 border-dashed border-indigo-300 hover:border-indigo-600 bg-white rounded-xl p-4 text-center cursor-pointer transition-all"
          >
            <input
              ref={videoInputRef}
              type="file"
              accept="video/mp4,video/webm,video/ogg,video/quicktime"
              onChange={e => handleLocalVideoFile(e.target.files?.[0])}
              className="hidden"
            />
            <Film className="w-6 h-6 text-indigo-600 mx-auto mb-1" />
            <div className="text-xs font-bold text-slate-800">
              {isProcessingVideo
                ? 'Encoding Video Clip...'
                : 'Click to Upload Short Movie Clip (MP4 / WebM)'}
            </div>
            <div className="text-[10.5px] text-slate-400">
              Recommended 10–60 sec walkthrough clip (up to 45MB)
            </div>
          </div>
        ) : (
          <div className="space-y-2.5 bg-white p-3 rounded-xl border border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={videoUrlInput}
                onChange={e => {
                  const val = sanitizeMediaUrl(e.target.value);
                  setVideoUrlInput(val);
                  onChangeVideoUrl(val);
                  if (onChangeVideoTitle && !videoTitle && val) {
                    onChangeVideoTitle('3D Virtual Tour Walkthrough');
                  }
                }}
                placeholder="https://.../walkthrough.mp4 or YouTube URL"
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-indigo-600"
              />
              {videoUrl && (
                <button
                  type="button"
                  onClick={handleRemoveVideo}
                  className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-lg border border-rose-200 shrink-0 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">
                One-Click Sample Walkthroughs:
              </span>
              {SAMPLE_VIDEOS.map((vid, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyVideoUrl(vid.url)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                    videoUrl === vid.url
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                  }`}
                >
                  ▶ {vid.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {videoError && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-2 rounded-lg border border-rose-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{videoError}</span>
          </div>
        )}

        {onChangeVideoTitle && (
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Video Walkthrough Caption / Title
            </label>
            <input
              type="text"
              value={videoTitle}
              onChange={e => onChangeVideoTitle(e.target.value)}
              placeholder="e.g. Full 360° Interior & Drone Walkthrough"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-indigo-600"
            />
          </div>
        )}

        {videoUrl && (
          <div className="rounded-xl overflow-hidden bg-slate-950 border border-indigo-500/40 relative">
            <div className="px-3 py-1.5 bg-indigo-950 text-indigo-200 text-[11px] font-bold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Live Video Tour Attached ({videoTitle || 'Property Walkthrough'})</span>
              </span>
              <button
                type="button"
                onClick={handleRemoveVideo}
                className="text-rose-300 hover:text-rose-200 text-[10px] font-bold cursor-pointer"
              >
                Remove Video
              </button>
            </div>
            <div className="relative h-44 bg-black flex items-center justify-center">
              {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
                <iframe
                  src={
                    videoUrl.includes('watch?v=')
                      ? videoUrl.replace('watch?v=', 'embed/')
                      : videoUrl.includes('youtu.be/')
                      ? `https://www.youtube.com/embed/${videoUrl.split('youtu.be/')[1]?.split('?')[0]}`
                      : videoUrl
                  }
                  title="Video Preview"
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : (
                <video
                  key={videoUrl}
                  src={videoUrl}
                  controls
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              )}
              <WatermarkBadge position="bottom-right" size="sm" showVerifiedText />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyMediaUploader;

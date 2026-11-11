import React, { useState } from 'react';
import { Play, X, Film, Clock } from 'lucide-react';
import { AdVibeVideoItem } from '../../types';

interface AdvibeVideoPlayerModalProps {
  videos: AdVibeVideoItem[];
  projectTitle: string;
}

const FALLBACK_SAMPLE_VIDEO =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

function resolveVideoStream(video: AdVibeVideoItem): {
  mode: 'youtube' | 'vimeo' | 'native';
  src: string;
} {
  const url = (video.url || '').trim() || FALLBACK_SAMPLE_VIDEO;
  const ytMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    return {
      mode: 'youtube',
      src: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`
    };
  }

  const vimeoMatch = url.match(
    /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/
  );
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      mode: 'vimeo',
      src: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`
    };
  }

  return { mode: 'native', src: url };
}

export const AdvibeVideoPlayerModal: React.FC<AdvibeVideoPlayerModalProps> = ({
  videos,
  projectTitle
}) => {
  const [activeVideo, setActiveVideo] = useState<AdVibeVideoItem | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  const resolvedActive = activeVideo ? resolveVideoStream(activeVideo) : null;

  return (
    <div className="w-full space-y-6">
      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {videos.map(vid => (
          <div
            key={vid.id}
            onClick={() => {
              setVideoFailed(false);
              setActiveVideo(vid);
            }}
            className="group relative rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            {/* Thumbnail Box */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-950">
              <img
                src={
                  vid.thumbnail ||
                  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
                }
                alt={vid.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors" />

              {/* Play Button Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-blue-500 transition-all">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>

              {/* Duration Badge */}
              {vid.duration && (
                <div className="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border border-slate-700">
                  <Clock className="w-3 h-3 text-blue-400" />
                  <span>{vid.duration}</span>
                </div>
              )}

              {/* Category Badge */}
              <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-700">
                {vid.category || 'Walkthrough'}
              </div>
            </div>

            {/* Meta Text */}
            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <h5 className="text-xs font-bold text-white line-clamp-2 leading-snug group-hover:text-blue-400 transition-colors">
                {vid.title}
              </h5>
              {vid.description && (
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1.5">
                  {vid.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {activeVideo && resolvedActive && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="w-full max-w-4xl bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white truncate max-w-md sm:max-w-xl">
                    {activeVideo.title}
                  </h4>
                  <span className="text-[11px] text-blue-400 font-medium">
                    {activeVideo.category} • {projectTitle}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Screen Container */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              {resolvedActive.mode === 'native' ? (
                <video
                  key={videoFailed ? FALLBACK_SAMPLE_VIDEO : resolvedActive.src}
                  src={videoFailed ? FALLBACK_SAMPLE_VIDEO : resolvedActive.src}
                  poster={activeVideo.thumbnail}
                  controls
                  autoPlay
                  playsInline
                  onError={() => setVideoFailed(true)}
                  className="w-full h-full object-contain"
                >
                  Your browser does not support HTML5 video streaming.
                </video>
              ) : (
                <iframe
                  src={resolvedActive.src}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>

            {/* Modal Footer Description */}
            {activeVideo.description && (
              <div className="p-4 bg-slate-900 border-t border-slate-800 text-xs text-slate-300">
                {activeVideo.description}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvibeVideoPlayerModal;

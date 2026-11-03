import React from 'react';
import { X, Calendar, Clock, Eye, User, Share2, Tag, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogDetailModalProps {
  blog: BlogPost | null;
  onClose: () => void;
  onOpenPropertySearch?: (society: string) => void;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({
  blog,
  onClose,
  onOpenPropertySearch
}) => {
  if (!blog) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            {blog.category}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Title & Metadata */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight font-serif">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <img
                  src={blog.authorAvatar}
                  alt={blog.authorName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-slate-900">{blog.authorName}</div>
                  <div className="text-[10px] text-slate-400">{blog.authorRole}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{blog.publishedAt}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{blog.readingTime}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{blog.viewsCount || 0} views</span>
                </span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 shadow-md">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Lead Excerpt */}
          <p className="text-sm font-medium text-slate-700 italic bg-blue-50/50 p-4 rounded-xl border-l-4 border-blue-600">
            {blog.excerpt}
          </p>

          {/* Body Content */}
          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 whitespace-pre-line space-y-4">
            {blog.content}
          </div>

          {/* Tags & Related Society Search */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Related Topics & Locations
              </div>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => onOpenPropertySearch && onOpenPropertySearch(tag)}
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Tag className="w-3 h-3 text-slate-400" />
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default BlogDetailModal;

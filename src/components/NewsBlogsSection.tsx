import React from 'react';
import { Newspaper, Calendar, Clock, Eye, ArrowRight, Settings, Sparkles } from 'lucide-react';
import { BlogPost } from '../types';

interface NewsBlogsSectionProps {
  blogs: BlogPost[];
  onSelectBlog: (blog: BlogPost) => void;
  onOpenAdminBlogManager: () => void;
}

export const NewsBlogsSection: React.FC<NewsBlogsSectionProps> = ({
  blogs,
  onSelectBlog,
  onOpenAdminBlogManager
}) => {
  const publishedBlogs = blogs.filter(b => b.status === 'published');

  if (publishedBlogs.length === 0) return null;

  return (
    <section id="news-blogs-section" className="py-14 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Real Estate Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif">
              Market Trends, Faisal Hills & Taxila Insights
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              Stay ahead with verified analysis on Punjab development, Margalla road corridors, legal NOC guidelines, and UPVC architecture.
            </p>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedBlogs.slice(0, 6).map((blog) => (
            <article
              key={blog.id}
              onClick={() => onSelectBlog(blog)}
              className="group bg-slate-50 hover:bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-lg hover:border-blue-400 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  {blog.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{blog.publishedAt}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{blog.readingTime}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{blog.viewsCount || 0}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={blog.authorAvatar}
                      alt={blog.authorName}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs font-semibold text-slate-700">{blog.authorName}</span>
                  </div>

                  <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NewsBlogsSection;

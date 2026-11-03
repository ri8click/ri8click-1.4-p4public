import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  FileText, 
  Sparkles, 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  Search, 
  X, 
  Save, 
  BarChart2, 
  CheckCircle2, 
  SlidersHorizontal 
} from 'lucide-react';
import { BlogPost } from '../types';

interface AdminBlogManagerProps {
  blogs: BlogPost[];
  onUpdateBlogs: (blogs: BlogPost[]) => void;
  onViewBlog?: (blog: BlogPost) => void;
}

const CATEGORIES: BlogPost['category'][] = [
  'Market Trends',
  'Project Updates',
  'Investment Guides',
  'Construction & UPVC',
  'Modular Housing',
  'Legal & NOC'
];

const PRESET_BLOG_IMAGES = [
  {
    name: 'Faisal Hills Executive Luxury Villa',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'Islamabad Corporate Skyline & Centaurus',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'Multi Gardens B-17 Sector G & Margalla',
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'Curved Space Capsule Pod & Glamping',
    url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'Faisal Town (F-18) Gateway Architecture',
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'Lahore DHA Phase 6 Commercial Plaza',
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85'
  }
];

export const AdminBlogManager: React.FC<AdminBlogManagerProps> = ({
  blogs,
  onUpdateBlogs,
  onViewBlog,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    category: 'Market Trends',
    excerpt: '',
    content: '',
    coverImage: PRESET_BLOG_IMAGES[0].url,
    authorName: 'Malik Zeeshan',
    authorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    authorRole: 'Senior Property Analyst',
    publishedAt: new Date().toISOString().split('T')[0],
    readingTime: '5 min read',
    tags: ['Faisal Hills', 'Taxila', 'Islamabad'],
    viewsCount: 120,
    isFeatured: false,
    status: 'published'
  });

  const [tagInput, setTagInput] = useState<string>('');

  const filteredBlogs = blogs.filter(b => {
    if (selectedCategory !== 'all' && b.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q) || b.tags.some(t => t.toLowerCase().includes(q));
    }
    return true;
  });

  const handleStartCreate = () => {
    setFormData({
      id: `blog-${Date.now()}`,
      title: '',
      slug: '',
      category: 'Market Trends',
      excerpt: '',
      content: '',
      coverImage: PRESET_BLOG_IMAGES[0].url,
      authorName: 'Malik Zeeshan',
      authorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      authorRole: 'Senior Property Analyst',
      publishedAt: new Date().toISOString().split('T')[0],
      readingTime: '5 min read',
      tags: ['Taxila', 'Faisal Hills', 'Islamabad Real Estate'],
      viewsCount: 100,
      isFeatured: false,
      status: 'published'
    });
    setIsCreatingNew(true);
    setEditingBlog(null);
  };

  const handleStartEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({ ...blog });
    setIsCreatingNew(false);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert('Please provide at least a Title and Content');
      return;
    }

    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (isCreatingNew) {
      const newPost: BlogPost = {
        id: `blog-${Date.now()}`,
        title: formData.title || '',
        slug,
        category: (formData.category as BlogPost['category']) || 'Market Trends',
        excerpt: formData.excerpt || formData.title,
        content: formData.content || '',
        coverImage: formData.coverImage || PRESET_BLOG_IMAGES[0].url,
        authorName: formData.authorName || 'Ri8Click Editorial Team',
        authorAvatar: formData.authorAvatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
        authorRole: formData.authorRole || 'Property Advisor',
        publishedAt: formData.publishedAt || new Date().toISOString().split('T')[0],
        readingTime: formData.readingTime || '5 min read',
        tags: formData.tags && formData.tags.length > 0 ? formData.tags : ['Real Estate'],
        viewsCount: formData.viewsCount || 1,
        isFeatured: !!formData.isFeatured,
        status: (formData.status as BlogPost['status']) || 'published'
      };
      onUpdateBlogs([newPost, ...blogs]);
      setIsCreatingNew(false);
    } else if (editingBlog) {
      const updated = blogs.map(b => {
        if (b.id === editingBlog.id) {
          return {
            ...b,
            ...formData,
            slug
          } as BlogPost;
        }
        return b;
      });
      onUpdateBlogs(updated);
      setEditingBlog(null);
    }
  };

  const handleDeleteBlog = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog article?')) {
      onUpdateBlogs(blogs.filter(b => b.id !== id));
      if (editingBlog?.id === id) setEditingBlog(null);
    }
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const current = formData.tags || [];
    setFormData({ ...formData, tags: [...current, tagInput.trim()] });
    setTagInput('');
  };

  const handleRemoveTag = (idx: number) => {
    const current = formData.tags || [];
    setFormData({ ...formData, tags: current.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>News & Real Estate Blogs Management</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, edit, and manage articles, market insights, NOC updates, and views analytics for Islamabad, Lahore, Faisal Hills & B-17.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center gap-2 shadow-2xs shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Blog Editor Modal / Panel */}
      {(isCreatingNew || editingBlog) && (
        <div className="bg-white rounded-xl border-2 border-blue-500/40 p-5 sm:p-6 space-y-5 shadow-lg animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <h4 className="text-sm font-bold text-slate-900">
                {isCreatingNew ? 'Create New Real Estate Article' : `Edit Article: ${editingBlog?.title}`}
              </h4>
            </div>
            <button
              onClick={() => {
                setIsCreatingNew(false);
                setEditingBlog(null);
              }}
              className="p-1 rounded text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSaveForm} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Title */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-semibold text-slate-700">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Faisal Hills Taxila 2026 Price Trends & Development Update"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category & Status */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Category</label>
                <select
                  value={formData.category || 'Market Trends'}
                  onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Publication Status</label>
                <select
                  value={formData.status || 'published'}
                  onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="published">Published (Visible to Public)</option>
                  <option value="draft">Draft (Admin Only)</option>
                </select>
              </div>

              {/* Author Info */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Author Name</label>
                <input
                  type="text"
                  value={formData.authorName || ''}
                  onChange={e => setFormData({ ...formData, authorName: e.target.value })}
                  placeholder="e.g. Malik Zeeshan"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Author Designation / Role</label>
                <input
                  type="text"
                  value={formData.authorRole || ''}
                  onChange={e => setFormData({ ...formData, authorRole: e.target.value })}
                  placeholder="e.g. Senior Property Analyst & Broker"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Date & Views */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Publish Date</label>
                <input
                  type="date"
                  value={formData.publishedAt || ''}
                  onChange={e => setFormData({ ...formData, publishedAt: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Initial View Count</label>
                <input
                  type="number"
                  value={formData.viewsCount || 0}
                  onChange={e => setFormData({ ...formData, viewsCount: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-semibold text-slate-700">Short Summary Excerpt (2-3 sentences)</label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt || ''}
                  onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief synopsis displayed on listing cards..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Cover Image & Presets */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-semibold text-slate-700">Featured High-Resolution Cover Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.coverImage || ''}
                  onChange={e => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />

                <div className="space-y-1 pt-1">
                  <span className="text-[11px] font-medium text-slate-500">
                    Quick-Select Cover Photography:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                    {PRESET_BLOG_IMAGES.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setFormData({ ...formData, coverImage: preset.url })}
                        className={`p-1.5 rounded-lg border text-left transition-all flex flex-col gap-1 ${
                          formData.coverImage === preset.url
                            ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <img 
                          src={preset.url} 
                          alt={preset.name} 
                          className="w-full h-12 object-cover rounded brightness-105 contrast-[1.05]" 
                        />
                        <span className="text-[9.5px] font-medium text-slate-700 truncate">
                          {preset.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Full Content Markdown */}
              <div className="space-y-1 md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">Full Article Content (Markdown / Text) *</label>
                  <span className="text-[10px] text-slate-400">Supports headers (###), lists (-), and bold (**)</span>
                </div>
                <textarea
                  rows={8}
                  required
                  value={formData.content || ''}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write full article content here..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>

              {/* Tags */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-semibold text-slate-700">Article Tags</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    placeholder="e.g. Faisal Hills, DHA Lahore, Investment"
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-white hover:bg-slate-700"
                  >
                    Add Tag
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {formData.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(idx)}
                        className="text-blue-400 hover:text-red-500"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setIsCreatingNew(false);
                  setEditingBlog(null);
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center gap-2 shadow-2xs"
              >
                <Save className="w-4 h-4" />
                <span>{isCreatingNew ? 'Publish Article' : 'Save Article Updates'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search blogs by title or tag..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-hidden"
          >
            <option value="all">All Categories ({blogs.length})</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Blogs Table / List */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-900 text-white text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Article</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Views</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredBlogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-slate-50 transition-colors">
                  {/* Title & Image */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-14 h-10 rounded-md object-cover border border-slate-200 shrink-0 brightness-105 contrast-[1.04]"
                      />
                      <div className="min-w-0 max-w-sm">
                        <h4 className="font-bold text-slate-900 line-clamp-1">
                          {blog.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          {blog.excerpt}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10.5px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 whitespace-nowrap">
                      {blog.category}
                    </span>
                  </td>

                  {/* Author */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="text-slate-900 font-semibold">{blog.authorName}</div>
                    <div className="text-[10px] text-slate-400">{blog.authorRole}</div>
                  </td>

                  {/* Date */}
                  <td className="py-3 px-4 whitespace-nowrap text-[11px] text-slate-500">
                    {blog.publishedAt}
                  </td>

                  {/* Views */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                      <Eye className="w-3 h-3 text-blue-600" />
                      <span>{blog.viewsCount.toLocaleString()}</span>
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      blog.status === 'published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {blog.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      {onViewBlog && (
                        <button
                          onClick={() => onViewBlog(blog)}
                          className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="Preview article"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleStartEdit(blog)}
                        className="p-1.5 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition-colors"
                        title="Edit article"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="p-1.5 rounded bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 transition-colors"
                        title="Delete article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogManager;

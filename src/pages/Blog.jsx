import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/contentData';
import { Clock, ArrowRight, X, User } from 'lucide-react';

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const featuredPost = BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.slice(1);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#DC2F87] block">
          Documentary & Editorial Journal
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[var(--text-primary)] tracking-tight">
          Blog & Stories
        </h1>
        <p className="text-base sm:text-lg text-muted font-light leading-relaxed">
          Authentic stories of lived experience, scientific insights, and guidance for families navigating recovery.
        </p>
      </div>

      {/* FEATURED STORY */}
      <div className="card-doc p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-3">
            <span className="bg-[#781353] dark:bg-[#DC2F87] text-white text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5">
              {featuredPost.category}
            </span>
            <span className="text-xs text-muted flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-primary)] leading-tight">
            {featuredPost.title}
          </h2>

          <p className="text-sm sm:text-base text-muted font-light leading-relaxed">
            {featuredPost.excerpt}
          </p>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#781353] dark:text-[#DC2F87] flex items-center gap-1">
              <User className="w-3.5 h-3.5" /> By {featuredPost.author} • {featuredPost.date}
            </span>

            <button
              onClick={() => setSelectedArticle(featuredPost)}
              className="bg-[#2E031D] dark:bg-[#FDF3F7] text-white dark:text-[#2E031D] px-5 py-2.5 font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              <span>Read Story</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[var(--bg-secondary)] p-8 border border-editorial space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#DC2F87] block">
            Editorial Note
          </span>
          <h3 className="font-serif font-bold text-xl text-[var(--text-primary)]">
            Lived Experience Matters
          </h3>
          <p className="text-xs text-muted leading-relaxed font-light">
            Sharing honest accounts of recovery breaks down social isolation and builds actionable hope for others.
          </p>
        </div>
      </div>

      {/* REGULAR STORIES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {regularPosts.map((post) => (
          <div 
            key={post.id}
            className="card-doc p-8 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="bg-[var(--bg-secondary)] text-[#781353] dark:text-[#DC2F87] font-mono font-bold px-2.5 py-0.5 border border-editorial uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="text-muted font-mono">{post.readTime}</span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-[var(--text-primary)]">
                {post.title}
              </h3>

              <p className="text-xs sm:text-sm text-muted leading-relaxed font-light">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-editorial flex items-center justify-between">
              <span className="text-xs text-muted font-mono">By {post.author}</span>
              <button
                onClick={() => setSelectedArticle(post)}
                className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] hover:underline flex items-center gap-1.5"
              >
                <span>Read Article</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FULL ARTICLE MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] max-w-3xl w-full p-6 sm:p-10 border border-editorial relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 text-[var(--text-primary)] p-2 hover:bg-[var(--bg-secondary)]"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <span className="bg-[#781353] dark:bg-[#DC2F87] text-white text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 inline-block">
                {selectedArticle.category}
              </span>

              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-primary)] leading-tight">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-4 text-xs text-muted font-mono border-y border-editorial py-3">
                <span>By {selectedArticle.author}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <div 
                className="pt-4 text-sm sm:text-base leading-relaxed space-y-4 text-[var(--text-primary)]"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              ></div>
            </div>

            <div className="mt-8 pt-6 border-t border-editorial flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-[#2E031D] dark:bg-[#FDF3F7] text-white dark:text-[#2E031D] px-6 py-2.5 font-bold text-xs uppercase tracking-widest"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

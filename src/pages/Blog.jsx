import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/contentData';
import { Clock, ArrowRight, X, User } from 'lucide-react';

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const featuredPost = BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.slice(1);

  return (
    <div className="pt-28 sm:pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3 sm:space-y-4 pt-4 sm:pt-0">
        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#E03590] block">
          Documentary & Editorial Journal
        </span>
        <h1 className="text-3xl sm:text-6xl font-serif font-bold text-[var(--text-primary)] tracking-tight">
          Blog & Stories
        </h1>
        <p className="text-xs sm:text-lg text-muted font-light leading-relaxed">
          Authentic stories of lived experience, scientific insights, and guidance for families navigating recovery.
        </p>
      </div>

      {/* FEATURED STORY */}
      <div className="card-doc p-5 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center rounded-3xl">
        <div className="lg:col-span-7 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-3">
            <span className="bg-[#781353] dark:bg-[#E03590] text-white text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              {featuredPost.category}
            </span>
            <span className="text-xs text-muted flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-primary)] leading-tight">
            {featuredPost.title}
          </h2>

          <p className="text-xs sm:text-base text-muted font-light leading-relaxed">
            {featuredPost.excerpt}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-semibold text-[#781353] dark:text-[#E03590] flex items-center gap-1">
              <User className="w-3.5 h-3.5" /> By {featuredPost.author} • {featuredPost.date}
            </span>

            <button
              onClick={() => setSelectedArticle(featuredPost)}
              className="bg-[#2E031D] dark:bg-[#FFFFFF] text-white dark:text-[#0A0A0C] px-6 py-3 font-bold text-xs uppercase tracking-widest transition-colors rounded-full flex items-center justify-center gap-2 btn-tap touch-target cursor-pointer w-full sm:w-auto"
            >
              <span>Read Story</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[var(--bg-secondary)] p-5 sm:p-8 border border-editorial rounded-3xl space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#E03590] block">
            Editorial Note
          </span>
          <h3 className="font-serif font-bold text-lg sm:text-xl text-[var(--text-primary)]">
            Lived Experience Matters
          </h3>
          <p className="text-xs text-muted leading-relaxed font-light">
            Sharing honest accounts of recovery breaks down social isolation and builds actionable hope for others.
          </p>
        </div>
      </div>

      {/* REGULAR STORIES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-2">
        {regularPosts.map((post) => (
          <div 
            key={post.id}
            className="card-doc p-5 sm:p-8 flex flex-col justify-between space-y-5 sm:space-y-6 rounded-3xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="bg-[var(--bg-secondary)] text-[#781353] dark:text-[#E03590] font-mono font-bold px-3 py-1 border border-editorial rounded-full uppercase tracking-wider text-[10px]">
                  {post.category}
                </span>
                <span className="text-muted font-mono text-[10px]">{post.readTime}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[var(--text-primary)]">
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
                className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] hover:underline flex items-center gap-1.5 btn-tap touch-target cursor-pointer rounded-full px-4 py-2 bg-[var(--bg-secondary)] border border-editorial"
              >
                <span>Read Article</span> <ArrowRight className="w-4 h-4 text-[#E03590]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FULL ARTICLE MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-fadeIn">
          <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] max-w-3xl w-full p-5 sm:p-10 border border-editorial relative max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl">
            
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 text-[var(--text-primary)] p-2.5 hover:bg-[var(--bg-secondary)] rounded-full border border-editorial touch-target btn-tap cursor-pointer flex items-center justify-center"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <span className="bg-[#781353] dark:bg-[#E03590] text-white text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block">
                {selectedArticle.category}
              </span>

              <h2 className="text-2xl sm:text-5xl font-serif font-bold text-[var(--text-primary)] leading-tight">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-muted font-mono border-y border-editorial py-2.5 flex-wrap">
                <span>By {selectedArticle.author}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <div 
                className="pt-4 text-xs sm:text-base leading-relaxed space-y-4 text-[var(--text-primary)]"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              ></div>
            </div>

            <div className="mt-8 pt-4 border-t border-editorial flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-[#2E031D] dark:bg-[#FFFFFF] text-white dark:text-[#0A0A0C] px-6 py-3 font-bold text-xs uppercase tracking-widest rounded-full btn-tap touch-target cursor-pointer"
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

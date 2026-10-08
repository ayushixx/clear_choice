import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Sparkles, 
  MessageSquareQuote 
} from 'lucide-react';
import { ANONYMOUS_TESTIMONIES } from '../data/contentData';
import TrustBadges from '../components/TrustBadges';
import MagneticButton from '../components/MagneticButton';

export default function Testimonies({ setActivePage }) {
  const [testimonies, setTestimonies] = useState([]);
  const [likedIds, setLikedIds] = useState({});

  // Load initial testimonies
  useEffect(() => {
    setTestimonies(ANONYMOUS_TESTIMONIES);
  }, []);

  // Handle Heart Upvote
  const handleLike = (id) => {
    setLikedIds(prev => {
      const isLiked = !!prev[id];
      const nextState = { ...prev, [id]: !isLiked };
      
      setTestimonies(current => 
        current.map(item => {
          if (item.id === id) {
            return {
              ...item,
              helpfulCount: isLiked ? item.helpfulCount - 1 : item.helpfulCount + 1
            };
          }
          return item;
        })
      );

      return nextState;
    });
  };

  return (
    <div className="pt-28 sm:pt-32 pb-16 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14 relative">
      
      {/* ─── HEADER SECTION ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl space-y-3 pt-2 sm:pt-0"
      >
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[var(--text-primary)] tracking-tight leading-[1.15]">
          Voices of Healing & Courage.
        </h1>
        
        <p className="text-sm sm:text-lg text-muted font-light leading-relaxed max-w-2xl">
          Real, unfiltered recovery experiences shared anonymously by individuals and families.
        </p>

        {/* Action Bar */}
        <div className="pt-3 flex flex-wrap items-center gap-3">
          <button
            onClick={() => { setActivePage('contact-counselor'); window.scrollTo(0,0); }}
            className="px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-[var(--text-primary)] hover:text-[#781353] border border-editorial rounded-full transition-colors cursor-pointer"
          >
            Speak With Counselor
          </button>
        </div>
      </motion.div>

      {/* ─── TESTIMONIES GRID ─── */}
      {testimonies.length === 0 ? (
        <div className="py-16 text-center space-y-3 bg-[var(--bg-secondary)] border border-editorial rounded-3xl">
          <MessageSquareQuote className="w-10 h-10 text-muted mx-auto opacity-50" />
          <h3 className="font-serif font-bold text-lg text-[var(--text-primary)]">No Testimonies Found</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonies.map((item, idx) => {
            const isLiked = !!likedIds[item.id];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="card-doc p-6 rounded-3xl border border-editorial flex flex-col justify-between space-y-5 relative group hover:border-[#781353]/30 hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-3">
                  
                  {/* Metadata Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-editorial pb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#781353] dark:text-[#E03590] bg-[#781353]/10 px-2.5 py-1 rounded-full border border-[#781353]/20">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-muted">{item.stage}</span>
                  </div>

                  {/* Title & Story */}
                  <h3 className="font-serif font-bold text-lg text-[var(--text-primary)] leading-snug group-hover:text-[#781353] dark:group-hover:text-[#E03590] transition-colors">
                    "{item.title}"
                  </h3>
                  
                  <p className="text-xs text-muted font-light leading-relaxed whitespace-pre-line">
                    {item.story}
                  </p>
                </div>

                {/* Key Takeaway & Footer */}
                <div className="space-y-3 pt-3 border-t border-editorial">
                  {item.takeaway && (
                    <div className="p-3 bg-[var(--bg-secondary)] rounded-2xl border border-editorial text-[11px] italic text-[var(--text-primary)]/80 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#781353] dark:text-[#E03590] shrink-0 mt-0.5" />
                      <span>"{item.takeaway}"</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-mono text-[11px] font-bold text-[var(--text-primary)]">
                      {item.alias}
                    </span>

                    {/* Upvote Button */}
                    <button
                      onClick={() => handleLike(item.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                        isLiked
                          ? 'bg-[#781353] text-white shadow-xs'
                          : 'bg-[var(--bg-secondary)] text-muted hover:text-[#781353] border border-editorial'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white text-white' : ''}`} />
                      <span>{item.helpfulCount}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ─── BOTTOM SUPPORT CALLOUT ─── */}
      <section className="bg-[#2E031D] text-white p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#2E031D]">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E03590]">
            YOUR RECOVERY PATHWAY
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold">
            Ready to Begin Your Own Story?
          </h2>
          <p className="text-xs sm:text-sm text-white/80 font-light max-w-xl">
            You don't have to carry the weight alone. Reach out for 1-on-1 counselor guidance or explore verified rehab resources.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <MagneticButton
            onClick={() => { setActivePage('contact-counselor'); window.scrollTo(0,0); }}
            className="bg-white text-[#2E031D] hover:bg-[#FDF3F7] px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-all rounded-full shadow-md cursor-pointer whitespace-nowrap"
          >
            Contact Counselor
          </MagneticButton>

          <button
            onClick={() => { setActivePage('help'); window.scrollTo(0,0); }}
            className="px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white/90 hover:text-white border border-white/20 rounded-full transition-colors cursor-pointer whitespace-nowrap"
          >
            Explore Support Hub
          </button>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <TrustBadges />

    </div>
  );
}

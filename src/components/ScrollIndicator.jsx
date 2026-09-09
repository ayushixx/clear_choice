import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ScrollIndicator({ targetId = 'content-section' }) {
  const handleScroll = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  return (
    <motion.button
      onClick={handleScroll}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors cursor-pointer group btn-tap"
      aria-label="Scroll to content"
    >
      <span className="text-[10px] font-mono uppercase tracking-widest group-hover:tracking-wider transition-all">
        Scroll To Explore
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center bg-black/30 backdrop-blur-xs group-hover:border-white/60"
      >
        <ChevronDown className="w-4 h-4 text-white" />
      </motion.div>
    </motion.button>
  );
}

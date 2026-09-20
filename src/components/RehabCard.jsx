import React from 'react';
import { MapPin, Phone, Globe, Navigation, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RehabCard({ center, isSelected, onSelect, onGetDirections }) {
  const { name, address, city, state, phone, phoneClean, website, badge, description } = center;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(center)}
      className={`card-doc p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 rounded-3xl ${
        isSelected ? 'border-[#E03590] ring-2 ring-[#E03590]/40 shadow-xl' : ''
      }`}
    >
      <div className="space-y-4">
        {/* Badge & City */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#781353] dark:text-[#E03590] bg-[var(--bg-secondary)] px-3 py-1 border border-editorial rounded-full inline-block">
            {badge || `${city}, ${state}`}
          </span>
          <span className="text-xs font-mono text-muted flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#E03590]" />
            {city}
          </span>
        </div>

        {/* Center Name */}
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-[var(--text-primary)] leading-tight">
          {name}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
            {description}
          </p>
        )}

        {/* Address */}
        <div className="pt-3.5 border-t border-editorial space-y-3 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5 text-[var(--text-primary)] font-light">
            <MapPin className="w-4 h-4 text-[#E03590] shrink-0 mt-0.5" />
            <span className="leading-snug">{address}</span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-[#E03590] shrink-0" />
            <a
              href={`tel:${phoneClean || phone.replace(/\s+/g, '')}`}
              onClick={(e) => e.stopPropagation()}
              className="font-serif font-bold text-base text-[#781353] dark:text-[#E03590] hover:underline"
            >
              {phone}
            </a>
          </div>

          {/* Website */}
          {website && (
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-[#E03590] shrink-0" />
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-muted hover:text-[#E03590] truncate underline flex items-center gap-1"
              >
                {website.replace(/^https?:\/\//, '')}
                <ExternalLink className="w-3 h-3 inline" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-5 flex gap-3">
        <a
          href={`tel:${phoneClean || phone.replace(/\s+/g, '')}`}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 border border-editorial bg-[var(--bg-secondary)] text-[var(--text-primary)] py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-widest text-center transition-colors hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center gap-2 touch-target btn-tap"
        >
          <Phone className="w-4 h-4 text-[#E03590]" /> Call
        </a>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onGetDirections(center);
          }}
          className="flex-1 bg-[#2E031D] dark:bg-[#FFFFFF] text-white dark:text-[#0A0A0C] py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-widest text-center transition-colors hover:opacity-90 flex items-center justify-center gap-2 touch-target btn-tap shadow-md"
        >
          <Navigation className="w-4 h-4 text-[#E03590] dark:text-[#781353]" /> Directions
        </button>
      </div>
    </motion.div>
  );
}


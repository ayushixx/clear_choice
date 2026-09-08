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
      className={`card-doc p-5 sm:p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
        isSelected ? 'border-[#781353] dark:border-[#E03590] ring-1 ring-[#781353] dark:ring-[#E03590]' : ''
      }`}
    >
      <div className="space-y-3.5">
        {/* Badge & City */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#781353] dark:text-[#E03590] bg-[var(--bg-secondary)] px-2.5 py-1 border border-editorial inline-block">
            {badge || `${city}, ${state}`}
          </span>
          <span className="text-xs font-mono text-muted flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#781353] dark:text-[#E03590]" />
            {city}
          </span>
        </div>

        {/* Center Name */}
        <h3 className="font-serif font-bold text-lg sm:text-xl text-[var(--text-primary)] leading-tight">
          {name}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-xs text-muted font-light leading-relaxed">
            {description}
          </p>
        )}

        {/* Address */}
        <div className="pt-3 border-t border-editorial space-y-2.5 text-xs">
          <div className="flex items-start gap-2 text-[var(--text-primary)] font-light">
            <MapPin className="w-3.5 h-3.5 text-[#781353] dark:text-[#E03590] shrink-0 mt-0.5" />
            <span className="leading-snug">{address}</span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#781353] dark:text-[#E03590] shrink-0" />
            <a
              href={`tel:${phoneClean || phone.replace(/\s+/g, '')}`}
              onClick={(e) => e.stopPropagation()}
              className="font-serif font-bold text-sm text-[#781353] dark:text-[#E03590] hover:underline"
            >
              {phone}
            </a>
          </div>

          {/* Website */}
          {website && (
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[#781353] dark:text-[#E03590] shrink-0" />
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-muted hover:text-[#781353] dark:hover:text-[#E03590] truncate underline flex items-center gap-1"
              >
                {website.replace(/^https?:\/\//, '')}
                <ExternalLink className="w-3 h-3 inline" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 flex gap-2.5">
        <a
          href={`tel:${phoneClean || phone.replace(/\s+/g, '')}`}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 border border-editorial bg-[var(--bg-secondary)] text-[var(--text-primary)] py-3 px-3 font-bold text-xs uppercase tracking-widest text-center transition-colors hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center gap-1.5 touch-target btn-tap"
        >
          <Phone className="w-3.5 h-3.5" /> Call
        </a>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onGetDirections(center);
          }}
          className="flex-1 bg-[#2E031D] dark:bg-[#FFFFFF] text-white dark:text-[#0A0A0C] py-3 px-3 font-bold text-xs uppercase tracking-widest text-center transition-colors hover:opacity-90 flex items-center justify-center gap-1.5 touch-target btn-tap"
        >
          <Navigation className="w-3.5 h-3.5" /> Directions
        </button>
      </div>
    </motion.div>
  );
}


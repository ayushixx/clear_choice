import React from 'react';
import { MapPin, Phone, Globe, Navigation, ExternalLink } from 'lucide-react';

export default function RehabCard({ center, isSelected, onSelect, onGetDirections }) {
  const { name, address, city, state, phone, phoneClean, website, badge, description } = center;

  return (
    <div
      onClick={() => onSelect(center)}
      className={`card-doc p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
        isSelected ? 'border-[#781353] dark:border-[#DC2F87] ring-1 ring-[#781353] dark:ring-[#DC2F87]' : ''
      }`}
    >
      <div className="space-y-3">
        {/* Badge & City */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#781353] dark:text-[#DC2F87] bg-[var(--bg-secondary)] px-2 py-0.5 border border-editorial inline-block">
            {badge || `${city}, ${state}`}
          </span>
          <span className="text-xs font-mono text-muted flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#781353] dark:text-[#DC2F87]" />
            {city}
          </span>
        </div>

        {/* Center Name */}
        <h3 className="font-serif font-bold text-xl text-[var(--text-primary)] leading-tight">
          {name}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-xs text-muted font-light leading-relaxed">
            {description}
          </p>
        )}

        {/* Address */}
        <div className="pt-2 border-t border-editorial space-y-2 text-xs">
          <div className="flex items-start gap-2 text-[var(--text-primary)] font-light">
            <MapPin className="w-3.5 h-3.5 text-[#781353] dark:text-[#DC2F87] shrink-0 mt-0.5" />
            <span className="leading-snug">{address}</span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#781353] dark:text-[#DC2F87] shrink-0" />
            <a
              href={`tel:${phoneClean || phone.replace(/\s+/g, '')}`}
              onClick={(e) => e.stopPropagation()}
              className="font-serif font-bold text-sm text-[#781353] dark:text-[#DC2F87] hover:underline"
            >
              {phone}
            </a>
          </div>

          {/* Website */}
          {website && (
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[#781353] dark:text-[#DC2F87] shrink-0" />
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-muted hover:text-[#781353] dark:hover:text-[#DC2F87] truncate underline flex items-center gap-1"
              >
                {website.replace(/^https?:\/\//, '')}
                <ExternalLink className="w-3 h-3 inline" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 flex gap-2">
        <a
          href={`tel:${phoneClean || phone.replace(/\s+/g, '')}`}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 border border-editorial bg-[var(--bg-secondary)] text-[var(--text-primary)] py-2.5 px-3 font-bold text-xs uppercase tracking-widest text-center transition-colors hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3 h-3" /> Call
        </a>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onGetDirections(center);
          }}
          className="flex-1 bg-[#2E031D] dark:bg-[#FDF3F7] text-white dark:text-[#2E031D] py-2.5 px-3 font-bold text-xs uppercase tracking-widest text-center transition-colors hover:opacity-90 flex items-center justify-center gap-1.5"
        >
          <Navigation className="w-3 h-3" /> Directions
        </button>
      </div>
    </div>
  );
}

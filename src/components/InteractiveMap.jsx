import React, { useRef } from 'react';
import { MapPin, Phone, ExternalLink, ShieldCheck } from 'lucide-react';


export default function InteractiveMap({ selectedCenter, allCenters, onSelectCenter }) {
  const mapRef = useRef(null);

  // Default center if none selected (e.g. NIMHANS Bengaluru or center of India)
  const activeCenter = selectedCenter || allCenters[0];

  // Dynamic Google Maps embed query based on active center or all centers search query
  const mapEmbedUrl = activeCenter
    ? `https://maps.google.com/maps?q=${encodeURIComponent(activeCenter.name + ' ' + activeCenter.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`
    : `https://maps.google.com/maps?q=${encodeURIComponent('Rehabilitation Centers India')}&t=&z=5&ie=UTF8&iwloc=&output=embed`;

  return (
    <section
      id="interactive-map-section"
      ref={mapRef}
      className="space-y-6 scroll-mt-24 transition-all duration-500"
    >
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-editorial pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#DC2F87] block">
            Interactive Support Map
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
            Find Support Near You
          </h2>
        </div>
        <div className="text-xs font-mono text-muted flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#781353] dark:text-[#DC2F87]" />
          <span>Real-time Facility Locator</span>
        </div>
      </div>

      {/* Selected Center Info Banner (if highlighted from card) */}
      {activeCenter && (
        <div className="bg-[var(--bg-secondary)] border border-editorial p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold bg-[#781353] text-white dark:bg-[#DC2F87] px-2 py-0.5">
                Active Location Selected
              </span>
              <span className="text-xs font-mono text-muted">{activeCenter.city}, {activeCenter.state}</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-[var(--text-primary)]">
              {activeCenter.name}
            </h3>
            <p className="text-xs text-muted flex items-center gap-1 font-light">
              <MapPin className="w-3.5 h-3.5 text-[#781353] dark:text-[#DC2F87] shrink-0" />
              {activeCenter.address}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${activeCenter.phoneClean || activeCenter.phone.replace(/\s+/g, '')}`}
              className="border border-editorial bg-[var(--bg-card)] text-[var(--text-primary)] px-3 py-2 text-xs font-mono font-bold flex items-center gap-1 hover:border-[#781353]"
            >
              <Phone className="w-3 h-3 text-[#781353] dark:text-[#DC2F87]" /> Call {activeCenter.phone}
            </a>

            <a
              href={activeCenter.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2E031D] dark:bg-[#FDF3F7] text-white dark:text-[#2E031D] px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              Open in Google Maps <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="relative w-full h-[450px] sm:h-[550px] rounded-xl overflow-hidden border border-editorial shadow-lg bg-[var(--bg-card)] transition-colors">
        
        {/*
          ================================================================
          <!-- Replace with actual Google My Maps embed URL -->
          You can paste your custom Google My Maps iframe embed src below:
          ================================================================
        */}
        <iframe
          title="Google Maps Rehabilitation Center Directory"
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full grayscale-[15%] contrast-[105%] dark:invert dark:hue-rotate-180 dark:brightness-95 transition-all duration-300"
        />

        {/* Quick Location Pills Overlay */}
        <div className="absolute top-4 left-4 right-4 md:right-auto max-w-sm bg-[var(--bg-card)]/90 backdrop-blur-md border border-editorial p-3 shadow-md rounded-lg space-y-2 hidden sm:block">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#781353] dark:text-[#DC2F87] font-bold block">
            Select Location Pin:
          </span>
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
            {allCenters.map((c) => (
              <button
                key={c.id}
                onClick={() => onSelectCenter(c)}
                className={`text-[11px] font-mono px-2 py-1 border transition-colors ${
                  activeCenter?.id === c.id
                    ? 'bg-[#781353] text-white border-[#781353] dark:bg-[#DC2F87] dark:border-[#DC2F87]'
                    : 'bg-[var(--bg-secondary)] border-editorial text-[var(--text-primary)] hover:border-[#781353]'
                }`}
              >
                {c.city}: {c.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

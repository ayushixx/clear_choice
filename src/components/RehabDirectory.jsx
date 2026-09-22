import React, { useState, useMemo } from 'react';
import { REHAB_CENTERS, calculateDistanceKm } from '../data/rehabCenters';
import RehabCard from './RehabCard';
import { Search, MapPin, ListFilter, Navigation, Phone, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RehabDirectory({ selectedCenter, onSelectCenter, onGetDirections }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Extract unique cities & states
  const cities = useMemo(() => {
    const list = Array.from(new Set(REHAB_CENTERS.map((c) => c.city)));
    return ['All', ...list];
  }, []);

  const states = useMemo(() => {
    const list = Array.from(new Set(REHAB_CENTERS.map((c) => c.state)));
    return ['All', ...list];
  }, []);

  // Request browser geolocation to sort centers by distance
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }
    setLocationLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(coords);
        setLocationLoading(false);
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setLocationError('Could not retrieve your location. Showing default order.');
        setLocationLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Filter and sort centers
  const filteredCenters = useMemo(() => {
    let result = REHAB_CENTERS.filter((center) => {
      const matchCity = selectedCity === 'All' || center.city === selectedCity;
      const matchState = selectedState === 'All' || center.state === selectedState;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        center.name.toLowerCase().includes(q) ||
        center.city.toLowerCase().includes(q) ||
        center.state.toLowerCase().includes(q) ||
        center.address.toLowerCase().includes(q);

      return matchCity && matchState && matchSearch;
    });

    if (userLocation) {
      result = result.map((c) => ({
        ...c,
        distanceKm: calculateDistanceKm(
          userLocation.lat,
          userLocation.lng,
          c.coordinates.lat,
          c.coordinates.lng
        )
      })).sort((a, b) => a.distanceKm - b.distanceKm);
    }

    return result;
  }, [searchQuery, selectedCity, selectedState, userLocation]);

  return (
    <section id="rehab-directory" className="space-y-8 scroll-mt-24">
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-editorial pb-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#E03590] block">
            Verified Support Facilities Across India
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
            Recovery & Rehabilitation Centers
          </h2>
          <p className="text-xs sm:text-sm text-muted font-light max-w-2xl">
            Browse accredited addiction recovery clinics and hospital facilities. Use search or location detection to find care near you.
          </p>
        </div>

        {/* View Mode & Location Buttons */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            onClick={handleDetectLocation}
            disabled={locationLoading}
            className="px-4 py-3 text-xs font-mono font-semibold bg-[var(--bg-secondary)] border border-editorial text-[var(--text-primary)] hover:border-[#E03590] transition-all flex items-center gap-2 rounded-full touch-target btn-tap shadow-xs"
            title="Sort by nearest location"
          >
            <Navigation className={`w-4 h-4 ${locationLoading ? 'animate-spin' : 'text-[#E03590]'}`} />
            {locationLoading ? 'Locating...' : userLocation ? 'Near Me (Active)' : 'Find Near Me'}
          </button>

          <div className="flex border border-editorial bg-[var(--bg-secondary)] p-1 rounded-full">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 text-xs font-mono font-bold transition-all rounded-full ${
                viewMode === 'grid'
                  ? 'bg-[#2E031D] text-white dark:bg-[#FFFFFF] dark:text-[#0A0A0C] shadow-sm'
                  : 'text-muted hover:text-[var(--text-primary)]'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 text-xs font-mono font-bold transition-all rounded-full ${
                viewMode === 'list'
                  ? 'bg-[#2E031D] text-white dark:bg-[#FFFFFF] dark:text-[#0A0A0C] shadow-sm'
                  : 'text-muted hover:text-[var(--text-primary)]'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Geolocation feedback */}
      {locationError && (
        <div className="text-xs text-amber-600 dark:text-amber-400 font-mono bg-amber-50 dark:bg-amber-950/40 p-4 border border-amber-200 dark:border-amber-800 rounded-2xl">
          {locationError}
        </div>
      )}

      {/* Search & Multi-Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search input */}
          <div className="relative flex-1 flex items-center">
            <Search className="w-4 h-4 absolute left-4 text-muted pointer-events-none z-10" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by center name, city (e.g. Delhi, Mumbai, Bengaluru)..."
              className="w-full input-icon-left !pl-11 pr-12 py-3.5 bg-[var(--bg-secondary)] border border-editorial text-sm focus:outline-none focus:border-[#E03590] text-[var(--text-primary)] rounded-xl touch-target"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-[var(--text-primary)] p-1 font-mono font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* State Select Filter */}
          <div className="sm:w-52 relative">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full py-3.5 px-4 bg-[var(--bg-secondary)] border border-editorial text-xs focus:outline-none focus:border-[#E03590] text-[var(--text-primary)] font-mono appearance-none rounded-xl touch-target"
            >
              <option value="All">All States</option>
              {states.filter(s => s !== 'All').map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
            <Filter className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          </div>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs scrollbar-none">
          <span className="font-mono text-[10px] uppercase text-muted tracking-wider flex items-center gap-1 shrink-0">
            <ListFilter className="w-3.5 h-3.5" /> City:
          </span>
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 font-mono text-xs whitespace-nowrap transition-all border rounded-full btn-tap ${
                selectedCity === city
                  ? 'bg-[#781353] text-white border-[#781353] dark:bg-[#E03590] dark:border-[#E03590] shadow-sm font-bold'
                  : 'bg-[var(--bg-card)] border-editorial text-[var(--text-primary)] hover:border-[#E03590]'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Location Sort Status */}
      <div className="flex items-center justify-between text-xs text-muted font-mono flex-wrap gap-2">
        <span>Showing {filteredCenters.length} centers {selectedCity !== 'All' ? `in ${selectedCity}` : ''} {selectedState !== 'All' ? `(${selectedState})` : ''}</span>
        {userLocation && <span className="text-[#781353] dark:text-[#E03590]">Sorted by distance to your device</span>}
      </div>

      {/* Directory Grid View */}
      {viewMode === 'grid' && (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredCenters.map((center) => (
              <RehabCard
                key={center.id}
                center={center}
                isSelected={selectedCenter?.id === center.id}
                onSelect={onSelectCenter}
                onGetDirections={onGetDirections}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Directory Bulleted List View */}
      {viewMode === 'list' && (
        <div className="bg-[var(--bg-card)] border border-editorial p-6 sm:p-8 space-y-6 rounded-3xl shadow-sm">
          <div className="border-b border-editorial pb-3 flex justify-between items-center">
            <h3 className="font-serif font-bold text-lg text-[var(--text-primary)]">
              Directory Summary — Local Rehabilitation Centers
            </h3>
            <span className="text-xs font-mono text-muted">{filteredCenters.length} centers listed</span>
          </div>

          <ul className="divide-y divide-editorial text-xs space-y-4">
            {filteredCenters.map((c, index) => (
              <li key={c.id} className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#781353] dark:text-[#E03590] text-xs">
                      #{index + 1}
                    </span>
                    <h4 className="font-serif font-bold text-base text-[var(--text-primary)] inline">
                      {c.name}
                    </h4>
                    {c.distanceKm !== undefined && (
                      <span className="text-[10px] font-mono bg-emerald-950/10 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 border border-emerald-500/20 rounded-md">
                        {c.distanceKm} km away
                      </span>
                    )}
                  </div>
                  <p className="text-muted flex items-start gap-1 font-light">
                    <MapPin className="w-3.5 h-3.5 text-[#781353] dark:text-[#E03590] shrink-0 mt-0.5" />
                    <span>{c.address}</span>
                  </p>
                  <p className="flex items-center gap-2 font-mono text-xs">
                    <Phone className="w-3.5 h-3.5 text-[#781353] dark:text-[#E03590]" />
                    <a href={`tel:${c.phoneClean || c.phone.replace(/\s+/g, '')}`} className="font-bold text-[#781353] dark:text-[#E03590] hover:underline">
                      {c.phone}
                    </a>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onGetDirections(c)}
                    className="bg-[#2E031D] dark:bg-[#FFFFFF] text-white dark:text-[#0A0A0C] px-5 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 touch-target btn-tap rounded-full shadow-sm"
                  >
                    <Navigation className="w-3 h-3 text-[#E03590] dark:text-[#781353]" /> Map Directions
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No results fallback */}
      {filteredCenters.length === 0 && (
        <div className="text-center py-12 border border-dashed border-editorial space-y-3">
          <p className="text-sm text-muted">No rehabilitation centers found matching your query.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCity('All');
              setSelectedState('All');
            }}
            className="text-xs font-bold text-[#781353] dark:text-[#E03590] underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}


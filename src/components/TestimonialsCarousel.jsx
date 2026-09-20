import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TestimonialsCarousel() {
  const testimonials = [
    {
      id: 1,
      quote: "Calling the 24/7 hotline was the scariest decision of my life, but it was the exact turning point I needed. Today I am 2 years sober and back with my family.",
      author: "User",
      location: "Bengaluru, Karnataka",
      category: "Recovery Graduate (2 Years Clean)",
      rating: 5
    },
    {
      id: 2,
      quote: "As a mother watching her son struggle with opioid addiction, the Rehab Directory helped us locate NIMHANS within hours. The guidance we received saved his life.",
      author: "Mother",
      location: "New Delhi, NCR",
      category: "Family Member Support",
      rating: 5
    },
    {
      id: 3,
      quote: "Navigating my brother's recovery journey was daunting, but having verified resources and immediate hotline support brought our family hope and clarity when we needed it most.",
      author: "Brother",
      location: "Mumbai, Maharashtra",
      category: "Family Member Support",
      rating: 5
    },
    {
      id: 4,
      quote: "The Drug Facts Library dismantled the shame and misperceptions I had carried for years. It gave me the courage to seek clinical detox at Muktangan.",
      author: "Anonymous",
      location: "Pune, Maharashtra",
      category: "Recovery Graduate (18 Months Clean)",
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-editorial pb-4">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#781353] dark:text-[#E03590] block">
            Verified Recovery Voices
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
            Stories of Hope & Healing
          </h2>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="w-11 h-11 border border-editorial bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:border-[#E03590] flex items-center justify-center rounded-full btn-tap touch-target shadow-xs"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-[#E03590]" />
          </button>
          <button
            onClick={nextSlide}
            className="w-11 h-11 border border-editorial bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:border-[#E03590] flex items-center justify-center rounded-full btn-tap touch-target shadow-xs"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5 text-[#E03590]" />
          </button>
        </div>
      </div>

      {/* Slide Container */}
      <div className="relative overflow-hidden bg-[var(--bg-card)] border border-editorial p-6 sm:p-10 shadow-md rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Stars & Quote Icon */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-[#E03590] opacity-40" />
            </div>

            {/* Testimonial Quote */}
            <blockquote className="text-base sm:text-2xl font-serif italic font-semibold text-[var(--text-primary)] leading-relaxed">
              "{current.quote}"
            </blockquote>

            {/* Author Footer */}
            <div className="pt-4 border-t border-editorial flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-serif font-bold text-sm sm:text-base text-[var(--text-primary)]">
                  {current.author}
                </h4>
                <p className="text-xs text-muted font-light">
                  {current.location}
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#781353] dark:text-[#E03590] bg-[var(--bg-secondary)] px-3 py-1 border border-editorial rounded-full inline-block self-start sm:self-auto">
                {current.category}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-2 pt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === idx
                  ? 'w-7 bg-[#E03590]'
                  : 'w-2 bg-[var(--border-color)] hover:bg-[#E03590]/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

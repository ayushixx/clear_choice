import React from 'react';
import { Phone, ArrowRight, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TrustBadges from '../components/TrustBadges';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import AmbientParticles from '../components/AmbientParticles';
import ScrollIndicator from '../components/ScrollIndicator';
import MagneticButton from '../components/MagneticButton';

export default function Home({ setActivePage }) {
  const { scrollY } = useScroll();
  const heroImageScale = useTransform(scrollY, [0, 600], [1, 1.15]);
  const heroImageY = useTransform(scrollY, [0, 600], [0, 100]);
  const heroTextY = useTransform(scrollY, [0, 400], [0, -30]);

  return (
    <div className="space-y-20 sm:space-y-28 pb-24">
      
      {/* HERO SECTION — CINEMATIC PARALLAX & AMBIENT MOTION */}
      <section className="relative w-full h-[90vh] min-h-[580px] sm:h-screen flex items-end sm:items-center justify-start overflow-hidden">
        
        {/* Full Viewport Background Image with Parallax & Slow Ambient Zoom */}
        <motion.div 
          style={{ scale: heroImageScale, y: heroImageY }}
          className="absolute inset-0 z-0 origin-center"
        >
          <img 
            src="/assets/hero-bg.jpg" 
            alt="Recovery Documentary Subject" 
            className="w-full h-full object-cover object-[center_20%] sm:object-top filter brightness-[0.82] contrast-[1.05]"
          />
          {/* Layered Cinematic Overlays & Glowing Ambient Gradient */}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(120,19,83,0.35),transparent_60%)]"></div>
        </motion.div>

        {/* Ambient Particles Layer */}
        <AmbientParticles count={28} />

        {/* Content Container — Mobile-First Layout */}
        <motion.div 
          style={{ y: heroTextY }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 sm:pb-0 pt-24 sm:pt-28 space-y-5 sm:space-y-6 text-left text-white"
        >
          
          {/* Category Tag */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold tracking-widest text-white/80 uppercase border-b border-white/30 pb-1"
          >
            <span>RECOVERY</span>
            <span>•</span>
            <span>EDUCATION</span>
            <span>•</span>
            <span>DOCUMENTARY</span>
          </motion.div>

          {/* Strong Editorial Serif Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-6xl md:text-7xl font-serif font-extrabold text-white tracking-tight leading-[1.1] max-w-3xl drop-shadow-md"
          >
            Know the Facts. <br />
            <span className="italic font-normal text-white/90">Choose Your Future.</span>
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-xl text-white/85 font-light leading-relaxed max-w-2xl drop-shadow-sm"
          >
            A recovery journey transformed into a movement for awareness, education, and hope. Dedicated to evidence-based substance education.
          </motion.p>

          {/* Mobile Action CTAs with Magnetic Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 max-w-lg"
          >
            <MagneticButton
              onClick={() => { setActivePage('help'); window.scrollTo(0,0); }}
              className="bg-white text-[#2E031D] hover:bg-[#FDF3F7] px-6 py-3.5 sm:px-8 sm:py-4 text-xs font-extrabold uppercase tracking-widest transition-all shadow-xl touch-target glow-maroon"
            >
              <span className="flex items-center gap-2">
                <span>GET HELP NOW</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </MagneticButton>

            <MagneticButton
              onClick={() => { setActivePage('story'); window.scrollTo(0,0); }}
              className="bg-black/40 hover:bg-black/60 text-white border border-white/40 px-6 py-3.5 sm:px-8 sm:py-4 text-xs font-semibold uppercase tracking-widest backdrop-blur-md transition-all touch-target"
            >
              <span className="flex items-center gap-2">
                <span>Read My Story</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </MagneticButton>
          </motion.div>

          {/* Above-the-fold Lifeline Line */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="pt-2 text-[11px] sm:text-xs font-mono text-white/80 flex items-center gap-2"
          >
            <Phone className="w-3.5 h-3.5 text-[#E03590]" />
            <span>24/7 National Emergency Support: <strong>1800-11-0031</strong></span>
          </motion.div>

        </motion.div>

        {/* Hero Scroll Guidance Indicator */}
        <ScrollIndicator targetId="impact-stats-section" />

      </section>

      {/* TRUST & ACCREDITATION BADGES BAR */}
      <TrustBadges />

      {/* QUICK IMPACT STATS */}
      <section id="impact-stats-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="border-y border-editorial py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-editorial">
            
            {/* Stat 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-2 md:pr-8"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted block">
                01 / Timeline
              </span>
              <div className="text-3xl sm:text-4xl font-serif font-extrabold text-[var(--text-primary)]">
                2017–2023
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-secondary)]">
                Years Lost to Addiction
              </h3>
              <p className="text-xs text-muted font-light leading-relaxed">
                Six years spent in isolation, physical dependency, and spiritual exhaustion before taking the pivotal step toward help.
              </p>
            </motion.div>

            {/* Stat 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2 pt-6 md:pt-0 md:px-8"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted block">
                02 / Rehabilitation
              </span>
              <div className="text-3xl sm:text-4xl font-serif font-extrabold text-[var(--text-primary)]">
                2023–2025
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-secondary)]">
                Years in Rehabilitation
              </h3>
              <p className="text-xs text-muted font-light leading-relaxed">
                Two demanding years dedicated to clinical detox, psychological counseling, and discovering coping strategies.
              </p>
            </motion.div>

            {/* Stat 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-2 pt-6 md:pt-0 md:pl-8"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted block">
                03 / Milestone
              </span>
              <div className="text-3xl sm:text-4xl font-serif font-extrabold text-[#781353] dark:text-[#E03590]">
                2025–Today
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                2 Years Clean
              </h3>
              <p className="text-xs text-muted font-light leading-relaxed">
                Living proof that sustained recovery is possible, transforming personal survival into an educational initiative.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* RECOVERY TESTIMONIALS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TestimonialsCarousel />
      </section>

      {/* JOURNEY TIMELINE STORYTELLING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted block">
            Chronological Progression
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
            The Journey Timeline
          </h2>
          <p className="text-xs sm:text-sm text-muted font-light">
            A three-chapter progression from active dependency to recovery and public advocacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Phase 1 */}
          <div className="card-doc p-6 sm:p-8 space-y-3">
            <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-widest block">
              2017 – 2023 • Phase 01
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[var(--text-primary)]">
              Six Years of Addiction
            </h3>
            <p className="text-xs text-muted font-light leading-relaxed">
              A period marked by dependency, isolation, and struggle before seeking structured help.
            </p>
          </div>

          {/* Phase 2 */}
          <div className="card-doc p-6 sm:p-8 space-y-3">
            <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-widest block">
              2023 – 2025 • Phase 02
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[var(--text-primary)]">
              Rehabilitation
            </h3>
            <p className="text-xs text-muted font-light leading-relaxed">
              The hardest but most transformative chapter. Two years dedicated to detoxification and counseling.
            </p>
          </div>

          {/* Phase 3 */}
          <div className="card-doc p-6 sm:p-8 space-y-3">
            <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-widest block">
              2025 – Today • Phase 03
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#781353] dark:text-[#E03590]">
              2 Years Clean
            </h3>
            <p className="text-xs text-muted font-light leading-relaxed">
              Living proof that recovery is possible. Transforming personal survival into a movement for awareness.
            </p>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted block">
            Publication Pillars
          </span>
          <h2 className="text-3xl font-serif font-bold text-[var(--text-primary)]">
            Explore Clear Choice Resources
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div 
            onClick={() => { setActivePage('facts'); window.scrollTo(0,0); }}
            className="card-doc p-6 sm:p-8 cursor-pointer group space-y-4 btn-tap touch-target"
          >
            <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-widest block">
              01 • Education
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[var(--text-primary)] group-hover:text-[#781353] dark:group-hover:text-[#E03590] transition-colors">
              Drug Facts Library
            </h3>
            <p className="text-xs text-muted leading-relaxed font-light">
              Learn the reality behind 10 major substances, including short-term effects, long-term health risks, and legal penalties.
            </p>
            <div className="pt-2 text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] group-hover:underline flex items-center gap-1">
              <span>View Facts Database</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => { setActivePage('quiz'); window.scrollTo(0,0); }}
            className="card-doc p-6 sm:p-8 cursor-pointer group space-y-4 btn-tap touch-target"
          >
            <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-widest block">
              02 • Reference
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[var(--text-primary)] group-hover:text-[#781353] dark:group-hover:text-[#E03590] transition-colors">
              Myth vs Fact
            </h3>
            <p className="text-xs text-muted leading-relaxed font-light">
              A minimalist editorial breakdown challenging 10 common societal misconceptions about addiction and recovery.
            </p>
            <div className="pt-2 text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] group-hover:underline flex items-center gap-1">
              <span>Read Myth vs Fact Guide</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => { setActivePage('help'); window.scrollTo(0,0); }}
            className="bg-[#2E031D] text-white p-6 sm:p-8 cursor-pointer group space-y-4 hover:bg-[#4E0834] transition-colors btn-tap touch-target"
          >
            <span className="text-[10px] font-mono font-bold text-white/70 uppercase tracking-widest block">
              03 • Emergency
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Get Crisis Support
            </h3>
            <p className="text-xs text-white/80 leading-relaxed font-light">
              Access 24/7 national helplines, request a confidential callback, or view emergency support options.
            </p>
            <div className="pt-2 text-xs font-bold uppercase tracking-widest text-white group-hover:underline flex items-center gap-1">
              <span>Contact Crisis Line</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}


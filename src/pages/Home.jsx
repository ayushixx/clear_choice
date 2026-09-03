import React from 'react';
import { Phone, ArrowRight, ChevronRight, BookOpen, FileText } from 'lucide-react';

export default function Home({ setActivePage }) {
  return (
    <div className="space-y-28 pb-24">
      
      {/* HERO SECTION — FULL VIEWPORT HEIGHT DOCUMENTARY PHOTOGRAPHY */}
      <section className="relative w-full h-screen min-h-[650px] flex items-end sm:items-center justify-start overflow-hidden">
        
        {/* Full Viewport Background Image with Face Visibility Preserved */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/hero-bg.jpg" 
            alt="Recovery Documentary Subject" 
            className="w-full h-full object-cover object-top filter brightness-[0.85] contrast-[1.05]"
          />
          {/* Subtle Dark Cinematic Overlay (45%) */}
          <div className="absolute inset-0 bg-black/45"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        </div>

        {/* Content Container — Mobile-First Above The Fold Layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 sm:pb-0 pt-28 space-y-6 text-left text-white">
          
          {/* Small Publication Category Label */}
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-white/80 uppercase border-b border-white/30 pb-1">
            <span>RECOVERY</span>
            <span>•</span>
            <span>EDUCATION</span>
            <span>•</span>
            <span>DOCUMENTARY</span>
          </div>

          {/* Strong Editorial Serif Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold text-white tracking-tight leading-[1.05] max-w-3xl">
            Know the Facts. <br />
            <span className="italic font-normal text-white/90">Choose Your Future.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-xl text-white/85 font-light leading-relaxed max-w-2xl">
            A recovery journey transformed into a movement for awareness, education, and hope. Dedicated to evidence-based substance education.
          </p>

          {/* Mobile-First Above-the-Fold Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-lg">
            <button
              onClick={() => { setActivePage('help'); window.scrollTo(0,0); }}
              className="bg-white text-[#2E031D] hover:bg-[#FDF3F7] px-8 py-4 text-xs font-extrabold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>GET HELP NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => { setActivePage('story'); window.scrollTo(0,0); }}
              className="bg-black/40 hover:bg-black/60 text-white border border-white/40 px-8 py-4 text-xs font-semibold uppercase tracking-widest backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <span>Read My Story</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Above-the-fold Lifeline Quick Line */}
          <div className="pt-2 text-xs font-mono text-white/80 flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#DC2F87]" />
            <span>24/7 National Emergency Support: <strong>1800-11-0031</strong></span>
          </div>

        </div>

      </section>

      {/* QUICK IMPACT STATS — EDITORIAL MONOCLE GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-y border-editorial py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-editorial">
            
            {/* Stat 1 */}
            <div className="space-y-2 md:pr-8">
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
            </div>

            {/* Stat 2 */}
            <div className="space-y-2 pt-6 md:pt-0 md:px-8">
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
            </div>

            {/* Stat 3 */}
            <div className="space-y-2 pt-6 md:pt-0 md:pl-8">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted block">
                03 / Milestone
              </span>
              <div className="text-3xl sm:text-4xl font-serif font-extrabold text-[#781353] dark:text-[#DC2F87]">
                2025–Today
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                2 Years Clean
              </h3>
              <p className="text-xs text-muted font-light leading-relaxed">
                Living proof that sustained recovery is possible, transforming personal survival into an educational initiative.
              </p>
            </div>

          </div>
        </div>
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
          <div className="card-doc p-8 rounded-none space-y-4">
            <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-widest block">
              2017 – 2023 • Phase 01
            </span>
            <h3 className="text-2xl font-serif font-bold text-[var(--text-primary)]">
              Six Years of Addiction
            </h3>
            <p className="text-xs text-muted font-light leading-relaxed">
              A period marked by dependency, isolation, and struggle before seeking structured help.
            </p>
          </div>

          {/* Phase 2 */}
          <div className="card-doc p-8 rounded-none space-y-4">
            <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-widest block">
              2023 – 2025 • Phase 02
            </span>
            <h3 className="text-2xl font-serif font-bold text-[var(--text-primary)]">
              Rehabilitation
            </h3>
            <p className="text-xs text-muted font-light leading-relaxed">
              The hardest but most transformative chapter. Two years dedicated to detoxification and counseling.
            </p>
          </div>

          {/* Phase 3 */}
          <div className="card-doc p-8 rounded-none space-y-4">
            <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-widest block">
              2025 – Today • Phase 03
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#781353] dark:text-[#DC2F87]">
              2 Years Clean
            </h3>
            <p className="text-xs text-muted font-light leading-relaxed">
              Living proof that recovery is possible. Transforming personal survival into a movement for awareness.
            </p>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION CARDS (3 MINIMAL EDITORIAL CARDS) */}
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
            className="card-doc p-8 rounded-none cursor-pointer group space-y-4"
          >
            <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-widest block">
              01 • Education
            </span>
            <h3 className="text-2xl font-serif font-bold text-[var(--text-primary)] group-hover:text-[#781353] dark:group-hover:text-[#DC2F87] transition-colors">
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
            className="card-doc p-8 rounded-none cursor-pointer group space-y-4"
          >
            <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-widest block">
              02 • Reference
            </span>
            <h3 className="text-2xl font-serif font-bold text-[var(--text-primary)] group-hover:text-[#781353] dark:group-hover:text-[#DC2F87] transition-colors">
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
            className="bg-[#2E031D] text-white p-8 rounded-none cursor-pointer group space-y-4 hover:bg-[#4E0834] transition-colors"
          >
            <span className="text-[10px] font-mono font-bold text-white/70 uppercase tracking-widest block">
              03 • Emergency
            </span>
            <h3 className="text-2xl font-serif font-bold text-white">
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

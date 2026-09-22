import React, { useState } from 'react';
import { 
  CheckCircle2, Circle, Clock, Flame, Calendar, BookOpen, 
  Activity, Smile, HeartPulse, ShieldAlert, ArrowRight, Sparkles, UserCheck, Shield
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecoveryDashboard({ setActivePage }) {
  const [cravingLevel, setCravingLevel] = useState(2);
  const [selectedMood, setSelectedMood] = useState('Hopeful');
  const [sleepHours, setSleepHours] = useState(7.5);
  const [substanceUsed, setSubstanceUsed] = useState(false);
  const [reflections, setReflections] = useState('');
  const [checkInSaved, setCheckInSaved] = useState(false);

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Guided Breathing Exercise (10 mins)', category: 'Mindfulness', completed: true },
    { id: 2, title: 'Daily Gratitude & Trigger Journaling', category: 'Reflection', completed: true },
    { id: 3, title: 'Morning Hydration & 30-min Light Walk', category: 'Physical Health', completed: true },
    { id: 4, title: 'Module 3 Lesson: Identifying Craving Signals', category: 'Education', completed: false },
    { id: 5, title: 'Evening Mood & Craving Check-In', category: 'Self-Monitoring', completed: false }
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleCheckInSubmit = (e) => {
    e.preventDefault();
    setCheckInSaved(true);
    setTimeout(() => setCheckInSaved(false), 4000);
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const phases = [
    { num: 1, title: 'Phase 1: Stabilization', status: 'Completed', weeks: 'Weeks 1–2' },
    { num: 2, title: 'Phase 2: Early Recovery', status: 'In Progress', weeks: 'Weeks 3–4' },
    { num: 3, title: 'Phase 3: Physical & Mental Recovery', status: 'Upcoming', weeks: 'Weeks 5–8' },
    { num: 4, title: 'Phase 4: Relapse Prevention', status: 'Upcoming', weeks: 'Weeks 9–10' },
    { num: 5, title: 'Phase 5: Maintenance', status: 'Upcoming', weeks: 'Weeks 11–12' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* DASHBOARD HEADER */}
      <div className="p-6 sm:p-8 bg-[#2E031D] text-white border border-[#2E031D] rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-[#E03590] rounded-full text-xs font-mono uppercase font-bold tracking-wider">
            <UserCheck className="w-3.5 h-3.5" /> Enrolled Recovery Member
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold tracking-tight text-white">My Recovery Journey</h1>
          <p className="text-sm sm:text-base text-white/90 font-light max-w-2xl">
            Personalized recovery portal guided by <strong>Mehul</strong>. Track daily activities, check-ins, and roadmap milestones.
          </p>
        </div>

        {/* QUICK METRICS PILLS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto">
          <div className="bg-white/10 p-3.5 rounded-2xl text-center border border-white/15">
            <span className="text-[10px] font-mono text-white/80 uppercase block">Active Streak</span>
            <div className="flex items-center justify-center gap-1.5 mt-0.5">
              <Flame className="w-4 h-4 text-[#E03590]" />
              <span className="text-xl font-bold font-serif text-white">14 Days</span>
            </div>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl text-center border border-white/15">
            <span className="text-[10px] font-mono text-white/80 uppercase block">Current Phase</span>
            <span className="text-sm font-bold font-serif text-[#E03590] block mt-1">Phase 2 (Wk 3)</span>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl text-center border border-white/15 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono text-white/80 uppercase block">Next Session</span>
            <span className="text-xs font-bold text-white block mt-1">Thursday, 6:00 PM</span>
          </div>
        </div>
      </div>

      {/* RECOVERY ROADMAP PROGRESS BAR */}
      <div className="card-doc p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[var(--text-primary)]">My Recovery Roadmap</h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light">Visual guide through your 12-week structured recovery phases</p>
          </div>
          <span className="badge-pill bg-[#781353] text-white">{progressPercent}% Daily Completion</span>
        </div>

        {/* Visual Roadmap Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {phases.map((p) => (
            <div 
              key={p.num} 
              className={`p-4 rounded-2xl border ${
                p.status === 'Completed' 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800' 
                  : p.status === 'In Progress' 
                  ? 'bg-[#781353]/10 border-[#781353] text-[#781353]' 
                  : 'bg-[var(--bg-secondary)] border-editorial text-[var(--text-muted)] opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-bold uppercase">{p.weeks}</span>
                {p.status === 'Completed' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-3.5 h-3.5" />}
              </div>
              <h3 className="font-serif text-xs font-bold leading-tight">{p.title}</h3>
              <span className="text-[9px] font-mono uppercase block mt-1 font-semibold">{p.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2-COLUMN LAYOUT: CHECK-IN FORM & DAILY TASKS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* DAILY RECOVERY CHECK-IN (LEFT COLUMN) */}
        <div className="lg:col-span-6 card-doc p-6 sm:p-8 rounded-3xl space-y-5">
          <div className="flex items-center justify-between border-b border-editorial pb-3">
            <h3 className="text-xl font-serif font-bold text-[var(--text-primary)] flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-[#E03590]" /> Daily Recovery Check-In
            </h3>
            <span className="text-xs font-mono text-[var(--text-muted)] font-bold">Today's Log</span>
          </div>

          <form onSubmit={handleCheckInSubmit} className="space-y-4">
            
            {/* Mood Selection */}
            <div>
              <label className="text-xs font-mono font-bold uppercase text-[var(--text-muted)] block mb-2">How are you feeling today?</label>
              <div className="flex flex-wrap gap-2">
                {['Calm', 'Hopeful', 'Anxious', 'Tired', 'Challenged'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedMood(m)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      selectedMood === m 
                        ? 'bg-[#781353] text-white' 
                        : 'bg-[var(--bg-secondary)] border border-editorial text-[var(--text-primary)] hover:border-[#E03590]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Craving Level Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-mono font-bold uppercase text-[var(--text-muted)]">Craving Intensity (0–10)</label>
                <span className="text-xs font-bold text-[#E03590] font-mono">{cravingLevel} / 10</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="10" 
                value={cravingLevel}
                onChange={(e) => setCravingLevel(Number(e.target.value))}
                className="w-full accent-[#E03590] cursor-pointer"
              />
            </div>

            {/* Sleep Hours */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono font-bold uppercase text-[var(--text-muted)] block mb-1">Sleep (Hours)</label>
                <input 
                  type="number" 
                  step="0.5" 
                  value={sleepHours}
                  onChange={(e) => setSleepHours(Number(e.target.value))}
                  className="input-primary text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold uppercase text-[var(--text-muted)] block mb-1">Substance Free Today?</label>
                <div className="flex gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setSubstanceUsed(false)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border ${!substanceUsed ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-[var(--bg-secondary)] border-editorial'}`}
                  >
                    Yes, 100%
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubstanceUsed(true)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border ${substanceUsed ? 'bg-red-800 text-white border-red-800' : 'bg-[var(--bg-secondary)] border-editorial'}`}
                  >
                    Struggling
                  </button>
                </div>
              </div>
            </div>

            {/* Personal Reflections */}
            <div>
              <label className="text-xs font-mono font-bold uppercase text-[var(--text-muted)] block mb-1">Personal Reflection or Triggers</label>
              <textarea 
                rows="3"
                placeholder="Log any cravings, triggers, or personal wins today..."
                value={reflections}
                onChange={(e) => setReflections(e.target.value)}
                className="input-primary text-sm"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#2E031D] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity btn-tap shadow-md"
            >
              {checkInSaved ? 'Check-In Saved Successfully ✓' : 'Save Today\'s Check-In'}
            </button>

          </form>
        </div>

        {/* DAILY ACTIVITIES & TASKS (RIGHT COLUMN) */}
        <div className="lg:col-span-6 card-doc p-6 sm:p-8 rounded-3xl space-y-5">
          <div className="flex items-center justify-between border-b border-editorial pb-3">
            <h3 className="text-xl font-serif font-bold text-[var(--text-primary)] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#781353]" /> Daily Activities & Tasks
            </h3>
            <span className="text-xs font-mono text-[#E03590] font-bold">{completedCount}/{tasks.length} Done</span>
          </div>

          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light">
            Structured daily routines assigned by <strong>Mehul</strong> to support physical and mental recovery.
          </p>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div 
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  task.completed 
                    ? 'bg-emerald-950/10 border-emerald-500/20 text-emerald-900' 
                    : 'bg-[var(--bg-secondary)] border-editorial hover:border-[#E03590]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-[var(--text-muted)] shrink-0" />
                  )}
                  <div>
                    <h4 className={`text-sm font-semibold ${task.completed ? 'line-through opacity-70' : ''}`}>{task.title}</h4>
                    <span className="text-[10px] font-mono uppercase opacity-75">{task.category}</span>
                  </div>
                </div>

                <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full ${task.completed ? 'bg-emerald-800 text-white' : 'bg-[var(--bg-card)] border border-editorial'}`}>
                  {task.completed ? 'Done' : 'Pending'}
                </span>
              </div>
            ))}
          </div>

          {/* SESSIONS WITH MEHUL CALLOUT */}
          <div className="p-4 bg-[#781353]/10 border border-[#781353]/30 rounded-2xl space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-sm text-[#781353]">Weekly Session with Mehul</h4>
              <span className="text-[10px] font-mono font-bold text-[#E03590]">Scheduled</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] font-light">
              Review completed activities, discuss craving triggers, and set goals for Week 4.
            </p>
          </div>

        </div>

      </div>

      {/* CLINICAL SAFETY & DISCLAIMER BAR */}
      <div className="p-5 bg-[var(--bg-secondary)] border border-editorial rounded-3xl flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-[#781353] shrink-0 mt-0.5" />
        <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light">
          <strong>Medical & Clinical Support Note:</strong> Educational and behavioral support programs provided by Mehul do not replace medical detox or clinical diagnosis. Medical treatment and withdrawal management must be handled by qualified healthcare professionals (AIIMS NDDTC standards).
        </p>
      </div>

    </div>
  );
}

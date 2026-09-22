import React from 'react';
import { Award, PhoneCall, Lock, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrustBadges() {
  const trustSignals = [
    {
      icon: Lock,
      title: '100% Confidential',
      subtitle: 'Zero Data Retention Policy'
    },
    {
      icon: Award,
      title: 'NABH Accredited',
      subtitle: 'Verified Hospital Partners'
    },
    {
      icon: PhoneCall,
      title: '24/7 Free Helpline',
      subtitle: 'Immediate Counselor Access'
    },
    {
      icon: Building2,
      title: 'Govt & NGO Support',
      subtitle: 'Affiliated Recovery Network'
    }
  ];

  return (
    <div className="w-full bg-[var(--bg-secondary)] border-y border-editorial py-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {trustSignals.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="flex items-center gap-3 p-3.5 sm:p-4 bg-[var(--bg-card)] border border-editorial rounded-2xl shadow-xs"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#781353]/10 text-[#781353] flex items-center justify-center shrink-0 border border-editorial">
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-serif font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                  {item.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-muted font-light">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

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
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {trustSignals.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="flex items-center gap-3 p-3 sm:p-4 bg-[var(--bg-card)] border border-editorial rounded-none shadow-2xs"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-none bg-[#781353]/10 dark:bg-[#E03590]/15 text-[#781353] dark:text-[#E03590] flex items-center justify-center shrink-0 border border-editorial">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-serif font-bold text-xs sm:text-sm text-[var(--text-primary)] truncate">
                  {item.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-muted font-light truncate">
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

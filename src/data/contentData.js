export const MEHUL_INFO = {
  name: 'Mehul Saini',
  headline: 'Your Recovery Journey, Guided by Mehul',
  introduction: 'Mehul is dedicated to supporting individuals on their journey toward addiction recovery through structured guidance, personalized routines, and ongoing support.',
  verifiedDetails: [
    { label: 'Full Name', value: 'Mehul Saini' },
    { label: 'Focus', value: 'Addiction Recovery Guidance & Behavioral Support' },
    { label: 'Approach', value: 'Structured guidance, personalized routines, daily activities, and ongoing support' },
    { label: 'Personal Message', value: 'Recovery is a personal journey built on daily choices. With structured guidance, healthy routines, and continuous support, lasting change is possible. You do not have to recover alone.' }
  ]
};

export const RECOVERY_PROGRAMS = [
  {
    id: 'opioid-recovery',
    title: 'A. Heroin / Opioid Addiction Recovery',
    category: 'Opioid Dependence',
    duration: '12 Weeks',
    tagline: 'A guided program focused on understanding opioid dependence, managing cravings, rebuilding healthy routines, and developing long-term recovery strategies.',
    phases: [
      {
        phase: 'Phase 1 — Stabilization & Safety',
        weeks: 'Weeks 1–2',
        topics: [
          'Understanding opioid dependence and withdrawal',
          'Identifying triggers and high-risk situations',
          'Sleep, hydration, and daily routine',
          'Overdose awareness and clinical assessment'
        ]
      },
      {
        phase: 'Phase 2 — Early Recovery',
        weeks: 'Weeks 3–4',
        topics: [
          'Craving management and trigger mapping',
          'Building a support network',
          'Healthy sleep and nutrition habits',
          'Family communication and daily structure'
        ]
      },
      {
        phase: 'Phase 3 — Physical & Mental Recovery',
        weeks: 'Weeks 5–8',
        topics: [
          'Exercise, nutrition, and sleep recovery',
          'Stress and emotional management',
          'Rebuilding confidence and relationships',
          'Developing healthy habits and productivity'
        ]
      },
      {
        phase: 'Phase 4 — Relapse Prevention',
        weeks: 'Weeks 9–10',
        topics: [
          'Recognizing warning signs',
          'Managing high-risk situations',
          'Coping strategies and lapse response',
          'Creating a personal recovery plan'
        ]
      },
      {
        phase: 'Phase 5 — Maintenance',
        weeks: 'Weeks 11–12',
        topics: [
          'Long-term recovery goals',
          'Healthy routines and relationships',
          'Continuing professional support',
          '30/60/90-day maintenance plan'
        ]
      }
    ]
  },
  {
    id: 'cannabis-recovery',
    title: 'B. Cannabis / Weed Addiction Recovery',
    category: 'Cannabinoid Behavioral Recovery',
    duration: '4 Weeks',
    tagline: 'A behavioral recovery program focused on understanding usage patterns, managing cravings, and establishing healthier routines.',
    weeks: [
      { week: 'Week 1', focus: 'Awareness, motivation, and trigger identification' },
      { week: 'Week 2', focus: 'Craving management, stress coping, and routine replacement' },
      { week: 'Week 3', focus: 'Sleep, nutrition, emotional regulation, and productivity' },
      { week: 'Week 4', focus: 'Relapse prevention and long-term recovery planning' }
    ]
  },
  {
    id: 'alcohol-recovery',
    title: 'C. Alcohol Addiction Recovery',
    category: 'Alcohol Dependence',
    duration: '12 Weeks',
    tagline: 'A structured program focused on understanding alcohol dependence, improving daily habits, managing triggers, and supporting long-term recovery.',
    weeks: [
      { week: 'Weeks 1–2', focus: 'Assessment, safety, withdrawal awareness, and clinical support' },
      { week: 'Weeks 3–4', focus: 'Understanding drinking patterns, emotional triggers, and motivation' },
      { week: 'Weeks 5–8', focus: 'Health, sleep, nutrition, stress management, and routine building' },
      { week: 'Weeks 9–10', focus: 'Craving management, social triggers, and relapse prevention' },
      { week: 'Weeks 11–12', focus: 'Relationships, personal goals, and long-term recovery planning' }
    ]
  },
  {
    id: 'meth-recovery',
    title: 'D. Ice / Methamphetamine Addiction Recovery',
    category: 'Synthetic Stimulants',
    duration: '12 Weeks',
    tagline: 'A guided recovery program focused on psychological well-being, healthy routines, craving management, and rebuilding everyday life.',
    weeks: [
      { week: 'Weeks 1–2', focus: 'Safety, assessment, sleep, and stabilization' },
      { week: 'Weeks 3–4', focus: 'Understanding triggers, cravings, and daily habits' },
      { week: 'Weeks 5–8', focus: 'Physical health, emotional regulation, and routine rebuilding' },
      { week: 'Weeks 9–10', focus: 'Relapse prevention and managing high-risk situations' },
      { week: 'Weeks 11–12', focus: 'Relationships, education, work, and long-term recovery goals' }
    ]
  },
  {
    id: 'nicotine-recovery',
    title: 'E. Nicotine / Smoking Addiction Recovery',
    category: 'Nicotine Dependence',
    duration: '8 Weeks',
    tagline: 'A guided program designed to help individuals understand nicotine dependence, prepare to quit, manage cravings, and maintain a smoke-free lifestyle.',
    weeks: [
      { week: 'Week 1', focus: 'Understanding nicotine dependence and smoking patterns' },
      { week: 'Week 2', focus: 'Quit preparation and trigger identification' },
      { week: 'Week 3', focus: 'Quit-week support and craving management' },
      { week: 'Week 4', focus: 'Managing social triggers and staying smoke-free' },
      { week: 'Week 5', focus: 'Healthy routines, fitness, and lifestyle improvement' },
      { week: 'Week 6', focus: 'Emotional triggers and habit replacement' },
      { week: 'Week 7', focus: 'Relapse prevention and coping strategies' },
      { week: 'Week 8', focus: 'Long-term maintenance and recovery planning' }
    ]
  },
  {
    id: 'benzo-recovery',
    title: 'F. Benzodiazepine Dependence Recovery',
    category: 'Prescription Sedatives',
    duration: 'Personalized Timeline',
    tagline: 'Support for individuals experiencing dependence on benzodiazepines such as alprazolam, clonazepam, or diazepam.',
    topics: [
      'Understanding dependence and medication use',
      'Identifying triggers and emotional patterns',
      'Daily routine and sleep support',
      'Mood tracking and coping exercises',
      'Weekly guidance and progress monitoring',
      'Clinician-coordinated recovery planning'
    ],
    importantNote: 'Benzodiazepines should not be stopped abruptly or tapered using a generic online schedule. Medication changes require qualified medical supervision.'
  },
  {
    id: 'prescription-recovery',
    title: 'G. Prescription Medication Dependence',
    category: 'Prescription Drugs',
    duration: 'Personalized Timeline',
    tagline: 'Support for individuals experiencing problematic dependence on prescription medications, including prescribed sedatives, opioids, and other medications.',
    topics: [
      'Understanding medication-use patterns',
      'Identifying triggers and challenges',
      'Daily routine and healthy habit building',
      'Emotional support and coping exercises',
      'Progress tracking and recovery activities',
      'Clinician-coordinated recovery planning'
    ]
  },
  {
    id: 'other-recovery',
    title: 'H. Other Substance Recovery',
    category: 'Personalized Specialized Support',
    duration: 'Individualized Pathways',
    tagline: 'Additional personalized support programs offered for specialized dependencies.',
    topics: [
      'Cocaine dependence',
      'Other stimulant dependence',
      'Inhalant dependence',
      'Multiple-substance dependence'
    ],
    note: 'Program duration and recovery pathways should be determined individually, based on clinical assessment and the substances involved. Timelines are proposed educational and behavioral support timelines, not guaranteed recovery periods or medical detox schedules.'
  }
];

export const WEEKLY_SESSIONS_INFO = {
  title: 'Weekly Sessions with Mehul',
  description: 'Every program includes scheduled weekly sessions with Mehul.',
  features: [
    'Weekly recovery progress discussion',
    'Review of completed activities and tasks',
    'Discussion of challenges and triggers',
    'Guidance on maintaining healthy routines',
    'Goal setting for the upcoming week',
    'Personalized feedback and encouragement'
  ],
  note: 'Session format, duration, and availability to be confirmed by Mehul.'
};

export const SUPPORT_GROUP_INFO = {
  title: "You Don't Have to Recover Alone",
  subtitle: 'Recovery Support Group',
  description: 'Users become part of a supportive community of people working toward recovery.',
  features: [
    'Connect with others on a recovery journey',
    'Share experiences and encouragement',
    'Participate in group discussions',
    'Celebrate personal milestones',
    'Access community support and motivation'
  ],
  rules: 'Community participation is optional, private, and moderated, with clear rules against harassment, sharing personal information, or promoting substance use.'
};

export const SAFETY_INFO = {
  title: 'Your Safety Comes First',
  subtitle: 'Safety & Professional Support',
  points: [
    'Initial recovery screening',
    'Referral to qualified medical professionals when needed',
    'Clinician-approved treatment planning',
    'Clear emergency guidance',
    'Privacy and confidentiality information'
  ],
  disclaimer: 'Important: The website provides educational and recovery support. It does not replace medical diagnosis, supervised detoxification, or professional treatment. Medical treatment, medication changes, and withdrawal management must be handled by qualified healthcare professionals (AIIMS NDDTC guidelines).'
};

export const DRUG_FACTS = [
  {
    id: 'opioids',
    name: 'Opioids',
    category: 'Prescription & Synthetic',
    tagline: 'High dependency risk affecting brain receptors',
    shortTermEffects: [
      'Euphoria followed by severe drowsiness and mental fog',
      'Slowed breathing and dangerously decreased heart rate',
      'Nausea, confusion, and impaired physical coordination'
    ],
    longTermEffects: [
      'Severe physical dependence and rapid tolerance buildup',
      'High risk of fatal respiratory depression and overdose',
      'Hormonal imbalance, chronic constipation, and liver stress'
    ],
    legalPenalties: 'Non-prescribed possession or distribution carries severe felony penalties and imprisonment.'
  },
  {
    id: 'cocaine',
    name: 'Cocaine',
    category: 'Stimulants',
    tagline: 'Potent stimulant causing extreme cardiovascular stress',
    shortTermEffects: [
      'Intense energy burst, hyper-alertness, and pupil dilation',
      'Elevated heart rate, spike in blood pressure, and restlessness',
      'Severe paranoia, erratic behavior, and post-high crash'
    ],
    longTermEffects: [
      'Permanent heart muscle damage and heightened stroke risk',
      'Loss of nasal septum tissue (when inhaled) and chronic pulmonary issues',
      'Severe depression, psychosis, and neurological rewiring'
    ],
    legalPenalties: 'Strictly prohibited schedule drug; illegal possession results in criminal charges and mandatory sentencing.'
  },
  {
    id: 'marijuana',
    name: 'Marijuana',
    category: 'Cannabinoids',
    tagline: 'Psychoactive substance altering sensory perception and memory',
    shortTermEffects: [
      'Altered sensory perception, relaxation, or acute anxiety',
      'Impaired short-term memory, reaction time, and coordination',
      'Increased heart rate, bloodshot eyes, and dry mouth'
    ],
    longTermEffects: [
      'Cannabis Use Disorder (CUD) developing in up to 30% of regular users',
      'Cognitive impairment when consumed heavily during brain development',
      'Chronic bronchitis and respiratory irritation from smoking'
    ],
    legalPenalties: 'Regulated under specific state/national laws; unauthorized sales and driving under influence remain illegal.'
  },
  {
    id: 'prescription-pills',
    name: 'Prescription Pills',
    category: 'Sedatives & Analgesics',
    tagline: 'Benzodiazepines & painkillers with high misuse potential',
    shortTermEffects: [
      'Slurred speech, sedation, and loss of physical balance',
      'Decreased anxiety or pain relief accompanied by memory lapses',
      'Dangerous respiratory depression when mixed with alcohol'
    ],
    longTermEffects: [
      'Rapid physiological dependence requiring medical detox',
      'Severe withdrawal seizures if abruptly discontinued',
      'Cognitive decline, mood instability, and organ strain'
    ],
    legalPenalties: 'Possession without a valid medical prescription is illegal and prosecuted under controlled substance laws.'
  },
  {
    id: 'methamphetamine',
    name: 'Methamphetamine',
    category: 'Synthetic Stimulants',
    tagline: 'Extremely addictive stimulant causing rapid physical decline',
    shortTermEffects: [
      'Surge of dopamine, wakefulness, and hyperactive energy',
      'Suppression of appetite, rapid irregular heartbeat, and overheating',
      'Extreme agitation, insomnia, and obsessive behaviors'
    ],
    longTermEffects: [
      'Severe dental damage ("meth mouth") and extreme skin sores',
      'Permanent structural brain damage affecting memory and emotion',
      'Chronic paranoia, hallucinations, and violent outbursts'
    ],
    legalPenalties: 'Illegal manufacturing, sale, or possession carries severe long-term imprisonment and high fines.'
  },
  {
    id: 'alcohol',
    name: 'Alcohol',
    category: 'Central Nervous System Depressants',
    tagline: 'Widely accessible depressant with significant health impacts',
    shortTermEffects: [
      'Lowered inhibitions, slurred speech, and loss of motor control',
      'Impaired judgment, slowed reflexes, and emotional volatility',
      'Risk of alcohol poisoning, blackout, and respiratory failure'
    ],
    longTermEffects: [
      'Liver cirrhosis, cardiovascular disease, and elevated cancer risk',
      'Alcohol Use Disorder (AUD) resulting in severe physical dependence',
      'Neurological damage, memory decline, and relationship strain'
    ],
    legalPenalties: 'Driving under the influence (DUI/DWI) results in license suspension, fines, and jail time.'
  }
];

export const MYTH_VS_FACT = [
  {
    id: 1,
    myth: "Marijuana is completely natural, so it cannot be addictive.",
    fact: "Research shows approximately 30% of cannabis users develop dependence, and regular use can alter dopamine pathways.",
    explanation: "Natural origin does not equate to non-addictive potential. Modern high-potency strains carry significant dependence and psychological risks."
  },
  {
    id: 2,
    myth: "Addiction is simply a lack of willpower or moral strength.",
    fact: "Medical consensus classifies addiction as a chronic brain disease affecting impulse control, decision-making, and neurochemistry.",
    explanation: "Willpower alone cannot reverse neurobiological changes in reward pathways. Medical support and therapy are essential."
  },
  {
    id: 3,
    myth: "Prescription medication is always safe because a doctor prescribes it.",
    fact: "Prescription opioids and sedatives carry severe addiction and overdose risks when taken longer or differently than prescribed.",
    explanation: "Misuse of legitimate pharmaceuticals accounts for a substantial percentage of substance dependency globally."
  },
  {
    id: 4,
    myth: "Overdose only happens to chronic long-term drug users.",
    fact: "Overdose can happen during a person's first exposure, especially with toxic synthetic contamination like Fentanyl.",
    explanation: "Potent synthetic contaminants mean a single recreational dose can depress respiration to fatal levels."
  },
  {
    id: 5,
    myth: "If someone is still working and keeping up appearances, they don't have an addiction.",
    fact: "'High-functioning' addiction is common, but psychological and physical toll continues to compound beneath the surface.",
    explanation: "Maintaining employment or social status often delays essential treatment until a crisis occurs."
  },
  {
    id: 6,
    myth: "Detoxification alone is enough to cure substance dependency.",
    fact: "Detox manages physical withdrawal, but long-term recovery requires behavioral therapy, counseling, and relapse prevention.",
    explanation: "Clearing drugs from the body is step one; healing underlying triggers and rebuilding habits takes sustained support."
  }
];

export const RESOURCE_DIRECTORY = [
  {
    title: 'National Toll-Free Helpline',
    number: '1800-11-0031',
    description: 'Confidential, 24/7 support for individuals, families, and friends navigating substance use or mental health crisis.',
    badge: '24/7 Free & Confidential'
  },
  {
    title: 'Emergency Medical Services',
    number: '112 / 102',
    description: 'Immediate emergency dispatch for medical crises, toxic exposures, or suspected overdose situations.',
    badge: 'Immediate Medical Emergency'
  },
  {
    title: 'Tele-MANAS Support',
    number: '14416',
    description: 'Nationwide mental health advice, tele-counseling, and immediate psychological support services.',
    badge: 'Confidential Assistance'
  },
  {
    title: 'National Youth & Student Support',
    number: '1800-233-3330',
    description: 'Specialized youth assistance offering anonymous guidance on peer pressure, stress, and substance prevention.',
    badge: 'Youth & Peer Support'
  }
];

export const BLOG_POSTS = [
  {
    id: 'understanding-recovery-roadmap',
    title: 'The Science of Recovery: How Structured Routines Rewire the Brain',
    category: 'Neuroscience & Recovery',
    readTime: '6 min read',
    author: 'Mehul',
    date: 'Sep 20, 2026',
    excerpt: 'Explore how neuroplasticity allows the brain to heal from substance dependence through consistent daily routines, mood check-ins, and craving management.',
    content: `
      <p>Addiction recovery is not merely a matter of willpower; it is a profound process of biological and neurological restructuring. When substance use alters the brain's reward pathways and dopamine regulation, daily routines serve as the essential framework for rebuilding stability.</p>
      <h3>Neuroplasticity and Habit Formation</h3>
      <p>The human brain possesses an incredible capacity to adapt and form new neural pathways—a phenomenon known as neuroplasticity. By substituting harmful behaviors with healthy daily activities, such as guided breathing, physical exercise, and regular sleep schedules, we actively train the brain to find calm and reward in natural processes.</p>
      <h3>The Role of Structured Milestones</h3>
      <p>Breaking recovery down into manageable phases—Stabilization, Early Recovery, Physical & Mental Renewal, Relapse Prevention, and Long-Term Maintenance—prevents overwhelm and reinforces self-efficacy. Every completed task and daily check-in is a step toward neurochemical balance.</p>
    `
  },
  {
    id: 'supporting-a-loved-one',
    title: 'Navigating Family Support: How to Help Without Enabling',
    category: 'Family Guidance',
    readTime: '5 min read',
    author: 'Mehul',
    date: 'Sep 15, 2026',
    excerpt: 'Key strategies for families and loved ones to foster open communication, set healthy boundaries, and encourage structured recovery.',
    content: `
      <p>Supporting a family member or loved one through substance addiction can be emotionally complex. Knowing where to draw the line between compassionate assistance and inadvertent enabling is critical for long-term healing.</p>
      <h3>Setting Clear and Compassionate Boundaries</h3>
      <p>Boundaries are not punishments; they are protective guidelines that maintain emotional safety and foster accountability. Clearly communicate what behaviors are acceptable and stick to your boundaries consistently.</p>
      <h3>Encouraging Professional and Structured Pathways</h3>
      <p>Recovery is best guided by structured programs and professional mentorship. Encourage your loved one to participate in weekly sessions, track their daily progress, and connect with peer support groups.</p>
    `
  },
  {
    id: 'managing-cravings-effectively',
    title: 'Craving Management 101: Practical Tools for High-Risk Situations',
    category: 'Coping Strategies',
    readTime: '4 min read',
    author: 'Mehul',
    date: 'Sep 10, 2026',
    excerpt: 'Practical, evidence-based exercises to navigate intense cravings, map personal triggers, and maintain a resilient recovery streak.',
    content: `
      <p>Cravings are temporary physiological and psychological surges. Learning to recognize them as passing waves rather than commands is a cornerstone of relapse prevention.</p>
      <h3>Urge Surfing Techniques</h3>
      <p>Instead of fighting a craving directly, practice 'urge surfing'—observing physical sensations with mindful detachment until the peak passes (usually within 10 to 15 minutes).</p>
      <h3>Trigger Mapping</h3>
      <p>Identify your personal triggers—people, places, stress levels, or times of day—and prepare a replacement activity, such as calling a mentor, performing 4-7-8 breathing, or going for a walk.</p>
    `
  }
];


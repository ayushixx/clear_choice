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
    id: 'lsd',
    name: 'LSD',
    category: 'Hallucinogens',
    tagline: 'Psychedelic compound altering consciousness and perception',
    shortTermEffects: [
      'Vivid visual hallucinations and distorted sense of time/space',
      'Rapid mood swings, pupil dilation, and body temperature spikes',
      'Risk of acute panic, frightening "bad trips," and loss of reality'
    ],
    longTermEffects: [
      'Hallucinogen Persisting Perception Disorder (HPPD / flashbacks)',
      'Potential triggering of underlying psychotic disorders',
      'Psychological distress and emotional disorientation'
    ],
    legalPenalties: 'Classified as an illegal controlled substance subject to arrest and criminal record.'
  },
  {
    id: 'ecstasy',
    name: 'Ecstasy (MDMA)',
    category: 'Empathogens',
    tagline: 'Synthetic drug distorting emotional empathy and perception',
    shortTermEffects: [
      'Enhanced emotional warmth, sensory elevation, and energy',
      'Involuntary jaw clenching, blurred vision, and muscle cramping',
      'Dangerous hyperthermia (overheating) and severe dehydration'
    ],
    longTermEffects: [
      'Serotonin depletion leading to chronic depression and anxiety',
      'Memory impairment and difficulty concentrating',
      'Liver, kidney, and cardiovascular systemic stress'
    ],
    legalPenalties: 'Illegal possession or distribution incurs harsh legal prosecution.'
  },
  {
    id: 'heroin',
    name: 'Heroin',
    category: 'Illicit Opioids',
    tagline: 'Fast-acting illicit opioid with extreme overdose risk',
    shortTermEffects: [
      'Immediate rush of warm euphoria followed by a heavy nod',
      'Severely depressed breathing and constricted pupils',
      'Nausea, severe itching, and clouding of mental function'
    ],
    longTermEffects: [
      'Collapsed veins, skin abscesses, and bloodborne infections',
      'High fatality rate due to unpredictable purity and fentanyl contamination',
      'Profound physical addiction damaging brain white matter'
    ],
    legalPenalties: 'Strictly prohibited illegal narcotic; trafficking yields maximum statutory prison terms.'
  },
  {
    id: 'fentanyl',
    name: 'Fentanyl',
    category: 'Synthetic Opioids',
    tagline: 'Potent synthetic opioid up to 100x stronger than morphine',
    shortTermEffects: [
      'Rapid pain relief and extreme sedation in minuscule doses',
      'Immediate respiratory arrest and loss of consciousness',
      'Rapid onset of cyanotic (blue) lips and unresponsive coma'
    ],
    longTermEffects: [
      'Near-instant physical dependence after brief exposure',
      'Extremely high risk of sudden fatal overdose',
      'Hypoxic brain damage from oxygen deprivation during non-fatal overdose'
    ],
    legalPenalties: 'Unlawful possession or distribution of even microgram quantities incurs severe criminal charges.'
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
  },
  {
    id: 7,
    myth: "Relapse means treatment has completely failed.",
    fact: "Substance use disorder is a chronic condition; relapse is a signal to adjust treatment strategies, not a sign of defeat.",
    explanation: "Many individuals in lifelong recovery experienced one or more relapses before establishing lasting sobriety."
  },
  {
    id: 8,
    myth: "You have to hit 'bottom' before you can get help.",
    fact: "Early intervention significantly increases treatment success rates and prevents permanent physical and mental damage.",
    explanation: "Waiting for rock bottom risks severe injury or death. Seeking assistance at any stage saves lives."
  },
  {
    id: 9,
    myth: "Vaping nicotine or THC is harmless compared to traditional smoking.",
    fact: "Vaping delivers high concentrations of chemicals that damage lung tissue and induce strong chemical dependence.",
    explanation: "E-cigarettes can contain toxic metals, volatile organic compounds, and ultra-concentrated addictive agents."
  },
  {
    id: 10,
    myth: "Asking someone about their substance use will alienate them or push them away.",
    fact: "Compassionate, non-judgmental conversations frequently serve as the crucial catalyst for seeking professional help.",
    explanation: "Expressing genuine care and offering support breaks through isolation and stigma."
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
    id: 'from-darkness-to-purpose',
    title: 'From Darkness to Purpose: A 2-Year Milestone in Recovery',
    author: 'Founding Advocate',
    date: 'August 28, 2026',
    category: 'Featured Story',
    readTime: '6 min read',
    excerpt: 'Six years of dependency felt like a room without windows. Here is how honest self-examination, medical treatment, and daily discipline restored clarity.',
    content: `
      <p class="mb-4 text-lg font-serif italic opacity-90 font-semibold">"Recovery is not a single decision; it is a thousand small daily choices to choose clarity over numbness."</p>
      
      <p class="mb-4 leading-relaxed">When I look back at the years between 2017 and 2023, the strongest emotion I recall is not anger or pain—it was profound isolation. Dependency creeps into your daily routine quietly until every decision is dictated by fear of withdrawal or anxiety about the future.</p>
      
      <h3 class="text-2xl font-serif mt-6 mb-3 font-semibold">The Shift in Perspective</h3>
      <p class="mb-4 leading-relaxed">In 2023, stepping into rehabilitation felt daunting. Society often frames rehab as a punishment or a last resort. In truth, it was the first time in six years I felt truly safe. Medical detoxification cleared the fog, but counseling reconnected me with my humanity.</p>
      
      <h3 class="text-2xl font-serif mt-6 mb-3 font-semibold">Why Clear Choice Exists</h3>
      <p class="mb-4 leading-relaxed">Today, being two years clean is not just a personal victory; it is a responsibility. CLEAR CHOICE was born to replace judgment with facts, isolation with community, and despair with actionable hope. If you are struggling today, know that your story is far from over.</p>
    `
  },
  {
    id: 'the-neuroscience-of-hope',
    title: 'Understanding the Brain in Recovery: Plasticity & Healing',
    author: 'Medical Advisory Panel',
    date: 'August 14, 2026',
    category: 'Awareness Article',
    readTime: '5 min read',
    excerpt: 'How neuroplasticity enables the brain to rebuild reward circuits, regain emotional stability, and heal over time.',
    content: `
      <p class="mb-4 leading-relaxed">One of the most encouraging discoveries of modern neuroscience is neuroplasticity—the brain's ability to reorganize itself by forming new neural connections throughout life.</p>
      
      <p class="mb-4 leading-relaxed">Prolonged drug use alters dopamine signaling, making everyday pleasures feel muted. However, with sustained abstinence and positive behavioral interventions, neurotransmitter receptors recover sensitivity.</p>
      
      <h3 class="text-2xl font-serif mt-6 mb-3 font-semibold">Key Phases of Neurological Healing</h3>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li><strong>First 30 Days:</strong> Stabilization of physical withdrawal and sleeping patterns.</li>
        <li><strong>3 to 6 Months:</strong> Restoration of prefrontal cortex executive functions (decision-making & impulse control).</li>
        <li><strong>1 Year and Beyond:</strong> Normalization of mood regulation and stress resilience.</li>
      </ul>
    `
  },
  {
    id: 'supporting-a-loved-one',
    title: 'How to Support a Loved One Without Enabling Dependency',
    author: 'Family Counselor',
    date: 'July 30, 2026',
    category: 'Community Story',
    readTime: '7 min read',
    excerpt: 'Navigating boundary setting, empathetic communication, and guiding someone towards professional intervention.',
    content: `
      <p class="mb-4 leading-relaxed">Supporting someone through addiction requires a delicate balance between empathy and firm boundaries. Often, well-intentioned family members accidentally cushion consequences in ways that prolong dependency.</p>
      
      <h3 class="text-2xl font-serif mt-6 mb-3 font-semibold">Constructive Steps for Families</h3>
      <ol class="list-decimal pl-6 space-y-2 mb-4">
        <li><strong>Communicate with Clarity:</strong> Express your love and concern without accusatory language.</li>
        <li><strong>Establish Clear Boundaries:</strong> Stop financial support for non-essential expenses that facilitate substance access.</li>
        <li><strong>Offer Help Towards Treatment:</strong> Offer assistance in researching recovery options or attending appointments together.</li>
      </ol>
    `
  }
];

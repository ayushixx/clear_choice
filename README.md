# CLEAR CHOICE 🌿

> **Know the Facts. Choose Your Future.**  
> A modern, compassionate awareness platform for drug education, addiction awareness, recovery stories, and 24/7 crisis intervention.

---

## 🌟 Overview

**Clear Choice** is an interactive, empathy-driven web application created to educate individuals about substance abuse, debunk common myths, connect people with professional treatment resources, and provide immediate crisis intervention tools.

Built with modern web technologies, Clear Choice offers an intuitive, accessible experience for youth, families, counselors, and individuals seeking help.

---

## ✨ Key Features

- **📚 Interactive Drug Education**: Comprehensive guides detailing substances, warning signs, physical/psychological effects, and harm reduction.
- **💡 Myth vs. Fact Debunker**: Interactive cards clarifying common misconceptions surrounding drug usage and addiction.
- **🆘 24/7 Crisis Support & Helpline**: Instant access to emergency hotlines, text lines, and immediate crisis intervention steps.
- **📍 Rehab & Support Locator**: Interactive map and searchable directory of recovery centers with filtering by treatment type and region.
- **📖 Testimonies & Personal Stories**: Real recovery narratives from survivors to inspire hope and reduce stigma.
- **💬 Confidential Counselor Contact**: Direct messaging interface powered by Cloudflare Turnstile and Resend / Google Apps Script backend.
- **📊 Sobriety & Recovery Dashboard**: Personal milestone tracker and recovery progress visualizer.
- **🛡️ Cloudflare Turnstile & Analytics**: Integrated spam protection and Google Analytics 4 tracking.
- **🌓 Dynamic Dark / Light Theme**: Instant theme switching with zero FOUT (Flash of Unstyled Text).

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS Variables
- **Animations & Icons**: [Framer Motion](https://www.framer.com/motion/) + [Lucide React](https://lucide.dev/)
- **UI Components & Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Code Quality**: [Oxlint](https://oxc.rs/)
- **Backend & Services**: Google Apps Script (Spreadsheet Sync), Resend API (Email Notifications), GA4

---

## 📁 Project Structure

```text
clear11/
├── public/                 # Static assets & icons
├── scripts/
│   └── google_apps_script.js # Apps Script code for lead capture & sheet integration
├── src/
│   ├── api/                # Backend API helpers
│   ├── assets/             # Images, graphics, and illustrations
│   ├── components/         # Reusable UI components (Navbar, Footer, LiveChat, Map, etc.)
│   ├── data/               # Static datasets (drugs info, rehab listings, testimonies)
│   ├── pages/              # Application views (Home, DrugFacts, CrisisSupport, AdminPanel, etc.)
│   ├── services/           # Analytics, data storage, and email services
│   ├── App.jsx             # Main routing and layout wrapper
│   └── main.jsx            # React root entry point
├── index.html              # Main HTML document with instant theme script
├── vite.config.js          # Vite configuration
└── package.json            # Project dependencies & scripts
```

---

## 🤝 Contributing & Medical Disclaimer

**Clear Choice** is designed for educational and awareness purposes. If you or someone you know is in immediate danger or experiencing a life-threatening crisis, please contact your local emergency services or reach out to a certified medical professional immediately.

---

Made with ❤️ to foster hope, awareness, and recovery.


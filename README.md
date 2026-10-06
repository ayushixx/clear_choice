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

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher recommended)
- `npm` or `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd clear11
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` or `.env.local` file in the root directory:
   ```env
   VITE_GOOGLE_APPS_SCRIPT_URL=your_google_apps_script_web_app_url
   VITE_RESEND_API_KEY=your_resend_api_key
   VITE_TURNSTILE_SITE_KEY=your_cloudflare_turnstile_site_key
   VITE_GA_MEASUREMENT_ID=your_ga4_measurement_id
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 📜 Available Scripts

- `npm run dev` — Starts the Vite development server with HMR.
- `npm run build` — Builds the application for production deployment.
- `npm run preview` — Locally previews the production build.
- `npm run lint` — Runs `oxlint` for fast code linting.

---

## 🤝 Contributing & Medical Disclaimer

**Clear Choice** is designed for educational and awareness purposes. If you or someone you know is in immediate danger or experiencing a life-threatening crisis, please contact your local emergency services (e.g., 911 in the US/Canada or 112 in Europe) or reach out to a certified medical professional immediately.

---

Made with ❤️ to foster hope, awareness, and recovery.


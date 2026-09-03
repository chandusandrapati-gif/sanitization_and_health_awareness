# Sanitization & Health Awareness Web Platform (CSE Mini-Project)

A complete, modern, responsive educational web application built for students, families, schools, colleges, and public health campaigns. Promotes awareness about personal hygiene, sanitization, safe drinking water, waste segregation, and disease prevention.

Built with **HTML5, CSS3, Vanilla JavaScript, LocalStorage API**, and **Font Awesome Icons**.

---

## 🌟 Key Features & Core Modules

### 1. 8 Complete Pages
- **Home (`index.html`)**:
  - Sticky glassmorphic navbar with prominent CTA: *"Take the Awareness Quiz"*.
  - Redesigned Hero section (*"Clean Habits. Safe Water. Healthier Lives."*) with dual CTAs and CSS 3D floating visuals.
  - **Safe Drinking Water Portal**: Contamination source guide + 5 Treatment Cards (Boiling, Filtration, Chlorination, UV Treatment, Safe Storage).
  - **Water Contamination Pipeline Visualizer**: Interactive step-by-step pipeline (`SOURCE → CONTAMINATION → TREATMENT → SAFE STORAGE → CONSUMPTION`).
  - **"Is Your Water Safe?" Checker**: 4-question educational questionnaire with scoring and safety recommendations.
  - **9-Step Interactive Handwashing Experience**: Guided visual tour with progress bar and completion badge.
  - **Awareness Impact Dashboard**: Animated count-up metrics for project scope.
- **Sanitization Awareness (`sanitization.html`)**:
  - Interactive 9-step handwashing guide, drinking water purification methods, food safety principles, toilet hygiene, and 3-bin waste segregation rules (Green Wet, Blue Dry, Red Hazardous).
- **Health Awareness (`health-awareness.html`)**:
  - Target Disease Prevention categories (`Water`, `Food`, `Hands`, `Air`, `Environment`).
  - Interactive topic cards opening expanded modal dialogs (`CAUSE → SPREAD → WARNING SIGNS → PREVENTION → WHEN TO SEEK HELP`).
  - 4 immunity pillars and medical red flags.
- **Daily Health Tips (`tips.html`)**:
  - Dynamic tip library, category filtering, keyword search, daily rotating tip spotlight, tip bookmarking (`localStorage`), copy-to-clipboard, and **"New Tip"** random generator.
- **Awareness Quiz (`quiz.html`)**:
  - Interactive 12-question MCQ test with progress bar, option selection, instant visual feedback (green/red), answer explanations, personal high score storage, and 4 awareness level badges:
    - 0–40: *Needs More Awareness*
    - 41–70: *Good Awareness*
    - 71–90: *Excellent Awareness*
    - 91–100: *Health Awareness Champion*
- **Campaigns (`campaigns.html`)**:
  - Campaign cards (*Clean Hands Campaign*, *Safe Water Campaign*, *Clean Campus Campaign*, *Healthy Community Campaign*), global hygiene observance calendar (World Water Day, World Hand Hygiene Day, Global Handwashing Day, World Toilet Day), and interactive volunteer ambassador registration form.
- **Emergency Info (`emergency.html`)**:
  - Toll-free emergency helplines (112, 102/108, 104, 1800-116-117), basic first-aid protocols (ORS preparation, minor cuts, burns), and prominent medical disclaimer banner.
- **About & Contact (`about.html`)**:
  - CSE mini-project objectives, technical architecture breakdown, interactive feedback form, and expandable FAQ accordion.

### 2. UI/UX & JavaScript Features
- **Dark / Light Theme Toggle**: Persistent mode switching using CSS Custom Properties & `localStorage`.
- **Mobile Navigation Drawer**: Smooth slide-in hamburger menu for mobile devices (tested down to 360px).
- **Interactive Modals & Tabs**: Modals for disease breakdowns and tabbed views for targeted prevention.
- **Toast Notifications**: Custom lightweight feedback toasts.
- **Back-to-Top**: Floating smooth scroll button.

---

## 📁 Project Structure

```
sanitization-health-awareness/
├── index.html
├── sanitization.html
├── health-awareness.html
├── tips.html
├── quiz.html
├── campaigns.html
├── emergency.html
├── about.html
├── BACKUP_README.md
├── README.md
│
├── css/
│   └── style.css
│
├── js/
│   ├── main.js
│   ├── quiz.js
│   ├── tips.js
│   ├── water-checker.js
│   └── handwash.js
│
└── assets/
    └── images/
        ├── hero_banner.jpg
        ├── handwash_guide.jpg
        └── campaign_hero.jpg
```

---

## 🚀 How to Run Locally

### Option 1: Python Static Server (Recommended)
```bash
python -m http.server 8000
```
Open `http://localhost:8000` in your web browser.

### Option 2: Direct File Opening
Double-click `index.html` in your file manager to open it directly in Chrome, Edge, or Firefox.

---

## 🛡️ Medical Disclaimer & Safety

This website is designed for educational and awareness purposes only as a CSE mini-project presentation. It does not provide medical diagnoses, treatment recommendations, or clinical services. Users experiencing medical emergencies should seek immediate professional assistance or contact local emergency services (112 / 102 / 108).

---

## 🎓 Target Users & Use Cases
- **CSE Mini-Project / Viva Presentation**: Demonstrates clean semantic HTML, modular JS, LocalStorage state management, and CSS design tokens.
- **Public Health & School Awareness**: Educational tool for classroom health sessions and community cleanliness campaigns.

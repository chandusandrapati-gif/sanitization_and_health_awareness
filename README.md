# Sanitization & Health Awareness Web Portal (CSE Mini-Project)

A modern, responsive, educational web application designed to promote awareness about personal hygiene, sanitization, safe drinking water, waste segregation, and disease prevention. Built with pure **HTML5, CSS3, and Vanilla JavaScript** with **LocalStorage** integration and **Font Awesome** icons.

---

## 🌟 Key Features

1. **8 Comprehensive Pages**:
   - **Home (`index.html`)**: Hero section, daily tip preview, feature cards, live health statistics, and handwashing infographic.
   - **Sanitization Awareness (`sanitization.html`)**: 6-step handwashing guide, drinking water purification methods, food safety principles, and 3-bin waste segregation rules (Wet, Dry, Hazardous).
   - **Health Awareness (`health-awareness.html`)**: Symptoms and prevention of hygiene-related illnesses, 4 immunity pillars, and medical red flags.
   - **Daily Health Tips (`tips.html`)**: Dynamic tip library, category filtering (Handwashing, Water, Food, Surroundings, Immunity), daily tip rotator algorithm, and favorite tip saving using `localStorage`.
   - **Awareness Quiz (`quiz.html`)**: Interactive 10-question MCQ test with score tracking, option selection, instant visual feedback (green/red), answer explanations, high score storage, and retake option.
   - **Campaigns (`campaigns.html`)**: Global hygiene observance calendar (World Hand Hygiene Day, World Toilet Day), upcoming community drives, and volunteer registration form.
   - **Emergency Info (`emergency.html`)**: Toll-free emergency helplines (112, 102/108, 104), first-aid protocols, and prominent healthcare disclaimers.
   - **About & Contact (`about.html`)**: CSE mini-project objectives, technology stack breakdown, validated feedback form, and interactive FAQ accordion.

2. **Interactive UI/UX Capabilities**:
   - **Dark / Light Theme Toggle**: Seamless persistent mode switching using CSS Variables & `localStorage`.
   - **Responsive Navigation Bar**: Sticky glassmorphic navbar with mobile drawer navigation menu.
   - **Filter & Search Engine**: Real-time tip keyword search and category pills.
   - **Toast System**: Custom lightweight notification popups for user actions.
   - **Back-to-Top**: Smooth floating scroll button.

---

## 📁 Suggested Folder Structure

```
sanitization-health-awareness/
│
├── index.html
├── sanitization.html
├── health-awareness.html
├── tips.html
├── quiz.html
├── campaigns.html
├── emergency.html
├── about.html
├── README.md
│
├── css/
│   └── style.css
│
├── js/
│   ├── main.js
│   ├── quiz.js
│   └── tips.js
│
└── assets/
    └── images/
        ├── hero_banner.jpg
        ├── handwash_guide.jpg
        └── campaign_hero.jpg
```

---

## 🚀 How to Run Locally

### Option 1: Double-Click (Simple File Opening)
Double-click `index.html` in your file explorer to open the website directly in Google Chrome, Microsoft Edge, or Mozilla Firefox.

### Option 2: Using Python Static HTTP Server (Recommended)
Open a terminal / command prompt inside the project folder:
```bash
python -m http.server 8080
```
Then visit `http://localhost:8080` in your web browser.

### Option 3: Using VS Code Live Server
1. Open the project folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and click **"Open with Live Server"**.

---

## 🎓 CSE Mini-Project Highlights for Viva Presentation

- **No Third-Party Backend Required**: Stores state (high scores, saved tips, theme mode) locally using browser `localStorage`.
- **CSS Architecture**: Organized custom CSS tokens (Variables, Dark Mode rules, Flexbox & Grid layouts, keyframe animations).
- **DOM & Event Handling**: Clean event delegation, state machine for quiz progression, and form submission validation in ES6 JavaScript.

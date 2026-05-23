# ⚡ B4HAA7 // Cybersecurity Portfolio & Threat Lab

```
 ██████╗ ██╗  ██╗ █████╗  █████╗ ███████╗
 ██╔══██╗██║  ██║██╔══██╗██╔══██╗╚══███╔╝
 ██████╔╝███████║███████║███████║  ███╔╝ 
 ██╔══██╗╚════██║██╔══██║██╔══██║ ███╔╝  
 ██████╔╝     ██║██║  ██║██║  ██║███████╗
 ╚══════╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
 [>] SECURING THE PERIMETER | THREAT HUNTER & MALWARE ANALYST
```

Welcome to the central repository for **B4HAA7's Cybersecurity Portfolio**. This project is a state-of-the-art, interactive, cyberpunk-inspired web application showcasing cyber learning milestones, blue-team operations, homelab SIEM structures, malware dissection logs, and threat intelligence writing.

---

## 🛠️ Tech Stack & Architecture

This application is built with a sleek, premium, performance-first frontend stack matching the aesthetic of modern security operations centers (SOC):

- **Core Framework**: React 19 & TypeScript (Vite-powered for rapid HMR)
- **Styling & Theme**: Vanilla CSS custom variables mixed with utility classes for precise glassmorphic controls and dynamic glowing text effects
- **Routing**: `react-router-dom` for fluid, instantaneous navigation between the Home view and the Blog Archives
- **Motion & Interactions**: `motion` (`framer-motion`) powering physics-based transitions, interactive timeline expansions, and hover-triggered micro-animations
- **Dynamic Blogs System**: Local Markdown `.md` parser (`react-markdown` + Frontmatter extraction) that loads and formats writeups eagerly
- **Communication Channels**: Secure SMTP integrations using EmailJS
- **Visual Iconography**: Lucide React custom threat vectors and status assets

---

## ⚡ Main Deck Overview

### 1. 🟢 Threat Intel & Lab Status Ticker
An active-status beacon displaying real-time operational status (e.g., analyzing threats, preparing for professional certifications like **CompTIA CySA+**, or completing advanced blue-team paths).

### 2. 🛡️ Learning Journey (Timeline)
An interactive learning pathway documenting milestones:
- 💻 **Initial Access (2019 - 2022)**: Bootstrapping system architecture knowledge, Linux exploration, and fundamentals in C and Python.
- 🎯 **Red Team Recon (2023 - 2024)**: Structured offensive paths (roadmap.sh), Kali Linux, and Web Penetration Testing basics.
- 🔍 **Blue Team Operations (2025)**: SOC analysis, TryHackMe, homelab deployments, and active SIEM administration.
- 🚀 **Continuous Evolution (Present)**: Real-time threat hunting and professional security certifications preparation.

### 3. 📂 The Archives (Blog & Threat Reports)
A comprehensive markdown-powered blog engine reading raw files natively from `src/blogs/`. Supports category tags, publishing metadata, clean code syntax-highlighting, and complete reading views optimized for mobile and desktop screens.

---

## 🚀 Declassification & Local Deployment

To run this Security Operations Center layout locally on your workstation, follow these steps:

### Prerequisites
Make sure you have **Node.js** (v18 or higher) and **npm** installed.

### 1. Clone & Access the Workspace
```bash
git clone https://github.com/88BahaaAdel88/cyber-portfolio.git
cd cyber-portfolio
```

### 2. Install Dependencies
Initialize package structures and load Lucide icons, Framer Motion, and Markdown dependencies:
```bash
npm install
```

### 3. Run the Tactical Dev Server
Boot up the Vite build-tool environment. The project will run locally and update instantaneously:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build the Production Bundle
To compile optimized, minified static files ready for deployment on hosting networks:
```bash
npm run build
```

---

## 📁 System Blueprint (File Structure)

```
├── .github/          # CI/CD deployment pipelines
├── src/
│   ├── blogs/        # Active markdown writeups & security analysis reports
│   │   ├── emotet-analysis.md
│   │   └── test.md
│   ├── App.tsx       # Core React code, routers, and interface components
│   ├── index.css     # Global cyber styling, scrollbar glow, and custom variables
│   ├── main.tsx      # Application entry-point and React rendering node
│   └── vite-env.d.ts # TypeScript environments
├── index.html        # Primary HTML document shell
├── package.json      # Dependencies and scripts definitions
├── vite.config.ts    # Compilation and aliasing controls
└── README.md         # You are here
```

---

## 🔗 Secure Communications
* **Email:** [bahaaadel47880@outlook.com](mailto:bahaaadel47880@outlook.com)
* **GitHub:** [88BahaaAdel88](https://github.com/88BahaaAdel88)
* **Discord:** `ienjoycaffeine`
* **LinkedIn:** [B4HAA7](https://www.linkedin.com/in/b4haa7/)
* **TryHackMe:** [B4HAA7](https://tryhackme.com/p/B4HAA7)

---
```
[!] STATUS: OPERATIONAL | CONNECTIVITY SECURE
```
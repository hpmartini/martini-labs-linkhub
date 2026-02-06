# Martini Labs – LinkHub

Persönliche Link-Seite (Linktree-Alternative) für Hans-Peter Martini mit AI-Chat und dynamischem Content.

## 🌐 Live

**https://links.martini-labs.de** *(oder vergleichbar)*

## ✨ Features

- **Multi-Theme Support:**
  - 🌃 Synthwave (Dark Mode) – Neon-Retro-Ästhetik
  - 🏔️ Schwälmer (Light Mode) – Regional, traditionell
- **AI Chat Assistant** – Gemini-powered Chatbot
- **Dynamischer Blog-Feed** – Automatisch aus RSS
- **Kontaktformular** – Direkte Anfragen
- **QR-Code Tracking** – Analytics für Print-Material
- **Social Links** – Alle Plattformen auf einen Blick

## 🛠 Tech Stack

| Kategorie | Technologie |
|-----------|-------------|
| Framework | React 19, Vite |
| AI | Google Gemini API |
| Icons | Lucide React, React Icons |
| Hosting | Vercel |

## 🎨 Themes

Build-Varianten für verschiedene Themes:

```bash
# Standard (auto-detect)
npm run build

# Synthwave Theme
npm run build:synthwave

# Schwälmer Theme  
npm run build:schwaelmer
```

## 🚀 Entwicklung

```bash
# Dependencies installieren
npm install

# Entwicklungsserver
npm run dev

# Produktions-Build
npm run build
```

## 📁 Projektstruktur

```
├── components/
│   ├── AIChat.tsx          # Gemini Chat
│   ├── BlogFeed.tsx        # RSS Blog Integration
│   ├── ContactForm.tsx     # Kontaktformular
│   ├── LinkCard.tsx        # Link-Karten
│   ├── Profile.tsx         # Profil-Header
│   ├── SocialIcons.tsx     # Social Media Links
│   ├── SynthwaveBackground.tsx
│   └── SchwälmerBackground.tsx
├── themes/                 # Theme-Konfiguration
├── constants.tsx           # Links, Social Media
├── api/                    # Serverless (QR Tracking)
└── data/                   # Statische Daten
```

## 🔧 Umgebungsvariablen

```env
GEMINI_API_KEY=...      # AI Chat
VITE_THEME=...          # Theme Override (synthwave/schwaelmer)
```

## 📝 Ursprung

Initialisiert mit [Google AI Studio](https://aistudio.google.com), erweitert mit AI-Chat und Multi-Theme.

---

*Hans-Peter Martini – Softwarearchitekt & CEO, Martini Labs GmbH*

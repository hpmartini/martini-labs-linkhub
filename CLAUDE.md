# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Martini Labs Linkhub is a personal link-in-bio style landing page for Hans-Peter Martini (CEO of Martini Labs GmbH). It features a synthwave/retro aesthetic with an AI-powered chat assistant using Google's Gemini API.

## Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Setup

Set `GEMINI_API_KEY` in `.env.local` before running the app. The Vite config exposes this as `process.env.API_KEY` and `process.env.GEMINI_API_KEY`.

## Architecture

### Tech Stack
- **React 19** with TypeScript
- **Vite 6** as build tool
- **Tailwind CSS** via CDN (in `index.html`)
- **Google Gemini API** (`@google/genai`) for AI features

### Project Structure

```
├── App.tsx              # Main app component, layout orchestration
├── index.tsx            # React root entry point
├── index.html           # HTML shell, Tailwind CDN, custom fonts (Orbitron, Inter)
├── types.ts             # TypeScript interfaces (LinkItem, Message, BlogPost, SocialPost)
├── constants.tsx        # Static data (PRIMARY_LINKS, SOCIAL_LINKS, SYSTEM_INSTRUCTION)
├── services/
│   └── gemini.ts        # Gemini API integration (chat, blog fetch, social fetch)
└── components/
    ├── SynthwaveBackground.tsx  # Canvas-based 3D grid animation with mouse interaction
    ├── Profile.tsx              # Avatar and name card
    ├── LinkCard.tsx             # Website link cards with live preview on hover
    ├── SocialIcons.tsx          # Social media icon buttons
    ├── AIChat.tsx               # AI chat terminal interface
    ├── BlogFeed.tsx             # Gemini-powered blog post aggregation
    ├── SocialFeed.tsx           # Gemini-powered social post aggregation
    └── ContactForm.tsx          # Contact form (requires Formspree ID setup)
```

### Key Patterns

**Gemini Service (`services/gemini.ts`):**
- Uses `gemini-3-flash-preview` model
- Three exported functions:
  - `getGeminiResponse()` - Chat with system instruction for "Digital Twin" persona
  - `fetchLatestBlogPosts()` - Uses Google Search grounding to find blog posts
  - `fetchLatestSocialPosts()` - Uses Google Search grounding for social posts
- All functions use typed JSON responses via `responseSchema`

**Styling Conventions:**
- Synthwave theme: cyan (`#00ffff`) and pink (`#ff00ff`) as accent colors
- Glass morphism with `backdrop-blur` and semi-transparent backgrounds
- Custom CSS classes in `index.html`: `.font-orbitron`, `.glass`, `.neon-text-*`, `.sun`
- Tailwind utilities used inline throughout components

**Canvas Animation (`SynthwaveBackground.tsx`):**
- Custom 3D perspective grid rendered via `<canvas>`
- Mouse-interactive cell highlighting
- Uses `requestAnimationFrame` for smooth animation loop

## Configuration Notes

**Contact Form:** The `ContactForm.tsx` has a placeholder `YOUR_FORMSPREE_ID` that needs to be replaced with an actual Formspree form ID.

**Path Alias:** `@/` resolves to project root (configured in both `tsconfig.json` and `vite.config.ts`).

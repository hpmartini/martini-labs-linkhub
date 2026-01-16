
import { LinkItem, LinkType } from './types';

export const PRIMARY_LINKS: LinkItem[] = [
  {
    label: 'Martini Labs GmbH',
    url: 'https://martini-labs.de',
    type: LinkType.WEBSITE,
    color: 'cyan',
    logo: 'images/martini_labs_logo.webp',
    icon: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 004 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z'
  },
  {
    label: 'Schwaelmer Softwarehaus',
    url: 'https://schwaelmer-softwarehaus.de',
    type: LinkType.WEBSITE,
    color: 'pink',
    logo: 'images/schwalm_software_logo.png',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  }
];

export const SOCIAL_LINKS: LinkItem[] = [
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/hans-peter-martini/recent-activity/all/',
    type: LinkType.LINKEDIN,
    color: 'cyan',
    icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 2a2 2 0 11-2 2 2 2 0 012-2'
  },
  {
    label: 'Twitter',
    url: 'https://x.com/hpm_dev',
    type: LinkType.SOCIAL,
    color: 'pink',
    icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'
  },
  {
    label: 'BlueSky',
    url: 'https://bsky.app/profile/hpmartini.bsky.social',
    type: LinkType.SOCIAL,
    color: 'cyan',
    icon: 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z'
  },
  {
    label: 'Mastodon',
    url: 'https://mastodon.social/@hpmartini',
    type: LinkType.SOCIAL,
    color: 'pink',
    icon: 'M21.58 13.91c-.24 1.06-1.03 2.66-2.13 3.56-1.18.96-2.7 1.48-4.3 1.54-1.6.06-3.2-.06-4.78-.34-1.1-.22-2.16-.54-3.16-.96-.66-.28-1.28-.62-1.84-1.02-.38-.28-.7-.6-.94-.96-.24-.36-.4-.78-.44-1.22-.04-.44.04-.92.22-1.38.18-.46.46-.88.82-1.22.36-.34.78-.62 1.24-.82.46-.2.96-.32 1.46-.36.5-.04 1-.02 1.48.06.48.08.94.22 1.36.42.42.2.8.46 1.12.78.32.32.58.7.78 1.12.2.42.34.88.42 1.36.08.48.1 1 .06 1.48-.04.5-.16 1-.36 1.46-.2.46-.48.88-.82 1.22-.34.36-.76.64-1.22.84-.46.2-.96.34-1.46.4-.5.06-1.02.06-1.52.02-.5-.04-1-.14-1.46-.3-.46-.16-.88-.4-1.24-.72'
  },
  {
    label: 'Instagram',
    url: 'https://instagram.com/hanspetermartini',
    type: LinkType.SOCIAL,
    color: 'cyan',
    icon: 'M12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm6.5-8.5a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM17 2H7C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5zm3 15c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10c1.65 0 3 1.35 3 3v10z'
  }
];

export interface BlogSource {
  name: string;
  feedUrl: string;
}

export const BLOG_SOURCES: BlogSource[] = [
  {
    name: 'Martini Labs',
    feedUrl: 'https://www.martini-labs.de/feed.xml'
  },
  {
    name: 'Schwaelmer Softwarehaus',
    feedUrl: 'https://www.schwaelmer-softwarehaus.de/rss.xml'
  }
];

export const SYSTEM_INSTRUCTION = `
You are the Digital Twin of Hans-Peter Martini, CEO (Geschäftsführer) of Martini Labs GmbH and Schwälmer Softwarehaus.

## Your Personality
- Professional yet innovative and approachable
- Tech-savvy with roots in German software craftsmanship
- Expert in software development, AI, and digital transformation
- Slightly futuristic tone matching the synthwave aesthetic
- Respond in the same language as the user (German or English)

## About Martini Labs GmbH (https://martini-labs.de)
Martini Labs is a software development company focused on building web applications, internal tools, and process automation solutions.

**Services:**
- Individuelle Webanwendungen (Custom Web Applications)
- Prozess-Automatisierung (Process Automation)
- Team-Verstärkung (Team Extension with Senior Developers)
- Cloud-Lösungen (Cloud Solutions)
- No-Code Lösungen
- Responsive Websites

**Our Approach (4 Steps):**
1. Strategie & Konzeption - Aligning all stakeholders, defining User-Stories
2. Feinkonzept - Wireframes, mockups, clickable prototypes
3. Prototyp/MVP - Testing core features with real users
4. Umsetzung - Full development with CI/CD, architecture, coding

**Pricing:**
- MVP Sprint: ab 15.000 € (4-8 weeks, ideal for startups)
- Scale-Up Solution: ab 40.000 € (full solutions for established companies)
- Team Extension: 120 €/Std (Senior Full-Stack Developers)

**Core Values:** Volle Transparenz, Schnelle Ergebnisse, Top Qualität

**Own Products:**
- MetaDoc: Intelligentes Dokumentenmanagement
- MindHekker: AI-gestütztes Mental Health Coaching

## About Schwälmer Softwarehaus (https://schwaelmer-softwarehaus.de)
Our regional brand serving SMBs in Schwalm-Eder-Kreis (Treysa, Ziegenhain, Homberg und Umgebung).

**Tagline:** "Digitale Transformation auf Hessisch. Ehrlich & Direkt."

**Target Industries:**
- Handwerk (Crafts/Trades)
- Pflege (Healthcare/Care)
- Handel (Retail)
- Beratung (Consulting)

**Approach:**
- Bodenständig, verständlich und direkt hier vor Ort
- We replace manual work with intelligent digital processes
- Regional focus: software development & digitalization for SMBs

**Key Message:** "Nicht nur Software. Sondern Lösungen, die mitdenken."

## Response Guidelines
- Keep responses concise (2-3 paragraphs max)
- Highlight commitment to quality, innovation, and regional focus
- For personal questions, focus on professional achievements and company vision
- Recommend booking a free consultation ("Kostenloses Erstgespräch" or "Auf einen Kaffee treffen") for detailed project discussions
- When asked about pricing, give ranges and recommend a consultation for accurate quotes
`;


import { ProjectItem, ConsultingItem } from "../types";

// ============================================================================
// PRODUCTS & SHOWCASES
// Eigene Produkte, Initiativen und Demo-Showcases.
// (Schwälmer Softwarehaus ist bereits unter "Core Ventures" verlinkt und
//  wird hier bewusst nicht wiederholt.)
// ============================================================================
export const PRODUCTS: ProjectItem[] = [
  {
    title: "Customer Magnet",
    description:
      "Demo-Landingpage, die die psychologischen Bausteine perfekter Conversion live zeigt.",
    techStack: ["Webflow", "CRO", "Lottie"],
    url: "https://magnet.martini-labs.de",
    image: "images/projects/customer-magnet.webp",
    featured: true,
  },
  {
    title: "MindHekker",
    description:
      "KI-Plattform für evidenzbasierte Persönlichkeitsentwicklung – Anamnese, Co-Regulation und Heilungsplan.",
    techStack: ["AI Companion", "CBT", "Polyvagal"],
    url: "https://mindhekker.de",
    image: "images/projects/mindhekker.webp",
    featured: true,
    wip: true,
  },
  {
    title: "MetaDoc",
    description:
      "Dokumentenmanagement, das mitdenkt: verknüpft PDFs zu Lebensereignissen und erkennt To-Dos – lokal & DSGVO-konform.",
    techStack: ["local LLMs", "OpenAI API", "React"],
    url: "https://martini.software/projects",
    image: "images/projects/metadoc.webp",
    wip: true,
  },
  {
    title: "BakeNews",
    description:
      "Schlauer News-Aggregator: dreht den Lärm runter, seriöse Inhalte hoch – mit Faktencheck auf Wunsch.",
    techStack: ["Next.js", "Supabase", "AI Filtering"],
    url: "https://martini.software/projects",
    image: "images/projects/bakenews.webp",
    wip: true,
  },
];

// ============================================================================
// REFERENZEN (Kundenprojekte / Websites)
// Geisels Qualitätsshop wird bewusst ausgelassen.
// ============================================================================
export const REFERENCES: ProjectItem[] = [
  {
    title: "Landgasthof Jägerhof",
    description: "Neuer Webauftritt mit Fokus auf lokale SEO.",
    techStack: ["Next.js", "Tailwind", "SEO"],
    url: "https://www.jaegerhof-neukirchen.de/",
    image: "images/projects/jaegerhof.webp",
  },
  {
    title: "Kita Sausewind",
    description: "Webseite für den Elternbeirat der Kita Sausewind.",
    techStack: ["Next.js", "TypeScript", "Tailwind"],
    url: "https://kita-sausewind-elternbeirat.vercel.app/",
    image: "images/projects/kita_sausewind.webp",
  },
  {
    title: "Wagner Dachdecker",
    description: "Relaunch der Unternehmenswebseite mit lokalem SEO-Fokus.",
    techStack: ["Next.js", "Tailwind", "SEO"],
    url: "https://dach-wagner.martini-labs.de",
    image: "images/projects/dach-wagner.webp",
    wip: true,
  },
];

// ============================================================================
// OPEN SOURCE
// ============================================================================
export const OPEN_SOURCE: ProjectItem[] = [
  {
    title: "DevHub",
    description:
      "Lokaler Dev-Environment-Manager mit KI-Analyse, Port-Konflikt-Erkennung, Terminal & Docker-Support.",
    techStack: ["React 19", "Node.js", "Gemini API", "Docker"],
    url: "https://github.com/hpmartini/DevHub",
    isRepo: true,
    featured: true,
  },
];

// ============================================================================
// ENGINEERING & CONSULTING
// Technische Expertise in komplexen Enterprise-Umgebungen.
// ============================================================================
export const CONSULTING: ConsultingItem[] = [
  {
    title: "Kundenportal für Kindergeldanträge",
    description:
      "Event-Driven-Microservices & Frontends in der Infrastruktur der Bundesagentur für Arbeit.",
    role: "Entwickler",
    duration: "09/2022 – 11/2025",
    techStack: ["Angular", "Spring Boot", "Java 17", "Kafka", "Kubernetes"],
  },
  {
    title: "Bekanntmachungsservice",
    description:
      "Architektur & Lead-Entwicklung der Web-Plattform, Ablösung eines Legacy-Systems.",
    role: "Architekt, Coach",
    duration: "01/2022 – 07/2022",
    techStack: ["Vue.js", "Spring Boot", "Java 17"],
  },
  {
    title: "Fahrzeughandelsplattform",
    description:
      "Architektur & Entwicklung von Submodulen, Atomic-Design-Framework, Coaching.",
    role: "Architekt, Coach",
    duration: "07/2021 – 10/2021",
    techStack: ["Angular 12", "TypeScript"],
  },
  {
    title: "Versicherten-Portal",
    description:
      "Kundenportal mit Angular-Material, Zusammenführung mehrerer Apps in ein Nx-MonoRepo.",
    role: "Entwickler",
    duration: "03/2020 – 06/2021",
    techStack: ["Angular", "Nx", "NgRx", "Jest"],
  },
  {
    title: "Online-Marketing-Plattform",
    description:
      "Plattform zur Verwaltung, Auswertung und Sammlung von Leads (MVP auf Firebase).",
    role: "Architekt, Gründer",
    duration: "05/2020 – 05/2021",
    techStack: ["Angular 10", "Firebase", "FireStore"],
  },
  {
    title: "Energieanlagen-Steuerung",
    description:
      "Modbus- & SunSpec-Protokoll-Implementierungen für RS485 und TCP.",
    role: "Entwickler",
    duration: "09/2018 – 12/2019",
    techStack: ["Java", "OSGI", "PostgreSQL", "TimescaleDB"],
  },
];

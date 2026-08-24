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
    title: "Pro. Frauen. Klinik. Schwalm!",
    description:
      "Kampagnen-Website der Bürgerinitiative für den Erhalt von Gynäkologie und Geburtshilfe in Schwalmstadt – mit Petition, Presseraum und belegten Zahlen.",
    techStack: ["Next.js", "Tailwind", "Vercel"],
    url: "https://pro-frauen-klinik-schwalm.de/",
    image: "images/projects/pro-frauen-klinik-schwalm.webp",
    featured: true,
  },
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
  {
    title: "Anlagenüberwachung",
    description:
      "Neuentwicklung eines Webservices zur Überwachung von Geräten an Kunden-Standorten.",
    role: "Entwickler",
    duration: "10/2018 – 12/2019",
    techStack: ["Kotlin", "Angular", "Spring Boot", "Kubernetes"],
  },
  {
    title: "Werkstattportal",
    description:
      "Webportal zur Suche und Vermittlung von KFZ-Dienstleistungen, inkl. Scraping-Microservice.",
    role: "Entwickler, Teamleiter",
    duration: "09/2018",
    techStack: ["PHP7", "Laravel"],
  },
  {
    title: "4Mular",
    description:
      "Webportal zur automatisierten Anmeldung von Photovoltaikanlagen.",
    role: "Entwickler",
    duration: "08/2018",
    techStack: ["TypeScript", "Kotlin", "Angular 5", "NgRx"],
  },
  {
    title: "Facto",
    description:
      "Webplattform zur Rückabwicklung von Lebensversicherungen, inkl. Rechte-/Rollensystem und State-Machine.",
    role: "Entwickler, Berater",
    duration: "10/2017 – 07/2018",
    techStack: ["PHP", "Symfony 3", "AngularJS", "PostgreSQL"],
  },
  {
    title: "Timewarp",
    description:
      "Middleware zur Verknüpfung von Zeiterfassungstools und Projektmanagement-Plattformen.",
    role: "Entwickler, Coach",
    duration: "09/2017",
    techStack: ["Kotlin", "Spring Boot", "Angular 5", "PostgreSQL"],
  },
  {
    title: "CI-Plattform",
    description:
      "Weiterentwicklung, neue Features und Bug-Fixes für eine CI-Plattform.",
    role: "Entwickler",
    duration: "11/2016 – 09/2017",
    techStack: ["PHP", "Go", "Symfony 2", "AngularJS"],
  },
  {
    title: "Container-Management",
    description:
      "Server-Daemon mit CMD-Client zur Bereitstellung von Docker-Machines.",
    role: "Entwickler",
    duration: "07/2017",
    techStack: ["Go", "Unix Shell", "Docker"],
  },
  {
    title: "Matching-Komponente",
    description:
      "Neu-Implementierung eines Matching-Algorithmus für eine CI-Plattform.",
    role: "Entwickler",
    duration: "04/2017",
    techStack: ["PHP", "Symfony 2"],
  },
  {
    title: "VNC-Recording",
    description:
      "Video-Debugging und Mitschnitt von UI-Tests, inkl. noVNC-Reimplementierung und Reverse-Proxy.",
    role: "Entwickler",
    duration: "01/2017 – 02/2017",
    techStack: ["C", "Node.js", "FFMPEG"],
  },
  {
    title: "Tourismus-Systeme",
    description:
      "Mehrere Projekte im Tourismus: Drucksysteme, Reiseunterlagen und Webanwendungen.",
    role: "Entwickler, Projektleiter",
    duration: "08/2011 – 10/2016",
    techStack: ["C#", ".NET", "ASP.NET MVC", "MSSQL"],
  },
];

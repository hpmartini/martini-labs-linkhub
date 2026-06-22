
export enum LinkType {
  WEBSITE = 'website',
  LINKEDIN = 'linkedin',
  SOCIAL = 'social',
  OTHER = 'other'
}

export interface LinkItem {
  label: string;
  url: string;
  type: LinkType;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  logo?: string; // Path to logo image (light theme)
  logoDark?: string; // Path to logo image (dark theme) - falls back to logo if not set
  color?: string; // 'cyan' | 'pink'
  description?: string;
  preview?: string; // Path to a locally generated hover-preview screenshot
}

export interface ProjectItem {
  title: string;
  description: string;
  techStack: string[];
  url: string; // live link or repo link
  image?: string; // optional thumbnail (object-cover)
  isRepo?: boolean; // renders a GitHub label/icon instead of "Live"
  featured?: boolean;
  wip?: boolean; // "In Arbeit" badge
}

export interface ConsultingItem {
  title: string;
  description: string;
  role: string;
  duration: string;
  techStack: string[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface BlogPost {
  title: string;
  url: string;
  date: string;
  source: string;
}

export interface SocialPost {
  content: string;
  url: string;
  date: string;
  source: string; // 'LinkedIn' | 'Twitter'
}

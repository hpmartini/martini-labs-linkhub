
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
  icon?: string;
  logo?: string; // Path to logo image
  color?: string; // 'cyan' | 'pink'
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

import { BlogPost } from '../types';
import { BLOG_SOURCES } from '../constants';

const CACHE_KEY = 'blog_posts_cache';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

interface CacheEntry {
  posts: BlogPost[];
  timestamp: number;
}

const getCache = (): CacheEntry | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const entry: CacheEntry = JSON.parse(cached);
    if (Date.now() - entry.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return entry;
  } catch {
    return null;
  }
};

const setCache = (posts: BlogPost[]): void => {
  try {
    const entry: CacheEntry = { posts, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // Ignore cache errors
  }
};

const formatDate = (dateStr: string | undefined): string => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
};

const getTextContent = (element: Element | null): string => {
  return element?.textContent?.trim() || '';
};

interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
}

const parseRSSFeed = (xmlText: string): RSSItem[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, 'text/xml');

  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    throw new Error('Invalid XML');
  }

  const items: RSSItem[] = [];

  // Try RSS 2.0 format first
  const rssItems = doc.querySelectorAll('item');
  if (rssItems.length > 0) {
    rssItems.forEach(item => {
      items.push({
        title: getTextContent(item.querySelector('title')),
        link: getTextContent(item.querySelector('link')),
        pubDate: getTextContent(item.querySelector('pubDate'))
      });
    });
    return items;
  }

  // Try Atom format
  const atomEntries = doc.querySelectorAll('entry');
  atomEntries.forEach(entry => {
    const linkEl = entry.querySelector('link[href]');
    items.push({
      title: getTextContent(entry.querySelector('title')),
      link: linkEl?.getAttribute('href') || '',
      pubDate: getTextContent(entry.querySelector('published') || entry.querySelector('updated'))
    });
  });

  return items;
};

export const fetchLatestBlogPosts = async (): Promise<BlogPost[]> => {
  const cached = getCache();
  if (cached) {
    return cached.posts;
  }

  const allPosts: BlogPost[] = [];

  const feedPromises = BLOG_SOURCES.map(async (source) => {
    try {
      const response = await fetch(source.feedUrl);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const xmlText = await response.text();
      const items = parseRSSFeed(xmlText);

      return items.map((item): BlogPost => ({
        title: item.title || 'Untitled',
        url: item.link,
        date: formatDate(item.pubDate),
        source: source.name
      }));
    } catch (error) {
      console.error(`Failed to fetch RSS feed from ${source.name}:`, error);
      return [];
    }
  });

  const results = await Promise.all(feedPromises);
  results.forEach(posts => allPosts.push(...posts));

  const sortedPosts = allPosts
    .filter(post => post.url)
    .sort((a, b) => {
      // Parse German date format (dd.mm.yyyy) for sorting
      const parseGermanDate = (d: string) => {
        const parts = d.split('.');
        if (parts.length === 3) {
          return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        }
        return new Date(d);
      };
      const dateA = parseGermanDate(a.date);
      const dateB = parseGermanDate(b.date);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 4);

  setCache(sortedPosts);

  return sortedPosts;
};

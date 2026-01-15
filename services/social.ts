import { SocialPost } from '../types';

// Import static JSON data (auto-updated by GitHub Actions)
import socialPostsData from '../data/social-posts.json';

export const fetchLatestSocialPosts = async (): Promise<SocialPost[]> => {
  try {
    // Return the statically imported data
    // This gets updated by the GitHub Actions scraper
    return socialPostsData as SocialPost[];
  } catch (error) {
    console.error('Failed to load social posts:', error);
    return [];
  }
};

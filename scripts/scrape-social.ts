import puppeteer, { Browser, Page } from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

interface SocialPost {
  content: string;
  url: string;
  date: string;
  source: 'LinkedIn' | 'Twitter';
}

const LINKEDIN_EMAIL = process.env.LINKEDIN_EMAIL || '';
const LINKEDIN_PASSWORD = process.env.LINKEDIN_PASSWORD || '';
const TWITTER_EMAIL = process.env.TWITTER_EMAIL || '';
const TWITTER_PASSWORD = process.env.TWITTER_PASSWORD || '';

const LINKEDIN_PROFILE_URL = 'https://www.linkedin.com/in/hans-peter-martini/recent-activity/all/';
const TWITTER_PROFILE_URL = 'https://x.com/hpm_dev';

const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'social-posts.json');

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapeLinkedIn(browser: Browser): Promise<SocialPost[]> {
  if (!LINKEDIN_EMAIL || !LINKEDIN_PASSWORD) {
    console.log('LinkedIn credentials not provided, skipping...');
    return [];
  }

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  try {
    console.log('Logging into LinkedIn...');
    await page.goto('https://www.linkedin.com/login', { waitUntil: 'networkidle2' });

    await page.type('#username', LINKEDIN_EMAIL, { delay: 50 });
    await page.type('#password', LINKEDIN_PASSWORD, { delay: 50 });
    await page.click('button[type="submit"]');

    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 });
    await delay(2000);

    // Check if login was successful
    const currentUrl = page.url();
    if (currentUrl.includes('checkpoint') || currentUrl.includes('challenge')) {
      console.log('LinkedIn requires verification, skipping...');
      return [];
    }

    console.log('Navigating to activity feed...');
    await page.goto(LINKEDIN_PROFILE_URL, { waitUntil: 'networkidle2' });
    await delay(3000);

    // Scroll to load more posts
    await page.evaluate(() => window.scrollBy(0, 1000));
    await delay(2000);

    const posts = await page.evaluate(() => {
      const postElements = document.querySelectorAll('.feed-shared-update-v2');
      const results: { content: string; url: string; date: string }[] = [];

      postElements.forEach((post, index) => {
        if (index >= 5) return; // Limit to 5 posts

        const contentEl = post.querySelector('.feed-shared-update-v2__description, .feed-shared-text');
        const content = contentEl?.textContent?.trim() || '';

        const linkEl = post.querySelector('a[href*="/feed/update/"]');
        const url = linkEl?.getAttribute('href') || '';

        const timeEl = post.querySelector('.feed-shared-actor__sub-description span, time');
        const date = timeEl?.textContent?.trim() || '';

        if (content && content.length > 20) {
          results.push({
            content: content.substring(0, 280),
            url: url.startsWith('http') ? url : `https://www.linkedin.com${url}`,
            date
          });
        }
      });

      return results;
    });

    console.log(`Found ${posts.length} LinkedIn posts`);
    return posts.map(p => ({ ...p, source: 'LinkedIn' as const }));

  } catch (error) {
    console.error('LinkedIn scraping failed:', error);
    return [];
  } finally {
    await page.close();
  }
}

async function scrapeTwitter(browser: Browser): Promise<SocialPost[]> {
  if (!TWITTER_EMAIL || !TWITTER_PASSWORD) {
    console.log('Twitter credentials not provided, skipping...');
    return [];
  }

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  try {
    console.log('Logging into Twitter/X...');
    await page.goto('https://x.com/login', { waitUntil: 'networkidle2' });
    await delay(2000);

    // Twitter login flow
    const usernameInput = await page.waitForSelector('input[autocomplete="username"]', { timeout: 10000 });
    await usernameInput?.type(TWITTER_EMAIL, { delay: 50 });

    // Click next
    const nextButtons = await page.$$('div[role="button"]');
    for (const btn of nextButtons) {
      const text = await btn.evaluate(el => el.textContent);
      if (text?.includes('Next') || text?.includes('Weiter')) {
        await btn.click();
        break;
      }
    }
    await delay(2000);

    // Password
    const passwordInput = await page.waitForSelector('input[type="password"]', { timeout: 10000 });
    await passwordInput?.type(TWITTER_PASSWORD, { delay: 50 });

    // Click login
    const loginButtons = await page.$$('div[role="button"]');
    for (const btn of loginButtons) {
      const text = await btn.evaluate(el => el.textContent);
      if (text?.includes('Log in') || text?.includes('Anmelden')) {
        await btn.click();
        break;
      }
    }

    await delay(5000);

    // Check for verification
    const currentUrl = page.url();
    if (currentUrl.includes('account/access') || currentUrl.includes('challenge')) {
      console.log('Twitter requires verification, skipping...');
      return [];
    }

    console.log('Navigating to profile...');
    await page.goto(TWITTER_PROFILE_URL, { waitUntil: 'networkidle2' });
    await delay(3000);

    // Scroll to load tweets
    await page.evaluate(() => window.scrollBy(0, 800));
    await delay(2000);

    const posts = await page.evaluate(() => {
      const tweetElements = document.querySelectorAll('article[data-testid="tweet"]');
      const results: { content: string; url: string; date: string }[] = [];

      tweetElements.forEach((tweet, index) => {
        if (index >= 5) return; // Limit to 5 tweets

        const contentEl = tweet.querySelector('[data-testid="tweetText"]');
        const content = contentEl?.textContent?.trim() || '';

        const linkEl = tweet.querySelector('a[href*="/status/"]');
        const url = linkEl?.getAttribute('href') || '';

        const timeEl = tweet.querySelector('time');
        const date = timeEl?.getAttribute('datetime') || timeEl?.textContent || '';

        if (content && content.length > 10) {
          results.push({
            content: content.substring(0, 280),
            url: url.startsWith('http') ? url : `https://x.com${url}`,
            date
          });
        }
      });

      return results;
    });

    console.log(`Found ${posts.length} Twitter posts`);
    return posts.map(p => ({ ...p, source: 'Twitter' as const }));

  } catch (error) {
    console.error('Twitter scraping failed:', error);
    return [];
  } finally {
    await page.close();
  }
}

async function main(): Promise<void> {
  console.log('Starting social media scraper...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const [linkedInPosts, twitterPosts] = await Promise.all([
      scrapeLinkedIn(browser),
      scrapeTwitter(browser)
    ]);

    const allPosts = [...linkedInPosts, ...twitterPosts];

    // Sort by date (newest first) if dates are parseable
    allPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
        return dateB.getTime() - dateA.getTime();
      }
      return 0;
    });

    // Take top 6 posts
    const finalPosts = allPosts.slice(0, 6);

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write to JSON file
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(finalPosts, null, 2));
    console.log(`\nSaved ${finalPosts.length} posts to ${OUTPUT_PATH}`);

  } finally {
    await browser.close();
  }
}

main().catch(console.error);

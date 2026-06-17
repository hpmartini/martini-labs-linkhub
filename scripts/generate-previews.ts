import puppeteer, { type Page } from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { PRIMARY_LINKS } from '../constants';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'previews');

// Capture viewport — matches the 800px crop the hover monitor expects (4:3-ish).
const VIEWPORT = { width: 1280, height: 960 };

/**
 * Derive a stable, filesystem-safe slug from a URL's hostname,
 * e.g. https://martini-labs.de -> "martini-labs-de".
 */
export function previewSlug(url: string): string {
  const host = new URL(url).hostname.replace(/^www\./, '');
  return host.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
}

async function capture(page: Page, url: string, outFile: string): Promise<boolean> {
  try {
    console.log(`Capturing: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
    // Give late-loading hero images / fonts a moment to settle.
    await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({ path: outFile, type: 'webp', quality: 80 });
    console.log(`  -> ${path.relative(process.cwd(), outFile)}`);
    return true;
  } catch (error) {
    console.error(`  Failed: ${url}`, error);
    return false;
  }
}

async function main(): Promise<void> {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);

    let ok = 0;
    for (const link of PRIMARY_LINKS) {
      const outFile = path.join(OUTPUT_DIR, `${previewSlug(link.url)}.webp`);
      if (await capture(page, link.url, outFile)) ok++;
    }

    console.log(`\nDone: ${ok}/${PRIMARY_LINKS.length} previews generated in ${path.relative(process.cwd(), OUTPUT_DIR)}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

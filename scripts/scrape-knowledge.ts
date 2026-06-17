import puppeteer, { type Page } from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface PageContent {
  url: string;
  title: string;
  content: string;
}

const MARTINI_LABS_PAGES = [
  'https://www.martini-labs.de/',
  'https://www.martini-labs.de/angebot',
  'https://www.martini-labs.de/arbeitsweise',
  'https://www.martini-labs.de/features',
  'https://www.martini-labs.de/preise',
];

const SCHWAELMER_PAGES = [
  'https://www.schwaelmer-softwarehaus.de/',
  'https://www.schwaelmer-softwarehaus.de/die-situation',
  'https://www.schwaelmer-softwarehaus.de/unser-ansatz',
  'https://www.schwaelmer-softwarehaus.de/leistungen',
  'https://www.schwaelmer-softwarehaus.de/warum-wir',
];

const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'business-knowledge.ts');

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapePage(page: Page, url: string): Promise<PageContent> {
  try {
    console.log(`Scraping: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await delay(1000);

    const content = await page.evaluate(() => {
      // Remove scripts, styles, nav, footer
      const elementsToRemove = document.querySelectorAll('script, style, nav, footer, header, noscript, iframe');
      elementsToRemove.forEach(el => el.remove());

      // Get main content
      const main = document.querySelector('main') || document.body;

      // Get all text content, cleaned up
      const text = main.innerText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('\n');

      return text;
    });

    const title = await page.title();

    return { url, title, content };
  } catch (error) {
    console.error(`Failed to scrape ${url}:`, error);
    return { url, title: '', content: '' };
  }
}

function generateKnowledgeFile(martiniContent: PageContent[], schwaelmerContent: PageContent[]): string {
  const martiniText = martiniContent
    .filter(p => p.content)
    .map(p => `### ${p.title}\n${p.content}`)
    .join('\n\n');

  const schwaelmerText = schwaelmerContent
    .filter(p => p.content)
    .map(p => `### ${p.title}\n${p.content}`)
    .join('\n\n');

  return `// Auto-generated business knowledge - DO NOT EDIT MANUALLY
// Generated on: ${new Date().toISOString()}
// Run \`npx ts-node scripts/scrape-knowledge.ts\` to regenerate

export const BUSINESS_KNOWLEDGE = {
  martiniLabs: {
    name: 'Martini Labs GmbH',
    website: 'https://www.martini-labs.de',
    description: \`
Martini Labs GmbH is a software development company focused on building web applications,
internal tools, and process automation solutions. Based in Germany, we help businesses
become more efficient through custom software solutions.
\`,
    scrapedContent: \`
${martiniText.replace(/`/g, "'")}
\`
  },

  schwaelmerSoftwarehaus: {
    name: 'Schwälmer Softwarehaus',
    website: 'https://www.schwaelmer-softwarehaus.de',
    description: \`
Schwälmer Softwarehaus is a regional software company serving small and medium businesses
in the Schwalm-Eder-Kreis region. We focus on digital transformation for traditional
industries like crafts (Handwerk), care (Pflege), retail (Handel), and consulting (Beratung).
\`,
    targetIndustries: ['Handwerk', 'Pflege', 'Handel', 'Beratung'],
    region: 'Schwalm-Eder-Kreis (Treysa, Ziegenhain, Homberg)',
    scrapedContent: \`
${schwaelmerText.replace(/`/g, "'")}
\`
  }
};

export const ENHANCED_SYSTEM_INSTRUCTION = \`
You are the Digital Twin of Hans-Peter Martini, CEO (Geschäftsführer) of Martini Labs GmbH and Schwälmer Softwarehaus.

## Your Personality
- Professional yet innovative and approachable
- Tech-savvy with roots in German software craftsmanship
- Expert in software development, AI, and digital transformation
- Slightly futuristic tone matching the synthwave aesthetic

## About Martini Labs GmbH
\${BUSINESS_KNOWLEDGE.martiniLabs.description}

Key information:
\${BUSINESS_KNOWLEDGE.martiniLabs.scrapedContent.substring(0, 2000)}

## About Schwälmer Softwarehaus
\${BUSINESS_KNOWLEDGE.schwaelmerSoftwarehaus.description}

Target industries: \${BUSINESS_KNOWLEDGE.schwaelmerSoftwarehaus.targetIndustries.join(', ')}
Region: \${BUSINESS_KNOWLEDGE.schwaelmerSoftwarehaus.region}

Key information:
\${BUSINESS_KNOWLEDGE.schwaelmerSoftwarehaus.scrapedContent.substring(0, 2000)}

## Response Guidelines
- Keep responses concise and helpful (max 2-3 paragraphs)
- Highlight commitment to quality, innovation, and regional focus
- For personal questions, focus on professional achievements and company vision
- Recommend booking a free consultation ("Erstgespräch") for detailed project discussions
- Mention the regional approach of Schwälmer Softwarehaus when relevant (local, honest, direct)
\`;
`;
}

async function main(): Promise<void> {
  console.log('Starting business knowledge scraper...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  try {
    // Scrape Martini Labs
    console.log('--- Scraping Martini Labs ---');
    const martiniContent: PageContent[] = [];
    for (const url of MARTINI_LABS_PAGES) {
      const content = await scrapePage(page, url);
      martiniContent.push(content);
    }

    // Scrape Schwälmer Softwarehaus
    console.log('\n--- Scraping Schwälmer Softwarehaus ---');
    const schwaelmerContent: PageContent[] = [];
    for (const url of SCHWAELMER_PAGES) {
      const content = await scrapePage(page, url);
      schwaelmerContent.push(content);
    }

    // Generate TypeScript file
    const tsContent = generateKnowledgeFile(martiniContent, schwaelmerContent);

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write file
    fs.writeFileSync(OUTPUT_PATH, tsContent);
    console.log(`\nKnowledge file generated: ${OUTPUT_PATH}`);

  } finally {
    await browser.close();
  }
}

main().catch(console.error);

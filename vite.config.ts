import fs from 'fs';
import path from 'path';
import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const SYNTHWAVE_ICON_LINKS = [
  '<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-synthwave-32.png">',
  '<link rel="icon" type="image/png" sizes="192x192" href="/images/favicon-synthwave-192.png">',
  '<link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon-synthwave.png">',
].join('\n');

// Plugin to inject the synthwave icons (the Schwälmer build gets its icons from schwaelmerMetaPlugin)
function faviconPlugin(theme: string): Plugin {
  return {
    name: 'favicon-plugin',
    transformIndexHtml(html) {
      if (theme === 'schwaelmer') return html;
      return html.replace('</head>', `${SYNTHWAVE_ICON_LINKS}\n</head>`);
    }
  };
}

const SCHWAELMER_TITLE = 'Hans-Peter Martini | Schwälmer Softwarehaus';
const SCHWAELMER_DESCRIPTION =
  'Hans-Peter Martini vom Schwälmer Softwarehaus: Digitalisierung für den Mittelstand im Schwalm-Eder-Kreis, persönlich und auf Augenhöhe. Alle Links auf einen Blick.';
const SCHWAELMER_OG_DESCRIPTION =
  'Das Softwarehaus für den Schwälmer Mittelstand: die Schwalm digital neu denken und gemeinsam gestalten.';
const SCHWAELMER_OG_ALT =
  'Hans-Peter Martini, Schwälmer Softwarehaus: Die Schwalm digital neu denken und gemeinsam gestalten.';
const SCHWAELMER_ORIGIN = 'https://schwalm.it';
const SCHWAELMER_ICON_LINKS = [
  '<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-schwaelmer-32.png">',
  '<link rel="icon" type="image/png" sizes="192x192" href="/images/favicon-schwaelmer-192.png">',
  '<link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon-schwaelmer.png">',
].join('\n');

// Der Schwälmer-Build läuft unter schwalm.it; index.html trägt die Meta-Tags der Hauptseite (hpm.zone).
// Fehlt eine Ersetzung, schlägt der Build fehl, damit keine Hauptseiten-Tags unter schwalm.it landen.
function schwaelmerMetaPlugin(theme: string): Plugin {
  const active = theme === 'schwaelmer';
  const replacements: Array<[string | RegExp, string]> = [
    [/<title>[^<]*<\/title>/, `<title>${SCHWAELMER_TITLE}</title>`],
    [/(<meta name="description" content=")[^"]*"/, `$1${SCHWAELMER_DESCRIPTION}"`],
    [/(<meta property="og:title" content=")[^"]*"/, `$1${SCHWAELMER_TITLE}"`],
    [/(<meta name="twitter:title" content=")[^"]*"/, `$1${SCHWAELMER_TITLE}"`],
    [/(<meta property="og:description" content=")[^"]*"/, `$1${SCHWAELMER_OG_DESCRIPTION}"`],
    [/(<meta name="twitter:description" content=")[^"]*"/, `$1${SCHWAELMER_OG_DESCRIPTION}"`],
    [/(<meta property="og:image:alt" content=")[^"]*"/, `$1${SCHWAELMER_OG_ALT}"`],
    [/(<meta property="og:site_name" content=")[^"]*"/, '$1Schwälmer Softwarehaus"'],
    [/"jobTitle": "[^"]*"/, '"jobTitle": "CEO"'],
    [/"name": "Martini Labs GmbH",/, '"name": "Schwälmer Softwarehaus",'],
    [/"url": "https:\/\/martini-labs\.de"/, '"url": "https://schwaelmer-softwarehaus.de"'],
    [/https:\/\/hpm\.zone\/images\/og-image\.png/g, `${SCHWAELMER_ORIGIN}/images/og-image-schwaelmer.png`],
    [/https:\/\/hpm\.zone\/images\/hape_optimized\.jpeg/g, `${SCHWAELMER_ORIGIN}/images/hape_schwalm_optimized.jpeg`],
    [/https:\/\/hpm\.zone/g, SCHWAELMER_ORIGIN],
  ];
  let outDir = 'dist';

  return {
    name: 'schwaelmer-meta-plugin',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    transformIndexHtml(html) {
      if (!active) return html;
      const meta = replacements.reduce((out, [from, to]) => {
        if (!out.match(from)) throw new Error(`schwaelmer-meta-plugin: Muster nicht gefunden: ${from}`);
        return out.replace(from, to);
      }, html);
      return meta.replace('</head>', `${SCHWAELMER_ICON_LINKS}\n</head>`);
    },
    closeBundle() {
      if (!active) return;
      for (const file of ['robots.txt', 'sitemap.xml']) {
        const target = path.resolve(outDir, file);
        if (fs.existsSync(target)) {
          fs.writeFileSync(target, fs.readFileSync(target, 'utf8').replaceAll('https://hpm.zone', SCHWAELMER_ORIGIN));
        }
      }
    },
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const viteTheme = (process.env.VITE_THEME || 'synthwave').trim();
    console.log('Building with VITE_THEME:', viteTheme);

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), faviconPlugin(viteTheme), schwaelmerMetaPlugin(viteTheme)],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || process.env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || process.env.GEMINI_API_KEY),
        'process.env.FORMSPREE_ENDPOINT': JSON.stringify((env.FORMSPREE_ENDPOINT || process.env.FORMSPREE_ENDPOINT || '').trim()),
        '__VITE_THEME__': JSON.stringify(viteTheme)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});

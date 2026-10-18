// Postbuild-Schritt: rendert jede Route serverseitig (react-dom/server) und
// schreibt sie als eigenständige statische HTML-Datei nach dist/, inkl.
// route-spezifischer Meta-Tags. Macht die Seite für Crawler ohne JS lesbar
// und ersetzt das bisherige Hash-Routing durch echte Pretty-URLs.
//
// Läuft NACH dem SSR-Build (vite build --ssr src/entry-server.tsx --outDir
// dist-ssr), damit Bild-Imports im gerenderten Markup auf die gehashten
// Produktions-Asset-URLs zeigen statt auf Dev-Server-Pfade (/src/images/...).
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SITE = 'https://z9nai.ch';

const routes = [
  {
    url: '/',
    outFile: 'index.html',
    title: 'z9nai GmbH – Prozessautomatisierung mit Camunda &amp; KI',
    description:
      'Prozessautomatisierung für Schweizer Banken: Camunda 7→8-Migration, Kernbank-Integration (z. B. Finnova.Neo) und KI-gestützte Softwareentwicklung von z9nai GmbH.',
    robots: 'index,follow',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'z9nai GmbH',
      url: `${SITE}/`,
      email: 'pascal.mengelt@z9nai.ch',
      founder: { '@type': 'Person', name: 'Pascal Mengelt' },
      address: { '@type': 'PostalAddress', addressCountry: 'CH' },
      areaServed: 'CH',
      taxID: 'CHE-453.251.270',
      description:
        'Prozessautomatisierung, Domain Driven Process Orchestration und KI-gestützte Softwareentwicklung für Schweizer Banken.',
    },
  },
  {
    url: '/code-of-conduct',
    outFile: 'code-of-conduct/index.html',
    title: 'Code of Conduct | z9nai GmbH',
    description:
      'Verhaltensgrundsätze von z9nai GmbH für Zusammenarbeit, Datenschutz und Qualität in Softwareentwicklung und Prozessautomatisierungs-Projekten.',
    robots: 'index,follow',
  },
  {
    url: '/preise',
    outFile: 'preise/index.html',
    title: 'Konditionen | z9nai GmbH',
    description:
      'Preise und Konditionen von z9nai GmbH für Workshops, Beratung und Prozessautomatisierungs-Projekte.',
    robots: 'noindex,follow',
  },
  {
    url: '/orch-platform',
    outFile: 'orch-platform/index.html',
    title: 'Orch Platform – Architektur | z9nai GmbH',
    description:
      'Architektur der Orch Platform von z9nai GmbH: Prozessautomatisierung und Kernbank-Integration (z. B. Finnova.Neo) mit Camunda 8 und Orchescala.',
    robots: 'noindex,follow',
  },
];

function buildHead(route) {
  const canonical = `${SITE}${route.url}`;
  const lines = [
    `<title>${route.title}</title>`,
    `<meta name="description" content="${route.description}" />`,
    `<meta name="robots" content="${route.robots}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="z9nai GmbH" />`,
    `<meta property="og:title" content="${route.title}" />`,
    `<meta property="og:description" content="${route.description}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${SITE}/og-image.png" />`,
    `<meta property="og:locale" content="de_CH" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${route.title}" />`,
    `<meta name="twitter:description" content="${route.description}" />`,
    `<meta name="twitter:image" content="${SITE}/og-image.png" />`,
  ];
  if (route.jsonLd) {
    lines.push(`<script type="application/ld+json">${JSON.stringify(route.jsonLd)}</script>`);
  }
  return lines.join('\n    ');
}

async function main() {
  const distDir = path.resolve('dist');
  const ssrDir = path.resolve('dist-ssr');
  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html fehlt – zuerst "vite build" ausführen.');
  }
  const ssrEntryPath = path.join(ssrDir, 'entry-server.js');
  if (!fs.existsSync(ssrEntryPath)) {
    throw new Error('dist-ssr/entry-server.js fehlt – zuerst "vite build --ssr src/entry-server.tsx --outDir dist-ssr" ausführen.');
  }
  const template = fs.readFileSync(templatePath, 'utf-8');
  const { render } = await import(pathToFileURL(ssrEntryPath).href);

  for (const route of routes) {
    const appHtml = render(route.url);
    let html = template.replace(
      /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/,
      `<!-- seo:start -->\n    ${buildHead(route)}\n    <!-- seo:end -->`
    );
    html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    const outPath = path.join(distDir, route.outFile);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
    console.log(`prerendered ${route.url} -> dist/${route.outFile}`);
  }

  fs.rmSync(ssrDir, { recursive: true, force: true });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

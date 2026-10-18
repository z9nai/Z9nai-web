import { renderToStaticMarkup } from 'react-dom/server';
import App from './App';

// Rendert eine Route serverseitig zu statischem HTML für den Prerender-Build
// (siehe scripts/prerender.mjs). Keine Hydration - der Client rendert beim
// Laden normal per CSR neu (createRoot), der Markup hier dient nur Crawlern
// und dem initialen Paint.
export function render(url: string): string {
  return renderToStaticMarkup(<App ssrPath={url} />);
}

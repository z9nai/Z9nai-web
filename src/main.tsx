import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import faviconUrl from './images/favicon.ico';

// Ensure favicon is set even without a public/ folder.
const faviconLink = document.querySelector("link[rel~='icon']") || document.createElement('link');
if (!faviconLink.getAttribute('rel')) {
  faviconLink.setAttribute('rel', 'icon');
}
if (faviconLink.getAttribute('href') !== faviconUrl) {
  faviconLink.setAttribute('href', faviconUrl);
  document.head.appendChild(faviconLink);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
// Schrift selbst gehostet (keine Anfrage an Google Fonts)
import '@fontsource/hanken-grotesk/400.css';
import '@fontsource/hanken-grotesk/500.css';
import '@fontsource/hanken-grotesk/600.css';
import '@fontsource/hanken-grotesk/700.css';
import '@fontsource/hanken-grotesk/400-italic.css';
import '@fontsource/hanken-grotesk/500-italic.css';
import '@fontsource/hanken-grotesk/600-italic.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

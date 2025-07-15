import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n'
import { registerServiceWorker, showInstallPrompt } from './utils/pwa'

// Register PWA service worker
registerServiceWorker();

// Show install prompt for PWA
showInstallPrompt();

createRoot(document.getElementById("root")!).render(<App />);

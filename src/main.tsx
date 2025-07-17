import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n";
import { registerServiceWorker, showInstallPrompt } from "./utils/pwa";
import { clearCache, addNoCacheMetaTags } from "./utils/cache-buster";

// 清除缓存并添加防缓存元标签
clearCache();
addNoCacheMetaTags();

// Register PWA service worker
registerServiceWorker();

// Show install prompt for PWA
showInstallPrompt();

createRoot(document.getElementById("root")!).render(<App />);

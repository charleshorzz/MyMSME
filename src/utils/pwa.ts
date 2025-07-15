// PWA utility functions
let deferredPrompt: Event | null = null;

export const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }
};

export const showInstallPrompt = () => {
  // Listen for the beforeinstallprompt event
  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;

    // Show install button or banner after a slight delay
    // This ensures the user has had some time to interact with the site
    setTimeout(() => {
      if (!isPWAInstalled() && deferredPrompt) {
        showInstallBanner();
      }
    }, 3000);
  });

  // For iOS devices that don't support beforeinstallprompt
  if (isIOS() && !isPWAInstalled()) {
    // Wait a bit to show the iOS instructions
    setTimeout(() => {
      showIOSInstallInstructions();
    }, 5000);
  }
};

const showInstallBanner = () => {
  // Check if banner already exists
  if (document.querySelector(".install-banner")) {
    return;
  }

  const banner = document.createElement("div");
  banner.className = "install-banner";
  banner.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: #3b82f6;
      color: white;
      padding: 16px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 1000;
      font-family: system-ui, sans-serif;
    ">
      <div>
        <strong>Install MyMSME</strong>
        <p style="margin: 4px 0 0; opacity: 0.9; font-size: 14px;">Get quick access to your business dashboard</p>
      </div>
      <div>
        <button id="install-btn" style="
          background: white;
          color: #3b82f6;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          margin-right: 8px;
          cursor: pointer;
        ">Install</button>
        <button id="dismiss-btn" style="
          background: transparent;
          color: white;
          border: 1px solid rgba(255,255,255,0.3);
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
        ">×</button>
      </div>
    </div>
  `;

  document.body.appendChild(banner);

  document.getElementById("install-btn")?.addEventListener("click", () => {
    if (deferredPrompt) {
      // Cast to any since BeforeInstallPromptEvent is not in standard lib
      const prompt = deferredPrompt as any;
      prompt.prompt();
      prompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        }
        deferredPrompt = null;
      });
    }
    banner.remove();
  });

  document.getElementById("dismiss-btn")?.addEventListener("click", () => {
    banner.remove();
    // Store that the user dismissed the banner to avoid showing it again too soon
    localStorage.setItem("pwa-banner-dismissed", Date.now().toString());
  });
};

const showIOSInstallInstructions = () => {
  // Check if banner already exists or was recently dismissed
  if (document.querySelector(".ios-install-banner") || wasRecentlyDismissed()) {
    return;
  }

  const banner = document.createElement("div");
  banner.className = "ios-install-banner";
  banner.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: #3b82f6;
      color: white;
      padding: 16px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 1000;
      font-family: system-ui, sans-serif;
    ">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <strong>Install MyMSME on your iPhone</strong>
        <button id="ios-dismiss-btn" style="
          background: transparent;
          color: white;
          border: 1px solid rgba(255,255,255,0.3);
          width: 24px;
          height: 24px;
          border-radius: 12px;
          font-size: 16px;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        ">×</button>
      </div>
      <p style="margin: 4px 0 8px; opacity: 0.9; font-size: 14px;">
        Tap <span style="font-size: 18px;">⎙</span> and then "Add to Home Screen"
      </p>
    </div>
  `;

  document.body.appendChild(banner);

  document.getElementById("ios-dismiss-btn")?.addEventListener("click", () => {
    banner.remove();
    // Store that the user dismissed the banner
    localStorage.setItem("pwa-banner-dismissed", Date.now().toString());
  });
};

export const isPWAInstalled = () => {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true
  );
};

export const isIOS = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  // Check for iOS devices and avoid MSStream (IE on Windows Phone)
  return /iphone|ipad|ipod/.test(userAgent) && !(window as any).MSStream;
};

const wasRecentlyDismissed = () => {
  const lastDismissed = localStorage.getItem("pwa-banner-dismissed");
  if (!lastDismissed) return false;

  // Don't show again for 3 days
  const threeDays = 3 * 24 * 60 * 60 * 1000;
  return Date.now() - parseInt(lastDismissed) < threeDays;
};

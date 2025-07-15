const CACHE_NAME = "mymsme-v2";

// Install service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Cache the homepage and manifest by default
      return cache.addAll(["/", "/index.html", "/manifest.json"]);
    })
  );
});

// Fetch event - Cache first, then network with cache update
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if found
      if (response) {
        return response;
      }

      // Clone the request because it's a one-time use stream
      const fetchRequest = event.request.clone();

      // Make network request and cache the response
      return fetch(fetchRequest)
        .then((response) => {
          // Check if we received a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response because it's a one-time use stream
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            // Don't cache API requests or other dynamic content
            if (!event.request.url.includes("/api/")) {
              cache.put(event.request, responseToCache);
            }
          });

          return response;
        })
        .catch(() => {
          // If network request fails and it's a document request, return the offline page
          if (event.request.mode === "navigate") {
            return caches.match("/");
          }

          // Otherwise just return the error
          return new Response("Network error", {
            status: 408,
            headers: new Headers({
              "Content-Type": "text/plain",
            }),
          });
        });
    })
  );
});

// Update service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handle push notifications (for future use)
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();

    const options = {
      body: data.body || "New notification from MyMSME",
      icon: "/icon-192.png",
      badge: "/favicon.ico",
      vibrate: [100, 50, 100],
      data: {
        url: data.url || "/",
      },
    };

    event.waitUntil(
      self.registration.showNotification(
        data.title || "MyMSME Notification",
        options
      )
    );
  }
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(clients.openWindow(event.notification.data.url || "/"));
});

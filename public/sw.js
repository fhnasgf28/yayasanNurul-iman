const CACHE_NAME = "nurul-iman-pwa-v3";
const OFFLINE_URL = "/offline";

const PRECACHE_URLS = [
  "/favicon.ico",
  "/manifest.webmanifest",
  "/pwa-icon/192",
  "/pwa-icon/512",
  OFFLINE_URL
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .catch(() => undefined)
  );
  self.skipWaiting();
});

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
  self.clients.claim();
});

function shouldBypassCache(request) {
  if (request.method !== "GET") return true;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return true;
  if (url.pathname.startsWith("/api/")) return true;
  if (url.pathname.startsWith("/dashboard")) return true;
  if (url.pathname.startsWith("/login")) return true;
  if (url.pathname.startsWith("/_next/webpack-hmr")) return true;

  return false;
}

function shouldRuntimeCache(request) {
  const url = new URL(request.url);

  return (
    url.pathname === "/favicon.ico" ||
    url.pathname === "/manifest.webmanifest" ||
    url.pathname.startsWith("/pwa-icon/")
  );
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);

    if (response && response.ok && shouldRuntimeCache(request)) {
      cache.put(request, response.clone());
    }

    return response;
  } catch {
    const cached = await cache.match(request);
    return cached || Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  if (shouldBypassCache(event.request)) {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(OFFLINE_URL);
      })
    );
    return;
  }

  if (shouldRuntimeCache(event.request)) {
    event.respondWith(networkFirst(event.request));
  }
});

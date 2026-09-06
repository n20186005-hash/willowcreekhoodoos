// Willow Creek Hoodoos — minimal offline-first service worker.
// Network-first for HTML so updates roll out quickly; cache-first for
// static assets and gallery images so repeat visits feel instant.

const CACHE_VERSION = 'wch-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const PRECACHE_URLS = [
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/images/hero.jpg',
  '/zh',
  '/en',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) =>
        Promise.all(
          PRECACHE_URLS.map((url) =>
            cache
              .add(new Request(url, { cache: 'reload' }))
              .catch(() => undefined),
          ),
        ),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !key.startsWith(CACHE_VERSION))
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

const isHTMLRequest = (request) =>
  request.mode === 'navigate' ||
  (request.method === 'GET' && request.headers.get('accept')?.includes('text/html'));

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Skip non-http(s) requests (chrome-extension, data, etc.).
  if (!/^https?:$/.test(url.protocol)) return;

  // Bypass analytics & analytics endpoints — never cache them.
  if (
    url.hostname === 'www.googletagmanager.com' ||
    url.hostname === 'www.google-analytics.com' ||
    url.hostname.includes('googletagmanager') ||
    url.hostname.includes('analytics')
  ) {
    return;
  }

  if (isHTMLRequest(request)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy)).catch(() => undefined);
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match('/zh')),
        ),
    );
    return;
  }

  // Cache-first for static assets and our gallery/images.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (
              response &&
              response.status === 200 &&
              response.type === 'basic' &&
              (url.pathname.startsWith('/_next/') ||
                url.pathname.startsWith('/gallery/') ||
                url.pathname.startsWith('/icons/') ||
                url.pathname.startsWith('/images/'))
            ) {
            const copy = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy)).catch(() => undefined);
          }
          return response;
        })
        .catch(() => cached);
    }),
  );
});
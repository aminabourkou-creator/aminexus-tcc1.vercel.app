// Nexora Studio — service worker (v2)
// IMPORTANT: only exists so Chrome/Android treats the site as an installable
// PWA (required for the APK wrapping flow). It intentionally does NOT cache
// or intercept the app's HTML/JS — those must always come fresh from the
// network, otherwise phones can get stuck on an old, broken cached version
// while the site looks like it "loads" but nothing actually works.

const CACHE = 'nexora-shell-v2';
const ICONS_ONLY = [
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ICONS_ONLY)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => caches.delete(k))) // wipe every old cache, including v1
    ).then(() => caches.open(CACHE).then((c) => c.addAll(ICONS_ONLY)).catch(() => {}))
  );
  self.clients.claim();
});

// No fetch handler at all: every request (HTML, JS, CSS, Firestore, Auth)
// goes straight to the network, exactly like a normal website. This keeps
// the app installable without risking a stale/broken cached copy.

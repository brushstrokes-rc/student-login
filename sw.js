const CACHE = "bs-v4.1";
const ASSETS = ["./", "index.html", "bs.css", "bs.js", "manifest.json", "icon-192.png", "icon-512.png", "logo-brushstrokes.png", "logo-ramanujan.png"];
self.addEventListener("install", e => {
  // each file cached on its own, so one missing file never breaks the install
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(ASSETS.map(a => c.add(a).catch(() => {})))));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x))))); self.clients.claim();
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(ch => ch.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request).then(m => m || caches.match("index.html"))));
});
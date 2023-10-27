const staticDevMovie = "PWA";
const toPutInCache = ["index.html", "style.css", "offline.html", "app.js"]
const self = this;

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevMovie).then(async cache => {
      return cache.addAll(toPutInCache);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return fetch(fetchEvent.request)
      .catch(() => {
        return caches.match("offline.html")
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(staticDevMovie);
  event.waitUntil(
      caches.keys().then((cacheNames) => Promise.all(
          cacheNames.map((cacheName) => {
              if(!cacheWhitelist.includes(cacheName)){
                  return caches.delete(cacheName);
              }
          })
      ))
  )
});
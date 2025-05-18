// TournoMaster Service Worker

const CACHE_NAME = "tourno-master-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/logo192.png",
  "/logo512.png",
  "/manifest.json",
  "/static/js/main.js",
  "/static/css/main.css",  "/images/real/hero-background.jpg",
  "/images/real/group-tournament.jpg",
  "/images/real/bracket-tournament.jpg",
  "/images/real/placeholder.jpg",
  "/images/real/profile-default-1.jpg",
  "/images/real/profile-default-2.jpg",
  "/images/real/profile-default-3.jpg",
];

// Installation du service worker et mise en cache des ressources essentielles
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache ouvert");
      return cache.addAll(urlsToCache);
    })
  );
});

// Stratégie de cache : Network First avec fallback sur le cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Mise en cache de la nouvelle réponse si c'est une requête GET
        if (event.request.method === "GET") {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // En cas d'échec réseau, on sert depuis le cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // Si la requête est pour une page HTML, on peut retourner une page offline personnalisée
          if (event.request.headers.get("accept").includes("text/html")) {
            return caches.match("/offline.html");
          }

          return new Response("Contenu non disponible hors ligne", {
            status: 503,
            statusText: "Service Unavailable",
            headers: new Headers({
              "Content-Type": "text/plain",
            }),
          });
        });
      })
  );
});

// Nettoyage des anciens caches lors de l'activation d'un nouveau service worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Gestion des messages envoyés depuis l'application
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

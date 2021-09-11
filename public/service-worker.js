console.log("Hello from service worker!");

const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/index.js",
    "/styles.css",
    "/manifest.webmanifest",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png",
];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

self.addEventListener("install", function(evt) {
    evt.waitUntil(
        caches.open(DATA_CACHE_NAME).then(cache => 
           cache.addAll(FILES_TO_CACHE)
    ));

    self.skipWaiting();
});

self.addEventListener("activate", function(evt) {
    evt.waitUntil(
        caches.keys().then(keyList => {
            keyList.map(key => {
                if(key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                    console.log('Removing old cache data', key);
                    return caches.delete(key);
                }
            });
        })
    );

    self.clients.claim();
});
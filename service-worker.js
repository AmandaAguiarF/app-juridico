// self.addEventListener('install', (e) => {
//     e.waitUntil(
//         caches.open('lawease-store').then((cache) => cache.addAll([
//             '/index.html',
//             '/assets/logo.png',
//             'icons/icon-87x87.png',
//             'icons/icon-180x180.png',
//             'icons/icon-512x512.png',
//             '/styles.css',
//             '/script.js',
//             '/manifest.json'
//         ]))
//     );
// });

// self.addEventListener('fetch', (e) => {
//     e.respondWith(
//         caches.match(e.request).then((response) => response || fetch(e.request))
//     );
// });
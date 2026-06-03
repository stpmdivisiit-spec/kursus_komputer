const CACHE_NAME = 'lms-stpm-v1';
const urlsToCache = [
  './',
  './absensi_labkom.html',
  './index.html',
  './manifest.json',
  // Masukkan juga aset CSS/JS lokal jika Anda memilikinya di folder
];

// Menginstal Service Worker dan menyimpan aset ke Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Mengambil data dari Cache saat offline, atau dari internet saat online
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Gunakan cache jika ada
        }
        return fetch(event.request); // Ambil dari internet jika tidak ada di cache
      })
  );
});
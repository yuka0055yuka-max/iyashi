self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  clients.claim();
});

self.addEventListener('fetch', e => {
  // オフラインキャッシュなし（必要なら追加可能）
});
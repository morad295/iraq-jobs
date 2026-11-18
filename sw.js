// ملف Service Worker لتشغيل إشعارات الجوال ومتصفح كروم في الخلفية
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// استقبال وعرض الإشعارات على الجوال والمتصفح
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'وظائف المطاعم - العراق';
  const options = {
    body: data.body || 'تم إضافة وظيفة جديدة في المنصة، تصفحها الآن!',
    icon: 'k.png',
    badge: 'k.png',
    dir: 'rtl',
    lang: 'ar',
    vibrate: [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// فتح التطبيق عند النقر على الإشعار
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('iraq-jobs') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('https://morad295.github.io/iraq-jobs/');
      }
    })
  );
});
// Service Worker للإشعارات والتخزين المؤقت
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// استقبال وإظهار الإشعارات على الجوال ومتصفح كروم
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'وظائف المطاعم في العراق';
  const options = {
    body: data.body || 'تم إضافة وظيفة جديدة تناسب مهاراتك!',
    icon: 'k.png',
    badge: 'k.png',
    dir: 'rtl',
    lang: 'ar'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// التعامل مع النقر على الإشعار لفتح التطبيق
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://morad295.github.io/iraq-jobs/')
  );
});
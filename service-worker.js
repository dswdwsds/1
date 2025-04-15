if ('serviceWorker' in navigator) {
  // عند التسجيل
  navigator.serviceWorker.register('/service-worker.js')
    .then(function(reg) {
      console.log('Service worker registered.', reg);

      // تحقق إذا كان المستخدم فعلاً فعّل Offline Mode قبل كده
      const offlineEnabled = localStorage.getItem('offlineEnabled') === 'true';
      const statusElement = document.getElementById('status');

      // إذا الـ Offline مفعل
      if (offlineEnabled) {
        statusElement.innerText = 'Offline Mode: مفعل';
        reg.active.postMessage({ action: 'enableOffline' });
      } else {
        statusElement.innerText = 'Offline Mode: غير مفعل';
        reg.active.postMessage({ action: 'disableOffline' });
      }

      // زر التحكم في الـ Offline Mode
      const toggleButton = document.getElementById('toggleOffline');
      toggleButton.addEventListener('click', function() {
        // نقلب الحالة
        const isOfflineEnabled = localStorage.getItem('offlineEnabled') === 'true';

        if (isOfflineEnabled) {
          // إذا كان الـ Offline مفعل، نبطل تشغيله
          localStorage.setItem('offlineEnabled', 'false');
          statusElement.innerText = 'Offline Mode: غير مفعل';
          reg.active.postMessage({ action: 'disableOffline' });
        } else {
          // إذا كان الـ Offline غير مفعل، نشغله
          localStorage.setItem('offlineEnabled', 'true');
          statusElement.innerText = 'Offline Mode: مفعل';
          reg.active.postMessage({ action: 'enableOffline' });
        }
      });
    }).catch(function(err) {
      console.log('Service worker error:', err);
    });
}

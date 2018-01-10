document.getElementById('btn-notify').addEventListener('click', () => {
  Notification.requestPermission().then(permission => {
    switch (permission) {
      case 'granted':
        const text_notify = document.getElementById('text-notify').value;
        sendNotification('Simple PWA', text_notify);
        return;
      case 'denied':
        alert('BLOCKED: Please allow notifications for this origin');
    }
  });
});

/**
 * Send notification to the user
 * @param text
 */
function sendNotification(title, text) {
  new Notification(title, {
    body: text,
    icon: 'assets/imgs/android-icon-36x36.png',
    badge: 'assets/imgs/android-icon-36x36.png'
  });
}

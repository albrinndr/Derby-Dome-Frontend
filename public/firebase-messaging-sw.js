/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyBe_4rWJ6TFnKeRYLr-K3S9kQ3zTuDxQ2A",
  authDomain: "derby-dome.firebaseapp.com",
  projectId: "derby-dome",
  storageBucket: "derby-dome.appspot.com",
  messagingSenderId: "203302473457",
  appId: "1:203302473457:web:5a0ac9d699d1d80dd4a350"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);

});
self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  // Open the specified URL when the notification is clicked
  event.waitUntil(
    clients.openWindow('http://localhost:5000/')
  );
});
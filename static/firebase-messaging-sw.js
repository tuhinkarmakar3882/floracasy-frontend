self.addEventListener('notificationclick', function (event) {
  // event.notification.data.FCM_MSG.data.click_action ||
  self.clients.openWindow('https://floracasy.com/Home/Notifications', '_blank')
  event.notification.close()
})

importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-messaging.js')

const firebaseConfig = {
  apiKey: 'AIzaSyBC8dH53PFPOWqN72FHSZtjM6ekF3gbEOM',
  authDomain: 'floracasy-673ff.firebaseapp.com',
  databaseURL: 'https://floracasy-673ff.firebaseio.com',
  projectId: 'floracasy-673ff',
  storageBucket: 'floracasy-673ff.appspot.com',
  messagingSenderId: '804365562035',
  appId: '1:804365562035:web:c45a8c8ff793dfe2ec00c6',
  measurementId: 'G-RJ7XT8K378',
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

// messaging.onBackgroundMessage((payload) => {
//   const notification = payload.notification
//   const notificationTitle = notification?.title
//   const notificationOptions = {
//     // icon: '/static/icon.png',
//     vibrate: [300, 100, 400, 100, 400, 100, 400],
//     data: {
//       click_action: notification?.click_action,
//     },
//     actions: [{ action: 'open_url', title: 'Check Now' }],
//     click_action: notification?.click_action,
//   }
//
//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   )
// })

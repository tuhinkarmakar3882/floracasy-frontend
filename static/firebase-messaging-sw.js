self.addEventListener('notificationclick', function (event) {
  self.clients.openWindow(
    event?.notification?.data?.FCM_MSG?.data?.click_action ||
      'https://floracasy.com/Home/Notifications',
    '_blank'
  )
  event.notification.close()
})

importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-messaging.js')

const firebaseConfig = {
  apiKey: 'AIzaSyCzV0kNLyZFAs9R3paAKPnyt5dROSYFGOM',
  authDomain: 'ts-floracasy-love.firebaseapp.com',
  projectId: 'ts-floracasy-love',
  databaseURL: 'https://ts-floracasy-love.firebaseio.com',
  storageBucket: 'ts-floracasy-love.appspot.com',
  messagingSenderId: '806848884487',
  appId: '1:806848884487:web:52e5e287afd2f0d9fe1fa2',
  measurementId: 'G-M1MPRCJT7Z',
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

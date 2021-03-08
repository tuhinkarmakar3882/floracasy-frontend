// import firebase from 'firebase/app'
// import 'firebase/messaging'
// import { showUITip } from '~/utils/utility'
//
// export const firebaseCloudMessaging = firebase.messaging()
//
// export default function ({ store }) {
//   firebaseCloudMessaging.onMessage(async function (payload) {
//     const notification = payload.notification
//     await showUITip(
//       store,
//       notification.title,
//       notification.type || 'info',
//       notification.dismissible || true,
//       notification.timeout || 2500
//     )
//   })
// }

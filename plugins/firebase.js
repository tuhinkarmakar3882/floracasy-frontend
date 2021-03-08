import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/messaging'
import { analyticsID } from '~/environmentVariables'
import { showUITip } from '~/utils/utility'

const firebaseConfig = {
  apiKey: 'AIzaSyBC8dH53PFPOWqN72FHSZtjM6ekF3gbEOM',
  authDomain: 'floracasy-673ff.firebaseapp.com',
  databaseURL: 'https://floracasy-673ff.firebaseio.com',
  projectId: 'floracasy-673ff',
  storageBucket: 'floracasy-673ff.appspot.com',
  messagingSenderId: '804365562035',
  appId: '1:804365562035:web:c45a8c8ff793dfe2ec00c6',
  measurementId: analyticsID,
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
  process.client && firebase.analytics()
}

export const auth = firebase.auth()

export const firebaseCloudMessaging = process.client
  ? firebase.messaging()
  : undefined

export default function ({ store }) {
  process.client &&
    firebaseCloudMessaging.onMessage(async function (payload) {
      const notification = payload.notification
      await showUITip(
        store,
        notification.title,
        notification.type || 'info',
        notification.dismissible || true,
        notification.timeout || 2500
      )
    })
}

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'
import { firebaseConfig } from '~/environmentVariables'

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
  process.client && firebase.analytics()
}

export const auth = firebase.auth()

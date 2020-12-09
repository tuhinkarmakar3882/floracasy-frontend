import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'

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
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
  // process.client && firebase.analytics()
  // process.client && console.log('analytics ready')
}

export const auth = firebase.auth()
export default firebase

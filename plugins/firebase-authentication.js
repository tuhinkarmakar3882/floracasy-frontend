import { auth } from './firebase'

// todo REMOVE LOGS

export default (context, inject) => {
  const { store } = context
  inject('auth', auth)

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.info('have user', user.toJSON().displayName)
    } else {
      console.info('no user')
    }
  })
  // auth.onAuthStateChanged((user) => {
  //   console.log('Auth State Changed')
  //
  //   if (user && user !== {}) {
  //     const jsonUser = user.toJSON()
  //     const payload = {
  //       uid: jsonUser.uid,
  //       displayName: jsonUser.displayName,
  //       phoneNumber: jsonUser.phoneNumber,
  //       email: jsonUser.email,
  //       photoURL: jsonUser.photoURL,
  //       createdAt: jsonUser.createdAt,
  //       lastLoginAt: jsonUser.lastLoginAt,
  //       expirationTime: jsonUser.expirationTime,
  //     }
  //     store.dispatch('login', payload)
  //     console.log('Successfully Logged in as', jsonUser.displayName)
  //     // window.location = '/'
  //   } else {
  //     // store.dispatch('logout')
  //     console.log('No User Found...Logging out')
  //   }
  // })
}

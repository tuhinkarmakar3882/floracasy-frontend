import { auth } from './firebase'

// todo REMOVE LOGS

export default (context, inject) => {
  const { store } = context
  inject('auth', auth)
  auth.onAuthStateChanged((user) => {
    if (user && user !== {}) {
      const payload = {
        user: {
          uid: user.uid,
          displayName: user.displayName,
          phoneNumber: user.phoneNumber,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: user.createdAt,
          lastLoginAt: user.lastLoginAt,
          expirationTime: 1603910958000,
        },
      }
      store.commit('SET_USER', payload)
      console.log('User Logged on')
    } else {
      console.log('NO User!')
    }
  })
}

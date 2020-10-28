import { auth } from '~/plugins/firebase.js'

const cookieParser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    authUser: null,
  }
}

export const getters = {
  getAuthUser(state) {
    return state.authUser
  },

  isAuthenticated(state) {
    return !!state.authUser
  },
}

export const mutations = {
  SET_USER(state, user) {
    state.authUser = user
  },
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let authUser = null
    if (req.headers.cookie) {
      const parsed = cookieParser.parse(req.headers.cookie)
      try {
        authUser = JSON.parse(parsed.authUser)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('SET_USER', authUser)
  },

  login({ commit }, { user }) {
    console.log('committing..')
    commit('SET_USER', user)
    console.log('committed..')
  },

  signOut({ commit }) {
    commit('SET_USER', null)
    return auth.signOut()
  },

  // signUp({ commit }, { email, password }) {
  //   return auth.createUserWithEmailAndPassword(email, password)
  // },
  // signInWithEmail({ commit }, { email, password }) {
  //   return auth.signInWithEmailAndPassword(email, password)
  // },
}

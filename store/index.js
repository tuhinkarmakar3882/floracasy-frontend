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

  getTokens(state) {
    return state.authUser ? state.authUser.token : null
  },
}

export const mutations = {
  SET_USER(state, user) {
    state.authUser = user
  },
  SET_TOKENS(state, tokens) {
    state.authUser.token.access = tokens.access
    state.authUser.token.refresh = tokens.refresh
  },
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let authUser = null
    if (req.headers.cookie) {
      const parsed = cookieParser.parse(req.headers.cookie)
      try {
        authUser = JSON.parse(parsed.authUser)
      } catch (ignoredError) {}
    }
    commit('SET_USER', authUser)
  },

  login({ commit }, { user }) {
    commit('SET_USER', user)
  },

  updateTokens({ commit }, { tokens }) {
    commit('SET_TOKENS', tokens)
  },

  logout({ commit }) {
    commit('SET_USER', null)
    return auth.signOut()
  },
}

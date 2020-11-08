import { auth } from '~/plugins/firebase.js'

const cookieParser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    authUser: null,
    tokens: null,
  }
}

export const getters = {
  getAuthUser(state) {
    return state.authUser
  },

  isAuthenticated(state) {
    return !!state.authUser
  },

  getAuthenticationTokens(state) {
    return state.tokens
  },
}

export const mutations = {
  SET_USER(state, user) {
    state.authUser = user
  },
  SET_TOKENS(state, tokens) {
    state.tokens = tokens
  },
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let authUser = null
    let tokens = null
    if (req.headers.cookie) {
      const parsed = cookieParser.parse(req.headers.cookie)
      try {
        authUser = JSON.parse(parsed.authUser)
        tokens = JSON.parse(parsed.tokens)
      } catch (ignoredError) {}
    } else {
      console.error('NO COOKIE!', req.headers.cookie)
    }
    commit('SET_USER', authUser)
    commit('SET_TOKENS', tokens)
  },

  login({ commit }, { user }) {
    commit('SET_USER', user)
  },
  updateTokens({ commit }, { tokens }) {
    commit('SET_TOKENS', tokens)
  },
  logout({ commit }) {
    commit('SET_USER', null)
    commit('SET_TOKENS', null)
    return auth.signOut()
  },
}

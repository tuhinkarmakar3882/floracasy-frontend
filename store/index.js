import endpoints from '@/api/endpoints'
import * as secrets from '@/environmentalVariables'
import { auth } from '@/plugins/firebase.js'

export const state = () => {
  return {
    authState: null,
  }
}

export const getters = {
  getAuthState(state) {
    return state.authState
  },
}

export const mutations = {
  SET_AUTH_STATE(state, authState) {
    state.authState = authState
  },
}

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('checkTokenValidity')
  },

  async checkTokenValidity({ commit }) {
    const { data } = await this.$axios.post(
      endpoints.auth.checkToken,
      {},
      { withCredentials: true }
    )
    console.log(data.authState)
    if (data.authState) {
      const cookieSavingConfig = {
        path: '/',
        maxAge: secrets.cookieMaxAge,
      }
      this.$cookies.set('access', data.access, cookieSavingConfig)
      this.$cookies.set('refresh', data.refresh, cookieSavingConfig)
    } else {
      this.$cookies.remove('access')
      this.$cookies.remove('refresh')
    }
    commit('SET_AUTH_STATE', data.authState)
  },

  login({ commit }, { user }) {
    commit('SET_USER', user)
  },
  updateTokens({ commit }, { tokens }) {
    commit('SET_TOKENS', tokens)
  },
  logout({ commit }) {
    this.$cookies.remove('access')
    this.$cookies.remove('refresh')
    commit('SET_AUTH_STATE', false)
    return auth.signOut()
  },
}

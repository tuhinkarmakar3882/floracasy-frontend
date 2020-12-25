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
    await this.$axios.setToken('', 'Bearer')

    const { data } = await this.$axios
      .post(endpoints.auth.checkToken, {}, { withCredentials: true })

    if (data.authState) {
      const cookieSavingConfig = {
        path: '/',
        maxAge: secrets.cookieMaxAge,
      }

      await this.$cookies.set('access', data.access, cookieSavingConfig)
      await this.$cookies.set('refresh', data.refresh, cookieSavingConfig)
      await this.$axios.setToken(data.access, 'Bearer')
    } else {
      await this.$cookies.remove('access')
      await this.$cookies.remove('refresh')
    }

    commit('SET_AUTH_STATE', data.authState)
  },

  login({ commit }) {
    commit('SET_AUTH_STATE', true)
  },

  updateTokens({ commit }, { tokens }) {
    commit('SET_TOKENS', tokens)
  },

  logout({ commit }) {
    process.client && localStorage.removeItem('is_auth')
    this.$cookies.remove('access')
    this.$cookies.remove('refresh')
    commit('SET_AUTH_STATE', false)
    return auth.signOut()
  },
}

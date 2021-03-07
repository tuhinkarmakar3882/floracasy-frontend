import endpoints from '@/api/endpoints'
import * as secrets from '@/environmentVariables'
import { auth } from '@/plugins/firebase.js'

export const state = () => {
  return {
    isUserAuthenticated: null,
  }
}

export const getters = {
  getIsUserAuthenticated(state) {
    return state.isUserAuthenticated
  },
}

export const mutations = {
  SET_IS_USER_AUTHENTICATED(state, isUserAuthenticated) {
    state.isUserAuthenticated = isUserAuthenticated
  },
}

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('checkTokenValidity')
  },

  async checkTokenValidity({ commit }) {
    await this.$axios.setToken('', 'Bearer')

    try {
      const { data } = await this.$axios.post(
        endpoints.auth.checkToken,
        {},
        { withCredentials: true }
      )

      if (data?.authState) {
        const cookieSavingConfig = {
          path: '/',
          maxAge: secrets.cookieMaxAge,
        }

        await this.$cookies.set('access', data?.access, cookieSavingConfig)
        await this.$cookies.set('refresh', data?.refresh, cookieSavingConfig)
        await this.$axios.setToken(data.access, 'Bearer')
      } else {
        await this.$cookies.remove('access')
        await this.$cookies.remove('refresh')
      }

      commit('SET_IS_USER_AUTHENTICATED', data?.authState)
    } catch (e) {
      commit('SET_IS_USER_AUTHENTICATED', false)
    }
  },

  login({ commit }) {
    commit('SET_IS_USER_AUTHENTICATED', true)
  },

  updateTokens({ commit }, { tokens }) {
    commit('SET_TOKENS', tokens)
  },

  logout({ commit }) {
    process.client && localStorage.removeItem('is_auth')
    this.$cookies.remove('access')
    this.$cookies.remove('refresh')
    commit('SET_IS_USER_AUTHENTICATED', false)
    return auth.signOut()
  },
}

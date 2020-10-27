import axios from 'axios'

export const state = () => ({
  authUser: null,
})

export const mutations = {
  SET_USER(state, user) {
    state.authUser = user
  },
  ON_AUTH_STATE_CHANGED_MUTATION(state, { authUser, claims }) {
    const { uid, email, emailVerified, displayName, photoURL } = authUser
    state.authUser = {
      uid,
      displayName,
      email,
      emailVerified,
      photoURL: photoURL || null, // results in photoURL being null for server auth
      isAdmin: claims.custom_claim,
    }
  },
}

export const actions = {
  async nuxtServerInit({ dispatch }, { res }) {
    if (res && res.locals && res.locals.user) {
      const { allClaims: claims, idToken: token, ...authUser } = res.locals.user

      await dispatch('onAuthStateChangedAction', {
        authUser,
        claims,
        token,
      })
    }
  },

  async login({ commit }, { username, password }) {
    try {
      const { data } = await axios.post('/api/login', { username, password })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout({ commit }) {
    await axios.post('/api/logout')
    commit('SET_USER', null)
  },

  async onAuthStateChangedAction({ commit, dispatch }, { authUser, claims }) {
    if (!authUser) {
      await dispatch('cleanupAction')
      return
    }

    // you can request additional fields if they are optional (e.g. photoURL)
    const { uid, email, emailVerified, displayName, photoURL } = authUser

    commit('SET_USER', {
      uid,
      email,
      emailVerified,
      displayName,
      photoURL, // results in photoURL being undefined for server auth
      // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
      isAdmin: claims.custom_claim,
    })
  },
}

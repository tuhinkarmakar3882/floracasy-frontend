import endpoints from '@/api/endpoints'

export const state = () => {
  return {
    user: null,
  }
}

export const getters = {
  getUser(state) {
    return state.user
  },
}

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_USER_ABOUT(state, about) {
    state.user.about = about
  },
  SET_USER_DESIGNATION(state, designation) {
    state.user.designation = designation
  },
}

export const actions = {
  async fetchData({ commit }) {
    const { data } = await this.$axios.get(endpoints.auth.whoAmI, {})
    commit('SET_USER', data)
    const { details: userdata } = await this.$axios
      .get(endpoints.profile_statistics.profileData, {
        params: {
          uid: this.state.UserManagement.user.uid,
        },
      })
      .then(({ data }) => data)
    commit('SET_USER_ABOUT', userdata.about)
    commit('SET_USER_DESIGNATION', userdata.designation)
  },

  setUserData({ commit }, { user }) {
    commit('SET_USER', user)
  },

  setUserAbout({ commit }, { about }) {
    commit('SET_USER_ABOUT', about)
  },

  setUserDesignation({ commit }, { designation }) {
    commit('SET_USER_DESIGNATION', designation)
  },
}

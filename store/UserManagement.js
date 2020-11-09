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
}

export const actions = {
  async fetchData({ commit }) {
    const { data } = await this.$axios.get(endpoints.auth.whoAmI, {})
    console.log(data)
    commit('SET_USER', data)
  },
}

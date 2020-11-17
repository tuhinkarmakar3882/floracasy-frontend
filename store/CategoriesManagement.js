import endpoints from '@/api/endpoints'

export const state = () => {
  return {
    categories: null,
  }
}

export const getters = {
  getCategories(state) {
    return state.categories
  },
}

export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
}

export const actions = {
  async fetchCategories({ commit }) {
    const { data } = await this.$axios.$get(endpoints.categories.fetch)
    commit('SET_CATEGORIES', data)
  },
}

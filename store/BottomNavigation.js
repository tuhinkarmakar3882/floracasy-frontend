export const state = () => ({
  menuOptions: [
    {
      id: 0,
      text: 'Home',
      icon: 'mdi-home',
      color: '#6360f8',
      route: '/Home/Dashboard',
    },
    {
      id: 1,
      text: 'Profile',
      icon: 'mdi-account',
      color: '#6360f8',
      route: '/Home/Account/Details',
    },
    {
      id: 2,
      text: 'Create',
      icon: 'mdi-plus-circle',
      color: '#6360f8',
      route: '/Home/Blogs/Create',
    },
    {
      id: 3,
      text: 'Notification',
      icon: 'mdi-bell',
      color: '#6360f8',
      route: '/Home/Notifications',
    },
    {
      id: 4,
      text: 'More',
      icon: 'mdi-dots-horizontal-circle',
      color: '#6360f8',
      route: '/Home/MoreOptions',
    },
  ],
  newContentAvailable: [false, false, false, false, false],
  activeLink: 0,
})

export const mutations = {
  SET_ACTIVE_LINK(state, linkPosition) {
    state.activeLink = linkPosition
  },

  SET_NEW_CONTENT_AVAILABLE(state, newState) {
    state.newContentAvailable[newState.position] = newState.value
  },
}

export const actions = {
  async update({ commit }, { linkPosition }) {
    await commit('SET_ACTIVE_LINK', linkPosition)
  },

  async updateNewContent({ commit }, newState) {
    await commit('SET_NEW_CONTENT_AVAILABLE', newState)
  },
}

export const getters = {
  getMenuOptions(state) {
    return state.menuOptions
  },
  getNewContentAvailableInfo(state) {
    return state.newContentAvailable
  },
  getActiveLink(state) {
    return state.activeLink
  },
}

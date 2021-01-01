import { navigationRoutes } from '~/navigation/navigationRoutes'

export const state = () => ({
  bottomNavMenuOptions: [
    {
      id: 0,
      text: 'Home',
      icon: 'mdi-home-outline',
      activeIcon: 'mdi-home',
      color: '#6360f8',
      route: navigationRoutes.Home.DashBoard,
    },
    {
      id: 1,
      text: 'Community',
      icon: 'mdi-earth',
      activeIcon: 'mdi-earth',
      color: '#6360f8',
      route: navigationRoutes.Home.Community.index,
    },
    {
      id: 2,
      text: 'Create',
      icon: 'mdi-plus-circle-outline',
      activeIcon: 'mdi-plus-circle',
      color: '#6360f8',
      route: navigationRoutes.Home.Blogs.Create.index,
    },
    {
      id: 3,
      text: 'Notification',
      icon: 'mdi-bell-outline',
      activeIcon: 'mdi-bell',
      color: '#6360f8',
      route: navigationRoutes.Home.Notifications.index,
    },
    {
      id: 4,
      text: 'More',
      icon: 'mdi-dots-horizontal-circle-outline',
      activeIcon: 'mdi-dots-horizontal-circle',
      color: '#6360f8',
      route: navigationRoutes.Home.MoreOptions.index,
    },
  ],

  topNavOptions: [
    {
      id: 0,
      text: 'Messages',
      icon: 'mdi-message-text-outline',
      activeIcon: 'mdi-message-text',
      color: '#6360f8',
      route: navigationRoutes.Home.Messages.index,
    },
    {
      id: 1,
      text: 'Profile',
      icon: 'mdi-account-outline',
      activeIcon: 'mdi-account',
      color: '#6360f8',
      route: navigationRoutes.Home.Account.Details,
    },
  ],

  newContentAvailable: [false, false, false, false, false],

  activeLink: -1,
  topNavActiveLink: -1,
})

export const mutations = {
  SET_BOTTOM_ACTIVE_LINK(state, linkPosition) {
    state.activeLink = linkPosition
  },

  SET_TOP_ACTIVE_LINK(state, linkPosition) {
    state.topNavActiveLink = linkPosition
  },

  SET_NEW_CONTENT_AVAILABLE(state, newState) {
    state.newContentAvailable[newState.position] = newState.value
  },
}

export const actions = {
  async updateBottomNavActiveLink({ commit }, { linkPosition }) {
    await commit('SET_BOTTOM_ACTIVE_LINK', linkPosition)
  },

  async updateTopNavActiveLink({ commit }, { linkPosition }) {
    await commit('SET_TOP_ACTIVE_LINK', linkPosition)
  },

  async updateNewContent({ commit }, newState) {
    await commit('SET_NEW_CONTENT_AVAILABLE', newState)
  },
}

export const getters = {
  getBottomNavMenuOptions(state) {
    return state.bottomNavMenuOptions
  },
  getTopNavMenuOptions(state) {
    return state.topNavOptions
  },
  getNewContentAvailableInfo(state) {
    return state.newContentAvailable
  },
  getActiveLink(state) {
    return state.activeLink
  },
}

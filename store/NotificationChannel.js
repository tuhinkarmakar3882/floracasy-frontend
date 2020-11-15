import endpoints from '@/api/endpoints'

export const state = () => {
  return {
    notificationChannelId: null,
  }
}

export const getters = {
  getNotificationChannelId(state) {
    return state.notificationChannelId
  },
}

export const mutations = {
  SET_NOTIFICATION_CHANNEL_ID(state, notificationChannelId) {
    state.notificationChannelId = notificationChannelId
  },
}

export const actions = {
  async fetchNotificationChannelId({ commit }) {
    const { data } = await this.$axios.get(
      endpoints.notification_system.getNotificationChannelId
    )
    commit('SET_NOTIFICATION_CHANNEL_ID', data.channelId)
  },
}

export const state = () => {
  return {
    socketMessage: '',
    socketMessageType: '',
  }
}
let timeout
export const getters = {
  getSocketMessage(state) {
    return state.socketMessage
  },
  getSocketMessageType(state) {
    return state.socketMessageType
  },
}

export const mutations = {
  SET_SOCKET_MESSAGE(state, newSocketMessage) {
    state.socketMessage = newSocketMessage
  },
  SET_SOCKET_MESSAGE_TYPE(state, newSocketMessageType) {
    state.socketMessageType = newSocketMessageType
  },
}

export const actions = {
  updateSocketMessage({ commit }, payload) {
    clearTimeout(timeout)
    commit('SET_SOCKET_MESSAGE', payload.message)

    payload.notificationType
      ? commit('SET_SOCKET_MESSAGE_TYPE', payload.notificationType)
      : commit('SET_SOCKET_MESSAGE_TYPE', 'generic')

    if (this.state.SocketHandler.socketMessage && payload.dismissible) {
      timeout = setTimeout(() => {
        commit('SET_SOCKET_MESSAGE', '')
      }, payload.timeout || 2500)
    }
  },
}

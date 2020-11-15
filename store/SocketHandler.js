export const state = () => {
  return {
    socketMessage: '',
  }
}
let timeout
export const getters = {
  getSocketMessage(state) {
    return state.socketMessage
  },
}

export const mutations = {
  SET_SOCKET_MESSAGE(state, newSocketMessage) {
    state.socketMessage = newSocketMessage
  },
}

export const actions = {
  updateSocketMessage({ commit }, newSocketMessage) {
    clearTimeout(timeout)
    commit('SET_SOCKET_MESSAGE', newSocketMessage)
    if (this.state.SocketHandler.socketMessage) {
      timeout = setTimeout(() => {
        commit('SET_SOCKET_MESSAGE', '')
      }, 2500)
    }
  },
}

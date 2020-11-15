export default async ({ store }) => {
  if (process.client && store.state.authState) {
    const notificationChannelId = await store.getters[
      'NotificationChannel/getNotificationChannelId'
    ]
    const backendUrl = 'localhost:8000'

    // const wsStart = window.location.protocol === 'https:' ? 'wss://' : 'wss://'
    const wsStart = 'ws://'

    const endpoint =
      wsStart +
      backendUrl +
      '/ws/notification_socket/' +
      notificationChannelId +
      '/'

    const socket = new WebSocket(endpoint)

    socket.onopen = function (e) {
      console.log('open', e)
    }

    socket.onmessage = async function (e) {
      const data = JSON.parse(e.data)
      await store.dispatch('BottomNavigation/updateNewContent', {
        position: 3,
        value: true,
      })
      data.action === 'generic' &&
        (await store.dispatch(
          'SocketHandler/updateSocketMessage',
          data.message
        ))
    }

    socket.onerror = function (e) {
      console.log('error', e)
    }

    socket.onclose = function (e) {
      console.error('socket closed unexpectedly', e)
    }
  }
}

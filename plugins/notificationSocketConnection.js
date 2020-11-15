import * as secrets from '~/environmentalVariables'

export default async ({ store }) => {
  if (process.client && store.state.authState) {
    const notificationChannelId = await store.getters[
      'NotificationChannel/getNotificationChannelId'
    ]
    const endpoint = secrets.websocketUrl + notificationChannelId + '/'

    const socket = new WebSocket(endpoint)

    socket.onopen = async () => {
      await store.dispatch('SocketHandler/updateSocketMessage', {
        message: 'Connected',
        notificationType: 'success',
      })
    }

    socket.onmessage = async (e) => {
      const data = JSON.parse(e.data)
      await store.dispatch('BottomNavigation/updateNewContent', {
        position: 3,
        value: true,
      })
      await store.dispatch('SocketHandler/updateSocketMessage', {
        message: data.message,
        notificationType: data.action,
      })
    }

    socket.onerror = (e) => {
      console.log('error', e)
    }

    socket.onclose = async (e) => {
      await store.dispatch('SocketHandler/updateSocketMessage', {
        message: 'Trouble connect to Server. Please Refresh.',
        notificationType: 'error',
      })
    }
  }
}

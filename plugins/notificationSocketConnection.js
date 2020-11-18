import ReconnectingWebSocket from 'reconnecting-websocket'
import * as secrets from '~/environmentalVariables'

export default async ({ store }) => {
  if (process.client && store.state.authState) {
    await store.dispatch('SocketHandler/updateSocketMessage', {
      message: 'Connecting to Server...',
      notificationType: 'info',
      dismissible: true,
    })
    const notificationChannelId = await store.getters[
      'NotificationChannel/getNotificationChannelId'
    ]
    const endpoint = secrets.websocketUrl + notificationChannelId + '/'
    const connectionOptions = {
      maxReconnectionDelay: 10000,
      minReconnectionDelay: 1000 + Math.random() * 4000,
      reconnectionDelayGrowFactor: 1.3,
      minUptime: 5000,
      connectionTimeout: 4000,
    }

    const reconnectingSocket = new ReconnectingWebSocket(
      endpoint,
      [],
      connectionOptions
    )

    reconnectingSocket.onopen = async () => {
      await store.dispatch('SocketHandler/updateSocketMessage', {
        message: 'Connected',
        notificationType: 'success',
        dismissible: true,
      })
    }

    reconnectingSocket.onmessage = async (e) => {
      const data = JSON.parse(e.data)
      await store.dispatch('BottomNavigation/updateNewContent', {
        position: 3,
        value: true,
        dismissible: true,
      })
      await store.dispatch('SocketHandler/updateSocketMessage', {
        message: data.message,
        notificationType: data.action,
        dismissible: true,
      })
    }

    // reconnectingSocket.onerror = async (e) => {
    //   await store.dispatch('SocketHandler/updateSocketMessage', {
    //     message: 'Disconnected. Please Refresh',
    //     notificationType: 'error',
    //     dismissible: false,
    //   })
    // }

    reconnectingSocket.onclose = async () => {
      await store.dispatch('SocketHandler/updateSocketMessage', {
        message: 'Connection Lost. Reconnecting...',
        notificationType: 'reconnecting',
        dismissible: false,
      })
    }
  }
}

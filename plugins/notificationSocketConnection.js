import ReconnectingWebSocket from 'reconnecting-websocket'
import * as secrets from '~/environmentVariables'
import { showUITip } from '~/utils/utility'

export default async ({ store, $cookies }) => {
  if (process.client && store.state.isUserAuthenticated) {
    await showUITip(store, 'Connecting to Server...', 'info', false)

    const notificationChannelId = await store.getters[
      'NotificationChannel/getNotificationChannelId'
    ]

    // eslint-disable-next-line
    const endpoint = `${secrets.notificationWebsocketBase}notification_socket/${notificationChannelId}/?access=${$cookies.get('access')}`

    const connectionOptions = {
      maxReconnectionDelay: 10000,
      minReconnectionDelay: 1000 + Math.random() * 4000,
      reconnectionDelayGrowFactor: 1.3,
      minUptime: 5000,
      connectionTimeout: 4000,
      maxEnqueuedMessages: 50,
    }

    const notificationSocket = new ReconnectingWebSocket(
      endpoint,
      [],
      connectionOptions
    )

    notificationSocket.onopen = async () => {
      await showUITip(store, 'Connected', 'success', true)
    }

    notificationSocket.onmessage = async (e) => {
      const { message, action: notificationType, timeout } = JSON.parse(e.data)

      await store.dispatch('NavigationState/updateNewContent', {
        position: 3,
        value: true,
        dismissible: true,
      })

      await showUITip(store, message, notificationType, true, timeout || 2500)
    }

    notificationSocket.onclose = async () => {
      await showUITip(
        store,
        'Connection Lost. Reconnecting...',
        'reconnecting',
        true
      )
    }
  }
}

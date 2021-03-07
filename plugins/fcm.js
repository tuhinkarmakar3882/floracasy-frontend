import { firebaseCloudMessaging } from '~/plugins/firebase'
import { showUITip } from '~/utils/utility'

export default function ({ store }) {
  firebaseCloudMessaging().onMessage(async function (payload) {
    const notification = payload.notification

    await showUITip(
      store,
      notification.title,
      notification.type || 'info',
      notification.dismissible || true,
      notification.timeout || 2500
    )
  })
}

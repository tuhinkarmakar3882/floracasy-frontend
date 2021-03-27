<template>
  <div
    :style="[showBanner ? { height: '300px' } : {}]"
    class="request-permission-dialog text-center px-2"
  >
    <section v-if="maybeLater">
      <h5 class="text-center mb-4">No Problem</h5>
      <p class="text-center mb-4">
        Tip: You can always change this setting later in the
        <nuxt-link :to="navigationRoutes.Home.MoreOptions.Preferences.index">
          Preferences
        </nuxt-link>
      </p>
    </section>

    <section v-else-if="success">
      <h5 class="my-4">Success!</h5>
    </section>

    <section v-else>
      <h5 class="my-4">Would you like to receive notifications?</h5>
      <div class="actions my-3">
        <button
          v-ripple
          class="secondary-btn mb-4 mx-2"
          @click="requestPermission"
        >
          Yes
        </button>
        <button
          v-ripple
          class="secondary-outlined-btn mb-4 mx-2"
          @click="showMaybeAndCollapse"
        >
          May be later
        </button>
      </div>
      <p class="mb-3">
        You can always change this setting later in the
        <nuxt-link :to="navigationRoutes.Home.MoreOptions.Preferences.index">
          Preferences
        </nuxt-link>
      </p>
    </section>
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'
import endpoints from '~/api/endpoints'
import { LogAnalyticsEvent, showUITip } from '~/utils/utility'
import { vapidKey } from '~/environmentVariables'

export default {
  name: 'RequestPermissionDialog',

  data() {
    return {
      navigationRoutes,
      showBanner: false,
      success: false,
      maybeLater: false,
      computedHeight: 0,
      fcm: undefined,
    }
  },
  async mounted() {
    if (
      Notification.permission !== 'granted' &&
      Notification.permission !== 'denied'
    ) {
      const hideNotificationConsent = localStorage.getItem(
        'hide-notification-consent'
      )
      this.showBanner = hideNotificationConsent
        ? hideNotificationConsent < 0
        : true

      hideNotificationConsent &&
        localStorage.setItem(
          'hide-notification-consent',
          (parseInt(hideNotificationConsent) - 1).toString()
        )
    }

    if (Notification.permission === 'granted') await this.setupFCM()
  },

  methods: {
    requestPermission() {
      Notification.requestPermission().then((permission) => {
        switch (permission) {
          case 'granted':
            this.success = true
            this.maybeLater = false
            LogAnalyticsEvent('notifications_activated')
            this.setupFCM()
            this.hideBanner()
            break
          case 'denied':
            this.success = false
            this.maybeLater = true
            this.hideBanner()
            break
        }
      })
    },

    async setupFCM() {
      try {
        const { firebaseCloudMessaging } = require('~/plugins/fcm')
        const token = await firebaseCloudMessaging?.getToken({
          vapidKey,
        })
        token && (await this.sendToServer(token))
      } catch (e) {
        await showUITip(this.$store, 'Something Went Wrong', 'error')
      }
    },

    async sendToServer(token) {
      try {
        await this.$axios.$post(endpoints.notification_system.saveFCMToken, {
          registrationToken: token,
          deviceType: 'web',
        })
        if (!localStorage.getItem('already-shown')) {
          await showUITip(this.$store, 'Notifications are Active', 'success')
          localStorage.setItem('already-shown', 'true')
        }
      } catch (e) {
        await showUITip(
          this.$store,
          'Unable to Activate Realtime Notifications...',
          'error'
        )
      }
    },

    showMaybeAndCollapse() {
      this.success = false
      this.maybeLater = true
      localStorage.setItem('hide-notification-consent', '120')
      this.hideBanner()
      LogAnalyticsEvent('no_opinion_on_notifications')
    },

    hideBanner() {
      setTimeout(() => {
        this.showBanner = false
      }, 2500)
    },
  },
}
</script>

<style lang="scss" scoped>
.request-permission-dialog {
  * {
    transition: all 0.3s ease-in-out;
  }

  background-color: #191928;
  height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 14px;
  }

  .actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;

    button {
      min-width: auto;
      width: 148px;
    }
  }
}
</style>

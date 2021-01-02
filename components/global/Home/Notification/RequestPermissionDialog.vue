<template>
  <div
    ref="banner-block"
    :key="'banner-item'"
    class="banner text-center mb-6 px-2"
    :style="[showBanner ? { height: '300px' } : {}]"
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
          v-ripple=""
          class="secondary-btn mb-4 mx-2"
          @click="requestPermission"
        >
          Yes
        </button>
        <button
          v-ripple=""
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

export default {
  name: 'RequestPermissionDialog',

  data() {
    return {
      navigationRoutes,
      showBanner: false,
      success: false,
      maybeLater: false,
      computedHeight: 0,
    }
  },
  mounted() {
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
  },

  methods: {
    requestPermission() {
      Notification.requestPermission().then((permission) => {
        switch (permission) {
          case 'granted':
            this.success = true
            this.maybeLater = false
            break
          case 'denied':
            this.success = false
            this.maybeLater = true
            break
        }
        this.hideBanner()
      })
    },
    showMaybeAndCollapse() {
      this.success = false
      this.maybeLater = true
      localStorage.setItem('hide-notification-consent', '2')
      this.hideBanner()
    },

    hideBanner() {
      setTimeout(() => {
        this.showBanner = false
      }, 2500)
    },
  },
}
</script>

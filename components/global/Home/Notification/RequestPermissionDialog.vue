<template>
  <section
    ref="banner-block"
    :key="'banner-item'"
    class="banner text-center mb-6 px-2"
    :style="[showBanner ? { height: '300px' } : {}]"
  >
    <h5 v-if="!maybe" class="my-4">Would you like to receive notifications?</h5>
    <div v-if="!maybe" class="actions my-3">
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
    <p v-if="!maybe" class="mb-3">
      You can always change this setting later in the
      <nuxt-link :to="navigationRoutes.Home.MoreOptions.Preferences.index">
        Preferences
      </nuxt-link>
    </p>

    <h5 v-if="maybe" class="text-center mb-4">No Problem</h5>
    <p v-if="maybe" class="text-center mb-4">
      Tip: You can always change this setting later in the
      <nuxt-link :to="navigationRoutes.Home.MoreOptions.Preferences.index">
        Preferences
      </nuxt-link>
    </p>
  </section>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'RequestPermissionDialog',

  data() {
    return {
      navigationRoutes,
      showBanner: false,
      maybe: false,
      computedHeight: 0,
    }
  },
  mounted() {
    this.initHeight()
    if (Notification.permission !== 'granted') {
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
      Notification.requestPermission()
        .then((permission) => console.log(permission))
        .catch((error) => console.error(error))
    },
    showMaybeAndCollapse() {
      this.maybe = true

      setTimeout(() => {
        this.showBanner = false
      }, 2500)
      localStorage.setItem('hide-notification-consent', '2')
    },

    initHeight() {
      this.$refs['banner-block'].style.height = 'auto'
      this.$refs['banner-block'].style.position = 'absolute'
      this.$refs['banner-block'].style.visibility = 'hidden'
      this.$refs['banner-block'].style.display = 'block'

      this.computedHeight = getComputedStyle(this.$refs['banner-block']).height
      this.computedHeight =
        (parseInt(this.computedHeight.replace('px', '')) + 40).toString() + 'px'

      this.$refs['banner-block'].style.position = null
      this.$refs['banner-block'].style.visibility = null
      this.$refs['banner-block'].style.display = null
      this.$refs['banner-block'].style.height = 0
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.notification-item {
  display: grid;
  align-items: center;
  grid-template-columns: 10% 90%;
  grid-column-gap: $standard-unit;
  padding: $medium-unit;

  p {
    font-family: $Nunito-Sans;
    font-size: $milli-unit;
    align-self: flex-start;

    .message {
      color: #cacaca;
      font-family: $Raleway;
      font-size: $standard-unit;
    }
  }

  .dot {
    display: inline-block;
    width: $nano-unit + $single-unit;
    height: $nano-unit + $single-unit;
    border-radius: 50%;
    background-color: $success-light;
    margin-left: $nano-unit;
    margin-bottom: $single-unit;
  }

  &:nth-child(even) {
    background-color: $nav-bar-bg;
  }
}
</style>

<template>
  <div class="index-page">
    <client-only>
      <LazyMobileLandingPage v-if="mobileView" />

      <LazyDesktopLandingPage v-else />
    </client-only>
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'WelcomePage',
  layout: 'FullScreen',
  middleware: 'isNotAuthenticated',

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Welcome to Floracasy',
      mobileView: true,
    }
  },

  mounted() {
    this.updateMobileViewSetting()
    window.onresize = this.updateMobileViewSetting
  },

  beforeDestroy() {
    window.onresize = () => {}
  },

  methods: {
    updateMobileViewSetting() {
      this.mobileView = window.innerWidth <= 1024
    },
  },
  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

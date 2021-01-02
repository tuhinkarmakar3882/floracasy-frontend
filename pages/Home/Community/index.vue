<template>
  <div class="community-page">
    <p class="text-center premium">
      <span class="mdi mdi-earth" />
      <br />
      <span>Community</span>
    </p>
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'Community',
  layout: 'MobileApp',
  middleware: 'isAuthenticated',

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Community',
    }
  },

  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: 1,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
.community-page {
  min-height: calc(100vh - 112px);
  display: grid;
  place-items: center;
}
</style>

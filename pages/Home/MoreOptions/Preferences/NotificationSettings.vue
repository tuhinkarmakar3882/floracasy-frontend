<template>
  <AppFeel
    class="notification-settings-page"
    :on-back="navigationRoutes.Home.MoreOptions.Preferences.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main"></template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'NotificationSettings',
  components: { AppFeel },
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Notification Settings',
    }
  },
  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

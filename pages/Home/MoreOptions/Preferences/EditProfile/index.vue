<template>
  <AppFeel
    class="preferences-page"
    :on-back="navigationRoutes.Home.MoreOptions.Preferences.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <h1>This is my super duper Edit Profile Page</h1>
      <p>And I love it!</p>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'EditProfile',
  components: { AppFeel },
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Edit Profile',
    }
  },
  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

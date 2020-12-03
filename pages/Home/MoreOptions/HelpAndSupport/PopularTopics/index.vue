<template>
  <AppFeel
    class="help-and-support-page"
    :on-back="navigationRoutes.Home.MoreOptions.HelpAndSupport.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <h6>This is my super duper {{ pageTitle }} Page</h6>
      <p>And I Love it</p>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
export default {
  name: 'PopularTopics',
  components: { AppFeel },
  middleware: 'isAuthenticated',
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Popular Topics',
    }
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

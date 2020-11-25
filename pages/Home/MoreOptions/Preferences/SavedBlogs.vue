<template>
  <AppFeel
    class="saved-blogs-page"
    :on-back="navigationRoutes.Home.MoreOptions.Preferences.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>
    <template slot="main">
      <h4 class="heading-title">Saved Blogs</h4>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'SavedBlogs',
  components: { AppFeel },
  middleware: 'isAuthenticated',
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Saved Blogs',
    }
  },
  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

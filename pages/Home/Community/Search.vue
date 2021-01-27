<template>
  <AppFeel
    :on-back="navigationRoutes.Home.Community.index"
    class="community-search-page"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <LazySearchBar
        class="px-4 mt-5 mb-4"
        :text="$route.query.query"
        :detail-screen="navigationRoutes.Home.Community.Search"
        use-replace-navigation
      />
      <pre>{{ $route.query.query }}</pre>
    </template>
  </AppFeel>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'Search',
  middleware: 'isAuthenticated',

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Search',
    }
  },

  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: -1,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })
  },

  methods: {},

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

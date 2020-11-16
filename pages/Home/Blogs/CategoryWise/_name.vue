<template>
  <AppFeel
    custom-header
    class="about-page"
    :on-back="navigationRoutes.Home.DashBoard"
  >
    <template slot="app-bar-custom-header">
      <h5
        v-ripple
        class="mdi mdi-arrow-left"
        @click="
          $router.push({
            path: navigationRoutes.Home.DashBoard,
            query: {
              tabNumber: 2,
            },
          })
        "
      />
      <p class="ml-6">
        {{ pageTitle }}
      </p>
    </template>
    <template slot="main">
      <h4 class="heading-title">{{ $route.params.name }}</h4>
      <InfiniteScrollingBlogLists :category="$route.params.name" />
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import InfiniteScrollingBlogLists from '@/components/Home/Dashboard/InfiniteScrollingBlogLists'

export default {
  name: 'CategoryWise',
  components: { InfiniteScrollingBlogLists, AppFeel },
  middleware: 'isAuthenticated',
  data() {
    return {
      navigationRoutes,
      pageTitle: this.$route.params.name,
    }
  },
  mounted() {},

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

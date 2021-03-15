<template>
  <AppFeel
    :on-back="navigationRoutes.Home.DashBoard"
    :prev-url-path="prevURL"
    class="about-page"
    dynamic-back
  >
    <template v-slot:app-bar-title>{{ pageTitle }}</template>

    <template v-slot:main>
      <h4 class="heading-title">{{ $route.params.name }}</h4>
      <InfiniteScrollingBlogLists :category="$route.params.name" />
    </template>

    <template v-slot:footer>
      <InFeedAd use-small-ads />
    </template>
  </AppFeel>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'CategoryWise',
  components: {
    InfiniteScrollingBlogLists: () =>
      import('@/components/global/Home/Dashboard/InfiniteScrollingBlogLists'),
    AppFeel: () => import('@/components/global/Layout/AppFeel'),
  },
  middleware: 'isAuthenticated',

  asyncData({ from: prevURL }) {
    return { prevURL }
  },

  data() {
    return {
      navigationRoutes,
      pageTitle: this.$route.params.name,
      prevURL: null,
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

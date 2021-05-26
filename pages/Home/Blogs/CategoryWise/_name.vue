<template>
  <AppFeel
    :on-back="navigationRoutes.Home.DashBoard"
    :prev-url-path="prevURL"
    class="about-page"
    dynamic-back
  >
    <template #app-bar-title>{{ pageTitle }}</template>

    <template #main>
      <h4 class="heading-title">{{ $route.params.name }}</h4>
      <InfiniteScrollingBlogLists :category="$route.params.name" />
    </template>

    <template #footer>
      <InFeedAd class="mt-8" />
    </template>
  </AppFeel>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import InfiniteScrollingBlogLists from '~/components/Mobile/View/Dashboard/InfiniteScrollingBlogLists'
import InFeedAd from '~/components/Common/GoogleAdsense/InFeedAd'
import AppFeel from '~/components/Layout/AppFeel'

export default {
  name: 'CategoryWise',
  components: { AppFeel, InFeedAd, InfiniteScrollingBlogLists },
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

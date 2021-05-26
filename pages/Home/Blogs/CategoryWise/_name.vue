<template>
  <div class="category-wise-blogs">
    <AppBarHeader
      :fallback-page="fallbackPage"
      :previous-page="previousPage"
      no-right-padding
    >
      <template #title>{{ pageTitle }}</template>
    </AppBarHeader>

    <main>
      <h4 class="heading-title">{{ $route.params.name }}</h4>
      <InfiniteScrollingBlogLists :category="$route.params.name" />
      <InFeedAd class="mt-8" />
    </main>
  </div>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import InfiniteScrollingBlogLists from '~/components/Mobile/View/Dashboard/InfiniteScrollingBlogLists'
import InFeedAd from '~/components/Common/GoogleAdsense/InFeedAd'
import AppBarHeader from '~/components/Layout/AppBarHeader'

export default {
  name: 'CategoryWise',
  components: { AppBarHeader, InFeedAd, InfiniteScrollingBlogLists },
  middleware: 'isAuthenticated',

  asyncData({ from: previousPage }) {
    return { previousPage }
  },
  data() {
    return {
      previousPage: undefined,
      fallbackPage: navigationRoutes.Home.DashBoard,
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

<style lang="scss" scoped>
@import 'assets/all-variables';

.category-wise-blogs {
  main {
    max-width: $large-screen;
    margin: auto;
  }
}
</style>

<template>
  <AppFeel
    custom-header
    class="about-page"
    :on-back="navigationRoutes.Home.DashBoard"
  >
    <template slot="app-bar-custom-header">
      <h5
        v-ripple
        class="px-5 mdi mdi-arrow-left"
        style="height: 56px; display: flex; align-items: center"
        @click="handleBackButtonPress"
      />
      <p>{{ pageTitle }}</p>
    </template>
    <template slot="main">
      <h4 class="heading-title">{{ $route.params.name }}</h4>
      <InfiniteScrollingBlogLists :category="$route.params.name" />
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

  methods: {
    async handleBackButtonPress() {
      if (this.prevURL) {
        await this.$router.back()
      } else {
        await this.$router.replace({
          path: navigationRoutes.Home.DashBoard,
          query: {
            tabNumber: 2,
          },
        })
      }
    },
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

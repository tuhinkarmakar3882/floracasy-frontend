<template>
  <div class="payments-analytics-page">
    <AppBarHeader :fallback-page="fallbackPage" :previous-page="previousPage">
      <template #title>{{ pageTitle }}</template>
    </AppBarHeader>

    <main>
      <section class="px-4">
        <BlogCard
          class="my-4"
          :blog="blog"
          v-for="blog in blogs"
          :key="blog.id"
        />
      </section>

      <client-only>
        <infinite-loading @infinite="loadBlogs">
          <template slot="spinner">
            <section class="my-8 pb-2 px-4">
              <LineSkeleton class="my-4" height="1.2rem" />
              <LineSkeleton class="mb-6" height="2.5rem" />
              <LineSkeleton class="my-4" height="150px" />
              <LineSkeleton class="my-4" width="80%" />
              <LineSkeleton class="my-4" width="50%" />
              <LineSkeleton class="my-4" width="30%" />
            </section>
          </template>

          <template slot="error">
            <p class="danger-light my-6">Network Error</p>
          </template>

          <template slot="no-more">
            <p class="secondary-matte text-center mt-4 mb-8">
              <i class="mdi mdi-party-popper mdi-18px" />
              <br />
              <small> That's all </small>
            </p>
          </template>
        </infinite-loading>
      </client-only>
    </main>
  </div>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import endpoints from '~/api/endpoints'
import { getRelativeTime, processLink } from '~/utils/utility'
import AppBarHeader from '~/components/Layout/AppBarHeader'
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'
import BlogCard from '~/components/Blogs/BlogCard'
import { mapGetters } from 'vuex'

export default {
  name: 'Payments',
  components: {
    BlogCard,
    LineSkeleton,
    AppBarHeader,
  },
  middleware: 'isAuthenticated',

  asyncData({ from: previousPage }) {
    return { previousPage }
  },

  data() {
    return {
      previousPage: undefined,
      fallbackPage: navigationRoutes.Home.MoreOptions.Payments.index,
      navigationRoutes,
      pageTitle: 'Earning Analytics',
      loading: true,
      loadingError: false,
      blogs: [],
      // blogFetchCursorEndpoint: endpoints.payments.fetchByBlogs,
      blogFetchCursorEndpoint: endpoints.blog.getBlogsByUid,
    }
  },
  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  mounted() {},

  methods: {
    getRelativeTime,

    async loadBlogs($state) {
      if (!this.blogFetchCursorEndpoint) {
        $state.complete()
        return
      }

      try {
        const { results, next } = await this.$axios.$get(
          this.blogFetchCursorEndpoint,
          {
            params: {
              uid: this.user.uid,
            },
          }
        )

        if (!results.length) {
          $state.complete()
          return
        }
        this.blogFetchCursorEndpoint = processLink(next, false)
        this.blogs.push(...results)

        $state.loaded()
      } catch (e) {
        $state.complete()
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

<style lang="scss" scoped>
@import 'assets/all-variables';

.payments-analytics-page {
  main {
    max-width: $large-screen;
    margin: auto;

    .earning {
      font-family: $Nunito-Sans;
    }
  }
}
</style>

<template>
  <div class="payments-analytics-page">
    <AppBarHeader :fallback-page="fallbackPage" :previous-page="previousPage">
      <template #title>{{ pageTitle }}</template>
      <template #action-button>
        <nuxt-link :to="navigationRoutes.Home.Blogs.Create.AddBlog">
          <button v-ripple class="secondary-btn">Create More</button>
        </nuxt-link>
      </template>
    </AppBarHeader>

    <main>
      <section class="px-4">
        <article v-for="(blog, index) in blogs" :key="blog.id">
          <BlogCard class="my-4" :blog="blog" />
          <InFeedAd v-if="index && index % 6 === 0" />
        </article>
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
            <p class="danger-light my-6">Network Error. Please Reload</p>
          </template>

          <template slot="no-results">
            <section class="px-4 py-4">
              <h6 class="my-4">It's Lonely Here...</h6>
              <p class="mt-6 mb-8">
                Looks like, you haven't written any blogs yet!
                <br />
                Start Writing now to Start Earning!
              </p>
              <nuxt-link :to="navigationRoutes.Home.Blogs.Create.AddBlog">
                <button v-ripple class="secondary-btn">Create Blog</button>
              </nuxt-link>
            </section>
          </template>

          <template slot="no-more">
            <section class="px-4 py-4">
              <h6 class="my-4">Good Going!</h6>
              <p class="mt-6 mb-8">
                Remember the more you write, the better your skills become.
              </p>
              <nuxt-link
                v-ripple
                :to="navigationRoutes.Home.Blogs.Create.AddBlog"
              >
                <button class="secondary-btn">Create More Blogs</button>
              </nuxt-link>
            </section>
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
import InFeedAd from '~/components/Common/GoogleAdsense/InFeedAd'

export default {
  name: 'Payments',
  components: {
    InFeedAd,
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

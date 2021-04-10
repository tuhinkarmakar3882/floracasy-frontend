<template>
  <AppFeel
    :on-back="navigationRoutes.Home.MoreOptions.Preferences.index"
    :prev-url-path="prevURL"
    class="saved-blogs-page"
    dynamic-back
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>
    <template slot="main">
      <h4 class="heading-title">Saved Blogs</h4>
      <client-only>
        <section v-if="blogs">
          <article v-for="({ blog }, index) in blogs" :key="blog.id">
            <BlogPost :blog="blog" class="pt-8 pb-0" />
            <InFeedAd v-if="index % 2 === 0" />
          </article>
        </section>

        <infinite-loading @infinite="infiniteHandler">
          <template slot="spinner">
            <FallBackLoader>
              <template #fallback>
                <p class="text-center">Getting your saved articles</p>
              </template>
            </FallBackLoader>
          </template>

          <template slot="error">
            <LoadingError error-section="saved articles" />
          </template>

          <template slot="no-more">
            <p class="secondary-matte text-center mt-4 mb-8">
              <i class="mdi mdi-party-popper mdi-18px" />
              <br />
              <small> You're All Caught Up! </small>
            </p>
          </template>

          <template slot="no-results">
            <p class="danger-light text-center my-8">
              <i class="mdi mdi-book mdi-24px" />
              <br />
              <small> You Haven't Added Anything to Saved Blogs Yet! </small>
            </p>
          </template>
        </infinite-loading>
      </client-only>
    </template>
  </AppFeel>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import endpoints from '@/api/endpoints'
import { processLink } from '~/utils/utility'

export default {
  name: 'SavedBlogs',
  middleware: 'isAuthenticated',

  asyncData({ from: prevURL }) {
    return { prevURL }
  },

  data() {
    return {
      navigationRoutes,
      prevURL: undefined,
      blogs: [],
      savedBlogFetchEndpoint: endpoints.blog.getSavedBlogs,
      pageTitle: 'Saved Blogs',
    }
  },
  mounted() {},
  methods: {
    async infiniteHandler($state) {
      if (!this.savedBlogFetchEndpoint) {
        $state.complete()
        return
      }
      try {
        const { results, next } = await this.$axios.$get(
          this.savedBlogFetchEndpoint
        )
        if (results.length) {
          this.savedBlogFetchEndpoint = processLink(next)
          this.blogs.push(...results)
          $state.loaded()
        } else {
          $state.complete()
        }
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

.saved-blogs-page {
  section {
    article {
      &:nth-child(even) {
        background: $nav-bar-bg;
        box-shadow: $default-box-shadow;
      }
    }
  }
}
</style>

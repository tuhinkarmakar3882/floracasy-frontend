<template>
  <AppFeel
    class="saved-blogs-page"
    :on-back="navigationRoutes.Home.MoreOptions.Preferences.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>
    <template slot="main">
      <h4 class="heading-title">Saved Blogs</h4>
      <client-only>
        <section v-if="blogs">
          <article v-for="{ blog } in blogs" :key="blog.id">
            <BlogPost class="pt-4" :blog="blog" />
          </article>
        </section>

        <infinite-loading @infinite="infiniteHandler">
          <template slot="spinner">
            <LoadingIcon class="mt-4 mb-6" />
            <p class="text-center">Getting Latest Articles...</p>
          </template>
          <template slot="error">
            <p class="danger-light my-6">Network Error</p>
          </template>
          <template slot="no-more">
            <p class="success my-6">That's all for now :)</p>
          </template>
          <!--        <template slot="no-results">No results message</template>-->
        </infinite-loading>
      </client-only>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import LoadingIcon from '@/components/global/LoadingIcon'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import endpoints from '@/api/endpoints'

export default {
  name: 'SavedBlogs',
  components: {
    LoadingIcon,
    BlogPost: () => import('@/components/global/BlogPost'),
    AppFeel,
  },
  middleware: 'isAuthenticated',
  data() {
    return {
      navigationRoutes,
      blogs: [],
      savedBlogFetchEndpoint: endpoints.blog.getSavedBlogs,
      pageTitle: 'Saved Blogs',
    }
  },
  async mounted() {
    // await this.$firebase.analytics().logEvent('page_view')
  },
  methods: {
    async infiniteHandler($state) {
      try {
        const { results, next } = await this.$axios.$get(
          this.savedBlogFetchEndpoint,
          { params: { category_name: this.category } }
        )
        if (results.length) {
          this.savedBlogFetchEndpoint = next
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

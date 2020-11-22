<template>
  <AppFeel class="edit-profile-page" :on-back="navigationRoutes.Home.DashBoard">
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <main class="px-4">
        <h5>This is my super duper comments page & And I Love It!</h5>
        <pre class="my-4"> Requested Blog: {{ $route.params }} </pre>
      </main>

      <client-only>
        <infinite-loading @infinite="infiniteHandler">
          <template slot="spinner">
            <LoadingIcon class="mt-4 mb-6" />
            <p>Loading Recent Activities Data...</p>
          </template>
          <template slot="error">
            <p class="danger-light my-6">Network Error</p>
          </template>
          <template slot="no-more" />
          <template slot="no-results">
            <div class="no-activity">
              <p class="my-5">Be the first to comment on this!</p>
            </div>
          </template>
        </infinite-loading>
      </client-only>
    </template>
  </AppFeel>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import endpoints from '@/api/endpoints'
import AppFeel from '@/components/Layout/AppFeel'
import ClientOnly from 'vue-client-only'
import LoadingIcon from '@/components/LoadingIcon'

export default {
  components: { LoadingIcon, AppFeel, ClientOnly },
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Comments',
      comments: [],
      page: 1,
    }
  },

  async mounted() {
    await this.$store.dispatch('BottomNavigation/update', { linkPosition: -1 })
  },

  methods: {
    async setupUser() {
      const currentUser = await this.$store.getters['UserManagement/getUser']
      if (!currentUser) {
        this.loadingProfile = true
        await this.$store.dispatch('UserManagement/fetchData')
      }
    },

    async infiniteHandler($state) {
      await this.setupUser()
      try {
        const { data: results } = await this.$axios.get(
          endpoints.comment_system.fetchByBlogId,
          { params: { page: this.page, blog_id: this.$route.params.blogId } }
        )
        console.log(results)
        if (results.length) {
          this.page += 1
          this.comments.push(...results)
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

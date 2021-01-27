<template>
  <AppFeel
    :on-back="navigationRoutes.Home.Community.index"
    :prev-url-path="prevURL"
    class="community-post-detail-page"
    dynamic-back
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <pre>{{ stories }}</pre>
      <!--      <section v-if="stories">-->
      <!--        <article v-for="story in stories" :key="story.identifier">-->
      <!--          <BlogPost :blog="story" class="pb-0 pt-8" />-->
      <!--        </article>-->
      <!--      </section>-->

      <client-only>
        <infinite-loading @infinite="fetchStories">
          <template slot="spinner">
            <LoadingIcon class="mt-4 mb-6" />
            <p class="text-center">Getting Latest Stories...</p>
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
import { navigationRoutes } from '~/navigation/navigationRoutes'
import endpoints from '~/api/endpoints'
import { processLink } from '~/utils/utility'

export default {
  name: 'AllStories',
  middleware: 'isAuthenticated',

  asyncData({ from: prevURL }) {
    return { prevURL }
  },

  data() {
    return {
      navigationRoutes,
      pageTitle: 'All Stories',
      prevURL: null,
      stories: [],
      storyFetchCursorEndpoint: endpoints.community_service.stories,
    }
  },

  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: -1,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })
  },

  methods: {
    async fetchStories($state) {
      if (!this.storyFetchCursorEndpoint) {
        $state.complete()
        return
      }

      try {
        const { results, next } = await this.$axios.$get(
          this.storyFetchCursorEndpoint
        )

        if (results.length) {
          this.storyFetchCursorEndpoint = processLink(next)
          this.stories.push(...results)
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

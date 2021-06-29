<template>
  <AppFeel
    :on-back="navigationRoutes.Home.Community.index"
    :prev-url-path="prevURL"
    class="all-stories-overview-page"
    dynamic-back
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <section v-if="stories" class="story-wrapper px-6 py-4">
        <LazyStoryPost
          v-for="story in stories"
          :key="story.identifier"
          :story="story"
          class="pb-0 pt-8"
        />
      </section>

      <client-only>
        <infinite-loading @infinite="fetchStories">
          <template slot="spinner">
            <LoadingIcon class="mt-4 mb-6" />
            <p class="text-center">Getting Latest Stories...</p>
          </template>
          <template slot="error">
            <p class="danger-light my-6">Network Error</p>
          </template>
          <template slot="no-more"><p></p></template>
          <template slot="no-results"><p></p></template>
        </infinite-loading>
      </client-only>
    </template>

    <template #footer>
      <aside
        v-ripple
        class="floating-action-button primary-btn"
        @click="openAddStoryPage"
      >
        <i class="mdi mdi-plus mdi-24px" />
      </aside>
    </template>
  </AppFeel>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'
import endpoints from '~/api/endpoints'
import { processLink } from '~/utils/utility'
import AppFeel from '~/components/Layout/AppFeel'

export default {
  name: 'AllStories',
  components: { AppFeel },
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
      storyFetchCursorEndpoint: endpoints.community_service.stories.index,
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
    async openAddStoryPage() {
      await this.$router.push(navigationRoutes.Home.Community.Story.add)
    },

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

<style lang="scss" scoped>
.all-stories-overview-page {
  .story-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 24px;
  }

  .floating-action-button {
    z-index: 3;
    width: 56px;
    height: 56px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>

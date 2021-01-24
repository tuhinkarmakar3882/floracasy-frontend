<template>
  <div class="community-post-detail-page">
    {{ pageTitle }}
    <pre>{{ stories }}</pre>
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'
import endpoints from '~/api/endpoints'

export default {
  name: 'AllStories',
  middleware: 'isAuthenticated',

  async asyncData({ $axios, from: prevURL }) {
    const response = await $axios.$get(endpoints.community_service.stories)
    return { stories: response, prevURL }
  },

  data() {
    return {
      navigationRoutes,
      pageTitle: 'All Stories',
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

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

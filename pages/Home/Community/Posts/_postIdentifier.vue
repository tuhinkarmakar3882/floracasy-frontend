<template>
  <div class="community-post-detail-page">
    <pre class="my-4">{{ pageTitle }}</pre>
    <pre class="my-4">{{ $route.params }}</pre>
    <pre class="my-4">{{ post }}</pre>
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'
import endpoints from '~/api/endpoints'

export default {
  name: 'PostDetails',
  middleware: 'isAuthenticated',

  async asyncData({ $axios, params, from: prevURL }) {
    const response = await $axios.$get(
      endpoints.community_service.posts.detail.replace(
        '{identifier}',
        params.postIdentifier
      )
    )
    return { post: response, prevURL }
  },

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Post Details',
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

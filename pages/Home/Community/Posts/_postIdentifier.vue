<template>
  <div class="community-post-detail-page">
    <AppBarHeader auto-hide sticky>
      <template #title>{{ pageTitle }}</template>
    </AppBarHeader>

    <main v-if="isReady">
      <CommunityPost
        :post="post"
        :show-comment-option="false"
        class="pt-6"
        expanded
        back-on-delete
      />

      <CommunityPostComments :post="post" class="pb-8 mb-6" />
    </main>

    <FallBackLoader v-else />
  </div>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import endpoints from '@/api/endpoints'

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
      isReady: false,
      pageTitle: 'Post Details',
      post: undefined,
      prevURL: undefined,
    }
  },

  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: -1,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })

    if (!this.post) await this.getPostDetails()

    this.isReady = true
  },

  methods: {
    async getPostDetails() {
      this.post = await this.$axios.$get(
        endpoints.community_service.posts.detail.replace(
          '{identifier}',
          this.$route.params.postIdentifier
        )
      )
    },
  },

  head() {
    return {
      title: this.post?.body || this.pageTitle,
    }
  },
}
</script>

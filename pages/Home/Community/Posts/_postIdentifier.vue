<template>
  <AppFeel
    :on-back="navigationRoutes.Home.Community.index"
    :prev-url-path="prevURL"
    class="community-post-detail-page"
    dynamic-back
  >
    <template slot="app-bar-title">{{ pageTitle }}</template>

    <template slot="main">
      <main v-if="isReady">
        <CommunityPost
          :post="post"
          :show-comment-option="false"
          class="py-6"
          expanded
        />

        <CommunityPostComments :post="post" />
      </main>

      <aside v-else>
        <LoadingIcon />
      </aside>
    </template>
  </AppFeel>
</template>

<script>
import {navigationRoutes} from '@/navigation/navigationRoutes'
import endpoints from '@/api/endpoints'

export default {
  name: 'PostDetails',
  components: {
    CommunityPost: () => import('@/components/global/Community/CommunityPost'),
    LoadingIcon: () => import('@/components/global/LoadingIcon'),
    AppFeel: () => import('@/components/global/Layout/AppFeel'),
    CommunityPostComments: () =>
      import('@/components/global/Community/CommunityPostComments'),
  },
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

<style lang="scss" scoped>
@import 'assets/all-variables';
//
//.community-post-detail-page {
//  .post {
//  }
//}
</style>

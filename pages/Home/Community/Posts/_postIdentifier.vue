<template>
  <div class="community-post-detail-page">
    <AppBarHeader :fallback-page="fallbackPage" :previous-page="previousPage">
      <template #title>{{ pageTitle }}</template>
    </AppBarHeader>

    <main v-if="isReady">
      <CommunityPost
        :post="post"
        :show-comment-option="false"
        back-on-delete
        class="pt-6"
        expanded
      />

      <CommunityPostComments :post="post" class="pb-8 mb-6" />
    </main>

    <aside v-else class="my-8 pb-2 px-4">
      <section class="sample-response my-4">
        <ImageSkeleton height="40px" radius="50%" width="40px" />
        <aside>
          <LineSkeleton width="80%" />

          <LineSkeleton class="my-2" width="40%" />
        </aside>
      </section>

      <LineSkeleton class="my-4" height="1.2rem" />
      <LineSkeleton class="my-4" height="150px" />
      <LineSkeleton class="my-4" width="80%" />
      <LineSkeleton class="my-4" width="50%" />
      <LineSkeleton class="my-4" width="30%" />
      <aside class="my-8">
        <section class="sample-response my-4">
          <ImageSkeleton height="40px" radius="50%" width="40px" />
          <LineSkeleton height="100px" />
        </section>
        <section class="sample-response my-4">
          <ImageSkeleton height="40px" radius="50%" width="40px" />
          <LineSkeleton height="100px" />
        </section>
        <section class="sample-response my-4">
          <ImageSkeleton height="40px" radius="50%" width="40px" />
          <LineSkeleton height="100px" />
        </section>
      </aside>
    </aside>
  </div>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import endpoints from '@/api/endpoints'
import AppBarHeader from '~/components/Layout/AppBarHeader'
import CommunityPostComments from '~/components/Social/Posts/CommunityPostComments'
import ImageSkeleton from '~/components/Common/SkeletonLoader/ImageSkeleton'
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'

export default {
  name: 'PostDetails',
  components: {
    LineSkeleton,
    ImageSkeleton,
    CommunityPostComments,
    AppBarHeader,
  },
  middleware: 'isAuthenticated',

  async asyncData({ $axios, params, from: previousPage }) {
    const response = await $axios.$get(
      endpoints.community_service.posts.detail.replace(
        '{identifier}',
        params.postIdentifier
      )
    )
    return { post: response, previousPage }
  },

  data() {
    return {
      previousPage: undefined,
      fallbackPage: navigationRoutes.Home.Community.index,
      navigationRoutes,
      isReady: false,
      pageTitle: 'Post Details',
      post: undefined,
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

.community-post-detail-page {
  main {
    margin: auto;
    max-width: $large-screen;
  }

  section.sample-response {
    display: grid;
    grid-template-columns: 40px 1fr;
    grid-gap: 16px;
  }
}
</style>

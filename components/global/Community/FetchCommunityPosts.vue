<template>
  <div class="fetch-community-posts-component">
    <CommunityPost
      v-for="post in posts"
      :key="post.identifier"
      :post="post"
      class="community-post py-8"
    />
    <FollowSuggestions />
  </div>
</template>

<script>
import FollowSuggestions from '~/components/global/Community/FollowSuggestions'
import CommunityPost from '~/components/global/Community/CommunityPost'
import endpoints from '~/api/endpoints'

export default {
  name: 'FetchCommunityPosts',
  components: { CommunityPost, FollowSuggestions },
  data() {
    return {
      posts: [],
    }
  },
  async mounted() {
    await this.fetchCommunityPosts()
  },
  methods: {
    async fetchCommunityPosts() {
      try {
        const { results } = await this.$axios.$get(
          endpoints.community_service.posts.index
        )
        this.posts.push(...results)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.fetch-community-posts-component {
  .community-post {
    &:nth-child(even) {
      background: $nav-bar-bg;
      box-shadow: $default-box-shadow;
    }
  }
}
</style>

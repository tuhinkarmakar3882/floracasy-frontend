<template>
  <div class="fetch-community-posts-component">
    <article
      v-for="post in posts"
      :key="post.identifier"
      class="community-post"
    >
      <CommunityPost :post="post" class="py-6" />
    </article>

    <client-only>
      <infinite-loading @infinite="infiniteHandler">
        <template slot="spinner">
          <LoadingIcon class="mt-4 mb-6" />
          <p class="text-center">Getting Latest Posts...</p>
        </template>
        <template slot="error">
          <p class="danger-light my-6">Network Error</p>
        </template>
        <template slot="no-more">
          <p class="success my-6">That's all for now :)</p>
        </template>
      </infinite-loading>
    </client-only>
  </div>
</template>

<script>
import endpoints from '~/api/endpoints'
import { processLink } from '~/utils/utility'

export default {
  name: 'FetchCommunityPosts',

  data() {
    return {
      posts: [],
      fetchPostEndpoint: endpoints.community_service.posts.index,
    }
  },

  mounted() {},

  methods: {
    async infiniteHandler($state) {
      if (!this.fetchPostEndpoint) {
        $state.complete()
        return
      }

      try {
        const { results, next } = await this.$axios.$get(this.fetchPostEndpoint)
        if (results.length) {
          this.fetchPostEndpoint = processLink(next)
          this.posts.push(...results)
          $state.loaded()
        } else {
          $state.complete()
        }
      } catch (e) {
        $state.complete()
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

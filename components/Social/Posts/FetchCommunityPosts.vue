<template>
  <div class="fetch-community-posts-component">
    <article
      v-for="(post, index) in posts"
      :key="post.identifier"
      class="community-post"
    >
      <CommunityPost :post="post" class="py-6" />
      <InFeedAd v-if="index % 2 === 0" />
      <LazyFollowSuggestions v-if="index === 4" class="pb-6" />
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
          <p class="secondary-matte text-center mt-4 mb-8">
            <i class="mdi mdi-party-popper mdi-18px" />
            <br />
            <small> Come back soon for more </small>
          </p>
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
      background: $navigation-bar-color;
      box-shadow: $default-box-shadow;
    }
  }
}
</style>

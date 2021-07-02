<template>
  <div class="fetch-community-posts-component">
    <transition-group name="scale-up">
      <article
        v-for="(post, index) in posts"
        :key="post.identifier"
        class="community-post"
      >
        <CommunityPost :post="post" class="py-6" />
        <InFeedAd v-if="index && index % 2 === 0" />
        <LazyFollowSuggestions v-if="index === 4" class="pb-6" />
      </article>
    </transition-group>

    <client-only>
      <infinite-loading @infinite="infiniteHandler">
        <template slot="spinner">
          <section class="my-8 pb-2 px-4">
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
          </section>
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
import CommunityPost from '~/components/Social/Posts/CommunityPost'
import InFeedAd from '~/components/Common/GoogleAdsense/InFeedAd'
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'
import ImageSkeleton from '~/components/Common/SkeletonLoader/ImageSkeleton'

export default {
  name: 'FetchCommunityPosts',
  components: {
    ImageSkeleton,
    LineSkeleton,
    InFeedAd,
    CommunityPost,
  },

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
  section.sample-response {
    display: grid;
    grid-template-columns: 40px 1fr;
    grid-gap: 16px;
  }
}
</style>

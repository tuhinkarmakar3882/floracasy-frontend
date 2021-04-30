<template>
  <section class="timeline-wrapper">
    <h4 class="heading-title mt-0 mb-8 pb-4">The Timeline</h4>

    <div ref="tabNavigation"></div>

    <nav class="tab-bar">
      <p
        v-ripple
        :class="tabNumber === 0 && 'active-tab'"
        @click="changeTab(0)"
      >
        <span class="mdi mdi-newspaper" />
        Blogs
      </p>
      <p
        v-ripple
        :class="tabNumber === 1 && 'active-tab'"
        @click="changeTab(1)"
      >
        <span class="mdi mdi-earth" />
        Posts
      </p>
    </nav>

    <main class="timeline pt-4">
      <section v-if="tabNumber === 0">
        <article v-for="(blog, index) in recentBlogs" :key="blog.identifier">
          <LazyBlogPost :blog="blog" class="activity pt-4" />

          <InFeedAd use-small-ads />
        </article>

        <footer v-if="!loadingError">
          <client-only>
            <infinite-loading key="infinite-blog-fetch" @infinite="loadBlogs">
              <template slot="spinner">
                <LoadingIcon class="mt-4 mb-8" />
                <p>Getting your blogs...</p>
              </template>

              <template slot="error">
                <p class="danger-light my-6">Network Error</p>
              </template>

              <template slot="no-more">
                <div />
              </template>

              <template slot="no-results">
                <p class="my-5">It's Lonely Here...</p>
              </template>
            </infinite-loading>
          </client-only>
        </footer>
      </section>

      <section v-if="tabNumber === 1">
        <article v-for="(post, index) in recentPosts" :key="post.identifier">
          <CommunityPost :post="post" class="activity py-8" />

          <InFeedAd v-if="index % 2 === 0" use-small-ads />
        </article>

        <footer v-if="!loadingError">
          <client-only>
            <infinite-loading key="infinite-posts-fetch" @infinite="loadPosts">
              <template slot="spinner">
                <LoadingIcon class="mt-4 mb-8" />
                <p>Getting your posts...</p>
              </template>

              <template slot="error">
                <p class="danger-light my-6">Network Error</p>
              </template>

              <template slot="no-more">
                <div />
              </template>

              <template slot="no-results">
                <p class="my-5">It's Lonely Here...</p>
              </template>
            </infinite-loading>
          </client-only>
        </footer>
      </section>
    </main>
  </section>
</template>
<script>
import { processLink } from '~/utils/utility'
import endpoints from '~/api/endpoints'

export default {
  name: 'UserTimeline',
  props: {
    userUid: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      tabNumber: 0,
      loadingError: false,

      getBlogsByUserUIDEndpoint: endpoints.blog.getBlogsByUid,
      recentBlogs: [],

      getPostsByUserUIDEndpoint: endpoints.community_service.posts.getByUserUID,
      recentPosts: [],
    }
  },

  methods: {
    changeTab(newTabNumber) {
      this.tabNumber = newTabNumber
      this.$refs.tabNavigation.scrollIntoView()
    },

    async loadBlogs($state) {
      if (!this.getBlogsByUserUIDEndpoint) {
        $state.complete()
        return
      }
      try {
        const { results, next } = await this.$axios.$get(
          this.getBlogsByUserUIDEndpoint,
          { params: { uid: this.userUid } }
        )
        if (results.length) {
          this.getBlogsByUserUIDEndpoint = processLink(next)
          this.recentBlogs.push(...results)
          $state.loaded()
        } else {
          $state.complete()
        }
      } catch (e) {
        $state.complete()
      }
    },

    async loadPosts($state) {
      if (!this.getPostsByUserUIDEndpoint) {
        $state.complete()
        return
      }
      try {
        const { results, next } = await this.$axios.$get(
          this.getPostsByUserUIDEndpoint,
          { params: { uid: this.userUid } }
        )
        if (results.length) {
          this.getPostsByUserUIDEndpoint = processLink(next)
          this.recentPosts.push(...results)
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

.timeline-wrapper {
  .tab-bar {
    display: grid;
    text-align: center;
    grid-template-columns: repeat(2, 1fr);
    position: sticky;
    top: 56px;
    background-color: $navigation-bar-color;
    box-shadow: $down-only-box-shadow;
    z-index: 1;
    transition: all 0.3s ease-in-out;

    * {
      padding: 0.7rem 0;
      font-size: 1rem;
      font-weight: 300;
    }

    .active-tab {
      color: $white;
      font-weight: 400;
      background: $active-gradient;
      transition: all 0.1s ease-in-out;
    }
  }

  .activity {
    &:nth-child(even) {
      background: $body-bg-alternate;
    }
  }
}
</style>

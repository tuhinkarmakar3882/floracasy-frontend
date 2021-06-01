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
        <article v-for="blog in recentBlogs" :key="blog.identifier">
          <BlogPost :blog="blog" class="activity pt-4" />

          <InFeedAd />
        </article>

        <footer v-if="!loadingError">
          <client-only>
            <infinite-loading key="infinite-blog-fetch" @infinite="loadBlogs">
              <template slot="spinner">
                <section class="my-8 pb-2 px-4">
                  <LineSkeleton class="my-4" height="1.2rem" />
                  <LineSkeleton class="mb-6" height="2.5rem" />
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
                <section class="px-4 py-2">
                  <h6 class="my-4">Good Going!</h6>
                  <p class="mt-6 mb-8">
                    Remember the more you write, the better your skills become.
                  </p>
                  <nuxt-link
                    v-ripple
                    :to="navigationRoutes.Home.Blogs.Create.AddBlog"
                  >
                    <button class="secondary-btn">Create More Blogs</button>
                  </nuxt-link>
                </section>
              </template>

              <template slot="no-results">
                <h6 class="my-4">It's Lonely Here...</h6>
                <p class="mt-6 mb-8">
                  Looks like, you haven't written any blogs yet!
                  <br />
                  Start Writing now to Start Earning!
                </p>
                <nuxt-link
                  v-ripple
                  :to="navigationRoutes.Home.Blogs.Create.AddBlog"
                >
                  <button class="secondary-btn">Create Blog</button>
                </nuxt-link>
              </template>
            </infinite-loading>
          </client-only>
        </footer>
      </section>

      <section v-if="tabNumber === 1">
        <article v-for="post in recentPosts" :key="post.identifier">
          <LazyCommunityPost :post="post" class="activity py-8" />

          <InFeedAd />
        </article>

        <footer v-if="!loadingError">
          <client-only>
            <infinite-loading key="infinite-posts-fetch" @infinite="loadPosts">
              <template slot="spinner">
                <section class="my-8 pb-2 px-4">
                  <section class="sample-response-reversed my-4">
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
                <section class="px-4 py-2">
                  <h6 class="my-4">Awesome, Job!</h6>
                  <p class="mt-6 mb-8">
                    Community post can help build a bond with your readers!
                  </p>
                  <nuxt-link
                    v-ripple
                    :to="navigationRoutes.Home.Community.Posts.add"
                  >
                    <button class="secondary-btn">Create More Posts</button>
                  </nuxt-link>
                </section>
              </template>

              <template slot="no-results">
                <h6 class="my-4">It's Lonely Here...</h6>
                <p class="mt-6 mb-8">
                  Looks like, you haven't created any posts yet!
                </p>
                <nuxt-link
                  v-ripple
                  :to="navigationRoutes.Home.Community.Posts.add"
                >
                  <button class="secondary-btn">Create Post</button>
                </nuxt-link>
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
import InFeedAd from '~/components/Common/GoogleAdsense/InFeedAd'
import BlogPost from '~/components/Blogs/BlogPost'
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import ImageSkeleton from '~/components/Common/SkeletonLoader/ImageSkeleton'

export default {
  name: 'UserTimeline',
  components: { ImageSkeleton, LineSkeleton, BlogPost, InFeedAd },
  props: {
    userUid: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      navigationRoutes,
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

  section.sample-response-reversed {
    display: grid;
    grid-template-columns: 40px 1fr;
    grid-gap: 16px;
    gap: 16px;
  }
}
</style>

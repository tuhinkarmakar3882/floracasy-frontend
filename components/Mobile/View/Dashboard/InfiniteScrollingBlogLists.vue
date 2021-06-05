<template>
  <div class="mb-6 scrollable-blog-list">
    <section v-if="blogs">
      <transition-group name="scale-up">
        <article v-for="(blog, index) in blogs" :key="blog.id">
          <BlogPost :blog="blog" class="pb-0 pt-8" />
          <InFeedAd v-if="!hideAds" />
          <LazyFollowSuggestions
            v-if="showFollowSuggestions && index === 2"
            class="pb-6"
          />
        </article>
      </transition-group>
    </section>

    <client-only>
      <infinite-loading @infinite="infiniteHandler">
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
import endpoints from '@/api/endpoints'
import { processLink } from '~/utils/utility'
import InFeedAd from '~/components/Common/GoogleAdsense/InFeedAd'
import BlogPost from '~/components/Blogs/BlogPost'
import '~/assets/override/virtual-scroller.scss'
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'

export default {
  name: 'InfiniteScrollingBlogLists',
  components: {
    LineSkeleton,
    BlogPost,
    InFeedAd,
  },
  props: {
    hideAds: {
      type: Boolean,
      required: false,
      default: false,
    },
    category: {
      type: String,
      default: null,
    },
    trendingMode: {
      type: Boolean,
      default: null,
    },
    showFollowSuggestions: {
      type: Boolean,
      default: null,
    },
  },

  data() {
    return {
      blogs: [],
      blogFetchCursorEndpoint: endpoints.blog.fetch,
    }
  },

  methods: {
    async infiniteHandler($state) {
      if (!this.blogFetchCursorEndpoint) {
        $state.complete()
        return
      }

      try {
        const { results, next } = await this.$axios.$get(
          this.blogFetchCursorEndpoint,
          {
            params: {
              category_name: this.category,
              trendingMode: this.trendingMode,
            },
          }
        )
        if (results.length) {
          this.blogFetchCursorEndpoint = processLink(next, false)
          const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1))
              const temp = array[i]
              array[i] = array[j]
              array[j] = temp
            }
            return array
          }
          this.blogs.push(...shuffleArray(results))
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

.scrollable-blog-list {
  article {
    &:nth-child(even) {
      background: $navigation-bar-color;
      box-shadow: $default-box-shadow;
    }
  }
}
</style>

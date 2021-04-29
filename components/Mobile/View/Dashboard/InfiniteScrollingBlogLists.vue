<template>
  <div class="mb-6 scrollable-blog-list">
    <section v-if="blogs">
      <transition-group name="scale-up">
        <article v-for="(blog, index) in blogs" :key="blog.id">
          <BlogPost :blog="blog" class="pb-0 pt-8" />
          <InFeedAd v-if="index % 2 === 0" />
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
          <LoadingIcon class="mt-4 mb-6" />
          <p class="text-center">Getting Latest Articles...</p>
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
        <!--        <template slot="no-results">No results message</template>-->
      </infinite-loading>
    </client-only>
  </div>
</template>

<script>
import endpoints from '@/api/endpoints'
import { processLink } from '~/utils/utility'
import InFeedAd from '~/components/Common/GoogleAdsense/InFeedAd'
import BlogPost from '~/components/Blogs/BlogPost'

export default {
  name: 'InfiniteScrollingBlogLists',
  components: { BlogPost, InFeedAd },
  props: {
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
          this.blogs.push(...results)
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

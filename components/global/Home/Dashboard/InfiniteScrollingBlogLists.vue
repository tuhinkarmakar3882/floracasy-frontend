<template>
  <div class="mb-6 scrollable-blog-list">
    <section v-if="blogs">
      <article v-for="blog in blogs" :key="blog.id">
        <BlogPost class="pb-0 pt-8" :blog="blog" />
      </article>
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
          <p class="success my-6">That's all for now :)</p>
        </template>
        <!--        <template slot="no-results">No results message</template>-->
      </infinite-loading>
    </client-only>
  </div>
</template>

<script>
import endpoints from '@/api/endpoints'
import ClientOnly from 'vue-client-only'
import LoadingIcon from '@/components/global/LoadingIcon'
import BlogPost from '@/components/global/BlogPost'
import { processLink } from '~/utils/utility'

export default {
  name: 'InfiniteScrollingBlogLists',
  components: {
    BlogPost,
    LoadingIcon,
    ClientOnly,
  },
  props: {
    category: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      blogs: [],
      blogFetchCursorEndpoint: endpoints.blog.fetch,
    }
  },

  computed: {},

  watch: {
    mode: {
      handler() {
        this.dataLoading = true
        setTimeout(() => {
          this.dataLoading = false
        }, 1500)
      },
      deep: true,
    },
  },

  mounted() {},

  methods: {
    async infiniteHandler($state) {
      if (!this.blogFetchCursorEndpoint) {
        $state.complete()
        return
      }

      try {
        const { results, next } = await this.$axios.$get(
          this.blogFetchCursorEndpoint,
          { params: { category_name: this.category } }
        )
        if (results.length) {
          this.blogFetchCursorEndpoint = processLink(next)
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
      background: $nav-bar-bg;
      box-shadow: $default-box-shadow;
    }
  }
}
</style>

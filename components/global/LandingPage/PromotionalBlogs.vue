<template>
  <div class="promotional-blogs-component">
    <LazySegmentTitle
      class="px-4 py-6"
      leading-icon="mdi mdi-fire"
      topic="Trending Articles"
      center-topic
    />

    <hr class="reversed-faded-divider mt-0 mb-3" />

    <section v-if="blogsData">
      <LazyBlogPost
        v-for="blog in blogsData"
        :key="blog.identifier"
        :blog="blog"
        class="blog-post pt-4"
        hide-blog-actions
        hide-more-options-button
      />
    </section>
  </div>
</template>

<script>
import endpoints from '~/api/endpoints'

export default {
  name: 'PromotionalBlogs',
  data() {
    return {
      blogsData: null,
    }
  },
  async mounted() {
    await this.fetchTrendingBlogs()
  },
  methods: {
    async fetchTrendingBlogs() {
      try {
        const { results } = await this.$axios.$get(endpoints.blog.sampleBlogs)
        this.blogsData = results
      } catch (e) {}
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.promotional-blogs-component {
  .blog-post {
    &:nth-child(even) {
      background: $card-background;
    }
  }
}
</style>

<template>
  <div class="promotional-blogs-component">
    <!--    <LazySegmentTitle-->
    <!--      class="px-4"-->
    <!--      leading-icon="mdi mdi-fire"-->
    <!--      topic="Top 3 Trending Articles"-->
    <!--      center-topic-->
    <!--      highlight-color="#fff"-->
    <!--      active-background-->
    <!--    />-->
    <p style="color: #fff" class="text-center active-background py-6">
      <i class="mdi mdi-fire" />
      <strong style="font-family: 'Nunito Sans', sans-serif">
        Top 3 Trending Articles
      </strong>
    </p>

    <hr class="faded-divider my-0 pb-0" />

    <section v-if="blogsData">
      <LazyBlogPost
        v-for="blog in blogsData"
        :key="blog.identifier"
        :blog="blog"
        class="blog-post pt-4"
        hide-blog-actions
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

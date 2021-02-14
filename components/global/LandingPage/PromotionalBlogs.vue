<template>
  <div class="promotional-blogs-component">
    <hr class="faded-divider my-0" />
    <LazySegmentTitle
      class="px-4 py-6"
      leading-icon="mdi mdi-fire"
      topic="Trending Articles"
      center-topic
    />

    <hr class="reversed-faded-divider mt-0 mb-3" />

    <section v-if="dataIsAvailable">
      <LazyCarousel
        class="text-left mb-4"
        show-navigation-dots
        :carousel-items="blogsData"
        blog-carousel
      />
    </section>

    <aside v-else class="text-center">
      <LazyLoadingIcon class="my-6" />
      <p class="my-6">Fetching Articles</p>
    </aside>
  </div>
</template>

<script>
import endpoints from '~/api/endpoints'

export default {
  name: 'PromotionalBlogs',
  data() {
    return {
      blogsData: null,
      dataIsAvailable: false,
    }
  },
  async mounted() {
    await this.fetchTrendingBlogs()
    this.dataIsAvailable = true
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

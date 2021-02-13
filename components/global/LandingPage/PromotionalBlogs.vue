<template>
  <div class="promotional-blogs-component">
    <LazySegmentTitle
      title="The Trending Titles @ Your Finger Tips"
      leading-icon="mdi mdi-fire"
      topic="Trending"
      class="px-4"
    />
    <hr class="faded-divider" />

    <section v-if="blogsData">
      <LazyBlogPost
        v-for="blog in blogsData"
        :key="blog.identifier"
        :blog="blog"
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

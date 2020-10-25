<template>
  <div class="blog-details-page py-4">
    <!--    {{ blog }}-->
    <section class="px-4">
      <p class="mb-2">
        <nuxt-link to="/Home/Account/BlogDetails" class="no-underline">
          {{ blog.author }}
        </nuxt-link>
        IN
        <nuxt-link to="/Home/Blogs/CategoryWise" class="no-underline">
          {{ blog.category }}
        </nuxt-link>
      </p>
      <h3 class="blog-title mb-4">
        {{ blog.title }}
      </h3>
      <small class="timestamp">
        <span class="mdi mdi-clock-time-nine-outline" />
        {{ blog.timestamp }}
      </small>
    </section>
    <img
      class="my-5 blog-intro-image"
      :src="blog.image"
      :alt="blog.title"
      style="width: 100%; object-fit: cover; max-height: 250px"
    />
    <pre><section class="blog-body my-6 px-4" v-html="blog.body" /></pre>
    <!--      {{ blog.body }}-->
    <!--    </iframe>-->
  </div>
</template>

<style lang="scss" scoped>
@import 'assets/all-variables';

.blog-details-page {
  .blog-intro-image {
    box-shadow: $down-only-box-shadow;
  }
}
</style>

<script>
export default {
  name: 'BlogDetails',
  layout: 'MobileApp',
  async asyncData({ $axios, params }) {
    const response = await $axios.$get(
      `http://localhost:3001/api/getBlogData`,
      { params: { id: params.id } }
    )
    return { blog: response.response }
  },
  mounted() {
    this.$store.commit('BottomNavigation/update', { linkPosition: -1 })
  },
  head() {
    return {
      title: 'this.response',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description',
        },
      ],
    }
  },
}
</script>

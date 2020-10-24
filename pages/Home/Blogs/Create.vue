<template>
  <div class="create-blog-page px-4">
    <h3 class="my-3">Blog Title Goes Here</h3>
    <p class="blog-subtitle my-4">The Subtitle Goes Here</p>
    <p class="blog-body mt-8">Your great Blog content goes here...</p>
  </div>
</template>

<style lang="scss" scoped>
@import 'assets/all-variables';

.create-blog-page {
  .blog-subtitle {
    font-size: 1.2rem;
    color: lighten($muted, $lighten-percentage);
  }
}
</style>

<script>
export default {
  name: 'Create',
  layout: 'EditorLayout',
  // middleware: 'protectedRoute',
  mounted() {
    this.$store.commit('BottomNavigation/update', { linkPosition: 2 })
  },
}
</script>

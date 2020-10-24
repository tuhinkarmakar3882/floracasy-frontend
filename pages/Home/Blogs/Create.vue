<template>
  <div class="create-blog-page px-4">
    <textarea class="blog-title my-3" placeholder="Blog Title Goes Here" />
    <textarea class="blog-subtitle" placeholder="The Subtitle Goes Here" />
    <textarea
      class="blog-body"
      placeholder="Your great Blog content goes here..."
    />
  </div>
</template>

<style lang="scss" scoped>
@import 'assets/all-variables';

.create-blog-page {
  textarea {
    all: unset;
    width: 100%;
    display: block;
  }

  .blog-title {
    font-size: 1.8rem;
    color: $white;
    font-family: $Prata;
    margin-top: $xx-large-unit;
    margin-bottom: $large-unit;
  }

  .blog-subtitle {
    font-size: 1.2rem;
    //color: $muted;
    color: #7a7a7a;
    margin-bottom: $xxx-large-unit;
  }

  .blog-body {
    font-size: 1rem;
    color: $body-text-default;
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

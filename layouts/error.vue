<template>
  <div class="error-page my-4 px-4">
    <section v-if="error.statusCode === 404">
      <header class="text-center">
        <h6 class="heading-title">
          {{ pageNotFound }}
        </h6>
      </header>

      <main class="my-6">
        <Icon404 class="error-svg mb-8" />
        <a href="/" class="my-8"> Go to Homepage </a>
      </main>
    </section>
    <section v-else>
      <header class="text-center">
        <h6>
          {{ otherError }}
        </h6>
      </header>

      <main class="my-6">
        <a href="/" class="my-8"> Go to Homepage </a>
      </main>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: 'Page Not Found',
      otherError: 'Something Went Wrong.',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.error-page {
  main {
    display: grid;
    place-items: center;

    .error-svg {
      width: 300px;
    }
  }
}
</style>

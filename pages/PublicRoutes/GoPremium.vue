<template>
  <div class="go-premium-page">
    <span> mdi-crown </span>
    <h1 class="my-4">This is my super duper Go Premium Page</h1>
    <p class="my-4">And I love it</p>
  </div>
</template>

<script>
export default {
  name: 'GoPremium',
  layout: 'PublicRoutes',
  middleware: 'publicRoute',

  data() {
    return {
      pageTitle: 'Explore Premium',
    }
  },
  mounted() {},
  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
.go-premium-page {
  text-align: center;
  margin: 1rem 0;
  padding: 1rem;
}
</style>

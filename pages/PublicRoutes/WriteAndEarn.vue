<template>
  <div class="write-and-earn-page">
    <span> mdi-heart </span>

    <h1 class="my-4">This is my super duper Write and Earn Page</h1>

    <p class="my-4">And I love it</p>
  </div>
</template>

<script>
export default {
  name: 'WriteAndEarn',
  layout: 'PublicRoutes',
  middleware: 'publicRoute',

  data() {
    return {
      pageTitle: 'Write and Earn with Us',
    }
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
.write-and-earn-page {
  text-align: center;
  margin: 1rem 0;
  padding: 1rem;
}
</style>

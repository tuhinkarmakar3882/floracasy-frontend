<template>
  <div class="text-center my-6 py-6 px-4">
    <span> mdi-plus-circle </span>
    <h1 class="my-4">This is my super duper Create a new Blog Page</h1>
    <p class="my-4">And I love it</p>
  </div>
</template>

<script>
export default {
  name: 'Create',
  layout: 'HomeAppLayout',
  middleware: 'authenticatedRequest',
  mounted() {
    this.$store.commit('BottomNavigation/update', { linkPosition: 2 })
  },
}
</script>

<style scoped></style>

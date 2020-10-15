<template>
  <div class="text-center my-6 py-6 px-4">
    <v-icon color="gold-tone" size="100">mdi-plus-circle</v-icon>
    <h1 class="my-4">This is my super duper Create a new Blog Page</h1>
    <p class="my-4">And I love it </p>
  </div>
</template>

<script>
export default {
  name: "Create",
  middleware: "authenticatedRequest",
  layout: "HomeAppLayout",
  mounted() {
    this.$store.commit('BottomNavigation/update', {linkPosition: 2})
  }
}
</script>

<style scoped>

</style>

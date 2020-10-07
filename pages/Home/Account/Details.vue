<template>
  <div class="text-center my-6 py-6 px-4">
    <v-icon color="gold-tone" size="100">mdi-account-circle</v-icon>
    <h1 class="my-4">This is my super duper Account Details Page</h1>
    <p class="my-4">And I love it</p>
  </div>
</template>

<script>
export default {
  name: "Details",
  middleware: "authenticatedRequest",
  layout: "HomeAppLayout",
  // mounted() {
  //   this.$store.commit('BottomNavigation/update', {linkPosition: 1 })
  // }
}
</script>

<style scoped>

</style>

<template>
  <div class="text-center my-6 py-6 px-4">
    <v-icon color="gold-tone" size="100">mdi-bell</v-icon>
    <h1 class="my-4">This is my super duper Notifications View Page</h1>
    <p class="my-4">And I love it </p>
  </div>
</template>

<script>
export default {
  name: "Notifications",
  layout: "HomeAppLayout",
  middleware: "authenticatedRequest",
  mounted() {
    this.$store.commit('BottomNavigation/update', {linkPosition: 3})
  }
}
</script>

<style scoped>

</style>

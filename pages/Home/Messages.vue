<template>
  <div class="text-center my-6 py-6 px-4">
    <v-icon color="gold-tone" size="100">mdi-email</v-icon>
    <h1 class="my-4">This is my super duper Message Page</h1>
    <p class="my-4">And I love it </p>
    <v-btn class="button px-4 my-4" color="primary" to="/Home/Account/Details" width="250">
      <span>View Profile</span>
    </v-btn>
    <v-btn class="button px-4 my-4" color="primary" to="/Home/Dashboard" width="250">
      <span>View Dashboard</span>
    </v-btn>

    <a href="/Home/Messages">
      <span>REFRESH</span>
    </a>

  </div>
</template>

<script>
export default {
  name: "Messages",
  // middleware: "authenticatedRequest",
  layout: "HomeAppLayout",
  mounted() {
    this.$store.commit('BottomNavigation/update', {linkPosition: 2})
  }
}
</script>

<style scoped>

</style>

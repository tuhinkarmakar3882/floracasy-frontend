<template>
  <div class="text-center my-6 py-6 px-4">
    <v-icon color="gold-tone" size="100">mdi-home</v-icon>
    <h1 class="my-4">This is my super duper DASHBOARD Page</h1>
    <p class="my-4">And I love it (Did you notice that the layout has changed?)</p>
    <hr>
    <h3 class="my-4">You Can Only see this after logging in.</h3>
    <p class="my-4">Knock Knock, you're only logged in for 30secs.</p>
    <hr>
    <p class="my-4">Profile Button?</p>

    <v-btn class="button px-4 my-4" color="primary" to="/Home/Account/Details" width="250">
      <span>View Profile</span>
    </v-btn>

    <v-btn class="button px-4 my-4" color="primary" to="/Home/Messages" width="250">
      <span>View Messages</span>
    </v-btn>

    <a href="/Home/Dashboard">
      <span>REFRESH</span>
    </a>

    <p class="my-4">Anyways, here's a logout button</p>
    <v-btn class="button px-4 my-4" color="secondary-matte" outlined width="250" @click="logout">
      <span>Log out</span>
    </v-btn>

  </div>
</template>

<script>
export default {
  name: "DashBoard",
  // middleware: "authenticatedRequest",
  layout: "HomeAppLayout",
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('logout')
        console.log(this.$store.state.authUser);
        await this.$router.push('/');
      } catch (e) {
      }
    }
  },
  mounted() {
    this.$store.commit('BottomNavigation/update', {linkPosition: 0})
  }
}
</script>

<style scoped>

</style>

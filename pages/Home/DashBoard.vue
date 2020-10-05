<template>
  <div class="text-center my-6 py-6 px-4">
    <v-icon color="gold-tone" size="100">mdi-home</v-icon>
    <h1 class="my-4">This is my super duper DASHBOARD Page</h1>
    <p class="my-4">And I love it (Did you notice that the layout has changed?)</p>
    <hr>
    <h3 class="my-4">You Can Only see this after logging in.</h3>
    <p class="my-4">Knock Knock, you're only logged in for 30secs.</p>
    <hr>
    <p class="my-4">Anyways, here's a logout button</p>
    <v-btn class="button px-4" color="secondary-matte" outlined width="250" @click="logout">
      <span>Log out</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "DashBoard",
  middleware: "authenticatedRequest",
  layout: "HomeAppLayout",
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('logout')
        console.log(this.$store.state.auth);
        await this.$router.push('/');
      } catch (e) {
      }
    }
  }
}
</script>

<style scoped>

</style>

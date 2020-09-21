<template>
  <v-app class="v-app" dark>
    <h1>The Navigation Bar</h1>
    <v-main class="v-main">
      <nuxt/>
    </v-main>

    <v-footer class="v-footer">
      The Footer
    </v-footer>
  </v-app>
</template>

<script>

export default {
  components: {},
  data: () => {
    return {}
  },
}
</script>

<style lang="scss" scoped>
@import "assets/variables";

.v-app, .v-main, .v-footer {
  background: $body-background;
  color: $body-text-default;
  transition: all .5s ease-in-out;
  font-family: $Nunito;
  letter-spacing: 1px;
}
</style>

<template>
  <v-app class="v-app" dark>
    <NavigationBar/>
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
  components: {
    NavigationBar: () => import('~/components/NavigationBar'),
  },
  data: () => {
    return {}
  },
}
</script>

<style lang="scss" scoped>
@import "assets/variables";


</style>

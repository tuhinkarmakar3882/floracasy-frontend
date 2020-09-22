<template>
  <v-app>
    <NavigationBar/>

    <v-main class="v-main">
      <v-container fluid>
        <nuxt/>
      </v-container>
    </v-main>

    <v-footer class="v-footer" padless>
      <Footer/>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  components: {
    NavigationBar: () => import('~/components/NavigationBar'),
    Footer: () => import('~/components/Footer'),
  },
  data: () => {
    return {}
  },
}
</script>

<style lang="scss" scoped>
@import "assets/variables";


</style>

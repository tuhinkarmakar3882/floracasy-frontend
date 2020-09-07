<template>
  <v-app>
    <NavigationBar/>
    <v-main>
      <v-progress-linear v-if="loading" color="primary darken-6" indeterminate/>
      <nuxt/>
    </v-main>


    <v-footer padless>
      <BottomNavigationBar/>
      <!--      <PageFooter/>-->
    </v-footer>
  </v-app>
</template>

<script>

export default {
  components: {
    LatestArticles: () => import ("@/components/LatestArticles"),
    PageFooter: () => import ("@/components/PageFooter"),
    NavigationBar: () => import ("@/components/NavigationBar"),
    BottomNavigationBar: () => import ("@/components/BottomNavigationBar"),
  },
  data: () => {
    return {
      loading: false,
      bottomNav: 3,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'styles/themeData';

body {
  background: white;
  transition: all .5s;
}

</style>

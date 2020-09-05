<template>
  <v-app>
    <NavigationBar/>
    <v-main>
      <v-progress-linear v-if="loading" color="primary darken-6" indeterminate/>
      <nuxt/>
    </v-main>


    <BottomNavigationBar/>
    <!--    <v-footer app color="red" padless></v-footer>-->
  </v-app>
</template>

<script>


import LatestArticles from "@/components/LatestArticles";
import PageFooter from "@/components/PageFooter";
import NavigationBar from "@/components/NavigationBar";
import BottomNavigationBar from "@/components/BottomNavigationBar";

export default {
  components: [
    LatestArticles,
    PageFooter,
    NavigationBar,
    BottomNavigationBar,
  ],
  data: () => {
    return {
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

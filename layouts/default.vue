<template>
  <v-app>
    <v-app-bar
        :clipped-left="clipped"
        app
        color="white"
        elevate-on-scroll
        hide-on-scroll
    >
      <NavigationBar/>
    </v-app-bar>
    <v-main>
      <v-progress-linear v-if="loading" color="yellow darken-2" indeterminate/>
      <nuxt/>
    </v-main>
    <v-footer absolute app color="red" padless>
      <PageFooter/>
    </v-footer>
  </v-app>
</template>

<script>
import PageFooter from "@/components/PageFooter";
import NavigationBar from "@/components/NavigationBar";

export default {
  components: [
    PageFooter,
    NavigationBar
  ],

  data() {
    return {
      loading: false,
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

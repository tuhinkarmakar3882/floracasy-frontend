<template>
  <v-app>
    <v-app-bar app color="white">
      <NavigationBar/>
    </v-app-bar>
    <v-main>
      <v-progress-linear v-if="loading" color="primary darken-6" indeterminate/>
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

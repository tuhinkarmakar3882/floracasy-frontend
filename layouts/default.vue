<template>
  <v-app>
    <v-app-bar
        app
        color="white"
        elevate-on-scroll
        hide-on-scroll
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-progress-linear v-if="loading" color="primary darken-6" indeterminate/>
      <nuxt/>
    </v-main>

    <v-footer app color="red" padless>
      <v-bottom-navigation
          v-model="bottomNav"
          dark
          shift
          fixed
          hide-on-scroll
      >
        <v-btn>
          <span>Video</span>
          <v-icon>mdi-television-play</v-icon>
        </v-btn>

        <v-btn>
          <span>Music</span>
          <v-icon>mdi-music-note</v-icon>
        </v-btn>

        <v-btn>
          <span>Book</span>
          <v-icon>mdi-book</v-icon>
        </v-btn>

        <v-btn>
          <span>Image</span>
          <v-icon>mdi-image</v-icon>
        </v-btn>
      </v-bottom-navigation>
      <!--      <PageFooter/>-->
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
      bottomNav: 3,
    }
  },
  computed: {
    color() {
      switch (this.bottomNav) {
        case 0:
          return 'blue-grey'
        case 1:
          return 'teal'
        case 2:
          return 'brown'
        case 3:
          return 'indigo'
      }
    },
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

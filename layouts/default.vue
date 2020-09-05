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
      <v-container>
        <nuxt/>
      </v-container>
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
  transition(to, from) {
    if (!from) {
      return 'slide-left'
    }
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/themeData';

body {
  background: white;
  transition: all .5s;

}

</style>

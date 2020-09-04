<template>
  <v-app>
    <v-navigation-drawer
        v-model="drawer"
        :clipped="clipped"
        :mini-variant="miniVariant"
        app
        fixed
    >
      <v-list>
        <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            exact
            router
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
        :clipped-left="clipped"
        app
        dark
        elevate-on-scroll
        hide-on-scroll
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-spacer/>
    </v-app-bar>
    <v-main>
      <v-progress-linear v-if="loading" color="yellow darken-2" indeterminate/>
      <v-container>
        <!--        <nuxt/>-->
      </v-container>
    </v-main>
    <v-footer absolute app padless>
      <PageFooter/>
    </v-footer>
  </v-app>
</template>
<!--Todo Fix This-->

<script>
import PageFooter from "@/components/PageFooter";

export default {
  components: [
    PageFooter
  ],
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
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/themeData';

body {
  background: white;

}

</style>

<template>
  <v-app>
    <v-app-bar
        app
        color="body-background"
        dark
        elevate-on-scroll
        height="72"
        hide-on-scroll
    >
      <v-spacer/>
      <div class="brand">
        <Logo :width="36"/>
        <nuxt-link class="brand-name" to="/">Floracasy</nuxt-link>
      </div>
      <v-spacer/>

    </v-app-bar>
    <v-main class="v-main">
      <div class="modal-style">
        <nuxt/>
      </div>
    </v-main>

    <v-bottom-navigation
        v-model="activeLink"
        :background-color="color"
        app
        dark
    >
      <v-btn v-for="menuOption in menuOptions" :key="menuOption.id"
             @click="set">
        <span>{{ menuOption.text }}</span>

        <v-icon>{{ menuOption.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "HomeAppLayout",
  components: {
    Logo: () => import("~/components/global/Logo"),
  },
  data() {
    return {
      // menuOptions: this.$store.state.BottomNavigation.menuOptions,
      // activeLink: this.$store.state.BottomNavigation.activeLink,
    }
  },
  // Todo add a mounted method to sync the navigation
  computed: {

    color() {
      // return this.menuOptions[this.activeLink].color;
    },
    ...mapGetters(
        {
          menuOptions: 'BottomNavigation/getMenuOptions',
          activeLink: 'BottomNavigation/getActiveLink',
        },
    ),
    set() {
      console.log(this.activeLink);
      this.$store.commit('BottomNavigation/update', {linkPosition: 1})
      console.log(this.activeLink);
    }
  },
}
</script>

<style lang="scss" scoped>
@import "assets/variables";

$font-size: 18px;
.v-toolbar__content {
  flex-wrap: wrap;
  padding: 4px 16px !important;

  @media only screen and (min-width: 1024px) {
    padding-left: 64px !important;
    padding-right: 32px !important;
  }

  .brand {
    display: flex;
    align-items: center;

    .brand-name {
      margin-left: 12px;
      font-size: 20px;
      color: $white;
      text-decoration: none;
      font-family: $Prata;
    }
  }

  ul {
    list-style: none;
    display: flex;
    align-items: center;

    li {
      margin: 0 32px;
      font-size: $font-size;
      font-family: $Nunito-Sans;

      a {
        display: block;
        color: $white;
        text-decoration: none;
      }

      button {
        font-size: $font-size !important;
        font-weight: 400 !important;
      }
    }
  }

}

</style>

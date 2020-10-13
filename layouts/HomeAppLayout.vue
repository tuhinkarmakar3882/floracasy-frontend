<template>
  <v-app>
    <v-app-bar
        app
        color="#2724C5"
        dark
        elevate-on-scroll
        height="72"
        hide-on-scroll
    >
      <v-app-bar-nav-icon class="visible-upto-large" @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-spacer/>
      <div class="brand">
        <Logo :width="36"/>
        <nuxt-link class="brand-name" to="/">Floracasy</nuxt-link>
      </div>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        app
        color="card-background"
        dark
        temporary
    >

      <v-list-item dark>
        <v-list-item-avatar>
          <Logo/>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Floracasy</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider style="background-color: #6DD0BF"></v-divider>

      <v-list dark>
        <v-list-item
            v-for="menuOption in menuOptions"
            :key="menuOption.id"
            link
        >
          <v-list-item-icon @click="navigateTo(menuOption.route)">
            <v-icon :color="menuOption.color">{{ menuOption.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content @click="navigateTo(menuOption.route)">
            <v-list-item-title style="color: #BABABA">{{ menuOption.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list two-line>
        <v-list-item>
          <v-btn class="button px-4 my-4" color="secondary-matte" outlined width="112" @click="logout">
            Log out
          </v-btn>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-main class="v-main">
      <div class="modal-style">
        <nuxt/>
      </div>
    </v-main>

    <v-bottom-navigation
        background-color="#3734E5"
        app
        shift
        dark
    >
      <v-btn v-for="menuOption in menuOptions" :key="menuOption.id"
             :to="menuOption.route">
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
      drawer: false,
    }
  },
  computed: {
    ...mapGetters(
        {
          menuOptions: 'BottomNavigation/getMenuOptions',
          activeLink: 'BottomNavigation/getActiveLink',
        },
    ),
    color() {
      return this.menuOptions[this.activeLink].color;
    },
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    async logout() {
      try {
        await this.$store.dispatch('logout')
        console.log(this.$store.state.authUser);
        await this.$router.push('/');
      } catch (e) {
      }
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

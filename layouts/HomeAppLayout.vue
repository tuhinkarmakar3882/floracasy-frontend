<template>
  <v-app>
    <v-app-bar app color="segment-background" dark elevate-on-scroll>
      <v-app-bar-nav-icon
          class="visible-upto-large"
          @click="drawer = !drawer"
      />

      <div class="brand">
        <nuxt-link class="brand-name" to="/"> Floracasy</nuxt-link>
      </div>
      <v-spacer/>
      <v-btn style="font-weight: 300 !important" text>
        Get Rewards
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        app
        color="card-background"
        dark
        overlay-color="body-background"
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

      <v-divider style="background-color: #6dd0bf"/>

      <v-list dark>
        <v-list-item
            v-for="menuOption in menuOptions"
            :key="menuOption.id"
            link
        >
          <v-list-item-icon @click="navigateTo(menuOption.route)">
            <v-icon :color="menuOption.color">
              {{ menuOption.icon }}
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content @click="navigateTo(menuOption.route)">
            <v-list-item-title style="color: #bababa">
              {{ menuOption.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list two-line>
        <v-list-item>
          <v-btn
              class="button px-4 my-4"
              color="secondary-matte"
              outlined
              width="112"
              @click="logout"
          >
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
        v-model="activeLink"
        app
        background-color="segment-background darken-1"
        color="secondary"
        dark
        max-width="100%"
        shift
    >
      <v-btn
          v-for="menuOption in menuOptions"
          :key="menuOption.id"
          :to="menuOption.route"
      >
        <span>{{ menuOption.text }}</span>

        <v-icon>{{ menuOption.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import {mapGetters} from "vuex"

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
    activeLink: {
      get() {
        return this.$store.state.BottomNavigation.activeLink
      },
      set(newValue) {
        console.log(newValue)
        // this.$store.commit('BottomNavigation/update', newValue)
      },
    },
    ...mapGetters({
      menuOptions: "BottomNavigation/getMenuOptions",
    }),
    color() {
      return this.menuOptions[this.activeLink].color
    },
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path)
    },
    async logout() {
      try {
        await this.$store.dispatch("logout")
        console.log(this.$store.state.authUser)
        await this.$router.push("/")
      } catch (e) {
      }
    },
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

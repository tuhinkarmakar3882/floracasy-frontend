<template>
  <header>
    <v-app-bar
        app
        color="body-background"
        dark
        elevate-on-scroll
        height="72"
        hide-on-scroll
    >
      <v-app-bar-nav-icon
          class="visible-upto-large"
          @click="drawer = !drawer"
      />

      <v-progress-linear
          :active="drawer"
          :indeterminate="drawer"
          absolute
          bottom
      />

      <v-spacer class="visible-upto-large"/>

      <div class="brand">
        <Logo :width="36"/>
        <nuxt-link class="brand-name" to="/"> Floracasy</nuxt-link>
      </div>

      <v-spacer class="visible-on-large-and-up"/>

      <ul class="visible-on-large-and-up">
        <li>
          <nuxt-link to="/GoPremium"> Go Premium</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/WriteAndEarn"> Write &amp; Earn</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/Authentication/GetStarted">
            <v-btn color="secondary" height="44" outlined width="112">
              Log in
            </v-btn>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/Authentication/GetStarted">
            <v-btn color="primary" height="44" width="112">
              Join Us
            </v-btn>
          </nuxt-link>
        </li>
      </ul>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app color="card-background" temporary>
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
            :key="menuOption.title"
            link
        >
          <v-list-item-icon @click="navigateTo(menuOption.route)">
            <v-icon :color="menuOption.color">
              {{ menuOption.icon }}
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content @click="navigateTo(menuOption.route)">
            <v-list-item-title style="color: #bababa">
              {{ menuOption.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list two-line>
        <v-list-item>
          <v-btn
              color="secondary"
              height="44"
              nuxt
              outlined
              to="/Authentication/GetStarted"
              width="112"
          >
            Log in
          </v-btn>
        </v-list-item>

        <v-list-item>
          <v-btn
              color="primary"
              height="44"
              nuxt
              to="/Authentication/GetStarted"
              width="112"
          >
            Join Us
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>
export default {
  name: "NavigationBar",
  components: {
    Logo: () => import("~/components/global/Logo"),
  },
  data() {
    return {
      drawer: false,
      menuOptions: [
        {
          title: "Go Premium",
          icon: "mdi-crown",
          color: "gold-tone",
          route: "/GoPremium",
        },
        {
          title: "Write & Earn",
          icon: "mdi-cash-usd",
          color: "eco-tick",
          route: "/WriteAndEarn",
        },
      ],
    }
  },
  methods: {
    navigateTo: function (path) {
      this.$router.push(path)
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

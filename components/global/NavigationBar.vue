<template>
  <header>
    <v-app-bar
        app
        color="body-background"
        elevate-on-scroll
        hide-on-scroll
        dark
        height="72"
    >
      <v-app-bar-nav-icon class="mobile-only" @click="drawer=!drawer"></v-app-bar-nav-icon>

      <v-progress-linear :active="drawer" :indeterminate="drawer" absolute bottom/>

      <v-spacer class="mobile-only"/>
      <div class="brand">
        <Logo :width="36"/>
        <nuxt-link class="brand-name" to="/">Floracasy</nuxt-link>
      </div>

      <v-spacer class="desktop-only"/>
      <!--TODO ISSUE IS WITH THE V_IF-->

      <div class="desktop-only">
        <ul>
          <li>
            <nuxt-link to="/">Go Premium</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/">Write &amp; Earn</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/">
              <v-btn color="secondary" height="44" outlined width="112">
                Log in
              </v-btn>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/CommentSection">
              <v-btn color="primary" height="44" width="112">
                Join Us
              </v-btn>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        app
        color="card-background"
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
            :key="menuOption.title"
            link
        >
          <v-list-item-icon>
            <v-icon :color="menuOption.color">{{ menuOption.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title style="color: #BABABA">{{ menuOption.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list two-line>
        <v-list-item>
          <v-btn color="secondary" height="44" nuxt outlined to="/" width="112">Log in</v-btn>
        </v-list-item>

        <v-list-item>
          <v-btn color="primary" height="44" nuxt to="/CommentSection" width="112">Join Us</v-btn>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
  </header>
</template>

<script>
export default {
  name: "NavigationBar",
  components: {
    Logo: () => import('~/components/global/Logo'),
  },
  data() {
    return {
      drawer: false,
      menuOptions: [
        {title: 'Go Premium', icon: 'mdi-crown', color: 'gold-tone'},
        {title: 'Write & Earn', icon: 'mdi-cash-usd', color: 'eco-tick'},
      ],
    }
  },
}
</script>

<style lang="scss">
@import "assets/variables";

$font-size: 18px;
.v-toolbar__content {
  padding-left: 64px;
  padding-right: 32px;
  flex-wrap: wrap;
  position: relative !important;

  @media only screen and (max-width: 1024px) {
    padding: 0 12px;
  }

  .mobile-only {
    display: block;

    @media only screen and (min-width: $large) {
      display: none;
    }
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

  .desktop-only {
    display: none;

    @media only screen and (min-width: $large) {
      display: block;
    }

    ul {
      list-style: none;
      display: flex;
      align-items: center;

      li {
        margin: 0 32px;
        font-size: $font-size;
        font-family: $Montaga;

        a {
          display: block;
          color: $white;
          text-decoration: none;
        }

        button {
          font-size: $font-size !important;
          text-transform: unset;
        }
      }
    }
  }

}
</style>

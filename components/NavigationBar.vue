<template>
  <header>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        app
        dark
        temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <Logo/>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>

        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        app
        color="body-background"
        elevate-on-scroll
        hide-on-scroll
    >

      <div class="brand">
        <Logo :width="45"/>
        <nuxt-link class="brand-name" to="/">Floracasy</nuxt-link>
      </div>

      <v-spacer/>

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
    </v-app-bar>
  </header>
</template>

<script>
export default {
  name: "NavigationBar",
  components: {
    Logo: () => import('@/components/Logo'),
  },
  data() {
    return {
      drawer: true,
      items: [
        {title: 'Home', icon: 'mdi-home'},
        {title: 'About', icon: 'mdi-information'},
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
  border: 1px solid red;
  position: relative !important;

  @media only screen and (max-width: 1024px) {
    padding: 8px 12px;
    height: 200px !important;

  }

  .brand {
    display: flex;
    align-items: center;

    .brand-name {
      margin-left: 12px;
      font-size: 24px;
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
</style>

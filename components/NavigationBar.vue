<template>
  <v-app-bar
      color="body-background"
      elevate-on-scroll
      height="80"
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
</template>

<script>
export default {
  name: "NavigationBar",
  components: {
    Logo: () => import('@/components/Logo'),
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

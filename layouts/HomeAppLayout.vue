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
        v-model="value"
        :background-color="color"
        app
        dark
        shift
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
  </v-app>
</template>

<script>
import Logo from "~/components/global/Logo";

export default {
  name: "HomeAppLayout",
  components: {Logo},
  data: () => ({value: 1}),

  computed: {
    color() {
      switch (this.value) {
        case 0:
          return 'blue-grey'
        case 1:
          return 'teal'
        case 2:
          return 'brown'
        case 3:
          return 'indigo'
        default:
          return 'blue-grey'
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

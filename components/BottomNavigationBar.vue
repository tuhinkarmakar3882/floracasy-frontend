<template>
  <v-bottom-navigation
      app
      v-model="bottomNav"
      dark
      shift
      hide-on-scroll
  >
    <v-btn>
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn>
      <span>Blogs</span>
      <v-icon>mdi-book</v-icon>
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
</template>

<script>
export default {
  name: 'BottomNavigationBar',
  data() {
    return {
      bottomNav: 3,
    }
  },

  computed: {
    color() {
      switch (this.bottomNav) {
        case 0:
          return 'blue-grey'
        case 1:
          return 'teal'
        case 2:
          return 'brown'
        case 3:
          return 'indigo'
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import 'styles/themeData';

body {
  background: white;
  transition: all .5s;
}

</style>

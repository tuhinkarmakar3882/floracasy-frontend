<template>
  <v-bottom-navigation
      app
      v-model="bottomNavigationPosition"
      :color="color"
      shift
      background-color="white"
  >

    <v-btn v-for="(menuOption,index) in menuOptions" :key="index"
           @click="updateBottomNavigationAndMoveTo(index, menuOption.route)">
      <span>{{ menuOption.name }}</span>
      <v-icon>{{ menuOption.icon }}</v-icon>
    </v-btn>

  </v-bottom-navigation>
</template>

<script>
// todo REMEMBER TO MAKE THIS FILE GO IN SYNC
export default {
  name: 'BottomNavigationBar',
  data() {
    return {
      menuOptions: [
        {
          name: "Home",
          icon: "mdi-home",
          route: '/',
        },
        {
          name: "Blogs",
          icon: "mdi-book",
          route: '/blogs/home',
        },
      ],
      bottomNavigationPosition: 0,
    }
  },

  computed: {
    color() {
      switch (this.bottomNavigationPosition) {
        case 0:
          return 'primary'
        case 1:
          return 'green'
      }
    },
  },

  methods: {

    updateBottomNavigationAndMoveTo(bottomNavigationPosition, route) {
      this.$router.push({path: route})
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'styles/themeData';

body {
  background: white;
  transition: all .5s;
}

</style>

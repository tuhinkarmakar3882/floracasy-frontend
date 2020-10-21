<template>
  <div class="app-layout">
    <header>
      <h6><a class="brand-name" href="/"> Floracasy</a></h6>
      <img src="http://picsum.photos/100" alt="userIcon" />
    </header>

    <main>
      <nuxt />
    </main>

    <footer>
      <nuxt-link
        v-for="(menuOption, index) in menuOptions"
        :id="index === activeLink ? 'activeNow' : ''"
        :key="menuOption.id"
        :to="menuOption.route"
      >
        {{ menuOption.text }}
      </nuxt-link>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MobileApp',
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
        // console.log(newValue)
        this.$store.commit('BottomNavigation/update', newValue)
      },
    },
    ...mapGetters({
      menuOptions: 'BottomNavigation/getMenuOptions',
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
        await this.$store.dispatch('logout')
        // console.log(this.$store.state.authUser)
        await this.$router.push('/')
      } catch (e) {}
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

$font-size: 18px;
$nav-bar-bg: #0d0d17;
.app-layout {
  header,
  footer {
    z-index: 100;
    position: fixed;
    left: 0;
    background: $nav-bar-bg;
    width: 100%;
    height: 64px;
  }

  a {
    display: grid;
    place-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
    color: #cacaca;
  }

  header {
    top: 0;
    padding: 0 $medium-space;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h6 {
      font-size: 20px;

      a {
        text-decoration: none;
        color: white;
      }
    }
    img {
      border-radius: 50%;
      width: 40px;
      object-fit: cover;
    }
  }

  footer {
    bottom: 0;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(5, 1fr);

    #activeNow {
      color: yellow;
    }
  }

  main {
    padding: 64px 0;
  }
}
</style>

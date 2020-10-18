<template>
  <div class="app-layout">
    <header class="px-3">
      <h5><a class="brand-name" href="/"> Floracasy</a></h5>
      <RippleButton class-list="primary-btn">Get Rewards</RippleButton>
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
import RippleButton from '~/components/global/RippleButton'

export default {
  name: 'MobileApp',
  components: { RippleButton },
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

.app-layout {
  header,
  footer {
    z-index: 100;
    position: fixed;
    left: 0;
    background: #2c2c3b;
    width: 100%;
    height: 64px;
  }

  header {
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  footer {
    bottom: 0;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(5, 1fr);

    a {
      display: grid;
      place-items: center;
      text-align: center;
      width: 100%;
      height: 100%;
      color: #cacaca;
    }

    #activeNow {
      color: yellow;
    }
  }

  main {
    padding: 64px 0;
  }
}
</style>

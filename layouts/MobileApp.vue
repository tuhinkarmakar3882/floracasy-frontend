<template>
  <div class="app-layout">
    <header>
      <h6>
        <a class="brand-name" href="/" style="color: white !important">
          Floracasy
        </a>
      </h6>
      <nuxt-link to="/Home/Messages">
        <h5 class="mdi mdi-message-text" />
      </nuxt-link>
    </header>

    <main>
      <nuxt />
    </main>

    <footer>
      <nuxt-link
        v-for="(menuOption, index) in menuOptions"
        :id="index === activeLink ? 'active-bottom-nav-link' : ''"
        :key="menuOption.id"
        v-ripple="'rgba(255, 255, 255, .2)'"
        :to="menuOption.route"
      >
        <span
          :class="`mdi ${menuOption.icon}${
            index !== activeLink ? '-outline' : ''
          }`"
          style="
            transition: all 0.2s linear;
            margin-bottom: -2px;
            font-size: 22px;
          "
        />
        <small style="transition: all 0.2s linear; font-size: 12.3px">
          {{ menuOption.text }}
        </small>
      </nuxt-link>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MobileApp',
  components: {},
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
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.app-layout {
  header,
  footer {
    z-index: $bring-to-front;
    position: fixed;
    left: 0;
    background: $nav-bar-bg;
    width: 100%;
    height: 2 * $x-large-unit;
  }

  footer {
    box-shadow: $up-only-box-shadow;
    bottom: 0;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(5, 1fr);

    a {
      text-decoration: none;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      width: 100%;
      height: 100%;
      color: $muted;
    }

    #active-bottom-nav-link {
      color: $secondary-highlight;
    }
  }

  header {
    box-shadow: $down-only-box-shadow;
    top: 0;
    padding: 0 $medium-unit;
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
  }

  main {
    padding: 2 * $x-large-unit 0;
  }
}
</style>

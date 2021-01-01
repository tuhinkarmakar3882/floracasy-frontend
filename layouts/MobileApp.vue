<template>
  <div class="app-layout">
    <header>
      <nuxt-link v-ripple="" :to="navigationRoutes.index">
        <h6>Floracasy</h6>
      </nuxt-link>

      <div class="ml-auto" style="display: flex">
        <nuxt-link
          v-for="(option, index) in topNavMenuOptions"
          :key="option.id"
          v-ripple="'rgba(255, 255, 255, .2)'"
          :to="option.route"
          :aria-label="option.text"
        >
          <h5
            class="mdi"
            :class="
              index === topNavActiveLink
                ? [option.activeIcon, 'secondary']
                : option.icon
            "
          />
        </nuxt-link>
      </div>
    </header>

    <main style="min-height: 100vh">
      <NotificationBadge
        @click="navigateTo(navigationRoutes.Home.Notifications.index)"
      />
      <section class="main-router-content">
        <nuxt />
      </section>
    </main>

    <footer>
      <section
        v-for="(menuOption, index) in bottomNavMenuOptions"
        :id="index === activeLink ? 'active-nav-link' : ''"
        :key="menuOption.id"
        v-ripple="'rgba(255, 255, 255, .2)'"
        @click="goto(menuOption.route)"
      >
        <span
          :class="[
            index !== activeLink ? menuOption.icon : menuOption.activeIcon,
            newContentAvailable[index] ? 'has-notification' : '',
          ]"
          :style="{ fontSize: index === activeLink ? '22px' : '24px' }"
          class="mdi menu-option-icon"
        />
        <small
          class="menu-option-text"
          :style="{ height: index === activeLink ? '20px' : 0 }"
        >
          {{ menuOption.text }}
        </small>
      </section>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import NotificationBadge from '@/components/global/NotificationBadge'

export default {
  name: 'MobileApp',
  components: { NotificationBadge },
  data() {
    return {
      navigationRoutes,
      drawer: false,
    }
  },
  computed: {
    topNavActiveLink: {
      get() {
        return this.$store.state.NavigationState.topNavActiveLink
      },
      set(newValue) {
        this.$store.commit('NavigationState/updateTopNavActiveLink', newValue)
      },
    },

    activeLink: {
      get() {
        return this.$store.state.NavigationState.activeLink
      },
      set(newValue) {
        this.$store.commit(
          'NavigationState/updateBottomNavActiveLink',
          newValue
        )
      },
    },
    ...mapGetters({
      bottomNavMenuOptions: 'NavigationState/getBottomNavMenuOptions',
      topNavMenuOptions: 'NavigationState/getTopNavMenuOptions',
      newContentAvailable: 'NavigationState/getNewContentAvailableInfo',
    }),

    color() {
      return this.bottomNavMenuOptions[this.activeLink].color
    },
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path)
    },
    async goto(path) {
      await this.$router.push(path)
      window.scrollTo(0, 0)
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

    section {
      text-decoration: none;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      width: 100%;
      height: 100%;
      color: $muted;
      font-size: 20px;

      .menu-option-text {
        transition: all 0.2s linear;
        font-size: 12.3px;
        overflow: hidden;
      }

      .menu-option-icon {
        transition: all 0.2s ease-in-out;
        margin-bottom: -2px;
        position: relative;
      }

      .has-notification {
        &::after {
          content: '';
          position: absolute;
          height: 6px;
          width: 6px;
          background-color: #8ff2e1;
          border-radius: 50%;
          top: 0;
          right: 0;
        }
      }
    }

    #active-nav-link {
      color: $secondary-highlight;
    }
  }

  header {
    box-shadow: $down-only-box-shadow;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;

    a {
      text-decoration: none;
      color: white !important;
      position: relative;
      padding: 0 24px;
      height: 56px;
      display: flex;
      align-items: center;
    }
  }

  main {
    padding: 2 * $x-large-unit 0;

    .main-router-content {
      max-width: $max-width;
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>

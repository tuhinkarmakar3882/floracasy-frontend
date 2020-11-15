<template>
  <div class="app-layout">
    <header>
      <h6 v-ripple>
        <nuxt-link class="brand-name" to="/" style="color: white !important">
          Floracasy
        </nuxt-link>
      </h6>
      <nuxt-link to="/Home/Messages">
        <h5 class="mdi mdi-message-text" />
      </nuxt-link>
    </header>

    <main>
      <div
        class="notification-badge"
        :style="[{ height: socketMessage ? '56px' : 0 }]"
        @click="navigateTo(navigationRoutes.Home.Notifications.index)"
      >
        <span class="mdi mdi-bell mr-3" />
        <p>{{ socketMessage }}</p>
      </div>
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
          :class="[
            index !== activeLink
              ? menuOption.icon + '-outline'
              : menuOption.icon,
            newContentAvailable[index] ? 'has-notification' : '',
          ]"
          class="mdi"
          style="
            transition: all 0.2s ease-in-out;
            margin-bottom: -2px;
            font-size: 22px;
            position: relative;
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
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'MobileApp',
  components: {},
  data() {
    return {
      navigationRoutes,
      drawer: false,
    }
  },
  computed: {
    activeLink: {
      get() {
        return this.$store.state.BottomNavigation.activeLink
      },
      set(newValue) {
        this.$store.commit('BottomNavigation/update', newValue)
      },
    },
    ...mapGetters({
      menuOptions: 'BottomNavigation/getMenuOptions',
      newContentAvailable: 'BottomNavigation/getNewContentAvailableInfo',
      socketMessage: 'SocketHandler/getSocketMessage',
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

    .notification-badge {
      position: fixed;
      overflow: hidden;
      text-align: center;
      background: #1d1d1d;
      transition: all 300ms ease-in-out;
      height: 2 * $x-large-unit;
      width: 100%;
      z-index: 9999999;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        color: rgb(143, 242, 224);
        font-weight: 500;
        font-size: 13px !important;
      }

      span {
        color: rgb(143, 242, 224);
        font-size: 20px;
        animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both 0.3s;

        @keyframes shake {
          10%,
          90% {
            transform: translate3d(-1px, 0, 0);
          }

          20%,
          80% {
            transform: translate3d(2px, 0, 0);
          }

          30%,
          50%,
          70% {
            transform: translate3d(-4px, 0, 0);
          }

          40%,
          60% {
            transform: translate3d(4px, 0, 0);
          }
        }
      }
    }
  }
}
</style>

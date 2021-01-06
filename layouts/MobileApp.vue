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
                : [option.icon, 'muted']
            "
          />
        </nuxt-link>
      </div>
    </header>

    <main style="min-height: 100vh">
      <NotificationBadge
        @click="goto(navigationRoutes.Home.Notifications.index)"
      />
      <section class="main-router-content">
        <nuxt />
      </section>
    </main>

    <footer>
      <div
        v-for="(menuOption, index) in bottomNavMenuOptions"
        :key="menuOption.id"
      >
        <section
          v-if="index !== 2"
          :id="index === activeLink ? 'active-nav-link' : ''"
          v-ripple="'rgba(255, 255, 255, .2)'"
          :aria-label="menuOption.text"
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

        <section
          v-else
          v-ripple="'rgba(255, 255, 255, .2)'"
          :class="showFragment ? 'active-nav-link' : ''"
          :aria-label="menuOption.text"
          @click="openCreateFragment"
        >
          <span
            :class="showFragment ? menuOption.activeIcon : menuOption.icon"
            :style="[
              showFragment && { transform: 'rotate(45deg)' },
              { fontSize: showFragment ? '36px' : '22px' },
            ]"
            class="mdi menu-option-icon"
          />
        </section>
      </div>
    </footer>

    <transition name="slide-up">
      <aside v-if="showFragment">
        <CustomListView>
          <template slot="list-items">
            <li
              v-for="(option, index) in fragmentOptions"
              :key="index"
              v-ripple="`${option.color}5F`"
              class="px-4 py-2"
              @click="goto(option.route)"
            >
              <p>
                <span
                  class="icon"
                  :class="option.icon"
                  :style="{ color: option.color }"
                />
                <span class="option-name">{{ option.name }}</span>
                <span class="mdi mdi-chevron-right arrow-go" />
              </p>
            </li>
          </template>
        </CustomListView>
      </aside>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import NotificationBadge from '@/components/global/NotificationBadge'
import CustomListView from '~/components/global/Layout/CustomListView'

export default {
  name: 'MobileApp',
  components: { CustomListView, NotificationBadge },

  data() {
    return {
      navigationRoutes,
      showFragment: false,
      fragmentOptions: [
        {
          name: 'Write New Blog',
          icon: 'mdi mdi-pencil-circle',
          color: '#f8e102',
          route: navigationRoutes.Home.Blogs.Create.New,
        },
        {
          name: 'Add New Post',
          icon: 'mdi mdi-tooltip-plus',
          color: '#8FF2E1',
          route: navigationRoutes.Home.Blogs.Create.New,
        },
        {
          name: 'Add New Story',
          icon: 'mdi mdi-plus-box',
          color: '#5dd75d',
          route: navigationRoutes.Home.Blogs.Create.New,
        },
        // {
        //   name: 'Start from Drafts',
        //   icon: 'mdi mdi-file',
        //   color: '#b377bd',
        //   route: navigationRoutes.Home.Blogs.Create.Drafts,
        // },
      ],
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

  mounted() {
    this.$router.beforeEach((to, _, next) => {
      if (to.hash === '') {
        this.showFragment = false
      }
      next()
    })
  },

  beforeDestroy() {
    this.$router.beforeEach((__, _, next) => {
      next()
    })
  },

  methods: {
    async goto(path) {
      await this.$router.push(path)
      window.scrollTo(0, 0)
    },

    openCreateFragment() {
      this.showFragment = !this.showFragment
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

    section,
    div {
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

    .active-nav-link {
      color: $danger-light;
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

  aside {
    text-align: center;
    max-height: 50vh;
    overflow: scroll;
    width: 100%;
    box-shadow: $up-only-box-shadow;
    position: fixed;
    bottom: 56px;
    left: 0;
    z-index: 1;
    border-top-left-radius: 36px;
    border-top-right-radius: 36px;
    background: $segment-background;
  }
}
</style>

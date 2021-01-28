<template>
  <div class="responsive-layout">
    <section class="desktop-app-layout">
      <header>
        <nuxt-link v-ripple="" :to="navigationRoutes.index">
          <h6>Floracasy</h6>
        </nuxt-link>

        <div class="ml-auto" style="display: flex">
          <nuxt-link
            v-for="(option, index) in topNavMenuOptions"
            :key="option.id"
            v-ripple="'rgba(255, 255, 255, .2)'"
            :aria-label="option.text"
            :to="option.route"
          >
            <img
              v-if="index === 1 && user"
              :src="user.photoURL"
              alt=""
              class="profile-image"
              height="56"
              width="56"
            />
            <h5
              v-else
              :class="
                index === topNavActiveLink
                  ? [option.activeIcon, 'secondary']
                  : [option.icon, 'muted']
              "
              class="mdi"
            />
          </nuxt-link>
        </div>
      </header>
      <footer>
        <div>
          <Logo :width="36" />
        </div>

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
              :style="{ fontSize: index === activeLink ? '32px' : '24px' }"
              class="mdi menu-option-icon"
            />
            <span class="menu-option-text text-left">
              {{ menuOption.text }}
            </span>
          </section>

          <section
            v-else
            v-ripple="'rgba(255, 255, 255, .2)'"
            :aria-label="menuOption.text"
            :class="showFragment ? 'active-nav-link' : ''"
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
            <!--          <small style="width: 12ch" class="menu-option-text text-left ml-2">-->
            <!--            {{ menuOption.text }}-->
            <!--          </small>-->
          </section>
        </div>
      </footer>
      <transition name="slide-right">
        <aside v-if="showFragment" tabindex="0" @click="showFragment = false">
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
                    :class="option.icon"
                    :style="{ color: option.color }"
                    class="icon"
                  />
                  <span class="option-name">{{ option.name }}</span>
                  <span class="mdi mdi-chevron-right arrow-go" />
                </p>
              </li>
            </template>
          </CustomListView>
        </aside>
      </transition>
    </section>

    <main>
      <NotificationBadge
        @click="goto(navigationRoutes.Home.Notifications.index)"
      />
      <section class="main-router-content">
        <nuxt />
      </section>
    </main>

    <section class="mobile-app-layout">
      <header>
        <nuxt-link v-ripple="" :to="navigationRoutes.index">
          <h6>Floracasy</h6>
        </nuxt-link>

        <div class="ml-auto" style="display: flex">
          <nuxt-link
            v-for="(option, index) in topNavMenuOptions"
            :key="option.id"
            v-ripple="'rgba(255, 255, 255, .2)'"
            :aria-label="option.text"
            :to="option.route"
          >
            <img
              v-if="index === 1 && user"
              :src="user.photoURL"
              alt=""
              class="profile-image"
              height="56"
              width="56"
            />
            <h5
              v-else
              :class="
                index === topNavActiveLink
                  ? [option.activeIcon, 'secondary']
                  : [option.icon, 'muted']
              "
              class="mdi"
            />
          </nuxt-link>
        </div>
      </header>
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
              :style="{ height: index === activeLink ? '20px' : 0 }"
              class="menu-option-text"
            >
              {{ menuOption.text }}
            </small>
          </section>

          <section
            v-else
            v-ripple="'rgba(255, 255, 255, .2)'"
            :aria-label="menuOption.text"
            :class="showFragment ? 'active-nav-link' : ''"
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
            <template slot="heading">
              <h6 class="heading-title mb-0">What do you want to do?</h6>
            </template>
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
                    :class="option.icon"
                    :style="{ color: option.color }"
                    class="icon"
                  />
                  <span class="option-name">{{ option.name }}</span>
                  <span
                    :style="{ color: `${option.color}7F` }"
                    class="mdi mdi-chevron-right arrow-go"
                  />
                </p>
              </li>
            </template>
          </CustomListView>
        </aside>
      </transition>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import NotificationBadge from '@/components/global/NotificationBadge'
import CustomListView from '~/components/global/Layout/CustomListView'
import Logo from '~/components/global/Logo'

export default {
  name: 'MobileApp',
  components: { Logo, CustomListView, NotificationBadge },

  data() {
    return {
      navigationRoutes,
      showFragment: false,
      showTopBar: true,
      fragmentOptions: [
        {
          name: 'Create New Blog',
          icon: 'mdi mdi-newspaper-variant',
          color: '#8FF2E1',
          route: navigationRoutes.Home.Blogs.Create.New,
        },
        {
          name: 'Create New Post',
          icon: 'mdi mdi-pencil-box-multiple-outline',
          color: '#f8e102',
          route: navigationRoutes.Home.Community.Posts.add,
        },
        {
          name: 'Create New Story',
          icon: 'mdi mdi-thought-bubble-outline',
          color: '#5dd75d',
          route: navigationRoutes.Home.Community.Story.add,
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
      user: 'UserManagement/getUser',
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
      this.showTopBar = true
    },

    async openCreateFragment() {
      this.showFragment = !this.showFragment
      if (this.showFragment) {
        await this.$router.push('#createNew')
      } else await this.$router.back()
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.responsive-layout {
  * {
    transition: all 300ms ease-in-out;
  }

  .desktop-app-layout {
    display: none;

    @media only screen and (min-width: $small) {
      display: block;
    }

    * {
      transition: all 0.2s ease-in-out;
    }

    header,
    footer {
      position: fixed;
      background: $nav-bar-bg;
    }

    footer {
      z-index: $bring-to-front + $bring-to-front;
      height: 100vh;
      width: 2 * $xxx-large-unit;
      box-shadow: $right-only-box-shadow;
      top: 0;
      bottom: 0;
      left: 0;
      display: grid;
      place-items: center;
      grid-template-rows: 56px repeat(5, 100px);

      section,
      div {
        display: grid;
        grid-template-columns: 1fr auto;
        place-items: center;
        text-decoration: none;
        width: 2 * $xxx-large-unit;
        height: 100%;
        color: $muted;
        font-size: 20px;

        .menu-option-text {
          transition: all 0.2s linear;
          font-size: 16px;
          overflow: hidden;
          width: 12ch;
          opacity: 0;
          margin-left: 0;
          display: none;
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

      //&:hover {
      //  width: 18.5ch;
      //  border-radius: 0 36px 36px 0;
      //
      //  section,
      //  div {
      //    width: 15ch;
      //  }
      //  .menu-option-text {
      //    opacity: 1;
      //    margin-left: 12px;
      //  }
      //}

      #active-nav-link {
        color: $white;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          border-radius: 0 50px 50px 0;
          left: 0;
          top: 20px;
          height: 60px;
          width: 120%;
          box-shadow: $right-only-box-shadow;
          background: $active-gradient;
          z-index: -1;
        }
      }

      .active-nav-link {
        color: $danger-light;
      }
    }

    header {
      z-index: $bring-to-front;
      height: 2 * $x-large-unit;
      box-shadow: $down-only-box-shadow;
      top: 0;
      right: 0;
      left: 2 * $xxx-large-unit;
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

    aside {
      text-align: center;
      overflow: scroll;
      width: 9 * $xxx-large-unit;
      box-shadow: $up-only-box-shadow;
      position: fixed;
      left: 2 * $xxx-large-unit;
      top: 2 * $x-large-unit;
      bottom: 0;
      z-index: $bring-to-front - 10;
      border-top-right-radius: 36px;
      border-bottom-right-radius: 36px;
      background: $segment-background;
    }
  }

  .mobile-app-layout {
    display: block;

    @media only screen and (min-width: $small) {
      display: none;
    }

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

    aside {
      text-align: center;
      max-height: 50vh;
      overflow: scroll;
      width: 100%;
      box-shadow: $up-only-box-shadow;
      position: fixed;
      bottom: 56px;
      left: 0;
      z-index: $bring-to-front - 10;
      border-top-left-radius: 36px;
      border-top-right-radius: 36px;
      background: $segment-background;
    }
  }

  main {
    min-height: calc(100vh - 200px);
    padding: 2 * $x-large-unit 0;
    @media only screen and (min-width: $small) {
      margin-left: 2 * $xxx-large-unit;
    }

    .main-router-content {
      margin-left: auto;
      margin-right: auto;
    }
  }

  $size: 36px;

  .profile-image {
    min-width: $size;
    width: $size;
    max-width: $size;
    min-height: $size;
    height: $size;
    max-height: $size;
    size: $size;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: $default-box-shadow;
  }
}
</style>

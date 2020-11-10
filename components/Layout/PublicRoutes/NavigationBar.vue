<template>
  <header class="navigation-bar-page">
    <h5
      v-ripple
      class="mdi px-3 mdi-menu"
      @click="drawerIsOpened = !drawerIsOpened"
    />
    <section class="brand" @click="navigateTo('/')">
      <!--      <Logo :width="36" />-->
      <h6 v-ripple class="brand-name">Floracasy</h6>
    </section>
    <button
      v-ripple
      class="secondary-outlined-btn ml-auto"
      style="min-width: auto"
      @click="$router.push('/Authentication/SignInToContinue')"
    >
      Get Started
    </button>

    <div
      class="nav-drawer"
      :style="
        drawerIsOpened
          ? {
              width: '70vw',
              transform: 'translateX(0)',
              overflow: 'scroll',
            }
          : {
              width: 0,
              transform: 'translateX(-100%)',
              overflow: 'hidden',
            }
      "
    >
      <ul class="nav-drawer-options py-4">
        <li class="my-2">
          <button
            v-ripple
            class="secondary-btn"
            @click="navigateTo('/PublicRoutes/GoPremium')"
          >
            Go Premium
          </button>
        </li>
        <li class="my-2">
          <button
            v-ripple
            class="secondary-btn"
            @click="navigateTo('/PublicRoutes/WriteAndEarn')"
          >
            Write &amp; Earn
          </button>
        </li>
        <li class="my-2">
          <button v-ripple class="danger-outlined-btn" @click="exitApp">
            Exit app
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: 'NavigationBar',
  components: {},
  data() {
    return {
      drawerIsOpened: false,
      menuOptions: [
        {
          title: 'Go Premium',
          icon: 'mdi-crown',
          color: 'gold-tone',
          route: '/GoPremium',
        },
        {
          title: 'Write & Earn',
          icon: 'mdi-cash-usd',
          color: 'eco-tick',
          route: '/WriteAndEarn',
        },
      ],
    }
  },
  methods: {
    async navigateTo(path) {
      await this.$router.push(path)
      this.drawerIsOpened = false
    },
    exitApp() {
      alert('eventually this will close the app')
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.navigation-bar-page {
  position: sticky;
  top: -$single-unit;
  z-index: $bring-to-front;
  background-color: $nav-bar-bg;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: $milli-unit $micro-unit;
  box-shadow: $down-only-box-shadow;

  @media only screen and (min-width: 1024px) {
    padding-left: 64px;
    padding-right: 32px;
  }

  .brand {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;

    li {
      font-family: $Nunito-Sans;
    }
  }

  .nav-drawer {
    position: absolute;
    top: 2 * $xx-large-unit;
    left: 0;
    min-height: 100vh;
    background-color: $nav-bar-bg;
    box-shadow: $right-only-box-shadow;
    z-index: $bring-to-zero-level;
    transition: all 300ms ease-in-out;

    .nav-drawer-options {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

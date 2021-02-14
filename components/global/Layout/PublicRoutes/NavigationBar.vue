<template>
  <header class="navigation-bar-page">
    <span
      v-ripple
      class="mdi mdi-menu icon"
      @click="drawerIsOpened = !drawerIsOpened"
    />
    <h6 v-ripple class="brand" @click="navigateTo('/')">Floracasy</h6>

    <button
      v-ripple
      class="secondary-outlined-btn ml-auto"
      @click="$router.push('/Authentication/SignInToContinue')"
    >
      Get Started
    </button>

    <div
      class="nav-drawer"
      :style="drawerIsOpened ? visibleStyles : hiddenStyles"
    >
      <ul class="nav-drawer-options py-4">
        Add your Options
      </ul>
      <LazyInstallBadge class="mt-auto" />
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
      visibleStyles: {
        width: '70vw',
        transform: 'translateX(0)',
        overflow: 'scroll',
      },
      hiddenStyles: {
        width: 0,
        transform: 'translateX(-100%)',
        overflow: 'hidden',
      },
      menuOptions: [
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
      await this.$router.push(
        path,
        () => {
          this.drawerIsOpened = false
        },
        () => {
          this.drawerIsOpened = false
        }
      )
    },
    exitApp() {
      alert('eventually this will close the app')
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

button {
  min-width: auto;
}

.navigation-bar-page {
  position: sticky;
  top: -$single-unit;
  z-index: $bring-to-front;
  background-color: $nav-bar-bg;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  height: 2 * $x-large-unit;
  margin: 0;
  box-shadow: $down-only-box-shadow;

  h6,
  .icon {
    display: flex;
    align-items: center;
    height: 2 * $x-large-unit;
    margin: 0;
    color: white;
  }

  h6 {
    padding: 0 0.3rem;
  }

  .icon {
    font-size: $large-unit;
    padding: 0 0.9rem 0 1rem;
  }

  button {
    height: 2 * $medium-unit;
    margin-right: $micro-unit;
  }

  @media only screen and (min-width: $max-width) {
    padding-left: 64px;
    padding-right: 32px;
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
    top: 2 * $x-large-unit;
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

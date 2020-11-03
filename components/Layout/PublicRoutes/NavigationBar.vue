<template>
  <header class="navigation-bar-page">
    <h5 v-ripple class="mdi px-3 mdi-menu"></h5>
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

    <!--    <div class="nav-drawer">-->
    <!--      <ul>-->
    <!--        <li>-->
    <!--          <button-->
    <!--            v-ripple-->
    <!--            class="secondary-btn"-->
    <!--            @click="$router.push('/PublicRoutes/GoPremium')"-->
    <!--          >-->
    <!--            Go Premium-->
    <!--          </button>-->
    <!--        </li>-->
    <!--        <li>-->
    <!--          <button-->
    <!--            v-ripple-->
    <!--            class="secondary-btn"-->
    <!--            @click="$router.push('/PublicRoutes/WriteAndEarn')"-->
    <!--          >-->
    <!--            Write &amp; Earn-->
    <!--          </button>-->
    <!--        </li>-->
    <!--      </ul>-->
    <!--    </div>-->
  </header>
</template>

<script>
export default {
  name: 'NavigationBar',
  components: {},
  data() {
    return {
      drawer: false,
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
    navigateTo(path) {
      this.$router.push(path)
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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;

    li {
      font-family: $Nunito-Sans;
    }
  }
}
</style>

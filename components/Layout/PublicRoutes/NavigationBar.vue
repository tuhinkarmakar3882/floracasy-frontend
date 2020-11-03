<template>
  <header class="navigation-bar-page dbx">
    <section class="brand dbx" @click="navigateTo('/')">
      <Logo :width="36" />
      <p class="brand-name">Floracasy</p>
    </section>

    <ul>
      <li>
        <button
          v-ripple
          class="secondary-btn"
          @click="$router.push('/PublicRoutes/GoPremium')"
        >
          Go Premium
        </button>
      </li>
      <li>
        <button
          v-ripple
          class="secondary-btn"
          @click="$router.push('/PublicRoutes/WriteAndEarn')"
        >
          Write &amp; Earn
        </button>
      </li>
      <li>
        <button
          v-ripple
          class="secondary-btn"
          @click="$router.push('/Authentication/SignInToContinue')"
        >
          Log in or Sign up
        </button>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'NavigationBar',
  components: {
    Logo: () => import('~/components/global/Logo'),
  },
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
  display: flex;
  flex-wrap: wrap;
  padding: $standard-unit $micro-unit;

  @media only screen and (min-width: 1024px) {
    padding-left: 64px;
    padding-right: 32px;
  }

  .brand {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .brand-name {
      margin-left: 12px;
      font-size: 20px;
      color: $white;
      text-decoration: none;
      font-family: $Prata;
    }
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

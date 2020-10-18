<template>
  <header>
    <div>
      <div class="visible-upto-large" @click="drawer = !drawer" />

      <div class="progress-bar" />

      <div class="spacer visible-upto-large" />

      <div class="brand">
        <Logo :width="36" />
        <nuxt-link class="brand-name" to="/"> Floracasy</nuxt-link>
      </div>

      <div class="spacer visible-on-large-and-up" />

      <ul class="visible-on-large-and-up">
        <li>
          <nuxt-link to="/GoPremium"> Go Premium</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/WriteAndEarn"> Write &amp; Earn</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/Authentication/GetStarted">
            <button>Log in</button>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/Authentication/GetStarted">
            <button>Join Us</button>
          </nuxt-link>
        </li>
      </ul>
    </div>
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

$font-size: 18px;
.v-toolbar__content {
  flex-wrap: wrap;
  padding: 4px 16px !important;

  @media only screen and (min-width: 1024px) {
    padding-left: 64px !important;
    padding-right: 32px !important;
  }

  .brand {
    display: flex;
    align-items: center;

    .brand-name {
      margin-left: 12px;
      font-size: 20px;
      color: $white;
      text-decoration: none;
      font-family: $Prata;
    }
  }

  ul {
    list-style: none;
    display: flex;
    align-items: center;

    li {
      margin: 0 32px;
      font-size: $font-size;
      font-family: $Nunito-Sans;

      a {
        display: block;
        color: $white;
        text-decoration: none;
      }

      button {
        font-size: $font-size !important;
        font-weight: 400 !important;
      }
    }
  }
}
</style>

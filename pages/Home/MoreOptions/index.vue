<template>
  <div class="more-options-page">
    <h3 class="heading-title">More Options</h3>
    <ul>
      <li
        v-for="(option, index) in options"
        :key="index"
        v-ripple="`${option.color}5F`"
        class="px-4 py-2"
        @click="$router.push(option.route)"
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
      <li v-ripple="'#f774795F'" class="px-4 py-3" @click="logout">
        <p>
          <span class="icon mdi mdi-power" style="color: #f77479" />
          <span class="option-name">Log out</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import endpoints from '@/api/endpoints'

export default {
  name: 'MoreOptions',
  middleware: 'isAuthenticated',
  layout: 'MobileApp',
  data() {
    return {
      options: [
        {
          name: 'Preference',
          icon: 'mdi mdi-cog',
          color: '#8FF2E1',
          route: '/Home/MoreOptions/Preferences',
        },
        {
          name: 'Go Premium',
          icon: 'mdi mdi-crown',
          color: '#f8e102',
          route: '/Home/MoreOptions/GoPremium',
        },
        {
          name: 'Payments',
          icon: 'mdi mdi-wallet',
          color: '#329b32',
          route: '/Home/MoreOptions/Payments',
        },
        {
          name: 'Write & Earn',
          icon: 'mdi mdi-currency-usd',
          color: '#f5a049',
          route: '/Home/MoreOptions/WriteAndEarn',
        },
        {
          name: 'Refer & Earn',
          icon: 'mdi mdi-account-multiple-plus',
          color: '#00B4B4',
          route: '/Home/MoreOptions',
        },
        {
          name: 'About Us',
          icon: 'mdi mdi-information',
          color: '#8c70fd',
          route: '/Home/MoreOptions/About',
        },
        {
          name: 'Help & Support',
          icon: 'mdi mdi-lifebuoy',
          color: '#5dd75d',
          route: '/Home/MoreOptions/HelpAndSupport',
        },
        {
          name: 'FAQ',
          icon: 'mdi mdi-help-circle',
          color: '#ABEDAB',
          route: '/Home/MoreOptions/FAQ',
        },
      ],
    }
  },
  mounted() {
    this.$store.commit('BottomNavigation/update', { linkPosition: 4 })
  },
  methods: {
    async performLogout() {
      await this.$axios.setToken(false)
      await this.$store.dispatch('logout')
      await this.$router.push('/')
    },

    async logout() {
      await this.$axios
        .post(endpoints.auth.logout, {
          refresh: this.$cookies.get('refresh'),
        })
        .then(() => {
          this.performLogout()
        })
        .catch((e) => {
          //  Todo Add UI hint
          console.log(e)
        })
    },
  },
  head() {
    return {
      title: 'More Options',
      meta: [
        {
          // hid: 'description',
          // name: 'description',
          // content: 'My custom description',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.more-options-page {
  ul {
    list-style: none;

    li {
      p {
        display: grid;
        grid-template-columns: 1fr 4fr 0.5fr;
        grid-column-gap: 1rem;
        place-items: center;
        text-align: left;

        .icon {
          font-size: clamp(1.6rem, 8vw, 2rem);
        }

        .option-name {
          color: lighten($body-text-default, $lighten-percentage);
          font-size: clamp(1.1rem, 8vw, 1.2rem);
          width: 100%;
        }

        .arrow-go {
          font-size: clamp(20px, 8vw, 28px);
          color: #3a3a3a;
        }
      }
    }
  }
}
</style>

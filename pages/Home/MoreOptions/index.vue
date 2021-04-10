<template>
  <div class="more-options-page">
    <h3 class="heading-title">More Options</h3>
    <CustomListView>
      <template slot="list-items">
        <li
          v-for="(option, index) in options"
          :key="index"
          v-ripple="`${option.color}5F`"
          class="px-4 py-3"
          @click="$router.push(option.route)"
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
      <template slot="last-item">
        <li v-ripple="'#f774795F'" class="px-4 py-3" @click="logout">
          <p>
            <span class="icon mdi mdi-power" style="color: #f77479" />
            <span class="option-name">Log out</span>
          </p>
        </li>
      </template>
    </CustomListView>
  </div>
</template>

<script>
import endpoints from '@/api/endpoints'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'MoreOptions',
  middleware: 'isAuthenticated',
  layout: 'ResponsiveApp',
  data() {
    return {
      navigationRoutes,
      pageTitle: 'More Options',
      options: [
        {
          name: 'Preference',
          icon: 'mdi mdi-cog',
          color: '#8FF2E1',
          route: '/Home/MoreOptions/Preferences',
        },
        // {
        //   name: 'Go Premium',
        //   icon: 'mdi mdi-crown',
        //   color: '#f8e102',
        //   route: '/Home/MoreOptions/GoPremium',
        // },
        {
          name: 'Payments',
          icon: 'mdi mdi-wallet',
          color: '#4fca4f',
          route: '/Home/MoreOptions/Payments',
        },
        {
          name: 'Write & Earn',
          icon: 'mdi mdi-currency-usd',
          color: '#f5a049',
          route: '/Home/MoreOptions/WriteAndEarn',
        },
        // {
        //   name: 'Refer & Earn',
        //   icon: 'mdi mdi-account-multiple-plus',
        //   color: '#00B4B4',
        //   route: '/Home/MoreOptions',
        // },
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

  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: 4,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })
  },

  methods: {
    async performLogout() {
      await this.$axios.setToken(false)
      await this.$store.dispatch('logout')
      await this.$router.push('/')
      localStorage.removeItem('is_auth')
    },

    async logout() {
      try {
        await this.$axios.post(endpoints.auth.logout, {
          refresh: this.$cookies.get('refresh'),
        })
        await this.performLogout()
      } catch (e) {
        //  Todo Add UI hint
      }
    },
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables.scss';

.more-options-page {
  max-width: $large-screen;
  margin: auto;
}
</style>

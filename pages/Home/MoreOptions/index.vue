<template>
  <div class="more-options-page">
    <h3 class="heading-title">More Options</h3>
    <CustomListView>
      <template slot="list-items">
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
import CustomListView from '@/components/Layout/CustomListView'

export default {
  name: 'MoreOptions',
  components: { CustomListView },
  middleware: 'isAuthenticated',
  layout: 'MobileApp',
  data() {
    return {
      pageTitle: 'More Options',
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
          color: '#4fca4f',
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

  async mounted() {
    await this.$store.dispatch('BottomNavigation/update', {
      linkPosition: 4,
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
      title: this.pageTitle,
    }
  },
}
</script>

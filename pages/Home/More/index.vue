<template>
  <div class="more-options-page">
    <h3 class="heading-title">More Options</h3>
    <ul>
      <li
        v-for="(option, index) in options"
        :key="index"
        v-ripple
        class="px-4 py-2"
      >
        <p>
          <span
            class="icon"
            :class="option.icon"
            :style="{ color: option.color }"
          />
          <span class="option-name">{{ option.name }}</span>
        </p>
      </li>
      <li v-ripple class="px-4 py-3" @click="logout">
        <p>
          <span class="icon mdi mdi-power" style="color: #f77479" />
          <span class="option-name">Log out</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.more-options-page {
  ul {
    li {
      p {
        display: grid;
        grid-template-columns: 1fr 4fr;
        grid-column-gap: 1rem;
        place-items: center;
        text-align: left;

        .icon {
          font-size: 2rem;
        }

        .option-name {
          font-size: 1.2rem;
          width: 100%;
        }
      }
    }
  }
}
</style>

<script>
export default {
  name: 'MoreOptions',
  middleware: 'protectedRoute',
  layout: 'MobileApp',
  data() {
    return {
      options: [
        {
          name: 'Preference',
          icon: 'mdi mdi-cog',
          color: '#8FF2E1',
        },
        {
          name: 'Go Premium',
          icon: 'mdi mdi-crown',
          color: '#EFB33D',
        },
        {
          name: 'Write & Earn',
          icon: 'mdi mdi-currency-usd',
          color: '#EFB33D',
        },
        {
          name: 'Refer & Earn',
          icon: 'mdi mdi-account-multiple-plus',
          color: '#00B4B4',
        },
        {
          name: 'About Us',
          icon: 'mdi mdi-information',
          color: '#00B4B4',
        },
        {
          name: 'Help & Support',
          icon: 'mdi mdi-lifebuoy',
          color: '#ABEDAB',
        },
        {
          name: 'FAQ',
          icon: 'mdi mdi-help-circle',
          color: '#ABEDAB',
        },
      ],
    }
  },
  mounted() {
    this.$store.commit('BottomNavigation/update', { linkPosition: 4 })
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('logout')
        await this.$router.push('/')
      } catch (e) {}
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

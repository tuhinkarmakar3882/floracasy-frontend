<template>
  <AppFeel
    :on-back="navigationRoutes.Home.MoreOptions.index"
    :prev-url-path="prevURL"
    class="write-and-earn-page"
    dynamic-back
  >
    <template #app-bar-title>{{ pageTitle }}</template>

    <template #main>
      <LazyCustomListView>
        <template slot="list-items">
          <li
            v-for="(option, index) in options"
            :key="index"
            v-ripple="`${option.color}5F`"
            class="px-4 py-3"
          >
            <nuxt-link :to="option.route">
              <p>
                <span
                  :class="option.icon"
                  :style="{ color: option.color }"
                  class="icon"
                />
                <span class="option-name">{{ option.name }}</span>
                <span class="mdi mdi-chevron-right arrow-go" />
              </p>
            </nuxt-link>
          </li>
        </template>
      </LazyCustomListView>
    </template>
  </AppFeel>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'WriteAndEarn',

  asyncData({ from: prevURL }) {
    return { prevURL }
  },

  data() {
    return {
      prevURL: null,
      navigationRoutes,
      pageTitle: 'Write And Earn',
      options: [
        {
          name: 'How to Write',
          icon: 'mdi mdi-pencil-circle-outline',
          color: '#6DD0BF',
          route: '/Home/MoreOptions/WriteAndEarn/HowToWrite',
        },
        {
          name: 'Earn By Writing',
          icon: 'mdi mdi-currency-usd',
          color: '#4fca4f',
          route: '/Home/MoreOptions/WriteAndEarn/Earning',
        },
      ],
    }
  },
  mounted() {},
  head() {
    return {
      title: this.pageTitle,
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

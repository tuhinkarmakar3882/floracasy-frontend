<template>
  <AppFeel
    class="write-and-earn-page"
    :on-back="navigationRoutes.Home.MoreOptions.index"
  >
    <template slot="app-bar-title">
      {{ pageTitle }}
    </template>

    <template slot="main">
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
      </CustomListView>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'WriteAndEarn',
  components: {
    CustomListView: () => import('@/components/global/Layout/CustomListView'),
    AppFeel,
  },
  middleware: 'isAuthenticated',
  data() {
    return {
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

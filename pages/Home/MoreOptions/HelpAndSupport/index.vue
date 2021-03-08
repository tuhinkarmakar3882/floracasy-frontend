<template>
  <AppFeel
    :on-back="navigationRoutes.Home.MoreOptions.index"
    class="help-and-support-page"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
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
      </CustomListView>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import { usePopularTopics } from '~/environmentVariables'

const popularTopics = {
  name: 'Explore Popular Topics',
  icon: 'mdi mdi-compass',
  color: '#9c9aff',
  route: navigationRoutes.Home.MoreOptions.HelpAndSupport.PopularTopics.index,
}

const menuOptions = [
  {
    name: 'Send Feedback',
    icon: 'mdi mdi-message-draw',
    color: '#daa43d',
    route: navigationRoutes.Home.MoreOptions.HelpAndSupport.Feedback,
  },
  {
    name: 'View Ticket Status',
    icon: 'mdi mdi-bulletin-board',
    color: '#34b334',
    route: navigationRoutes.Home.MoreOptions.HelpAndSupport.Tickets.index,
  },
  {
    name: 'Contact Support',
    icon: 'mdi mdi-alert-octagon',
    color: '#ff8282',
    route: navigationRoutes.Home.MoreOptions.HelpAndSupport.ContactSupport,
  },
]

if (usePopularTopics) menuOptions.push(popularTopics)

export default {
  name: 'HelpAndSupport',
  middleware: 'isAuthenticated',
  components: {
    CustomListView: () => import('@/components/global/Layout/CustomListView'),
    AppFeel,
  },
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Help And Support',
      options: menuOptions,
    }
  },
  mounted() {},

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

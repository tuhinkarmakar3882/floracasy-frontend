<template>
  <AppFeel
    class="help-and-support-page"
    :on-back="navigationRoutes.Home.MoreOptions.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

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
import AppFeel from '@/components/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'HelpAndSupport',
  middleware: 'isAuthenticated',
  components: {
    CustomListView: () => import('@/components/Layout/CustomListView'),
    AppFeel,
  },
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Help And Support',
      options: [
        {
          name: 'Write a Feedback',
          icon: 'mdi mdi-message-alert',
          color: '#f5a049',
          route: navigationRoutes.Home.MoreOptions.HelpAndSupport.Feedback,
        },
        {
          name: 'Privacy & Security',
          icon: 'mdi mdi-security',
          color: '#52B2A2',
          route: navigationRoutes.Home.MoreOptions.HelpAndSupport.index,
        },

        {
          name: 'Explore Popular Topics',
          icon: 'mdi mdi-compass',
          color: '#9c9aff',
          route:
            navigationRoutes.Home.MoreOptions.HelpAndSupport.PopularTopics
              .index,
        },
        {
          name: 'View Ticket Status',
          icon: 'mdi mdi-bulletin-board',
          color: '#34b334',
          route: navigationRoutes.Home.MoreOptions.HelpAndSupport.index,
        },
        {
          name: 'Report a Problem',
          icon: 'mdi mdi-alert-octagon',
          color: '#ff8282',
          route: navigationRoutes.Home.MoreOptions.HelpAndSupport.ReportProblem,
        },
      ],
    }
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

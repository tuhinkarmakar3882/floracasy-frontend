<template>
  <AppFeel
    :on-back="navigationRoutes.Home.MoreOptions.HelpAndSupport.index"
    class="help-and-support-page"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <CustomListView>
        <template slot="list-items">
          <li
            v-for="(topic, index) in topics"
            :key="index"
            v-ripple="`${topic.color}5F`"
            class="px-4 py-3"
            @click="$router.push(topic.route)"
          >
            <p>
              <span
                :class="topic.icon"
                :style="{ color: topic.color }"
                class="icon"
              />
              <span class="option-name">{{ topic.name }}</span>
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
import CustomListView from '~/components/global/Layout/CustomListView'

export default {
  name: 'PopularTopics',
  components: { CustomListView, AppFeel },
  middleware: 'isAuthenticated',
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Popular Topics',
      topics: [
        {
          name: 'Weekly challenges',
          color: '#8FF2E1',
          icon: 'mdi mdi-calendar-range',
          route:
            navigationRoutes.Home.MoreOptions.HelpAndSupport.PopularTopics
              .WeeklyChallenge,
        },
        {
          name: 'Audible Blogs',
          color: '#f5a049',
          icon: 'mdi mdi-headphones',
          route:
            navigationRoutes.Home.MoreOptions.HelpAndSupport.PopularTopics
              .AudioBlogs,
        },

        {
          name: 'New Categories',
          color: '#4fca4f',
          icon: 'mdi mdi-hand-pointing-right',
          route:
            navigationRoutes.Home.MoreOptions.HelpAndSupport.PopularTopics
              .index,
        },
        {
          name: 'Pickup Premium',
          color: '#f8e102',
          icon: 'mdi mdi-hand-pointing-right',
          route:
            navigationRoutes.Home.MoreOptions.HelpAndSupport.PopularTopics
              .index,
        },
        {
          name: "Our trending blog's",
          color: '#8c70fd',
          icon: 'mdi mdi-hand-pointing-right',
          route:
            navigationRoutes.Home.MoreOptions.HelpAndSupport.PopularTopics
              .index,
        },
      ],
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

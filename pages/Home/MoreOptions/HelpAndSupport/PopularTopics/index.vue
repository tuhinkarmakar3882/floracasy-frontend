<template>
  <AppFeel
    class="help-and-support-page"
    :on-back="navigationRoutes.Home.MoreOptions.HelpAndSupport.index"
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
                class="icon"
                :class="topic.icon"
                :style="{ color: topic.color }"
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
          color: '#EFB33D',
          icon: 'mdi mdi-hand-pointing-right',
          route:
            navigationRoutes.Home.MoreOptions.HelpAndSupport.PopularTopics
              .WeeklyChallenge,
        },
        {
          name: 'Pickup Premium',
          color: '#EFB33D',
          icon: 'mdi mdi-hand-pointing-right',
          route:
            navigationRoutes.Home.MoreOptions.HelpAndSupport.PopularTopics
              .index,
        },
        {
          name: 'New Categories',
          color: '#EFB33D',
          icon: 'mdi mdi-hand-pointing-right',
          route:
            navigationRoutes.Home.MoreOptions.HelpAndSupport.PopularTopics
              .index,
        },
        {
          name: 'Audio reading blogs',
          color: '#EFB33D',
          icon: 'mdi mdi-hand-pointing-right',
          route:
            navigationRoutes.Home.MoreOptions.HelpAndSupport.PopularTopics
              .AudioBlogs,
        },
        {
          name: "Our trending blog's",
          color: '#EFB33D',
          icon: 'mdi mdi-hand-pointing-right',
          route:
            navigationRoutes.Home.MoreOptions.HelpAndSupport.PopularTopics
              .index,
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

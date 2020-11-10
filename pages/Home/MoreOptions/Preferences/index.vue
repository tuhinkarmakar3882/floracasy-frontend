<template>
  <AppFeel
    class="preferences-page"
    :on-back="navigationRoutes.Home.MoreOptions.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }} </template>

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

        <template slot="last-item">
          <li v-ripple="'#f774795F'" class="px-4 py-3">
            <p>
              <span class="icon mdi mdi-delete" style="color: #f77479" />
              <span class="option-name">Delete Account</span>
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
import CustomListView from '@/components/Layout/CustomListView'

export default {
  name: 'Preferences',
  components: { CustomListView, AppFeel },
  middleware: 'isAuthenticated',
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Preferences',
      options: [
        {
          name: 'Edit Profile',
          icon: 'mdi mdi-pencil',
          color: '#8FF2E1',
          route: '/Home/MoreOptions/Preferences',
        },
        {
          name: 'Set Notifications',
          icon: 'mdi mdi-bell',
          color: '#5dd75d',
          route: '/Home/MoreOptions/Preferences',
        },
        {
          name: 'Who can Message',
          icon: 'mdi mdi-message',
          color: '#ABEDAB',
          route: '/Home/MoreOptions/Preferences',
        },
        {
          name: 'Saved Blogs',
          icon: 'mdi mdi-bookmark',
          color: '#18e5e5',
          route: '/Home/MoreOptions/Preferences',
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

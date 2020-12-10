<template>
  <AppFeel
    class="preferences-page"
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
            class="px-4 py-3"
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
          <li
            v-ripple="'#34b3345F'"
            class="px-4 py-3"
            @click="toggleNotificationPermission"
          >
            <p>
              <span class="icon mdi mdi-bell" style="color: #34b334" />
              <span class="option-name">Notification</span>
              <span>
                <SwitchButton
                  :switch-state="switchState"
                  active-color="#7ee809"
                />
              </span>
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
  name: 'Preferences',
  components: {
    SwitchButton: () => import('@/components/global/SwitchButton'),
    CustomListView: () => import('@/components/global/Layout/CustomListView'),
    AppFeel,
  },
  middleware: 'isAuthenticated',
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Preferences',
      switchState: false,
      options: [
        {
          name: 'Edit Profile',
          icon: 'mdi mdi-pencil',
          color: '#6dd0bf',
          route: navigationRoutes.Home.MoreOptions.Preferences.EditProfile,
        },
        {
          name: 'Saved Blogs',
          icon: 'mdi mdi-bookmark',
          color: '#f5a049',
          route: navigationRoutes.Home.MoreOptions.Preferences.SavedBlogs,
        },
      ],
    }
  },
  async mounted() {
    // await this.$firebase.analytics().logEvent('page_view')
    this.switchState = Notification.permission === 'granted'
  },
  methods: {
    async toggleNotificationPermission() {
      try {
        const notificationState = await Notification.requestPermission().then()
        if (notificationState === 'granted') {
          await this.$store.dispatch('SocketHandler/updateSocketMessage', {
            message: 'Notifications are enabled',
            notificationType: 'success',
            dismissible: true,
          })
          this.switchState = true
        }
        if (notificationState === 'default') {
          await this.$store.dispatch('SocketHandler/updateSocketMessage', {
            message: 'May be some other day? No Problem.',
            notificationType: 'info',
            dismissible: true,
          })
        }
        if (notificationState === 'denied') {
          await this.$store.dispatch('SocketHandler/updateSocketMessage', {
            message: 'Please Turn on Manually.',
            notificationType: 'error',
            dismissible: true,
          })
        }
      } catch (e) {
        console.log(e)
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

<template>
  <AppFeel
    :on-back="navigationRoutes.Home.MoreOptions.index"
    class="preferences-page"
  >
    <template v-slot:app-bar-title> {{ pageTitle }}</template>

    <template v-slot:main>
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
import { navigationRoutes } from '@/navigation/navigationRoutes'
import { showUITip } from '~/utils/utility'
import { vapidKey } from '~/environmentVariables'
import endpoints from '~/api/endpoints'

export default {
  name: 'Preferences',
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
  mounted() {
    this.switchState = Notification.permission === 'granted'
  },
  methods: {
    async toggleNotificationPermission() {
      try {
        const notificationState = await Notification.requestPermission().then()
        if (notificationState === 'granted') {
          this.switchState = true
          await this.setupFCM()
        }
        if (notificationState === 'default') {
          await showUITip(
            this.$store,
            'May be some other day? No Problem.',
            'info'
          )
        }
        if (notificationState === 'denied') {
          await showUITip(
            this.$store,
            'Please Turn on Manually by going to site settings in Browser ',
            'error'
          )
        }
      } catch (e) {
        await showUITip(
          this.$store,
          'Notifications are not Supported',
          'warning'
        )
      }
    },

    async setupFCM() {
      try {
        const { firebaseCloudMessaging } = require('~/plugins/fcm')
        const token = await firebaseCloudMessaging?.getToken({
          vapidKey,
        })
        token && (await this.sendToServer(token))
      } catch (e) {
        await showUITip(this.$store, 'Something Went Wrong', 'error')
      }
    },

    async sendToServer(token) {
      try {
        await this.$axios.$post(endpoints.notification_system.saveFCMToken, {
          registrationToken: token,
          deviceType: 'web',
        })
        if (!localStorage.getItem('already-shown')) {
          await showUITip(this.$store, 'Notifications are Active', 'success')
          localStorage.setItem('already-shown', 'true')
        } else {
          await showUITip(
            this.$store,
            "No need, It's already active",
            'success'
          )
        }
      } catch (e) {
        await showUITip(
          this.$store,
          'Unable to Activate Realtime Notifications...',
          'error'
        )
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

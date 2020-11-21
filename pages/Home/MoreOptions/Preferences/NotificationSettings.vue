<template>
  <AppFeel
    class="notification-settings-page"
    :on-back="navigationRoutes.Home.MoreOptions.Preferences.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <main>
        <div @click="switchState = !switchState">
          <SwitchButton :switch-state="switchState" />
        </div>
      </main>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import SwitchButton from '@/components/common/SwitchButton'

export default {
  name: 'NotificationSettings',
  components: { SwitchButton, AppFeel },

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Notification Settings',
      switchState: false,
    }
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

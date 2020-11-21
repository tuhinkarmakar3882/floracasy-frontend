<template>
  <AppFeel
    class="notification-settings-page"
    :on-back="navigationRoutes.Home.MoreOptions.Preferences.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <main>
        <section class="switch-container" @click="switchState = !switchState">
          <div
            class="switch-button"
            :style="[
              {
                transform: switchState ? 'translateX(40px)' : 'translateX(4px)',
              },
              { backgroundColor: switchState ? '#65db65' : '#ff8282' },
            ]"
          />
        </section>
      </main>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'NotificationSettings',
  components: { AppFeel },
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

<style lang="scss" scoped>
@import 'assets/all-variables';

.notification-settings-page {
  main {
    padding: 1rem;
    $size: 36px;

    .switch-container {
      position: relative;
      height: $size;
      width: 2 * $size;
      border-radius: 50px;
      background-color: #33404e;
      box-shadow: $default-box-shadow;

      .switch-button {
        position: absolute;
        top: $nano-unit;
        height: $size - $micro-unit;
        width: $size - $micro-unit;
        border-radius: 50px;
        box-shadow: $default-box-shadow;
        transition: all 250ms ease-in-out;
      }
    }
  }
}
</style>

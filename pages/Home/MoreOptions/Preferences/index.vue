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
          <li
            v-ripple="'#34b3345F'"
            class="px-4 py-2"
            @click="switchState = !switchState"
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
          <li v-ripple="'#9c9aff5F'" class="px-4 py-2">
            <p>
              <span class="icon mdi mdi-message" style="color: #9c9aff" />
              <span class="option-name">Who can Message</span>
              <span class="mdi mdi-chevron-down arrow-go" />
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
import SwitchButton from '@/components/common/SwitchButton'

export default {
  name: 'Preferences',
  components: { SwitchButton, CustomListView, AppFeel },
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
  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<template>
  <div v-touch:swipe="swipeHandler" class="create-new-index-page">
    <h4 class="heading-title px-4">How do you want to start?</h4>

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
  </div>
</template>

<script>
import CustomListView from '@/components/Layout/CustomListView'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'BlogCreation',
  components: { CustomListView },
  layout: 'MobileApp',
  middleware: 'isAuthenticated',
  data() {
    return {
      pageTitle: 'Blog Creation',
      options: [
        {
          name: 'Create New Blog',
          icon: 'mdi mdi-plus',
          color: '#4fca4f',
          route: navigationRoutes.Home.Blogs.Create.New,
        },
        {
          name: 'Start from Drafts',
          icon: 'mdi mdi-file',
          color: '#b377bd',
          route: navigationRoutes.Home.Blogs.Create.Drafts,
        },
      ],
    }
  },

  async mounted() {
    await this.$store.dispatch('BottomNavigation/update', {
      linkPosition: 2,
    })
  },

  methods: {
    async swipeHandler(direction) {
      console.log(direction)
      if (direction === 'right')
        await this.$router.push(navigationRoutes.Home.Account.Details)
      if (direction === 'left')
        await this.$router.push(navigationRoutes.Home.Notifications.index)
    },
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss">
@import 'assets/all-variables';

.create-new-index-page {
  min-height: calc(100vh - 120px);
  button {
    min-width: auto;
    height: auto;
    width: auto;
  }
}
</style>

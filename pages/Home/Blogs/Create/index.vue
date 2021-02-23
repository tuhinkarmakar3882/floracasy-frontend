<template>
  <div class="create-new-index-page">
    <h4 class="heading-title px-4">How do you want to start?</h4>

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
    </CustomListView>
  </div>
</template>

<script>
import CustomListView from '@/components/global/Layout/CustomListView'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'BlogCreation',
  components: { CustomListView },
  layout: 'ResponsiveApp',
  middleware: 'isAuthenticated',
  data() {
    return {
      pageTitle: 'Create Something New!',
      options: [
        {
          name: 'Create New Blog',
          icon: 'mdi mdi-newspaper-variant',
          color: '#8FF2E1',
          route: navigationRoutes.Home.Blogs.Create.New,
        },
        {
          name: 'Create New Post',
          icon: 'mdi mdi-pencil-box-multiple-outline',
          color: '#f8e102',
          route: navigationRoutes.Home.Community.Posts.add,
        },
        {
          name: 'Create New Story',
          icon: 'mdi mdi-thought-bubble-outline',
          color: '#5dd75d',
          route: navigationRoutes.Home.Community.Story.add,
        },
      ],
    }
  },

  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: 2,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })
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
  min-height: calc(100vh - 250px);

  button {
    min-width: auto;
    height: auto;
    width: auto;
  }
}
</style>

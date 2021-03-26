<template>
  <AppFeel
    :on-back="navigationRoutes.Home.Community.index"
    class="explore-people-page"
    dynamic-back
    :prev-url-path="prevURL"
  >
    <template v-slot:app-bar-title> {{ pageTitle }}</template>

    <template v-if="listOfUsers" v-slot:main>
      <section class="my-4">
        <UserSearchResult
          v-for="(person, index) in listOfUsers"
          :key="index"
          v-ripple
          class="user-search-result px-4 py-4"
          :userdata="person"
        />
      </section>
    </template>

    <template v-slot:footer>
      <client-only>
        <infinite-loading @infinite="loadUsers">
          <template v-slot:spinner>
            <FallBackLoader />
          </template>
          <template v-slot:error>
            <LoadingError error-section="List of users" />
          </template>
          <template v-slot:no-more>
            <p class="secondary-matte text-center mt-4 mb-8">
              <i class="mdi mdi-party-popper mdi-18px" />
              <br />
              <small> Come back soon for more </small>
            </p>
          </template>
        </infinite-loading>
      </client-only>
    </template>
  </AppFeel>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'
import { processLink } from '~/utils/utility'
import endpoints from '~/api/endpoints'

export default {
  name: 'Explore',
  middleware: 'isAuthenticated',
  asyncData({ from: prevURL }) {
    return { prevURL }
  },
  data() {
    return {
      prevURL: undefined,
      navigationRoutes,
      pageTitle: 'Explore All',
      listOfUsers: [],
      fetchPeoplesCursorEndpoint: endpoints.follow_system.fetch,
    }
  },
  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: -1,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })
  },

  methods: {
    async loadUsers($state) {
      if (!this.fetchPeoplesCursorEndpoint) {
        $state.complete()
        return
      }

      try {
        const { results, next } = await this.$axios.$get(
          this.fetchPeoplesCursorEndpoint
        )
        if (results.length) {
          this.fetchPeoplesCursorEndpoint = processLink(next)
          this.listOfUsers.push(...results)
          $state.loaded()
        } else {
          $state.complete()
        }
      } catch (e) {
        $state.complete()
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

<style lang="scss" scoped>
@import 'assets/all-variables';

.explore-people-page {
  .user-search-result {
    &:nth-child(even) {
      background: $nav-bar-bg;
      box-shadow: $default-box-shadow;
    }
  }
}
</style>

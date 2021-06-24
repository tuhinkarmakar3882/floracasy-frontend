<template>
  <AppFeel
    :on-back="navigationRoutes.Home.Community.index"
    :prev-url-path="prevURL"
    class="explore-people-page"
    dynamic-back
  >
    <template #app-bar-title> {{ pageTitle }}</template>

    <template v-if="listOfUsers" #main>
      <section class="my-4">
        <div v-for="(person, index) in listOfUsers" :key="index">
          <UserSearchResult
            v-ripple
            :userdata="person"
            class="user-search-result px-4 py-4"
          />
          <InFeedAd v-if="index && index % 8 === 0" />
        </div>
      </section>
    </template>

    <template #footer>
      <client-only>
        <infinite-loading @infinite="loadUsers">
          <template #spinner>
            <section class="sample-response my-4 px-4">
              <ImageSkeleton height="40px" radius="50%" width="40px" />
              <aside>
                <LineSkeleton width="90%" />
                <LineSkeleton class="my-2" width="40%" />
              </aside>
            </section>
          </template>

          <template #error>
            <LoadingError error-section="List of users" />
          </template>

          <template #no-more>
            <p class="secondary-matte text-center mt-4 mb-8">
              <i class="mdi mdi-party-popper mdi-18px" />
              <br />
              <nuxt-link
                :to="navigationRoutes.Home.MoreOptions.ReferAndEarn.index"
              >
                <small> Refer More People! </small>
              </nuxt-link>
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
import UserSearchResult from '~/components/Social/Shared/UserSearchResult'
import AppFeel from '~/components/Layout/AppFeel'
import ImageSkeleton from '~/components/Common/SkeletonLoader/ImageSkeleton'
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'
import LoadingError from '~/components/Common/Tools/LoadingError'

export default {
  name: 'Explore',
  components: {
    LoadingError,
    LineSkeleton,
    ImageSkeleton,
    AppFeel,
    UserSearchResult,
  },
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
      background: $navigation-bar-color;
      box-shadow: $default-box-shadow;
    }
  }

  section.sample-response {
    display: grid;
    grid-template-columns: 2 * $medium-unit 1fr;
    grid-gap: $standard-unit;
  }
}
</style>

<template>
  <div class="view-followers-page">
    <AppBarHeader :fallback-page="fallbackPage" :previous-page="previousPage">
      <template #title>{{ pageTitle }}</template>
    </AppBarHeader>

    <main v-if="listOfUsers">
      <section class="my-4">
        <div v-for="(person, index) in listOfUsers" :key="index">
          <UserSearchResult
            v-ripple
            :userdata="person"
            only-is-followed
            class="user-search-result px-4 py-4"
          />
          <InFeedAd v-if="index && index % 8 === 0" />
        </div>
      </section>
    </main>

    <client-only>
      <infinite-loading @infinite="loadFollowers">
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
          <LoadingError error-section="List of Followers" />
        </template>

        <template #no-more>
          <p class="secondary-matte text-center mt-4 mb-8">
            <i class="mdi mdi-party-popper mdi-18px" />
            <br />
            <nuxt-link :to="navigationRoutes.Home.Community.Explore">
              <small>Explore More People!</small>
            </nuxt-link>
          </p>
        </template>
      </infinite-loading>
    </client-only>
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'
import { processLink } from '~/utils/utility'
import endpoints from '~/api/endpoints'
import UserSearchResult from '~/components/Social/Shared/UserSearchResult'
import ImageSkeleton from '~/components/Common/SkeletonLoader/ImageSkeleton'
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'
import LoadingError from '~/components/Common/Tools/LoadingError'
import AppBarHeader from '~/components/Layout/AppBarHeader'

export default {
  name: 'Explore',
  components: {
    AppBarHeader,
    LoadingError,
    LineSkeleton,
    ImageSkeleton,
    UserSearchResult,
  },
  middleware: 'isAuthenticated',

  asyncData({ from: previousPage }) {
    return { previousPage }
  },

  data() {
    return {
      previousPage: undefined,
      fallbackPage: navigationRoutes.Home.DashBoard,
      navigationRoutes,
      pageTitle: 'View Followers',
      listOfUsers: [],
      getFollowersEndpoint: endpoints.follow_system.followers.fetch,
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
    async loadFollowers($state) {
      if (!this.getFollowersEndpoint) {
        $state.complete()
        return
      }

      try {
        const { results, next } = await this.$axios.$get(
          this.getFollowersEndpoint,
          {
            params: {
              followeeUID: this.$route.params.id,
            },
          }
        )
        if (results.length) {
          this.getFollowersEndpoint = processLink(next)
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

.view-followers-page {
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

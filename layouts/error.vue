<template>
  <div class="error-page">
    <AppBarHeader
      no-back-button
      :previous-page="previousPage"
      :fallback-page="fallbackPage"
    >
      <template #title>
        <nuxt-link :to="navigationRoutes.Home.DashBoard" class="no-underline">
          <h6 v-ripple class="px-4 py-4">Floracasy</h6>
        </nuxt-link>
      </template>
    </AppBarHeader>

    <header class="text-center px-4 pt-4 pb-8">
      <h1 class="my-4">Ouch!</h1>
      <p class="mt-4 mb-8" v-if="error.statusCode === 404">
        That was a broken link. <br />
        <br />
        The page you're trying to open, might have been moved to a different
        place or unavailable.
      </p>
      <p class="mt-4 mb-8" v-else>
        It's not on you, It's on us...<br />
        <br />
        To Human is to err. And So Does, something has went wrong. But, This is
        not the end! We'll be fixing it shortly!
      </p>

      <nuxt-link :to="navigationRoutes.Home.DashBoard">
        <button class="warning-outlined-btn" v-ripple>Back to Home</button>
      </nuxt-link>
    </header>

    <main>
      <hr class="faded-divider" />
      <h3 class="text-center px-4 my-6">The Knowledge Crave Must Go On!</h3>
      <hr class="reversed-faded-divider my-0" />
      <InfiniteScrollingBlogLists hide-ads />
    </main>

    <footer>
      <LazyInstallBadge class="install-badge" show-close-button />
    </footer>
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'
import InfiniteScrollingBlogLists from '~/components/Mobile/View/Dashboard/InfiniteScrollingBlogLists'
import AppBarHeader from '~/components/Layout/AppBarHeader'
export default {
  components: { AppBarHeader, InfiniteScrollingBlogLists },
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  asyncData({ from: previousPage }) {
    return { previousPage }
  },
  data() {
    return {
      previousPage: undefined,
      fallbackPage: navigationRoutes.Home.MoreOptions.index,
      pageTitle: 'Page Not Found',
      navigationRoutes,
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

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.error-page {
  button {
    min-width: auto;
  }

  header {
    background: $body-bg-alternate;
  }

  main {
    max-width: $large-screen;
    margin: auto;
  }

  footer {
    .install-badge {
      z-index: $bring-to-front;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}
</style>

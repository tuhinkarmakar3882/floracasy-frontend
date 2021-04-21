<template>
  <div class="error-page">
    <AppBarHeader sticky no-back-button>
      <template #title>
        <nuxt-link :to="navigationRoutes.Home.DashBoard" class="no-underline">
          <h6 v-ripple class="px-4 py-4">Floracasy</h6>
        </nuxt-link>
      </template>
      <template #action-button>
        <nuxt-link :to="navigationRoutes.Home.DashBoard" class="my-4">
          <button class="info-outlined-btn" v-ripple>Dashboard</button>
        </nuxt-link>
      </template>
    </AppBarHeader>

    <header class="text-center px-4 pt-4 pb-8">
      <h1 class="my-4">Ouch!</h1>
      <p class="mt-4 mb-8">
        That was a broken link. <br />
        <br />
        The page you're trying to open, might have been moved to a different
        place or unavailable.
      </p>

      <nuxt-link :to="navigationRoutes.Home.DashBoard" class="my-4">
        <button class="warning-outlined-btn" v-ripple>Back to Home</button>
      </nuxt-link>
    </header>

    <main>
      <hr class="faded-divider" />
      <h3 class="text-center px-4 my-6">The Knowledge Crave Must Go On!</h3>
      <hr class="reversed-faded-divider my-0" />
      <LazyInfiniteScrollingBlogLists />
    </main>

    <footer>
      <LazyInstallBadge class="install-badge" show-close-button />
    </footer>
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'
export default {
  data() {
    return {
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

<template>
  <div class="offline-page">
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
      <h1>Once Upon a Time</h1>
      <p class="mt-4 mb-8">
        There was no internet connections <br />
        <br />
        Reconnect to the Internet & Enjoy Awesome Content of Modern Age!
      </p>

      <nuxt-link :to="navigationRoutes.Home.DashBoard">
        <button class="warning-outlined-btn" v-ripple>Retry</button>
      </nuxt-link>
    </header>
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'
import AppBarHeader from '~/components/Layout/AppBarHeader'

export default {
  name: 'Offline',
  components: { AppBarHeader },
  asyncData({ from: previousPage }) {
    return { previousPage }
  },
  data() {
    return {
      previousPage: undefined,
      fallbackPage: navigationRoutes.Home.MoreOptions.index,
      navigationRoutes,
    }
  },
}
</script>

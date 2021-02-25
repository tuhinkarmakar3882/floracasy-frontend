<template>
  <aside class="profile-loading-error">
    <i class="mdi mdi-alert mdi-48px danger" />
    <p class="white">
      Something went wrong while loading the {{ errorSection }} 😖
    </p>
    <hr class="faded-divider" />

    <p>Try:</p>
    <ul class="mb-8 pb-4">
      <li>Try Refreshing</li>
      <li>Checking the network cables, modem and router</li>
      <li>Reconnecting to Wi-Fi</li>
    </ul>

    <p>
      Still not working?
      <nuxt-link :to="feedbackPage"> Send us Feedback</nuxt-link>
    </p>
  </aside>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'LoadingError',
  props: {
    errorSection: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      feedbackPage: navigationRoutes.Home.MoreOptions.HelpAndSupport.Feedback,
    }
  },
}
</script>

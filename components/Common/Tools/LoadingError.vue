<template>
  <aside class="profile-loading-error">
    <i class="mdi mdi-alert mdi-48px danger" />
    <p class="white">
      Something went wrong while loading the {{ errorSection }} 😖
    </p>
    <hr class="faded-divider" />

    <p v-if="!noRemedyOption">Try:</p>
    <ul class="mb-8 pb-4" v-if="!noRemedyOption">
      <slot name="remedy-option">
        <li>Try Refreshing</li>
        <li>Checking the network cables, modem and router</li>
        <li>Reconnecting to Wi-Fi</li>
      </slot>
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
    noRemedyOption: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      feedbackPage: navigationRoutes.Home.MoreOptions.HelpAndSupport.Feedback,
    }
  },
}
</script>

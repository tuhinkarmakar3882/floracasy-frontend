<template>
  <div class="fallback-loader">
    <LoadingIcon class="mb-8" />
    <slot name="fallback">Fetching data from server</slot>
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'FallBackLoader',
  data() {
    return {
      feedbackPage: navigationRoutes.Home.MoreOptions.HelpAndSupport.Feedback,
    }
  },
}
</script>

<template>
  <ins
    v-if="useAlternateAccount"
    class="adsbygoogle"
    data-ad-client="ca-pub-6503565742033720"
    data-ad-format="fluid"
    data-ad-layout-key="-5u+dg+44-5g+2z"
    data-ad-slot="9825202092"
    style="display: block"
  />
  <ins
    v-else-if="useSmallAds"
    class="adsbygoogle"
    data-ad-client="ca-pub-9863542606738743"
    data-ad-format="fluid"
    data-ad-layout-key="-fb+5w+4e-db+86"
    data-ad-slot="5290672704"
    style="display: block"
  />
  <ins
    v-else
    class="adsbygoogle"
    data-ad-client="ca-pub-9863542606738743"
    data-ad-format="fluid"
    data-ad-layout-key="-50+c6-23-9g+y5"
    data-ad-slot="2010436071"
    style="display: block"
  />
</template>

<script>
import { useAlternateAccount } from '~/environmentVariables'
import { LogAnalyticsEvent } from '~/utils/utility'

export default {
  name: 'InFeedAd',
  props: {
    useSmallAds: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      useAlternateAccount,
    }
  },
  mounted() {
    ;(window.adsbygoogle || []).push({})

    process.env.NODE_ENV === 'production' &&
      LogAnalyticsEvent(
        window?.adsbygoogle?.loaded ? 'ads_requested' : 'ads_blocked'
      )
  },
}
</script>

<template>
  <transition name="scale-up">
    <div v-if="showAds" ref="ads">
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
    </div>

    <div v-else ref="ads" />
  </transition>
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
      showAds: false,
      loaded: false,
    }
  },
  mounted() {
    // this.useDomBasedAds()
    this.setupIntersectionObserver()
  },
  methods: {
    useDomBasedAds() {
      ;(window.adsbygoogle || []).push({})

      process.env.NODE_ENV === 'production' &&
        LogAnalyticsEvent(
          window?.adsbygoogle?.loaded ? 'ads_requested' : 'ads_blocked'
        )
    },

    setupIntersectionObserver() {
      const observer = new IntersectionObserver(this.handleIntersection)
      const target = this.$refs.ads
      observer.observe(target)
    },

    handleIntersection(entries) {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          if (!this.loaded) {
            ;(window.adsbygoogle || []).push({})
            process.env.NODE_ENV === 'production' &&
              LogAnalyticsEvent(
                window?.adsbygoogle?.loaded ? 'ads_requested' : 'ads_blocked'
              )
            this.loaded = true
          }
          this.showAds = true
        } else {
          this.showAds = false
        }
        return entry
      })
    },
  },
}
</script>

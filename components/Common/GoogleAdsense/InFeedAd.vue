<template>
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

  <div v-else ref="ads" class="fallback-container">
    <i class="mdi mdi-google-ads" />
    <p class="mx-4">Advertisement will Load Here</p>
  </div>
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

<style lang="scss" scoped>
@import 'assets/all-variables';

.fallback-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 1rem 0.5rem;
  background: linear-gradient(
      45deg,
      transparent 0%,
      $navigation-bar-color 12.5%,
      $body-bg-alternate 25%,
      $card-bg 37.5%,
      $card-bg-alternate 50%,
      $card-bg 62.5%,
      $body-bg-alternate 75%,
      $navigation-bar-color 87.5%,
      transparent 100%
    )
    right no-repeat;
  background-size: 400%;
  animation: shift-background 20s infinite alternate-reverse ease-in-out;

  @keyframes shift-background {
    from {
      background-position: left;
    }
    to {
      background-position: right;
    }
  }
}
</style>

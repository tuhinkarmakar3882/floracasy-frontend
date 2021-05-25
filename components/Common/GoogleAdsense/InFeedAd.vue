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
    <i class="mdi mdi-google-ads mdi-24px primary-light" />
    <h6 class="my-2">Please allow us to run Google Ads <br />So that,</h6>
    <KeyPoint
      point="We can Payback the Writers"
      tick-color="#8FF2E1"
      :tick-size="20"
      text-color="#dadada"
      class="my-2"
    />
    <KeyPoint
      point="We can Sustain this Project"
      tick-color="#8FF2E1"
      :tick-size="20"
      text-color="#dadada"
      class="my-2"
    />
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
      showAds: true,
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

    loadAds() {
      window.adsbygoogle ? window.adsbygoogle?.push({}) : (this.showAds = false)
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
          this.showAds = true
          setTimeout(this.loadAds, 10)
        } else {
          this.showAds = false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.fallback-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  text-align: center;
  padding: $xxx-large-unit $micro-unit;
  border-radius: $micro-unit;
  margin: $standard-unit auto;
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
  animation: shift-background 8s infinite alternate-reverse ease-in-out;

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

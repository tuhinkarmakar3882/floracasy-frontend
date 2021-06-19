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

  <div v-else-if="adsBlocked" ref="ads" class="fallback-container">
    <i class="mdi mdi-google-ads mdi-24px primary-light" />
    <h6 class="my-2">Please allow us to run Google Ads <br />So that,</h6>
    <KeyPoint
      :tick-size="20"
      class="my-2"
      point="We can Payback the Writers"
      text-color="#dadada"
      tick-color="#8FF2E1"
    />
    <KeyPoint
      :tick-size="20"
      class="my-2"
      point="We can Sustain this Project"
      text-color="#dadada"
      tick-color="#8FF2E1"
    />
  </div>

  <div v-else ref="ads" :style="getStyles" class="fallback-container">
    <i class="mdi mdi-google-ads mdi-24px primary-light" />
    <p class="my-2">Ads Will be loaded</p>
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
      timeout: undefined,
      adsBlocked: false,
      observer: undefined,
      intersectionObserverStartup: undefined,
    }
  },
  computed: {
    getStyles() {
      if (process.client) {
        const width = window.innerWidth > 992 ? 992 : window.innerWidth
        const height = Math.round(width / 1.4)
        return { height: `${height}px` }
      }
      return { height: 'auto' }
    },
  },
  mounted() {
    this.loadAdvertisement()

    if ('IntersectionObserver' in window) {
      this.IObserverTimeout = setTimeout(this.startIObserver, 10000)
    }
  },

  beforeDestroy() {
    clearTimeout(this.IObserverTimeout)
    clearTimeout(this.timeout)
  },

  methods: {
    loadAdvertisement() {
      if (!window?.adsbygoogle) {
        this.showAds = false
        this.adsBlocked = true
        return
      }

      this.$nextTick(this.resetAdsState)

      try {
        window.adsbygoogle?.push({})
        process.env.NODE_ENV === 'production' &&
          LogAnalyticsEvent('ads_requested')
      } catch (e) {
        console.log(e)
        process.env.NODE_ENV === 'production' &&
          LogAnalyticsEvent('ads_not_loaded')
      }
    },

    resetAdsState() {
      this.showAds = true
      this.adsBlocked = false
    },

    startIObserver() {
      this.observer = new IntersectionObserver(this.handleIntersection, {
        rootMargin: '500px',
      })
      const target = this.$refs.ads
      this.observer.observe(target)
    },

    handleIntersection(entries) {
      entries.forEach((entry) => {
        this.observer.observe(entry.target)
        this.adsBlocked = false

        if (!entry.isIntersecting) {
          this.showAds = false
          return
        }

        this.$nextTick(this.resetAdsState)
        setTimeout(this.loadAdvertisement, 0)
        this.observer.unobserve(entry.target)

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.observer.observe(entry.target)
        }, 8000)
        // return entry
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

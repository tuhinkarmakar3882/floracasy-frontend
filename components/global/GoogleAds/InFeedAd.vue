<template>
  <ins
    v-if="useSmallAds"
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
export default {
  name: 'InFeedAd',
  props: {
    useSmallAds: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    ;(window.adsbygoogle || []).push({})
  },
}
</script>

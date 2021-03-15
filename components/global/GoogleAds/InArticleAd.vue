<template>
  <!-- Dashboard-InArticle -->
  <ins
    class="adsbygoogle"
    data-ad-client="ca-pub-9863542606738743"
    data-ad-format="fluid"
    data-ad-layout="in-article"
    :data-ad-slot="adSlot"
    style="display: block; text-align: center"
  />
</template>

<script>
export default {
  name: 'InArticleAd',
  props: {
    adSlot: {
      type: Number || String,
      default: 5758109393,
    },
  },
  mounted() {
    ;(window.adsbygoogle || []).push({})
  },
}
</script>

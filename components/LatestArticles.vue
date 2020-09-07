<template>
  <div>
    <h1 class="sectionTitle my-5">Latest Article</h1>
    <div id="blogPreview" class="container" data-max-blog="2">
      <LoadingAnimation/>
    </div>
  </div>
</template>
<script>

export default {
  name: 'LatestArticles',
  components: {
    LoadingAnimation: () => import("@/components/LoadingAnimation"),
  }
}
</script>

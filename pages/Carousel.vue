<template>
  <section class="pt-4 px-lg-5">
    <h1 id="start" class="sectionTitle my-5 pt-3">Browse Popular Reviews & Beauty Tips</h1>
    <div id="carousel">
      <LoadingAnimation/>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Carousel',
  components: {
    LoadingAnimation: () => import('@/components/LoadingAnimation'),
  },
}
</script>

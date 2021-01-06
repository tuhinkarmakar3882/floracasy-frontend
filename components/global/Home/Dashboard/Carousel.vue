<template>
  <section class="carousel">
    <article
      v-for="(item, index) in carouselItems"
      :key="index"
      class="item"
      :style="{
        background: 'url(' + item.image + ') no-repeat center',
        backgroundSize: 'cover',
        color: 'white',
        paddingTop: visible ? '56.25%' : 0,
      }"
      style="transition: all 0.3s ease-in-out"
      @click="$router.push(item.route)"
    />
  </section>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    carouselItems: {
      type: Array,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    sendNotification() {},
  },
}
</script>

<style lang="scss" scoped>
.carousel {
  display: flex;
  align-items: center;
  text-align: center;
  overflow: auto !important;
  scroll-snap-type: x mandatory;
  scroll-snap-align: start;
  scroll-snap-stop: always;

  article {
    scroll-snap-align: start;
    scroll-snap-stop: always;
    flex-shrink: 0;
    width: 100%;
    transform-origin: center center;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 100px;

    * {
      z-index: 1;
    }
  }
}
</style>

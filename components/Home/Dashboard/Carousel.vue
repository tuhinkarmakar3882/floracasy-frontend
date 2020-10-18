<template>
  <section class="carousel">
    <div
      v-for="(item, index) in carouselItems"
      :key="index"
      class="item"
      :style="{ backgroundColor: item.color, color: 'white' }"
    >
      <h3>{{ item.name }}</h3>
      <RippleButton>Go Now</RippleButton>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.carousel {
  display: flex;
  text-align: center;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  height: 250px;

  & > div {
    padding: 0 1rem;
    scroll-snap-align: start;
    flex-shrink: 0;
    width: 100%;
    transform-origin: center center;
    position: relative;
    display: grid;
    place-items: center;
    font-size: 100px;
  }
}
</style>

<script>
import RippleButton from '~/components/global/RippleButton'
export default {
  name: 'Carousel',
  components: { RippleButton },
  props: {
    carouselItems: {
      type: Array,
      required: true,
    },
  },
}
</script>

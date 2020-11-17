<template>
  <div>
    <section class="carousel">
      <div
        v-for="(item, index) in carouselItems"
        :key="index"
        class="item"
        :style="{
          background: 'url(' + item.image + ') no-repeat center',
          backgroundSize: 'cover',
          boxShadow: '0 0 0 100vw rgba(0, 0, 0, 0.6) inset',
          color: 'white',
        }"
      >
        <h3>{{ item.name }}</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit at
          blanditiis.
        </p>
        <button v-ripple class="primary-btn" style="min-width: auto">
          Go Now
        </button>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.carousel {
  display: flex;
  align-items: center;
  text-align: center;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  height: 250px;

  & > div {
    padding: 0 1rem;
    scroll-snap-align: start;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    transform-origin: center center;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-size: 100px;
  }
}
</style>

<script>
export default {
  name: 'Carousel',
  props: {
    carouselItems: {
      type: Array,
      required: true,
    },
  },
}
</script>

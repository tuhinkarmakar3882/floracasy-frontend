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
      }"
      @click="$router.push(item.route)"
    >
      <!--      <h4 class="my-0">{{ item.name }}</h4>-->
      <!--      <p style="margin: 20px 0 24px">-->
      <!--        {{ item.body }}-->
      <!--      </p>-->
      <!--      <button-->
      <!--        v-ripple=""-->
      <!--        class="secondary-outlined-btn"-->
      <!--        style="min-width: auto"-->
      <!--        @click="sendNotification"-->
      <!--      >-->
      <!--        {{ item.buttonText || 'Go Now' }}-->
      <!--      </button>-->
    </article>
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
    padding-top: 56.25%;
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

    //&::before {
    //  position: absolute;
    //  top: 0;
    //  left: 0;
    //  height: 100%;
    //  width: 100%;
    //  //background-color: rgba(black, 0.5);
    //  content: '';
    //  z-index: 0;
    //  //backdrop-filter: blur(1px);
    //}
  }
}
</style>

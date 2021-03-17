<template>
  <div class="custom-carousel-component">
    <section class="carousel-items-container" @scroll="calculateActiveElement">
      <slot name="slides"></slot>
    </section>
    <aside class="carousel-navigation floating-carousel">
      <span
        v-for="(item, index) in totalItems"
        :key="`dot-${item}`"
        :class="[index === activeElement && 'active']"
        class="dot"
      />
    </aside>
  </div>
</template>

<script>
export default {
  name: 'CustomCarousel',
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      activeElement: 0,
    }
  },

  watch: {},

  mounted() {},

  beforeDestroy() {},

  methods: {
    calculateActiveElement({ target }) {
      this.activeElement = Math.round(target.scrollLeft / window.innerWidth)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.custom-carousel-component {
  position: relative;

  * {
    transition: all 0.3s ease-in-out;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  .carousel-items-container {
    display: grid;
    grid-auto-flow: column;
    align-items: flex-start;
    gap: $standard-unit;
    overflow: scroll !important;
    scroll-snap-type: x mandatory;
    scroll-snap-align: start;
    scroll-snap-stop: always;

    &::-webkit-scrollbar {
      display: none;
    }

    .carousel-item {
      scroll-snap-align: start;
      scroll-snap-stop: always;
      flex-shrink: 0;
      width: 100vw;
      transform-origin: center center;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .carousel-controls {
    button {
      display: grid;
      place-items: center;
      position: absolute !important;
      top: 0;
      padding: 0;
      height: 100%;
      width: $xxx-large-unit;
      min-height: auto;
      min-width: auto;
      z-index: 1;
      box-shadow: none;

      &.left-arrow {
        left: 0;
      }

      &.right-arrow {
        right: 0;
      }
    }
  }

  .carousel-navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    height: $medium-unit;
    width: 100%;
    z-index: 1;

    .dot {
      display: block;
      height: $nano-unit + $double-unit;
      width: $nano-unit + $double-unit;
      border-radius: 50%;
      background: $muted;
      margin: 0 $nano-unit;

      &.active {
        width: $standard-unit;
        height: $micro-unit;
        border-radius: $micro-unit;
        background: $vibrant;
      }
    }

    &.floating-carousel {
      position: fixed;
      bottom: $nano-unit;
    }
  }
}
</style>

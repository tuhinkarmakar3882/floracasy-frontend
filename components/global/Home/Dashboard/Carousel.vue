<template>
  <div class="carousel-component">
    <section v-if="quoteCarousel" class="carousel-items-container">
      <blockquote
        v-for="item in carouselItems"
        :key="item.id"
        class="carousel-item"
      >
        <img :src="item.photoURL" alt="" height="84" width="84" />
        <h6 class="mb-0">{{ item.name }}</h6>
        <p class="vibrant">{{ item.designation }}</p>

        <section class="quote">
          <span class="mdi mdi-format-quote-open mdi-48px text-left my-0" />
          <p class="my-0 text-left px-1">
            <em>
              {{ item.quote }}
            </em>
          </p>
          <span class="mdi mdi-format-quote-close mdi-48px text-right my-0" />
        </section>
      </blockquote>
    </section>

    <section v-else-if="imageCarousel" class="carousel-items-container">
      <img
        v-for="item in carouselItems"
        :key="item.id"
        :alt="item.image"
        :src="item.image"
        class="carousel-item"
        height="250"
        style="object-fit: cover; width: 100%; min-height: 250px; height: 250px"
      />
    </section>

    <section v-else-if="blogCarousel" class="carousel-items-container">
      <LazyBlogPost
        v-for="blog in carouselItems"
        :key="blog.identifier"
        :blog="blog"
        class="blog-item text-left pt-4"
        hide-blog-actions
        hide-more-options-button
      />
    </section>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    carouselItems: {
      type: Array,
      required: true,
    },
    blogCarousel: {
      type: Boolean,
      required: false,
      default: false,
    },
    imageCarousel: {
      type: Boolean,
      required: false,
      default: false,
    },
    quoteCarousel: {
      type: Boolean,
      required: false,
      default: false,
    },
    autoScroll: {
      type: Boolean,
      required: false,
      default: false,
    },
    useLoop: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      totalSlides: 0,
      scroller: undefined,
      autoScrollInterval: undefined,
    }
  },
  mounted() {
    this.totalSlides = this.carouselItems.length - 1
    this.scroller = document.querySelector('.carousel-items-container')
    window.qwertyuiop = this.scroller
    if (this.autoScroll) {
      this.autoUpdateCarouselSlide()
    }
  },
  beforeDestroy() {
    this.autoScrollInterval && clearInterval(this.autoScrollInterval)
  },
  methods: {
    autoUpdateCarouselSlide() {
      this.autoScrollInterval = setInterval(() => {
        this.scroller?.scrollBy({
          left: 100,
          top: 0,
          behavior: 'smooth',
        })
      }, 8000)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.carousel-component {
  position: relative;

  * {
    transition: all 0.3s ease-in-out;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  .carousel-items-container {
    display: flex;
    gap: $standard-unit;
    text-align: center;
    overflow: scroll !important;
    scroll-snap-type: x mandatory;
    scroll-snap-align: start;
    scroll-snap-stop: always;

    blockquote {
      border: none;
      border-radius: $xx-large-unit;
      width: 80vw;

      img {
        border-radius: 50%;
        box-shadow: $default-box-shadow;
        height: 2 * $xxx-large-unit;
        min-height: 2 * $xxx-large-unit;
        width: 2 * $xxx-large-unit;
        min-width: 2 * $xxx-large-unit;
        aspect-ratio: 1;
        object-fit: cover;
        margin: auto;
      }

      span {
        margin: -$standard-unit;
      }

      * {
        display: block;
      }
    }

    .carousel-item,
    .blog-item {
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
    }

    .blog-item {
      justify-content: flex-start;
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
    gap: $micro-unit;
    position: absolute;
    bottom: 0;
    height: $medium-unit;
    width: 100%;

    .dot {
      display: block;
      height: $micro-unit;
      width: $micro-unit;
      border-radius: 50%;
      background: $muted;

      &.active {
        width: $milli-unit;
        height: $milli-unit;
        background: $vibrant;
      }
    }
  }
}
</style>

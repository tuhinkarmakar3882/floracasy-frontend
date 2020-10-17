<template>
  <div class="carousel">
    <ul>
      <li v-for="(item, index) in carouselItems" :key="index">
        <div :color="item.color">
          <section class="fill-height">
            <div class="display-3">
              {{ item.name }}
            </div>
          </section>
        </div>
      </li>
    </ul>
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
  },
}
</script>

<style scoped></style>

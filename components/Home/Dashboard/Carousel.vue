<template>
  <div class="carousel my-5">
    <v-carousel
        cycle
        height="400"
        hide-delimiter-background
        show-arrows-on-hover
    >
      <v-carousel-item
          v-for="(item, index) in carouselItems"
          :key="index"
      >
        <v-sheet
            :color="item.color"
            height="100%"
        >
          <v-row
              align="center"
              class="fill-height"
              justify="center"
          >
            <div class="display-3">
              {{ item.name }}
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  props: {
    carouselItems: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>

</style>

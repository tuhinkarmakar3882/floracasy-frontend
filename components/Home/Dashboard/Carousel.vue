<template>
  <div class="carousel">
    <v-carousel
        cycle
        :show-arrows="false"
        continuous
        hide-delimiter-background
        height="250"
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

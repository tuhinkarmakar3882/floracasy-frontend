<template>
  <div class="showcase my-4 py-4">
    <v-container>
      <p class="topic">Categories</p>
      <h2 class="mt-0 mb-4 pb-4">Experience Floracasy</h2>
      <p>Explore hundreds of integrations for Ghost to speed up your workflow, or build your own
        custom integrations with our open source developer SDK</p>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "CategoriesShowcase"
}
</script>

<style lang="scss" scoped>
@import "assets/variables";

.showcase {
  text-align: center;
  background-color: $segment-background;

  .topic {
    color: $secondary-highlight;
    font-weight: 700;
  }

  h2 {
    font-family: $Prata;
    font-weight: 400;
    font-size: clamp(24px, 4vw, 40px);
    color: $white;
  }

  p {
    font-weight: 300;
  }
}
</style>

<template>
  <footer class="full-width">
    <div class="col">
      <h3>In a Nutshell</h3>

      <KeyPoint v-for="point in points"
                :key="point"
                :point="point"
                :tickSize="24"
                tickColor="secondary"
      />
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  components: {
    KeyPoint: () => import('~/components/global/KeyPoint')
  },
  data: () => {
    return {
      points: [
        "Enjoy Affordable Pro Perks1",
        "Enjoy Affordable Pro Perks2",
        "Enjoy Affordable Pro Perks3",
        "Enjoy Affordable Pro Perks4",
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
@import "assets/variables";

footer {
  background-color: $footer-background;
  width: 100%;
  padding: 12px 64px;
}
</style>

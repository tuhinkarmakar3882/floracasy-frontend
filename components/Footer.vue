<template>
  <footer class="full-width">
    <div class="col">
      <h3>In a Nutshell</h3>

      <KeyPointsList
          :points="points"
          :tickSize="24"
          tickColor="#10a3ce"
      />
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  components: {
    KeyPointsList: () => import('@/components/KeyPointsList')
  },
  data: () => {
    return {
      points: [
        "Enjoy Affordable Pro Perks",
        "Enjoy Affordable Pro Perks",
        "Enjoy Affordable Pro Perks",
        "Enjoy Affordable Pro Perks",
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

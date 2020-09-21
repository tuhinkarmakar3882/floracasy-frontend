<template>
  <footer>
    <div class="row">
      <div class="col">
        <h3>In a Nutshell</h3>

        <KeyPointsList
            :points="points"
            :tickSize="24"
            tickColor="#10a3ce"
        />

      </div>
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

<style scoped>

</style>

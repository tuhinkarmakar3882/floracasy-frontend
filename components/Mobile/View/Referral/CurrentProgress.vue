<template>
  <div class="current-progress-component">
    <section>
      <h5 class="px-4">Extra Features</h5>
      <hr class="faded-divider" />
      <LineProgress :percentage="percentage" class="px-4" />
      <button class="secondary-outlined-btn">Go to Marketplace</button>
    </section>
  </div>
</template>

<script>
import LineProgress from '~/components/Common/Tools/LineProgress'

export default {
  name: 'CurrentProgress',
  components: { LineProgress },
  data() {
    return {
      percentage: 0,
    }
  },
  mounted() {
    setInterval(() => {
      if (this.percentage > 99) return
      this.percentage += 1
    }, 100)
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.current-progress-component {
  section {
    margin: 0 0 $standard-unit;

    h5 {
      margin: 0;
      position: relative;
    }

    button {
      display: block;
      margin: 1rem auto;
    }
  }
}
</style>

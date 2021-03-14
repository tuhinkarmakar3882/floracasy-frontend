<template>
  <div class="progress-ring-component">
    <section class="ring">
      <p>{{ percentage }}%</p>
      <svg
        class="active-region"
        height="120"
        width="120"
        :style="activeRegionSize"
      >
        <circle
          class="progress-ring__circle"
          cx="60"
          cy="60"
          data-v-13358e9c=""
          fill="transparent"
          r="44"
        />
      </svg>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ProgressRing',
  props: {
    percentage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    activeRegionSize() {
      const totalSizeOfTheProgress = 280
      const remainingPercentage = (100 - this.percentage) / 100
      return {
        strokeDashoffset: totalSizeOfTheProgress * remainingPercentage,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.progress-ring-component {
  .ring {
    height: 3 * $xx-large-unit;
    width: 3 * $xx-large-unit;
    border-radius: 50%;
    border: 8px solid $white;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .active-region {
      position: absolute;
      stroke-dasharray: 280;
      stroke-dashoffset: 280;
      stroke: $primary;
      stroke-width: 8px;
      transform: rotate(-90deg);
    }

    p {
      font-family: $Nunito-Sans;
      font-size: $large-unit;
      color: $primary-light;
    }
  }
}
</style>

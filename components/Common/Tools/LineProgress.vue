<template>
  <div class="line-progress-component">
    <div class="track">
      <section
        :style="{ left: activeRegionText }"
        class="active-percentage"
        v-if="100 - Math.round(percentage)"
      >
        <p>
          Need
          <span class="vibrant">
            <strong>{{ 100 - Math.round(percentage) }}</strong>
          </span>
          Floracoins More to Unlock
        </p>
      </section>
      <section
        :style="{ left: activeRegionText }"
        class="active-percentage"
        v-else
      >
        Achievement Unlocked!
      </section>
      <div :style="{ width: activeRegion }" class="track-active" />
      <i class="mdi mdi-shopping end-icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LineProgress',
  props: {
    percentage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    activeRegion() {
      return `${this.percentage}%`
    },
    activeRegionText() {
      let maxPosition = 100
      let minPosition = 25
      if (process.client) {
        minPosition = Math.round((156 * 100) / window.innerWidth)
        maxPosition = Math.round(
          ((window.innerWidth - 156) * 100) / window.innerWidth
        )
      }
      let textPosition = this.percentage
      if (textPosition < minPosition) textPosition = minPosition
      if (textPosition > maxPosition) textPosition = maxPosition
      return `calc(${textPosition}% - 156px)`
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.line-progress-component {
  margin: 6rem 0 2rem;
  width: 100%;
  position: relative;

  .track {
    height: 8px;
    width: 100%;
    background: $card-bg-alternate;
    border-radius: 50px;
    position: relative;

    .track-active {
      position: absolute;
      top: 0;
      left: 0;
      height: 8px;
      background: $secondary-vibrant;
      border-radius: 50px;

      &::after {
        position: absolute;
        content: '';
        height: 10px;
        width: 10px;
        right: -4px;
        top: -12px;
        border: 10px solid $card-bg-alternate;
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
      }
    }

    .active-percentage {
      position: absolute;
      top: -64px;
      border-radius: 8px 8px 0 0;
      background: $card-bg-alternate;
      height: 52px;
      padding: $nano-unit $standard-unit;
      display: grid;
      place-items: center;
      min-width: 312px;
      * {
        font-family: $Nunito-Sans;
      }
    }

    .end-icon {
      position: absolute;
      top: -12px;
      border-radius: 50%;
      display: grid;
      padding: 0;
      align-items: center;
      justify-items: center;
      place-items: center;
      height: 28px;
      width: 28px;
      font-size: 20px;
      right: 0;
      color: black;
      z-index: 1;
      background: $premium;
    }
  }
}
</style>

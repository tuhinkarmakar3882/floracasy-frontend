<template>
  <div class="current-progress-component">
    <aside v-if="loading" class="my-4 pt-2 px-4">
      <LineSkeleton height="2.5rem" width="40%" />
      <LineSkeleton class="my-4" height="1px" />

      <LineSkeleton class="my-4" />
      <LineSkeleton class="my-4" />
      <LineSkeleton class="my-4" />
    </aside>

    <section v-else>
      <h5 class="px-4">Unlock Extra Features</h5>
      <hr class="faded-divider" />
      <LineProgress :percentage="percentage" class="px-4" />
      <button v-if="percentage === 100" class="secondary-outlined-btn" v-ripple>
        Go to Marketplace
      </button>
    </section>
  </div>
</template>

<script>
import LineProgress from '~/components/Common/Tools/LineProgress'
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'

export default {
  name: 'CurrentProgress',
  components: { LineSkeleton, LineProgress },
  data() {
    return {
      percentage: 0,
      loading: !true,
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.loading = false
    //   setInterval(() => {
    //     if (this.percentage > 99) return
    //     this.percentage += 1
    //   }, 100)
    // }, 5000)
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

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
      <LineProgress :max-value="maxValue" :value="balance" class="px-4" />
      <button
        v-if="balance >= maxValue"
        class="secondary-outlined-btn"
        v-ripple
      >
        Go to Marketplace
      </button>
    </section>
  </div>
</template>

<script>
import LineProgress from '~/components/Common/Tools/LineProgress'
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'
import endpoints from '~/api/endpoints'
import { showUITip } from '~/utils/utility'

export default {
  name: 'CurrentProgress',
  components: { LineSkeleton, LineProgress },
  data() {
    return {
      maxValue: 300,
      balance: 0,
      loading: true,
      timeout: undefined,
    }
  },
  mounted() {
    this.getCoinBalance()
  },

  methods: {
    async getCoinBalance() {
      try {
        const { balance } = await this.$axios.$get(endpoints.rewards.coins)
        this.balance = balance
        this.loading = false
      } catch (e) {
        await showUITip(this.$store, 'Failed to get coin balance', 'error')
      }
    },
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

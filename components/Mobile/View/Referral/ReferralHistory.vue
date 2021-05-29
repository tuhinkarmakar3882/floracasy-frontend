<template>
  <div class="referral-history-component">
    <section v-if="loading" class="px-4">
      <LineSkeleton height="2.5rem" />
    </section>

    <main v-else>
      <h6 class="mt-8 mb-4 px-4">Joining History</h6>
      <hr class="my-2" />

      <ReferralHistoryItem
        v-for="item in referralHistory"
        :key="item.id"
        :item="item"
        class="joining-history px-4 py-4"
      />
    </main>

    <client-only>
      <infinite-loading @infinite="loadReferralsPointsHistory">
        <template slot="spinner">
          <section class="sample-response my-4 px-4">
            <ImageSkeleton height="40px" radius="50%" width="40px" />
            <aside>
              <LineSkeleton width="90%" />
              <LineSkeleton class="my-2" width="40%" />
            </aside>
          </section>
        </template>

        <template slot="error">
          <p class="danger-light my-6">Network Error</p>
        </template>

        <template slot="no-more">
          <p class="secondary-matte text-center mt-4 mb-8">
            <small> Keep Referring to earn more!</small>
          </p>
        </template>
      </infinite-loading>
    </client-only>
  </div>
</template>

<script>
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'
import ImageSkeleton from '~/components/Common/SkeletonLoader/ImageSkeleton'
import endpoints from '~/api/endpoints'
import { processLink } from '~/utils/utility'
import ReferralHistoryItem from '~/components/Mobile/View/Referral/ReferralHistoryItem'

export default {
  name: 'ReferralHistory',
  components: { ReferralHistoryItem, ImageSkeleton, LineSkeleton },
  data() {
    return {
      loading: true,
      referralHistory: [],
      referralHistoryFetchEndpoint: endpoints.rewards.referral.list,
    }
  },
  methods: {
    async loadReferralsPointsHistory($state) {
      if (!this.referralHistoryFetchEndpoint) {
        $state.complete()
        return
      }

      try {
        const { results, next } = await this.$axios.$get(
          this.referralHistoryFetchEndpoint
        )

        if (results.length) {
          this.referralHistoryFetchEndpoint = processLink(next)
          this.referralHistory.push(...results)
          $state.loaded()
        } else {
          $state.complete()
        }
        this.loading = false
      } catch (e) {
        $state.complete()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.referral-history-component {
  header {
    background: $body-bg-alternate;
    padding: $x-large-unit $standard-unit;
    margin: 0 0 $standard-unit;
    box-shadow: $down-only-box-shadow;

    h5 {
      margin: 0 0 $large-unit;
    }

    main {
      margin: 0 0 $large-unit;
      display: flex;
      align-items: center;
      justify-content: space-between;

      section {
        small {
          font-size: $medium-unit;
        }
      }
    }
  }

  section.joining-history {
    &:nth-child(even) {
      background: $body-bg-alternate;
    }
  }

  section.sample-response {
    display: grid;
    grid-template-columns: 2 * $medium-unit 1fr;
    grid-gap: $standard-unit;
  }
}
</style>

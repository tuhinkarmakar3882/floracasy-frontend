<template>
  <div class="referral-history-component">
    <aside v-if="loading" class="my-8 px-4">
      <LineSkeleton height="2.5rem" />

      <section
        v-for="item in [1, 2, 3]"
        :key="item"
        class="sample-response my-4"
      >
        <ImageSkeleton height="40px" radius="50%" width="40px" />
        <aside>
          <LineSkeleton width="70%" />
          <LineSkeleton class="my-2" width="40%" />
        </aside>
      </section>
    </aside>

    <main v-else>
      <h6 class="mt-8 mb-4 px-4">Joining History</h6>
      <hr class="my-2" />

      <section
        v-for="item in [
          11, 21, 31, 11, 21, 31, 11, 21, 31, 11, 21, 31, 11, 21, 31, 11, 21,
          31, 11, 21, 31, 11, 21, 31, 11, 21, 31, 11, 21, 31, 11, 21, 31, 11,
          21, 31, 11, 21, 31, 11, 21, 31, 11, 21, 31, 11, 21, 31, 11, 21, 31,
        ]"
        :key="item"
        class="joining-history px-4 py-4"
        v-ripple
      >
        <img alt="user-image" src="https://picsum.photos/561" />
        <p>Tuhin Karmakar has joined on 11th May</p>
        <aside><p>+10</p></aside>
      </section>
    </main>
  </div>
</template>

<script>
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'
import ImageSkeleton from '~/components/Common/SkeletonLoader/ImageSkeleton'

export default {
  name: 'ReferralHistory',
  components: { ImageSkeleton, LineSkeleton },
  data() {
    return {
      loading: !true,
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.loading = false
    // }, 4000)
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

  section.sample-response,
  section.joining-history {
    display: grid;
    grid-template-columns: 2 * $medium-unit 1fr 2 * $medium-unit;
    grid-gap: $standard-unit;
    place-items: center;
  }
  section.joining-history {
    &:nth-child(even) {
      background: $body-bg-alternate;
    }
    img {
      height: 2 * $medium-unit;
      width: 2 * $medium-unit;
      border-radius: 50%;
    }

    p {
      font-family: $Nunito-Sans;
    }
  }
}
</style>

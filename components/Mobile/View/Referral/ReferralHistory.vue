<template>
  <div class="referral-history-component">
    <aside v-if="loading" class="my-8 px-4">
      <LineSkeleton height="2.5rem" />

      <section class="sample-response my-4" v-for="i in [1, 2, 3]" :key="i">
        <ImageSkeleton radius="50%" width="40px" height="40px" />
        <aside>
          <LineSkeleton width="70%" />
          <LineSkeleton width="40%" class="my-2" />
        </aside>
      </section>
    </aside>

    <main v-else>
      <h6 class="mt-8 mb-4 px-4">Joining History</h6>
      <hr class="my-2" />

      <section
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }"
        class="px-4 my-4"
      >
        <img
          :style="{
            height: '40px',
            width: '40px',
            borderRadius: '50%',
          }"
          alt="user-image"
          src="https://picsum.photos/561"
        />
        <p style="font-family: 'Nunito-Sans', sans-serif">
          Tuhin Karmakar has joined on 11th May
        </p>
      </section>
      <section
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }"
        class="px-4 my-4"
      >
        <img
          :style="{
            height: '40px',
            width: '40px',
            borderRadius: '50%',
          }"
          alt="user-image"
          src="https://picsum.photos/561"
        />
        <p style="font-family: 'Nunito-Sans', sans-serif">
          Tuhin Karmakar has joined on 11th May
        </p>
      </section>
      <section
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }"
        class="px-4 my-4"
      >
        <img
          :style="{
            height: '40px',
            width: '40px',
            borderRadius: '50%',
          }"
          alt="user-image"
          src="https://picsum.photos/561"
        />
        <p style="font-family: 'Nunito-Sans', sans-serif">
          Tuhin Karmakar has joined on 11th May
        </p>
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
      loading: true,
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

  section.sample-response {
    display: grid;
    grid-template-columns: 40px 1fr;
    grid-gap: 16px;
  }
}
</style>

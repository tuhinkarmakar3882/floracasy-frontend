<template>
  <div class="invite-code-component">
    <aside v-if="loading" class="my-8 pb-2 px-4">
      <LineSkeleton height="2.5rem" />
      <LineSkeleton class="mt-4 mb-8" height="2.5rem" width="30%" />

      <section class="sample-response my-4">
        <aside>
          <LineSkeleton width="70%" />

          <LineSkeleton class="my-2" width="40%" />
        </aside>

        <ImageSkeleton height="40px" radius="50%" width="40px" />
      </section>

      <LineSkeleton class="mt-6" />
    </aside>

    <header v-else>
      <h5>Invite your friends to Floracasy</h5>
      <main v-ripple>
        <section>
          <p>Your Referral Code</p>
          <p><strong>FC-07D4-39</strong></p>
        </section>

        <i class="mdi mdi-share-circle secondary mdi-36px" />
      </main>

      <small
        >You will get <span class="vibrant"><strong>10</strong></span> Floracoin
        on every new joining</small
      >
    </header>
  </div>
</template>

<script>
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'
import ImageSkeleton from '~/components/Common/SkeletonLoader/ImageSkeleton'

export default {
  name: 'InviteCode',
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

.invite-code-component {
  header {
    background: $body-bg-alternate;
    padding: $x-large-unit 0;
    box-shadow: $down-only-box-shadow;

    h5 {
      margin: 0 $standard-unit $micro-unit;
    }

    small {
      display: block;
      margin: $standard-unit;
    }

    main {
      display: flex;
      align-items: center;
      justify-content: space-between;

      section {
        padding: $standard-unit;

        p {
          &:last-child {
            color: $white;
            font-family: $Nunito-Sans;
            font-size: $medium-unit;
          }
        }
      }

      i {
        min-height: 2 * $xx-large-unit;
        height: 100%;
        width: 2 * $xx-large-unit;
        display: grid;
        place-items: center;
      }
    }
  }

  section.sample-response {
    display: grid;
    grid-template-columns: 1fr 40px;
    grid-gap: 16px;
  }
}
</style>

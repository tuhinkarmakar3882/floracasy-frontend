<template>
  <div class="my-4 py-6 text-center">
    <div>
      <SegmentTitle
        leading-paragraph="Explore hundreds of integrations for Ghost to speed up your workflow, or build your own
          custom integrations with our open source developer SDK"
        title="Earn with Us"
        topic="Earning"
      />

      <nuxt-link
        :loading="earningButtonLoading"
        class="my-6 btn"
        to="/Authentication/SignInToContinue"
        @click="changeIt"
      >
        Start Earning
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EarningSection',
  components: {
    SegmentTitle: () => import('@/components/global/LandingPage/SegmentTitle'),
  },
  data() {
    return {
      earningButtonLoading: false,
    }
  },
  methods: {
    changeIt() {
      this.earningButtonLoading = true
      setTimeout(() => {
        this.earningButtonLoading = false
      }, 2000)
    },
  },
}
</script>

<template>
  <div class="showcase my-4 py-6 text-center">
    <v-container>
      <SegmentTitle
          leadingParagraph="Explore hundreds of integrations for Ghost to speed up your workflow, or build your own
          custom integrations with our open source developer SDK"
          title="Earn with Us"
          topic="Earning"
      />

      <v-btn :loading="earningButtonLoading" class="my-6 btn" color="primary" large rounded @click="changeIt">
        Start Earning
      </v-btn>
    </v-container>
  </div>
</template>

<script>

export default {
  name: "EarningSection",
  components: {
    SegmentTitle: () => import("@/components/LandingPage/SegmentTitle"),
  },
  data() {
    return {
      earningButtonLoading: false,
    }
  },
  methods: {
    changeIt: function () {
      this.earningButtonLoading = true;
      setTimeout(() => {
        this.earningButtonLoading = false
      }, 2000)
    },
  },

}
</script>


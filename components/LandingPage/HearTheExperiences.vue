<template>
  <div class="my-4 py-6 text-center">
    <v-container>
      <SegmentTitle
          leadingParagraph=""
          title="Buy Premium for Unlimited Access."
          topic="Pro Zone"
      />


      <KeyPoint v-for="point in points"
                :key="point.id"
                :point="point.text"
                :tick-size="24"
                class="my-6"
                tick-color="#6DD0BF"/>

      <!--      <v-btn :loading="earningButtonLoading" class="my-6 btn" color="primary" large rounded @click="changeIt">-->
      <!--        Start Earning-->
      <!--      </v-btn>-->
    </v-container>
  </div>
</template>

<script>
import SegmentTitle from "@/components/LandingPage/SegmentTitle";
import KeyPoint from "@/components/global/KeyPoint";

export default {
  name: "HearTheExperiences",
  components: {KeyPoint, SegmentTitle},
  data() {
    return {
      points: [
        {
          "id": 1,
          "text": "No Advertisements",
        },
        {
          "id": 2,
          "text": "Read as much as you like",
        },
        {
          "id": 3,
          "text": "Greater Community Reach",
        },
        {
          "id": 4,
          "text": "Advanced Metrics",
        },
        {
          "id": 5,
          "text": "Avail Member Only Perks",
        },
        {
          "id": 6,
          "text": "Free Content Booster",
        },
        {
          "id": 7,
          "text": "Get Shopping Rewards, Coupons & Cashbacks",
        },
        {
          "id": 8,
          "text": "24x7 Priority Support",
        },
        {
          "id": 9,
          "text": "And Much More!",
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>

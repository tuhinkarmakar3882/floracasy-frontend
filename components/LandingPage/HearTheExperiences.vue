<template>
  <div class="my-4 py-6 text-center">
    <v-container>
      <SegmentTitle
          leadingParagraph="Explore hundreds of integrations for Ghost to speed up your workflow, or build your own custom integrations with our open source developer SDK"
          title="Hear From the Community"
          topic="Experiences"
      />

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
      points: []
    }
  }
}
</script>

<style scoped>

</style>

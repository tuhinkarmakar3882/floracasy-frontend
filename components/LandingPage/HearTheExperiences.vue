<template>
  <div class="my-4 py-6 text-center">
    <SegmentTitle
      leading-paragraph="Explore hundreds of integrations for Ghost to speed up your workflow, or build your own custom integrations with our open source developer SDK"
      title="Hear From the Community"
      topic="Experiences"
    />
  </div>
</template>

<script>
import SegmentTitle from '@/components/LandingPage/SegmentTitle'

export default {
  name: 'HearTheExperiences',
  components: { SegmentTitle },
  data() {
    return {
      points: [],
    }
  },
}
</script>

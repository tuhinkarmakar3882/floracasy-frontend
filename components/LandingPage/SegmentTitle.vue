<template>
  <div class="top-header">
    <p class="topic">
      {{ topic }}
    </p>
    <h2 class="mt-0 mb-6 pb-4">
      {{ title }}
    </h2>
    <p>{{ leadingParagraph }}</p>
  </div>
</template>

<script>
export default {
  name: 'SegmentTitle',
  props: {
    topic: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    leadingParagraph: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.top-header {
  .topic {
    color: $secondary-highlight;
    font-weight: 700;
  }

  h2 {
    font-family: $Prata;
    font-weight: 400;
    font-size: $segment-title-font-size;
    color: $white;
  }

  p {
    font-weight: 300;
    line-height: 1.84;
  }
}
</style>

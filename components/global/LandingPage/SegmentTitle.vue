<template>
  <div class="top-header">
    <p v-if="topic" class="topic">{{ topic }}</p>
    <h3 v-if="title" class="my-4">{{ title }}</h3>
    <p v-if="leadingParagraph">{{ leadingParagraph }}</p>
  </div>
</template>

<script>
export default {
  name: 'SegmentTitle',
  props: {
    topic: {
      type: String,
      required: false,
      default: '',
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
    leadingParagraph: {
      type: String,
      required: false,
      default: '',
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
}
</style>

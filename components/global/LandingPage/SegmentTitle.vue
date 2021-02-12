<template>
  <div class="top-header">
    <p v-if="topic" :style="{ color: highlightColor }">
      <i v-if="leadingIcon" :class="leadingIcon" />
      <strong>{{ topic }}</strong>
    </p>
    <h3 v-if="title" class="my-4">{{ title }}</h3>
    <p v-if="leadingParagraph">{{ leadingParagraph }}</p>
  </div>
</template>

<script>
export default {
  name: 'SegmentTitle',
  props: {
    leadingIcon: {
      type: String,
      required: false,
      default: '',
    },
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
    highlightColor: {
      type: String,
      required: false,
      default: '#8FF2E1',
    },
  },
}
</script>

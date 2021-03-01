<template>
  <div class="top-header">
    <p
      v-if="topic"
      :style="{ color: highlightColor }"
      :class="[
        centerTopic && 'text-center',
        activeBackground && 'active-background',
      ]"
    >
      <i v-if="leadingIcon" :class="leadingIcon" />
      <strong style="font-family: 'Nunito Sans', sans-serif">{{
        topic
      }}</strong>
    </p>
    <h3 v-if="title" class="my-4">{{ title }}</h3>
    <hr v-if="useDivider" class="faded-divider" />
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
    centerTopic: {
      type: Boolean,
      required: false,
      default: false,
    },
    useDivider: {
      type: Boolean,
      required: false,
      default: false,
    },
    activeBackground: {
      type: Boolean,
      required: false,
      default: false,
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

<template>
  <section class="keypoint text-left">
    <span
      :style="{
        color: tickColor,
        fontSize: tickSize + 'px',
      }"
      class="mdi mdi-checkbox-marked-circle-outline mr-3"
    />
    <span :style="{ color: textColor }">{{ point }}</span>
  </section>
</template>

<script>
export default {
  name: 'KeyPoint',
  props: {
    tickColor: {
      type: String,
      required: true,
    },
    textColor: {
      type: String,
      required: false,
      default: '#9a9a9a',
    },
    tickSize: {
      type: Number,
      required: true,
    },
    point: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.keypoint {
  color: #9a9a9a;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1rem;
  font-weight: 300;
}
</style>

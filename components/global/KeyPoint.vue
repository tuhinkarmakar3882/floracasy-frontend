<template>
  <div>
    <span :color="tickColor" :size="tickSize"> mdi-check-circle-outline </span>
    <span>
      {{ point }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'KeyPoint',
  components: {},
  props: {
    tickColor: {
      type: String,
      required: true,
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
@import 'assets/all-variables';

div {
  color: $muted;
  text-align: left;
  display: flex;
  align-items: flex-start;
  font-size: 18px;
  font-weight: 300;

  span {
    margin-left: 24px;
  }
}
</style>

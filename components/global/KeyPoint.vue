<template>
  <section class="keypoint">
    <span
      :style="{
        color: tickColor,
        fontSize: tickSize + 'px',
      }"
      class="mdi mdi-checkbox-marked-circle-outline mr-3"
    />
    <span>
      {{ point }}
    </span>
  </section>
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
.keypoint {
  color: #9a9a9a;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 16px;
  font-weight: 300;
}
</style>

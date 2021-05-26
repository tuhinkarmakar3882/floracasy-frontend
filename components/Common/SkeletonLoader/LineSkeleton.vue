<template>
  <div :style="styles" class="skeleton-loader" />
</template>

<script>
export default {
  name: 'LineSkeleton',
  props: {
    display: {
      type: String,
      required: false,
      default: 'block',
    },
    width: {
      type: String,
      required: false,
      default: '100%',
    },
    height: {
      type: String,
      required: false,
      default: '1rem',
    },
  },
  data() {
    return { styles: {} }
  },
  mounted() {
    this.styles = {
      display: this.display,
      width: this.width,
      height: this.height,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/skeletons';
</style>

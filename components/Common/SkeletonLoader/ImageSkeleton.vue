<template>
  <div :style="styles" class="skeleton-loader" />
</template>

<script>
export default {
  name: 'ImageSkeleton',
  props: {
    width: {
      type: String,
      required: false,
      default: '100%',
    },
    height: {
      type: String,
      required: false,
      default: '250px',
    },
    radius: {
      type: String,
      required: false,
      default: '8px',
    },
  },
  data() {
    return { styles: {} }
  },
  mounted() {
    this.styles = {
      display: 'block',
      width: this.width,
      height: this.height,
      borderRadius: this.radius,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/skeletons';
</style>

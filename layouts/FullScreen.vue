<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'FullScreen',
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.install-badge {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  border-radius: $micro-unit $micro-unit 0 0;
}
</style>

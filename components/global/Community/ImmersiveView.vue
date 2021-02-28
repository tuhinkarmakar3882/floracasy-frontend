<template>
  <div class="immersive-view-component">
    <h1>Hello ImmersiveView</h1>
    <slot name="close-button"></slot>
  </div>
</template>

<script>
export default {
  name: 'ImmersiveView',
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.immersive-view-component {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: black;
  z-index: $bring-to-front;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>

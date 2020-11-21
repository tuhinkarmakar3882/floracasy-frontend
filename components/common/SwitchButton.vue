<template>
  <section class="switch-container">
    <div
      class="switch-button"
      :style="[
        { transform: switchState ? 'translateX(40px)' : 'translateX(4px)' },
        { backgroundColor: switchState ? '#65db65' : '#ff8282' },
      ]"
    />
  </section>
</template>

<script>
export default {
  name: 'SwitchButton',
  props: {
    switchState: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

$size: 36px;
main {
  .switch-container {
    position: relative;
    height: $size;
    width: 2 * $size;
    border-radius: 50px;
    background-color: #33404e;
    box-shadow: $default-box-shadow;

    .switch-button {
      position: absolute;
      top: $nano-unit;
      height: $size - $micro-unit;
      width: $size - $micro-unit;
      border-radius: 50px;
      box-shadow: $default-box-shadow;
      transition: all 250ms ease-in-out;
    }
  }
}
</style>

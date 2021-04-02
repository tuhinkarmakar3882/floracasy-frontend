<template>
  <section class="switch-container">
    <div
      class="switch-button"
      :style="[
        { transform: switchState ? 'translateX(32px)' : 'translateX(4px)' },
        { backgroundColor: switchState ? activeColor : '#9a9a9a' },
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
    activeColor: {
      type: String,
      default: '#6DD0BF',
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

main {
  .switch-container {
    position: relative;
    height: $x-large-unit;
    width: 2 * $x-large-unit;
    border-radius: 2 * $x-large-unit;
    background-color: #33404e;
    box-shadow: $default-box-shadow;

    .switch-button {
      position: absolute;
      top: $nano-unit;
      height: $x-large-unit - $micro-unit;
      width: $x-large-unit - $micro-unit;
      border-radius: 2 * $x-large-unit;
      box-shadow: $default-box-shadow;
      transition: all 250ms ease-in-out;
    }
  }
}
</style>

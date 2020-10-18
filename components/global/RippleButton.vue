<template>
  <button
    v-ripple="'rgba(255, 255, 255, 0.2)'"
    :type="buttonType"
    :class="
      disabled || loading
        ? this.$props.classList + ' disabled-btn'
        : this.$props.classList
    "
    :disabled="disabled || loading"
    :loading="loading"
    @click="onClick"
  >
    <span v-if="loading" class="loading-animation" />
    <slot v-else>Button</slot>
  </button>
</template>

<script>
export default {
  name: 'RippleButton',
  props: {
    classList: {
      type: String,
      default: 'primary-btn',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      default: () => {},
    },
    buttonType: {
      type: String,
      default: 'button',
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.loading-animation {
  margin: auto;
  display: block;
  height: $x-large-space !important;
  width: $x-large-space !important;
  border: $nano-space solid darken($muted, 10%);
  border-top: $nano-space solid $secondary-matte;
  border-radius: 100%;
  animation: spin 800ms ease-in-out infinite;

  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>

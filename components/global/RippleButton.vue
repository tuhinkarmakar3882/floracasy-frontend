<template>
  <button
    v-ripple="'rgba(255, 255, 255, 0.2)'"
    :class="
      disabled || loading
        ? this.$props.classList + ' disabled-btn'
        : this.$props.classList
    "
    :disabled="disabled || loading"
    :loading="loading"
    :type="buttonType"
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

button {
  min-height: auto;
  height: auto;
  width: auto;
  min-width: auto;
}

.loading-animation {
  margin-left: auto;
  margin-right: auto;
  display: block;
  height: $x-large-unit !important;
  width: $x-large-unit !important;
  border: $nano-unit solid darken($muted, 10%);
  border-top: $nano-unit solid $secondary-matte;
  border-radius: 100%;
  animation: spin 1.5s linear infinite;

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

<template>
  <button
    v-ripple="'rgba(255, 255, 255, 0.35)'"
    :type="buttonType"
    :class="disabled || loading ? 'disabled-btn' : this.$props.classList"
    :disabled="disabled || loading"
    :loading="loading"
    @click="onClick"
  >
    <span v-if="loading" class="loading-animation"></span>
    <slot v-else>Button</slot>
  </button>
</template>

<script>
export default {
  name: 'RippleButton',
  props: {
    classList: {
      type: String,
      required: true,
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
  display: block;
  margin: auto;
  height: $x-large-space;
  width: $x-large-space;
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

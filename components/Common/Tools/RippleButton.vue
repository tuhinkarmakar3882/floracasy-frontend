<template>
  <button
    v-ripple="'rgba(255, 255, 255, 0.2)'"
    :class="[this.$props.classList, (disabled || loading) && ' disabled-btn']"
    :disabled="disabled || loading"
    :loading="loading"
    :type="buttonType"
    @click="onClick"
  >
    <i v-if="loading" class="mdi mdi-loading mdi-spin mdi-24px vibrant" />
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

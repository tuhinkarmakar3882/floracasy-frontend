<template>
  <button
    v-ripple="'rgba(255, 255, 255, 0.35)'"
    type="button"
    :class="disabled ? 'disabled-btn' : this.$props.classList"
    :disabled="disabled"
  >
    {{ buttonText }}
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
    buttonText: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

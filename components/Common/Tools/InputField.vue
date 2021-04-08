<template>
  <section class="input-field-component py-4">
    <slot name="input-field"></slot>
    <label v-if="label">{{ label }}</label>
    <small v-if="hintText" class="mt-2 hint-text">
      {{ hintText }}
    </small>
  </section>
</template>

<script>
export default {
  name: 'InputField',
  props: {
    label: {
      type: String,
      required: false,
      default: '',
    },
    hintText: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.input-field-component {
  position: relative;

  label {
    position: absolute;
    top: $nano-unit !important;
    left: $micro-unit;
    background: $body-background;
    border-radius: 50px;
    padding: 0 $micro-unit;
    font-size: $standard-unit !important;
    font-family: $Nunito-Sans !important;
    color: $body-text-default;
    font-weight: 400;
  }

  input {
    padding: $standard-unit !important;
    border-radius: $nano-unit !important;
    border: 1px solid $disabled !important;

    &:hover,
    &:focus,
    &:active {
      border-color: $secondary !important;
      & ~ label {
        color: $secondary;
      }
    }
  }

  small {
    display: block;
    font-size: 0.6rem;
  }
}
</style>

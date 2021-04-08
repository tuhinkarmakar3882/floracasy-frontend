<template>
  <section class="input-field-component py-4">
    <label v-if="label && !material">{{ label }}</label>

    <slot name="input-field"></slot>

    <label v-if="label && material" class="material">{{ label }}</label>

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
    material: {
      type: Boolean,
      required: false,
      default: false,
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

$border-color: lighten($footer-background, $lighten-percentage);
.input-field-component {
  position: relative;

  label {
    display: block;
    font-size: $standard-unit !important;
    font-family: $Nunito-Sans !important;
    color: $body-text-default;
    font-weight: 300 !important;
    margin-bottom: $standard-unit !important;

    &.material {
      margin-bottom: 0 !important;
      position: absolute;
      top: $nano-unit !important;
      left: $milli-unit;
      background: $body-background;
      border-radius: 0;
      padding: 0 $micro-unit;
    }
  }

  input {
    padding: $standard-unit !important;
    border-radius: $nano-unit !important;
    border: 1px solid $border-color !important;

    &:hover,
    &:focus,
    &:active {
      border-color: $secondary !important;

      & ~ label {
        color: $secondary;
      }
    }
  }

  textarea {
    padding: $standard-unit !important;
    border: 1px solid $border-color !important;
    resize: none !important;
    border-radius: $nano-unit !important;
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

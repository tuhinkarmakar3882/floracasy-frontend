<template>
  <div class="form-label-group">
    <input
      :id="id"
      :type="inputType"
      class="form-control"
      :placeholder="placeholder"
      :required="required"
      :autofocus="autofocus"
      autocomplete="off"
    />
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    inputType: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: 'placeholder',
    },
    label: {
      type: String,
      default: 'Label',
    },
    id: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
@import 'assets/all-variables';

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
  transition: all 250ms ease-in-out;

  input,
  label {
    height: 3.125rem;
    padding: 0.75rem;
    width: 100%;
    letter-spacing: 1px;
    font-size: 1rem;
  }

  input {
    border-radius: $nano-unit;
    color: $white;
    background-color: darken($card-background, $darken-percentage) !important;
    font-weight: 400;

    &:hover,
    &:focus,
    &:focus-visible,
    &:active,
    &:focus-within {
      border-radius: $nano-unit;
      outline: none 0;
      box-shadow: 0 0 $double-unit $single-unit
        darken($white, $darken-percentage);
    }
  }

  label {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    margin-bottom: 0;
    line-height: 1.8;
    pointer-events: none;
    font-weight: 300;
    color: $body-text-default;
    cursor: text;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    transition: all 0.1s ease-in-out;
  }

  input::placeholder {
    color: transparent;
    background-color: darken($card-background, $darken-percentage) !important;
  }

  input:not(:placeholder-shown) {
    padding-top: 3.75rem;
    padding-bottom: 1.75rem;
    font-size: 1.4rem;
    background-color: darken($card-background, $darken-percentage) !important;
  }

  input:not(:placeholder-shown) ~ label {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    font-size: 1rem;
    background-color: darken($card-background, $darken-percentage) !important;
  }
}
</style>

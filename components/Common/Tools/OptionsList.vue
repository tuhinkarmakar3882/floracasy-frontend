<template>
  <div class="options-list-component">
    <ul>
      <slot name="list-options"></slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'OptionsList',
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.options-list-component {
  position: absolute;
  top: $xxx-large-unit;
  right: $standard-unit;
  z-index: 100;
  * {
    cursor: pointer;
  }

  ul {
    display: block;
    background: $card-bg;
    border-radius: $nano-unit;
    box-shadow: $down-only-box-shadow;
    width: clamp(232px, 100%, 300px);
    list-style: none;
    margin: 0;
    padding: $micro-unit 0;

    li {
      display: flex;
      align-items: center;
      color: #dadada;
      margin: 0;
      transition: all 50ms ease-in-out;

      &.list-option:hover {
        background: $gray-tone;
      }

      .icon {
        font-size: $large-unit;
        margin-right: $micro-unit;
      }
    }
  }
}
</style>

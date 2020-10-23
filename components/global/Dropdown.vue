<template>
  <div class="dropdown text-center my-8">
    <div @click="toggle">
      <slot name="custom-head"></slot>
    </div>
    <ul
      v-if="isDropDownOpen"
      :style="
        isDropDownOpen
          ? `height: auto; overflow: scroll`
          : `height:0; overflow: hidden`
      "
    >
      <slot name="options"></slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  data() {
    return {
      isDropDownOpen: false,
    }
  },
  methods: {
    toggle() {
      this.isDropDownOpen = !this.isDropDownOpen
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.dropdown {
  position: relative;
  display: inline-block;

  button {
    min-width: 0;
    border-radius: 0;
    position: relative;
  }

  ul {
    min-width: 200px;
    background: lighten($nav-bar-bg, $darken-percentage);
    position: absolute;
    list-style: none;
    overflow: hidden;
    transform: translateY(100%);
    transition: all 0.3s ease-in-out;
    width: 100%;
    bottom: -$micro-space;
    right: 0;
    z-index: 1;
    border-radius: $nano-space;
    box-shadow: $default-box-shadow;

    li {
      display: inline-grid;
      margin: 0;
      min-height: $xx-large-space;
      width: 100%;
      padding: $standard-space 0;
      border-bottom: 1px solid red;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>

<template>
  <svg
    :class="active && 'active'"
    viewBox="0 0 37 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="16.6879" cy="10" rx="9.81627" ry="10" />
    <ellipse cx="9.81627" cy="22" rx="9.81627" ry="10" />
    <ellipse cx="26.5038" cy="22" rx="9.81627" ry="10" />
  </svg>
</template>

<script>
export default {
  name: 'EffectsIcon',
  props: {
    active: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

svg {
  ellipse {
    &:nth-child(1) {
      fill: #9a9a9a;
    }
    &:nth-child(2) {
      fill: #7a7a7a;
    }
    &:nth-child(3) {
      fill: #cacaca;
    }
  }
}
svg.active {
  ellipse {
    &:nth-child(1) {
      fill: #ff8282;
    }
    &:nth-child(2) {
      fill: #6dd0bf;
    }
    &:nth-child(3) {
      fill: #9c9aff;
    }
  }
}
</style>

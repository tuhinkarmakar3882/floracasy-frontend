<template>
  <div class="app-bar-header">
    <NotificationBadge />

    <header>
      <i v-ripple class="mdi mdi-arrow-left" @click="$router.back()" />

      <p><slot name="title" /></p>

      <aside class="ml-auto pr-4">
        <slot name="action-button" />
      </aside>
    </header>
  </div>
</template>

<script>
export default {
  name: 'AppBarHeader',
  props: {
    showBackButton: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.app-bar-header {
  position: relative !important;
  $size: 2 * $x-large-unit;

  header {
    position: sticky !important;
    top: -$single-unit !important;
    display: flex !important;
    align-items: center !important;
    background-color: $navigation-bar-color !important;
    box-shadow: $down-only-box-shadow !important;
    height: $size !important;
    transition: all 300s ease-in-out !important;
    z-index: $bring-to-front !important;

    i {
      color: #dadada !important;
      font-size: $large-unit !important;
      height: $size !important;
      width: $size !important;
      display: grid !important;
      place-items: center !important;
    }

    p {
      font-size: 18px !important;
      font-weight: 400 !important;
      color: #eaeaea !important;
    }
  }
}
</style>

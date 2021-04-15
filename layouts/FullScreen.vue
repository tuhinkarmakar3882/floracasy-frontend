<template>
  <div>
    <LazyInstallBadge class="install-badge" show-close-button />
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'FullScreen',
}
</script>

<style lang="scss" scoped>
.install-badge {
  z-index: 1234567890;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;

  @media screen and (min-width: 1024px) {
    top: unset;
    bottom: 0;
  }
}
</style>

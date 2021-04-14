<template>
  <div>
    <nuxt />
    <LazyInstallBadge class="install-badge" show-close-button />
  </div>
</template>

<script>
export default {
  name: 'FullScreen',
}
</script>

<style scoped>
.install-badge {
  z-index: 1234567890;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>

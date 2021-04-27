<template>
  <main class="modal-style">
    <NotificationBadge />
    <nuxt />
    <LazyInstallBadge class="install-badge" show-close-button />
  </main>
</template>

<script>
export default {
  name: 'Authentication',
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.modal-style {
  display: grid;
  place-items: center;
  height: 100vh;
  transition: all 0.5s ease-in-out;
  background-color: $black;

  .install-badge {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
</style>

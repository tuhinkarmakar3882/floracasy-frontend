<template>
  <main class="modal-style">
    <NotificationBadge />
    <nuxt />
    <LazyInstallBadge show-close-button class="install-badge" />
  </main>
</template>

<script>
import NotificationBadge from '@/components/global/NotificationBadge'
export default {
  name: 'Authentication',
  components: { NotificationBadge },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.modal-style {
  display: grid;
  place-items: center;
  height: 100vh;
  transition: all 0.5s ease-in-out;
  background-color: darken($body-background, 5%);

  .install-badge {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
</style>

<template>
  <div
    :class="[sticky && 'sticky', 'app-bar-header', autoHide && 'sticky']"
    :style="{
      top: showTopBar ? 0 : '-56px',
    }"
  >
    <NotificationBadge />

    <header>
      <i
        v-if="!noBackButton"
        v-ripple
        class="mdi mdi-arrow-left"
        @click="$router.back()"
      />

      <p><slot name="title" /></p>

      <aside class="ml-auto" :class="!noRightPadding && 'pr-4'">
        <slot name="action-button" />
      </aside>
    </header>
  </div>
</template>

<script>
export default {
  name: 'AppBarHeader',

  props: {
    noBackButton: {
      type: Boolean,
      default: false,
    },
    noRightPadding: {
      type: Boolean,
      default: false,
    },
    sticky: {
      type: Boolean,
      default: false,
    },
    autoHide: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      showTopBar: true,
    }
  },

  mounted() {
    this.autoHide && document.addEventListener('scroll', this.autoHideOnScroll)
  },

  beforeDestroy() {
    this.autoHide &&
      document.removeEventListener('scroll', this.autoHideOnScroll)
  },

  methods: {
    autoHideOnScroll() {
      const currentScrollPos = window.pageYOffset
      this.showTopBar = this.prevScrollPos > currentScrollPos
      this.prevScrollPos = currentScrollPos
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.app-bar-header {
  position: relative !important;

  &.sticky {
    position: sticky !important;
    top: 0;
    z-index: $bring-to-front !important;
  }

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

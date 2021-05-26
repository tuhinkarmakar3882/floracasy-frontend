<template>
  <div class="app-bar-header">
    <NotificationBadge />

    <header>
      <i
        v-if="!noBackButton"
        v-ripple
        class="mdi mdi-arrow-left"
        @click="back"
      />

      <p><slot name="title" /></p>

      <aside :class="!noRightPadding && 'pr-4'" class="ml-auto">
        <slot name="action-button" />
      </aside>
    </header>
  </div>
</template>

<script>
import NotificationBadge from '~/components/Layout/NotificationBadge'

export default {
  name: 'AppBarHeader',
  components: { NotificationBadge },
  props: {
    noBackButton: {
      type: Boolean,
      default: false,
    },
    noRightPadding: {
      type: Boolean,
      default: false,
    },

    previousPage: {
      type: Object,
      required: false,
      default: () => {},
    },
    fallbackPage: {
      type: String,
      required: true,
    },
  },

  methods: {
    back() {
      this.previousPage
        ? this.$router.back()
        : this.$router.push(this.fallbackPage)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.app-bar-header {
  background-color: $navigation-bar-color !important;
  position: sticky !important;
  top: 0;
  z-index: $bring-to-front !important;

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

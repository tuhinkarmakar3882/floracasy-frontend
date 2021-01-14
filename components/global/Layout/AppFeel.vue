<template>
  <div class="app">
    <NotificationBadge />
    <header
      v-if="customHeader"
      :style="[
        autoHide && {
          top: showTopBar ? '0 !important' : '-56px !important',
        },
      ]"
    >
      <slot name="app-bar-custom-header" />
    </header>
    <header
      v-else
      :style="[
        centerAligned && { justifyContent: 'center' },
        autoHide && {
          top: showTopBar ? '0 !important' : '-56px !important',
        },
      ]"
    >
      <h5
        v-if="showBackButton"
        v-ripple=""
        :class="{ 'px-5': showBackButton }"
        class="mdi mdi-arrow-left"
        style="height: 56px; display: flex; align-items: center"
        @click="dynamicBack ? useDynamicNavigation() : navigateTo(onBack)"
      />
      <p>
        <slot name="app-bar-title" />
      </p>
      <div class="ml-auto pr-4">
        <slot name="app-bar-action-button" />
      </div>
    </header>

    <main class="main-content">
      <slot name="main"></slot>
    </main>

    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
import NotificationBadge from '@/components/global/NotificationBadge'

export default {
  name: 'AppFeel',
  components: { NotificationBadge },
  props: {
    dynamicBack: {
      type: Boolean,
      required: false,
      default: false,
    },
    prevUrlPath: {
      type: Object,
      required: false,
    },
    onBack: {
      type: String,
      required: true,
    },
    showBackButton: {
      type: Boolean,
      default: true,
    },
    customHeader: {
      type: Boolean,
      default: false,
    },
    centerAligned: {
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
      prevURL: undefined,
      showTopBar: true,
      prevScrollPos: 0,
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
    async navigateTo(path) {
      await this.$router.replace(path)
    },

    autoHideOnScroll() {
      const currentScrollPos = window.pageYOffset
      this.showTopBar = this.prevScrollPos > currentScrollPos
      this.prevScrollPos = currentScrollPos
    },

    async useDynamicNavigation() {
      this.prevUrlPath
        ? await this.$router.back()
        : await this.navigateTo(this.onBack)
    },
  },
}
</script>

<style lang="scss">
@import 'assets/all-variables';

.app {
  header {
    position: sticky;
    top: -$single-unit;
    left: 0;
    z-index: $bring-to-front;
    display: flex;
    align-items: center;
    height: 2 * $x-large-unit;
    background-color: $nav-bar-bg;
    box-shadow: $down-only-box-shadow;
    transition: all 0.2s ease-in-out;

    p {
      font-size: 1.2rem;
      font-weight: 400;
      color: #dadada;
    }
  }

  .main-content {
    background-color: $body-background;
    max-width: $max-width;
    margin-left: auto;
    margin-right: auto;
    min-height: calc(100vh - 200px);

    button {
      min-width: auto;
    }
  }
}
</style>

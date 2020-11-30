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
    <header v-else :style="centerAligned && 'justify-content : center'">
      <h5
        v-if="showBackButton"
        v-ripple=""
        class="mdi mdi-arrow-left"
        @click="navigateTo(onBack)"
      />
      <p :class="{ 'ml-6': showBackButton }">
        <slot name="app-bar-title" />
      </p>
    </header>
    <main>
      <slot name="main"></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
import NotificationBadge from '@/components/NotificationBadge'

export default {
  name: 'AppFeel',
  components: { NotificationBadge },
  props: {
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
    padding: 0 $medium-unit;
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

  main {
    background-color: $body-background;

    blockquote,
    ul,
    ol,
    hr {
      margin: $large-unit 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      position: relative;
      margin: $large-unit 0;
    }
  }

  button {
    min-width: auto;
  }
}
</style>

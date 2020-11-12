<template>
  <div class="app">
    <header v-if="customHeader">
      <slot name="app-bar-custom-header" />
    </header>
    <header v-else :style="centerAligned && 'justify-content : center'">
      <h5
        v-if="showBackButton"
        v-ripple
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
  </div>
</template>

<script>
export default {
  name: 'AppFeel',
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
  },
  methods: {
    async navigateTo(path) {
      await this.$router.replace(path)
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

      //&::after {
      //  content: '';
      //  border-radius: $standard-unit;
      //  position: absolute;
      //  bottom: -$micro-unit;
      //  left: 0;
      //  height: $nano-unit;
      //  width: clamp(100px, 20%, 250px);
      //  background-color: darken($secondary-matte, $lighten-percentage);
      //}
    }
  }

  button {
    min-width: auto;
  }
}
</style>

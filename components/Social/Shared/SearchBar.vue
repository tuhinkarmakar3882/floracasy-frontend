<template>
  <section
    class="search-box-container"
    @click="useOnlyNavigationFeature && $router.push(navigateTo)"
  >
    <div class="search-box">
      <input
        id="search-box"
        ref="search"
        v-model="query"
        :placeholder="inputPlaceholder"
        autocomplete="off"
        type="text"
        @blur="showFallback = false"
        @focusin="showFallback = true"
        @focusout="showFallback = false"
        @keyup.enter="searchFunction"
      />
      <label
        :aria-label="inputPlaceholder"
        :class="prependIcon"
        class="mdi px-4 mdi-24px"
        for="search-box"
      />
      <span
        v-ripple
        :class="searchIcon"
        aria-label="Click here to start searching"
        class="mdi mdi-24px px-4"
      />
    </div>

    <transition name="scale-down">
      <aside v-if="showFallback" class="backdrop" />
    </transition>
  </section>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'SearchBar',

  props: {
    navigateTo: {
      type: String,
      required: false,
      default: navigationRoutes.Home.Community.Search,
    },
    text: {
      type: String,
      default: '',
    },
    inputPlaceholder: {
      type: String,
      default: 'Type here to search',
    },
    prependIcon: {
      type: String,
      default: 'mdi-magnify',
    },
    searchIcon: {
      type: String,
      default: 'mdi-check',
    },
    useOnlyNavigationFeature: {
      type: Boolean,
      default: false,
    },
    searchFunction: {
      type: Function,
      required: false,
      default: () => {},
    },
  },

  data() {
    return {
      showFallback: false,
      query: this.text || '',
    }
  },

  methods: {},
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.search-box-container {
  display: flex;
  align-items: center;
  position: relative;

  .search-box {
    position: relative;
    width: 100%;
    z-index: $bring-to-front - 11;

    $custom-muted: #777;
    $custom-input-border: #333;

    span,
    label {
      height: 48px;
      position: absolute !important;
      top: 0;
      display: grid;
      place-items: center;
      border-radius: 2 * $x-large-unit;
      transition: all 0.2s ease-in-out;
    }

    span {
      right: 0;
      opacity: 0;
      transform: scale(0);
      color: $secondary;
    }

    label {
      left: 0;
      color: $custom-muted;
    }

    input {
      transition: all 0.2s ease-in-out;
      border: 1px solid $custom-input-border;
      border-radius: 2 * $x-large-unit;
      height: 48px;
      padding: 0 48px;
      color: $custom-muted;
      font-weight: 300;
      font-family: $Raleway;
      letter-spacing: $single-unit;
      font-size: 1rem;

      &::placeholder {
        color: $custom-muted;
        font-weight: 300;
      }

      &:focus,
      &:not(:placeholder-shown) {
        border: 1px solid $secondary-highlight;

        & ~ label {
          color: $secondary;
        }
      }

      &:not(:placeholder-shown) {
        color: $secondary;
        padding-left: 20px;

        & ~ span {
          transform: scale(1);
          opacity: 1;
        }

        & ~ label {
          width: 0;
          margin: 0;
          padding: 0;
          opacity: 0;
          overflow: hidden;
        }
      }
    }
  }

  .backdrop {
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba($navigation-bar-color, 0.8);
    backdrop-filter: blur(1px);
    z-index: $bring-to-front - 15;
  }
}
</style>

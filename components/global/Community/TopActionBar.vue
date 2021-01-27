<template>
  <section class="top-action-bar">
    <div class="search-box">
      <input
        id="search-box"
        ref="search"
        v-model="query"
        autocomplete="off"
        placeholder="Type here to search"
        type="text"
        @blur="showFallback = false"
        @focusin="showFallback = true"
        @focusout="showFallback = false"
        @keyup.enter="performSearch"
      />
      <label
        aria-label="Type Here to Search for People"
        class="mdi mdi-magnify px-4 mdi-24px"
        for="search-box"
      />
      <span
        v-ripple
        aria-label="Click here to search"
        class="mdi mdi-check mdi-24px px-4"
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
  name: 'TopActionBar',
  props: {
    text: {
      type: String,
      default: '',
      required: false,
    },
  },
  data() {
    return {
      showFallback: false,
      query: this.text || '',
    }
  },
  methods: {
    async performSearch() {
      if (this.query.trim().length) {
        await this.$router.push({
          path: navigationRoutes.Home.Community.Search,
          query: {
            query: this.query,
          },
        })
        this.$refs.search.blur()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.top-action-bar {
  display: flex;
  align-items: center;
  position: relative;

  .search-box {
    position: relative;
    width: 100%;
    z-index: $bring-to-front - 1;

    $custom-muted: #777;
    $custom-input-border: #333;

    span,
    label {
      height: 48px;
      position: absolute !important;
      top: 0;
      display: grid;
      place-items: center;
      border-radius: 50px;
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
      border-radius: 50px;
      height: 48px;
      padding: 0 48px;
      color: $custom-muted;
      font-weight: 300;
      font-family: $Raleway;
      letter-spacing: 1px;
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
    background: rgba($nav-bar-bg, 0.8);
    backdrop-filter: blur(1px);
    z-index: $bring-to-front - 10;
  }
}
</style>

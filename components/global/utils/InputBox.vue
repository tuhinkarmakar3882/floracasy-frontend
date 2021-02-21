<template>
  <div class="px-2 py-4 search-box-container">
    <section class="search-box">
      <slot name="prepend-icon" class="dbx" />
      <slot name="search-box" />
      <slot name="append-icon" />
    </section>
  </div>
</template>

<script>
export default {
  name: 'InputBox',
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

    .append-icon,
    .prepend-icon {
      height: 2 * $large-unit;
      position: absolute !important;
      top: 0;
      font-size: 24px;
      padding-left: 16px;
      padding-right: 16px;
      display: grid;
      place-items: center;
      border-radius: 2 * $x-large-unit;
      transition: all 0.2s ease-in-out;
    }

    .append-icon {
      right: 0;
      opacity: 0;
      transform: scale(0);
      color: rgba($danger-light, 0.7);
    }

    .prepend-icon {
      left: 0;
      color: $custom-muted;
    }

    .search-input-box {
      overflow: scroll;
      outline: none 0;
      transition: all 0.2s ease-in-out;
      border: 1px solid $custom-input-border;
      border-radius: 2 * $x-large-unit;
      height: 48px;
      font-family: $Nunito-Sans;
      line-height: 1;
      padding: 15px 48px;
      resize: none;
      color: $custom-muted;
      font-weight: 300;
      letter-spacing: $single-unit;
      font-size: 1rem;

      &::-webkit-scrollbar {
        display: none;
      }

      &::placeholder {
        color: $custom-muted;
        font-weight: 300;
      }

      &:not(:placeholder-shown) {
        color: $secondary-matte;
        padding-left: 20px;

        & ~ .append-icon {
          transform: scale(1);
          opacity: 1;
        }

        & ~ .prepend-icon {
          width: 0;
          margin: 0;
          padding: 0;
          opacity: 0;
          overflow: hidden;
        }
      }

      &:focus {
        color: $vibrant;
        border: 1px solid $secondary-matte;

        & ~ .prepend-icon {
          color: $secondary-matte;
        }
        & ~ .append-icon {
          color: $danger-light;
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
    background: rgba($nav-bar-bg, 0.9);
    z-index: $bring-to-front - 15;

    .content {
      margin-top: 4.2 * $xxx-large-unit;
    }
  }
}
</style>

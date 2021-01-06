<template>
  <section class="top-action-bar">
    <!--      <div v-ripple class="add-post-btn px-4">-->
    <!--        <span class="mdi mdi-plus-box mdi-36px secondary" />-->
    <!--      </div>-->

    <div class="search-box">
      <input
        id="search-box"
        type="text"
        autocomplete="off"
        placeholder="Type here to search"
      />
      <label
        for="search-box"
        class="mdi mdi-magnify px-4 mdi-24px"
        aria-label="Type Here to Search for People"
      />
      <span
        v-ripple
        class="mdi mdi-check mdi-24px px-4"
        aria-label="Click here to search"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'TopActionBar',
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.top-action-bar {
  display: flex;
  align-items: center;

  .search-box {
    position: relative;
    width: 100%;

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
}
</style>

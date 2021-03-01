<template>
  <section class="add-post-preview px-4 py-6 white">
    <span class="mdi mdi-pencil-box-multiple-outline mdi-24px mr-3" />
    <p>Share your thoughts or photos or voice</p>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AddPostPreview',

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.add-a-post-preview {
  .header {
    display: flex;
    align-items: center;

    $size: 52px;

    img {
      width: $size;
      min-width: $size;
      height: $size;
      min-height: $size;
      border-radius: 50%;
      box-shadow: $default-box-shadow;
      object-fit: cover;
    }

    button {
      min-width: auto;
      font-size: 14px;
      width: 117px;
      height: 32px;
      margin-left: auto;
    }
  }

  .user-details {
    p {
      font-size: 1.2rem;
      font-weight: 400;
    }

    small {
      font-size: 13px;
      font-family: $Nunito-Sans;
      font-weight: 300;
      font-style: italic;
      line-height: 16px;
    }
  }

  .body {
    position: relative;
    color: $vibrant;
    background: $segment-background;
    border-radius: $micro-unit;

    &::after {
      content: '';
      position: absolute;
      left: $milli-unit;
      top: -$x-large-unit;
      border: $standard-unit solid transparent;
      border-bottom-color: $segment-background;
    }
  }

  .actions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    p {
      display: flex;
      justify-content: center;
      align-items: center;
      color: $muted;

      &:nth-child(2) {
        border-left: 1px solid $card-background;
        border-right: 1px solid $card-background;
      }
    }
  }
}
</style>

<template>
  <section class="add-a-post-preview px-4">
    <p class="py-6" style="font-size: 14px">
      <span class="mdi mdi-plus-circle primary-light" />
      Create new Post
    </p>
    <div class="header mb-6">
      <img
        alt="display-image"
        height="52"
        src="https://images.unsplash.com/photo-1557296387-5358ad7997bb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        width="52"
      />

      <section class="user-details ml-4">
        <p class="secondary">Swagata</p>
        <small>Beauty Blogger</small>
      </section>

      <button v-ripple class="vibrant-outlined-btn">New Post</button>
    </div>

    <p class="body py-5 text-center">What's on your mind?</p>

    <div class="actions mt-4">
      <p>
        <span class="mdi mdi-image mdi-24px secondary mr-2" />
        Photos
      </p>
      <p>
        <span class="mdi mdi-headphones mdi-24px secondary mr-2" />
        Audio
      </p>
      <p>
        <span class="mdi mdi-emoticon mdi-24px secondary mr-2" />
        Mood
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AddPostPreview',
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
      font-weight: 500;
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

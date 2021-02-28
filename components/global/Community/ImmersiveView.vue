<template>
  <div class="immersive-view-component">
    <header>
      <span class="line active" />
      <span class="line" />
      <span class="line" />
      <span class="line" />
    </header>

    <nav class="py-2">
      <i class="mdi mdi-arrow-left mdi-24px pl-4" />
      <img
        alt="profile-image"
        class="mx-2"
        height="52"
        src="https://picsum.photos/250"
        width="52"
      />
      <section class="name-and-time">
        <p class="my-0">Tuhin</p>
        <small>2h ago</small>
      </section>
      <i class="mdi mdi-dots-vertical mdi-24px ml-auto" />
    </nav>

    <main>
      <h1>Hello ImmersiveView</h1>
      <slot name="close-button"></slot>
    </main>

    <footer>
      <i class="mdi mdi-heart" />
      <i class="mdi mdi-emoticon-lol" />
      <i class="mdi mdi-emoticon-cool" />
      <i class="mdi mdi-emoticon-confused" />
      <i class="mdi mdi-emoticon-cry" />
      <i class="mdi mdi-emoticon-frown" />
      <i class="mdi mdi-emoticon-angry" />
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ImmersiveView',
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.immersive-view-component {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: black;
  z-index: $bring-to-front;

  header {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $nano-unit;

    .line {
      display: block;
      height: $nano-unit;
      width: 100%;
      background: $muted;
      border-radius: $xxx-large-unit;

      &.active {
        background: $secondary-highlight;
      }
    }
  }

  nav {
    background: $card-background;
    display: flex;
    align-items: center;

    $image-size: 48px;

    img {
      min-width: $image-size;
      width: $image-size;
      max-width: $image-size;
      min-height: $image-size;
      height: $image-size;
      max-height: $image-size;
      box-shadow: $default-box-shadow;
      border-radius: 50%;
    }
  }

  main {
    height: calc(100vh - 138px);
    overflow: scroll;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: $primary-matte;
  }

  footer {
    position: fixed;
    left: 0;
    bottom: 0;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(7, 1fr);
    font-size: 48px;
    width: 100%;
    background: $card-background;
  }
}
</style>

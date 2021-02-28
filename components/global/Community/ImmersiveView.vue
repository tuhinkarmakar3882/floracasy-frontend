<template>
  <div class="immersive-view-component">
    <header>
      <span class="line active" />
      <span class="line" />
      <span class="line" />
      <span class="line" />
    </header>

    <nav class="py-2">
      <i v-ripple class="mdi mdi-arrow-left mdi-24px icon" />
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
      <i v-ripple class="mdi mdi-dots-vertical mdi-24px ml-auto px-4 icon" />
    </nav>

    <main>
      <h1>Hello ImmersiveView</h1>
      <slot name="close-button"></slot>
    </main>

    <footer>
      <i
        v-for="(reaction, index) in reactions"
        :key="index"
        v-ripple="`${reaction.color}5F`"
        class="px-4"
        :class="reaction.icon"
        :style="{
          color: reaction.color,
        }"
      />
    </footer>
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'ImmersiveView',
  data() {
    return {
      showOptions: false,
      reactions: [
        {
          icon: 'mdi mdi-heart',
          color: '#80ff71',
        },
        {
          icon: 'mdi mdi-fire',
          color: '#ffd646',
        },
        {
          icon: 'mdi mdi-emoticon-lol',
          color: '#b4a7ff',
        },
        {
          icon: 'mdi mdi-emoticon-cry',
          color: '#32e9be',
        },
        {
          icon: 'mdi mdi-emoticon-angry',
          color: '#ff4d84',
        },
      ],
    }
  },
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
    background: $nav-bar-bg;
    display: flex;
    align-items: center;
    box-shadow: $down-only-box-shadow;

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

    .icon {
      display: grid;
      place-items: center;
      width: 56px;
      height: 56px;
    }
  }

  main {
    height: calc(100vh - 180px);
    margin-top: 16px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: $primary-matte;
  }

  footer {
    position: fixed;
    overflow: scroll;
    left: 0;
    bottom: 0;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(5, 1fr);
    font-size: 40px;
    width: 100%;
    background: $nav-bar-bg;
    box-shadow: $up-only-box-shadow;
  }
}
</style>

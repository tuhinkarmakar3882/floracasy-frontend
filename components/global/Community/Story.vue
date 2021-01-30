<template>
  <div class="story-component">
    <main class="story">
      <section class="wrapper mb-4">
        <img
          :alt="story.user.photoURL"
          :src="story.user.photoURL"
          height="72"
          width="72"
        />
      </section>

      <aside>
        <p>
          {{
            story.user.displayName.length > 14
              ? `${story.user.displayName.substr(0, 14)}...`
              : story.user.displayName
          }}
        </p>
      </aside>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Story',
  props: {
    story: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.story-component {
  .story {
    display: grid;
    place-items: center;
    border-radius: 8px;

    $wrapper-size: 74px;
    $image-size: 64px;

    .wrapper {
      text-align: center;
      position: relative;
      min-height: $wrapper-size;
      min-width: $wrapper-size;
      display: grid;
      place-items: center;

      img {
        min-height: $image-size;
        height: $image-size;
        min-width: $image-size;
        width: $image-size;
        object-fit: cover;
        box-shadow: $default-box-shadow;
        border-radius: 50%;
      }

      &::before {
        content: '';
        position: absolute;
        height: $wrapper-size;
        width: $wrapper-size;
        top: 0;
        left: 0;
        z-index: -1;
        border-radius: 50%;
        border: 2px solid $secondary;
      }
    }

    aside {
      align-self: flex-start;
      width: 100%;
      height: 4ch;
      overflow: hidden;

      p {
        font-weight: 300;
        text-align: center;
        font-size: 14px;
        line-height: 1.48;
      }
    }
  }
}
</style>

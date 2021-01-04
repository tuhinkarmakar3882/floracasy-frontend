<template>
  <div class="community-page">
    <section class="top-actions px-4 mt-6 mb-8">
      <input
        id="search-box"
        type="text"
        autocomplete="off"
        placeholder="Type here to search"
      />
      <label
        for="search-box"
        class="mdi mdi-magnify px-4 ml-4"
        aria-label="Type Here to Search for People"
      />
      <span v-ripple class="mdi mdi-check px-4 mr-4" />
    </section>

    <section class="story-updates py-2 px-4">
      <div v-for="(story, index) in stories" :key="index" class="wrapper mx-4">
        <img
          :src="story.user.photoURL + index"
          :alt="story.user.photoURL"
          height="64"
          width="64"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'Community',
  layout: 'MobileApp',
  // middleware: 'isAuthenticated',

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Community',
      stories: [
        {
          user: {
            photoURL: 'https://picsum.photos/10',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/10',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/10',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/10',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/10',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/10',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/10',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/10',
          },
        },
      ],
    }
  },

  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: 1,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.community-page {
  .top-actions {
    position: relative;

    span,
    label {
      height: 48px;
      position: absolute !important;
      top: 0;
      display: grid;
      font-size: 24px;
      place-items: center;
      border-radius: 50px;
      transition: all 0.2s ease-in-out;
    }

    span {
      right: 0;
      opacity: 0;
      display: none;
      color: $secondary;
    }

    label {
      left: 0;
      color: $disabled;
    }

    input {
      transition: all 0.2s ease-in-out;
      border: 1px solid $disabled;
      border-radius: 50px;
      height: 48px;
      padding: 0 48px;
      color: $disabled;
      font-weight: 300;
      font-family: $Raleway;
      letter-spacing: 1px;
      font-size: 1rem;

      &::placeholder {
        color: $disabled;
        font-weight: 300;
      }

      &:focus,
      &:not(:placeholder-shown) {
        border: 1px solid $secondary-highlight;
        color: $secondary;

        & ~ label {
          color: $secondary;
        }
      }

      &:not(:placeholder-shown) {
        & ~ span {
          display: grid;
          opacity: 1;
        }
      }
    }
  }

  .story-updates {
    display: flex;
    width: 100%;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    $wrapper-size: 74px;
    $image-size: 64px;

    .wrapper {
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
        border: 2px solid $secondary-highlight;
      }

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>

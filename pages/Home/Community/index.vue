<template>
  <div class="community-page">
    <section class="top-actions px-4 my-6">
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

    <section class="story-updates-container py-2">
      <div
        v-for="(story, index) in stories"
        :key="index"
        v-ripple
        class="story-update px-4"
      >
        <section class="wrapper mb-4">
          <img
            :src="story.user.photoURL + index"
            :alt="story.user.photoURL"
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
            displayName: 'Swagata Biswas',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/10',
            displayName: 'Dipti Mondal',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/10',
            displayName: 'Baire Chole Jachhe',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/10',
            displayName: 'Mosa Kamrachhe',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/10',
            displayName: 'Alu De',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/10',
            displayName: 'Thennarau WandaVision',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/10',
            displayName: 'Alan Walker',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/10',
            displayName: 'Alan Walker',
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

  .story-updates-container {
    display: flex;
    width: 100%;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    .story-update {
      display: grid;
      place-items: center;

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
}
</style>

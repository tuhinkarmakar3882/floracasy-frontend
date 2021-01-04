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

    <section class="story-updates-container">
      <Story
        v-for="(story, index) in stories"
        :key="index"
        class="px-4 py-2"
        :story="story"
      />
    </section>

    <hr class="faded-divider" />
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'
import Story from '~/components/global/Community/Story'

export default {
  name: 'Community',
  components: { Story },
  layout: 'MobileApp',
  // middleware: 'isAuthenticated',

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Community',
      stories: [
        {
          user: {
            photoURL: 'https://picsum.photos/101',
            displayName: 'Swagata Biswas',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/102',
            displayName: 'Dipti Mondal',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/103',
            displayName: 'Somlata Dey',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/104',
            displayName: 'Mosa Kamrachhe',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/105',
            displayName: 'Tistua Bekar',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/106',
            displayName: 'Thennarasu WandaVision',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/107',
            displayName: 'Harry Potter',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/108',
            displayName: 'Tuhin Karmakar',
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
  }

  .faded-divider {
    background: linear-gradient(to right, #222, #111);
  }
}
</style>

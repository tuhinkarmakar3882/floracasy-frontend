<template>
  <div class="immersive-view-component">
    <header
      :style="{
        gridTemplateColumns: `repeat(${story.story_count}, 1fr)`,
      }"
    >
      <span
        v-for="(item, index) in story.story_count"
        :key="`line-${item}`"
        :class="[index === activeElement && 'active']"
        class="line"
      />
    </header>

    <nav class="mt-2">
      <i
        v-ripple
        class="mdi mdi-arrow-left mdi-24px icon"
        @click="onClickFunction"
      />

      <nuxt-link
        :to="
          navigationRoutes.Home.Account.Overview.replace(
            '{userUID}',
            story.userUID
          )
        "
        class="no-underline"
      >
        <img
          :src="story.user.photoURL"
          alt="profile-image"
          class="mr-4 profile-image"
          height="52"
          width="52"
        />
      </nuxt-link>

      <section class="name-and-time">
        <p v-ripple class="my-0 secondary-highlight">
          <nuxt-link
            :to="
              navigationRoutes.Home.Account.Overview.replace(
                '{userUID}',
                story.userUID
              )
            "
            class="no-underline"
          >
            {{ username }}
          </nuxt-link>
        </p>

        <small>{{ getRelativeTime(story.updatedAt) }}</small>
      </section>

      <i v-ripple class="mdi mdi-dots-vertical mdi-24px ml-auto px-4 icon" />
    </nav>

    <main class="story-display-container" @scroll="calculateActiveElement">
      <FallBackLoader v-if="loadingStories" class="my-4" />

      <section
        v-for="item in allStories"
        :key="item.identifier"
        :style="item.style"
        class="scroll-list"
      >
        <div v-if="item.storyType === 'text'">
          {{ item.body }}
        </div>

        <div v-if="item.storyType === 'photo'">
          <img :src="item.photo" alt="story-photo" />
        </div>

        <div v-if="item.storyType === 'audio'">
          <audio controls>
            <source :src="item.audio" />
          </audio>
        </div>
      </section>

      <LoadingError
        v-if="errorWhileFetchingStory"
        error-section="Story Details"
      />
    </main>

    <footer>
      <i
        v-for="(reaction, index) in reactions"
        :key="index"
        v-ripple="`${reaction.color}5F`"
        :class="reaction.icon"
        :style="{
          color: reaction.color,
        }"
        class="px-4"
      />
    </footer>
  </div>
</template>

<script>
import { getRelativeTime } from '~/utils/utility'
import endpoints from '~/api/endpoints'
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'ImmersiveView',
  props: {
    story: {
      type: Object,
      required: true,
    },
    onClickFunction: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      navigationRoutes,

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
      allStories: [],

      errorWhileFetchingStory: false,
      loadingStories: true,
      activeElement: 0,
    }
  },
  computed: {
    username() {
      return this.story.user.displayName.length > 23
        ? this.story.user.displayName.substr(0, 22) + '...'
        : this.story.user.displayName
    },
  },

  async mounted() {
    try {
      await this.getAllStories()
    } catch (e) {
      this.errorWhileFetchingStory = true
    } finally {
      this.loadingStories = false
    }
  },

  methods: {
    getRelativeTime,
    async getAllStories() {
      this.allStories = await this.$axios.$get(
        endpoints.community_service.stories.detail.replace(
          '{identifier}',
          this.story.identifier
        )
      )
    },

    calculateActiveElement({ target }) {
      this.activeElement = Math.round(target.scrollLeft / window.innerWidth)
    },
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
  background: $body-background;
  z-index: 2 * $bring-to-front;

  header {
    display: grid;
    gap: $nano-unit;

    .line {
      display: block;
      height: $double-unit;
      width: 100%;
      background: darken($muted, $darken-percentage);
      border-radius: $xxx-large-unit;
      transition: all 200ms ease-in-out;

      &.active {
        background: $primary-light;
      }
    }
  }

  nav {
    background: $nav-bar-bg;
    display: flex;
    height: 56px;
    align-items: center;
    box-shadow: $down-only-box-shadow;

    $image-size: 36px;

    img {
      min-width: $image-size;
      width: $image-size;
      max-width: $image-size;
      min-height: $image-size;
      height: $image-size;
      max-height: $image-size;
      box-shadow: $default-box-shadow;
      border-radius: 50%;
      object-fit: cover;
    }

    .icon {
      display: grid;
      place-items: center;
      width: 56px;
      height: 56px;
    }

    .name-and-time {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
      }

      small {
        font-size: 12px;
      }
    }
  }

  main.story-display-container {
    height: calc(100vh - 180px);
    margin-top: 16px;
    overflow: scroll;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    scroll-snap-type: x mandatory;
    scroll-snap-align: start;
    scroll-snap-stop: always;

    &::-webkit-scrollbar {
      display: none;
    }

    .scroll-list {
      margin: 0;
      height: 100%;
      overflow: scroll;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      scroll-snap-align: start;
      scroll-snap-stop: always;
      flex-shrink: 0;
      width: 100vw;
      transform-origin: center center;

      audio {
        width: 80vw;
      }

      img {
        width: 99vw;
        object-fit: scale-down;
      }
    }
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

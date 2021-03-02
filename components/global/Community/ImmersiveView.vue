<template>
  <div class="immersive-view-component">
    <header
      :style="{
        gridTemplateColumns: `repeat(${story.story_count}, 1fr)`,
      }"
    >
      <span
        v-for="item in story.story_count"
        :key="`line-${item}`"
        class="line"
      />
    </header>

    <nav>
      <i
        v-ripple
        class="mdi mdi-arrow-left mdi-24px icon"
        @click="onClickFunction"
      />
      <img
        alt="profile-image"
        class="mr-2 profile-image"
        height="52"
        :src="story.user.photoURL"
        width="52"
      />
      <section class="name-and-time">
        <p class="my-0 secondary-highlight">
          {{ username }}
        </p>
        <small>{{ getRelativeTime(story.updatedAt) }}</small>
      </section>
      <i v-ripple class="mdi mdi-dots-vertical mdi-24px ml-auto px-4 icon" />
    </nav>

    <main class="story-display-container dbx">
      <FallBackLoader v-if="loadingStories" class="my-4" />

      <section
        v-for="item in allStories"
        :key="item.identifier"
        class="scroll-list"
      >
        <pre>{{ item }}</pre>
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

      &.active {
        background: $white;
      }
    }
  }

  nav {
    background: $nav-bar-bg;
    display: flex;
    height: 72px;
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
      object-fit: cover;
    }

    .icon {
      display: grid;
      place-items: center;
      width: 56px;
      height: 72px;
    }

    .name-and-time {
      p {
        font-size: 18px;
        font-weight: 400;
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

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

      <i
        v-ripple
        class="mdi mdi-dots-vertical mdi-24px ml-auto px-4 icon"
        @click="showOptions = !showOptions"
      />
    </nav>

    <transition name="gray-shift">
      <div v-if="showOptions" class="options">
        <ul>
          <li v-ripple="`#ff82825F`" class="py-2 px-6" @click="reportStory">
            <span class="icon mdi mdi-alert-octagon danger-light" />
            Report Story
          </li>
          <li class="my-0 py-2 px-4" style="display: block">
            <hr class="my-0" style="background-color: #464646" />
          </li>
          <li v-ripple="`#ff82815f`" class="py-2 px-4">
            <p
              class="danger-light text-center my-0"
              style="width: 100%"
              @click="showOptions = false"
            >
              Close
            </p>
          </li>
        </ul>
      </div>
    </transition>

    <main
      ref="storyDisplayContainer"
      class="story-display-container"
      @scroll="calculateActiveElement"
    >
      <FallBackLoader v-if="loadingStories" class="my-4" />

      <section
        v-for="item in allStories"
        :key="item.identifier"
        :style="item.style"
        class="scroll-list"
      >
        <div v-if="item.storyType === 'text'" class="px-4 text-story">
          {{ item.body }}
        </div>

        <div v-if="item.storyType === 'photo'">
          <img :src="item.photo" alt="story-photo" />
        </div>

        <div v-if="item.storyType === 'audio'" style="width: 100%">
          <AudioPlayer :audio-source="item.audio" />
        </div>
      </section>

      <aside class="controls">
        <button class="forward" @click="nextStory" />
        <button class="backward" @click="prevStory" />
      </aside>

      <LoadingError
        v-if="errorWhileFetchingStory"
        error-section="Story Details"
      />
    </main>

    <footer>
      <section
        v-ripple
        :class="showReactionOptions && 'active'"
        class="floating-action-button"
        @click="showReactionOptions = !showReactionOptions"
      >
        <i
          :class="
            showReactionOptions
              ? 'mdi-close danger-light'
              : containsReaction
              ? reactionIcon
              : 'mdi-emoticon-outline'
          "
          :style="containsReaction && { color: reactionColor }"
          class="mdi"
        />
      </section>

      <aside :class="showReactionOptions && 'open'" class="reactions hidden">
        <i
          v-for="(reaction, index) in reactions"
          :key="index"
          v-ripple="`${reaction.color}5F`"
          :class="reaction.icon"
          :style="{
            color: reaction.color,
          }"
          class="px-4"
          @click="addReaction(reaction.type)"
        />
      </aside>
    </footer>
  </div>
</template>

<script>
import { getRelativeTime, showUITip } from '~/utils/utility'
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

      showReactionOptions: false,
      showOptions: false,
      reactions: [
        {
          icon: 'mdi mdi-heart',
          color: '#80ff71',
          type: 'heart',
        },
        {
          icon: 'mdi mdi-fire',
          color: '#ffd646',
          type: 'fire',
        },
        {
          icon: 'mdi mdi-emoticon-lol',
          color: '#b4a7ff',
          type: 'haha',
        },
        {
          icon: 'mdi mdi-emoticon-cry',
          color: '#32e9be',
          type: 'sad',
        },
        {
          icon: 'mdi mdi-emoticon-angry',
          color: '#ff4d84',
          type: 'angry',
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
    containsReaction() {
      return this.allStories[this.activeElement]?.reactions?.hasReaction
    },
    reactionIcon() {
      switch (this.allStories[this.activeElement]?.reactions?.reactionType) {
        case 'heart':
          return 'mdi-heart'
        case 'fire':
          return 'mdi-fire'
        case 'haha':
          return 'mdi-emoticon-lol'
        case 'sad':
          return 'mdi-emoticon-cry'
        case 'angry':
          return 'mdi-emoticon-angry'
        default:
          return 'mdi-home'
      }
    },
    reactionColor() {
      switch (this.allStories[this.activeElement]?.reactions?.reactionType) {
        case 'heart':
          return '#80ff71'
        case 'fire':
          return '#ffd646'
        case 'haha':
          return '#b4a7ff'
        case 'sad':
          return '#32e9be'
        case 'angry':
          return '#ff4d84'
        default:
          return ''
      }
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

    async reportStory() {
      await this.$router.push({
        path: navigationRoutes.Home.MoreOptions.HelpAndSupport.ContactSupport,
        query: {
          type: 'Story',
          identifier: this.allStories[this.activeElement].identifier,
        },
      })
    },

    async addReaction(reactionType) {
      this.showReactionOptions = false
      this.updateReaction(this.activeElement, reactionType, true)
      try {
        const { action } = await this.$axios.$post(
          endpoints.community_service.stories.reaction,
          {
            identifier: this.allStories[this.activeElement].identifier,
            reactionType,
          }
        )
        action === 'clear' &&
          this.updateReaction(this.activeElement, reactionType, false)
      } catch (e) {
        this.updateReaction(this.activeElement, reactionType, false)
        await showUITip(this.$store, 'Network Error...Try Again!')
      }
    },

    updateReaction(activeItem, reactionType, hasReaction) {
      this.allStories[activeItem].reactions.hasReaction = hasReaction
      this.allStories[activeItem].reactions.reactionType = reactionType
    },
    nextStory() {
      this.$refs.storyDisplayContainer.scrollBy({
        left: 100,
        behavior: 'smooth',
      })
    },
    prevStory() {
      this.$refs.storyDisplayContainer.scrollBy({
        left: -100,
        behavior: 'smooth',
      })
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

  * {
    transition: all 250ms ease-in-out;
  }

  header {
    display: grid;
    gap: $nano-unit;

    .line {
      display: block;
      height: $double-unit;
      width: 100%;
      background: #8d8d8d;
      border-radius: $xxx-large-unit;
      transition: all 200ms ease-in-out;

      &.active {
        background: $white;
      }
    }
  }

  nav {
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    position: fixed;
    height: 56px;
    align-items: center;
    width: 100%;
    top: -6px;

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

  .options {
    position: absolute;
    background: $segment-background;
    border-radius: $nano-unit;
    box-shadow: $down-only-box-shadow;
    max-width: 300px;
    min-width: 232px;
    z-index: (2 * $bring-to-front) + 1;
    transition: all 150ms ease-in-out;
    right: $nano-unit;
    top: 59px;

    ul {
      list-style: none;
      margin: 0;
      padding: $micro-unit 0;

      li {
        display: flex;
        align-items: center;
        color: #dadada;
        margin: 0;
      }
    }

    .icon {
      font-size: $large-unit;
      margin-right: $micro-unit;
    }
  }

  footer {
    .floating-action-button {
      height: 56px;
      width: 56px;
      bottom: 32px;
      right: 16px;
      background: #2a2a2a;
      color: #a3a3ff;
      font-size: 29px;
      box-shadow: $default-box-shadow;

      &.active {
        border-top-right-radius: 0;
        border-top-left-radius: 0;
      }
    }

    $border-radius: 36px;

    .reactions {
      position: fixed;
      right: 16px;
      bottom: 87px;
      display: grid;
      grid-template-rows: repeat(5, 64px);
      font-size: 23px;
      place-items: center;
      background: #2a2a2a;
      border-top-left-radius: $border-radius;
      border-top-right-radius: $border-radius;
      box-shadow: $up-only-box-shadow;
      overflow: hidden;
      opacity: 0;
      transform: translateY(27px);

      &.hidden {
        height: 0;
      }

      &.open {
        height: 320px;
        opacity: 1;
        transform: translateY(0);
      }

      * {
        display: grid;
        place-items: center;
        width: 56px;
        height: 64px;
      }

      i:first-child {
        border-top-left-radius: $border-radius;
        border-top-right-radius: $border-radius;
      }
    }
  }

  main.story-display-container {
    height: calc(100vh);
    border-radius: 0;
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

      * {
        border-radius: 0 !important;
      }

      .text-story {
        text-align: center;
        line-height: 1.75;
      }
    }

    .controls {
      button {
        all: unset;
      }

      .forward,
      .backward {
        position: absolute !important;
        height: calc(100vh - 56px);
        width: 10vw;
        top: 56px;
      }

      .forward {
        right: 0;
      }

      .backward {
        left: 0;
      }
    }
  }
}
</style>

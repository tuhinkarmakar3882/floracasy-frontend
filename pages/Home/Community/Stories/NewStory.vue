<template>
  <div class="add-new-story-page">
    <header>
      <i v-ripple class="mdi mdi-arrow-left mdi-24px white" @click="goBack()" />
    </header>

    <main>
      <transition v-if="activeTab === 0" name="scale-up">
        <StoryUploadNotesUI class="ui-item" />
      </transition>

      <transition v-if="activeTab === 1" name="scale-up">
        <StoryUploadPhotoUI class="ui-item" />
      </transition>

      <transition v-if="activeTab === 2" name="scale-up">
        <StoryUploadAudioUI class="ui-item" />
      </transition>
    </main>

    <footer>
      <nav>
        <p
          v-for="(tab, index) in tabs"
          :key="`${tab}-${index}`"
          v-ripple
          :class="activeTab === index && 'active-tab'"
          @click="activeTab = index"
        >
          {{ tab }}
        </p>
      </nav>
    </footer>
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'NewStory',
  middleware: 'isAuthenticated',

  asyncData({ from: prevURL }) {
    return { prevURL }
  },

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Add New Story',
      activeTab: 0,
      tabs: ['Write', 'Photo', 'Audio'],
      prevURL: undefined,
    }
  },

  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: -1,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })
  },

  methods: {
    setActiveTabTo(newTabNumber) {
      this.activeTab = newTabNumber
    },
    goBack() {
      this.prevURL
        ? this.$router.back()
        : this.$router.replace(navigationRoutes.Home.Community.index)
    },
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

$border-radius: 100px;
.add-new-story-page {
  header {
    i {
      position: fixed;
      height: 2 * $xx-large-unit;
      width: 2 * $xx-large-unit;
      display: grid;
      place-items: center;
      z-index: 2;
      top: 0;
      left: 0;
    }
  }

  main {
    .ui-item {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    place-items: center;

    nav {
      bottom: 0;
      width: 100%;
      background: rgba($segment-background, 0.8);
      box-shadow: $default-box-shadow;
      display: grid;
      place-items: center;
      grid-template-columns: repeat(3, 1fr);

      p {
        display: grid;
        place-items: center;
        width: 100%;
        height: 36px;
        text-align: center;

        &.active-tab {
          color: $vibrant;
          font-weight: 500;
          position: relative;
          &::after {
            content: '';
            position: absolute;
            height: 4px;
            width: 50%;
            background: $active-gradient;
            bottom: 0;
          }
        }
      }
    }
  }
}
</style>

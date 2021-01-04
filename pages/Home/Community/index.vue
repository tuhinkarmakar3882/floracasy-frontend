<template>
  <div class="community-page">
    <TopActionBar class="px-4 my-6" />

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
import TopActionBar from '~/components/global/Community/TopActionBar'

export default {
  name: 'Community',
  components: { TopActionBar, Story },
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

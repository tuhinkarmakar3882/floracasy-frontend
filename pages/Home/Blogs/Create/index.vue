<template>
  <div class="draft-blog-page">
    <h4 class="heading-title px-4">How do you want to start?</h4>

    <CustomListView>
      <template slot="list-items">
        <li
          v-for="(option, index) in options"
          :key="index"
          v-ripple="`${option.color}5F`"
          class="px-4 py-2"
          @click="$router.push(option.route)"
        >
          <p>
            <span
              class="icon"
              :class="option.icon"
              :style="{ color: option.color }"
            />
            <span class="option-name">{{ option.name }}</span>
            <span class="mdi mdi-chevron-right arrow-go" />
          </p>
        </li>
      </template>
    </CustomListView>
  </div>
</template>

<script>
import CustomListView from '@/components/Layout/CustomListView'
import { navigationRoutes } from '@/navigation/navigationRoutes'
export default {
  name: 'BlogCreation',
  components: { CustomListView },
  layout: 'MobileApp',
  middleware: 'isAuthenticated',
  data() {
    return {
      pageTitle: 'Blog Creation',
      options: [
        {
          name: 'Create New Blog',
          icon: 'mdi mdi-plus',
          color: '#4fca4f',
          route: navigationRoutes.Home.Blogs.Create.New,
        },
        {
          name: 'Start from Drafts',
          icon: 'mdi mdi-file',
          color: '#b377bd',
          route: navigationRoutes.Home.Blogs.Create.Drafts,
        },
      ],
    }
  },

  async mounted() {
    await this.$store.dispatch('BottomNavigation/update', {
      linkPosition: 2,
    })
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss">
@import 'assets/all-variables';

.create-blog-page {
  button {
    min-width: auto;
    height: auto;
    width: auto;
  }

  .ql-picker-label.ql-active {
    width: 110px;
  }

  .ql-toolbar.ql-snow {
    position: sticky;
    top: 0;
    //top: 2 * $x-large-unit;
    background-color: $editor-toolbar-background;
    z-index: 1;
    border: none;
    box-shadow: $down-only-box-shadow;
  }

  .test {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 1rem;

    @media only screen and (min-width: $medium) {
      grid-template-columns: 1fr 1fr;
    }

    blockquote,
    ul,
    ol {
      margin: $medium-unit 0 !important;
    }

    h1,
    h2,
    h3,
    h4 {
      position: relative;
      margin: $large-unit 0;

      &::after {
        content: '';
        border-radius: $standard-unit;
        position: absolute;
        bottom: -$micro-unit;
        left: 0;
        height: $nano-unit;
        width: clamp(100px, 20%, 250px);
        background-color: darken($secondary-matte, $lighten-percentage);
      }
    }
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 $medium-unit;
    height: 2 * $x-large-unit;
    background-color: $nav-bar-bg;
    box-shadow: $down-only-box-shadow;

    button {
      min-width: auto;
      height: $xxx-large-unit;
      width: 4 * $xx-large-unit;
    }
  }

  main {
    padding-top: $standard-unit;
  }
}
</style>

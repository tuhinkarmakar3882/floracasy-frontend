<template>
  <div class="draft-blog-page">
    <AppBarHeader sticky>
      <template #title>
        {{ pageTitle }}
      </template>
    </AppBarHeader>

    <FallBackLoader v-if="loadingContent" class="my-8">
      <template #fallback>
        <p class="text-center">Loading Your Drafts</p>
      </template>
    </FallBackLoader>

    <LoadingError
      v-else-if="loadingError"
      class="my-8 px-4"
      error-section="draft blogs"
      no-remedy-option
    />

    <transition v-else-if="emptyDraft" name="scale-up">
      <aside class="px-4 py-6 text-center">
        <p class="my-4">No Saved Blog Drafts Found</p>
        <nuxt-link :to="navigationRoutes.Home.Blogs.Create.AddBlog">
          <button v-ripple class="secondary-outlined-btn">Create Blog</button>
        </nuxt-link>
      </aside>
    </transition>

    <transition v-else name="scale-up">
      <main>
        <DraftItem
          v-for="draft in drafts"
          :key="draft.uniqueId"
          :draft="draft"
          class="mx-4 my-4"
        />
      </main>
    </transition>
  </div>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import AppBarHeader from '~/components/Layout/AppBarHeader'
import { openDB } from 'idb'
import LoadingError from '~/components/Common/Tools/LoadingError'
import FallBackLoader from '~/components/Common/Tools/FallBackLoader'
import DraftItem from '~/components/Common/Tools/DraftItem'

export default {
  name: 'Drafts',
  components: {
    DraftItem,
    FallBackLoader,
    LoadingError,
    AppBarHeader,
  },
  middleware: 'isAuthenticated',
  data() {
    return {
      emptyDraft: false,
      loadingContent: true,
      loadingError: false,
      pageTitle: 'Drafts',
      navigationRoutes,
      db: undefined,
      drafts: [],
    }
  },

  async mounted() {
    try {
      await this.createLocalDBIfNotExists()

      this.drafts = await this.db.getAllFromIndex('drafts', 'uniqueId')
      this.emptyDraft = !this.drafts.length
    } catch (e) {
      this.loadingError = true
    } finally {
      this.loadingContent = false
    }
  },

  methods: {
    async createLocalDBIfNotExists() {
      this.db = await openDB('Blogs', 1, {
        upgrade(db) {
          const store = db.createObjectStore('drafts', {
            keyPath: 'uniqueId',
          })
          // Create an index on the 'date' property of the objects.
          store.createIndex('uniqueId', 'uniqueId')
        },
      })
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

.draft-blog-page {
  main {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 100%;
    justify-content: center;
    align-items: center;

    article {
      &:nth-child(even) {
        box-shadow: $default-box-shadow;
      }
    }
  }

  button {
    min-width: auto;
  }

  aside,
  main {
    max-width: $large-screen;
    margin: auto;
  }
}
</style>

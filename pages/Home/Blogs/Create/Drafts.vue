<template>
  <div class="draft-blog-page">
    <AppBarHeader>
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

    <transition name="scale-up" v-else-if="emptyDraft">
      <aside class="px-4 py-6 text-center">
        <p class="my-4">No Saved Blog Drafts Found</p>
        <nuxt-link :to="navigationRoutes.Home.Blogs.Create.AddBlog">
          <button v-ripple class="secondary-outlined-btn">Create Blog</button>
        </nuxt-link>
      </aside>
    </transition>

    <transition name="scale-up" v-else>
      <main>
        <article
          v-for="draft in drafts"
          :key="draft.uniqueId"
          class="px-4 py-2"
        >
          <h5>{{ draft.title }}</h5>
          <p>{{ draft.subtitle }}</p>

          <button v-ripple class="secondary-outlined-btn my-4">
            Continue Editing
          </button>

          <button
            v-ripple
            class="danger-outlined-btn my-4"
            @click="deleteDraft(draft.uniqueId)"
          >
            Delete Draft
          </button>
        </article>
      </main>
    </transition>
  </div>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import AppBarHeader from '~/components/Layout/AppBarHeader'
import { openDB } from 'idb'

export default {
  name: 'Drafts',
  components: { AppBarHeader },
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

    async deleteDraft(uniqueId) {
      const tx = this.db.transaction('drafts', 'readwrite')
      await Promise.all([tx.store.delete(uniqueId), tx.done])
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
  article {
    &:nth-child(even) {
      background: $body-bg-alternate;
      box-shadow: $default-box-shadow;
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

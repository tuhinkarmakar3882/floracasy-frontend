<template>
  <div class="draft-blog-page">
    <AppBarHeader>
      <template #title>
        {{ pageTitle }}
      </template>
    </AppBarHeader>

    <main>
      <article v-for="draft in drafts" :key="draft.uniqueId" class="px-4 py-2">
        <h5>{{ draft.title }}</h5>
        <p>{{ draft.subtitle }}</p>

        <button v-ripple class="secondary-outlined-btn my-4">
          Continue Editing
        </button>
        <button v-ripple class="danger-outlined-btn my-4">Delete Draft</button>
      </article>
    </main>
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
      pageTitle: 'Drafts',
      navigationRoutes,
      db: undefined,
      drafts: [],
    }
  },

  async mounted() {
    await this.createLocalDBIfNotExists()

    this.drafts = await this.db.getAllFromIndex('drafts', 'uniqueId')
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
  article {
    &:nth-child(even) {
      background: $body-bg-alternate;
      box-shadow: $default-box-shadow;
    }
  }
}
</style>

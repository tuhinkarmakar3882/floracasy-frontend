<template>
  <transition name="scale-up">
    <article v-if="!hideDraft" class="draft-component">
      <header>
        <p>
          <i class="mdi mdi-clock" />
          <small>Edited {{ getRelativeTime(draft.uniqueId) }} ago</small>
        </p>
        <p>
          <i class="mdi mdi-shape" />
          <small> In {{ draft.category.name }}</small>
        </p>

        <i v-ripple class="mdi mdi-delete" @click="deleteDraft" />
      </header>

      <main v-ripple @click="continueEditing">
        <h5 class="mt-0">{{ draft.title }}</h5>
        <p>{{ draft.subtitle }}</p>
      </main>
    </article>
  </transition>
</template>

<script>
import { getRelativeTime, showUITip } from '~/utils/utility'
import { openDB } from 'idb'

export default {
  name: 'DraftItem',
  props: {
    draft: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      hideDraft: false,
      db: undefined,
    }
  },
  async mounted() {
    this.db = await openDB('Blogs', 1)
  },

  methods: {
    getRelativeTime,
    async deleteDraft() {
      const value = confirm('Are you sure?')
      if (!value) return

      this.hideDraft = true
      try {
        const tx = this.db.transaction('drafts', 'readwrite')
        await Promise.all([tx.store.delete(this.draft.uniqueId), tx.done])
        await showUITip(this.$store, 'Draft Deleted', 'success')
      } catch (e) {
        await showUITip(this.$store, 'Error while Deleting', 'error')
      }
    },

    async continueEditing() {
      await this.$router.push({
        name: 'Home-Blogs-Create-AddBlog',
        params: { draft: this.draft },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.draft-component {
  position: relative;
  background: $body-bg-alternate;
  display: flex;
  flex-direction: column;
  border-radius: $micro-unit;
  border-left: $nano-unit solid $primary;
  width: 100%;

  header {
    padding: $standard-unit $standard-unit 0;
  }

  i.mdi.mdi-delete {
    z-index: 1;
    color: $delete-icon-color;
    font-size: $large-unit;
    padding: 0;
    margin: 0;
    display: grid;
    place-items: center;
    height: 2 * $xx-large-unit;
    width: 2 * $xx-large-unit;
    background: $navigation-bar-color;
    border-radius: $micro-unit;
    position: absolute !important;
    top: 0;
    right: 0;
  }

  main {
    padding: $standard-unit $standard-unit $xxx-large-unit;
  }
}
</style>

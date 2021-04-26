<template>
  <transition name="slide-right">
    <article v-if="!hideDraft" class="draft-component px-4 py-2">
      <section>
        <h6>{{ draft.title }}</h6>
        <p>{{ draft.subtitle }}</p>
      </section>

      <aside>
        <button
          v-ripple
          class="secondary-outlined-btn my-4"
          @click="continueEditing"
        >
          Continue Editing
        </button>

        <button v-ripple class="danger-outlined-btn my-4" @click="deleteDraft">
          Delete Draft
        </button>
      </aside>
    </article>
  </transition>
</template>

<script>
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
    }
  },

  methods: {
    async deleteDraft() {
      this.hideDraft = true
      const tx = this.db.transaction('drafts', 'readwrite')
      await Promise.all([tx.store.delete(this.draft.uniqueId), tx.done])
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
.draft-component {
  display: flex;
}
</style>

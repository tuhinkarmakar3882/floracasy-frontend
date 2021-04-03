<template>
  <div class="story-board-notes-ui">
    <h6 class="px-2 text-center mb-0">Share your thoughts</h6>
    <hr class="reversed-faded-divider" />
    <small class="px-4 text-right pb-4 muted" style="display: block">
      {{ contentSize }} / 500
    </small>

    <section class="main px-2">
      <div
        id="text-body"
        :style="[
          customStyle && {
            background: customStyle.background,
            color: customStyle.color,
            display: 'grid',
            placeItems: 'center',
          },
        ]"
        class="px-4 py-4"
        contenteditable="true"
        @keyup="updateText"
      />
    </section>

    <section class="background-selection mt-4">
      <p class="mb-8 px-2">Try with a background</p>
      <div class="choices">
        <section
          v-ripple
          class="option mx-1 mdi mdi-cancel mdi-24px"
          style="background: transparent; display: grid; place-items: center"
          @click="customStyle = null"
        />
        <section
          v-for="(style, index) in customStyleOptions"
          :key="index"
          v-ripple
          :style="{ background: style.background }"
          class="option mx-1"
          @click="customStyle = style"
        />
      </div>
    </section>

    <button
      v-ripple
      :class="canSend ? 'primary-btn' : 'disabled-btn'"
      :disabled="!canSend || isSending"
      class="floating-action-button"
      @click="uploadTextStory"
    >
      <span class="mdi mdi-send mdi-24px" />
    </button>
  </div>
</template>

<script>
import endpoints from '~/api/endpoints'
import { LogAnalyticsEvent, showUITip } from '~/utils/utility'
import { navigationRoutes } from '~/navigation/navigationRoutes'

const commonStyles = {
  minHeight: '100px',
  borderRadius: '0',
  padding: '12px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'black',
}
export default {
  name: 'NotesUI',
  data() {
    return {
      customStyle: null,
      customStyleOptions: [
        {
          ...commonStyles,
          background: 'linear-gradient(to right, #D9A7C7, #FFFCDC)',
        },
        {
          ...commonStyles,
          background: 'linear-gradient(to right, #1C92D2, #F2FCF3)',
        },
        {
          ...commonStyles,
          background: 'linear-gradient(to right, #36D1DC, #5B86E5)',
        },
        {
          ...commonStyles,
          background: 'linear-gradient(to right, #3A1C71, #D76D77, #FFAF7B)',
          color: 'white',
        },
        {
          ...commonStyles,
          background: 'linear-gradient(to right, #007991, #78FFD6)',
        },
        {
          ...commonStyles,
          background: 'linear-gradient(to right, #C33764, #1D2671)',
          color: 'white',
        },
        {
          ...commonStyles,
          background: 'linear-gradient(to right, #4568DC, #B06AB3)',
          color: 'white',
        },
        {
          ...commonStyles,
          background: 'linear-gradient(to right, #E8CBC0, #636FA4)',
        },
        {
          ...commonStyles,
          background: 'linear-gradient(to right, #C0C0AA, #1CEFFF)',
        },
        {
          ...commonStyles,
          background: 'linear-gradient(to right, #3494E6, #EC6EAD)',
          color: 'white',
        },
        {
          ...commonStyles,
          background: 'linear-gradient(to right, #3C6A86, #89253E)',
          color: 'white',
        },
        {
          ...commonStyles,
          background: 'linear-gradient(to right, #BE93C5, #7BC6CC)',
        },
        {
          ...commonStyles,
          background: 'linear-gradient(to right, #2C3E50, #4CA1AF)',
          color: 'white',
        },
        {
          ...commonStyles,
          background: 'linear-gradient(to right, #E96443, #904E95)',
          color: 'white',
        },
        {
          ...commonStyles,
          background: 'linear-gradient(to right, #FF5F6D, #FFC371)',
        },
        {
          ...commonStyles,
          background: 'linear-gradient(to right, #BA5370, #F4E2D8)',
        },
      ],
      body: null,
      canSend: false,
      isSending: false,
      contentSize: 0,
    }
  },
  methods: {
    updateText() {
      this.body = document.getElementById('text-body').textContent
      const bodyLength = this.body?.trim().length
      this.canSend = bodyLength >= 5 && bodyLength < 501
      this.contentSize = bodyLength ?? 0
    },
    async uploadTextStory() {
      if (this.canSend) {
        this.isSending = true

        try {
          await this.$axios.$post(endpoints.community_service.stories.index, {
            storyType: 'text',
            body: this.body,
            style: this.customStyle,
          })

          await showUITip(this.$store, 'Story Posted!', 'success')
          LogAnalyticsEvent('upload_text_story')

          await this.$router.replace(navigationRoutes.Home.Community.index)
        } catch (e) {
          await showUITip(this.$store, 'Error Posting story', 'error')
        } finally {
          this.isSending = false
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.story-board-notes-ui {
  .background-selection {
    p {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        height: $single-unit;
        width: 36px;
        background: $primary-light;
        bottom: -8px;
        left: 8px;
      }
    }

    .choices {
      display: flex;
      overflow: auto;
      max-width: 100%;

      &::-webkit-scrollbar {
        display: none;
      }

      .option {
        border-radius: 12px;
        min-height: 2 * $x-large-unit;
        height: 2 * $x-large-unit;
        min-width: 2 * $x-large-unit;
        width: 2 * $x-large-unit;
      }
    }
  }

  #text-body {
    border: 1px solid #3a3a3a;
    border-radius: 0 $standard-unit;
    min-height: 200px;
    outline: 0 none;

    &:focus {
      border: 1px solid $secondary;
    }
  }
}
</style>

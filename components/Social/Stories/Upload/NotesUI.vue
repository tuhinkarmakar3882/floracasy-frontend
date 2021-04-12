<template>
  <div class="story-board-notes-ui">
    <header>
      <i v-ripple class="mdi mdi-format-color-text" @click="changeFont" />
      <i v-ripple class="mdi mdi-palette" @click="changeBackground" />
    </header>

    <main>
      <label for="text-box">{{ textData.length }} / 500</label>
      <textarea
        id="text-box"
        v-model="textData"
        :style="[customStyle, customFontFamily]"
        class="text-box"
        contenteditable="true"
        placeholder="Tap here to Type"
      />
    </main>

    <transition name="scale-down">
      <aside v-if="isSending" class="loader">
        <i class="mdi mdi-loading mdi-spin mdi-48px vibrant" />
      </aside>
    </transition>

    <footer>
      <button
        v-ripple
        :class="canSend ? 'primary-btn' : 'disabled-btn'"
        :disabled="!canSend || isSending"
        class="primary-btn"
        @click="uploadTextStory"
      >
        Send <i class="mdi mdi-send ml-2" />
      </button>
    </footer>
  </div>
</template>

<script>
import endpoints from '~/api/endpoints'
import { destroySetup, LogAnalyticsEvent, showUITip } from '~/utils/utility'
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'NotesUI',

  data() {
    return {
      customFontFamily: null,
      fonts: [
        { fontFamily: "'Raleway', sans-serif" },
        { fontFamily: "'Prata', serif" },
        { fontFamily: 'cursive' },
        {
          fontFamily:
            "'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'Roboto Mono', monospace",
        },
      ],
      currentPosForFonts: 0,

      customStyle: null,
      background: [
        {
          color: 'white',
          background: 'none',
        },
        {
          color: 'black',
          background: 'linear-gradient(to right, #D9A7C7, #FFFCDC)',
        },
        {
          color: 'black',
          background: 'linear-gradient(to right, #1C92D2, #F2FCF3)',
        },
        {
          color: 'black',
          background: 'linear-gradient(to right, #36D1DC, #5B86E5)',
        },
        {
          background: 'linear-gradient(to right, #3A1C71, #D76D77, #FFAF7B)',
          color: 'white',
        },
        {
          color: 'black',
          background: 'linear-gradient(to right, #007991, #78FFD6)',
        },
        {
          background: 'linear-gradient(to right, #C33764, #1D2671)',
          color: 'white',
        },
        {
          background: 'linear-gradient(to right, #4568DC, #B06AB3)',
          color: 'white',
        },
        {
          color: 'black',
          background: 'linear-gradient(to right, #E8CBC0, #636FA4)',
        },
        {
          color: 'black',
          background: 'linear-gradient(to right, #C0C0AA, #1CEFFF)',
        },
        {
          background: 'linear-gradient(to right, #3494E6, #EC6EAD)',
          color: 'white',
        },
        {
          background: 'linear-gradient(to right, #3C6A86, #89253E)',
          color: 'white',
        },
        {
          color: 'black',
          background: 'linear-gradient(to right, #BE93C5, #7BC6CC)',
        },
        {
          background: 'linear-gradient(to right, #2C3E50, #4CA1AF)',
          color: 'white',
        },
        {
          background: 'linear-gradient(to right, #E96443, #904E95)',
          color: 'white',
        },
        {
          color: 'black',
          background: 'linear-gradient(to right, #FF5F6D, #FFC371)',
        },
        {
          color: 'black',
          background: 'linear-gradient(to right, #BA5370, #F4E2D8)',
        },
      ],
      currentPosForBackground: 0,

      textData: '',
      isSending: false,
      contentSize: 0,
    }
  },

  computed: {
    canSend() {
      return this.textData.length >= 5 && this.textData.length < 501
    },
  },

  mounted() {
    this.customStyle = this.background[this.currentPosForBackground]
    this.customFontFamily = this.fonts[this.currentPosForFonts]
  },

  beforeDestroy() {
    window.streams && destroySetup(window.streams)
  },

  methods: {
    changeBackground() {
      this.currentPosForBackground++

      if (this.currentPosForBackground >= this.background.length)
        this.currentPosForBackground = 0

      this.customStyle = this.background[this.currentPosForBackground]
    },

    changeFont() {
      this.currentPosForFonts++

      if (this.currentPosForFonts >= this.fonts.length)
        this.currentPosForFonts = 0

      this.customFontFamily = this.fonts[this.currentPosForFonts]
    },

    async uploadTextStory() {
      if (this.canSend) {
        this.isSending = true

        await showUITip(
          this.$store,
          'Uploading Story, Please Wait',
          'info',
          false
        )

        try {
          await this.$axios.$post(endpoints.community_service.stories.index, {
            storyType: 'text',
            body: `${this.textData}`,
            style: this.customStyle,
            metaData: {
              fontFamily: this.customFontFamily,
            },
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
  position: relative;

  &::before {
    content: '';
    background: linear-gradient(to bottom, black -30%, transparent);
    position: absolute;
    width: 100%;
    height: 2 * $xx-large-unit;
    top: $zero-unit;
    left: $zero-unit;
    z-index: 1;
  }

  i {
    filter: drop-shadow($default-box-shadow);
  }

  button {
    min-width: auto;
  }

  header {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    top: $zero-unit;
    z-index: 1;

    i {
      height: 2 * $xx-large-unit;
      width: 2 * $xx-large-unit;
      display: grid;
      place-items: center;
      font-size: 24px;
    }
  }

  main {
    display: grid;
    place-items: center;
    height: 100vh;

    .text-box {
      color: white;
      padding: 64px 20px 64px;
      overflow: scroll;
      text-align: center;
      height: 100vh;
      width: 100%;
      outline: 0 none;
      display: flex;
      justify-content: center;
      align-items: center;
      background: $body-bg-alternate;
      line-height: 1.75;
      letter-spacing: 1px;
      border: none !important;
      resize: none;
    }

    label {
      position: fixed;
      background: rgba($navigation-bar-color, 0.7);
      box-shadow: $default-box-shadow;
      bottom: 2 * $xxx-large-unit;
      left: $zero-unit;
      display: flex;
      height: 2 * $large-unit;
      align-items: center;
      width: 5 * $large-unit;
      justify-content: center;
      border-top-right-radius: 50px;
      border-bottom-right-radius: 50px;
      font-family: $Nunito-Sans;
      color: white;
    }
  }

  footer {
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed !important;
      bottom: 2 * $xxx-large-unit;
      right: $zero-unit;
      height: 2 * $large-unit;
      width: 5 * $large-unit;
      border-radius: 50px 0 0 50px;
      box-shadow: $default-box-shadow;
    }
  }

  aside.loader {
    position: fixed;
    top: $zero-unit;
    left: $zero-unit;
    right: $zero-unit;
    bottom: $zero-unit;
    z-index: 1;
    background: rgba($black, 0.7);
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>

<template>
  <div class="add-new-post-page">
    <AppBarHeader>
      <template #title> {{ pageTitle }}</template>
      <template #action-button>
        <button
          v-ripple
          :class="
            hasText || hasImage || hasAudio
              ? 'vibrant-outlined-btn'
              : 'disabled-btn'
          "
          :disabled="!hasText && !hasImage && !hasAudio"
          style="min-width: auto"
          @click="createPost"
        >
          Post
        </button>
      </template>
    </AppBarHeader>
    <main>
      <FallBackLoader v-if="!isReady">
        <template #fallback>
          <p class="text-center">Loading...</p>
        </template>
      </FallBackLoader>

      <div v-else class="my-4">
        <section class="header mb-6 px-4">
          <img
            :src="user.photoURL"
            alt="profile-picture"
            height="52"
            width="52"
          />
          <section class="user-details ml-4">
            <p class="secondary">{{ user.displayName }}</p>
            <small v-if="user.designation">{{ user.designation }} </small>
          </section>
          <section class="ml-auto">
            <span :class="moodIcon" class="mdi vibrant mdi-36px" />
          </section>
        </section>

        <section class="-hidden-input-fields">
          <input
            v-show="false"
            ref="photoInput"
            accept="image/*"
            type="file"
            @change="compressImage"
          />
          <input
            v-show="false"
            ref="audioInput"
            accept="audio/ogg, audio/mp3, audio/aac"
            type="file"
            @change="loadAudioPreview"
          />
        </section>

        <section
          :class="useMoodOptions ? 'tri-actions' : 'dual-actions'"
          class="my-4"
        >
          <p v-ripple @click="openPhotoPicker">
            <span class="mdi mdi-image mdi-24px secondary mr-2" />
            Photos
          </p>
          <p v-ripple @click="openAudioPicker">
            <span class="mdi mdi-headphones mdi-24px secondary mr-2" />
            Audio
          </p>
          <p v-if="useMoodOptions" v-ripple>
            <span class="mdi mdi-emoticon mdi-24px secondary mr-2" />
            Mood
          </p>
        </section>

        <section class="main px-2">
          <div
            id="post-body"
            :style="[
              {
                minHeight: hasImage || hasAudio ? '50px' : '200px',
              },
              !hasImage &&
                !hasAudio &&
                customStyle && {
                  ...customStyle,
                  display: 'grid',
                  placeItems: 'center',
                  minHeight: '200px',
                },
            ]"
            class="px-4 py-4"
            contenteditable="true"
            @keyup="updateText"
          />

          <div class="preview">
            <transition name="scale-down">
              <section v-if="postImage.source">
                <img :src="postImage.source" alt="preview" class="my-4" />
                <aside
                  class="mdi mdi-close floating-close"
                  @click="clearPhotoPreview"
                />
              </section>
            </transition>

            <transition name="scale-down">
              <section v-if="postAudio.source">
                <AudioPlayer
                  :audio-source="postAudio.source"
                  class="my-6 px-4"
                />
                <aside
                  class="mdi mdi-close floating-close"
                  @click="clearAudioPreview"
                />
              </section>
            </transition>
          </div>
        </section>

        <transition name="scale-down">
          <section
            v-if="!hasImage && !hasAudio"
            class="background-selection mt-4"
          >
            <p class="mb-8 px-2">Try with a background</p>
            <div class="choices">
              <section
                v-ripple
                class="option mx-1 mdi mdi-cancel mdi-24px"
                style="
                  background: transparent;
                  display: grid;
                  place-items: center;
                "
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
        </transition>
      </div>
    </main>

    <footer>
      <transition name="scale-down">
        <aside v-if="isSending" class="loader">
          <i class="mdi mdi-loading mdi-spin mdi-48px vibrant" />
        </aside>
      </transition>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import imageCompression from 'browser-image-compression'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import endpoints from '~/api/endpoints'
import { LogAnalyticsEvent, showUITip } from '~/utils/utility'
import { useMoodOptions } from '~/environmentVariables'
import AppBarHeader from '~/components/Layout/AppBarHeader'
import FallBackLoader from '~/components/Common/Tools/FallBackLoader'

const commonStyles = {
  minHeight: '100px',
  borderRadius: '0 12px',
  padding: '12px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'black',
}

export default {
  name: 'AddPost',
  components: { FallBackLoader, AppBarHeader },
  middleware: 'isAuthenticated',

  asyncData({ from: prevURL }) {
    return { prevURL }
  },

  data() {
    return {
      useMoodOptions,
      prevURL: undefined,
      navigationRoutes,
      pageTitle: 'Add New Post',
      isReady: false,
      validPost: false,
      isSending: false,

      postBody: '',
      postImage: {
        source: null,
        output: null,
      },
      postAudio: {
        source: null,
        output: null,
      },
      moodIcon: null,
      customStyle: null,

      moodIconOptions: ['mdi-party-popper', 'mdi-emoticon-cool'],
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

      hasText: false,
      hasImage: false,
      hasAudio: false,
    }
  },

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  watch: {
    postBody(newContent, _) {
      this.hasText = newContent.trim().length > 9
    },
  },

  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: -1,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })

    this.isReady = true
  },

  methods: {
    async generatePayload() {
      const payload = {
        body: this.postBody,
        style: this.customStyle,
        mood: this.moodIcon,
      }

      if (this.postImage.source) {
        await showUITip(this.$store, 'Uploading Image')
        const data = new FormData()
        data.append('image', this.postImage.output, this.postImage.output?.name)

        payload.imageID = await this.$axios
          .$post(endpoints.upload_handler_system.upload_image, data)
          .then((response) => response.identifier)
          .catch(async () => {
            await showUITip(this.$store, 'Image Upload Failed', 'error')
          })
      }

      if (this.postAudio.source) {
        await showUITip(this.$store, 'Uploading Audio')
        const data = new FormData()
        data.append('audio', this.postAudio.output, this.postAudio.output?.name)

        payload.audioID = await this.$axios
          .$post(endpoints.upload_handler_system.upload_audio, data)
          .then((response) => response.identifier)
          .catch(async () => {
            await showUITip(this.$store, 'Audio Upload Failed', 'error')
          })
      }
      return payload
    },

    async createPost() {
      this.isSending = true
      const payload = await this.generatePayload()
      try {
        await this.$axios.$post(
          endpoints.community_service.posts.index,
          payload
        )
        LogAnalyticsEvent('create_post')
        await this.$router.replace(navigationRoutes.Home.Community.index)
        await showUITip(this.$store, 'Post Added!', 'success')
      } catch (e) {
        await showUITip(this.$store, 'Something Went Wrong', 'error')
      } finally {
        this.isSending = false
      }
    },

    updateText() {
      this.postBody = document.getElementById('post-body').textContent
    },
    loadAudioPreview(event) {
      this.hasAudio = false
      const file = event.target.files[0]

      this.postAudio.output = file
      this.postAudio.source = URL.createObjectURL(file)
      this.hasAudio = true
    },

    async compressImage(event) {
      this.hasImage = false
      const file = event.target.files[0]
      const useWebWorker = true

      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1600,
        useWebWorker,
        // onProgress: this.updateImageCompressProgress,
      }
      this.postImage.output = await imageCompression(file, options)
      this.postImage.source = URL.createObjectURL(file)
      this.hasImage = true
    },

    openPhotoPicker() {
      this.$refs.photoInput.click()
    },
    clearPhotoPreview() {
      this.postImage.source = null
      this.$refs.photoInput.value = null
      this.hasImage = false
    },

    openAudioPicker() {
      this.$refs.audioInput.click()
    },
    clearAudioPreview() {
      this.postAudio.source = null
      this.$refs.audioInput.value = null
      this.hasAudio = false
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

.add-new-post-page {
  * {
    transition: all 300ms ease-in-out;
  }

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

  .tri-actions {
    grid-template-columns: repeat(3, 1fr);
  }

  .dual-actions {
    grid-template-columns: repeat(2, 1fr);
  }

  .tri-actions,
  .dual-actions {
    display: grid;

    p {
      display: flex;
      justify-content: center;
      align-items: center;
      color: $muted;

      &:nth-child(2) {
        border-left: 1px solid $card-bg;
        border-right: 1px solid $card-bg;
      }
    }
  }

  .header {
    display: flex;
    align-items: center;

    $size: 52px;

    img {
      width: $size;
      min-width: $size;
      height: $size;
      min-height: $size;
      border-radius: 50%;
      box-shadow: $default-box-shadow;
      object-fit: cover;
    }

    button {
      min-width: auto;
      font-size: 14px;
      width: 117px;
      height: 32px;
      margin-left: auto;
    }

    .user-details {
      p {
        font-size: 1.2rem;
        font-weight: 400;
      }

      small {
        font-size: 13px;
        font-family: $Nunito-Sans;
        font-weight: 300;
        font-style: italic;
        line-height: 16px;
      }
    }
  }

  .main {
    .preview {
      section {
        position: relative;

        img {
          min-height: 250px;
          height: 250px;
          width: 100%;
          min-width: 100%;
          object-fit: contain;
          border-radius: 0 $standard-unit;
        }

        aside.floating-close {
          position: absolute;
          top: 0;
          right: 0;
          height: 48px;
          width: 48px;
          background: #654646;
          display: grid;
          border-radius: 50%;
          place-items: center;
          font-size: 24px;
        }
      }
    }
  }

  #post-body {
    border: 1px solid #3a3a3a;
    border-radius: 0 $standard-unit;
    min-height: 200px;
    outline: 0 none;

    &:focus {
      border: 1px solid $secondary;
    }
  }

  aside.loader {
    position: fixed;
    top: $zero-unit;
    left: $zero-unit;
    right: $zero-unit;
    bottom: $zero-unit;
    z-index: $bring-to-front;
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

<template>
  <AppFeel
    :on-back="navigationRoutes.Home.Community.index"
    :prev-url-path="prevURL"
    class="add-new-story-page"
    dynamic-back
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <nav class="tab-bar">
        <p
          v-for="(tab, index) in tabs"
          :key="index"
          v-ripple
          :class="index === activeTab ? 'active-tab' : ''"
          @click="setActiveTabTo(index)"
        >
          {{ tab }}
        </p>
      </nav>
      <div ref="tabNavigation" />

      <section v-if="activeTab === 0" class="writing-container">
        <h6 class="px-2 text-center mb-0">Share your thoughts</h6>
        <hr class="reversed-faded-divider" />
        <small class="px-4 text-right pb-4 muted" style="display: block">
          {{ text.contentSize }} / 500
        </small>

        <section class="main px-2">
          <div
            id="text-body"
            :style="[
              text.customStyle && {
                background: text.customStyle.background,
                color: text.customStyle.color,
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
              style="
                background: transparent;
                display: grid;
                place-items: center;
              "
              @click="text.customStyle = null"
            />
            <section
              v-for="(style, index) in text.customStyleOptions"
              :key="index"
              v-ripple
              :style="{ background: style.background }"
              class="option mx-1"
              @click="text.customStyle = style"
            />
          </div>
        </section>

        <button
          v-ripple
          :class="text.canSend ? 'primary-btn' : 'disabled-btn'"
          :disabled="!text.canSend || text.isSending"
          class="floating-action-button"
          @click="uploadTextStory"
        >
          <span class="mdi mdi-send mdi-24px" />
        </button>
      </section>

      <section v-if="activeTab === 1" class="camera-recording-container">
        <!--  Progress Bar  -->
        <div
          v-show="photo.showProgress"
          :style="{
            width: photo.compressionProgress
              ? `${photo.compressionProgress}%`
              : 0,
          }"
          class="compression-progress-bar"
        />

        <!--  Overlay controls  -->
        <transition name="gray-shift">
          <section v-show="photo.isPhotoTaken" class="overlay">
            <button
              v-ripple
              class="danger-outlined-btn mx-4"
              @click="recapture"
            >
              <span class="mdi mdi-reload mdi-36px" />
            </button>
            <button
              v-ripple
              class="vibrant-outlined-btn mx-4"
              @click="uploadPhotoStory"
            >
              <span class="mdi mdi-send mdi-36px" />
            </button>
          </section>
        </transition>

        <LoadingIcon v-show="photo.isLoading" class="text-center my-6" />

        <canvas ref="canvasPreview" style="display: none" />

        <!--  Video  -->
        <transition name="slide-left">
          <video
            v-show="!photo.isLoading && !photo.isPhotoTaken"
            ref="videoPreview"
            autoplay
          />
        </transition>

        <!--  Preview Image  -->
        <transition name="slide-up">
          <div class="preview-img-container">
            <img
              v-show="photo.isPhotoTaken"
              :src="photo.source"
              alt="image-preview"
            />
          </div>
        </transition>

        <div class="controls">
          <transition name="slide-up">
            <section v-show="photo.showMoreOptions" class="more-options">
              <div class="px-4 photo-options">
                <label for="current-camera-device-select">
                  Currently Using
                </label>
                <select
                  id="current-camera-device-select"
                  v-model="photo.currentDevice"
                  autocomplete="off"
                  class="my-4 dropdown"
                >
                  <option
                    v-for="(option, index) in photo.availableDevices"
                    :key="`${option}-${index}`"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>

                <label for="aspect-ratio-select">Aspect Ratio</label>
                <select
                  id="aspect-ratio-select"
                  v-model="photo.aspectRatio"
                  autocomplete="off"
                  class="my-4 dropdown"
                  @change="updatePhotoRatio"
                >
                  <option
                    v-for="(option, index) in photo.availableRatios"
                    :key="`${option}-${index}`"
                    :value="option"
                  >
                    {{ option.name }}
                  </option>
                </select>
              </div>
            </section>
          </transition>

          <section class="actions">
            <input
              v-show="false"
              ref="imageUpload"
              accept="image/jpeg, image/png"
              type="file"
              @change="preprocessUploadedImage"
            />
            <!--  Gallery Button  -->
            <button
              v-ripple
              class="muted-outlined-btn"
              @click="$refs.imageUpload.click()"
            >
              <i class="mdi mdi-image-multiple mdi-36px" />
            </button>

            <button
              v-if="photo.isPhotoTaken"
              v-ripple
              class="disabled-outlined-btn mx-4"
            >
              <span class="mdi mdi-check mdi-36px" />
            </button>

            <button
              v-else
              v-ripple
              class="vibrant-outlined-btn"
              @click="takePhoto"
            >
              <i class="mdi mdi-camera mdi-36px" />
            </button>

            <button
              v-ripple
              class="muted-outlined-btn"
              @click="photo.showMoreOptions = !photo.showMoreOptions"
            >
              <i class="mdi mdi-dots-horizontal mdi-36px" />
            </button>
          </section>
        </div>
      </section>

      <section v-if="activeTab === 2" class="audio-recording-container">
        <div class="text-center pt-8 mt-8">
          <small class="timer">
            {{ audio.audioRecordingDuration }} seconds
          </small>

          <section class="display-icon pt-8 mt-8">
            <i v-ripple class="mdi mdi-microphone mdi-48px headphone-icon" />
            <p>Audio Story</p>
          </section>

          <transition name="slide-up">
            <AudioPlayer
              v-if="audio.source"
              class="my-6 px-4"
              controls
              style="width: 100%"
              :audio-source="audio.source"
            />
          </transition>

          <section class="audio-controls">
            <button
              v-if="!audio.recordingStarted"
              v-ripple
              class="primary-outlined-btn mx-4"
              @click="startRecording"
            >
              <span class="mdi mdi-microphone mdi-36px" />
            </button>

            <button
              v-else
              v-ripple
              class="danger-outlined-btn mx-4"
              @click="stopRecording"
            >
              <span class="mdi mdi-check mdi-36px" />
            </button>

            <button
              v-if="audio.recordingDone"
              v-ripple
              class="vibrant-outlined-btn mx-4"
              @click="uploadAudioStory"
            >
              <span class="mdi mdi-send mdi-36px" />
            </button>
          </section>
        </div>
      </section>
    </template>
  </AppFeel>
</template>

<script>
import imageCompression from 'browser-image-compression'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import AppFeel from '~/components/global/Layout/AppFeel'
import LoadingIcon from '~/components/global/LoadingIcon'
import endpoints from '~/api/endpoints'
import { LogAnalyticsEvent, showUITip } from '~/utils/utility'

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
  name: 'AddStory',
  components: { LoadingIcon, AppFeel },
  middleware: 'isAuthenticated',

  asyncData({ from: prevURL }) {
    return { prevURL }
  },

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Add New Story',
      activeTab: 0,
      tabs: ['Write', 'Photo', 'Audio'],

      text: {
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
      },

      photo: {
        imageSize: {
          height: 720,
          width: 1280,
        },
        // isCameraOpen: false,
        // isShotPhoto: false,
        isPhotoTaken: false,
        isLoading: false,
        link: '#',
        stream: null,
        source: null,
        mediaRecorder: null,
        availableRatios: [
          {
            name: 'Wide (16:9)',
            height: 720,
            width: 1280,
            ratio: 1.778,
          },
          {
            name: 'Square (1:1)',
            height: 720,
            width: 720,
            ratio: 1,
          },
          {
            name: 'Portrait (4:3)',
            height: 1280,
            width: 538,
            ratio: 1.33,
          },
        ],
        aspectRatio: null,
        availableDevices: [
          {
            label: 'nope',
          },
        ],
        currentDevice: null,
        showMoreOptions: false,
        output: null,
        showProgress: false,
        compressionProgress: null,
      },

      audio: {
        audioRecordingInterval: null,
        audioRecordingDuration: 100,
        recordingStarted: false,
        recordingDone: false,
        stream: null,
        source: null,
        mediaRecorder: null,
        audioClip: [],
        availableDevices: [],
      },
    }
  },

  watch: {
    activeTab(newValue, _) {
      switch (newValue) {
        case 0:
          this.audio.stream && this.destroySetup(this.audio.stream)
          this.photo.stream && this.destroySetup(this.photo.stream)
          break

        case 1:
          this.prepareCameraRecordingInitialSetup()
          this.audio.stream && this.destroySetup(this.audio.stream)
          break

        case 2:
          this.prepareAudioRecordingInitialSetup()
          this.photo.stream && this.destroySetup(this.photo.stream)
          break
      }
    },
  },

  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: -1,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })

    if (!window.MediaRecorder) {
      const AudioRecorder = require('audio-recorder-polyfill')
      AudioRecorder.encoder = require('audio-recorder-polyfill/mpeg-encoder')
      AudioRecorder.prototype.mimeType = 'audio/mpeg'
      window.MediaRecorder = AudioRecorder
      await showUITip(
        this.$store,
        'Polyfill for Apple Devices are Ready',
        'info',
        true
      )
    }

    this.audio.stream && this.destroySetup(this.audio.stream)
    this.photo.stream && this.destroySetup(this.photo.stream)

    const availableDevices = await navigator.mediaDevices.enumerateDevices()

    this.photo.availableDevices = availableDevices
      .filter((device) => device.kind === 'videoinput')
      .map((item) => item.label.split('(')[0])

    this.audio.availableDevices = availableDevices
      .filter((device) => device.kind === 'audioinput')
      .map((item) => item.label.split('(')[0])

    this.photo.currentDevice = this.photo.availableDevices[0]
    this.photo.aspectRatio = this.photo.availableRatios[0]
  },

  beforeDestroy() {
    this.audio.stream && this.destroySetup(this.audio.stream)
    this.photo.stream && this.destroySetup(this.photo.stream)
  },

  methods: {
    //  --------------------- Generic Methods ---------------------
    setActiveTabTo(newTabNumber) {
      this.activeTab = newTabNumber
      this.$nextTick(() => {
        this.$refs.tabNavigation.scrollTop = 0
      })
    },
    async prepareCameraRecordingInitialSetup(constraint) {
      this.photo.isLoading = true

      const constraints = constraint ?? {
        video: {
          width: {
            min: 1280,
            ideal: 1920,
            max: 2560,
          },
          height: {
            min: 720,
            ideal: 1080,
            max: 1440,
          },
        },
      }

      this.photo.stream = await navigator.mediaDevices.getUserMedia(constraints)
      this.photo.mediaRecorder = new MediaRecorder(this.photo.stream)
      this.photo.mediaRecorder.ondataavailable = this.handleDataAvailable
      this.$refs.videoPreview.srcObject = this.photo.stream
      this.photo.isLoading = false
    },
    async prepareAudioRecordingInitialSetup() {
      const constraints = {
        audio: true,
      }
      this.audio.stream = await navigator.mediaDevices.getUserMedia(constraints)
      this.audio.mediaRecorder = new MediaRecorder(this.audio.stream)
      this.audio.mediaRecorder.ondataavailable = this.handleDataAvailable
    },
    destroySetup(stream) {
      const tracks = stream.getTracks()
      tracks.forEach(function (track) {
        track.stop()
      })
    },

    //  --------------------- Text Methods ---------------------
    updateText() {
      this.text.body = document.getElementById('text-body').textContent
      const bodyLength = this.text.body?.trim().length
      this.text.canSend = bodyLength >= 5 && bodyLength < 501
      this.text.contentSize = bodyLength ?? 0
    },
    async uploadTextStory() {
      if (this.text.canSend) {
        this.text.isSending = true

        try {
          await this.$axios.$post(endpoints.community_service.stories.index, {
            storyType: 'text',
            body: this.text.body,
            style: this.text.customStyle,
          })

          await showUITip(this.$store, 'Story Posted!', 'success')
          LogAnalyticsEvent('upload_text_story')

          await this.$router.replace(navigationRoutes.Home.Community.index)
        } catch (e) {
          await showUITip(this.$store, 'Error Posting story', 'error')
        } finally {
          this.text.isSending = false
        }
      }
    },

    // --------------------- Photo Methods ---------------------
    updatePhotoRatio() {
      if (this.photo.aspectRatio) {
        this.photo.stream && this.destroySetup(this.photo.stream)
        this.prepareCameraRecordingInitialSetup({
          video: {
            aspectRatio: { ideal: this.photo.aspectRatio.ratio },
            // width: { max: this.photo.aspectRatio.width },
            // height: { ideal: this.photo.aspectRatio.height },
          },
        })
      }
    },
    async takePhoto() {
      this.photo.isPhotoTaken = false
      await showUITip(this.$store, 'Say Cheese!')

      const canvas = this.$refs.canvasPreview
      const video = this.$refs.videoPreview
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      canvas.getContext('2d').drawImage(video, 0, 0)

      await showUITip(this.$store, 'Optimizing Image For Faster Upload Speeds')

      canvas.toBlob(this.compressImage, 'image/webp', 0.7)
    },
    async compressImage(imageFile, msg) {
      const useWebWorker = true
      this.photo.showProgress = true
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 1280,
        useWebWorker,
        onProgress: this.updateProgressBar,
      }
      this.photo.output = await imageCompression(imageFile, options)

      this.photo.source = URL.createObjectURL(imageFile)

      this.photo.isPhotoTaken = true
      this.photo.compressionProgress = null
      this.photo.showProgress = false

      await showUITip(this.$store, msg || 'Photo Captured!', 'success')
    },

    async preprocessUploadedImage(event) {
      const file = event.target.files[0]
      await showUITip(this.$store, 'Optimizing Image For Faster Upload Speeds')
      await this.compressImage(file)
    },

    updateProgressBar(compressProgress) {
      this.photo.compressionProgress = compressProgress
    },
    async uploadPhotoStory() {
      await showUITip(
        this.$store,
        'Uploading Story, Please Wait',
        'info',
        false
      )
      try {
        const data = new FormData()
        data.append('image', this.photo.output, this.photo.output.name)

        const imageID = await this.$axios
          .$post(endpoints.upload_handler_system.upload_image, data)
          .then((response) => response.identifier)

        await this.$axios.$post(endpoints.community_service.stories.index, {
          storyType: 'photo',
          imageID,
        })

        LogAnalyticsEvent('upload_photo_story')
        await showUITip(this.$store, 'Story Posted!', 'success')

        await this.$router.replace(navigationRoutes.Home.Community.index)
      } catch (e) {
        await showUITip(this.$store, 'Error Posting story', 'error')
      }
    },
    recapture() {
      this.photo.isPhotoTaken = false
      this.photo.output = undefined
    },

    // --------------------- Audio Methods ---------------------
    startRecording() {
      this.audio.audioClip = []
      this.audio.source = null
      this.audio.mediaRecorder.start()
      this.audio.recordingStarted = true
      this.audio.recordingDone = false
      this.startTimer()
    },
    startTimer() {
      this.audio.audioRecordingInterval = setInterval(() => {
        this.audio.audioRecordingDuration <= 0
          ? this.stopRecording()
          : this.audio.audioRecordingDuration--
      }, 1000)
    },
    handleDataAvailable(event) {
      if (event.data.size > 0) {
        this.audio.audioClip = event.data

        this.audio.source = URL.createObjectURL(event.data)
      }
    },
    stopRecording() {
      clearInterval(this.audio.audioRecordingInterval)
      this.audio.mediaRecorder.stop()
      this.audio.audioRecordingDuration = 100
      this.audio.recordingStarted = false
      this.audio.recordingDone = true
    },
    async uploadAudioStory() {
      await showUITip(
        this.$store,
        'Uploading Story, Please Wait',
        'info',
        false
      )
      const data = new FormData()
      data.append('audio', this.audio.audioClip, this.audio.audioClip?.name)
      try {
        const audioID = await this.$axios
          .$post(endpoints.upload_handler_system.upload_audio, data)
          .then((response) => response.identifier)
        await this.$axios.$post(endpoints.community_service.stories.index, {
          storyType: 'audio',
          audioID,
        })

        await showUITip(this.$store, 'Story Posted!', 'success')
        LogAnalyticsEvent('upload_audio_story')

        await this.$router.replace(navigationRoutes.Home.Community.index)
      } catch (e) {
        await showUITip(this.$store, 'Error Posting story', 'error')
      }
    },
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

.add-new-story-page {
  .tab-bar {
    display: grid;
    text-align: center;
    grid-template-columns: repeat(3, 1fr);
    position: sticky;
    top: (2 * $x-large-unit) - $double-unit;
    background-color: $nav-bar-bg;
    box-shadow: $down-only-box-shadow;
    z-index: 1;
    transition: all 0.3s ease-in-out;

    * {
      padding: 0.7rem 0;
      font-size: 1rem;
      font-weight: 300;
    }

    .active-tab {
      color: $white;
      font-weight: 400;
      background: $active-gradient;
      transition: all 0.1s ease-in-out;
    }
  }

  .writing-container {
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

  .audio-recording-container {
    .timer {
      padding: 8px 24px;
      border: 1px solid $vibrant;
      border-radius: 2 * $x-large-unit;
      color: $vibrant;
    }

    .headphone-icon {
      display: block;
      position: relative;
    }

    .audio-controls {
      display: flex;
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      justify-content: center;
      align-items: center;
      padding: 20px 0;
    }

    button {
      display: grid;
      place-items: center;
      padding: 0;
      height: 64px;
      width: 64px;
    }
  }

  .camera-recording-container {
    position: relative;

    button {
      padding: 0;
      width: 2 * $xx-large-unit;
      height: 2 * $xx-large-unit;
      text-align: center;
      border-radius: 100%;
    }

    .compression-progress-bar {
      height: $nano-unit;
      background: $active-gradient;
      position: absolute;
      z-index: 1;
      left: 0;
      top: 0;
      transition: all 150ms ease-in-out;
      border-radius: 0 0 16px 16px;
      box-shadow: $down-only-box-shadow;
    }

    .overlay {
      width: 100%;
      height: calc(100vh - 114px);
      position: fixed;
      top: 108px;
      z-index: 2;
      background: rgba(0, 0, 0, 0.6);
      display: grid;
      grid-auto-flow: column;
      place-items: center;
    }

    video,
    .preview-img-container {
      width: 100%;
      background: $card-background;
      object-fit: contain;
      transform: scaleX(-1);
      height: calc(100vh - 114px);
    }

    .preview-img-container {
      display: grid;
      place-items: center;
      transform: unset;

      img {
        max-height: calc(100vh - 114px);
        border-radius: $nano-unit;
        box-shadow: $default-box-shadow;
        background: white;
      }
    }

    .controls {
      width: 100%;
      position: fixed;
      bottom: 0;
      padding: 20px 0;
      border-top-left-radius: 36px;
      border-top-right-radius: 36px;
      background: rgba(black, 0.6);

      .photo-options {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: $standard-unit;
        align-items: center;
      }

      .actions {
        display: grid;
        grid-column-gap: 16px;
        grid-auto-flow: column;
        place-items: center;
      }
    }
  }
}
</style>

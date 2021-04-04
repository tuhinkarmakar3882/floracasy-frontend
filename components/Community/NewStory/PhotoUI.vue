<template>
  <div class="story-board-photo-ui">
    <header v-if="systemReady">
      <i
        v-ripple
        :class="mirror && 'vibrant'"
        class="mdi mdi-24px mdi-flip-horizontal"
        @click="mirror = !mirror"
      />

      <i
        v-ripple
        :class="fullScreen ? 'vibrant mdi-fullscreen-exit' : 'mdi-fullscreen'"
        class="mdi mdi-24px"
        @click="fullScreen = !fullScreen"
      />

      <div v-ripple @click="showFilters = !showFilters">
        <EffectsIcon :active="showFilters" class="effects-toggle-button" />
      </div>
    </header>

    <main class="heads-up-display">
      <FallBackLoader v-if="isLoading" class="my-8">
        <template v-slot:fallback>
          <p class="text-center">Connecting to Camera</p>
        </template>
      </FallBackLoader>

      <LoadingError
        v-else-if="loadingError"
        class="py-8 px-4"
        error-section="Camera"
      >
        <template v-slot:remedy-option>
          <li>Make sure camera is connected</li>
          <li>Make sure that you have enabled access to camera</li>
        </template>
      </LoadingError>

      <transition name="scale-down">
        <ProgressRing
          v-if="showProgress"
          :percentage="compressionProgress || 0"
          class="overlay-progress"
        />
      </transition>

      <section v-show="systemReady">
        <aside class="loader soft-error" v-if="softError">
          <p class="px-4">
            Can't connect to Camera. Make sure camera Permission is available Or
            Try Swapping Camera
          </p>
        </aside>

        <img
          v-show="isPhotoTaken"
          :src="source"
          :style="[
            { filter: currentFilter.filter },
            !fullScreen && { height: 'auto' },
            mirror && { transform: 'scaleX(-1)' },
          ]"
          alt="image-preview"
        />

        <video
          v-show="!isPhotoTaken"
          ref="videoPreview"
          :style="[
            {
              filter: currentFilter.filter,
            },
            !fullScreen && { height: 'auto' },
            mirror && { transform: 'scaleX(-1)' },
          ]"
          autoplay
        />
      </section>
    </main>

    <aside v-show="false">
      <canvas ref="canvasPreview" />
    </aside>

    <footer v-if="systemReady" :style="showFilters && { bottom: '164px' }">
      <transition v-if="isPhotoTaken" name="slide-left">
        <section class="actions preview-steps">
          <button v-ripple class="disabled-btn mx-4" @click="recapture">
            <i class="mdi mdi-refresh mdi-24px mr-2 vibrant" />
            <span class="white">Retake</span>
          </button>

          <button v-ripple class="vibrant-btn mx-4" @click="uploadPhotoStory">
            <span>Send</span>
            <i class="mdi mdi-send mdi-24px ml-2" />
          </button>
        </section>
      </transition>

      <transition v-else name="slide-left">
        <section class="actions">
          <!--  Gallery Button  -->
          <button
            v-ripple
            class="white-outlined-btn"
            @click="$refs.imageUpload.click()"
          >
            <i class="mdi mdi-image-multiple mdi-24px" />
          </button>

          <button
            v-ripple
            class="vibrant-outlined-btn shutter"
            @click="takePhoto"
          >
            <i class="mdi mdi-camera-iris mdi-36px" />
          </button>

          <button
            v-ripple
            :class="
              this.availableDevices.length > 1
                ? 'white-outlined-btn'
                : 'disabled-btn'
            "
            :disabled="this.availableDevices.length <= 1"
            @click="swapCamera"
          >
            <CameraFlipIcon
              class="camera-flip-icon"
              :class="this.availableDevices.length <= 1 && 'disabled'"
            />
          </button>
        </section>
      </transition>

      <input
        v-show="false"
        ref="imageUpload"
        accept="image/jpeg, image/png"
        type="file"
        @input="preprocessUploadedImage"
      />

      <section :style="showFilters && { height: ' 328px' }" class="backdrop" />
    </footer>

    <transition name="slide-up">
      <aside v-if="showFilters && systemReady" class="effects">
        <section
          v-for="(option, index) in availableFilters"
          :key="`Filter-${index}`"
          v-ripple
          :class="currentFilter === option && 'selected'"
          @click="updateCurrentFilter(option)"
        >
          <img
            :style="{ filter: option.filter }"
            alt="Sample Image"
            class="demo-image"
            height="56"
            src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80"
            width="56"
          />
          <p class="mt-2">{{ option.name }}</p>
        </section>
      </aside>
    </transition>

    <transition name="scale-down">
      <aside v-if="sending" class="loader">
        <i class="mdi mdi-loading mdi-spin mdi-48px vibrant" />
      </aside>
    </transition>
  </div>
</template>

<script>
import { destroySetup, LogAnalyticsEvent, showUITip } from '~/utils/utility'
import imageCompression from 'browser-image-compression'
import endpoints from '~/api/endpoints'
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'PhotoUI',

  data() {
    return {
      imageSize: {
        height: 720,
        width: 1280,
      },
      fullScreen: true,
      mirror: true,
      isPhotoTaken: false,
      loadingError: false,
      softError: false,
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
      availableFilters: [
        {
          name: 'None',
          filter: 'none',
        },
        {
          name: 'Brannes',
          filter: 'sepia(0.5) contrast(1.4)',
        },
        {
          name: 'InkWell',
          filter: 'sepia(0.3) contrast(1.1) brightness(1.1) grayscale(1)',
        },
        {
          name: 'Lo-Fi',
          filter: 'saturate(1.1) contrast(1.5)',
        },
        {
          name: 'Moon',
          filter: 'grayscale(1) contrast(1.1) brightness(1.1)',
        },
        {
          name: 'NashVille',
          filter: 'sepia(0.2) contrast(1.2) brightness(1.05) saturate(1.2)',
        },
        {
          name: 'Toaster',
          filter: 'contrast(1.5) brightness(0.9)',
        },
        {
          name: 'Walden',
          filter: 'brightness(1.1) hue-rotate(-10deg) sepia(0.3) saturate(1.6)',
        },
        {
          name: 'Willow',
          filter: 'grayscale(0.5) contrast(0.95) brightness(0.9)',
        },
        {
          name: 'X-Pro II',
          filter: 'sepia(0.3)',
        },
        {
          name: 'One Shot',
          filter: 'grayscale(1) contrast(1.15) brightness(1.3)',
        },
      ],
      currentFilter: {
        name: 'None',
        filter: 'none',
      },
      showFilters: false,
      sending: false,
      currentCameraIndex: 0,
    }
  },

  computed: {
    systemReady() {
      return !this.isLoading && !this.loadingError
    },
  },

  async mounted() {
    const availableDevices = await navigator.mediaDevices.enumerateDevices()

    this.availableDevices = availableDevices.filter(
      (device) => device.kind === 'videoinput'
    )

    this.currentDevice = this.availableDevices[this.currentCameraIndex]

    try {
      await this.prepareCameraRecordingInitialSetup()
    } catch (e) {
      this.loadingError = true
    } finally {
      this.isLoading = false
    }
  },

  beforeDestroy() {
    this.stream && destroySetup(this.stream)
    window.streams && destroySetup(window.streams, true)
  },

  methods: {
    async prepareCameraRecordingInitialSetup() {
      this.isLoading = true
      this.loadingError = false
      this.softError = false

      const constraints = {
        video: {
          width: {
            ideal: 1920,
            max: 2560,
          },
          height: {
            ideal: 1080,
            max: 1440,
          },
          deviceId: this.currentDevice.deviceId,
        },
      }
      try {
        this.stream = await navigator.mediaDevices.getUserMedia(constraints)

        window.streams.push(this.stream)

        this.mediaRecorder = new MediaRecorder(this.stream)
        this.mediaRecorder.ondataavailable = this.handleDataAvailable

        this.isLoading = false
        this.$refs.videoPreview.srcObject = this.stream
      } catch (e) {
        console.error(e)
        this.isLoading = false
        this.softError = true
      }
    },

    swapCamera() {
      this.currentCameraIndex++

      if (this.currentCameraIndex >= this.availableDevices.length)
        this.currentCameraIndex = 0

      this.currentDevice = this.availableDevices[this.currentCameraIndex]

      this.prepareCameraRecordingInitialSetup()
    },

    updateCurrentFilter(filter) {
      this.currentFilter = filter
    },

    async takePhoto() {
      this.isPhotoTaken = false
      await showUITip(this.$store, 'Say Cheese!')

      const canvas = this.$refs.canvasPreview
      const video = this.$refs.videoPreview
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      canvas.getContext('2d').drawImage(video, 0, 0)

      canvas.toBlob(this.compressImage, 'image/webp', 0.7)
    },

    async compressImage(imageFile, msg) {
      await showUITip(this.$store, 'Optimizing Image For Faster Upload Speeds')

      const useWebWorker = true
      this.showProgress = true
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 1280,
        useWebWorker,
        onProgress: this.updateProgressBar,
      }

      this.output = await imageCompression(imageFile, options)

      this.source = URL.createObjectURL(imageFile)

      this.isPhotoTaken = true
      this.compressionProgress = null
      this.showProgress = false

      await showUITip(this.$store, msg || 'Photo Optimized!', 'success')
    },

    async preprocessUploadedImage(event) {
      const file = event.target.files[0]
      await this.compressImage(file)
      this.fullScreen = false
      this.mirror = false
    },

    updateProgressBar(compressProgress) {
      this.compressionProgress = compressProgress
    },

    async uploadPhotoStory() {
      this.sending = true
      await showUITip(
        this.$store,
        'Uploading Story, Please Wait',
        'info',
        false
      )
      try {
        const data = new FormData()
        data.append('image', this.output, this.output.name)

        const imageID = await this.$axios
          .$post(endpoints.upload_handler_system.upload_image, data)
          .then((response) => response.identifier)

        await this.$axios.$post(endpoints.community_service.stories.index, {
          storyType: 'photo',
          imageID,
          metaData: {
            filter: this.currentFilter,
            fullScreen: this.fullScreen,
            mirror: this.mirror,
          },
        })

        LogAnalyticsEvent('upload_photo_story')
        await showUITip(this.$store, 'Story Posted!', 'success')

        await this.$router.replace(navigationRoutes.Home.Community.index)
      } catch (e) {
        await showUITip(this.$store, 'Error Posting story', 'error')
      } finally {
        this.sending = false
      }
    },

    recapture() {
      this.isPhotoTaken = false
      this.output = undefined
      this.mirror = true
      this.$refs.imageUpload.value = ''
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.story-board-photo-ui {
  position: relative;

  i {
    filter: drop-shadow($default-box-shadow);
  }

  button {
    min-width: auto;
  }

  &::before {
    content: '';
    background: linear-gradient(to bottom, black -30%, transparent);
    position: absolute;
    width: 100%;
    height: 150px;
    top: 0;
    left: 0;
    z-index: 1;
  }

  header {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    top: 0;
    z-index: 1;

    i {
      height: 2 * $xx-large-unit;
      width: 2 * $xx-large-unit;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .effects-toggle-button {
      height: 2 * $xx-large-unit;
      width: 2 * $xx-large-unit;
      padding: $medium-unit;
    }
  }

  footer {
    position: fixed;
    bottom: 64px;
    left: 0;
    right: 0;

    section.backdrop {
      background: linear-gradient(0deg, black, transparent);
      position: absolute;
      width: 100%;
      height: 164px;
      top: -36px;
      left: 0;
      z-index: -1;
    }

    .actions {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;

      button {
        display: grid;
        place-items: center;
        padding: 0;
        width: 2 * $x-large-unit;
        height: 2 * $x-large-unit;
        border-radius: 100%;
        box-shadow: $default-box-shadow;
      }

      .shutter {
        width: 2 * $xx-large-unit;
        height: 2 * $xx-large-unit;
      }

      &.preview-steps {
        button {
          border-radius: 50px;
          width: 130px;
          height: 48px;
          display: flex;
          justify-content: center;
          align-items: center;

          i {
            filter: none;
          }
        }
      }
    }
  }

  aside.effects {
    background: rgba($black, 0.4);
    position: absolute;
    box-shadow: $up-only-box-shadow;
    overflow: scroll;
    z-index: 1;
    display: flex;
    gap: 8px;
    bottom: 36px;
    left: 0;
    right: 0;

    &::-webkit-scrollbar {
      display: none;
    }

    section {
      min-width: 84px;
      height: 110px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius: 10px;

      .demo-image {
        height: 56px;
        width: 56px;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: $default-box-shadow;
      }

      p {
        font-size: 14px;
      }

      &.selected {
        box-shadow: $default-box-shadow;
        border: 1px solid $secondary-matte;

        p {
          color: $vibrant;
        }
      }
    }
  }

  main.heads-up-display {
    position: relative;
    display: grid;
    height: calc(100vh - 36px);
    place-items: center;

    .overlay-progress {
      position: fixed;
      background: rgba(0, 0, 0, 0.8);
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;

      * {
        transition: all 10ms linear;
      }
    }

    video,
    img {
      height: 100vh;
      width: 100vw;
      background: $card-background;
      object-fit: cover;
      border-radius: $nano-unit;
      box-shadow: $default-box-shadow;
    }

    main {
      position: relative;
      justify-self: center;
      align-self: center;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100vw;

      aside.overlay-controls {
        position: absolute;
        bottom: 16px;
        right: 12px;

        button {
          padding: 8px;
          width: auto;
          height: auto;
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
      }

      aside.effects {
        background: rgba($black, 0.7);
        position: absolute;
        bottom: 0;
        box-shadow: $up-only-box-shadow;
        left: 4px;
        overflow: scroll;
        right: 4px;
        z-index: 1;
        display: flex;
        gap: 8px;

        &::-webkit-scrollbar {
          display: none;
        }

        section {
          min-width: 84px;
          height: 110px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          border-radius: 10px;

          img {
            height: 56px;
            width: 56px;
            object-fit: cover;
            border-radius: 8px;
            box-shadow: $default-box-shadow;
          }

          p {
            font-size: 14px;
          }

          &.selected {
            box-shadow: $default-box-shadow;
            border: 1px solid $secondary-matte;

            p {
              color: $vibrant;
            }
          }
        }
      }
    }
  }

  aside.loader {
    position: fixed;
    top: $zero-unit;
    left: $zero-unit;
    z-index: 1;
    background: rgba($black, 0.7);
    height: 100%;
    width: 100%;
    display: grid;
    place-items: center;

    &.soft-error {
      background: transparent;
      height: calc(100% - 134px);
    }
  }
}

$size: 26px;
.camera-flip-icon {
  width: $size;
  height: $size;
  fill: $white;

  &.disabled {
    fill: #585858;
  }
}
</style>

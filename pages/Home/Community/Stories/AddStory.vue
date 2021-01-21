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
        <p>This is <span class="mdi mdi-pen" /> Writing Division</p>
      </section>

      <section v-if="activeTab === 1" class="camera-recording-container">
        <div
          v-show="photo.showProgress"
          :style="{
            width: photo.compressionProgress
              ? `${photo.compressionProgress}%`
              : 0,
          }"
          class="compression-progress-bar"
        />

        <transition name="gray-shift">
          <section v-show="photo.isPhotoTaken" class="overlay">
            <button
              v-ripple
              class="danger-outlined-btn mx-4"
              @click="recapture"
            >
              <span class="mdi mdi-reload mdi-36px" />
            </button>
            <button v-ripple class="vibrant-outlined-btn mx-4">
              <span class="mdi mdi-send mdi-36px" />
            </button>
          </section>
        </transition>

        <LoadingIcon v-show="photo.isLoading" class="text-center my-6" />

        <canvas ref="canvasPreview" style="display: none" />

        <transition name="slide-left">
          <video
            v-show="!photo.isLoading && !photo.isPhotoTaken"
            ref="videoPreview"
            autoplay
          />
        </transition>

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
              <client-only>
                <div class="px-4 photo-options">
                  <v-select
                    v-model="photo.currentDevice"
                    :clearable="false"
                    :options="photo.availableDevices"
                    autocomplete="off"
                    class="my-4 dropdown"
                    placeholder="Choose a Camera"
                  >
                    <template #header>
                      <div class="my-2" style="opacity: 0.8">
                        Currently Using
                      </div>
                    </template>

                    <template #selected-option="{ label }">
                      <small>{{ label.split('(')[0] }}</small>
                    </template>

                    <template v-slot:option="{ label }">
                      <small> {{ label.split('(')[0] }}</small>
                    </template>

                    <template #no-options="{ search, searching, loading }">
                      No Such Camera Device Found
                    </template>
                  </v-select>

                  <v-select
                    v-model="photo.aspectRatio"
                    :clearable="false"
                    :options="photo.availableRatios"
                    autocomplete="off"
                    class="my-4 dropdown"
                    label="name"
                    placeholder="Choose a Aspect Ratio"
                    @input="updatePhotoRatio"
                  >
                    <template #header>
                      <div class="my-2" style="opacity: 0.8">Aspect Ratio</div>
                    </template>

                    <template #selected-option="{ name }">
                      <small>{{ name }}</small>
                    </template>

                    <template v-slot:option="option">
                      <small> {{ option.name }}</small>
                    </template>

                    <template #no-options="{ search, searching, loading }">
                      Invalid Aspect Ratio
                    </template>
                  </v-select>
                </div>
              </client-only>
            </section>
          </transition>

          <section class="actions">
            <!--  Gallery Button  -->
            <button v-ripple class="muted-outlined-btn">
              <i class="mdi mdi-image-multiple mdi-36px" />
            </button>

            <button
              v-if="photo.isPhotoTaken"
              v-ripple
              class="success-outlined-btn mx-4"
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
            <audio
              v-if="audio.source"
              class="my-6 px-4"
              controls
              style="width: 100%"
            >
              <source :src="audio.source" />
            </audio>
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
        availableDevices: [],
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
      await this.$store.dispatch('SocketHandler/updateSocketMessage', {
        message: 'Polyfill for Apple Devices are Ready',
        notificationType: 'info',
        dismissible: true,
      })
    }

    this.audio.stream && this.destroySetup(this.audio.stream)
    this.photo.stream && this.destroySetup(this.photo.stream)

    const availableDevices = await navigator.mediaDevices.enumerateDevices()

    this.photo.availableDevices = availableDevices.filter(
      (device) => device.kind === 'videoinput'
    )
    this.audio.availableDevices = availableDevices.filter(
      (device) => device.kind === 'audioinput'
    )

    this.photo.currentDevice = this.photo.availableDevices[0]
    this.photo.aspectRatio = this.photo.availableRatios[0]
  },

  beforeDestroy() {
    this.audio.stream && this.destroySetup(this.audio.stream)
    this.photo.stream && this.destroySetup(this.photo.stream)
  },

  methods: {
    async showUITip(message, type) {
      await this.$store.dispatch('SocketHandler/updateSocketMessage', {
        message,
        notificationType: type || 'info',
        dismissible: true,
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

    takePhoto() {
      this.photo.isPhotoTaken = false
      this.showUITip('Say Cheese!')

      const canvas = this.$refs.canvasPreview
      const video = this.$refs.videoPreview
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      canvas.getContext('2d').drawImage(video, 0, 0)

      // this.photo.source = canvas.toDataURL()
      // this.photo.isPhotoTaken = true

      this.showUITip('Optimizing Image For Faster Upload Speeds')

      canvas.toBlob(this.compressImage, 'image/webp', 0.7)
    },

    async compressImage(blobImage) {
      const useWebWorker = true
      this.photo.showProgress = true
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 1280,
        useWebWorker,
        onProgress: this.updateProgressBar,
      }
      this.photo.output = await imageCompression(blobImage, options)

      this.photo.source = URL.createObjectURL(blobImage)

      this.photo.isPhotoTaken = true
      this.photo.compressionProgress = null
      this.photo.showProgress = false

      await this.showUITip('Photo Captured!', 'success')
    },

    updateProgressBar(compressProgress) {
      this.photo.compressionProgress = compressProgress
    },

    async uploadProfileDataToBackendServer() {
      this.updateProfileDataLoading = true
      try {
        await this.$axios.$post(endpoints.profile_statistics.profileData, {
          designation: this.designation,
          about: this.about,
        })

        if (this.output) {
          await this.uploadImage()
        }

        await this.updateVuexUserData()

        await this.$router.replace(
          navigationRoutes.Home.MoreOptions.Preferences.index
        )
      } catch (e) {
        await this.showErrorMessage()
      } finally {
        this.updateProfileDataLoading = false
      }
    },

    async uploadImage() {
      const formData = new FormData()
      formData.append('image', this.output, this.output.name)
      try {
        await this.$axios.$post(
          endpoints.upload_handler_system.upload_image,
          formData,
          {
            onUploadProgress: this.showUITip,
          }
        )
      } catch (e) {
        console.error(e)
      }
    },

    recapture() {
      this.photo.isPhotoTaken = false
      this.photo.output = undefined
    },

    //  Audio Methods Start ---------------------------------------
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
        this.audio.audioClip.push(event.data)

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

    custom() {
      const controls = document.querySelector('.controls')
      const cameraOptions = document.querySelector('.video-options>select')
      const video = document.querySelector('video')
      const canvas = document.querySelector('canvas')
      const screenshotImage = document.querySelector('img')
      const buttons = [...controls.querySelectorAll('button')]
      const streamStarted = false

      const [play, screenshot] = buttons

      const constraints = {
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

      cameraOptions.onchange = () => {
        const updatedConstraints = {
          ...constraints,
          deviceId: {
            exact: cameraOptions.value,
          },
        }

        startStream(updatedConstraints)
      }

      play.onclick = () => {
        if (streamStarted) {
          video.play()
          play.classList.add('')
          return
        }
        if (
          'mediaDevices' in navigator &&
          navigator.mediaDevices.getUserMedia
        ) {
          const updatedConstraints = {
            ...constraints,
            deviceId: {
              exact: cameraOptions.value,
            },
          }
          startStream(updatedConstraints)
        }
      }

      screenshot.onclick = () => {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        canvas.getContext('2d').drawImage(video, 0, 0)
        screenshotImage.src = canvas.toDataURL('image/webp')
        screenshotImage.classList.remove('')
      }

      const startStream = async (constraints) => {
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        handleStream(stream)
      }

      const handleStream = (stream) => {
        video.srcObject = stream
      }

      const getCameraSelection = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const videoDevices = devices.filter(
          (device) => device.kind === 'videoinput'
        )
        const options = videoDevices.map((videoDevice) => {
          return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`
        })
        cameraOptions.innerHTML = options.join('')
      }

      getCameraSelection()
    },

    playAudio() {
      const audio = new Audio('/audio/shutter.mp3')
      audio.play()
    },

    setActiveTabTo(newTabNumber) {
      this.activeTab = newTabNumber
      this.$nextTick(() => {
        this.$refs.tabNavigation.scrollTop = 0
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

<style lang="scss">
@import 'assets/all-variables';
@import 'assets/dropdown';

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
      color: $secondary;
      font-weight: 400;
      background: $card-background;
      transition: all 100ms ease-in-out;
    }
  }

  .audio-recording-container {
    .timer {
      padding: 8px 24px;
      border: 1px solid $vibrant;
      border-radius: 50px;
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
      position: absolute;
      top: 0;
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
      transform: scaleX(-1);
      height: calc(100vh - 114px);
    }

    .preview-img-container {
      display: grid;
      place-items: center;
      transform: unset;

      img {
        width: 100%;
        height: 230px;
        border-radius: 4px;
        border: 2px solid whitesmoke;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
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
      background: rgba(black, 0.4);

      .photo-options {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: $standard-unit;
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

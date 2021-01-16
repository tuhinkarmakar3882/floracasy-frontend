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
        <LoadingIcon v-show="photo.isLoading" class="text-center my-6" />
        <video v-show="!photo.isLoading" ref="videoPreview" autoplay />

        <canvas style="display: none" />

        <transition name="slide-up">
          <img
            v-if="photo.source"
            :src="photo.source"
            alt="image-preview"
            class="screenshot-image"
          />
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
            <button v-ripple class="muted-outlined-btn">
              <i class="mdi mdi-image-multiple mdi-36px" />
            </button>

            <button v-ripple class="vibrant-outlined-btn">
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
        <div class="px-4 text-center pt-4">
          <p>Record the Audio Story!</p>

          <i v-ripple class="mdi mdi-headphones mdi-48px headphone-icon" />

          <h4 class="timer">{{ audio.audioRecordingDuration }} seconds</h4>

          <button
            v-if="!audio.recordingStarted"
            v-ripple
            class="primary-outlined-btn"
            @click="startRecording"
          >
            Start Recording
          </button>

          <button
            v-else
            v-ripple
            class="danger-outlined-btn"
            @click="stopRecording"
          >
            Stop Recording
          </button>

          <button
            v-if="audio.recordingDone"
            v-ripple
            class="vibrant-outlined-btn"
          >
            Post
          </button>
        </div>
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
      </section>
    </template>
  </AppFeel>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'
import AppFeel from '~/components/global/Layout/AppFeel'
import LoadingIcon from '~/components/global/LoadingIcon'

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
        isCameraOpen: false,
        isPhotoTaken: false,
        isShotPhoto: false,
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
          },
          {
            name: 'Square (1:1)',
            height: 720,
            width: 720,
          },
          {
            name: 'Portrait (4:3)',
            height: 1280,
            width: 538,
          },
        ],
        aspectRatio: null,
        availableDevices: [],
        currentDevice: null,
        showMoreOptions: false,
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
            width: { ideal: this.photo.aspectRatio.width },
            height: { ideal: this.photo.aspectRatio.height },
          },
        })
      }
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

        this.download()
      }
    },

    download() {
      // const blob = new Blob(this.audio.audioClip, {
      //   type: 'audio/webm',
      // })
      //
      // const url = URL.createObjectURL(blob)
      // this.$refs.audioElement.src = url
      // window.URL.revokeObjectURL(url)
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

  .camera-recording-container {
    position: relative;

    .screenshot-image {
      width: 100%;
      height: 250px;
      border-radius: 4px;
      border: 2px solid whitesmoke;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
      background: white;
    }

    video {
      width: 100%;
      background: $card-background;
      transform: scaleX(-1);
      height: calc(100vh - 114px);
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

        button {
          padding: 0;
          width: 2 * $xx-large-unit;
          height: 2 * $xx-large-unit;
          text-align: center;
          border-radius: 100%;
        }
      }
    }
  }

  .audio-recording-container {
    .headphone-icon {
      display: block;
      position: relative;
    }
  }
}
</style>

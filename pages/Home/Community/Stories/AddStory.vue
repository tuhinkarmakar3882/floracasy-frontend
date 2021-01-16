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
        <video ref="videoPreview" autoplay />
        <canvas style="display: none" />

        <div class="video-devices px-4 my-4">
          <select id="" class="custom-select" name="">
            <option
              v-for="(device, index) in photo.availableDevices"
              :key="index"
              :value="device"
            >
              {{ device.label }}
            </option>
          </select>
        </div>

        <div class="video-aspect-ratio px-4 my-4">
          <label for="aspect-ratio">Aspect-Ratio</label>
          <select
            id="aspect-ratio"
            v-model="photo.aspectRatio"
            class="custom-select"
            name=""
            @change="updatePhotoRatio(photo.aspectRatio)"
          >
            <option
              v-for="(ratio, index) in photo.availableRatios"
              :key="index"
              :value="ratio"
            >
              {{ ratio.name }}
            </option>
          </select>
        </div>

        <transition name="slide-up">
          <img
            v-if="photo.source"
            :src="photo.source"
            alt="image-preview"
            class="screenshot-image"
          />
        </transition>

        <div class="controls">
          <button v-ripple class="muted-outlined-btn">
            <i class="mdi mdi-image-multiple mdi-36px" />
          </button>

          <button v-ripple class="vibrant-outlined-btn">
            <i class="mdi mdi-camera mdi-36px" />
          </button>

          <button v-ripple class="muted-outlined-btn">
            <i class="mdi mdi-dots-horizontal mdi-36px" />
          </button>
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

export default {
  name: 'AddStory',
  components: { AppFeel },
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

      arrayOfObjects: [],
      object: {
        name: 'Object Name',
      },

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
            name: '16:9',
            height: 720,
            width: 1280,
          },
          {
            name: '1:1',
            height: 720,
            width: 720,
          },
          {
            name: '4:3',
            height: 1280,
            width: 548,
          },
        ],
        aspectRatio: null,
        availableDevices: [],
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

    if (!window.MediaRecorder)
      window.MediaRecorder = require('audio-recorder-polyfill')

    this.audio.stream && this.destroySetup(this.audio.stream)
    this.photo.stream && this.destroySetup(this.photo.stream)

    const availableDevices = await navigator.mediaDevices.enumerateDevices()

    this.photo.availableDevices = availableDevices.filter(
      (device) => device.kind === 'videoinput'
    )
    this.audio.availableDevices = availableDevices.filter(
      (device) => device.kind === 'audioinput'
    )
  },

  beforeDestroy() {
    this.audio.stream && this.destroySetup(this.audio.stream)
    this.photo.stream && this.destroySetup(this.photo.stream)
  },

  methods: {
    sayHi() {
      console.log('hi')
    },
    async prepareCameraRecordingInitialSetup(constraint) {
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

    updatePhotoRatio(ratio) {
      this.photo.stream && this.destroySetup(this.photo.stream)
      this.prepareCameraRecordingInitialSetup({
        video: {
          width: {
            ideal: ratio.width,
          },
          height: { ideal: ratio.height },
        },
      })
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

<style lang="scss" scoped>
@import 'assets/all-variables';

.camera-container {
  .camera-button {
    margin-bottom: 2rem;
  }

  .camera-box {
    .camera-shutter {
      opacity: 0;
      width: 450px;
      height: 337.5px;
      background-color: #fff;
      position: absolute;

      &.flash {
        opacity: 1;
      }
    }
  }

  .camera-shoot {
    margin: 1rem 0;

    button {
      height: 60px;
      min-width: auto;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;

      img {
        height: 35px;
        object-fit: cover;
      }
    }
  }

  .camera-loading {
    overflow: hidden;
    height: 100%;
    position: absolute;
    width: 100%;
    min-height: 150px;
    margin: 3rem 0 0 -1.2rem;

    ul {
      height: 100%;
      position: absolute;
      width: 100%;
      z-index: 999999;
      margin: 0;
    }

    .loader-circle {
      display: block;
      height: 14px;
      margin: 0 auto;
      top: 50%;
      left: 100%;
      transform: translateY(-50%) translateX(-50%);
      position: absolute;
      width: 100%;
      padding: 0;

      li {
        display: block;
        float: left;
        width: 10px;
        height: 10px;
        line-height: 10px;
        padding: 0;
        position: relative;
        margin: 0 0 0 4px;
        background: #999;
        animation: preload 1s infinite;
        top: -50%;
        border-radius: 100%;

        &:nth-child(2) {
          animation-delay: 0.2s;
        }

        &:nth-child(3) {
          animation-delay: 0.4s;
        }
      }
    }
  }

  #photoTaken {
    width: 100%;
    object-fit: contain;
  }
}

@keyframes preload {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}

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
</style>

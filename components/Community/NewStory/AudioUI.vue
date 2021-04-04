<template>
  <div class="story-board-audio-ui">
    <header v-if="!recordingDone && recordingStarted">
      <span class="timer">{{ getFormattedTime(audioRecordingDuration) }}</span>
    </header>

    <main>
      <i
        v-if="!recordingDone"
        v-ripple
        :class="recordingStarted && 'pulse white'"
        class="mdi mdi-microphone mdi-48px"
      />
      <transition v-if="!recordingStarted && !recordingDone" name="scale-up">
        <p>Tap the bottom icon to Start</p>
      </transition>

      <transition name="slide-up">
        <AudioPlayer
          v-if="source"
          :audio-source="source"
          class="my-6 px-4"
          controls
          style="width: 100%"
        />
      </transition>
    </main>

    <footer>
      <transition v-if="recordingDone" name="slide-down">
        <section class="actions preview-steps">
          <button v-ripple class="disabled-btn mx-4" @click="startRecording">
            <i class="mdi mdi-refresh mdi-24px mr-2 vibrant" />
            <span class="white">Retake</span>
          </button>

          <button
            v-ripple
            class="vibrant-outlined-btn mx-4"
            @click="uploadAudioStory"
          >
            <span>Send</span>
            <i class="mdi mdi-send mdi-24px ml-2" />
          </button>
        </section>
      </transition>

      <transition v-else name="slide-down">
        <section class="actions">
          <button
            v-if="!recordingStarted"
            v-ripple
            class="secondary-btn mx-4"
            @click="startRecording"
          >
            <span class="mdi mdi-record mdi-36px" />
          </button>

          <button
            v-else
            v-ripple
            class="danger-outlined-btn mx-4"
            @click="stopRecording"
          >
            <span class="mdi mdi-stop mdi-36px" />
          </button>
        </section>
      </transition>
    </footer>

    <transition name="scale-down">
      <aside v-if="sending" class="loader">
        <i class="mdi mdi-loading mdi-spin mdi-48px vibrant" />
      </aside>
    </transition>
  </div>
</template>

<script>
import {
  destroySetup,
  getFormattedTime,
  LogAnalyticsEvent,
  showUITip,
} from '~/utils/utility'
import endpoints from '~/api/endpoints'
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'AudioUI',

  data() {
    return {
      audioRecordingInterval: null,
      audioRecordingDuration: 100,
      recordingStarted: false,
      recordingDone: false,
      stream: null,
      source: null,
      mediaRecorder: null,
      audioClip: [],
      availableDevices: [],
      sending: false,
    }
  },

  async mounted() {
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

    const availableDevices = await navigator.mediaDevices.enumerateDevices()

    this.availableDevices = availableDevices
      .filter((device) => device.kind === 'audioinput')
      .map((item) => item.label.split('(')[0])

    await this.prepareAudioRecordingInitialSetup()
  },

  beforeDestroy() {
    this.stream && destroySetup(this.stream)
    window.streams && destroySetup(window.streams, true)
  },

  methods: {
    getFormattedTime,

    async prepareAudioRecordingInitialSetup() {
      const constraints = {
        audio: true,
      }
      try {
        this.stream = await navigator.mediaDevices.getUserMedia(constraints)
        window.streams.push(this.stream)
        this.mediaRecorder = new MediaRecorder(this.stream)
        this.mediaRecorder.ondataavailable = this.handleDataAvailable
      } catch (e) {
        console.error(e)
      }
    },

    startRecording() {
      this.audioClip = []
      this.source = null
      this.mediaRecorder.start()
      this.recordingStarted = true
      this.recordingDone = false
      this.startTimer()
    },

    startTimer() {
      this.audioRecordingInterval = setInterval(() => {
        this.audioRecordingDuration <= 0
          ? this.stopRecording()
          : this.audioRecordingDuration--
      }, 1000)
    },

    handleDataAvailable(event) {
      if (event.data.size > 0) {
        this.audioClip = event.data

        this.source = URL.createObjectURL(event.data)
      }
    },

    stopRecording() {
      clearInterval(this.audioRecordingInterval)
      this.mediaRecorder.stop()
      this.audioRecordingDuration = 100
      this.recordingStarted = false
      this.recordingDone = true
    },

    async uploadAudioStory() {
      this.sending = true
      await showUITip(
        this.$store,
        'Uploading Story, Please Wait',
        'info',
        false
      )
      const data = new FormData()
      data.append('audio', this.audioClip, this.audioClip?.name)
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
      } finally {
        this.sending = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/_all-variables.scss';

.story-board-audio-ui {
  position: relative;
  display: grid;

  &::before {
    content: '';
    background: linear-gradient(to bottom, black -70%, transparent);
    position: absolute;
    width: 100%;
    height: 3 * $xxx-large-unit;
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
    justify-content: center;
    width: 100%;
    top: 56px;
    z-index: 1;

    span {
      display: block;
      background: $footer-background;
      border-radius: 2 * $xxx-large-unit;
      font-family: $Nunito-Sans;
      padding: $nano-unit $milli-unit;
      font-size: 14px;
      color: white;
      font-weight: 300;
      letter-spacing: $double-unit;
      box-shadow: $default-box-shadow;
    }
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(
        45deg,
        transparent 0%,
        $nav-bar-bg 20%,
        $segment-background 40%,
        $card-background 60%,
        $segment-background 80%,
        $nav-bar-bg 100%
      )
      right no-repeat;
    background-size: 400%;
    animation: shift-background 20s infinite alternate-reverse ease-in-out;

    @keyframes shift-background {
      from {
        background-position: left;
      }
      to {
        background-position: right;
      }
    }

    section {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }

  footer {
    position: fixed;
    bottom: 64px;
    left: 0;
    right: 0;

    .actions {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;

      button {
        display: flex;
        justify-content: center;
        align-items: center;
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

  aside.loader {
    position: fixed;
    top: $zero-unit;
    left: $zero-unit;
    z-index: 1;
    background: rgba($black, 0.7);
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  $common-values: 0 0 4px;
  $outer-ring: #1d1d34;

  .pulse {
    animation: ripple-effect 5s ease-in-out infinite alternate-reverse;
    border-radius: 50%;
    filter: drop-shadow(0 0 4px $outer-ring);
    height: 80px;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;

    @keyframes ripple-effect {
      0% {
        color: white;
        box-shadow: $common-values 0 $segment-background,
          $common-values 0 $card-background,
          $common-values 0 lighten($footer-background, 1%),
          $common-values 0 darken($outer-ring, $darken-percentage);
      }
      50% {
        color: #cacaca;
        box-shadow: $common-values 25px $segment-background,
          $common-values 47px $card-background,
          $common-values 60px lighten($footer-background, 1%),
          $common-values 60 darken($outer-ring, $darken-percentage);
      }
      80% {
        box-shadow: $common-values 40px $segment-background,
          $common-values 60px $card-background,
          $common-values 80px lighten($footer-background, 1%),
          $common-values 90px darken($outer-ring, $darken-percentage);
      }
      100% {
        color: white;
        box-shadow: $common-values 45px $segment-background,
          $common-values 65px $card-background,
          $common-values 85px lighten($footer-background, 1%),
          $common-values 95px darken($outer-ring, $darken-percentage);
      }
    }
  }
}
</style>

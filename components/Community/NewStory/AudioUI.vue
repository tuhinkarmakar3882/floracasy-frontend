<template>
  <div class="story-board-audio-ui">
    <div class="text-center pt-8 mt-8">
      <small class="timer"> {{ audioRecordingDuration }} seconds </small>

      <section class="display-icon pt-8 mt-8">
        <i v-ripple class="mdi mdi-microphone mdi-48px headphone-icon" />
        <p>Audio Story</p>
      </section>

      <transition name="slide-up">
        <AudioPlayer
          v-if="source"
          :audio-source="source"
          class="my-6 px-4"
          controls
          style="width: 100%"
        />
      </transition>

      <section class="audio-controls">
        <button
          v-if="!recordingStarted"
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
          v-if="recordingDone"
          v-ripple
          class="vibrant-outlined-btn mx-4"
          @click="uploadAudioStory"
        >
          <span class="mdi mdi-send mdi-36px" />
        </button>
      </section>
    </div>
  </div>
</template>

<script>
import { LogAnalyticsEvent, showUITip } from '~/utils/utility'
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
    }
  },
  async mounted() {
    this.stream && this.destroySetup(this.stream)

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

    this.stream && this.destroySetup(this.stream)

    const availableDevices = await navigator.mediaDevices.enumerateDevices()

    this.availableDevices = availableDevices
      .filter((device) => device.kind === 'audioinput')
      .map((item) => item.label.split('(')[0])

    await this.prepareAudioRecordingInitialSetup()
  },

  beforeDestroy() {
    this.stream && this.destroySetup(this.stream)
  },

  methods: {
    destroySetup(stream) {
      const tracks = stream.getTracks()
      tracks.forEach(function (track) {
        track.stop()
      })
    },
    async prepareAudioRecordingInitialSetup() {
      const constraints = {
        audio: true,
      }
      this.stream = await navigator.mediaDevices.getUserMedia(constraints)
      this.mediaRecorder = new MediaRecorder(this.stream)
      this.mediaRecorder.ondataavailable = this.handleDataAvailable
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
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/_all-variables.scss';

.story-board-audio-ui {
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
</style>

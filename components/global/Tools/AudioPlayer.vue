<template>
  <div class="audio-player-component">
    <aside v-if="audioPlaybackError" class="player-background text-center">
      <span class="mdi mdi-alert mdi-36px danger-light" />
      <br />
      <span class="danger-light">Unable to Load Audio</span>
    </aside>

    <section v-else class="player-background">
      <p class="header-text">Audio Note</p>

      <main>
        <i
          v-ripple
          :class="isPlaying ? 'mdi-pause-circle-outline' : 'mdi-play'"
          :style="isPlaying && { color: 'yellow' }"
          class="mdi play-pause-button"
          @click="togglePlayer"
        />

        <section class="progress">
          <div id="pg" ref="progressBar" class="bar" />
          <div
            :style="{
              width: `${seekPosition}px`,
            }"
            class="active-bar"
          />
          <aside
            :style="{
              left: `${seekPosition + 60}px`,
            }"
            class="seek"
          />
        </section>

        <small v-if="$refs.audio" class="timings">
          {{ getFormattedTime(currentPosition) }} /
          {{ getFormattedTime(this.$refs.audio.duration) }}
        </small>
        <small v-else class="timings"> Tap on play to Load Audio </small>

        <i
          v-ripple
          :class="isMuted ? 'mdi-volume-mute' : 'mdi-volume-high'"
          :style="isMuted && { color: '#ff8282' }"
          class="mdi volume-button"
          @click="toggleMute"
        />
      </main>

      <p class="footer-text">Powered by Floracasy</p>
    </section>

    <audio id="ax" ref="audio" :src="audioSource || '/audio/test-audio.mp3'" />
  </div>
</template>

<script>
import { getFormattedTime, showUITip } from '@/utils/utility'

export default {
  name: 'AudioPlayer',
  props: {
    audioSource: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isMuted: false,
      isPlaying: false,
      audioPlaybackError: false,
      currentPosition: 0,
      seekPosition: 0,
    }
  },

  watch: {
    currentPosition(value) {
      const percentage = value / this.$refs.audio.duration

      this.seekPosition = this.$refs.progressBar.scrollWidth * percentage
    },
  },

  mounted() {
    this.$refs.audio.addEventListener('timeupdate', this.updateCurrentTimeInUI)
    this.$refs.audio.addEventListener('ended', this.pause)
  },

  beforeDestroy() {
    this.pause()
  },

  methods: {
    getFormattedTime,
    updateCurrentTimeInUI() {
      this.currentPosition = this.$refs.audio.currentTime
    },

    togglePlayer() {
      this.isPlaying ? this.pause() : this.play()
    },
    play() {
      this.isPlaying = true
      this.$refs.audio.play().catch(() => {
        this.audioPlaybackError = true
        showUITip(this.$store, 'Check your network & Refresh', 'error')
        this.pause()
      })
    },
    pause() {
      this.isPlaying = false
      this.$refs.audio.pause()
    },

    toggleMute() {
      this.isMuted ? this.unmute() : this.mute()
    },
    mute() {
      this.isMuted = true
      this.$refs.audio.volume = 0
    },
    unmute() {
      this.isMuted = false
      this.$refs.audio.volume = 1
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.audio-player-component {
  position: relative;
  box-shadow: $default-box-shadow;

  .player-background {
    position: relative;
    margin: auto;
    width: clamp(250px, 100%, 384px);
    height: 84px;
    background: linear-gradient(
      267.26deg,
      #2c3e50 0%,
      rgba(76, 161, 175, 0.47) 100%
    );
    opacity: 0.8;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;

    p {
      font-size: 10px;
      font-family: $Nunito-Sans;
      font-weight: 300;
      line-height: 1;
      color: #9a9a9a;
    }

    .header-text {
      position: absolute;
      height: 14px;
      left: 0;
      right: 0;
      text-align: center;
      top: 10px;
    }

    .footer-text {
      position: absolute;
      right: 16px;
      bottom: 10px;
      letter-spacing: 0;
      visibility: hidden;

      @media only screen and (min-width: 316px) {
        visibility: visible;
      }
    }

    i {
      position: absolute;
      font-size: 48px;
      height: 84px;
      color: $muted;
      display: grid;
      place-items: center;
    }

    .play-pause-button {
      top: 0;
      width: 64px;
      color: lighten($primary-light, $lighten-percentage);
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }

    .volume-button {
      position: absolute !important;
      top: 0;
      right: 0;
      font-size: 32px;
      width: 76px;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      visibility: hidden;

      @media only screen and (min-width: 360px) {
        visibility: visible;
      }
    }

    .progress {
      .bar {
        position: absolute;
        height: 6px;
        left: 68px;
        right: 68px;
        top: 39px;
        background: linear-gradient(
          90deg,
          #9e9e9e 1.54%,
          hsla(0, 0%, 62%, 0.3) 105.51%
        );
        opacity: 0.7;
        border-radius: 12px;
      }

      .active-bar {
        position: absolute;
        height: 6px;
        left: 68px;
        right: 68px;
        top: 39px;
        background: $secondary-highlight;
        opacity: 0.7;
        border-radius: 12px;
      }

      .seek {
        position: absolute;
        width: 16px;
        height: 16px;
        left: 68px;
        top: 34px;
        border-radius: 50%;
        background: radial-gradient(
          53.57% 53.57% at 50% 46.43%,
          #104753 0,
          #81b1af 100%
        );
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      }
    }

    .timings {
      position: absolute !important;
      font-size: 13px;
      color: $white;
      bottom: 6px;
      left: 68px;
    }
  }
}
</style>

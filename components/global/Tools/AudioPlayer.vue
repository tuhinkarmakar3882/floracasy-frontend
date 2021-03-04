<template>
  <div class="audio-player-component">
    <section class="player-background">
      <p class="header-text">Audio Note</p>

      <main>
        <i
          v-ripple
          class="mdi play-pause-button"
          :class="isPlaying ? 'mdi-pause-circle-outline' : 'mdi-play'"
          :style="isPlaying && { color: 'yellow' }"
          @click="togglePlayer"
        />

        <section class="progress">
          <div class="bar" />
          <aside class="seek" />
        </section>

        <small v-if="$refs.audio" class="timings">
          {{ getFormattedTime(currentPosition) }} /
          {{ getFormattedTime(this.$refs.audio.duration) }}
        </small>
        <small v-else class="timings"> Tap on play to Load Audio </small>

        <i
          v-ripple
          class="mdi volume-button"
          :class="isMuted ? 'mdi-volume-mute' : 'mdi-volume-high'"
          :style="isMuted && { color: '#ff8282' }"
          @click="toggleMute"
        />
      </main>

      <p class="footer-text">Powered by Floracasy</p>
    </section>

    <audio id="ax" ref="audio" :src="audioSource || '/audio/test-audio.mp3'" />
  </div>
</template>

<script>
import { getFormattedTime } from '@/utils/utility'

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
      currentPosition: 0,
    }
  },
  mounted() {
    this.$refs.audio.addEventListener('timeupdate', this.updateCurrentTimeInUI)
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
      this.$refs.audio.play()
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
      left: 166px;
      top: 10px;
    }

    .footer-text {
      position: absolute;
      right: 16px;
      bottom: 10px;
      visibility: hidden;

      @media only screen and (min-width: 332px) {
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

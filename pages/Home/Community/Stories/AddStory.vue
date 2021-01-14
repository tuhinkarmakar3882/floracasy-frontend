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

      <div ref="tabNavigation"></div>

      <section v-if="activeTab === 0" class="audio-recording-container">
        <p>This is <span class="mdi mdi-pen" /> Writing Division</p>
      </section>
      <section v-if="activeTab === 1" class="camera-container">
        <section class="audio-recording-container">
          <p>This is <span class="mdi mdi-camera" /> Camera Division</p>
        </section>
        <div v-show="isCameraOpen && isLoading" class="camera-loading">
          <LoadingIcon />
        </div>

        <div
          v-if="isCameraOpen"
          v-show="!isLoading"
          :class="{ flash: isShotPhoto }"
          class="camera-box"
        >
          <div :class="{ flash: isShotPhoto }" class="camera-shutter" />

          <video v-show="!isPhotoTaken" ref="camera" autoplay />

          <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" />
        </div>

        <div v-if="isCameraOpen && !isLoading" class="camera-shoot">
          <button
            :class="
              !isPhotoTaken ? 'vibrant-outlined-btn' : 'danger-outlined-btn'
            "
            type="button"
            @click="takePhoto"
          >
            <span v-if="isPhotoTaken" class="mdi mdi-reload mdi-36px" />
            <span v-else class="mdi mdi-camera mdi-36px" />
          </button>
        </div>

        <div v-if="isPhotoTaken && isCameraOpen" class="camera-download">
          <a
            id="downloadPhoto"
            class="button"
            download="my-photo.jpg"
            role="button"
            @click="downloadImage"
          >
            Download
          </a>
        </div>
      </section>
      <section v-if="activeTab === 2" class="audio-recording-container">
        <p>This is <span class="mdi mdi-headphones" /> Recording Division</p>
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
      isCameraOpen: false,
      isPhotoTaken: false,
      isShotPhoto: false,
      isLoading: false,
      link: '#',
      activeTab: 1,
      tabs: ['Write', 'Photo', 'Audio'],
    }
  },
  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: -1,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })
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

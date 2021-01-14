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

<template>
  <AppFeel
    class="edit-profile-page"
    :on-back="navigationRoutes.Home.MoreOptions.Preferences.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <main v-if="loadingProfile">
        <div class="page-loading my-8">
          <LoadingIcon />
          <p class="my-8">Fetching data from server</p>
        </div>
      </main>

      <main v-else class="px-6 my-8">
        <input
          v-show="false"
          ref="imageUpload"
          type="file"
          accept="image/jpeg, image/png"
          @change="compressImage"
        />
        <section class="display-picture" @click="changeImage">
          <div style="position: relative">
            <img
              v-ripple="'#ff0000'"
              :src="outputPreview || user.photoURL"
              alt="profile-picture"
              class="image-placeholder"
            />
            <span class="overlay" />
          </div>
          <span class="dp-icon mdi mdi-camera-plus" />
        </section>
        <section class="mt-8">
          <div class="material-form-field">
            <input
              id="designation"
              v-model="designation"
              type="text"
              required
              name="text"
              autocomplete="off"
            />
            <label class="material-form-field-label" for="designation">
              Designation
            </label>
          </div>
          <div class="material-form-field mt-2">
            <input
              id="about"
              v-model="about"
              type="text"
              required
              name="text"
              autocomplete="off"
            />
            <label class="material-form-field-label" for="about"> About</label>
          </div>
        </section>
        <div class="text-center mt-8">
          <RippleButton
            class="px-8 mt-2"
            class-list="primary-btn"
            :on-click="uploadProfileDataToBackendServer"
            :loading="updateProfileDataLoading"
          >
            Save
          </RippleButton>
        </div>
      </main>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import { mapGetters } from 'vuex'
import endpoints from '@/api/endpoints'
import imageCompression from 'browser-image-compression'

export default {
  name: 'EditProfile',
  middleware: 'isAuthenticated',
  components: {
    RippleButton: () => import('@/components/global/RippleButton'),
    LoadingIcon: () => import('@/components/global/LoadingIcon'),
    AppFeel,
  },
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Edit Profile',
      loadingProfile: true,
      about: '',
      designation: '',
      updateProfileDataLoading: false,
      imageCompressProgress: null,
      output: null,
      outputPreview: null,
    }
  },

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  async mounted() {
    const currentUser = await this.$store.getters['UserManagement/getUser']
    if (!currentUser) {
      this.loadingProfile = true
      await this.$store.dispatch('UserManagement/fetchData')
    }
    this.about = this.user.about || ''
    this.designation = this.user.designation || ''
    this.loadingProfile = false
  },

  methods: {
    changeImage() {
      this.$refs.imageUpload.click()
    },

    async compressImage(event) {
      const file = event.target.files[0]
      const useWebWorker = true

      const options = {
        maxSizeMB: 0.15,
        maxWidthOrHeight: 750,
        useWebWorker,
        onProgress: this.updateImageCompressProgress,
      }
      this.output = await imageCompression(file, options)
      this.outputPreview = URL.createObjectURL(file)
    },

    updateImageCompressProgress(compressProgress) {
      this.imageCompressProgress = compressProgress
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
      const { photoURL } = await this.$axios
        .$post(endpoints.upload_handler_system.process_image, formData, {
          onUploadProgress: this.showUITip,
        })
        .catch((e) => {
          throw e
        })
      await this.updateVuexPhotoURL(photoURL)
    },

    async showUITip(progressEvent) {
      await this.$store.dispatch('SocketHandler/updateSocketMessage', {
        message: `Performing Secure Profile Update: ${Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        )}%`,
        notificationType: 'info',
        dismissible: false,
      })
    },

    async updateVuexPhotoURL(photoURL) {
      await this.$store.dispatch('UserManagement/setUserPhotoURL', { photoURL })
    },

    async updateVuexUserData() {
      await this.$store.dispatch('UserManagement/setUserAbout', {
        about: this.about,
      })
      await this.$store.dispatch('UserManagement/setUserDesignation', {
        designation: this.designation,
      })
      await this.$store.dispatch('SocketHandler/updateSocketMessage', {
        message: 'Profile Data Updated Successfully',
        notificationType: 'success',
        dismissible: true,
      })
    },

    async showErrorMessage() {
      await this.$store.dispatch('SocketHandler/updateSocketMessage', {
        message: 'Error while Updating... Try Again',
        notificationType: 'error',
        dismissible: true,
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

.edit-profile-page {
  main {
    display: grid;

    .display-picture {
      position: relative;

      img {
        margin-left: auto;
        margin-right: auto;
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 50%;
        position: relative;
        box-shadow: $default-box-shadow;
      }

      .overlay {
        background: #0008;
        height: 150px;
        width: 150px;
        display: block;
        position: absolute;
        top: 0;
        border-radius: 50%;
        left: calc(50% - 75px);
      }

      .dp-icon {
        position: absolute;
        bottom: -$micro-unit;
        left: calc(50% + 24px);
        background: transparent;
        font-size: $xx-large-unit;
        color: $secondary-highlight;
        border-radius: 50%;
      }
    }

    .page-loading {
      display: grid;
      place-items: center;
    }
  }
}
</style>

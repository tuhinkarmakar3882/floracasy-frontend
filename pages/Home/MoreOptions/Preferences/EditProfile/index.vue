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
        <section class="display-picture">
          <div style="position: relative">
            <img
              v-ripple="'#ff0000'"
              :src="user.photoURL"
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
        <div class="text-center mt-8 pt-8">
          <RippleButton
            class="px-8 mt-4"
            class-list="primary-btn"
            :on-click="updateProfileData"
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
import AppFeel from '@/components/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import { mapGetters } from 'vuex'
import LoadingIcon from '@/components/LoadingIcon'
import endpoints from '@/api/endpoints'
import RippleButton from '@/components/global/RippleButton'

export default {
  name: 'EditProfile',
  middleware: 'isAuthenticated',
  components: { RippleButton, LoadingIcon, AppFeel },
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Edit Profile',
      loadingProfile: true,
      about: '',
      designation: '',
      updateProfileDataLoading: false,
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
    async updateProfileData() {
      this.updateProfileDataLoading = true
      try {
        await this.$axios.$post(
          endpoints.profile_statistics.updateProfileData,
          {
            designation: this.designation,
            about: this.about,
          }
        )
        await this.$store.dispatch('SocketHandler/updateSocketMessage', {
          message: 'Profile Data Updated Successfully',
          notificationType: 'success',
          dismissible: true,
        })
        // await this.$router.replace(
        //   navigationRoutes.Home.MoreOptions.Preferences.index
        // )
      } catch (e) {
        await this.$store.dispatch('SocketHandler/updateSocketMessage', {
          message: 'Error while Updating... Try Again',
          notificationType: 'error',
          dismissible: true,
        })
      }
      this.updateProfileDataLoading = false
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
        margin: auto;
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

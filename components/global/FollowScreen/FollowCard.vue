<template>
  <transition name="slide-down">
    <div v-if="!hideCard" class="follow-card-component">
      <i
        v-ripple="'#ff82825f'"
        class="mdi mdi-close mdi-18px muted"
        @click="hideCard = true"
      />

      <img alt="profile-picture" :src="photoURL" @click="openProfileDetails" />

      <h6 class="mt-6 mb-4" @click="openProfileDetails">
        {{ userdata.username }}
      </h6>

      <p class="secondary-matte mb-6" @click="openProfileDetails">
        {{ designation }}
      </p>

      <div @click="followOrUnfollow">
        <RippleButton
          :class-list="
            isFollowing ? 'danger-outlined-btn' : 'vibrant-outlined-btn'
          "
          :disabled="followOrUnfollowWorking"
          :loading="followOrUnfollowLoading"
          class="px-6"
          style="width: 120px"
        >
          {{ isFollowing ? 'Unfollow' : 'Follow' }}
        </RippleButton>
      </div>
      <aside
        v-ripple="'#008B8B5F'"
        class="wrapper"
        @click="openProfileDetails"
      />
    </div>
  </transition>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'
import endpoints from '~/api/endpoints'
import { showUITip } from '~/utils/utility'

export default {
  name: 'FollowCard',
  props: {
    userdata: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      photoURL: '/images/default.svg',
      designation: undefined,
      about: undefined,
      hideCard: false,
      followOrUnfollowWorking: false,
      followOrUnfollowLoading: false,
      isFollowing: false,
    }
  },
  mounted() {
    this.fetchProfileImage()
    this.fetchProfileData()
  },
  methods: {
    async openProfileDetails() {
      await this.$router.push(
        navigationRoutes.Home.Account.Overview.replace(
          '{userUID}',
          this.userdata.userUID
        )
      )
    },
    async fetchProfileImage() {
      const { photoURL } = await this.$axios.$get(
        endpoints.profile_statistics.getProfileImage,
        {
          params: {
            uid: this.userdata.userUID,
          },
        }
      )
      this.photoURL = photoURL
    },
    async fetchProfileData() {
      const { details } = await this.$axios.$get(
        endpoints.profile_statistics.profileData,
        {
          params: {
            uid: this.userdata.userUID,
          },
        }
      )
      this.designation = details.designation || 'No Designation'
      this.about = details.about || 'No About'
    },

    async followOrUnfollow() {
      this.followOrUnfollowLoading = true
      this.followOrUnfollowWorking = true

      try {
        await this.$axios.$post(endpoints.follow_system.follow_or_unfollow, {
          uid: this.userdata.userUID,
        })
        this.isFollowing = !this.isFollowing
      } catch (e) {
        await showUITip(
          this.$store,
          'Unable to Perform Operation! Try Again',
          'alert',
          true
        )
      } finally {
        this.followOrUnfollowLoading = false
        this.followOrUnfollowWorking = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.follow-card-component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 260px;
  background: linear-gradient(225deg, #050515 50%, #00283f 100%);
  position: relative;
  border-radius: 16px;
  box-shadow: 0 0 0.25rem #2c2c3f;
  text-align: center;
  min-width: 200px;

  * {
    z-index: 1;
  }

  h6,
  p {
    width: 85%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h6 {
    font-family: $Raleway;
    text-transform: capitalize;
  }

  p {
    font-size: 0.9rem;
    font-style: italic;
  }

  i {
    position: absolute !important;
    right: 0;
    top: 0;
    z-index: 2;
    height: 40px;
    width: 40px;
    display: grid;
    place-items: center;
    border-top-right-radius: 16px;
  }

  img {
    border-radius: 50%;
    width: 64px;
    height: 64px;
    object-fit: cover;
    box-shadow: $default-box-shadow;
  }

  button {
    width: 120px;
    height: 36px;
  }

  aside.wrapper {
    position: absolute !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    border-radius: 16px;
  }
}
</style>

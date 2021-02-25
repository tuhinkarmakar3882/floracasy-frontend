<template>
  <div v-ripple class="user-search-result-component">
    <img :src="photoURL" alt="user-image" height="64" width="64" />
    <section class="user-data ml-4">
      <h6 class="mt-0 mb-1">{{ userdata.username }}</h6>
      <small v-if="designation" class="vibrant">{{ designation }}</small>
      <p v-if="about">{{ about }}</p>
      <!--      <button v-if="!userdata.isFollowing" class="secondary-outlined-btn mt-2">-->
      <!--        Follow-->
      <!--      </button>-->
    </section>
  </div>
</template>

<script>
import endpoints from '~/api/endpoints'
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'UserSearchResult',
  props: {
    userdata: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    photoURL: '/images/default.svg',
    designation: undefined,
    about: undefined,
  }),
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
      this.about = details.about
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.user-search-result-component {
  display: flex;

  button {
    min-width: auto;
    width: auto;
    min-height: auto;
    height: auto;
  }

  $img-size: 64px;

  img {
    height: $img-size;
    width: $img-size;
    min-height: $img-size;
    min-width: $img-size;
    max-height: $img-size;
    max-width: $img-size;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: $default-box-shadow;
  }

  h6 {
    text-transform: capitalize;
    font-size: 16px;
    margin: 0 0 4px;
  }

  small {
    display: block;
  }

  p {
    font-size: 14px;
    margin: 4px 0 8px;
  }
}
</style>

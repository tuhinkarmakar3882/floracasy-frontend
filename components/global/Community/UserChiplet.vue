<template>
  <div
    v-ripple
    class="user-search-result-component"
    @click="openProfileDetails"
  >
    <img :src="photoURL" alt="user-image" height="64" width="64" />
    <section class="user-data ml-4">
      <h6 class="mt-0 mb-1 secondary mr-auto">
        {{ username || 'Loading...' }}
      </h6>

      <aside>
        <small v-if="designation">{{ designation || 'Loading...' }}</small>
        <p v-if="about">{{ about || 'Loading...' }}</p>
      </aside>
    </section>
  </div>
</template>

<script>
import endpoints from '~/api/endpoints'
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'UserChiplet',
  props: {
    userdata: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      photoURL: '/images/default.svg',
      username: undefined,
      designation: undefined,
      about: undefined,
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
      this.username = details.username
      this.designation = details.designation || 'No Designation'
      this.about = details.about || 'No About'
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

  .user-data {
    width: 100%;
    small {
      display: block;
      font-weight: 300;
      color: #c9c8ff;
    }

    h6 {
      text-transform: capitalize;
      font-size: 18px;
      font-weight: 300;
      margin: 0 auto 4px 0;
      font-family: $Raleway;
    }

    p {
      font-size: 14px;
      margin: 4px 0 8px;
      margin-left: auto;
      display: flex;
      align-items: center;
      line-height: 1;

      span.dot {
        width: $nano-unit;
        height: $nano-unit;
        border-radius: 50%;
        box-shadow: $default-box-shadow;
        background: #cacaca;
        display: block;
      }
    }
  }
}
</style>

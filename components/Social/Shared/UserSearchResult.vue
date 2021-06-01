<template>
  <section v-if="loading" v-ripple class="sample-response">
    <ImageSkeleton height="64px" radius="50%" width="64px" />
    <aside>
      <LineSkeleton width="95%" />
      <LineSkeleton class="my-2" width="40%" />
      <LineSkeleton class="my-2" width="20%" />
    </aside>
  </section>

  <div
    v-else
    v-ripple
    class="user-search-result-component"
    @click="openProfileDetails"
  >
    <img
      :src="photoURL"
      alt="user-image"
      decoding="async"
      height="64"
      width="64"
    />
    <section class="user-data ml-4">
      <div class="top-line">
        <h6 class="mt-0 mb-1 secondary mr-auto">{{ username }}</h6>

        <p v-if="userdata.isFollowing"><span class="dot mr-2" /> Following</p>

        <p v-else-if="userdata.isFollowed">
          <span class="dot mr-2" /> Follows You
        </p>
      </div>

      <aside>
        <small v-if="designation">{{ designation }}</small>
        <p v-if="about">{{ about }}</p>
      </aside>
    </section>
  </div>
</template>

<script>
import endpoints from '~/api/endpoints'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import ImageSkeleton from '~/components/Common/SkeletonLoader/ImageSkeleton'
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'

export default {
  name: 'UserSearchResult',
  components: { LineSkeleton, ImageSkeleton },
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
      loading: true,
      username: true,
    }
  },
  mounted() {
    this.username = this.userdata?.username
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
      this.username = details.username
      this.about = details.about || 'No About'
      this.loading = false
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

    p {
      font-size: 14px;
      margin: 4px 0 8px;
    }

    .top-line {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h6 {
        text-transform: capitalize;
        font-size: 18px;
        font-weight: 300;
        margin: 0 auto 4px 0;
        font-family: $Raleway;
      }

      p {
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
}

section.sample-response {
  display: grid;
  grid-template-columns: 2 * $xxx-large-unit 1fr;
  grid-gap: $standard-unit;
  align-items: center;
  justify-content: stretch;
}
</style>

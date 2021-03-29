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

      <p v-if="designation">{{ designation || 'Loading...' }}</p>
    </section>
    <i
      :class="`mdi mdi-24px mdi-${userdata.reaction.reactionType}`"
      :style="{ color: iconColor }"
    />
    <!--      <small v-if="about">{{ about || 'Loading...' }}</small>-->
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
  computed: {
    iconColor() {
      switch (this.userdata?.reaction?.reactionType) {
        case 'heart':
          return '#80ff71'

        case 'fire':
          return '#ffd646'

        case 'haha':
          return '#b4a7ff'

        case 'sad':
          return '#32e9be'

        case 'angry':
          return '#ff4d84'

        default:
          return '#fff'
      }
    },
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

$img-size: 44px;

.user-search-result-component {
  display: grid;
  grid-template-columns: $img-size auto $img-size;

  button {
    min-width: auto;
    width: auto;
    min-height: auto;
    height: auto;
  }

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
      font-size: 16px;
      font-weight: 300;
      margin: 0 auto 4px 0;
      font-family: $Raleway;
    }

    p {
      font-size: 13px;
      margin: 4px 0 8px auto;
      display: flex;
      align-items: center;
      line-height: 1;
    }
  }

  i {
    display: grid;
    justify-content: center;
  }
}
</style>

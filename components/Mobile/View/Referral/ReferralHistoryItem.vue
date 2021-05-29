<template>
  <div
    v-ripple
    class="referral-history-item-component"
    @click="openProfileDetails"
  >
    <section v-if="loading" class="sample-response">
      <ImageSkeleton height="40px" radius="50%" width="40px" />
      <aside>
        <LineSkeleton width="90%" />
        <LineSkeleton class="my-2" width="40%" />
      </aside>
    </section>

    <section v-else class="joining-history">
      <img :src="photoURL" alt="user-image" />
      <p>
        {{ displayName }} has joined on {{ getFormattedDate(item.createdAt) }}
      </p>
      <aside><p>+05</p></aside>
    </section>
  </div>
</template>

<script>
import { getFormattedDate } from '~/utils/utility'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import endpoints from '~/api/endpoints'
import ImageSkeleton from '~/components/Common/SkeletonLoader/ImageSkeleton'
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'

export default {
  name: 'ReferralHistoryItem',
  components: { LineSkeleton, ImageSkeleton },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      displayName: undefined,
      photoURL: '/images/default.svg',
    }
  },
  computed: {
    userUID() {
      return this.item?.referred_user?.userID
    },
  },

  mounted() {
    this.fetchProfileImage()
    this.fetchProfileData()
  },
  methods: {
    getFormattedDate,
    async openProfileDetails() {
      await this.$router.push(
        navigationRoutes.Home.Account.Overview.replace(
          '{userUID}',
          this.userUID
        )
      )
    },
    async fetchProfileImage() {
      const { photoURL } = await this.$axios.$get(
        endpoints.profile_statistics.getProfileImage,
        {
          params: {
            uid: this.userUID,
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
            uid: this.userUID,
          },
        }
      )
      this.displayName = details.username
      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.referral-history-item-component {
  section.joining-history {
    display: grid;
    grid-template-columns: 2 * $medium-unit 1fr 2 * $medium-unit;
    grid-gap: $standard-unit;
    place-items: center;

    img {
      height: 2 * $medium-unit;
      width: 2 * $medium-unit;
      border-radius: 50%;
    }

    p {
      font-family: $Nunito-Sans;
    }
  }

  section.sample-response {
    display: grid;
    grid-template-columns: 2 * $medium-unit 1fr;
    grid-gap: $standard-unit;
  }
}
</style>

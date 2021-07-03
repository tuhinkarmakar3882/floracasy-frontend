<template>
  <div class="py-6 details-page">
    <aside class="px-4 sample-response">
      <section class="my-4">
        <ImageSkeleton height="64px" radius="50%" width="64px" />

        <aside>
          <LineSkeleton height="2rem" />

          <LineSkeleton class="my-4 mx-auto" height="1.2rem" width="70%" />

          <LineSkeleton class="my-4 mx-auto" width="40%" />
        </aside>
      </section>

      <section class="my-8">
        <div>
          <ImageSkeleton height="52px" radius="50%" width="52px" />
          <LineSkeleton class="my-4" />
        </div>
        <div>
          <ImageSkeleton height="52px" radius="50%" width="52px" />
          <LineSkeleton class="my-4" />
        </div>
        <div>
          <ImageSkeleton height="52px" radius="50%" width="52px" />
          <LineSkeleton class="my-4" />
        </div>
      </section>

      <LineSkeleton class="my-8 mx-auto" height="3rem" width="80%" />

      <section>
        <LineSkeleton class="my-4" height="1.2rem" />
        <LineSkeleton class="mb-6" height="2.5rem" />
        <LineSkeleton class="my-4" height="150px" />
        <LineSkeleton class="my-4" width="80%" />
        <LineSkeleton class="my-4" width="50%" />
        <LineSkeleton class="my-4" width="30%" />
      </section>
    </aside>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'
import ImageSkeleton from '~/components/Common/SkeletonLoader/ImageSkeleton'

export default {
  name: 'Details',
  components: {
    ImageSkeleton,
    LineSkeleton,
  },
  layout: 'ResponsiveApp',
  middleware: 'isAuthenticated',

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Profile Details',
    }
  },

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: -1,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: 1,
    })
    await this.$router.replace(
      navigationRoutes.Home.Account.Overview.replace('{userUID}', this.user.uid)
    )
  },

  methods: {},

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.details-page {
  max-width: $large-screen;
  margin: auto;
  padding-top: 2rem;
  padding-bottom: 2rem;

  aside.sample-response {
    section:first-child {
      display: grid;
      grid-template-columns: 64px 1fr;
      grid-gap: 16px;
      gap: 16px;
    }

    section:nth-child(2) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 16px;
      gap: 16px;

      div {
        display: grid;
        place-items: center;
      }
    }
  }
}
</style>

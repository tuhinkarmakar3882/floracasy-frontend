<template>
  <AppFeel
    :on-back="navigationRoutes.Home.Community.index"
    class="add-new-post-page"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <main v-if="!isReady">
        <LoadingIcon />
      </main>

      <main v-else>
        <div class="header mb-6 px-4">
          <img
            :src="user.photoURL"
            alt="profile-picture"
            height="52"
            width="52"
          />
          <section class="user-details ml-4">
            <p class="secondary">{{ user.displayName }}</p>
            <small v-if="user.designation">{{ user.designation }} </small>
          </section>
        </div>
        <div class="actions mt-4">
          <p v-ripple>
            <span class="mdi mdi-image mdi-24px secondary mr-2" />
            Photos
          </p>
          <p v-ripple>
            <span class="mdi mdi-headphones mdi-24px secondary mr-2" />
            Audio
          </p>
          <p v-ripple>
            <span class="mdi mdi-emoticon mdi-24px secondary mr-2" />
            Mood
          </p>
        </div>
      </main>
    </template>
  </AppFeel>
</template>

<script>
import { mapGetters } from 'vuex'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import AppFeel from '~/components/global/Layout/AppFeel'
import LoadingIcon from '~/components/global/LoadingIcon'

export default {
  name: 'AddPost',
  components: { LoadingIcon, AppFeel },
  middleware: 'isAuthenticated',

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Add New Post',
      isReady: false,
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
      linkPosition: -1,
    })
    await this.setupUser()

    this.isReady = true
  },

  methods: {
    async setupUser() {
      const currentUser = await this.$store.getters['UserManagement/getUser']
      if (!currentUser) {
        this.loadingProfile = true
        await this.$store.dispatch('UserManagement/fetchData')
      }
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

.add-new-post-page {
  .actions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    p {
      display: flex;
      justify-content: center;
      align-items: center;
      color: $muted;

      &:nth-child(2) {
        border-left: 1px solid $card-background;
        border-right: 1px solid $card-background;
      }
    }
  }

  .header {
    display: flex;
    align-items: center;

    $size: 52px;

    img {
      width: $size;
      min-width: $size;
      height: $size;
      min-height: $size;
      border-radius: 50%;
      box-shadow: $default-box-shadow;
      object-fit: cover;
    }

    button {
      min-width: auto;
      font-size: 14px;
      width: 117px;
      height: 32px;
      margin-left: auto;
    }

    .user-details {
      p {
        font-size: 1.2rem;
        font-weight: 500;
      }

      small {
        font-size: 13px;
        font-family: $Nunito-Sans;
        font-weight: 300;
        font-style: italic;
        line-height: 16px;
      }
    }
  }
}
</style>

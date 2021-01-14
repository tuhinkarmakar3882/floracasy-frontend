<template>
  <AppFeel
    :on-back="navigationRoutes.Home.Community.index"
    :prev-url-path="prevURL"
    class="add-new-post-page"
    dynamic-back
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>
    <template slot="app-bar-action-button">
      <button
        v-ripple
        :class="
          postBody.trim().length > 10 ? 'vibrant-outlined-btn' : 'disabled-btn'
        "
        :disabled="postBody.trim().length <= 10"
        style="min-width: auto"
        @click="createPost"
      >
        Post
      </button>
    </template>

    <template slot="main">
      <div v-if="!isReady">
        <LoadingIcon />
      </div>

      <div v-else class="my-4">
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
          <section class="ml-auto">
            <span class="mdi vibrant mdi-36px" :class="moodIcon" />
          </section>
        </div>

        <div class="actions my-4">
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

        <!--        <Dropdown class="dropdown">-->
        <!--          <section slot="custom-head">duh</section>-->
        <!--          <section slot="options">-->
        <!--            <li-->
        <!--              v-for="(option, index) in moodIconOptions"-->
        <!--              :key="index"-->
        <!--              v-ripple-->
        <!--              @click="moodIcon = option"-->
        <!--            >-->
        <!--              {{ option }}-->
        <!--            </li>-->
        <!--          </section>-->
        <!--        </Dropdown>-->

        <section class="main px-2">
          <div
            id="post-body"
            :style="[
              customStyle && {
                background: customStyle.background,
                color: customStyle.color,
                display: 'grid',
                placeItems: 'center',
              },
            ]"
            class="px-4 py-4"
            contenteditable="true"
            @keyup="updateText"
          />
        </section>

        <section class="background-selection mt-4">
          <p class="mb-8 px-2">Try with a background</p>
          <div class="choices">
            <section
              v-ripple
              class="option mx-1 mdi mdi-cancel mdi-24px"
              style="
                background: transparent;
                display: grid;
                place-items: center;
              "
              @click="customStyle = null"
            />
            <section
              v-for="(style, index) in customStyleOptions"
              :key="index"
              v-ripple
              :style="{ background: style.background }"
              class="option mx-1"
              @click="customStyle = style"
            />
          </div>
        </section>
      </div>
    </template>
  </AppFeel>
</template>

<script>
import { mapGetters } from 'vuex'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import AppFeel from '~/components/global/Layout/AppFeel'
import LoadingIcon from '~/components/global/LoadingIcon'
import Dropdown from '~/components/global/Dropdown'

export default {
  name: 'AddPost',
  components: { Dropdown, LoadingIcon, AppFeel },
  middleware: 'isAuthenticated',

  asyncData({ from: prevURL }) {
    return { prevURL }
  },

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Add New Post',
      isReady: false,
      postBody: '',
      moodIcon: null,
      moodIconOptions: ['mdi-party-popper', 'mdi-emoticon-cool'],
      customStyle: null,
      customStyleOptions: [
        {
          background: 'linear-gradient(to right, #CC2B5E, #753A88)',
          color: 'white',
        },
        {
          background: 'orange',
          color: 'black',
        },
        {
          background: 'green',
          color: 'white',
        },
        {
          background: 'yellow',
          color: 'black',
        },
        {
          background: 'cyan',
          color: 'black',
        },
        {
          background: 'greenyellow',
          color: 'black',
        },
        {
          background: 'crimson',
          color: 'white',
        },
        {
          background: 'saddlebrown',
          color: 'white',
        },
        {
          background: 'aqua',
          color: 'black',
        },
        {
          background: 'aliceblue',
          color: 'black',
        },
      ],
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
    async updateText() {
      this.postBody = document.getElementById('post-body').textContent
    },
    createPost() {
      const payload = {
        body: this.postBody,
        styles: this.customStyle,
        mood: this.moodIcon,
      }
      console.log(payload)
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
  .background-selection {
    p {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        height: 1px;
        width: 36px;
        background: $primary-light;
        bottom: -8px;
        left: 8px;
      }
    }

    .choices {
      display: flex;
      overflow: auto;
      max-width: 100%;

      &::-webkit-scrollbar {
        display: none;
      }

      .option {
        border-radius: 12px;
        min-height: 2 * $x-large-unit;
        height: 2 * $x-large-unit;
        min-width: 2 * $x-large-unit;
        width: 2 * $x-large-unit;
      }
    }
  }

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

  #post-body {
    border: 1px solid #3a3a3a;
    border-radius: 0 $standard-unit;
    min-height: 200px;
    outline: 0 none;

    &:focus {
      border: 1px solid $secondary;
    }
  }
}
</style>

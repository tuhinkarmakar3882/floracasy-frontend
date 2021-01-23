<template>
  <section class="add-a-post-preview px-4">
    <p class="py-6" style="font-size: 14px">
      <span class="mdi mdi-plus-circle primary-light" />
      Create new Post
    </p>

    <div class="header mb-6">
      <transition name="scale-down">
        <img
          v-if="isReady"
          alt="display-image"
          height="52"
          :src="user.photoURL"
          width="52"
        />
      </transition>

      <transition name="scale-down">
        <section v-if="isReady" class="user-details ml-4">
          <p class="secondary">{{ user.displayName }}</p>
          <small v-if="user.designation">{{ user.designation }} </small>
        </section>
      </transition>

      <button v-ripple class="vibrant-outlined-btn">New Post</button>
    </div>

    <p class="body py-5 text-center">What's on your mind?</p>

    <div class="actions mt-4">
      <p>
        <span class="mdi mdi-image mdi-24px secondary mr-2" />
        Photos
      </p>
      <p>
        <span class="mdi mdi-headphones mdi-24px secondary mr-2" />
        Audio
      </p>
      <p>
        <span class="mdi mdi-emoticon mdi-24px secondary mr-2" />
        Mood
      </p>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AddPostPreview',

  data() {
    return {
      isReady: false,
    }
  },

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },
  async mounted() {
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
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.add-a-post-preview {
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

  .body {
    position: relative;
    color: $vibrant;
    background: $segment-background;
    border-radius: $micro-unit;

    &::after {
      content: '';
      position: absolute;
      left: $milli-unit;
      top: -$x-large-unit;
      border: $standard-unit solid transparent;
      border-bottom-color: $segment-background;
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
}
</style>

<template>
  <div class="comment-component">
    <img
      :src="comment.user.photoURL"
      alt="profile-image"
      height="40"
      width="40"
      @click="openProfile"
    />

    <section class="comment-message-container">
      <p class="top-line">
        <nuxt-link v-ripple class="username" :to="profileLink">
          {{ getInitials(comment.user.displayName) }}
        </nuxt-link>

        <span class="timestamp">
          <span class="mdi mdi-clock-time-nine-outline" />
          {{ getRelativeTime(comment.createdAt) }}
        </span>
      </p>

      <p class="message-body">{{ comment.message }}</p>
    </section>
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'
import { getRelativeTime } from '~/utils/utility'

export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  computed: {
    profileLink() {
      return navigationRoutes.Home.Account.Overview.replace(
        '{userUID}',
        this.comment?.userUID
      )
    },
  },
  methods: {
    getRelativeTime,

    async openProfile() {
      await this.$router.push(this.profileLink)
    },
    getInitials(name) {
      return name.split(' ')[0]
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.comment-component {
  display: flex;

  img {
    width: 2 * $medium-unit;
    height: 2 * $medium-unit;
    object-position: center;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: $default-box-shadow;
  }

  .comment-message-container {
    width: 100%;
    margin-left: $standard-unit;
    background-color: $footer-background;
    padding: $nano-unit $standard-unit $standard-unit;
    border-radius: $micro-unit;
    box-shadow: $default-box-shadow;

    .top-line {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin-bottom: $micro-unit;

      .username {
        font-size: 18px;
        text-decoration: none;
        color: $secondary;
      }

      .timestamp {
        font-family: $Nunito-Sans;
        font-size: 14px;
        color: $muted;
      }
    }

    .message-body {
      font-size: 15px;
    }
  }
}
</style>

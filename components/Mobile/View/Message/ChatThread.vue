<template>
  <div class="chat-thread-component">
    <img :src="photoURL" alt="Profile Image" decoding="async" loading="lazy" />
    <section>
      <main>
        <h6 class="my-0">{{ username }}</h6>
        <small>{{ getRelativeTime(thread.updatedAt) }}</small>
      </main>

      <aside>
        <p>
          <i v-if="showReplySymbol" class="mdi mdi-reply" />
          {{ thread.lastMessage[0].body || 'Start Chatting' }}
        </p>

        <transition name="slide-right">
          <span v-if="hasUnread" class="dot" />
        </transition>
      </aside>
    </section>
  </div>
</template>

<script>
import { getRelativeTime } from '~/utils/utility'
import { mapGetters } from 'vuex'
import endpoints from '~/api/endpoints'

export default {
  name: 'ChatThread',
  props: {
    thread: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      photoURL: '/images/default.svg',
      username: this.thread?.user[0]?.displayName,
    }
  },
  computed: {
    showReplySymbol() {
      return this.thread?.lastMessage[0]?.senderUID === this.user.uid
    },

    hasUnread() {
      return this.thread?.lastMessage[0]?.toNotify
    },

    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  mounted() {
    this.fetchProfileImage()

    if (!this.username) this.fetchProfileData()
  },

  methods: {
    getRelativeTime,
    async fetchProfileImage() {
      const { photoURL } = await this.$axios.$get(
        endpoints.profile_statistics.getProfileImage,
        {
          params: {
            uid: this.thread.user[0]?.userUID,
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
            uid: this.thread?.lastMessage[0]?.senderUID,
          },
        }
      )
      this.username = details.username
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.chat-thread-component {
  cursor: pointer;
  display: grid;
  grid-template-columns: 56px 1fr;
  grid-gap: 16px;
  padding: 24px 12px;
  overflow: hidden;

  @media screen and (min-width: $medium-screen) {
    &:hover {
      background: $gray-tone;
    }
  }

  &:nth-child(even) {
    background: $body-bg-alternate;
  }

  img {
    height: clamp(56px, 56px, 56px);
    width: clamp(56px, 56px, 56px);
    border-radius: 50%;
    object-fit: cover;
    box-shadow: $default-box-shadow;
  }

  section {
    display: grid;
    grid-gap: 8px;

    main,
    aside {
      max-width: 100%;

      h6,
      p {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    main {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-gap: $standard-unit;

      h6,
      small {
        display: block;
        line-height: 1.5;
      }

      h6 {
        font-size: $standard-unit;
      }

      small {
        font-size: $milli-unit;
        color: $disabled;
        text-align: right;
      }
    }

    aside {
      display: grid;
      grid-template-columns: 1fr 16px;
      grid-gap: $standard-unit;
      align-items: center;

      p {
        font-size: $small-text-unit;
        line-height: 1.75;
      }

      span {
        display: block;
        height: $micro-unit;
        width: $micro-unit;
        border-radius: 50%;
        background: $secondary-vibrant;
        animation: ripple-effect 5s ease-in-out infinite alternate-reverse;

        $common-values: 0 0 8px;

        @keyframes ripple-effect {
          0% {
            box-shadow: $common-values 2px rgba($secondary-matte, 0.1);
          }
          50% {
            box-shadow: $common-values 4px rgba($secondary-vibrant, 0.5);
          }
          80% {
            box-shadow: $common-values 2px rgba($secondary, 0.1);
          }
          100% {
            box-shadow: $common-values 4px rgba($secondary-matte, 0.1);
          }
        }
      }
    }
  }
}
</style>

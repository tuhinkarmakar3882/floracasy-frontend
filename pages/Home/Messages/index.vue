<template>
  <div class="message-page mb-6">
    <section class="message-thread-list">
      <div
        v-for="messageThread in messageThreads"
        :key="messageThread.id"
        v-ripple=""
        class="message-thread px-4 py-4"
        @click="
          $router.push(
            navigationRoutes.Home.Messages.ChatScreen.replace(
              /{messageThreadId}/,
              messageThread.id
            )
          )
        "
      >
        <img
          :src="messageThread.receiver.photoURL"
          :alt="messageThread.receiver.displayName"
        />

        <section>
          <p class="name">
            {{ messageThread.receiver.displayName.substr(0, 17) }}
          </p>
          <p class="message-body mb-3">
            {{ messageThread.lastMessage.substr(0, 50) }}
          </p>
          <small class="time-stamp">
            <span class="mdi mdi-clock-time-nine-outline mr-1" />
            {{ parseTimeUsingMoment(messageThread.updatedAt) }}
          </small>
        </section>

        <span v-if="messageThread.unreadCount > 0" class="unread-count">
          {{ getCount(messageThread.unreadCount) }}
        </span>
      </div>
    </section>

    <client-only>
      <infinite-loading direction="top" @infinite="infiniteHandler">
        <template slot="spinner">
          <LoadingIcon class="mt-4 mb-6" />
          <p class="text-center">Loading Messages...</p>
        </template>
        <template slot="error">
          <p class="danger-light mb-8">Network Error</p>
        </template>
        <template slot="no-more">
          <p class="my-8" />
        </template>
        <template slot="no-results">
          <p class="my-8">You Haven't Started Chatting yet..</p>
        </template>
      </infinite-loading>
    </client-only>
  </div>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import { parseTimeUsingMoment } from '@/utils/utility'
import endpoints from '@/api/endpoints'
import LoadingIcon from '@/components/global/LoadingIcon'

export default {
  name: 'Messages',
  components: { LoadingIcon },
  middleware: 'isAuthenticated',
  layout: 'MobileApp',

  data() {
    return {
      pageTitle: 'Messages',
      messageThreads: [],
      fetchThreads: endpoints.chat_system.fetchThreads,
      navigationRoutes,
    }
  },

  async mounted() {
    await this.$store.dispatch('BottomNavigation/update', { linkPosition: -1 })
  },

  methods: {
    parseTimeUsingMoment,
    getCount(countValue) {
      return countValue > 99 ? `${countValue.toString()}+` : countValue
    },

    async setupUser() {
      const currentUser = await this.$store.getters['UserManagement/getUser']
      if (!currentUser) {
        this.loadingProfile = true
        await this.$store.dispatch('UserManagement/fetchData')
      }
    },

    async infiniteHandler($state) {
      await this.setupUser()
      try {
        const { results, next } = await this.$axios.$get(this.fetchThreads)
        if (results.length) {
          this.fetchThreads = next
          this.messageThreads.push(...results)
          $state.loaded()
        } else {
          $state.complete()
        }
      } catch (e) {
        $state.complete()
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

$image-size: 84px;

.message-page {
  .message-thread {
    position: relative;
    display: grid;
    grid-column-gap: $large-unit;
    grid-template-columns: $image-size auto;
    align-items: center;

    img {
      width: $image-size;
      height: $image-size;
      object-fit: cover;
      object-position: center;
      border-radius: 50%;
      box-shadow: $default-box-shadow;
    }

    .name {
      color: #ededed;
      font-family: $Prata;
      font-size: $medium-unit;
    }

    .message-body {
      font-size: 15px;
    }

    .time-stamp {
      font-size: 13px;
      display: flex;
      align-items: center;
      color: darken($muted, $lighten-percentage);
    }

    &:nth-child(even) {
      background-color: #08081f;
    }

    .unread-count {
      position: absolute;
      background-color: $primary-matte;
      height: $x-large-unit;
      width: 2 * $large-unit;
      color: $white;
      right: $milli-unit;
      display: grid;
      place-items: center;
      font-family: $Nunito-Sans;
      border-radius: 50px;
      font-size: 13px;
    }
  }
}
</style>

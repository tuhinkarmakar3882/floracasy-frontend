<template>
  <div class="message-page mb-6">
    <section class="message-thread-list">
      <pre>{{ messageThreads }}</pre>
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
  </div>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import { parseTimeUsingMoment } from '@/utils/utility'
import endpoints from '@/api/endpoints'

export default {
  name: 'Messages',
  middleware: 'isAuthenticated',
  layout: 'MobileApp',

  data() {
    return {
      pageTitle: 'Messages',
      messageThreads: [],
      navigationRoutes,
    }
  },

  async mounted() {
    await this.$store.dispatch('BottomNavigation/update', { linkPosition: -1 })
    this.messageThreads = await this.$axios
      .$get(endpoints.chat_system.fetchThreads)
      .then(({ results }) => results)
  },

  methods: {
    parseTimeUsingMoment,
    getCount(countValue) {
      return countValue > 99 ? `${countValue.toString()}+` : countValue
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

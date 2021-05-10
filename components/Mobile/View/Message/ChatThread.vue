<template>
  <div class="chat-thread-component">
    <img
      loading="lazy"
      decoding="async"
      alt="Profile Image"
      :src="thread.user.photoURL"
    />
    <section>
      <main>
        <h6 class="my-0">{{ thread.user.displayName }}</h6>
        <small>{{ getRelativeTime(thread.updatedAt) }}</small>
      </main>

      <aside>
        <p>
          <i class="mdi mdi-reply" />
          {{ thread.lastMessage }}
        </p>

        <span class="dot" />
      </aside>
    </section>
  </div>
</template>

<script>
import { getRelativeTime } from '~/utils/utility'

export default {
  name: 'ChatThread',
  props: {
    thread: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getRelativeTime,
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
      grid-template-columns: 1fr 70px;
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
      }
    }
  }
}
</style>

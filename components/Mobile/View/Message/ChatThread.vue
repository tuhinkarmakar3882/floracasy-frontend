<template>
  <div class="chat-thread-component">
    <img alt="Profile Image" src="https://picsum.photos/500" />
    <section>
      <main>
        <h6 class="my-0">{{ thread.name }}</h6>
        <small>05:26 a.m.</small>
      </main>

      <aside>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
          asperiores deleniti
        </p>

        <span class="dot" />
      </aside>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ChatThread',
  props: {
    thread: {
      type: Object,
      required: true,
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
  padding: 20px 12px;
  overflow: hidden;

  &:hover {
    background: $gray-tone;
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
    h6,
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.75;
      white-space: nowrap;
    }

    h6 {
      font-size: $standard-unit;
    }

    p {
      font-size: $small-text-unit;
    }
  }
}
</style>

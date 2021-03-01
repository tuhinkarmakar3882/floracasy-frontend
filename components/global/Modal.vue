<template>
  <div :style="{ color: color }" class="modal-component">
    <header>
      <span
        v-ripple
        class="mdi mdi-arrow-left px-4 py-2 my-0 danger-light"
        @click="toggle"
      />
      <p>Notification Details</p>
    </header>

    <main class="px-4 text-center">
      <i :class="getIconBasedOnModalType" />

      <slot name="title" />
      <slot name="body" />
    </main>

    <footer>
      <p class="mb-4">What you do you like to do?</p>

      <slot name="actions" />

      <button
        v-ripple
        class="danger-outlined-btn my-5 mx-2 px-8"
        @click="toggle"
      >
        Close
      </button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    toggle: {
      type: Function,
      required: true,
    },
    modalType: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },

  computed: {
    getIconBasedOnModalType() {
      switch (this.modalType) {
        case 'like_blog':
          return 'mdi mdi-heart'
        case 'open_comment_page':
          return 'mdi mdi-message-text'
        default:
          return 'mdi mdi-bell'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.modal-component {
  position: fixed;
  background: rgba($primary-matte, 0.99);
  width: 100%;
  height: calc(100% - 56px);
  top: 0;
  z-index: 100000;
  left: 0;
  box-shadow: 0 0 4px black;
  border-radius: 16px 0 16px 0;

  button {
    min-width: auto;
    width: auto;
  }

  header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #222;

    span {
      font-size: 24px;
    }

    p {
      font-size: 18px;
    }
  }

  main {
    padding-top: 36px;
    max-height: 50vh;
    overflow: auto;

    i {
      font-size: 40px;
    }
  }

  footer {
    padding-top: 20px;
    text-align: center;
  }
}
</style>

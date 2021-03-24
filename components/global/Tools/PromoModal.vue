<template>
  <transition name="scale-down">
    <div v-if="displayModal" class="promo-modal-component-container">
      <section class="popup-body px-4">
        <header>
          <slot name="header" />
        </header>
        <main class="mb-8">
          <slot name="body" />
        </main>
        <footer class="text-center">
          <button v-ripple class="secondary-btn" @click="dismiss">
            Continue
          </button>
        </footer>
      </section>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PromoModal',
  props: {
    keyName: {
      type: String,
      required: false,
      default: '',
    },
    oneTime: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      displayModal: true,
    }
  },
  methods: {
    dismiss() {
      this.displayModal = false
      this.oneTime && localStorage.setItem(this.keyName, 'true')
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables.scss';

.promo-modal-component-container {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: grid;
  place-items: center;
  background: rgba($black, 0.6);

  .popup-body {
    width: clamp(300px, 90vw, 650px);
    display: grid;
    place-items: center;
    z-index: 5;
    background: $card-background;
    padding: 2rem 1.5rem;
    border-radius: 16px;
    text-align: left;
    box-shadow: $default-box-shadow;
  }
}
</style>

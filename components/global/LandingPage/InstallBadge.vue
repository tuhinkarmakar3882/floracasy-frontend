<template>
  <transition name="scale-down">
    <div v-if="showInstallBadge" class="install-badge-component">
      <i
        v-if="showCloseButton"
        v-ripple
        class="mdi mdi-close mdi-18px px-4"
        @click="hideInstallBadge"
      />

      <section>
        <p>Floracasy</p>
        <span>Get our free app. It won't take up space in your phone!</span>
      </section>

      <i
        v-ripple
        class="mdi mdi-download-circle mdi-36px ml-auto px-4"
        @click="installPWA"
      />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'InstallBadge',
  props: {
    showCloseButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showInstallBadge: false,
    }
  },
  mounted() {
    const displayMode = this.getPWADisplayMode()
    console.log(displayMode)

    displayMode === 'browser' &&
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()

        this.showInstallBadge = true
        window.deferredPrompt = e
        // Todo - Send analytics event that PWA install promo was shown.
      })
  },
  methods: {
    installPWA() {
      const promptEvent = window.deferredPrompt
      if (!promptEvent) return

      promptEvent.prompt()

      promptEvent.userChoice.then(() => {
        window.deferredPrompt = null
      })
    },

    postInstallationSteps() {
      window.addEventListener('appinstalled', () => {
        window.deferredPrompt = null
        this.hideInstallBadge()
        // Todo - Send analytics event that PWA was installed.
      })
    },

    getPWADisplayMode() {
      const isStandalone = window.matchMedia('(display-mode: standalone)')
        .matches
      if (document.referrer.startsWith('android-app://')) {
        return 'twa'
      } else if (navigator.standalone || isStandalone) {
        return 'standalone'
      }
      return 'browser'
    },

    hideInstallBadge() {
      this.showInstallBadge = false
      setTimeout(() => {
        this.showInstallBadge = true
      }, 2000)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.install-badge-component {
  height: 3 * $x-large-unit;
  display: flex;
  align-items: center;
  background: $active-gradient;
  border-radius: $micro-unit $micro-unit 0 0;
  box-shadow: $up-only-box-shadow;

  * {
    color: $white;
    transition: all 300ms ease-in-out;
  }

  i {
    display: grid;
    place-items: center;
    height: 3 * $x-large-unit;
    border-radius: $micro-unit $micro-unit 0 0;
  }

  section {
    p {
      font-size: 1rem;
      font-family: $Prata;
      font-weight: 500;
    }
    span {
      font-size: 0.7rem;
      line-height: 1;
      margin: 0;
      padding: 0;
    }
  }
}
</style>

<template>
  <transition name="scale-down">
    <div v-if="showInstallPrompt" class="install-badge-component">
      <i
        v-if="showCloseButton"
        v-ripple
        class="mdi mdi-close mdi-18px px-4"
        @click="hideInstallBadge"
      />

      <section @click="installPWA">
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
      showInstallPrompt: false,
    }
  },

  mounted() {
    const displayMode = this.getPWADisplayMode()

    if (displayMode === 'browser') {
      this.addBeforeInstallPromptListener()
      this.addAppInstalledListener()
    }
    window.deferredPrompt && (this.showInstallPrompt = true)
  },

  methods: {
    addBeforeInstallPromptListener() {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        this.showInstallPrompt = true
        window.deferredPrompt = e
        // Todo - Send analytics event that PWA install promo was shown.
      })
    },
    addAppInstalledListener() {
      window.addEventListener('appinstalled', () => {
        this.hideInstallBadge()
        // Todo - Send analytics event that PWA was installed.
      })
    },

    installPWA() {
      const promptEvent = window.deferredPrompt
      if (!promptEvent) return

      promptEvent.prompt()

      promptEvent.userChoice.then(() => {
        window.deferredPrompt = null
      })
    },

    getPWADisplayMode() {
      const isStandalone = window.matchMedia('(display-mode: standalone)')
        .matches
      const isTrustedWebActivity = document.referrer.startsWith(
        'android-app://'
      )

      if (isTrustedWebActivity) {
        return 'twa'
      }

      if (navigator.standalone || isStandalone) {
        return 'standalone'
      }

      return 'browser'
    },

    hideInstallBadge() {
      this.showInstallPrompt = false
      window.deferredPrompt = null
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

<template>
  <div class="install-badge-component-container">
    <transition name="scale-down">
      <section v-if="showInstallPrompt" class="install-badge-component">
        <i
          v-if="showCloseButton"
          v-ripple
          class="mdi mdi-close mdi-18px px-4"
          @click="hideInstallBadge"
        />

        <section @click="showOverlay = true">
          <p>Floracasy</p>
          <span>Get our free app. It won't take up space in your device!</span>
        </section>

        <i
          v-ripple
          class="mdi mdi-download-circle mdi-36px ml-auto px-4"
          @click="showOverlay = true"
        />
      </section>
    </transition>

    <transition name="scale-down">
      <aside v-if="showOverlay" class="loader" @click="showOverlay = false">
        <section class="my-6">
          <a
            href="https://play.google.com/store/apps/details?id=com.floracasy.twa&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
            ><img
              alt="Get it on Google Play"
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              style="width: 250px"
          /></a>
        </section>

        <section class="my-6" @click="installPWA">
          <img
            alt="Get it as a Progressive Web App"
            style="width: 220px"
            src="https://blueislanddigital.com/wp-content/uploads/2019/10/Progressive-Web-App.png"
          />
        </section>
      </aside>
    </transition>
  </div>
</template>

<script>
import { LogAnalyticsEvent } from '~/utils/utility'

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
      showOverlay: false,
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
        LogAnalyticsEvent('pwa_installation_badge_shown')
      })
    },
    addAppInstalledListener() {
      window.addEventListener('appinstalled', () => {
        this.hideInstallBadge()
      })
    },

    installPWA() {
      LogAnalyticsEvent('trigger_pwa_installation')
      const promptEvent = window.deferredPrompt
      if (!promptEvent) return

      promptEvent.prompt()

      promptEvent.userChoice.then(() => {
        window.deferredPrompt = null
        LogAnalyticsEvent('pwa_installed')
      })
    },

    getPWADisplayMode() {
      const isStandalone = window.matchMedia(
        '(display-mode: standalone)'
      ).matches
      const isTrustedWebActivity =
        document.referrer.startsWith('android-app://')

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

.install-badge-component-container {
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

  aside.loader {
    position: fixed;
    top: $zero-unit;
    left: $zero-unit;
    right: $zero-unit;
    bottom: $zero-unit;
    z-index: $bring-to-front;
    background: rgba($black, 0.85);
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>

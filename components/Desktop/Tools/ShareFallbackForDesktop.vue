<template>
  <aside
    :style="{ position: fixedMode ? 'fixed' : 'absolute' }"
    class="share-fallback"
    @click="handleClose"
  >
    <i v-ripple class="mdi mdi-close mdi-24px close-btn" @click="handleClose" />

    <p>Share this on:</p>
    <ul class="options" @click.stop>
      <li title="Share this on Facebook">
        <a
          :href="`https://www.facebook.com/sharer/sharer.php?u=${linkUrl}`"
          rel="noreferrer noopener"
          target="_blank"
        >
          <LazyFaceBookIcon class="svg-icon" />
        </a>
      </li>
      <li title="Share this on Whatsapp">
        <a
          :href="`https://api.whatsapp.com/send?text=${description} ... Read More on Floracasy: ${linkUrl}`"
          rel="noreferrer noopener"
          target="_blank"
        >
          <LazyWhatsAppIcon class="svg-icon" />
        </a>
      </li>
      <li title="Share this on Twitter">
        <a
          :href="`https://twitter.com/share?url=${linkUrl}&text=${description}`"
          rel="noreferrer noopener"
          target="_blank"
        >
          <LazyTwitterIcon class="svg-icon" />
        </a>
      </li>

      <li title="Copy Link" @click="copyLink">
        <input type="text" ref="shareLink" class="hidden-input" />
        <LazyCopyToClipboardIcon />
      </li>

      <li title="Share this on Telegram">
        <a
          :href="`https://t.me/share/url?url=${linkUrl}&text=${description}... Read More on Floracasy`"
          rel="noreferrer noopener"
          target="_blank"
        >
          <LazyTelegramIcon class="svg-icon" />
        </a>
      </li>
      <li title="Share this on LinkedIn">
        <a
          :href="`https://www.linkedin.com/sharing/share-offsite/?url=${linkUrl}&text=${description}... Read More on Floracasy`"
          rel="noreferrer noopener"
          target="_blank"
        >
          <LazyLinkedinIcon class="svg-icon" />
        </a>
      </li>
      <li title="Share this on Reddit">
        <a
          :href="`https://www.reddit.com/submit?url=${linkUrl}&text=${description}... Read More on Floracasy`"
          rel="noreferrer noopener"
          target="_blank"
        >
          <LazyRedditIcon class="svg-icon" />
        </a>
      </li>
    </ul>
  </aside>
</template>

<script>
import { showUITip } from '~/utils/utility'

export default {
  name: 'ShareFallbackForDesktop',
  props: {
    handleClose: {
      type: Function,
      required: true,
    },
    fixedMode: {
      type: Boolean,
      required: false,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    linkUrl: {
      type: String,
      required: true,
    },
  },
  methods: {
    async copyLink() {
      window.shareLink = this.$refs.shareLink
      this.$refs.shareLink.value = `${this.description} ${this.linkUrl}`
      this.$refs.shareLink.select()
      this.$refs.shareLink.setSelectionRange(0, 99999)
      document.execCommand('copy')
      await showUITip(this.$store, 'Link Copied to Clipboard!', 'success')
      this.handleClose()
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.share-fallback {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(10, 10, 10, 0.8);

  .close-btn {
    position: absolute !important;
    display: grid;
    place-items: center;
    height: 64px;
    width: 64px;
    top: 0;
    right: 0;
    padding: 0;
    margin: 0;
  }

  p {
    font-size: $medium-unit;
    font-weight: 400;
    color: white;
  }

  .options {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: $standard-unit;

    li {
      height: 64px;
      width: 64px;

      a {
        display: grid;
        place-items: center;

        .svg-icon {
          height: 64px;
          width: 64px;
        }
      }
    }
  }

  input.hidden-input {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }
}
</style>

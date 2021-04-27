<template>
  <aside
    class="share-fallback"
    :style="{ position: fixedMode ? 'fixed' : 'absolute' }"
    @click="handleClose"
  >
    <i v-ripple class="mdi mdi-close mdi-24px close-btn" @click="handleClose" />

    <p>Share this on:</p>
    <ul class="options" @click.stop>
      <li>
        <a
          :href="`https://www.facebook.com/sharer/sharer.php?u=${linkUrl}`"
          class="shareBtn btn fbBtn py-1"
          rel="noreferrer noopener"
          target="_blank"
        >
          <LazyFaceBookIcon />
        </a>
      </li>
      <li>
        <a
          :href="`https://api.whatsapp.com/send?text=${description} ... Read More on Floracasy: ${linkUrl}`"
          class="shareBtn btn whatsAppBtn py-1"
          rel="noreferrer noopener"
          target="_blank"
        >
          <LazyWhatsAppIcon />
        </a>
      </li>
      <li>
        <a
          :href="`https://twitter.com/share?url=${linkUrl}&text=${description}`"
          class="shareBtn btn twitterBtn py-1"
          rel="noreferrer noopener"
          target="_blank"
        >
          <LazyTwitterIcon />
        </a>
      </li>
      <li>
        <a
          :href="`https://t.me/share/url?url=${linkUrl}&text=${description}... Read More on Floracasy`"
          class="shareBtn btn telegramBtn py-1"
          rel="noreferrer noopener"
          target="_blank"
        >
          <LazyTelegramIcon />
        </a>
      </li>
    </ul>
  </aside>
</template>

<script>
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
  }
}
</style>

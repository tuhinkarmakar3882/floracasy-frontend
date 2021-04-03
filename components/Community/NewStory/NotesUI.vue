<template>
  <div class="story-board-photo-ui">
    <h4 class="text-center">Story Board NotesUI</h4>
  </div>
</template>

<script>
export default {
  name: 'NotesUI',
}
</script>

<!--<section v-if="activeTab === 0" class="writing-container">-->
<!--<h6 class="px-2 text-center mb-0">Share your thoughts</h6>-->
<!--<hr class="reversed-faded-divider" />-->
<!--<small class="px-4 text-right pb-4 muted" style="display: block">-->
<!--  {{ text.contentSize }} / 500-->
<!--</small>-->

<!--<section class="main px-2">-->
<!--  <div-->
<!--    id="text-body"-->
<!--    :style="[-->
<!--              text.customStyle && {-->
<!--                background: text.customStyle.background,-->
<!--                color: text.customStyle.color,-->
<!--                display: 'grid',-->
<!--                placeItems: 'center',-->
<!--              },-->
<!--            ]"-->
<!--    class="px-4 py-4"-->
<!--    contenteditable="true"-->
<!--    @keyup="updateText"-->
<!--  />-->
<!--</section>-->

<!--<section class="background-selection mt-4">-->
<!--  <p class="mb-8 px-2">Try with a background</p>-->
<!--  <div class="choices">-->
<!--    <section-->
<!--      v-ripple-->
<!--      class="option mx-1 mdi mdi-cancel mdi-24px"-->
<!--      style="-->
<!--                background: transparent;-->
<!--                display: grid;-->
<!--                place-items: center;-->
<!--              "-->
<!--      @click="text.customStyle = null"-->
<!--    />-->
<!--    <section-->
<!--      v-for="(style, index) in text.customStyleOptions"-->
<!--      :key="index"-->
<!--      v-ripple-->
<!--      :style="{ background: style.background }"-->
<!--      class="option mx-1"-->
<!--      @click="text.customStyle = style"-->
<!--    />-->
<!--  </div>-->
<!--</section>-->

<!--<button-->
<!--  v-ripple-->
<!--  :class="text.canSend ? 'primary-btn' : 'disabled-btn'"-->
<!--  :disabled="!text.canSend || text.isSending"-->
<!--  class="floating-action-button"-->
<!--  @click="uploadTextStory"-->
<!--&gt;-->
<!--  <span class="mdi mdi-send mdi-24px" />-->
<!--</button>-->
<!--</section>-->

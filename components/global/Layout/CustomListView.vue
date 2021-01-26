<template>
  <div class="custom-list-view">
    <slot name="heading"></slot>
    <ul>
      <slot name="list-items"></slot>
      <slot name="last-item"></slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CustomListView',
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.custom-list-view {
  ul {
    list-style: none;

    li {
      margin: 0;

      p {
        display: flex;
        width: 100%;
        align-items: center;
        text-align: left;

        .icon {
          font-size: clamp(1.6rem, 8vw, 2rem);
          padding-left: $micro-unit;
        }

        .option-name {
          margin-left: $xx-large-unit;
          padding-right: $standard-unit;
          color: lighten($body-text-default, $lighten-percentage);
          font-size: clamp(1.1rem, 8vw, 1.2rem);
          width: 100%;
        }

        .option-time {
          font-family: $Nunito-Sans;
          font-size: 12px;
          color: $muted;
        }

        .arrow-go {
          max-width: 64px;
          font-size: clamp(20px, 8vw, 28px);
          color: #3a3a3a;
        }
      }
    }
  }
}
</style>

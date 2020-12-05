<template>
  <div class="custom-list-view">
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
        display: grid;
        grid-template-columns: 1fr 4fr 0.5fr;
        grid-column-gap: 1rem;
        align-items: center;
        text-align: left;

        .icon {
          font-size: clamp(1.6rem, 8vw, 2rem);
        }

        .option-name {
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
          font-size: clamp(20px, 8vw, 28px);
          color: #3a3a3a;
        }
      }
    }
  }
}
</style>

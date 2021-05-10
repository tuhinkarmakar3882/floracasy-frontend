<template>
  <div class="typing-animation-component">
    <img alt="" src="https://picsum.photos/64" />
    <i class="dot" />
    <i class="dot" />
    <i class="dot" />
  </div>
</template>

<script>
export default {
  name: 'TypingAnimation',
}
</script>

<style lang="scss">
@import 'assets/all-variables';

.typing-animation-component {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  img {
    border-radius: 50%;
    object-fit: cover;
    height: $x-large-unit;
    width: $x-large-unit;
    margin: 0 $micro-unit 0 0;
  }

  i {
    display: block;
    width: $micro-unit;
    height: $micro-unit;
    border-radius: 50%;
    margin: 0 4px;
    box-shadow: $default-box-shadow;

    &:nth-child(2) {
      background-color: $primary-matte;
      animation: bounce-up 900ms ease-in-out infinite alternate;
    }

    &:nth-child(3) {
      background-color: $primary;
      animation: bounce-up 900ms ease-in-out infinite alternate 200ms;
    }

    &:nth-child(4) {
      background-color: $primary-light;
      animation: bounce-up 900ms ease-in-out infinite alternate 400ms;
    }
  }

  @keyframes bounce-up {
    0% {
      margin-bottom: 20px;
    }
    20% {
      margin-bottom: -6px;
    }
    25% {
      margin-bottom: 0;
    }
  }
}
</style>

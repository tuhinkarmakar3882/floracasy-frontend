<template>
  <div class="content">
    <h1 class="headline-text mb-5 text-center">Let&rsquo;s Get Started</h1>

    <div class="signupOptionsGrid">
      <div v-for="option in signupOptions" :key="option.id" class="gridItems">
        <v-btn class="button px-4" color="secondary" outlined width="250">
          <span>Continue with {{ option.provider }}</span>
        </v-btn>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "GetStarted",
  layout: "authenticationPageLayout",
  transition: {
    name: "slide-x-transition",
    mode: "out-in"
  },
  data() {
    return {
      signupOptions: [
        {
          "id": 0,
          "provider": "Google",
          "icon": "mdi-email"
        },
        {
          "id": 1,
          "provider": "Facebook",
          "icon": "mdi-email"
        },
        {
          "id": 2,
          "provider": "Twitter",
          "icon": "mdi-email"
        },
        {
          "id": 3,
          "provider": "LinkedIn",
          "icon": "mdi-email"
        },
      ]
    }
  },

}
</script>

<style lang="scss" scoped>
@import "assets/variables";

.content {
  display: block;
  width: clamp(300px, 50vw, 650px);
  background: $card-background;
  padding: 2rem;
  box-shadow: 0 0 4px lighten($segment-background, 50%);

  .headline-text {
    font-family: $Prata;
    font-weight: 400;
    letter-spacing: 1px;
    color: white;
    font-size: clamp(24px, 4vw, 32px);
  }

  .signupOptionsGrid {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: 1fr;
    place-items: center;
    grid-row-gap: 3vh;
    margin: 1.5rem 0;
    padding: 1.5rem 0;
    background: transparent;

    .gridItems {
      background: transparent;
    }
  }
}
</style>

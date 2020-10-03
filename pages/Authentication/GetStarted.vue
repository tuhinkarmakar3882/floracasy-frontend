<template>
  <div class="content dbx">
    <h1 class="headline my-5">Let&rsquo;s Get Started</h1>

    <ul>
      <li v-for="option in signupOptions" :key="option.id">
        <v-avatar color="primary" style="color: white">{{ option.provider[0] }}</v-avatar>
        <v-btn class="my-6" color="secondary" outlined>
          Continue with {{ option.provider }}
        </v-btn>
      </li>
    </ul>

  </div>
</template>

<script>

export default {
  name: "/Authentication/GetStarted",
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
          "provider": "Google"
        },
        {
          "id": 1,
          "provider": "Facebook"
        },
        {
          "id": 2,
          "provider": "Twitter"
        },
        {
          "id": 3,
          "provider": "LinkedIn"
        },
      ]
    }
  },

}
</script>

<style lang="scss" scoped>
.content {
  width: clamp(300px, 50vw, 600px);
}
</style>

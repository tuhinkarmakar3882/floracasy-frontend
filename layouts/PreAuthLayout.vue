<template>
  <v-app>
    <v-main class="v-main">
      <div class="modal-style">
        <nuxt/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from "@/components/global/NavigationBar"

export default {
  name: "PreAuthLayout",
  components: {NavigationBar},
}
</script>

<style lang="scss" scoped>
@import "assets/variables";

.modal-style {
  display: grid;
  place-items: center;
  height: 100vh;
  transition: all 0.5s ease-in-out;
  background-color: darken($body-background, 5%);
}
</style>

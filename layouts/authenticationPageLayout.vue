<template>
  <v-app>
    <v-main class="v-main">
      <div class="modal-style dbx">
        <nuxt/>
      </div>
    </v-main>
  </v-app>

</template>

<script>
export default {
  name: "authenticationPageLayout"
}
</script>

<style lang="scss" scoped>

.modal-style {
  display: grid;
  place-items: center;
  height: 100vh;
}
</style>

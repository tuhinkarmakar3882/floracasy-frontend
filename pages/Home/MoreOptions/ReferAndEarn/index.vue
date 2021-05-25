<template>
  <div class="refer-and-earn-page">
    <AppBarHeader no-right-padding>
      <template #title>{{ pageTitle }}</template>
      <!--      <template #action-button>-->
      <!--        <i class="mdi mdi-help-circle-outline secondary" />-->
      <!--      </template>-->
    </AppBarHeader>
    <main>
      <p class="my-8 text-center py-4 px-4">
        Stay Tuned <br />
        Because, Something Exciting is Coming!
      </p>
    </main>
    <main v-if="false">
      <header class="px-4 py-6">
        <h5>Invite your friends to Floracasy</h5>
        <div
          :style="{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }"
        >
          <section>
            <p class="mb-2">Your Referral Code</p>
            <small class="white"><strong>fc-07d4-39</strong></small>
          </section>
          <aside>
            <i class="mdi mdi-share-circle secondary mdi-36px" />
          </aside>
        </div>
        <p>You will get 20 Floracoin on every new joining</p>
        <button v-ripple class="secondary-outlined-btn">Share</button>
      </header>

      <section class="px-4">
        <InputField label="Add Promo Code" material>
          <template #input-field>
            <input type="text" />
          </template>
        </InputField>

        <button class="secondary-btn">Add Promo Code</button>
      </section>

      <section class="px-4" style="text-align: center">
        <i class="mdi mdi-party-popper mdi-24px success-light" />
        <p>
          Congratulation, You have already claimed your one time joining bonus
          coins
        </p>
      </section>

      <section class="px-4">
        <h6 class="my-4">Current Status</h6>
        <meter max="100" style="width: 100%" value="10" />
        <br />
        <small>Now you are just 80 Floracoin away</small>
      </section>

      <h6 class="mt-8 mb-4 px-4">Joining History</h6>
      <hr class="my-2" />

      <section
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }"
        class="px-4 my-4"
      >
        <img
          :style="{
            height: '40px',
            width: '40px',
            borderRadius: '50%',
          }"
          alt="user-image"
          src="https://picsum.photos/561"
        />
        <p style="font-family: 'Nunito-Sans', sans-serif">
          Tuhin Karmakar has joined on 11th May
        </p>
      </section>
      <section
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }"
        class="px-4 my-4"
      >
        <img
          :style="{
            height: '40px',
            width: '40px',
            borderRadius: '50%',
          }"
          alt="user-image"
          src="https://picsum.photos/561"
        />
        <p style="font-family: 'Nunito-Sans', sans-serif">
          Tuhin Karmakar has joined on 11th May
        </p>
      </section>
      <section
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }"
        class="px-4 my-4"
      >
        <img
          :style="{
            height: '40px',
            width: '40px',
            borderRadius: '50%',
          }"
          alt="user-image"
          src="https://picsum.photos/561"
        />
        <p style="font-family: 'Nunito-Sans', sans-serif">
          Tuhin Karmakar has joined on 11th May
        </p>
      </section>
    </main>
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'ReferAndEarn',
  // middleware: 'isAuthenticated',
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Refer & Earn',
    }
  },

  mounted() {},

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.refer-and-earn-page {
  main {
    max-width: $large-screen;
    margin: auto;

    header {
      background: $body-bg-alternate;
    }
  }
}
</style>

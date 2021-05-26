<template>
  <div class="referral-history-component">
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
  </div>
</template>

<script>
export default {
  name: 'ReferralHistory',
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.referral-history-component {
  header {
    background: $body-bg-alternate;
    padding: $x-large-unit $standard-unit;
    margin: 0 0 $standard-unit;
    box-shadow: $down-only-box-shadow;

    h5 {
      margin: 0 0 $large-unit;
    }

    main {
      margin: 0 0 $large-unit;
      display: flex;
      align-items: center;
      justify-content: space-between;

      section {
        small {
          font-size: $medium-unit;
        }
      }
    }
  }
}
</style>

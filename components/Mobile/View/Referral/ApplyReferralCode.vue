<template>
  <div class="apply-referral-code-component">
    <aside v-if="loading" class="my-8 py-4 px-4">
      <LineSkeleton class="mx-auto" height="3rem" width="70%" />
      <LineSkeleton class="mt-4 mb-2" height="1rem" />
      <LineSkeleton class="mb-4" height="1rem" />
      <LineSkeleton class="mx-auto" height="1.5rem" width="30%" />
    </aside>

    <main v-else-if="!alreadyReferred">
      <h5>Got a Referral Code?</h5>
      <InputField
        label="Referral Code"
        material
        hint-text="A referral code can give you extra 10 coins"
      >
        <template #input-field>
          <input
            v-model="referralCode"
            placeholder="Type the code here"
            type="text"
          />
        </template>
      </InputField>

      <button v-ripple class="primary-btn" @click="claimReferralBonus">
        Claim the Reward
      </button>
    </main>

    <transition name="scale-down">
      <aside v-if="pleaseWait" class="loader">
        <i class="mdi mdi-loading mdi-spin mdi-48px vibrant" />
      </aside>
    </transition>

    <transition name="scale-down">
      <PopupModal v-if="responseAvailable" user="true">
        <template #header>
          <img
            class="mx-auto"
            src="https://media.tenor.com/images/3ca2eda717899b075ccaa1079d6a84ba/tenor.gif"
            alt="Congratulations!"
            height="100"
            style="height: 100px; object-fit: scale-down"
          />
          <h5>Congratulations!</h5>
        </template>
        <template #body>
          <p>You have Got 10 Flora Coins!</p>
        </template>
      </PopupModal>
    </transition>
  </div>
</template>

<script>
import InputField from '~/components/Common/Tools/InputField'
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'
import PopupModal from '~/components/Layout/PopupModal'

export default {
  name: 'ApplyReferralCode',
  components: { PopupModal, LineSkeleton, InputField },
  data() {
    return {
      loading: !true,
      alreadyReferred: false,
      referralCode: undefined,
      pleaseWait: false,
      responseAvailable: false,
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.loading = false
    // }, 5000)
  },
  methods: {
    claimReferralBonus() {
      this.pleaseWait = true
      setTimeout(() => {
        this.pleaseWait = false
        this.responseAvailable = true
      }, 5000)

      setTimeout(() => {
        this.responseAvailable = true
      }, 25000)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';
@import 'assets/skeletons';

.apply-referral-code-component {
  main {
    padding: $standard-unit;
    text-align: center;

    h5 {
      margin: $standard-unit 0;
    }

    button {
      margin: $milli-unit auto;
    }
  }

  aside.loader {
    position: fixed;
    top: $zero-unit;
    left: $zero-unit;
    right: $zero-unit;
    bottom: $zero-unit;
    z-index: $bring-to-front;
    background: rgba($black, 0.9);
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>

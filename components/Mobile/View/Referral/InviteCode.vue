<template>
  <div class="invite-code-component">
    <header>
      <h5>Invite your friends to Floracasy</h5>
      <main v-ripple>
        <section>
          <p>Your Referral Code</p>
          <p><strong>FC-07D4-39</strong></p>
        </section>

        <i class="mdi mdi-share-circle secondary mdi-36px" />
      </main>

      <small
        >You will get <span class="vibrant"><strong>10</strong></span> Floracoin
        on every new joining</small
      >
    </header>
  </div>
</template>

<script>
export default {
  name: 'InviteCode',
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.invite-code-component {
  header {
    background: $body-bg-alternate;
    padding: $x-large-unit 0;
    box-shadow: $down-only-box-shadow;

    h5 {
      margin: 0 $standard-unit $micro-unit;
    }

    small {
      display: block;
      margin: $standard-unit;
    }

    main {
      display: flex;
      align-items: center;
      justify-content: space-between;

      section {
        padding: $standard-unit;

        p {
          &:last-child {
            color: $white;
            font-family: $Nunito-Sans;
            font-size: $medium-unit;
          }
        }
      }

      i {
        min-height: 2 * $xx-large-unit;
        height: 100%;
        width: 2 * $xx-large-unit;
        display: grid;
        place-items: center;
      }
    }
  }
}
</style>

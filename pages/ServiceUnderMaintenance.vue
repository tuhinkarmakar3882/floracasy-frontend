<template>
  <div class="service-under-maintenance">
    <Logo :width="80" />

    <h1>We're Upgrading Our Services</h1>
    <p>
      The developers are upgrading the system to ensure better reliability &
      stability. <br />
      We're working on creating an amazing experience for you & Can't wait to
      have you check that out!
    </p>

    <CountDownTimer :target-time="1624969928220" class="my-8" />

    <section class="social-links mb-6">
      <a
        href="https://www.facebook.com/pages/category/Product-Service/Floracasy-Where-Knowledge-Gets-Socialized-108505071383665/"
        target="follow_us_tab"
      >
        <FaceBookIcon class="svg-icon" />
      </a>
      <a
        href="https://www.linkedin.com/company/floracasy/"
        target="follow_us_tab"
      >
        <LinkedinIcon class="svg-icon" />
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=com.floracasy.twa"
        target="follow_us_tab"
      >
        <img
          alt="Download on google play"
          class="svg-icon"
          height="48"
          src="/icons/google-play-alternate.png"
          width="48"
        />
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=com.floracasy.twa"
        target="follow_us_tab"
      >
        <SvgGmail class="svg-icon" />
      </a>
    </section>

    <small class="vibrant">
      <strong> &copy; floracasy.com {{ new Date().getFullYear() }} </strong>
    </small>
  </div>
</template>

<script>
import Logo from '~/components/Common/Tools/Logo'
import CountDownTimer from '~/components/Common/Tools/CountDownTimer'
import SvgGmail from '~/components/Icons/SvgGmail'
import LinkedinIcon from '~/components/Icons/LinkedinIcon'
import FaceBookIcon from '~/components/Icons/FaceBookIcon'
import { underMaintenance } from '~/environmentVariables'

export default {
  name: 'ServiceUnderMaintenance',
  components: {
    FaceBookIcon,
    LinkedinIcon,
    SvgGmail,
    CountDownTimer,
    Logo,
  },
  middleware: !underMaintenance && 'hidden',
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.service-under-maintenance {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $standard-unit;
  min-height: 100vh;
  background: linear-gradient(
      45deg,
      transparent 0%,
      $navigation-bar-color 12.5%,
      $body-bg-alternate 25%,
      $card-bg 37.5%,
      $card-bg-alternate 50%,
      $card-bg 62.5%,
      $body-bg-alternate 75%,
      $navigation-bar-color 87.5%,
      transparent 100%
    )
    right no-repeat;
  background-size: 400%;
  animation: shift-background 20s infinite alternate-reverse ease-in-out;

  @keyframes shift-background {
    from {
      background-position: left;
    }
    to {
      background-position: right;
    }
  }

  * {
    text-align: center;
  }

  .social-links {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: $large-unit;

    $size: 2 * $large-unit;

    .svg-icon {
      height: $size;
      width: $size;
      display: block;
      font-size: 2 * $xx-large-unit;

      &:hover {
        transform: scale(1.2);
      }

      &:active {
        transform: scale(0.9);
      }
    }
  }
}
</style>

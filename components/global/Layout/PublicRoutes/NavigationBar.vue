<template>
  <header class="navigation-bar-page">
    <span
      v-ripple
      :class="drawerIsOpened ? 'mdi-close danger-light' : 'mdi-menu'"
      class="mdi icon"
      @click="drawerIsOpened = !drawerIsOpened"
    />
    <!--    <h6 v-ripple class="brand" @click="navigateTo('/')">Floracasy</h6>-->
    <transition name="gray-shift">
      <img
        v-if="!drawerIsOpened"
        alt=""
        src="/icons/fc-logo-full.svg"
        style="position: absolute; height: 28px; left: 52px; top: 15px"
        @click="navigateTo('/')"
      />
    </transition>

    <button
      v-ripple
      class="secondary-outlined-btn ml-auto"
      @click="$router.push('/Authentication/SignInToContinue')"
    >
      Get Started
    </button>

    <div
      :style="drawerIsOpened ? visibleStyles : hiddenStyles"
      class="nav-drawer"
    >
      <section class="text-center px-2 py-6">
        <img
          alt=""
          class="mx-auto"
          src="/icons/fc-logo-full.svg"
          @click="navigateTo('/')"
        />
        <p class="mt-4 mb-0 muted">Where Knowledge Gets Socialized</p>
      </section>

      <ul>
        <li
          v-for="(option, index) in listOptions"
          :key="index"
          v-ripple="`${option.color}5F`"
          class="py-3"
        >
          <p>
            <span :class="option.icon" :style="{ color: option.color }" />
            <span class="option-name">{{ option.name }}</span>
            <span class="mdi mdi-chevron-right arrow-go" />
          </p>
          <hr
            class="my-4"
            :class="
              index % 2 === 0 ? 'faded-divider' : 'reversed-faded-divider'
            "
          />
        </li>
      </ul>

      <LazyInstallBadge key="nav-install-badge" class="pl-4 mt-auto" />
    </div>
  </header>
</template>

<script>
export default {
  name: 'NavigationBar',
  data() {
    return {
      drawerIsOpened: false,
      visibleStyles: {
        transform: 'translateX(0)',
        overflow: 'scroll',
      },
      hiddenStyles: {
        transform: 'translateX(-100%)',
        overflow: 'hidden',
      },
      listOptions: [
        {
          name: 'New Feature',
          icon: 'mdi mdi-crown',
          color: '#8FF2E1',
        },
        {
          name: 'Write & Earn',
          icon: 'mdi mdi-currency-usd',
          color: '#f5a049',
        },
        {
          name: 'About Us',
          icon: 'mdi mdi-information',
          color: '#8c70fd',
        },
      ],
    }
  },
  methods: {
    async navigateTo(path) {
      await this.$router.push(
        path,
        () => {
          this.drawerIsOpened = false
        },
        () => {
          this.drawerIsOpened = false
        }
      )
    },
    exitApp() {
      alert('eventually this will close the app')
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

button {
  min-width: auto;
}

.navigation-bar-page {
  position: sticky;
  top: -$single-unit;
  z-index: $bring-to-front;
  background-color: $nav-bar-bg;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  height: 2 * $x-large-unit;
  margin: 0;
  box-shadow: $down-only-box-shadow;

  .brand,
  .icon {
    position: absolute !important;
    display: flex;
    align-items: center;
    height: 2 * $x-large-unit;
    margin: 0;
  }

  .brand {
    color: white;
    padding: 0 0.3rem;
  }

  .icon {
    left: 0;
    font-size: $large-unit;
    padding: 0 0.9rem 0 1rem;
  }

  button {
    height: 2 * $medium-unit;
    margin-right: $micro-unit;
  }

  @media only screen and (min-width: $max-width) {
    padding-left: 64px;
    padding-right: 32px;
  }

  .nav-drawer {
    position: absolute;
    min-height: calc(100vh - 56px);
    left: 0;
    top: 2 * $x-large-unit;
    background-color: $nav-bar-bg;
    box-shadow: $right-only-box-shadow;
    z-index: $bring-to-zero-level;
    display: flex;
    flex-direction: column;
    width: clamp(280px, 70vw, 400px);
    transition: all 300ms cubic-bezier(0.55, 0.29, 0.31, 0.76);

    section {
      background: $footer-background;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding-left: 0;
        padding-right: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        flex-direction: column;

        hr.faded-divider {
          background: linear-gradient(
            270deg,
            #5b5757 -10.22%,
            rgba(255, 255, 255, 0) 100%
          );
        }

        hr.reversed-faded-divider {
          background: linear-gradient(
            90deg,
            #5b5757 -10.22%,
            rgba(255, 255, 255, 0) 100%
          );
        }

        p {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>

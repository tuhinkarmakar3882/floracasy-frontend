<template>
  <div>
    <div>
      <div class="visible-upto-large" @click="drawer = !drawer" />

      <div class="brand">
        <nuxt-link class="brand-name" to="/"> Floracasy</nuxt-link>
      </div>
      <div class="spacer" />
      <button style="font-weight: 300 !important">Get Rewards</button>
    </div>

    <div class="nav-drawer">
      <ul>
        <li>
          <span>
            <Logo />
          </span>

          <span>
            <span>Floracasy</span>
          </span>
        </li>
      </ul>

      <hr style="background-color: #6dd0bf" />

      <ul>
        <li v-for="menuOption in menuOptions" :key="menuOption.id">
          <div @click="navigateTo(menuOption.route)">
            <span :color="menuOption.color">
              {{ menuOption.icon }}
            </span>
          </div>
          <div @click="navigateTo(menuOption.route)">
            <span style="color: #bababa">
              {{ menuOption.text }}
            </span>
          </div>
        </li>
      </ul>
      <ul>
        <li>
          <button class="button px-4 my-4" @click="logout">Log out</button>
        </li>
      </ul>
    </div>

    <div class="div">
      <div class="modal-style">
        <nuxt />
      </div>
    </div>

    <footer id="blah">
      <button
        v-for="(menuOption, index) in menuOptions"
        :id="index === activeLink ? 'activeNow' : ''"
        :key="menuOption.id"
        :to="menuOption.route"
        :value="menuOptions.id"
        class="dbsx dude mx-0 px-0"
      >
        <span>{{ menuOption.icon }}</span>
        <!--        <small>{{ menuOption.text }}</small>-->
      </button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeAppLayout',
  components: {
    Logo: () => import('~/components/global/Logo'),
  },
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    activeLink: {
      get() {
        return this.$store.state.BottomNavigation.activeLink
      },
      set(newValue) {
        // console.log(newValue)
        this.$store.commit('BottomNavigation/update', newValue)
      },
    },
    ...mapGetters({
      menuOptions: 'BottomNavigation/getMenuOptions',
    }),
    color() {
      return this.menuOptions[this.activeLink].color
    },
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path)
    },
    async logout() {
      try {
        await this.$store.dispatch('logout')
        // console.log(this.$store.state.authUser)
        await this.$router.push('/')
      } catch (e) {}
    },
  },
}
</script>

<style lang="scss">
@import 'assets/variables';

$font-size: 18px;
.v-toolbar__content {
  flex-wrap: wrap;
  padding: 4px 16px !important;

  @media only screen and (min-width: 1024px) {
    padding-left: 64px !important;
    padding-right: 32px !important;
  }

  .brand {
    display: flex;
    align-items: center;

    .brand-name {
      margin-left: 12px;
      font-size: 20px;
      color: $white;
      text-decoration: none;
      font-family: $Prata;
    }
  }

  ul {
    list-style: none;
    display: flex;
    align-items: center;

    li {
      margin: 0 32px;
      font-size: $font-size;
      font-family: $Nunito-Sans;

      a {
        display: block;
        color: $white;
        text-decoration: none;
      }

      button {
        font-size: $font-size !important;
        font-weight: 400 !important;
      }
    }
  }
}

#blah {
  display: grid !important;
  place-items: center;
  grid-template-columns: repeat(5, 1fr) !important;
  height: 100px !important;
}

.dude {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 !important;
  color: gray;
}
</style>

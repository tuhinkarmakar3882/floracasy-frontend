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

    <div class="div">
      <div class="modal-style">
        <nuxt />
      </div>
    </div>

    <footer id="blah">
      <nuxt-link
        v-for="(menuOption, index) in menuOptions"
        :id="index === activeLink ? 'activeNow' : ''"
        :key="menuOption.id"
        :to="menuOption.route"
        :value="menuOptions.id"
        class="dbsx dude mx-0 px-0"
      >
        <!--        <span>{{ menuOption.icon }}</span>-->
        <p>{{ menuOption.text }}</p>
      </nuxt-link>
    </footer>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'HomeAppLayout',
  components: {},
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

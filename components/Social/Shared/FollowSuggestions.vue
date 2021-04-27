<template>
  <section v-if="user && suggestedPeople" class="people-you-may-follow">
    <h6 class="px-4">Explore People</h6>

    <main class="container py-4 px-4">
      <FollowCard
        v-for="people in suggestedPeople"
        :key="`suggested-people-${people.userUID}`"
        :userdata="people"
        class="py-4 search-result"
      />
    </main>

    <footer class="text-center">
      <nuxt-link
        v-ripple
        :to="navigationRoutes.Home.Community.Explore"
        class="no-underline text-center py-4"
      >
        View All <i class="mdi mdi-play" />
      </nuxt-link>
    </footer>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import endpoints from '~/api/endpoints'
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'FollowSuggestions',
  data() {
    return {
      navigationRoutes,
      suggestedPeople: [],
    }
  },
  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  async mounted() {
    this.user && (await this.getSuggestedPeople())
  },
  methods: {
    async getSuggestedPeople() {
      try {
        this.suggestedPeople = await this.$axios
          .$get(endpoints.follow_system.getSuggestions)
          .then((res) => res.results)
      } catch (e) {}
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.people-you-may-follow {
  h6 {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      height: $double-unit;
      width: 2 * $xx-large-unit;
      background: $primary-light;
      bottom: -$milli-unit;
      left: $standard-unit;
    }
  }

  main.container {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 16px;
    overflow: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  footer {
    a {
      display: block;
    }
  }
}
</style>

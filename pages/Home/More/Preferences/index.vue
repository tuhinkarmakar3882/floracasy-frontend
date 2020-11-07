<template>
  <AppFeel class="preferences-page">
    <template slot="app-bar-title"> Preferences </template>

    <template slot="main" class="my-4">
      <main class="my-4">
        <ul>
          <li
            v-for="(option, index) in options"
            :key="index"
            v-ripple="`${option.color}5F`"
            class="px-4 py-2"
            @click="$router.push(option.route)"
          >
            <p>
              <span
                class="icon"
                :class="option.icon"
                :style="{ color: option.color }"
              />
              <span class="option-name">{{ option.name }}</span>
              <span class="mdi mdi-chevron-right arrow-go" />
            </p>
          </li>
          <li v-ripple="'#f774795F'" class="px-4 py-3">
            <p>
              <span class="icon mdi mdi-delete" style="color: #f77479" />
              <span class="option-name">Delete Account</span>
            </p>
          </li>
        </ul>
      </main>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/Layout/AppFeel'

export default {
  name: 'Preferences',
  components: { AppFeel },
  data() {
    return {
      options: [
        {
          name: 'Edit Profile',
          icon: 'mdi mdi-pencil',
          color: '#8FF2E1',
          route: '/Home/More/Preferences',
        },
        {
          name: 'Set Notifications',
          icon: 'mdi mdi-bell',
          color: '#5dd75d',
          route: '/Home/More/Preferences',
        },
        {
          name: 'Who can Message',
          icon: 'mdi mdi-message',
          color: '#ABEDAB',
          route: '/Home/More/Preferences',
        },
        {
          name: 'Saved Blogs',
          icon: 'mdi mdi-bookmark',
          color: '#18e5e5',
          route: '/Home/More/Preferences',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

main {
  ul {
    list-style: none;

    li {
      p {
        display: grid;
        grid-template-columns: 1fr 4fr 0.5fr;
        grid-column-gap: 1rem;
        place-items: center;
        text-align: left;

        .icon {
          font-size: clamp(1.6rem, 8vw, 2rem);
        }

        .option-name {
          color: lighten($body-text-default, $lighten-percentage);
          font-size: clamp(1.1rem, 8vw, 1.2rem);
          width: 100%;
        }

        .arrow-go {
          font-size: clamp(20px, 8vw, 28px);
          color: #3a3a3a;
        }
      }
    }
  }
}
</style>

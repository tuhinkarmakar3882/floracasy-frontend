<template>
  <AppFeel
    class="edit-profile-page"
    :on-back="navigationRoutes.Home.MoreOptions.Preferences.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <main class="px-6 my-8">
        <section class="display-picture">
          <img
            src="https://images.unsplash.com/photo-1605557626613-748697e50913?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
            class="image-placeholder"
          />
          <span class="dp-icon mdi mdi-camera-plus" />
        </section>
        <section class="mt-8">
          <div class="material-form-field">
            <input
              id="designation"
              type="text"
              required
              name="text"
              autocomplete="off"
            />
            <label class="material-form-field-label" for="designation">
              Designation
            </label>
          </div>
          <div class="material-form-field mt-2">
            <input
              id="about"
              type="text"
              required
              name="text"
              autocomplete="off"
            />
            <label class="material-form-field-label" for="about"> About</label>
          </div>
        </section>
        <div class="text-center mt-8 pt-8">
          <button class="primary-btn px-8 mt-4">Save</button>
        </div>
      </main>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'EditProfile',
  components: { AppFeel },
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Edit Profile',
    }
  },
  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

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

<style lang="scss" scoped>
@import 'assets/all-variables';

$material-form-label: lighten($body-text-default, $darken-percentage);
$material-form-label-focus: $secondary;
$material-form-line: #777;
$material-form-line-focus: $material-form-label-focus;
$material-form-input-text: $material-form-label;
$material-form-input-text-focus: $material-form-label-focus;
$material-form-field-invalid-foreground: #d50000;

$material-dropdown-hoverBackground: #e8eaf6;
$material-dropdown-selectedBackground: #9fa8da;
$material-labelOffset: $x-large-unit;
$material-textInputPaddingTopBottom: $milli-unit;

.edit-profile-page {
  main {
    display: grid;

    .display-picture {
      position: relative;

      img {
        margin: auto;
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 50%;
        position: relative;
        box-shadow: $default-box-shadow;
      }

      .dp-icon {
        position: absolute;
        bottom: -$micro-unit;
        left: calc(50% + 24px);
        background: transparent;
        font-size: $xx-large-unit;
        color: $secondary-matte;
        border-radius: 50%;
      }
    }

    input {
      border-radius: unset;
      color: unset;
      background-color: unset;
      font-weight: unset;

      &:hover,
      &:focus,
      &:focus-visible,
      &:active,
      &:focus-within {
        border-radius: unset;
        outline: unset;
        box-shadow: unset;
      }
    }

    .material-form-field {
      font-family: 'Roboto', sans-serif;
      font-size: $standard-unit;
      position: relative;
      display: block;
      color: $material-form-label;
      padding: $material-labelOffset 0 10px 0;

      &::after {
        content: '\00A0';
        display: block;
        color: $material-form-field-invalid-foreground;
        font-size: $medium-unit - $double-unit;
        padding-top: 5px;
      }

      .material-form-field-label {
        position: absolute;
        display: block;
        top: $material-labelOffset + $material-textInputPaddingTopBottom;
        left: 0;
        transition: 0.2s ease all;
        -moz-transition: 0.2s ease all;
        -webkit-transition: 0.2s ease all;
        pointer-events: none;
        cursor: text;
      }

      input {
        padding: $material-textInputPaddingTopBottom 0
          $material-textInputPaddingTopBottom 0;
        display: block;
        width: 100%;
        border: none;
        font-size: $medium-unit - $double-unit;
        color: $material-form-input-text;
        border-bottom: 1px solid $material-form-line;
        outline: none;

        &:invalid {
          outline: none;
          box-shadow: none;
        }

        &:valid,
        &:focus {
          & ~ .material-form-field-label {
            top: $material-labelOffset -
              ($material-textInputPaddingTopBottom + 5);
            font-size: 14px;
          }
        }

        &:focus {
          outline: none;
          color: $material-form-input-text-focus;
          padding-bottom: $material-textInputPaddingTopBottom - 2;
          border-bottom-width: 3px;
          border-bottom-color: $secondary-matte;

          & ~ .material-form-field-label {
            color: $material-form-label-focus;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="contact-support-page">
    <AppBarHeader sticky>
      <template #title> {{ pageTitle }}</template>

      <template #action-button>
        <button
          v-ripple
          :class="validForm ? 'primary-btn' : 'disabled-btn'"
          :disabled="!validForm"
          class="my-6"
          @click="raiseTicket"
        >
          Send
        </button>
      </template>
    </AppBarHeader>

    <main>
      <section class="px-4 my-4">
        <h5 class="heading-title my-8">We're here to help!</h5>
        <p>
          We're sorry to hear that you had any issues while using this platform.
          Tell us more about it & we'll try out best to get it resolved in the
          best possible manner as per our guidelines.
        </p>
      </section>

      <section class="px-4">
        <h6>Let's get it resolved</h6>
        <hr class="faded-divider" />
      </section>

      <form class="px-4">
        <section>
          <label for="issue-topic">Choose a Issue Topic</label>
          <select id="issue-topic" v-model="issueTopic" class="my-4" name="">
            <option
              v-for="(topic, index) in topics"
              :key="index"
              :value="topic"
            >
              {{ topic }}
            </option>
          </select>
          <aside class="form-hints">
            <small v-if="!issueTopic.trim().length" class="hint-text">
              (Required: Choose a Issue Category)
            </small>
            <small v-else class="secondary-matte">
              <i class="mdi mdi-checkbox-marked-circle-outline" /> Looks good!
            </small>
          </aside>
        </section>

        <section class="mt-4">
          <label for="issue-details"> Issue Details </label>

          <textarea
            id="issue-details"
            v-model="issueDetails"
            class="my-4"
            rows="5"
          />

          <aside class="form-hints">
            <small v-if="issueDetails.trim().length < 5" class="mt-3 hint-text">
              (Hint: At least {{ 5 - issueDetails.trim().length }} more
              characters are required)
            </small>
            <small
              v-else-if="
                issueDetails.trim().length >= 5 &&
                issueDetails.trim().length <= 1500
              "
              class="mt-3 secondary-matte"
            >
              <i class="mdi mdi-checkbox-marked-circle-outline" /> Looks good!
            </small>
            <small v-else class="mt-3 danger-light">
              <i class="mdi mdi-alert-circle-outline" />
              Exceed 1500 character limit
            </small>
          </aside>
        </section>
      </form>
    </main>

    <footer>
      <section v-if="showAttachedPreview" class="px-4">
        <h6>Attached Preview</h6>
        <hr class="faded-divider" />
      </section>

      <LoadingError
        v-if="unableToLoadPreview"
        class="px-4 pb-8"
        error-section="Preview"
      />

      <aside v-else class="my-4">
        <LazyCommunityPost
          v-if="postData"
          :post="postData"
          :show-comment-option="false"
          :show-like-option="false"
          :show-more-option="false"
          :show-share-option="false"
        />
        <LazyBlogPost
          v-if="blogData"
          :blog="blogData"
          hide-blog-actions
          hide-more-options-button
        />
      </aside>
    </footer>

    <transition name="scale-down">
      <aside v-if="raisingTicking" class="loader">
        <i class="mdi mdi-loading mdi-spin mdi-48px vibrant" />
        <p>Raising Ticket</p>
      </aside>
    </transition>
  </div>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import endpoints from '~/api/endpoints'
import { showUITip } from '~/utils/utility'
import AppBarHeader from '~/components/Layout/AppBarHeader'

export default {
  name: 'ContactSupport',
  components: { AppBarHeader },
  middleware: 'isAuthenticated',

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Contact Support',
      raisingTicking: false,

      topics: [
        'Bug Report',
        'Feature Request',
        'Hacked',
        'Nudity',
        'Payment Issue',
        'Scam Post',
        'Sexual Content',
        'Violence',
        'Threatening',
        'Other - None of the Above',
      ],

      issueTopic: '',
      issueDetails: '',

      blogData: undefined,
      postData: undefined,

      unableToLoadPreview: false,
      showAttachedPreview: false,
    }
  },

  computed: {
    validForm() {
      const issueDetailsContentLength = this.issueDetails.trim().length
      return (
        issueDetailsContentLength >= 5 &&
        issueDetailsContentLength <= 1500 &&
        this.issueTopic.trim().length > 0
      )
    },
  },

  async mounted() {
    try {
      switch (this.$route.query.type) {
        case 'Blog':
          this.showAttachedPreview = true
          await this.fetchBlogData()
          break
        case 'Post':
          this.showAttachedPreview = true
          await this.fetchPostData()
          break
      }
    } catch (e) {
      this.unableToLoadPreview = true
    }
  },

  methods: {
    async fetchBlogData() {
      this.blogData = await this.$axios.$get(endpoints.blog.info, {
        params: {
          identifier: this.$route.query.identifier,
        },
      })
    },

    async fetchPostData() {
      this.postData = await this.$axios.$get(
        endpoints.community_service.posts.detail.replace(
          '{identifier}',
          this.$route.query.identifier
        )
      )
    },

    async raiseTicket() {
      this.raisingTicking = true

      try {
        await this.$axios.$post(endpoints.help_and_support.create, {
          issueTopic: this.issueTopic,
          contentType: this.$route.query.type,
          uniqueID: this.$route.query.identifier,
          issueDetails: this.issueDetails,
        })
        await this.$router.replace(
          navigationRoutes.Home.MoreOptions.HelpAndSupport.index
        )
      } catch (e) {
        await showUITip(this.$store, 'Network Error, Please Retry.', 'error')
      } finally {
        this.raisingTicking = false
      }
    },
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

.contact-support-page {
  button {
    min-width: auto;
    width: auto;
  }

  textarea {
    border: $single-unit solid $card-bg;
    padding: $milli-unit;
    border-radius: $nano-unit;
    box-shadow: $default-box-shadow;
    background: $body-bg-alternate;
    color: $muted;
    resize: none;
    font-family: $Nunito-Sans;
    font-weight: 300;

    &:focus {
      border: $single-unit solid $secondary-vibrant;
      color: $secondary;
    }
  }

  .form-hints {
    small {
      display: block;
      font-weight: 400;
      font-size: 13px;
    }
  }

  aside.loader {
    position: fixed;
    top: $zero-unit;
    left: $zero-unit;
    right: $zero-unit;
    bottom: $zero-unit;
    z-index: $bring-to-front;
    background: rgba($black, 0.7);
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.soft-error {
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
    }
  }

  main,
  footer {
    max-width: $large-screen;
    margin: auto;
  }
}
</style>

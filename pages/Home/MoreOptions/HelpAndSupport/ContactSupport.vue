<template>
  <AppFeel
    :on-back="navigationRoutes.Home.MoreOptions.HelpAndSupport.index"
    class="contact-support-page"
  >
    <template v-slot:app-bar-title> {{ pageTitle }}</template>

    <template v-slot:app-bar-action-button>
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

    <template v-slot:main>
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
    </template>

    <template v-slot:footer>
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

      <transition name="scale-up">
        <aside v-if="raisingTicking" class="app-overlay">
          <FallBackLoader>
            <template v-slot:fallback>
              <p>Raising Ticket</p>
            </template>
          </FallBackLoader>
        </aside>
      </transition>
    </template>
  </AppFeel>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import endpoints from '~/api/endpoints'
import { showUITip } from '~/utils/utility'

export default {
  name: 'ContactSupport',
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
    border: $single-unit solid $card-background;
    padding: $milli-unit;
    border-radius: $nano-unit;
    box-shadow: $default-box-shadow;
    background: $segment-background;
    color: $muted;
    resize: none;
    font-family: $Nunito-Sans;
    font-weight: 300;

    &:focus {
      border: $single-unit solid $vibrant;
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

  aside.app-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba($segment-background, 0.9);
    backdrop-filter: blur(1px);
    box-shadow: $default-box-shadow;
    display: grid;
    place-items: center;
  }
}
</style>

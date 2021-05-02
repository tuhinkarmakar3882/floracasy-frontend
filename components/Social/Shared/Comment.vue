<template>
  <transition name="scale-up">
    <div v-if="showComment" class="comment-component">
      <img
        :src="comment.user.photoURL"
        alt="profile-image"
        height="40"
        width="40"
        @click="openProfile"
      />

      <main class="content">
        <section class="top-line">
          <nuxt-link v-ripple :to="profileLink" class="username">
            {{ comment.user.displayName }}
          </nuxt-link>

          <aside>
            <small class="timestamp">
              {{ getRelativeTime(comment.createdAt) }}
            </small>
            <i
              v-ripple
              class="mdi mdi-dots-vertical"
              @click="showOptions = !showOptions"
            />
          </aside>
        </section>

        <p class="body">{{ comment.message }}</p>
      </main>

      <transition name="gray-shift">
        <OptionsList v-if="showOptions">
          <template #list-options>
            <li
              v-if="allowedToDelete"
              v-ripple="`#ffcf005F`"
              class="py-2 px-6 list-option"
              @click="deleteComment"
            >
              <i class="icon mdi mdi-delete delete-color" />
              Delete Comment
            </li>

            <li
              v-ripple="`#ff82825F`"
              class="py-2 px-6 list-option"
              @click="reportComment"
            >
              <i class="icon mdi mdi-alert-octagon danger-light" />
              Report Comment
            </li>

            <li class="my-0 py-2 px-4" style="display: block">
              <hr class="my-0" style="background-color: #464646" />
            </li>

            <li v-ripple="`#ff82815f`" class="py-2 px-4 list-option">
              <p
                class="danger-light text-center my-0"
                style="width: 100%"
                @click="showOptions = false"
              >
                Close
              </p>
            </li>
          </template>
        </OptionsList>
      </transition>

      <transition name="gray-shift">
        <aside
          v-if="showOptions"
          class="overlay"
          @click="showOptions = false"
        />
      </transition>
    </div>
  </transition>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'
import { getRelativeTime, showUITip } from '~/utils/utility'
import OptionsList from '~/components/Common/Tools/OptionsList'
import { mapGetters } from 'vuex'
import endpoints from '~/api/endpoints'

export default {
  name: 'Comment',

  components: { OptionsList },

  props: {
    comment: {
      type: Object,
      required: true,
    },
    ownerUid: {
      type: String,
      required: true,
    },
    commentType: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      showOptions: false,
      showComment: true,
      deleteEndpoint: undefined,
      payload: undefined,
    }
  },

  computed: {
    allowedToDelete() {
      return (
        this.comment.userUID === this.user.uid ||
        this.ownerUid === this.user.uid
      )
    },
    profileLink() {
      return navigationRoutes.Home.Account.Overview.replace(
        '{userUID}',
        this.comment?.userUID
      )
    },
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  mounted() {
    switch (this.commentType) {
      case 'Blog':
        this.deleteEndpoint = endpoints.comment_system.blog.delete
        this.payload = {
          commentIdentifier: this.comment.commentIdentifier,
          blogIdentifier: this.comment.blogIdentifier,
        }
        break

      case 'Post':
        this.deleteEndpoint = endpoints.comment_system.post.delete
        this.payload = {
          commentIdentifier: this.comment.commentIdentifier,
          postIdentifier: this.comment.postIdentifier,
        }
        break
    }
  },

  methods: {
    getRelativeTime,

    async openProfile() {
      await this.$router.push(this.profileLink)
    },

    async reportComment() {
      await this.$router.push({
        path: navigationRoutes.Home.MoreOptions.HelpAndSupport.ContactSupport,
        query: {
          type: this.commentType + 'Comment',
          identifier: this.comment.commentIdentifier,
        },
      })
    },

    async deleteComment() {
      if (!this.allowedToDelete) return

      const confirmDeletion = confirm('Are you sure?')

      if (confirmDeletion) {
        try {
          this.showComment = false

          await this.$axios.$post(this.deleteEndpoint, this.payload)

          await showUITip(this.$store, 'Successfully Deleted!', 'success')
        } catch (e) {
          await showUITip(
            this.$store,
            'Failed To Delete Comment. Try Again',
            'error'
          )
          this.showComment = true
        } finally {
          this.showOptions = false
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.comment-component {
  display: flex;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }

  img {
    width: 2 * $standard-unit;
    height: 2 * $standard-unit;
    object-position: center;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: $default-box-shadow;
  }

  main.content {
    width: 100%;
    margin-left: $small-text-unit;
    background-color: $body-bg-alternate;
    padding: 0 0 $small-text-unit $small-text-unit;
    border-radius: $zero-unit $micro-unit $micro-unit $micro-unit;
    box-shadow: $default-box-shadow;

    .top-line {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;

      a {
        text-transform: capitalize;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 40%;
        white-space: nowrap;
        font-size: $average-unit;
        text-decoration: none;
        color: $secondary;
      }

      aside {
        display: flex;
        justify-content: center;
        align-items: center;

        .timestamp {
          font-family: $Nunito-Sans;
          font-size: $small-text-unit;
          color: $disabled;
        }

        i {
          display: grid;
          place-items: center;
          color: $secondary;
          height: 2 * $large-unit;
          width: 2 * $large-unit;
          font-size: $large-unit;
          padding: $zero-unit;
          border-top-right-radius: $micro-unit;
        }
      }
    }

    .body {
      font-size: $standard-unit;
      font-weight: 300;
      white-space: pre-line;
    }
  }

  aside.overlay {
    position: fixed;
    background: rgba($black, 0.6);
    top: $zero-unit;
    left: $zero-unit;
    right: $zero-unit;
    bottom: $zero-unit;
    z-index: 1;
  }
}
</style>

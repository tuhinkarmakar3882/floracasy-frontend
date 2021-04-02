<template>
  <transition name="slide-left">
    <div v-if="!hidePost" class="community-post-component">
      <section class="post-header px-4 mb-2">
        <img
          :alt="post.user.displayName"
          :src="post.user.photoURL"
          class="mr-3"
        />
        <div class="details">
          <p v-ripple class="secondary">
            <nuxt-link
              v-ripple
              :to="
                navigationRoutes.Home.Account.Overview.replace(
                  '{userUID}',
                  post.user.uid
                )
              "
              class="no-underline"
            >
              {{ post.user.displayName }}
            </nuxt-link>
          </p>
          <small>
            <span class="mdi mdi-clock-outline mr-1" />
            <em>{{ getRelativeTime(post.createdAt) }}</em>
          </small>
        </div>
        <i
          v-if="showMoreOption"
          v-ripple="'#4f4f4f5F'"
          class="mdi mdi-dots-vertical mr-2 inline-block align-middle ml-auto"
          @click="showOptions = !showOptions"
        />
      </section>

      <transition name="gray-shift">
        <div v-if="showOptions" class="options">
          <ul>
            <li
              v-if="post.userUID === user.uid"
              v-ripple="`#ffcf005F`"
              class="py-2 px-6"
              @click="deletePost"
            >
              <span class="icon mdi mdi-delete" style="color: #ffcf00" />
              Delete Post
            </li>
            <li v-ripple="`#ff82825F`" class="py-2 px-6" @click="reportPost">
              <span class="icon mdi mdi-alert-octagon danger-light" />
              Report Post
            </li>
            <li class="my-0 py-2 px-4" style="display: block">
              <hr class="my-0" style="background-color: #464646" />
            </li>
            <li v-ripple="`#ff82815f`" class="py-2 px-4">
              <p
                class="danger-light text-center my-0"
                style="width: 100%"
                @click="showOptions = false"
              >
                Close
              </p>
            </li>
          </ul>
        </div>
      </transition>

      <section class="post-body py-4 px-4">
        <p
          v-if="post.body"
          v-ripple
          :style="post.style"
          @click="viewPostDetails"
        >
          {{
            expanded
              ? post.body
              : `${post.body.substr(0, 100)} ${
                  post.body.length > 99 ? '...' : ''
                }`
          }}
          <nuxt-link
            v-if="!expanded && post.body.length > 99"
            class="no-underline"
            :to="
              navigationRoutes.Home.Community.Posts.detail.replace(
                '{postIdentifier}',
                post.identifier
              )
            "
          >
            Read More
          </nuxt-link>
        </p>

        <img
          v-if="post.image"
          :src="post.image"
          alt="image"
          class="mt-4"
          @click="viewPostDetails"
        />

        <AudioPlayer
          v-if="post.audio"
          :audio-source="post.audio"
          class="mt-4 mx-auto"
        />
      </section>

      <hr class="faded-divider mt-2 mb-0" />

      <section class="post-actions px-4">
        <div v-if="showLikeOption" v-ripple class="like" @click="like">
          <i
            :class="post.isLiked ? 'mdi-heart' : 'mdi-heart-outline'"
            class="mdi mr-2 inline-block align-middle"
          />
          <span class="value inline-block align-middle">
            {{ shorten(post.totalLikes) }}
          </span>
        </div>

        <div
          v-if="showCommentOption"
          v-ripple
          class="comment"
          @click="viewPostDetails"
        >
          <i class="mdi mdi-message-text mr-2 inline-block align-middle" />
          <span class="value inline-block align-middle">
            {{ shorten(post.totalComments) }}
          </span>
        </div>

        <div v-if="showShareOption" v-ripple class="share" @click="share">
          <i class="mdi mdi-share-variant mr-2 inline-block align-middle" />
          <span class="value inline-block align-middle">
            {{ shorten(post.totalShares) }}
          </span>
        </div>
      </section>

      <hr class="reversed-faded-divider mt-0 mb-2" />

      <transition name="slide-left">
        <ShareFallbackForDesktop
          v-if="useShareFallBack"
          :handle-close="hideFallback"
          :link-url="`https://floracasy.com/Home/Community/Posts/${post.identifier}`"
          :description="post.body || 'View this Post on Floracasy'"
        />
      </transition>
    </div>
  </transition>
</template>

<script>
import { getRelativeTime, shorten, showUITip } from '@/utils/utility'
import { mapGetters } from 'vuex'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import endpoints from '~/api/endpoints'

export default {
  name: 'CommunityPost',

  props: {
    post: {
      type: Object,
      required: true,
    },
    showCommentOption: {
      type: Boolean,
      default: true,
    },
    showLikeOption: {
      type: Boolean,
      default: true,
    },
    showShareOption: {
      type: Boolean,
      default: true,
    },
    showMoreOption: {
      type: Boolean,
      default: true,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      navigationRoutes,
      showOptions: false,
      hidePost: false,
      useShareFallBack: false,
    }
  },

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  methods: {
    shorten,
    getRelativeTime,

    async viewPostDetails() {
      await this.$router.push(
        navigationRoutes.Home.Community.Posts.detail.replace(
          '{postIdentifier}',
          this.post.identifier
        )
      )
    },

    async like() {
      try {
        const action = await this.$axios
          .$post(endpoints.community_service.posts.like, {
            identifier: this.post.identifier,
          })
          .then(({ action }) => action)
        action === 'like-post' ? this.post.totalLikes++ : this.post.totalLikes--
        this.post.isLiked = !this.post.isLiked
      } catch (e) {
        await showUITip(this.$store, 'Unable to Like Post', 'warning')
      }
    },

    async share() {
      if (navigator.share) {
        try {
          await navigator.share({
            title: this.post.body + '- Floracasy',
            text: this.post.body || 'View this Post on Floracasy',
            url: navigationRoutes.Home.Community.Posts.detail.replace(
              '{postIdentifier}',
              this.post.identifier
            ),
          })
          try {
            await this.$axios
              .$post(endpoints.post.share, {
                identifier: this.post.identifier,
              })
              .then(() => {
                this.post.totalShares++
              })
          } catch (e) {
            this.post?.totalShares && this.post.totalShares--
          }
        } catch (error) {
          await showUITip(this.$store, 'Network Error', 'error')
        }
      } else {
        this.useShareFallBack = !this.useShareFallBack
      }
    },

    async reportPost() {
      await this.$router.push({
        path: navigationRoutes.Home.MoreOptions.HelpAndSupport.ContactSupport,
        query: {
          type: 'Post',
          identifier: this.post.identifier,
        },
      })
    },

    async deletePost() {
      if (this.post.userUID !== this.user.uid) return

      const confirmDeletion = confirm('Are you sure?')
      if (confirmDeletion) {
        try {
          this.hidePost = true
          await this.$axios.$post(endpoints.community_service.posts.delete, {
            identifier: this.post.identifier,
          })
          await showUITip(this.$store, 'Successfully Deleted!', 'success')
        } catch (e) {
          await showUITip(
            this.$store,
            'Failed To Delete Post. Try Again',
            'error'
          )
          this.hidePost = false
        }
      }
    },

    hideFallback() {
      this.useShareFallBack = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.community-post-component {
  position: relative;

  .post-body {
    img {
      border-radius: 0 20px;
      height: 250px;
      width: 100%;
      object-fit: scale-down;
      box-shadow: $default-box-shadow;
    }
  }

  .post-header {
    display: flex;
    position: relative;

    $image-size: 3.1rem;

    img {
      min-width: $image-size;
      min-height: $image-size;
      height: $image-size;
      width: $image-size;
      object-fit: cover;
      border-radius: 50%;
      box-shadow: $default-box-shadow;
    }

    .details {
      p {
        font-weight: 400;
        line-height: 23px;
        margin-bottom: 0.5rem;
      }

      small {
        display: flex;
        align-items: center;
        font-size: 0.8rem;
        line-height: 16px;

        .dot {
          display: inline-block;
          height: $nano-unit;
          width: $nano-unit;
          background: $muted;
          border-radius: 50%;
        }
      }
    }

    i {
      position: absolute !important;
      right: -8px;
      top: 0;
      height: 100%;
      font-size: $x-large-unit;
      width: 2 * $large-unit;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      color: $secondary-matte;
      border-radius: $nano-unit;
    }
  }

  .options {
    position: absolute;
    background: $card-background;
    border-radius: $nano-unit;
    right: $large-unit;
    top: 3 * $medium-unit;
    box-shadow: $down-only-box-shadow;
    max-width: 300px;
    min-width: 232px;
    z-index: $bring-to-front - 100;
    transition: all 150ms ease-in-out;

    ul {
      list-style: none;
      margin: 0;
      padding: $micro-unit 0;

      li {
        display: flex;
        align-items: center;
        color: #dadada;
        margin: 0;
      }
    }

    .icon {
      font-size: $large-unit;
      margin-right: $micro-unit;
    }
  }

  .post-actions {
    font-family: $Nunito-Sans;
    color: $secondary;
    font-size: 1.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      display: flex;
      justify-content: center;
      height: 2 * $large-unit;
      width: 100%;
      align-items: center;

      .value {
        color: $muted;
        font-size: 1rem;
      }
    }
  }
}
</style>

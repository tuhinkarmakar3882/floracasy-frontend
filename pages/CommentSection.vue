<template>
  <div class="comment-section">
    <h2 class="comments-title">
      Comments
      <span v-show="numberOfTotalComments > 0" class="comments-count">{{
          numberOfTotalComments
        }}</span>
    </h2>

    <hr/>

    <div class="row">
      <div class="dbx">
        <div class="dbx">
          <label>
            Hello
            <textarea v-model="comment" rows="1"/>
          </label>
        </div>
        <div class="icon">
          <button @click="addComment">
            <span class="inside"> mdi-send </span>
          </button>
        </div>
        <div class="comments-container">
          <ul class="comments-list"></ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/api/data/comments.json'

export default {
  name: 'CommentSection',
  components: {},
  data() {
    return {
      comment: '',
      comments: [],
      numberOfTotalComments: 0,
      response: [],
    }
  },
  methods: {
    addComment() {
      if (this.isValid(this.comment)) {
        this.comments.push(this.comment)
        this.numberOfTotalComments++
      }
      this.comment = ''
    },

    isValid(comment) {
      return comment.trim().length > 0
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/variables';

.comment-section {
  .comments-title {
    font-size: 36px;
    color: $primary;
    letter-spacing: 1px;
    font-family: $Nunito;

    .comments-count {
      color: #ba384b;
    }
  }

  .comments-list {
    list-style: none;
    padding-left: 0;
  }

  .icon {
    margin-top: 0.5em;
    padding-left: 0;
  }

  .box {
    padding-right: 0;
  }

  .align {
    margin-left: 5%;
    margin-right: 20%;
  }
}
</style>

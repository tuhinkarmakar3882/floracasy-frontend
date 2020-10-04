<template>
  <v-container class="comment-section">
    <h2 class="comments-title">
      Comments
      <span v-show="numberOfTotalComments > 0" class="comments-count">{{ numberOfTotalComments }}</span>
    </h2>

    <v-divider/>

    <v-row>
      <v-col class="box" cols="12" md="9">
        <v-row>
          <v-col class="box" cols="9">
            <v-textarea
                v-model="comment"
                label="Write your thoughts here"
                auto-grow
                rows="1"
                row-height="10"
                hint="feedback"
                outlined
            />
          </v-col>
          <v-col class="icon" cols="3">
            <v-btn text @click="addComment">
              <v-icon class="inside" color='#ba384b' large>mdi-send</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="12" class="comments-container">
            <ul class="comments-list">
              <li v-for="comment in comments" :key="comment" class="comment-list-item">
                <v-avatar color='#ba384b'>
                  <span class="white--text headline-text">CJ</span>
                </v-avatar> &nbsp; Name Sits <br><br>
                <p class="align">{{ comment }}</p>
              </li>
            </ul>
          </v-col>
        </v-row>

      </v-col>

    </v-row>


  </v-container>
</template>

<script>
import '@/api/data/comments.json'

export default {
  name: 'CommentSection',
  components: {},
  data() {
    return {
      comment: "",
      comments: [],
      numberOfTotalComments: 0,
      response: []
    }
  },
  methods: {
    addComment() {
      if (this.isValid(this.comment)) {
        this.comments.push(this.comment);
        this.numberOfTotalComments++;
      }
      this.comment = "";
    },

    isValid(comment) {
      return comment.trim().length > 0;
    },

  }
}
</script>

<style lang="scss" scoped>

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
    margin-top: .5em;
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

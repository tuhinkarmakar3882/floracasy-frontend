<template>
  <v-container class="comment-section">
    <h2 class="comments-title">
      Comments
      <span v-show="numberOfTotalComments > 0" class="comments-count">{{ numberOfTotalComments }}</span>
    </h2>
    <hr class="fine-line">

    <v-row>
      <v-col cols="12" sm="9">
        <v-text-field v-model="comment" label="Write your thoughts here" outlined required/>
      </v-col>
      <v-col cols="12" sm="3">
        <v-btn text @click="addComment">
          <v-icon color='#ba384b' large>mdi-send</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <ul style="list-style-type:none;">
      <li v-for="item in comments" :key="item">
        <v-avatar color='#ba384b'>
          <span class="white--text headline">CJ</span>
        </v-avatar> &nbsp; Name Sits<br><br>{{ item }}<br><br>
      </li>
    </ul>
  </v-container>
</template>

<script>

export default {
  name: 'CommentSection',
  data() {
    return {
      comment: "",
      comments: [],
      numberOfTotalComments: 0
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
@import 'styles/themeData';

.comment-section {

  .comments-title {
    font-size: 36px;
    color: $semiDark;
    letter-spacing: 1px;
    font-family: $comfortaa;

    .comments-count {
      color: #ba384b;
    }

  }

}
</style>

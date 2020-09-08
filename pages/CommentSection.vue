<template>
  <v-container class="comment-section">
    <h2 class="comments-title">
      Comments
      <span v-show="numberOfTotalComments > 0" class="comments-count">{{ numberOfTotalComments }}</span>
    </h2>

    <v-divider/>


    <!--   Todo ---------- The items in the below row are not in center I guess ------------- -->
    <v-row>
      <v-col class="box" cols="9">
        <v-text-field v-model="comment" label="Write your thoughts here" outlined required/>
      </v-col>
      <v-col class="box" cols="3">
        <v-btn text @click="addComment">
          <v-icon color='#ba384b' large>mdi-send</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <ul class="comments-list">
      <li v-for="comment in comments" :key="comment" class="comment-list-item">
        <v-avatar color='#ba384b'>
          <span class="white--text headline">CJ</span>
        </v-avatar> &nbsp; Name Sits<br><br>{{ comment }}
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

  .comments-list {
    list-style: none;

    .comment-list-item {
      margin: 24px 0;
    }
  }

}
</style>

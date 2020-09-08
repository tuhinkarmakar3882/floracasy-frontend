<template>
  <v-container>
    <pre><span id='section_title'>Comments</span>  <span id="comments_count" v-show="number_of_comments>0">{{ number_of_comments }}</span></pre>
    <hr>
    <v-row>
       <v-col cols="12" sm="9">
        <v-text-field
            v-model="comment"
            label="Write your thoughts here"
            required
            outlined            
        ></v-text-field>
       </v-col>
      <v-col cols="12" sm="3">
        <v-btn text @click="addComment"><v-icon large color='#ba384b'>mdi-send</v-icon></v-btn>
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
      number_of_comments: 0
    }
  },
  methods: {
    addComment() {
      if (this.isValid(this.comment)){
        this.comments.push(this.comment);
        this.number_of_comments += 1
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
#section_title {
  font-size: 25px;
  opacity: 0.5;
}
#comments_count{
  color:#ba384b;
}

</style>
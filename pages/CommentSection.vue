<template>
  <v-container>
    <v-text-field
        v-model="comment"
        label="Comment"
        required
    ></v-text-field>

    <v-btn color="primary" @click="addComment">Add Comment</v-btn>
    <ul id="example-1">
      <li v-for="item in comments" :key="item">
        {{ item }}
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
      comments: []
    }
  },
  methods: {
    addComment() {
      if (this.isValid(this.comment))
        this.comments.push(this.comment);

      this.comment = "";
    },

    isValid(comment) {
      return comment.trim().length > 0;
    },

  }
}
</script>

<template>
<div>
    <input v-model="comment" type="text">
    <button @click="addComment">Click</button>
    <ul id="example-1">
        <li v-for="item in comments" :key="item">
            {{ item }}
        </li>
    </ul>
</div>
</template>

<script>
export default{
    name : 'CommentSection',
    data() {
    return {
        comment : "",
        comments : []
    }
  },
  methods : {
      addComment(){
          if(this.isValid(this.comment))
            this.comments.push(this.comment);
            this.comment = "";
      },
      isValid(comment){
        return comment.trim().length>0;
      }
    }
}
</script>
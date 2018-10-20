<template id="post-template">
  <li class="list-group-item">
    <i class="glyphicon glyphicon-chevron-up" @click="upvote" :class="{disabled: upvoted}"></i>
    <span class="label label-primary">{{ votes }}</span>
    <i class="glyphicon glyphicon-chevron-down" @click="downvote" :class="{disabled: downvoted}"></i>
    <a>{{ post.title }}</a>
  </li>
</template>

<script>
import CommentService from '../services/CommentService.js'
export default {
  data () {
    return {
      comments: [],
      feedback: ''
    }
  },
  methods: {
    async getComments () {
      const response = await CommentService.getComments({ code: this.$route.params.id })
      this.courses = response.data.comments
    },
    async addComment () {
      await CommentService.addComment({
        user: this.$store.state.user,
        course: this.$route.params.id,
        content: this.feedback
      })
    }
  }
}
</script>

<style>

</style>

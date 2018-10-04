<template>
  <div>
    <h4>Comments</h4>
    <div v-if="$store.state.authenticated">
      <textarea id="feedback" placeholder="Leave a comment" v-model="feedback"></textarea>
    </div>
    <ul v-for="comment in comments" v-bind:key="comment">
      <li>{{comment.content}}</li>
    </ul>
  </div>
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
        created: Date.now(),
        content: this.feedback
      })
    }
  }
}
</script>

<style>

</style>

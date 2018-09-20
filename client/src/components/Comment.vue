<template>
  <div>
    <h4>Comments</h4>
    <ul v-for="comment in comments" v-bind:key="comment">
      <li>{{comment.content}}</li>
    </ul>
  </div>
</template>

<script>
import CommentService from '@/services/CommentService'
export default {
  data () {
    return {
      comments: []
    }
  },
  methods: {
    async getComments () {
      const response = await CommentService.getComments($route.params.id)
      this.comments = response.data.comments
    }
  }
}
</script>

<style>

</style>

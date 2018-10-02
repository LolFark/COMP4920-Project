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
<<<<<<< HEAD
      const response = await CommentService.getComments($router.params.id)
=======
      const response = await CommentService.getComments($route.params.id)
>>>>>>> ea4c8b062c261d34e8b72c4330c90e45ce4de4fa
      this.comments = response.data.comments
    }
  }
}
</script>

<style>

</style>

<template>
  <div>
    <h4>Comments</h4>
    <ul v-for="comment in comments" v-bind:key="comment">
      <li>{{comment.content}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comments: []
    }
  },
  methods: {
    async getComments () {
    }
  }
}
</script>

<style>

</style>

<template>
  <div class="user_page">
    <h1>User {{ $route.params.username }}</h1>
    <p>{{ user }}</p>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
export default {
  data () {
    return {
      name: 'user_page',
      username: this.$route.params.username,
      user: []
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    async getUser () {
      const response = await UserService.getUser({
        username: this.username
      })
      this.user = response.data.user
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>

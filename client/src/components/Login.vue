<template>
  <div>
    <h4>Login</h4>
    <form id="login"
    autocomplete="off">
      <p v-if="error">{{ error }}</p>
      <label for="username">Username</label>
      <div>
        <input id="username" type="text" v-model="username" autofocus>
      </div>
      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password">
      </div>
      <div>
        <!-- have to change this button later cuz it prevents reloads-->
        <v-btn v-on:click="login()">Login</v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      console.log('Logging in with ' + this.username + ' ' + this.password)
      try {
        const response = await AuthenticationService.login({
          username: this.username,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        console.log(response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'Courses'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style>

</style>

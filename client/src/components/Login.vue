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
        <button type="submit" @click="login">
          Login
        </button>
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
    async login (e) {
      console.log('Logging in with ' + this.username + ' ' + this.password)
      try {
        await AuthenticationService.login({
          username: this.username,
          password: this.password
        })
      } catch (error) {
        this.error = error.response.data.error
        e.preventDefault()
      }
    }
  }
}
</script>

<style>

</style>

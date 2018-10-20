<template>
  <div class="container2">
    <div class="login_box">
      <h4>Login</h4>
      <form id="login"
      autocomplete="off">
        <p v-if="error">{{ error }}</p>
        <v-layout justify-center>
          <v-flex xs12 sm6 md3 justify-center>
            <v-text-field
              label="Username"
              v-model="username"
            ></v-text-field>
            <v-text-field
              label="Password"
              :type="'password'"
              v-model="password"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <div>
          <!-- have to change this button later cuz it prevents reloads-->
          <v-btn v-on:click="login()">Login</v-btn>
        </div>
      </form>
    </div>
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
.container2{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  background: rgb(144, 146, 137);
}
.login_box{
  flex:1;
  padding:80px
}

</style>

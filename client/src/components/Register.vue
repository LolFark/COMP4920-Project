<template>
  <div>
    <h1>Sign up</h1>
    <form id="register"
    autocomplete="off">
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
      </p>
            <label for="username">Username</label>
            <div>
                <input id="username" type="text" v-model="username" autofocus>
            </div>

            <label for="email" >E-Mail Address</label>
            <div>
                <input id="email" type="email" v-model="email" >
            </div>

            <label for="password">Password</label>
            <div>
                <input id="password" type="password" v-model="password" >
            </div>

            <label for="password-confirmation">Confirm Password</label>
            <div>
                <input id="password-confirmation" type="password" v-model="password_confirmation" >
            </div>
            <div>
                <button type="submit" @click="register">
                    Register
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
      email: '',
      password: '',
      password_confirmation: '',
      errors: [],
      success: ''
    }
  },

  methods: {
    register: async function (e) {
      this.error = []
      if (!this.username) {
        this.errors.push('Name required.')
      }
      if (!this.email) {
        this.errors.push('Email required.')
      } else if (!this.validEmail(this.email)) {
        this.errors.push('University email required.')
      }
      if (this.password !== this.password_confirmation) {
        this.errors.push('Passwords do not match')
      }

      if (!this.errors.length) {
        const response = await AuthenticationService.register({
          username: this.username,
          email: this.email,
          password: this.password
        })
        this.errors.push(response.data.error)
      }
      e.preventDefault()
    },
    validEmail: function (email) {
      var re = /edu\.au/
      return re.test(email)
    }
  }
}
</script>

<style>

</style>

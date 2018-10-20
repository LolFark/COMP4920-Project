<template>
  <div class="registerContainer">
    <h1>Sign up</h1>
    <form id="register" autocomplete="off">
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
      </p>
      <div v-if="success === true">
        <p>Successfully created {{ username }}</p>
      </div>
      <div v-else>
        <v-layout justify-center>
          <v-flex xs12 sm6 md3 justify-center>
            <div class="username_box">
              <div>
                <v-text-field
                label="Username"
                v-model="username"
                ></v-text-field>
              </div>
            </div>
            <div class="email_box">
              <div>
                <v-text-field
                  label="E-mail Address"
                  v-model="email"
                ></v-text-field>
              </div>
            </div>
            <div class="password_box">
              <label for="password">Password</label>
              <div>
                  <vue-password v-model="password" classes="input"> </vue-password>
              </div>
            </div>
            <div class="confirm_box">
              <div>
                <v-text-field
                label="Confirm Password"
                v-model="password_confirmation"
                :type="'password'"
                id="password-confirmation"
              ></v-text-field>
              </div>
            </div>
            <div class="button_box">
              <div>
                  <v-btn v-on:click="register()">Register</v-btn>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </div>
    </form>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import VuePassword from 'vue-password'

export default {
  components: {
    VuePassword
  },
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
      this.errors = []
      if (!this.username) {
        this.errors.push('Name required.')
      }
      if (!this.email) {
        this.errors.push('Email required.')
      } else if (!this.isStudentEmail(this.email)) {
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
        if (response.data.error) {
          this.errors.push(response.data.error)
        } else {
          this.$router.push({
            name: 'Courses'
          })
        }
      }
      // this.$router.push({
      //   name: 'Courses'
      // })
      e.preventDefault()
    },
    isStudentEmail: function (email) {
      var re = /edu\.au$/
      return re.test(email)
    }
  }
}
</script>

<style>
.registerContainer{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  background: rgb(144, 146, 137);
}
.username_box{
  flex: 1;
  position: relative;
  top: 40px
}
.email_box{
  flex: 1;
  position: relative;
  top: 60px
}
.password_box{
  flex: 1;
  position: relative;
  top: 80px
}
.confirm_box{
  flex: 1;
  position: relative;
  top: 100px
}
.button_box{
  flex: 1;
  position: relative;
  top: 120px
}
</style>

<template>
  <div class="user_page">
    <h1>User {{ user.username }}</h1>
    <table v-if="user === null">
      <h2><b>USER DOES NOT EXIST</b></h2>
    </table>
    <table class="user_info" v-if="user !== null">
      <tr class="name"><b>Name: </b>{{ user.username }}</tr>
      <tr v-if="$store.state.authenticated && $store.state.user.username === user.username"
        class="email"><b>Email: </b>{{ user.email }}</tr>
      <tr class="description"><b>Description: </b>{{ user.description }}</tr>
    </table>
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
    </p>
    <p v-else-if="message.length"><b>{{ message }}</b></p>
    <div v-if="change_password === true">
      <label for="old_password">Old password: </label>
      <input type="password" id="old_password" v-model="old_password">
      <br>
      <label for="new_password">New password: </label>
      <input type="password" id="new_password" v-model="new_password">
      <br>
      <label for="confirm_password">Confirm password: </label>
      <input type="password" id="confirm_password" v-model="confirm_password">
      <br>
      <v-btn v-on:click="cancel()">Cancel</v-btn>
      <v-btn v-on:click="changePassword()">Save</v-btn>
    </div>
    <div v-else-if="edit === true">
      <label for="description">Description: </label>
      <br>
      <textarea id="description" v-model="description"></textarea>
      <br>
      <v-btn v-on:click="cancel()">Cancel</v-btn>
      <v-btn v-on:click="changeProfile()">Save</v-btn>
    </div>
    <div v-else>
      <p v-if="$store.state.authenticated && $store.state.user.username === user.username">
        <v-btn v-on:click="startChangePassword()">Change Password</v-btn>
        <v-btn v-on:click="startChangeProfile()">Edit</v-btn>
      </p>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
export default {
  data () {
    return {
      name: 'user_page',
      username: this.$route.params.username,
      user: [],

      edit: false,
      description: '',

      change_password: false,
      old_password: '',
      new_password: '',
      confirm_password: '',

      message: '',
      errors: []
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
      this.description = this.user.description
    },
    startChangePassword () {
      this.change_password = true
      this.edit = false
      this.message = ''
    },
    async changePassword () {
      this.errors = []
      if (this.old_password === this.new_password) {
        this.errors.push('No changes in password')
      } else if (this.new_password !== this.confirm_password) {
        this.errors.push('Please confirm new password')
      } else {
        const response = await UserService.updatePassword({
          username: this.$store.state.user.username,
          old_password: this.old_password,
          new_password: this.new_password
        })
        this.user = response.data.user
        if (response.data.error) {
          this.errors.push(response.data.error)
        } else {
          this.message = response.data.message
          this.cancel()
        }
      }
    },
    startChangeProfile () {
      this.edit = true
      this.change_password = false
      this.message = ''
    },
    async changeProfile () {
      this.errors = []
      if (this.description === this.user.description) {
        this.errors.push('No changes in profile')
      } else {
        const response = await UserService.updateProfile({
          username: this.$store.state.user.username,
          description: this.description
        })
        this.user = response.data.user
        if (response.data.error) {
          this.errors.push(response.data.error)
        } else {
          this.message = response.data.message
          this.cancel()
        }
      }
    },
    cancel () {
      this.edit = false
      this.change_password = false
      this.old_password = ''
      this.new_password = ''
      this.errors = []
      this.description = this.user.description
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
.user_info {
  text-align: left
}
</style>

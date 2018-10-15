<template>
  <div class="user_page">
    <h1>User {{ user.username }}</h1>
    <!-- If user does not exist in database -->
    <table v-if="user === null">
      <h2><b>USER DOES NOT EXIST</b></h2>
    </table>
    <!-- If user does exist in database, display user details -->
    <table class="user_info" v-if="user !== null">
      <tr class="name"><b>Name: </b>{{ user.username }}</tr>
      <tr v-if="$store.state.authenticated && $store.state.user.username === user.username"
        class="email"><b>Email: </b>{{ user.email }}</tr>
      <tr class="description"><b>Description: </b>{{ user.description }}</tr>
    </table>
    <!-- Display any errors if any when changing password or editing user information -->
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
    </p>
    <!-- Display message if something success was done -->
    <p v-else-if="message.length"><b>{{ message }}</b></p>
    <!-- If change password is selected -->
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
    <!-- If edit user information is selected -->
    <div v-else-if="edit === true">
      <label for="email">Email: </label>
      <input type="text" id="email" v-model="email">
      <br>
      <label for="description">Description: </label>
      <br>
      <textarea id="description" v-model="description"></textarea>
      <br>
      <v-btn v-on:click="cancel()">Cancel</v-btn>
      <v-btn v-on:click="changeProfile()">Save</v-btn>
    </div>
    <!-- If user is logged in and on their own page -->
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

      // Edit user information
      edit: false,
      email: '',
      description: '',

      // Change password information
      change_password: false,
      old_password: '',
      new_password: '',
      confirm_password: '',

      // Returned from backend to display
      message: '',
      errors: []
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    // Gets specific user from database
    async getUser () {
      const response = await UserService.getUser({
        username: this.username
      })
      this.user = response.data.user
      this.email = this.user.email
      this.description = this.user.description
    },
    // Set data to start password change option
    startChangePassword () {
      this.change_password = true
      this.edit = false
      this.message = ''
    },
    /* Reset errors each time save is selected
    Basic front end checking before going to database
    If passed, pass through username to find in database, old password and new password
    If an error is returned display it
    If successful, set everything back to default with success message
    */
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
    // Set data to start edit option
    startChangeProfile () {
      this.edit = true
      this.change_password = false
      this.message = ''
    },
    /* Reset errors each time save is selected
    Check if no data has been changed
    Send username to find in database and data to be updated
    If an error is returned display it
    If successfull, set everything back to default with success message
    */
    async changeProfile () {
      this.errors = []
      if (this.description === this.user.description && this.email === this.user.email) {
        this.errors.push('No changes in profile')
      } else if (!this.email.match(/z[0-9]{7}@student.unsw.edu.au/)) {
        this.errors.push('Not a valid student email')
      } else {
        const response = await UserService.updateProfile({
          username: this.$store.state.user.username,
          email: this.email,
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
    // Restore everything back to default
    cancel () {
      this.edit = false
      this.change_password = false
      this.old_password = ''
      this.new_password = ''
      this.errors = []
      this.email = this.user.email
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

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
    <div id="liked-comments">
      <ul v-for="liked in likedComments" :key="liked._id">
        <li>{{ liked.content }}</li>
      </ul>
    </div>
    <div id="Comments-component">
      <!-- Display all comments -->
      <div id="comment-section">
        <ul v-for="(comment, index) in comments" v-bind:key="comment._id">
          <!-- If edit option has been selected -->
          <!-- {{ comment }} -->
          <div v-if="cur_index === index && edit_comment_start === true" class="editable-text">
            <a v-on:click="$router.push(/courses/ + comment.code)">From: {{ comment.code }}</a> {{ comment.created }}
            <v-btn class="button" v-on:click="cancelEdit(index)">Cancel</v-btn>
            <v-btn class="button" v-on:click="editComment(index)">Save</v-btn>
            <br>
            <textarea v-model="edit_comment"></textarea>
          </div>
          <!-- If edit option is not selected -->
          <div v-else class="editable-text">
            <a v-on:click="$router.push(/courses/ + comment.code)">From: {{ comment.code }}</a> {{ comment.created }}
            <v-btn class="button" v-if="$store.state.authenticated && $store.state.user.username === comment.username" v-on:click="deleteComment(index)">Delete</v-btn>
            <v-btn class="button" v-if="$store.state.authenticated && $store.state.user.username === comment.username" v-on:click="startEditComment(index)">Edit</v-btn>
            <br>
            <comments-template :post="comment"></comments-template>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
import CommentService from '@/services/CommentService'
import Comments from './Comments'
export default {
  components: {
    'comments-template': Comments
  },
  data () {
    return {
      name: 'user_page',
      username: this.$route.params.username,
      user: [],

      // Edit user information
      edit: false,
      email: '',
      description: '',

      // Edit user comment
      edit_comment_start: false,
      cur_index: '',
      edit_comment: '',

      // Change password information
      change_password: false,
      old_password: '',
      new_password: '',
      confirm_password: '',

      // Returned from backend to display
      message: '',
      errors: [],
      comments: [],
    }
  },
  computed: {
    likedComments () {
      return this.$store.state.liked;
    }
  },
  mounted () {
    this.getUser()
    this.getComments()
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
    async deleteComment (commentIndex) {
      const response = await CommentService.deleteComment({
        username: this.$store.state.user.username,
        code: this.comments[commentIndex].code,
        content: this.comments[commentIndex].content
      })
      if (response.data.error) {
        this.errors.push(response.data.error)
      } else {
        // Remove deleted comment from comments array
        this.comments.splice(commentIndex, 1)
        // Move the index down by one if the deleted comment is below what is currently being edited
        if (this.cur_index && this.cur_index > commentIndex) {
          this.cur_index = this.cur_index - 1
        }
      }
    },
    // Set values needed to edit comments
    startEditComment (commentIndex) {
      this.edit_comment_start = true
      this.cur_index = commentIndex
      this.edit_comment = this.comments[commentIndex].content
    },
    async editComment (commentIndex) {
      // If there are no edits made
      if (this.edit_comment === this.comments[commentIndex].content) {
        this.errors.push('No edit made')
      } else {
        const cmnt = this.comments[commentIndex]
        const response = await CommentService.editComment({
          username: this.$store.state.user.username,
          code: this.comments[commentIndex].code,
          created: cmnt.created,
          newContent: this.edit_comment
        })
        if (response.data.error) {
          this.errors.pus(response.data.error)
        } else {
          // Update the comments array with new comment
          this.comments[commentIndex].content = this.edit_comment
          // Reset
          this.cancelEdit(commentIndex)
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
    },
    cancelEdit (commentIndex) {
      this.edit_comment_start = false
      this.cur_index = ''
      this.edit_comment = this.comments[commentIndex].content
    },
    async getComments () {
      const response = await CommentService.getUserComments({
        username: this.username
      })
      this.comments = response.data.comments
      for (let i = 0; i < this.comments.length; i++) {
        var createdStr = this.comments[i].created
        this.comments[i].created = new Date(createdStr).toLocaleString()
      }
    },
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
.editable-text {
  text-align: left;
  border: 1px solid black;
  margin: 5px;
  padding: 5px;
  word-wrap: break-word;
}
.button {
  float: right;
  padding: 5px;
}
</style>

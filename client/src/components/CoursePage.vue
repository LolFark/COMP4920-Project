<template>
  <div class="course_page">
    <h1>Course {{ $route.params.id }}</h1>
    <table v-if="course === null">
      <h2><b>COURSE NO LONGER EXISTS</b></h2>
    </table>
    <p> Satisfaction rating: {{ satisfactionRatingAvg.toFixed(2) }} / 5.</p>
    <p> Difficulty rating: {{ difficultyRatingAvg.toFixed(2) }} / 5.</p>
    <p> This is based on {{ numComments }} ratings. </p>
    <table class="course_info" v-if="course !== null">
      <tr class="course_code"><b>Code: </b><a v-bind:href="course.handbook_url">{{ course.code }}</a></tr>
      <tr class="course_name"><b>Name: </b>{{ course.name }}</tr>
      <tr class="course_faculty"><b>Faculty: </b>{{ course.faculty }}</tr>
      <tr class="course_gradlevel"><b>Graduate Level: </b>{{ course.grad_level }}</tr>
      <tr class="course_coreqs"><b>Corequesite: </b><span v-html="course.co_reqs">{{ course.co_reqs }}</span></tr>
      <tr class="course_prereqs"><b>Prerequisite: </b><span v-html="course.pre_reqs">{{ course.pre_reqs }}</span></tr>
      <tr class="course_exlusions"><b>Exclusion: </b><span v-html="course.exclusions">{{ course.exclusions }}</span></tr>
      <tr class="course_des"><b>Course Description: </b><span v-html="course.course_des">{{ course.course_des }}</span></tr>
      <!-- <tr class="course_handbookurl"><b>Handbook URL: </b><a v-bind:href="course.handbook_url">Link</a></tr> -->
    </table>
    <br>
    <div id="Comments-component">
      <!-- If there are any errors, display them -->
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
      </p>
      <!-- If user is authenticated, allow them to post a comment -->
      <div v-if="$store.state.authenticated">
        <form>
          Rate your satisfaction of the course - 5 being very satisfied, 0.5 being completely dissatisfied
          <v-rating half-increments hover v-model="satRating"></v-rating>
          Rate the difficulty of the course - 5 being extremely difficult, 0.5 being almost too easy
          <v-rating half-increments hover v-model="diffRating"></v-rating>
          <textarea placeholder="Leave some feedback (Optional)" v-model="feedback"></textarea>
          <v-btn v-on:click="addComment">Post</v-btn>
        </form>
      </div>
      <!-- Display all comments -->
      <div id="comment-section">
        <ul v-for="(comment, index) in comments" v-bind:key="comment._id">
          <!-- If edit option has been selected -->
          <!-- {{ comment }} -->
          <div v-if="cur_index === index && edit === true" class="editable-text">
            <a v-on:click="$router.push(/user/ + comment.username)">{{ comment.username }}</a> {{ comment.created }}
            <v-btn class="button" v-on:click="cancel(index)">Cancel</v-btn>
            <v-btn class="button" v-on:click="editComment(index)">Save</v-btn>
            <br>
            <textarea v-model="edit_comment"></textarea>
          </div>
          <!-- If edit option is not selected -->
          <div v-else class="editable-text">
            <a v-on:click="$router.push(/user/ + comment.username)">{{ comment.username }}</a> {{ comment.created }}
            <v-btn class="button" v-if="$store.state.authenticated && $store.state.user.username === comment.username" v-on:click="deleteComment(index)">Delete</v-btn>
            <v-btn class="button" v-if="$store.state.authenticated && $store.state.user.username === comment.username" v-on:click="startEditComment(index)">Edit</v-btn>
            <v-btn class="button" v-on:click="startEditReply(index)">Reply</v-btn>
            <br>
            <div v-if="reply_index === index && is_editing_reply" class="editable-text2">
              <textarea v-model="reply"></textarea>
              <v-btn class="button" v-on:click="cancelReply(index)">Cancel</v-btn>
              <v-btn class="button" v-on:click="addReply(index)">Save</v-btn>
            </div>
            <br>
            <comments-template :post="comment"></comments-template>
          </div>
        </ul>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
/* eslint-disable */
import CourseService from '@/services/CourseService'
import CommentService from '@/services/CommentService'
import Comments from './Comments'
export default {
  components: {
    'comments-template': Comments
  },
  data () {
    return {
      name: 'course_page',
      code: this.$route.params.id,
      course: '',
      feedback: '', // feedback by the current user
      reply: '',
      comments: [], // previously submitted comments for the course
      satRating: 2.5,
      diffRating: 2.5,
      satisfactionRatingAvg: 0,
      difficultyRatingAvg: 0,
      numComments: 0,

      errors: [],

      // Variables for user editing comments and replies
      edit: false, // this is for comments
      cur_index: '',
      edit_comment: '',
      is_editing_reply: false, // this is for replies
      reply_index: ''
    }
  },
  mounted () {
    this.getCourse()
    // this.getComments()
  },
  methods: {
    async getCourse () {
      const response = await CourseService.getSpecificCourse({
        code: this.code
      })
      this.course = response.data.course
      try {
        this.course.grad_level = this.course.grad_level.charAt(0).toUpperCase() + this.course.grad_level.substr(1)
        this.makeLink()
        this.makeDotPoints()
        this.getComments()
      } catch (error) {
        // Course not found. Do nothing
      }
    },
    makeLink () {
      this.course.pre_reqs = this.course.pre_reqs.replace(/([A-Z]{4}[0-9]{4})/g, '<a href="' + '$1' + '">' + '$1' + '</a>')
      this.course.co_reqs = this.course.co_reqs.replace(/([A-Z]{4}[0-9]{4})/g, '<a href="' + '$1' + '">' + '$1' + '</a>')
      this.course.exclusions = this.course.exclusions.replace(/([A-Z]{4}[0-9]{4})/g, '<a href="' + '$1' + '">' + '$1' + '</a>')
    },
    makeDotPoints () {
      // Replace _ with spaces
      this.course.course_des = this.course.course_des.replace(/_([A-Z])/g, function (match) { return match.toLowerCase() })
      this.course.course_des = this.course.course_des.replace(/_/g, ' ')
      // Make all uppercase letters after dot point into lowercase
      this.course.course_des = this.course.course_des.replace(/\* ([A-Z])/g, function (match) { return match.toLowerCase() })
      // Make last word of a dot point lowercase
      this.course.course_des = this.course.course_des.replace(/\* [^A-Z]+([A-Z])[a-z]+ {5}\*/g, function (match) { return match.toLowerCase() })
      // Colon followed by dot points
      this.course.course_des = this.course.course_des.replace(/(:) {5}\*/g, '$1 <ul><li>')
      // Heading followed by dot points
      this.course.course_des = this.course.course_des.replace(/([A-Z][^A-Z ]+) {5}\*/g, '$1 <ul><li>')
      // All subsequent dot points
      this.course.course_des = this.course.course_des.replace(/\*/g, '</li><li>')
      // Close off lists
      this.course.course_des = this.course.course_des.replace(/(<li>[^A-Z]+)([A-Z])/g, '$1</li></ul>$2')
      // Close off list if course description ends on a dotpoint
      if (!this.course.course_des.match(/\.$/)) {
        this.course.course_des = this.course.course_des.replace(/(.*)$/, '$1</li></ul>')
      }
    },
    async getComments () {
      const response = await CommentService.getComments({ code: this.course.code })
      const allComments = response.data.comments
      var ratingSum = 0;
      var difficultySum = 0;
      var numComments = 0;
      var totalComments = allComments.length;
      for (let i = 0; i < allComments.length; i += 1) {
        var cmnt = allComments[i];
        if(cmnt.rating && !Number.isNaN(cmnt.rating)) {
          ratingSum += cmnt.rating;
          numComments += 1;
        }
        if(cmnt.difficulty && !Number.isNaN(cmnt.difficulty)) {
          difficultySum += cmnt.difficulty;
        }
        // remove empty comments from display
        if (!cmnt.content) { continue }
        var createdStr = cmnt.created;
        var date = new Date(createdStr).toLocaleString();
        cmnt.created = date;
        this.comments.push(cmnt);
      }
      if(numComments != 0) {
        this.satisfactionRatingAvg = ratingSum / numComments;
        this.difficultyRatingAvg = difficultySum / numComments;
        this.numComments = numComments;
        CourseService.updateRating({
          code: this.code,
          satisfaction: this.satisfactionRatingAvg,
          difficulty: this.difficultyRatingAvg,
        });
      }
      this.comments.sort((a,b) => {
        if (a.created < b.created) {
          return -1
        }
        if (a.created > b.created) {
          return 1
        }
        return 0
      })
    },
    async addReply (commentIndex) {
      this.errors = []
      // If there is no feedback, prevent user from posting comment
      if (this.reply === '') {
        this.errors.push('Empty reply')
      } else {
        const response = await CommentService.addReply({
          comment: this.comments[commentIndex],
          username: this.$store.state.user.username,
          content: this.reply
        })
        if (response.data.error) {
          this.errors.push(response.data.error)
        } else {
          this.comments[commentIndex].replies.push(response.data.reply)
          this.cancelReply(commentIndex)
        }
      }
    },
    startEditReply (commentIndex) {
      this.is_editing_reply = true
      this.reply_index = commentIndex
    },
    cancelReply (commentIndex) {
      this.is_editing_reply = false
      this.reply = ''
      this.reply_index = ''
      this.errors = []
    },
    async addComment () {
      this.errors = []
      const response = await CommentService.addComment({
        username: this.$store.state.user.username,
        code: this.course.code,
        content: this.feedback,
        rating: this.satRating,
        difficulty: this.diffRating
      })
      if (response.data.error) {
        this.errors.push(response.data.error)
      } else {
        this.comments.push(response.data.comment)
        this.feedback = ''
      }
    },
    async deleteComment (commentIndex) {
      const response = await CommentService.deleteComment({
        username: this.$store.state.user.username,
        code: this.course.code,
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
      this.edit = true
      this.cur_index = commentIndex
      this.edit_comment = this.comments[commentIndex].content
    },
    async editComment (commentIndex) {
      // If there are no edits made
      if (this.edit_comment === this.comments[commentIndex].content) {
        this.errors.push('No edit made')
      } else {
        const response = await CommentService.editComment({
          username: this.$store.state.user.username,
          code: this.course.code,
          oldContent: this.comments[commentIndex].content,
          newContent: this.edit_comment
        })
        if (response.data.error) {
          this.errors.pus(response.data.error)
        } else {
          // Update the comments array with new comment
          this.comments[commentIndex].content = this.edit_comment
          // Reset
          this.cancel(commentIndex)
        }
      }
    },
    // Set values back to default
    cancel (commentIndex) {
      this.edit = false
      this.cur_index = ''
      this.edit_comment = this.comments[commentIndex].content
      this.errors = []
    },
    upvote (commentIndex) {
      this.$store.state.comments[commentIndex].overallRating + 1
      votes(commentIndex)
    },
    votes (commentIndex) {
      return this.$store.state.comments[commentIndex].overallRating
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
.course_info {
  text-align: left
}
.editable-text {
  text-align: left;
  border: 1px solid black;
  margin: 5px;
  padding: 5px;
  word-wrap: break-word;
}
.editable-text2 {
  border: 1px solid black;
  margin: 5px;
  padding: 5px;
  margin-top: 40px;
}
.button {
  float: right;
  padding: 5px;
}
tr span >>> a:link, tr span >>> a:visited {
  background-color: rgb(145, 242, 255);
  color: black;
  padding: 2px 2px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}
tr span >>> a:hover, tr span >>> a:active {
  background-color: rgb(155, 207, 228);
}
</style>

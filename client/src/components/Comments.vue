<template id="Comments">
<div>
   <li class="list-group-item">
    <div v-if="this.$store.state.authenticated">
      <v-btn v-if="upvoted" flat icon color="orange" @click="upvote">
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
      <v-btn v-else flat icon color="grey" @click="upvote">
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
      <span class="label label-primary">{{ votes }}</span>
      <v-btn v-if="downvoted" flat icon color="blue" @click="downvote">
        <v-icon>keyboard_arrow_down</v-icon>
      </v-btn>
      <v-btn v-else flat icon color="grey" @click="downvote">
        <v-icon>keyboard_arrow_down</v-icon>
      </v-btn>
    </div>
    <p>Difficulty {{post.difficulty}} </p>
    <p>Overall rating {{post.rating}} </p>
    <a>{{ post.content }}</a>
    <v-btn @click="flag()">Flag comment</v-btn>
    <v-btn @click="show()">Show comment</v-btn>
  </li>
  <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
    </ul>
  </p>
  <div v-if="is_course_page" id="replies-component">
    <!-- Display all replies -->
    <div id="reply-section">
      <ul v-for="(reply, index) in post.replies" v-bind:key="reply._id">
        <!-- If edit option has been selected -->
        <!-- {{ comment }} -->
        <div v-if="cur_index === index && edit_reply_start === true" class="editable-text">
          <a v-on:click="$router.push(/user/ + reply.username)">{{ reply.username }}</a> {{ reply.created }}
          <v-btn class="button" v-on:click="cancelEdit(index)">Cancel</v-btn>
          <v-btn class="button" v-on:click="editReply(index)">Save</v-btn>
          <br>
          <textarea v-model="edit_reply"></textarea>
        </div>
        <!-- If edit option is not selected -->
        <div v-else class="editable-text">
          <a v-on:click="$router.push(/user/ + reply.username)">{{ reply.username }}</a> {{ reply.created }}
          <v-btn class="button" v-if="$store.state.authenticated && $store.state.user.username === reply.username" v-on:click="deleteReply(index)">Delete</v-btn>
          <v-btn class="button" v-if="$store.state.authenticated && $store.state.user.username === reply.username" v-on:click="startEditReply(index)">Edit</v-btn>
          <br>
          {{ reply.content }}
        </div>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import CommentService from '@/services/CommentService'
export default {
  props: ['post'],
  data () {
    return {
      upvoted: false,
      errors: [],

      // Edit user replies
      edit_reply_start: false,
      cur_index: '',
      edit_reply: '',

      is_course_page: false,
      original: this.post.content,
      upvoted: false,
      downvoted: false,
    }
  },
  mounted () {
    this.checkPage()
  },
  computed: {
    votes() {
      if (Number.isNaN(this.post.commentRating)) {
        return 1;
      }
      if (this.upvoted) {
        return this.post.commentRating + 1;
      } if (this.downvoted) {
        return this.post.commentRating - 1;
      }
      return this.post.commentRating;
    },
  },
  methods: {
    show() {
      this.post.content = this.original;
    },
    flag() {
      this.post.content = 'Comment has been flagged for inappropriate content'
    },
    upvote() {
      this.upvoted = !this.upvoted;
      this.downvoted = false;
      this.upVoteComment();
      this.addLikedComment();
    },
    downvote() {
      this.downvoted= !this.downvoted;
      this.upvoted = false;
      this.downVoteComment();
      this.removeLikedComment();
    },
    async upVoteComment() {
      const res = await CommentService.upVoteComment({
        comment: this.post,
        user: this.$store.state.user,
        votes: this.votes,
      });
      this.post.commentRating = res.data.commentRating;
    },
    async downVoteComment() {
      const res = await CommentService.downVoteComment({
        comment: this.post,
        user: this.$store.state.user,
        votes: this.votes,
      });
      this.post.commentRating = res.data.commentRating;
    },
    async addLikedComment() {
      await UserService.likeComment({
        user: this.$store.state.user,
        comment: this.post,
      });
    },
    async removeLikedComment() {
      await UserService.unlikeComment({
        user: this.$store.state.user,
        comment: this.post,
      });
    },
    async deleteReply (commentIndex) {
      const response = await CommentService.deleteReply({
        _id: this.post._id,
        reply: this.post.replies[commentIndex]
      })
      if (response.data.err) {
        this.errors.push(response.data.err)
      } else {
        // Remove deleted comment from comments array
        this.post.replies.splice(commentIndex, 1)
        // Move the index down by one if the deleted comment is below what is currently being edited
        if (this.cur_index && this.cur_index > commentIndex) {
          this.cur_index = this.cur_index - 1
        }
      }
    },
    // Set values needed to edit comments
    startEditReply (commentIndex) {
      this.edit_reply_start = true
      this.cur_index = commentIndex
      this.edit_reply = this.post.replies[commentIndex].content
    },
    async editReply (commentIndex) {
      // If there are no edits made
      if (this.edit_reply === this.post.replies[commentIndex].content) {
        this.errors.push('No edit made')
      } else {
        const response = await CommentService.editReply({
          comment: this.post,
          reply: this.post.replies[commentIndex],
          newContent: this.edit_reply
        })
        if (response.data.error) {
          this.errors.push(response.data.error)
        } else {
          // Update the comments array with new comment
          this.post.replies[commentIndex].content = this.edit_reply
          // Reset
          this.cancelEdit(commentIndex)
        }
      }
    },
    cancelEdit (commentIndex) {
      this.edit_comment_start = false
      this.cur_index = ''
      this.edit_reply = this.post.replies[commentIndex].content
      this.errors = []
    },
    checkPage () {
      if (this.$route.params.id) {
        this.is_course_page = true
      } else {
        this.is_course_page = false
      }
    }
  }
}
</script>

<style>
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

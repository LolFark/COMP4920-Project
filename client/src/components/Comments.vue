<template id="Comments">
<div>
  <li class="list-group-item">
    <v-btn v-if="$store.state.authenticated" flat icon color="pink" @click="upvote">
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
    <span class="label label-primary">{{ votes }}</span>
    <a>{{ post.content }}</a>
  </li>
</div>
</template>

<script>
import CommentService from '../services/CommentService';

export default {
  props: ['post'],
  data() {
    return {
      upvoted: false,
    };
  },
  computed: {
    votes() {
      if (Number.isNaN(this.post.overallRating)) {
        return 1;
      }
      if (this.upvoted) {
        return this.post.overallRating + 1;
      }
      return this.post.overallRating;
    },
  },
  methods: {
    async upVoteComment() {
      await CommentService.upVoteComment({
        comment: this.post,
        user: this.$store.state.user,
      });
    },
    async downVoteComment() {
      await CommentService.downVoteComment({
        comment: this.post,
        user: this.$store.state.user,
      });
    },
    upvote() {
      this.upvoted = !this.upvoted;
      // Update comment voting and save user to the comment's liked users
      if (this.upvoted) {
        this.upVoteComment();
      } else {
        this.downVoteComment();
      }
    },
  },
};
</script>

<style>

</style>

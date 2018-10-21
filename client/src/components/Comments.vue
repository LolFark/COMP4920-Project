<template id="Comments">
<div>
  <p>test</p>
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
    <a>{{ post.content }}</a>
  </li>
</div>
</template>

<script>
import CommentService from '../services/CommentService';
import UserService from '../services/UserService';

export default {
  props: ['post'],
  data() {
    return {
    };
  },
  computed: {
    upvoted() {
      return this.$store.state.user.likedComments.includes(this.post);
    },
    downvoted() {
      return this.$store.state.user.dislikedComments.includes(this.post);
    },
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
    upvote() {
      this.upVoteComment();
      this.addLikedComment();
      this.$store.dispatch('addLike', this.post);
    },
    downvote() {
      this.downVoteComment();
      this.removeLikedComment();
      this.$store.dispatch('dislike', this.post);
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
  },
};
</script>

<style>
  .disabled{
    color: orange
  }
</style>

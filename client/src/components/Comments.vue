<template id="Comments">
<div>
  <li class="list-group-item">
    <div v-if="this.$store.state.authenticated">
      <v-btn v-if="$store.state.liked.includes(post)" flat icon color="orange" @click="upvote">
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
      <v-btn v-else flat icon color="grey" @click="upvote">
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
      <span class="label label-primary">{{ votes }}</span>
      <v-btn v-if="$store.state.disliked.includes(post)" flat icon color="blue" @click="downvote">
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
      upvoted: false,
      downvoted: false,
    };
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
    upvote() {
      this.upvoted = !this.upvoted;
      this.downvoted = false;
      this.upVoteComment();
      this.addLikedComment();
      if (this.$store.state.liked.includes(this.post)) {
        // comment already liked so remove the like
        this.$store.dispatch('removeLike', this.post);
      } else {
        this.$store.dispatch('addLike', this.post);
        if (this.$store.state.disliked.includes(this.post)) {
          this.$store.dispatch('removeDislike', this.post);
        }
      }
    },
    downvote() {
      this.downvoted = !this.downvoted;
      this.upvoted = false;
      this.downVoteComment();
      this.removeLikedComment();
      if (this.$store.state.disliked.includes(this.post)) {
        this.$store.dispatch('removeDislike', this.post);
      } else {
        this.$store.dispatch('dislike', this.post);
        if (this.$store.state.liked.includes(this.post)) {
          this.$store.dispatch('removeLike', this.post);
        }
      }
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

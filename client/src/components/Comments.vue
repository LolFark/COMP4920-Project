<template id="Comments">
<div>
  <li class="list-group-item">
    <v-btn flat icon color="pink" @click="upvote">
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
    <span class="label label-primary">{{ votes }}</span>
    <a>{{ post.content }}</a>
  </li>
</div>
</template>

<script>
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
    upvote() {
      this.upvoted = !this.upvoted;
    },
  },
};
</script>

<style>

</style>

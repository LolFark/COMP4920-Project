<template>
  <div class="user_page">
    <h1>User {{ $route.params.username }}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'user_page'
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
</style>

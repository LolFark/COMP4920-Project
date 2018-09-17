<template>
  <div class="course_page">
    <h1>Course {{ $route.params.id }}</h1>
    <p>Feedback</p>
    <textarea placeholder="Add a comment"></textarea>
  </div>
</template>

<script>
export default {
  name: 'course_page'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<template>
  <div class="course_page">
    <h1>Course {{ $route.params.id }}</h1>
    <p>Feedback</p>
    <p>{{ course }}</p>
    <textarea placeholder="Add a comment"></textarea>
  </div>
</template>

<script>
import CourseService from '@/services/CourseService'
import './Comment'
export default {
  data () {
    return {
      name: 'course_page',
      code: this.$route.params.id,
      course: [],
      blah: ''
    }
  },
  mounted () {
    this.getCourse()
  },
  methods: {
    async getCourse () {
      const response = await CourseService.getSpecificCourse({
        code: this.code
      })
      this.course = response.data.course
    }
  }
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

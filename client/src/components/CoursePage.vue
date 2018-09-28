<template>
  <div class="course_page">
    <h1>Course {{ $route.params.id }}</h1>
    <p>Feedback</p>
    <p>{{ course }}</p>
    <table>
      <tr class="course_code"><b>Code: </b>{{ course.code }}</tr>
      <tr class="course_name"><b>Name: </b>{{ course.name }}</tr>
      <tr class="course_faculty"><b>Faculty: </b>{{ course.faculty }}</tr>
      <tr class="course_gradlevel"><b>Graduate Level: </b>{{ course.grad_level }}</tr>
      <tr class="course_coreqs"><b>Corequesite: </b>{{ course.co_reqs }}</tr>
      <tr class="course_prereqs"><b>Prerequisite: </b>{{ course.pre_reqs }}</tr>
      <tr class="course_exlusions"><b>Exclusion: </b>{{ course.exclusions }}</tr>
      <tr class="course_des"><b>Course Description: </b>{{ course.course_des }}</tr>
      <tr class="course_handbookurl"><b>Handbook URL: </b><a v-bind:href="course.handbook_url">Link</a></tr>
    </table>
    <br>
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
      this.course.grad_level = this.course.grad_level.charAt(0).toUpperCase() + this.course.grad_level.substr(1)
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

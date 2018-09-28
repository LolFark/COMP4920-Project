<template>
  <div class="course_page">
    <h1>Course {{ $route.params.id }}</h1>
    <table v-if="course === null">
      <h2><b>COURSE NO LONGER EXISTS</b></h2>
    </table>
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
    <textarea placeholder="Add a comment"></textarea>
    <br>
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
      try {
        this.course.grad_level = this.course.grad_level.charAt(0).toUpperCase() + this.course.grad_level.substr(1)
        this.makeLink()
        this.makeDotPoints()
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

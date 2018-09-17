<template>
  <div class="courses">
    <h1>{{ msg }}</h1>
    Course should be displayed here
    <input type="text" v-model="search" placeholder="Search Courses">
    <router-link v-bind:to="{ name: 'NewCourse' }" class="add_course_link">Add Course</router-link>
    <table>
        <tr>
          <td width="100">Course code</td>
          <td width="550">Course name</td>
          <td width="100" align="center">Prerequisites</td>
          <td width="100" align="center">Corequisites</td>
          <td width="300" align="center">Faculty</td>
          <td width="300" align="center">link</td>
        </tr>
        <tr v-for="course in searchedCourses" v-bind:key="course">
          <td><a v-bind:href="/courses/ + course.code">{{ course.code }}</a></td>
          <td>{{ course.name }}</td>
          <td>{{ course.pre_reqs }}</td>
          <td>{{ course.co_reqs }}</td>
          <td>{{ course.faculty }}</td>
          <td><a v-bind:href="course.handbook_url">Link</a></td>
          <td align="center">
          </td>
        </tr>
      </table>
  </div>
</template>

<script>
import CourseService from '@/services/CourseService'
export default {
  name: 'Courses',
  data () {
    return {
      courses: [],
      search: ''
    }
  },
  mounted () {
    this.getCourses()
  },
  methods: {
    async getCourses () {
      const response = await CourseService.fetchCourses()
      this.courses = response.data.courses
    }
  },
  computed: {
    searchedCourses: function () {
      return this.courses.filter((course) => {
        return course.code.match(this.search)
      })
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

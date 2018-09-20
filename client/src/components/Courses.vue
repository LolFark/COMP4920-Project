<template>
  <div class="courses">
    <h1>Communicourse</h1>
    <select v-model="selected">
      <option value="code">Course Code</option>
      <option value="name">Course Name</option>
      <option value="faculty">Faculty</option>
    </select>
    <input type="text" v-model="search" placeholder="Search Courses">
    <router-link v-bind:to="{ name: 'NewCourse' }" class="add_course_link">Add Course</router-link>
    <table class="table-hover" id="thetable">
        <tr>
          <th class="course_code">Course code</th>
          <th class="course_name">Course name</th>
          <th class="course_prereqs" align="center">Prerequisites</th>
          <th class="course_coreqs" align="center">Corequisites</th>
          <th class="course_faculty" align="center">Faculty</th>
          <th class="course_link" align="center">Handbook Link</th>
        </tr>
          <tr v-for="course in searchedCourses" v-bind:key="course">
            <td><a v-bind:href="/courses/ + course.code">{{ course.code }}</a></td>
            <td>{{ course.name }}</td>
            <td>{{ course.pre_reqs }}</td>
            <td>{{ course.co_reqs }}</td>
            <td>{{ course.faculty }}</td>
            <td><a v-bind:href="course.handbook_url">Link</a></td>
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
      search: '',
      selected: 'code'
    }
  },
  mounted () {
    this.getCourses()
  },
  updated () {
    this.alternate('thetable')
  },
  methods: {
    async getCourses () {
      const response = await CourseService.fetchCourses()
      this.courses = response.data.courses
    },
    alternate (id) {
      if (document.getElementsByTagName) {
        var table = document.getElementById(id)
        var rows = table.getElementsByTagName('tr')
        for (let i = 0; i < rows.length; i++) {
          if (i % 2 === 0) {
            rows[i].className = 'even'
          } else {
            rows[i].className = 'odd'
          }
        }
      }
    }
  },
  computed: {
    searchedCourses: function () {
      var regex = new RegExp(this.search, 'i')
      if (this.selected === 'code') {
        return this.courses.filter((course) => {
          if (regex.test(course.code)) {
            return course
          }
        })
      }
      if (this.selected === 'name') {
        return this.courses.filter((course) => {
          if (regex.test(course.name)) {
            return course
          }
        })
      }
      if (this.selected === 'faculty') {
        return this.courses.filter((course) => {
          if (regex.test(course.faculty)) {
            return course
          }
        })
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
.table-hover tr:hover td {
  background-color: rgb(155, 207, 228);
}
.table-hover tr th {
  color: white;
  background-color: black;
}
.odd{background-color: white;}
.even{background-color: rgb(233, 233, 233);}
.table-hover{width: 100%;}
.course_code{width: 5%;}
.course_name{width: 30%;}
.course_prereqs{width: 35%;}
.course_coreqs{width: 15%;}
.course_faculty{width: 10%;}
.course_link{width: 5%;}
</style>

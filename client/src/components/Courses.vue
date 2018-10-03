<template>
  <div class="courses">
    <p v-for="user in users" v-bind:key="user" v-on:click="navigate(/user/ + user.username)">{{ user.username }}</p>
    <select v-model="selected">
      <option value="code">Course Code</option>
      <option value="name">Course Name</option>
      <option value="faculty">Faculty</option>
    </select>
    <input type="text" v-model="search" placeholder="Search Courses">
    <router-link v-bind:to="{ name: 'NewCourse' }" class="add_course_link">Add Course</router-link>
    <p>
      <input type="radio" id="allf" value="" v-model="faculty">
      <label for="allf">All</label>
      <input type="radio" id="art" value="Faculty of Arts and Social Sciences" v-model="faculty">
      <label for="art">Faculty of Arts and Social Sciences</label>
      <input type="radio" id="env" value="Built Environment" v-model="faculty">
      <label for="env">Built Environment</label>
      <input type="radio" id="eng" value="Faculty of Engineering" v-model="faculty">
      <label for="eng">Faculty of Engineering</label>
      <input type="radio" id="law" value="Faculty of Law" v-model="faculty">
      <label for="law">Faculty of Law</label>
      <input type="radio" id="med" value="Faculty of Medicine" v-model="faculty">
      <label for="med">Faculty of Medicine</label>
      <input type="radio" id="sci" value="Faculty of Science" v-model="faculty">
      <label for="sci">Faculty of Science</label>
      <input type="radio" id="bus" value="UNSW Business School" v-model="faculty">
      <label for="bus">UNSW Business School</label>
      <input type="radio" id="bos" value="Board of Studies" v-model="faculty">
      <label for="bos">DVC (Academic) Board of Studies</label>
    </p>
    <p>
      <input type="checkbox" id="alll"  v-on:change="checkAll" v-model="allChecked">
      <label for="alll">All</label>
      <input type="checkbox" id="zero" value="0" v-on:click="check" v-model="levels">
      <label for="zero">0</label>
      <input type="checkbox" id="one" value="1" @click="check" v-model="levels">
      <label for="one">1</label>
      <input type="checkbox" id="two" value="2" @click="check" v-model="levels">
      <label for="two">2</label>
      <input type="checkbox" id="three" value="3" @click="check" v-model="levels">
      <label for="three">3</label>
      <input type="checkbox" id="four" value="4" @click="check" v-model="levels">
      <label for="four">4</label>
      <input type="checkbox" id="five" value="[5-9]" @click="check" v-model="levels">
      <label for="five">5+</label>
    </p>
    <table class="table-hover" id="thetable">
        <tr>
          <th class="course_code">Course code</th>
          <th class="course_name">Course name</th>
          <th class="course_prereqs" align="center">Prerequisites</th>
          <th class="course_coreqs" align="center">Corequisites</th>
          <th class="course_faculty" align="center">Faculty</th>
          <th class="course_link" align="center">Handbook Link</th>
        </tr>
        <tr v-for="course in searchedCourses" v-bind:key="course" v-on:click="navigate(/courses/ + course.code)">
          <td>{{ course.code }}</td>
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
// /// TEMPORARY START /////
import UserService from '@/services/UserService'
// /// TEMPORARY  END  /////
export default {
  name: 'Courses',
  data () {
    return {
      courses: [],
      search: '',
      selected: 'code',
      faculty: 'faculty',

      allChecked: true,
      allLevels: ['0', '1', '2', '3', '4', '[5-9]'],
      levels: ['0', '1', '2', '3', '4', '[5-9]'],

      // /// TEMPORARY START /////
      users: []
      // /// TEMPORARY  END  /////
    }
  },
  mounted () {
    this.getCourses()
    // /// TEMPORARY START /////
    this.getUsers()
    // /// TEMPORARY  END  /////
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
    },
    navigate (to) {
      this.$router.push(to)
    },
    checkAll () {
      this.levels = []

      if (this.allChecked) {
        for (var level in this.allLevels) {
          this.levels.push(this.allLevels[level])
        }
      }
    },
    check () {
      this.allChecked = false
    },
    // /// TEMPORARY START /////
    async getUsers () {
      const response = await UserService.fetchUsers()
      this.users = response.data.users
    }
    // /// TEMPORARY  END  /////
  },
  computed: {
    searchedCourses: function () {
      var searchReg = new RegExp(this.search, 'i')
      var facultyReg = new RegExp(this.faculty)

      if (this.selected === 'code') {
        return this.courses.filter((course) => {
          for (var level in this.levels) {
            var levelregex = '^[A-Z]{4}' + this.levels[level]
            var levelReg = new RegExp(levelregex)
            if (searchReg.test(course.code) && (facultyReg.test(course.faculty)) && (levelReg.test(course.code))) {
              return course
            }
          }
        })
      }
      if (this.selected === 'name') {
        return this.courses.filter((course) => {
          for (var level in this.levels) {
            var levelregex = '^[A-Z]{4}' + this.levels[level]
            var levelReg = new RegExp(levelregex)
            if (searchReg.test(course.name) && (facultyReg.test(course.faculty)) && (levelReg.test(course.code))) {
              return course
            }
          }
        })
      }
      if (this.selected === 'faculty') {
        return this.courses.filter((course) => {
          for (var level in this.levels) {
            var levelregex = '^[A-Z]{4}' + this.levels[level]
            var levelReg = new RegExp(levelregex)
            if (searchReg.test(course.faculty) && (facultyReg.test(course.faculty)) && (levelReg.test(course.code))) {
              return course
            }
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

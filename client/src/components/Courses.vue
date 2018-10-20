<template>
  <div class="container">
    <div class="box1">
      <v-layout justify-center row wrap>
      <v-text-field
        v-model="search"
        placeholder="Search Course"
      ></v-text-field>
      <select v-model="selected">
        <option value="code">Course Code</option>
        <option value="name">Course Name</option>
      </select>
      </v-layout>
    </div>
    <div class="box2">
      <router-link v-bind:to="{ name: 'NewCourse' }" class="add_course_link">Can't find? Add new Course</router-link>
      <p>
        <v-radio-group v-model="faculty" row>
          <v-radio id="allf" label="All" value=""></v-radio>
          <v-radio id="art" label="Faculty of Arts and Social Sciences" value="Faculty of Arts and Social Sciences"></v-radio>
          <v-radio id="env" label="Built Environment" value="Built Environment"></v-radio>
          <v-radio id="eng" label="Faculty of Engineering" value="Faculty of Engineering"></v-radio>
          <v-radio id="law" label="Faculty of Law" value="Faculty of Law"></v-radio>
          <v-radio id="med" label="Faculty of Medicine" value="Faculty of Medicine"></v-radio>
          <v-radio id="sci" label="Faculty of Science" value="Faculty of Science"></v-radio>
          <v-radio id="bus" label="UNSW Business School" value="UNSW Business School"></v-radio>
          <v-radio id="bos" label="DVC (Academic) Board of Studies" value="Board of Studies"></v-radio>
        </v-radio-group>
      </p>
    </div>
    <hr>
    <div class="box3">
      <p>
        <v-layout raw>
          <v-checkbox
            label="All"
            id="alll"
            color="indigo"
            hide-details
            v-model="allChecked"
          ></v-checkbox>
          <v-checkbox
            id="zero"
            label="0"
            color="indigo"
            value="0"
            hide-details
            v-model="levels"
          ></v-checkbox>
          <!-- <input type="checkbox" id="alll"  v-on:change="checkAll" v-model="allChecked">
          <label for="alll">All</label>
          <span></span>
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
          <label for="five">5+</label> -->
        </v-layout>
      </p>
    </div>
    <div class="box4">
      <table class="table-hover" id="thetable">
        <tr>
          <th class="course_code">Course code</th>
          <th class="course_name">Course name</th>
          <th class="course_prereqs" align="center">Prerequisites</th>
          <th class="course_coreqs" align="center">Corequisites</th>
          <th class="course_faculty" align="center">Faculty</th>
          <th class="course_link" align="center">Handbook Link</th>
        </tr>
        <tr v-for="course in searchedCourses" v-bind:key="course._id" v-on:click="navigate(/courses/ + course.code)">
          <td>{{ course.code }}</td>
          <td>{{ course.name }}</td>
          <td>{{ course.pre_reqs }}</td>
          <td>{{ course.co_reqs }}</td>
          <td>{{ course.faculty }}</td>
          <td><a v-bind:href="course.handbook_url">Link</a></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import CourseService from '@/services/CourseService'
export default {
  name: 'Courses',
  data () {
    return {
      search: '',
      selected: 'code',
      faculty: '',

      allChecked: true,
      allLevels: ['0', '1', '2', '3', '4', '[5-9]'],
      levels: ['0', '1', '2', '3', '4', '[5-9]'],

      gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)'
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
      // this.courses = response.data.courses
      this.$store.dispatch('setCourses', response.data.courses)
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
    }
  },
  computed: {
    // Using Vuex
    courses () {
      return this.$store.state.courses
    },
    searchedCourses: function () {
      var searchReg = new RegExp(this.search, 'i')
      var facultyReg = new RegExp(this.faculty)
      return this.courses.filter((course) => {
        for (var level in this.levels) {
          var levelregex = '^[A-Z]{4}' + this.levels[level]
          var levelReg = new RegExp(levelregex)
          if (searchReg.test((this.selected === 'code') ? course.code : course.name) && (facultyReg.test(course.faculty)) && (levelReg.test(course.code))) {
            return course
          }
        }
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
  color: #131414;
}
.table-hover tr:hover td {
  background-color: rgb(23, 144, 192);
}
.table-hover tr th {
  color: white;
  background-color: rgb(19, 18, 18);
}
.odd{background-color: rgb(158, 173, 187);}
.even{background-color: rgb(134, 127, 127);}
.table-hover{width: 100%;}
.course_code{width: 5%;}
.course_name{width: 30%;}
.course_prereqs{width: 35%;}
.course_coreqs{width: 15%;}
.course_faculty{width: 10%;}
.course_link{width: 5%;}
.container{
  display: flex;
  flex-direction: column;
  background:rgb(144, 146, 137);
  overflow: auto;
}
.box1{
  flex: 1;
}
.box2{
  flex: 1;
}
.box3{
  flex:1;
}
.box4{
  flex: 1
}
</style>

<template>
  <div class="courses">
    <v-course>
      <select v-model="selected">
        <option value="code">Course Code</option>
        <option value="name">Course Name</option>
        <option value="faculty">Faculty</option>
      </select>
      <v-select
        :items="items"
        label="Search By"
        outline
        color='blue'
      ></v-select>
      <input type="text" v-model="search" placeholder="Search Courses">
      <v-card dark color='primary'>
        <v-card-text>
          <v-autocomplete
            v-model="model"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            color="white"
            hide-no-data
            hide-selected
            item-text="Description"
            item-value="API"
            label="Search Courses"
            placeholder="Start typing to Search"
            prepend-icon="mdi-database-search"
            return-object
          ></v-autocomplete>
        </v-card-text>
        <v-expand-transition>
          <v-list v-if="model" class="red lighten-3">
            <v-list-tile
              v-for="(field, i) in fields"
              :key="i"
            >
              <v-list-tile-content>
                <v-list-tile-title v-text="field.value"></v-list-tile-title>
                <v-list-tile-sub-title v-text="field.key"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-expand-transition>
      </v-card>
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
        <v-container grid-list-md text-xs-center>
          <v-layout center wrap>
            <v-flex>
              <v-checkbox id="alll" label="All"  v-on:change="checkAll" v-model="allChecked">
              </v-checkbox>
            </v-flex>
            <v-flex>
              <v-checkbox label="0" id="zero" value="0" v-model="levels">
              </v-checkbox>
            </v-flex>
            <v-flex>
              <v-checkbox label="1" id="one" value="1"  v-model="levels">
              </v-checkbox>
            </v-flex>
            <v-flex>
              <v-checkbox label="2" id="two" value="2"  v-model="levels">
              </v-checkbox>
            </v-flex>
            <v-flex>
              <v-checkbox label="3" id="three" value="3"  v-model="levels">
              </v-checkbox>
            </v-flex>
            <v-flex>
              <v-checkbox label="4" id="four" value="4"  v-model="levels">
              </v-checkbox>
            </v-flex>
            <v-flex>
              <v-checkbox label="5" id="five" value="[5-9]"  v-model="levels">
              </v-checkbox>
            </v-flex>
          </v-layout>
        </v-container>
      </p>
      <v-select
            v-model="value"
            :items="items"
            chips
            label="Course Level"
            multiple
            outline
          ></v-select>
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
      </v-course>
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
      faculty: 'faculty',

      allChecked: true,
      allLevels: ['0', '1', '2', '3', '4', '[5-9]'],
      levels: ['0', '1', '2', '3', '4', '[5-9]']
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

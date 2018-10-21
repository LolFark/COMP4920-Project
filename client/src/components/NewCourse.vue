<template>
  <div class="courses">
    <h1>Add Course</h1>
      <div class="form">
       <div>
          Course Code: <input type="text" placeholder="e.g. COMP9999" v-model="code"> <br>
          Course Name: <input type="text" placeholder="Some computing course" v-model="name"> <br>
          Faculty: <input type="text" placeholder="e.g. Faculty of Engineering" v-model="faculty"> <br>
          Co-Requisites: <input type="text" placeholder="e.g. COMP4920" v-model="co_reqs"> <br>
          Pre-requisites: <input type="text" placeholder="e.g. COMP2511" v-model="pre_reqs"> <br>
          Exclusions: <input type="text" placeholder="e.g. COMP9998" v-model="exclusions"> <br>
          Handbook URL: <input type="text" v-model="handbookURL"> <br>
          Course Description: <input type="text" v-model="description"> <br>
          <v-btn v-on:click="addCourse"> Submit Request </v-btn>
        </div>
      </div>
  </div>
</template>

<script>
import CourseService from '@/services/CourseService'
export default {
  name: 'NewCourse',
  data () {
    return {
      code: '',
      name: '',
      faculty: '',
      co_reqs: '',
      pre_reqs: '',
      exclusions: '',
      handbookURL: '',
      description: '',
    }
  },
  methods: {
    async addCourse () {
      await CourseService.addCourse({
        code: this.code,
        name: this.name,
        faculty: this.faculty,
        coReqs: this.co_reqs,
        preReqs: this.pre_reqs,
        exclusions: this.exclusions,
        handbookURL: this.handbookURL,
        courseDescription: this.description,
      })
      this.$router.push({ name: 'Courses' })
    }
  }
}
</script>

<style>
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

<template>
  <div class="courses">
    <h1>Add Course</h1>
      <div class="form">
       <div>
         <input type="text" name="course code" placeholder="e.g. COMP9999" v-model="code">
         <input type="text" name="course name" placeholder="Some computing course" v-model="name">
         <input type="text" name="faculty" placeholder="e.g. Faculty of Engineering" v-model="faculty">
         <input type="text" name="co_req" placeholder="e.g. COMP4920" v-model="co_reqs">
         <input type="text" name="pre_req" placeholder="e.g. COMP2511" v-model="pre_reqs">
         <input type="text" name="exclusions" placeholder="e.g. COMP9998" v-model="exclusions">
         <input type="text" name="handbook_url" placeholder="e.g. https://www.handbook.unsw.edu.au/graduate/2018/COMP/COMP9999" v-model="handbook_URL">
         </div> 
</template>

<script>
import CourseService from '@/services/CourseService'
export default {
 name: 'NewCourse',
 data() {
   return {
     code: '',
     name: '',
     faculty: '',
     co_reqs: '',
     pre_reqs: '',
     exclusions: '',
     handbook_URL: '',
   }
 },
 methods: {
   async addCourse() {
     await CourseService.addCourse({
       code = this.code,
       name = this.name,
       faculty: this.faculty,
       co_reqs = this.co_reqs,
       pre_reqs = this.pre_reqs,
       exclusions = this.exclusions,
       handbook_URL = this.handbook_URL
     })
     this.$router.push({ name: 'Courses'})
   }
 }
}
</script>

<style>

</style>

import Api from '@/services/Api'
export default {
  fetchCourses () {
    return Api().get('courses')
  },

  getSpecificCourse (params) {
    return Api().post('course', params)
  },

  addCourse (params) {
    return Api().post('courses', params)
  },

  editCourse (params) {
    return Api().post('courses', params)
  }
}

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
  },
  getComments (params) {
    return Api().post('comments', params)
  },
  updateRating (params) {
    return Api().post('updateRating', params)
  }
}

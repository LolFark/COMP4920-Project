import Api from '@/services/Api'
export default {
  fetchCourses () {
    return Api().get('courses')
  },

  addCourse (params) {
    return Api().post('courses', params)
  },

  editCourse(params) {
    return Api().post('courses', params)
  }
}

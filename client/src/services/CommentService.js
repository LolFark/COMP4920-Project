import Api from '@/services/Api'
export default {
  addComment (params) {
    return Api().post('addComment', params)
  },
  getComments (param) {
    return Api().post('comment', param)
  },
  deleteComment (param) {
    return Api().post('deleteComment', param)
  }
}

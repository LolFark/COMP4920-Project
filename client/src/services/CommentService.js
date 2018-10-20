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
  },
  editComment (param) {
    return Api().post('editComment', param)
  },
  getUserComments (param) {
    return Api().post('getUserComments', param)
  },
  addReply (params) {
    return Api().post('addReply', params)
  },
  deleteReply (param) {
    return Api().post('deleteReply', param)
  },
  editReply (param) {
    return Api().post('editReply', param)
  }
}

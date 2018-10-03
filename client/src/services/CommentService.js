import Api from '@/services/Api'
export default {
  addComment (params) {
    return Api().post('addComment', params)
  },
  getComments () {
    return Api().get('comment')
  }
}

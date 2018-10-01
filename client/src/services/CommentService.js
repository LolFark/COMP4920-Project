import Api from '@/services/Api'
export default {
  getComments (params) {
    return Api().post('comment', params)
  }
}

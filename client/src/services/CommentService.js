import Api from '@/services/Api'
export default {
  post_comment (params) {
    return Api().post('comment', params)
  }
}

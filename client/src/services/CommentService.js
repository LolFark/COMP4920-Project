import Api from '@/services/Api'
export default {
<<<<<<< HEAD
  getComments (params) {
=======
  post_comment (params) {
>>>>>>> ea4c8b062c261d34e8b72c4330c90e45ce4de4fa
    return Api().post('comment', params)
  }
}

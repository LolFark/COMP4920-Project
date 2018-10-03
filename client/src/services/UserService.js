import Api from '@/services/Api'
export default {
  fetchUsers () {
    return Api().get('users')
  },
  getUser (param) {
    return Api().post('user', param)
  }
}

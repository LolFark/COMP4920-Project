import Api from '@/services/Api'
export default {
  getUser (param) {
    return Api().post('user', param)
  }
}

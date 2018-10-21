import Api from './Api';

export default {
  fetchUsers() {
    return Api().get('users');
  },
  getUser(param) {
    return Api().post('user', param);
  },
  updatePassword(params) {
    return Api().post('updatePassword', params);
  },
  updateProfile(params) {
    return Api().post('updateProfile', params);
  },
  likeComment(params) {
    return Api().post('/likeComment', params);
  },
  unlikeComment(params) {
    return Api().post('/unlikeComment', params);
  },
};

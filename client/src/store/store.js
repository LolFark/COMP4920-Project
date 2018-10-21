import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

// Using Vuex to maintain state
Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],

  strict: true,
  state: {
    token: null,
    user: null,
    authenticated: false,
    courses: [],
    currentCourse: null,
  },
  mutations: {
    setToken(state, token) {
      this.state.token = token;
      this.state.authenticated = !!(token);
    },
    setUser(state, user) {
      this.state.user = user;
    },
    setCourses(state, courses) {
      this.state.courses = courses;
    },
    addLike(state, comment) {
      if (!this.state.user.likedComments.includes(comment)) {
        this.state.user.likedComments.push(comment);
        if (this.state.user.dislikedComments.includes(comment)) {
          this.state.user.dislikedComments.splice(comment, 1);
        }
      } else {
        this.state.user.likedComments.splice(comment, 1);
      }
    },
    dislike(state, comment) {
      if (!this.state.user.dislikedComments.includes(comment)) {
        this.state.user.dislikedComments.push(comment);
        if (this.state.user.likedComments.includes(comment)) {
          this.state.user.likedComments.splice(comment, 1);
        }
      } else {
        this.state.user.dislikedComments.splice(comment, 1);
      }
    },
    addComment(state, comment) {
      this.state.user.comments.push(comment);
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    setCourses({ commit }, courses) {
      commit('setCourses', courses);
    },
    addLike({ commit }, payload) {
      commit('addLike', payload);
    },
    removeLike({ commit }, payload) {
      commit('removeLike', payload);
    },
    dislike({ commit }, payload) {
      commit('dislike', payload);
    },
    removeDislike({ commit }, payload) {
      commit('removeDislike', payload);
    },
    addComment({ commit }, payload) {
      commit('addComment', payload);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    getCourseByCode: state => code => state.courses.find(course => course.code === code),
  },
});

export default store;

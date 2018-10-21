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
    addComment(state, comment) {
      this.state.user.comments.push(comment);
    },
    setCourses (state, courses) {
      state.courses = courses
    },
    sortCourses (state, key) {
      console.log(key);
      state.courses = state.courses.sort((a, b) => {
        if (a[key] > b[key]) { return -1 }
        if (a[key] < b[key]) { return 1 }
        return 0
      })
    }
  },
  actions: {
    sortCourses ({commit}, key) {
      commit('sortCourses', key)
    },
    setToken ({commit}, token) {
      commit('setToken', token)
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

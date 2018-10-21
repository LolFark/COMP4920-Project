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
    liked: [],
    disliked: [],
    comments: [],
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
      this.state.liked.push(comment);
    },
    removeLike(state, comment) {
      this.state.liked.splice(comment, 1);
    },
    dislike(state, comment) {
      this.state.disliked.push(comment);
    },
    removeDislike(state, comment) {
      this.state.disliked.splice(comment, 1);
    },
    getLikedComments(state, comments) {
      this.state.liked = comments;
    },
    getDislikedComments(state, comments) {
      this.state.disliked = comments;
    },
    getComments(state, comments) {
      this.state.comments = comments;
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
    getLikedComments({ commit }, payload) {
      commit('getLikedComments', payload);
    },
    getDislikedComments({ commit }, payload) {
      commit('getDislikedComments', payload);
    },
    getComments({ commit }, payload) {
      commit('getComments', payload);
    },
  },
});

export default store;

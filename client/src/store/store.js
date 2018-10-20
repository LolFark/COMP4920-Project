import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// Using Vuex to maintain state
Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState()],

  strict: true,
  state: {
    token: null,
    user: null,
    authenticated: false,
    courses: [],
    comments: [],
    currentCourse: null
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      state.authenticated = !!(token)
    },
    setUser (state, user) {
      state.user = user
    },
    setCourses (state, courses) {
      state.courses = courses
    },
    setComments (state, comments) {
      state.comments = comments
    },
    setCourse (state, course) {
      state.course = course
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setCourses ({commit}, courses) {
      commit('setCourses', courses)
    },
    setComments ({commit}, comments) {
      commit('setComments', comments)
    },
    setCourse ({commit}, course) {
      commit('setCourse', course)
    }
  },
  getters: {
  }
})

export default store

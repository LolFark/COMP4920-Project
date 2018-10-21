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
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setCourses ({commit}, courses) {
      commit('setCourses', courses)
    }
  },
  getters: {
    getCourse: state => index => {
      return state.courses[index]
    }
  }
})

export default store

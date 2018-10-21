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
    currentCourse: null,
    notifications: []
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
    addNotification (state, { username, code }) {
      state.notifications.push({ username, code })
    },
    delNotification (state, index) {
      state.notifications.splice(index, 1)
    },
    delAllNotifications (state) {
      state.notifications = []
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
    addNotification ({commit}, { username, code }) {
      commit('addNotification', { username, code })
    },
    delNotification ({commit}, index) {
      commit('delNotification', index)
    },
    delAllNotifications ({commit}) {
      commit('delAllNotifications')
    }
  },
  getters: {
    getCourse: state => index => {
      return state.courses[index]
    },
    getNotifications: state => {
      return state.notifications
    }
  }
})

export default store

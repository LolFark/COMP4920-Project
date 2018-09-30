import Vue from 'vue'
import Vuex from 'vuex'

// Using Vuex to maintain state
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    authenticated: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      state.authenticated = !!(token)
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  }
})
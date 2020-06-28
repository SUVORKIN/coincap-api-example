import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: ''
  },
  mutations: {
    set (state, { type, val }) {
      state[type] = val
    }
  },
  actions: {
    message ({ commit }, message) {
      commit('set', { type: 'message', val: message })
    }
  },
  getters: {
    message (state) {
      return state.message
    }
  }
})

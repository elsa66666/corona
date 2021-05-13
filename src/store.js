import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// initial state
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  window.localStorage.setItem('isDarkMode', 'true')
}

const userSelectedDarkMode = window.localStorage.getItem('isDarkMode') === 'true'
const state1 = {
  isDarkMode: userSelectedDarkMode
}

// getters
const getters1 = {
  getIsDarkMode (state1) {
    return state1.isDarkMode
  }
}

// mutations
const mutations1 = {
  toggleDarkMode (state1) {
    if (state1.isDarkMode === true) {
      state1.isDarkMode = false
      document.body.style.background = '#f0f3f5'
      window.localStorage.setItem('isDarkMode', 'false')
    } else {
      state1.isDarkMode = true
      document.body.style.background = '#211c4f'
      window.localStorage.setItem('isDarkMode', 'true')
    }
  }
}

// actions
const actions1 = {
  triggerDarkMode (context) {
    context.commit('toggleDarkMode')
  }
}

const store1 = new Vuex.Store({
  state: state1,
  getters: getters1,
  mutations: mutations1,
  actions: actions1
})

export default store1

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

const state = {
  user: JSON.parse(localStorage.getItem('user-info')) || null,
  token: localStorage.getItem('user-token') || null,
  isLoggedIn: !!localStorage.getItem('user-token') || false
}
  
const getters = {
  GET_USER: state => state.user,
  GET_TOKEN: state => state.token,
  GET_STATUS: state => state.isLoggedIn 
}
  
const mutations = {
  SET_USER: (state, user) => { state.user = user },
  SET_TOKEN: (state, token) => { state.token = token },
  SET_STATUS: (state, status) => { state.isLoggedIn = status },
  LOGOFF: state => {
    state.user = state.token = null
    state.isLoggedIn = false
  }
}
  
const actions = {
  LOG_USER: ({ commit }, credentials) => {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_ROOT_API}auth/login`, {
        email: credentials.email,
        password: credentials.password
      }).then(response => {
        localStorage.setItem('user-token', response.data.token);
        localStorage.setItem('user-info', JSON.stringify({ email: credentials.email }))
        commit('SET_TOKEN', response.data.token)
        commit('SET_USER', { email: credentials.email })
        commit('SET_STATUS', true)
        resolve(response)
      }, error => reject(error))
    })
  }
}

export default { state, getters, mutations, actions }
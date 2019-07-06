import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

const state = {
  companies: []
}
  
const getters = {
  GET_COMPANIES: state => state.companies
}
  
const mutations = {
  SET_COMPANIES: (state, companies) => { state.companies = companies },
  CREATE_COMPANY: (state, company) => state.companies.push(company),

  UPDATE_COMPANY: (state, company) => {
    const item = state.companies.findIndex(i => i.id === company.id)
    state.companies.splice(item, 1, company)
  },
  
  DELETE_COMPANY: (state, id) => {
    const item = state.companies.findIndex(i => i.id === id)
    state.companies.splice(item, 1)
  }
}
  
const actions = {
  async GET_COMPANIES ({ commit }, credentials) {
    try {
      const result = await axios.get(
        `${process.env.VUE_APP_ROOT_API}companies`,
        credentials
      )
      commit('SET_COMPANIES', result.data)
    } catch (error) {
      // TODO: Implement validation for getting action
      console.log(error)
    }
  },

  async CREATE_COMPANY ({ commit }, payload) {
    try {
      const result = await axios.post(
        `${process.env.VUE_APP_ROOT_API}companies`,
        payload.data,
        payload.auth
      )
      if (result.data) {
        commit('CREATE_COMPANY', result.data)
        return { data: result.data }
      }
    } catch (error) {
      return { errors: error.response.data }
    }
  },

  async UPDATE_COMPANY ({ commit }, payload) {
    try {
      const result = await axios.patch(
        `${process.env.VUE_APP_ROOT_API}companies/${payload.data.id}`,
        payload.data,
        payload.auth
      )
      if (result.data) {
        commit('UPDATE_COMPANY', result.data.company)
        return { data: result.data }
      }
    } catch (error) {
      return { errors: error.response.data }
    }
  },

  async DELETE_COMPANY ({ commit }, payload) {
    try {
      const result = await axios.delete(
        `${process.env.VUE_APP_ROOT_API}companies/${payload.id}`,
        payload.auth
      )
      if (result.data.message) {
        commit('DELETE_COMPANY', payload.id)
        return { data: result.data.message }
      }
    } catch (error) {
     // TODO: Implement error for deleting action
     console.log(error)
    }
  }
}

export default { state, getters, mutations, actions }
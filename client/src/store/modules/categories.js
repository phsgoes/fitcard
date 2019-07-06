import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

const state = {
  categories: []
}
  
const getters = {
  GET_CATEGORIES: state => state.categories
}
  
const mutations = {
  SET_CATEGORIES: (state, categories) => { state.categories = categories },
  CREATE_CATEGORY: (state, category) => state.categories.push(category),

  UPDATE_CATEGORY: (state, category) => {
    const item = state.categories.findIndex(i => i.id === category.id)
    state.categories.splice(item, 1, category)
  },
  
  DELETE_CATEGORY: (state, id) => {
    const item = state.categories.findIndex(i => i.id === id)
    state.categories.splice(item, 1)
  }
}
  
const actions = {
  async GET_CATEGORIES ({ commit }, auth) {
    try {
      const result = await axios.get(
        `${process.env.VUE_APP_ROOT_API}categories`,
        auth
      )
      commit('SET_CATEGORIES', result.data)
    } catch (error) {
      // TODO: Implement error for getting action
      console.log(error)
    }
  },

  async CREATE_CATEGORY ({ commit }, payload) {
    try {
      const result = await axios.post(
        `${process.env.VUE_APP_ROOT_API}categories`,
        payload.data,
        payload.auth
      )
      if (result.data) { 
        commit('CREATE_CATEGORY', result.data)
        return { data: result.data }
      }
    } catch (error) {
      return { errors: error.response.data }
    }
  },

  async UPDATE_CATEGORY ({ commit }, payload) {
    try {
      const result = await axios.patch(
        `${process.env.VUE_APP_ROOT_API}categories/${payload.data.id}`,
        payload.data,
        payload.auth
      )
      if (result.data) {
        commit('UPDATE_CATEGORY', result.data.category)
        return { data: result.data }
      }
    } catch (error) {
      return { errors: error.response.data }
    }
  },

  async DELETE_CATEGORY ({ commit }, payload) {
    try {
      const result = await axios.delete(
        `${process.env.VUE_APP_ROOT_API}categories/${payload.id}`,
        payload.auth
      )
      if (result.data.message) {
        commit('DELETE_CATEGORY', payload.id)
        return { data: result.data.message }
      }
    } catch (error) {
      // TODO: Implement error for deleting action
      console.log(error)
    }
  }
}

export default { state, getters, mutations, actions }
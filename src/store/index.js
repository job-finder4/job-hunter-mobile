/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import user from './user'

const appSettings = require("tns-core-modules/application-settings");

Vue.use(Vuex)
Vue.use(axios)

export default new Vuex.Store({
  state: {
    accessToken:appSettings.getString('access_token') || null,
    refreshToken:appSettings.getString('refresh_token') || null,
  },
  getters: {
    isLoggedIn(state){
      return !!state.accessToken
    },
    getAccessToken(state){
      return state.accessToken
    }
  },
  mutations: {
    RETRIEVE_TOKEN(state,data){
      state.accessToken=data.access_token
      state.refreshToken=data.refresh_token
      appSettings.setString('access_token',state.accessToken)
      appSettings.setString('refresh_token',state.refreshToken)
      console.log(state.accessToken)
    },
  },
  actions: {
    initApp({getters,dispatch}){
      if(getters.isLoggedIn){
        dispatch('retrieveUser')
      }
    },
  },
  modules: {
    user,
  }
})

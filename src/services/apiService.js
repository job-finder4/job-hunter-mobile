/* eslint-disable */
import axios from 'axios'
// import router from "../router";
import store from '../store'
import * as appSettings from "application-settings";

export const apiClient=axios.create({
  baseURL :'http://daniel.test/api/',
})

apiClient.interceptors.request.use(
  config=>{
    config.headers['authorization'] = 'Bearer '+appSettings.getString('access_token')
    return config
  },
  error=>{
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  response=>response,
  error => {

    if(error.response.status === 401 && appSettings.getString('access_token')){
      // localStorage.removeItem('access_token')
      // localStorage.removeItem('refresh_token')
      location.reload()
      // router.replace({name:'home'})
    }else if(error.response.status === 500){
      // router.push({name:'error-page'});
    }else if(error.response.status === 401){
      // store.commit('SET_NOTIFICATION', {message: 'you must log in first', type: 'error'})
    }

    return Promise.reject(error)
  }
)






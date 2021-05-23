/* eslint-disable */
import axios from 'axios'
// import router from "../router";
import store from '../store'
import * as appSettings from "application-settings";
import MyJobs from "../components/jobs/MyJobs";

export const apiClient = axios.create({
    baseURL: 'https://36f4e03a186e.ngrok.io/api/',
    timeout: 2000,
})

apiClient.interceptors.request.use(
    config => {
        config.headers['authorization'] = 'Bearer ' + appSettings.getString('access_token')
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

apiClient.interceptors.response.use(
    response => response,
    error => {

        if (error.response.status === 401 && appSettings.getString('access_token')) {
            appSettings.removeString('access_token')
            appSettings.removeString('refresh_token')
            // location.reload()
            this.$navigateTo(App, {
                transition: {
                    name: 'fade',
                    duration: 500
                }
            })
        } else if (error.response.status === 500) {
            // router.push({name:'error-page'});
        } else if (error.response.status === 401) {
            // store.commit('SET_NOTIFICATION', {message: 'you must log in first', type: 'error'})
        }

        return Promise.reject(error)
    }
)

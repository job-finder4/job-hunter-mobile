/* eslint-disable */
import axios from 'axios'
import store from '../store'
import * as appSettings from "application-settings";
import MyJobs from "../components/jobs/MyJobs";

export const apiClient = axios.create({
    baseURL: 'http://192.168.43.233/55nuxt-laravel-passport-example-master/nuxt-laravel-passport-example-master/laravel/public/api/',
    	// baseURL: 'http://192.168.43.233/55nuxt-laravel-passport-example-master/nuxt-laravel-passport-example-master/laravel/public/api/',

    // baseURL: 'https://0ff256543af2.ngrok.io/api/',
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
            appSettings.remove('access_token')
            appSettings.remove('refresh_token')
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

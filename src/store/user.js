/* eslint-disable */

import {apiClient} from "../services/apiService";
import { popUpShow } from "../components/MyToast";

const appSettings = require("tns-core-modules/application-settings");

export default {
    state: {
        user: null
    },
    getters: {
        user(state) {
            return state.user
        },
    },
    mutations: {
        LOGOUT() {
            appSettings.removeString('access_token')
            appSettings.removeString('refresh_token')
        },
        REGISTER(state, user) {
            state.user = user
        },
        RETRIEVE_USER(state, user) {
            state.user = user;
        },

    },
    actions: {
        logout({commit, state}) {
            return new Promise((resolve, reject) => {
                apiClient.post('logout')
                    .then(response => {
                        commit('LOGOUT')
                        // commit('SET_NOTIFICATION', {message: 'Logout Out Successfully', type: 'success'})
                        resolve(response)
                    })
                    .catch(error => {
                        // commit('SET_NOTIFICATION', {message: error.message, type: 'success'})
                        reject(error)
                    })
            })
        },
        login({commit, dispatch}, credentials) {
            return new Promise((resolve, reject) => {

                apiClient.post('login', {
                    email: credentials.email,
                    password: credentials.password,
                })
                    .then(response => {
                        commit('RETRIEVE_TOKEN', response.data)
                        popUpShow("You Are Hell Damn Ok, LoggedIn")
                        // commit('SET_NOTIFICATION', {message: 'Hello', type: 'success'})
                        // dispatch('retrieveUser')
                        resolve()
                    })
                    .catch(error => {
                        popUpShow(error.message)
                        // commit('SET_NOTIFICATION', {message: error.response.data, type: 'error'})
                        reject(error)
                    })
            })
        },
        register({dispatch, commit}, user) {

            let formData = new FormData()
            formData.append('file', user.profileImage)
            formData.append('email', user.email)
            formData.append('password', user.password)
            formData.append('first_name', user.first_name)
            formData.append('last_name', user.last_name)

            return new Promise((resolve, reject) => {

                apiClient.post('register',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(response => {
                        commit('REGISTER', response.data)
                        resolve()
                    })
                    .catch(error => {
                        // commit('SET_NOTIFICATION', {message: error.response.data, type: 'error'})
                        reject(error)
                    })
            })
        },
        retrieveUser({commit}) {
            apiClient.get('/user')
                .then(response => {
                    commit('RETRIEVE_USER', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        changeMyPassword({commit}, {user, passwordInformations}) {
            apiClient.put('/users/' + user.id + '/change_password', {
                oldPassword: passwordInformations.oldPassword,
                newPassword: passwordInformations.newPassword
            })
                .then(response => {
                    // commit('SET_NOTIFICATION', {
                    //   message: 'changed succussfully',
                    //   type: 'success'
                    // })
                })
                .catch(error => {
                    // commit('SET_NOTIFICATION', {
                    //   message: 'something go wrong',
                    //   type: 'error'
                    // })
                })
        }
    }
}

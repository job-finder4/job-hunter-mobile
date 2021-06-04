/* eslint-disable */

import {apiClient} from "../services/apiService";
import {popUpShowToast} from "../components/MyToast";
import {popUpShowIndictorIndictor, popupHideIndictor} from "~/components/LoadingIndicator";

const appSettings = require("tns-core-modules/application-settings");


export default {
    state: {
        user: null,
        pendingJobApplications: [],
        approvedJobApplications: [],
        rejectedJobApplications: [],
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getUserId(state) {
            return state.user.data.id
        },
        getApprovedJobApplications(state) {
            return state.approvedJobApplications
        },
        getRejectedJobApplications(state) {
            return state.rejectedJobApplications
        },
        getPendingJobApplications(state) {
            return state.pendingJobApplications
        },
    },
    mutations: {
        GET_JOB_APPLICATIONS(state, {applications, applicationStatus}) {
            if (applicationStatus === 'pending') {
                state.pendingJobApplications = [...applications]
            }
            if (applicationStatus === 'approved') {
                state.approvedJobApplications = [...applications]
            }
            if (applicationStatus === 'rejected') {
                state.rejectedJobApplications = [...applications]
            }
        },
        LOGOUT() {
            appSettings.remove("access_token")
            appSettings.remove("refresh_token")

            // appSettings.removeString('access_token')
            // appSettings.removeString('refresh_token')
        },
        REGISTER(state, user) {
            state.user = user
        },
        RETRIEVE_USER(state, user) {
            state.user = user;
            "inside Retrive"
            console.log(state.user)
            console.log(user)
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
                        // this.$showToast("You Are Hell Damn Ok, LoggedIn")
                        // commit('SET_NOTIFICATION', {message: 'Hello', type: 'success'})
                        // dispatch('retrieveUser')
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        // this.$showToast("something wrong")
                        // commit('SET_NOTIFICATION', {message: error.response.data, type: 'error'})
                        reject(error)
                    })
            })
        },
        retrieveUser({commit, dispatch}) {
            return new Promise((resolve, reject) => {
                apiClient.get('/user')
                    .then(response => {
                        console.log("user fetch successfully -*-*-*-*-")
                        // console.log(response.data)
                        commit('RETRIEVE_USER', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        console.log("user eERRRor -///////")
                        // console.log(error)
                        reject(error)
                    })
            })

        },
        getJobSeekerApplications({state, commit, getters}, {applicationStatus}) {
            return new Promise((resolve, reject) => {
                // console.log(getters.getUserId)
                apiClient.get('users/' + getters.getUserId + '/applications', {
                    params: {
                        filter: applicationStatus
                    }
                })
                    .then(response => {
                        resolve(response)
                        commit('GET_JOB_APPLICATIONS', {
                            applicationStatus: applicationStatus,
                            applications: response.data.data
                        })
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
    }
}

import {apiClient} from "~/services/apiService";

export default {
    state: {
        profile: null,
        profileOwner: null,
        profileImage: null,
        jobPreference: null,
        allSkills: null
    },
    getters: {
        jobPreference(state) {
            return !!state.jobPreference ? state.jobPreference.attributes : null
        },
    },
    mutations: {
        SET_PROFILE(state, {data, included}) {
            state.profile = data
            state.profileOwner = included.user
            state.jobPreference = !!included.job_preference ? included.job_preference.data : null
            state.profileImage = included.user.data.attributes.image
        },
        RESET_JOB_PREFERENCE(state, newJobPreference) {
            state.jobPreference = newJobPreference
        },
        CREATE_JOB_PREFERENCE(state, jobPreference) {
            state.jobPreference = jobPreference.data
        },
        UPDATE_JOB_PREFERENCE(state, newJobPreference) {
            state.jobPreference = newJobPreference.data
        },
        DELETE_JOB_PREFERENCE(state) {
            state.jobPreference = null
        },
    },
    actions: {
        retrieveProfile({commit}, userId) {
            return new Promise((resolve, reject) => {
                apiClient.get(`users/${userId}/profile`)
                    .then(res=>{
                        commit('SET_PROFILE', res.data)
                        resolve(res)
                    })
            })

        },
        createJobPreference({commit, getters}, jobPreference) {
            apiClient.post(`users/${getters.getUser.data.id}/job-preference`, jobPreference)
                .then(res=>{
                    commit('CREATE_JOB_PREFERENCE', res.data)
                })
        },
        updateJobPreference({commit, getters}, jobPreference) {
            apiClient.put(`users/${getters.getUser.data.id}/job-preference`, jobPreference)
                .then(res=>{
                    commit('UPDATE_JOB_PREFERENCE', res.data)
                })
        },
        deleteMyJobPreference({commit, getters}) {
            apiClient.delete(`users/${getters.getUser.data.id}/job-preference`)
            commit('DELETE_JOB_PREFERENCE')
        },
    },
}

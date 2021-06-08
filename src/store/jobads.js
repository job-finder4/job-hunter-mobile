import {apiClient} from "../services/apiService";

export default {
    state: {
        jobads: [],
        search: {
            location: "",
            term: ""
        },
        advancedSearch: null,
        params: {}
    },
    getters: {
        //jobSeeker
        getAllJobads(state) {
            return state.jobads
        },
        getSearchParams(state) {
            return state.search;
        }
    },
    mutations: {
        //jobSeeker
        GET_ALL_JOBS(state, data) {
            // state.jobads = data
            state.jobads.push(...data)
        },
        CLEAR_JOBADS(state) {
            state.jobads = []
        },
        SET_SEARCH_PARAMS(state, search) {
            state.search = search
        },
        SET_ADVANCED_SEARCH_PARAMS(state, advancedSearch) {
            state.advancedSearch = advancedSearch
        },
        SET_FILTER_PARAMS(state, params) {
            state.params = params
        },
        CLEAR_SEARCH_ATTRIBUTE(state) {
            state.search = null
            state.advancedSearch = null
        },


        //Company

    },
    actions: {
        //jobSeeker
        getJobads({commit, state}, {params}) {
            if (!!state.search)
                state.params.search = state.search

            if (!!state.advancedSearch)
                state.params.advancedSearch = state.advancedSearch

            return new Promise((resolve, reject) => {
                apiClient.get('jobads', {
                    params: {...state.params, page: params.page}
                })
                    .then(response => {
                        commit('GET_ALL_JOBS', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        clearJobads({commit}) {
            commit('CLEAR_JOBADS')
        }
    },
}
